import { isNumeric } from './validation-functions';
// Different types pf learning resource pages

// admin index
export function adminGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v8/admin/index', viewData);
}
export function adminPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v8/admin');
}

// admin edit
export function adminEditGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v8/admin/edit', viewData);
}
export function adminEditPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v8/admin');
}


// admin add
export function adminAddGet(req, res) {
    let viewData;

    viewData = {};

    return res.render('prototypes/learner/v8/admin/add', viewData);
}
export function adminAddPost(req, res) {
    const {} = req.body;

    return res.redirect('/prototypes/learner/v8/admin-details');
}


// admin add 2
export function adminAddDetailsGet(req, res) {
    let viewData;

    viewData = {};

    return res.render('prototypes/learner/v8/admin/add-details', viewData);
}
export function adminAddDetailsPost(req, res) {
    const {} = req.body;

    return res.redirect('/prototypes/learner/v8/admin');
}