import VueRouter from 'vue-router'

export default  new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/admin',
			component: resolve => {
				require.ensure([], () => {
					resolve(require('@page-components/admin/index.vue'));
				}, 'index');
			},
			children: [
				{
					path: 'article',
					component: resolve => {
						require.ensure([], () => {
							resolve(require('@page-components/admin/article.vue'));
						}, 'article');
					}
				},
				{
					path: 'demo',
					component: resolve => {
						require.ensure([], () => {
							resolve(require('@page-components/admin/demo.vue'));
						}, 'demo');
					}
				},
				{
					path: 'category',
					component: resolve => {
						require.ensure([], () => {
							resolve(require('@page-components/admin/category.vue'));
						}, 'category');
					}
				},
				{
					path: 'recommend',
					component: resolve => {
						require.ensure([], () => {
							resolve(require('@page-components/admin/recommend.vue'));
						}, 'recommend');
					}
				},
				{
					path: 'article/new',
					component: resolve => {
						require.ensure([], () => {
							resolve(require('@page-components/admin/newArticle.vue'));
						}, 'newArticle');
					}
				},
				{
					path: 'logs',
					component: resolve => {
						require.ensure([], () => {
							resolve(require('@page-components/admin/logs.vue'));
						}, 'logs');
					}
				}
			]
		}
	]
})