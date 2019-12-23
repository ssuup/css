var sendMessage = {
    phoneNum : 'phoneNum',
    phoneError : 'phoneError',
    identifyCode : 'identifyCode',
    i_captcha : 'i_captcha',
    i_captcha_change : 'i_captcha_change',
    phoneMsg : 'phoneMsg',
    sendFree : 'sendFree',
    init : function(){
        var _self = this;
        $('#' + _self.i_captcha_change).click(function(){
            _self.changeCatpcha();
        });
        $("#" + _self.phoneNum).keyup(function(){
            _self.checkPhone();
        });
        $("#" + _self.identifyCode).keyup(function(){
            _self.checkCode();
        });
        $("#" + _self.sendFree).click(function(){
            if(_self.checkPhone() && _self.checkCode()){
                _self.sendSmsCode();
                _self.sendSms();
            }
        });
        this.changeCatpcha();
    },
    changeCatpcha : function(){
        var time = (new Date()).getTime();
        var captchaURL = 'http://v.km.com/moviecore/server/common/randCaptcha.php?' + time;
        $('#' + this.i_captcha).attr({'src' : captchaURL});
        if(window.event) window.event.returnValue = false;
    },
    showPhoneError : function(msg){
        $('#' + this.phoneError).html(msg);
    },
    hidePhoneError : function(){
        $('#' + this.phoneError).html('');
    },
    showCodeError : function(msg){
        $('#' + this.phoneMsg).html(msg);
    },
    hideCodeError : function(){
        $('#' + this.phoneMsg).html('');
    },
    checkPhone : function(){
        var pNum = $("#" + this.phoneNum).val();
        var len = pNum.length;
        if(pNum && len == 11){
            var reg = /^1[3|4|5|7|8]\d{9}$/;
            if(reg.test(pNum)) {
                this.hidePhoneError();
                return true; 
            }else{
                this.showPhoneError('请输入正确的手机号！');
                return false;
            }
        }else{
            this.showPhoneError('请输入正确的手机号！');
            return false;
        }
    },
    checkCode : function(){
        var captcha = $("#" + this.identifyCode).val(); 
        var reg = /^[0-9a-zA-Z]{1,6}$/;
        if(reg.test(captcha)) {
            this.hideCodeError();
            return true; 
        }else{
            this.showCodeError('验证码错误！');
            return false;
        }
    },
    sendSmsCode : function(){
        $.get('/moviecore/server/sms/index.php');
    },
    sendSms : function(){
        var pNum = $("#" + this.phoneNum).val();
        var captcha = $("#" + this.identifyCode).val(); 
        var _self = this;
        $.post('/moviecore/server/sms/index.php?act=appDownLoad', {'phone' : pNum, 'captcha' : captcha}, function(data){
            if(data){
                _self.hideCodeError();
                _self.hidePhoneError();
                var dataSplit = data.split('|');
                if(parseInt(dataSplit[0]) == 1){
                    _self.changeCatpcha();
                    _self.showCodeError('<em>发送成功！</em>');
                }else{
                    _self.showCodeError(dataSplit[1]);
                }
            }
        });    
    }
};
$(function(){
    sendMessage.init();
});


