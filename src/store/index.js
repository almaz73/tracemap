import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      isMenu: false
    },
    getters: {
      isMenu(state) {
        return state.isMenu;
      }
    },
    mutations: {
      getIsMenu(state, isMenu) {
        state.isMenu = isMenu;
      }
    },
    actions: {
      getIsMenu(context, qqq) {
        context.commit('getIsMenu', qqq);
      }
    }
  });
};

export default createStore;
