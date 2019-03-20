'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const getMonth = exports.getMonth = monthNum => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[monthNum];
};