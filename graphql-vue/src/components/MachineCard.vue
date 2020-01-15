<template>
  <router-link
    class="machine-link"
    :to="{ name: 'machine-show', params: { id: machine.id } }"
  >
    <div class="machine-card -shadow">
      <h4 class="title">{{ machine.name }}</h4>
      <BaseIcon name="eye"> Check the machine detail</BaseIcon>
    </div>

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

<style scoped>
.machine-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.machine-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.machine-card > .title {
  margin: 0;
}
.machine-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
