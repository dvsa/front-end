import accessibleAutocomplete from 'accessible-autocomplete';

const manufacturers = [
  'Bentley',
  'BMW',
  'Cadillac',
  'Chevrolet',
  'Citroen',
  'Dacia',
  'Dodge',
  'Fiat',
  'Ford',
  'Honda',
  'Hyundai',
  'Jaguar',
  'Jeep',
  'Kia',
  'Land Rover',
  'Mercedes Benz',
  'Mini',
  'Nissan',
  'Peugeot',
  'Renault',
  'Skoda',
  'Tesla',
  'Toyota',
  'Vauxhall',
  'Volvo',
  'VW',
];

const landRoverModels = [
  'All New Discovery',
  'Defender',
  'Discovery',
  'Discovery Sport',
  'Freelander',
  'Land Rover',
  'Range Rover',
  'Range Rover Evoque',
  'Range Rover Sport',
  'Range Rover Velar',
];

accessibleAutocomplete({
  element: document.querySelector('#autocomplete-manufacturers'),
  id: 'autocomplete-manufacturers', // To match it to the existing <label>.
  source: manufacturers,
});

accessibleAutocomplete({
  element: document.querySelector('#autocomplete-landRoverModels'),
  id: 'autocomplete-landrovermodels', // To match it to the existing <label>.
  source: landRoverModels,
});
