import DOMPurify from 'dompurify';

export class SafarFontFix {
  constructor() {
    this.isSafari =
      window.navigator.userAgent.match(/(\(Windows[\s\w\.]+\))[\/\(\s\w\.\,\)]+(Version\/[\d\.]+)\s(Safari\/[\d\.]+)/) !== null;
    this.elements = {
      head: document.querySelector('head'),
    };
    this.init();
  }

  /**
   * Fix for a printing
   * bug in safari browser
   *
   * @since 1.1.0
   * @author Tameem Safi <t.safi@kainos.com>
   */
  init = () => {
    if (this.isSafari && this.elements.head) {
      let printStylesFixForSarai = `
        @font-face {
          font-family: nta !important;
          src: local("Arial") !important;
        }
      `;
      let newStyleElement = document.createElement('style');
      newStyleElement.setAttribute('type', 'text/css');
      newStyleElement.setAttribute('media', 'print');
      newStyleElement.innerHTML = DOMPurify.sanitize(printStylesFixForSarai);
      this.elements.head.appendChild(newStyleElement);
    }
  };
}
