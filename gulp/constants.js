import path from 'path';
import _ from 'lodash';

/**
 * Constants
 * 
 * The configurations used for the gulp tasks.
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
export const BASE_FOLDER_PATH = path.resolve('');
export const SRC_FOLDER_PATH = path.resolve('src');
export const SRC_ASSETS_FOLDER_PATH = path.join(SRC_FOLDER_PATH, 'assets');
export const NODE_MODULES_PATH = path.resolve('node_modules');

export const IS_PRODUCTION = () => {
  return (process.env.NODE_ENV === 'production') ? true : false;
}

export const DIST_FOLDER_PATH = IS_PRODUCTION() ? path.resolve('public') : path.resolve('public');

export const GOV_UK_FRONTEND_TOOLKIT_JS_FILE_PATHS = () => {
  const relativeFileNames = [
    // GOVUK Template
    'template/govuk-template',
    'template/html5-shiv',
    'template/ie',

    // Frontend Toolkit
    // 'frontend-toolkit/vendor/polyfills/bind',
    // 'frontend-toolkit/vendor/jquery/jquery.player.min',
    'frontend-toolkit/govuk/details.polyfill',
    // 'frontend-toolkit/govuk/modules',
    // 'frontend-toolkit/govuk/primary-links',
    // 'frontend-toolkit/govuk/selection-buttons',
    // 'frontend-toolkit/govuk/shim-links-with-button-role',
    // 'frontend-toolkit/govuk/show-hide-content',
    // 'frontend-toolkit/govuk/stick-at-top-when-scrolling',
    // 'frontend-toolkit/govuk/analytics/analytics',
    // 'frontend-toolkit/govuk/analytics/download-link-tracker',
    // 'frontend-toolkit/govuk/analytics/error-tracking',
    // 'frontend-toolkit/govuk/analytics/external-link-tracker',
    // 'frontend-toolkit/govuk/analytics/google-analytics-universal-tracker',
    // 'frontend-toolkit/govuk/analytics/govuk-tracker',
    // 'frontend-toolkit/govuk/analytics/mailto-link-tracker',
    // 'frontend-toolkit/govuk/analytics/print-intent',
    // 'frontend-toolkit/govuk/modules/auto-track-event',

    // GDS Elements
    // 'elements/application',
  ];
  let fullFilePaths = [];
  for(let i = 0; i < relativeFileNames.length; i++) {
    let filename = relativeFileNames[i];
    let filepath = path.join(SRC_ASSETS_FOLDER_PATH, 'js', 'vendor', filename + '.js');
    fullFilePaths.push(filepath);
  }
  return fullFilePaths;
};

export const CONFIG = {
  isProduction: IS_PRODUCTION,
  patterns: {
    js: '**/*.js',
    image: '**/*.{png,jpg,jpeg,gif,svg}',
    css: '**/*.css',
    scss: '**/*.scss',
    font: '**/*.{eot,woff}',
  },
  gulpTasksPath: path.resolve('gulp', 'tasks'),
  distPaths: {
    base: DIST_FOLDER_PATH,
    css: path.join(DIST_FOLDER_PATH, 'stylesheets'),
    js: path.join(DIST_FOLDER_PATH, 'javascripts'),
    images: path.join(DIST_FOLDER_PATH, 'images'),
    govCSS: path.join(DIST_FOLDER_PATH, 'gov-css'),
    fonts: path.join(DIST_FOLDER_PATH, 'fonts'),
    misc: path.join(DIST_FOLDER_PATH, 'misc'),
  },
  sourcePaths: {
    base: path.join(SRC_ASSETS_FOLDER_PATH, 'assets'),
    scss: path.join(SRC_ASSETS_FOLDER_PATH, 'scss'),
    images: path.join(SRC_ASSETS_FOLDER_PATH, 'img'),
    js: path.join(SRC_ASSETS_FOLDER_PATH, 'js'),
    jsVendro: path.join(SRC_ASSETS_FOLDER_PATH, 'js', 'vendor'),
    govuk: path.join(SRC_ASSETS_FOLDER_PATH, 'js', 'govuk'),
    fonts: path.join(SRC_ASSETS_FOLDER_PATH, 'fonts'),
    misc: path.join(SRC_ASSETS_FOLDER_PATH, 'misc'),
    motScss: path.join(SRC_ASSETS_FOLDER_PATH, 'scss', '*.scss')
  },
  configFiles: {
    scssLink: path.join(BASE_FOLDER_PATH, '.scss-lint.yml'),
  },
  jsVendorFilesList: [
    // path.join(SRC_ASSETS_FOLDER_PATH, 'js', 'vendor', 'jquery-11.1.3.js'),
    path.join(SRC_ASSETS_FOLDER_PATH, 'js', 'vendor', 'css3-mediaqueries.js'),
  ].concat(GOV_UK_FRONTEND_TOOLKIT_JS_FILE_PATHS())
};