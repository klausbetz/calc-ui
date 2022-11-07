module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:boundaries/strict'
  ],
  plugins: [
    '@typescript-eslint',
    'boundaries',
    'vue'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  ignorePatterns: [
    '**/*.d.ts',
    '**/.eslintrc.js',
    '**/node_modules/**/*',
    '**/.yarn/**/*',
    '**/_templates/**/*',
    '**/dist/**/*',
    '**/postcss.config.js',
    '**/tailwind.config.js',
    '*.spec.ts',
    'vite-plugins/**/*',
    'vite.config.ts'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'boundaries/element-types': [
      'error', {
        default: 'disallow',
        // ui is not mentioned here, because it supplies components globally and therefore is imported nowhere
        // auth is not mentioned here, because it only accesses ui's global components
        rules: [
          {
            from: ['ioc-container', 'application'],
            allow: ['application', 'ui', 'auth', 'common', 'repository', 'notifications', 'feature']
          },
          {
            from: 'common',
            allow: ['common', 'auth', 'notifications']
          },
          {
            from: 'repository',
            allow: ['feature', 'auth', 'common']
          },
          {
            from: 'feature',
            allow: [
              // allow importing components of the same family
              ['feature', { 'featureName': '${featureName}' }],
              'notifications',
              'auth',
              'common'
            ]
          }
        ]
      }
    ]
  },
  settings: {
    'boundaries/elements': [
      {
        type: 'ioc-container',
        mode: 'full',
        pattern: 'main.ts'
      },
      {
        type: 'application',
        pattern: 'packages/application'
      },
      {
        type: 'ui',
        pattern: 'packages/ui'
      },
      {
        type: 'auth',
        pattern: 'packages/auth'
      },
      {
        type: 'common',
        pattern: 'packages/common'
      },
      {
        type: 'repository',
        pattern: 'packages/repository'
      },
      {
        type: 'notifications',
        pattern: 'packages/notifications'
      },
      {
        type: 'feature',
        pattern: 'packages/!(ui|application|auth|common|repository|notifications)',
        capture: ['featureName', 'layers', 'file']
      }
    ],
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        extensions: [
          '.ts',
          '.tsx',
          '.d.ts',
          '.jsx',
          '.js',
          '.json',
          '.node',
          '.vue'
        ]
      }
    }
  }
}
