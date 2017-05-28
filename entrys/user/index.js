
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
					path: 'notes',
					component:resolve => {
						require.ensure([], () => {
							resolve(require('@page-components/user/notes.vue'));
						}, 'notes');
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
					path: '/recommends',
					component: resolve => {
						require.ensure([], () => {
							resolve(require('@page-components/user/recommend.vue'));
						}, 'recommends');
					}
				},
				{
					path: '/other',
					component: resolve => {
						require.ensure([], () => {
							resolve(require('@page-components/user/other.vue'));
						}, 'other');
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