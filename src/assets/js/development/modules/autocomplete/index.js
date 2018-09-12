import accessibleAutocomplete from 'accessible-autocomplete';

const manufacturers = [
  'Alfa Romeo',
  'Allied Vehicles',
  'Aston Martin',
  'Audi',
  'Bentley',
  'BMW',
  'Bugatti Automobiles SAS',
  'Cadillac',
  'Caterham Cars',
  'Chevrolet',
  'Chrysler',
  'Citroen',
  'Dacia',
  'Dodge',
  'Ferrari',
  'Fiat',
  'Ford',
  'General Motors',
  'Honda',
  'Hummer',
  'Hyundai',
  'Infiniti',
  'Jaguar',
  'Jeep',
  'Kia',
  'Lamborghini',
  'Land Rover',
  'Lancia',
  'Lotus',
  'Maserati',
  'Mazda',
  'Mclaren',
  'Mercedes Benz',
  'Mini',
  'Mitsubishi',
  'Morgan',
  'Nissan',
  'Peugeot',
  'Porsche',
  'Renault',
  'Rolls Royce',
  'Rover',
  'SAAB',
  'Skoda',
  'Subaru',
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

if (document.querySelector('#autocomplete-manufacturers')) {
  accessibleAutocomplete({
    element: document.querySelector('#autocomplete-manufacturers'),
    id: 'autocomplete-manufacturers', // To match it to the existing <label>.
    source: manufacturers,
  });
<<<<<<< HEAD
}
=======
};
>>>>>>> minor patch up work for autocomplete

if (document.querySelector('#autocomplete-landRoverModels')) {
  accessibleAutocomplete({
    element: document.querySelector('#autocomplete-landRoverModels'),
    id: 'autocomplete-landrovermodels', // To match it to the existing <label>.
    source: landRoverModels,
  });
<<<<<<< HEAD
}
=======
};
>>>>>>> minor patch up work for autocomplete
