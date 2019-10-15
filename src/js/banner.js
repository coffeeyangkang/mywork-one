	//检测是否登录
		let logininfo   = localStorage.getItem('logininfo');
		let unlogin     = document.querySelectorAll('.header-left-login');
		let logining    = document.querySelector('#logining');
		let aList       = document.querySelectorAll('#logining>a');
		let login       = document.querySelector('.login');
		
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
	
	//为轮播图获取资源
	/*let ajax = new XMLHttpRequest();
	let url='';
	let banner = document.querySelector('#banners');
	let aEle = document.querySelector('#banners>a');
	ajax.open('post','http://localhost/tianmao/php/banner.php',true);
	ajax.setRequestHeader('content-type','application/x-www-form-urlencoded');
	ajax.send();
	ajax.onreadystatechange = function(){
		if(ajax.readyState === 4){
			var content = ajax.responseText;
			content = JSON.parse(content);
			banner.style.background = `#ff6699 url(${content[0].imgurl}) center top no-repeat`;
			aEle.href = content[0].tarurl;
			
			//创建轮播图上，两个白色小的图片
			var a1 = document.createElement('a');
				a1.style.cssText = 'position:absolute;width:220px;height:234px;right:60px';
			var a2 = a1.cloneNode();				
			if(content[0].small1 && content[0].small2) {
				a1.style.background=`rgba(255,255,255,0.5) url(${content[0].small1}) left top no-repeat`;
				a2.style.background=`rgba(255,255,255,0.5) url(${content[0].small2}) left top no-repeat`;
				a1.style.top = '20' + 'px';
				a2.style.top = '260' + 'px';
				banner.appendChild(a1);
				banner.appendChild(a2);
			}
		}
	}*/
	let autLogo = document.querySelector('.autumnlogo');
	let autPics = document.querySelector('.autumnpics');
	let daoDiv  = document.querySelectorAll('#daogou>div');
	$ajax({
		async:'true',
		type:'post',
		dataType:'json',
		url:'http://localhost/tianmao/php/autumn.php',
		data:{theme:'autumn',pics:'',daogou:''}
	}).then(function(obj){
		var img = document.createElement('img');
		img.src=obj[0].imgurl;
		autLogo.appendChild(img);
		return $ajax({
			async:'true',
			type:'post',
			dataType:'json',
			url:'http://localhost/tianmao/php/autumn.php',
			data:{theme:'',pics:'five',daogou:''}
		});
	}).then(function(obj){
		for(var value of obj){
			var autA   = document.createElement('a');
			var autImg = document.createElement('img');
			autA.style.cssText   = 'display:inline-block;margin-right:8px;';
			autImg.style.cssText = 'width:238px;height:269px;';
			autA.href  = value.tarurl;
			autImg.src = value.imgurl;
			autPics.appendChild(autA);
			autA.appendChild(autImg);
		}
		
		return $ajax({
			async:'true',
			type:'post',
			dataType:'json',
			url:'http://localhost/tianmao/php/autumn.php',
			data:{theme:'',pics:'',daogou:'yes'}
		});
	}).then(function(obj){//品牌闪购，奢侈，品牌活动
		var num=0;
		for(var value of obj){
			if(value.categery=='brand sale'||value.categery=='luxury channel' || value.categery=='brand activity'){
				var autA   = document.createElement('a');
				var autImg = document.createElement('img');
				autA.style.cssText   = 'display:inline-block;';
				if(num==0) autImg.style.cssText = 'width:234px;height:316px;';
				else autImg.style.cssText = 'width:485px;height:316px;';
				autA.href  = value.tarurl;
				autImg.src = value.imgurl;
				daoDiv[num++].appendChild(autA);
				autA.appendChild(autImg);
			}
		}
		return $ajax({//品牌墙
			async:'true',
			type:'post',
			dataType:'json',
			url:'http://localhost/tianmao/php/wall.php',
			data:{wall:'wall',market:''}
		});
	}).then(function(obj){
		var num=1;
		let wall = document.querySelector('#wall');
		for(var value of obj){
				var autA   = document.createElement('a');
				var autImg = document.createElement('img');
				if(num%10!==0) autA.style.cssText   = 'display:inline-block;width:122px;height:90px;border-right:1px solid #f5f5f5;border-bottom:1px solid #f5f5f5;text-align:center;';
				else autA.style.cssText   = 'display:inline-block;width:122px;height:90px;border-bottom:1px solid #f5f5f5;text-align:center;';
				if(num>20) autA.style.cssText   = 'display:inline-block;width:122px;height:90px;border-right:1px solid #f5f5f5;text-align:center;';
				
				autImg.style.cssText = 'width:100px;height:50px;';
				autA.href  = value.tarurl;
				autImg.src = value.imgurl;
				wall.appendChild(autA);
				autA.appendChild(autImg);
				num++;
		}
			
		return $ajax({//天猫超市
			async:'true',
			type:'post',
			dataType:'json',
			url:'http://localhost/tianmao/php/wall.php',
			data:{wall:'',market:'tm'}
		});	
	}).then(function(obj){
		
			var marketright = document.querySelector('.market-right');
			var autA   = document.createElement('a');
			var autImg = document.createElement('img');
			
			autA.style.cssText   = 'display:inline-block;';
			autImg.style.cssText = 'width:234px;height:618px;';
			autA.href  = obj[0].tarurl;
			autImg.src = obj[0].imgurl;
			marketright.appendChild(autA);
			autA.appendChild(autImg);
		return $ajax({
			async:'true',
			type:'post',
			dataType:'json',
			url:'http://localhost/tianmao/php/goods.php',
			data:{goods:'good',tmgj:'',ppcd:''}
		});		
	}).then(function(obj){
		var marketleft = document.querySelector('.market-left');
		for(var i=0;i<6;i++){
			var autA   = document.createElement('a');
			var autImg = document.createElement('img');
			var p1 = document.createElement('p');
			p1.style.cssText='width:135px;font-size:14px;line-height:18px;color:#333;margin: 12px auto;';
			var p2 = p1.cloneNode();
			p2.style.color='red';
			if(i==0) autA.style.cssText   = 'float:left;width:236px;height:302px;margin-left:13px;background:white;';
			else if(i==1) autA.style.cssText   = 'float:left;width:236px;height:302px;margin-left:13px;margin-right:2px;background:white;';
			else if(i==2) autA.style.cssText   = 'float:left;width:236px;height:302px;margin-top:12px;background:white;';
			else autA.style.cssText   = 'float:left;width:236px;height:302px;margin-left:13px;margin-top:12px;background:white;';
			autImg.style.cssText = 'width:185px;height:185px;';
			autA.href  = obj[0].tarurl+'?goodid='+obj[0].goodid;
			autImg.src = obj[0].imgurl;
			p1.innerHTML=obj[0].description;
			p2.innerHTML='￥'+obj[0].price;
			marketleft.appendChild(autA);
			autA.appendChild(autImg);
			autA.appendChild(p1);
			autA.appendChild(p2);
		}
		
		return $ajax({//天猫国际
			async:'true',
			type:'post',
			dataType:'json',
			url:'http://localhost/tianmao/php/goods.php',
			data:{goods:'',tmgj:'yes',ppcd:''}
		});		
	}).then(function(obj){
			var num=1;
		for(var value of obj){
			var tmgjup   = document.querySelector('.tmgj-up');
			var tmgjdown = document.querySelector('.tmgj-down');
			var autA     = document.createElement('a');
			var autImg   = document.createElement('img');
			
			autA.style.cssText   = 'float:left;';
			autImg.style.cssText = 'width:234px;height:301px;';
			autA.href  = value.tarurl;
			autImg.src = value.imgurl;
			if(num==1) tmgjup.appendChild(autA);
			if(num==2) tmgjdown.appendChild(autA);
			autA.appendChild(autImg);
			num++;
		}
		return $ajax({
			async:'true',
			type:'post',
			dataType:'json',
			url:'http://localhost/tianmao/php/goods.php',
			data:{goods:'good',tmgj:'',ppcd:''}
		});		
	}).then(function(obj){
		var num=1;
		var tmgjup   = document.querySelector('.tmgj-up');
		var tmgjdown = document.querySelector('.tmgj-down');
		for(var i=0;i<8;i++){
			var autA     = document.createElement('a');
			var autImg   = document.createElement('img');
			var p1 = document.createElement('p');
			p1.style.cssText='width:135px;font-size:14px;line-height:18px;color:#333;margin: 12px auto;';
			var p2 = p1.cloneNode();
			p2.style.color='red';
			
			
			autA.style.cssText   = 'float:left;width:236px;height:301px;background:white;';
			autImg.style.cssText = 'width:185px;height:185px;display:block;';
			autA.href  = obj[0].tarurl;
			autImg.src = obj[0].imgurl;
			if(num<=4) tmgjup.appendChild(autA);
			if(num>4) tmgjdown.appendChild(autA);
			autA.appendChild(autImg);
			p1.innerHTML=obj[0].description;
			p2.innerHTML='￥'+obj[0].price;
			//autA.appendChild(autImg);
			autA.appendChild(p1);
			autA.appendChild(p2);
			num++;
		}
		return $ajax({//品牌潮店
			async:'true',
			type:'post',
			dataType:'json',
			url:'http://localhost/tianmao/php/goods.php',
			data:{goods:'',tmgj:'',ppcd:'yes'}
		});		
	}).then(function(obj){//品牌潮店
		
		var actlogo     = document.querySelector('#actLogo2');
		var beautyleft  = document.querySelector('.beauty-left');
		var beautyright = document.querySelector('.beauty-right');
		var autA        = document.createElement('a');
		var autImg      = document.createElement('img');
		autA.style.cssText   = 'display:inline-block;';
		autImg.style.cssText = 'width:1230px;height:90px;display:block;';
		autA.href  = obj[0].tarurl;
		autImg.src = obj[0].imgurl;
		autA.appendChild(autImg);
		actlogo.appendChild(autA);
		
		var good1    = document.createElement('a');
		var good1img = document.createElement('img');
		
		good1.style.cssText   = 'display:inline-block;';
		good1img.style.cssText = 'width:234px;height:618px;';
		good1.href  = obj[1].tarurl;
		good1img.src = obj[1].imgurl;
		beautyleft.appendChild(good1);
		good1.appendChild(good1img);
		

		//美丽人生
		var span=document.querySelector('.beauty-left>div>span')
		var span1=document.querySelectorAll('.beauty-left>div>p>span')
		span.innerHTML = obj[1].detail1;
		var arr=obj[1].detail2.split('，');
		span1[0].innerHTML = arr[0];
		span1[1].innerHTML = arr[1];
		
		
		for(var i=0;i<8;i++){
			var autA     = document.createElement('a');
			var autImg   = document.createElement('img');
			var p1 = document.createElement('p');
			p1.style.cssText='width:135px;font-size:14px;line-height:18px;color:#333;margin: 12px auto;';
			var p2 = p1.cloneNode();
			p2.style.color='red';
			
			
			autA.style.cssText   = 'float:left;width:236px;height:301px;background:white;';
			autImg.style.cssText = 'width:185px;height:185px;';
			autA.href  = obj[2].tarurl;
			autImg.src = obj[2].imgurl;
			autA.appendChild(autImg);
			p1.innerHTML=obj[2].description;
			p2.innerHTML='￥'+obj[2].price;
			//autA.appendChild(autImg);
			autA.appendChild(p1);
			autA.appendChild(p2);
			beautyright.appendChild(autA);
			
		}
		
		return $ajax({
			async:'true',
			type:'post',
			dataType:'json',
			url:'http://localhost/tianmao/php/goods.php',
			data:{goods:'',tmgj:'',ppcd:'yes'}
		});		
	}).then(function(obj){
		console.log(obj);
		//var actlogo     = document.querySelector('#electronics');
		var beautyleft  = document.querySelector('.electronics-left');
		var beautyright = document.querySelector('.electronics-right');
		var autA        = document.createElement('a');
		var autImg      = document.createElement('img');
		
		
		var good1    = document.createElement('a');
		var good1img = document.createElement('img');
		
		good1.style.cssText   = 'display:inline-block;';
		good1img.style.cssText = 'width:234px;height:618px;';
		good1.href  = obj[1].tarurl;
		good1img.src = obj[1].imgurl;
		beautyleft.appendChild(good1);
		good1.appendChild(good1img);
		

		
		var span=document.querySelector('.electronics-left>div>span')
		var span1=document.querySelectorAll('.electronics-left>div>p>span')
		span.innerHTML = obj[1].detail1;
		var arr=obj[1].detail2.split('，');
		span1[0].innerHTML = arr[0];
		span1[1].innerHTML = arr[1];
		
		
		for(var i=0;i<8;i++){
			var autA     = document.createElement('a');
			var autImg   = document.createElement('img');
			var p1 = document.createElement('p');
			p1.style.cssText='width:135px;font-size:14px;line-height:18px;color:#333;margin: 12px auto;';
			var p2 = p1.cloneNode();
			p2.style.color='red';
			
			
			autA.style.cssText   = 'float:left;width:236px;height:301px;background:white;';
			autImg.style.cssText = 'width:185px;height:185px;';
			autA.href  = obj[2].tarurl;
			autImg.src = obj[2].imgurl;
			autA.appendChild(autImg);
			p1.innerHTML=obj[2].description;
			p2.innerHTML='￥'+obj[2].price;
			//autA.appendChild(autImg);
			autA.appendChild(p1);
			autA.appendChild(p2);
			beautyright.appendChild(autA);
			
		}
	});
	