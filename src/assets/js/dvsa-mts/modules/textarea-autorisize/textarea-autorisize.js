export class TextareaAutoresize {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('textarea.autoresize').forEach(function(element) {
      element.style.boxSizing = 'border-box';
      var offset = element.offsetHeight - element.clientHeight;
      TextareaAutoresize.resize(element, offset);
      element.addEventListener('input', function() {
        TextareaAutoresize.resize(element, offset);
      });
    });
  }

  static resize(element, offset) {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + offset + 'px';
  }
}
