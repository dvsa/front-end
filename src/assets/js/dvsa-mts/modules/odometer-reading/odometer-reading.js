import { delegateEvent, triggerClickEventOnElement } from './../../../shared';

export class OdometerReading {
  constructor() {
    this.selectors = {
      notReadble: '#notReadable',
      noOdometer: '#noOdometer',
      odometer: '#odometer',
      odoInputRadio: '#odoInputRadio',
    };

    this.elements = {
      odomter: document.querySelector(this.selectors.odometer),
      odoInputRadio: document.querySelector(this.selectors.odoInputRadio),
    };

    if (!this.elements.odomter || !this.elements.odoInputRadio) return;

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
    delegateEvent(document, 'click', this.selectors.notReadble, this.onNotReadableOrNoOdomoeterClick);
    delegateEvent(document, 'click', this.selectors.noOdometer, this.onNotReadableOrNoOdomoeterClick);
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
  onNotReadableOrNoOdomoeterClick = event => {
    this.elements.odomter.value = '';
  };

  /**
   * Handle when odomoter radios change
   *
   * @param {Event} event DOM event object
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.1.21
   */
  onNotReadableOrNoOdomoeterClick = event => {
    this.elements.odomter.value = '';
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
