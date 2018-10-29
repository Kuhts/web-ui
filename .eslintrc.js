const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  parser: 'babel-eslint',
  // extends: ['airbnb', 'prettier', 'prettier/react'],
  extends: ['airbnb'],
  plugins: [
  // 'prettier',
  // 'redux-saga',
  'react',
  'jsx-a11y',
  ],
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // 'prettier/prettier': ['error', prettierOptions],
    'arrow-body-style': [2, 'as-needed'],
    'class-methods-use-this': 0,
    'comma-dangle': [2, {
      arrays: 'never',
      objects: 'always',
      imports: 'always',
      exports: 'always',
      functions: 'ignore',
    }],
    'comma-spacing': 0,
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 2,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    'jsx-a11y/aria-props': 2,
    'jsx-a11y/heading-has-content': 0,
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        // NOTE: If this error triggers, either disable it or add
        // your custom components, labels and attributes via these options
        // See https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
        controlComponents: ['Input'],
      },
    ],
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/mouse-events-have-key-events': 2,
    'jsx-a11y/role-has-required-aria-props': 2,
    'jsx-a11y/role-supports-aria-props': 2,
    'key-spacing': [2, {
      mode: 'strict',
      // multiline: {},
    }],
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 1,
    'no-param-reassign': 0,
    'no-return-assign': ['error', 'except-parens'],
    'no-shadow': 0,
    'no-throw-literal': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': [2, {
      args: 'none',
      caughtErrors: 'none',
    }],
    'no-use-before-define': 0,
    'no-useless-rename': 2,
    'object-property-newline': [2, {
      'allowAllPropertiesOnSameLine': false,
    }],
    'prefer-template': 2,
    'prefer-destructuring': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-closing-tag-location': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-first-prop-new-line': 0,//[2, 'multiline'],
    'react/jsx-filename-extension': 0,
    'react/jsx-indent': [2, 2],
    'react/jsx-no-target-blank': 0,
    'react/jsx-uses-vars': 2,
    'react/no-array-index-key': 0,
    'react/no-render-return-value': 0,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'react/sort-comp': 0,
    // 'redux-saga/no-yield-in-race': 2,
    // 'redux-saga/yield-effects': 2,
    'require-yield': 0,
    'semi': [2, 'never', {
      'beforeStatementContinuationChars': 'never',
    }],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './internals/webpack/webpack.prod.babel.js',
      },
    },
  },
};
