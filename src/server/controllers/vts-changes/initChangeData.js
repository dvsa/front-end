/**
 * Returns an empty equipment change declaration
 *
 * @returns {Object} - Equipment change answers
 */
export const initViewData = () => {
  return {
    errors: [],
    questions: {
      type: {},
      approved: {},
      unapprovedDetails: {},
      layout: {},
      layoutDetails: {},
      classes: {},
    },
  };
};
