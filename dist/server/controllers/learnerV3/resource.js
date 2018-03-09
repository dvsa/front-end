'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resourceGet = resourceGet;

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

  if ((0, _validationFunctions.isNumeric)(parseInt(resourceID)) && parseInt(resourceID) >= 1) {
    returnPath = 'prototypes/learner/v3/resource/' + resourceID;
  } else if (availableTypes.includes(resourceType)) {
    returnPath = 'prototypes/learner/v3/resource/' + resourceType;
  } else {
    returnPath = 'prototypes/learner/v3/resource/index';
  }

  viewData = {
    resourceType,
    hideDetailStars
  };

  return res.render(returnPath, viewData);
}