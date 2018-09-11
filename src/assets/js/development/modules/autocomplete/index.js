import accessibleAutocomplete from 'accessible-autocomplete';

const countries = ['France', 'Germany', 'United Kingdom'];

accessibleAutocomplete({
  element: document.querySelector('#autocomplete-container'),
  id: 'autocomplete', // To match it to the existing <label>.
  source: countries,
});
