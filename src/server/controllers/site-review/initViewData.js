/**
 * Sets and returns an empty site review view data object
 *
 * @returns {Object} - Site review view data object
 */
export const initViewData = () => {
  return {
    testerDetails: {
      date: '26 July 2018',
      testDay: '10',
      testMonth: 'July',
      testYear: '2018',
    },
    activity: {
      activityPerformed: true,
      motTestNum: '1234567890',
      reasonCommited: 'Test not necessary',
      errors: [],
    },
    compliance: {
      commitedLevel: 'Satisfactory',
      commitedComment: 'Information given in writing to site manager',
      errors: [],
      satisfactory: {
        isChecked: true,
        comment: '',
      },
      improve: {
        isChecked: false,

        comment: '',
      },
      unsatisfactory: {
        isChecked: false,
        comment: '',
      },
    },
    'management-and-quality': {
      commitedLevel: 'Unsatisfactory',
      commitedComment: 'Corrective advice given to testing staff',
      errors: [],
      satisfactory: {
        isChecked: true,
        comment: '',
      },
      improve: {
        isChecked: false,
        comment: '',
      },
      unsatisfactory: {
        isChecked: false,
        comment: '',
      },
    },
    people: {
      commitedLevel: 'Satisfactory',
      commitedComment: 'Information given in writing to site manager',
      errors: [],
      satisfactory: {
        isChecked: true,
        comment: '',
      },
      improve: {
        isChecked: false,
        comment: '',
      },
      unsatisfactory: {
        isChecked: false,
        comment: '',
      },
    },
    premises: {
      commitedLevel: 'Satisfactory',
      commitedComment: 'Information given in writing to site manager',
      errors: [],
      satisfactory: {
        isChecked: true,
        comment: '',
      },
      improve: {
        isChecked: false,
        comment: 'Improvements advised for premises',
      },
      unsatisfactory: {
        isChecked: false,
        comment: 'Urgent improvements advised for premises',
      },
    },
  };
};
/* testerName: 'James',
    'self-completed': true,
    'ae-representatives-user-id': 'Testers ID',
    'ae-representatives-full-name': 'Martin',
    'testers-user-id': 'Tester',
    date: {
      day: '14',
      month: '05',
      year: '2018',
    }, */
/*   };
};
 */
