import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/pages/Index.vue';
import Map from '@/pages/Map.vue';
import Map2 from '@/pages/Map2.vue';
import Map3 from '@/pages/Map3.vue';
import Technologies from '@/pages/Technologies';
import Admin from '@/pages/Admin';
import Tasks from '@/pages/Tasks';

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
      path: '/map2',
      name: 'Map2',
      component: Map2
    },
    {
      path: '/map3',
      name: 'Map3',
      component: Map3
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
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: Tasks
    }
  ]
});
