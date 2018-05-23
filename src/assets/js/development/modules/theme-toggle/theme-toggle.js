import {
  toggleClass,
  addEventListenerToEl,
} from './../../../shared/misc';

import md5 from 'md5';
export class ThemeToggle {
  constructor(wrapper) {
    // If DOM element reference not passed, exit with warning
    if (!wrapper) console.warn('theme toggle wrapper failed to initialize.');
    
    // References to controls buttons
    let form = wrapper.querySelector('.theme-toggle__form');

    // If buttons are undefined, exit
    if (!form) return;

    // Stores key / class name pairs
    let themes = new Map();

    // Sets values to map
    themes.set('default', '');
    themes.set('low contrast', 'theme__low-contrast');
    themes.set('dark theme', 'theme__dark-theme');

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
    // Handles event for when check form changes
    addEventListenerToEl(this.state.elements.form, 'change', this.formChangeHandler);
  };

  formChangeHandler = event => {
    event.preventDefault();

    let val, themeClass;

    val = event.target.value;
    val = val.toLowerCase();

    if (!val) console.warn('Failed to retreive radio value');

    // Ensure classname exists within sate.themeClasses map
    themeClass = this.state.themes.get(val);
    if (!themeClass) console.warn('Failed to retrive new theme class');

    // If theme is currently set return
    if (themeClass == this.state.currentTheme) return;

    // Set new theme
    this.setNewTheme(themeClass);
  };

  setNewTheme = newThemeName => {
    // If state.theme is set
    if (this.state.currentTheme) {
      // Remove current instance of theme class
      document.body.classList.remove(this.state.currentTheme);
    };

    // Update state
    this.state.currentTheme = newThemeName;

    // Set new theme
    document.body.classList.add(newThemeName);
  };
}
