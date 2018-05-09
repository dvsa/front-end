const textToSpeech = {
  classes: {
    playBtn: 'text-to-speech__button--play',
  },
  content: {
    init: 'Listen to this section',
    resume: 'Resume audio',
    pause: 'Pause audio',
  },
};

export const TEXT_TO_SPEECH_CONFIG = {
  content: {
    init: textToSpeech.content.init,
    play: textToSpeech.content.resume,
    pause: textToSpeech.content.pause,
  },
  classes: {
    wrapper: {
      wrapper: 'text-to-speech',
    },
    section: {
      wrapper: 'text-to-speech__section',
    },
    controls: {
      wrapper: 'text-to-speech__controls',
      JSEnabled: 'text-to-speech__controls--js-enabled',
      playBtn: textToSpeech.classes.playBtn,
    },
  },
  speechSettings: {
    voice: 7,
    volume: 1,
    rate: -2,
    pitch: 0,
    lang: 'en-uk',
  },
  DOMElement: `<button class='text-to-speech__button ${textToSpeech.classes.playBtn}'>${textToSpeech.content.init}</button>`,
};
