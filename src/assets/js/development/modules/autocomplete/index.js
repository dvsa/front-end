import accessibleAutocomplete from 'accessible-autocomplete';

const countries = ['France', 'Germany', 'United Kingdom'];

console.log('test');

accessibleAutocomplete({
  element: document.querySelector('#my-autocomplete-container'),
  id: 'my-autocomplete', // To match it to the existing <label>.
  source: countries,
});

