import { defineNuxtConfig } from 'nuxt/config';
import MyModule from '..';

export default defineNuxtConfig({
  modules: [MyModule],
  trengo: {
    addPlugin: true,
    delay: 1000,
    key: 'gCNSmob8cQyot8qa5hvn',
  },
});
