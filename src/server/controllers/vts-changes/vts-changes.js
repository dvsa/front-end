import { initViewData } from './initChangeData.js';

export const getRoot = (req, res) => {
  // Reset session to dummy data from home page if not present
  req.session.viewData = req.session.viewData || initViewData();
  return res.render('./prototypes/vts-changes/changes-01-start', { viewData: req.session.viewData });
};

export const postEquipment = (req, res) => {
  // Get submitted values
  const formData = req.body;
  const answers = {
    headlamp: formData['headlamp'],
    plate: formData['plate'],
    roller: formData['roller'],
    wheel: formData['wheel'],
    ramp: formData['ramp'],
  };
  // Add answers to session. Redirect to next question
  req.session.viewData.questions.type = answers;
  const viewData = req.session.viewData;
  return res.redirect(`/prototypes/vts-changes/changes-03-approved`);
};

export const postApprovedEquipment = (req, res) => {
  // Get submitted values
  const formData = req.body;
  const answer = {
    value: formData['dvsa-approved'],
  };

  // Add answers to session. Redirect to next question
  req.session.viewData.questions.approved = answer;
  const viewData = req.session.viewData;
  console.log(viewData);
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
  const viewData = req.session.viewData;
  console.log(viewData);
  return res.redirect('/prototypes/vts-changes/changes-05-classes');
};

export const postClasses = (req, res) => {
  // Get submitted values
  const formData = req.body;
  const answer = {
    value: formData['same-class'],
  };
  // Add answers to session. Redirect to next question
  req.session.viewData.questions.classes = answer;
  const viewData = req.session.viewData;
  return res.redirect('/prototypes/vts-changes/summary');
};

export const getSummary = (req, res) => {
  console.log(req.session.viewData);
  console.log('summary');
  return res.render('./prototypes/vts-changes/summary/index', { viewData: req.session.viewData });
};

export const getConfirmation = (req, res) => { 
  console.log('conf');
  return res.render('./prototypes/vts-changes/confirmation/index');
};
