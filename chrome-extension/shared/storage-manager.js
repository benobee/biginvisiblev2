/**
 * Enhanced Storage Manager for MockMonkey Chrome Extension
 * Uses chrome.storage API for persistent and synchronized mock storage
 */

class MockMonkeyStorageManager {
    constructor() {
        this.storagePrefix = 'mockmonkey_';
        this.mockPrefix = 'mock_';
        this.settingsKey = 'settings';
        this.statsKey = 'stats';
    }

    /**
     * Check if extension context is valid
     */
    isContextValid() {
        try {
            return chrome.runtime?.id !== undefined;
        } catch (error) {
            return false;
        }
    }

    /**
     * Handle context invalidation errors
     */
    handleContextError(error, operation) {
        if (error.message && error.message.includes('Extension context invalidated')) {
            console.warn('🚨 Extension context invalidated during:', operation);
            console.warn('💡 Please reload the extension and refresh DevTools');

            // Show user-friendly message if possible
            if (typeof document !== 'undefined') {
                this.showContextErrorMessage();
            }

            return { success: false, error: 'Extension context invalidated', needsReload: true };
        }
        return null;
    }

    /**
     * Show context error message to user
     */
    showContextErrorMessage() {
        // Create or update error banner
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
            `;
            document.body.prepend(banner);
        }

        banner.innerHTML = '⚠️ Extension context invalidated. Please reload the extension and refresh DevTools.';

        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (banner && banner.parentNode) {
                banner.parentNode.removeChild(banner);
            }
        }, 10000);
    }

    /**
     * Safe wrapper for chrome storage operations
     */
    async safeStorageOperation(operation, operationName) {
        if (!this.isContextValid()) {
            return this.handleContextError(new Error('Extension context invalidated'), operationName);
        }

        try {
            return await operation();
        } catch (error) {
            const contextError = this.handleContextError(error, operationName);
            if (contextError) return contextError;

            console.error(`🚨 Failed to ${operationName}:`, error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Save a mock response for a specific URL
     */
    async saveMock(url, mockData) {
        return this.safeStorageOperation(async () => {
            const key = this.mockPrefix + btoa(url);
            const enhancedMockData = {
                ...mockData,
                createdAt: Date.now(),
                lastUsed: Date.now(),
                useCount: 0,
                url,
            };

            await chrome.storage.local.set({
                [this.storagePrefix + key]: enhancedMockData,
            });

            console.log('🐵 Mock saved for:', url);
            return { success: true };
        }, 'save mock');
    }

    /**
     * Get a mock response for a specific URL
     */
    async getMock(url) {
        return this.safeStorageOperation(async () => {
            const key = this.storagePrefix + this.mockPrefix + btoa(url);
            const result = await chrome.storage.local.get([key]);
            const mockData = result[key];

            if (mockData) {
                // Update usage stats
                mockData.lastUsed = Date.now();
                mockData.useCount = (mockData.useCount || 0) + 1;
                await chrome.storage.local.set({ [key]: mockData });
            }

            return { success: true, data: mockData || null };
        }, 'get mock');
    }

    /**
     * Get all stored mocks
     */
    async getAllMocks() {
        return this.safeStorageOperation(async () => {
            const allItems = await chrome.storage.local.get(null);
            const mocks = {};

            Object.keys(allItems).forEach((key) => {
                if (key.startsWith(this.storagePrefix + this.mockPrefix)) {
                    const mockData = allItems[key];
                    if (mockData && mockData.url) {
                        mocks[mockData.url] = mockData;
                    }
                }
            });

            return { success: true, data: mocks };
        }, 'get all mocks').then((result) => {
            // Return empty object on error for backward compatibility
            return result?.success ? result.data : {};
        });
    }

    /**
     * Remove a mock for a specific URL
     */
    async removeMock(url) {
        try {
            const key = this.storagePrefix + this.mockPrefix + btoa(url);
            await chrome.storage.local.remove([key]);
            console.log('🐵 Mock removed for:', url);
            return true;
        } catch (error) {
            console.error('🚨 Failed to remove mock:', error);
            return false;
        }
    }

    /**
     * Clear all mocks
     */
    async clearAllMocks() {
        try {
            const allItems = await chrome.storage.local.get(null);
            const mockKeys = Object.keys(allItems).filter((key) =>
                key.startsWith(this.storagePrefix + this.mockPrefix),
            );

            if (mockKeys.length > 0) {
                await chrome.storage.local.remove(mockKeys);
            }

            console.log('🐵 All mocks cleared');
            return true;
        } catch (error) {
            console.error('🚨 Failed to clear mocks:', error);
            return false;
        }
    }

    /**
     * Save extension settings
     */
    async saveSettings(settings) {
        try {
            await chrome.storage.local.set({
                [this.storagePrefix + this.settingsKey]: {
                    ...settings,
                    updatedAt: Date.now(),
                },
            });
            return true;
        } catch (error) {
            console.error('🚨 Failed to save settings:', error);
            return false;
        }
    }

    /**
     * Get extension settings
     */
    async getSettings() {
        try {
            const result = await chrome.storage.local.get([this.storagePrefix + this.settingsKey]);
            return result[this.storagePrefix + this.settingsKey] || this.getDefaultSettings();
        } catch (error) {
            console.error('🚨 Failed to get settings:', error);
            return this.getDefaultSettings();
        }
    }

    /**
     * Get default settings
     */
    getDefaultSettings() {
        return {
            enableMocking: true,
            httpRequestsOnly: true, // Focus only on HTTP requests, not assets
            filterText: '',
            autoSave: true,
            showNotifications: true,
            debugMode: false,
        };
    }

    /**
     * Save usage statistics
     */
    async saveStats(stats) {
        try {
            await chrome.storage.local.set({
                [this.storagePrefix + this.statsKey]: {
                    ...stats,
                    updatedAt: Date.now(),
                },
            });
            return true;
        } catch (error) {
            console.error('🚨 Failed to save stats:', error);
            return false;
        }
    }

    /**
     * Get usage statistics
     */
    async getStats() {
        try {
            const result = await chrome.storage.local.get([this.storagePrefix + this.statsKey]);
            return result[this.storagePrefix + this.statsKey] || this.getDefaultStats();
        } catch (error) {
            console.error('🚨 Failed to get stats:', error);
            return this.getDefaultStats();
        }
    }

    /**
     * Get default statistics
     */
    getDefaultStats() {
        return {
            totalRequests: 0,
            mockedRequests: 0,
            activeMocks: 0,
            sessionsCount: 0,
            lastSessionDate: null,
        };
    }

    /**
     * Export all mocks to JSON
     */
    async exportMocks() {
        try {
            const mocks = await this.getAllMocks();
            const exportData = {
                version: '2.0.0',
                exportedAt: new Date().toISOString(),
                mocks,
            };

            return JSON.stringify(exportData, null, 2);
        } catch (error) {
            console.error('🚨 Failed to export mocks:', error);
            return null;
        }
    }

    /**
     * Import mocks from JSON
     */
    async importMocks(jsonData) {
        try {
            const data = JSON.parse(jsonData);

            if (!data.mocks || typeof data.mocks !== 'object') {
                throw new Error('Invalid mock data format');
            }

            let importedCount = 0;

            for (const [url, mockData] of Object.entries(data.mocks)) {
                await this.saveMock(url, mockData);
                importedCount += 1;
            }

            console.log(`🐵 Imported ${importedCount} mocks`);
            return { success: true, count: importedCount };
        } catch (error) {
            console.error('🚨 Failed to import mocks:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get storage usage information
     */
    async getStorageInfo() {
        try {
            const usage = await chrome.storage.local.getBytesInUse();
            const quota = chrome.storage.local.QUOTA_BYTES || 5242880; // 5MB default

            return {
                used: usage,
                quota,
                available: quota - usage,
                percentUsed: (usage / quota) * 100,
            };
        } catch (error) {
            console.error('🚨 Failed to get storage info:', error);
            return null;
        }
    }

    /**
     * Cleanup old or unused mocks
     */
    async cleanupOldMocks(maxAge = 30 * 24 * 60 * 60 * 1000) {
        // 30 days default
        try {
            const mocks = await this.getAllMocks();
            const now = Date.now();
            let cleanedCount = 0;

            for (const [url, mockData] of Object.entries(mocks)) {
                const age = now - (mockData.lastUsed || mockData.createdAt || now);

                if (age > maxAge && (mockData.useCount || 0) === 0) {
                    await this.removeMock(url);
                    cleanedCount += 1;
                }
            }

            console.log(`🐵 Cleaned up ${cleanedCount} old mocks`);
            return cleanedCount;
        } catch (error) {
            console.error('🚨 Failed to cleanup old mocks:', error);
            return 0;
        }
    }
}

// Create global instance
window.MockMonkeyStorage = new MockMonkeyStorageManager();
