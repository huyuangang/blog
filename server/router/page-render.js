
const pageJson = require('./page.json');


module.exports = function (app) {
    function addPath(obj) {
        app.get(obj.path, (req, res) => {
            if (req.url !== '/admin/login' && req.url.indexOf('/admin') > -1 && req.session.user === undefined) {
                res.redirect('/admin/login');
            }
            else {
                res.render(obj.renderPage);
            }
        })
    }
    function parse(p, parent) {
        if (typeof p === 'string') {
            let path = parent.path === undefined ? p : `${parent.path || ''}/${p}`;
            addPath({
                path,
                renderPage: parent.renderPage
            })
        }
        else if (typeof p === 'object') {
            let path = parent.path === undefined ? p.path : `${parent.path || ''}/${p.path}`;
            let obj = {
                path,
                renderPage: p.renderPage || parent.renderPage
            }
            addPath(obj);
            if (p.children) {
                p.children.forEach((item) => {
                    parse(item, obj);
                })
            }
        }
    }
    parse(pageJson,{});
}

