import { initViewData } from './initChangeData.js';


export const getRoot = (req, res) => {
  // Reset session to dummy data from home page if not present
  req.session.viewData = req.session.viewData || initViewData();
  return res.render('./prototypes/vts-changes/changes-01-start', { viewData: req.session.viewData } );
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
  }

  // Add answers to session
  req.session.viewData.questions.question1.answer = answers 

  console.log(formData); 
  console.log(answers); 
  console.log(req.session.viewData); 

  //return res.render('prototypes/vts-changes/changes-03-approved', { viewData: req.session.viewData });
};
