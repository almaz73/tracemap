import Vue from 'vue';
import Router from 'vue-router';

import Resault from '@/pages/Resault.vue';
import Index from '@/pages/Index.vue';
import MapShow from '@/pages/MapShow.vue';
import Map from '@/pages/map/Map.vue';
import Map2 from '@/pages/map/Map2.vue';
import Map3 from '@/pages/map/Map3.vue';
import Map4 from '@/pages/map/Map4.vue';
import Technologies from '@/pages/Technologies';
import Login from '@/pages/Login';
import Tasks from '@/pages/Tasks';
import Editor from '@/pages/edit/Editor';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Resault',
      component: Resault
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/mapShow',
      name: 'MapShow',
      component: MapShow
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
      path: '/map4',
      name: 'Map4',
      component: Map4
    },
    {
      path: '/technologies',
      name: 'Technologies',
      component: Technologies
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: Tasks
    },
    {
      path: '/edit',
      name: 'Editor',
      component: Editor
    }
  ]
});
