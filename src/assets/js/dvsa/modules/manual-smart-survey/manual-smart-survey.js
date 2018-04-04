import { addEventListenerToEl, isElementInViewport, toggleClass } from './../../../shared';
import throttle from 'lodash/throttle';

export class ManualSmartSurvey {
  constructor() {
    this.classnames = {
      manualSmartSurvey: {
        base: 'manual-smart-survey',
        iframe: 'manual-smart-survey__iframe',
        iframeFeedbackOpen: 'manual-smart-survey--feedback-open',
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

    this.state = {
      smartsurveys: [],
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
    addEventListenerToEl(window, 'resize', throttle(this.updateAllIframes, 300));
    addEventListenerToEl(window, 'scroll', throttle(this.updateAllIframes, 300));
    addEventListenerToEl(window, 'message', this.onPostMessageReceived);
  };

  /**
   * Add all smartsurveys to state
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.1.37
   */
  setupAllIframes = () => {
    this.elements.smartSurveyElements.forEach(smartSurveyElement => {
      this.state.smartsurveys.push({
        attached: false,
        smartSurveyElement,
        src: smartSurveyElement.getAttribute(this.attributes.iframeSrc),
      });
    });
    this.updateAllIframes();
  };

  /**
   * Update the DOM based on wether the element is visible or not
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.1.37
   */
  updateAllIframes = () => {
    if (!this.state.smartsurveys) return;
    this.state.smartsurveys.forEach((item, index) => {
      // Check if already added
      if (item.attached) return;

      // Check to see if element is in viewport
      if (!isElementInViewport(item.smartSurveyElement, 200)) return;

      // Add iframe
      item.smartSurveyElement.innerHTML = this.generateIframeCode(item.src);

      // Set attached state for element
      this.state.smartsurveys[index].attached = true;
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
    const dataParsed = JSON.parse(event.data);
    if (!dataParsed.event_id || !dataParsed.value) return;
    if (dataParsed.event_id === this.events.smartSurveyRadioClicked && dataParsed.value === 'No') {
      const iframeContainer = document.querySelector(`[data-heading="${dataParsed.heading}"]`);
      if (iframeContainer) {
        toggleClass(iframeContainer, this.classnames.manualSmartSurvey.iframeFeedbackOpen, true);
        // const iframe = iframeContainer.querySelector(`.${this.classnames.manualSmartSurvey.iframe}`);
        // toggleClass(iframe, this.classnames.manualSmartSurvey.iframeFeedbackOpen, true);
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
