import Vue from 'vue';

import * as Components from '@/components';
import { install } from 'vusion-utils';
install(Vue, Components);

import Index from './index.vue';
new Vue(Index).$mount('#app');
