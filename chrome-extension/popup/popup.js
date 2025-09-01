/**
 * MockMonkey Popup Controller
 * Handles popup UI interactions and communication with background script
 */

class PopupController {
    constructor() {
        this.currentTab = null;
        this.settings = null;
        this.mocks = null;

        this.init();
    }

    async init() {
        console.log('🐵 MockMonkey Popup initializing...');

        // Get current tab
        await this.getCurrentTab();

        // Setup event listeners
        this.setupEventListeners();

        // Load initial data
        await this.loadData();

        // Update UI
        this.updateUI();
    }

    async getCurrentTab() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            this.currentTab = tab;
        } catch (error) {
            console.error('🚨 Failed to get current tab:', error);
        }
    }

    setupEventListeners() {
        // Toggle mocking
        const enableMockingToggle = document.getElementById('enableMocking');
        enableMockingToggle.addEventListener('change', (e) => {
            this.toggleMocking(e.target.checked);
        });

        // Open DevTools
        document.getElementById('openDevTools').addEventListener('click', () => {
            this.openDevTools();
        });

        // Export mocks
        document.getElementById('exportMocks').addEventListener('click', () => {
            this.exportMocks();
        });

        // Clear mocks
        document.getElementById('clearMocks').addEventListener('click', () => {
            this.clearMocks();
        });
    }

    async loadData() {
        try {
            // Load settings
            const result = await chrome.storage.local.get(['mockmonkey_settings']);
            this.settings = result.mockmonkey_settings || this.getDefaultSettings();

            // Load mocks
            const allStorage = await chrome.storage.local.get(null);
            this.mocks = {};

            Object.keys(allStorage).forEach((key) => {
                if (key.startsWith('mockmonkey_mock_')) {
                    const mockData = allStorage[key];
                    if (mockData && mockData.url) {
                        this.mocks[mockData.url] = mockData;
                    }
                }
            });
        } catch (error) {
            console.error('🚨 Failed to load data:', error);
        }
    }

    getDefaultSettings() {
        return {
            enableMocking: true,
            ignoreImages: false,
            ignoreCSS: false,
            ignoreJS: false,
            filterText: '',
            autoSave: true,
            showNotifications: true,
            debugMode: false,
        };
    }

    updateUI() {
        // Update mocking status
        const mockingStatus = document.getElementById('mockingStatus');
        const enableMockingToggle = document.getElementById('enableMocking');

        if (this.settings.enableMocking) {
            mockingStatus.textContent = 'Enabled';
            mockingStatus.className = 'status-badge enabled';
            enableMockingToggle.checked = true;
        } else {
            mockingStatus.textContent = 'Disabled';
            mockingStatus.className = 'status-badge disabled';
            enableMockingToggle.checked = false;
        }

        // Update active mocks count
        const activeMocksCount = Object.keys(this.mocks || {}).length;
        document.getElementById('activeMocks').textContent = activeMocksCount;

        // Update current URL
        const currentUrl = document.getElementById('currentUrl');
        if (this.currentTab && this.currentTab.url) {
            const url = new URL(this.currentTab.url);
            currentUrl.textContent = `${url.hostname}${url.pathname}`;
            currentUrl.title = this.currentTab.url;
        } else {
            currentUrl.textContent = 'Unknown';
        }
    }

    async toggleMocking(enabled) {
        try {
            // Show loading state
            this.setLoadingState(true);

            // Update settings
            this.settings.enableMocking = enabled;
            await chrome.storage.local.set({
                mockmonkey_settings: this.settings,
            });

            // Notify background script
            if (this.currentTab) {
                await chrome.runtime.sendMessage({
                    type: 'ENABLE_MOCKING',
                    tabId: this.currentTab.id,
                    enabled,
                });
            }

            // Notify content script
            if (this.currentTab) {
                try {
                    await chrome.tabs.sendMessage(this.currentTab.id, {
                        type: 'ENABLE_MOCKING',
                        enabled,
                    });
                } catch (error) {
                    // Content script might not be ready, that's ok
                    console.debug('Content script not ready:', error.message);
                }
            }

            // Update UI
            this.updateUI();

            // Show success message
            this.showMessage(`Mocking ${enabled ? 'enabled' : 'disabled'}`, 'success');
        } catch (error) {
            console.error('🚨 Failed to toggle mocking:', error);
            this.showMessage('Failed to toggle mocking', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    openDevTools() {
        try {
            // Notify user to open DevTools
            this.showMessage('Press F12 to open DevTools, then go to MockMonkey panel', 'success');

            // Close popup after short delay
            setTimeout(() => {
                window.close();
            }, 2000);
        } catch (error) {
            console.error('🚨 Failed to open DevTools:', error);
            this.showMessage('Failed to open DevTools', 'error');
        }
    }

    async exportMocks() {
        try {
            if (!this.mocks || Object.keys(this.mocks).length === 0) {
                this.showMessage('No mocks to export', 'error');
                return;
            }

            const exportData = {
                version: '2.0.0',
                exportedAt: new Date().toISOString(),
                mocks: this.mocks,
            };

            const jsonString = JSON.stringify(exportData, null, 2);
            this.downloadFile('mockmonkey-mocks.json', jsonString);

            this.showMessage(`Exported ${Object.keys(this.mocks).length} mocks`, 'success');
        } catch (error) {
            console.error('🚨 Failed to export mocks:', error);
            this.showMessage('Failed to export mocks', 'error');
        }
    }

    async clearMocks() {
        try {
            if (!this.mocks || Object.keys(this.mocks).length === 0) {
                this.showMessage('No mocks to clear', 'error');
                return;
            }

            // Confirm action
            const confirmed = confirm(
                `Are you sure you want to delete all ${Object.keys(this.mocks).length} mocks? This cannot be undone.`,
            );
            if (!confirmed) {
                return;
            }

            // Show loading state
            this.setLoadingState(true);

            // Get all mock keys
            const allStorage = await chrome.storage.local.get(null);
            const mockKeys = Object.keys(allStorage).filter((key) => key.startsWith('mockmonkey_mock_'));

            // Remove all mocks
            if (mockKeys.length > 0) {
                await chrome.storage.local.remove(mockKeys);
            }

            // Clear local mocks
            this.mocks = {};

            // Update UI
            this.updateUI();

            this.showMessage(`Cleared ${mockKeys.length} mocks`, 'success');
        } catch (error) {
            console.error('🚨 Failed to clear mocks:', error);
            this.showMessage('Failed to clear mocks', 'error');
        } finally {
            this.setLoadingState(false);
        }
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

    setLoadingState(loading) {
        const container = document.getElementById('popup-container');
        if (loading) {
            container.classList.add('loading');
        } else {
            container.classList.remove('loading');
        }
    }

    showMessage(text, type = 'success') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.success-message, .error-message');
        existingMessages.forEach((msg) => msg.remove());

        // Create new message
        const message = document.createElement('div');
        message.className = type === 'success' ? 'success-message' : 'error-message';
        message.textContent = text;

        // Insert at top of container
        const container = document.getElementById('popup-container');
        const header = container.querySelector('.header');
        container.insertBefore(message, header.nextSibling);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 3000);
    }

    // Health check method
    async checkHealth() {
        try {
            const response = await chrome.runtime.sendMessage({ type: 'PING' });
            return response && response.pong;
        } catch (error) {
            console.error('🚨 Health check failed:', error);
            return false;
        }
    }
}

// Initialize popup when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PopupController();
    });
} else {
    new PopupController();
}

// Handle popup lifecycle
window.addEventListener('beforeunload', () => {
    console.log('🐵 MockMonkey Popup closing');
});

// Global error handler
window.addEventListener('error', (error) => {
    console.error('🚨 Popup error:', error);
});

console.log('🐵 MockMonkey Popup script loaded');
