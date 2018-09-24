export const initMtsLogin = () => {
  const passwordField = document.querySelector('.sign-in-form .password-field');
  
  if (!passwordField) return;
  
  //Submit form when enter is pressed
  passwordField.onkeypress = event => {
    const keyName = event.key;
    if (keyName === 'Enter') {
      let form = document.getElementById('Login');
      form.submit();
      return false;
    }
  };

  // Disables the context menu 
  passwordField.oncontextmenu = event => {
    if(event.preventDefault !== undefined) event.preventDefault();
    if(event.stopPropagation !== undefined) event.stopPropagation();
  };

  // Prevent keyboard shortcuts to copy to clipboard
  passwordField.onkeydown = event => {
    if ((event.key === 'c' || event.key === 'x') && (event.metaKey || event.ctrlKey)) {
      return false;
    }
  };

  // Prevents drag interaction to another field from passwordField
  passwordField.ondragstart = event => event.preventDefault();
  
  // Prevents copying (including via shortcut) to clipboard from password field
  passwordField.oncopy = event => false;

  // Prevents copying (including via shortcut) to clipboard from password field
  passwordField.oncut = event => false;
};
