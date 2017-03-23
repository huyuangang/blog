
import Vue from 'vue'
import VueRouter from 'vue-router'

const router = new VueRouter({
	mode:'history',
	routes:[
		{
			path:'',
			component:resolve => {
                require.ensure([], () => {
                    resolve(require('@page-components/user/index.vue'));
                }, 'index');
            }
		},
		{
			path:'/article/details/:id',
			component:resolve => {
                require.ensure([], () => {
                    resolve(require('@page-components/user/article.vue'));
                }, 'article');
            }
		}
	]
})

new Vue({
	el:'#app',
	router
})