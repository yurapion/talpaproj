<template>
  <router-link
    class="event-link"
    :to="{ name: 'machine-show', params: { id: machine.id } }"
  >
    <div>{{ machine.name }} {{ machine.sensors[0].name }} {{ machine.id }}</div>
  </router-link>
</template>

<script>
export default {
  props: {
    machine: Object
  }
};
</script>

<style></style>
