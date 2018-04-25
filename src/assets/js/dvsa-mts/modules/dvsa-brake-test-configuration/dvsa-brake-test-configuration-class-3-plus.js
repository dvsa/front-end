import { toggleClass, toggleDisabledAttribute, toggleAttribute, addEventListenerToEl } from './../../../shared';

export class DvsaBrakeTestConfigurationClass3Plus {
  constructor() {
    this.classnames = {
      jsHidden: 'js-hidden',
    };

    this.elements = {
      base: document.querySelector('.dvsa-brake-test-configuration--class-3-plus'),
      serviceBrakeTestType: document.querySelector('#serviceBrake1TestType'),
      parkingBrakeTestType: document.querySelector('#parkingBrakeTestType'),
      numberOfAxles: document.querySelector('#numberOfAxles'),
      weightTypes: Array.from(document.querySelectorAll('[name=weightType]')),
      vehicleWeight: document.querySelector('#vehicleWeight'),
      vehicleWeightFields: document.querySelector('#vehicleWeightFields'),
      weightInputPanel: document.querySelector('#weightInputPanel'),
      numberOfAxlesContainer: document.querySelector('#numberOfAxlesContainer'),
      weightInputPanel: document.querySelector('#weightInputPanel'),
      parkingBrakeNumberOfAxlesContainer: document.querySelector('#parkingBrakeNumberOfAxlesContainer'),
      weightTypeNotApplicable: document.querySelector('#weightType-not-applicable'),
    };

    this.constants = {
      ROLLR: 'ROLLR',
      DECEL: 'DECEL',
      GRADT: 'GRADT',
    };

    this.attributes = {
      disabled: 'disabled',
    };

    this.state = {
      data: window.__BRAKE_TEST_CONFIGURATION_DATA,
      serviceBrakeTestType: '',
      parkingBrakeTestType: '',
      numberOfAxles: '',
      weightAndAxlesVisible: false,
      parkingAxlesVisible: false,
      vehicleWeight: '',
      weightType: '',
      weightVisible: '',
      brakeTestTypes: [],
      vehicleClassBrakeTestTypes: [],
      avaliableParkingBrakeTestTypes: [],
    };

    if(!this.elements.base) return;

    this.init();
  }

  /**
   * Initializer
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  init = () => {
    this.setupBrakeTestTypes();
    this.update();
    this.updateParkingBrakeTestTypeSelectOptions();
    addEventListenerToEl(this.elements.serviceBrakeTestType, 'change', this.update);
    addEventListenerToEl(this.elements.serviceBrakeTestType, 'change', this.update);
    addEventListenerToEl(this.elements.parkingBrakeTestType, 'change', this.update);
    if(this.elements.numberOfAxle) {
      addEventListenerToEl(this.elements.numberOfAxles, 'change', this.update);
    }
    this.elements.weightTypes.forEach(weightTypeInputElement => {
      addEventListenerToEl(weightTypeInputElement, 'change', this.update);
    });
  }

  /**
   * Setup brake test types
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  setupBrakeTestTypes = () => {
    // Vehicle Class
    // -> Valid Service Brake Test Types
    // --> Valid Parking Brake Test Types
    this.state.brakeTestTypes = {
      '3': {
        'ROLLR': ['ROLLR', 'DECEL', 'GRADT'],
        'PLATE': ['PLATE'],
        'DECEL': ['ROLLR', 'DECEL', 'GRADT']
      },

      '4': {
        'ROLLR': ['ROLLR', 'DECEL', 'GRADT'],
        'PLATE': ['PLATE', 'DECEL', 'GRADT'],
        'DECEL': ['ROLLR', 'DECEL', 'GRADT']
      },

      '4A': {
        'ROLLR': ['ROLLR', 'DECEL', 'GRADT'],
        'PLATE': ['PLATE', 'DECEL', 'GRADT'],
        'DECEL': ['ROLLR', 'DECEL', 'GRADT']
      },

      '5': {
        'ROLLR': ['ROLLR', 'DECEL', 'GRADT'],
        'DECEL': ['ROLLR', 'DECEL', 'GRADT']
      },

      '5A': {
        'ROLLR': ['ROLLR', 'DECEL', 'GRADT'],
        'DECEL': ['ROLLR', 'DECEL', 'GRADT']
      },

      '7': {
        'ROLLR': ['ROLLR', 'DECEL', 'GRADT'],
        'PLATE': ['PLATE', 'DECEL', 'GRADT'],
        'DECEL': ['ROLLR', 'PLATE', 'DECEL', 'GRADT']
      }
    };
    this.state.vehicleClassBrakeTestTypes = Object.keys(this.state.brakeTestTypes[this.state.data.vehicleClass]);
    this.setupServiceBrakeTestTypeSelectOptions();
  }

  /**
   * Updates DOM/State
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  update = () => {
    this.updateStateFromDOM();
    this.updateDOMBasedOnState();
  }

  /**
   * Updates the current state from DOM elements
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  updateStateFromDOM = () => {
    this.state.serviceBrakeTestType = this.elements.serviceBrakeTestType.value;
    this.state.parkingBrakeTestType = this.elements.parkingBrakeTestType.value;
    this.state.avaliableParkingBrakeTestTypes = this.state.brakeTestTypes[this.state.data.vehicleClass][this.state.serviceBrakeTestType];
    this.state.numberOfAxles = this.elements.numberOfAxles ? this.elements.numberOfAxles.value : false;
    this.state.vehicleWeight = this.elements.vehicleWeight.value;
    this.elements.weightTypes.forEach((weightTypeElement) => {
      if(weightTypeElement.checked) {
        this.state.weightType = weightTypeElement.value;
      }
    });
  }

  /**
   * Updates DOM elements based on current state
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  updateDOMBasedOnState = () => {
    // Toggle weight field
    toggleClass(this.elements.vehicleWeightFields, this.classnames.jsHidden, !this.isWeightAndAxlesVisible());
    toggleDisabledAttribute(this.elements.vehicleWeightFields.querySelector('input'), !this.isWeightAndAxlesVisible());
 
    if(this.elements.numberOfAxlesContainer) {
      // Toggle number of axles
      toggleClass(this.elements.numberOfAxlesContainer, this.classnames.jsHidden, !this.isWeightVisible());
      toggleDisabledAttribute(this.elements.numberOfAxlesContainer.querySelector('input'), !this.isWeightVisible());
      
      // Toggle parking brake number of axles
      toggleClass(this.elements.parkingBrakeNumberOfAxlesContainer, this.classnames.jsHidden, !this.isParkingAxlesVisible());
    }
    
    // Toggle weight type not applicable
    toggleDisabledAttribute(this.elements.weightTypeNotApplicable, !this.shouldEnableNotApplicableRadioButton());

    // Parking brake test type
    this.updateParkingBrakeTestTypeSelectOptions();

    // Toggle vehicle weight
    toggleClass(this.elements.weightInputPanel, this.classnames.jsHidden, this.state.weightType === 'NA');
    toggleDisabledAttribute(this.elements.vehicleWeight, this.state.weightType === 'NA');
  }

  /**
   * Check if weight and and axles are visible
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  isWeightAndAxlesVisible = () => {
    const serviceBrakeTestTypeCheck = (
      this.state.serviceBrakeTestType !== this.constants.DECEL && 
      this.state.parkingBrakeTestType !== this.constants.GRADT
    ); 

    const parkingBrakeTestTypeCheck = (
      this.state.parkingBrakeTestType !== this.constants.DECEL &&
      this.state.parkingBrakeTestType !== this.constants.GRADT
    );

    return serviceBrakeTestTypeCheck || parkingBrakeTestTypeCheck;
  }

  /**
   * Check if parking axles should be visible
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  isParkingAxlesVisible = () => {
    const isNumberOfAxlesEqualTo3 = parseInt(this.state.numberOfAxles) === 3;
    const parkingBrakeTestTypeDecelCheck = (
      this.state.parkingBrakeTestType !== this.constants.DECEL &&
      this.state.parkingBrakeTestType !== this.constants.GRADT
    );
    return isNumberOfAxlesEqualTo3 && parkingBrakeTestTypeDecelCheck;
  }

  /**
   * Check if weight is visible
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  isWeightVisible = () => {
    return this.isWeightAndAxlesVisible() && this.state.weightType !== 'NA';
  }

  /**
   * Check if not applicable radio button is enabled
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  shouldEnableNotApplicableRadioButton = () => {
    const brakeTypeCheck = (
      this.state.serviceBrakeTestType === this.constants.ROLLR &&
      this.state.parkingBrakeTestType === this.constants.ROLLR
    );
    
    const vehicleClassCheck = (
      this.state.data.vehicleClass === '3' ||
      this.state.data.vehicleClass === '4' ||
      this.state.data.vehicleClass === '4A'
    );

    return brakeTypeCheck && vehicleClassCheck;
  }

  /**
   * Updates servie brake test type select options
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  setupServiceBrakeTestTypeSelectOptions = () => {
    this.updateSelectFieldAvaliableOptions(this.elements.serviceBrakeTestType, this.state.vehicleClassBrakeTestTypes);
  }

  /**
   * Updates parking brake test type select options
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  updateParkingBrakeTestTypeSelectOptions = () => {
    this.updateSelectFieldAvaliableOptions(this.elements.parkingBrakeTestType, this.state.avaliableParkingBrakeTestTypes);
  }

  /**
   * Updates the select field options
   * based on an array of avalaible options
   * 
   * @param {HTMLElement} selectFieldElement Select field element
   * @param {Array} avaliableOptions Array of avaliable options
   *
   * @author Tameem Safi <t.safi@kainos.com>
   * @since 1.2.9
   */
  updateSelectFieldAvaliableOptions = (selectFieldElement, avaliableOptions) => {
    const options = Array.from(selectFieldElement.querySelectorAll('option'));
    if(!options || options.length === 0) return;
    let firstAvaliableOption = false;
    const disabledValues = [];
    options.forEach(optionElement => {
      if(avaliableOptions.indexOf(optionElement.value) === -1) {
        toggleDisabledAttribute(optionElement, true);
        toggleAttribute(optionElement, 'hidden', 'true', true);
        disabledValues.push(optionElement.value);
      } else {
        toggleDisabledAttribute(optionElement, false);
        toggleAttribute(optionElement, 'hidden', 'true', false);
        if(!firstAvaliableOption) {
          firstAvaliableOption = optionElement.value;
        }
      }
    });
    if(disabledValues.indexOf(selectFieldElement.value) !== -1) {
      selectFieldElement.value = firstAvaliableOption;
    }
  }
}