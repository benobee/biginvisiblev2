/**
 * MockMonkey Stealth Network Interceptor
 * Advanced content script interception with anti-detection features
 * Provides seamless operation across all environments like Tweak extension
 */

class MockMonkeyStealthInterceptor {
    constructor() {
        this.isEnabled = false;
        this.mocks = new Map();
        this.originalAPIs = new Map();
        this.requestCounter = 0;
        this.stealthMode = true;
        this.interceptedMethods = new Set();

        // Anti-detection features
        this.shouldMaskExtensionArtifacts = true;
        this.spoofUserAgent = false;
        this.removeExtensionHeaders = true;

        // Advanced interception targets
        this.interceptTargets = {
            fetch: true,
            xmlHttpRequest: true,
            webSocket: true,
            eventSource: true,
            navigator: false,
            serviceWorker: true,
        };

        this.init();
    }

    async init() {
        console.log('🥷 MockMonkey Stealth Interceptor initializing...');

        // Load settings first
        await this.loadSettings();
        await this.loadMocks();

        // Setup message listeners
        this.setupMessageListeners();

        // Setup advanced network interception
        this.setupAdvancedInterception();

        // Setup stealth features
        if (this.stealthMode) {
            this.enableStealthMode();
        }

        // Show startup message with mocking status
        this.showStartupMessage();

        // Notify background that stealth interceptor is ready
        this.notifyReady();
    }

    showStartupMessage() {
        const mockCount = this.mocks.size / 2; // Divided by 2 because we store both normalized and original URLs

        console.log(
            '%c🎭 MockMonkey Enhanced Interceptor Ready!',
            'color: #ff6b35; font-weight: bold; font-size: 16px; background: linear-gradient(45deg, #ff6b35, #f7931e); padding: 8px 16px; border-radius: 4px; color: white;',
        );
        console.log('%c📋 Status:', 'color: #4ecdc4; font-weight: bold; font-size: 14px;', {
            enabled: this.isEnabled,
            mocksLoaded: mockCount,
            stealthMode: this.stealthMode,
            interceptedAPIs: Array.from(this.interceptedMethods),
            url: window.location.href,
        });

        if (this.isEnabled && mockCount > 0) {
            console.log(
                '%c✅ Mocking Active - MockMonkey will intercept and log matching requests',
                'color: #26de81; font-weight: bold; font-size: 12px;',
            );
        } else if (!this.isEnabled) {
            console.log(
                '%c⚠️ Mocking Disabled - Enable mocking to see intercepted requests',
                'color: #fed330; font-weight: bold; font-size: 12px;',
            );
        } else {
            console.log(
                '%c📝 No Mocks Loaded - Add mocks via the MockMonkey DevTools panel',
                'color: #a55eea; font-weight: bold; font-size: 12px;',
            );
        }

        console.log(
            '%c💡 Tip: All intercepted requests will appear with 🎭 MockMonkey INTERCEPTED messages',
            'color: #778ca3; font-style: italic; font-size: 11px;',
        );
    }

    setupMessageListeners() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            this.handleMessage(message, sender, sendResponse);
            return true;
        });
    }

    async handleMessage(message, sender, sendResponse) {
        try {
            switch (message.type) {
                case 'ENABLE_STEALTH_MOCKING':
                    await this.enableStealthMocking(message.enabled);
                    sendResponse({ success: true });
                    break;

                case 'UPDATE_STEALTH_MOCKS':
                    await this.updateMocks(message.mocks);
                    sendResponse({ success: true });
                    break;

                case 'TOGGLE_STEALTH_MODE':
                    this.toggleStealthMode(message.enabled);
                    sendResponse({ success: true });
                    break;

                case 'MODIFY_REQUEST_HEADERS':
                    this.setupRequestModification(message.url, message.modifications);
                    sendResponse({ success: true });
                    break;

                case 'GET_INTERCEPTION_STATUS':
                    sendResponse({
                        enabled: this.isEnabled,
                        stealthMode: this.stealthMode,
                        mocksCount: this.mocks.size,
                        interceptedMethods: Array.from(this.interceptedMethods),
                        url: window.location.href,
                    });
                    break;

                default:
                    sendResponse({ success: false, error: 'Unknown message type' });
            }
        } catch (error) {
            console.error('🚨 Stealth interceptor message error:', error);
            sendResponse({ success: false, error: error.message });
        }
    }

    async loadSettings() {
        try {
            const result = await chrome.storage.local.get(['mockmonkey_settings']);
            const settings = result.mockmonkey_settings || {};

            this.isEnabled = settings.enableMocking !== false;
            this.stealthMode = settings.stealthMode !== false;
            this.shouldMaskExtensionArtifacts = settings.maskExtensionArtifacts !== false;
            this.spoofUserAgent = settings.spoofUserAgent === true;
            this.removeExtensionHeaders = settings.removeExtensionHeaders !== false;

            console.log('🥷 Stealth settings loaded:', {
                enabled: this.isEnabled,
                stealthMode: this.stealthMode,
                shouldMaskExtensionArtifacts: this.shouldMaskExtensionArtifacts,
            });
        } catch (error) {
            console.error('🚨 Failed to load stealth settings:', error);
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
                        const normalizedUrl = this.normalizeUrl(mockData.url);
                        this.mocks.set(normalizedUrl, mockData);
                        this.mocks.set(mockData.url, mockData);
                    }
                }
            });

            console.log(`🥷 Loaded ${this.mocks.size} stealth mocks`);
        } catch (error) {
            console.error('🚨 Failed to load stealth mocks:', error);
        }
    }

    setupAdvancedInterception() {
        // Store original APIs before any modification
        this.backupOriginalAPIs();

        // Setup fetch interception with stealth features
        if (this.interceptTargets.fetch) {
            this.interceptFetch();
        }

        // Setup XMLHttpRequest interception
        if (this.interceptTargets.xmlHttpRequest) {
            this.interceptXMLHttpRequest();
        }

        // Setup WebSocket interception
        if (this.interceptTargets.webSocket) {
            this.interceptWebSocket();
        }

        // Setup EventSource interception
        if (this.interceptTargets.eventSource) {
            this.interceptEventSource();
        }

        // Setup Service Worker interception
        if (this.interceptTargets.serviceWorker) {
            this.interceptServiceWorker();
        }

        console.log('🥷 Advanced interception setup complete');
    }

    backupOriginalAPIs() {
        // Store references to original APIs
        this.originalAPIs.set('fetch', window.fetch);
        this.originalAPIs.set('XMLHttpRequest', window.XMLHttpRequest);
        this.originalAPIs.set('WebSocket', window.WebSocket);
        this.originalAPIs.set('EventSource', window.EventSource);

        // Store prototype methods
        this.originalAPIs.set('XHR.prototype.open', XMLHttpRequest.prototype.open);
        this.originalAPIs.set('XHR.prototype.send', XMLHttpRequest.prototype.send);
        this.originalAPIs.set('XHR.prototype.setRequestHeader', XMLHttpRequest.prototype.setRequestHeader);
    }

    interceptFetch() {
        const originalFetch = this.originalAPIs.get('fetch');
        const self = this;

        // Create stealth fetch wrapper
        function stealthFetch(input, init = {}) {
            const url = input instanceof Request ? input.url : input.toString();
            const method = init.method || (input instanceof Request ? input.method : 'GET');

            // Generate request ID for tracking
            const requestId = self.generateRequestId();

            // Log request in stealth mode
            self.logStealthRequest(requestId, method, url, init);

            // Check for mock with advanced matching
            if (self.isEnabled && self.shouldMockRequest(url, method)) {
                const mockData = self.getMockForRequest(url, method);
                if (mockData) {
                    console.log(
                        '%c🎭 MockMonkey INTERCEPTED FETCH:',
                        'color: #ff6b35; font-weight: bold; font-size: 14px;',
                        url,
                    );
                    console.log('%c📦 Using Mock Response:', 'color: #4ecdc4; font-weight: bold;', {
                        url,
                        method,
                        status: mockData.status || 200,
                        mockData,
                    });

                    // Additional prominent success logging
                    console.log(
                        '%c✅ MOCK SUCCESSFULLY RETURNED',
                        'color: #26de81; font-weight: bold; font-size: 16px; background: #26de81; color: white; padding: 4px 8px; border-radius: 4px;',
                    );

                    return self.createStealthMockResponse(mockData, url, method);
                }
            }

            // Apply request modifications
            const modifiedInit = self.applyRequestModifications(url, init);

            // Apply stealth modifications
            const stealthInit = self.applyStealthModifications(url, modifiedInit);

            // Execute original fetch with modifications
            return originalFetch
                .apply(this, [input, stealthInit])
                .then((response) => {
                    self.logStealthResponse(requestId, response);
                    return self.applyResponseModifications(response);
                })
                .catch((error) => {
                    self.logStealthError(requestId, error);
                    throw error;
                });
        }

        // Apply stealth wrapping
        Object.defineProperty(stealthFetch, 'name', { value: 'fetch' });
        Object.defineProperty(stealthFetch, 'length', { value: originalFetch.length });

        // Replace global fetch
        window.fetch = stealthFetch;
        this.interceptedMethods.add('fetch');

        // Also intercept in Worker contexts if available
        if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
            self.fetch = stealthFetch;
        }
    }

    interceptXMLHttpRequest() {
        const originalXHR = this.originalAPIs.get('XMLHttpRequest');
        const originalOpen = this.originalAPIs.get('XHR.prototype.open');
        const originalSend = this.originalAPIs.get('XHR.prototype.send');
        const originalSetRequestHeader = this.originalAPIs.get('XHR.prototype.setRequestHeader');
        const self = this;

        // Enhanced XMLHttpRequest wrapper
        function StealthXMLHttpRequest() {
            const xhr = new originalXHR();
            const requestInfo = {
                id: self.generateRequestId(),
                method: null,
                url: null,
                headers: new Map(),
                modifications: new Map(),
            };

            // Override open method
            xhr.open = function (method, url, async = true, user, password) {
                requestInfo.method = method.toUpperCase();
                requestInfo.url = url.toString();

                self.logStealthRequest(requestInfo.id, method, url, {});

                return originalOpen.apply(this, arguments);
            };

            // Override setRequestHeader
            xhr.setRequestHeader = function (name, value) {
                requestInfo.headers.set(name, value);

                // Apply stealth header modifications
                const modifiedHeaders = self.applyStealthHeaderModifications(requestInfo.url, name, value);

                if (modifiedHeaders) {
                    return originalSetRequestHeader.apply(this, [modifiedHeaders.name, modifiedHeaders.value]);
                }

                return originalSetRequestHeader.apply(this, arguments);
            };

            // Override send method
            xhr.send = function (body) {
                const { method, url } = requestInfo;

                // Check for mock
                if (self.isEnabled && self.shouldMockRequest(url, method)) {
                    const mockData = self.getMockForRequest(url, method);
                    if (mockData) {
                        console.log(
                            '%c🎭 MockMonkey INTERCEPTED XHR:',
                            'color: #ff6b35; font-weight: bold; font-size: 14px;',
                            url,
                        );
                        console.log('%c📦 Using Mock Response:', 'color: #4ecdc4; font-weight: bold;', {
                            url,
                            method,
                            status: mockData.status || 200,
                            mockData,
                        });

                        // Additional prominent success logging
                        console.log(
                            '%c✅ MOCK SUCCESSFULLY RETURNED',
                            'color: #26de81; font-weight: bold; font-size: 16px; background: #26de81; color: white; padding: 4px 8px; border-radius: 4px;',
                        );

                        self.simulateStealthXHRResponse(this, mockData);
                        return;
                    }
                }

                // Setup response interceptor
                const originalOnReadyStateChange = this.onreadystatechange;
                this.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        self.logStealthResponse(requestInfo.id, this);
                    }

                    if (originalOnReadyStateChange) {
                        originalOnReadyStateChange.apply(this, arguments);
                    }
                };

                return originalSend.apply(this, arguments);
            };

            return xhr;
        }

        // Copy static methods and properties
        Object.setPrototypeOf(StealthXMLHttpRequest, originalXHR);
        Object.setPrototypeOf(StealthXMLHttpRequest.prototype, originalXHR.prototype);

        // Copy constants safely (avoiding read-only properties)
        Object.getOwnPropertyNames(originalXHR).forEach((prop) => {
            // Skip function-specific read-only properties
            const skipProperties = ['length', 'name', 'prototype', 'caller', 'arguments'];
            if (skipProperties.includes(prop)) {
                return;
            }

            try {
                const descriptor = Object.getOwnPropertyDescriptor(originalXHR, prop);
                if (descriptor && typeof originalXHR[prop] !== 'function' && descriptor.writable !== false) {
                    StealthXMLHttpRequest[prop] = originalXHR[prop];
                }
            } catch (error) {
                // Silently skip properties that cannot be copied
                console.debug('🥷 Skipped copying read-only property:', prop);
            }
        });

        // Replace global XMLHttpRequest
        window.XMLHttpRequest = StealthXMLHttpRequest;
        this.interceptedMethods.add('XMLHttpRequest');
    }

    interceptWebSocket() {
        const originalWebSocket = this.originalAPIs.get('WebSocket');
        const self = this;

        function StealthWebSocket(url, protocols) {
            const requestId = self.generateRequestId();

            console.log('🥷 WebSocket connection intercepted:', url);

            // Check for WebSocket mocks
            if (self.isEnabled && self.shouldMockWebSocket(url)) {
                return self.createMockWebSocket(url, protocols);
            }

            // Apply stealth modifications to WebSocket URL
            const modifiedUrl = self.applyWebSocketModifications(url);

            const ws = new originalWebSocket(modifiedUrl, protocols);

            // Add stealth event listeners
            ws.addEventListener('open', () => {
                self.logStealthWebSocketEvent(requestId, 'open', url);
            });

            ws.addEventListener('message', (event) => {
                self.logStealthWebSocketEvent(requestId, 'message', url, event.data);
            });

            return ws;
        }

        // Copy properties
        Object.setPrototypeOf(StealthWebSocket, originalWebSocket);
        Object.setPrototypeOf(StealthWebSocket.prototype, originalWebSocket.prototype);

        window.WebSocket = StealthWebSocket;
        this.interceptedMethods.add('WebSocket');
    }

    interceptEventSource() {
        const originalEventSource = window.EventSource;
        const self = this;

        if (!originalEventSource) return;

        function StealthEventSource(url, eventSourceInitDict) {
            const requestId = self.generateRequestId();

            console.log('🥷 EventSource connection intercepted:', url);

            // Check for EventSource mocks
            if (self.isEnabled && self.shouldMockEventSource(url)) {
                return self.createMockEventSource(url, eventSourceInitDict);
            }

            const modifiedUrl = self.applyEventSourceModifications(url);
            const es = new originalEventSource(modifiedUrl, eventSourceInitDict);

            // Log events
            es.addEventListener('open', () => {
                self.logStealthEventSourceEvent(requestId, 'open', url);
            });

            es.addEventListener('message', (event) => {
                self.logStealthEventSourceEvent(requestId, 'message', url, event.data);
            });

            return es;
        }

        Object.setPrototypeOf(StealthEventSource, originalEventSource);
        Object.setPrototypeOf(StealthEventSource.prototype, originalEventSource.prototype);

        window.EventSource = StealthEventSource;
        this.interceptedMethods.add('EventSource');
    }

    interceptServiceWorker() {
        // Intercept service worker registration to monitor network requests
        if ('serviceWorker' in navigator) {
            const originalRegister = navigator.serviceWorker.register;
            const self = this;

            navigator.serviceWorker.register = function (scriptURL, options) {
                console.log('🥷 Service Worker registration intercepted:', scriptURL);

                // Apply stealth modifications to service worker
                const modifiedOptions = self.applyServiceWorkerModifications(scriptURL, options);

                return originalRegister.apply(this, [scriptURL, modifiedOptions]);
            };

            this.interceptedMethods.add('ServiceWorker');
        }
    }

    enableStealthMode() {
        console.log('🥷 Enabling stealth mode features...');

        // Remove extension detection markers
        if (this.shouldMaskExtensionArtifacts) {
            this.maskExtensionArtifacts();
        }

        // Spoof user agent if enabled
        if (this.spoofUserAgent) {
            this.setupUserAgentSpoofing();
        }

        // Setup DOM mutation observer to prevent extension detection
        this.setupDOMProtection();

        console.log('🥷 Stealth mode enabled');
    }

    maskExtensionArtifacts() {
        // Remove or mask chrome.runtime references
        try {
            Object.defineProperty(window, 'chrome', {
                get() {
                    // Return a limited chrome object to avoid detection
                    return {
                        runtime: undefined,
                        extension: undefined,
                    };
                },
                configurable: false,
            });
        } catch (error) {
            // Property might already be defined
            console.log('🥷 Chrome object already protected');
        }

        // Mask extension context
        try {
            delete window.chrome;
        } catch (error) {
            // Can't delete, try to override
        }

        // Remove extension-specific headers in requests
        this.setupHeaderMasking();
    }

    setupHeaderMasking() {
        // This will be handled in request modifications
        console.log('🥷 Header masking setup complete');
    }

    setupUserAgentSpoofing() {
        // Override navigator.userAgent
        try {
            Object.defineProperty(navigator, 'userAgent', {
                get() {
                    // Return a clean user agent without extension artifacts
                    return navigator.userAgent.replace(/\s+Chrome-Extension\/[\w\-]+/g, '');
                },
            });
        } catch (error) {
            console.log('🥷 User agent already protected');
        }
    }

    setupDOMProtection() {
        // Monitor DOM for extension detection attempts
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Remove extension-specific attributes or elements
                        this.cleanExtensionArtifacts(node);
                    }
                });
            });
        });

        observer.observe(document.body || document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
        });
    }

    cleanExtensionArtifacts(element) {
        // Remove extension-specific classes, IDs, or attributes
        const extensionMarkers = ['chrome-extension', 'mockmonkey', 'extension-', 'crx_'];

        extensionMarkers.forEach((marker) => {
            // Handle ID attributes
            if (element.id && typeof element.id === 'string' && element.id.includes(marker)) {
                element.removeAttribute('id');
            }

            // Handle className safely - use classList when available, fallback to string handling
            if (element.classList) {
                // Use modern classList API (works with all element types)
                Array.from(element.classList).forEach((className) => {
                    if (className.includes(marker)) {
                        element.classList.remove(className);
                    }
                });
            } else if (
                element.className &&
                typeof element.className === 'string' &&
                element.className.includes(marker)
            ) {
                // Fallback for elements without classList support
                element.className = element.className.replace(new RegExp(`${marker}[\\w\\-]*`, 'g'), '');
            }

            // Handle other potential extension attributes
            if (element.getAttribute) {
                ['data-extension', 'data-chrome-extension', 'data-mockmonkey'].forEach((attr) => {
                    if (element.hasAttribute(attr)) {
                        element.removeAttribute(attr);
                    }
                });
            }
        });
    }

    // Advanced request modification methods
    applyRequestModifications(url, init) {
        // Apply any stored request modifications
        const modifications = this.getRequestModifications(url);

        if (!modifications) return init;

        const modified = { ...init };

        // Modify headers
        if (modifications.headers) {
            modified.headers = { ...modified.headers, ...modifications.headers };
        }

        // Modify method
        if (modifications.method) {
            modified.method = modifications.method;
        }

        // Modify body
        if (modifications.body) {
            modified.body = modifications.body;
        }

        return modified;
    }

    applyStealthModifications(url, init) {
        const modified = { ...init };

        // Remove extension headers
        if (this.removeExtensionHeaders && modified.headers) {
            const headers = new Headers(modified.headers);

            // Remove common extension headers
            headers.delete('X-Chrome-Extension');
            headers.delete('X-Extension-ID');

            modified.headers = headers;
        }

        return modified;
    }

    applyStealthHeaderModifications(url, name, value) {
        // Block extension-specific headers
        const blockedHeaders = [
            'X-Chrome-Extension',
            'X-Extension-ID',
            'X-DevTools-Emulate-Network-Conditions-Client-Id',
        ];

        if (blockedHeaders.some((header) => name.toLowerCase().includes(header.toLowerCase()))) {
            return null; // Block this header
        }

        return { name, value };
    }

    // Mock response creation with stealth features
    createStealthMockResponse(mockData) {
        // Ensure response is properly stringified and compact
        let responseBody = mockData.response || '{}';
        if (typeof responseBody === 'object') {
            responseBody = JSON.stringify(responseBody);
        } else if (typeof responseBody === 'string') {
            try {
                // Re-parse and re-stringify to remove formatting
                const parsed = JSON.parse(responseBody);
                responseBody = JSON.stringify(parsed);
            } catch (error) {
                // If it's not JSON, use as-is (for non-JSON responses like HTML, text, etc.)
            }
        }

        const status = mockData.status || 200;
        const statusText = this.getStatusText(status);
        const headers = { ...mockData.headers };

        // Remove extension artifacts from mock response
        delete headers['X-MockMonkey'];
        delete headers['X-Extension'];

        // Add realistic headers
        if (!headers.Server) {
            headers.Server = 'nginx/1.18.0';
        }

        if (!headers.Date) {
            headers.Date = new Date().toUTCString();
        }

        const mockResponse = new Response(responseBody, {
            status,
            statusText,
            headers: new Headers(headers),
        });

        // Hide mock identifier in stealth mode
        if (!this.stealthMode) {
            Object.defineProperty(mockResponse, '_isMocked', {
                value: true,
                writable: false,
            });
        }

        const delay = mockData.delay || 0;
        if (delay > 0) {
            return new Promise((resolve) => setTimeout(() => resolve(mockResponse), delay));
        }

        return Promise.resolve(mockResponse);
    }

    simulateStealthXHRResponse(xhr, mockData) {
        // Ensure response is properly stringified and compact
        let responseBody = mockData.response || '{}';
        if (typeof responseBody === 'object') {
            responseBody = JSON.stringify(responseBody);
        } else if (typeof responseBody === 'string') {
            try {
                // Re-parse and re-stringify to remove formatting
                const parsed = JSON.parse(responseBody);
                responseBody = JSON.stringify(parsed);
            } catch (error) {
                // If it's not JSON, use as-is (for non-JSON responses like HTML, text, etc.)
            }
        }

        const status = mockData.status || 200;
        const statusText = this.getStatusText(status);
        const delay = mockData.delay || 0;

        setTimeout(() => {
            try {
                // Set response properties
                Object.defineProperty(xhr, 'status', { value: status, writable: false });
                Object.defineProperty(xhr, 'statusText', { value: statusText, writable: false });
                Object.defineProperty(xhr, 'responseText', { value: responseBody, writable: false });
                Object.defineProperty(xhr, 'response', { value: responseBody, writable: false });
                Object.defineProperty(xhr, 'readyState', { value: 4, writable: false });

                // Don't mark as mocked in stealth mode
                if (!this.stealthMode) {
                    Object.defineProperty(xhr, '_isMocked', { value: true, writable: false });
                }

                // Simulate realistic state transitions
                [1, 2, 3, 4].forEach((state, index) => {
                    setTimeout(() => {
                        Object.defineProperty(xhr, 'readyState', { value: state, writable: false, configurable: true });

                        if (xhr.onreadystatechange) {
                            xhr.onreadystatechange();
                        }

                        if (state === 4) {
                            const loadEvent = new Event('load');
                            xhr.dispatchEvent(loadEvent);

                            if (xhr.onload) {
                                xhr.onload();
                            }
                        }
                    }, index * 25); // More realistic timing
                });
            } catch (error) {
                console.error('🚨 Error simulating stealth XHR response:', error);
            }
        }, delay);
    }

    // Utility methods
    normalizeUrl(url) {
        try {
            const urlObj = new URL(url);
            urlObj.hash = '';
            urlObj.searchParams.sort();
            return urlObj.toString();
        } catch (error) {
            return url;
        }
    }

    shouldMockRequest(url, method) {
        const variations = [
            url, // Original URL
            this.normalizeUrl(url), // Normalized URL
            url.split('?')[0], // URL without query params
            url.split('#')[0], // URL without hash
            url.replace(/\/$/, ''), // URL without trailing slash
            `${url.replace(/\/$/, '')}/`, // URL with trailing slash
        ];

        console.log('%c🔍 MockMonkey URL Matching Debug:', 'color: #9b59b6; font-weight: bold;');
        console.log('  🎯 Request URL:', url);
        console.log('  🎯 Method:', method);
        console.log('  🎯 URL Variations to check:', variations);
        console.log('  🎯 Available Mocks:', Array.from(this.mocks.keys()));
        console.log('  🎯 Mocks Count:', this.mocks.size);
        console.log('  🎯 Is Enabled:', this.isEnabled);

        const hasMatch = variations.some((variation) => {
            const exists = this.mocks.has(variation);
            if (exists) {
                console.log('  ✅ Found match with variation:', variation);
            }
            return exists;
        });

        console.log('  🎯 Final Result:', hasMatch ? 'MATCH FOUND' : 'NO MATCH');
        return hasMatch;
    }

    getMockForRequest(url, method) {
        const variations = [url, this.normalizeUrl(url), url.split('?')[0], url.split('#')[0]];

        for (const variation of variations) {
            const mockData = this.mocks.get(variation);
            if (mockData) {
                if (mockData.method && mockData.method !== method.toUpperCase()) {
                    continue;
                }
                return mockData;
            }
        }

        return null;
    }

    shouldMockWebSocket(url) {
        // Check for WebSocket-specific mocks
        return this.mocks.has(`ws://${url}`) || this.mocks.has(`wss://${url}`);
    }

    shouldMockEventSource(url) {
        // Check for EventSource-specific mocks
        return this.mocks.has(`sse://${url}`) || this.mocks.has(url);
    }

    generateRequestId() {
        this.requestCounter++;
        return `stealth_${Date.now()}_${this.requestCounter}`;
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

    // Logging methods (stealth-aware)
    logStealthRequest(requestId, method, url, options) {
        if (!this.stealthMode) {
            console.log('🥷 Stealth request:', { requestId, method, url });
        }

        this.sendToBackground('STEALTH_NETWORK_REQUEST_LOG', {
            requestId,
            method,
            url,
            options,
            timestamp: Date.now(),
            stealth: this.stealthMode,
        });
    }

    logStealthResponse(requestId, response) {
        if (!this.stealthMode) {
            console.log('🥷 Stealth response:', { requestId, status: response.status });
        }

        this.sendToBackground('STEALTH_NETWORK_RESPONSE_LOG', {
            requestId,
            status: response.status || response.statusCode,
            timestamp: Date.now(),
            stealth: this.stealthMode,
        });
    }

    logStealthError(requestId, error) {
        this.sendToBackground('STEALTH_NETWORK_ERROR_LOG', {
            requestId,
            error: error.message,
            timestamp: Date.now(),
            stealth: this.stealthMode,
        });
    }

    sendToBackground(type, data) {
        try {
            chrome.runtime.sendMessage({
                type,
                data,
                tabId: chrome.devtools?.inspectedWindow?.tabId,
                source: 'stealth-interceptor',
            });
        } catch (error) {
            // Extension might be reloading, ignore
        }
    }

    // Missing method implementations
    getRequestModifications(url) {
        // Return any stored request modifications for this URL
        return null; // TODO: Implement request modifications storage
    }

    applyResponseModifications(response) {
        // Apply any stored response modifications
        return response; // TODO: Implement response modifications
    }

    applyWebSocketModifications(url) {
        // Apply any WebSocket URL modifications
        return url;
    }

    applyEventSourceModifications(url) {
        // Apply any EventSource URL modifications
        return url;
    }

    applyServiceWorkerModifications(scriptURL, options) {
        // Apply any Service Worker modifications
        return options;
    }

    createMockWebSocket(url, protocols) {
        // TODO: Implement mock WebSocket
        console.log('🎭 MockMonkey WebSocket mock not implemented yet:', url);
        return null;
    }

    createMockEventSource(url, eventSourceInitDict) {
        // TODO: Implement mock EventSource
        console.log('🎭 MockMonkey EventSource mock not implemented yet:', url);
        return null;
    }

    logStealthWebSocketEvent(requestId, event, url, data) {
        console.log('🔌 WebSocket Event:', { requestId, event, url, data });
    }

    logStealthEventSourceEvent(requestId, event, url, data) {
        console.log('📡 EventSource Event:', { requestId, event, url, data });
    }

    setupRequestModification(url, modifications) {
        // TODO: Implement request modification setup
        console.log('🔧 Request modification setup for:', url, modifications);
    }

    notifyReady() {
        this.sendToBackground('STEALTH_INTERCEPTOR_READY', {
            url: window.location.href,
            interceptedMethods: Array.from(this.interceptedMethods),
            stealthMode: this.stealthMode,
            timestamp: Date.now(),
        });
    }

    async enableStealthMocking(enabled) {
        this.isEnabled = enabled;
        console.log(`🥷 Stealth mocking ${enabled ? 'enabled' : 'disabled'}`);

        if (enabled) {
            await this.loadMocks();
        }
    }

    async updateMocks(newMocks) {
        this.mocks.clear();
        if (newMocks && typeof newMocks === 'object') {
            Object.entries(newMocks).forEach(([url, mockData]) => {
                this.mocks.set(url, mockData);
            });
        }
        console.log(`🥷 Updated to ${this.mocks.size} stealth mocks`);
    }

    toggleStealthMode(enabled) {
        this.stealthMode = enabled;
        console.log(`🥷 Stealth mode ${enabled ? 'enabled' : 'disabled'}`);

        if (enabled) {
            this.enableStealthMode();
        }
    }

    // Cleanup and restoration
    destroy() {
        console.log('🥷 Destroying stealth interceptor...');

        // Restore original APIs
        this.originalAPIs.forEach((original, key) => {
            switch (key) {
                case 'fetch':
                    window.fetch = original;
                    break;
                case 'XMLHttpRequest':
                    window.XMLHttpRequest = original;
                    break;
                case 'WebSocket':
                    window.WebSocket = original;
                    break;
                case 'EventSource':
                    window.EventSource = original;
                    break;
            }
        });

        this.interceptedMethods.clear();
        console.log('🥷 Stealth interceptor destroyed');
    }
}

// Initialize stealth interceptor
let stealthInterceptor = null;

if (!window.mockMonkeyStealthInitialized) {
    window.mockMonkeyStealthInitialized = true;
    stealthInterceptor = new MockMonkeyStealthInterceptor();

    // Make available globally for debugging (in non-stealth mode)
    if (!stealthInterceptor.stealthMode) {
        window.MockMonkeyStealthInterceptor = stealthInterceptor;
    }
}

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (stealthInterceptor) {
        stealthInterceptor.destroy();
    }
});

console.log('🥷 MockMonkey Stealth Interceptor loaded');
