// JavaScript Document

(function (doc, win) {
    var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
		document.getElementsByTagName("body")[0].style.opacity="1";
      };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  })(document, window);

$(function(){
	$('input,select,textarea').on('touchstart',function(){
		if($(this).hasClass('menuhides')){}
		else{
			$('.menu a').css('pointer-events','none');}}).focus(function(){
				if($(this).hasClass('menuhides')){}
				else{$('.menu').hide();}}).blur(function(){
					if($(this).hasClass('menuhides')){}
					else{$('.menu').show();$('.menu a').css('pointer-events','auto');}})
	$(document).on('touchmove',function(){$('.menu a').css('pointer-events','auto');})
})



/******************************加载********************************************/

if (typeof jQuery == 'undefined') {}else{
  $(function(){
	var bufferNum=0
	for(var i=0;i<12;i++){
		var deg=-1*30*i+"deg";
		$('#bufferLoad').append($('<div></div>'));
		$('#bufferLoad').children('div').eq(i).css({"transform":"rotate("+deg+")","msTransform":"rotate("+deg+")","webkitTransform":"rotate("+deg+")","mozTransform":"rotate("+deg+")","oTransform":"rotate("+deg+")"});
		}
	setInterval(buffer,50);
	function buffer(){
		var bufferColor=["#333","#444","#555","#666","#777","#888","#999","#aaa"];
		if(bufferNum==12)bufferNum=0;
		for(var i=0;i<12;i++){	
			var bufferColorNum=i-bufferNum;
			if(bufferColorNum<0)bufferColorNum=bufferColorNum+12;
			$('#bufferLoad').children('div').eq(bufferColorNum).css("background-color",bufferColor[i]);		
		}
		bufferNum++;
		}
	})
}