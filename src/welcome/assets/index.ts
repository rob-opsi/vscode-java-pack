import * as $ from "jquery";
import './index.scss';

window.addEventListener('message', event => {
  if (event.data.name === 'hideInstalledExtensions') {
    hideInstalledExtensions(event.data.installedExtensions);
  }
});

function hideInstalledExtensions(extensions: any) {
  $('div[ext]').each((index, elem) => {
    let anchor = $(elem);
    if (extensions.indexOf(anchor.attr('ext')) !== -1) {
      anchor.addClass('d-none');
    }
  });
}
