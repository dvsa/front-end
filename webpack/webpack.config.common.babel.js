import path from 'path';
import webpack from 'webpack';

module.exports = {
  entry: {
    dvsa: path.resolve('src', 'assets', 'js', 'dvsa', 'index.js'),
    development: path.resolve('src', 'assets', 'js', 'development', 'index.js'),
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
                    'last 3 versions',
                    'ie >= 9',
                    'last 3 iOS major versions'
                  ]
                },
                debug: true,
                useBuiltIns: true,
                uglify: true
              }],
              'stage-2',
              'stage-3',
              'react'
            ],
          },
        },
      },
    ],
  }
};