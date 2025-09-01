module.exports = {
    env: {
        browser: true,
        es2021: true,
        webextensions: true
    },
    extends: [
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    globals: {
        chrome: 'readonly',
        MockMonkeyStorage: 'readonly',
        MockDefinitions: 'readonly',
        importScripts: 'readonly',
        WorkerGlobalScope: 'readonly'
    },
    rules: {
        'no-console': 'off',
        'no-unused-vars': 'warn',
        'no-underscore-dangle': 'off', // Allow underscore prefixed properties for internal use
        'consistent-return': 'off', // Allow functions without explicit returns
        'no-param-reassign': 'off', // Allow parameter reassignment for mocking
        'prefer-rest-params': 'off', // Allow arguments object for dynamic forwarding
        'no-invalid-this': 'off', // Allow this aliasing for closures
        'no-this-alias': 'off', // Allow this aliasing
        'no-plusplus': 'off', // Allow ++ operator
        'no-alert': 'off', // Allow confirm, alert, prompt
        'new-cap': 'off', // Allow lowercase constructor names for mocking
        'no-continue': 'off', // Allow continue statements in loops
        'default-case': 'off', // Allow switch statements without default case
        'no-useless-escape': 'off', // Allow escaping in regex patterns
        'padded-blocks': 'off', // Allow padded blocks for readability
        '@typescript-eslint/no-this-alias': 'off', // Allow this aliasing for closures
        'consistent-this': 'off' // Allow this aliasing
    }
};
