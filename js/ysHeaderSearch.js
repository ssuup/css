var g_ys_header_search = {
	searchId: 'js-header-search',
	searchMoreId: 'js-search-more',
	searchFormAction: 'js-search-form-action',
	searchFormInput: 'js-search-input',
	defaultSearchWord: '',
	delayTime: 200,
	recommendRankAjax: '',
	searchRecordWords: [],
	searchUrl: '//www.supdy.com/index.php?s=vod-search-wd-',
	init: function(){
		this.searchObj = $('#' + this.searchId);
		this.fromActionObj = $('#' + this.searchId + ' .' + this.searchFormAction);
		this.searchInputObj = $('#' + this.searchId + ' .' + this.searchFormInput);
		this.searchMoreObj = $('#' + this.searchMoreId);
		this.setNoValueHtml();
		this.setFormActionTarget();
		this.bindEvent();
	},
	setLocalStorage: function(keyword){      // 设置本地搜索历史
		if(keyword == ''){
			return false;
		}else{
			keyword = this.filter(keyword);
		}
		if(store.get('j-front-data-search-record-word')){
			this.searchRecordWords = store.get('j-front-data-search-record-word').split(',');
			if($.inArray(keyword,this.searchRecordWords) < 0){
				this.searchRecordWords.unshift(keyword);
			}
		}else{
			this.searchRecordWords.push(keyword);
		}
		
		if(this.searchRecordWords.length > 4){
			this.searchRecordWords.pop();
		}
		store.set('j-front-data-search-record-word',this.searchRecordWords.toString());
		
	},
	setNoValueHtml: function(){		// 无搜索词显示历史和推荐数据
		var _data = '', _html = '', _this = this;
		_html = '<div class="search_more_con">';

		if(store.get('j-front-data-search-record-word') && store.get('j-front-data-search-record-word').length > 0){
			_data = store.get('j-front-data-search-record-word').split(',');
			_html += '<dl class="search_data_box js-search-record-list">';
			_html += '<dt><h3>搜索历史</h3><a href="javascript:void(0);" class="clear_search_record_btn js-clear-search-record-btn">清除历史</a></dt>';
			_html += '<ul class="search_record_list clearfix">';
			$.each(_data, function(i,n){
				_html += '<li data-search-word="' + n + '"><a href="javascript:void(0);">' + n + '</a></li>';
			})
			_html += '</ul>';
			_html += '</dd>';
			_html += '</dl>';
		}

		_html += '<dl class="search_data_box">';
		_html += '<dt><h3>热门推荐</h3></dt>';
		_html += '<dd>';
		_html += '<ul class="v_rank clearfix">';

		$.getJSON('http://v.km.com/moviecore/server/search/index.php?ctl=hotSearch&act=index&time=', function(data){

			// 设置默认词
			if(data.info.default){
				_this.defaultSearchWord = data.info.default;
				_this.searchInputObj.val(_this.defaultSearchWord);
			}

			// 设置推荐搜索
			$.each(data.info.keyWord,function(i,n){
				_html += '<li data-search-word="' + n.title + '">';
				_html += '<a href="javascript:void(0);" >';
				if(i == 1){
					_html += '<i class="i_rank_num i_first">' + i + '</i>';
				}else if(i == 2){
					_html += '<i class="i_rank_num i_second">' + i + '</i>';
				}else if(i == 3){
					_html += '<i class="i_rank_num i_third">' + i + '</i>';
				}else{
					_html += '<i class="i_rank_num">' + i + '</i>'
				}
				_html += '<span class="s_tit">' + n.title + '</span>';
				_html += '</a></li>';
			})
			_html += '</ul>';
			_html += '</dd>';
			_html += '</dl>';
		 _html += '</div>';
		 $('#' + _this.searchMoreId).html(_html);
		});
		
	},
	filter : function(keyword){
		var limited = ['_','<','>','[',']','{','}','`','!',';','|','；',':','：','-','$','《','》','#','.',',','，','‘','’','"',"'","~","@","$","%","^","&","*","/","+","=","?"];
		var limit_count=limited.length;
		for(var i=0;i<limit_count;i++){
			keyword = keyword.replace(eval('/\\'+limited[i]+'/ig'), '');
		}
		return keyword;
	},
	setFormActionTarget: function(){		// 设置search表单提交后打开方式
		if(window.location.toString().indexOf('/so_') == -1){
			this.fromActionObj.attr('target','_blank');
		}else{			
			this.fromActionObj.attr('target','_self');
		}
	},
	searchSubmit: function(word){			// 提交search表单
		this.fromActionObj.attr('action',this.searchUrl + this.filter(word));
		this.setLocalStorage(word);
		this.fromActionObj.submit();
	},
	bindEvent: function(){

		var _this = this;

		// 清空搜索记录
		_this.searchObj.on('click','.js-clear-search-record-btn',function(){
			store.remove('j-front-data-search-record-word');
			$(this).parents('.js-search-record-list').eq(0).remove();
		})
		// 清空搜索记录

		// 输入框
		_this.searchObj.on('focus','.js-search-input',function(){
			if($(this).val() == _this.defaultSearchWord || $(this).val() == ''){
				$(this).val('');
			}
			_this.searchMoreObj.css('display','block');
		})

		// _this.searchObj.on('focus','.js-search-input',function(){
		// 	if($(this).val() == _this.defaultSearchWord || $(this).val() == ''){
		// 		$(this).val('');
		// 		_this.searchMoreObj.css('display','block');
		// 	}else{
		// 		_this.searchMoreObj.css('display','none');
		// 	}
		// })

		// _this.searchObj.on('keyup','.js-search-input',function(e){
		// 	if($(this).val() == ''){
		// 		_this.searchMoreObj.css('display','block');
		// 	}else{
		// 		_this.searchMoreObj.css('display','none');
		// 	}
		// })

		_this.searchObj.on('keydown','.js-search-input',function(e){
			if(e.which == 13){
				_this.searchSubmit(_this.searchInputObj.val());
            }
		})

		_this.searchObj.on('blur','.js-search-input',function(){
			if($(this).val() == ''){
				$(this).val(_this.defaultSearchWord);
			}
		})
		// 输入框

		// 点击搜索按钮
		_this.searchObj.on('click','.js-search-btn',function(){
			_this.searchSubmit(_this.searchInputObj.val());
		})

		// 点击搜索历史
		_this.searchObj.on('click','li[data-search-word]',function(){
			_this.searchSubmit($(this).attr('data-search-word'));
		})
		
		_this.searchObj.on('click',function(event){
			event.stopPropagation();
		})

		$('body').on('click',function(){
			_this.searchMoreObj.css('display','none');
		})

	}
}

$(function(){
	g_ys_header_search.init();
})
