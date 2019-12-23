$(function(){
	var reSizeFunTime,seriesListObj;
	$('.search_result').on('click','.p_intro .a_showAll',function(){
		$(this).parent('.p_intro').addClass('show');
	})
	$('.search_result').on('click','.p_intro .a_hideAll',function(){
		$(this).parent('.p_intro').removeClass('show');
	})

	if($('.series_list .v_scrolling_plugin_x').length > 0){
		setSeriesList();
	}

	function setSeriesList(){
		seriesListObj = $('.series_list .v_scrolling_plugin_x').scrollPlugin({
			leftArrowBtnClass:'v_left_arrow_btn',
			rightArrowBtnClass:'v_right_arrow_btn',
			conChildrenClassName:'v_picTxt',
			scrollConClassName:'v_con_box',
			autoPlay:false,
			stepNum:960,
			copyNum: 3,
			animateStyle:['left',''], 
			animateTime:500
		});
	}

	function windowReSize(){
		windowWidth = $(window).width();
		if( windowWidth < 1340){
		    if(typeof seriesListObj == 'object'){
		    	seriesListObj.reinit({
					stepNum:680
				});
		    }
		}else if(windowWidth >= 1340){
		    if(typeof seriesListObj == 'object'){
		    	seriesListObj.reinit({
					stepNum:960
				});
		    }
		}
	}

	function reSizeTimeFun(){
		clearTimeout(reSizeFunTime);
		reSizeFunTime = setTimeout(windowReSize,600);
	}

	$(window).on("resize",reSizeTimeFun);
	reSizeTimeFun();



	var searchResult = {
		searchUrl:'http://v.km.com/moviecore/server/search/index.php?ctl=search',
		page : 1,
		init : function(){
			var _self = this;
			if($('#searchPage')[0]){
				$('.ajaxSearch').each(function(){
					$(this).click(function(){
						_self.getAjaxSearch(this);					
					});
				});
			}
		},
		getAjaxSearch : function(obj){
			var oldPage = this.page;
			this.page = $(obj).attr('page');
			if(parseInt(this.page) == parseInt(oldPage) || parseInt(this.page) > parseInt(pageConfig.totalPage))
			{
				return false;
			}
			var _self = this;
			$.getJSON(_self.searchUrl + "&type=" + encodeURIComponent(pageConfig.type) + "&q=" + encodeURIComponent(pageConfig.word) + "&act=getAjaxSearch&jqueryCallback=?&page=" + _self.page + '&' + new Date().getTime(), function(json){
				if(json.status == 'success'){
					$('#resultList').html(json.html);
					_self.init();
					$(window).scrollTop(0);
					seriesListObj = '';
					setSeriesList();
				}
			});
		}
	};
	searchResult.init();
		

})