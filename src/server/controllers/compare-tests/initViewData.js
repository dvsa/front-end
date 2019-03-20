/**
 * Sets and returns a sample data object of defect differences
 *
 * @returns {Object} - Difference data object
 */
export const initViewData = () => {
  return {
    inspection: {
      tester: 'John Morris, MORR6743',
      veName: 'Robert Smith,<br /> Vehicle Examiner',
      regNumber: 'FL18 JIU',
      vtsNumber: 'VTS0071',
      vtsName: 'RS Tuning Ltd',
    },
    totalDifferences: 3,
    completedReviewCount: 0,
    allComplete: false,
    currentDefect: 0,
    score: 0,
    outcome: {
      type: '',
      comment: '',
      points: 0,
    },
    shortcomings: {
      comment: '',
      points: 0,
    },
    defects: [
      {
        id: 1,
        name: 'All position lamps light intensity obviously reduced ',
        category: 'Lamps',
        severity: 'Minor',
        manualsRef: '4.2.3 (a) (i)]',
        position: '',
        points: 0,
        comment: '',
        hasDifference: true,
        isResolved: false,
        difference: {
          name: 'None',
        },
      },
      {
        id: 2,
        name: 'Wheel hub spigot mounting slightly worn ',
        category: 'Wheels',
        severity: 'Minor',
        manualsRef: '1.2.3 a',
        position: 'Nearside front',
        points: 0,
        comment: '',
        hasDifference: true,
        isResolved: false,
        difference: {
          name: 'None',
        },
      },
      {
        id: 3,
        name: 'Wheel hub spigot mounting slightly worn ',
        category: 'Road wheels',
        severity: 'Major',
        manualsRef: '5.2.1 (b) (i)',
        position: 'Nearside rear',
        points: 0,
        comment: '',
        hasDifference: true,
        isResolved: false,
        difference: {
          name: 'Wheel hub spigot mounting slightly worn ',
          category: 'Road wheels',
          severity: 'Major',
          manualsRef: '5.2.1 (b) (i)',
          position: 'Offside rear',
        },
      },
      {
        id: 4,
        name: 'Daytime running lamp obviously incorrectly positioned',
        category: 'Lamps',
        severity: 'Minor',
        manualsRef: '4.2.3 (i)',
        position: 'Nearside rear',
        points: 0,
        comment: '',
        hasDifference: false,
        isresolved: true,
        difference: {
          name: 'Daytime running lamp obviously incorrectly positioned',
          category: 'Lamps',
          severity: 'Minor',
          manualsRef: '4.2.3 (i)',
          position: 'Nearside rear',
        },
      },
    ],
  };
};
