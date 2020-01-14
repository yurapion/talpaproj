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
      state.machine2 = machine;
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
    },
    fetchMachine({ commit }, id) {
      GraphqlService.getMachine(id).then(response => {
        commit("setMachine", response.data.machine);
      });
    }
  },
  modules: {}
});
