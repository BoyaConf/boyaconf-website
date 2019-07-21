function getCodeOfConduct(english = true) {
  let xhr = new XMLHttpRequest();
  const baseUrl = 'https://raw.githubusercontent.com/boyaconf/code-of-conduct/bc/';
  const fileName = english ? 'readme.md' : 'readme-es.md';
  xhr.open('GET', `${baseUrl}${fileName}`, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const body = xhr.responseText || '';
      let converter = new showdown.Converter();
      if (converter !== null && converter !== undefined) {
        let html = converter.makeHtml(body);
        if (html !== null && html !== undefined) {
          let content = document.getElementById('coc');
          if (typeof content !== 'undefined' && content !== null) {
            content.innerHTML = html;
          }
        }
      }
    }
  };
  xhr.send(null);
}

window.onload = function () {
  const isSpanish = (window.location.pathname || '').toString().includes('codigo');
  let content = document.getElementById('coc');
  if (typeof content !== 'undefined' && content !== null) {
    content.innerHTML = '';
  }
  getCodeOfConduct(!isSpanish);
};
