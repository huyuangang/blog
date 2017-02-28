
module.exports = {
	ajax :{
		get:function(url,data,success,err){
			if(typeof data === 'string'){
				url += '?' + data;
			}
			else if(typeof data === 'object'){
				var arr=[];
				for(var name in data){
					arr.push(name+'=' +data[name]);
				}
				if(arr.length>0)
					url += '?' + arr.join('&');
			}
			var xhr = new XMLHttpRequest();
			xhr.open("GET",url,true);
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200){
					if(xhr.status == 200 && typeof success === 'function')
						success(xhr.responseText);
					else{
						if(typeof err === 'function')
							err('服务器发生未知错误');
					}
				}
			}
			xhr.send(data);
		},
		post:function(url,data,success,err){
			var sendData;
			sendData = JSON.stringify(data);
			// if(typeof data === 'string')
			// 	sendData = data;
			// else if(typeof data === 'object'){
			// 	var arr=[];
			// 	for(var name in data)
			// 		arr.push(name+'='+data[name]);
			// 	if(arr.length>0)
			// 		sendData = arr.join('&');
			// }			
			var xhr = new XMLHttpRequest();
			xhr.open("POST",url,true);
			xhr.setRequestHeader('Content-type','application/json');
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200){
					if(typeof success === 'function')
						success(xhr.responseText);
				}
				else{
					if(typeof err === 'function')
						err(xhr.responseText);
				}
			}
			xhr.send(sendData);
		}
	}
}