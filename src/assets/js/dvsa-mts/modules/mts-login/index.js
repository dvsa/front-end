export const initMtsLogin = () => {
  const passwordField = document.querySelector('.sign-in-form .password-field');

  if (!passwordField) return;

  //Submit form when enter is pressed
  passwordField.onkeypress = () => {
    const keyName = event.key;
    if (keyName === 'Enter') {
      let form = document.getElementById('Login');
      form.submit();
      return false;
    }
  };

  //Prevent keyboard shortcuts to copy to clipboard
  passwordField.onkeydown = () => {
    if ((event.key === 'c' || event.key === 'x') && event.metaKey) {
      return false;
    }
  };

  //Prevent mouse click from copying/cutting to clipboard
  passwordField.oncopy = () => {
    return false;
  };

  passwordField.oncut = () => {
    return false;
  };
};
