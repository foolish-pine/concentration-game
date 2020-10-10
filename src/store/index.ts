import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    turnCount: 1,
    cardCount: 0,
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    getTurnCount(state) {
      return state.turnCount;
    },
    getCardCount(state) {
      return state.cardCount;
    },
  },
});
