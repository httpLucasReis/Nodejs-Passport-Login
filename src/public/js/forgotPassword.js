(function() {
  const [form] = document.forms;
  const divContainer = document.querySelector('div.container');

  form.addEventListener('submit', (event) => {
    const email = document.querySelector('#inputEmail').value;

    if (!email) {
      event.preventDefault();
      const errorEl = window.generateError('Fill in the email field!');
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
  });
})();
