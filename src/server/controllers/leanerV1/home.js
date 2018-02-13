import path from 'path';
import { CONFIG } from './../../config/constants';

// home GET
export function homeGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/learner/v1/home/index', viewData);
}
