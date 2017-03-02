var Info = require('../../db/model/info.js')
var Article = require('../../db/model/article.js')
var Category = require('../../db/model/category.js')
var Recommend = require('../../db/model/recommend.js')


module.exports = function (app) {

	//后台登录页面
	app.get('/admin/login', function (req, res) {
		res.render('admin/login', { title: '胡元港的博客后台' })
	});
	//后台主页
	app.get('/admin/index', function (req, res) {
		if (req.session.user === undefined)
			res.redirect('/admin/login');
		else
			res.render('admin/index', { title: '后台管理' })
	});
	//后台提交登录表单
	app.post('/admin/login', function (req, res) {
		var json = req.body;
		if (json.username === '123' && json.password === '123') {
			req.session.user = {
				name: '123',
				password: '123'
			}
			res.redirect('/admin/index');
		}
	});
	//更新个人信息接口
	app.post('/admin/user/info/update', function (req, res) {
		Info.remove(function (err, cb) {
			if (err) {
				console.error(err)
			}
		});
		var user = new Info(req.body);
		user.save(function (err) {
			if (err) {
				console.log('存储出错');
			} else {
				res.json({
					success: true,
					data: '信息存储成功'
				});
			}
		})
	});


	//发布文章页面
	app.get('/admin/article/new', function (req, res) {
		if (req.session.user === undefined)
			res.redirect('/admin/login');
		else
			res.render('admin/new-article', { title: '新建文章' });
	});
	//发布文章接口
	app.post('/admin/article/new', function (req, res) {
		var data = req.body;
		var article = new Article({ title: data.title, description: data.description, category: data.category, content: data.content });
		article.save(function (err) {
			if (err)
				console.log('文章存储错误');
			else {
				if (data.newCate !== '') {
					var cate = new Category({ name: data.newCate });
					cate.save(function (err) {
						if (err)
							console.log(err);
						else {
							data.category.forEach(function (item) {
								Category.findOne({ name: item }, function (err, cb) {
									if (err)
										console.log(err);
									else {
										cb.articles.push(article._id);
										cb.save(function (err) {
											if (err)
												console.log(err);
										})
									}
								})
							})
						}
					})
				} else {
					data.category.forEach(function (item) {
						Category.findOne({ name: item }, function (err, cb) {
							if (err)
								console.log(err);
							else {
								cb.articles.push(article._id);
								cb.save(function (err) {
									if (err)
										console.log(err);
								})
							}
						})
					})
				}
				res.json({
					success: true,
					data: '文章存储成功'
				})
			}
		})
	});
	//删除文章
	app.delete('/admin/article/:id', function (req, res) {
		Article.findOne({ _id: req.params.id }, function (err, cb) {
			if (err)
				console.log(err);
			else {
				cb.category.forEach(function (item) {
					Category.findOne({ name: item }, function (err, cb) {
						var index = cb.articles.indexOf(req.params.id);
						if (index !== -1) {
							cb.articles.splice(index, 1);
							cb.save(function (err) {
								if (err)
									console.log(err);
							})
						}
					})
				})
				Article.remove({ _id: req.params.id }, function (err) {
					if (err) {
						res.json({
							code: 0,
							data: err
						})
					} else {
						res.json({
							code: 1,
							data: '文章删除成功'
						})
					}
				})
			}
		})
	})


	//获取分类信息
	app.get('/admin/category', function (req, res) {
		Category.find({}, function (err, cb) {
			if (err) {
				res.json({
					error: true,
					data: err
				})
			} else {
				res.json({
					success: true,
					data: cb
				})
			}
		})
	})
	//添加分类
	app.post('/admin/category/new', function (req, res) {
		var newCate = new Category(req.body);
		newCate.save(function (err) {
			if (err) {
				res.json({
					error: true,
					data: err
				})
			} else {
				res.json({
					success: true,
					data: '章节存储成功'
				})
			}
		})
	})
	//删除分类
	app.delete('/admin/category/:id', function (req, res) {
		Category.findOne({ _id: req.params.id }, function (err, cb) {
			if (err)
				console.log(err);
			else {
				cb.articles.forEach(function(id){
					Article.findOne({_id:id},function(err,ab){
						if(err)
							console.log(err);
						else{
							var index = ab.category.indexOf(req.params.id);
							ab.category.splice(index,1);
							ab.save(function(err){
								if(err)
									console.log(err);
							})
						}
					})
				})
				Category.remove({_id:req.params.id},function(err){
					if(err){
						res.json({
							code: 0,
							data: err
						})
					}else{
						res.json({
							code: 1,
							data:'分类删除成功'
						})
					}
				})
			}
		})
	})


	//获取推荐信息
	app.get('/admin/recommend', function (req, res) {
		Recommend.find({}, function (err, cb) {
			if (err) {
				res.json({
					err: true,
					data: err
				})
			}
			else {
				res.json({
					success: true,
					data: cb
				})
			}

		})
	})
	//保存推荐信息
	app.post('/admin/recommend/new', function (req, res) {
		var newReco = new Recommend(req.body);
		newReco.save(function (err) {
			if (err) {
				res.json({
					err: true,
					data: err
				})
			} else {
				res.json({
					success: true,
					data: '推荐存储成功'
				})
			}
		})
	})
	//删除推荐信息
	app.delete('/admin/recommend/:id', function (req, res) {
		Recommend.remove({ _id: req.params.id }, function (err) {
			if (err) {
				res.json({
					code: 0,
					data: err
				})
			} else {
				res.json({
					code: 1,
					data: '推荐删除成功'
				})
			}
		})
	})
}