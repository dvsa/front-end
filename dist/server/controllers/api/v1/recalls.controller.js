'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
};

const recalls = exports.recalls = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    yield delay();
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
  });

  return function recalls(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();