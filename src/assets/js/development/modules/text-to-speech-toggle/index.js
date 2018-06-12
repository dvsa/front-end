import { TextToSpeechToggle } from './text-to-speech-toggle';

export const initTextToSpeechToggle = () => {
  let textToSpeechToggleElement = document.querySelector('.text-to-speech-toggle');
  if (!textToSpeechToggleElement) return;
  new TextToSpeechToggle(textToSpeechToggleElement);
};
