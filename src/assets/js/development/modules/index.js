import { initLibraryNavigation } from './library-page-navigation';
import { initDevPreview } from './dev-preview';
import { initTextToSpeech } from './text-to-speech';

export const initModules = () => {
  initLibraryNavigation();
  initDevPreview();
  initTextToSpeech();
};
