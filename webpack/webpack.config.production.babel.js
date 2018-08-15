import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import moment from 'moment';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ImageminWebpackPlugin from 'imagemin-webpack-plugin';

import common from './webpack.config.common.babel';
import * as packageJSON from './../package.json';

const banner = `
  Name: ${packageJSON.name}/[name]
  Version: ${packageJSON.version}
  Author: ${packageJSON.author}
  Contributors: ${packageJSON.contributors.join(', ')}
  Timestamp: ${moment().format('MMMM Do YYYY, h:mm:ss a')}
  Source: https://github.com/dvsa/front-end
`;

export default merge(common, {
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
    }),
    new ImageminWebpackPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i
    })
  ],
});