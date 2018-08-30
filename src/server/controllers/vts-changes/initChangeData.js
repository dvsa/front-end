/**
 * Returns an empty equipment change declaration
 *
 * @returns {Object} - Equipment change answers
 */
export const initViewData = () => {
  return {
    errors: [],
    questions: {
      type: {
        errors: [],
      },
      approved: {
        errors: [],
      },
      unapprovedDetails: {},
      layout: {},
      layoutDetails: {},
      classes: {},
    },
  };
};
