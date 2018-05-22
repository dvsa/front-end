import { isNumeric } from './validation-functions';
// Different types pf learning resource pages

export function adminGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v8/admin/index', viewData);
}

// Start: POST
export function adminPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/learner/v8/scorms/basic-fire-safety');
}
