import { addEventListenerToEl } from './../../../shared/misc';

export class ThemeToggle {
  constructor(wrapper) {
    // If DOM Element ref is not passed - exit with warning
    if (!wrapper) console.warn('theme toggle wrapper failed to initialize.');
    
    // Reference to form
    let form = wrapper.querySelector('.theme-toggle__form');
    if (!form) return;

    // Creates a map for class details
    let themes = new Map();

    // Sets values to map
    themes.set('default', '');
    themes.set('high-contrast-yellow', 'theme__high-contrast-yellow');
    themes.set('low-contrast-grey', 'theme__low-contrast-grey');
    themes.set('sepia', 'theme__sepia');
    themes.set('medium-contrast-yellow', 'theme__medium-contrast-yellow');

    // State object for tracking wrapper changes
    this.state = {
      currentTheme: '',
      themes,
      elements: {
        form,
      },
    };

    // Class setup
    this.setup();
  }

  setup = () => {
    // Form change handler
    addEventListenerToEl(this.state.elements.form, 'change', this.formChangeHandler);
  };

  /**
  * Change event handler for radio fieldset / set form changes
  *
  * @param {Event} event - DOM Event object
  */
  formChangeHandler = event => {
    event.preventDefault();

    // Declare method variables
    let val, themeClass;

    // Gets radio group value from form change event
    val = event.target.value;

    /* 
    Converts value to lowercase
    string type changed into array splitting items on a space
    array type changed into a string joining each item with a - char
    */
    val = val.toLowerCase().split(' ').join('-');
    if (!val) console.warn('Failed to retreive radio value');

    // Ensure classname exists within sate.themeClasses map
    themeClass = this.state.themes.get(val);
    if (!themeClass) console.warn('Failed to retrive new theme class');

    // If theme is currently set return
    if (themeClass == this.state.currentTheme) return;

    // Set new theme
    this.setNewTheme(themeClass);
  };

  /**
  * Sets theme class to document body
  *
  * @param {string} themeName - String class name
  */
  setNewTheme = themeName => {
    // If state.theme is set
    if (this.state.currentTheme) {
      // Remove current instance of theme class
      document.body.classList.remove(this.state.currentTheme);
    };

    // Update state
    this.state.currentTheme = themeName;

    // Set new theme
    document.body.classList.add(themeName);
  };
}
