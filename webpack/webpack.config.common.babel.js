import os from 'os';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

/**  Constants */
const isCopyToMTS = process.env.COPY_TO_MTS === true;
const isCopyToMOTH = process.env.COPY_TO_MOTH === true;
const isCopyToManuals = process.env.COPY_TO_MANUALS === true;

const config = {
  paths: {
    scss: path.resolve('src', 'assets', 'scss'),
    js: path.resolve('src', 'assets', 'js'),
    fonts: path.resolve('src', 'assets', 'fonts'),
    images: path.resolve('src', 'assets', 'img'),
    misc: path.resolve('src', 'assets', 'misc'),
    mtsPublicAssets: path.join(os.homedir(), 'MOTDEV', 'mot', 'mot-web-frontend', 'public', 'assets'),
    mothPublicAssets: path.join(os.homedir(), 'MOTDEV', 'moth-application', 'PhpWebUI', 'public', 'assets'),
    manuals3456Assets: path.join(os.homedir(), 'MOTDEV', 'mot-manuals-transformer', 'manuals', 'class3457', 'assets'),
    manuals12Assets: path.join(os.homedir(), 'MOTDEV', 'mot-manuals-transformer', 'manuals', 'class12', 'assets'),
  }
};

/**
 * Checks environment variable to see if we are in production mode
 *
 * @returns {Boolean} true if we are in production and false otherwise
 *
 */
const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

/**
 * Get the extract text plugin loader settings based on environment
 *
 * @returns A webpack loader array
 *
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

  return MiniCssExtractPlugin.extract({
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

const copyPluginPatterns = [
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
  },
];
if(isCopyToMTS) {
  copyPluginPatterns.push({
    context: path.resolve('public'),
    from: '**/*',
    to: config.paths.mtsPublicAssets,
    force: true,
  });
}
if(isCopyToMOTH) {
  copyPluginPatterns.push({
    context: path.resolve('public'),
    from: '**/*',
    to: config.paths.mothPublicAssets,
    force: true,
  });
}
if(isCopyToManuals) {
  // Class 3457 and Class 12
  copyPluginPatterns.push({
    context: path.resolve('public'),
    from: '**/*',
    to: config.paths.manuals3456Assets,
    force: true,
  }, {
    context: path.resolve('public'),
    from: '**/*',
    to: config.paths.manuals12Assets,
    force: true,
  });
}

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
        exclude: /node_modules\/(?!@dvsa\/cookie-manager).*/,
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
  optimization: {
    splitChunks: {
      name: 'vendor',
      minChunks: 2,
      chunks: 'initial',
      filename: 'vendor.bundle.js'
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: copyPluginPatterns
    }),
//    new ExtractTextPlugin({
    new MiniCssExtractPlugin({
      filename: '../stylesheets/[name].css'
    })
  ]
};
