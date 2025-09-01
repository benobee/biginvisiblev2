# MockMonkey Enhanced API Interception

This document describes the advanced network interception capabilities that make MockMonkey work seamlessly across all environments, similar to the Tweak extension.

## 🚀 Enhanced Features

### System-Level Network Interception
- **declarativeNetRequest API**: Uses Chrome's system-level API for request interception that cannot be bypassed by websites
- **Multi-Layer Approach**: Combines content script interception with browser-level rules for comprehensive coverage
- **Production Ready**: Works seamlessly from local development to production environments

### Stealth Mode Operation
- **Anti-Detection**: Masks extension artifacts to prevent websites from detecting the presence of MockMonkey
- **Header Cleaning**: Automatically removes extension-specific headers from requests
- **DOM Protection**: Monitors and cleans extension artifacts from the DOM
- **User Agent Spoofing**: Optional user agent modification to remove extension traces

### Advanced API Coverage
- **Fetch API**: Complete interception with stealth wrapping
- **XMLHttpRequest**: Full lifecycle interception including headers and state changes
- **WebSocket**: Real-time bidirectional communication interception
- **EventSource**: Server-Sent Events interception and mocking
- **Service Worker**: Monitors and can intercept service worker network requests

### Request Modification (Beyond Mocking)
- **Header Modification**: Add, remove, or modify request headers in real-time
- **Method Changes**: Change HTTP methods (GET to POST, etc.)
- **Body Transformation**: Modify request bodies before they're sent
- **Response Transformation**: Transform responses before they reach the application

## 🏗️ Architecture

### Network Service (`background/network-service.js`)
The core network interception engine that operates at the browser level:

```javascript
// System-level rule creation for seamless interception
const rule = {
    id: ruleId,
    priority: 1000,
    action: {
        type: 'redirect',
        redirect: { url: this.createDataUrl(mockData) }
    },
    condition: {
        urlFilter: urlPattern,
        resourceTypes: ['main_frame', 'sub_frame', 'xmlhttprequest', 'other']
    }
};
```

### Stealth Interceptor (`content/stealth-interceptor.js`)
Advanced content script with anti-detection capabilities:

```javascript
// Stealth fetch wrapper that masks extension presence
function stealthFetch(input, init = {}) {
    // Apply stealth modifications
    const stealthInit = self.applyStealthModifications(url, init);
    
    // Execute with anti-detection features
    return originalFetch.apply(this, [input, stealthInit]);
}
```

### Enhanced Background (`background/background.js`)
Coordinates between system-level and content script interception:

```javascript
// Dual-layer interception approach
await this.initNetworkService(); // System-level
this.setupDebuggerInterception(); // Protocol-level
```

## 🛠️ Usage Examples

### Basic API Mocking
```javascript
// Create a mock that works everywhere
await MockMonkeyStorage.saveMock('https://api.example.com/data', {
    status: 200,
    response: JSON.stringify({ success: true, data: [...] }),
    headers: { 'Content-Type': 'application/json' }
});
```

### Request Modification
```javascript
// Modify requests in real-time
chrome.runtime.sendMessage({
    type: 'MODIFY_REQUEST_HEADERS',
    url: 'https://api.example.com/*',
    modifications: {
        headers: {
            'Authorization': 'Bearer mock-token',
            'X-API-Key': 'development-key'
        }
    }
});
```

### Stealth Mode Configuration
```javascript
// Enable maximum stealth
await MockMonkeyStorage.saveSettings({
    stealthMode: true,
    maskExtensionArtifacts: true,
    removeExtensionHeaders: true,
    spoofUserAgent: true
});
```

## 🔬 Testing Framework

The enhanced interception includes a comprehensive test suite (`test-enhanced-interception.js`):

```javascript
// Run all interception tests
const tester = new MockMonkeyInterceptionTest();
const results = await tester.runAllTests();

// Results show capability coverage
console.log(`Interception Coverage: ${results.passRate}%`);
```

### Test Categories
1. **Basic API Interception**: Fetch, XHR, WebSocket, EventSource
2. **Stealth Features**: Anti-detection, artifact masking
3. **Request Modification**: Header manipulation, method changes
4. **System-Level**: declarativeNetRequest integration
5. **Tweak-like Capabilities**: Production environment compatibility

## 🌐 Environment Compatibility

### Local Development
- `http://localhost:*` - Full interception support
- `file://` protocols - Content script interception
- Development servers - System-level rule matching

### Production Environments  
- HTTPS domains - Complete system-level interception
- Cross-origin requests - CORS handling in mocks
- CDN resources - Selective interception based on rules

### Enterprise/Restricted
- Corporate networks - Stealth mode prevents detection
- Security scanners - Anti-fingerprinting features
- Compliance tools - Clean request/response modification

## ⚙️ Configuration Options

### Network Service Settings
```javascript
{
    enableMocking: true,           // Master switch for all interception
    maxRules: 1000,               // Chrome limit for dynamic rules
    batchSize: 50,                // Rule creation batch size
    stealthMode: true,            // Enable anti-detection features
    systemLevelOnly: false        // Use only declarativeNetRequest
}
```

### Stealth Configuration
```javascript
{
    maskExtensionArtifacts: true,     // Hide chrome.runtime references
    removeExtensionHeaders: true,     // Clean request headers
    spoofUserAgent: false,            // Modify user agent string
    domProtection: true,              // Monitor DOM for artifacts
    headerBlacklist: [                // Headers to always remove
        'X-Chrome-Extension',
        'X-Extension-ID'
    ]
}
```

## 🚨 Security Considerations

### Request Interception Security
- **Content Security Policy**: Stealth mode respects CSP restrictions
- **Same-Origin Policy**: Mocks properly handle CORS requirements  
- **Header Validation**: Prevents injection of malicious headers
- **URL Sanitization**: Validates and sanitizes intercepted URLs

### Data Privacy
- **No Data Collection**: Interception operates locally only
- **Secure Storage**: Uses Chrome's encrypted storage APIs
- **Memory Management**: Automatic cleanup of intercepted data
- **Audit Trail**: Optional logging of interception activities

## 🔧 Troubleshooting

### Common Issues

#### System-Level Rules Not Working
```javascript
// Check declarativeNetRequest permissions
console.log('DNR Available:', typeof chrome.declarativeNetRequest !== 'undefined');

// Verify rule count
const rules = await chrome.declarativeNetRequest.getDynamicRules();
console.log('Active Rules:', rules.length);
```

#### Stealth Mode Detection
```javascript
// Test anti-detection features
const test = new MockMonkeyInterceptionTest();
await test.testStealthMode();
await test.testAntiDetection();
```

#### Content Script Conflicts
```javascript
// Check for multiple interceptors
console.log('Fetch wrapped:', window.fetch !== window.originalFetch);
console.log('XHR wrapped:', window.XMLHttpRequest !== window.originalXHR);
```

### Performance Optimization

#### Rule Management
- Limit active rules to essential mocks only
- Use URL patterns efficiently to reduce rule count
- Batch rule updates to minimize browser overhead

#### Memory Usage
- Enable automatic cleanup of old intercepted requests
- Limit request history retention time
- Use weak references for temporary mocks

## 📈 Comparison with Tweak Extension

| Feature | MockMonkey Enhanced | Tweak Extension |
|---------|-------------------|-----------------|
| System-level interception | ✅ declarativeNetRequest | ✅ |
| Stealth mode | ✅ Full anti-detection | ✅ |
| Request modification | ✅ Headers, body, method | ✅ |
| Production compatibility | ✅ All environments | ✅ |
| WebSocket support | ✅ Complete interception | ✅ |
| EventSource support | ✅ SSE interception | ✅ |
| Developer tools | ✅ Comprehensive UI | ✅ |
| Open source | ✅ | ❌ |

## 🚀 Advanced Usage Patterns

### Mock Chaining
```javascript
// Chain multiple mocks for complex scenarios
const baseUrl = 'https://api.example.com';
await MockMonkeyStorage.saveMock(`${baseUrl}/auth`, authMock);
await MockMonkeyStorage.saveMock(`${baseUrl}/user`, userMock);
await MockMonkeyStorage.saveMock(`${baseUrl}/data`, dataMock);
```

### Conditional Mocking
```javascript
// Mock based on request conditions
const conditionalMock = {
    url: 'https://api.example.com/data',
    conditions: {
        headers: { 'X-Environment': 'development' },
        method: 'GET'
    },
    response: developmentData
};
```

### Dynamic Response Generation
```javascript
// Generate responses based on request parameters
const dynamicMock = {
    url: 'https://api.example.com/users/:id',
    responseGenerator: (request) => {
        const userId = request.params.id;
        return generateUserData(userId);
    }
};
```

## 📝 Development Guide

### Adding New Interception Types
1. Extend `StealthInterceptor` class
2. Add method to `interceptTargets` configuration
3. Implement interception logic with stealth wrapping
4. Add corresponding tests to test suite

### Custom Anti-Detection Features
1. Extend `enableStealthMode()` method
2. Add new artifact cleaning rules
3. Update DOM protection observer
4. Test against detection tools

This enhanced interception architecture makes MockMonkey a powerful alternative to commercial tools like Tweak, with the added benefit of being open source and fully customizable.
