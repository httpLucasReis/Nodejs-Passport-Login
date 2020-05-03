(function() {
  const [form] = document.forms;
  const divContainer = document.querySelector('div.container');

  form.addEventListener('submit', (event) => {
    const password1 = document.querySelector('#inputPassword1').value;
    const password2 = document.querySelector('#inputPassword2').value;

    if (!password1 || !password2) {
      event.preventDefault();
      const errorEl = window.generateError('Fill in all fields!');
      divContainer.prepend(errorEl);
      return;
    }

    const invalidPasswordLength = password1.length < 8 || password2.length < 8;
    const differentPasswords = password1 !== password2;

    if (invalidPasswordLength) {
      event.preventDefault();
      const errorEl = window.generateError('The password must have at least 8 characters.');
      divContainer.prepend(errorEl);
      return;
    }

    if (differentPasswords) {
      event.preventDefault();
      const errorEl = window.generateError("The passwords don't match.");
      divContainer.prepend(errorEl);
      return;
    }
  });
})();
