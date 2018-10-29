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
    ]
  ],
  env: {
    production: {
      only: ['app'],
      plugins: [
        'lodash',
        'emotion',
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements'
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
