/**
 * Mock Definitions and Utilities for MockMonkey Chrome Extension
 * Handles mock response creation, validation, and management
 */

/* eslint-disable no-redeclare */
class MockDefinitions {
    constructor() {
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        };
    }

    /**
     * Create a new mock definition from a request
     */
    createMockFromRequest(requestData, responseData) {
        const mockDefinition = {
            method: requestData.method || 'GET',
            url: requestData.url,
            status: responseData.status || 200,
            statusText: responseData.statusText || 'OK',
            headers: { ...this.defaultHeaders },
            response: responseData.content || '',
            delay: 0, // Response delay in milliseconds

            // Metadata
            createdAt: Date.now(),
            lastUsed: null,
            useCount: 0,

            // Advanced options
            enabled: true,
            matchType: 'exact', // exact, regex, contains
            conditions: [], // Additional matching conditions
            sequence: null, // For sequence responses

            // Tags and organization
            tags: [],
            description: '',
            category: 'auto-generated',
        };

        // Try to parse and save JSON responses as compact strings
        if (responseData.content) {
            try {
                const parsed = JSON.parse(responseData.content);
                mockDefinition.response = JSON.stringify(parsed);
                mockDefinition.headers['Content-Type'] = 'application/json';
            } catch (e) {
                // Not JSON, keep as-is
                mockDefinition.response = responseData.content;

                // Guess content type based on content
                if (responseData.content.trim().startsWith('<')) {
                    mockDefinition.headers['Content-Type'] = 'text/html';
                } else {
                    mockDefinition.headers['Content-Type'] = 'text/plain';
                }
            }
        }

        return mockDefinition;
    }

    /**
     * Validate a mock definition
     */
    validateMockDefinition(mockDef) {
        const errors = [];
        const warnings = [];

        // Required fields
        if (!mockDef.url) {
            errors.push('URL is required');
        }

        if (!mockDef.method) {
            errors.push('HTTP method is required');
        }

        if (mockDef.status === undefined || mockDef.status === null) {
            errors.push('HTTP status code is required');
        }

        // Validation checks
        if (mockDef.status && (mockDef.status < 100 || mockDef.status > 599)) {
            errors.push('HTTP status code must be between 100 and 599');
        }

        if (
            mockDef.method &&
            !['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'].includes(mockDef.method.toUpperCase())
        ) {
            warnings.push(`Unusual HTTP method: ${mockDef.method}`);
        }

        if (mockDef.delay && mockDef.delay > 10000) {
            warnings.push('Response delay is very high (>10s)');
        }

        // JSON validation
        if (
            mockDef.headers &&
            mockDef.headers['Content-Type'] &&
            mockDef.headers['Content-Type'].includes('json') &&
            mockDef.response
        ) {
            try {
                JSON.parse(mockDef.response);
            } catch (e) {
                errors.push('Response body is not valid JSON despite Content-Type being application/json');
            }
        }

        return {
            valid: errors.length === 0,
            errors,
            warnings,
        };
    }

    /**
     * Create mock response templates
     */
    getResponseTemplates() {
        return {
            success: {
                name: '✅ Success Response',
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                response: JSON.stringify({ success: true, message: 'Operation completed successfully' }),
            },
            error400: {
                name: '❌ Bad Request',
                status: 400,
                headers: { 'Content-Type': 'application/json' },
                response: JSON.stringify({ error: 'Bad Request', message: 'The request is invalid' }),
            },
            error401: {
                name: '🔒 Unauthorized',
                status: 401,
                headers: { 'Content-Type': 'application/json' },
                response: JSON.stringify({ error: 'Unauthorized', message: 'Authentication required' }),
            },
            error403: {
                name: '🚫 Forbidden',
                status: 403,
                headers: { 'Content-Type': 'application/json' },
                response: JSON.stringify({ error: 'Forbidden', message: 'Access denied' }),
            },
            error404: {
                name: '🔍 Not Found',
                status: 404,
                headers: { 'Content-Type': 'application/json' },
                response: JSON.stringify({ error: 'Not Found', message: 'Resource not found' }),
            },
            error500: {
                name: '💥 Server Error',
                status: 500,
                headers: { 'Content-Type': 'application/json' },
                response: JSON.stringify({ error: 'Internal Server Error', message: 'Something went wrong' }),
            },
            loading: {
                name: '⏳ Loading State',
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                response: JSON.stringify({ loading: true, message: 'Processing request...' }),
            },
            empty: {
                name: '📭 Empty Response',
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                response: JSON.stringify([]),
            },
            listData: {
                name: '📋 List Data',
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                response: JSON.stringify({
                    data: [
                        { id: 1, name: 'Item 1', status: 'active' },
                        { id: 2, name: 'Item 2', status: 'inactive' },
                        { id: 3, name: 'Item 3', status: 'pending' },
                    ],
                    total: 3,
                    page: 1,
                    limit: 10,
                }),
            },
            userProfile: {
                name: '👤 User Profile',
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                response: JSON.stringify({
                    id: 123,
                    username: 'john_doe',
                    email: 'john@example.com',
                    firstName: 'John',
                    lastName: 'Doe',
                    avatar: 'https://via.placeholder.com/150',
                    createdAt: new Date().toISOString(),
                    preferences: {
                        theme: 'dark',
                        notifications: true,
                    },
                }),
            },
        };
    }

    /**
     * Check if URL matches mock definition
     */
    urlMatches(requestUrl, mockUrl, matchType = 'exact') {
        switch (matchType) {
            case 'exact':
                return requestUrl === mockUrl;
            case 'contains':
                return requestUrl.includes(mockUrl);
            case 'regex':
                try {
                    const regex = new RegExp(mockUrl);
                    return regex.test(requestUrl);
                } catch (e) {
                    console.warn('Invalid regex pattern:', mockUrl);
                    return false;
                }
            case 'startsWith':
                return requestUrl.startsWith(mockUrl);
            case 'endsWith':
                return requestUrl.endsWith(mockUrl);
            default:
                return requestUrl === mockUrl;
        }
    }

    /**
     * Generate mock response object for network interception
     */
    createNetworkResponse(mockDef) {
        const response = {
            status: mockDef.status || 200,
            statusText: mockDef.statusText || 'OK',
            headers: mockDef.headers || this.defaultHeaders,
            body: mockDef.response || '',
        };

        // Add delay if specified
        if (mockDef.delay && mockDef.delay > 0) {
            response.delay = mockDef.delay;
        }

        return response;
    }

    /**
     * Format response content for display
     */
    formatResponse(content, contentType = '') {
        if (!content) return '';

        try {
            // Try to format as JSON
            if (contentType.includes('json') || this.isJsonString(content)) {
                const parsed = JSON.parse(content);
                return JSON.stringify(parsed, null, 2);
            }
        } catch (e) {
            // Not JSON, return as-is
        }

        return content;
    }

    /**
     * Check if string is valid JSON
     */
    isJsonString(str) {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Extract URL patterns for auto-suggestions
     */
    extractUrlPatterns(urls) {
        const patterns = new Set();

        urls.forEach((url) => {
            try {
                const urlObj = new URL(url);

                // Add base patterns
                patterns.add(urlObj.origin);
                patterns.add(urlObj.origin + urlObj.pathname);

                // Add pathname patterns
                const pathParts = urlObj.pathname.split('/').filter(Boolean);
                let currentPath = '';

                pathParts.forEach((part) => {
                    currentPath += `/${part}`;
                    patterns.add(urlObj.origin + currentPath);

                    // Add wildcard patterns for IDs/UUIDs
                    if (/^\d+$/.test(part) || /^[0-9a-f-]{8,}$/i.test(part)) {
                        const wildcardPath = currentPath.replace(`/${part}`, '/*');
                        patterns.add(urlObj.origin + wildcardPath);
                    }
                });
            } catch (e) {
                // Invalid URL, skip
            }
        });

        return Array.from(patterns);
    }

    /**
     * Generate HTTP status code information
     */
    getStatusInfo(statusCode) {
        const statusInfo = {
            100: { category: 'info', name: 'Continue' },
            101: { category: 'info', name: 'Switching Protocols' },
            200: { category: 'success', name: 'OK' },
            201: { category: 'success', name: 'Created' },
            202: { category: 'success', name: 'Accepted' },
            204: { category: 'success', name: 'No Content' },
            300: { category: 'redirect', name: 'Multiple Choices' },
            301: { category: 'redirect', name: 'Moved Permanently' },
            302: { category: 'redirect', name: 'Found' },
            304: { category: 'redirect', name: 'Not Modified' },
            400: { category: 'client-error', name: 'Bad Request' },
            401: { category: 'client-error', name: 'Unauthorized' },
            403: { category: 'client-error', name: 'Forbidden' },
            404: { category: 'client-error', name: 'Not Found' },
            405: { category: 'client-error', name: 'Method Not Allowed' },
            409: { category: 'client-error', name: 'Conflict' },
            422: { category: 'client-error', name: 'Unprocessable Entity' },
            429: { category: 'client-error', name: 'Too Many Requests' },
            500: { category: 'server-error', name: 'Internal Server Error' },
            502: { category: 'server-error', name: 'Bad Gateway' },
            503: { category: 'server-error', name: 'Service Unavailable' },
            504: { category: 'server-error', name: 'Gateway Timeout' },
        };

        return (
            statusInfo[statusCode] || {
                category: 'unknown',
                name: `Status ${statusCode}`,
            }
        );
    }
}

// Create global instance
window.MockDefinitions = new MockDefinitions();
