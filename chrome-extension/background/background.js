/**
 * MockMonkey Enhanced Background Service Worker
 * Handles extension lifecycle, advanced network interception, and cross-component communication
 */

/* eslint-disable max-classes-per-file */

// Import the network service with robust error handling
let MockMonkeyNetworkService = null;
try {
    importScripts('network-service.js');

    // Try multiple locations for the constructor
    MockMonkeyNetworkService =
        globalThis.MockMonkeyNetworkService ||
        // eslint-disable-next-line no-restricted-globals
        self.MockMonkeyNetworkService ||
        window?.MockMonkeyNetworkService;

    console.log('🌐 Import debug:', {
        globalThis: !!globalThis.MockMonkeyNetworkService,
        // eslint-disable-next-line no-restricted-globals
        self: !!self.MockMonkeyNetworkService,
        window: !!(typeof window !== 'undefined' && window.MockMonkeyNetworkService),
        final: !!MockMonkeyNetworkService,
        type: typeof MockMonkeyNetworkService,
    });

    if (!MockMonkeyNetworkService) {
        console.warn('🚨 MockMonkeyNetworkService not found in any location');
    } else {
        console.log('✅ MockMonkeyNetworkService found:', typeof MockMonkeyNetworkService);
    }
} catch (error) {
    console.error('🚨 Failed to load network service:', error);
}

/**
 * DeclarativeNetRequest Manager
 * Handles browser-level request interception using Manifest V3 APIs
 */
class DeclarativeNetRequestManager {
    constructor() {
        this.ruleIdCounter = 1000; // Start at 1000 to avoid conflicts
        this.activeRules = new Map(); // URL -> ruleId mapping
        this.maxRules = 5000; // Chrome limit for dynamic rules
        this.dataUrlCache = new Map(); // Cache for generated data URLs
    }

    /**
     * Update declarativeNetRequest rules based on current mocks
     */
    async updateMockRules(mocks) {
        try {
            const mockCount = Object.keys(mocks).length;
            console.log('🌐 [DEBUG] Starting updateMockRules with', mockCount, 'mocks');
            console.log('🌐 [DEBUG] Mock URLs:', Object.keys(mocks));
            console.log(
                '🌐 [DEBUG] First mock sample:',
                Object.keys(mocks).length > 0 ? mocks[Object.keys(mocks)[0]] : 'none',
            );

            // Clear existing rules
            await this.clearAllRules();

            // Convert mocks to rules
            const newRules = [];
            const urlsToRemove = [];
            let processedCount = 0;

            for (const [url, mockData] of Object.entries(mocks)) {
                processedCount++;
                console.log(`🌐 [DEBUG] Processing mock ${processedCount}/${mockCount}: ${url}`);
                console.log('🌐 [DEBUG] Mock data:', {
                    url,
                    method: mockData.method,
                    status: mockData.status,
                    responseType: typeof mockData.response,
                    responseLength: mockData.response?.length || 0,
                    hasDelay: !!mockData.delay,
                    hasConditions: !!mockData.conditions?.length,
                });

                try {
                    const rule = await this.createRuleFromMock(url, mockData);
                    if (rule) {
                        newRules.push(rule);
                        this.activeRules.set(url, rule.id);
                        console.log('✅ [SUCCESS] Created declarativeNetRequest rule for:', url, 'Rule ID:', rule.id);
                    } else {
                        // Mark for JavaScript fallback
                        urlsToRemove.push(url);
                        console.log('⏭️ [FALLBACK] Using JavaScript fallback for complex mock:', url);
                    }
                } catch (error) {
                    console.warn(
                        '🚨 [ERROR] Failed to create rule for',
                        url,
                        '- falling back to JavaScript:',
                        error.message,
                    );
                    console.warn('🚨 [ERROR] Stack trace:', error.stack);
                    urlsToRemove.push(url);
                }
            }

            console.log('🌐 [DEBUG] Rule creation summary:', {
                totalMocks: mockCount,
                rulesCreated: newRules.length,
                fallbackUrls: urlsToRemove.length,
                successRate: `${((newRules.length / mockCount) * 100).toFixed(1)}%`,
            });

            // Update Chrome's declarativeNetRequest rules
            if (newRules.length > 0) {
                await chrome.declarativeNetRequest.updateDynamicRules({
                    addRules: newRules,
                });
                console.log(`🌐 [SUCCESS] Added ${newRules.length} declarativeNetRequest rules to Chrome`);
            } else {
                console.log(
                    '🌐 [WARNING] No declarativeNetRequest rules created - all mocks using JavaScript fallback',
                );
            }

            return {
                rulesCreated: newRules.length,
                fallbackUrls: urlsToRemove,
            };
        } catch (error) {
            console.error('🚨 [FATAL] Failed to update declarativeNetRequest rules:', error);
            throw error;
        }
    }

    /**
     * Convert a mock to a declarativeNetRequest rule if possible
     */
    async createRuleFromMock(url, mockData) {
        // Only handle simple mocks with declarativeNetRequest
        if (!this.canHandleWithDeclarativeNetRequest(mockData)) {
            return null;
        }

        const ruleId = this.generateRuleId();

        try {
            // Create data URL for the mock response
            const dataUrl = await this.createDataUrlResponse(mockData);

            const rule = {
                id: ruleId,
                priority: 1000,
                condition: {
                    urlFilter: this.createUrlFilter(url),
                    resourceTypes: ['xmlhttprequest', 'main_frame', 'sub_frame'],
                },
                action: {
                    type: 'redirect',
                    redirect: {
                        url: dataUrl,
                    },
                },
            };

            return rule;
        } catch (error) {
            console.warn('🚨 Failed to create data URL for mock:', error);
            return null;
        }
    }

    /**
     * Determine if a mock can be handled by declarativeNetRequest
     */
    canHandleWithDeclarativeNetRequest(mockData) {
        // Simple criteria for declarativeNetRequest compatibility
        const criteria = [
            // Must have static response
            mockData.response && typeof mockData.response === 'string',

            // No complex dynamic content
            !this.hasTemplateVariables(mockData.response),

            // Status code is supported
            !mockData.status || (mockData.status >= 200 && mockData.status < 600),

            // No delay (declarativeNetRequest doesn't support delays)
            !mockData.delay || mockData.delay === 0,

            // No complex conditions
            !mockData.conditions || mockData.conditions.length === 0,

            // Response not too large (data URL limitations)
            mockData.response.length < 50000, // ~50KB limit
        ];

        const canHandle = criteria.every((criterion) => criterion);

        if (!canHandle) {
            console.log('🔄 Mock requires JavaScript fallback due to complexity:', {
                hasResponse: !!mockData.response,
                hasTemplates: this.hasTemplateVariables(mockData.response || ''),
                hasDelay: !!mockData.delay,
                responseSize: mockData.response?.length || 0,
                hasConditions: !!mockData.conditions?.length,
            });
        }

        return canHandle;
    }

    /**
     * Check if response contains template variables
     */
    hasTemplateVariables(response) {
        // Check for common template patterns
        const templatePatterns = [
            /\{\{.*?\}\}/, // Handlebars-style
            /\$\{.*?\}/, // ES6 template literals
            /<%.*?%>/, // EJS-style
            /__\w+__/, // Placeholder style
        ];

        return templatePatterns.some((pattern) => pattern.test(response));
    }

    /**
     * Create a data URL for the mock response
     */
    async createDataUrlResponse(mockData) {
        // Check cache first
        const cacheKey = this.createCacheKey(mockData);
        if (this.dataUrlCache.has(cacheKey)) {
            return this.dataUrlCache.get(cacheKey);
        }

        // Ensure response is compact JSON if it's JSON
        let responseBody = mockData.response;
        const contentType = this.getContentType(mockData.headers);

        if (contentType.includes('json')) {
            try {
                const parsed = JSON.parse(responseBody);
                responseBody = JSON.stringify(parsed); // Compact format
            } catch (error) {
                // Not valid JSON, use as-is
            }
        }

        // Create data URL
        const mimeType = contentType || 'application/json';
        const dataUrl = `data:${mimeType};base64,${btoa(responseBody)}`;

        // Cache the result
        this.dataUrlCache.set(cacheKey, dataUrl);

        return dataUrl;
    }

    /**
     * Create cache key for mock data
     */
    createCacheKey(mockData) {
        return `${mockData.status || 200}_${btoa(mockData.response || '').slice(0, 32)}`;
    }

    /**
     * Get content type from headers
     */
    getContentType(headers = {}) {
        for (const [key, value] of Object.entries(headers)) {
            if (key.toLowerCase() === 'content-type') {
                return value;
            }
        }
        return 'application/json';
    }

    /**
     * Create URL filter for declarativeNetRequest condition
     */
    createUrlFilter(url) {
        try {
            // For exact URL matching, use the full URL
            // For pattern matching, we'd need more complex logic
            const urlObj = new URL(url);
            return urlObj.href;
        } catch (error) {
            // Fallback to simple string matching
            return url;
        }
    }

    /**
     * Generate unique rule ID
     */
    generateRuleId() {
        return this.ruleIdCounter++;
    }

    /**
     * Clear all existing declarativeNetRequest rules
     */
    async clearAllRules() {
        try {
            const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
            const ruleIds = existingRules.map((rule) => rule.id);

            if (ruleIds.length > 0) {
                await chrome.declarativeNetRequest.updateDynamicRules({
                    removeRuleIds: ruleIds,
                });
                console.log(`🧹 Cleared ${ruleIds.length} existing declarativeNetRequest rules`);
            }

            this.activeRules.clear();
            this.dataUrlCache.clear();
        } catch (error) {
            console.error('🚨 Failed to clear existing rules:', error);
        }
    }

    /**
     * Remove specific rule by URL
     */
    async removeRuleForUrl(url) {
        const ruleId = this.activeRules.get(url);
        if (ruleId) {
            try {
                await chrome.declarativeNetRequest.updateDynamicRules({
                    removeRuleIds: [ruleId],
                });
                this.activeRules.delete(url);
                console.log('🗑️ Removed declarativeNetRequest rule for:', url);
                return true;
            } catch (error) {
                console.error('🚨 Failed to remove rule:', error);
                return false;
            }
        }
        return false;
    }

    /**
     * Get status information
     */
    async getStatus() {
        try {
            const dynamicRules = await chrome.declarativeNetRequest.getDynamicRules();
            return {
                activeRulesCount: this.activeRules.size,
                totalDynamicRules: dynamicRules.length,
                cacheSize: this.dataUrlCache.size,
                ruleIdCounter: this.ruleIdCounter,
            };
        } catch (error) {
            console.error('🚨 Failed to get declarativeNetRequest status:', error);
            return null;
        }
    }
}

class MockMonkeyBackground {
    constructor() {
        this.activeTabs = new Map();
        this.debuggerSessions = new Map();
        this.mockStorage = null;
        this.networkService = null;
        this.stealthMode = false;
        this.requestModifications = new Map();

        // Initialize declarativeNetRequest manager
        this.declarativeNetRequestManager = new DeclarativeNetRequestManager();
        this.lastMockUpdateTime = 0;
        this.mockUpdateDebounceMs = 1000; // Debounce mock updates

        // Response content storage for debugger sessions
        this.responseContentCache = new Map(); // url -> { content, encoding, timestamp }
        this.requestResponseMap = new Map(); // requestId -> response data
        this.contentCacheTimeout = 30000; // 30 seconds

        this.init();
    }

    async init() {
        console.log('🐵 MockMonkey Background initializing...');

        // Setup event listeners
        this.setupEventListeners();

        // Initialize storage
        await this.initStorage();

        // Initialize enhanced network service
        await this.initNetworkService();
    }

    async initNetworkService() {
        try {
            if (typeof MockMonkeyNetworkService !== 'undefined') {
                this.networkService = new MockMonkeyNetworkService();
                console.log('🌐 Enhanced Network Service initialized');
            } else {
                console.warn('🚨 MockMonkeyNetworkService not available, using fallback');
            }
        } catch (error) {
            console.error('🚨 Failed to initialize network service:', error);
        }
    }

    setupEventListeners() {
        // Extension lifecycle
        chrome.runtime.onInstalled.addListener((details) => this.onInstalled(details));
        chrome.runtime.onStartup.addListener(() => this.onStartup());

        // Tab events
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => this.onTabUpdated(tabId, changeInfo, tab));
        chrome.tabs.onRemoved.addListener((tabId) => this.onTabRemoved(tabId));

        // Message handling
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            this.handleMessage(message, sender, sendResponse);
            return true; // Indicates async response
        });

        // DevTools connection
        chrome.runtime.onConnect.addListener((port) => this.handleConnection(port));

        // Debugger events
        chrome.debugger.onEvent.addListener((source, method, params) =>
            this.handleDebuggerEvent(source, method, params),
        );

        chrome.debugger.onDetach.addListener((source, reason) => this.handleDebuggerDetach(source, reason));
    }

    async initStorage() {
        try {
            // Initialize mock storage system
            this.mockStorage = {
                async getAllMocks() {
                    const result = await chrome.storage.local.get(null);
                    const mocks = {};

                    Object.keys(result).forEach((key) => {
                        // Match the storage manager's key format: mockmonkey_mock_<base64url>
                        if (key.startsWith('mockmonkey_mock_')) {
                            const mockData = result[key];
                            if (mockData && mockData.url) {
                                mocks[mockData.url] = mockData;
                            }
                        }
                    });

                    console.log('🐵 Found mocks:', Object.keys(mocks));
                    return mocks;
                },
            };

            console.log('🐵 Background storage initialized');
        } catch (error) {
            console.error('🚨 Failed to initialize storage:', error);
        }
    }

    onInstalled(details) {
        console.log('🐵 MockMonkey installed:', details.reason);

        if (details.reason === 'install') {
            // First time install
            this.showWelcome();
        } else if (details.reason === 'update') {
            // Extension updated
            console.log('🐵 Extension updated from version:', details.previousVersion);
        }
    }

    onStartup() {
        console.log('🐵 MockMonkey startup');
    }

    onTabUpdated(tabId, changeInfo, tab) {
        if (changeInfo.status === 'loading' && tab.url) {
            // Tab is loading, prepare for potential debugger attachment
            this.activeTabs.set(tabId, {
                url: tab.url,
                timestamp: Date.now(),
            });
        }
    }

    onTabRemoved(tabId) {
        // Clean up when tab is closed
        this.activeTabs.delete(tabId);
        this.detachDebugger(tabId);
    }

    async handleMessage(message, sender, sendResponse) {
        try {
            let result;

            switch (message.type) {
                case 'ATTACH_DEBUGGER':
                    result = await this.attachDebugger(message.tabId);
                    break;

                case 'DETACH_DEBUGGER':
                    result = await this.detachDebugger(message.tabId);
                    break;

                case 'GET_MOCKS':
                    result = await this.getAllMocks();
                    break;

                case 'ENABLE_MOCKING':
                    result = await this.enableMocking(message.tabId, message.enabled);
                    break;

                case 'MOCK_REQUEST':
                    result = await this.handleMockRequest(message.data);
                    break;

                case 'UPDATE_DECLARATIVE_NET_REQUEST_RULES':
                    result = await this.updateDeclarativeNetRequestRules();
                    break;

                case 'GET_DECLARATIVE_NET_REQUEST_STATUS':
                    result = await this.getDeclarativeNetRequestStatus();
                    break;

                // Network service message types
                case 'NETWORK_REQUEST_INTERCEPTED':
                    result = this.handleNetworkRequestIntercepted(message.data);
                    break;

                case 'NETWORK_RESPONSE_INTERCEPTED':
                    result = this.handleNetworkResponseIntercepted(message.data);
                    break;

                case 'RULE_MATCHED_DEBUG':
                    result = this.handleRuleMatchedDebug(message.data);
                    break;

                case 'MOCK_INTERCEPTED':
                    result = this.handleMockIntercepted(message.data);
                    break;

                case 'NETWORK_REQUEST_ERROR':
                    result = this.handleNetworkRequestError(message.data);
                    break;

                // Legacy message types (possibly from content scripts or devtools)
                case 'NETWORK_REQUEST':
                    result = this.handleLegacyNetworkRequest(message.data);
                    break;

                case 'NETWORK_RESPONSE_CONTENT':
                    result = this.handleLegacyNetworkResponseContent(message.data);
                    break;

                // Content script lifecycle messages
                case 'CONTENT_SCRIPT_READY':
                    result = this.handleContentScriptReady(message.data);
                    break;

                case 'STEALTH_INTERCEPTOR_READY':
                    result = this.handleStealthInterceptorReady(message.data);
                    break;

                case 'NAVIGATION':
                    result = this.handleNavigation(message.data);
                    break;

                // Content script logging messages
                case 'NETWORK_REQUEST_LOG':
                    result = this.handleNetworkRequestLog(message.data);
                    break;

                case 'NETWORK_RESPONSE_LOG':
                    result = this.handleNetworkResponseLog(message.data);
                    break;

                case 'NETWORK_ERROR_LOG':
                    result = this.handleNetworkErrorLog(message.data);
                    break;

                case 'STEALTH_NETWORK_REQUEST_LOG':
                    result = this.handleStealthNetworkRequestLog(message.data);
                    break;

                case 'STEALTH_NETWORK_RESPONSE_LOG':
                    result = this.handleStealthNetworkResponseLog(message.data);
                    break;

                case 'STEALTH_NETWORK_ERROR_LOG':
                    result = this.handleStealthNetworkErrorLog(message.data);
                    break;

                case 'DEBUG_MOCKING_STATUS':
                    result = await this.debugMockingStatus(message.tabId);
                    break;

                case 'GET_DEBUGGER_RESPONSE_CONTENT':
                    result = await this.getDebuggerResponseContent(message.data);
                    break;

                case 'REQUEST_RESPONSE_CONTENT':
                    result = await this.requestResponseContent(message.data);
                    break;

                default:
                    console.warn('🚨 Unknown message type:', message.type);
                    result = { success: false, error: 'Unknown message type' };
            }

            sendResponse(result);
        } catch (error) {
            console.error('🚨 Message handling error:', error);
            sendResponse({ success: false, error: error.message });
        }
    }

    handleConnection(port) {
        console.log('🐵 DevTools connected:', port.name);

        if (port.name === 'mockmonkey-devtools') {
            port.onMessage.addListener((message) => {
                console.log('🐵 DevTools message:', message);
            });

            port.onDisconnect.addListener(() => {
                console.log('🐵 DevTools disconnected');
            });
        }
    }

    async attachDebugger(tabId) {
        try {
            if (this.debuggerSessions.has(tabId)) {
                console.log('🐵 Debugger already attached to tab:', tabId);
                return { success: true, alreadyAttached: true };
            }

            console.log('🐵 Attempting to attach debugger to tab:', tabId);

            // Try to attach debugger directly first - this is what we want
            console.log('🐵 Step 1: Calling chrome.debugger.attach...');
            await chrome.debugger.attach({ tabId }, '1.3');
            console.log('🐵 Step 2: ✅ Debugger.attach succeeded');

            // Enable necessary domains
            console.log('🐵 Step 3: Enabling Network domain...');
            await chrome.debugger.sendCommand({ tabId }, 'Network.enable');
            console.log('🐵 Step 4: ✅ Network.enable succeeded');

            console.log('🐵 Step 5: Enabling Fetch domain...');
            await chrome.debugger.sendCommand({ tabId }, 'Fetch.enable', {
                patterns: [{ urlPattern: '*', requestStage: 'Request' }],
            });
            console.log('🐵 Step 6: ✅ Fetch.enable succeeded');

            this.debuggerSessions.set(tabId, {
                attached: true,
                devtoolsAttached: false,
                timestamp: Date.now(),
            });

            console.log('🐵 ✅ Debugger fully attached and configured for tab:', tabId);
            console.log('🐵 🎯 MockMonkey should now intercept network requests!');

            return {
                success: true,
                method: 'direct-attach',
                message: 'Full debugger access enabled - ready to intercept requests',
            };
        } catch (error) {
            console.error('🚨 Debugger attachment failed:', error.message);

            // Only fall back to alternative modes on specific errors
            if (
                error.message.includes('Cannot access') ||
                error.message.includes('already attached') ||
                error.message.includes('Target closed') ||
                error.message.includes('No such target')
            ) {
                console.log('🐵 Using alternative mocking approach due to debugger conflict');

                // Use alternative approach - rely on content scripts + declarativeNetRequest
                this.debuggerSessions.set(tabId, {
                    attached: false,
                    devtoolsAttached: true,
                    alternativeMode: true,
                    timestamp: Date.now(),
                });

                return {
                    success: true,
                    method: 'alternative-mode',
                    message: 'Using content scripts + browser rules (limited functionality)',
                };
            }

            // For other errors, this is a genuine failure
            console.error('🚨 Genuine debugger attachment failure:', error);
            return {
                success: false,
                error: error.message,
                message: 'Debugger attachment failed - mocking unavailable',
            };
        }
    }

    async detachDebugger(tabId) {
        try {
            if (!this.debuggerSessions.has(tabId)) {
                return { success: true, notAttached: true };
            }

            await chrome.debugger.detach({ tabId });
            this.debuggerSessions.delete(tabId);

            console.log('🐵 Debugger detached from tab:', tabId);
            return { success: true };
        } catch (error) {
            console.error('🚨 Failed to detach debugger:', error);
            return { success: false, error: error.message };
        }
    }

    async handleDebuggerEvent(source, method, params) {
        try {
            const { tabId } = source;

            // LOG ALL DEBUGGER EVENTS FOR DEBUGGING
            console.log('🎯 [DEBUGGER EVENT]', {
                tabId,
                method,
                url: params?.request?.url || params?.response?.url || 'unknown',
                timestamp: new Date().toISOString(),
            });

            if (method === 'Fetch.requestPaused') {
                console.log('🔴 [FETCH PAUSED] Request intercepted for mocking:', params?.request?.url);
                await this.handleRequestPaused(tabId, params);
            } else if (method === 'Network.requestWillBeSent') {
                console.log('🌐 [NETWORK REQUEST] Request detected:', params?.request?.url);
                await this.handleNetworkRequest(tabId, params);
            } else if (method === 'Network.responseReceived') {
                console.log('🌐 [NETWORK RESPONSE] Response received:', params?.response?.url);
                await this.handleNetworkResponse(tabId, params);
            } else {
                console.log('🔍 [OTHER EVENT]', method, 'URL:', params?.request?.url || params?.response?.url || 'N/A');
            }
        } catch (error) {
            console.error('🚨 Debugger event error:', error);
        }
    }

    async handleRequestPaused(tabId, params) {
        try {
            const { requestId, request } = params;
            const { url } = request;

            console.log('🔍 [MOCK LOOKUP] Starting mock lookup for URL:', url);

            // Check if we have a mock for this URL
            const mocks = await this.mockStorage.getAllMocks();
            console.log('🔍 [MOCK LOOKUP] Found', Object.keys(mocks).length, 'total mocks in storage');
            console.log('🔍 [MOCK LOOKUP] All mock URLs:', Object.keys(mocks));

            // Check for exact URL match
            const mockData = mocks[url];
            console.log('🔍 [MOCK LOOKUP] Exact match for', url, ':', !!mockData);

            if (mockData) {
                console.log('🔍 [MOCK LOOKUP] ✅ Mock found:', {
                    url: mockData.url,
                    method: mockData.method,
                    status: mockData.status,
                    responseLength: mockData.response?.length || 0,
                });
            } else {
                console.log('🔍 [MOCK LOOKUP] ❌ No exact match found');
                console.log('🔍 [MOCK LOOKUP] URL comparison:');
                console.log('  Intercepted:', url);
                Object.keys(mocks).forEach((mockUrl, index) => {
                    console.log(`  Mock ${index + 1}:     ${mockUrl}`);
                    console.log(`  Match:       ${url === mockUrl ? '✅ YES' : '❌ NO'}`);
                });
            }

            // Check if mocking is enabled
            const mockingEnabled = await this.isMockingEnabled(tabId);
            console.log('🔍 [MOCK LOOKUP] Mocking enabled:', mockingEnabled);

            if (mockData && mockingEnabled) {
                console.log('🎭 [MOCK RESPONSE] Providing mock response for:', url);

                // Capture the original request headers for analysis
                const originalRequestHeaders = request.headers || {};
                console.log('📋 [HEADERS] Original request headers:', originalRequestHeaders);

                // Create response headers by mirroring real API behavior
                const responseHeaders = this.createRealisticResponseHeaders(originalRequestHeaders, mockData, url);

                const mockResponse = {
                    responseCode: mockData.status || 200,
                    responseHeaders: this.formatHeaders(responseHeaders),
                    body: btoa(mockData.response || ''),
                };

                console.log('📋 [HEADERS] Response headers created:', Object.keys(responseHeaders));

                console.log('🎭 [MOCK RESPONSE] Mock details:', {
                    status: mockResponse.responseCode,
                    headerCount: mockResponse.responseHeaders.length,
                    bodyLength: mockResponse.body.length,
                });

                // Fulfill with mock
                await chrome.debugger.sendCommand({ tabId }, 'Fetch.fulfillRequest', {
                    requestId,
                    ...mockResponse,
                });

                console.log('✅ [SUCCESS] Mock response sent successfully');

                // Notify DevTools
                this.notifyDevTools(tabId, 'MOCK_USED', { url, mockData });
            } else {
                console.log('🔄 [CONTINUE] No mock found or mocking disabled, continuing with real request');
                console.log('🔄 [CONTINUE] Reason:', !mockData ? 'No mock found' : 'Mocking disabled');

                // Continue with real request
                await chrome.debugger.sendCommand({ tabId }, 'Fetch.continueRequest', {
                    requestId,
                });

                console.log('🔄 [CONTINUE] Real request continued - will hit AWS API');
            }
        } catch (error) {
            console.error('🚨 Failed to handle paused request:', error);

            // Fallback: continue request
            try {
                await chrome.debugger.sendCommand({ tabId }, 'Fetch.continueRequest', {
                    requestId: params.requestId,
                });
                console.log('🔄 [FALLBACK] Request continued after error');
            } catch (fallbackError) {
                console.error('🚨 Fallback continue request failed:', fallbackError);
            }
        }
    }

    async handleNetworkRequest(tabId, params) {
        // Forward network request data to DevTools panel
        this.notifyDevTools(tabId, 'NETWORK_REQUEST', params);
    }

    async handleNetworkResponse(tabId, params) {
        // Forward network response data to DevTools panel
        this.notifyDevTools(tabId, 'NETWORK_RESPONSE', params);
    }

    handleDebuggerDetach(source, reason) {
        console.log('🐵 Debugger detached:', source.tabId, 'reason:', reason);
        this.debuggerSessions.delete(source.tabId);
    }

    async getAllMocks() {
        try {
            return await this.mockStorage.getAllMocks();
        } catch (error) {
            console.error('🚨 Failed to get mocks:', error);
            return {};
        }
    }

    async isMockingEnabled(tabId) {
        try {
            const result = await chrome.storage.local.get(['mockmonkey_settings']);
            const settings = result.mockmonkey_settings || {};
            return settings.enableMocking !== false; // Default to true
        } catch (error) {
            console.error('🚨 Failed to check mocking status:', error);
            return false;
        }
    }

    async enableMocking(tabId, enabled) {
        try {
            if (enabled) {
                // Attach debugger when enabling mocking
                return await this.attachDebugger(tabId);
            }
            // Detach debugger when disabling mocking
            return await this.detachDebugger(tabId);
        } catch (error) {
            console.error('🚨 Failed to enable/disable mocking:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Create realistic response headers by analyzing the original request
     */
    createRealisticResponseHeaders(originalRequestHeaders, mockData, url) {
        console.log('📋 [HEADER ANALYSIS] Creating response headers for:', url);

        // Start with basic response headers that AWS APIs typically return
        const responseHeaders = {
            // Content headers based on mock data
            'Content-Type': this.determineContentType(mockData.response, mockData.headers),
            'Content-Length': String((mockData.response || '').length),

            // CORS headers - essential for browser compatibility
            'Access-Control-Allow-Origin': this.determineCorsOrigin(originalRequestHeaders),
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD',
            'Access-Control-Allow-Headers': this.determineCorsHeaders(originalRequestHeaders),
            'Access-Control-Max-Age': '86400',

            // Cache control
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0',

            // Security headers that AWS typically includes
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',

            // AWS-specific headers for realism
            'x-amzn-RequestId': this.generateRequestId(),
            'x-amz-apigw-id': this.generateApiGatewayId(),
            Date: new Date().toUTCString(),
            Server: 'CloudFront',
        };

        // Analyze the original request to add more realistic headers
        this.addRequestSpecificHeaders(responseHeaders, originalRequestHeaders, url);

        // Merge with user-defined headers (user headers take precedence)
        const userHeaders = mockData.headers || {};
        Object.keys(userHeaders).forEach((key) => {
            responseHeaders[key] = userHeaders[key];
        });

        console.log('📋 [HEADER ANALYSIS] Created headers:', {
            total: Object.keys(responseHeaders).length,
            corsEnabled: !!responseHeaders['Access-Control-Allow-Origin'],
            userOverrides: Object.keys(userHeaders).length,
        });

        return responseHeaders;
    }

    determineCorsOrigin(requestHeaders) {
        // Look for Origin header in the request
        const originHeader = Object.keys(requestHeaders).find((key) => key.toLowerCase() === 'origin');

        if (originHeader && requestHeaders[originHeader]) {
            // Return the specific origin that made the request
            return requestHeaders[originHeader];
        }

        // Fallback to wildcard (less secure but more compatible)
        return '*';
    }

    determineCorsHeaders(requestHeaders) {
        // Look for Access-Control-Request-Headers in preflight requests
        const requestHeadersKey = Object.keys(requestHeaders).find(
            (key) => key.toLowerCase() === 'access-control-request-headers',
        );

        if (requestHeadersKey && requestHeaders[requestHeadersKey]) {
            // Return exactly what was requested
            return requestHeaders[requestHeadersKey];
        }

        // Default comprehensive set
        return 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-Amz-Target, X-Amz-Date, X-Amz-Security-Token';
    }

    determineContentType(response, userHeaders) {
        // Check if user specified content-type
        if (userHeaders) {
            const userContentType = Object.keys(userHeaders).find((key) => key.toLowerCase() === 'content-type');
            if (userContentType) {
                return userHeaders[userContentType];
            }
        }

        // Auto-detect based on response content
        if (!response) return 'application/json';

        try {
            JSON.parse(response);
            return 'application/json; charset=utf-8';
        } catch {
            // Check if it looks like XML
            if (response.trim().startsWith('<')) {
                return 'application/xml; charset=utf-8';
            }
            // Default to text
            return 'text/plain; charset=utf-8';
        }
    }

    addRequestSpecificHeaders(responseHeaders, requestHeaders, url) {
        // Add headers based on the URL pattern
        if (url.includes('amazonaws.com') || url.includes('.aws')) {
            // AWS-specific headers
            responseHeaders['x-amzn-trace-id'] = `Root=1-${Math.floor(Date.now() / 1000).toString(
                16,
            )}-${this.generateHex(24)}`;

            if (url.includes('control-tower')) {
                responseHeaders['x-amzn-service'] = 'controltower';
            }
        }

        // Mirror certain request headers as response headers if they exist
        const headersToMirror = ['x-requested-with', 'x-forwarded-for'];
        headersToMirror.forEach((headerName) => {
            const requestKey = Object.keys(requestHeaders).find((key) => key.toLowerCase() === headerName);
            if (requestKey) {
                responseHeaders[`x-mirrored-${headerName}`] = requestHeaders[requestKey];
            }
        });
    }

    generateRequestId() {
        // Generate AWS-style request ID
        return [
            this.generateHex(8),
            this.generateHex(4),
            this.generateHex(4),
            this.generateHex(4),
            this.generateHex(12),
        ].join('-');
    }

    generateApiGatewayId() {
        // Generate API Gateway-style ID
        return this.generateHex(10).toUpperCase();
    }

    generateHex(length) {
        return Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    }

    formatHeaders(headers) {
        return Object.entries(headers).map(([name, value]) => ({
            name,
            value: typeof value === 'string' ? value : String(value),
        }));
    }

    notifyDevTools(tabId, type, data) {
        try {
            // Send message to DevTools panel
            chrome.runtime.sendMessage({
                type,
                tabId,
                data,
            });
        } catch (error) {
            // DevTools might not be open, ignore
            console.debug('🐵 DevTools not available for notification');
        }
    }

    async showWelcome() {
        try {
            // Show welcome page or notification
            await chrome.tabs.create({
                url: chrome.runtime.getURL('popup/popup.html'),
            });
        } catch (error) {
            console.error('🚨 Failed to show welcome:', error);
        }
    }

    // Utility methods
    async getTabInfo(tabId) {
        try {
            return await chrome.tabs.get(tabId);
        } catch (error) {
            console.error('🚨 Failed to get tab info:', error);
            return null;
        }
    }

    async executeScript(tabId, script) {
        try {
            return await chrome.scripting.executeScript({
                target: { tabId },
                func: script,
            });
        } catch (error) {
            console.error('🚨 Failed to execute script:', error);
            return null;
        }
    }

    /**
     * Update declarativeNetRequest rules with debouncing
     */
    async updateDeclarativeNetRequestRules() {
        try {
            const now = Date.now();

            // Debounce updates to prevent spam
            if (now - this.lastMockUpdateTime < this.mockUpdateDebounceMs) {
                console.log('🌐 Debouncing declarativeNetRequest update');
                return { success: true, debounced: true };
            }

            this.lastMockUpdateTime = now;

            // Get all current mocks
            const mocks = await this.mockStorage.getAllMocks();

            // Update declarativeNetRequest rules
            const result = await this.declarativeNetRequestManager.updateMockRules(mocks);

            // Notify content scripts about fallback URLs
            if (result.fallbackUrls.length > 0) {
                await this.notifyContentScriptsAboutFallbacks(result.fallbackUrls, mocks);
            }

            console.log('🌐 DeclarativeNetRequest rules updated:', result);

            return {
                success: true,
                ...result,
                timestamp: now,
            };
        } catch (error) {
            console.error('🚨 Failed to update declarativeNetRequest rules:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get status of declarativeNetRequest system
     */
    async getDeclarativeNetRequestStatus() {
        try {
            const status = await this.declarativeNetRequestManager.getStatus();
            const mocks = await this.mockStorage.getAllMocks();

            return {
                success: true,
                ...status,
                totalMocks: Object.keys(mocks).length,
                coverage: status.activeRulesCount / Object.keys(mocks).length,
            };
        } catch (error) {
            console.error('🚨 Failed to get declarativeNetRequest status:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Notify content scripts about URLs that need JavaScript fallback
     */
    async notifyContentScriptsAboutFallbacks(fallbackUrls, allMocks) {
        try {
            // Get all active tabs
            const tabs = await chrome.tabs.query({});

            for (const tab of tabs) {
                if (tab.id && tab.url && !tab.url.startsWith('chrome://')) {
                    try {
                        // Send message to content script about fallback mocks
                        await chrome.tabs.sendMessage(tab.id, {
                            type: 'UPDATE_STEALTH_MOCKS',
                            mocks: this.extractFallbackMocks(fallbackUrls, allMocks),
                            enabled: await this.isMockingEnabled(tab.id),
                        });
                    } catch (error) {
                        // Tab might not have content script loaded, ignore
                        console.debug('🐵 Could not notify tab', tab.id, '- no content script');
                    }
                }
            }

            console.log('🌐 Notified content scripts about', fallbackUrls.length, 'fallback mocks');
        } catch (error) {
            console.warn('🚨 Failed to notify content scripts about fallbacks:', error);
        }
    }

    /**
     * Extract mocks that need JavaScript fallback
     */
    extractFallbackMocks(fallbackUrls, allMocks) {
        const fallbackMocks = {};

        fallbackUrls.forEach((url) => {
            if (allMocks[url]) {
                fallbackMocks[url] = allMocks[url];
            }
        });

        return fallbackMocks;
    }

    /**
     * Handle mock request (called when mocks are saved/deleted)
     */
    async handleMockRequest(data) {
        try {
            console.log('🐵 Handling mock request:', data);

            // Trigger declarativeNetRequest rules update
            const updateResult = await this.updateDeclarativeNetRequestRules();

            return {
                success: true,
                mockHandled: true,
                declarativeNetRequestUpdate: updateResult,
            };
        } catch (error) {
            console.error('🚨 Failed to handle mock request:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Network service message handlers
     */
    handleNetworkRequestIntercepted(data) {
        console.log('🌐 Network request intercepted:', data);

        // Forward to DevTools for display
        this.notifyDevTools(data.tabId, 'NETWORK_REQUEST_INTERCEPTED', data);

        return { success: true, processed: true };
    }

    handleNetworkResponseIntercepted(data) {
        console.log('🌐 Network response intercepted:', data);

        // Forward to DevTools for display
        this.notifyDevTools(data.tabId || null, 'NETWORK_RESPONSE_INTERCEPTED', data);

        return { success: true, processed: true };
    }

    handleRuleMatchedDebug(data) {
        console.log('🎯 Rule matched (debug):', data);

        // Forward to DevTools for display
        this.notifyDevTools(data.tabId, 'RULE_MATCHED_DEBUG', data);

        return { success: true, processed: true };
    }

    handleMockIntercepted(data) {
        console.log('🎭 Mock intercepted:', data);

        // Update statistics
        this.updateMockStatistics(data.url, data.ruleId);

        // Forward to DevTools for display
        this.notifyDevTools(data.tabId, 'MOCK_INTERCEPTED', data);

        return { success: true, processed: true };
    }

    handleNetworkRequestError(data) {
        console.log('🚨 Network request error:', data);

        // Forward to DevTools for display
        this.notifyDevTools(data.tabId, 'NETWORK_REQUEST_ERROR', data);

        return { success: true, processed: true };
    }

    /**
     * Legacy message handlers (for backward compatibility)
     */
    handleLegacyNetworkRequest(data) {
        console.log('🔄 Legacy network request:', data);

        // Convert to modern format and forward
        const modernData = {
            requestId: data.requestId || `legacy_${Date.now()}`,
            url: data.url,
            method: data.method || 'GET',
            timestamp: Date.now(),
            legacy: true,
        };

        this.notifyDevTools(data.tabId, 'NETWORK_REQUEST', modernData);

        return { success: true, processed: true, converted: true };
    }

    handleLegacyNetworkResponseContent(data) {
        console.log('🔄 Legacy network response content:', data);

        // Convert to modern format and forward
        const modernData = {
            url: data.url,
            content: data.content,
            encoding: data.encoding || 'utf8',
            timestamp: Date.now(),
            legacy: true,
        };

        this.notifyDevTools(data.tabId, 'NETWORK_RESPONSE_CONTENT', modernData);

        return { success: true, processed: true, converted: true };
    }

    /**
     * Content script lifecycle handlers
     */
    handleContentScriptReady(data) {
        console.log('🐵 Content script ready:', data);

        // Track content script readiness
        this.notifyDevTools(data.tabId, 'CONTENT_SCRIPT_READY', data);

        return { success: true, acknowledged: true };
    }

    handleStealthInterceptorReady(data) {
        console.log('🥷 Stealth interceptor ready:', data);

        // Track stealth interceptor readiness
        this.notifyDevTools(data.tabId, 'STEALTH_INTERCEPTOR_READY', data);

        return { success: true, acknowledged: true };
    }

    handleNavigation(data) {
        console.log('🧭 Navigation event:', data);

        // Handle navigation events (page changes, etc.)
        this.notifyDevTools(data.tabId, 'NAVIGATION', data);

        return { success: true, processed: true };
    }

    /**
     * Content script logging handlers
     */
    handleNetworkRequestLog(data) {
        console.log('📝 Network request log:', data);

        // Forward to DevTools for display
        this.notifyDevTools(data.tabId, 'NETWORK_REQUEST_LOG', data);

        return { success: true, logged: true };
    }

    handleNetworkResponseLog(data) {
        console.log('📝 Network response log:', data);

        // Forward to DevTools for display
        this.notifyDevTools(data.tabId, 'NETWORK_RESPONSE_LOG', data);

        return { success: true, logged: true };
    }

    handleNetworkErrorLog(data) {
        console.log('📝 Network error log:', data);

        // Forward to DevTools for display
        this.notifyDevTools(data.tabId, 'NETWORK_ERROR_LOG', data);

        return { success: true, logged: true };
    }

    handleStealthNetworkRequestLog(data) {
        console.log('🥷 Stealth network request log:', data);

        // Forward to DevTools for display
        this.notifyDevTools(data.tabId, 'STEALTH_NETWORK_REQUEST_LOG', data);

        return { success: true, logged: true };
    }

    handleStealthNetworkResponseLog(data) {
        console.log('🥷 Stealth network response log:', data);

        // Forward to DevTools for display
        this.notifyDevTools(data.tabId, 'STEALTH_NETWORK_RESPONSE_LOG', data);

        return { success: true, logged: true };
    }

    handleStealthNetworkErrorLog(data) {
        console.log('🥷 Stealth network error log:', data);

        // Forward to DevTools for display
        this.notifyDevTools(data.tabId, 'STEALTH_NETWORK_ERROR_LOG', data);

        return { success: true, logged: true };
    }

    /**
     * Update mock usage statistics
     */
    async updateMockStatistics(url, ruleId) {
        try {
            // Update usage count for the mock
            const key = `mockmonkey_mock_${btoa(url)}`;
            const result = await chrome.storage.local.get([key]);
            const mockData = result[key];

            if (mockData) {
                mockData.lastUsed = Date.now();
                mockData.useCount = (mockData.useCount || 0) + 1;

                await chrome.storage.local.set({ [key]: mockData });
                console.log('📊 Updated mock usage statistics for:', url);
            }
        } catch (error) {
            console.warn('🚨 Failed to update mock statistics:', error);
        }
    }

    /**
     * Get response content from debugger session cache
     */
    async getDebuggerResponseContent(data) {
        try {
            const { url } = data;

            // Check cache for content
            const cached = this.responseContentCache.get(url);
            if (cached && Date.now() - cached.timestamp < this.contentCacheTimeout) {
                console.log('📥 Response content found in cache for:', url);
                return {
                    success: true,
                    content: cached.content,
                    encoding: cached.encoding,
                    source: 'cache',
                };
            }

            console.log('❌ No cached response content for:', url);
            return { success: false, error: 'No cached content available' };
        } catch (error) {
            console.error('🚨 Failed to get debugger response content:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Request response content from network or cache
     */
    async requestResponseContent(data) {
        try {
            const { url, tabId } = data;

            // First try cache
            const cached = this.responseContentCache.get(url);
            if (cached && Date.now() - cached.timestamp < this.contentCacheTimeout) {
                console.log('📥 Response content served from cache for:', url);
                return {
                    success: true,
                    content: cached.content,
                    encoding: cached.encoding,
                    source: 'cache',
                };
            }

            // If no cache, check if we can get it from current request map
            for (const [requestId, responseData] of this.requestResponseMap) {
                if (responseData.url === url) {
                    console.log('📥 Response content found in request map for:', url);
                    return {
                        success: true,
                        content: responseData.content,
                        encoding: responseData.encoding || 'utf8',
                        source: 'request-map',
                    };
                }
            }

            console.log('❌ No response content available for:', url);
            return {
                success: false,
                error: 'No response content available',
                note: 'Content may be intercepted by debugger session',
            };
        } catch (error) {
            console.error('🚨 Failed to request response content:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * DEBUG: Comprehensive mocking diagnosis
     */
    async debugMockingStatus(tabId) {
        console.log('🔍 [MOCKING DIAGNOSIS] Starting comprehensive debug...');

        // 1. Check debugger status
        const debuggerSession = this.debuggerSessions.get(tabId);
        console.log('🔍 [DEBUG] Debugger session:', debuggerSession);

        // 2. Check if mocking is enabled
        const mockingEnabled = await this.isMockingEnabled(tabId);
        console.log('🔍 [DEBUG] Mocking enabled:', mockingEnabled);

        // 3. Get all mocks
        const mocks = await this.getAllMocks();
        console.log('🔍 [DEBUG] All configured mocks:', mocks);
        console.log('🔍 [DEBUG] Mock count:', Object.keys(mocks).length);

        // 4. Check declarativeNetRequest rules
        const dnsStatus = await this.getDeclarativeNetRequestStatus();
        console.log('🔍 [DEBUG] DeclarativeNetRequest status:', dnsStatus);

        // 5. Check for specific AWS URLs
        const awsUrls = Object.keys(mocks).filter((url) => url.includes('control-tower.aws'));
        console.log('🔍 [DEBUG] AWS Control Tower mocks found:', awsUrls);

        // 6. Check current Chrome rules
        try {
            const chromeRules = await chrome.declarativeNetRequest.getDynamicRules();
            console.log('🔍 [DEBUG] Active Chrome rules:', chromeRules);
        } catch (error) {
            console.error('🔍 [DEBUG] Failed to get Chrome rules:', error);
        }

        return {
            debuggerSession,
            mockingEnabled,
            mockCount: Object.keys(mocks).length,
            awsUrlsFound: awsUrls.length,
            dnsStatus,
        };
    }

    // Health check
    isHealthy() {
        return {
            activeTabs: this.activeTabs.size,
            debuggerSessions: this.debuggerSessions.size,
            declarativeNetRequestRules: this.declarativeNetRequestManager.activeRules.size,
            networkService: !!this.networkService,
            timestamp: Date.now(),
        };
    }
}

// Initialize background service
const mockMonkeyBackground = new MockMonkeyBackground();

// Global error handler
globalThis.addEventListener('error', (error) => {
    console.error('🚨 Background service error:', error);
});

// Keep service worker alive
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Return true to indicate async response
    if (message.type === 'PING') {
        sendResponse({ pong: true, health: mockMonkeyBackground.isHealthy() });
        return false;
    }
    return true;
});

// Expose debug function globally for console access
globalThis.debugMockMonkey = async function (tabId) {
    console.log('🔍 [GLOBAL DEBUG] Called from console with tabId:', tabId);

    if (!tabId) {
        // Try to find active tab
        try {
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
            tabId = tabs[0]?.id;
            console.log('🔍 [GLOBAL DEBUG] Auto-detected tabId:', tabId);
        } catch (error) {
            console.error('🔍 [GLOBAL DEBUG] Failed to find active tab:', error);
            return;
        }
    }

    return mockMonkeyBackground.debugMockingStatus(tabId);
};

// Expose manual rules update function
globalThis.updateMockRules = async function () {
    console.log('🔍 [GLOBAL DEBUG] Manually triggering mock rules update...');
    return mockMonkeyBackground.updateDeclarativeNetRequestRules();
};

console.log('🐵 MockMonkey Background Service Worker loaded');
console.log('🔍 [DEBUG] Available console functions:');
console.log('  - debugMockMonkey(tabId) - Comprehensive mocking diagnosis');
console.log('  - updateMockRules() - Manually trigger rules update');
