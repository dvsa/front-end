"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmpty = void 0;
/**
 * Helper function - Check if an object is empty. Returns a boolean.
 *
 * @param obj - Any object to test
 *
 */
const isEmpty = obj => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
};
exports.isEmpty = isEmpty;