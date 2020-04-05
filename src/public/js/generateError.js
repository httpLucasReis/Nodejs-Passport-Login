window.generateError = (errorMessage) => {
  let divError = document.querySelector('div.alert-danger');

  if (!divError) {
    divError = document.createElement('div');

    divError.classList.add('alert');
    divError.classList.add('alert-danger');
  }

  divError.textContent = '';

  const textError = document.createTextNode(errorMessage);
  divError.appendChild(textError);

  return divError;
}
