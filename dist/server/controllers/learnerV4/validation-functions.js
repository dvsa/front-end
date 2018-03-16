'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const validateEmail = exports.validateEmail = email => {
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const validateWord = exports.validateWord = word => {
  let regex = /^[a-zA-Z ]+$/;
  return regex.test(word);
};

const validatePostCode = exports.validatePostCode = postcode => {
  postcode = postcode.replace(/\s/g, '');
  let regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
  return regex.test(postcode);
};

const isNumeric = exports.isNumeric = number => {
  return !isNaN(parseFloat(number)) && isFinite(number);
};