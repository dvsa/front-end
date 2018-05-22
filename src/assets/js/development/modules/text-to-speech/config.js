const textToSpeech = {
  classes: {
    playBtn: 'text-to-speech__button--play',
  },
  content: {
    title: 'Listen to this information.',
    playBtn: 'Play audio',
    pauseBtn: 'Pause audio',
  },
};

export const TEXT_TO_SPEECH_CONFIG = {
  content: {
    title: textToSpeech.content.title,
    playBtn: textToSpeech.content.playBtn,
    pauseBtn: textToSpeech.content.pauseBtn,
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
    rate: -1,
    pitch: 0,
    lang: 'en-uk',
  },
  DOMElement: `<p class='text-to-speech__title'>
  <strong>${textToSpeech.content.title}</strong>
  </p>
  <button class='text-to-speech__button ${textToSpeech.classes.playBtn}'>${textToSpeech.content.playBtn}</button>`,
};
