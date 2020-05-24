import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import 'element-ui/lib/theme-chalk/index.css';
import '../packages/cssstyle/index.scss';
import LbElement from "../packages";
// import {Pagination} from "../packages";
import Ele from 'element-ui'
// import WyButton from "wuhanbujiayou";
// import router from './router'
// import store from './store'
// import './style.scss'
// import lbui from '../lib/Lb-vueUi.umd.min.js';

// Vue.use(lbui)
Vue.config.productionTip = false
Vue.use(LbElement)
// Vue.use(Pagination)
Vue.use(Ele)
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
