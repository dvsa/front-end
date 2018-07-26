/**
 * Sets and returns an empty site review view data object
 *
 * @returns {Object} - Site review view data object
 */
export const initViewData = () => {
  return {
    testerDetails: {
      initialDate: '20 July 2018',
    },
    activity: {
      activityPerformed: false,
      motTestNum: '',
      reasonCommited: '',
      errors: [],
    },
    compliance: {
      commitedLevel: '',
      commitedComment: '',
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
      commitedLevel: '',
      commitedComment: '',
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
      commitedLevel: '',
      commitedComment: '',
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
      commitedLevel: '',
      commitedComment: '',
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
