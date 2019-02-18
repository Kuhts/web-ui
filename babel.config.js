module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    'lodash',
    'emotion',
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
      },
      'ant'
    ],
    [
      'import',
      {
        libraryName: 'ant-mobile',
        libraryDirectory: 'lib',
      },
      'ant-mobile'
    ],
    'transform-react-remove-prop-types',
    // '@babel/plugin-transform-runtime',
    // '@babel/plugin-transform-react-inline-elements',
    '@babel/plugin-transform-react-constant-elements'
  ],
  env: {
    production: {
      only: ['src'],
      plugins: [
      ],
    },
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node'
      ],
    },
  },
}
