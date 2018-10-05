export const initMtsLogin = () => {
  const passwordField = document.querySelector('.js-password-behaviour');

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
    if (event.preventDefault !== undefined) event.preventDefault();
    if (event.stopPropagation !== undefined) event.stopPropagation();
  };

  // Prevent keyboard shortcuts to copy to clipboard
  passwordField.onkeydown = event => {
    if ((event.key === 'c' || event.key === 'x') && (event.metaKey || event.ctrlKey)) {
      return false;
    }
  };

  // Prevents whitespace characters from being pasted into the field
  passwordField.onpaste = event => {
    let clipboardData, pastedData;

    // Stop data actually being pasted into field by default
    event.stopPropagation();
    event.preventDefault();

    // Get pasted data via clipboard API
    clipboardData = event.clipboardData || window.clipboardData;

    if (clipboardData !== undefined) {
      pastedData = clipboardData.getData('Text');

      // carry out the paste with manipulated data to remove whitespace characters
      passwordField.value = pastedData
        .replace(/\n/g, '')
        .replace(/\v/g, '')
        .replace(/\f/g, '')
        .replace(/\r/g, '');
    }

    //Change the font colour of the field depending on whether the field has a value
    // (IE and Edge will show an extra dotfont symbol when the field is empty)
    if (passwordField.value === '') {
      passwordField.style.color = '#FFF';
    } else {
      passwordField.style.color = '#000';
    }
  };

  // Prevents drag interaction to another field from passwordField
  passwordField.ondragstart = event => event.preventDefault();

  // Prevents copying (including via shortcut) to clipboard from password field
  passwordField.oncopy = event => false;

  // Prevents copying (including via shortcut) to clipboard from password field
  passwordField.oncut = event => false;

  passwordField.onfocus = event => {
    if (passwordField.value === '') {
      passwordField.style.color = '#FFF';
    }
  };

  //Change the font colour of the field depending on whether the field has a value
  // (IE and Edge will show an extra dotfont symbol when the field is empty)
  passwordField.onkeyup = event => {
    if (passwordField.value === '') {
      passwordField.style.color = '#FFF';
    } else {
      passwordField.style.color = '#000';
    }
  };
};
