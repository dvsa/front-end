"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Helper function - Check if an object is empty. Returns a boolean.
 *
 * @param obj - Any object to test
 *
 */
const isEmpty = exports.isEmpty = obj => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
};