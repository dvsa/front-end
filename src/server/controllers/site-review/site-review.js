//import { renderViewWithValuesOrRedirect, renderWithErrorsOrRedirectWithSession } from './helpers';
import { addToSession } from '../speech-to-text-search/helpers/add-to-session.js';

// Get view data into template
const initialData = () => {
  return (startData = {
    testerName: 'James',
    'self-completed': true,
    'ae-representatives-user-id': 'Testers ID',
    'ae-representatives-full-name': 'Martin',
    'testers-user-id': 'Tester',
    date: {
      day: '14',
      month: '05',
      year: '2018',
    },
  });
};

export const getDetails = (req, res) => {
    req.session.name = "martin";
    const viewData = req.session;
    //console.log(viewData);
    res.render('./prototypes/site-review/enter-details/index', { viewData: viewData || {} });
}

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

  // Add answers to viewdata
  req.session.viewData = req.body; 
  console.log('stage 1: ', req.session.viewData)
  return res.redirect('/prototypes/site-review/summary/');
};


export const getSummary = (req, res) => {
    //req.session.viewData = req.body;
    const viewData = req.session.viewData;
    console.log('stage 2', viewData);
    res.render('./prototypes/site-review/summary/index', { viewData: viewData });
};
