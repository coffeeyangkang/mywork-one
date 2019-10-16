define([],function(){
	var url     = 'http://10.31.155.55';
	
	//渲染第一个经常更新的广告区
	var autLogo  = document.querySelector('.autumnlogo');
	var autPics  = document.querySelector('.autumnpics');
	var logoList = document.querySelectorAll('.ad');
	var daoDiv   = document.querySelectorAll('#daogou>div');
	
	$ajax({
		async:'true',
		type:'post',
		dataType:'json',
		url:url+'/tianmao/php/autumn.php',
		data:{theme:'autumn',pics:'',daogou:''}
	}).then(function(obj){
		//渲染四个大的长的广告图
		autLogo.innerHTML     = `<img src=${obj[0].imgurl}>`;
		logoList[0].innerHTML = `<img src=${obj[1].imgurl} style='width:100%;height:90px;'>`;    
		logoList[1].innerHTML = `<img src=${obj[2].imgurl} style='width:100%;height:90px;'>`;
		logoList[2].innerHTML = `<img src=${obj[3].imgurl} style='width:100%;height:90px;'>`;
		
		return $ajax({
			async:'true',
			type:'post',
			dataType:'json',
			url:url+'/tianmao/php/autumn.php',
			data:{theme:'',pics:'five',daogou:''}
		});
	}).then(function(obj){
		//渲染第一个长广告下的五个图片
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
			url:url+'/tianmao/php/autumn.php',
			data:{theme:'',pics:'',daogou:'yes'}
		});
	}).then(function(obj){
		//渲染品牌闪购，奢侈，品牌活动
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
		return $ajax({
			async:'true',
			type:'post',
			dataType:'json',
			url:url+'/tianmao/php/wall.php',
			data:{wall:'wall',market:''}
		});
	}).then(function(obj){
		//渲染品牌墙
		var num=1;
		let wall = document.querySelector('#wall');
		for(var value of obj){
				var autA   = document.createElement('a');
				var autImg = document.createElement('img');
				if(num%10!==0) autA.style.cssText   = 'display:inline-block;width:122px;height:90px;border-right:1px solid #f5f5f5;border-bottom:1px solid #f5f5f5;text-align:center;';
				else autA.style.cssText = 'display:inline-block;width:122px;height:90px;border-bottom:1px solid #f5f5f5;text-align:center;';
				if(num>20) autA.style.cssText   = 'display:inline-block;width:122px;height:90px;border-right:1px solid #f5f5f5;text-align:center;';
				
				autImg.style.cssText = 'width:100px;height:50px;';
				autA.href            = value.tarurl;
				autImg.src           = value.imgurl;
				wall.appendChild(autA);
				autA.appendChild(autImg);
				num++;
		}
			
		return $ajax({
			async:'true',
			type:'post',
			dataType:'json',
			url:url+'/tianmao/php/wall.php',
			data:{wall:'',market:'tm'}
		});	
	}).then(function(obj){
			//渲染天猫超市图片
			var marketright = document.querySelector('.market-right');
			var marketad    = document.querySelector('.market-left-back-down');
			var autA        = document.createElement('a');
			var autImg      = document.createElement('img');
			
			autA.style.cssText   = 'display:inline-block;';
			autImg.style.cssText = 'width:234px;height:618px;';
			autA.href  = obj[0].tarurl;
			autImg.src = obj[0].imgurl;
			marketright.appendChild(autA);
			autA.appendChild(autImg);
			
			//渲染天猫超市中的tab切换
			marketad.innerHTML = `<img src=${obj[1].imgurl}>
			<p>
				<a><img src='./img/tmcsico.png'><span>单件包邮</span></a><br>
				<a><span>动力屯奶日</span></a>
			</p>`;
			
			//渲染天猫超市中的商品
			var marketleft = document.querySelector('.market-left');
			for(var i=3;i<9;i++){
				var autA   = document.createElement('a');
				var autImg = document.createElement('img');
				var p1 = document.createElement('p');
					p1.style.cssText='width:135px;font-size:14px;line-height:18px;color:#333;margin: 12px auto;';
				var p2 = p1.cloneNode();
					p2.style.color='red';
				p2.style.color='red';
				if(i==3) autA.style.cssText   = 'float:left;width:236px;height:302px;margin-left:13px;background:white;';
				else if(i==4) autA.style.cssText   = 'float:left;width:236px;height:302px;margin-left:13px;margin-right:2px;background:white;';
				else if(i==5) autA.style.cssText   = 'float:left;width:236px;height:302px;margin-top:12px;background:white;';
				else autA.style.cssText   = 'float:left;width:236px;height:302px;margin-left:13px;margin-top:12px;background:white;';
				autImg.style.cssText = 'width:185px;height:185px;margin-top:12px;';
				autA.href  = obj[i].tarurl+'?goodid='+obj[i].marketid;//商品的超链接
				autImg.src = obj[i].imgurl;//商品图片远程地址
				p1.innerHTML=obj[i].description;//产品描述
				p2.innerHTML='￥'+obj[i].price;//产品价格
				marketleft.appendChild(autA);
				autA.appendChild(autImg);
				autA.appendChild(p1);
				autA.appendChild(p2);
			}
		
		return $ajax({//天猫国际
			async:'true',
			type:'post',
			dataType:'json',
			url:url+'/tianmao/php/goods.php',
			data:{goods:'',tmgj:'yes',ppcd:'',beauty:'',grocery:'',home:'',outdoors:'',like:''}
		});		
	}).then(function(obj){
			var num=1;
			var tmgjup   = document.querySelector('.tmgj-up');
			var tmgjdown = document.querySelector('.tmgj-down');
			
			for(var value of obj){
				if(value.belong == 'bigup'){
					tmgjup.innerHTML = `<a href=${value.tarurl} style='float:left;'><img src=${value.imgurl} style='width:234px;height:301px;'></a>`;
				}else if(value.belong == 'bigdown') {
					tmgjdown.innerHTML = `<a href=${value.tarurl} style='float:left;'><img src=${value.imgurl} style='width:234px;height:301px;'></a>`;	
				}else {
					//渲染天猫国际的八张小图片
					var autA     = document.createElement('a');
					var autImg   = document.createElement('img');
					var p1 = document.createElement('p');
					p1.style.cssText='width:135px;font-size:14px;line-height:18px;color:#333;margin: 12px auto;';
					var p2 = p1.cloneNode();
					p2.style.color='red';
					
					
					autA.style.cssText   = 'float:left;width:236px;height:301px;background:white;';
					autImg.style.cssText = 'width:185px;height:185px;display:block;margin-top:12px;';
					autA.href  = value.tarurl;
					autImg.src = value.imgurl;
					if(num<=4) tmgjup.appendChild(autA);
					if(num>4) tmgjdown.appendChild(autA);
					autA.appendChild(autImg);
					p1.innerHTML=value.description;
					p2.innerHTML='￥'+value.price;
					autA.appendChild(p1);
					autA.appendChild(p2);
					num++;
				}
			}
		
		return $ajax({
			async:'true',
			type:'post',
			dataType:'json',
			url:url+'/tianmao/php/goods.php',
			data:{goods:'',tmgj:'',ppcd:'',beauty:'yes',grocery:'',home:'',outdoors:'',like:''}
		});		
	}).then(function(obj){
		//渲染美丽人生
		//渲染左侧大图以及上面的文字
		getData('.beauty-left','.beauty-right',obj);//美丽人生
		
		return $ajax({
			async:'true',
			type:'post',
			dataType:'json',
			url:url+'/tianmao/php/goods.php',
			data:{goods:'',tmgj:'',ppcd:'yes',beauty:'',grocery:'',home:'',outdoors:'',like:''}
		});		
	}).then(function(obj){ 

		//渲染左侧大图以及上面的文字
		getData('.electronics-left','.electronics-right',obj);
		return $ajax({
			async:'true',
			type:'post',
			dataType:'json',
			url:url+'/tianmao/php/goods.php',
			data:{goods:'',tmgj:'',ppcd:'',beauty:'',grocery:'yes',home:'',outdoors:'',like:''}
		});	
}).then(function(obj){
		getData('.grocery-left','.grocery-right',obj);
		return $ajax({
			async:'true',
			type:'post',
			dataType:'json',
			url:url+'/tianmao/php/goods.php',
			data:{goods:'',tmgj:'',ppcd:'',beauty:'',grocery:'',home:'yes',outdoors:'',like:''}
		});	
}).then(function(obj){
		getData('.home-left','.home-right',obj);//打造爱巢
		return $ajax({
			async:'true',
			type:'post',
			dataType:'json',
			url:url+'/tianmao/php/goods.php',
			data:{goods:'',tmgj:'',ppcd:'',beauty:'',grocery:'',home:'',outdoors:'yes',like:''}
		});	
}).then(function(obj){
	getData('.outdoors-left','.outdoors-right',obj);//户外出行
	return $ajax({
		async:'true',
		type:'post',
		dataType:'json',
		url:url+'/tianmao/php/goods.php',
		data:{goods:'',tmgj:'',ppcd:'',beauty:'',grocery:'',home:'',outdoors:'',like:'yes'}
	})
}).then(function(obj){
	var str  = '';
		var like = document.querySelector('#guesslike');
		for(var i=0,len=obj.length;i<len-5;i=i+5){
			str += `<ul>
			<li>
				<a href=${obj[i].tarurl}><img class="lazy" data-original=${obj[i].imgurl} width="185" height="185">
				<p>${obj[i].description1}</p>
				<p>￥${obj[i].price}</p>
				</a>
			</li>
			<li>
				<a href=${obj[i+1].tarurl}><img class="lazy" data-original=${obj[i+1].imgurl} width="185" height="185">
				<p>${obj[i+1].description1}</p>
				<p>￥${obj[i+1].price}</p>
				</a>
			</li>
			<li>
				<a href=${obj[i+2].tarurl}><img class="lazy" data-original=${obj[i+2].imgurl} width="185" height="185">
				<p>${obj[i+2].description1}</p>
				<p>￥${obj[i+2].price}</p>
				</a>
			</li>
			<li>
				<a href=${obj[i+3].tarurl}><img class="lazy" data-original=${obj[i+3].imgurl} width="185" height="185">
				<p>${obj[i+3].description1}</p>
				<p>￥${obj[i+3].price}</p>
				</a>
			</li>
			<li>
				<a href=${obj[i+4].tarurl}><img class="lazy" data-original=${obj[i+4].imgurl} width="185" height="185">
				<p>${obj[i+4].description1}</p>
				<p>￥${obj[i+4].price}</p>
				</a>
			</li>
		</ul>`;
		}
		like.innerHTML = str;
		
		//懒加载
		$(function () { 
             $("img.lazy").lazyload({
                 effect: "fadeIn" 
             });
         });
})});









function getData(obj1,obj2,obj){
		var beautyleft  = document.querySelector(obj1);
		var beautyright = document.querySelector(obj2);
		
		
		//渲染左侧大图以及上面的文字
		var good1        = document.createElement('a');
		var good1img     = document.createElement('img');
			good1.style.cssText    = 'display:inline-block;';
			good1img.style.cssText = 'width:234px;height:618px;';
			good1.href   = obj[0].tarurl;
			good1img.src = obj[0].imgurl;
			beautyleft.appendChild(good1);
			good1.appendChild(good1img);
		
		var span		       = document.querySelector(obj1+'>div>span');
		var span1              = document.querySelectorAll(obj1+'>div>p>span');
			span.innerHTML     = obj[0].description1;
		var arr                = obj[0].description2.split('，');
			span1[0].innerHTML = arr[0];
			span1[1].innerHTML = arr[1];
		
		
		for(var i=1;i<9;i++){
			var autA     = document.createElement('a');
			var autImg   = document.createElement('img');
			var p1       = document.createElement('p');
				p1.style.cssText='width:135px;font-size:14px;line-height:18px;color:#333;margin: 12px auto;';
			var p2       = p1.cloneNode();
				p2.style.color='red';
			
			
			autA.style.cssText   = 'float:left;width:236px;height:301px;background:white;';
			autImg.style.cssText = 'width:185px;height:185px;margin-top:12px;';
			autA.href  = obj[i].tarurl;
			autImg.src = obj[i].imgurl;
			autA.appendChild(autImg);
			p1.innerHTML=obj[i].description1;
			p2.innerHTML='￥'+obj[i].price;
			//autA.appendChild(autImg);
			autA.appendChild(p1);
			autA.appendChild(p2);
			beautyright.appendChild(autA);
			
		}
}