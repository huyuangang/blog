var Info = require('../../db/model/info.js')
var Article = require('../../db/model/article.js')
var Category = require('../../db/model/category.js')


module.exports = function(app){
	app.get('/admin/login',function(req,res){
		res.render('admin/login',{title:'胡元港的博客后台'})
	});
	app.get('/admin/index',function(req,res){
		if(req.session.user === undefined)
			res.redirect('/admin/login');
		else
			res.render('admin/index',{title:'后台管理'})
	}); 
	app.post('/admin/login',function(req,res){
		var json = req.body;
		if(json.username ==='123' && json.password === '123'){
			req.session.user = {
				name:'123',
				password:'123'
			}
			res.redirect('/admin/index');
		}
	});
	app.get('/admin/article/new', function(req,res){
		if(req.session.user === undefined)
			res.redirect('/admin/login');
		else
			res.render('admin/new-article',{title:'新建文章'});
	});
	app.post('/admin/article/new', function(req, res){
		var data = req.body;
		var article = new Article({title:data.title,description:data.description,category:data.category,content:data.content});
		article.save(function(err){
			if(err)
				console.log('文章存储错误');
			else{
				if(data.newCate !== ''){
					var cate = new Category({name:data.newCate});
					cate.save(function(err){
						if(err)
							console.log(err);
						else{
							data.category.forEach(function(item){
								Category.findOne({name:item},function(err,cb){
									if(err)
										console.log(err);
									else{
										cb.articles.push(article._id);
										cb.save(function(err){
											if(err)
												console.log(err);
										})
									}
								})
							})
						}
					})
				}else{
					data.category.forEach(function(item){
						Category.findOne({name:item},function(err,cb){
							if(err)
								console.log(err);
							else{
								cb.articles.push(article._id);
								cb.save(function(err){
									if(err)
										console.log(err);
								})
							}
						})
					})
				}
				res.json({
					success:true,
					data:'文章存储成功'
				})
			}
		})
	});

	app.post('/admin/user/info/update',function(req,res){
		Info.remove(function(err,cb){
			if(err){
				console.error(err)
			}
		});
		var user = new Info(req.body);
		user.save(function(err){
			if(err){
				console.log('存储出错');
			}else{
				res.json({
					success:true,
					data:'信息存储成功'
				});
			}
		})
	});

	//获取章节信息
	app.get('/admin/category',function(req,res){
		Category.find({},function(err,cb){
			if(err){
				res.json({
					error:true,
					data:err
				})
			}else{
				res.json({
					success:true,
					data:cb
				})
			}
		})
	})
	//添加章节
	app.post('/admin/category/new',function(req,res){
		var newCate = new Category(req.body);
		newCate.save(function(err){
			if(err){
				res.json({
					error:true,
					data: err
				})
			}else{
				res.json({
					success:true,
					data: '章节存储成功'
				})
			}
		})
	})
}