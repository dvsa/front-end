import sanitizeHtml from 'sanitize-html';

function escapeHTML(str) {
  return String(str).replaceAll(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[m];
  });
}

var stripHtml = function(d) {
  return sanitizeHtml(String(d), { allowedTags: [], allowedAttributes: {} });
};
