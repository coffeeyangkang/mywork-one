//检测是否登录
		let logininfo   = localStorage.getItem('logininfo');
		let unlogin     = document.querySelectorAll('.header-left-login');
		let logining    = document.querySelector('#logining');
		let aList       = document.querySelectorAll('#logining>a');
		let login       = document.querySelector('.login');
		
		if(logininfo) {
			unlogin[0].style.display = 'none';
			aList[0].innerHTML       = logininfo;
		}else{
			logining.style.display   = 'none';
		}
		aList[1].onclick = function(ev){
			var ev=ev||window.event;
			logining.style.display   = 'none';
			unlogin[0].style.display = 'block';
			localStorage.removeItem('logininfo');
			localStorage.removeItem('url');
			deleteCookie();
			ev.stopPropagation();
			ev.cancelBubble=true;
		}
		login.onclick = function(){
			var urlstr = location.href;
			localStorage.setItem('url',urlstr);
			ev.stopPropagation();
			ev.cancelBubble=true;
		}

		var url = 'http://10.31.155.55/tianmao/php/';
		var str = location.search;
		var index;
		 str = str.substr(1);
		 arr = str.split('=');
 
$ajax({//图片放大框、下面小图片、右侧框中图片载入
		async:'true',
		type:'post',
		dataType:'json',
		url:url+'details.php',
		data:{small:'yes',id:arr[1]}
	}).then(function(obj){
		let down     = document.querySelector('.showleft-down');//放大镜包裹框下方的5个图片
		let wrap     = document.querySelector('.showpic-left');//小放大镜所在的包裹框
		let title    = document.querySelector('.showpic-middle h1');//商品详情的主题
		let title2   = document.querySelector('.showpic-subtitle');//商品详情的子标题
		let proprice = document.querySelector('.showpic-middle .price')//商品的价格
		var num=0;
		
		//给商品的主标题、子标题、价格赋值
		title.innerHTML    = obj[0].description1;
		title2.innerHTML   = obj[0].description2;
		proprice.innerHTML = obj[0].price;
		
		if(logininfo){//刷新页面，或者之前在这个页面浏览过，并添加了购物车，所以，要显示出来
			str = location.search;//获取地址栏的search信息
			arr = str.substr(1);
			arr = arr.split('=');//分割完成
			if(getCookie(arr[0]+arr[1])) {
				disadd.innerText = Number(getCookie(arr[0]+arr[1])) * Number(proprice.innerText);
			}
		}
		
		for(var value of obj){
		let aEle  = document.createElement('a');
		let aImg  = document.createElement('img');
		let aImg2 = document.createElement('img');
		aEle.index  = num;//添加自定义属性
		aImg.index  = num;
		aImg2.index = num;
		aEle.style.cssText  = 'display:inline-block;margin-top:11px;margin-left:20px;';
		aImg.style.cssText  = 'display:block;width:60px;height:60px;';
		aImg2.style.cssText = 'position:absolute;width:418px;height:418px;';
		aImg2.src = value.bigurl;
		aImg.src  = value.smaurl;
		aEle.appendChild(aImg);
		down.appendChild(aEle);//五个小图所在的框
		wrap.appendChild(aImg2);//小放大镜所在框里面的图片添加进来
		num++;
		}
		let aList   = document.querySelectorAll('.showleft-down>a');//获取下方5个小图的外层
		let imgList = document.querySelectorAll('.showpic-left>img');//获取5个大图
		
		//处理小图片，以及大框图片展示
		for(var i=0;i<aList.length;i++){imgList[i].style.display='none';}
		imgList[0].style.display = 'block';
		index=imgList[0].index;
		for(var i=0;i<aList.length;i++){
			aList[i].onmouseover = function(){
				for(var i=0;i<aList.length;i++){aList[i].style.border='0';imgList[i].style.display='none';}
				this.style.border = '2px solid black';//移动上来加边框
				imgList[this.index].style.display = 'block';//移动上来显示图片
				index = this.index;
				new zoom(index,imgList).init();
			}
		}
		
		new zoom(index,imgList).init();
	})
	
	//放大镜构造函数
	function zoom(index,obj){
		
			this.leftzoom = document.querySelector('.fdj');
			this.leftwrap = document.querySelector('.showpic-left');
			this.leftright= document.querySelector('.showleft-right');
			
			
		this.init=function(){
			var _this=this;
			this.leftright.style.display = 'none';
			
			
			this.leftwrap.onmouseover = function(ev){
				_this.leftright.style.display = 'block';
				_this.leftzoom.style.display = 'block';
				var str;
				str=`<img src=${obj[index].src} style='width:936px;height:936px;position:absolute;'>`;//鼠标划入，右侧图片显示
				_this.leftright.innerHTML=str;
				var bigImg = document.querySelector('.showleft-right img');//获取右侧图片
				document.onmousemove = function(ev){
					var ev = ev || window;
					var scroll = document.documentElement.scrollTop;
					var l = ev.clientX  - _this.leftwrap.offsetLeft -(_this.leftzoom.offsetWidth)/2;
					var t = ev.clientY - _this.leftwrap.offsetTop  -(_this.leftzoom.offsetHeight)/2;
					if(l<0) l=0;
					if(t<0) t=0;
					if(l>=_this.leftwrap.offsetWidth-_this.leftzoom.offsetWidth) l=_this.leftwrap.offsetWidth-_this.leftzoom.offsetWidth;
					if(t>=_this.leftwrap.offsetHeight-_this.leftzoom.offsetHeight) t=_this.leftwrap.offsetTop.offsetHeight-_this.leftzoom.offsetHeight;
					_this.leftzoom.style.left = l + 'px';
					_this.leftzoom.style.top  = t + 'px';
					bigImg.style.left = -2*l + 'px';
					bigImg.style.top  = -2*t + 'px';
				}
			}
			
			this.leftwrap.onmouseout =function(){
				_this.leftright.style.display = 'none';
				_this.leftzoom.style.display = 'none';
				document.onmousemove=null;
			}
		}
	}
	
	
	//添加购物车相关
	let plus          = document.querySelector('.plus');
	let minus         = document.querySelector('.minus');
	let numInput      = document.querySelector('#num');
	let add           = document.querySelector('.addtocar');
	let disadd        = document.querySelector('.total');
	let price         = document.querySelector('.price');
	let shoppingtotal = document.querySelector('.shoppingtotal');
	
	plus.onclick = function(){
		numInput.value=++numInput.value;	
	}//加
	minus.onclick = function(){
		if(numInput.value>1) numInput.value=--numInput.value;
	}//减
	add.onclick = function(){
		if(logininfo) {
			str = location.search;//获取地址栏的search信息
			arr = str.substr(1);
			arr = arr.split('=');//分割完成
			
			//检测cookie是否存在，如果存在，则相加数量
			if(getCookie(arr[0]+arr[1])) {
				disadd.innerText = (Number(numInput.value)+Number(getCookie(arr[0]+arr[1]))) * Number(price.innerText);
				addCookie(arr[0]+arr[1],Number(numInput.value)+Number(getCookie(arr[0]+arr[1])),10);
			}else {
				disadd.innerText = numInput.value * Number(price.innerText);//在登录的情况下，如果不存在cookie，则直接进行添加，否则，提示进行登录
				addCookie(arr[0]+arr[1],numInput.value,10);
			}
			
		}else alert('请先登录！');
		
	}//添加进购物车
	
	shoppingtotal.onclick = function(){//购物车详情页的小购物车
		var str;
		var arr;
		if(logininfo) {
			str = location.search;//获取地址栏的search信息
			location.href = 'http://10.31.155.55/tianmao/src/cart.html'+str;
		}else alert('请先登录！');
		
	}
	//cookie封装函数
		function addCookie(key,value,time){
		let date = new Date();
		date.setDate(date.getDate()+time);
		document.cookie = `${key}=${value};expires=${date}`;
	}
	
	function getCookie(key){
		var arr = document.cookie.split('; ');
		for(var i=0,len=arr.length;i<len;i++){
			var newarr = arr[i].split('=');
			if(newarr[0]==key) return newarr[1];
		}
	}
	
	function deleteCookie(){
		var arr  = document.cookie.split('; ');
		for(var i=0,len=arr.length;i<len;i++){
			var newarr = arr[i].split('=');
			addCookie(newarr[0],'',-1);
		}
		
	}