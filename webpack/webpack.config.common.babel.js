import path from 'path';
import webpack from 'webpack';

module.exports = {
  watch: true,
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
            presets: [
              [
                'es2015',
                {
                  modules: false
                }
              ]
            ],
            plugins: [
              'babel-plugin-transform-class-properties'
            ]
          },
        },
      },
    ],
  },
  plugins: [
  ]
};