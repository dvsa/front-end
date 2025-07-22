"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFileExtensionOfType = exports.getFileExtension = void 0;
/**
 * Returns the file extension of a given file name
 *
 * @param {String} fileName Name of the file
 * @returns {String} extension of file
 *
 * @author James Nelson <j.nelson@kainos.com>
 */
var getFileExtension = exports.getFileExtension = function getFileExtension(fileName) {
  if (typeof fileName !== 'string') return console.log('Filename is not a string value');
  return fileName.substr(fileName.lastIndexOf('.') + 1);
};

/**
 * Returns a boolean value on string match
 *
 * @param {String} ext extension of file
 * @param {String} extType extension to check against
 * @returns {Boolean} boolean on comparsion
 *
 * @author James Nelson <j.nelson@kainos.com>
 */
var isFileExtensionOfType = exports.isFileExtensionOfType = function isFileExtensionOfType(ext, extType) {
  ext = ext.toLowerCase();
  extType = extType.toLowerCase();
  return ext == extType;
};