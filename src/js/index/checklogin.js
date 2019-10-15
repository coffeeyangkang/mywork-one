define([],function(){
	//检测是否登录
		var logininfo   = localStorage.getItem('logininfo');
		var unlogin     = document.querySelectorAll('.header-left-login');
		var logining    = document.querySelector('#logining');
		var aList       = document.querySelectorAll('#logining>a');
		var login       = document.querySelector('.login');
		
		if(logininfo) {
			unlogin[0].style.display = 'none';
			aList[0].innerHTML = logininfo;
		}else{
			logining.style.display   = 'none';
		}
		aList[1].onclick = function(ev){
			var ev=ev||window.event;
			logining.style.display   = 'none';
			unlogin[0].style.display = 'block';
			localStorage.removeItem('logininfo');
			localStorage.removeItem('url');
			ev.stopPropagation();
			ev.cancelBubble=true;
		}
		login.onclick = function(){
			var urlstr = location.href;
			localStorage.setItem('url',urlstr);
			ev.stopPropagation();
			ev.cancelBubble=true;
		}
	
	//分类列表hover时
	var categeryLiList = document.querySelectorAll('.categery-list>li'); 
	for(var i=0,len=categeryLiList.length;i<len;i++){
		var elem;
		categeryLiList[i].index=i;
		categeryLiList[i].onmouseover = function(){
			elem = document.createElement('div');
			elem.innerHTML = this.index + '---hello world';
			elem.className='show';
			elem.style.cssText = 'position:absolute;width:200px;height:502px;background:white;color:black;top:0px;left:200px;';
			this.appendChild(elem);
			document.querySelector('.show').style.display='block';
		}
		categeryLiList[i].onmouseout = function(){
			
			this.removeChild(document.querySelector('.show'));
		}
	}
});