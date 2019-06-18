module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module-resolver',
      {
        root: ['./App'],
        alias: {
          '@assets': './App/assets',
          '@Components': './App/Components',
          '@Config': './App/Config',
          '@Localize': './App/Localize',
          '@Network': './App/Network',
          '@Styles': './App/Styles',
          '@Utils': './App/Utils',
          '@Views': './App/Views',
          '@Modals': './App/Modals',
          '@Store': './App/Store',
          '@Service': './App/Service',
          '@Middleware': './App/Middleware',
        },
      },
    ],
  ],
};
