// home GET
export function homeGet(req, res) {
  let viewData, hideHomeStars;

  // anotherTestVar = global.anotherTestVar;
  // console.log('anotherTestVar = ' + anotherTestVar);

  hideHomeStars = req.session.hideHomeStars;

  viewData = {
    hideHomeStars,
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
