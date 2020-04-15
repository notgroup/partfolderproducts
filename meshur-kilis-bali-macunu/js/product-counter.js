(function($) {
    "use strict";
    var ProductCounter = function(element, options) {
        this.options = options;
    }
    ProductCounter.DEFAULTS = {
        min: 1,
        max: 1,
        minTimeout: 500,
        expire: 900000
    }
    ProductCounter.prototype.getTimeout = function(_element) {
        var quantity = this.getQuantity(_element);
        if (quantity <= 0) {
            return 0;
        }
        var cookieExpire = this.getCookieExpire(_element);
        var maxTimeout = parseFloat(cookieExpire / quantity);
        var minTimeout = this.options.minTimeout;
        if (maxTimeout < minTimeout) {
            maxTimeout = minTimeout;
        }
        var timeout = Math.floor(Math.random() * Math.abs(maxTimeout - minTimeout)) + minTimeout;
        return timeout;
    }
    ProductCounter.prototype.cookieName = function(name, _element) {
        if (typeof _element != "undefined" && _element !== null) {
            var id = _element.attr("id");
            if (id) {
                return String(name) + "-" + String(id);
            }
        }
        return String(name);
    }
    ProductCounter.prototype.getCookie = function(name, _element) {
        return $.cookie(this.cookieName(name, _element));
    }
    ProductCounter.prototype.setCookie = function(name, _element, value) {
        return $.cookie(this.cookieName(name, _element), value);
    }
    ProductCounter.prototype.getCookieQuantity = function(_element) {
        return this.getCookie("pc-quantity", _element);
    }
    ProductCounter.prototype.updateCookieQuantity = function(_element, quantity) {
        this.setCookie("pc-quantity", _element, quantity);
    }
    ProductCounter.prototype.getCookieExpire = function(_element) {
        var expire = this.getCookie("pc-expire", _element);
        if (typeof expire == "undefined") {
            expire = this.options.expire;
        }
        expire = parseInt(expire);
        return expire;
    }
    ProductCounter.prototype.updateCookieExpire = function(_element, timeout) {
        var expire = parseInt(this.getCookie("pc-expire", _element));
        if (!expire || expire < 0 || timeout <= 0) {
            expire = this.options.expire;
        }
        var cookieExpire = expire - timeout;
        if (cookieExpire < 0) {
            cookieExpire = this.options.expire;
        }
        this.setCookie("pc-expire", _element, cookieExpire);
    }
    ProductCounter.prototype.getRandomQuantity = function() {
        return Math.floor(Math.random() * Math.abs(this.options.max - this.options.min)) + this.options.min;;
    }
    ProductCounter.prototype.getQuantity = function(_element) {
        var quantity = this.getRandomQuantity();
        var cookieQuantity = this.getCookieQuantity(_element);
        if (typeof cookieQuantity != "undefined") {
            quantity = parseInt(cookieQuantity);
        }
        if (quantity <= 0) {
            quantity = this.getRandomQuantity();
        }
        return quantity;
    }
    ProductCounter.prototype.update = function(_element, timeout) {
        var quantity = parseInt(_element.text()) - 1;
        if (quantity <= 0) {
            quantity = 0;
        }
        this.updateCookieQuantity(_element, quantity);
        _element.html(quantity);
        if (quantity <= 0) {
            this.updateCookieQuantity(_element, this.getQuantity(_element));
            this.updateCookieExpire(_element, 0);
            return;
        }
        this.animate(_element, "swing");
        if (typeof timeout != "undefined" && timeout !== null) {
            this.updateCookieExpire(_element, timeout);
        }
    }
    ProductCounter.prototype.animate = function(_element, animation) {
        _element.removeClass("animated " + animation).addClass(animation + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass("animated " + animation);
        });
    }

    function Plugin(option) {
        var timestamp = Math.floor(Date.now() / 1000);
        return this.each(function() {
            var $this = $(this);
            timestamp = timestamp + 1;
            var data = $this.data("product-counter");
            var options = $.extend({}, ProductCounter.DEFAULTS, $this.data(), typeof option == "object" && option);
            if (options.min > options.max) {
                options.max = options.min;
            }
            if (!data) {
                $this.data("product-counter", (data = new ProductCounter(this, options)));
            }
            var quantity = data.getQuantity($this);
            $this.html(quantity);
            data.updateCookieQuantity($this, quantity);
            (function loop() {
                var timeout = data.getTimeout($this);
                if (timeout > 0) {
                    setTimeout(function() {
                        data.update($this, timeout);
                        loop();
                    }, timeout);
                }
            }());
        });
    }
    var old = $.fn.modal;
    $.fn.productCounter = Plugin;
    $.fn.productCounter.Constructor = ProductCounter;
    $.fn.productCounter.noConflict = function() {
        $.fn.productCounter = old;
        return this;
    }
}(jQuery));
