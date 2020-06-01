var App = {
    stickyHeight: 0,
    stickyTop: 0,
    stickyPreviousHeight: 0,
    sticky: function() {
        if (!$(".sticky").length) {
            return;
        }
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 0 && scrollTop >= App.stickyTop) {
            $(".sticky").addClass("fixed").addClass("scroll");
            if (!$(".sticky").hasClass("perma")) {
                $("body").css("padding-top", App.stickyHeight);
            }
        } else {
            $(".sticky").removeClass("scroll");
            if (!$(".sticky").hasClass("perma")) {
                $(".sticky").removeClass("fixed");
                $("body").css("padding-top", 0);
            }
        }
    },
    init: function() {
        $(".product-counter").productCounter({
            min: 357,
            max: 785,
            minTimeout: 2500,
            expire: 2700000
        });
        if ($(".sticky").length) {
            $(window).scroll(function() {
                App.sticky();
            });
        }
        $(".scroll-to-top").click(function() {
            App.scrollTo(0);
        });
        App.toggleScrollTop();
        $(window).scroll(function() {
            App.toggleScrollTop();
        });
        $(".product").click(function() {
            if (!$(".custom-option", $(this)).length) {
                $(this).addClass("selected");
            }
            var $siblings = $(this).siblings(".product");
            $siblings.removeClass("selected");
            $siblings.find(".custom-option").val("");
            $(this).parents(".checkout-form").find("[name='product_id[]']").attr("checked", false);
            $(this).parents(".checkout-form").find("[name='urun']").attr("checked", false);
            $(this).find("[name='product_id[]']").attr("checked", true);
            $(this).find("[name='urun']").attr("checked", true);
        });
        $(".checkout-form .custom-option").on("change", function() {
            var $this = $(this);
            var $container = $this.parents(".product");
            var optionSelected = 0;
            var $options = $container.find(".custom-option");
            var $siblings = $container.siblings(".product");
            $siblings.find(".custom-option").val("");
            $siblings.removeClass("selected");
            $options.each(function() {
                if ($(this).val().replace(/\s+/g, "") !== "") {
                    optionSelected++;
                }
            });
            $container.removeClass("selected");
            $(this).parents(".checkout-form").find("[name='product_id[]']").attr("checked", false);
            if ($options.length == optionSelected) {
                $container.addClass("selected");
                $container.find("[name='product_id[]']").attr("checked", true);


            }
            $(this).parents(".checkout-form").find("[name='urun']").attr("checked", false);
            if ($options.length == optionSelected) {
                $container.addClass("selected");
                $container.find("[name='urun']").attr("checked", true);
            }
        });
        $(".button-select-product").click(function() {
            var $this = $(this);
            var $container = $this.parents(".product");
            var $options = $container.find(".custom-option");
            if ($options.length) {
                var optionSelected = 0;
                var optionName = '';
                $options.each(function() {
                    if ($(this).val().replace(/\s+/g, "") !== "") {
                        optionSelected++;
                    } else {
                        optionName = $(this).data("option-name");
                    }
                });
                if ($options.length != optionSelected) {
                    var message = "Lütfen seçim yapınız!";
                    if (optionName) {
                        message = "Lütfen " + optionName + " seçiniz!";
                    }
                    smartCheckout.blockUI(message);
                    return false;
                }
            }
            $container.addClass("selected");
            var $siblings = $container.siblings(".product");
            $siblings.find(".custom-option").val("");
            $siblings.removeClass("selected");
            $(this).parents(".checkout-form").find("[name='product_id[]']").attr("checked", false);
            $(this).parents(".checkout-form").find("[name='urun']").attr("checked", false);
            $container.find("[name='product_id[]']").attr("checked", true);
            $container.find("[name='urun']").attr("checked", true);
        });
        /*
        $(".modal").on("show.bs.modal", function() {
            var headerWrapperLeft = (parseFloat(App.getScrollbarWidth()) / 2) * -1;
            $("#header .wrapper").css("left", headerWrapperLeft);
        });
        $(".modal").on("hide.bs.modal", function() {
            $("#header .wrapper").css("left", 0);
        });
        */
        $(".product .options label").click(function() {
            $(this).parents(".options").find("label").removeClass("selected");
            $(this).addClass("selected");
        });
    },
    initSticky: function() {
        if ($(".sticky:first").length) {
            App.stickyHeight = parseFloat($(".sticky:first").height());
            App.stickyTop = $(".sticky:first").offset().top;
            var $sticky = $(".sticky:first");
            App.stickyHeight = parseFloat($sticky.height());
            App.stickyTop = $sticky.offset().top;
            App.sticky();
            $sticky.prevAll().each(function() {
                App.stickyPreviousHeight += $(this).height();
            });
            if ($sticky.hasClass("fixed")) {
                App.stickyTop = App.stickyPreviousHeight;
            }
        }
    },
    scrollTo: function(top) {
        var body = $("html, body");
        body.stop().animate({
            scrollTop: parseFloat(top)
        }, 1000, 'swing');
    },
    toggleScrollTop: function() {
        if ($(window).scrollTop() > 100) {
            $(".scroll-to-top").stop().fadeIn(150);
        } else {
            $(".scroll-to-top").stop().fadeOut(150);
        }
    },
    getScrollbarWidth: function() {
        var outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
        document.body.appendChild(outer);
        var widthNoScroll = outer.offsetWidth;
        // force scrollbars
        outer.style.overflow = "scroll";
        // add innerdiv
        var inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);
        var widthWithScroll = inner.offsetWidth;
        // remove divs
        outer.parentNode.removeChild(outer);
        return widthNoScroll - widthWithScroll;
    }
}
window.onload = function() {
    App.initSticky();
    App.sticky();
}
$(function() {
    App.init();
});