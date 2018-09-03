/**
 * Helper function - Check if an object is empty. Returns a boolean.
 *
 * @param obj - Any object to test
 *
 */
export const isEmpty = obj => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
};
