import { initLibraryNavigation } from './library-page-navigation';
import { initDevPreview } from './dev-preview';
import { initTextToSpeechToggle } from './text-to-speech-toggle';
import { initFontSizeToggle } from './font-size-toggle';
import { initSpeechToText } from './speech-to-text';
import { initThemeToggle } from './theme-toggle';
import { initMessageFilter } from './mts-messages';
import { initCheckAll } from './check-all';

export const initModules = () => {
  initMessageFilter();
  initTextToSpeechToggle();
  initFontSizeToggle();
  initSpeechToText();
  initThemeToggle();
  initLibraryNavigation();
  initCheckAll();
  //initDevPreview();
};
