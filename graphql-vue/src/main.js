import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ApolloClient from "apollo-boost";
import VueAppolo from "vue-apollo";

const apolloProvider = new VueAppolo({
  defaultClient: new ApolloClient({
    uri: "http://localhost:4000"
  })
});
Vue.config.productionTip = false;
Vue.use(VueAppolo);
new Vue({
  el: "#app",
  router,
  store,
  apolloProvider,
  render: h => h(App)
});
