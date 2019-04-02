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
    allComplete: false,
    defectIndex: 0,
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
        name: 'Vehicles internal headlight adjuster altered to recheck lights',
        category: 'Lamps',
        severity: 'Minor',
        manualsRef: '4.2.3 (a) (i)',
        position: 'Rear',
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
        name: 'Sub-frame likely to become detached',
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
        name: 'Sub-frame has an unsafe modification',
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
        name: 'Road wheel fractured',
        category: 'Lamps',
        severity: 'Minor',
        manualsRef: '4.2.3 (i)',
        position: 'Nearside rear',
        points: 0,
        comment: '',
        hasDifference: false,
        isResolved: true,
        difference: {
          name: 'Road wheel more than one fixing loose',
          category: 'Lamps',
          severity: 'Minor',
          manualsRef: '4.2.3 (i)',
          position: 'Nearside rear',
        },
      },
    ],
  };
};
