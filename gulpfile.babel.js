import gulp from 'gulp';
import requireDir from 'require-dir';
import forwardReference from 'undertaker-forward-reference';

import { CONFIG } from './gulp/constants';

/**
 * Allows gulp series tasks to be called without having to write tasks in order.
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
gulp.registry(forwardReference());

/**
 * Require all tasks from the tasks directory instead of manually requiring each one.
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
requireDir(CONFIG.gulpTasksPath);