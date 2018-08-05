import Vuex from 'vuex';
import * as axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      isMenu: false,
      alarms: []
    },
    getters: {
      isMenu(state) {
        return state.isMenu;
      },
      alarms(state) {
        return state.alarms;
      }
    },
    mutations: {
      setIsMenu(state, isMenu) {
        state.isMenu = isMenu;
      },
      setAlarms(state, alarms) {
        state.alarms = alarms;
      }
    },
    actions: {
      setIsMenu(context, payload) {
        context.commit('setIsMenu', payload);
      },
      setAlarms(context, payload) {
        context.commit('setAlarms', payload);
      },
      async getAlarms(content) {
        const req = await axios.get('https://jsonplaceholder.typicode.com/users');
        content.commit('setAlarms', req.data);
      }
    }
  });
};

export default createStore;
