<template>
  <div>
    <p>{{ id }}</p>

    <div class="machine-header">
      <h1 class="title">This is a {{ machine2.name }}</h1>
    </div>

    <h4 v-if="!checkSensor">Please Select a Sensor</h4>
    <label>Select a sensor </label>
    <select v-model="sensor" @change="onChange($event)">
      <option
        v-for="sensor in machine2.sensors"
        :key="sensor.id"
        :value="{ id: sensor.id, name: sensor.name }"
        >{{ sensor.name }}</option
      >
    </select>

    <div class="location">
      <BaseIcon name="map" class="icon"><h2>Location</h2></BaseIcon>

      <address>
        Last known gps position {{ machine2.lastKnownPosition }}
      </address>
    </div>

    <form @submit.prevent="fetchSesordata(id, startDate, endDate, sensor.id)">
      <!-- <input type="text" name="startDate" v-model="startDate" />
      <input type="text" name="endDate" v-model="endDate" /> -->
      <div v-if="checkSensor">
        <h3 v-if="!checkDates">Please Select Dates</h3>
        <div class="field">
          <label>First day</label>
          <datepicker
            v-model="startDate"
            placeholder="Select a start date"
            class="date"
          />
        </div>

        <div class="field">
          <label>Last day</label>
          <datepicker
            v-model="endDate"
            placeholder="Select an  end date"
            class="date"
          />
        </div>
      </div>

      <input
        v-if="checkDates"
        type="submit"
        class="button -fill-gradient"
        value="Fetch Sensors Data"
      />
    </form>
    <line-chart v-if="checkIfData" :data="chartSensorsData"></line-chart>
    <BaseIcon v-if="!chechDataAfterSubmit" name="info">
      Sorry there are no data for selected dates for {{ sensor.name }}</BaseIcon
    >
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

<style scoped>
.date {
  text-align: center;
}
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.machine-header > .title {
  margin: 0;
}
.field {
  margin-bottom: 24px;
}
</style>
