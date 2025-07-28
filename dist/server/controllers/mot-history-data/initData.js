"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initData = void 0;
/**
 * Returns an empty object of inspection data
 *
 * @returns {Object} - Inspection outcome
 */
const initData = () => {
  return {
    v5c: '',
    version: 'cvs',
    targetCert: 'pass',
    invalid: false
  };
};
exports.initData = initData;