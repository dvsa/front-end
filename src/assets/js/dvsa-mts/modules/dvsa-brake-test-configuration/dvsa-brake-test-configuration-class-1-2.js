import { toggleClass, toggleDisabledAttribute, addEventListenerToEl } from './../../../shared';

export class DvsaBrakeTestConfigurationClass12 {
  constructor() {
    this.classnames = {
      jsHidden: 'js-hidden',
    };

    this.elements = {
      base: document.querySelector('.dvsa-brake-test-configuration--class-1-2'),
      weights: document.querySelector('#weights'),
      sidecarSection: document.querySelector('#sidecar-seection'),
      brakeTestType: document.querySelector('#brakeTestType'),
      sidecarWeight: document.querySelector('#sidecarWeight'),
      sidecarWeightGroup: document.querySelector('#sidecarWeightGroup'),
      isSidecarAttachedInputs: Array.from(document.querySelectorAll('[name=isSidecarAttached]')),
      vehicleWeightFront: document.querySelector('#vehicleWeightFront'),
      vehicleWeightRear: document.querySelector('#vehicleWeightRear'),
      riderWeight: document.querySelector('#riderWeight'),
    };

    this.constants = {
      ROLLR: 'ROLLR',
      PLATE: 'PLATE',
      FLOOR: 'FLOOR',
    };

    this.state = {
      brakeTestType: '',
    };

    if (!this.elements.base) return;

    this.init();
  }

  /**
   * Initializer
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  init = () => {
    this.update();
    addEventListenerToEl(this.elements.brakeTestType, 'change', this.update);
    this.elements.isSidecarAttachedInputs.forEach(inputElement => {
      addEventListenerToEl(inputElement, 'change', this.update);
    });
  };

  /**
   * Check if sidecar attached 'yes' radio is selected
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  isSidecarAttached = () => {
    let isSideCarAttached = false;
    this.elements.isSidecarAttachedInputs.forEach(inputElement => {
      if (inputElement.checked && inputElement.value === '1') {
        isSideCarAttached = true;
      }
    });
    return isSideCarAttached;
  };

  /**
   * Check if weight is required for brake test type
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  isWeightRequiredForBrakeTestType = () => {
    return (
      this.state.brakeTestType === this.constants.ROLLR ||
      this.state.brakeTestType === this.constants.PLATE ||
      this.state.brakeTestType === this.constants.FLOOR
    );
  };

  /**
   * Updates the state based on DOM elements
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  updateStateFromDOM = () => {
    this.state.brakeTestType = this.elements.brakeTestType.value;
  };

  /**
   * Refresh the DOM based on the state
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  refreshDOMFromState = () => {
    toggleClass(this.elements.sidecarWeightGroup, this.classnames.jsHidden, !this.isSidecarAttached());
    toggleDisabledAttribute(this.elements.sidecarWeight, !(this.isSidecarAttached() && this.isWeightRequiredForBrakeTestType()));
    toggleClass(this.elements.sidecarSection, this.classnames.jsHidden, !this.isWeightRequiredForBrakeTestType());
    toggleClass(this.elements.weights, this.classnames.jsHidden, !this.isWeightRequiredForBrakeTestType());
    toggleDisabledAttribute(this.elements.vehicleWeightFront, !this.isWeightRequiredForBrakeTestType());
    toggleDisabledAttribute(this.elements.vehicleWeightRear, !this.isWeightRequiredForBrakeTestType());
    toggleDisabledAttribute(this.elements.riderWeight, !this.isWeightRequiredForBrakeTestType());
  };

  /**
   * Update function
   * - Update state
   * - Refresh DOM
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  update = () => {
    this.updateStateFromDOM();
    this.refreshDOMFromState();
  };
}
