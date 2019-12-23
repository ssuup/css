$(function(){


	// 焦点图
	var top_focus = {
		id: 'scroll_pic_slide',
		right_btn: 'v_right_arrow_btn',
		left_btn: 'v_left_arrow_btn',
		tab_con:'scroll_pic_tab',
		all_width: 0,
		step_num: 692,
		con_width: 1220,
		con_width: 0,
		move_num: 0,
		deviation_num: 0,
		data_length: 0,
		show_num: 0,
		data_arr: [],
		tab_arr: [],
		prev_num: 0,
		next_num: 0,
		animate_time: 500,
		animating: false,
		autoplay: true,
		autoplay_id: 0,
		autoplay_time: 5000,
		responsive: true,
		responsive_id: 0,
		copy: function(){
			var firstHtml,lastHtml;
			firstHtml = this.scroll_pic_con_obj.find('li').first().prop("outerHTML");
			lastHtml = this.scroll_pic_con_obj.find('li').last().prop("outerHTML");
			this.scroll_pic_con_obj.append(firstHtml);
			this.scroll_pic_con_obj.prepend(lastHtml);
			this.data_arr = this.scroll_pic_con_obj.find('li');
		},
		creatTab:function(){
			var html = '';
			for(var i=0;i < this.data_length;i++){
				html += '<i></i>';
			}
			this.scroll_pic_slide_obj.find('.' + this.tab_con).html(html);
			this.tab_arr = this.scroll_pic_slide_obj.find('.' + this.tab_con).find('i');
			this.tab_arr.eq(0).addClass('cur');
		},
		next: function(){
			if(this.show_num < this.data_length){
				this.prev_num = this.show_num;
				this.move_num  =  - this.deviation_num - (this.step_num * this.show_num);
				this.show_num ++;
			}else{
				this.prev_num = this.data_length + 1;
				this.show_num = 1;
				this.move_num = -this.deviation_num;
			}
			this.move(this.move_num);
		},
		prev: function(){
			if(this.show_num > 1){
				this.prev_num = this.show_num;
				this.show_num --;
				this.move_num = - this.deviation_num - (this.step_num * this.show_num) + this.step_num;
			}else{
				this.prev_num = 0;
				this.show_num = this.data_length;
				this.move_num = - this.all_width + this.step_num - this.deviation_num;
			}
			this.move(this.move_num);
		},
		move: function(num){
			var _this = this;
			_this.animating = true;
			_this.tab_arr.removeClass('cur');
			_this.tab_arr.eq(_this.show_num - 1).addClass('cur');
			_this.scroll_pic_con_obj.stop().animate({
				marginLeft: num
			}, _this.animate_time, function(){
				_this.animating = false;
			});
			_this.data_arr.eq(_this.show_num).find('.i_mask').stop().fadeOut(_this.animate_time);
			_this.data_arr.eq(_this.show_num - 1).find('.i_mask').stop().fadeIn(_this.animate_time);
			_this.data_arr.eq(_this.show_num + 1).find('.i_mask').stop().fadeIn(_this.animate_time);
		},
		bindBtn: function(){
			var _this = this;
			_this.scroll_pic_slide_obj.find('.' + _this.right_btn).on('click',function(){
				if(!_this.animating){
					_this.next();
				}
			})

			_this.scroll_pic_slide_obj.find('.' + _this.left_btn).on('click',function(){
				if(!_this.animating){
					_this.prev();
				}
			})

			_this.tab_arr.on('click',function(){
				_this.show_num = _this.tab_arr.index($(this));
				_this.next();
			})

			if(_this.autoplay){
				_this.scroll_pic_slide_obj.on('mouseover',function(){
					clearInterval(_this.autoplay_id);
				})
				_this.scroll_pic_slide_obj.on('mouseout',function(){
					_this.autoplay();
				})
			}
			
		},
		set: function(){
			if($('body').hasClass('body_1280')){
				this.con_width = 1220;
				this.step_num = 692;
			}else if($('body').hasClass('body_1024')){
				this.con_width = 940;
				this.step_num = 538;
			}
			this.scroll_pic_slide_obj = $('#' + this.id);
			this.scroll_pic_con_obj = $('#' + this.id + ' .con');
			this.all_width = this.scroll_pic_con_obj.width();
			this.deviation_num = this.step_num - (this.con_width - this.step_num)/2;
			this.data_length = $('#' + this.id + ' .con li').length;
			this.show_num = 1;
			this.move_num = -this.deviation_num;
			this.scroll_pic_con_obj.css('margin-left', this.move_num);
		},
		reset: function(){
			if($('body').hasClass('body_1280')){
				this.con_width = 1220;
				this.step_num = 692;
			}else if($('body').hasClass('body_1024')){
				this.con_width = 940;
				this.step_num = 538;
			}
			this.all_width = this.scroll_pic_con_obj.width();
			this.deviation_num = this.step_num - (this.con_width - this.step_num)/2;
			this.move_num = - this.deviation_num - (this.step_num * this.show_num) + this.step_num;
			this.scroll_pic_con_obj.css('margin-left', this.move_num);
		},
		autoplay: function(){
			var _this = this;
			_this.autoplay_id = setInterval(function(){
				_this.next();
			},_this.autoplay_time);
		},
		responsive: function(){
			var _this = this;
			$(window).on('resize',function(){
				_this.responsive_id = setTimeout(function(){
					_this.reset();
				},600);
			})
		},
		init: function(){
			this.set();
			this.creatTab();
			this.copy();
			this.data_arr.eq(this.show_num).find('.i_mask').fadeOut(this.animate_time);
			this.autoplay();
			this.bindBtn();
			if(this.responsive){
				this.responsive();
			}
		}
	}

	if($('#scroll_pic_slide').length > 0){
		setTimeout(function(){
			top_focus.init();
		},600)
	}

	// 焦点图
	if($('.dm_focus_pic').length > 0){
		var dmFocusPicObj = $('.dm_focus_pic').slideFocusPlugin({
			arrowBtn:true,
			tabClassName:"focus_pic_tab",
			conClassName:"focus_pic_con",
			leftArrowBtnClass:'v_left_arrow_btn',
  			rightArrowBtnClass:'v_right_arrow_btn', 
			selectClass:'cur',
			funType:'mouseover',
			animateTime:500,
			btnShow: false,
			animateStyle:['fade']
		});
	}
	
	// 焦点图
	if($('.dm_area').length > 0){
		var dmAreaObj = $('.dm_area').slideFocusPlugin({
			autoPlay: false,
			arrowBtn:true,
			tabClassName:'dm_area_tab',
			conClassName:'dm_area_list',
			conChildrenClassName:'dm_area_con',
			leftArrowBtnClass:'v_left_arrow_btn',
  			rightArrowBtnClass:'v_right_arrow_btn', 
			selectClass:'cur',
			stepNum: 502,
			animateTime:500,
		});
	}

	

	if($('.latest_periods').length > 0){
		$('.latest_periods .item_list').mCustomScrollbar({
		    scrollInertia:50,
		    mouseWheelPixels:100
		}).on('mousewheel',function(e){
			e.preventDefault();
		})
	}
	

	var windowWidth,reSizeFunTime,updateScheduleLength = $('.update_schedule .v_scrolling_plugin_x').length,updateScheduleScrollArr = [];

	if(updateScheduleLength > 0){
	    $('.update_schedule .v_scrolling_plugin_x').each(function(i){
			updateScheduleScrollArr[i] = $(this).scrollPlugin({
				leftArrowBtnClass:'v_left_arrow_btn',
				rightArrowBtnClass:'v_right_arrow_btn',
				conChildrenClassName:'v_picTxt',
				scrollConClassName:'v_con_box',
				autoPlay:false,
				stepNum:1240,
				copyNum: 3,
				animateStyle:['left',''], 
				animateTime:500
			});
	    })
	}

	var lookAheadScrollArr = [],lookAheadLength = $('.look_ahead .v_scrolling_plugin_x').length;

	if(lookAheadLength > 0){
		$('.look_ahead .v_scrolling_plugin_x').each(function(i){
			lookAheadScrollArr[i] = $(this).scrollPlugin({
				leftArrowBtnClass:'v_left_arrow_btn',
				rightArrowBtnClass:'v_right_arrow_btn',
				conChildrenClassName:'v_picTxt',
				scrollConClassName:'v_con_box',
				autoPlay:false,
				stepNum:1240,
				copyNum: 3,
				animateStyle:['left',''], 
				animateTime:500
			});
	    })
	}

	$('.js-tab-btn[js-tab-name="update_schedule_tab"]').on('click',function(){
		if( $('.js-tab-con-list[js-tab-name="update_schedule_tab"]').find('.js-tab-con').eq($('.js-tab-btn[js-tab-name="update_schedule_tab"]').index($(this))).hasClass('v_scrolling_plugin_x')){
			updateScheduleScrollArr[$('.update_schedule .v_scrolling_plugin_x').index($('.js-tab-con-list[js-tab-name="update_schedule_tab"]').find('.js-tab-con').eq($('.js-tab-btn[js-tab-name="update_schedule_tab"]').index($(this))))].reinit({});
		}
		
	})

	
	function windowReSize(){
		windowWidth = $(window).width();
		if( windowWidth < 1340){
			if(updateScheduleLength > 0){
				for(var i=0;i<updateScheduleLength;i++){
					updateScheduleScrollArr[i].reinit({
						stepNum:960
					});
				}
		    }
		    if(lookAheadLength > 0){
				for(var i=0;i<lookAheadLength;i++){
					lookAheadScrollArr[i].reinit({
						stepNum:960
					});
				}
		    }
		    if($('.dm_area').length > 0){
		    	dmAreaObj.reinit({
		    		stepNum: 384
		    	})
		    }
		}else if(windowWidth >= 1340){
			if(updateScheduleLength > 0){
				for(var i=0;i<updateScheduleLength;i++){
					updateScheduleScrollArr[i].reinit({
						stepNum:1240
					});
				}
		    }
		    if(lookAheadLength > 0){
				for(var i=0;i<lookAheadLength;i++){
					lookAheadScrollArr[i].reinit({
						stepNum:1240
					});
				}
		    }
		    if($('.dm_area').length > 0){
		    	dmAreaObj.reinit({
		    		stepNum: 502
		    	})
		    }
		}
	}

	function reSizeTimeFun(){
		clearTimeout(reSizeFunTime);
		reSizeFunTime = setTimeout(windowReSize,600);
	}

	$(window).on("resize",reSizeTimeFun);
	reSizeTimeFun();


})


$(function(){

	var change_data,show_num,data_html = '';

	$('.js-change-btn').on('click',function(){
		data_html = '';
		change_data = eval(eval($(this).attr('change-data-name')));
		if(typeof $(this).attr('change-times') == 'undefined' || $(this).attr('change-times') <= 0 ){
			$(this).attr('change-times',change_data.length);
		}
		show_num = parseInt($(this).attr('change-show-num'));
		show_num ++;
		if(show_num == $(this).attr('change-times')){
			show_num = 0;
		}
		$(this).attr('change-show-num',show_num);


		if(typeof $(this).attr('change-data-mod') == 'undefined' || $(this).attr('change-data-mod') == 1){
			data_html += '<div class="col_c"><ul class="v_picTxt v_pic_240_320">' + getLeftPicHtml(change_data[show_num],$(this).attr('change-data-type')) + '</ul></div>';
			data_html += '<div class="col_d"><div class="v_con_box"><ul class="v_picTxt v_pic_120_160 v_limit_width v_limit_height_400 clearfix">' + getRightPicHtml(change_data[show_num],$(this).attr('change-data-type')) + '</ul></div></div>';
		}else if($(this).attr('change-data-mod') == 2){
			data_html += '<div class="col_e"><ul class="v_picTxt v_pic_320_274">' + getPicHtml_intro(change_data[show_num],1,0,$(this).attr('change-data-type')) + '</ul></div>';
			data_html += '<div class="col_f"><div class="v_con_box"><ul class="v_picTxt v_pic_186_104_stable v_limit_width v_limit_height_324_stable clearfix">' + getPicHtml_intro(change_data[show_num],6,1,$(this).attr('change-data-type')) + '</ul></div></div>';
		}else if($(this).attr('change-data-mod') == 3 || $(this).attr('change-data-mod') == 4){
			data_html += '<div class="col_g"><ul class="v_picTxt v_pic_380_320">' + getLeftPicHtml(change_data[show_num],$(this).attr('change-data-type')) + '</ul></div>';
			data_html += '<div class="col_j"><div class="v_con_box"><ul class="v_picTxt v_pic_120_160 v_limit_width v_limit_height_400 clearfix">' + getRightPicHtml(change_data[show_num],$(this).attr('change-data-type')) + '</ul></div></div>';
		}
		else if($(this).attr('change-data-mod') == 5){
			data_html += '<div class="v_con_box"><ul class="v_picTxt v_pic_186_104 v_limit_width v_limit_height_324 clearfix">' + getPicHtml_intro(change_data[show_num],6,0,$(this).attr('change-data-type')) + '</ul></div>';
		}else if($(this).attr('change-data-mod') == 6){
			data_html += '<div class="col_c"><ul class="v_picTxt v_pic_240_320">' + getLeftPicHtml(change_data[show_num],$(this).attr('change-data-type')) + '</ul></div>';
			data_html += '<div class="col_i"><div class="v_con_box"><ul class="v_picTxt v_pic_120_160 v_limit_width v_limit_height_400 clearfix">' + getRightPicHtml(change_data[show_num],$(this).attr('change-data-type')) + '</ul></div></div>';
		}else if($(this).attr('change-data-mod') == 7){
			data_html += '<div class="col_c"><ul class="v_picTxt v_pic_240_220">' + getLeftPicHtml(change_data[show_num],$(this).attr('change-data-type')) + '</ul></div>';
			data_html += '<div class="col_i"><div class="v_con_box"><ul class="v_picTxt v_pic_120_160 v_limit_width v_limit_height_190 clearfix">' + getRightPicHtml(change_data[show_num],$(this).attr('change-data-type')) + '</ul><ul class="v_txtList v_column_7 v_limit_width v_limit_height_129 clearfix">' + getRightPicHtml(change_data[show_num],$(this).attr('change-data-type'),'text') + '</ul></div></div>';
		}else if($(this).attr('change-data-mod') == 8){
			data_html += '<div class="col_g"><ul class="v_picTxt v_pic_380_320">' + getLeftPicHtml(change_data[show_num],$(this).attr('change-data-type')) + '</ul></div>';
			data_html += '<div class="col_h"><div class="v_con_box"><ul class="v_picTxt v_pic_120_160 v_limit_width v_limit_height_400 clearfix">' + getRightPicHtml(change_data[show_num],$(this).attr('change-data-type')) + '</ul></div></div>';
		}else if($(this).attr('change-data-mod') == 9){
			data_html += '<div class="v_con_box"><ul class="v_picTxt v_pic_135_180 v_limit_width v_limit_height_210 left">' + getRightPicHtml(change_data[show_num],$(this).attr('change-data-type')) + '</ul></div>';
		}else if($(this).attr('change-data-mod') == 10){
			data_html += '<div class="v_con_box"><ul class="v_picTxt v_pic_186_104 v_limit_width v_limit_height_324 clearfix">' + getPicHtml_intro(change_data[show_num],12,0,$(this).attr('change-data-type')) + '</ul></div>';
		}



		$('.js-change-con[change-data-name=' + $(this).attr('change-data-name') +']').html(data_html);
		
	})

	function getPicHtml_intro(data,num,start,type){
		var html = '',data_length = 0,start_num = 0;
		
		if(num == 1){
			data_length = 1;
		}else{
			data_length = data.length;
		}
		for(var i=start;i<data_length;i++){
			html += '<li><div class="v_pic"><img src="' + data[i].img + '" alt="' + data[i].showtitle + '" title="' + data[i].showtitle + '"><a href="' + data[i].url + '" class="v_playBtn" target="_blank" ><i></i></a>';
			if(data[i].latest != null){
				html += '<span class="v_bottom_tips"><em>' + data[i].latest + '</em></span>';
			}
			html += '</div><div class="v_txt"><span class="s_tit"><a href="' + data[i].url + '" target="_blank" >' + data[i].showtitle + '</a></span>';
			if(type == 'dy'){
				if(data[0].actor == ''){
					html += '<span class="s_des">&nbsp;';
				}else{
					html += '<span class="s_des">演员：';
					$.each(data[0].actor,function(i,n){
						if(n.url != ''){
							html += '<a href="' + n.url + '" target="_blank">' + n.title + '</a>&nbsp;&nbsp;';
						}else{
							html += '<em>' + n.title + '</em>&nbsp;&nbsp;';
						}
					})
				}
			}else if(type == 'zy'){
				if(data[i].topic != null){
					html += '<span class="s_intro">' + data[i].topic + '</span>';
				}else{
					html += '<span class="s_intro">&nbsp;</span>';
				}
			}else{
				if(data[i].intro != null){
					html += '<span class="s_intro">' + data[i].intro + '</span>';
				}else{
					html += '<span class="s_intro">&nbsp;</span>';
				}
			}
			
			html += '</div></li>';
		}
		return html;
	}

	function getLeftPicHtml(data,type){
		var html = '',data_length = 0;
		if(type == 'dy'){
			html += '<li><div class="v_pic"><img src="' + data[0].img + '" alt="' + data[0].showtitle + '" title="' + data[0].showtitle + '"><a href="' + data[0].url + '" class="v_playBtn" target="_blank" ><i></i></a></div><div class="v_txt"><span class="s_tit_l"><em class="em_tit"><a href="' + data[0].url + '" target="_blank" >' + data[0].showtitle + '</a></em><em class="em_score">' + data[0].score+ '</em></span>';
		}else{
			if(data[0].latest == null){
				html += '<li><div class="v_pic"><img src="' + data[0].img + '" alt="' + data[0].showtitle + '" title="' + data[0].showtitle + '"><a href="' + data[0].url + '" class="v_playBtn" target="_blank" ><i></i></a></div><div class="v_txt"><span class="s_tit_l"><em class="em_tit"><a href="' + data[0].url + '" target="_blank" >' + data[0].showtitle + '</a></em><em class="em_score">' + data[0].score+ '</em></span>';
			}else{
				html += '<li><div class="v_pic"><img src="' + data[0].img + '" alt="' + data[0].showtitle + '" title="' + data[0].showtitle + '"><span class="v_bottom_tips"><em>' + data[0].latest + '</em></span><a href="' + data[0].url + '" class="v_playBtn" target="_blank" ><i></i></a></div><div class="v_txt"><span class="s_tit_l"><em class="em_tit"><a href="' + data[0].url + '" target="_blank" >' + data[0].showtitle + '</a></em><em class="em_score">' + data[0].score+ '</em></span>';
			}
		}

		if(type == 'tv' || type == 'dy'){
			if(data[0].actor == ''){
				html += '<span class="s_des">&nbsp;';
			}else{
				html += '<span class="s_des">演员：';
				$.each(data[0].actor,function(i,n){
					if(n.url != ''){
						html += '<a href="' + n.url + '" target="_blank">' + n.title + '</a>&nbsp;&nbsp;';
					}else{
						html += '<em>' + n.title + '</em>&nbsp;&nbsp;';
					}
				})
			}
			
			html += '</span>';

			if(data[0].director == ''){
				html += '<span class="s_des">&nbsp;';
			}else{
				html += '<span class="s_des">导演：';
				$.each(data[0].director,function(i,n){
					if(n.url != ''){
						html += '<a href="' + n.url + '" target="_blank">' + n.title + '</a>&nbsp;&nbsp;';
					}else{
						html += '<em>' + n.title + '</em>&nbsp;&nbsp;';
					}
				})
			}
			html += '</span>';
			
		}else if(type == 'dm'){

			if(data[0].actor == ''){
				html += '<span class="s_des">&nbsp;';
			}else{
				html += '<span class="s_des">类型：';
				$.each(data[0].type,function(i,n){
					if(n.url != ''){
						html += '<a href="' + n.url + '" target="_blank">' + n.title + '</a>&nbsp;&nbsp;';
					}else{
						html += '<em>' + n.title + '</em>&nbsp;&nbsp;';
					}
				})
			}
			
			html += '</span>';

			if(data[0].actor == ''){
				html += '<span class="s_des">&nbsp;';
			}else{
				html += '<span class="s_des">地区：';
				$.each(data[0].region,function(i,n){
					if(n.url != ''){
						html += '<a href="' + n.url + '" target="_blank">' + n.title + '</a>&nbsp;&nbsp;';
					}else{
						html += '<em>' + n.title + '</em>&nbsp;&nbsp;';
					}
				})
			}
			
			html += '</span>';
		}else if(type == 'zy'){

			if(data[0].actor == ''){
				html += '<span class="s_des">&nbsp;';
			}else{
				html += '<span class="s_des">主持人：';
				$.each(data[0].actor,function(i,n){
					if(n.url != ''){
						html += '<a href="' + n.url + '" target="_blank">' + n.title + '</a>&nbsp;&nbsp;';
					}else{
						html += '<em>' + n.title + '</em>&nbsp;&nbsp;';
					}
				})
			}
			
			html += '</span>';

			if(data[0].type == ''){
				html += '<span class="s_des">&nbsp;';
			}else{
				html += '<span class="s_des">类型：';
				$.each(data[0].type,function(i,n){
					if(n.url != ''){
						html += '<a href="' + n.url + '" target="_blank">' + n.title + '</a>&nbsp;&nbsp;';
					}else{
						html += '<em>' + n.title + '</em>&nbsp;&nbsp;';
					}
				})
			}
			
			html += '</span>';
			
		}

		html += '</div></li>';
		return html;
	}

	function getRightPicHtml(data,type,style){
		var html = '',data_length = 0;
		data_length = data.length;
		if(style == 'text'){
			for(var i=8;i<data_length;i++){
				html += '<li><a href="' + data[i].url + '" target="_blank" alt="' + data[i].showtitle + '" title="' + data[i].showtitle + '" >' + data[i].showtitle + '</a></li>';
			}
		}else{
			// if(type == 'dy'){
			// 	for(var i=1;i<data_length;i++){
			// 		html += '<li><div class="v_pic"><img src="' + data[i].img + '" alt="' + data[i].showtitle + '" title="' + data[i].showtitle + '"><span class="v_bottom_tips"><em>' + data[i].latest + '</em></span><a href="' + data[i].url + '" class="v_playBtn" target="_blank" ><i></i></a></div><div class="v_txt"><span class="s_tit"><a href="' + data[i].url + '" target="_blank" >' + data[i].showtitle + '</a></span></div></li>';
			// 	}
			// }else{
				
			// }
			for(var i=1;i<data_length;i++){
				if(data[i].latest == null){
					html += '<li><div class="v_pic"><img src="' + data[i].img + '" alt="' + data[i].showtitle + '" title="' + data[i].showtitle + '"><a href="' + data[i].url + '" class="v_playBtn" target="_blank" ><i></i></a></div><div class="v_txt"><span class="s_tit"><a href="' + data[i].url + '" target="_blank" >' + data[i].showtitle + '</a></span></div></li>';
				}else{
					html += '<li><div class="v_pic"><img src="' + data[i].img + '" alt="' + data[i].showtitle + '" title="' + data[i].showtitle + '"><span class="v_bottom_tips"><em>' + data[i].latest + '</em></span><a href="' + data[i].url + '" class="v_playBtn" target="_blank" ><i></i></a></div><div class="v_txt"><span class="s_tit"><a href="' + data[i].url + '" target="_blank" >' + data[i].showtitle + '</a></span></div></li>';
				}
				
			}
		}
		
		return html;
	}

})