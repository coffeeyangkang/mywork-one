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
var number   = document.querySelector('#number');
var certificate = document.querySelector('#certificate');
var password = document.querySelector('#word');
var confirm  = document.querySelector('#confirm');
var button   = document.querySelector('#submit');
var span     = document.querySelectorAll('#loginBorder span');
var flag1=flag2=flag3=flag4=flag5=false;

username.onblur = function(){
	if(this.value){
	let ajax = new XMLHttpRequest();
	ajax.open('post',phpurl+'register.php',true);
	ajax.setRequestHeader('content-type','application/x-www-form-urlencoded');
	ajax.send('username='+username.value+'&number=1');
	ajax.onreadystatechange = function(){
		if(ajax.readyState==4){
			var content = ajax.responseText;
			if(content=='true') {span[1].innerHTML='√';flag1=true;span[0].innerHTML='';}
			else {span[0].innerHTML='用户名已存在';span[1].innerHTML='X';flag1=false;}
		}
	}
}
}
number.onblur = function(){
	if(this.value){
	   var reg1 = /^1[3-9][0-9]{9}/g;
	   var reg2 = /[^0-9]/g;
	   if(number.value.match(reg1))                           {
		   let ajax = new XMLHttpRequest();
			ajax.open('post',phpurl+'register.php',true);
			ajax.setRequestHeader('content-type','application/x-www-form-urlencoded');
			ajax.send('username=2'+'&number='+number.value);
			ajax.onreadystatechange = function(){
			if(ajax.readyState==4){
			var content = ajax.responseText;
			if(content=='true') {
				span[2].innerHTML='√';flag2=true;span[0].innerHTML='';
				}else {span[0].innerHTML='手机号已存在';flag2=false;}
				}
			}
		}else if(number.value.match(reg2))                      {
			span[0].innerHTML='电话号码必须为数字';flag2 = false;
			}else if(number.value.length>=1&&this.value.length<=10) {
				span[0].innerHTML='电话号码长度不够';flag2 = false;
				}else if(number.value.length<=0)                        {
					span[0].innerHTML = '号码不能为空！';
					}else  {span[0].innerHTML='填写的号码不符合1[3-9]';flag2 = false;}


	}
	
	
}
var str='';
certificate.onfocus = function(){
	str='';
	for(var i=0;i<4;i++){
		str=str+Math.round(Math.random()*9);
	}
	span[3].innerHTML=str;
}
certificate.onblur =function(){
	if(certificate.value==str) {
		span[3].innerHTML='√';flag3=true;span[0].innerHTML='';
	}else {span[0].innerHTML='验证码不正确！';flag3=false;}
}

password.onblur = function(){
	
		   var reg1 = /^[\w]{6,}$/g;
		   var num1=0,num2=0,num3=0;
		   
		   if(this.value.match(reg1)) {
			   for(var i=0;i<this.value.length;i++){
				   if(this.value[i]>='A'&& this.value[i]<='Z') num1=1;
				   if(this.value[i]>='a'&& this.value[i]<='z') num2=2;
				   if(this.value[i]>='0'&& this.value[i]<='9') num3=3;
			   }
			   if(num1>0 && num2>0 && num3>0)                      {span[0].innerHTML='密码强度很强';span[4].innerText='√';flag4 = true;}
			   else if((num1+num2+num3)>=3 && (num1+num2+num3)<=5) {span[0].innerHTML='密码强度中等';span[4].innerText='√';flag4 = true;}
			   else                                                {span[0].innerHTML='密码强度很弱';span[4].innerText='√';flag4 = true;}

			}
		   else if(this.value.length<=5&&this.value.length>0) {span[0].innerHTML='密码长度不够';span[4].innerText='X';flag4 = false;}
		   else span[0].innerHTML='用户密码不能为空';
		   
	
	}
confirm.onblur = function(){
	if(this.value){
	if(this.value==password.value) {
		span[5].innerText = '√';flag5=true;span[0].innerHTML='';
	}else {span[0].innerHTML='密码确认不对！';span[5].innerText = 'X';flag5=false;}
	}
}
	

button.onclick = function(){
	if(flag1 && flag2 && flag3 && flag4 && flag5){
	let ajax = new XMLHttpRequest();
	if(username.value&&password.value){
		ajax.open('post',phpurl+'register.php',true);
		ajax.setRequestHeader('content-type','application/x-www-form-urlencoded');
		ajax.send('username='+username.value+'&password='+password.value+'&number='+number.value);
		ajax.onreadystatechange = function(){
			if(ajax.readyState==4){
				var content = ajax.responseText;
				if(content=='true') {localStorage.setItem('logininfo',username.value);window.location.href='http://localhost/tianmao/src/index.html';}
				else {username.value='注册怎么了';return false;}
			}
		}
		
	}else {span[0].innerHTML='用户名或密码不能为空！';return false;}
	}
}

