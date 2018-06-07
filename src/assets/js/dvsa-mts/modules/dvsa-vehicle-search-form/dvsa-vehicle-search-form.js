import { addEventListenerToEl } from "../../../shared";

export class DvsaVehicleSearchForm {
  constructor() {
    this.elements = {
      base: document.querySelector('.dvsa-vehicle-search-form'),
      type: document.querySelector('#type'),
      vehicleSearch: document.querySelector('#vehicle-search'),
      searchFieldLabel: document.querySelector('.dvsa-vehicle-search-form__search-field-label'),
    };

    this.state = {
      data: window.__VEHICLE_SEARCH_FORM_DATA,
    };

    if(
      !this.elements.base ||
      !this.elements.type ||
      !this.elements.vehicleSearch ||
      !this.state.data
    ) return;

    this.init();
  }

  /**
   * Initializer
   * 
   * @author Tameem Safi <t.safi@kainos.com>
   */
  init = () => {
    addEventListenerToEl(this.elements.type, 'change', this.update);
    this.update();
  }

  /**
   * Update DOM
   * 
   * @author Tameem Safi <t.safi@kainos.com>
   */
  update = () => {
    if(!this.state.data || !this.state.data.placeholders) return;
    const placeholderDetails = this.state.data.placeholders[this.elements.type.value];

    if(placeholderDetails) {
      this.elements.searchFieldLabel.innerHTML = placeholderDetails.label;
      this.elements.vehicleSearch.setAttribute('placeholder', placeholderDetails.placeholder);
    }
  }
}