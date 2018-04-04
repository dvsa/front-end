import { addEventListenerToEl, isElementInViewport, toggleClass } from './../../../shared';

export class ManualSmartSurvey {
  constructor() {
    this.classnames = {
      manualSmartSurvey: {
        base: 'manual-smart-survey',
        iframe: 'manual-smart-survey__iframe',
        iframeFeedbackOpen: 'manual-smart-survey__iframe--feedback-open',
      },
    };

    this.attributes = {
      iframeSrc: 'data-iframe-src',
      iframeAttached: 'data-iframe-attached',
    };

    this.elements = {
      smartSurveyElements: Array.from(document.querySelectorAll(`.${this.classnames.manualSmartSurvey.base}`)),
    };

    this.events = {
      smartSurveyRadioClicked: 'smartsurvey_radio_clicked',
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
    addEventListenerToEl(window, 'load', this.setupAllIframes);
    addEventListenerToEl(window, 'resize', this.setupAllIframes);
    addEventListenerToEl(window, 'scroll', this.setupAllIframes);
    addEventListenerToEl(window, 'message', this.onPostMessageReceived);
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
      if (!isElementInViewport(element, 200)) return;

      // Check if iframe has already been added
      const iframeAttached = element.getAttribute(this.attributes.iframeAttached) || false;
      if (iframeAttached) return;

      // Add iframe
      const iframeSrc = element.getAttribute(this.attributes.iframeSrc);
      element.innerHTML = this.generateIframeCode(iframeSrc);
      element.setAttribute(this.attributes.iframeAttached, 'yes');
    });
  };

  /**
   * Received post message
   *
   * @param {Event} event The event object received
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.1.25
   */
  onPostMessageReceived = event => {
    if (!event || !event.data) return;
    if (event.data.event_id === this.events.smartSurveyRadioClicked && event.data.value === 'No') {
      const iframeContainer = document.querySelector(`[data-heading="${event.data.heading}"]`);
      if (iframeContainer) {
        const iframe = iframeContainer.querySelector(`.${this.classnames.manualSmartSurvey.iframe}`);
        toggleClass(iframe, this.classnames.manualSmartSurvey.iframeFeedbackOpen, true);
      }
    }
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
