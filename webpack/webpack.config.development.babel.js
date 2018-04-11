import path from 'path';
import webpack from 'webpack';
import common from './webpack.config.common.babel';
import merge from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

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
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 8888,
    //   // Relative to output path
    //   reportFilename: './../../tmp/webpack-bundle-report.html'
    // }),
  ]
});