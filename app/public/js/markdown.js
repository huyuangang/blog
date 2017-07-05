let marked = require('marked');
let hls = require('highlight.js');
hls.configure({
    tabReplace: '    '
})
var renderer = new marked.Renderer();
renderer.link = function(href, title, text){
    return `<a href='${href}' title='${title}' target='_blank'>${text}</a>`;
}

marked.setOptions({
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return hls.highlightAuto(code).value;
    }
})

export default marked;