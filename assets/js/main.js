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

calculateMinScrolled();

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

  window.onscroll = scrollFunction;
  window.addEventListener('resize', calculateMinScrolled);
  scrollFunction();
});
