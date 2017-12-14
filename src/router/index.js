import Vue from 'vue';
import Router from 'vue-router';
import DraftStart from '@/components/DraftStart';
import DraftBoard from '@/components/DraftBoard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DraftStart',
      component: DraftStart,
    },
    {
      path: '/DraftBoard',
      name: 'DraftBoard',
      component: DraftBoard,
    },
  ],
});
