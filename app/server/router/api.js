
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
	app.post('/api/login', (req, res) => {
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
		if (req.headers['referer'].indexOf('/admin/article') !== -1 && req.session.user) {
			Article
				.find({})
				.sort({ 'createTime': -1 })
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
				.find({ status: true })
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
	})
	//获取指定文章
	app.get('/api/note/:id', (req, res) => {
		Article
			.findById(req.params.id)
			.then(article => {
				article.pv++;
				return article.save();
			})
			.then(article => {
				res.json({
					success: true,
					data: article
				})
			})
	})
	//发布文章接口
	app.post('/api/note/new', (req, res) => {
		let data = req.body;
		let articleEntity = new Article({
			title: data.title,
			description: data.description,
			category: data.category,
			html: data.html,
			text: data.text
		});
		articleEntity
			.save()
			.then(() => {
				if (data.newCate !== '') {
					let cateEntity = new Category({ name: data.newCate });
					return cateEntity.save();
				}
				return Promise.resolve();
			})
			.then(() => {
				let cates = data.category.map(item => Category.findOne({ name: item }));
				return Promise.all(cates);
			})
			.then((cates) => {
				let catesAddArticle = cates.map(item => {
					item.articles.push(articleEntity._id);
					return item.save();
				})
				return Promise.all(catesAddArticle);
			})
			.then(() => {
				res.json({
					success: true,
					data: '文章存储成功'
				})
			})
			.catch(e => {
				console.log(e);
			})
	});
	//修改文章状态
	app.put('/api/note/status/:id', (req, res) => {
		Article
			.findById(req.params.id)
			.then(article => {
				article.status = !article.status;
				return article.save();
			})
			.then(() => {
				res.json({
					success: true,
					resultDesc: '状态切换成功！'
				})
			})
			.catch(() => {
				res.json({
					success: false,
					resultDesc: '状态切换失败！'
				})
			})
	})
	//删除文章
	app.delete('/api/note/:id', (req, res) => {
		let articleId = req.params.id;
		Article
			.findByIdAndRemove(articleId)
			.then(article => {
				let cates = article.category.map(item => Category.findOne({ name: item }));
				return Promise.all(cates);
			})
			.then(cates => {
				let cateDelArticle = cates.map(item => {
					let index = item.articles.indexOf(articleId);
					if (index > -1) {
						item.articles.splice(index, 1);
					}
					return item.save();
				})
			})
			.then(() => {
				res.json({
					code: 1,
					data: '文章删除成功'
				})
			})
			.catch(e => {
				console.log(e);
				res.json({
					code: 1,
					data: '文章删除失败'
				})
			})
	})

	//获取分类信息
	app.get('/api/categories', (req, res) => {
		Category
			.find({})
			.then((cb) => {
				res.json({
					success: true,
					data: cb
				})
			})
			.catch(e => {
				res.json({
					error: true,
					data: err
				})
			})
	})
	//添加分类
	app.post('/api/category/new', (req, res) => {
		var cateEntity = new Category(req.body);
		cateEntity
			.save()
			.then(val => {
				res.json({
					success: true,
					data: '分类存储成功'
				})
			})
			.catch(err => {
				res.json({
					error: true,
					data: err
				})
			})
	})
	//删除分类
	app.delete('/api/category/:id', (req, res) => {
		let delCateId = req.params.id;
		let delCateName;
		Category
			.findByIdAndRemove(delCateId)
			.then(delCate => {
				delCateName = delCate.name;
				let articlesOfDelCate = delCate.articles.map(item => Article.findById(item));
				return Promise.all(articlesOfDelCate);
			})
			.then(articles => {
				let articleDelCate = articles.map(item => {
					let index = item.category.indexOf(delCateName);
					if (index > -1)
						item.category.splice(index, 1);
					return item.save();
				})
			})
			.then(() => {
				res.json({
					code: 1,
					data: '分类删除成功'
				})
			})
			.catch(e => {
				res.json({
					code: 0,
					data: e
				})
			})
	})

	//获取推荐信息
	app.get('/api/recommends', (req, res) => {
		Recommend
			.find({})
			.then(rs => {
				res.json({
					success: true,
					data: rs
				})
			})
			.catch(e => {
				res.json({
					err: true,
					data: e
				})
			})
	})
	//添加推荐信息
	app.post('/api/recommend/new', (req, res) => {
		let recoEntity = new Recommend(req.body);
		recoEntity
			.save()
			.then(() => {
				res.json({
					success: true,
					data: '推荐存储成功'
				})
			})
			.catch(e => {
				res.json({
					err: true,
					data: e
				})
			})
	})
	//删除推荐信息
	app.delete('/api/recommend/:id', (req, res) => {
		Recommend
			.findByIdAndRemove(req.params.id)
			.then(() => {
				res.json({
					code: 1,
					data: '推荐删除成功'
				})
			})
			.catch(e => {
				res.json({
					code: 0,
					data: e
				})
			})
	})
	//获取日志
	app.get('/api/logs', (req, res) => {
		Log
			.find({})
			.sort({ 'createTime': -1 })
			.then((logs) => {
				res.json({
					success: true,
					data: logs
				})
			})
			.catch(e => {
				res.json({
					err: true,
					data: e
				})
			})
	})
	app.post('/api/log/new', (req, res) => {
		let logEntity = new Log(req.body);
		logEntity
			.save()
			.then(() => {
				res.json({
					success: true,
					data: '推荐存储成功'
				})
			})
			.catch(e => {
				res.json({
					err: true,
					data: e
				})
			})
	})
	app.delete('/api/log/:id', (req, res) => {
		Log
			.findByIdAndRemove(req.params.id)
			.then(() => {
				res.json({
					code: 1,
					data: '日志删除成功'
				})
			})
			.catch(e => {
				res.json({
					code: 0,
					data: e
				})
			})
	})
}