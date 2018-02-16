import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import MinifyPlugin from 'babel-minify-webpack-plugin';

import common from './webpack.config.common.babel';

module.exports = merge(common, {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('dist', 'assets', 'javascripts'),
  },
  plugins: [
    new webpack.DefinePlugin({ 
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // new MinifyPlugin()
    new webpack.optimize.UglifyJsPlugin()
  ],
});