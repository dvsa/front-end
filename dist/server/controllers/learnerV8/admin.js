'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminGet = adminGet;
exports.adminPost = adminPost;

var _validationFunctions = require('./validation-functions');

// Different types pf learning resource pages

function adminGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v8/admin/index', viewData);
}

// Start: POST
function adminPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v8/scorms/basic-fire-safety');
}