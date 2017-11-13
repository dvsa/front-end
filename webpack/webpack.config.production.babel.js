import common from './webpack.config.common.babel';
import merge from 'webpack-merge';
import MinifyPlugin from 'babel-minify-webpack-plugin';

module.exports = merge(common, {
  plugins: [
    new MinifyPlugin()
  ],
});