/**
 * MockMonkey Enhanced Network Service
 * Provides system-level network interception using declarativeNetRequest API
 * This allows for seamless operation across all environments
 */

class MockMonkeyNetworkService {
    constructor() {
        this.activeRules = new Map();
        this.ruleIdCounter = 1;
        this.maxRules = 1000; // Chrome limit for dynamic rules
        this.mockStorage = null;
        this.interceptedRequests = new Map();
        this.requestCounter = 0;

        // Initialize
        this.init();
    }

    async init() {
        console.log('🌐 MockMonkey Network Service initializing...');

        // Setup storage reference
        this.mockStorage = {
            getAllMocks: async () => {
                try {
                    const result = await chrome.storage.local.get(null);
                    const mocks = {};

                    Object.keys(result).forEach((key) => {
                        if (key.startsWith('mockmonkey_mock_')) {
                            const mockData = result[key];
                            if (mockData && mockData.url) {
                                mocks[mockData.url] = mockData;
                            }
                        }
                    });

                    return mocks;
                } catch (error) {
                    console.error('🚨 Failed to get mocks:', error);
                    return {};
                }
            },
        };

        // Setup event listeners
        this.setupEventListeners();

        // Clear any existing rules on startup
        await this.clearAllRules();

        // Load and apply existing mocks
        await this.refreshNetworkRules();

        console.log('🌐 Network Service initialized');
    }

    setupEventListeners() {
        // Listen for storage changes to update rules
        chrome.storage.onChanged.addListener((changes, namespace) => {
            if (namespace === 'local') {
                const hasMockChanges = Object.keys(changes).some(
                    (key) => key.startsWith('mockmonkey_mock_') || key === 'mockmonkey_settings',
                );

                if (hasMockChanges) {
                    console.log('🌐 Detected mock changes, refreshing rules...');
                    this.refreshNetworkRules();
                }
            }
        });

        // Handle rule matching feedback
        if (chrome.declarativeNetRequest.onRuleMatchedDebug) {
            chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((details) => {
                console.log('🎯 Rule matched:', details);
                this.handleRuleMatch(details);
            });
        }

        // Enhanced webRequest for observation only (Manifest V3 compatible)
        if (chrome.webRequest && chrome.webRequest.onBeforeRequest) {
            chrome.webRequest.onBeforeRequest.addListener((details) => this.handleWebRequestObservation(details), {
                urls: ['<all_urls>'],
            });
        }

        if (chrome.webRequest && chrome.webRequest.onCompleted) {
            chrome.webRequest.onCompleted.addListener((details) => this.handleWebRequestCompleted(details), {
                urls: ['<all_urls>'],
            });
        }

        if (chrome.webRequest && chrome.webRequest.onErrorOccurred) {
            chrome.webRequest.onErrorOccurred.addListener((details) => this.handleWebRequestError(details), {
                urls: ['<all_urls>'],
            });
        }

        // Enhanced declarativeNetRequest feedback for detailed tracking
        if (chrome.declarativeNetRequest && chrome.declarativeNetRequest.onRuleMatchedDebug) {
            chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((details) => {
                this.handleRuleMatchedDebug(details);
            });
        }
    }

    async refreshNetworkRules() {
        try {
            // Get current mocks
            const mocks = await this.mockStorage.getAllMocks();

            // Check if mocking is enabled
            const settings = await this.getSettings();
            if (!settings.enableMocking) {
                console.log('🌐 Mocking disabled, clearing all rules');
                await this.clearAllRules();
                return;
            }

            // Clear existing rules
            await this.clearAllRules();

            // Create new rules for each mock
            const newRules = [];
            let ruleId = 1;

            for (const [url, mockData] of Object.entries(mocks)) {
                if (ruleId > this.maxRules) {
                    console.warn('🚨 Maximum rules limit reached, skipping remaining mocks');
                    break;
                }

                try {
                    const rule = await this.createNetworkRule(ruleId, url, mockData);
                    if (rule) {
                        newRules.push(rule);
                        this.activeRules.set(ruleId, { url, mockData, rule });
                        ruleId++;
                    }
                } catch (error) {
                    console.error(`🚨 Failed to create rule for ${url}:`, error);
                }
            }

            // Add rules in batches to avoid hitting limits
            if (newRules.length > 0) {
                await this.addRulesInBatches(newRules);
                console.log(`🌐 Added ${newRules.length} network interception rules`);
            }
        } catch (error) {
            console.error('🚨 Failed to refresh network rules:', error);
        }
    }

    async createNetworkRule(ruleId, url, mockData) {
        try {
            // Parse URL to create match pattern
            const urlObj = new URL(url);
            const urlPattern = this.createUrlPattern(urlObj);

            // Create response headers
            const responseHeaders = this.createResponseHeaders(mockData);

            // Create the rule
            const rule = {
                id: ruleId,
                priority: 1000 - ruleId, // Higher priority for earlier rules
                action: {
                    type: 'redirect',
                    redirect: {
                        // Use data URL for response body
                        url: this.createDataUrl(mockData),
                    },
                },
                condition: {
                    urlFilter: urlPattern,
                    resourceTypes: ['main_frame', 'sub_frame', 'xmlhttprequest', 'other'],
                },
            };

            // Add method condition if specified
            if (mockData.method && mockData.method !== 'GET') {
                rule.condition.requestMethods = [mockData.method.toLowerCase()];
            }

            return rule;
        } catch (error) {
            console.error(`🚨 Failed to create network rule for ${url}:`, error);
            return null;
        }
    }

    createUrlPattern(urlObj) {
        // Create a flexible URL pattern that handles query parameters
        let pattern = urlObj.origin + urlObj.pathname;

        // Handle query parameters by making them optional
        if (urlObj.search) {
            // For exact matches, include the query string
            pattern += urlObj.search;
        }

        return pattern;
    }

    createResponseHeaders(mockData) {
        const headers = mockData.headers || {};

        // Ensure basic headers
        if (!headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }

        if (!headers['Access-Control-Allow-Origin']) {
            headers['Access-Control-Allow-Origin'] = '*';
        }

        // Convert to Chrome extension format
        return Object.entries(headers).map(([name, value]) => ({
            header: name,
            operation: 'set',
            value: String(value),
        }));
    }

    createDataUrl(mockData) {
        const response = mockData.response || '{}';
        const contentType = mockData.headers?.['Content-Type'] || 'application/json';

        // Create data URL with proper content type
        const encodedResponse = encodeURIComponent(response);
        return `data:${contentType};charset=utf-8,${encodedResponse}`;
    }

    async addRulesInBatches(rules, batchSize = 50) {
        for (let i = 0; i < rules.length; i += batchSize) {
            const batch = rules.slice(i, i + batchSize);

            try {
                await chrome.declarativeNetRequest.updateDynamicRules({
                    addRules: batch,
                });

                console.log(`🌐 Added batch ${Math.floor(i / batchSize) + 1}: ${batch.length} rules`);

                // Small delay between batches to prevent overwhelming the browser
                if (i + batchSize < rules.length) {
                    await new Promise((resolve) => setTimeout(resolve, 100));
                }
            } catch (error) {
                console.error('🚨 Failed to add rule batch:', error);
            }
        }
    }

    async clearAllRules() {
        try {
            // Get current dynamic rules
            const existingRules = await chrome.declarativeNetRequest.getDynamicRules();

            if (existingRules.length > 0) {
                const ruleIds = existingRules.map((rule) => rule.id);

                await chrome.declarativeNetRequest.updateDynamicRules({
                    removeRuleIds: ruleIds,
                });

                console.log(`🌐 Cleared ${ruleIds.length} existing rules`);
            }

            this.activeRules.clear();
            this.ruleIdCounter = 1;
        } catch (error) {
            console.error('🚨 Failed to clear rules:', error);
        }
    }

    handleRuleMatch(details) {
        console.log('🎯 Network rule matched:', {
            ruleId: details.rule.ruleId,
            url: details.request.url,
            method: details.request.method,
            tabId: details.request.tabId,
        });

        // Update usage statistics
        this.updateMockUsage(details.rule.ruleId, details.request.url);

        // Notify DevTools if available
        this.notifyDevTools('MOCK_INTERCEPTED', {
            ruleId: details.rule.ruleId,
            url: details.request.url,
            method: details.request.method,
            tabId: details.request.tabId,
            timestamp: Date.now(),
        });
    }

    handleWebRequestObservation(details) {
        // Log all requests for comprehensive monitoring (observation only)
        const requestId = this.generateRequestId();

        this.interceptedRequests.set(requestId, {
            ...details,
            requestId,
            startTime: Date.now(),
            intercepted: false,
        });

        // Check if this request matches any of our mocks
        const matchedRule = this.findMatchingRule(details.url, details.method);
        if (matchedRule) {
            console.log('🎭 Request will be mocked:', details.url);

            const request = this.interceptedRequests.get(requestId);
            if (request) {
                request.intercepted = true;
                request.mockData = matchedRule.mockData;
            }
        }

        // Notify DevTools
        this.notifyDevTools('NETWORK_REQUEST_INTERCEPTED', {
            requestId,
            url: details.url,
            method: details.method,
            tabId: details.tabId,
            intercepted: !!matchedRule,
            timestamp: Date.now(),
        });
    }

    handleRuleMatchedDebug(details) {
        console.log('🎯 Rule matched debug:', {
            ruleId: details.rule?.ruleId,
            url: details.request?.url,
            method: details.request?.method,
            tabId: details.request?.tabId,
        });

        // Enhanced tracking for rule matching
        if (details.rule && details.request) {
            this.updateMockUsage(details.rule.ruleId, details.request.url);

            this.notifyDevTools('RULE_MATCHED_DEBUG', {
                ruleId: details.rule.ruleId,
                url: details.request.url,
                method: details.request.method,
                tabId: details.request.tabId,
                timestamp: Date.now(),
            });
        }
    }

    handleWebRequestCompleted(details) {
        // Find matching intercepted request
        const request = Array.from(this.interceptedRequests.values()).find(
            (req) => req.url === details.url && req.tabId === details.tabId,
        );

        if (request) {
            request.endTime = Date.now();
            request.statusCode = details.statusCode;
            request.responseHeaders = details.responseHeaders;

            // Notify DevTools
            this.notifyDevTools('NETWORK_RESPONSE_INTERCEPTED', {
                requestId: request.requestId,
                url: details.url,
                statusCode: details.statusCode,
                intercepted: request.intercepted,
                responseTime: request.endTime - request.startTime,
                timestamp: Date.now(),
            });

            // Cleanup old requests
            setTimeout(() => {
                this.interceptedRequests.delete(request.requestId);
            }, 30000); // Keep for 30 seconds
        }
    }

    handleWebRequestError(details) {
        console.log('🚨 Web request error:', details);

        // Notify DevTools
        this.notifyDevTools('NETWORK_REQUEST_ERROR', {
            url: details.url,
            error: details.error,
            tabId: details.tabId,
            timestamp: Date.now(),
        });
    }

    findMatchingRule(url, method) {
        for (const [ruleId, ruleData] of this.activeRules) {
            const { url: mockUrl, mockData } = ruleData;

            // Check URL match
            if (this.urlsMatch(url, mockUrl)) {
                // Check method match
                if (!mockData.method || mockData.method === method) {
                    return ruleData;
                }
            }
        }

        return null;
    }

    urlsMatch(requestUrl, mockUrl) {
        try {
            const reqUrl = new URL(requestUrl);
            const mockUrlObj = new URL(mockUrl);

            // Compare origin and pathname
            if (reqUrl.origin !== mockUrlObj.origin || reqUrl.pathname !== mockUrlObj.pathname) {
                return false;
            }

            // For query parameters, do flexible matching
            // If mock URL has no query params, match any request to that path
            if (!mockUrlObj.search) {
                return true;
            }

            // If both have query params, they should match exactly for now
            // TODO: Implement more sophisticated query param matching
            return reqUrl.search === mockUrlObj.search;
        } catch (error) {
            console.error('🚨 Error comparing URLs:', error);
            return false;
        }
    }

    async updateMockUsage(ruleId, url) {
        try {
            // Update mock usage statistics
            const key = `mockmonkey_mock_${btoa(url)}`;
            const result = await chrome.storage.local.get([key]);
            const mockData = result[key];

            if (mockData) {
                mockData.lastUsed = Date.now();
                mockData.useCount = (mockData.useCount || 0) + 1;

                await chrome.storage.local.set({ [key]: mockData });
            }
        } catch (error) {
            console.error('🚨 Failed to update mock usage:', error);
        }
    }

    generateRequestId() {
        this.requestCounter++;
        return `netreq_${Date.now()}_${this.requestCounter}`;
    }

    notifyDevTools(type, data) {
        try {
            chrome.runtime.sendMessage({
                type,
                data,
                source: 'network-service',
            });
        } catch (error) {
            // DevTools might not be open, ignore silently
        }
    }

    async getSettings() {
        try {
            const result = await chrome.storage.local.get(['mockmonkey_settings']);
            return result.mockmonkey_settings || { enableMocking: false };
        } catch (error) {
            console.error('🚨 Failed to get settings:', error);
            return { enableMocking: false };
        }
    }

    // Advanced interception methods for specific request types

    async enableWebSocketInterception(url, mockResponse) {
        // TODO: Implement WebSocket interception
        console.log('🔌 WebSocket interception for:', url);
    }

    async enableEventSourceInterception(url, mockEvents) {
        // TODO: Implement EventSource interception
        console.log('📡 EventSource interception for:', url);
    }

    // Request modification capabilities (not just mocking)
    async modifyRequest(url, modifications) {
        try {
            const ruleId = this.ruleIdCounter++;

            const rule = {
                id: ruleId,
                priority: 2000, // Higher priority than mocks
                action: {
                    type: 'modifyHeaders',
                    requestHeaders: modifications.headers?.map((header) => ({
                        header: header.name,
                        operation: header.operation || 'set',
                        value: header.value,
                    })),
                },
                condition: {
                    urlFilter: url,
                    resourceTypes: ['main_frame', 'sub_frame', 'xmlhttprequest', 'other'],
                },
            };

            await chrome.declarativeNetRequest.updateDynamicRules({
                addRules: [rule],
            });

            console.log('🔧 Request modification rule added for:', url);
            return ruleId;
        } catch (error) {
            console.error('🚨 Failed to add request modification:', error);
            return null;
        }
    }

    // Get comprehensive network statistics
    async getNetworkStats() {
        try {
            const existingRules = await chrome.declarativeNetRequest.getDynamicRules();

            return {
                activeRules: existingRules.length,
                interceptedRequests: this.interceptedRequests.size,
                totalMocks: this.activeRules.size,
                ruleTypes: this.analyzeRuleTypes(existingRules),
            };
        } catch (error) {
            console.error('🚨 Failed to get network stats:', error);
            return null;
        }
    }

    analyzeRuleTypes(rules) {
        const types = {
            redirect: 0,
            modifyHeaders: 0,
            block: 0,
            other: 0,
        };

        rules.forEach((rule) => {
            const actionType = rule.action?.type;
            if (Object.prototype.hasOwnProperty.call(types, actionType)) {
                types[actionType]++;
            } else {
                types.other++;
            }
        });

        return types;
    }

    // Cleanup method
    async destroy() {
        console.log('🌐 Network Service cleanup starting...');

        try {
            await this.clearAllRules();
            this.interceptedRequests.clear();
            this.activeRules.clear();

            console.log('🌐 Network Service cleanup complete');
        } catch (error) {
            console.error('🚨 Network Service cleanup failed:', error);
        }
    }
}

// Export for use in background script (service worker compatible)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockMonkeyNetworkService;
} else {
    // Use multiple assignment for maximum compatibility
    globalThis.MockMonkeyNetworkService = MockMonkeyNetworkService;

    // Also assign to self for service worker contexts
    // eslint-disable-next-line no-restricted-globals
    if (typeof self !== 'undefined') {
        // eslint-disable-next-line no-restricted-globals
        self.MockMonkeyNetworkService = MockMonkeyNetworkService;
    }

    // And window for regular browser contexts (if available)
    if (typeof window !== 'undefined') {
        window.MockMonkeyNetworkService = MockMonkeyNetworkService;
    }

    console.log('🌐 MockMonkeyNetworkService exported to:', {
        globalThis: !!globalThis.MockMonkeyNetworkService,
        // eslint-disable-next-line no-restricted-globals
        self: typeof self !== 'undefined' ? !!self.MockMonkeyNetworkService : 'N/A',
        window: typeof window !== 'undefined' ? !!window.MockMonkeyNetworkService : 'N/A',
    });
}
