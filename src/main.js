import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store';
import VueBus from "vue-bus";
import locale from 'element-ui/lib/locale/lang/en'



Vue.config.productionTip = false
Vue.use(VueBus);
Vue.use(ElementUI, { locale })
let vue = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

import {config} from "./api/config";
import VertxEventBus from "vue-vertx3-eventbus-client";
Vue.use(VertxEventBus, {
  host: config.real_ws_remote.host,
  port: config.real_ws_remote.port,
  path: config.real_ws_remote.path
});

vue.$eventBus.enableReconnect(true);
export default vue;
