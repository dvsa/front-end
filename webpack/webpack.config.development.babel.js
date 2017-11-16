import path from 'path';
import webpack from 'webpack';
import common from './webpack.config.common.babel';
import merge from 'webpack-merge';

module.exports = merge(common, {
  watch: true,
  plugins: [
    // More info:
    // https://webpack.js.org/plugins/source-map-dev-tool-plugin/
    new webpack.SourceMapDevToolPlugin()
  ]
});