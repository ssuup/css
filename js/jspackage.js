(function ($) {
    $.extend($, {
        jsShowPop: function (showPopName) {         //  显示弹窗
            $('.js-pop').removeClass('v_pop_transition');
            $('.js-pop-mask').fadeIn(300);
            $('.js-pop[pop-name="' + showPopName + '"]').css('margin-top',-($('.js-pop[pop-name="' + showPopName + '"]').height()/2));
            $('.js-pop[pop-name="' + showPopName + '"]').addClass('v_pop_transition');
        },
        jsHidePop: function (hidePopName) {                //  关闭弹窗
            $('.js-pop[pop-name="' + hidePopName + '"]').removeClass('v_pop_transition');
            $('.js-pop-mask').fadeOut(500);
        },
        jsInitPop: function () {                  //  初始化弹窗
            $('.js-pop-show-btn').on('click', function () {
                $.jsShowPop($(this).attr('pop-name'));
                return false;
            });
            $('.js-pop-hide-btn').on('click', function () {
                $.jsHidePop($(this).attr('pop-name'));
                return false;
            });
        },
        jsPopTips:function(popTipsName){
            $('.js-pop-tips[pop-tips-name=' + popTipsName + ']').css({'margin-top': - parseInt($('.js-pop-tips[pop-tips-name=' + popTipsName + ']').height()/2),'margin-left': - parseInt($('.js-pop-tips[pop-tips-name=' + popTipsName + ']').width()/2)})
            $('.js-pop-tips').stop().hide();
            $('.js-pop-tips[pop-tips-name=' + popTipsName + ']').stop().fadeIn(500).delay(1500).fadeOut(500);
        },
        jsInitPopTips:function(){
            $('.js-pop-tips-btn').on('click', function () {
                $.jsPopTips($(this).attr('pop-tips-name'));
                return false;
            });
        },
        jsTab: function(){
            var _index,_name;
            $('.js-tab-btn').on('click',function(){
                if(!$(this).hasClass('cur')){
                    _index = $('.js-tab-btn[js-tab-name='+ $(this).attr('js-tab-name') + ']').index($(this));
                    _name = $(this).attr('js-tab-name');
                    $('.js-tab-btn[js-tab-name='+ _name + ']').removeClass('cur');
                    $(this).addClass('cur');
                    $('.js-tab-con-list[js-tab-name='+ _name + ']').each(function(i){
                        $.jsShowLazyload($('.js-tab-con-list[js-tab-name='+ _name + ']').eq(i).find('.js-tab-con').eq(_index));
                        $('.js-tab-con-list[js-tab-name='+ _name + ']').eq(i).find('.js-tab-con').css('display','none');
                        $('.js-tab-con-list[js-tab-name='+ _name + ']').eq(i).find('.js-tab-con').eq(_index).css('display','block');
                    })
                }
              
            })
        },
        jsReSetLazyload: function(){
            $("img[data-src]").lazyload({
                effect : "fadeIn",
                threshold : 600
            }); 
        },
        jsShowLazyload: function(obj){
            obj.find("img[data-src]").each(function(){
                if($(this).attr("src") != $(this).attr("data-src")){
                    $(this).attr("src",$(this).attr("data-src"));
                }
            })
        },
        jsMore: function(className){
            var timeId;
            $('.js-more').on("mouseover",function(){
                clearTimeout(timeId);
                $(this).find('.js-more-data').fadeIn(300);
            })

            $('.js-more').on("mouseout",function(){
                var _this = $(this);
                timeId = setTimeout(function(){
                    _this.find('.js-more-data').stop().fadeOut(300);
                },10)
            })
        }
    });
})(jQuery);

!function ($) {

  "use strict"; // jshint ;_;


  // input 添加Placeholder方法
  var hasPlaceholderSupport = function(){
      var attr = "placeholder";
      var input = document.createElement("input");
      return attr in input;
  }
  var support = hasPlaceholderSupport();
  if(!support){
      $("input[placeholder]").each(function(index) {
          var _this = $(this);
          if(_this.val() == ''){
              _this.val(_this.attr('placeholder')).addClass('placeholder');
          }
          _this.bind({
              focus: function(){
                  if(($(this).val() == $(this).attr('placeholder')) && ($(this).hasClass('placeholder'))){
                      $(this).val('').removeClass('placeholder');
                  }else{
                      return;
                  }
              },
              blur: function(){
                  if($(this).val() == ''){
                      $(this).val($(this).attr('placeholder')).addClass('placeholder');
                  }else{
                      return;
                  }
              }
          })
      });
    }

}(window.jQuery);

(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "src",
            skip_invisible  : true,
            appear          : null,
            load            : null,
            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);


 ;(function(b){function a(c){this.$textarea=b(c);this._init()}a.prototype={_init:function(){var c=this;this.$textarea.wrap('<div class="flex-text-wrap" />').before("<pre><span /><br /></pre>");this.$span=this.$textarea.prev().find("span");this.$textarea.on("input propertychange keyup change",function(){c._mirror()});b.valHooks.textarea={get:function(d){return d.value.replace(/\r?\n/g,"\r\n")}};this._mirror()},_mirror:function(){this.$span.text(this.$textarea.val())}};b.fn.flexText=function(){return this.each(function(){if(!b.data(this,"flexText")){b.data(this,"flexText",new a(this))}})}})(jQuery);