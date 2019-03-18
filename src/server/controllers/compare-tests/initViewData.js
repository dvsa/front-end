/**
 * Sets and returns an empty site review view data object
 *
 * @returns {Object} - Site review view data object
 */
export const initViewData = () => {
  return {
    inspection: {
      tester: 'John Morris, MORR6743',
      regNumber: 'FL18 JIU',
      vtsNumber: 'VTS0071',
      vtsName: 'RS Tuning Ltd',
    },
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
    defects: [],
    defect1a: {
      name: 'Incorrect item',
      severity: 'Minor',
      position: 'Nearside front',
      points: 0,
    },
    defect2a: {
      name: 'Incorrect item',
      severity: 'Minor',
      position: 'Nearside front',
      points: 0,
    },
    defect3a: {
      name: 'Incorrect item',
      position: 'Offside rear',
      severity: 'Major',
      points: 0,
    },
    defect1b: {
      name: 'Incorrect item',
      severity: 'Minor',
      position: 'Nearside front',
      points: 0,
    },
    defect2b: {
      name: 'Incorrect item',
      severity: 'Minor',
      position: 'Nearside front',
      points: 0,
    },
    defect3b: {
      name: 'Incorrect item',
      position: 'Offside rear',
      severity: 'Major',
      points: 0,
    },
  };
};
