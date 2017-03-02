import Vue from 'vue'
import hl from '../../app/public/js/common.js'
import modal from '../../app/components/modal.vue'

new Vue({
	el: '#container',
	components: { modal },
	data: {
		topNav: [
			{ name: '首页管理', urls: '#info', child: [{ name: '首页管理1', urls: '#' }, { name: '首页管理2', urls: '#' }] },
			{ name: '文章管理', urls: '#article', child: [{ name: '文章管理1', urls: '#' }, { name: '文章管理2', urls: '#' }, { name: '文章管理3', urls: '#' }, { name: '文章管理4', urls: '#' }] },
			{ name: '杂记管理', urls: '#demo', child: [{ name: '杂记管理1', urls: '#' }, { name: '杂记管理2', urls: '#' }, { name: '杂记管理3', urls: '#' }] }
		],
		article: [],
		demo: [],
		categorys: [],
		recommend: [],
		infos: [
			{ info: 'name', name: '姓名', value: '', placeholder: '请输入名字' },
			{ info: 'description', name: '描述', value: '', placeholder: '请输入描述' },
			{ info: 'address', name: '现住址', value: '', placeholder: '请输入现住址' },
			{ info: 'email', name: '邮箱', value: '', placeholder: '请输入邮箱' },
		],
		config: {
			title: '添加推荐',
			headerColor: '#49ac43',
			top: 200
		},
		showModal: false,
		isReco: false,
		isCate: false,
		addCateName: '',
		addRecoInfo: {
			name: '',
			url: ''
		}
	},
	created: function () {
		var me = this;
		function cateSuccess(str) {
			var data = JSON.parse(str);
			me.categorys = data.data;
		}
		hl.ajax.get('/admin/category', {}, cateSuccess, function (str) { console.log(str) });
		hl.ajax.get('/articles', {}, function (str) {
			var data = JSON.parse(str);
			if (data.success) {
				me.article = data.data;
			}
		}, function (str) { console.log(str) });
		hl.ajax.get('/admin/recommend', {}, function (str) {
			var data = JSON.parse(str);
			if (data.success) {
				me.recommend = data.data;
			}
		}, function (str) { console.log(str) });
	},
	methods: {
		toNewArticle: function () {
			window.location.href = '/admin/article/new';
		},
		saveInfo: function () {
			var me = this;
			var sendInfo = {};
			me.infos.forEach(function (item) {
				sendInfo[item.info] = item.value;
			});
			function s(str) {
				console.log(str);
			};
			hl.ajax.post('/admin/user/info/update', sendInfo, s, s);
		},
		sendData: function () {
			var me = this;
			me.showModal = false;
			if (me.isReco) {
				hl.ajax.post('/admin/recommend/new', me.addRecoInfo, function (str) { console.log(str) }, function (str) { console.log(str) });
				me.addRecoInfo = {
					name: '',
					url: ''
				};
				me.isReco = false;
			}
			else if (me.isCate) {
				hl.ajax.post('/admin/category/new', { name: me.addCateName }, function (str) { console.log(str) }, function (str) { console.log(str) });
				me.addCateName = '';
				me.isCate = false;
			}
		},
		closeModal: function () {
			this.showModal = false;
			this.isCate = false;
			this.isReco = false;
			this.addRecoInfo = {
				name: '',
				url: ''
			};
			this.addCateName = '';
		},
		initReco: function () {
			this.config.title = '添加推荐';
			this.showModal = true;
			this.isReco = true;
		},
		initCate: function () {
			this.config.title = '添加分类';
			this.showModal = true;
			this.isCate = true;
		},
		getDate: function (date) {
			return hl.date.format(date, 'yyyy-MM-dd HH:mm:ss');
		},
		deleteArticle: function (id) {
			hl.ajax.del('/admin/article/' + id, function (str) { console.log(str) }, function (str) { console.log(str) });
		},
		deleteCategory: function (id) {
			hl.ajax.del('/admin/category/' + id, function (str) { console.log(str) }, function (str) { console.log(str) });
		}
	}
})