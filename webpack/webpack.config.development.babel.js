import path from 'path';
import common from './webpack.config.common.babel';
import merge from 'webpack-merge';

module.exports = merge(common, {
  watch: true,
});