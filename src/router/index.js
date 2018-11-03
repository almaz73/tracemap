import Vue from 'vue';
import Router from 'vue-router';


import Resault from '@/pages/Resault.vue';
import Password from '@/pages/Password';
/** удалить потом */
import Login from '../draft/pages/Login';
import Index from '../draft/pages/Index.vue';
import Technologies from '../draft/pages/Technologies';
import Map from '../draft/pages/map/Map.vue';
import Map2 from '../draft/pages/map/Map2.vue';
import Map3 from '../draft/pages/map/Map3.vue';
import Map4 from '../draft/pages/map/Map4.vue';
import MapShow from '../draft/pages/MapShow.vue';
import Editor from '../draft/pages/edit/Editor';
import Tasks from '../draft/pages/Tasks';
import VueTable from '../draft/pages/VueTable';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Resault',
      component: Resault
    },
    {
      path: '/password',
      name: 'Password',
      component: Password
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
    },
    {
      path: '/vuetable',
      name: 'VueTable',
      component: VueTable
    }
  ]
});
