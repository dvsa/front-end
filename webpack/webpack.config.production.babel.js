import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import moment from 'moment';

import common from './webpack.config.common.babel';
import * as packageJSON from './../package.json';

const banner = `
  Name: ${packageJSON.name}
  Version: ${packageJSON.version}
  Author: ${packageJSON.author}
  Contributors: ${packageJSON.contributors.join(', ')}
  Timestamp: ${moment().format('MMMM Do YYYY, h:mm:ss a')}
  Source: https://github.com/dvsa/front-end
`;

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
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    }),
    new webpack.BannerPlugin({
      banner
    })
  ],
});