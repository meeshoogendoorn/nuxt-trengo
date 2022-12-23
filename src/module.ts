import { fileURLToPath } from 'url';
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit';
import { name, version } from '../package.json';

export interface ModuleOptions {
  addPlugin: boolean;
  key: string;
  hideWidget: boolean;
  hideGifPicker: boolean;
  hideEmojiPicker: boolean;
  hideFilePicker: boolean;
  hidePanelHeader: boolean;
  hideOnlineStatus: boolean;
  delay: number;
  detectPageChange: boolean;
  extraOffsetX: number | null;
  extraOffsetY: number | null;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'trengo',
    compatibility: {
      bridge: true,
    },
  },
  defaults: {
    addPlugin: true,
    key: '',
    hideWidget: false,
    hideGifPicker: false,
    hideEmojiPicker: false,
    hideFilePicker: false,
    hidePanelHeader: false,
    hideOnlineStatus: false,
    delay: 1,
    detectPageChange: true,
    extraOffsetX: null,
    extraOffsetY: null,
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.trengo = options;

    if (!options.hideWidget || !options.addPlugin) {
      const { resolve } = createResolver(import.meta.url);
      const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url));
      nuxt.options.build.transpile.push(runtimeDir);
      addPlugin(resolve(runtimeDir, 'trengo.client'));
    }
  },
});
