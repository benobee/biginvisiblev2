/**
 * MockMonkey Content Script - Network Interceptor
 * Handles client-side network interception and mock injection
 */

class NetworkInterceptor {
    constructor() {
        this.isEnabled = false;
        this.mocks = new Map();
        this.originalFetch = null;
        this.originalXHROpen = null;
        this.originalXHRSend = null;
        this.requestCounter = 0;

        this.init();
    }

    async init() {
        console.log('🐵 MockMonkey Network Interceptor initializing...');

        // Load settings and mocks
        await this.loadSettings();
        await this.loadMocks();

        // Setup message listeners
        this.setupMessageListeners();

        // Setup network interception
        this.setupNetworkInterception();

        // Notify background that content script is ready
        this.notifyReady();
    }

    setupMessageListeners() {
        // Listen for messages from background script
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            this.handleMessage(message, sender, sendResponse);
            return true; // Keep channel open for async response
        });
    }

    async handleMessage(message, sender, sendResponse) {
        try {
            switch (message.type) {
                case 'ENABLE_MOCKING':
                    await this.enableMocking(message.enabled);
                    sendResponse({ success: true });
                    break;

                case 'UPDATE_MOCKS':
                    await this.updateMocks(message.mocks);
                    sendResponse({ success: true });
                    break;

                case 'RELOAD_SETTINGS':
                    await this.loadSettings();
                    sendResponse({ success: true });
                    break;

                case 'GET_STATUS':
                    sendResponse({
                        enabled: this.isEnabled,
                        mocksCount: this.mocks.size,
                        url: window.location.href,
                    });
                    break;

                default:
                    sendResponse({ success: false, error: 'Unknown message type' });
            }
        } catch (error) {
            console.error('🚨 Content script message error:', error);
            sendResponse({ success: false, error: error.message });
        }
    }

    async loadSettings() {
        try {
            const result = await chrome.storage.local.get(['mockmonkey_settings']);
            const settings = result.mockmonkey_settings || {};

            this.isEnabled = settings.enableMocking !== false;
            console.log('🐵 Content script settings loaded, mocking enabled:', this.isEnabled);
        } catch (error) {
            console.error('🚨 Failed to load settings:', error);
        }
    }

    async loadMocks() {
        try {
            const result = await chrome.storage.local.get(null);
            this.mocks.clear();

            Object.keys(result).forEach((key) => {
                if (key.startsWith('mockmonkey_mock_')) {
                    const mockData = result[key];
                    if (mockData && mockData.url) {
                        // Store with normalized URL as key
                        const normalizedUrl = this.normalizeUrl(mockData.url);
                        this.mocks.set(normalizedUrl, mockData);
                        // Also store with original URL in case normalization differs
                        this.mocks.set(mockData.url, mockData);
                    }
                }
            });

            console.log(`🐵 Loaded ${this.mocks.size} mocks for content script:`, Array.from(this.mocks.keys()));
        } catch (error) {
            console.error('🚨 Failed to load mocks:', error);
        }
    }

    async updateMocks(newMocks) {
        this.mocks.clear();
        if (newMocks && typeof newMocks === 'object') {
            Object.entries(newMocks).forEach(([url, mockData]) => {
                this.mocks.set(url, mockData);
            });
        }
        console.log(`🐵 Updated to ${this.mocks.size} mocks`);
    }

    setupNetworkInterception() {
        // Store original methods
        this.originalFetch = window.fetch;
        this.originalXHROpen = XMLHttpRequest.prototype.open;
        this.originalXHRSend = XMLHttpRequest.prototype.send;

        // Intercept fetch
        this.interceptFetch();

        // Intercept XMLHttpRequest
        this.interceptXHR();

        console.log('🐵 Network interception setup complete');
    }

    interceptFetch() {
        const { originalFetch } = this;
        const generateRequestId = this.generateRequestId.bind(this);
        const logRequest = this.logRequest.bind(this);
        const shouldMockRequest = this.shouldMockRequest.bind(this);
        const getMockForRequest = this.getMockForRequest.bind(this);
        const createMockResponse = this.createMockResponse.bind(this);
        const logResponse = this.logResponse.bind(this);
        const logError = this.logError.bind(this);
        const isEnabled = () => this.isEnabled;

        window.fetch = async function (input, init = {}) {
            const url = input instanceof Request ? input.url : input.toString();
            const method = init.method || (input instanceof Request ? input.method : 'GET');

            // Generate request ID
            const requestId = generateRequestId();

            // Log request
            logRequest(requestId, method, url, init);

            // Check for mock
            if (isEnabled() && shouldMockRequest(url, method)) {
                const mockData = getMockForRequest(url, method);
                if (mockData) {
                    console.log('🎭 Using mock for fetch request:', url);
                    return createMockResponse(mockData);
                }
            }

            // Execute original request
            try {
                const response = await originalFetch.apply(this, arguments);
                logResponse(requestId, response);
                return response;
            } catch (error) {
                logError(requestId, error);
                throw error;
            }
        };
    }

    interceptXHR() {
        const { originalXHROpen, originalXHRSend } = this;
        const generateRequestId = this.generateRequestId.bind(this);
        const logRequest = this.logRequest.bind(this);
        const shouldMockRequest = this.shouldMockRequest.bind(this);
        const getMockForRequest = this.getMockForRequest.bind(this);
        const simulateXHRResponse = this.simulateXHRResponse.bind(this);
        const logXHRResponse = this.logXHRResponse.bind(this);
        const logError = this.logError.bind(this);
        const isEnabled = () => this.isEnabled;

        XMLHttpRequest.prototype.open = function (method, url, async = true, user, password) {
            // Store request info
            this._mockMonkey = {
                requestId: generateRequestId(),
                method: method.toUpperCase(),
                url: url.toString(),
                async,
            };

            // Log request
            logRequest(this._mockMonkey.requestId, method, url, {});

            return originalXHROpen.apply(this, arguments);
        };

        XMLHttpRequest.prototype.send = function (body) {
            if (!this._mockMonkey) {
                return originalXHRSend.apply(this, arguments);
            }

            const { requestId, method, url } = this._mockMonkey;

            // Check for mock
            if (isEnabled() && shouldMockRequest(url, method)) {
                const mockData = getMockForRequest(url, method);
                if (mockData) {
                    console.log('🎭 Using mock for XHR request:', url);
                    simulateXHRResponse(this, mockData);
                    return;
                }
            }

            // Setup response logging
            const originalOnReadyStateChange = this.onreadystatechange;
            this.onreadystatechange = function () {
                if (this.readyState === 4) {
                    logXHRResponse(requestId, this);
                }

                if (originalOnReadyStateChange) {
                    originalOnReadyStateChange.apply(this, arguments);
                }
            };

            // Execute original send
            try {
                return originalXHRSend.apply(this, arguments);
            } catch (error) {
                logError(requestId, error);
                throw error;
            }
        };
    }

    normalizeUrl(url) {
        try {
            const urlObj = new URL(url);
            // Remove fragment and normalize
            urlObj.hash = '';
            // Sort query parameters for consistent matching
            urlObj.searchParams.sort();
            return urlObj.toString();
        } catch (error) {
            // If URL parsing fails, return original
            return url;
        }
    }

    shouldMockRequest(url, method) {
        // Try multiple URL variations for matching
        const variations = [
            url, // Original URL
            this.normalizeUrl(url), // Normalized URL
            url.split('?')[0], // URL without query params
            url.split('#')[0], // URL without fragment
        ];

        // Check if any variation has a mock
        for (const variation of variations) {
            if (this.mocks.has(variation)) {
                console.log(`🎯 Mock match found for ${url} using variation: ${variation}`);
                return true;
            }
        }

        console.log(`🔍 No mock found for ${url}. Available mocks:`, Array.from(this.mocks.keys()));
        return false;
    }

    getMockForRequest(url, method) {
        // Try the same URL variations as shouldMockRequest
        const variations = [
            url, // Original URL
            this.normalizeUrl(url), // Normalized URL
            url.split('?')[0], // URL without query params
            url.split('#')[0], // URL without fragment
        ];

        for (const variation of variations) {
            const mockData = this.mocks.get(variation);
            if (mockData) {
                // Check method matching if specified
                if (mockData.method && mockData.method !== method.toUpperCase()) {
                    console.log(
                        `🚫 Mock found for ${variation} but method mismatch: expected ${mockData.method}, got ${method}`,
                    );
                } else {
                    console.log(`✅ Using mock for ${url} (matched via ${variation}):`, mockData);
                    return mockData;
                }
            }
        }

        return null;
    }

    createMockResponse(mockData) {
        const response = mockData.response || '{}';
        const status = mockData.status || 200;
        const statusText = this.getStatusText(status);
        const headers = mockData.headers || { 'Content-Type': 'application/json' };

        // Add artificial delay if specified
        const delay = mockData.delay || 0;

        const mockResponse = new Response(response, {
            status,
            statusText,
            headers: new Headers(headers),
        });

        // Add mock identifier
        Object.defineProperty(mockResponse, '_isMocked', {
            value: true,
            writable: false,
        });

        if (delay > 0) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(mockResponse), delay);
            });
        }

        return Promise.resolve(mockResponse);
    }

    simulateXHRResponse(xhr, mockData) {
        const response = mockData.response || '{}';
        const status = mockData.status || 200;
        const statusText = this.getStatusText(status);
        const delay = mockData.delay || 0;

        setTimeout(() => {
            try {
                // Set response properties
                Object.defineProperty(xhr, 'status', { value: status, writable: false });
                Object.defineProperty(xhr, 'statusText', { value: statusText, writable: false });
                Object.defineProperty(xhr, 'responseText', { value: response, writable: false });
                Object.defineProperty(xhr, 'response', { value: response, writable: false });
                Object.defineProperty(xhr, 'readyState', { value: 4, writable: false });

                // Mark as mocked
                Object.defineProperty(xhr, '_isMocked', { value: true, writable: false });

                // Simulate state transitions
                [1, 2, 3, 4].forEach((state, index) => {
                    setTimeout(() => {
                        Object.defineProperty(xhr, 'readyState', { value: state, writable: false, configurable: true });

                        if (xhr.onreadystatechange) {
                            xhr.onreadystatechange();
                        }

                        // Fire load event on final state
                        if (state === 4) {
                            const loadEvent = new Event('load');
                            xhr.dispatchEvent(loadEvent);

                            if (xhr.onload) {
                                xhr.onload();
                            }
                        }
                    }, index * 10); // Small delays between state changes
                });
            } catch (error) {
                console.error('🚨 Error simulating XHR response:', error);

                // Fallback to error
                Object.defineProperty(xhr, 'status', { value: 500, writable: false });
                Object.defineProperty(xhr, 'statusText', { value: 'Mock Error', writable: false });
                Object.defineProperty(xhr, 'readyState', { value: 4, writable: false });

                if (xhr.onreadystatechange) {
                    xhr.onreadystatechange();
                }
            }
        }, delay);
    }

    getStatusText(status) {
        const statusTexts = {
            200: 'OK',
            201: 'Created',
            204: 'No Content',
            400: 'Bad Request',
            401: 'Unauthorized',
            403: 'Forbidden',
            404: 'Not Found',
            500: 'Internal Server Error',
            502: 'Bad Gateway',
            503: 'Service Unavailable',
        };
        return statusTexts[status] || 'Unknown';
    }

    generateRequestId() {
        this.requestCounter += 1;
        return `req_${Date.now()}_${this.requestCounter}`;
    }

    logRequest(requestId, method, url, options) {
        // Send to background for DevTools
        this.sendToBackground('NETWORK_REQUEST_LOG', {
            requestId,
            method,
            url,
            options,
            timestamp: Date.now(),
            source: 'content-script',
        });
    }

    logResponse(requestId, response) {
        this.sendToBackground('NETWORK_RESPONSE_LOG', {
            requestId,
            status: response.status,
            statusText: response.statusText,
            headers: this.headersToObject(response.headers),
            timestamp: Date.now(),
            isMocked: response._isMocked || false,
        });
    }

    logXHRResponse(requestId, xhr) {
        this.sendToBackground('NETWORK_RESPONSE_LOG', {
            requestId,
            status: xhr.status,
            statusText: xhr.statusText,
            responseText: xhr.responseText,
            timestamp: Date.now(),
            isMocked: xhr._isMocked || false,
        });
    }

    logError(requestId, error) {
        this.sendToBackground('NETWORK_ERROR_LOG', {
            requestId,
            error: error.message,
            timestamp: Date.now(),
        });
    }

    headersToObject(headers) {
        const obj = {};
        if (headers && headers.forEach) {
            headers.forEach((value, key) => {
                obj[key] = value;
            });
        }
        return obj;
    }

    sendToBackground(type, data) {
        try {
            chrome.runtime.sendMessage({
                type,
                data,
                tabId: chrome.devtools?.inspectedWindow?.tabId,
            });
        } catch (error) {
            // Extension might be reloading, ignore
            console.debug('🐵 Failed to send to background:', error.message);
        }
    }

    notifyReady() {
        this.sendToBackground('CONTENT_SCRIPT_READY', {
            url: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: Date.now(),
        });
    }

    async enableMocking(enabled) {
        this.isEnabled = enabled;
        console.log(`🐵 Mocking ${enabled ? 'enabled' : 'disabled'} in content script`);

        // Reload mocks when enabling
        if (enabled) {
            await this.loadMocks();
        }
    }

    // Cleanup method
    destroy() {
        if (this.originalFetch) {
            window.fetch = this.originalFetch;
        }

        if (this.originalXHROpen) {
            XMLHttpRequest.prototype.open = this.originalXHROpen;
        }

        if (this.originalXHRSend) {
            XMLHttpRequest.prototype.send = this.originalXHRSend;
        }

        console.log('🐵 MockMonkey Network Interceptor destroyed');
    }
}

// Initialize interceptor
let networkInterceptor = null;

// Initialize only if not already done
if (!window.mockMonkeyInitialized) {
    window.mockMonkeyInitialized = true;
    networkInterceptor = new NetworkInterceptor();

    // Make interceptor available globally for debugging
    window.MockMonkeyInterceptor = networkInterceptor;
}

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (networkInterceptor) {
        networkInterceptor.destroy();
    }
});

console.log('🐵 MockMonkey Content Script loaded');
