import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      isMenu: false,
      alarms: [
        {id: 1, name: '111111'}, {id: 2, name: '222222'}, {id: 3, name: '333333'},
        {id: 4, name: '444444'}, {id: 5, name: '555555'}, {id: 6, name: '666666'},
        {id: 7, name: '777777'}, {id: 8, name: '888888'}, {id: 9, name: '999999'}
      ]
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
      }
    }
  });
};

export default createStore;
