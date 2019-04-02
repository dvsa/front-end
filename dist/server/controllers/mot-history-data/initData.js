'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Returns an empty object of inspection data
 *
 * @returns {Object} - Inspection outcome
 */
const initData = exports.initData = () => {
  return {
    v5c: '',
    version: 'cvs',
    targetCert: 'pass',
    invalid: false
  };
};