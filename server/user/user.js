var Info = require('../../db/model/info.js');
var Article = require('../../db/model/article.js')
var Category = require('../../db/model/category.js')
var Recommend = require('../../db/model/recommend.js')

module.exports = function (app) {

	//页面
	app.get('/index', (req, res) => {
		res.render('user');
	});
	app.get('', (req, res) => {
		res.render('user');
	});
	app.get('/test', (req, res) => {
		res.render('user');
	})
	app.get('/notes', (req, res) => {
		res.render('user');
	})
	app.get('/note/:id', (req, res) => {
			res.render('user');
	});
	app.get('/recommends', (req, res) => {
		res.render('user');
	})
	app.get('/other', (req, res) => {
		res.render('user');
	})

	//数据响应
	app.get('/api/user/info', function (req, res) {
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
	app.get('/api/notes', function (req, res) {
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
		
	});
	app.get('/api/note/:id/data', function (req, res) {
		Article.findOne({ _id: req.params.id }, function (err, cb) {
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

	app.get('/api/categories', function (req, res) {
		Category.find({}, function (err, cb) {
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
	})

	app.get('/api/recommends', function (req, res) {
		Recommend.find({}, function (err, cb) {
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
	})
}