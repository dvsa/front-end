"use strict";

require("core-js/modules/esnext.weak-map.delete-all.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postEditTesterComment = exports.postAddTesterComment = exports.getReview = exports.getMOTResults = exports.getEditTesterComment = exports.getAddTesterComment = exports.destorySession = void 0;
var motTestHelpers = _interopRequireWildcard(require("./helpers/helpers"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// Config param populates error / flash message & redirect URL
const postMessage = (req, res, config) => {
  let viewData = {
    comment: req.body.comment ? motTestHelpers.formatTextAreaResponse(req.body.comment.trim()) : null,
    errors: []
  };

  // Create error message if textarea value was not set or contains white spacce only
  if (!viewData.comment || !viewData.comment.trim()) {
    // Push error message
    viewData.errors.push(config.errorMessage);
  }

  // Init viewData session
  req.session.viewData = viewData;

  // View data contains no errors
  if (!req.session.viewData.errors.length) {
    // Adds a flash message to session & redirect
    req.flash('flash-message', config.flashMsg);
    return res.redirect('/prototypes/mot-test/');
  }

  // Return to add tester comment view if errors
  return res.redirect(config.redirectUrl);
};
const getMOTResults = (req, res) => {
  // Resets error session
  if (req.session.viewData) req.session.viewData.errors = null;
  return res.render('prototypes/mot-test/index', {
    viewData: req.session.viewData,
    flashMessage: req.flash('flash-message')
  });
};
exports.getMOTResults = getMOTResults;
const getAddTesterComment = (req, res) => {
  return res.render('prototypes/mot-test/comment/index', {
    viewData: req.session.viewData ? req.session.viewData : null
  });
};
exports.getAddTesterComment = getAddTesterComment;
const postAddTesterComment = (req, res) => {
  postMessage(req, res, {
    errorMessage: 'Enter comment - You must enter a comment',
    flashMsg: 'Testers comment successfully added',
    redirectUrl: '/prototypes/mot-test/comment'
  });
};
exports.postAddTesterComment = postAddTesterComment;
const getEditTesterComment = (req, res) => {
  return res.render('prototypes/mot-test/comment/edit', {
    viewData: req.session.viewData
  });
};
exports.getEditTesterComment = getEditTesterComment;
const postEditTesterComment = (req, res) => {
  postMessage(req, res, {
    errorMessage: 'Edit comment - You must enter a comment',
    flashMsg: 'Testers comment successfully edited',
    redirectUrl: '/prototypes/mot-test/comment/edit'
  });
};
exports.postEditTesterComment = postEditTesterComment;
const destorySession = (req, res) => {
  // Resets session & redirects
  req.session.viewData = null;
  req.flash('flash-message', 'Testers comment successfully removed');
  return res.redirect('/prototypes/mot-test/');
};
exports.destorySession = destorySession;
const getReview = (req, res) => res.render('prototypes/mot-test/review', {
  viewData: req.session.viewData
});
exports.getReview = getReview;