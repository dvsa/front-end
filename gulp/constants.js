import path from 'path';
import os from 'os';
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

export const DIST_FOLDER_PATH = IS_PRODUCTION() ? path.resolve('dist', 'assets') : path.resolve('public');

export const MOTDEV_PUBLIC_FOLDER = path.join(os.homedir(), 'MOTDEV', 'mot', 'mot-web-frontend', 'public');

export const CONFIG = {
  isProduction: IS_PRODUCTION,
  patterns: {
    js: '**/*.js',
    image: '**/*.{png,jpg,jpeg,gif,svg,ico}',
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
    fonts: path.join(SRC_ASSETS_FOLDER_PATH, 'fonts'),
    misc: path.join(SRC_ASSETS_FOLDER_PATH, 'misc'),
    motScss: path.join(SRC_ASSETS_FOLDER_PATH, 'scss', '*.scss')
  },
  configFiles: {
    scssLink: path.join(BASE_FOLDER_PATH, '.scss-lint.yml'),
  },
  motDevAssetsFolderPath: path.join(MOTDEV_PUBLIC_FOLDER, 'assets')
};