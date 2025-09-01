/**
 * MockMonkey DevTools Script
 * Handles DevTools panel creation and network event listening with context validation
 */

// Context management
let contextValid = true;
let networkListenerActive = true;

/**
 * Check if extension context is valid
 */
function isContextValid() {
    try {
        return chrome.runtime?.id !== undefined;
    } catch (error) {
        return false;
    }
}

/**
 * Safe wrapper for chrome.runtime.sendMessage operations
 */
async function safeRuntimeMessage(message, operationName) {
    if (!isContextValid()) {
        console.debug(`🔍 Extension context invalid during: ${operationName} (skipping gracefully)`);
        contextValid = false;
        networkListenerActive = false;
        return { success: false, error: 'Extension context invalidated' };
    }

    try {
        await chrome.runtime.sendMessage(message);
        return { success: true };
    } catch (error) {
        if (error.message && error.message.includes('Extension context invalidated')) {
            console.warn(`🚨 Extension context invalidated during: ${operationName}`);
            contextValid = false;
            networkListenerActive = false;
            return { success: false, error: 'Extension context invalidated' };
        }

        console.error(`🚨 Failed to ${operationName}:`, error);
        return { success: false, error: error.message };
    }
}

// Create the MockMonkey DevTools panel
chrome.devtools.panels.create(
    '🐵 MockMonkey',
    null, // No icon for now
    'devtools/panel.html',
    (panel) => {
        console.log('🐵 MockMonkey DevTools panel created');

        // Panel lifecycle events
        panel.onShown.addListener((window) => {
            console.log('MockMonkey panel shown');
            // Initialize panel when shown
            try {
                if (window.MockMonkeyPanel && window.MockMonkeyPanel.instance) {
                    window.MockMonkeyPanel.instance.onPanelShown();
                } else {
                    console.warn('MockMonkey panel instance not yet available');
                }
            } catch (error) {
                console.error('Error calling onPanelShown:', error);
            }
        });

        panel.onHidden.addListener(() => {
            console.log('MockMonkey panel hidden');
            // Cleanup when hidden
            try {
                if (window.MockMonkeyPanel && window.MockMonkeyPanel.instance) {
                    window.MockMonkeyPanel.instance.onPanelHidden();
                }
            } catch (error) {
                console.error('Error calling onPanelHidden:', error);
            }
        });
    },
);

// Listen for network events and forward to panel
chrome.devtools.network.onRequestFinished.addListener(async (request) => {
    // Skip if network listener is not active (context invalid)
    if (!networkListenerActive) {
        return;
    }

    // Send network data to our panel
    safeRuntimeMessage(
        {
            type: 'NETWORK_REQUEST',
            data: {
                request: {
                    url: request.request.url,
                    method: request.request.method,
                    headers: request.request.headers,
                    postData: request.request.postData,
                },
                response: {
                    status: request.response.status,
                    statusText: request.response.statusText,
                    headers: request.response.headers,
                    content: null, // We'll get this separately
                },
                startedDateTime: request.startedDateTime,
                time: request.time,
            },
        },
        'send network request',
    );

    // Enhanced content capture with mocking compatibility
    await captureResponseContent(request);
});

/**
 * Capture response content with fallback mechanisms for when mocking is enabled
 */
async function captureResponseContent(request) {
    // Skip if network listener is not active (context invalid)
    if (!networkListenerActive) {
        return;
    }

    const { url } = request.request;

    try {
        // Method 1: Try standard DevTools API first
        request.getContent(async (content, encoding) => {
            // Skip if network listener is not active (context invalid)
            if (!networkListenerActive) {
                return;
            }

            // Check if we got valid content
            if (content && content.length > 0) {
                console.log('📥 Content captured via DevTools API for:', url);

                safeRuntimeMessage(
                    {
                        type: 'NETWORK_RESPONSE_CONTENT',
                        data: {
                            url,
                            content,
                            encoding,
                            method: 'devtools-api',
                        },
                    },
                    'send network response content',
                );
                return;
            }

            // Method 2: Content is empty/null - likely due to debugger attachment
            // Try to get content from background service's debugger session
            console.log('⚠️ Empty content from DevTools API, trying debugger fallback for:', url);

            const backgroundContent = await getContentFromDebuggerSession(url);
            if (backgroundContent) {
                console.log('📥 Content captured via debugger fallback for:', url);

                safeRuntimeMessage(
                    {
                        type: 'NETWORK_RESPONSE_CONTENT',
                        data: {
                            url,
                            content: backgroundContent.content,
                            encoding: backgroundContent.encoding || encoding,
                            method: 'debugger-fallback',
                        },
                    },
                    'send network response content',
                );
                return;
            }

            // Method 3: Final fallback - request content from background service
            console.log('⚠️ No content from debugger, requesting from background service for:', url);

            const requestResult = await safeRuntimeMessage(
                {
                    type: 'REQUEST_RESPONSE_CONTENT',
                    data: { url, tabId: chrome.devtools.inspectedWindow.tabId },
                },
                'request response content from background',
            );

            if (requestResult.success && requestResult.content) {
                console.log('📥 Content retrieved from background service for:', url);

                safeRuntimeMessage(
                    {
                        type: 'NETWORK_RESPONSE_CONTENT',
                        data: {
                            url,
                            content: requestResult.content,
                            encoding: requestResult.encoding || encoding || 'utf8',
                            method: 'background-request',
                        },
                    },
                    'send network response content',
                );
                return;
            }

            // No content available - send empty result with metadata
            console.log('❌ No content available for:', url);

            safeRuntimeMessage(
                {
                    type: 'NETWORK_RESPONSE_CONTENT',
                    data: {
                        url,
                        content: '',
                        encoding: encoding || 'utf8',
                        method: 'no-content',
                        note: 'Content unavailable - may be intercepted by mocking system',
                    },
                },
                'send empty response content',
            );
        });
    } catch (error) {
        console.error('🚨 Error capturing response content for:', url, error);

        // Send error notification
        safeRuntimeMessage(
            {
                type: 'NETWORK_RESPONSE_CONTENT',
                data: {
                    url,
                    content: '',
                    encoding: 'utf8',
                    method: 'error',
                    error: error.message,
                },
            },
            'send error response content',
        );
    }
}

/**
 * Attempt to get response content from debugger session via background service
 */
async function getContentFromDebuggerSession(url) {
    try {
        const response = await safeRuntimeMessage(
            {
                type: 'GET_DEBUGGER_RESPONSE_CONTENT',
                data: {
                    url,
                    tabId: chrome.devtools.inspectedWindow.tabId,
                },
            },
            'get debugger response content',
        );

        if (response.success && response.content) {
            return {
                content: response.content,
                encoding: response.encoding || 'utf8',
            };
        }

        return null;
    } catch (error) {
        console.warn('🚨 Failed to get content from debugger session:', error);
        return null;
    }
}

// Enable network domain
chrome.devtools.network.onNavigated.addListener((url) => {
    console.log('🐵 MockMonkey: Navigation detected to', url);

    // Skip if network listener is not active (context invalid)
    if (!networkListenerActive) {
        return;
    }

    // Clear logs or reset state on navigation if needed
    safeRuntimeMessage(
        {
            type: 'NAVIGATION',
            data: { url },
        },
        'send navigation event',
    );
});
