//import { renderViewWithValuesOrRedirect, renderWithErrorsOrRedirectWithSession } from './helpers';
import { addToSession } from '../speech-to-text-search/helpers/add-to-session.js';
import { initViewData } from './initViewData.js';
import { getMonth } from './helpers/helpers';

// Not used yet
export const getDetails = (req, res) => {
  req.session.viewData = initialData();
  const viewData = req.session;
  console.log('viewdata', viewData);
  res.render('./prototypes/site-review/enter-details/index', { viewData: viewData || {} });
};


export const postDetails = (req, res) => { 
  
  // Add initial data to req body
  const viewData = initViewData();
  const testerDetails = req.body; 
  
  //testerDetails.date = date;
  const dateString = `${testerDetails.testDay} ${getMonth( testerDetails.testMonth-1)} ${testerDetails.testYear}`;
 
  // Check we have a valid date string
  if ( dateString.indexOf('undefined') >= 0 ) {
      testerDetails.date = testerDetails.date;
  } else {
    testerDetails.date = dateString;
  } 

  // Apply all form info to Viewdata in session
  viewData.testerDetails = testerDetails;
  req.session.viewData = viewData;
  
  // Now set template data to be all our form data from the whole journey
  //viewData = req.session.viewData;
  console.log(req.session.viewData);
  return res.redirect('/prototypes/site-review/summary/');
};

export const getSummary = (req, res) => {
  //req.session.viewData = req.body;
  const viewData = req.session.viewData;
  res.render('./prototypes/site-review/summary/index', { viewData: viewData });
};