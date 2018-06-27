'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminGet = adminGet;
exports.adminPost = adminPost;
exports.adminCourseListGet = adminCourseListGet;
exports.adminCourseListPost = adminCourseListPost;
exports.adminEventsListGet = adminEventsListGet;
exports.adminEventsListPost = adminEventsListPost;
exports.adminEditGet = adminEditGet;
exports.adminEditPost = adminEditPost;
exports.adminAddGet = adminAddGet;
exports.adminAddPost = adminAddPost;
exports.adminAddDetailsGet = adminAddDetailsGet;
exports.adminAddDetailsPost = adminAddDetailsPost;
exports.adminAddAssetsGet = adminAddAssetsGet;
exports.adminAddAssetsPost = adminAddAssetsPost;
exports.adminAddReviewGet = adminAddReviewGet;
exports.adminAddReviewPost = adminAddReviewPost;
exports.adminAddCompleteGet = adminAddCompleteGet;
exports.adminAddCompletePost = adminAddCompletePost;

var _validationFunctions = require('./validation-functions');

// Different types pf learning resource pages
let generalData = require('./data');

// admin index
function adminGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v10/admin/index', viewData);
}
function adminPost(req, res) {
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
function adminCourseListGet(req, res) {
  let viewData, titlesList, titleArray, randomItem, numberOfCourses;

  numberOfCourses = 114;
  titlesList = generalData.courseTitles;
  titleArray = [];
  for (let i = 0; i < numberOfCourses; i++) {
    randomItem = titlesList[Math.floor(Math.random() * titlesList.length)];
    titleArray.push(randomItem);
  }

  viewData = {
    titleArray
  };

  return res.render('prototypes/learner/v10/admin/course-list', viewData);
}
function adminCourseListPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v10/admin');
}

// view all events
function adminEventsListGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v10/admin/events-list', viewData);
}
function adminEventsListPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v10/admin');
}

// admin edit
function adminEditGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v10/admin/edit', viewData);
}
function adminEditPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v10/admin');
}

// admin add
function adminAddGet(req, res) {
  let viewData, gradeSelectOptions;

  gradeSelectOptions = generalData.allGrades;

  req.session.blockNumber = 1;

  viewData = {
    gradeSelectOptions
  };

  return res.render('prototypes/learner/v10/admin/add', viewData);
}
function adminAddPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v10/admin/add-details');
}

// admin add 2
function adminAddDetailsGet(req, res) {
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
    tempBlockNumber
  };

  return res.render('prototypes/learner/v10/admin/add-details', viewData);
}
function adminAddDetailsPost(req, res) {
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
function adminAddAssetsGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v10/admin/add-assets', viewData);
}
function adminAddAssetsPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v10/admin/add-review');
}

// admin review
function adminAddReviewGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v10/admin/add-review', viewData);
}
function adminAddReviewPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v10/add-complete');
}

// admin review
function adminAddCompleteGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v10/admin/add-review', viewData);
}
function adminAddCompletePost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v10/admin');
}