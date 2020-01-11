<template>
  <router-link
    class="event-link"
    :to="{ name: 'machine-show', params: { id: machine.id } }"
  >
    <div>{{ machine.name }} {{ machine.sensors[0].name }} {{ machine.id }}</div>
    <div v-for="contact in machines" :key="contact.id">{{ contact.name }}</div>
    <div>{{ machine1 }}</div>
  </router-link>
</template>

<script>
import gql from "graphql-tag";
import GraphqlService from "@/services/graphql-service.js";
export default {
  props: {
    machine: Object
  },
  data() {
    return {
      machine1: {}
    };
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
  methods: {
    GetMach() {
      // this.event = GraphqlService.getMachines();
    }
  },
  created() {
    GraphqlService.getMachines().then(response => {
      this.machine1 = response.data.machines[0].name;
    });
  }
};
</script>

<style></style>
