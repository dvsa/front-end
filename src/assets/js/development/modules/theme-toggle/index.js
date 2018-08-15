import { ThemeToggle } from './theme-toggle';

// Init theme toggle class
export const initThemeToggle = () => {
  // Grab reference to single item theme-toggle
  let themeToggleDomELm = document.querySelector('.theme-toggle');
  if (!themeToggleDomELm) return;

  // Initialize new theme toggle
  new ThemeToggle(themeToggleDomELm);
};
