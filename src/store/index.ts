import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    turnCount: 1,
    cardCount: 0,
    myCardCount: 0,
    comCardCount: 0
  },
  mutations: {
    clearCounter(state) {
      state.turnCount = 1;
      state.cardCount = 0;
      state.myCardCount = 0;
      state.comCardCount = 0;
    },
    addTurnCount(state) {
      state.turnCount += 1;
    },
    addCardCount(state) {
      state.cardCount += 2;
    },
    addMyCardCount(state) {
      state.myCardCount += 2;
    },
    addComCardCount(state) {
      state.comCardCount += 2;
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
    },
    addMyCardCount({ commit }) {
      commit("addMyCardCount");
    },
    addComCardCount({ commit }) {
      commit("addComCardCount");
    }
  },
  getters: {
    getTurnCount(state) {
      return state.turnCount;
    },
    getCardCount(state) {
      return state.cardCount;
    },
    getMyCardCount(state) {
      return state.myCardCount;
    },
    getComCardCount(state) {
      return state.comCardCount;
    }
  }
});
