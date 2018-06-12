export const TEXT_TO_SPEECH_CONFIG = {
  classes: {
    wrapper: 'text-to-speech__wrapper',
    readerItem: 'text-to-speech__item',
    readerItemHighlight: 'text-to-speech__item--highlight',
    audioBtn: 'text-to-speech__button',
    audioBtnPlaying: 'text-to-speech__button--playing',
  },
  audioBtnText: 'Play audio',
  dataAttributes: {
    readerID: 'data-item-id',
  },
  DOMTargets: ['p', 'ul'],
  buttonInnerHtml: `<span class='sr-only'>Play Audio</span>
  <i class='text-to-speech__icon text-to-speech__icon--play' role='presentation'></i>`,
};
