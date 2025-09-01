/**
 * MockMonkey DevTools Panel - Main UI Controller
 * Handles network request logging, mock creation, and UI interactions
 */

class MockMonkeyPanel {
    constructor() {
        this.networkRequests = new Map();
        this.filteredRequests = [];
        this.currentSettings = null;
        this.currentStats = null;
        this.tabId = chrome.devtools.inspectedWindow.tabId;

        // UI Elements
        this.logContainer = null;
        this.filterInput = null;
        this.statsElements = {};
        this.checkboxes = {};

        // Lifecycle management
        this.updateStatsInterval = null;
        this.isVisible = true;
        this.contextValid = true;
        this.errorCount = 0;
        this.maxErrors = 5;

        // Mock button state management
        this.mockUpdateQueue = new Map(); // URL -> update request info
        this.debouncedUpdates = new Map(); // URL -> timeout ID
        this.updateRetries = new Map(); // URL -> retry count
        this.maxRetries = 3;
        this.baseRetryDelay = 1000; // Increased to 1 second
        this.debounceDelay = 200; // Increased to 200ms

        // Defensive mode flags
        this.silentMode = false;
        this.mockUpdatesDisabled = false;
        this.persistentErrorCount = 0;
        this.maxPersistentErrors = 10;

        // Initialize
        this.init();
    }

    async init() {
        console.log('🐵 MockMonkey Panel initializing...');

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupUI());
        } else {
            this.setupUI();
        }

        // Load settings and stats
        await this.loadSettings();
        await this.loadStats();

        // Setup message listeners
        this.setupMessageListeners();

        // Setup periodic stats updates with context validation
        this.startPeriodicUpdates();

        // Setup panel visibility tracking
        this.setupPanelVisibility();
    }

    setupUI() {
        // Get UI elements
        this.logContainer = document.getElementById('logContainer');
        this.filterInput = document.getElementById('filterEndpoint');

        // Stats elements
        this.statsElements = {
            totalRequests: document.getElementById('totalRequests'),
            mockedRequests: document.getElementById('mockedRequests'),
            activeMocks: document.getElementById('activeMocks'),
        };

        // Checkboxes and inputs
        this.checkboxes = {
            enableMocking: document.getElementById('enableMocking'),
        };

        this.customIgnoreInput = document.getElementById('customIgnorePatterns');

        // Default asset patterns to always filter out
        this.defaultAssetPatterns = [
            // JavaScript files
            /\.js(\?.*)?$/i,
            /\.jsx(\?.*)?$/i,
            /\.ts(\?.*)?$/i,
            /\.tsx(\?.*)?$/i,
            /\.mjs(\?.*)?$/i,

            // CSS files
            /\.css(\?.*)?$/i,
            /\.scss(\?.*)?$/i,
            /\.sass(\?.*)?$/i,
            /\.less(\?.*)?$/i,

            // Image files
            /\.png(\?.*)?$/i,
            /\.jpg(\?.*)?$/i,
            /\.jpeg(\?.*)?$/i,
            /\.gif(\?.*)?$/i,
            /\.svg(\?.*)?$/i,
            /\.ico(\?.*)?$/i,
            /\.webp(\?.*)?$/i,
            /\.bmp(\?.*)?$/i,
            /\.tiff(\?.*)?$/i,
            /\.avif(\?.*)?$/i,

            // Font files
            /\.woff(\?.*)?$/i,
            /\.woff2(\?.*)?$/i,
            /\.ttf(\?.*)?$/i,
            /\.eot(\?.*)?$/i,
            /\.otf(\?.*)?$/i,

            // Data URL fonts
            /^data:font\//i,

            // Data URL images
            /^data:image\//i,

            // Media files
            /\.mp4(\?.*)?$/i,
            /\.webm(\?.*)?$/i,
            /\.ogg(\?.*)?$/i,
            /\.mp3(\?.*)?$/i,
            /\.wav(\?.*)?$/i,
            /\.flac(\?.*)?$/i,

            // Document files
            /\.pdf(\?.*)?$/i,
            /\.doc(\?.*)?$/i,
            /\.docx(\?.*)?$/i,
            /\.zip(\?.*)?$/i,
            /\.rar(\?.*)?$/i,

            // Other common static assets
            /\.map(\?.*)?$/i, // Source maps
            /manifest\.json(\?.*)?$/i,
            /favicon\.ico(\?.*)?$/i,
            /robots\.txt(\?.*)?$/i,
            /sitemap\.xml(\?.*)?$/i,
        ];

        // Setup event listeners
        this.setupEventListeners();

        // Restore UI state
        this.restoreUIState();

        console.log('🐵 MockMonkey Panel UI setup complete');
    }

    setupEventListeners() {
        // Header buttons
        document.getElementById('refreshBtn').addEventListener('click', () => this.refreshPage());
        document.getElementById('clearLog').addEventListener('click', () => this.clearLogs());
        document.getElementById('exportMocks').addEventListener('click', () => this.exportMocks());
        document.getElementById('importMocks').addEventListener('click', () => this.importMocks());

        // Filter input
        this.filterInput.addEventListener('input', () => this.applyFilters());

        // Checkboxes
        Object.keys(this.checkboxes).forEach((key) => {
            this.checkboxes[key].addEventListener('change', () => this.onSettingsChange());
        });

        // File input for import
        document.getElementById('importFileInput').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleImportFile(file);
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    setupMessageListeners() {
        // Listen for network events from devtools script
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            switch (message.type) {
                case 'NETWORK_REQUEST':
                    this.handleNetworkRequest(message.data);
                    break;
                case 'NETWORK_RESPONSE_CONTENT':
                    this.handleNetworkContent(message.data);
                    break;
                case 'NAVIGATION':
                    this.handleNavigation(message.data);
                    break;
                default:
                    // Unknown message type
                    break;
            }
        });
    }

    async loadSettings() {
        try {
            this.currentSettings = await MockMonkeyStorage.getSettings();
            this.applySettings();
        } catch (error) {
            console.error('🚨 Failed to load settings:', error);
        }
    }

    async loadStats() {
        try {
            this.currentStats = await MockMonkeyStorage.getStats();
            this.updateStatsDisplay();
        } catch (error) {
            console.error('🚨 Failed to load stats:', error);
        }
    }

    async applySettings() {
        if (!this.currentSettings) return;

        // Apply checkbox states
        Object.keys(this.checkboxes).forEach((key) => {
            if (this.checkboxes[key] && this.currentSettings[key] !== undefined) {
                this.checkboxes[key].checked = this.currentSettings[key];
            }
        });

        // Apply filter text
        if (this.filterInput && this.currentSettings.filterText) {
            this.filterInput.value = this.currentSettings.filterText;
        }

        // IMPORTANT: Actually enable mocking if it was previously enabled
        if (this.currentSettings.enableMocking && this.checkboxes.enableMocking) {
            console.log('🐵 Mocking was previously enabled, initializing debugger attachment...');

            // Add a small delay to ensure UI is fully loaded
            setTimeout(async () => {
                try {
                    await this.toggleMocking(true);
                    console.log('🐵 ✅ Mocking auto-enabled on panel load');
                } catch (error) {
                    console.error('🚨 Failed to auto-enable mocking on panel load:', error);

                    // Revert checkbox if auto-enable failed
                    if (this.checkboxes.enableMocking) {
                        this.checkboxes.enableMocking.checked = false;
                    }
                }
            }, 500); // Small delay to ensure everything is ready
        }
    }

    async onSettingsChange() {
        // Collect current settings
        const newSettings = {};
        Object.keys(this.checkboxes).forEach((key) => {
            if (this.checkboxes[key]) {
                newSettings[key] = this.checkboxes[key].checked;
            }
        });

        if (this.filterInput) {
            newSettings.filterText = this.filterInput.value;
        }

        // Check if mocking enablement changed
        const mockingChanged = this.currentSettings && this.currentSettings.enableMocking !== newSettings.enableMocking;

        // Save settings
        this.currentSettings = { ...this.currentSettings, ...newSettings };
        await MockMonkeyStorage.saveSettings(this.currentSettings);

        // Enable/disable mocking if changed
        if (mockingChanged) {
            await this.toggleMocking(newSettings.enableMocking);
        }

        // Reapply filters
        this.applyFilters();
    }

    handleNetworkRequest(requestData) {
        // Defensive programming - validate request data structure
        if (!requestData || !requestData.request || !requestData.request.url) {
            console.warn('🚨 Invalid request data structure:', requestData);
            return;
        }

        const { url, method } = requestData.request;

        // Skip if should be ignored (including OPTIONS requests)
        if (this.shouldIgnoreRequest(url, method)) {
            console.log(`🚫 Ignoring request: ${method} ${url}`);
            return;
        }

        // Store request
        const requestId = this.generateRequestId(requestData);
        this.networkRequests.set(requestId, {
            ...requestData,
            id: requestId,
            timestamp: Date.now(),
            contentReceived: false,
        });

        // Update stats (with safety check)
        if (this.currentStats) {
            this.currentStats.totalRequests += 1;
            this.updateStats();
        }

        // Add to display
        this.addRequestToLog(requestId);
    }

    handleNetworkContent(contentData) {
        // Find matching request and update content
        for (const [id, request] of this.networkRequests) {
            if (request.request.url === contentData.url && !request.contentReceived) {
                request.response.content = contentData.content;
                request.response.encoding = contentData.encoding;
                request.contentReceived = true;

                // Update display
                this.updateRequestInLog(id);
                break;
            }
        }
    }

    handleNavigation(navData) {
        console.log('🐵 Navigation detected:', navData.url);
        // Optionally clear logs on navigation
        // this.clearLogs();
    }

    shouldIgnoreRequest(url, method = '') {
        // Filter out OPTIONS requests (CORS preflight requests)
        if (method && method.toUpperCase() === 'OPTIONS') {
            return true;
        }

        // Always filter out default asset patterns (JavaScript, CSS, images, fonts, etc.)
        for (const pattern of this.defaultAssetPatterns) {
            if (pattern.test(url)) {
                return true;
            }
        }

        // Check custom ignore patterns from user input
        const customPatterns = this.getCustomIgnorePatterns();
        for (const pattern of customPatterns) {
            if (this.testCustomPattern(pattern, url)) {
                return true;
            }
        }

        return false;
    }

    getCustomIgnorePatterns() {
        if (!this.customIgnoreInput || !this.customIgnoreInput.value.trim()) {
            return [];
        }

        // Split by comma and clean up patterns
        return this.customIgnoreInput.value
            .split(',')
            .map((pattern) => pattern.trim())
            .filter((pattern) => pattern.length > 0);
    }

    testCustomPattern(pattern, url) {
        try {
            // Check if pattern is a regex (starts and ends with /)
            if (pattern.startsWith('/') && pattern.endsWith('/')) {
                const regexPattern = pattern.slice(1, -1); // Remove surrounding slashes
                const regex = new RegExp(regexPattern, 'i');
                return regex.test(url);
            }

            // Treat as simple substring match (case-insensitive)
            return url.toLowerCase().includes(pattern.toLowerCase());
        } catch (error) {
            console.warn('🚨 Invalid custom ignore pattern:', pattern, error);
            return false;
        }
    }

    generateRequestId(requestData) {
        return `${requestData.request.method}_${requestData.request.url}_${Date.now()}`;
    }

    addRequestToLog(requestId) {
        const request = this.networkRequests.get(requestId);
        if (!request) return;

        // Remove empty state if present
        const emptyState = this.logContainer.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }

        // Create request entry
        const entry = this.createRequestEntry(request);
        this.logContainer.appendChild(entry);

        // Schedule mock button state update with proper debouncing
        this.scheduleMockButtonUpdate(entry, request.request.url);

        // Apply current filter
        this.applyFilters();

        // Scroll to bottom
        this.logContainer.scrollTop = this.logContainer.scrollHeight;
    }

    updateRequestInLog(requestId) {
        const entry = this.logContainer.querySelector(`[data-request-id="${requestId}"]`);
        if (entry && this.networkRequests.has(requestId)) {
            const request = this.networkRequests.get(requestId);
            this.updateRequestContent(entry, request);
        }
    }

    createRequestEntry(request) {
        const entry = document.createElement('div');
        entry.className = 'request-entry';
        entry.setAttribute('data-request-id', request.id);
        entry.setAttribute('data-url', request.request.url);
        entry.setAttribute('data-original-status', request.response.status);

        const statusClass = this.getStatusClass(request.response.status);
        const methodClass = `method-${request.request.method.toLowerCase()}`;

        entry.innerHTML = `
            <div class="request-header" data-request-id="${request.id}">
                <span class="request-method ${methodClass}">${request.request.method}</span>
                <span class="request-url">${request.request.url}</span>
                <span class="request-status ${statusClass}">${request.response.status}</span>
                <div class="request-controls">
                    <button class="mock-btn" data-request-id="${request.id}">
                        Mock
                    </button>
                </div>
            </div>
            <div class="request-details">
                <div class="details-tabs">
                    <div class="details-tab active" data-tab="general">General</div>
                    <div class="details-tab" data-tab="response">Response</div>
                    <div class="details-tab" data-tab="headers">Headers</div>
                    <div class="details-tab" data-tab="mock">Mock</div>
                </div>
                <div class="details-content">
                    <div class="tab-content" data-tab-content="general">
                        <div class="general-info">${this.formatGeneralInfo(request)}</div>
                    </div>
                    <div class="tab-content" data-tab-content="response" style="display: none;">
                        <div class="response-content">Loading...</div>
                    </div>
                    <div class="tab-content" data-tab-content="headers" style="display: none;">
                        <div class="response-content">${this.formatHeaders(request.request.headers)}</div>
                    </div>
                    <div class="tab-content" data-tab-content="mock" style="display: none;">
                        <p>No mock configured for this request.</p>
                    </div>
                </div>
            </div>
        `;

        // Setup event listeners (CSP-compliant)
        const requestHeader = entry.querySelector('.request-header');
        const mockBtn = entry.querySelector('.mock-btn');

        // Request header click to toggle details
        requestHeader.addEventListener('click', (e) => {
            // Don't toggle if mock button was clicked
            if (!e.target.classList.contains('mock-btn')) {
                this.toggleRequestDetails(request.id);
            }
        });

        // Mock button click
        mockBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.editMock(request.id);
        });

        // Status click handler for mocked requests (will be set up when mock status is updated)
        const statusElement = entry.querySelector('.request-status');
        statusElement.addEventListener('click', (e) => {
            if (statusElement.classList.contains('mocked-status')) {
                e.stopPropagation();
                this.editMock(request.id);
            }
        });

        // Setup tab switching
        entry.querySelectorAll('.details-tab').forEach((tab) => {
            tab.addEventListener('click', (e) => this.switchTab(entry, e.target.dataset.tab));
        });

        return entry;
    }

    updateRequestContent(entry, request) {
        const responseContent = entry.querySelector('[data-tab-content="response"] .response-content');
        if (responseContent && request.response.content) {
            const formatted = this.formatResponseContent(request.response.content);
            // Use textContent to safely display content without HTML parsing issues
            responseContent.textContent = formatted;
        }
    }

    scheduleMockButtonUpdate(entry, url) {
        // Skip if mock updates are disabled
        if (this.mockUpdatesDisabled) {
            console.log('🚨 Mock updates disabled due to persistent errors, skipping:', url);
            return;
        }

        // Validate entry before scheduling
        if (!entry || !entry.isConnected) {
            console.warn('🚨 Entry not connected, skipping mock button update:', url);
            return;
        }

        // Clear any existing debounced update for this URL
        if (this.debouncedUpdates.has(url)) {
            clearTimeout(this.debouncedUpdates.get(url));
        }

        // Create a debounced update with increased delay
        const timeoutId = setTimeout(() => {
            this.debouncedUpdates.delete(url);
            // Re-validate entry before queuing
            if (entry && entry.isConnected) {
                this.queueMockButtonUpdate(entry, url);
            } else {
                console.warn('🚨 Entry became disconnected, canceling mock button update:', url);
            }
        }, this.debounceDelay);

        this.debouncedUpdates.set(url, timeoutId);
    }

    queueMockButtonUpdate(entry, url) {
        // Add to queue if not already processing
        if (!this.mockUpdateQueue.has(url)) {
            this.mockUpdateQueue.set(url, {
                entry,
                url,
                scheduled: Date.now(),
            });

            // Process queue using requestAnimationFrame for optimal timing
            requestAnimationFrame(() => {
                this.processMockButtonUpdate(url);
            });
        }
    }

    async processMockButtonUpdate(url) {
        const queueItem = this.mockUpdateQueue.get(url);
        if (!queueItem) return;

        const { entry } = queueItem;

        try {
            // Validate entry is still connected before processing
            if (!entry || !entry.isConnected) {
                console.warn('🚨 Entry disconnected before processing, removing from queue:', url);
                this.mockUpdateQueue.delete(url);
                this.updateRetries.delete(url);
                return;
            }

            // Process the update with retry logic
            await this.updateMockButtonStateWithRetry(entry, url);

            // Successfully processed, remove from queue
            this.mockUpdateQueue.delete(url);
            this.updateRetries.delete(url);
        } catch (error) {
            console.warn('🚨 Failed to process mock button update:', error);

            // Implement retry logic
            const retryCount = this.updateRetries.get(url) || 0;

            if (retryCount < this.maxRetries) {
                this.updateRetries.set(url, retryCount + 1);

                // Exponential backoff retry
                const retryDelay = this.baseRetryDelay * 2 ** retryCount;

                console.log(
                    `🔄 Retrying mock button update for ${url} (attempt ${retryCount + 1}/${
                        this.maxRetries
                    }) in ${retryDelay}ms`,
                );

                setTimeout(() => {
                    // Re-validate entry before retry
                    if (entry && entry.isConnected) {
                        this.processMockButtonUpdate(url);
                    } else {
                        console.warn('🚨 Entry disconnected during retry, abandoning:', url);
                        this.mockUpdateQueue.delete(url);
                        this.updateRetries.delete(url);
                    }
                }, retryDelay);
            } else {
                console.error('🚨 Max retries reached for mock button update:', url, error);
                this.mockUpdateQueue.delete(url);
                this.updateRetries.delete(url);

                // Track persistent errors
                this.handlePersistentError(url, error);
            }
        }
    }

    async updateMockButtonStateWithRetry(entry, url) {
        // Enhanced version of updateMockButtonState with better error handling
        if (!entry || !entry.isConnected) {
            throw new Error('Entry element is not connected to DOM');
        }

        // Check if already being updated
        if (entry.dataset.updating === 'true') {
            throw new Error('Entry is already being updated');
        }

        // Mark as updating
        entry.dataset.updating = 'true';

        try {
            // Validate required DOM elements exist with additional safety checks
            const mockBtn = entry.querySelector('.mock-btn');
            const statusElement = entry.querySelector('.request-status');

            if (!mockBtn || !statusElement) {
                throw new Error('Required DOM elements not found');
            }

            // Additional connectivity checks
            if (!mockBtn.isConnected || !statusElement.isConnected) {
                throw new Error('DOM elements are not connected');
            }

            // Validate context before making storage calls
            if (!this.validateContext()) {
                throw new Error('Extension context is invalid');
            }

            const result = await MockMonkeyStorage.getMock(url);
            const mock = result?.success ? result.data : null;

            // Re-validate DOM elements after async operation
            if (!entry.isConnected || !mockBtn.isConnected || !statusElement.isConnected) {
                throw new Error('DOM elements became disconnected during async operation');
            }

            // Safe DOM updates with comprehensive validation
            this.applySafeMockButtonState(entry, mockBtn, statusElement, mock, url);
        } finally {
            // Always clear the updating flag if element still exists
            try {
                if (entry?.dataset) {
                    entry.dataset.updating = 'false';
                }
            } catch (error) {
                console.warn('🚨 Failed to clear updating flag:', error);
            }
        }
    }

    applySafeMockButtonState(entry, mockBtn, statusElement, mock, url) {
        try {
            if (mock) {
                // Apply mock state with validation
                if (mockBtn?.isConnected) {
                    mockBtn.textContent = 'Edit Mock';
                    mockBtn.classList.add('has-mock');
                }

                if (entry?.isConnected) {
                    entry.classList.add('mocked');
                }

                if (statusElement?.isConnected) {
                    statusElement.textContent = `🎭 ${mock.status}`;
                    statusElement.classList.add('mocked-status');
                    statusElement.classList.remove('status-2xx', 'status-3xx', 'status-4xx', 'status-5xx');
                    statusElement.classList.add(this.getStatusClass(mock.status));
                }

                // Update mock tab content safely with syntax highlighting for better readability
                const mockContent = entry?.querySelector?.('[data-tab-content="mock"]');
                if (mockContent?.isConnected) {
                    mockContent.innerHTML = `
                        <div class="form-group">
                            <label class="form-label">Status: ${this.escapeHtml(mock.status)}</label>
                        </div>
                        <div class="response-content">${this.formatResponseContent(mock.response, true)}</div>
                    `;
                }
            } else {
                // Apply no-mock state with validation
                if (mockBtn?.isConnected) {
                    mockBtn.textContent = 'Mock';
                    mockBtn.classList.remove('has-mock');
                }

                if (entry?.isConnected) {
                    entry.classList.remove('mocked');
                }

                if (statusElement?.isConnected) {
                    statusElement.classList.remove('mocked-status');

                    // Restore original status
                    const originalStatus = entry?.getAttribute?.('data-original-status');
                    if (originalStatus) {
                        statusElement.textContent = originalStatus;
                        statusElement.classList.remove('status-2xx', 'status-3xx', 'status-4xx', 'status-5xx');
                        statusElement.classList.add(this.getStatusClass(parseInt(originalStatus, 10)));
                    }
                }

                // Reset mock tab content
                const mockTabContent = entry?.querySelector?.('[data-tab-content="mock"]');
                if (mockTabContent?.isConnected) {
                    mockTabContent.innerHTML = '<p>No mock configured for this request.</p>';
                }
            }
        } catch (error) {
            console.error('🚨 Error applying mock button state:', error);
            throw error;
        }
    }

    async updateMockButtonState(entry, url) {
        // Validate DOM element is still connected and accessible
        if (!entry || !entry.isConnected) {
            console.warn('🚨 Entry element is not connected to DOM, skipping update');
            return;
        }

        // Check if this entry is already being updated to prevent concurrent access
        if (entry.dataset.updating === 'true') {
            console.warn('🚨 Entry is already being updated, skipping');
            return;
        }

        // Mark as updating to prevent concurrent access
        entry.dataset.updating = 'true';

        try {
            // Validate required DOM elements exist
            const mockBtn = entry.querySelector('.mock-btn');
            const statusElement = entry.querySelector('.request-status');

            if (!mockBtn || !statusElement) {
                console.warn('🚨 Required DOM elements (.mock-btn or .request-status) not found, skipping update');
                return;
            }

            // Validate context before making storage calls
            if (!this.validateContext()) {
                console.warn('🚨 Extension context invalid, skipping mock button update');
                return;
            }

            const result = await MockMonkeyStorage.getMock(url);
            const mock = result?.success ? result.data : null;

            // Re-validate DOM elements are still accessible after async operation
            if (!entry.isConnected || !mockBtn.isConnected || !statusElement.isConnected) {
                console.warn('🚨 DOM elements became disconnected during async operation');
                return;
            }

            if (mock) {
                // Safe DOM updates with additional checks
                if (mockBtn.isConnected) {
                    mockBtn.textContent = 'Edit Mock';
                    mockBtn.classList.add('has-mock');
                }

                if (entry.isConnected) {
                    entry.classList.add('mocked');
                }

                // Update status to show mock status with indicator
                if (statusElement.isConnected) {
                    statusElement.textContent = `🎭 ${mock.status}`;
                    statusElement.classList.add('mocked-status');
                    statusElement.classList.remove('status-2xx', 'status-3xx', 'status-4xx', 'status-5xx');
                    statusElement.classList.add(this.getStatusClass(mock.status));
                }

                // Update mock tab content with validation - use syntax highlighting for mock displays
                const mockTabContent = entry.querySelector('[data-tab-content="mock"]');
                if (mockTabContent && mockTabContent.isConnected) {
                    mockTabContent.innerHTML = `
                        <div class="form-group">
                            <label class="form-label">Status: ${mock.status}</label>
                        </div>
                        <div class="response-content">${this.formatResponseContent(mock.response, true)}</div>
                    `;
                }
            } else {
                // Safe DOM updates for no-mock state
                if (mockBtn.isConnected) {
                    mockBtn.textContent = 'Mock';
                    mockBtn.classList.remove('has-mock');
                }

                if (entry.isConnected) {
                    entry.classList.remove('mocked');
                }

                if (statusElement.isConnected) {
                    statusElement.classList.remove('mocked-status');

                    // Restore original status from data attribute
                    const originalStatus = entry.getAttribute('data-original-status');
                    if (originalStatus) {
                        statusElement.textContent = originalStatus;
                        statusElement.classList.remove('status-2xx', 'status-3xx', 'status-4xx', 'status-5xx');
                        statusElement.classList.add(this.getStatusClass(parseInt(originalStatus, 10)));
                    }
                }
            }
        } catch (error) {
            // Enhanced error logging for DOMExceptions
            if (error instanceof DOMException) {
                console.error('🚨 DOM Exception in updateMockButtonState:', {
                    name: error.name,
                    message: error.message,
                    code: error.code,
                    stack: error.stack,
                    entryConnected: entry?.isConnected,
                    entryExists: !!entry,
                });
            } else {
                console.error('🚨 Failed to update mock button state:', {
                    errorType: error.constructor.name,
                    message: error.message,
                    stack: error.stack,
                    entryConnected: entry?.isConnected,
                    entryExists: !!entry,
                });
            }

            // Safe error recovery with DOM validation
            try {
                const recoveryMockBtn = entry?.querySelector?.('.mock-btn');
                const recoveryStatusElement = entry?.querySelector?.('.request-status');

                if (recoveryMockBtn?.isConnected) {
                    recoveryMockBtn.textContent = 'Mock';
                    recoveryMockBtn.classList.remove('has-mock');
                }

                if (entry?.isConnected) {
                    entry.classList.remove('mocked');
                }

                if (recoveryStatusElement?.isConnected) {
                    recoveryStatusElement.classList.remove('mocked-status');
                }
            } catch (recoveryError) {
                console.error('🚨 Error during error recovery:', recoveryError);
            }
        } finally {
            // Always clear the updating flag
            try {
                if (entry?.dataset) {
                    entry.dataset.updating = 'false';
                }
            } catch (error) {
                console.warn('🚨 Failed to clear updating flag:', error);
            }
        }
    }

    escapeHtml(text) {
        if (typeof text !== 'string') {
            text = String(text);
        }
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    getStatusClass(status) {
        if (status >= 200 && status < 300) return 'status-2xx';
        if (status >= 300 && status < 400) return 'status-3xx';
        if (status >= 400 && status < 500) return 'status-4xx';
        if (status >= 500) return 'status-5xx';
        return '';
    }

    formatGeneralInfo(request) {
        try {
            const url = request.request.url || 'N/A';
            const method = request.request.method || 'N/A';
            const status = request.response.status || 'N/A';

            // Extract referrer policy from headers
            let referrerPolicy = 'N/A';
            const headers = request.request.headers || [];

            if (Array.isArray(headers)) {
                const referrerHeader = headers.find((h) => h.name && h.name.toLowerCase() === 'referrer-policy');
                if (referrerHeader && referrerHeader.value) {
                    referrerPolicy = referrerHeader.value;
                }
            } else if (typeof headers === 'object') {
                const referrerKey = Object.keys(headers).find((key) => key.toLowerCase() === 'referrer-policy');
                if (referrerKey) {
                    referrerPolicy = headers[referrerKey] || 'N/A';
                }
            }

            // Extract remote address from response headers if available
            let remoteAddress = 'N/A';
            if (request.response && request.response.headers) {
                const responseHeaders = request.response.headers;
                if (Array.isArray(responseHeaders)) {
                    const serverHeader = responseHeaders.find(
                        (h) =>
                            h.name &&
                            (h.name.toLowerCase() === 'server-ip' || h.name.toLowerCase() === 'remote-address'),
                    );
                    if (serverHeader && serverHeader.value) {
                        remoteAddress = serverHeader.value;
                    }
                }
            }

            // Extract timestamp info
            const timestamp = request.timestamp ? new Date(request.timestamp).toISOString() : 'N/A';

            // Format as Chrome Network tab style
            return `
                <div class="general-info-section">
                    <div class="info-row">
                        <span class="info-label">Request URL:</span>
                        <span class="info-value">${this.escapeHtml(url)}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Request Method:</span>
                        <span class="info-value">${this.escapeHtml(method)}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Status Code:</span>
                        <span class="info-value">${this.escapeHtml(status)} ${this.getStatusText(status)}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Remote Address:</span>
                        <span class="info-value">${this.escapeHtml(remoteAddress)}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Referrer Policy:</span>
                        <span class="info-value">${this.escapeHtml(referrerPolicy)}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Timestamp:</span>
                        <span class="info-value">${this.escapeHtml(timestamp)}</span>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('🚨 Error formatting general info:', error);
            return '<div class="error-message">Error displaying request information</div>';
        }
    }

    getStatusText(status) {
        // Map status codes to their text descriptions
        const statusTexts = {
            200: 'OK',
            201: 'Created',
            204: 'No Content',
            301: 'Moved Permanently',
            302: 'Found',
            304: 'Not Modified',
            400: 'Bad Request',
            401: 'Unauthorized',
            403: 'Forbidden',
            404: 'Not Found',
            409: 'Conflict',
            422: 'Unprocessable Entity',
            500: 'Internal Server Error',
            502: 'Bad Gateway',
            503: 'Service Unavailable',
            504: 'Gateway Timeout',
        };

        return statusTexts[status] || '';
    }

    formatHeaders(headers) {
        if (!headers) return 'No headers';

        try {
            let headerPairs = [];

            if (Array.isArray(headers)) {
                // Handle array format: [{name: "key", value: "val"}, ...]
                headerPairs = headers
                    .filter((header) => header && typeof header === 'object' && header.name)
                    .map((header) => ({
                        name: header.name,
                        value: header.value || '',
                    }));
            } else if (typeof headers === 'object') {
                // Handle object format: {key: "val", ...}
                headerPairs = Object.entries(headers).map(([name, value]) => ({
                    name,
                    value: String(value || ''),
                }));
            } else {
                return 'Invalid headers format';
            }

            if (headerPairs.length === 0) {
                return 'No headers found';
            }

            // Sort headers alphabetically and format
            return headerPairs
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(({ name, value }) => `${name}: ${value}`)
                .join('\n');
        } catch (error) {
            console.error('🚨 Error formatting headers:', error);
            return 'Error formatting headers';
        }
    }

    formatResponseContent(content, applySyntaxHighlighting = false) {
        if (!content) return 'No content';

        try {
            const parsed = JSON.parse(content);
            if (applySyntaxHighlighting) {
                // Format with indentation only for syntax highlighted display
                const formattedJson = JSON.stringify(parsed, null, 2);
                return this.syntaxHighlightJson(formattedJson);
            }
            // Return compact JSON for display
            return JSON.stringify(parsed);
        } catch (e) {
            return content;
        }
    }

    formatJsonForEditing(content) {
        if (!content) return '';

        try {
            const parsed = JSON.parse(content);
            return JSON.stringify(parsed, null, 2); // Pretty format for editing
        } catch (e) {
            return content; // Return as-is if not JSON
        }
    }

    compactJsonForSaving(content) {
        if (!content) return '';

        try {
            const parsed = JSON.parse(content);
            return JSON.stringify(parsed); // Compact for saving
        } catch (e) {
            return content; // Return as-is if not valid JSON
        }
    }

    syntaxHighlightJson(json) {
        return json.replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
            (match) => {
                let cls = 'json-number';
                if (/^"/.test(match)) {
                    cls = /:$/.test(match) ? 'json-key' : 'json-string';
                } else if (/true|false/.test(match)) {
                    cls = 'json-boolean';
                } else if (/null/.test(match)) {
                    cls = 'json-null';
                }
                return `<span class="${cls}">${match}</span>`;
            },
        );
    }

    toggleRequestDetails(requestId) {
        const entry = this.logContainer.querySelector(`[data-request-id="${requestId}"]`);
        if (entry) {
            const details = entry.querySelector('.request-details');
            details.classList.toggle('expanded');
        }
    }

    switchTab(entry, tabName) {
        // Update tab active state
        entry.querySelectorAll('.details-tab').forEach((tab) => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        // Update content visibility
        entry.querySelectorAll('.tab-content').forEach((content) => {
            content.style.display = content.dataset.tabContent === tabName ? 'block' : 'none';
        });
    }

    async editMock(requestId) {
        const request = this.networkRequests.get(requestId);
        if (!request) return;

        // Enter inline edit mode
        await this.enterInlineEditMode(requestId);
    }

    async enterInlineEditMode(requestId) {
        const entry = this.logContainer.querySelector(`[data-request-id="${requestId}"]`);
        if (!entry) return;

        const request = this.networkRequests.get(requestId);
        if (!request) return;

        try {
            // Expand details if not already expanded
            const details = entry.querySelector('.request-details');
            const wasExpanded = details.classList.contains('expanded');
            if (!wasExpanded) {
                details.classList.add('expanded');
            }

            // Switch to Mock tab
            this.switchTab(entry, 'mock');

            // Get existing mock data
            const result = await MockMonkeyStorage.getMock(request.request.url);
            const existingMock = result?.success ? result.data : null;

            // Track if we're adding a new mock (for proper cancel behavior)
            const isAddingNewMock = !existingMock;
            entry.setAttribute('data-adding-new-mock', isAddingNewMock.toString());
            entry.setAttribute('data-was-expanded-before-edit', wasExpanded.toString());

            // Create inline editing interface
            await this.createInlineEditor(entry, request, existingMock);

            // Mark entry as editing
            entry.classList.add('editing');
        } catch (error) {
            console.error('🚨 Failed to enter edit mode:', error);
        }
    }

    async createInlineEditor(entry, request, existingMock) {
        const mockContent = entry.querySelector('[data-tab-content="mock"]');

        const mockData = existingMock || {
            method: request.request.method,
            status: request.response.status,
            response: request.response.content || '{"message": "Mock response"}',
        };

        const templates = this.getResponseTemplates();

        mockContent.innerHTML = `
            <div class="inline-mock-editor">
                <div class="mock-editor-header">
                    <h4>📝 Editing Mock for: <span class="url-display">${this.escapeHtml(
                        request.request.url,
                    )}</span></h4>
                </div>
                
                <div class="inline-editor-actions">
                    <button class="btn btn-save" data-action="save" data-request-id="${request.id}">
                        💾 Save Mock
                    </button>
                    <button class="btn btn-cancel" data-action="cancel" data-request-id="${request.id}">
                        ❌ Cancel
                    </button>
                    ${
                        existingMock
                            ? `
                    <button class="btn btn-delete" data-action="delete" data-request-id="${request.id}">
                        🗑️ Delete Mock
                    </button>
                    `
                            : ''
                    }
                </div>
                
                <div class="mock-editor-form">
                    <div class="form-group">
                        <label class="form-label">Status Code</label>
                        <select class="form-control form-control-select" id="inlineMockStatus-${request.id}">
                            ${[200, 201, 204, 400, 401, 403, 404, 409, 422, 500, 502, 503]
                                .map(
                                    (status) =>
                                        `<option value="${this.escapeHtml(status)}" ${
                                            status === mockData.status ? 'selected' : ''
                                        }>${this.escapeHtml(status)}</option>`,
                                )
                                .join('')}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Response Templates</label>
                        <select class="form-control form-control-select" id="inlineMockTemplate-${request.id}">
                            <option value="">Choose a template...</option>
                            ${Object.entries(templates)
                                .map(
                                    ([key, template]) =>
                                        `<option value="${this.escapeHtml(key)}">${this.escapeHtml(
                                            template.name,
                                        )}</option>`,
                                )
                                .join('')}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Response Body</label>
                        <textarea class="form-control form-control-textarea" 
                                  id="inlineMockResponse-${request.id}" 
                                  placeholder="Enter mock response..."
                                  rows="6"></textarea>
                    </div>
                </div>
            </div>
        `;

        // Set textarea content safely using DOM manipulation to avoid HTML parsing issues
        const responseTextarea = document.getElementById(`inlineMockResponse-${request.id}`);
        if (responseTextarea) {
            responseTextarea.value = this.formatJsonForEditing(mockData.response);
        }

        // Setup template selection handler
        const templateSelect = document.getElementById(`inlineMockTemplate-${request.id}`);
        templateSelect.addEventListener('change', (e) => {
            const templateKey = e.target.value;
            if (templateKey && templates[templateKey]) {
                const template = templates[templateKey];
                document.getElementById(`inlineMockStatus-${request.id}`).value = template.status;
                document.getElementById(`inlineMockResponse-${request.id}`).value = template.response;
            }
        });

        // Auto-focus on the first editable field
        setTimeout(() => {
            const firstField = document.getElementById(`inlineMockStatus-${request.id}`);
            if (firstField) {
                firstField.focus();
            }
        }, 100);

        // Setup keyboard navigation
        this.setupKeyboardNavigation(request.id);

        // Setup action button event listeners (CSP-compliant)
        const actionButtons = mockContent.querySelectorAll('button[data-action]');
        actionButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const { action } = button.dataset;
                const { requestId } = button.dataset;

                switch (action) {
                    case 'save':
                        this.saveInlineMock(requestId);
                        break;
                    case 'cancel':
                        this.cancelInlineEdit(requestId);
                        break;
                    case 'delete':
                        this.deleteInlineMock(requestId);
                        break;
                    default:
                        console.warn('Unknown action:', action);
                }
            });
        });
    }

    setupKeyboardNavigation(requestId) {
        const statusField = document.getElementById(`inlineMockStatus-${requestId}`);
        const templateField = document.getElementById(`inlineMockTemplate-${requestId}`);
        const responseField = document.getElementById(`inlineMockResponse-${requestId}`);

        // Tab navigation order
        const fields = [statusField, templateField, responseField];

        fields.forEach((field, index) => {
            if (field) {
                field.addEventListener('keydown', (e) => {
                    // Enter key for quick save on non-textarea fields
                    if (e.key === 'Enter' && field !== responseField) {
                        e.preventDefault();
                        this.saveInlineMock(requestId);
                        return;
                    }

                    // Escape to cancel
                    if (e.key === 'Escape') {
                        e.preventDefault();
                        this.cancelInlineEdit(requestId);
                        return;
                    }

                    // Ctrl+Enter for quick save on textarea
                    if (e.key === 'Enter' && e.ctrlKey && field === responseField) {
                        e.preventDefault();
                        this.saveInlineMock(requestId);
                    }
                });
            }
        });
    }

    async saveInlineMock(requestId) {
        const request = this.networkRequests.get(requestId);
        if (!request) return;

        const mockData = {
            method: request.request.method, // Use original request method instead of allowing selection
            status: parseInt(document.getElementById(`inlineMockStatus-${requestId}`).value, 10),
            response: this.compactJsonForSaving(document.getElementById(`inlineMockResponse-${requestId}`).value),
        };

        try {
            await MockMonkeyStorage.saveMock(request.request.url, mockData);
            console.log('🐵 Mock saved for:', request.request.url);

            // Ensure mocking is enabled
            await this.ensureMockingEnabled();

            // Exit edit mode and update UI
            await this.exitInlineEditMode(requestId);
            this.updateAllMockButtons();
            this.updateStats();
        } catch (error) {
            console.error('🚨 Failed to save mock:', error);
        }
    }

    async deleteInlineMock(requestId) {
        const request = this.networkRequests.get(requestId);
        if (!request) return;

        try {
            await MockMonkeyStorage.removeMock(request.request.url);
            console.log('🐵 Mock deleted for:', request.request.url);

            // Exit edit mode and update UI
            await this.exitInlineEditMode(requestId);
            this.updateAllMockButtons();
            this.updateStats();
        } catch (error) {
            console.error('🚨 Failed to delete mock:', error);
        }
    }

    cancelInlineEdit(requestId) {
        this.exitInlineEditMode(requestId, true);
    }

    async exitInlineEditMode(requestId, wasCancelled = false) {
        const entry = this.logContainer.querySelector(`[data-request-id="${requestId}"]`);
        if (!entry) return;

        // Remove editing class
        entry.classList.remove('editing');

        if (wasCancelled) {
            // When cancelled, always close the request item completely
            const details = entry.querySelector('.request-details');
            if (details) {
                details.classList.remove('expanded');
            }
            // Switch back to the default Response tab
            this.switchTab(entry, 'response');
        } else {
            // For save operations, keep request open and update mock button state
            await this.updateMockButtonState(entry, entry.getAttribute('data-url'));
        }

        // Clean up the tracking attributes
        entry.removeAttribute('data-adding-new-mock');
        entry.removeAttribute('data-was-expanded-before-edit');
    }

    getResponseTemplates() {
        // Fallback templates in case MockDefinitions isn't available
        const fallbackTemplates = {
            success: {
                name: '✅ Success Response',
                status: 200,
                method: 'GET',
                response: JSON.stringify({ success: true, message: 'Operation completed successfully' }),
            },
            error400: {
                name: '❌ Bad Request',
                status: 400,
                method: 'GET',
                response: JSON.stringify({ error: 'Bad Request', message: 'The request is invalid' }),
            },
            error404: {
                name: '🔍 Not Found',
                status: 404,
                method: 'GET',
                response: JSON.stringify({ error: 'Not Found', message: 'Resource not found' }),
            },
            error500: {
                name: '💥 Server Error',
                status: 500,
                method: 'GET',
                response: JSON.stringify({ error: 'Internal Server Error', message: 'Something went wrong' }),
            },
            empty: {
                name: '📭 Empty Response',
                status: 200,
                method: 'GET',
                response: JSON.stringify([]),
            },
            userProfile: {
                name: '👤 User Profile',
                status: 200,
                method: 'GET',
                response: JSON.stringify({
                    id: 123,
                    username: 'john_doe',
                    email: 'john@example.com',
                    firstName: 'John',
                    lastName: 'Doe',
                    createdAt: new Date().toISOString(),
                }),
            },
        };

        try {
            // Try to use MockDefinitions if available
            if (window.MockDefinitions && typeof window.MockDefinitions.getResponseTemplates === 'function') {
                return window.MockDefinitions.getResponseTemplates();
            }
        } catch (error) {
            console.warn('🚨 MockDefinitions not available, using fallback templates:', error);
        }

        return fallbackTemplates;
    }

    async updateAllMockButtons() {
        const entries = this.logContainer.querySelectorAll('.request-entry');
        for (const entry of entries) {
            const url = entry.getAttribute('data-url');
            if (url) {
                await this.updateMockButtonState(entry, url);
            }
        }
    }

    applyFilters() {
        const filterText = this.filterInput.value.toLowerCase();
        const entries = this.logContainer.querySelectorAll('.request-entry');

        entries.forEach((entry) => {
            const url = entry.getAttribute('data-url').toLowerCase();
            const shouldShow = !filterText || url.includes(filterText);
            entry.style.display = shouldShow ? 'block' : 'none';
        });
    }

    clearLogs() {
        this.networkRequests.clear();
        this.logContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🌐</div>
                <p>No network requests captured yet.</p>
                <p class="empty-hint">Refresh the page or navigate to see HTTP requests.</p>
            </div>
        `;

        // Reset stats
        this.currentStats.totalRequests = 0;
        this.updateStatsDisplay();
    }

    refreshPage() {
        chrome.devtools.inspectedWindow.reload();
    }

    async exportMocks() {
        try {
            const exportData = await MockMonkeyStorage.exportMocks();
            if (exportData) {
                this.downloadFile('mockmonkey-mocks.json', exportData);
            }
        } catch (error) {
            console.error('🚨 Export failed:', error);
        }
    }

    importMocks() {
        document.getElementById('importFileInput').click();
    }

    async handleImportFile(file) {
        try {
            const content = await this.readFileContent(file);
            const result = await MockMonkeyStorage.importMocks(content);

            if (result) {
                console.log('🐵 Mocks imported successfully');
                this.updateAllMockButtons();
                this.updateStats();
            }

            // Clear the file input
            document.getElementById('importFileInput').value = '';
        } catch (error) {
            console.error('🚨 Import failed:', error);
        }
    }

    readFileContent(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    startPeriodicUpdates() {
        // Clear any existing interval
        if (this.updateStatsInterval) {
            clearInterval(this.updateStatsInterval);
        }

        // Start smart interval with context validation
        this.updateStatsInterval = setInterval(() => {
            this.safeUpdateStats();
        }, 2000); // Reduced frequency to 2 seconds

        console.log('🐵 Periodic updates started with context validation');
    }

    stopPeriodicUpdates() {
        if (this.updateStatsInterval) {
            clearInterval(this.updateStatsInterval);
            this.updateStatsInterval = null;
            console.log('🐵 Periodic updates stopped');
        }
    }

    setupPanelVisibility() {
        // Track panel visibility to optimize updates
        if (typeof document.addEventListener === 'function') {
            document.addEventListener('visibilitychange', () => {
                this.isVisible = !document.hidden;
                console.log('🐵 Panel visibility:', this.isVisible ? 'visible' : 'hidden');

                // Resume/pause updates based on visibility
                if (this.isVisible) {
                    this.resetErrorCount();
                    this.safeUpdateStats();
                }
            });
        }
    }

    validateContext() {
        try {
            // Check if chrome runtime is still valid
            const isValid = chrome.runtime?.id !== undefined;
            this.contextValid = isValid;
            return isValid;
        } catch (error) {
            this.contextValid = false;
            return false;
        }
    }

    resetErrorCount() {
        this.errorCount = 0;
    }

    incrementErrorCount() {
        this.errorCount += 1;
        console.warn(`🚨 Extension context error count: ${this.errorCount}/${this.maxErrors}`);

        // Stop updates if too many errors (circuit breaker)
        if (this.errorCount >= this.maxErrors) {
            console.error('🚨 Maximum context errors reached, stopping periodic updates');
            this.stopPeriodicUpdates();
            this.showContextErrorBanner();
        }
    }

    showContextErrorBanner() {
        // Create error banner if not already present
        let banner = document.getElementById('context-error-banner');
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'context-error-banner';
            banner.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: #ff6b6b;
                color: white;
                padding: 10px;
                text-align: center;
                z-index: 10000;
                font-family: monospace;
                font-size: 12px;
            `;
            document.body.prepend(banner);
        }

        banner.innerHTML = '⚠️ Extension context invalidated. Please reload the extension and refresh DevTools.';
    }

    async safeUpdateStats() {
        // Skip if panel not visible (optimization)
        if (!this.isVisible) {
            return;
        }

        // Validate context before proceeding
        if (!this.validateContext()) {
            this.incrementErrorCount();
            return;
        }

        // Skip if too many errors
        if (this.errorCount >= this.maxErrors) {
            return;
        }

        try {
            await this.updateStats();
            // Reset error count on success
            if (this.errorCount > 0) {
                console.log('🟢 Context recovered, resetting error count');
                this.resetErrorCount();
            }
        } catch (error) {
            console.warn('🚨 Safe update stats failed:', error.message);
            this.incrementErrorCount();
        }
    }

    async updateStats() {
        if (!this.currentStats) return;

        try {
            // Count active mocks
            const mocks = await MockMonkeyStorage.getAllMocks();
            this.currentStats.activeMocks = Object.keys(mocks).length;

            // Save updated stats
            await MockMonkeyStorage.saveStats(this.currentStats);

            this.updateStatsDisplay();
        } catch (error) {
            console.error('🚨 Failed to update stats:', error);
            throw error; // Re-throw to trigger circuit breaker
        }
    }

    updateStatsDisplay() {
        if (!this.currentStats || !this.statsElements.totalRequests) return;

        this.statsElements.totalRequests.textContent = `Requests: ${this.currentStats.totalRequests}`;
        this.statsElements.mockedRequests.textContent = `Mocked: ${this.currentStats.mockedRequests}`;
        this.statsElements.activeMocks.textContent = `Active Mocks: ${this.currentStats.activeMocks}`;
    }

    handleKeyboardShortcuts(e) {
        // Ctrl+Shift+C - Clear logs
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            this.clearLogs();
        }

        // Ctrl+Shift+E - Export mocks
        if (e.ctrlKey && e.shiftKey && e.key === 'E') {
            e.preventDefault();
            this.exportMocks();
        }

        // Escape - Close modal
        if (e.key === 'Escape') {
            this.closeMockModal();
        }
    }

    async toggleMocking(enabled) {
        try {
            console.log(`🐵 ${enabled ? 'Enabling' : 'Disabling'} mocking for tab:`, this.tabId);

            // Send message to background service worker
            const response = await chrome.runtime.sendMessage({
                type: 'ENABLE_MOCKING',
                tabId: this.tabId,
                enabled,
            });

            if (response && response.success) {
                console.log(`🐵 Mocking ${enabled ? 'enabled' : 'disabled'} successfully`);

                // Show user-friendly status message based on the method used
                if (enabled) {
                    this.showMockingStatusMessage(response);
                }

                // Update UI to show mocking status
                this.updateMockingStatus(enabled, response);
            } else {
                console.error('🚨 Failed to toggle mocking:', response?.error);

                // Show error message to user
                this.showMockingErrorMessage(response?.error || 'Unknown error occurred');

                // Revert checkbox state on failure
                if (this.checkboxes.enableMocking) {
                    this.checkboxes.enableMocking.checked = !enabled;
                }
            }
        } catch (error) {
            console.error('🚨 Failed to toggle mocking:', error);

            // Show error message to user
            this.showMockingErrorMessage(error.message);

            // Revert checkbox state on failure
            if (this.checkboxes.enableMocking) {
                this.checkboxes.enableMocking.checked = !enabled;
            }
        }
    }

    showMockingStatusMessage(response) {
        const message = '✅ Mocking enabled successfully';
        let details = '';

        // Customize message based on attachment method
        switch (response.method) {
            case 'direct-attach':
                details = 'Using Chrome Debugger for advanced interception';
                break;
            case 'devtools-piggyback':
                details = 'Using existing DevTools connection (shared mode)';
                break;
            case 'alternative-mode':
                details = 'Using content scripts + browser rules (fallback mode)';
                break;
            default:
                details = response.message || 'Mocking system active';
        }

        // Create status banner
        this.showStatusBanner(message, details, 'success', 3000);

        console.log(`🐵 ${message}: ${details}`);
    }

    showMockingErrorMessage(error) {
        const message = '❌ Failed to enable mocking';
        const details = `Error: ${error}`;

        // Create error banner
        this.showStatusBanner(message, details, 'error', 5000);
    }

    showStatusBanner(message, details, type = 'info', duration = 3000) {
        // Remove any existing banner
        const existingBanner = document.getElementById('mocking-status-banner');
        if (existingBanner) {
            existingBanner.remove();
        }

        // Create banner element
        const banner = document.createElement('div');
        banner.id = 'mocking-status-banner';
        banner.className = `status-banner status-banner-${type}`;

        // Style the banner
        banner.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            max-width: 400px;
            padding: 12px 16px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            line-height: 1.4;
            animation: slideIn 0.3s ease-out;
            ${type === 'success' ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : ''}
            ${type === 'error' ? 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;' : ''}
            ${type === 'info' ? 'background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb;' : ''}
        `;

        banner.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 4px;">${message}</div>
            <div style="font-size: 12px; opacity: 0.8;">${details}</div>
        `;

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .status-banner.sliding-out {
                animation: slideOut 0.3s ease-in;
            }
        `;
        document.head.appendChild(style);

        // Add to DOM
        document.body.appendChild(banner);

        // Auto-hide after duration
        setTimeout(() => {
            if (banner.parentNode) {
                banner.classList.add('sliding-out');
                setTimeout(() => {
                    if (banner.parentNode) {
                        banner.remove();
                    }
                }, 300);
            }
        }, duration);

        // Allow manual close on click
        banner.addEventListener('click', () => {
            banner.classList.add('sliding-out');
            setTimeout(() => {
                if (banner.parentNode) {
                    banner.remove();
                }
            }, 300);
        });
    }

    updateMockingStatus(enabled, response = null) {
        // Update checkbox state
        if (this.checkboxes.enableMocking) {
            this.checkboxes.enableMocking.checked = enabled;
        }

        // Add visual indicator to show mocking method if enabled
        if (enabled && response) {
            this.addMockingIndicator(response);
        } else {
            this.removeMockingIndicator();
        }
    }

    addMockingIndicator(response) {
        // Remove existing indicator
        this.removeMockingIndicator();

        // Create indicator based on method
        const indicator = document.createElement('div');
        indicator.id = 'mocking-method-indicator';
        indicator.style.cssText = `
            position: fixed;
            bottom: 10px;
            right: 10px;
            padding: 8px 12px;
            background: #28a745;
            color: white;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            z-index: 9999;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        `;

        let indicatorText = '🎭 Mocking Active';
        switch (response.method) {
            case 'direct-attach':
                indicatorText += ' (Debugger)';
                break;
            case 'devtools-piggyback':
                indicatorText += ' (DevTools)';
                break;
            case 'alternative-mode':
                indicatorText += ' (Fallback)';
                break;
            default:
                indicatorText += ' (Unknown)';
        }

        indicator.textContent = indicatorText;
        document.body.appendChild(indicator);
    }

    removeMockingIndicator() {
        const indicator = document.getElementById('mocking-method-indicator');
        if (indicator && indicator.parentNode) {
            indicator.remove();
        }
    }

    async ensureMockingEnabled() {
        // Auto-enable mocking when first mock is created
        if (!this.currentSettings?.enableMocking) {
            console.log('🐵 Auto-enabling mocking for first mock');

            // Update settings
            this.currentSettings = {
                ...this.currentSettings,
                enableMocking: true,
            };
            await MockMonkeyStorage.saveSettings(this.currentSettings);

            // Update checkbox
            if (this.checkboxes.enableMocking) {
                this.checkboxes.enableMocking.checked = true;
            }

            // Enable mocking
            await this.toggleMocking(true);
        }
    }

    restoreUIState() {
        // Any additional UI state restoration
        console.log('🐵 UI state restored');
    }

    // Panel lifecycle methods
    onPanelShown() {
        console.log('🐵 Panel shown');
        this.isVisible = true;
        this.resetErrorCount();

        // Restart updates if they were stopped
        if (!this.updateStatsInterval) {
            this.startPeriodicUpdates();
        }

        this.safeUpdateStats();
    }

    onPanelHidden() {
        console.log('🐵 Panel hidden');
        this.isVisible = false;
    }

    // Handle persistent errors and implement circuit breaker
    handlePersistentError(url, error) {
        this.persistentErrorCount += 1;

        // Enhanced error logging with full DOMException details
        if (error instanceof DOMException) {
            console.error('🚨 Persistent DOMException:', {
                url,
                name: error.name,
                message: error.message,
                code: error.code,
                stack: error.stack,
                persistentErrorCount: this.persistentErrorCount,
                timestamp: new Date().toISOString(),
            });
        } else {
            console.error('🚨 Persistent Error:', {
                url,
                errorType: error.constructor.name,
                message: error.message,
                stack: error.stack,
                persistentErrorCount: this.persistentErrorCount,
                timestamp: new Date().toISOString(),
            });
        }

        // Disable mock updates if too many persistent errors
        if (this.persistentErrorCount >= this.maxPersistentErrors) {
            console.error('🚨 Too many persistent errors, disabling mock updates');
            this.mockUpdatesDisabled = true;
            this.showMockUpdatesDisabledBanner();
        }
    }

    showMockUpdatesDisabledBanner() {
        // Create mock updates disabled banner if not already present
        let banner = document.getElementById('mock-updates-disabled-banner');
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'mock-updates-disabled-banner';
            banner.style.cssText = `
                position: fixed;
                top: 40px;
                left: 0;
                right: 0;
                background: #ffa500;
                color: white;
                padding: 10px;
                text-align: center;
                z-index: 9999;
                font-family: monospace;
                font-size: 12px;
            `;
            document.body.prepend(banner);
        }

        banner.innerHTML = `
            ⚠️ Mock button updates disabled due to persistent DOM errors. 
            <button onclick="window.MockMonkeyPanel.instance.enableMockUpdates()" 
                    style="background: white; color: #ffa500; border: none; padding: 2px 8px; margin-left: 10px; cursor: pointer;">
                Re-enable
            </button>
        `;
    }

    enableMockUpdates() {
        this.mockUpdatesDisabled = false;
        this.persistentErrorCount = 0;

        // Remove banner
        const banner = document.getElementById('mock-updates-disabled-banner');
        if (banner && banner.parentNode) {
            banner.parentNode.removeChild(banner);
        }

        console.log('🐵 Mock updates re-enabled');
    }

    // Cleanup method for proper resource management
    destroy() {
        console.log('🐵 Cleaning up MockMonkey Panel...');

        // Stop periodic updates
        this.stopPeriodicUpdates();

        // Remove context error banner if present
        const banner = document.getElementById('context-error-banner');
        if (banner && banner.parentNode) {
            banner.parentNode.removeChild(banner);
        }

        // Remove mock updates disabled banner if present
        const mockBanner = document.getElementById('mock-updates-disabled-banner');
        if (mockBanner && mockBanner.parentNode) {
            mockBanner.parentNode.removeChild(mockBanner);
        }

        // Clear references
        this.networkRequests.clear();
        this.currentSettings = null;
        this.currentStats = null;

        console.log('🐵 MockMonkey Panel cleanup complete');
    }
}

// Create global instance when DOM is ready
let mockMonkeyPanelInstance = null;

function initializeMockMonkeyPanel() {
    try {
        mockMonkeyPanelInstance = new MockMonkeyPanel();
        window.MockMonkeyPanel = {
            instance: mockMonkeyPanelInstance,
        };
        console.log('🐵 MockMonkey Panel instance created successfully');
    } catch (error) {
        console.error('🚨 Failed to initialize MockMonkey Panel:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMockMonkeyPanel);
} else {
    initializeMockMonkeyPanel();
}

// Expose methods globally for inline event handlers
window.editMock = function (requestId) {
    if (mockMonkeyPanelInstance) {
        mockMonkeyPanelInstance.editMock(requestId);
    } else {
        console.error('🚨 MockMonkey Panel instance not available');
    }
};

window.toggleRequestDetails = function (requestId) {
    if (mockMonkeyPanelInstance) {
        mockMonkeyPanelInstance.toggleRequestDetails(requestId);
    } else {
        console.error('🚨 MockMonkey Panel instance not available');
    }
};
