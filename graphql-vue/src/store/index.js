import Vue from "vue";
import Vuex from "vuex";
import GraphqlService from "@/services/graphql-service.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    machine2: null,
    machineList: [],
    sensorDataList: []
  },
  mutations: {
    setMachine(state, machine) {
      state.machine2 = machine;
    },
    setMachinesList(state, machineList) {
      state.machineList = machineList;
    },
    setSensorDataList(state, sensorDataList) {
      state.sensorDataList = sensorDataList;
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
    },
    fetchSensorDataList({ commit }, { id, startDate, endDate }) {
      GraphqlService.getSensorData(id, startDate, endDate).then(
        response => {
          commit("setSensorDataList", response.data.sensorData);
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  getters: {
    chartSensorsData: state => {
      let data = {};
      const sensorList = state.sensorDataList;
      for (let index = 0; index < sensorList.length; index++) {
        let timestamp = sensorList[index].timestamp;
        let value = sensorList[index].value;
        data[timestamp] = value;
      }
      return data;
    },
    checkIfData: state => {
      return state.sensorDataList.length > 0;
    }
  },
  modules: {}
});
