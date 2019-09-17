export class TextareaAutoresize {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('textarea.autoresize').forEach(function(element) {
      element.style.boxSizing = 'border-box';
      var offset = element.offsetHeight - element.clientHeight;
      document.addEventListener('input', function(event) {
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + offset + 'px';
      });
    });
  }
}
