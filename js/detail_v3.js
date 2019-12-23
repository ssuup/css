$(function(){

	if($('#synopsis_txt').length > 0){
		$('#synopsis_txt .a_showAll').on('click',function(){
			$('#synopsis_txt').addClass('show');
		})
		$('#synopsis_txt .a_hideAll').on('click',function(){
			$('#synopsis_txt').removeClass('show');
		})
	}
	
	$('.js-addFavorite').on('click',function(){
		addFavorite2();
	})

	if($('#right_scroll_box').length > 0){
		$('#right_scroll_box').mCustomScrollbar({
		    scrollInertia:50,
		    mouseWheelPixels:100
		}).on('mousewheel',function(e){
			e.preventDefault();
		})
	}

	$('body').on('click', '.select_list_arrow', function(){
		if($(this).parent('.p_list').hasClass('more')){
			$(this).parent('.p_list').removeClass('more');
		}else{
			$(this).parent('.p_list').addClass('more');
		}
	})

	function addFavorite2() {
	    var url = window.location;
	    var title = document.title;
	    var ua = navigator.userAgent.toLowerCase();
	    if (ua.indexOf('360se') > -1) {
	        alert('由于360浏览器功能限制，请按 Ctrl+D 手动收藏！');
	    }else if (ua.indexOf('msie 8') > -1) {
	    	try{
				window.external.AddToFavoritesBar(url, title);
			}catch(e){
				alert('加入收藏失败，请使用Ctrl+D进行添加!');
			}
	    }else if (document.all) {
			try{
				window.external.addFavorite(url, title);
			}catch(e){
				alert('加入收藏失败，请使用Ctrl+D进行添加!');
			}
	    }else if (window.sidebar) {
	    	try { 
				window.sidebar.addPanel(title, url, '');
			} catch(e) { 
				alert('加入收藏失败，请使用Ctrl+D进行添加');
			} 
	    }else {
			alert('加入收藏失败，请使用Ctrl+D进行添加!');
	    }
	}

	$('.detail_play_box').on('click','a[data-href]',function(){
		if($(this).attr('data-href') != ''){
			$(this).attr({'href': $(this).attr('data-href'), 'target' : '_blank'});
		}
	})


})