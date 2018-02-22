'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.homeGet = homeGet;
exports.plannedGet = plannedGet;
exports.profileGet = profileGet;
exports.recordGet = recordGet;
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

// planned GET
function plannedGet(req, res) {
    let viewData;

    viewData = {};

    return res.render('prototypes/learner/v1/planned-learning/index', viewData);
}

// profile GET
function profileGet(req, res) {
    let viewData;

    viewData = {};

    return res.render('prototypes/learner/v1/profile/index', viewData);
}

// learning record GET
function recordGet(req, res) {
    let viewData;

    viewData = {};

    return res.render('prototypes/learner/v1/learning-record/index', viewData);
}