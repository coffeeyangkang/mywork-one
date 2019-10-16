 //检测是否登录
		let logininfo   = localStorage.getItem('logininfo');
		let unlogin     = document.querySelectorAll('.header-left-login');
		let logining    = document.querySelector('#logining');
		let aList       = document.querySelectorAll('#logining>a');
		let login       = document.querySelector('.login');
		var url = 'http://10.31.155.55/tianmao/php/';
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
		
		
		var arr  = document.cookie.split('; ');//将不同商品的cookie做成数组项
		var newarr;
		var keyarr;
		var idarr=[];
		for(var i=0,len=arr.length;i<len;i++){//for循环，每读一次数组项，意味着要添加一项商品到购物车
			newarr = arr[i].split('=');
			keyarr = newarr[0].match(/\d+/g);//第一项包含产品id，第二项是该产品最后被添加进来的数量
			idarr[i]  = keyarr[0];//获取商品id
		}//for循环结束
		
			$ajax({
			async:'true',
			type:'post',
			dataType:'json',
			url:url+'cart.php',
			data:{id:idarr,handle:'yes'}
		}).then(function(obj){
			var numarr = [];
			for(var i=0,len=arr.length;i<len;i++){//此处for循环用来获取每样商品之前点击加入购物车的数量
				newarr    = arr[i].split('=');
				numarr[i] = newarr[1];
				keyarr    = newarr[0].match(/\d+/g);//第一项包含产品id，第二项是该产品最后被添加进来的数量
				idarr[i]  = keyarr[0];//获取商品id
			}
			
			var wrap  = document.querySelector('.goods-list');
			var str;
			
			//渲染购物车显示列表
			for(var i=0;i<obj.length;i++){
			var totalprice = obj[i].price * numarr[i];//获取单个商品的总价格
			var div   = document.createElement('div');
				str = `<input type="checkbox" name="select-all" class='single' value="true">
					<img src=${obj[i].smaurl} style='width:40px;height:40px;'>
					<a>${obj[i].description1}</a>
					<a></a>
					<a class='price'>${obj[i].price}</a>
					<a><span class='car-minus'>-</span><input type='text' value='${numarr[i]}' class='number'><span class='car-plus'>+</span></a>
					<a class='totalprice'>${totalprice}</a>
					<a><span class='move'>移入收藏夹</span><br><span class='delete'>删除</span></a>`;
				
				div.innerHTML = str;
				wrap.appendChild(div);
			}
			
			var openCol  = document.querySelectorAll('.open>p>span');//打开收藏夹元素
			var spanMove = document.querySelectorAll('.move');       //购物车商品移入收藏夹
			var spanDel  = document.querySelectorAll('.delete');     //购物车删减
			var minus    = document.querySelectorAll('.car-minus');  //购物车减
			var plus     = document.querySelectorAll('.car-plus');   //购物车加
			var num      = document.querySelectorAll('.number');     //获取每个商品添加购物车之后，数量元素
			var total    = document.querySelectorAll('.totalprice'); //获取该商品的总价元素
			var price    = document.querySelectorAll('.price');      //获取单价元素
			var parDiv   = document.querySelector('.goods-list');    //获取到购物车元素的包裹元素，为之后删除商品作准备
			var allInp   = document.querySelector('#all');           //获取全选checkbox
			var inpList  = document.querySelectorAll('.single');     //单选按钮
			var sumprice = document.querySelector('.total');         //全部勾选后商品的总价元素
			var allGoods = document.querySelectorAll('.totalprice'); //获取的这个元素重复了！！！！
			
			//全选按钮点击处理
			allInp.onclick = function(){
				var aa=0;
				if(this.checked) {
					for(var i=0;i<inpList.length;i++){
						inpList[i].checked = this.checked;
					}
					for(var i=0;i<allGoods.length;i++){
						aa = aa+Number(allGoods[i].innerText);
					}
					sumprice.innerHTML = aa.toFixed(2);
				}else {
					for(var i=0;i<inpList.length;i++){
						inpList[i].checked = this.checked;
					}
					sumprice.innerHTML= 0.00;
					}
			}
			//全选按钮点击处理 end
			
			//购物车中有几个商品，就意味着加按钮，减按钮等的数量和商品数量是一致的
			//所以相关事件在一个for循环里面统一做
			for(var i=0;i<obj.length;i++) {
				spanMove[i].index     = obj[i].goodid;//为收藏夹按钮添加自定义索引，索引值是商品的id值
				spanMove[i].subscript = i; 
				spanDel[i].index      = i;
				spanDel[i].subscript  = obj[i].goodid;
				minus[i].index        = i;
				plus[i].index         = i;
				inpList[i+1].index    = i;
				
				//移入收藏夹
				spanMove[i].onclick = function(){
					$ajax({
						async:'true',
						type:'post',
						url:url+'cart.php',
						dataType:'',
						data:{id:spanMove[this.subscript].index,name:localStorage.getItem('logininfo'),num:num[this.subscript].value,url:obj[this.subscript].smaurl,price:obj[this.subscript].price,description:obj[this.subscript].description1,handle:'insert'}
				})}
				
				//商品删除
				spanDel[i].onclick = function(){
			
					var arr  = document.cookie.split('; ');
					for(var i=0,len=arr.length;i<len;i++){
						var newarr = arr[i].split('=');
						if(newarr[0] == ('goodid'+this.subscript) ){
							var date = new Date();
							date.setDate(date.getDate()-1);
							document.cookie = `${newarr[0]}='';expires=${date}`;//商品移除时，cookie也要删除
						}
					}
					parDiv.removeChild(spanMove[this.index].parentNode.parentNode);//删除此商品的DOM结构
					
				}
			
				//购物车商品数量删减
				minus[i].onclick = function(){
					if(num[this.index].value>1) {num[this.index].value = num[this.index].value-1;total[this.index].innerHTML   = (num[this.index].value * price[this.index].innerText).toFixed(2);}
				}
				
				//购物车商品数量添加
				plus[i].onclick = function(){
					if(num[this.index].value<100) {num[this.index].value = ++num[this.index].value;total[this.index].innerHTML = (num[this.index].value * price[this.index].innerText).toFixed(2);}
				}
			
				
				//单选按钮的操作
				inpList[i+1].onclick = function(){
					var aa = 0;//作为保存变量值
					if(this.checked) {
						aa = aa+Number(allGoods[this.index].innerText);
						if(sumprice.innerHTML!=='0.00') sumprice.innerHTML = Number(sumprice.innerText) + aa;
						else sumprice.innerHTML = aa;
					}else {
						sumprice.innerHTML = Number(sumprice.innerText) - Number(allGoods[this.index].innerText);
					}
				}
			
			}//移入收藏夹结束
			
			
			
			
			
			//打开收藏夹
			openCol[0].onclick = function(){
				$ajax({
					async:'true',
					type:'post',
					dataType:'json',
					url:url+'cart.php',
					data:{id:'',handle:'open'}
				}).then(function(obj){
					console.log(obj);
					var wrap  = document.querySelector('.open');
					var str;
					var totalprice;
					for(var value of obj){
					var div    = document.createElement('div');
					totalprice = (value.price * value.goodnum).toFixed(2);//获取单个商品的总价格
					str = `<input type="checkbox" name="select-all" value="true">
						<img src=${value.smaurl} style='width:40px;height:40px;'>
						<a>${value.description}</a>
						<a></a>
						<a class='price'>${value.price}</a>
						<a><span class='car-minus'>-</span><input type='text' value='${value.goodnum}' class='number'><span class='car-plus'>+</span></a>
						<a class='totalprice'>${totalprice}</a>
						<a><span class='move'>移入收藏夹</span><br><span class='delete'>删除</span></a>`;
					
					div.innerHTML = str;
					wrap.appendChild(div);
					}
				});
			}//打开收藏夹结束
			
		});
				
		
	
		function deleteCookie(){
		var arr  = document.cookie.split('; ');
		for(var i=0,len=arr.length;i<len;i++){
			var newarr = arr[i].split('=');
			addCookie(newarr[0],'',-1);
		}
		
	}
		
		
	