"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initViewData = void 0;
/**
 * Sets and returns an empty site review view data object
 *
 * @returns {Object} - Site review view data object
 */
var initViewData = exports.initViewData = function initViewData() {
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
      isCompleted: false,
      activityIsNotPeformed: false,
      activityIsPerformed: false,
      motTestNum: '',
      formData: {
        activityPerformed: '',
        testNum: ''
      },
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