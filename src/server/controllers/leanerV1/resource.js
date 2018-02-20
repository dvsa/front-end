// Different types pf learning resource pages
export function resourceGet(req, res) {
  let viewData, resourceType, returnPath, availableTypes, detailOnlyStars, hideAllStars;

  resourceType = req.param('resourceType');

  availableTypes = ['blog', 'video', 'classroom', 'online'];

  if (availableTypes.includes(resourceType)) {
    returnPath = 'prototypes/learner/v1/resource/' + resourceType;
  } else {
    returnPath = 'prototypes/learner/v1/resource/index';
  }

  detailOnlyStars = req.session.detailOnlyStars;
  hideAllStars = req.session.hideAllStars;

  if (hideAllStars === true) {
    detailOnlyStars = true;
  }

  viewData = {
    resourceType,
    detailOnlyStars,
  };

  return res.render(returnPath, viewData);
}
