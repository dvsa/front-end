const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(common, {
  watch: true,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('public', 'javascripts'),
  },
  devtool: 'eval',
  plugins: [
    /**
     * Adds sourcemaps
     *
     * https://webpack.js.org/plugins/source-map-dev-tool-plugin/
     */
    new webpack.SourceMapDevToolPlugin(),

    /**
     * Creates a bundle size report based on all modules used
     *
     * https://www.npmjs.com/package/webpack-bundle-analyzer
     */
    // Uncomment below to enable bundle analyzer
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 8888,
    //   reportFilename: './../../tmp/webpack-bundle-report.html'
    // }),
  ]
});
