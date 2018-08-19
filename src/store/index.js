import Vuex from 'vuex';
import Vue from 'vue';
import * as axios from 'axios';

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    state: {
      isMenu: false,
      alarms: [],
      editTools: []
    },
    getters: {
      isMenu(state) {
        return state.isMenu;
      },
      alarms(state) {
        return state.alarms;
      },
      editTools(state) {
        return state.editTools;
      }
    },
    mutations: {
      setIsMenu(state, isMenu) {
        state.isMenu = isMenu;
      },
      setAlarms(state, alarms) {
        state.alarms = alarms;
      },
      setEditTool(state, layerName) {
        state.editTools.push(layerName)
      },
      removeEditTool(state, layerName) {
        let exist = state.editTools.indexOf(layerName);
        if (exist > -1) state.editTools.splice(exist, 1)
      }
    },
    actions: {
      setIsMenu(context, payload) {
        context.commit('setIsMenu', payload);
      },
      setAlarms(context, payload) {
        context.commit('setAlarms', payload);
      },
      setEditTool(context, layerName) {
        context.commit('setEditTool', layerName)
      },
      removeEditTool(context, layerName) {
        context.commit('removeEditTool', layerName)
      },
      async getAlarms(content) {
        const req = await axios.get('https://jsonplaceholder.typicode.com/users');
        content.commit('setAlarms', req.data);
      }
    }
  });
};

export default createStore;
