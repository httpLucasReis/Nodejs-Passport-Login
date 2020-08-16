module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@controllers': './src/app/controllers',
          '@models': './src/app/models',
          '@middlewares': './src/app/middlewares',
          '@validators': './src/app/validators',
          '@config': './src/config',
          '@contracts': './src/contracts',
          '@services': './src/services',
          '@utils': './src/utils',
        },
      },
    ],
  ],
  ignore: ['**/*.(spec|test).ts'],
};
