"use strict";define([],function(){var o=$("#stairs"),t=$("#stairs a"),e=$("#autumnmonth"),s=$("#daogou"),r=$("#tmmarket"),i=$("#tminternational"),f=$("#beauty"),l=$("#electronics"),g=$("#grocery"),p=$("#home"),n=$("#outdoors"),u=$("#guesslike"),c=["red","#EA5F8D","#64c333","#ff0036","#EA5F8D","#0AA6E8","#64C333","#F15453","#19C8A9","#64C333","red"];$(document).scrollTop()>e.offset().top?o.show(400):o.hide(),t.mouseover(function(){$(this).css({backgroundColor:c[$(this).index()]})}),t.mouseout(function(){$(this).css({backgroundColor:"black"}),t.eq(0).css({backgroundColor:"red"})}),$(document).on("scroll",function(){$(this).scrollTop()>e.offset().top?o.show(400):o.hide(400),$(this).scrollTop()<r.offset().top&&$(this).scrollTop()>s.offset().top+100?(t.eq(1).trigger("mouseover"),t.eq(1).siblings("a").not(t.eq(0)).trigger("mouseout")):$(this).scrollTop()<i.offset().top&&$(this).scrollTop()>r.offset().top+100?(t.eq(2).trigger("mouseover"),t.eq(2).siblings("a").not(t.eq(0)).trigger("mouseout")):$(this).scrollTop()<f.offset().top&&$(this).scrollTop()>i.offset().top+180?(t.eq(3).trigger("mouseover"),t.eq(3).siblings("a").not(t.eq(0)).trigger("mouseout")):$(this).scrollTop()<l.offset().top&&$(this).scrollTop()>f.offset().top+100?(t.eq(4).trigger("mouseover"),t.eq(4).siblings("a").not(t.eq(0)).trigger("mouseout")):$(this).scrollTop()<g.offset().top&&$(this).scrollTop()>l.offset().top+200?(t.eq(5).trigger("mouseover"),t.eq(5).siblings("a").not(t.eq(0)).trigger("mouseout")):$(this).scrollTop()<p.offset().top&&$(this).scrollTop()>g.offset().top+100?(t.eq(6).trigger("mouseover"),t.eq(6).siblings("a").not(t.eq(0)).trigger("mouseout")):$(this).scrollTop()<n.offset().top&&$(this).scrollTop()>p.offset().top+180?(t.eq(7).trigger("mouseover"),t.eq(7).siblings("a").not(t.eq(0)).trigger("mouseout")):$(this).scrollTop()<u.offset().top&&$(this).scrollTop()>n.offset().top+150&&(t.eq(8).trigger("mouseover"),t.eq(8).siblings("a").not(t.eq(0)).trigger("mouseout"))});var m=[s.offset().top+100,r.offset().top+120,i.offset().top+200,f.offset().top+120,l.offset().top+220,g.offset().top+120,p.offset().top+200,n.offset().top+180];o.on("click",function(o){console.log($(o.target).index()),$("html,body").stop().animate({scrollTop:m[$(o.target).index()-1]})})});