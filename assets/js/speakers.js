let talks = null;
let isEnglish = false;
try {
  isEnglish = window.location.href.toString().toLowerCase().includes('/en/');
} catch (e) {
  isEnglish = false;
}

function loadTalks() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${isEnglish ? './..' : '.'}/assets/js/talks.json`, true);
  xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      try {
        const data = JSON.parse(xhr.responseText);
        talks = data.talks || {};
      } catch (e) {
        talks = null;
      }
    }
  };
  xhr.send(null);
};

function setTalkData(talk, photoUrl = '') {
  const speakerName = document.getElementById('speaker-name');
  if (speakerName) speakerName.innerText = talk ? talk.speaker || '' : '';
  const photoName = talk ? talk.photo ||
    (talk.speaker || '').toLowerCase().replace(/\s+/g, '-').replace(/ñ/g, 'n').replace(/ú/g, 'u')
      .replace(/á/g, 'a').replace(/é/g, 'e') : '';
  const photo = photoName.length > 0
    ? `${isEnglish ? './..' : '.'}/assets/img/speakers/${photoName}.png`
    : '';
  const speakerPhoto = document.getElementById('speaker-photo');
  if (speakerPhoto) {
    speakerPhoto.src = photoUrl && photoUrl.length > 0 ? photoUrl || '' : photo || '';
    speakerPhoto.alt = talk ? talk.speaker || '' : '';
  }
  const speakerInfo = document.getElementById('speaker-info');
  if (speakerInfo) speakerInfo.innerText = talk ? talk.info || '' : '';
  const talkTitle = document.getElementById('talk-title');
  if (talkTitle) talkTitle.innerText = talk ? talk.title || '' : '';
  const talkDescription = document.getElementById('talk-description');
  if (talkDescription) talkDescription.innerText = talk ? talk.description || '' : '';
  const socialLinks = talk ? talk.social || {} : {};
  const speakerLinks = document.getElementById('speaker-links');
  if (speakerLinks) {
    speakerLinks.innerHTML = '';
    for (const key of Object.keys(socialLinks)) {
      const link = document.createElement('a');
      link.classList.add('mdi');
      link.classList.add(`mdi-${key.toLowerCase()}`);
      link.target = '_blank';
      link.href = socialLinks[key];
      speakerLinks.appendChild(link);
    }
  }
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

function openSpeakerModal(event, who) {
  const targetNode = event.target;
  let targetNodeName = (targetNode ? targetNode.nodeName || '' : '').toLowerCase();

  let photoUrl = '';
  if (targetNodeName.length > 0) {
    try {
      let rightNode = null;
      if (targetNodeName === 'img') {
        rightNode = targetNode;
      } else if (targetNodeName === 'p') {
        rightNode = targetNode.parentNode.children[0];
      } else {
        rightNode = targetNode.children[0].children[0];
      }
      targetNodeName = (rightNode ? rightNode.nodeName || '' : '').toLowerCase();
      if (targetNodeName === 'img') photoUrl = rightNode.src || '';
    } catch (e) {
    }
  }

  if (typeof talks === 'undefined' || talks === null || Object.keys(talks).length <= 0) return;
  if (typeof who === 'undefined' || who === null || who.length <= 0) return;
  try {
    const items = isEnglish ? talks.en : talks.es;
    const rightTalk = items[who] || talks.es[who];
    if (typeof rightTalk !== 'undefined' && rightTalk !== null) {
      try {
        document.documentElement.classList.add('is-clipped');
      } catch (e) {
      }
      setTalkData(rightTalk, photoUrl);
      const modal = document.getElementById('speaker-modal');
      if (modal) modal.classList.add('is-active');
    }
  } catch (e) {
  }
}

loadTalks();
