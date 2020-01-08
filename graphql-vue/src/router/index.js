import Vue from "vue";
import VueRouter from "vue-router";
import MachineList from "../views/MachineList.vue";
import MachineShow from "../views/MachineShow.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "machine-list",
    component: MachineList
  },
  {
    path: "/machine/:id",
    name: "machine-show",
    component: MachineShow,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
