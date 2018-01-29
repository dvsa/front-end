export const allRequiredKeys = () => {
  return [
    'email',
    'firstname',
    'lastname',
    'day',
    'month',
    'year',
    'address1',
    'townOrCity',
    'postCode',
    'phoneNumber',
    'password',
    'questionOne',
    'questionOneAnswer',
    'questionTwo',
    'questionTwoAnswer',
  ];
};

export const allSecurityQuestions = () => {
  return [
    {
      value: 'select',
      text: 'Please select',
    },
    {
      value: 1,
      text: 'What did you want to be when you grew up?',
    },
    {
      value: 2,
      text: 'What was the name of your first pet?',
    },
    {
      value: 3,
      text: 'Who was your first kiss?',
    },
    {
      value: 4,
      text: 'Where did you go on your first memorable holiday?',
    },
  ];
};

export const filterFormData = formData => {
  if (!formData) return false;

  // List of all allowed form values
  const requiredKeys = allRequiredKeys();

  const allowKeys = [...requiredKeys, 'emailConfirmation', 'middlename', 'address2', 'address3', 'passwordConfirmation'];

  // Temporary object for later use
  let filteredValues = {};

  // Loop through each value in form data object
  Object.keys(formData).forEach((key, index) => {
    // If it is in the allowed list
    // add it to the temp variable
    if (allowKeys.indexOf(key) !== -1) {
      filteredValues[key] = formData[key];
    }
  });

  // Return all filtered data
  return filteredValues;
};
