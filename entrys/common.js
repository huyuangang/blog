import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import css from '../app/styles/common.less'
import '../app/styles/font.css'
import hl from '../app/public/js/common.js'

Vue.use(VueRouter);
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI);

window.hl = hl;