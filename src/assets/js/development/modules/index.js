import { initLibraryNavigation } from './library-page-navigation';
import { initDevPreview } from './dev-preview';
import { initTextToSpeechToggle } from './text-to-speech-toggle';
import { initFontSizeToggle } from './font-size-toggle';
import { initSpeechToText } from './speech-to-text';
import { initThemeToggle } from './theme-toggle';
import { initAutoComplete } from './autocomplete';

export const initModules = () => {
  initTextToSpeechToggle();
  initFontSizeToggle();
  initSpeechToText();
  initThemeToggle();
  initLibraryNavigation();
  initAutoComplete();
  initDevPreview();
};
