import { TextToSpeech } from './text-to-speech';
import { TEXT_TO_SPEECH_CONFIG } from './config';

export const initTextToSpeech = () => {
  // Returns the first found element
  let textToSpeechElements = document.querySelectorAll(`.${TEXT_TO_SPEECH_CONFIG.classes.wrapper.wrapper}`);

  // Convers textToSpeechElements to array
  textToSpeechElements = Array.from(textToSpeechElements);

  // If not defined & includes at least one element
  if (textToSpeechElements && textToSpeechElements.length) {
    textToSpeechElements.forEach(textToSpeechElm => {
      // Init a new textToSpeech element
      new TextToSpeech(textToSpeechElm);
    });
  }
};
