import path from 'path';
import webpack from 'webpack';

module.exports = {
  entry: {
    dvsa: path.resolve('src', 'assets', 'js', 'dvsa', 'index.js'),
    'ie-shims': path.resolve('src', 'assets', 'js', 'ie-shims', 'index.js'),
    development: path.resolve('src', 'assets', 'js', 'development', 'index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('public', 'javascripts'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['env', {
                'targets': {
                  'browsers': [
                    'last 5 versions',
                    'ie >= 9',
                    'last 5 iOS major versions'
                  ]
                },
                'debug': true,
                useBuiltIns: true,
              }],
              'stage-2',
              'stage-3'
            ],
          },
        },
      },
    ],
  }
};