function create(obj1,obj2,obj3,obj){
		var actlogo     = document.querySelector(obj1);
		var beautyleft  = document.querySelector(obj2);
		var beautyright = document.querySelector(obj3);
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
		

		
		var span=document.querySelector(`${obj2}>div>span`)
		var span1=document.querySelectorAll(`obj2>div>p>span`)
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
			
		};