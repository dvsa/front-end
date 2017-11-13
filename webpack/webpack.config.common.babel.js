import path from 'path';
import webpack from 'webpack';

module.exports = {
  watch: true,
  entry: {
    mot: path.resolve('src', 'assets', 'js', 'es6', 'index.js'),
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
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({})
  ]
};