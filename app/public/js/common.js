
module.exports = {
	ajax: {
		get: function (url, data, success, err) {
			if (typeof data === 'string') {
				url += '?' + data;
			}
			else if (typeof data === 'object') {
				var arr = [];
				for (var name in data) {
					arr.push(name + '=' + data[name]);
				}
				if (arr.length > 0)
					url += '?' + arr.join('&');
			}
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (xhr.status == 200 && typeof success === 'function'){
						success(JSON.parse(xhr.responseText));
					}
					else {
						if (typeof err === 'function')
							err(JSON.parse(xhr.responseText));
					}
				}
			}
			xhr.send(data);
		},
		post: function (url, data, success, err) {
			var sendData;
			sendData = JSON.stringify(data);		
			var xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);
			xhr.setRequestHeader('Content-type', 'application/json');
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (typeof success === 'function' && xhr.status == 200){
						success(JSON.parse(xhr.responseText));
					}
						
					else {
						if (typeof err === 'function')
							err(JSON.parse(xhr.responseText));
					}
				}

			}
			xhr.send(sendData);
		},
		del: function (url, success, err) {
			var xhr = new XMLHttpRequest();
			xhr.open("DELETE", url, true);
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (typeof success === 'function' && xhr.status == 200)
						success(JSON.parse(xhr.responseText));
					else {
						if (typeof err === 'function')
							err(JSON.parse(xhr.responseText));
					}
				}
			}
			xhr.send();
		},
		put: function(url,data,success,err){
			var sendData;
			sendData = JSON.stringify(data);
			var xhr = new XMLHttpRequest();
			xhr.open("PUT", url, true);
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (typeof success === 'function' && xhr.status == 200)
						success(JSON.parse(xhr.responseText));
					else {
						if (typeof err === 'function')
							err(JSON.parse(xhr.responseText));
					}
				}
			}
			xhr.send(sendData);
		}
	},
	date: {
		format: function (dateStr, format) {
			var date = this.toDate(dateStr);
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
		},
		toDate: function (dateStr) {
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
	}
}