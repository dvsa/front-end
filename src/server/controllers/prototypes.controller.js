import fs from 'fs';
import path from 'path';
import { CONFIG } from './../config/constants';

export function indexGet(req, res) {
  // return res.render('protoypes/index', '.path/to/data/if/required');
  return res.render('prototypes/index', { loggedOut: true });
}
