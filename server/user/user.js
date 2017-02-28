var Info = require('../../db/model/info.js');
var Article = require('../../db/model/article.js')
var Category = require('../../db/model/category.js')

module.exports = function(app){
	app.get('/index',function(req,res){
		res.render('user/index');
	});
	app.get('',function(req, res){
		res.redirect('/index');
	});
	app.get('/user/info',function(req,res){
		Info.find({},function(err,cb){
			if(err){
				console.log('信息获取错误');
			}else{
				res.json({
					success:true,
					cb: cb[0]
				});
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
}