import path from 'path';
import common from './webpack.config.common.babel';
import merge from 'webpack-merge';
import MinifyPlugin from 'babel-minify-webpack-plugin';

module.exports = merge(common, {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('dist', 'assets', 'javascripts'),
  },
  plugins: [
    new MinifyPlugin()
  ],
});