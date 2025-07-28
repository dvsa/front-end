"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recalls = void 0;
const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
};
const recalls = async (req, res) => {
  await delay();
  res.status(500).send('Something broke!');
  res.json({
    result: `<p>The following '<strong>${req.body.test_variable}</strong>' was taken from the ajax request body.</p>`,
    smartSurveyLink: 'https://www.gov.uk',
    dataLayer: [{
      event: 'test-event-one'
    }, {
      event: 'test-event-two'
    }]
  });
};
exports.recalls = recalls;