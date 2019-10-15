
define([],function(){
	var url        = 'http://10.31.155.55';
	var searchEle  = document.querySelector('#search input');
	var seaHandle  = document.createElement('script');//创建搜索结果函数执行标签
	
	/*获取搜索结果呈现框，然后把结果渲染进去*/
		seaHandle.innerHTML = `
		function jsonp607(data){
			var searchres  = document.querySelector('.search-result');
			var str = '';
			for(var i=0,len=data.result.length;i<len;i++){
				str = str + '<li><a>'+data.result[i][0]+'</a><span>约'+data.result[i][1]+'结果</span></li>';
			}
			searchres.innerHTML = str;
		}
		`;//远程请求的jsonp callback写在模板字符串中
		document.body.appendChild(seaHandle);//把script写入DOM中
	//搜索框的内容改变事件
	searchEle.oninput =function(){
		var url = `https://suggest.taobao.com/sug?code=utf-8&q=${this.value}&_ksTS=1571020478254_606&callback=jsonp607&area=b2c&code=utf-8&k=1&bucketid=9&src=tmall_pc`;
		var scr = document.createElement('script');
			scr.src = url;
			document.querySelector('body').appendChild(scr);
	}
	
	//渲染banner图
	var ajax      = new XMLHttpRequest();
	var url       = '';
	var banner    = document.querySelector('#banners');
	var wrapEle   = document.querySelector('#banners .banner-wrap');
	ajax.open('post',url+'/tianmao/php/banner.php',true);
	ajax.setRequestHeader('content-type','application/x-www-form-urlencoded');
	ajax.send();
	ajax.onreadystatechange = function(){
		if(ajax.readyState === 4){
			var content = ajax.responseText;
			var str = '';
			var sma;
				content = JSON.parse(content);
				
				for(var i=0,len=content.length;i<len;i++){
					
					if(content[i].smaurl2!=null && content[i].smaurl1!=null) {
						str = str + `<a href=${content[i].tarurl} class='ba'><img src=${content[i].imgurl}>
						<span style='position:absolute;width:220px;height:234px;right:60px;top:20px;background:rgba(255,255,255,0.5) url(${content[i].smaurl1}) left top no-repeat'></span>
						<span style='position:absolute;width:220px;height:234px;right:60px;top:260px;background:rgba(255,255,255,0.5) url(${content[i].smaurl2}) left top no-repeat'></span>
						</a>`;
					}else {
						str = str + `<a href=${content[i].tarurl}><img src=${content[i].imgurl}></a>`;
					}
				}
				wrapEle.innerHTML = str;
		}
	
	var $banner= $('#banners');
	var $btn   = $('.btn>span');
	var $img   = $('.banner-wrap>a');
	var $index = 0;//保存上一次显示btn的索引
	var $timer = null;
	var $colorarr = ['#e8e8e8','#3b8da5','#fa620d','#0e0f33','#d92229','#e8e8e8'];
		$btn.on('mouseover',function(){
			clearInterval($timer);
			$banner.css({backgroundColor:$colorarr[$(this).index()]});
			$btn.eq($(this).index()).addClass('btnbg').siblings('span').removeClass('btnbg');
			$img.eq($index).animate({opacity:0},500);
			$img.eq($(this).index()).animate({opacity:1},1000);
			$index = $(this).index();
		//$img.eq($(this).index())
		});
		
		$img.on('mouseover',function(){
			clearInterval($timer);
			});
		
		$img.on('mouseout',function(){
			
			$timer = setInterval(function(){
			if($index>=5) {
				$banner.css({backgroundColor:$colorarr[0]});
				$btn.eq(0).addClass('btnbg').siblings('span').removeClass('btnbg');
				$img.eq($index).animate({opacity:0},500);
				$img.eq(0).animate({opacity:1},1000);
				$index = 0;
				}else{
					$btn.eq(++$index).addClass('btnbg').siblings('span').removeClass('btnbg');
					$banner.css({backgroundColor:$colorarr[$index]});
					$img.eq($index-1).animate({opacity:0},500);
					$img.eq($index).animate({opacity:1},1000);
				}
		},4000);
		});
		
		
	}
		
			
	
	
	return {
		a:1
	}
});