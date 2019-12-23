var ys_setMedia = {
    setBodyTimeId:0,
    windowWidth:0,
    init:function(){
        var _self = this;
        _self.setBody();
        setBodyTimeId = setTimeout(function(){},10);
        $(window).bind('resize',function(){
            _self.setBodyTime();
        });
    },
    setBody:function(){
        windowWidth = $(window).width();
        if(windowWidth >= 1340){
            if(!$('body').hasClass('body_1280')){
                $('body').removeClass('body_1024').addClass('body_1280');
            }
        }else if(windowWidth < 1340){
            if(!$('body').hasClass('body_1024')){
                $('body').removeClass('body_1280').addClass('body_1024');
            }
        }
    },
    setBodyTime:function(){
        clearTimeout(setBodyTimeId); 
        setBodyTimeId = setTimeout(this.setBody,500);
    }

}
ys_setMedia.init();