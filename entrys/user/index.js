
import Vue from 'vue'
import hl from '../../app/public/js/common.js'

new Vue({
	el: '#container',
	data: {
		name: '',
		description: '',
		socialIcon: [
			{ icon: 'icon-github', urls: '#' },
			{ icon: 'icon-git', urls: '#' },
			{ icon: 'icon-qrcode', urls: '#' },
			{ icon: 'icon-headphones', urls: '#' },
		],
		articles: [],
		info: [
			{ value: '', icon: 'icon-location' },
			{ value: '', icon: 'icon-link' }
		],
		cate: [],
		reco: []
	},
	created: function () {
		var me = this;
		function s(str) {
			var data = JSON.parse(str);
			if (data.success === true) {
				me.name = data.cb.name;
				me.description = data.cb.description;
				me.info[0].value = data.cb.address;
				me.info[1].value = data.cb.email;
			}
		}
		function e(str) {
			console.log(str);
		}
		hl.ajax.get('/user/info', {}, s, e);
		hl.ajax.get('/articles', {}, function (str) {
			var data = JSON.parse(str);
			if (data.success) {
				me.articles = data.data;
			}
		}, e);
		hl.ajax.get('/categorys', {}, function (str) {
			var data = JSON.parse(str);
			me.cate = data.data;
		}, e);
		hl.ajax.get('/recommends', {}, function (str) {
			var data = JSON.parse(str);
			me.reco = data.data;
		}, e);
	},
	methods: {

		getDate: function (date) {
			return hl.date.format(date, 'yyyy-MM-dd HH:mm:ss');
		},
		getCate: function (cateArr) {
			return cateArr.join(',');
		}
	}
})