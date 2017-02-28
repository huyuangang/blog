
import Vue from 'vue'
import hl from '../../app/public/js/common.js'

new Vue({
	el:'#container',
	data:{
		name:'',
		description:'',
		socialIcon:[
			{icon:'icon-github',urls:'#'},
			{icon:'icon-git',urls:'#'},
			{icon:'icon-qrcode',urls:'#'},
			{icon:'icon-headphones',urls:'#'},
		],
		articles:[],
		info:[
			{value:'',icon:'icon-location'},
			{value:'',icon:'icon-link'}
		],
		cate:[
			{name:'分类1',urls:'#',icon:'',total:8},
			{name:'分类1',urls:'#',icon:'',total:9},
			{name:'分类1',urls:'#',icon:'',total:10},
		],
		reco:[
			{name:'Vue2.0',urls:'http://cn.vuejs.org/v2/guide/',icon:'icon-link'},
			{name:'Node.js6.9.4中文文档',urls:'http://nodejs.cn/',icon:'icon-link'},
			{name:'Webpack中文文档',urls:'http://webpackdoc.com/',icon:'icon-link'}
		]
	},
	created:function(){
		var me = this;
		function s(str){
			var data = JSON.parse(str);
			if(data.success === true){
				me.name = data.cb.name;
				me.description = data.cb.description;
				me.info[0].value = data.cb.address;
				me.info[1].value = data.cb.email;
			}
		}
		function e(str){
			console.log(str);
		}
		hl.ajax.get('/user/info',{},s,e);
		hl.ajax.get('/articles',{},function(str){
			var data = JSON.parse(str);
			if(data.success){
				me.articles = data.data;
				console.log(me.articles);
			}
		},e);
		hl.ajax.get('/categorys',{},e,e);
	},
	methods:{
		getDate:function(date){
			var d = new Date(date);
			return d.getFullYear()+'-'+ (d.getMonth()+1) + '-'+d.getDate();
		},
		getCate:function(cateArr){
			return cateArr.join(',');
		}
	}
})