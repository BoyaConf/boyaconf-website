const people = [];

function showSingleDonation(key) {
  let letter = 'a';
  if (key > 0) letter = key === 1 ? 'b' : 'c';
  const divId = `donations-${letter}`;
  const div = document.getElementById(divId);
  const list = document.createElement('ul');
  for (const person of people[key]) {
    const item = document.createElement('li');
    item.innerHTML = person;
    list.appendChild(item);
  }
  div.appendChild(list);
}

function showDonations() {
  if (people.length <= 0) return;
  showSingleDonation(0);
  showSingleDonation(1);
  showSingleDonation(2);
}

function getDonations() {
  if (people.length > 0) {
    showDonations();
    return;
  }
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${isEnglish ? './..' : '.'}/assets/js/donations.json`, true);
  xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      let everyone = [];
      try {
        everyone = JSON.parse(xhr.responseText) || [];
      } catch (e) {
        everyone = [];
      }
      if (everyone.length > 0) {
        const maxLength = Math.ceil(everyone.length / 3);
        const first = everyone.slice(0, maxLength);
        const second = everyone.slice(maxLength, maxLength * 2);
        const third = everyone.slice(maxLength * 2, maxLength * 3);
        people.push(first, second, third);
        showDonations();
      }
    }
  };
  xhr.send(null);
}

function closeDonationsModal() {
  try {
    document.documentElement.classList.remove('is-clipped');
  } catch (e) {
  }
  const modal = document.getElementById('donations-modal');
  if (modal) modal.classList.remove('is-active');
  setTalkData(null);
}

function showDonationsModal() {
  const modal = document.getElementById('donations-modal');
  if (modal) modal.classList.add('is-active');
}

window.addEventListener('keyup', (event) => {
  let evt = event || window.event;
  let isEscape = false;
  if ('key' in evt) {
    isEscape = (evt.key === 'Escape' || evt.key === 'Esc');
  } else {
    isEscape = (evt.keyCode === 27);
  }
  if (isEscape) {
    closeSpeakerModal();
    closeDonationsModal();
  }
});

getDonations();
