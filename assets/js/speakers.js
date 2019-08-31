let talks = null;

const loadTalks = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', './assets/js/talks.json', true);
  xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      try {
        const data = JSON.parse(xhr.responseText);
        talks = data.talks || {};
        console.log(talks);
      } catch (e) {
        talks = null;
      }
    }
  };
  xhr.send(null);
};

function closeSpeakerModal() {
  console.log('close modal');
}

function openSpeakerModal(who) {
  if (typeof talks === 'undefined' || talks === null || Object.keys(talks).length <= 0) return;
  if (typeof who === 'undefined' || who === null || who.length <= 0) return;
  try {
    const isEnglish = window.location.href.toString().toLowerCase().includes('/en/');
    const items = isEnglish ? talks.en : talks.es;
    const rightTalk = items[who];
    console.log(rightTalk);
  } catch (e) {
  }
}

loadTalks();
