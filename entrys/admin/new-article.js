import Vue from 'vue';
import hl from '../../app/public/js/common.js'
var marked = require('marked');
marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: false
});
new Vue({
	el:'#container',
	data:{
		topNav:[
			{name:'首页管理',urls:'/admin/index'},
			{name:'文章管理',urls:'/admin/index'},
			{name:'杂记管理',urls:'/admin/index'}
		],
		article:{
			title:'',
			description:'',
			category:[],
			content:'',
			newCate:''
		},
		cates:[],
		contentHtml:''
	},
	computed:{
		markText:function(){
			var me = this;
			me.article.content = marked(me.contentHtml);
			return marked(me.contentHtml);
		}
	},
	created:function(){
		var me = this;
		function cateSuccess(str){
			var data = JSON.parse(str);
			me.cates = data.data;
		}
		hl.ajax.get('/admin/category',{},cateSuccess,function(str){console.log(str)});
	},
	methods:{
		sumbit:function(){
			var me = this;
			function s(str){
				console.log(str);
			}
			if(me.article.newCate !== '')
				me.article.category.push(me.article.newCate);
			console.log(me.article);
			hl.ajax.post('/admin/article/new',me.article,s,s)
		}
	}
})