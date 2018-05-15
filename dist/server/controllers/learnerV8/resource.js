'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resourceGet = resourceGet;
exports.resourcePost = resourcePost;

var _validationFunctions = require('./validation-functions');

// Different types pf learning resource pages
function resourceGet(req, res) {
  let viewData, resourceType, returnPath, availableTypes, hideDetailStars, resourceID, hideHomeStars;

  hideDetailStars = true;
  hideHomeStars = true;

  req.session.hideDetailStars = hideDetailStars;
  req.session.hideHomeStars = hideHomeStars;

  resourceType = req.param('resourceType');
  resourceID = req.param('resourceID');

  availableTypes = ['blog', 'video', 'classroom', 'online'];

  if ((0, _validationFunctions.isNumeric)(parseInt(resourceID))) {
    returnPath = 'prototypes/learner/v8/resource/' + resourceID;
  } else if (availableTypes.includes(resourceType)) {
    returnPath = 'prototypes/learner/v8/resource/' + resourceType;
  } else {
    returnPath = 'prototypes/learner/v8/resource/index';
  }

  viewData = {
    resourceID,
    resourceType,
    hideDetailStars
  };

  return res.render(returnPath, viewData);
}

// Start: POST
function resourcePost(req, res) {
  const { resourceID } = req.body;

  console.log('resourceID = ' + resourceID);

  if (resourceID === '15') {
    return res.redirect('/prototypes/learner/v8/scorms/basic-fire-safety');
  } else {
    return res.redirect('/prototypes/learner/v8/');
  }
}