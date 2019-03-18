/**
 * Sets and returns a sample data object of defect differences
 *
 * @returns {Object} - Difference data object
 */
export const initViewData = () => {
  return {
    inspection: {
      tester: 'John Morris, MORR6743',
      veName: 'Robert Smith, SMIT9746',
      regNumber: 'FL18 JIU',
      vtsNumber: 'VTS0071',
      vtsName: 'RS Tuning Ltd',
    },
    totalDifferences: 3,
    completedReviewCount: 0,
    allComplete: false,
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
        name: 'Daytime running lamp obviously incorrectly positioned',
        category: 'Lamps',
        severity: 'Minor',
        manualsRef: '1.2 c',
        position: 'Nearside front',
        points: 0,
        hasDifference: true,
        isResolved: true,
        difference: {
          name: 'None',
        },
      },
      {
        name: 'Wheel hub spigot mounting slightly worn ',
        category: 'Wheels',
        severity: 'Major',
        manualsRef: '1.2.3 a',
        position: 'Nearside front',
        points: 0,
        hasDifference: true,
        isResolved: false,
        difference: {
          name: 'None',
        },
      },
      {
        name: 'Wheel hub spigot mounting slightly worn ',
        category: 'Wheels',
        severity: 'Major',
        manualsRef: '1.2.3 a',
        position: 'Nearside front',
        points: 0,
        hasDifference: true,
        isResolved: false,
        difference: {
          name: 'None',
        },
      },
      {
        name: 'Daytime running lamp obviously incorrectly positioned',
        category: 'Lamps',
        severity: 'Minor',
        manualsRef: '4.2.3 (i)',
        position: 'Nearside rear',
        points: 0,
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
