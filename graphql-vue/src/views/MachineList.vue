<template>
  <div>
    <h1>Machine List</h1>
    <ApolloQuery :query="require('../graphql/AllMachines.gql').default">
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="data">
          <MachineCard
            v-for="machine in data.machines"
            :key="machine.id"
            :machine="machine"
          />
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import MachineCard from "../components/MachineCard";
export default {
  components: {
    MachineCard
  },
  data() {
    return {};
  }
};
</script>

<style></style>
