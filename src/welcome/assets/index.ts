import './index.scss';

window.addEventListener('message', event => {
  if (event.data.name === 'hideInstalledExtensions') {
    hideInstalledExtensions(event.data.installedExtensions);
  }
});

function hideInstalledExtensions(extensions) {
  const anchors = document.querySelectorAll('div[ext]');
  anchors.forEach(anchor => {
    if (extensions.indexOf(anchor.attributes['ext'].value) !== -1) {
      console.log(anchor.attributes['ext']);
      anchor.setAttribute('class', 'd-none');
    }
  });
}
