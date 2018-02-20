'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.configGet = configGet;
exports.configPost = configPost;
// config GET
function configGet(req, res) {
    let viewData, configError;

    configError = req.session.configError;

    viewData = {
        configError
    };

    return res.render('prototypes/learner/index', viewData);
}

function configPost(req, res) {
    const { regConfig } = req.body;

    console.log('regConfig');
    let showAllStars, hideAllStars, detailOnlyStars;

    showAllStars = false;
    hideAllStars = false;
    detailOnlyStars = false;

    if (regConfig == 'all') {
        showAllStars = true;
    } else if (regConfig == 'detail') {
        detailOnlyStars = true;
    } else if (regConfig == 'none') {
        hideAllStars = true;
    }

    req.session.showAllStars = showAllStars;
    req.session.hideAllStars = hideAllStars;
    req.session.detailOnlyStars = detailOnlyStars;

    res.local = {
        testingLocals: 'testing 123'
    };

    res.locals.testingVars = 'my value';

    global.anotherTestVar = 'ONE MILLIONS!';

    console.log(req.session);

    if (!regConfig) {
        req.session.configError = true;
        return res.redirect('/prototypes/learner');
    } else {
        req.session.configError = false;
        return res.redirect('/prototypes/learner/v1');
    }
}