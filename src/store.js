import { createStore } from "vuex";

export default createStore({
  state: {
    emulations: [],
    indicatedMaxEpoch: 50,
    runMaxEpoch: 50,
    epoch: 0,
    skillActivateAdjustment: 0,
    randomPosition: 0,
    emulating: false,
    production: process.env.NODE_ENV === "production",
    track: {
      location: "",
      course: "",
      surfaceCondition: "1",
    },
    chartStore: {
      labels: [],
      datasets: [],
    },
  },
  mutations: {
    setEmulations(state, emulations) {
      state.emulations = emulations;
    },
    setIndicatedMaxEpoch(state, indicatedMaxEpoch) {
      state.indicatedMaxEpoch = indicatedMaxEpoch;
    },
    setSkillActivateAdjustment(state, skillActivateAdjustment) {
      state.skillActivateAdjustment = skillActivateAdjustment;
    },
    setRandomPosition(state, randomPosition) {
      state.randomPosition = randomPosition;
    },
    setEmulating(state, emulating) {
      state.emulating = emulating;
    },
    setProduction(state, production) {
      state.production = production;
    },
    setEpoch(state, epoch) {
      state.epoch = epoch;
    },
    setRunMaxEpoch(state, runMaxEpoch) {
      state.runMaxEpoch = runMaxEpoch;
    },
    setTrack(state, track) {
      state.track = track;
    },
    setChartStore(state, chartStore) {
      state.chartStore = chartStore;
    },
  },
  actions: {
    updateEmulations({ commit }, emulations) {
      commit("setEmulations", emulations);
    },
    updateIndicatedMaxEpoch({ commit }, indicatedMaxEpoch) {
      commit("setIndicatedMaxEpoch", indicatedMaxEpoch);
    },
    updateSkillActivateAdjustment({ commit }, skillActivateAdjustment) {
      commit("setSkillActivateAdjustment", skillActivateAdjustment);
    },
    updateRandomPosition({ commit }, randomPosition) {
      commit("setRandomPosition", randomPosition);
    },
    updateEmulating({ commit }, emulating) {
      commit("setEmulating", emulating);
    },
    updateProduction({ commit }, production) {
      commit("setProduction", production);
    },
    updateEpoch({ commit }, epoch) {
      commit("setEpoch", epoch);
    },
    updateRunMaxEpoch({ commit }, runMaxEpoch) {
      commit("setRunMaxEpoch", runMaxEpoch);
    },
    updateTrack({ commit }, track) {
      commit("setTrack", track);
    },
    updateChartStore({ commit }, track) {
      commit("setChartStore", track);
    },
  },
  getters: {
    emulations: (state) => state.emulations,
    indicatedMaxEpoch: (state) => state.indicatedMaxEpoch,
    skillActivateAdjustment: (state) => state.skillActivateAdjustment,
    randomPosition: (state) => state.randomPosition,
    emulating: (state) => state.emulating,
    production: (state) => state.production,
    epoch: (state) => state.epoch,
    runMaxEpoch: (state) => state.runMaxEpoch,
    track: (state) => state.track,
    chartStore: (state) => state.chartStore,
  },
});
