var dramaControl = {
	init : function() {
		this.regEvent();
	},
	regEvent : function() {
		/*
			注册一些页面监听事件
		*/
		this.regKeyDown();
		this.regDramaClick();
	},
	regDramaClick : function() {
		/*
			注册剧情列表的展开和收起事件
		*/
		var showAllDrama = '#showAllDrama';
		if(!$(showAllDrama)[0]) return;
		var hideAllDrama = '#hideAllDrama';
		var dramaList = '#drama-list';
		$(showAllDrama).click(function(){
			$(dramaList).find('span').each(function(){
				if(typeof $(this).attr('data-flag') == 'string'){
                    $(this).show();
				}
			});
            $(showAllDrama).hide();
            $(hideAllDrama).show();
		});
        $(hideAllDrama).click(function(){
            $(dramaList).find('span').each(function(){
				if($(this).attr('data-flag') == '1'){
                    $(this).hide();
				}
			});
            $(showAllDrama).show();
            $(hideAllDrama).hide();
		});
	},
	regKeyDown : function() {
		/*
			注册键盘左右键翻剧情
		*/

        $(document).ready(function(){
            var prevpage=$("#aPrev").attr("href");
            var nextpage=$("#aNext").attr("href");
            $(document).keydown(function(event){
                if(event.keyCode==37 && prevpage!=undefined) location=prevpage;
                if(event.keyCode==39 && nextpage!=undefined) location=nextpage;

            });
        });
	}
};
var actorControl = {
    init : function() {
        this.regEvent();
    },
    regEvent : function() {
        /*
         注册一些页面监听事件
         */
        this.regActorClick();
    },
    regActorClick : function() {
        /*
         注册剧情列表的展开和收起事件
         */
        var showAllDrama = '#showAllActor';
        if(!$(showAllDrama)[0]) return;
        var hideAllDrama = '#hideAllActor';
        var dramaList = '#all-actor';
        $(showAllDrama).click(function(){
            $(dramaList).find('li').each(function(){
                $(this).show();
            });
            $(showAllDrama).hide();
            $(hideAllDrama).show();
        });
        $(hideAllDrama).click(function(){
            $(dramaList).find('li').each(function(){
                if($(this).attr('data-flag') == '1'){
                    $(this).hide();
                }
            });
            $(showAllDrama).show();
            $(hideAllDrama).hide();
            window.scroll(0,0);
        });
    }
};

var anchorAnimation = {
    animationId : 'iLiBg_',
    anchorName  : 'anchorToDesp',
    lastOpacity : '',
    init : function(){
        var theAnchors = $('.anchorToDesp'), showDesp = $('.showDesp'), hideDesp = $('.hideDesp'), _self = this;
        //if(theAnchors.length <= 0) return;
        theAnchors.each(function(){
            $(this).click(function(){
                _self.fadeOut(_self.animationId + $(this).attr('data-id'));
            });
        });
        if(showDesp.length <= 0) return;
        showDesp.each(function(){
            $(this).click(function(){
                $('#show-desp-' + $(this).attr('data-id')).hide();
                $('#hide-desp-' + $(this).attr('data-id')).show();
            });
        });
        hideDesp.each(function(){
            $(this).click(function(){
                $('#show-desp-' + $(this).attr('data-id')).show();
                $('#hide-desp-' + $(this).attr('data-id')).hide();
            });
        });
    },
    fadeOut : function(obj){
        if(this.lastOpacity) $(this.lastOpacity).removeClass('cur');
        this.lastOpacity = obj;
        $(obj).addClass('cur').css({'scrollTop' : Math.ceil($(obj).getOffset().top - $(window).height()/2 + 150)});
    }
};
actorControl.init();
anchorAnimation.init();
dramaControl.init();