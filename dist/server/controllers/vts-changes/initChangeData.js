"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initViewData = void 0;
/**
 * Returns an empty equipment change declaration
 *
 * @returns {Object} - Equipment change answers
 */
var initViewData = exports.initViewData = function initViewData() {
  return {
    typeNames: [],
    version: '',
    questions: {
      type: {
        answer: [],
        errors: []
      },
      approved: {
        answer: {},
        errors: []
      },
      layout: {
        answer: {},
        errors: []
      },
      classes: {
        answer: {},
        errors: []
      }
    }
  };
};