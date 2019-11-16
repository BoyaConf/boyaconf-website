function showFormError() {
  try {
    document.getElementById('sub-fields-error').classList.remove('is-hidden');
  } catch (e) {
  }
}

function clearFormError() {
  const errorEle = document.getElementById('sub-fields-error');
  errorEle.classList.add('is-hidden');
}

function validateForm(event) {
  event.preventDefault();

  const subNameField = document.getElementById('fields[name]');
  const subName = subNameField ? subNameField.value || '' : '';
  if (subName.length <= 0) {
    showFormError();
    return false;
  }

  const subEmailField = document.getElementById('fields[email]');
  const subEmail = subEmailField ? subEmailField.value || '' : '';
  if (subEmail.length <= 0) {
    showFormError();
    return false;
  }

  clearFormError();

  const subBtn = document.getElementById('sub-btn');
  subBtn.classList.add('is-loading');

  subNameField.disabled = true;
  subEmailField.disabled = true;

  const subOk = document.getElementById('sub-ok');
  subOk.classList.add('is-hidden');

  const subError = document.getElementById('sub-error');
  subError.classList.add('is-hidden');

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://boyaconf-subscriber.netlify.com/api/subscribe', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        subOk.classList.remove('is-hidden');
        subBtn.classList.add('is-hidden');
        subBtn.classList.remove('is-loading');
      } else {
        subError.classList.remove('is-hidden');
      }
    }
  };
  xhr.send(JSON.stringify({ name: subName, email: subEmail }));
  return true;
}
