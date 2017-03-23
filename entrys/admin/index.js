import Vue from 'vue'
import VueRouter from 'vue-router'
import css from '../../app/styles/admin/index.less'

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/admin/article',
			component: resolve => {
				require.ensure([], () => {
					resolve(require('@page-components/admin/article.vue'));
				}, 'article');
			}
		},
		{
			path: '/admin/demo',
			component: resolve => {
				require.ensure([], () => {
					resolve(require('@page-components/admin/demo.vue'));
				}, 'demo');
			}
		},
		{
			path: '/admin/category',
			component: resolve => {
				require.ensure([], () => {
					resolve(require('@page-components/admin/category.vue'));
				}, 'category');
			}
		},
		{
			path: '/admin/recommend',
			component: resolve => {
				require.ensure([], () => {
					resolve(require('@page-components/admin/recommend.vue'));
				}, 'recommend');
			}
		},
		{
			path: '/admin/article/new',
			component: resolve => {
				require.ensure([], () => {
					resolve(require('@page-components/admin/newArticle.vue'));
				}, 'newArticle');
			}
		}
	]
})


new Vue({
	el: '#container',
	router,
	data: {
		topNav: [
			{ name: '文章管理', urls: '/admin/article' },
			{ name: '分类管理', urls: '/admin/category', },
			{ name: '推荐管理', urls: '/admin/recommend' },
			{ name: '样例管理', urls: '/admin/demo' },
			{ name: '杂记管理', urls: '#' }
		]
	}
})