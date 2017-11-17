import fs from 'fs';
import path from 'path';
import { CONFIG } from './../config/constants';

export function indexGet(req, res) {
  // return res.render('protoypes/index', '.path/to/data/if/required');
  return res.render('templates/index');
}

export function manualsGet(req, res) {
  return res.render('templates/manuals', { loggedOut: true });
}

export function manualsMenuGet(req, res) {
  return res.render('templates/manuals-menu', { loggedOut: true });
}

export function manualsPageGet(req, res) {
  return res.render('templates/manuals-page', { loggedOut: true });
}
