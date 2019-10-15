 //检测是否登录
		let logininfo   = localStorage.getItem('logininfo');
		let unlogin     = document.querySelectorAll('.header-left-login');
		let logining    = document.querySelector('#logining');
		let aList       = document.querySelectorAll('#logining>a');
		let login       = document.querySelector('.login');
		var url = 'http://localhost/tianmao/php/';
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
		
		
		var arr  = document.cookie.split('; ');//将不同商品的cookie做成数组项
		for(var i=0,len=arr.length;i<len;i++){//for循环，每读一次数组项，意味着要添加一项商品到购物车
			var newarr = arr[i].split('=');
			var keyarr = newarr[0].split('');//第一项包含产品id，第二项是该产品最后被添加进来的数量
			var id = keyarr[keyarr.length-1];//获取商品id
			$ajax({
			async:'true',
			type:'post',
			dataType:'json',
			url:url+'cart.php',
			data:{id:id,handle:'yes'}
		}).then(function(obj){
			var wrap  = document.querySelector('.goods-list');
			var div   = document.createElement('div');
			var str;
			var totalprice = obj[0].price * newarr[1];//获取单个商品的总价格
			str = `<input type="checkbox" name="select-all" class='single' value="true">
				<img src=${obj[0].smaurl} style='width:40px;height:40px;'>
				<a>${obj[0].description}</a>
				<a></a>
				<a class='price'>${obj[0].price}</a>
				<a><span class='car-minus'>-</span><input type='text' value='${newarr[1]}' class='number'><span class='car-plus'>+</span></a>
				<a class='totalprice'>${totalprice}</a>
				<a><span class='move'>移入收藏夹</span><br><span class='delete'>删除</span></a>`;
			
			div.innerHTML = str;
			wrap.appendChild(div);
	
			var openCol  = document.querySelectorAll('.open>p>span');
			var spanMove = document.querySelector('.move');
			var spanDel  = document.querySelector('.delete');
			var minus    = document.querySelector('.car-minus');
			var plus     = document.querySelector('.car-plus');
			var num      = document.querySelector('.number');
			var total    = document.querySelector('.totalprice');
			var price    = document.querySelector('.price');
			var parDiv   = document.querySelector('.goods-list');
			var allInp   = document.querySelector('#all');
			var inpList  = document.querySelectorAll('.single');
			var sumprice = document.querySelector('.total');
			var allGoods = document.querySelectorAll('.totalprice');
			allInp.onclick = function(){
				var aa=0;
				if(this.checked) {
					for(var i=0;i<inpList.length;i++){
						inpList[i].checked = this.checked;
					}
					for(var i=0;i<allGoods.length;i++){
						aa = aa+Number(allGoods[i].innerText);
					}
					sumprice.innerHTML = aa;
				}else {
					for(var i=0;i<inpList.length;i++){
						inpList[i].checked = this.checked;
					}
					sumprice.innerHTML= 0.00;
					}
			}
			//移入收藏夹
			spanMove.index = obj[0].goodid;
			spanMove.onclick = function(){
				$ajax({
					async:'true',
					type:'post',
					url:url+'cart.php',
					dataType:'',
					data:{id:spanMove.index,name:localStorage.getItem('logininfo'),num:num.value,url:obj[0].smaurl,price:obj[0].price,description:obj[0].description,handle:'insert'}
				})
			}//移入收藏夹结束
			
			//商品删除
			spanDel.onclick = function(){
				parDiv.removeChild(spanMove.parentNode.parentNode);
			}
			
			//购物车商品数量添加和删减
			minus.onclick = function(){
				if(num.value>1) {num.value = num.value-1;total.innerHTML = (num.value * price.innerText).toFixed(2);}
			}
			plus.onclick = function(){
				if(num.value<100) {num.value = ++num.value;total.innerHTML = (num.value * price.innerText).toFixed(2);}
			}//购物车商品数量添加和删减 结束
			//打开收藏夹
			openCol[0].onclick = function(){
				$ajax({
					async:'true',
					type:'post',
					dataType:'json',
					url:url+'cart.php',
					data:{id:id,handle:'open'}
				}).then(function(obj){
					var wrap  = document.querySelector('.open');
					var div   = document.createElement('div');
					for(var value of obj){
					var str;
					var totalprice = (value.price * value.goodnum).toFixed(2);//获取单个商品的总价格
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
				
		}//for循环结束
	
		
		
		
		
	function handle(obj){
	
	}	
	