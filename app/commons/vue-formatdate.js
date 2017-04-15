

var VueFormatDate = {
    install: function (Vue, options) {
        Vue.directive('format-date', {
            bind(el, binding, vnode, oldVnode) {
                el.innerHTML = format(binding.value.date,binding.value.pattern);
            }
        })
    }
}
function format(dateStr, format) {
    var date = toDate(dateStr);
    if (!(date instanceof Date))
        return '格式化串错误';
    var RegObj = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours() % 12 == 0 ? 12 : date.getHours(),
        "H+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var reg in RegObj) {
        if (RegObj.hasOwnProperty(reg)) {
            if (new RegExp('(' + reg + ')').test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1 ? RegObj[reg] : ('00' + RegObj[reg]).substr(('' + RegObj[reg]).length)));
            }
        }
    }
    return format;
}
function toDate(dateStr) {
    if (typeof dateStr === 'string') {
        return new Date(Date.parse(dateStr));
    }
    else if (typeof dateStr === 'number') {
        return new Date(dateStr);
    }
    else {
        return dateStr;
    }
}


export default VueFormatDate;