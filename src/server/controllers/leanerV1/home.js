// home GET
export function homeGet(req, res) {
  let viewData, hideHomeStars, action, courseId, removeCheckMessage, removeMessage;

  // anotherTestVar = global.anotherTestVar;
  // console.log('anotherTestVar = ' + anotherTestVar);

  // req.session.removeMessage = false;
  hideHomeStars = req.session.hideHomeStars;
  action = req.param('action');
  courseId = req.param('id');

  if (parseInt(courseId) >= 1 && action === 'checkRemove') {
    removeCheckMessage = true;
  }

  if (parseInt(courseId) >= 1 && action === 'remove') {
    // removeCheckMessage = false;
    removeMessage = true;
  }

  console.log('removeMessage = ' + removeMessage + ' and id = ' + courseId);

  viewData = {
    hideHomeStars,
    removeMessage,
    removeCheckMessage,
  };

  return res.render('prototypes/learner/v1/home/index', viewData);
}

// planned GET
export function plannedGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v1/planned-learning/index', viewData);
}

// profile GET
export function profileGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v1/profile/index', viewData);
}

// learning record GET
export function recordGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v1/learning-record/index', viewData);
}

// suggested learning GET
export function suggestedGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v1/suggested-learning/index', viewData);
}
