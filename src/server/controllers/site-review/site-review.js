//import { renderViewWithValuesOrRedirect, renderWithErrorsOrRedirectWithSession } from './helpers';
import { addToSession } from '../speech-to-text-search/helpers/add-to-session.js';
import { initialData } from './initialData';

// not used yet
export const getDetails = (req, res) => { 
  req.session.viewData = initialData(); 
  const viewData = req.session;
  console.log('viewdata', viewData);
  res.render('./prototypes/site-review/enter-details/index', { viewData: viewData || {} });
};

export const postDetails = (req, res) => { 

// add more info to session
  req.body.outcomes = {
    "compliance": {
        "outcome" : "Improve",
        "advice" : "Compliance comment"
    },
    "premises": {
      "outcome" : "Satisfactory",
      "advice" : "Premises comment"
    },
    "management": {
      "outcome" : "Improve",
      "advice" : "Management and people comment"
    },
    "people": {
      "outcome" : "Unsatisfactory",
      "advice" : "Improvements needed..."
    },
    "activity": {
      "outcome" : "Activity performed",
      "detail" : "1234567987"
    }
}; 
  // Add initial data to req body
  req.body.viewData = initialData();

  // Now set viewdata to be all our form data from the whole journey
  req.session.viewData = req.body;
  return res.redirect('/prototypes/site-review/summary/');
};

export const getSummary = (req, res) => {
  //req.session.viewData = req.body;
  const viewData = req.session.viewData;
  console.log(viewData);
  res.render('./prototypes/site-review/summary/index', { viewData: viewData });
};
