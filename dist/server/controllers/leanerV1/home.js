'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homeGet = homeGet;
// home GET
function homeGet(req, res) {
  let viewData, anotherTestVar, showAllStars, hideAllStars, detailOnlyStars;

  // anotherTestVar = global.anotherTestVar;
  // console.log('anotherTestVar = ' + anotherTestVar);

  showAllStars = req.session.showAllStars;
  hideAllStars = req.session.hideAllStars;
  detailOnlyStars = req.session.detailOnlyStars;

  viewData = {
    showAllStars,
    hideAllStars,
    detailOnlyStars
  };

  return res.render('prototypes/learner/v1/home/index', viewData);
}