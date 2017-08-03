
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
			},
			children: [
				{
					path: '',
					component:resolve => {
						require.ensure([], () => {
							resolve(require('@page-components/user/home.vue'));
						}, 'home');
					}
				},
				{
					path: '/note/:id',
					component: resolve => {
						require.ensure([], () => {
							resolve(require('@page-components/user/note.vue'));
						}, 'note');
					}
				},
				{
					path: '/test',
					component: resolve => {
						require.ensure([], () => {
							resolve(require('@page-components/user/test.vue'));
						}, 'test');
					}
				}
			]
		}
		
	]
})

new Vue({
	el:'#app',
	router
})