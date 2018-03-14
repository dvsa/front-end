import DATA from './data/formatted-data.json';

/**
 * Renders the initial page with block items
 * 
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @return the html view with first block items
 */
export const renderInitial = (req, res) => {

  res.render('prototypes/ajax-browse/index', {

  });

};