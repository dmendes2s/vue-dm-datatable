import Vue from "vue";
import Dev from "./Dev.vue";
import store from "./store";

new Vue({
  store,
  render: h => h(Dev)
}).$mount("#app");
