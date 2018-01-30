'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _email = require('./email');

Object.keys(_email).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _email[key];
    }
  });
});

var _details = require('./details');

Object.keys(_details).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _details[key];
    }
  });
});

var _contactDetails = require('./contact-details');

Object.keys(_contactDetails).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _contactDetails[key];
    }
  });
});

var _securityQuestions = require('./security-questions');

Object.keys(_securityQuestions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _securityQuestions[key];
    }
  });
});

var _password = require('./password');

Object.keys(_password).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _password[key];
    }
  });
});