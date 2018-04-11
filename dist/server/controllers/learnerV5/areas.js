'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.areasGet = areasGet;
exports.areasPost = areasPost;
exports.areasLevelsGet = areasLevelsGet;
exports.areasLevelsPost = areasLevelsPost;
exports.otherAreasGet = otherAreasGet;
exports.otherAreasPost = otherAreasPost;
let generalData = require('./data');

// Primary areas of work radios areasGET
function areasGet(req, res) {
  let viewData, professionSelectOptions, profession;

  // profession = 'Digital, Data and Technology';
  // profession = '4';
  professionSelectOptions = generalData.allProfessions;

  req.session.setWorkAreaCommercial = null;
  req.session.setWorkAreadigital = null;

  viewData = {
    professionSelectOptions,
    profession
  };

  return res.render('prototypes/learner/v5/area-of-work/index', viewData);
}

function areasPost(req, res) {
  const { profession } = req.body;

  let primaryWorkArea;

  primaryWorkArea = profession;

  req.session.setWorkAreaCommercial = null;
  req.session.setWorkAreadigital = null;

  if (primaryWorkArea == '1') {
    req.session.setWorkAreaCommercial = true;
    req.session.setWorkAreadigital = null;
  } else {
    req.session.setWorkAreaCommercial = null;
    req.session.setWorkAreaDigital = true;
  }

  console.log('primaryWorkArea = ' + primaryWorkArea);

  return res.redirect('/prototypes/learner/v5/your-profile/area-of-work/levels?level1=true');
}

// Levels
function areasLevelsGet(req, res) {
  let viewData, level2, level3, showLevel2, showLevel3, setWorkAreaCommercial, setWorkAreaDigital;

  level2 = req.param('level2');
  level3 = req.param('level3');

  setWorkAreaCommercial = req.session.setWorkAreaCommercial;
  setWorkAreaDigital = req.session.setWorkAreaDigital;

  if (level2 == 'true') {
    showLevel2 = true;
  }

  if (level3 == 'true') {
    showLevel3 = true;
  }

  viewData = {
    showLevel2,
    showLevel3,
    setWorkAreaCommercial,
    setWorkAreaDigital
  };

  return res.render('prototypes/learner/v5/area-of-work/levels', viewData);
}

function areasLevelsPost(req, res) {
  const { regConfig } = req.body;

  let test;

  return res.redirect('prototypes/learner/v5/area-of-work/levels');
}

// Other areas
function otherAreasGet(req, res) {
  let viewData, professionSelectOptions;

  professionSelectOptions = generalData.allProfessions;

  viewData = {
    professionSelectOptions
  };

  return res.render('prototypes/learner/v5/area-of-work/others', viewData);
}

function otherAreasPost(req, res) {
  const { regConfig } = req.body;

  let test;

  return res.redirect('/prototypes/learner/v5/your-profile');
}