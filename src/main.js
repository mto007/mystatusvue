import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngry,
  faFrown,
  faMeh,
  faSmile,
  faGrin,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";

library.add(faAngry, faFrown, faMeh, faSmile, faGrin);
Vue.prototype.axios = axios;

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
