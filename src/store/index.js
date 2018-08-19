import Vuex from 'vuex';
import Vue from 'vue';
import * as axios from 'axios';

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    state: {
      isMenu: false,
      alarms: [],
      editTools: [],
      editLayers: []
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
      },
      editLayers(state) {
        return state.editLayers;
      }
    },
    mutations: {
      setIsMenu(state, isMenu) {
        state.isMenu = isMenu;
      },
      setAlarms(state, alarms) {
        state.alarms = alarms;
      },
      setEditTool(state, toolName) {
        let exist = state.editTools.indexOf(toolName);
        if (exist > -1) state.editTools.splice(exist, 1);
        else state.editTools.push(toolName)
      },
      setEditLayer(state, layerName) {
        let exist = state.editLayers.indexOf(layerName);
        if (exist > -1) state.editLayers.splice(exist, 1);
        else state.editLayers.push(layerName)
      }
    },
    actions: {
      async getAlarms(content) {
        const req = await axios.get('https://jsonplaceholder.typicode.com/users');
        content.commit('setAlarms', req.data);
      },
      setIsMenu(context, payload) {
        context.commit('setIsMenu', payload);
      },
      setAlarms(context, payload) {
        context.commit('setAlarms', payload);
      },
      setEditTool(context, toolName) {
        context.commit('setEditTool', toolName)
      },
      setEditLayer(context, layerName) {
        context.commit('setEditLayer', layerName)
      }
    }
  });
};

export default createStore;
