<template>
  <router-link
    class="event-link"
    :to="{ name: 'machine-show', params: { id: machine.id } }"
  >
    <div>{{ machine.name }}</div>
    <!-- <div v-for="contact in machines" :key="contact.id">{{ contact.name }}</div>
    <div>{{ machine1 }}</div> -->
  </router-link>
</template>

<script>
import gql from "graphql-tag";
import GraphqlService from "@/services/graphql-service.js";
import { mapState } from "vuex";
export default {
  props: {
    machine: Object
  },
  data() {
    return {
      machine1: {}
    };
  },
  computed: {
    ...mapState(["machine2", "machineList"])
  },
  beforeCreate() {
    this.$store.dispatch("fetchMachineList");
  },
  apollo: {
    machines: gql`
      query {
        machines {
          id
          name
          sensors {
            id
            name
          }
        }
      }
    `
  },

  created() {
    GraphqlService.getMachines().then(response => {
      this.machine1 = response.data.machines[0].name;
    });
  }
};
</script>

<style></style>
