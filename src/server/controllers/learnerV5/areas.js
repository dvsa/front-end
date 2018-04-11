let generalData = require('./data');

// Primary areas of work radios areasGET
export function areasGet(req, res) {
  let viewData, professionSelectOptions, profession;

  // profession = 'Digital, Data and Technology';
  profession = '4';
  professionSelectOptions = generalData.allProfessions;

  viewData = {
    professionSelectOptions,
    profession,
  };

  return res.render('prototypes/learner/v5/area-of-work/index', viewData);
}

export function areasPost(req, res) {
  const { profession } = req.body;

  let primaryWorkArea;

  primaryWorkArea = profession;

  console.log('primaryWorkArea = ' + primaryWorkArea);

  return res.redirect('/prototypes/learner/v5/your-profile/area-of-work/levels?level1=true');
}

// Levels
export function areasLevelsGet(req, res) {
  let viewData, level2, level3, showLevel2, showLevel3;

  level2 = req.param('level2');
  level3 = req.param('level3');

  if (level2 == 'true') {
    showLevel2 = true;
  }

  if (level3 == 'true') {
    showLevel3 = true;
  }

  console.log('level2 = ' + level2);
  console.log('level3 = ' + level3);
  console.log('showLevel2 = ' + showLevel2);
  console.log('showLevel3 = ' + showLevel3);

  viewData = {
    showLevel2,
    showLevel3,
  };

  return res.render('prototypes/learner/v5/area-of-work/levels', viewData);
}

export function areasLevelsPost(req, res) {
  const { regConfig } = req.body;

  let test;

  return res.redirect('prototypes/learner/v5/area-of-work/levels');
}

// Other areas
export function otherAreasGet(req, res) {
  let viewData, professionSelectOptions;

  professionSelectOptions = generalData.allProfessions;

  viewData = {
    professionSelectOptions,
  };

  return res.render('prototypes/learner/v5/area-of-work/others', viewData);
}

export function otherAreasPost(req, res) {
  const { regConfig } = req.body;

  let test;

  return res.redirect('/prototypes/learner/v5/your-profile');
}
