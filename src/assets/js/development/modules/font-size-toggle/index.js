import { FontSizeToggle } from './font-size-toggle';

export const initFontSizeToggle = () => {
  let fontSizeToggleElm = document.querySelector('.font-size-toggle');
  if (!fontSizeToggleElm) return;
  new FontSizeToggle(fontSizeToggleElm);
};
