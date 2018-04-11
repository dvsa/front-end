import path from 'path';
import webpack from 'webpack';
import ConcatPlugin from 'webpack-concat-plugin';

const config = {
  jsAssets: path.resolve('src', 'assets', 'js'),
};

module.exports = {
  entry: {
    'dvsa': path.resolve(config.jsAssets, 'dvsa', 'index.js'),
    'dvsa-manuals': path.resolve(config.jsAssets, 'dvsa-manuals', 'index.js'),
    'dvsa-mts': path.resolve(config.jsAssets, 'dvsa-mts', 'index.js'),
    'dvsa-mts-legacy': path.resolve(config.jsAssets, 'dvsa-mts-legacy', 'index.js'),
    'development': path.resolve(config.jsAssets, 'development', 'index.js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['env', {
                'targets': {
                  'browsers': [
                    'last 3 versions',
                    'ie >= 9',
                    'last 3 iOS major versions',
                    'ff >= 33',
                    'safari >= 9'
                  ]
                },
                debug: true,
                useBuiltIns: true,
                uglify: true
              }],
              'stage-2',
              'stage-3'
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.bundle.js',
      minChunks: 2
    }),
    new ConcatPlugin({
      name: 'ie-shims',
      fileName: 'ie-shims.js',
      filesToConcat: [
        path.resolve(config.jsAssets, 'ie-shims', 'ie.js'),
        path.resolve(config.jsAssets, 'ie-shims', 'html5.js'),
        path.resolve(config.jsAssets, 'ie-shims', 'mediaqueries.js')
      ]
    }),
  ]
};