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
