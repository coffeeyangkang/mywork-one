define([],function(){
	var $stairs = $('#stairs');
	var $floors = $('#stairs a');
	var $firstS = $('#daogou');
	var $amonth = $('#autumnmonth');
	var $tmmark = $('#tmmarket');
	$stairs.hide();
	$(document).on('scroll',function(){
		
		if($(this).scrollTop()>$amonth.offset().top) {
			$stairs.show(400);
		}else { 
			$stairs.hide(400);
		}
		if($(this).scrollTop()<$tmmark.offset().top&&$(this).scrollTop()>$firstS.offset().top+100) {
			$floors.not($floors.eq(0)).css({backgroundColor:rgba(0,0,0,0.6)});
			$floors.eq(1).css({backgroundColor:'#64c333'});
		}else if($(this).scrollTop()>$tmmark.offset().top+100) {
			$floors.not($floors.eq(0)).css({'background-color':'rgba(0,0,0,0.6)'});
			$floors.eq(2).css({backgroundColor:'#ff0036'});
		}
	});
	
});