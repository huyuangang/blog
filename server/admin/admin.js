const Info = require('../../db/model/info.js'),
	  Article = require('../../db/model/article.js'),
	  Category = require('../../db/model/category.js'),
	  Recommend = require('../../db/model/recommend.js'),
	  Log = require('../../db/model/logs.js')



function addLog(content) {
	let newLog = new Log({ content });
	newLog.save((err) => {
		if (err)
			return false;
		return true;
	})
}	  

module.exports = function (app) {

	//后台登录页面
	app.get('/admin/login', function (req, res) {
		res.render('login')
	});
	//后台主页
	app.get('/admin/article', function (req, res) {
		if (req.session.user === undefined)
			res.redirect('login');
		else
			res.render('admin')
	});
	app.get('/admin/article/new', function (req, res) {
		if (req.session.user === undefined)
			res.redirect('/admin/login');
		else
			res.render('admin');
	});
	app.get('/admin/category', function (req, res) {
		if (req.session.user === undefined)
			res.redirect('login');
		else
			res.render('admin')
	});
	app.get('/admin/recommend', function (req, res) {
		if (req.session.user === undefined)
			res.redirect('/admin/login');
		else
			res.render('admin');
	});
	app.get('/admin/demo', function (req, res) {
		if (req.session.user === undefined)
			res.redirect('/admin/login');
		else
			res.render('admin');
	});
	app.get('/admin/logs', function (req, res) {
		if (req.session.user === undefined)
			res.redirect('/admin/login');
		else
			res.render('admin');
	});


	//后台提交登录表单
	app.post('/admin/login', function (req, res) {
		var json = req.body;
		if (json.username === 'hyg.blog.admin' && json.password === '123') {
			req.session.user = {
				name: 'hyg.blog.admin',
				password: '123'
			}
			res.redirect('/admin/article');
		} else {
			res.json({
				code: 0,
				resDesc: '用户名或密码错误！'
			})
		}
	});
	//获取文章
	app.get('/admin/article/all', (req, res) => {
		Article.find({}, function (err, cb) {
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
	app.get('/admin/article/:id', (req, res) => {
		Article.findOne({ _id: req.params.id }, (err, cb) => {
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
	//发布文章接口
	app.post('/admin/article/new', function (req, res) {
		var data = req.body;
		var article = new Article({
			title: data.title,
			description: data.description,
			category: data.category,
			html: data.html,
			text: data.text
		});
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
	//修改文章状态
	app.put('/admin/article/status/:id', function (req, res) {
		Article.findOne({ _id: req.params.id }, function (err, cb) {
			if (err) {
				console.log(err);
			}
			else {
				cb.status = !cb.status;
				cb.save(function (err) {
					if (err) {
						console.log(err);
					}
					else {
						res.json({
							success: true,
							resultDesc: '状态切换成功！'
						})
					}
				})
			}
		})
	})
	//删除文章
	app.delete('/admin/article/:id', function (req, res) {
		Article.findOne({ _id: req.params.id }, function (err, cb) {
			if (err)
				console.log(err);
			else {
				if (cb.category.length !== 0) {
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
				}
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
	app.get('/admin/category/data', function (req, res) {
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
				if (cb.articles.length !== 0) {
					cb.articles.forEach(function (id) {
						Article.findOne({ _id: id }, function (err, ab) {
							if (err)
								console.log(err);
							else {
								var index = ab.category.indexOf(req.params.id);
								ab.category.splice(index, 1);
								ab.save(function (err) {
									if (err)
										console.log(err);
								})
							}
						})
					})
				}
				Category.remove({ _id: req.params.id }, function (err) {
					if (err) {
						res.json({
							code: 0,
							data: err
						})
					} else {
						res.json({
							code: 1,
							data: '分类删除成功'
						})
					}
				})
			}
		})
	})

	//获取推荐信息
	app.get('/admin/recommend/data', function (req, res) {
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
	//添加推荐信息
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
	//获取日志
	app.get('/admin/logs/data', (req, res) => {
		Log
			.find({})
			.sort({'createTime': -1 })
			.exec((err, cb) => {
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
	app.post('/admin/logs/new', (req, res) => {
		let newLog = new Log(req.body);
		newLog.save((err) => {
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
	app.delete('/admin/logs/:id', (req, res) => {
		Log.remove({ _id: req.params.id }, (err) => {
			if (err) {
				res.json({
					code: 0,
					data: err
				})
			} else {
				res.json({
					code: 1,
					data: '日志删除成功'
				})
			}
		})
	})

}