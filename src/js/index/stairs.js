define([],function(){
	var $stairs    = $('#stairs');
	var $floors    = $('#stairs a');
	var $amonth    = $('#autumnmonth');    //金秋十月
	var $firstS    = $('#daogou');         //导购
	var $tmmark    = $('#tmmarket');       //天猫超市
	var $tminter   = $('#tminternational');//天猫国际
	var $beauty    = $('#beauty');         //美丽人生
	var $electro   = $('#electronics');    //潮店酷玩
	var $grocery   = $('#grocery');        //居家生活
	var $home      = $('#home');           //打造爱巢
	var $outdoors  = $('#outdoors');       //户外生活
	var $guesslike = $('#guesslike');      //猜你喜欢
	var colorarr   = ['#000','#64c333','#ff0036','#EA5F8D','#0AA6E8','#64C333','#F15453','#19C8A9','#64C333'];//定义颜色数组
	
	//定义楼梯的移入事件
	$floors.mouseover(function(){
		$(this).css({backgroundColor:colorarr[$(this).index()]});
	});
	
	//定义楼梯的移出事件
	$floors.mouseout(function(){
		$(this).css({backgroundColor:'#626262'});
	});
	
	//提前隐藏
	$stairs.hide();
	
	$(document).on('scroll',function(){
		
		if($(this).scrollTop()>$amonth.offset().top) {//以金秋十月主题为界，到达这里，显示楼梯
			$stairs.show(400);
		}else { 
			$stairs.hide(400);
		}
		if($(this).scrollTop()<$tmmark.offset().top&&$(this).scrollTop()>$firstS.offset().top+100) {//到达这里，天猫超市变色
			//$floors.not($floors.eq(0)).css({backgroundColor:'black'});
			
			//$floors.eq(1).css({backgroundColor:'#64c333'});
			//$floors.eq(2).css({'background-color':'#626262'});
			
			//触发匹配元素的移入事件
			$floors.eq(1).trigger('mouseover');
			//为其他元素触发移出事件
			$floors.eq(1).siblings('a').not($floors.eq(0)).trigger('mouseout');
		}else if($(this).scrollTop()<$tminter.offset().top&&$(this).scrollTop()>$tmmark.offset().top+100) {//到达这里，天猫国际变色
		
			//$floors.eq(1).css({'background-color':'#626262'});
			//$floors.eq(2).css({backgroundColor:'#ff0036'});
			//$floors.eq(3).css({'background-color':'#626262'});
			
			$floors.eq(2).trigger('mouseover');
			$floors.eq(2).siblings('a').not($floors.eq(0)).trigger('mouseout');
		}else if($(this).scrollTop()<$beauty.offset().top&&$(this).scrollTop()>$tminter.offset().top+180){//美丽人生
			
			//$floors.eq(2).css({'background-color':'#626262'});
			//$floors.eq(3).css({backgroundColor:'#EA5F8D'});
			//$floors.eq(4).css({'background-color':'#626262'});
			$floors.eq(3).trigger('mouseover');
			$floors.eq(3).siblings('a').not($floors.eq(0)).trigger('mouseout');
		}else if($(this).scrollTop()<$electro.offset().top&&$(this).scrollTop()>$beauty.offset().top+100){//潮店酷玩
			
			//$floors.eq(3).css({'background-color':'#626262'});
			//$floors.eq(4).css({backgroundColor:'#0AA6E8'});
			//$floors.eq(5).css({'background-color':'#626262'});
			$floors.eq(4).trigger('mouseover');
			$floors.eq(4).siblings('a').not($floors.eq(0)).trigger('mouseout');
		}else if($(this).scrollTop()<$grocery.offset().top&&$(this).scrollTop()>$electro.offset().top+200){//居家生活
			
			//$floors.eq(4).css({'background-color':'#626262'});
			//$floors.eq(5).css({backgroundColor:'#64C333'});
			//$floors.eq(6).css({'background-color':'#626262'});
			$floors.eq(5).trigger('mouseover');
			$floors.eq(5).siblings('a').not($floors.eq(0)).trigger('mouseout');
		}else if($(this).scrollTop()<$home.offset().top&&$(this).scrollTop()>$grocery.offset().top+100){//打造爱巢
			
			//$floors.eq(5).css({'background-color':'#626262'});
			//$floors.eq(6).css({backgroundColor:'#F15453'});
			//$floors.eq(7).css({backgroundColor:'#626262'});
			$floors.eq(6).trigger('mouseover');
			$floors.eq(6).siblings('a').not($floors.eq(0)).trigger('mouseout');
		}else if($(this).scrollTop()<$outdoors.offset().top&&$(this).scrollTop()>$home.offset().top+180){//户外生活
			
			//$floors.eq(6).css({'background-color':'#626262'});
			//$floors.eq(7).css({backgroundColor:'#19C8A9'});
			//$floors.eq(8).css({backgroundColor:'black'});
			$floors.eq(7).trigger('mouseover');
			$floors.eq(7).siblings('a').not($floors.eq(0)).trigger('mouseout');
		}else if($(this).scrollTop()<$guesslike.offset().top&&$(this).scrollTop()>$outdoors.offset().top+150){//户外生活
			
			//$floors.eq(7).css({'background-color':'#626262'});
			//$floors.eq(8).css({backgroundColor:'#64C333'});
			$floors.eq(8).trigger('mouseover');
			$floors.eq(8).siblings('a').not($floors.eq(0)).trigger('mouseout');
		}
	});
	
	
});