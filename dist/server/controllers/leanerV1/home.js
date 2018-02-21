'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homeGet = homeGet;
// home GET
function homeGet(req, res) {
  let viewData, hideHomeStars;

  // anotherTestVar = global.anotherTestVar;
  // console.log('anotherTestVar = ' + anotherTestVar);

  hideHomeStars = req.session.hideHomeStars;

  viewData = {
    hideHomeStars
  };

  return res.render('prototypes/learner/v1/home/index', viewData);
}