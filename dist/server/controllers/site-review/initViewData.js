'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Sets and returns an empty site review view data object
 *
 * @returns {Object} - Site review view data object
 */
const initViewData = exports.initViewData = () => {
  return {
    testerDetails: {
      initialDate: '20 July 2018',
      testDay: '',
      testMonth: '',
      testYear: '',
      examinerId: '',
      testerRepId: '',
      testerName: '',
      testerRole: '',
      twoExaminers: 'no',
      errors: []
    },
    activity: {
      activityPerformed: false,
      motTestNum: '',
      reasonCommited: '',
      errors: []
    },
    compliance: {
      commitedLevel: '',
      commitedComment: '',
      errors: [],
      satisfactory: {
        isChecked: false,
        comment: ''
      },
      improve: {
        isChecked: false,
        comment: ''
      },
      unsatisfactory: {
        isChecked: false,
        comment: ''
      }
    },
    'management-and-quality': {
      commitedLevel: '',
      commitedComment: '',
      errors: [],
      satisfactory: {
        isChecked: false,
        comment: ''
      },
      improve: {
        isChecked: false,
        comment: ''
      },
      unsatisfactory: {
        isChecked: false,
        comment: ''
      }
    },
    people: {
      commitedLevel: '',
      commitedComment: '',
      errors: [],
      satisfactory: {
        isChecked: false,
        comment: ''
      },
      improve: {
        isChecked: false,
        comment: ''
      },
      unsatisfactory: {
        isChecked: false,
        comment: ''
      }
    },
    premises: {
      commitedLevel: '',
      commitedComment: '',
      errors: [],
      satisfactory: {
        isChecked: false,
        comment: ''
      },
      improve: {
        isChecked: false,
        comment: ''
      },
      unsatisfactory: {
        isChecked: false,
        comment: ''
      }
    }
  };
};