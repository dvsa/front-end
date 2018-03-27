import { addEventListenerToEl, isElementInViewport } from './../../../shared';

export class ManualSmartSurvey {
  constructor() {
    this.classnames = {
      manualSmartSurvey: {
        base: 'manual-smart-survey',
        iframe: 'manual-smart-survey__iframe',
      },
    };

    this.attributes = {
      iframeSrc: 'data-iframe-src',
      iframeAttached: 'data-iframe-attached',
    };

    this.elements = {
      smartSurveyElements: Array.from(document.querySelectorAll(`.${this.classnames.manualSmartSurvey.base}`)),
    };

    this.init();
  }

  /**
   * Initializer
   * - Add iframes for visible elements
   * - Attach events
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.1.25
   */
  init = () => {
    this.setupAllIframes();
    addEventListenerToEl(window, 'load resize scroll', this.onWindowLoadResizeScroll);
  };

  /**
   * Add iframe to all visible elements
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.1.25
   */
  setupAllIframes = () => {
    this.elements.smartSurveyElements.forEach(element => {
      // Check to see if element is in viewport
      if (!isElementInViewport(element)) return;

      // Check if iframe has already been added
      const iframeAttached = element.getAttribute(this.attributes.iframeAttached) || false;
      if (iframeAttached) return;

      // Add iframe
      const iframeSrc = element.getAttribute(this.attributes.iframeSrc);
      element.innerHTML = this.generateIframeCode(iframeSrc);
    });
  };

  /**
   * Generates the html for the iframe
   *
   * @param {String} src Src of the iframe
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.1.25
   */
  generateIframeCode = src => {
    return `
      <iframe
        src="${src}"
        frameborder="0"
        class="${this.classnames.manualSmartSurvey.iframe}"
      ></iframe>
    `;
  };
}
