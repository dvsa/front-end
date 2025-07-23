const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const moment = require('moment');
const common = require('./webpack.config.common.js');
const packageJSON = require('./../package.json');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const banner = `
  Name: ${packageJSON.name}/[name]
  Version: ${packageJSON.version}
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
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.BannerPlugin({
      banner
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminGenerate,
      },
      test: /\.(jpe?g|png|gif|svg)$/i
    })

  ],
});
