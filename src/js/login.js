var phpurl = 'http://localhost/tianmao/php/';
$ajax({
	async:'true',
	type:'post',
	dataType:'json',
	url:phpurl+'loginback.php',
	data:{login:'login',username:'',daogou:''}
}).then(function(obj){
		var login  = document.querySelector('#loginBack');
		var autA   = document.createElement('a');
		var autImg = document.createElement('img');
		autA.style.cssText   = 'display:inline-block;';
		autImg.style.cssText = 'width:1190px;height:600px;';
		autA.href  = obj[0].tarurl;
		autImg.src = obj[0].imgurl;
		loginBack.appendChild(autA);
		autA.appendChild(autImg);
});

var username = document.querySelector('#name');
var password = document.querySelector('#word');
var button   = document.querySelector('#submit');
var span     = document.querySelector('#loginBorder>span');
var urlstr   = localStorage.getItem('url');

var flag1=flag2=flag3=false;
button.onclick = function(){
	
	let ajax = new XMLHttpRequest();
	if(username.value&&password.value){
		ajax.open('post',phpurl+'login.php',true);
		ajax.setRequestHeader('content-type','application/x-www-form-urlencoded');
		ajax.send('username='+username.value+'&password='+password.value);
		ajax.onreadystatechange = function(){
			if(ajax.readyState==4){
				var content = ajax.responseText;
				if(content=='true') {localStorage.setItem('logininfo',username.value);window.location.href=urlstr;}
				else {username.value='用户名或密码错误';return false;}
			}
		}
		
	}else {span.innerHTML='用户名或密码不能为空！';return false;}
}
