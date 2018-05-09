import { initLibraryNavigation } from './library-page-navigation';
import { initDevPreview } from './dev-preview';
import { initTextToSpeech } from './text-to-speech';
import { initSpeechToText } from './speech-to-text';
import { initThemeToggle } from './theme-toggle';

export const initModules = () => {
  initLibraryNavigation();
  initDevPreview();
  initTextToSpeech();
  initSpeechToText();
  initThemeToggle();
};
