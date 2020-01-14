<template>
  <div>
    <h1>Hi There</h1>
    <p>{{ id }}</p>
    <p>{{ machine2.name }}</p>
    <p>{{ machine2.sensors[1].name }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["id"],
  computed: {
    ...mapState(["machine2", "machineList"])
  },
  beforeCreate() {},
  created() {
    this.$store.dispatch("fetchMachine", this.id);
  }
};
</script>

<style></style>
