import { defineNuxtPlugin } from '#app';
import { ModuleOptions } from '../module';
import './types/';

const onLoad = (callback: Function, delay: number = 1) => {
  if (document.readyState === 'complete') {
    setTimeout(() => callback(), delay);
  } else {
    window.addEventListener('load', function () {
      setTimeout(() => callback(), delay);
    });
  }
};

const setAppearance = (options: ModuleOptions) => {
  if (options.hideGifPicker) {
    window.Trengo.gifPicker = false;
  }

  if (options.hideEmojiPicker) {
    window.Trengo.emojiPicker = false;
  }

  if (options.hideFilePicker) {
    window.Trengo.filePicker = false;
  }

  if (options.hidePanelHeader) {
    window.Trengo.panelHeader = false;
  }

  if (options.hideOnlineStatus) {
    window.Trengo.onlineStatus = false;
  }

  if (options.extraOffsetX !== null) {
    window.Trengo.extraOffsetX = options.extraOffsetX;
  }

  if (options.extraOffsetY !== null) {
    window.Trengo.extraOffsetY = options.extraOffsetY;
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  const { trengo } = useRuntimeConfig();
  const { key, delay, detectPageChange } = trengo;

  window.Trengo = window.Trengo || {};
  window.Trengo.key = key;
  setAppearance(trengo);

  onLoad(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://static.widget.trengo.eu/embed.js';
    document.getElementsByTagName('head')[0].appendChild(script);
  }, delay);

  nuxtApp.hook('page:finish', () => {
    if (detectPageChange) window.Trengo.Api.Widget.url_updated();
  });
});
