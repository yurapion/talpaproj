import Vue from "vue";
import Vuex from "vuex";
import GraphqlService from "@/services/graphql-service.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    machine2: null,
    machineList: []
  },
  mutations: {
    setMachine(state, machine) {
      state.machine = machine;
    },
    setMachinesList(state, machineList) {
      state.machineList = machineList;
    }
  },
  actions: {
    fetchMachineList({ commit }) {
      GraphqlService.getMachines().then(response => {
        commit("setMachinesList", response.data.machines);
      });
    }
  },
  modules: {}
});
