import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import '@styles/common.less'
import '@styles/font.css'


Vue.config.devtools = true;
Vue.use(VueRouter);
Vue.use(Vuex);

