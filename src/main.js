// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Grid from 'vue-js-grid';
import VueSocketio from 'vue-socket.io';

import App from './App';
import router from './router';

Vue.use(VueSocketio, 'http://localhost:3002');

Vue.use(Grid);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
