import { initViewData } from './initChangeData.js';

export const getRoot = (req, res) => {
  // Reset session to dummy data from home page if not present
  req.session.viewData = req.session.viewData || initViewData();
  return res.render('./prototypes/vts-changes/changes-01-start', { viewData: req.session.viewData });
};

export const postEquipment = (req, res) => {
  // Get submitted values
  const formData = req.body;

  // Remove any that are null (eg submit button)
  delete formData['null'];

  // Add answers to session. Redirect to next question
  req.session.viewData.questions.type = formData;

  return res.redirect(`/prototypes/vts-changes/changes-03-approved`);
};

export const postApprovedEquipment = (req, res) => {
  // Get submitted values
  const formData = req.body;
  const answer = {
    value: formData['dvsa-approved'],
  };

  // Add answers to session.
  req.session.viewData.questions.approved = answer;
  const viewData = req.session.viewData;

  // If 'no', render notice
  if (answer.value === 'no') {
    return res.redirect('/prototypes/vts-changes/change-notice');
  }

  // If 'yes', direct to next question
  return res.redirect('/prototypes/vts-changes/changes-04-layout');
};

export const postUnapprovedEquipment = (req, res) => {
  // Get submitted values
  const formData = req.body;
  const answer = {
    value: formData['unapproved-detail'],
  };

  // Add answers to session.
  req.session.viewData.questions.unapprovedDetails = answer;

  // Either answer leads to next question.
  return res.redirect('/prototypes/vts-changes/changes-04-layout');
};

export const postLayoutChange = (req, res) => {
  // Get submitted values
  const formData = req.body;
  const answer = {
    value: formData['layout-change'],
  };

  // Add answers to session. Redirect to next question
  req.session.viewData.questions.layout = answer;

  // If 'yes', render notice
  if (answer.value === 'yes') {
    return res.redirect('/prototypes/vts-changes/change-notice');
  }

  return res.redirect('/prototypes/vts-changes/changes-05-classes');
};

export const postClasses = (req, res) => {
  // Get submitted values
  const formData = req.body;
  const answer = {
    value: formData['20lass'],
  };
  // Add answers to session. Redirect to next question
  req.session.viewData.questions.classes = answer;

  // If 'no', render notice
  if (answer.value === 'no') {
    return res.redirect('/prototypes/vts-changes/change-notice');
  }

  return res.redirect('/prototypes/vts-changes/summary');
};

export const getSummary = (req, res) => {
  // If types not set...
  if (!req.session.viewData.questions.type.length) {
    // Populate types from session data
    const answers = req.session.viewData.questions.type;
    const types = [];
    for (var answer in answers) {
      if (answers.hasOwnProperty(answer)) {
        // Convert first leter to uppercase
        let capAnswer = answer.replace(/^\w/, cap => cap.toUpperCase());
        types.push(capAnswer);
      }
    }
    // Add types to viewdata
    req.session.viewData.questions.type = types;
  }
  return res.render('./prototypes/vts-changes/summary/index', { viewData: req.session.viewData });
};

export const getConfirmation = (req, res) => {
  return res.render('./prototypes/vts-changes/confirmation/index');
};
