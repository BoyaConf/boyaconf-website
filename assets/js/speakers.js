let talks = null;

function loadTalks() {
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

function setTalkData(talk, isEnglish = false) {
  console.log(talk);
  const speakerName = document.getElementById('speaker-name');
  if (speakerName) speakerName.innerText = talk ? talk.speaker || '' : '';
  const photo = `${isEnglish ? './../' : './'}assets/img/speakers/${(talk.speaker
    || '').toLowerCase().replace(/\s+/g, '-')}.png`;
  const speakerPhoto = document.getElementById('speaker-photo');
  if (speakerPhoto) {
    speakerPhoto.src = photo;
    speakerPhoto.alt = talk ? talk.speaker || '' : '';
  }
  const speakerInfo = document.getElementById('speaker-info');
  if (speakerInfo) speakerInfo.innerText = talk ? talk.info || '' : '';
  const talkTitle = document.getElementById('talk-title');
  if (talkTitle) talkTitle.innerText = talk ? talk.title || '' : '';
  const talkDescription = document.getElementById('talk-description');
  if (talkDescription) talkDescription.innerText = talk ? talk.description || '' : '';
}

function closeSpeakerModal() {
  try {
    document.documentElement.classList.remove('is-clipped');
  } catch (e) {
  }
  const modal = document.getElementById('speaker-modal');
  if (modal) modal.classList.remove('is-active');
  setTalkData(null);
}

function openSpeakerModal(who) {
  if (typeof talks === 'undefined' || talks === null || Object.keys(talks).length <= 0) return;
  if (typeof who === 'undefined' || who === null || who.length <= 0) return;
  try {
    document.documentElement.classList.add('is-clipped');
  } catch (e) {
  }
  try {
    const isEnglish = window.location.href.toString().toLowerCase().includes('/en/');
    const items = isEnglish ? talks.en : talks.es;
    setTalkData(items[who], isEnglish);
    const modal = document.getElementById('speaker-modal');
    if (modal) modal.classList.add('is-active');
  } catch (e) {
  }
}

loadTalks();
window.addEventListener('keyup', (event) => {
  let evt = event || window.event;
  let isEscape = false;
  if ('key' in evt) {
    isEscape = (evt.key === 'Escape' || evt.key === 'Esc');
  } else {
    isEscape = (evt.keyCode === 27);
  }
  if (isEscape) closeSpeakerModal();
});
