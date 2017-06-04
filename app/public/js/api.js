
import axios from 'axios'

//获取信息
export function getUserInfo () {
    return axios.get('/api/info');
}
//获取笔记
export function getNotes () {
    return axios.get('/api/notes');
}
//获取指定笔记
export function getNoteById (id) {
    return axios.get(`/api/note/${id}`);
}
//发布笔记
export function publishNote (note) {
    return axios.post('/api/note/new', note);
}
//修改笔记状态
export function changeNoteStatusById (id) {
    return axios.put(`/api/note/status/${id}`);
}
//删除笔记
export function deleteNoteById (id) {
    return axios.delete(`/api/note/${id}`);
}
//获取分类
export function getCates () {
    return axios.get('/api/categories');
}
//添加分类
export function addCate (cate) {
    return axios.post('/api/category/new', cate);
}
//删除分类
export function deleteCateById (id) {
    return axios.delete(`/api/category/${id}`);
}
//获取推荐信息
export function getRecommends () {
    return axios.get('/api/recommends');
}
//添加推荐信息
export function addRecommend (reco) {
    return axios.post('/api/recommend/new', reco);
}
//删除推荐信息
export function deleteRecommendById (id) {
    return axios.delete(`/api/recommend/${id}`);
}
//获取日志
export function getLogs () {
    return axios.get('/api/logs');
}
//添加日志
export function addLog (log) {
    return axios.post('/api/log/new', log);
}
//删除日志
export function deleteLogById (id) {
    return axios.delete(`/api/log/${id}`);
}