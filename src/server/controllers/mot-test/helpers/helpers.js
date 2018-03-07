/**
 * Replaces new lines in the string with <br/>
 *
 * @param {String} text text string to parse
 * @returns {string} return string with new lines replaced
 *
 * @author James Nelson <j.nelson@kainos.com>
 */
export const formatTextAreaResponse = text => {
  if (!text) return console.warn('formatTextArea was not provided a text param');
  // Checks if text param is of string
  if (typeof text !== 'string') return console.warn('Non string value passed into formatTextAreaResponse');
  // (/g) enables global matching
  return text.replace(/\n/g, '<br />');
};
