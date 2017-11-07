import path from 'path';
import MinifyPlugin from 'babel-minify-webpack-plugin';

module.exports = {
  watch: false,
  entry: {
    mot: './src/assets/js/es6/index.js',
    development: './src/assets/js/development/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public', 'javascripts'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
          },
        },
      },
    ],
  },
  plugins: [new MinifyPlugin()],
};
