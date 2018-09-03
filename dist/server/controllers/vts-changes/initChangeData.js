"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Returns an empty equipment change declaration
 *
 * @returns {Object} - Equipment change answers
 */
const initViewData = exports.initViewData = () => {
  return {
    typeNames: [],
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