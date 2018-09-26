import accessibleAutocomplete from 'accessible-autocomplete';

export class AutoComplete {
  constructor(elm) {
    this.state = { elm };
    this.setup();
  }

  /**
   * Sets up accessible autocomplete component
   */
  setup = () => {
    // Sets up accessible autocomplete
    accessibleAutocomplete.enhanceSelectElement({
      autoselect: true,
      defaultValue: this.state.elm.options[this.state.elm.options.selectedIndex].innerHTML,
      minLength: 2,
      selectElement: this.state.elm,
    });
  };
}
