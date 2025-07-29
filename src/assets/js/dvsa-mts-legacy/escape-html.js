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
  return String(d)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '') // Remove full script tags
    .replace(/<\/?[^>]+(>|$)/g, '') // Remove all HTML tags
    .replace(/[<>]/g, ''); // Remove leftover brackets
};
