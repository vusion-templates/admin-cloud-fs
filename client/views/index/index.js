import Vue from 'vue';

import * as CloudUI from 'cloud-ui.vusion/dist';
import 'cloud-ui.vusion/dist/theme-dark.css';

import * as Components from '@/components';
import * as Layouts from '@/layouts';

import { install } from 'vusion-utils';

install(Vue, CloudUI);
install(Vue, Components);
install(Vue, Layouts);

import Index from './index.vue';
new Vue(Index).$mount('#app');
