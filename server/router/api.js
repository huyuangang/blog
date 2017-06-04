
const Info = require('../../db/model/info.js'),
	  Article = require('../../db/model/article.js'),
	  Category = require('../../db/model/category.js'),
	  Recommend = require('../../db/model/recommend.js'),
	  Log = require('../../db/model/logs.js')

module.exports = function (app) {
	//获取个人信息
    app.get('/api/info', (req, res) => {
		res.json({
			code: 1,
			data: {
				name: '胡元港',
				description: '书籍是人类进步的阶梯',
				address: '四川，绵阳，涪城区',
				email: '1730790894@qq.com'
			}
		})
	});
	//后台提交登录表单
	app.post('/admin/login', (req, res) => {
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
	app.get('/api/notes', (req, res) => {
		if (req.session.user === undefined) {
			Article
				.find({ status: true })
				.sort({'createTime': -1})
				.exec((err, cb) => {
					if (err) {
						res.json({
							error: true,
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
		}
		else {
			Article
				.find({})
				.sort({ 'createTime': -1 })
				.exec((err, cb) => {
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
		}
		
	});
	//获取指定文章
	app.get('/api/note/:id', (req, res) => {
		Article.findOne({ _id: req.params.id }, (err, cb) => {
			if(err){
				res.json({
					success:false,
					data:err
				})
			}
			else{
				cb.pv++;
				cb.save((err)=>{
					if(err){
						console.log(err);
					}
					else{
						res.json({
							success:true,
							data:cb
						});
					}
				})
				
			}
		})
	})
	//发布文章接口
	app.post('/admin/note/new', (req, res) => {
		var data = req.body;
		var article = new Article({
			title: data.title,
			description: data.description,
			category: data.category,
			html: data.html,
			text: data.text
		});
		article.save((err) => {
			if (err)
				console.log('文章存储错误');
			else {
				if (data.newCate !== '') {
					var cate = new Category({ name: data.newCate });
					cate.save((err) => {
						if (err)
							console.log(err);
						else {
							data.category.forEach((item) => {
								Category.findOne({ name: item }, (err, cb) => {
									if (err)
										console.log(err);
									else {
										cb.articles.push(article._id);
										cb.save((err) => {
											if (err)
												console.log(err);
										})
									}
								})
							})
						}
					})
				} else {
					data.category.forEach((item) => {
						Category.findOne({ name: item }, (err, cb) => {
							if (err)
								console.log(err);
							else {
								cb.articles.push(article._id);
								cb.save((err) => {
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
	app.put('/admin/note/status/:id', (req, res) => {
		Article.findOne({ _id: req.params.id }, (err, cb) => {
			if (err) {
				console.log(err);
			}
			else {
				cb.status = !cb.status;
				cb.save((err) => {
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
	app.delete('/admin/note/:id', (req, res) => {
		Article.findOne({ _id: req.params.id }, (err, cb) => {
			if (err)
				console.log(err);
			else {
				if (cb.category.length !== 0) {
					cb.category.forEach((item) => {
						Category.findOne({ name: item }, (err, cb) => {
							var index = cb.articles.indexOf(req.params.id);
							if (index !== -1) {
								cb.articles.splice(index, 1);
								cb.save((err) => {
									if (err)
										console.log(err);
								})
							}
						})
					})
				}
				Article.remove({ _id: req.params.id }, (err) => {
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
	app.get('/api/categories', (req, res) => {
		Category.find({}, (err, cb) => {
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
	app.post('/api/category/new', (req, res) => {
		var newCate = new Category(req.body);
		newCate.save((err) => {
			if (err) {
				res.json({
					error: true,
					data: err
				})
			} else {
				res.json({
					success: true,
					data: '分类存储成功'
				})
			}
		})
	})
	//删除分类
	app.delete('/api/category/:id', (req, res) => {
		Category.findOne({ _id: req.params.id }, (err, cb) => {
			if (err)
				console.log(err);
			else {
				if (cb.articles.length !== 0) {
					cb.articles.forEach((id) => {
						Article.findOne({ _id: id }, (err, ab) => {
							if (err)
								console.log(err);
							else {
								var index = ab.category.indexOf(req.params.id);
								ab.category.splice(index, 1);
								ab.save((err) => {
									if (err)
										console.log(err);
								})
							}
						})
					})
				}
				Category.remove({ _id: req.params.id }, (err) => {
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
	app.get('/api/recommends', (req, res) => {
		Recommend.find({}, (err, cb) => {
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
	app.post('/api/recommend/new', (req, res) => {
		var newReco = new Recommend(req.body);
		newReco.save((err) => {
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
	app.delete('/api/recommend/:id', (req, res) => {
		Recommend.remove({ _id: req.params.id }, (err) => {
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
	app.get('/api/logs', (req, res) => {
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
	app.post('/api/log/new', (req, res) => {
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
	app.delete('/api/log/:id', (req, res) => {
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