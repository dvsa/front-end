// from: https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
// see: https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
(function(arr) {
  arr.forEach(function(item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        if (this.parentNode !== null) this.parentNode.removeChild(this);
      },
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
