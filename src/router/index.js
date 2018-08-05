import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/pages/Index.vue';
import Map from '@/pages/Map.vue';
import Technologies from '@/pages/Technologies';
import Admin from '@/pages/Admin';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/technologies',
      name: 'Technologies',
      component: Technologies
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
});