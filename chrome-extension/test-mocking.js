/**
 * MockMonkey Test Script
 * Run this in the browser console to test mocking functionality
 */

(function () {
    console.log('🧪 MockMonkey Test Script Starting...');

    // Test URL for API calls
    const TEST_API_URL = 'https://jsonplaceholder.typicode.com/posts/1';

    // Create a simple test mock
    const createTestMock = async () => {
        console.log('🎭 Creating test mock...');

        const mockData = {
            method: 'GET',
            status: 200,
            response: JSON.stringify(
                {
                    id: 999,
                    title: 'MOCKED POST TITLE',
                    body: 'This is a mocked response from MockMonkey!',
                    userId: 999,
                    __mocked: true,
                },
                null,
                2,
            ),
        };

        // Use the storage manager to save the mock
        if (window.MockMonkeyStorage) {
            await window.MockMonkeyStorage.saveMock(TEST_API_URL, mockData);
            console.log('✅ Test mock created for:', TEST_API_URL);
        } else {
            console.error('❌ MockMonkeyStorage not available');
        }
    };

    // Test fetch() interception
    const testFetch = async () => {
        console.log('🔄 Testing fetch() interception...');

        try {
            const response = await fetch(TEST_API_URL);
            const data = await response.json();

            console.log('📡 Fetch Response:', {
                status: response.status,
                isMocked: response._isMocked,
                data,
            });

            if (response._isMocked && data.__mocked) {
                console.log('✅ Fetch mocking is WORKING! 🎉');
            } else {
                console.log('❌ Fetch mocking is NOT working - got real response');
            }
        } catch (error) {
            console.error('❌ Fetch test failed:', error);
        }
    };

    // Test XMLHttpRequest interception
    const testXHR = () => {
        console.log('🔄 Testing XHR interception...');

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    try {
                        const data = JSON.parse(xhr.responseText);

                        console.log('📡 XHR Response:', {
                            status: xhr.status,
                            isMocked: xhr._isMocked,
                            data,
                        });

                        if (xhr._isMocked && data.__mocked) {
                            console.log('✅ XHR mocking is WORKING! 🎉');
                        } else {
                            console.log('❌ XHR mocking is NOT working - got real response');
                        }

                        resolve();
                    } catch (error) {
                        console.error('❌ XHR test failed:', error);
                        reject(error);
                    }
                }
            };

            xhr.open('GET', TEST_API_URL);
            xhr.send();
        });
    };

    // Check if content script is loaded
    const checkContentScript = () => {
        console.log('🔍 Checking content script status...');

        if (window.MockMonkeyInterceptor) {
            console.log('✅ Content script loaded');
            console.log('📊 Interceptor status:', {
                enabled: window.MockMonkeyInterceptor.isEnabled,
                mocksCount: window.MockMonkeyInterceptor.mocks.size,
                mocks: Array.from(window.MockMonkeyInterceptor.mocks.keys()),
            });
        } else {
            console.log('❌ Content script not found');
        }
    };

    // Main test function
    const runTests = async () => {
        console.log('🚀 Starting MockMonkey Tests...');

        // Check content script
        checkContentScript();

        // Wait a moment for content script to initialize
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Create test mock
        await createTestMock();

        // Wait for mock to be loaded
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Reload mocks in content script if available
        if (window.MockMonkeyInterceptor) {
            await window.MockMonkeyInterceptor.loadMocks();
            console.log('🔄 Reloaded mocks in content script');
        }

        // Test fetch
        await testFetch();

        // Wait a moment
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Test XHR
        await testXHR();

        console.log('🏁 MockMonkey Tests Complete!');
    };

    // Export to global scope for manual testing
    window.MockMonkeyTest = {
        runTests,
        createTestMock,
        testFetch,
        testXHR,
        checkContentScript,
        TEST_API_URL,
    };

    console.log('🧪 MockMonkey Test Script Ready!');
    console.log('📝 Run: window.MockMonkeyTest.runTests() to start tests');
    console.log('📝 Or run individual tests: window.MockMonkeyTest.testFetch()');

    // Auto-run tests if requested
    if (window.location.hash === '#test-mocking') {
        console.log('🏃 Auto-running tests...');
        setTimeout(runTests, 1000);
    }
})();
