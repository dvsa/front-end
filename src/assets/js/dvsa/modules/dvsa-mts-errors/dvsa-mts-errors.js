export class DvsaMTSErrors {
  constructor() {
    this.elements = {
      wrapper: document.querySelector('.dvsa-mts-errors'),
      stacktraceElements: Array.from(document.querySelector)
    };

    if(!this.elements.wrapper) return;

    this.init();
  }

  /**
   * Initializer
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.1.39
   */
  init = () => {

  }
}