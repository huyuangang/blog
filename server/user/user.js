var Info = require('../../db/model/info.js');
var Article = require('../../db/model/article.js')
var Category = require('../../db/model/category.js')
var Recommend = require('../../db/model/recommend.js')

module.exports = function(app){
	app.get('/index',function(req,res){
		res.render('user');
	});
	app.get('',function(req, res){
		res.render('user',{
			name:'胡元港',
			description:'什么都不懂的前端菜鸟',
			address:'四川，绵阳，涪城区',
			email:'1730790894@qq.com'
		});
	});
	app.get('/user/info',function(req,res){
		res.json({
			success:true,
			data:{
				name:'胡元港',
				description:'什么都不懂的前端菜鸟',
				address:'四川，绵阳，涪城区',
				email:'1730790894@qq.com'
			}
		})
	});
	app.get('/articles',function(req,res){
		Article.find({},function(err,cb){
			if(err){
				res.json({
					error:true,
					data:err
				})
			}
			else{
				res.json({
					success: true,
					data: cb
				})
			}
		})
	});
	app.get('/categorys',function(req,res){
		Category.find({},function(err, cb){
			if(err){
				res.json({
					error:true,
					data:err
				})
			}
			else{
				res.json({
					success: true,
					data: cb
				})
			}
		})
	})

	app.get('/recommends',function(req,res){
		Recommend.find({},function(err, cb){
			if(err){
				res.json({
					error:true,
					data:err
				})
			}
			else{
				res.json({
					success: true,
					data: cb
				})
			}
		})
	})
}