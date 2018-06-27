import { isNumeric } from './validation-functions';
// Different types pf learning resource pages
let generalData = require('./data');

// admin index
export function adminGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v10/admin/index', viewData);
}
export function adminPost(req, res) {
  const { courseList, eventsList, eventsSubmit, courseSubmit } = req.body;

  let redirectPath;

  // console.log(eventsSubmit);
  // console.log(courseSubmit);
  // console.log(courseList);
  // console.log(eventsList);

  if (eventsSubmit == 'events') {
    redirectPath = '/prototypes/learner/v10/admin/events-list';
  } else if (courseSubmit == 'courses') {
    redirectPath = '/prototypes/learner/v10/admin/course-list';
  } else {
    redirectPath = '/prototypes/learner/v10/admin';
  }

  return res.redirect(redirectPath);
}

// view all course
export function adminCourseListGet(req, res) {
  let viewData, titlesList, titleArray, randomItem, numberOfCourses;

  numberOfCourses = 114;
  titlesList = generalData.courseTitles;
  titleArray = [];
  for (let i = 0; i < numberOfCourses; i++) {
    randomItem = titlesList[Math.floor(Math.random() * titlesList.length)];
    titleArray.push(randomItem);
  }

  viewData = {
    titleArray,
  };

  return res.render('prototypes/learner/v10/admin/course-list', viewData);
}
export function adminCourseListPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v10/admin');
}

// view all events
export function adminEventsListGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v10/admin/events-list', viewData);
}
export function adminEventsListPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v10/admin');
}

// admin edit
export function adminEditGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v10/admin/edit', viewData);
}
export function adminEditPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v10/admin');
}

// admin add
export function adminAddGet(req, res) {
  let viewData, gradeSelectOptions;

  gradeSelectOptions = generalData.allGrades;

  req.session.blockNumber = 1;

  viewData = {
    gradeSelectOptions,
  };

  return res.render('prototypes/learner/v10/admin/add', viewData);
}
export function adminAddPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v10/admin/add-details');
}

// admin add 2
export function adminAddDetailsGet(req, res) {
  let viewData, blockNumber, tempBlockNumber, description, outcomes;

  description = req.session.description;
  outcomes = req.session.outcomes;

  tempBlockNumber = req.session.blockNumber;
  console.log('tempBlockNumber = ' + tempBlockNumber);
  if (tempBlockNumber < 1) {
    tempBlockNumber = 1;
  }
  console.log('tempBlockNumber 2 = ' + tempBlockNumber);
  if (tempBlockNumber >= blockNumber) {
    blockNumber = tempBlockNumber;
  } else {
    blockNumber = 1;
  }
  console.log('blockNumber = ' + blockNumber);

  /*blockNumber = req.session.blockNumber;*/

  viewData = {
    blockNumber,
    description,
    outcomes,
    tempBlockNumber,
  };

  return res.render('prototypes/learner/v10/admin/add-details', viewData);
}
export function adminAddDetailsPost(req, res) {
  const { description, outcomes, addRowEvent } = req.body;

  let tempBlockNumber;

  req.session.description = description;
  req.session.outcomes = outcomes;
  tempBlockNumber = req.session.blockNumber;

  console.log(tempBlockNumber);

  console.log('addRowEvent = ' + addRowEvent);

  if (addRowEvent == 'addRow') {
    tempBlockNumber++;
    req.session.blockNumber = tempBlockNumber;
    return res.redirect('/prototypes/learner/v10/admin/add-details');
  } else {
    return res.redirect('/prototypes/learner/v10/admin/add-assets');
  }
}

// admin review
export function adminAddAssetsGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v10/admin/add-assets', viewData);
}
export function adminAddAssetsPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v10/admin/add-review');
}

// admin review
export function adminAddReviewGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v10/admin/add-review', viewData);
}
export function adminAddReviewPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v10/add-complete');
}

// admin review
export function adminAddCompleteGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v10/admin/add-review', viewData);
}
export function adminAddCompletePost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v10/admin');
}
