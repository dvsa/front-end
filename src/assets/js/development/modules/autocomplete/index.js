import { AutoComplete } from './autocomplete';

export const initAutoComplete = () => {
  let autoCompleteElms = document.querySelectorAll('.select-autocomplete');
  if (!autoCompleteElms) return;

  autoCompleteElms = Array.from(autoCompleteElms);

  autoCompleteElms.forEach(autoCompleteItem => {
    new AutoComplete(autoCompleteItem);
  });
};
