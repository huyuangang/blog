import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// import ElementUI from 'element-ui'
import css from '../app/styles/common.less'
import '../app/styles/font.css'
// import hl from '../app/public/js/common.js'
// import VueFormatDate from '../app/commons/vue-formatdate.js'



Vue.config.devtools = true;
Vue.use(VueRouter);
Vue.use(Vuex);
// import 'element-ui/lib/theme-default/index.css'
// Vue.use(ElementUI);
// Vue.use(VueFormatDate);
// window.hl = hl;
