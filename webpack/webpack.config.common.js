const os = require('os');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require("terser-webpack-plugin");

/** Constants */
const isCopyToMTS = process.env.COPY_TO_MTS === 'true';
const isCopyToMOTH = process.env.COPY_TO_MOTH === 'true';
const isCopyToManuals = process.env.COPY_TO_MANUALS === 'true';

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

const isProduction = () => process.env.NODE_ENV === 'production';

const postCSSPlugins = [
  autoprefixer({
    overrideBrowserslist: [
      "ie 8",
      "ie 9",
      "ie 10",
      "ie 11",
      "last 2 versions"
    ]
  })
];

if (isProduction()) {
  postCSSPlugins.push(cssnano({
    preset: 'advanced',
    minifyFontValues: false
  }));
}

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

if (isCopyToMTS) {
  copyPluginPatterns.push({
    context: path.resolve('public'),
    from: '**/*',
    to: config.paths.mtsPublicAssets,
    force: true,
  });
}

if (isCopyToMOTH) {
  copyPluginPatterns.push({
    context: path.resolve('public'),
    from: '**/*',
    to: config.paths.mothPublicAssets,
    force: true,
  });
}

if (isCopyToManuals) {
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

module.exports = {
  entry: {
    'dvsa': path.resolve(config.paths.js, 'dvsa', 'index.js'),
    'dvsa-manuals': path.resolve(config.paths.js, 'dvsa-manuals', 'index.js'),
    'dvsa-mts': path.resolve(config.paths.js, 'dvsa-mts', 'index.js'),
    'dvsa-mts-legacy': path.resolve(config.paths.js, 'dvsa-mts-legacy', 'index.js'),
    'development': path.resolve(config.paths.js, 'development', 'index.js'),
    'styles': path.resolve(config.paths.scss, 'styles.scss'),
  },
  target: ["web", "es5"],
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
              ['@babel/preset-env', {
                targets: {
                  browsers: [
                    'last 3 versions',
                    'ie >= 9',
                    'last 3 iOS major versions',
                    'ff >= 33',
                    'safari >= 9'
                  ]
                },
                debug: true,
                useBuiltIns: 'usage',
                corejs: 3
              }]
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: !isProduction()
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProduction(),
              postcssOptions: {
                plugins: postCSSPlugins,
              },
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction(),
              sassOptions: {
                quietDeps: true,
              },
            },
          },
        ],
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
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: copyPluginPatterns
    }),
    new MiniCssExtractPlugin({
      filename: '../stylesheets/[name].css'
    })
  ]
};
