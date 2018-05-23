'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminGet = adminGet;
exports.adminPost = adminPost;
exports.adminAddGet = adminAddGet;
exports.adminAddPost = adminAddPost;
exports.adminEditGet = adminEditGet;
exports.adminEditPost = adminEditPost;

var _validationFunctions = require('./validation-functions');

// Different types pf learning resource pages

// admin index
function adminGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v8/admin/index', viewData);
}
function adminPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v8/admin');
}

// admin add
function adminAddGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v8/admin/add', viewData);
}
function adminAddPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v8/admin');
}

// admin edit
function adminEditGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v8/admin/edit', viewData);
}
function adminEditPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v8/admin');
}