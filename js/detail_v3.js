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
	        alert('����360������������ƣ��밴 Ctrl+D �ֶ��ղأ�');
	    }else if (ua.indexOf('msie 8') > -1) {
	    	try{
				window.external.AddToFavoritesBar(url, title);
			}catch(e){
				alert('�����ղ�ʧ�ܣ���ʹ��Ctrl+D�������!');
			}
	    }else if (document.all) {
			try{
				window.external.addFavorite(url, title);
			}catch(e){
				alert('�����ղ�ʧ�ܣ���ʹ��Ctrl+D�������!');
			}
	    }else if (window.sidebar) {
	    	try { 
				window.sidebar.addPanel(title, url, '');
			} catch(e) { 
				alert('�����ղ�ʧ�ܣ���ʹ��Ctrl+D�������');
			} 
	    }else {
			alert('�����ղ�ʧ�ܣ���ʹ��Ctrl+D�������!');
	    }
	}

	$('.detail_play_box').on('click','a[data-href]',function(){
		if($(this).attr('data-href') != ''){
			$(this).attr({'href': $(this).attr('data-href'), 'target' : '_blank'});
		}
	})


})