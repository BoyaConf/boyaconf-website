let minScrolled = 20;

function calculateMinScrolled() {
  const bodyScrollHeight = document.body.scrollHeight || 0;
  const eleScrollHeight = document.documentElement.scrollHeight || 0;

  let expectedHeight = bodyScrollHeight || document.documentElement.scrollHeight || 0;
  if (bodyScrollHeight > 0 && eleScrollHeight > 0) {
    expectedHeight = Math.ceil(Math.min(bodyScrollHeight, eleScrollHeight));
  }

  minScrolled = Math.ceil(expectedHeight * 0.16);
}

function goToTop() {
  const timeout = setTimeout(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    clearTimeout(timeout);
  }, 10);
}

function scrollFunction() {
  if (document.body.scrollTop > minScrolled || document.documentElement.scrollTop > minScrolled) {
    document.getElementById('to-top').classList.add('is-active');
  } else {
    document.getElementById('to-top').classList.remove('is-active');
  }
}

window.onscroll = scrollFunction;
window.addEventListener('resize', calculateMinScrolled);

calculateMinScrolled();
scrollFunction();

document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

function showFormError() {
  try {
    document.getElementById('sub-error').classList.remove('is-hidden');
  } catch (e) {
  }
}

function clearFormError() {
  const errorEle = document.getElementById('sub-error');
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

  const response = grecaptcha.getResponse();
  if (response.length === 0) {
    showFormError();
    return false;
  }
  clearFormError();

  const subBtn = document.getElementById('sub-btn');
  subBtn.classList.add('is-loading');

  subNameField.disabled = true;
  subEmailField.disabled = true;

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://api.mailerlite.com/api/v2/groups/49639168/subscribers', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('X-MailerLite-ApiKey', 'e19e306ef466923adcdbb080bae8c734');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      subNameField.disabled = false;
      subEmailField.disabled = false;
      subBtn.classList.remove('is-loading');
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      } else {
        console.error('Error:');
        console.error(xhr.responseText);
      }
    }
  };
  xhr.send(JSON.stringify({ name: subName, email: subEmail }));
  return true;
}
