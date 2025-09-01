# MockMonkey Chrome Extension

A powerful Chrome DevTools extension for HTTP request inspection, logging, and mocking. Focused on API calls and dynamic requests while filtering out static assets (JavaScript, images, CSS) for cleaner debugging workflows.

## Features

### 🎭 Advanced Mocking Capabilities
- **HTTP Request Interception**: Intercept and mock fetch() and XMLHttpRequest calls
- **Real vs Mock Comparison**: Side-by-side comparison of real and mocked responses
- **Method & Status Control**: Configure HTTP methods and status codes for mocks
- **Response Templates**: Pre-built templates for common response patterns
- **JSON Syntax Highlighting**: Beautiful JSON formatting with syntax highlighting

### 🔧 Developer-Friendly DevTools Integration
- **Native DevTools Panel**: Integrated directly into Chrome DevTools
- **Network Request Logging**: Real-time logging of all HTTP requests
- **Mock Management**: Create, edit, and delete mocks with a visual interface
- **Import/Export**: Share mock configurations between team members
- **Persistent Storage**: Mocks are saved and restored between browser sessions

### 🎯 Intelligent Request Filtering
- **HTTP-Only Focus**: Automatically filters out static assets (JS, CSS, images, fonts)
- **API Request Priority**: Focuses on XHR, fetch(), and document requests
- **Cleaner Debugging**: Eliminates noise from asset loading for better workflow
- **Configurable Filtering**: Toggle between HTTP-only and all request modes

### 🚀 Enhanced Performance & Reliability
- **Chrome Extension APIs**: Uses native Chrome APIs for better performance
- **Background Service Worker**: Reliable network interception
- **Content Script Integration**: Seamless integration with web pages
- **Debugger API**: Advanced network control with chrome.debugger

## Installation

### From Source (Development)
1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `chrome-extension` directory
5. The MockMonkey extension should now appear in your extensions list

### Usage

1. **Enable the Extension**: Click the MockMonkey icon in your browser toolbar
2. **Open DevTools**: Press F12 or right-click → Inspect
3. **Find the MockMonkey Panel**: Look for the 🐵 MockMonkey tab in DevTools
4. **Browse Your Site**: Navigate to the website you want to test
5. **Create Mocks**: 
   - Click on any HTTP request in the MockMonkey panel
   - Click the "Mock" button
   - Edit the response data, status code, and method
   - Save your mock

## Key Improvements Over Original UserScript

### Better Architecture
- **Modular Design**: Separated components for better maintainability
- **TypeScript-Ready**: Modern JavaScript with ES6+ features
- **Chrome APIs**: Native extension APIs instead of monkey-patching

### Enhanced UI/UX
- **DevTools Integration**: Native Chrome DevTools styling and behavior
- **Better Performance**: No more sidebar overlays affecting page layout
- **Keyboard Shortcuts**: Full keyboard navigation support
- **Responsive Design**: Works on different screen sizes

### Advanced Features
- **Network Protocol Support**: Uses Chrome DevTools Protocol for deep network control
- **Mock Analytics**: Track mock usage and statistics
- **Team Collaboration**: Easy import/export of mock configurations
- **Advanced Filtering**: Filter requests by type, domain, method, etc.

## File Structure

```
chrome-extension/
├── manifest.json              # Extension configuration
├── background/
│   └── background.js         # Service worker for network interception
├── devtools/
│   ├── devtools.html         # DevTools entry point
│   ├── devtools.js           # DevTools script
│   ├── panel.html            # Main panel UI
│   ├── panel.js              # Panel logic
│   └── panel.css             # DevTools styling
├── content/
│   └── network-interceptor.js # Content script for network interception
├── popup/
│   ├── popup.html            # Extension popup
│   ├── popup.js              # Popup logic
│   └── popup.css             # Popup styling
└── shared/
    ├── storage-manager.js    # Persistent storage management
    └── mock-definitions.js   # Mock response utilities
```

## Development

### Prerequisites
- Chrome or Chromium browser
- Basic understanding of Chrome Extensions
- Knowledge of JavaScript/ES6+

### Development Workflow
1. Make changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the MockMonkey extension
4. Test your changes

### Debugging
- **Background Script**: Check the service worker console in `chrome://extensions/`
- **DevTools Panel**: Use Chrome DevTools to debug the panel itself
- **Content Script**: Console logs appear in the page's console
- **Popup**: Right-click the extension icon → Inspect popup

## Permissions Explained

- **activeTab**: Access the current tab for network interception
- **debugger**: Use Chrome DevTools Protocol for advanced network control
- **storage**: Save mocks and settings persistently
- **tabs**: Manage tab lifecycle for proper cleanup

## Keyboard Shortcuts

- `Ctrl+Shift+C` - Clear request logs
- `Ctrl+Shift+E` - Export mocks
- `Escape` - Close modal dialogs
- `F12` - Open DevTools (browser shortcut)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Migration from UserScript

If you were using the original MockMonkey userscript:

1. **Export Your Mocks**: Use the export function in the userscript
2. **Install Extension**: Install this Chrome extension
3. **Import Mocks**: Use the import function in the DevTools panel
4. **Disable UserScript**: Remove or disable the old userscript

## Troubleshooting

### Extension Not Working
- Check that the extension is enabled in `chrome://extensions/`
- Ensure you're using a supported website (not chrome:// pages)
- Try refreshing the page after enabling the extension

### Mocks Not Being Applied
- Verify that mocking is enabled in the popup
- Check that the URL matches exactly (including query parameters)
- Look for console errors in the DevTools console

### DevTools Panel Not Visible
- Make sure DevTools is open (F12)
- Look for the 🐵 MockMonkey tab
- Try closing and reopening DevTools

## License

This project is licensed under the same terms as the original MockMonkey project.

## Acknowledgments

- Built upon the excellent MockMonkey userscript
- Inspired by Chrome DevTools and modern web development workflows
- Uses Chrome Extensions Manifest V3 for better performance and security
