(function() {
  const [form] = document.forms;
  const divContainer = document.querySelector('div.container');

  form.addEventListener('submit', (event) => {
    const username = document.querySelector('#inputUsername').value;
    const email = document.querySelector('#inputEmail').value;
    const password1 = document.querySelector('#inputPassword1').value;
    const password2 = document.querySelector('#inputPassword2').value;

    if (!username || !email || !password1 || !password2) {
      event.preventDefault();
      const errorEl = window.generateError('Fill in all fields!');
      divContainer.prepend(errorEl);
      return;
    }

    const usernameRegexp = /^[A-Za-z0-9]+(?:[_][A-Za-z0-9]+)*$/;
    const invalidUsername = !usernameRegexp.test(username) || username.length < 3;

    if (invalidUsername) {
      event.preventDefault();
      const errorEl = window.generateError('Invalid username.');
      divContainer.prepend(errorEl);
      return;
    }

    const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const invalidEmail = !emailRegexp.test(email);

    if (invalidEmail) {
      event.preventDefault();
      const errorEl = window.generateError('Invalid email format.');
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
