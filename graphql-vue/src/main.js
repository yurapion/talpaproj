import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ApolloClient from "apollo-boost";
import VueAppolo from "vue-apollo";

import Chartkick from "vue-chartkick";
import Chart from "chart.js";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import BaseIcon from "@/components/BaseIcon";

Vue.component("BaseIcon", BaseIcon);

const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});

const apolloProvider = new VueAppolo({
  defaultClient: new ApolloClient({
    uri: "http://localhost:4000"
  })
});

Vue.use(Chartkick.use(Chart));
Vue.config.productionTip = false;
Vue.use(VueAppolo);
new Vue({
  el: "#app",
  router,
  store,
  apolloProvider,
  render: h => h(App)
});
