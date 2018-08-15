import os from 'os';
import path from 'path';
import webpack from 'webpack';
import ConcatPlugin from 'webpack-concat-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

/**
 * Constants
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.2.0
 */
const config = {
  paths: {
    scss: path.resolve('src', 'assets', 'scss'),
    js: path.resolve('src', 'assets', 'js'),
    fonts: path.resolve('src', 'assets', 'fonts'),
    images: path.resolve('src', 'assets', 'img'),
    misc: path.resolve('src', 'assets', 'misc'),
    mtsPublicAssets: path.join(os.homedir(), 'MOTDEV', 'mot', 'mot-web-frontend', 'public', 'assets'),
    manuals3456Assets: path.join(os.homedir(), 'MOTDEV', 'mot-manuals-transformer', 'manuals', 'class3457', 'assets'),
    manuals12Assets: path.join(os.homedir(), 'MOTDEV', 'mot-manuals-transformer', 'manuals', 'class12', 'assets'),
  }
};

/**
 * Checks environment variable to see if we are in production mode
 * 
 * @returns {Boolean} true if we are in production and false otherwise 
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.2.0
 */
const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

/**
 * Get the extract text plugin loader settings based on environment
 * 
 * @returns A webpack loader array
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.2.0
 */
const getExtractTextPluginLoaders = () => {
  let postCSSPlugins = [
    require('autoprefixer')({
      browsers: [
        "ie 8",
        "ie 9",
        "ie 10",
        "ie 11",
        "last 2 versions"
      ]
    })
  ];

  if(isProduction()) {
    postCSSPlugins.push(require('cssnano')({
      preset: 'advanced',
      minifyFontValues: false
    }));
  }

  return ExtractTextPlugin.extract({
    use: [
      {
        loader: 'css-loader',
        options: {
          url: false,
          sourceMap: !isProduction()
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: !isProduction(),
          plugins: postCSSPlugins,
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: !isProduction(),
        }
      },
    ]
  })
};

/**
 * Get settings for copying files
 * 
 * @returns array containing all settings
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.2.2
 */
const getCopyWebpackPluginSettings = () => {
  let copyWebpackPluginSettings = [
    new CopyWebpackPlugin([
      {
        context: path.resolve(config.paths.fonts),
        from: '**/*',
        to: '../fonts'
      },
      {
        context: path.resolve(config.paths.images),
        from: '**/*',
        to: '../images',
      },
      {
        context: path.resolve(config.paths.misc),
        from: '**/*',
        to: '../misc'
      }
    ])
  ];

  // Check environment variable
  // to copy public assets to mts
  if(process.env.COPY_TO_MTS) {
    copyWebpackPluginSettings.push(new CopyWebpackPlugin([
      {
        context: path.resolve('public'),
        from: '**/*',
        to: config.paths.mtsPublicAssets,
        force: true,
      }
    ]));
  }

  // Check environment variable
  // to copy public assets to manuals
  if(process.env.COPY_TO_MANUALS) {
    // Class 3457
    copyWebpackPluginSettings.push(new CopyWebpackPlugin([
      {
        context: path.resolve('public'),
        from: '**/*',
        to: config.paths.manuals3456Assets,
        force: true,
      }
    ]));

    // Class 12
    copyWebpackPluginSettings.push(new CopyWebpackPlugin([
      {
        context: path.resolve('public'),
        from: '**/*',
        to: config.paths.manuals12Assets,
        force: true,
      }
    ]));
  }

  return copyWebpackPluginSettings;
}

/**
 * Webpack configuration
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.2.0
 */
export default {
  entry: {
    'dvsa': path.resolve(config.paths.js, 'dvsa', 'index.js'),
    'dvsa-manuals': path.resolve(config.paths.js, 'dvsa-manuals', 'index.js'),
    'dvsa-mts': path.resolve(config.paths.js, 'dvsa-mts', 'index.js'),
    'dvsa-mts-legacy': path.resolve(config.paths.js, 'dvsa-mts-legacy', 'index.js'),
    'development': path.resolve(config.paths.js, 'development', 'index.js'),
    'styles': path.resolve(config.paths.scss, 'styles.scss'),
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
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: getExtractTextPluginLoaders(),
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: 2
    }),
    new ConcatPlugin({
      name: 'ie-shims',
      fileName: 'ie-shims.js',
      filesToConcat: [
        path.resolve(config.paths.js, 'ie-shims', 'ie.js'),
        path.resolve(config.paths.js, 'ie-shims', 'html5.js'),
        path.resolve(config.paths.js, 'ie-shims', 'mediaqueries.js')
      ],
      uglify: {
        ie8: true
      }
    }),
    new ExtractTextPlugin({
      filename: '../stylesheets/[name].css'
    }),
    ...getCopyWebpackPluginSettings()
  ]
};