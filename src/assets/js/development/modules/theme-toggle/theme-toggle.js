import { addEventListenerToEl } from '../../../shared/misc/events';
import { THEME_TOGGLE } from './config';

export class ThemeToggle {
  constructor(themeToggleWrapper) {
    // If DOM element reference not passed, exit with warning
    if (!themeToggleWrapper) {
      return console.warn('theme toggle wrapper failed to initialize.');
    };

    // References to buttons
    let lowContrastBtn = themeToggleWrapper.querySelector('.theme-toggle__button--low-contrast');
    let darkThemeBtn = themeToggleWrapper.querySelector('.theme-toggle__button--dark-theme');
  
    // If buttons are undefined, exit
    if (!lowContrastBtn || !darkThemeBtn) return;

    // Set's data attr for each button
    lowContrastBtn.setAttribute('data-theme-type', 'low-contrast');
    darkThemeBtn.setAttribute('data-theme-type', 'dark-theme');

    // Stores key / class name pairs
    let themesMap = new Map();
    themesMap.set('low-contrast', 'theme__low-contrast');
    themesMap.set('dark-theme', 'theme__dark-theme');
    
    // State object for tracking wrapper changes
    this.state = {
      currentTheme: '',
      bodyref: document.body,
      themesMap,
    };

    // State object for storing DOM element references
    this.elements = {
      buttons: {
        lowContrastBtn,
        darkThemeBtn,
      }
    };

    // Class setup
    this.setup();
  };

  setup = () => {
    // Add event listeners to button elements
    addEventListenerToEl(this.elements.buttons.lowContrastBtn, 'click', this.buttonClickHander);
    addEventListenerToEl(this.elements.buttons.darkThemeBtn, 'click', this.buttonClickHander);
  };

  buttonClickHander = event => {
    event.preventDefault();
    let target, themeClass;

    // Get event target information
    target = this.getEventTargetInfo(event.target);
    if (!target) return console.warn('Failed to get event DOM element');

    // Ensure classname exists within sate.themeClasses map
    themeClass = this.state.themesMap.get(target.themeIndex);
    if (!themeClass) return console.warn('Failed to retrive new theme class');

    // If theme is currently set return
    if (themeClass == this.state.currentTheme) return;

    // Set new theme
    this.setNewTheme(themeClass);
  };

  getEventTargetInfo = elm => {
    // Get elements data-theme-type if exists
    let theme = elm.getAttribute('data-theme-type');

    // If elements undefined return
    if (!theme) return;

    // return themeIndex
    return themeIndex;
  };

  setNewTheme = newThemeName => {
    // If state.theme is set
    if (this.state.currentTheme) {
      // Remove current instance of theme class
      this.state.bodyref.classList.remove(this.state.currentTheme)      
    }

    // Update state
    this.state.currentTheme = newThemeName;

    // Set new theme
    this.state.bodyref.classList.add(newThemeName);
  }
}