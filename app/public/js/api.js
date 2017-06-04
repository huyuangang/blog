
import axios from 'axios'

//获取信息
exports.getUserInfo = function () {
    return axios.get('/api/info');
}
//获取笔记
exports.getNotes = function () {
    return axios.get('/api/notes');
}
//获取指定笔记
exports.getNoteById = function (id) {
    return axios.get(`/api/note/${id}`);
}
//发布笔记
exports.publistNote = function (note) {
    return axios.post('/api/note/new', note);
}
//修改笔记状态
exports.changeNoteStatusById = function (id) {
    return axios.put(`/api/note/status/${id}`);
}
//删除笔记
exports.deleteNoteById = function (id) {
    return axios.delete(`/api/note/${id}`);
}
//获取分类
exports.getCates = function () {
    return axios.get('/api/categories');
}
//添加分类
exports.addCate = function (cate) {
    return axios.post('/api/category/new', cate);
}
//删除分类
exports.deleteCateById = function (id) {
    return axios.delete(`/api/category/${id}`);
}
//获取推荐信息
exports.getRcommends = function () {
    return axios.get('/api/recommends');
}
//添加推荐信息
exports.addRecommend = function (reco) {
    return axios.post('/api/recommend/new', reco);
}
//删除推荐信息
exports.deleteRcommendById = function (id) {
    return axios.delete(`/api/recommend/${id}`);
}
//获取日志
exports.getLogs = function () {
    return axios.get('/api/logs');
}
//添加日志
exports.addLog = function (log) {
    return axios.post('/api/log/new', log);
}
//删除日志
exports.deleteLogById = (id){
    return axios.delete(`/api/log/${id}`);
}