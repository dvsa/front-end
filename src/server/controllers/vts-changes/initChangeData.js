/**
 * Returns an empty equipment change declaration
 *
 * @returns {Object} - Equipment change answers
 */
export const initViewData = () => {
  return {
    typeNames: [],
    questions: {
      type: {
        answer: [],
        errors: [],
      },
      approved: {
        answer: {},
        errors: [],
      },
      layout: {
        answer: {},
        errors: [],
      },
      classes: {
        answer: {},
        errors: [],
      },
    },
  };
};
