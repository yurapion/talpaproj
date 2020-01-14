<template>
  <div>
    <h1>Hi There</h1>
    <p>{{ id }}</p>
    <p>This is a {{ machine2.name }}</p>
    <p v-if="!checkSensor">Please Select a Sensor</p>
    <label>Select a sensor </label>
    <select v-model="sensor" @change="onChange($event)">
      <option
        v-for="sensor in machine2.sensors"
        :key="sensor.id"
        :value="{ id: sensor.id, name: sensor.name }"
        >{{ sensor.name }}</option
      >
    </select>

    <p>Last known gps position {{ machine2.lastKnownPosition }}</p>
    <form @submit.prevent="fetchSesordata(id, startDate, endDate, sensor.id)">
      <!-- <input type="text" name="startDate" v-model="startDate" />
      <input type="text" name="endDate" v-model="endDate" /> -->
      <p v-if="!checkDates">Please Select Dates</p>
      <datepicker
        v-model="startDate"
        placeholder="Select a start date"
        class="date"
      />
      <datepicker
        v-model="endDate"
        placeholder="Select an  end date"
        class="date"
      />
      <button v-if="checkDates">Fetch Sensors Data</button>
    </form>
    <line-chart v-if="checkIfData" :data="chartSensorsData"></line-chart>
    <p v-if="!chechDataAfterSubmit">
      Sorry there are no data for selected dates for {{ sensor.name }}
    </p>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    Datepicker
  },
  props: ["id"],
  data() {
    return {
      startDate: "",
      endDate: "",
      sensor: {},
      change: true
    };
  },
  computed: {
    checkDates() {
      return this.startDate && this.endDate;
    },
    checkSensor() {
      return Object.entries(this.sensor).length > 0;
    },
    chechDataAfterSubmit() {
      return this.change || this.checkIfData;
    },
    ...mapGetters(["chartSensorsData", "checkIfData"]),
    ...mapState(["machine2", "sensorDataList"])
  },
  methods: {
    fetchSesordata(id, startDate, endDate, sensorId) {
      this.$store.dispatch("fetchSensorDataList", {
        id,
        sensorId,
        startDate,
        endDate
      });
      this.change = false;
    },
    onChange() {
      this.change = true;
    }
  },
  beforeCreate() {},
  mounted() {
    this.$store.dispatch("fetchMachine", this.id);
  }
};
</script>

<style>
.date {
  text-align: center;
}
</style>
