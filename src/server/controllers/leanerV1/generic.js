// generic functions
// validate name/word
let validateWord = function(word) {
  let regex = /^[a-zA-Z ]+$/;
  return regex.test(word);
};

// validate email
let validateEmail = function(email) {
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

// validate postcode
let validatePostcode = function(postcode) {
  postcode = postcode.replace(/\s/g, '');
  let regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
  return regex.test(postcode);
};
