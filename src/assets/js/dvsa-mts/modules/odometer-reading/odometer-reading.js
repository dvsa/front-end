import { delegateEvent, triggerClickEventOnElement } from './../../../shared';

export class OdometerReading {
  constructor() {
    this.selectors = {
      unknown: '.js-unknown',
      noOdometer: '.js-noOdometer',
      odometer: '.js-odometer',
      odoInputRadio: '.js-odoInputRadio',
    };

    this.elements = {
      odometer: document.querySelector(this.selectors.odometer),
      odoInputRadio: document.querySelector(this.selectors.odoInputRadio),
    };

    if (!this.elements.odometer || !this.elements.odoInputRadio) return;

    this.init();
  }

  /**
   * Initializer
   * - Add events
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.1.21
   */
  init = () => {
    delegateEvent(document, 'click', this.selectors.unknown, this.onUnknownOrNoOdometerClick);
    delegateEvent(document, 'click', this.selectors.noOdometer, this.onUnknownOrNoOdometerClick);
    delegateEvent(document, 'click', this.selectors.odometer, this.onOdometerClick);
  };

  /**
   * Handle when odometer is not readable or no odometer is clicked
   *
   * @param {Event} event DOM event object
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.1.21
   */
  onUnknownOrNoOdometerClick = event => {
    this.elements.odometer.value = '';
  };

  /**
   * Handle when odometer reading input is clicked
   *
   * @param {Event} event DOM event object
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.1.21
   */
  onOdometerClick = event => {
    this.elements.odoInputRadio.click();
  };
}
