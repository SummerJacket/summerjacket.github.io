import Vue from "vue";
import App from "./App.vue";
import projects from "./projects.yaml";
import skills from "./skills.yaml";

import "./style.css";

Vue.config.productionTip = false;

window.app = new Vue({
  render: h =>
    h(App, {
      props: { projects, skills }
    })
}).$mount("#app");
