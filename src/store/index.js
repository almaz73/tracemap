import Vuex from 'vuex';
import Vue from 'vue';
import * as axios from 'axios';

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    state: {
      isMenu: false,
      alarms: [],
      showLayer: '2323'
    },
    getters: {
      isMenu(state) {
        return state.isMenu;
      },
      alarms(state) {
        return state.alarms;
      },
      showLayer(state) {
        return state.showLayer;
      }
    },
    mutations: {
      setIsMenu(state, isMenu) {
        state.isMenu = isMenu;
      },
      setAlarms(state, alarms) {
        state.alarms = alarms;
      },
      setShowLayer(state, layerName) {
        state.showLayer = layerName
      }
    },
    actions: {
      setIsMenu(context, payload) {
        context.commit('setIsMenu', payload);
      },
      setAlarms(context, payload) {
        context.commit('setAlarms', payload);
      },
      setShowLayer(context, layerName) {
        context.commit('setShowLayer', layerName)
      },
      async getAlarms(content) {
        const req = await axios.get('https://jsonplaceholder.typicode.com/users');
        content.commit('setAlarms', req.data);
      }
    }
  });
};

export default createStore;
