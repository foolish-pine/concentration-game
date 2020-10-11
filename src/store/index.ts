import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    turnCount: 1,
    cardCount: 0
  },
  mutations: {
    clearCounter(state) {
      state.turnCount = 1;
      state.cardCount = 0;
    },
    addTurnCount(state) {
      state.turnCount += 1;
    },
    addCardCount(state) {
      state.cardCount += 2;
    }
  },
  actions: {
    clearCounter({ commit }) {
      commit("clearCounter");
    },
    addTurnCount({ commit }) {
      commit("addTurnCount");
    },
    addCardCount({ commit }) {
      commit("addCardCount");
    }
  },
  getters: {
    getTurnCount(state) {
      return state.turnCount;
    },
    getCardCount(state) {
      return state.cardCount;
    }
  }
});
