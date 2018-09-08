import * as $ from "jquery";
import './index.scss';

window.addEventListener('message', event => {
  if (event.data.name === 'hideInstalledExtensions') {
    hideInstalledExtensions(event.data.installedExtensions);
    hideEmptySections();
  }
});

function hideInstalledExtensions(extensions: any) {
  $('div[ext]').each((index, elem) => {
    let anchor = $(elem);
    if (extensions.indexOf(anchor.attr('ext')) !== -1) {
      anchor.hide();
    }
  });
}

function hideEmptySections() {
  $('div h3').parent().each((i, div) => {
    if (!$(div).children('h3 ~ div').is(':visible')) {
      $(div).hide();
    }
  });
}
