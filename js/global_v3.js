$(function(){
	// $('.header .search_input input').on('focus',function(){
	// 	$(this).parents('.header_search').addClass('header_search_focus');
	// })

	// $('.header .search_input').on('blur',function(){
	// 	$(this).parents('.header_search').addClass('header_search_focus');
	// })

	$.jsTab();

	$.jsInitPop();

	$.jsReSetLazyload();

	$.jsMore();

	$.jsInitPopTips();

	$('textarea').flexText();

	$('.js-part-all-show-btn').on('click',function(){
		$(this).hide().siblings('.js-part-all-hide-btn').show().siblings('.js-part').hide().siblings('.js-all').show();
	})

	$('.js-part-all-hide-btn').on('click',function(){
		$(this).hide().siblings('.js-part-all-show-btn').show().siblings('.js-all').hide().siblings('.js-part').show();
	})

	// 表单焦点
	// $("input[type=text],textarea").on("focus",function(){
	// 	if(typeof $(this).attr("defaultTxt") == 'undefined' || $(this).val() == $(this).attr("defaultTxt")){
	// 		$(this).val("");
	// 		$(this).css({"color":"#222"});
	// 	}
	// })
	// $("input[type=text],textarea").on("blur",function(){
	// 	if($(this).val() == ""){
	// 		if(typeof $(this).attr("defaultTxt") != 'undefined'){
	// 			$(this).val($(this).attr("defaultTxt"));
	// 		}
	// 		$(this).css({"color":"#999"});
	// 	}
	// })
	// 表单焦点


	if($('.v_rightFixed').length > 0){
		
		var v_rightFixed = $('.v_rightFixed'),anchor_point_tab = $('.v_rightFixed a[anchor-point-tab]'),anchor_point_top_arr = [],anchor_point_index = -1,anchor_point_length;
		v_rightFixed.css('margin-top',- v_rightFixed.height()/2);
		$('div[anchor-point-con]').each(function(i){
			anchor_point_top_arr.push($(this).offset().top - 80);
		})
		anchor_point_length = anchor_point_top_arr.length;
		$(window).on('scroll',function(){
			init();
		})
		function setAnchorPoint(){
			$.each(anchor_point_top_arr,function(i,n){
				if(n >= $(window).scrollTop()){
					anchor_point_index = i;
					return false;
				}else{
					anchor_point_index = anchor_point_length;
				}
			})
			anchor_point_index = anchor_point_index - 1;
			if(anchor_point_index >= 0){
				anchor_point_tab.removeClass('cur');
				anchor_point_tab.eq(anchor_point_index).addClass('cur');
			}else{
				anchor_point_tab.removeClass('cur');
			}
		}

		anchor_point_tab.on('click',function(){
			$(window).scrollTop(anchor_point_top_arr[anchor_point_tab.index($(this))] + 10);
		})

		$('.v_rightFixed .a_gotoTop').on('click',function(){
			$(window).scrollTop(0);
		})

		function init(){
			if($(window).scrollTop() > 300){
				v_rightFixed.fadeIn(200);
			}else{
				v_rightFixed.fadeOut(200);
			}
			setAnchorPoint();
		}

		init();
		

	}

})