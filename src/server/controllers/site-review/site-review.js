//import { renderViewWithValuesOrRedirect, renderWithErrorsOrRedirectWithSession } from './helpers';
import { addToSession } from '../speech-to-text-search/helpers/add-to-session.js';

// Get view data into template
const initialData = () => {
  return (
    startData = {
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

export const postDetails = (req, res) => {
  //req.session.viewData;

  req.session.viewData = {};
  req.session.viewData = req.body;
  //req.session.viewData.answers = answers;
  
  const viewData = req.session;
  console.log('viewdata: ', viewData)
  console.log('session: ', req.session)

  return res.redirect('/prototypes/site-review/summary/');
};

export const getSummary = (req, res) => {
  
  req.session.viewData = req.body;
  const viewData = req.session;
  console.log(viewData); 
  res.render('./prototypes/site-review/summary/index', {  viewData: viewData || { } } );
};
