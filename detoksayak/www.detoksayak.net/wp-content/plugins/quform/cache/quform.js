/*!
 * jQuery Form Plugin
 * version: 4.2.2
 * Requires jQuery v1.7.2 or later
 * Project repository: https://github.com/jquery-form/form

 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup

 * Dual licensed under the LGPL-2.1+ or MIT licenses
 * https://github.com/jquery-form/form#license

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */
! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = function(t, r) {
        return void 0 === r && (r = "undefined" != typeof window ? require("jquery") : require("jquery")(t)), e(r), r
    } : e(jQuery)
}(function(e) {
    "use strict";

    function t(t) {
        var r = t.data;
        t.isDefaultPrevented() || (t.preventDefault(), e(t.target).closest("form").ajaxSubmit(r))
    }

    function r(t) {
        var r = t.target,
            a = e(r);
        if (!a.is("[type=submit],[type=image]")) {
            var n = a.closest("[type=submit]");
            if (0 === n.length) return;
            r = n[0]
        }
        var i = r.form;
        if (i.clk = r, "image" === r.type)
            if (void 0 !== t.offsetX) i.clk_x = t.offsetX, i.clk_y = t.offsetY;
            else if ("function" == typeof e.fn.offset) {
            var o = a.offset();
            i.clk_x = t.pageX - o.left, i.clk_y = t.pageY - o.top
        } else i.clk_x = t.pageX - r.offsetLeft, i.clk_y = t.pageY - r.offsetTop;
        setTimeout(function() {
            i.clk = i.clk_x = i.clk_y = null
        }, 100)
    }

    function a() {
        if (e.fn.ajaxSubmit.debug) {
            var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t)
        }
    }
    var n = /\r?\n/g,
        i = {};
    i.fileapi = void 0 !== e('<input type="file">').get(0).files, i.formdata = void 0 !== window.FormData;
    var o = !!e.fn.prop;
    e.fn.attr2 = function() {
        if (!o) return this.attr.apply(this, arguments);
        var e = this.prop.apply(this, arguments);
        return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments)
    }, e.fn.ajaxSubmit = function(t, r, n, s) {
        function u(r) {
            var a, n, i = e.param(r, t.traditional).split("&"),
                o = i.length,
                s = [];
            for (a = 0; a < o; a++) i[a] = i[a].replace(/\+/g, " "), n = i[a].split("="), s.push([decodeURIComponent(n[0]), decodeURIComponent(n[1])]);
            return s
        }

        function c(r) {
            function n(e) {
                var t = null;
                try {
                    e.contentWindow && (t = e.contentWindow.document)
                } catch (e) {
                    a("cannot get iframe.contentWindow document: " + e)
                }
                if (t) return t;
                try {
                    t = e.contentDocument ? e.contentDocument : e.document
                } catch (r) {
                    a("cannot get iframe.contentDocument: " + r), t = e.document
                }
                return t
            }

            function i() {
                function t() {
                    try {
                        var e = n(v).readyState;
                        a("state = " + e), e && "uninitialized" === e.toLowerCase() && setTimeout(t, 50)
                    } catch (e) {
                        a("Server abort: ", e, " (", e.name, ")"), s(L), j && clearTimeout(j), j = void 0
                    }
                }
                var r = p.attr2("target"),
                    i = p.attr2("action"),
                    o = p.attr("enctype") || p.attr("encoding") || "multipart/form-data";
                w.setAttribute("target", m), l && !/post/i.test(l) || w.setAttribute("method", "POST"), i !== f.url && w.setAttribute("action", f.url), f.skipEncodingOverride || l && !/post/i.test(l) || p.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }), f.timeout && (j = setTimeout(function() {
                    T = !0, s(A)
                }, f.timeout));
                var u = [];
                try {
                    if (f.extraData)
                        for (var c in f.extraData) f.extraData.hasOwnProperty(c) && (e.isPlainObject(f.extraData[c]) && f.extraData[c].hasOwnProperty("name") && f.extraData[c].hasOwnProperty("value") ? u.push(e('<input type="hidden" name="' + f.extraData[c].name + '">', k).val(f.extraData[c].value).appendTo(w)[0]) : u.push(e('<input type="hidden" name="' + c + '">', k).val(f.extraData[c]).appendTo(w)[0]));
                    f.iframeTarget || h.appendTo(D), v.attachEvent ? v.attachEvent("onload", s) : v.addEventListener("load", s, !1), setTimeout(t, 15);
                    try {
                        w.submit()
                    } catch (e) {
                        document.createElement("form").submit.apply(w)
                    }
                } finally {
                    w.setAttribute("action", i), w.setAttribute("enctype", o), r ? w.setAttribute("target", r) : p.removeAttr("target"), e(u).remove()
                }
            }

            function s(t) {
                if (!x.aborted && !X) {
                    if ((O = n(v)) || (a("cannot access response document"), t = L), t === A && x) return x.abort("timeout"), void S.reject(x, "timeout");
                    if (t === L && x) return x.abort("server abort"), void S.reject(x, "error", "server abort");
                    if (O && O.location.href !== f.iframeSrc || T) {
                        v.detachEvent ? v.detachEvent("onload", s) : v.removeEventListener("load", s, !1);
                        var r, i = "success";
                        try {
                            if (T) throw "timeout";
                            var o = "xml" === f.dataType || O.XMLDocument || e.isXMLDoc(O);
                            if (a("isXml=" + o), !o && window.opera && (null === O.body || !O.body.innerHTML) && --C) return a("requeing onLoad callback, DOM not available"), void setTimeout(s, 250);
                            var u = O.body ? O.body : O.documentElement;
                            x.responseText = u ? u.innerHTML : null, x.responseXML = O.XMLDocument ? O.XMLDocument : O, o && (f.dataType = "xml"), x.getResponseHeader = function(e) {
                                return {
                                    "content-type": f.dataType
                                }[e.toLowerCase()]
                            }, u && (x.status = Number(u.getAttribute("status")) || x.status, x.statusText = u.getAttribute("statusText") || x.statusText);
                            var c = (f.dataType || "").toLowerCase(),
                                l = /(json|script|text)/.test(c);
                            if (l || f.textarea) {
                                var p = O.getElementsByTagName("textarea")[0];
                                if (p) x.responseText = p.value, x.status = Number(p.getAttribute("status")) || x.status, x.statusText = p.getAttribute("statusText") || x.statusText;
                                else if (l) {
                                    var m = O.getElementsByTagName("pre")[0],
                                        g = O.getElementsByTagName("body")[0];
                                    m ? x.responseText = m.textContent ? m.textContent : m.innerText : g && (x.responseText = g.textContent ? g.textContent : g.innerText)
                                }
                            } else "xml" === c && !x.responseXML && x.responseText && (x.responseXML = q(x.responseText));
                            try {
                                M = N(x, c, f)
                            } catch (e) {
                                i = "parsererror", x.error = r = e || i
                            }
                        } catch (e) {
                            a("error caught: ", e), i = "error", x.error = r = e || i
                        }
                        x.aborted && (a("upload aborted"), i = null), x.status && (i = x.status >= 200 && x.status < 300 || 304 === x.status ? "success" : "error"), "success" === i ? (f.success && f.success.call(f.context, M, "success", x), S.resolve(x.responseText, "success", x), d && e.event.trigger("ajaxSuccess", [x, f])) : i && (void 0 === r && (r = x.statusText), f.error && f.error.call(f.context, x, i, r), S.reject(x, "error", r), d && e.event.trigger("ajaxError", [x, f, r])), d && e.event.trigger("ajaxComplete", [x, f]), d && !--e.active && e.event.trigger("ajaxStop"), f.complete && f.complete.call(f.context, x, i), X = !0, f.timeout && clearTimeout(j), setTimeout(function() {
                            f.iframeTarget ? h.attr("src", f.iframeSrc) : h.remove(), x.responseXML = null
                        }, 100)
                    }
                }
            }
            var u, c, f, d, m, h, v, x, y, b, T, j, w = p[0],
                S = e.Deferred();
            if (S.abort = function(e) {
                    x.abort(e)
                }, r)
                for (c = 0; c < g.length; c++) u = e(g[c]), o ? u.prop("disabled", !1) : u.removeAttr("disabled");
            (f = e.extend(!0, {}, e.ajaxSettings, t)).context = f.context || f, m = "jqFormIO" + (new Date).getTime();
            var k = w.ownerDocument,
                D = p.closest("body");
            if (f.iframeTarget ? (b = (h = e(f.iframeTarget, k)).attr2("name")) ? m = b : h.attr2("name", m) : (h = e('<iframe name="' + m + '" src="' + f.iframeSrc + '" />', k)).css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                }), v = h[0], x = {
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: "n/a",
                    getAllResponseHeaders: function() {},
                    getResponseHeader: function() {},
                    setRequestHeader: function() {},
                    abort: function(t) {
                        var r = "timeout" === t ? "timeout" : "aborted";
                        a("aborting upload... " + r), this.aborted = 1;
                        try {
                            v.contentWindow.document.execCommand && v.contentWindow.document.execCommand("Stop")
                        } catch (e) {}
                        h.attr("src", f.iframeSrc), x.error = r, f.error && f.error.call(f.context, x, r, t), d && e.event.trigger("ajaxError", [x, f, r]), f.complete && f.complete.call(f.context, x, r)
                    }
                }, (d = f.global) && 0 == e.active++ && e.event.trigger("ajaxStart"), d && e.event.trigger("ajaxSend", [x, f]), f.beforeSend && !1 === f.beforeSend.call(f.context, x, f)) return f.global && e.active--, S.reject(), S;
            if (x.aborted) return S.reject(), S;
            (y = w.clk) && (b = y.name) && !y.disabled && (f.extraData = f.extraData || {}, f.extraData[b] = y.value, "image" === y.type && (f.extraData[b + ".x"] = w.clk_x, f.extraData[b + ".y"] = w.clk_y));
            var A = 1,
                L = 2,
                F = e("meta[name=csrf-token]").attr("content"),
                E = e("meta[name=csrf-param]").attr("content");
            E && F && (f.extraData = f.extraData || {}, f.extraData[E] = F), f.forceSync ? i() : setTimeout(i, 10);
            var M, O, X, C = 50,
                q = e.parseXML || function(e, t) {
                    return window.ActiveXObject ? ((t = new ActiveXObject("Microsoft.XMLDOM")).async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" !== t.documentElement.nodeName ? t : null
                },
                _ = e.parseJSON || function(e) {
                    return window.eval("(" + e + ")")
                },
                N = function(t, r, a) {
                    var n = t.getResponseHeader("content-type") || "",
                        i = ("xml" === r || !r) && n.indexOf("xml") >= 0,
                        o = i ? t.responseXML : t.responseText;
                    return i && "parsererror" === o.documentElement.nodeName && e.error && e.error("parsererror"), a && a.dataFilter && (o = a.dataFilter(o, r)), "string" == typeof o && (("json" === r || !r) && n.indexOf("json") >= 0 ? o = _(o) : ("script" === r || !r) && n.indexOf("javascript") >= 0 && e.globalEval(o)), o
                };
            return S
        }
        if (!this.length) return a("ajaxSubmit: skipping submit process - no element selected"), this;
        var l, f, d, p = this;
        "function" == typeof t ? t = {
            success: t
        } : "string" == typeof t || !1 === t && arguments.length > 0 ? (t = {
            url: t,
            data: r,
            dataType: n
        }, "function" == typeof s && (t.success = s)) : void 0 === t && (t = {}), l = t.method || t.type || this.attr2("method"), (d = (d = "string" == typeof(f = t.url || this.attr2("action")) ? e.trim(f) : "") || window.location.href || "") && (d = (d.match(/^([^#]+)/) || [])[1]), t = e.extend(!0, {
            url: d,
            success: e.ajaxSettings.success,
            type: l || e.ajaxSettings.type,
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, t);
        var m = {};
        if (this.trigger("form-pre-serialize", [this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
        if (t.beforeSerialize && !1 === t.beforeSerialize(this, t)) return a("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
        var h = t.traditional;
        void 0 === h && (h = e.ajaxSettings.traditional);
        var v, g = [],
            x = this.formToArray(t.semantic, g, t.filtering);
        if (t.data) {
            var y = e.isFunction(t.data) ? t.data(x) : t.data;
            t.extraData = y, v = e.param(y, h)
        }
        if (t.beforeSubmit && !1 === t.beforeSubmit(x, this, t)) return a("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
        if (this.trigger("form-submit-validate", [x, this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
        var b = e.param(x, h);
        v && (b = b ? b + "&" + v : v), "GET" === t.type.toUpperCase() ? (t.url += (t.url.indexOf("?") >= 0 ? "&" : "?") + b, t.data = null) : t.data = b;
        var T = [];
        if (t.resetForm && T.push(function() {
                p.resetForm()
            }), t.clearForm && T.push(function() {
                p.clearForm(t.includeHidden)
            }), !t.dataType && t.target) {
            var j = t.success || function() {};
            T.push(function(r, a, n) {
                var i = arguments,
                    o = t.replaceTarget ? "replaceWith" : "html";
                e(t.target)[o](r).each(function() {
                    j.apply(this, i)
                })
            })
        } else t.success && (e.isArray(t.success) ? e.merge(T, t.success) : T.push(t.success));
        if (t.success = function(e, r, a) {
                for (var n = t.context || this, i = 0, o = T.length; i < o; i++) T[i].apply(n, [e, r, a || p, p])
            }, t.error) {
            var w = t.error;
            t.error = function(e, r, a) {
                var n = t.context || this;
                w.apply(n, [e, r, a, p])
            }
        }
        if (t.complete) {
            var S = t.complete;
            t.complete = function(e, r) {
                var a = t.context || this;
                S.apply(a, [e, r, p])
            }
        }
        var k = e("input[type=file]:enabled", this).filter(function() {
                return "" !== e(this).val()
            }).length > 0,
            D = "multipart/form-data",
            A = p.attr("enctype") === D || p.attr("encoding") === D,
            L = i.fileapi && i.formdata;
        a("fileAPI :" + L);
        var F, E = (k || A) && !L;
        !1 !== t.iframe && (t.iframe || E) ? t.closeKeepAlive ? e.get(t.closeKeepAlive, function() {
            F = c(x)
        }) : F = c(x) : F = (k || A) && L ? function(r) {
            for (var a = new FormData, n = 0; n < r.length; n++) a.append(r[n].name, r[n].value);
            if (t.extraData) {
                var i = u(t.extraData);
                for (n = 0; n < i.length; n++) i[n] && a.append(i[n][0], i[n][1])
            }
            t.data = null;
            var o = e.extend(!0, {}, e.ajaxSettings, t, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: l || "POST"
            });
            t.uploadProgress && (o.xhr = function() {
                var r = e.ajaxSettings.xhr();
                return r.upload && r.upload.addEventListener("progress", function(e) {
                    var r = 0,
                        a = e.loaded || e.position,
                        n = e.total;
                    e.lengthComputable && (r = Math.ceil(a / n * 100)), t.uploadProgress(e, a, n, r)
                }, !1), r
            }), o.data = null;
            var s = o.beforeSend;
            return o.beforeSend = function(e, r) {
                t.formData ? r.data = t.formData : r.data = a, s && s.call(this, e, r)
            }, e.ajax(o)
        }(x) : e.ajax(t), p.removeData("jqxhr").data("jqxhr", F);
        for (var M = 0; M < g.length; M++) g[M] = null;
        return this.trigger("form-submit-notify", [this, t]), this
    }, e.fn.ajaxForm = function(n, i, o, s) {
        if (("string" == typeof n || !1 === n && arguments.length > 0) && (n = {
                url: n,
                data: i,
                dataType: o
            }, "function" == typeof s && (n.success = s)), n = n || {}, n.delegation = n.delegation && e.isFunction(e.fn.on), !n.delegation && 0 === this.length) {
            var u = {
                s: this.selector,
                c: this.context
            };
            return !e.isReady && u.s ? (a("DOM not ready, queuing ajaxForm"), e(function() {
                e(u.s, u.c).ajaxForm(n)
            }), this) : (a("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this)
        }
        return n.delegation ? (e(document).off("submit.form-plugin", this.selector, t).off("click.form-plugin", this.selector, r).on("submit.form-plugin", this.selector, n, t).on("click.form-plugin", this.selector, n, r), this) : this.ajaxFormUnbind().on("submit.form-plugin", n, t).on("click.form-plugin", n, r)
    }, e.fn.ajaxFormUnbind = function() {
        return this.off("submit.form-plugin click.form-plugin")
    }, e.fn.formToArray = function(t, r, a) {
        var n = [];
        if (0 === this.length) return n;
        var o, s = this[0],
            u = this.attr("id"),
            c = t || void 0 === s.elements ? s.getElementsByTagName("*") : s.elements;
        if (c && (c = e.makeArray(c)), u && (t || /(Edge|Trident)\//.test(navigator.userAgent)) && (o = e(':input[form="' + u + '"]').get()).length && (c = (c || []).concat(o)), !c || !c.length) return n;
        e.isFunction(a) && (c = e.map(c, a));
        var l, f, d, p, m, h, v;
        for (l = 0, h = c.length; l < h; l++)
            if (m = c[l], (d = m.name) && !m.disabled)
                if (t && s.clk && "image" === m.type) s.clk === m && (n.push({
                    name: d,
                    value: e(m).val(),
                    type: m.type
                }), n.push({
                    name: d + ".x",
                    value: s.clk_x
                }, {
                    name: d + ".y",
                    value: s.clk_y
                }));
                else if ((p = e.fieldValue(m, !0)) && p.constructor === Array)
            for (r && r.push(m), f = 0, v = p.length; f < v; f++) n.push({
                name: d,
                value: p[f]
            });
        else if (i.fileapi && "file" === m.type) {
            r && r.push(m);
            var g = m.files;
            if (g.length)
                for (f = 0; f < g.length; f++) n.push({
                    name: d,
                    value: g[f],
                    type: m.type
                });
            else n.push({
                name: d,
                value: "",
                type: m.type
            })
        } else null !== p && void 0 !== p && (r && r.push(m), n.push({
            name: d,
            value: p,
            type: m.type,
            required: m.required
        }));
        if (!t && s.clk) {
            var x = e(s.clk),
                y = x[0];
            (d = y.name) && !y.disabled && "image" === y.type && (n.push({
                name: d,
                value: x.val()
            }), n.push({
                name: d + ".x",
                value: s.clk_x
            }, {
                name: d + ".y",
                value: s.clk_y
            }))
        }
        return n
    }, e.fn.formSerialize = function(t) {
        return e.param(this.formToArray(t))
    }, e.fn.fieldSerialize = function(t) {
        var r = [];
        return this.each(function() {
            var a = this.name;
            if (a) {
                var n = e.fieldValue(this, t);
                if (n && n.constructor === Array)
                    for (var i = 0, o = n.length; i < o; i++) r.push({
                        name: a,
                        value: n[i]
                    });
                else null !== n && void 0 !== n && r.push({
                    name: this.name,
                    value: n
                })
            }
        }), e.param(r)
    }, e.fn.fieldValue = function(t) {
        for (var r = [], a = 0, n = this.length; a < n; a++) {
            var i = this[a],
                o = e.fieldValue(i, t);
            null === o || void 0 === o || o.constructor === Array && !o.length || (o.constructor === Array ? e.merge(r, o) : r.push(o))
        }
        return r
    }, e.fieldValue = function(t, r) {
        var a = t.name,
            i = t.type,
            o = t.tagName.toLowerCase();
        if (void 0 === r && (r = !0), r && (!a || t.disabled || "reset" === i || "button" === i || ("checkbox" === i || "radio" === i) && !t.checked || ("submit" === i || "image" === i) && t.form && t.form.clk !== t || "select" === o && -1 === t.selectedIndex)) return null;
        if ("select" === o) {
            var s = t.selectedIndex;
            if (s < 0) return null;
            for (var u = [], c = t.options, l = "select-one" === i, f = l ? s + 1 : c.length, d = l ? s : 0; d < f; d++) {
                var p = c[d];
                if (p.selected && !p.disabled) {
                    var m = p.value;
                    if (m || (m = p.attributes && p.attributes.value && !p.attributes.value.specified ? p.text : p.value), l) return m;
                    u.push(m)
                }
            }
            return u
        }
        return e(t).val().replace(n, "\r\n")
    }, e.fn.clearForm = function(t) {
        return this.each(function() {
            e("input,select,textarea", this).clearFields(t)
        })
    }, e.fn.clearFields = e.fn.clearInputs = function(t) {
        var r = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var a = this.type,
                n = this.tagName.toLowerCase();
            r.test(a) || "textarea" === n ? this.value = "" : "checkbox" === a || "radio" === a ? this.checked = !1 : "select" === n ? this.selectedIndex = -1 : "file" === a ? /MSIE/.test(navigator.userAgent) ? e(this).replaceWith(e(this).clone(!0)) : e(this).val("") : t && (!0 === t && /hidden/.test(a) || "string" == typeof t && e(this).is(t)) && (this.value = "")
        })
    }, e.fn.resetForm = function() {
        return this.each(function() {
            var t = e(this),
                r = this.tagName.toLowerCase();
            switch (r) {
                case "input":
                    this.checked = this.defaultChecked;
                case "textarea":
                    return this.value = this.defaultValue, !0;
                case "option":
                case "optgroup":
                    var a = t.parents("select");
                    return a.length && a[0].multiple ? "option" === r ? this.selected = this.defaultSelected : t.find("option").resetForm() : a.resetForm(), !0;
                case "select":
                    return t.find("option").each(function(e) {
                        if (this.selected = this.defaultSelected, this.defaultSelected && !t[0].multiple) return t[0].selectedIndex = e, !1
                    }), !0;
                case "label":
                    var n = e(t.attr("for")),
                        i = t.find("input,select,textarea");
                    return n[0] && i.unshift(n[0]), i.resetForm(), !0;
                case "form":
                    return ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset(), !0;
                default:
                    return t.find("form,input,label,select,textarea").resetForm(), !0
            }
        })
    }, e.fn.enable = function(e) {
        return void 0 === e && (e = !0), this.each(function() {
            this.disabled = !e
        })
    }, e.fn.selected = function(t) {
        return void 0 === t && (t = !0), this.each(function() {
            var r = this.type;
            if ("checkbox" === r || "radio" === r) this.checked = t;
            else if ("option" === this.tagName.toLowerCase()) {
                var a = e(this).parent("select");
                t && a[0] && "select-one" === a[0].type && a.find("option").selected(!1), this.selected = t
            }
        })
    }, e.fn.ajaxSubmit.debug = !1
});

/**
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.2
 */
;
(function(f) {
    "use strict";
    "function" === typeof define && define.amd ? define(["jquery"], f) : "undefined" !== typeof module && module.exports ? module.exports = f(require("jquery")) : f(jQuery)
})(function($) {
    "use strict";

    function n(a) {
        return !a.nodeName || -1 !== $.inArray(a.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"])
    }

    function h(a) {
        return $.isFunction(a) || $.isPlainObject(a) ? a : {
            top: a,
            left: a
        }
    }
    var p = $.scrollTo = function(a, d, b) {
        return $(window).scrollTo(a, d, b)
    };
    p.defaults = {
        axis: "xy",
        duration: 0,
        limit: !0
    };
    $.fn.scrollTo = function(a, d, b) {
        "object" === typeof d && (b = d, d = 0);
        "function" === typeof b && (b = {
            onAfter: b
        });
        "max" === a && (a = 9E9);
        b = $.extend({}, p.defaults, b);
        d = d || b.duration;
        var u = b.queue && 1 < b.axis.length;
        u && (d /= 2);
        b.offset = h(b.offset);
        b.over = h(b.over);
        return this.each(function() {
            function k(a) {
                var k = $.extend({}, b, {
                    queue: !0,
                    duration: d,
                    complete: a && function() {
                        a.call(q, e, b)
                    }
                });
                r.animate(f, k)
            }
            if (null !== a) {
                var l = n(this),
                    q = l ? this.contentWindow || window : this,
                    r = $(q),
                    e = a,
                    f = {},
                    t;
                switch (typeof e) {
                    case "number":
                    case "string":
                        if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)) {
                            e = h(e);
                            break
                        }
                        e = l ? $(e) : $(e, q);
                    case "object":
                        if (e.length === 0) return;
                        if (e.is || e.style) t = (e = $(e)).offset()
                }
                var v = $.isFunction(b.offset) && b.offset(q, e) || b.offset;
                $.each(b.axis.split(""), function(a, c) {
                    var d = "x" === c ? "Left" : "Top",
                        m = d.toLowerCase(),
                        g = "scroll" + d,
                        h = r[g](),
                        n = p.max(q, c);
                    t ? (f[g] = t[m] + (l ? 0 : h - r.offset()[m]), b.margin && (f[g] -= parseInt(e.css("margin" + d), 10) || 0, f[g] -= parseInt(e.css("border" + d + "Width"), 10) || 0), f[g] += v[m] || 0, b.over[m] && (f[g] += e["x" === c ? "width" : "height"]() * b.over[m])) : (d = e[m], f[g] = d.slice && "%" === d.slice(-1) ? parseFloat(d) / 100 * n : d);
                    b.limit && /^\d+$/.test(f[g]) && (f[g] = 0 >= f[g] ? 0 : Math.min(f[g], n));
                    !a && 1 < b.axis.length && (h === f[g] ? f = {} : u && (k(b.onAfterFirst), f = {}))
                });
                k(b.onAfter)
            }
        })
    };
    p.max = function(a, d) {
        var b = "x" === d ? "Width" : "Height",
            h = "scroll" + b;
        if (!n(a)) return a[h] - $(a)[b.toLowerCase()]();
        var b = "client" + b,
            k = a.ownerDocument || a.document,
            l = k.documentElement,
            k = k.body;
        return Math.max(l[h], k[h]) - Math.min(l[b], k[b])
    };
    $.Tween.propHooks.scrollLeft = $.Tween.propHooks.scrollTop = {
        get: function(a) {
            return $(a.elem)[a.prop]()
        },
        set: function(a) {
            var d = this.get(a);
            if (a.options.interrupt && a._last && a._last !== d) return $(a.elem).stop();
            var b = Math.round(a.now);
            d !== b && ($(a.elem)[a.prop](b), a._last = this.get(a))
        }
    };
    return p
});
/* qtip2 v3.0.3 | Plugins: tips modal viewport svg imagemap ie6 | Styles: core basic css3 | qtip2.com | Licensed MIT | Wed May 11 2016 22:31:31 */

! function(a, b, c) {
    ! function(a) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], a) : jQuery && !jQuery.fn.qtip && a(jQuery)
    }(function(d) {
        "use strict";

        function e(a, b, c, e) {
            this.id = c, this.target = a, this.tooltip = F, this.elements = {
                target: a
            }, this._id = S + "-" + c, this.timers = {
                img: {}
            }, this.options = b, this.plugins = {}, this.cache = {
                event: {},
                target: d(),
                disabled: E,
                attr: e,
                onTooltip: E,
                lastClass: ""
            }, this.rendered = this.destroyed = this.disabled = this.waiting = this.hiddenDuringWait = this.positioning = this.triggering = E
        }

        function f(a) {
            return a === F || "object" !== d.type(a)
        }

        function g(a) {
            return !(d.isFunction(a) || a && a.attr || a.length || "object" === d.type(a) && (a.jquery || a.then))
        }

        function h(a) {
            var b, c, e, h;
            return f(a) ? E : (f(a.metadata) && (a.metadata = {
                type: a.metadata
            }), "content" in a && (b = a.content, f(b) || b.jquery || b.done ? (c = g(b) ? E : b, b = a.content = {
                text: c
            }) : c = b.text, "ajax" in b && (e = b.ajax, h = e && e.once !== E, delete b.ajax, b.text = function(a, b) {
                var f = c || d(this).attr(b.options.content.attr) || "Loading...",
                    g = d.ajax(d.extend({}, e, {
                        context: b
                    })).then(e.success, F, e.error).then(function(a) {
                        return a && h && b.set("content.text", a), a
                    }, function(a, c, d) {
                        b.destroyed || 0 === a.status || b.set("content.text", c + ": " + d)
                    });
                return h ? f : (b.set("content.text", f), g)
            }), "title" in b && (d.isPlainObject(b.title) && (b.button = b.title.button, b.title = b.title.text), g(b.title || E) && (b.title = E))), "position" in a && f(a.position) && (a.position = {
                my: a.position,
                at: a.position
            }), "show" in a && f(a.show) && (a.show = a.show.jquery ? {
                target: a.show
            } : a.show === D ? {
                ready: D
            } : {
                event: a.show
            }), "hide" in a && f(a.hide) && (a.hide = a.hide.jquery ? {
                target: a.hide
            } : {
                event: a.hide
            }), "style" in a && f(a.style) && (a.style = {
                classes: a.style
            }), d.each(R, function() {
                this.sanitize && this.sanitize(a)
            }), a)
        }

        function i(a, b) {
            for (var c, d = 0, e = a, f = b.split("."); e = e[f[d++]];) d < f.length && (c = e);
            return [c || a, f.pop()]
        }

        function j(a, b) {
            var c, d, e;
            for (c in this.checks)
                if (this.checks.hasOwnProperty(c))
                    for (d in this.checks[c]) this.checks[c].hasOwnProperty(d) && (e = new RegExp(d, "i").exec(a)) && (b.push(e), ("builtin" === c || this.plugins[c]) && this.checks[c][d].apply(this.plugins[c] || this, b))
        }

        function k(a) {
            return V.concat("").join(a ? "-" + a + " " : " ")
        }

        function l(a, b) {
            return b > 0 ? setTimeout(d.proxy(a, this), b) : void a.call(this)
        }

        function m(a) {
            this.tooltip.hasClass(aa) || (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this.timers.show = l.call(this, function() {
                this.toggle(D, a)
            }, this.options.show.delay))
        }

        function n(a) {
            if (!this.tooltip.hasClass(aa) && !this.destroyed) {
                var b = d(a.relatedTarget),
                    c = b.closest(W)[0] === this.tooltip[0],
                    e = b[0] === this.options.show.target[0];
                if (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this !== b[0] && "mouse" === this.options.position.target && c || this.options.hide.fixed && /mouse(out|leave|move)/.test(a.type) && (c || e)) try {
                    a.preventDefault(), a.stopImmediatePropagation()
                } catch (f) {} else this.timers.hide = l.call(this, function() {
                    this.toggle(E, a)
                }, this.options.hide.delay, this)
            }
        }

        function o(a) {
            !this.tooltip.hasClass(aa) && this.options.hide.inactive && (clearTimeout(this.timers.inactive), this.timers.inactive = l.call(this, function() {
                this.hide(a)
            }, this.options.hide.inactive))
        }

        function p(a) {
            this.rendered && this.tooltip[0].offsetWidth > 0 && this.reposition(a)
        }

        function q(a, c, e) {
            d(b.body).delegate(a, (c.split ? c : c.join("." + S + " ")) + "." + S, function() {
                var a = y.api[d.attr(this, U)];
                a && !a.disabled && e.apply(a, arguments)
            })
        }

        function r(a, c, f) {
            var g, i, j, k, l, m = d(b.body),
                n = a[0] === b ? m : a,
                o = a.metadata ? a.metadata(f.metadata) : F,
                p = "html5" === f.metadata.type && o ? o[f.metadata.name] : F,
                q = a.data(f.metadata.name || "qtipopts");
            try {
                q = "string" == typeof q ? d.parseJSON(q) : q
            } catch (r) {}
            if (k = d.extend(D, {}, y.defaults, f, "object" == typeof q ? h(q) : F, h(p || o)), i = k.position, k.id = c, "boolean" == typeof k.content.text) {
                if (j = a.attr(k.content.attr), k.content.attr === E || !j) return E;
                k.content.text = j
            }
            if (i.container.length || (i.container = m), i.target === E && (i.target = n), k.show.target === E && (k.show.target = n), k.show.solo === D && (k.show.solo = i.container.closest("body")), k.hide.target === E && (k.hide.target = n), k.position.viewport === D && (k.position.viewport = i.container), i.container = i.container.eq(0), i.at = new A(i.at, D), i.my = new A(i.my), a.data(S))
                if (k.overwrite) a.qtip("destroy", !0);
                else if (k.overwrite === E) return E;
            return a.attr(T, c), k.suppress && (l = a.attr("title")) && a.removeAttr("title").attr(ca, l).attr("title", ""), g = new e(a, k, c, !!j), a.data(S, g), g
        }

        function s(a) {
            return a.charAt(0).toUpperCase() + a.slice(1)
        }

        function t(a, b) {
            var d, e, f = b.charAt(0).toUpperCase() + b.slice(1),
                g = (b + " " + va.join(f + " ") + f).split(" "),
                h = 0;
            if (ua[b]) return a.css(ua[b]);
            for (; d = g[h++];)
                if ((e = a.css(d)) !== c) return ua[b] = d, e
        }

        function u(a, b) {
            return Math.ceil(parseFloat(t(a, b)))
        }

        function v(a, b) {
            this._ns = "tip", this.options = b, this.offset = b.offset, this.size = [b.width, b.height], this.qtip = a, this.init(a)
        }

        function w(a, b) {
            this.options = b, this._ns = "-modal", this.qtip = a, this.init(a)
        }

        function x(a) {
            this._ns = "ie6", this.qtip = a, this.init(a)
        }
        var y, z, A, B, C, D = !0,
            E = !1,
            F = null,
            G = "x",
            H = "y",
            I = "width",
            J = "height",
            K = "top",
            L = "left",
            M = "bottom",
            N = "right",
            O = "center",
            P = "flipinvert",
            Q = "shift",
            R = {},
            S = "qtip",
            T = "data-hasqtip",
            U = "data-qtip-id",
            V = ["ui-widget", "ui-tooltip"],
            W = "." + S,
            X = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),
            Y = S + "-fixed",
            Z = S + "-default",
            $ = S + "-focus",
            _ = S + "-hover",
            aa = S + "-disabled",
            ba = "_replacedByqTip",
            ca = "oldtitle",
            da = {
                ie: function() {
                    var a, c;
                    for (a = 4, c = b.createElement("div");
                        (c.innerHTML = "<!--[if gt IE " + a + "]><i></i><![endif]-->") && c.getElementsByTagName("i")[0]; a += 1);
                    return a > 4 ? a : NaN
                }(),
                iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || E
            };
        z = e.prototype, z._when = function(a) {
            return d.when.apply(d, a)
        }, z.render = function(a) {
            if (this.rendered || this.destroyed) return this;
            var b = this,
                c = this.options,
                e = this.cache,
                f = this.elements,
                g = c.content.text,
                h = c.content.title,
                i = c.content.button,
                j = c.position,
                k = [];
            return d.attr(this.target[0], "aria-describedby", this._id), e.posClass = this._createPosClass((this.position = {
                my: j.my,
                at: j.at
            }).my), this.tooltip = f.tooltip = d("<div/>", {
                id: this._id,
                "class": [S, Z, c.style.classes, e.posClass].join(" "),
                width: c.style.width || "",
                height: c.style.height || "",
                tracking: "mouse" === j.target && j.adjust.mouse,
                role: "alert",
                "aria-live": "polite",
                "aria-atomic": E,
                "aria-describedby": this._id + "-content",
                "aria-hidden": D
            }).toggleClass(aa, this.disabled).attr(U, this.id).data(S, this).appendTo(j.container).append(f.content = d("<div />", {
                "class": S + "-content",
                id: this._id + "-content",
                "aria-atomic": D
            })), this.rendered = -1, this.positioning = D, h && (this._createTitle(), d.isFunction(h) || k.push(this._updateTitle(h, E))), i && this._createButton(), d.isFunction(g) || k.push(this._updateContent(g, E)), this.rendered = D, this._setWidget(), d.each(R, function(a) {
                var c;
                "render" === this.initialize && (c = this(b)) && (b.plugins[a] = c)
            }), this._unassignEvents(), this._assignEvents(), this._when(k).then(function() {
                b._trigger("render"), b.positioning = E, b.hiddenDuringWait || !c.show.ready && !a || b.toggle(D, e.event, E), b.hiddenDuringWait = E
            }), y.api[this.id] = this, this
        }, z.destroy = function(a) {
            function b() {
                if (!this.destroyed) {
                    this.destroyed = D;
                    var a, b = this.target,
                        c = b.attr(ca);
                    this.rendered && this.tooltip.stop(1, 0).find("*").remove().end().remove(), d.each(this.plugins, function() {
                        this.destroy && this.destroy()
                    });
                    for (a in this.timers) this.timers.hasOwnProperty(a) && clearTimeout(this.timers[a]);
                    b.removeData(S).removeAttr(U).removeAttr(T).removeAttr("aria-describedby"), this.options.suppress && c && b.attr("title", c).removeAttr(ca), this._unassignEvents(), this.options = this.elements = this.cache = this.timers = this.plugins = this.mouse = F, delete y.api[this.id]
                }
            }
            return this.destroyed ? this.target : (a === D && "hide" !== this.triggering || !this.rendered ? b.call(this) : (this.tooltip.one("tooltiphidden", d.proxy(b, this)), !this.triggering && this.hide()), this.target)
        }, B = z.checks = {
            builtin: {
                "^id$": function(a, b, c, e) {
                    var f = c === D ? y.nextid : c,
                        g = S + "-" + f;
                    f !== E && f.length > 0 && !d("#" + g).length ? (this._id = g, this.rendered && (this.tooltip[0].id = this._id, this.elements.content[0].id = this._id + "-content", this.elements.title[0].id = this._id + "-title")) : a[b] = e
                },
                "^prerender": function(a, b, c) {
                    c && !this.rendered && this.render(this.options.show.ready)
                },
                "^content.text$": function(a, b, c) {
                    this._updateContent(c)
                },
                "^content.attr$": function(a, b, c, d) {
                    this.options.content.text === this.target.attr(d) && this._updateContent(this.target.attr(c))
                },
                "^content.title$": function(a, b, c) {
                    return c ? (c && !this.elements.title && this._createTitle(), void this._updateTitle(c)) : this._removeTitle()
                },
                "^content.button$": function(a, b, c) {
                    this._updateButton(c)
                },
                "^content.title.(text|button)$": function(a, b, c) {
                    this.set("content." + b, c)
                },
                "^position.(my|at)$": function(a, b, c) {
                    "string" == typeof c && (this.position[b] = a[b] = new A(c, "at" === b))
                },
                "^position.container$": function(a, b, c) {
                    this.rendered && this.tooltip.appendTo(c)
                },
                "^show.ready$": function(a, b, c) {
                    c && (!this.rendered && this.render(D) || this.toggle(D))
                },
                "^style.classes$": function(a, b, c, d) {
                    this.rendered && this.tooltip.removeClass(d).addClass(c)
                },
                "^style.(width|height)": function(a, b, c) {
                    this.rendered && this.tooltip.css(b, c)
                },
                "^style.widget|content.title": function() {
                    this.rendered && this._setWidget()
                },
                "^style.def": function(a, b, c) {
                    this.rendered && this.tooltip.toggleClass(Z, !!c)
                },
                "^events.(render|show|move|hide|focus|blur)$": function(a, b, c) {
                    this.rendered && this.tooltip[(d.isFunction(c) ? "" : "un") + "bind"]("tooltip" + b, c)
                },
                "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function() {
                    if (this.rendered) {
                        var a = this.options.position;
                        this.tooltip.attr("tracking", "mouse" === a.target && a.adjust.mouse), this._unassignEvents(), this._assignEvents()
                    }
                }
            }
        }, z.get = function(a) {
            if (this.destroyed) return this;
            var b = i(this.options, a.toLowerCase()),
                c = b[0][b[1]];
            return c.precedance ? c.string() : c
        };
        var ea = /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,
            fa = /^prerender|show\.ready/i;
        z.set = function(a, b) {
            if (this.destroyed) return this;
            var c, e = this.rendered,
                f = E,
                g = this.options;
            return "string" == typeof a ? (c = a, a = {}, a[c] = b) : a = d.extend({}, a), d.each(a, function(b, c) {
                if (e && fa.test(b)) return void delete a[b];
                var h, j = i(g, b.toLowerCase());
                h = j[0][j[1]], j[0][j[1]] = c && c.nodeType ? d(c) : c, f = ea.test(b) || f, a[b] = [j[0], j[1], c, h]
            }), h(g), this.positioning = D, d.each(a, d.proxy(j, this)), this.positioning = E, this.rendered && this.tooltip[0].offsetWidth > 0 && f && this.reposition("mouse" === g.position.target ? F : this.cache.event), this
        }, z._update = function(a, b) {
            var c = this,
                e = this.cache;
            return this.rendered && a ? (d.isFunction(a) && (a = a.call(this.elements.target, e.event, this) || ""), d.isFunction(a.then) ? (e.waiting = D, a.then(function(a) {
                return e.waiting = E, c._update(a, b)
            }, F, function(a) {
                return c._update(a, b)
            })) : a === E || !a && "" !== a ? E : (a.jquery && a.length > 0 ? b.empty().append(a.css({
                display: "block",
                visibility: "visible"
            })) : b.html(a), this._waitForContent(b).then(function(a) {
                c.rendered && c.tooltip[0].offsetWidth > 0 && c.reposition(e.event, !a.length)
            }))) : E
        }, z._waitForContent = function(a) {
            var b = this.cache;
            return b.waiting = D, (d.fn.imagesLoaded ? a.imagesLoaded() : (new d.Deferred).resolve([])).done(function() {
                b.waiting = E
            }).promise()
        }, z._updateContent = function(a, b) {
            this._update(a, this.elements.content, b)
        }, z._updateTitle = function(a, b) {
            this._update(a, this.elements.title, b) === E && this._removeTitle(E)
        }, z._createTitle = function() {
            var a = this.elements,
                b = this._id + "-title";
            a.titlebar && this._removeTitle(), a.titlebar = d("<div />", {
                "class": S + "-titlebar " + (this.options.style.widget ? k("header") : "")
            }).append(a.title = d("<div />", {
                id: b,
                "class": S + "-title",
                "aria-atomic": D
            })).insertBefore(a.content).delegate(".qtip-close", "mousedown keydown mouseup keyup mouseout", function(a) {
                d(this).toggleClass("ui-state-active ui-state-focus", "down" === a.type.substr(-4))
            }).delegate(".qtip-close", "mouseover mouseout", function(a) {
                d(this).toggleClass("ui-state-hover", "mouseover" === a.type)
            }), this.options.content.button && this._createButton()
        }, z._removeTitle = function(a) {
            var b = this.elements;
            b.title && (b.titlebar.remove(), b.titlebar = b.title = b.button = F, a !== E && this.reposition())
        }, z._createPosClass = function(a) {
            return S + "-pos-" + (a || this.options.position.my).abbrev()
        }, z.reposition = function(c, e) {
            if (!this.rendered || this.positioning || this.destroyed) return this;
            this.positioning = D;
            var f, g, h, i, j = this.cache,
                k = this.tooltip,
                l = this.options.position,
                m = l.target,
                n = l.my,
                o = l.at,
                p = l.viewport,
                q = l.container,
                r = l.adjust,
                s = r.method.split(" "),
                t = k.outerWidth(E),
                u = k.outerHeight(E),
                v = 0,
                w = 0,
                x = k.css("position"),
                y = {
                    left: 0,
                    top: 0
                },
                z = k[0].offsetWidth > 0,
                A = c && "scroll" === c.type,
                B = d(a),
                C = q[0].ownerDocument,
                F = this.mouse;
            if (d.isArray(m) && 2 === m.length) o = {
                x: L,
                y: K
            }, y = {
                left: m[0],
                top: m[1]
            };
            else if ("mouse" === m) o = {
                x: L,
                y: K
            }, (!r.mouse || this.options.hide.distance) && j.origin && j.origin.pageX ? c = j.origin : !c || c && ("resize" === c.type || "scroll" === c.type) ? c = j.event : F && F.pageX && (c = F), "static" !== x && (y = q.offset()), C.body.offsetWidth !== (a.innerWidth || C.documentElement.clientWidth) && (g = d(b.body).offset()), y = {
                left: c.pageX - y.left + (g && g.left || 0),
                top: c.pageY - y.top + (g && g.top || 0)
            }, r.mouse && A && F && (y.left -= (F.scrollX || 0) - B.scrollLeft(), y.top -= (F.scrollY || 0) - B.scrollTop());
            else {
                if ("event" === m ? c && c.target && "scroll" !== c.type && "resize" !== c.type ? j.target = d(c.target) : c.target || (j.target = this.elements.target) : "event" !== m && (j.target = d(m.jquery ? m : this.elements.target)), m = j.target, m = d(m).eq(0), 0 === m.length) return this;
                m[0] === b || m[0] === a ? (v = da.iOS ? a.innerWidth : m.width(), w = da.iOS ? a.innerHeight : m.height(), m[0] === a && (y = {
                    top: (p || m).scrollTop(),
                    left: (p || m).scrollLeft()
                })) : R.imagemap && m.is("area") ? f = R.imagemap(this, m, o, R.viewport ? s : E) : R.svg && m && m[0].ownerSVGElement ? f = R.svg(this, m, o, R.viewport ? s : E) : (v = m.outerWidth(E), w = m.outerHeight(E), y = m.offset()), f && (v = f.width, w = f.height, g = f.offset, y = f.position), y = this.reposition.offset(m, y, q), (da.iOS > 3.1 && da.iOS < 4.1 || da.iOS >= 4.3 && da.iOS < 4.33 || !da.iOS && "fixed" === x) && (y.left -= B.scrollLeft(), y.top -= B.scrollTop()), (!f || f && f.adjustable !== E) && (y.left += o.x === N ? v : o.x === O ? v / 2 : 0, y.top += o.y === M ? w : o.y === O ? w / 2 : 0)
            }
            return y.left += r.x + (n.x === N ? -t : n.x === O ? -t / 2 : 0), y.top += r.y + (n.y === M ? -u : n.y === O ? -u / 2 : 0), R.viewport ? (h = y.adjusted = R.viewport(this, y, l, v, w, t, u), g && h.left && (y.left += g.left), g && h.top && (y.top += g.top), h.my && (this.position.my = h.my)) : y.adjusted = {
                left: 0,
                top: 0
            }, j.posClass !== (i = this._createPosClass(this.position.my)) && (j.posClass = i, k.removeClass(j.posClass).addClass(i)), this._trigger("move", [y, p.elem || p], c) ? (delete y.adjusted, e === E || !z || isNaN(y.left) || isNaN(y.top) || "mouse" === m || !d.isFunction(l.effect) ? k.css(y) : d.isFunction(l.effect) && (l.effect.call(k, this, d.extend({}, y)), k.queue(function(a) {
                d(this).css({
                    opacity: "",
                    height: ""
                }), da.ie && this.style.removeAttribute("filter"), a()
            })), this.positioning = E, this) : this
        }, z.reposition.offset = function(a, c, e) {
            function f(a, b) {
                c.left += b * a.scrollLeft(), c.top += b * a.scrollTop()
            }
            if (!e[0]) return c;
            var g, h, i, j, k = d(a[0].ownerDocument),
                l = !!da.ie && "CSS1Compat" !== b.compatMode,
                m = e[0];
            do "static" !== (h = d.css(m, "position")) && ("fixed" === h ? (i = m.getBoundingClientRect(), f(k, -1)) : (i = d(m).position(), i.left += parseFloat(d.css(m, "borderLeftWidth")) || 0, i.top += parseFloat(d.css(m, "borderTopWidth")) || 0), c.left -= i.left + (parseFloat(d.css(m, "marginLeft")) || 0), c.top -= i.top + (parseFloat(d.css(m, "marginTop")) || 0), g || "hidden" === (j = d.css(m, "overflow")) || "visible" === j || (g = d(m))); while (m = m.offsetParent);
            return g && (g[0] !== k[0] || l) && f(g, 1), c
        };
        var ga = (A = z.reposition.Corner = function(a, b) {
            a = ("" + a).replace(/([A-Z])/, " $1").replace(/middle/gi, O).toLowerCase(), this.x = (a.match(/left|right/i) || a.match(/center/) || ["inherit"])[0].toLowerCase(), this.y = (a.match(/top|bottom|center/i) || ["inherit"])[0].toLowerCase(), this.forceY = !!b;
            var c = a.charAt(0);
            this.precedance = "t" === c || "b" === c ? H : G
        }).prototype;
        ga.invert = function(a, b) {
            this[a] = this[a] === L ? N : this[a] === N ? L : b || this[a]
        }, ga.string = function(a) {
            var b = this.x,
                c = this.y,
                d = b !== c ? "center" === b || "center" !== c && (this.precedance === H || this.forceY) ? [c, b] : [b, c] : [b];
            return a !== !1 ? d.join(" ") : d
        }, ga.abbrev = function() {
            var a = this.string(!1);
            return a[0].charAt(0) + (a[1] && a[1].charAt(0) || "")
        }, ga.clone = function() {
            return new A(this.string(), this.forceY)
        }, z.toggle = function(a, c) {
            var e = this.cache,
                f = this.options,
                g = this.tooltip;
            if (c) {
                if (/over|enter/.test(c.type) && e.event && /out|leave/.test(e.event.type) && f.show.target.add(c.target).length === f.show.target.length && g.has(c.relatedTarget).length) return this;
                e.event = d.event.fix(c)
            }
            if (this.waiting && !a && (this.hiddenDuringWait = D), !this.rendered) return a ? this.render(1) : this;
            if (this.destroyed || this.disabled) return this;
            var h, i, j, k = a ? "show" : "hide",
                l = this.options[k],
                m = this.options.position,
                n = this.options.content,
                o = this.tooltip.css("width"),
                p = this.tooltip.is(":visible"),
                q = a || 1 === l.target.length,
                r = !c || l.target.length < 2 || e.target[0] === c.target;
            return (typeof a).search("boolean|number") && (a = !p), h = !g.is(":animated") && p === a && r, i = h ? F : !!this._trigger(k, [90]), this.destroyed ? this : (i !== E && a && this.focus(c), !i || h ? this : (d.attr(g[0], "aria-hidden", !a), a ? (this.mouse && (e.origin = d.event.fix(this.mouse)), d.isFunction(n.text) && this._updateContent(n.text, E), d.isFunction(n.title) && this._updateTitle(n.title, E), !C && "mouse" === m.target && m.adjust.mouse && (d(b).bind("mousemove." + S, this._storeMouse), C = D), o || g.css("width", g.outerWidth(E)), this.reposition(c, arguments[2]), o || g.css("width", ""), l.solo && ("string" == typeof l.solo ? d(l.solo) : d(W, l.solo)).not(g).not(l.target).qtip("hide", new d.Event("tooltipsolo"))) : (clearTimeout(this.timers.show), delete e.origin, C && !d(W + '[tracking="true"]:visible', l.solo).not(g).length && (d(b).unbind("mousemove." + S), C = E), this.blur(c)), j = d.proxy(function() {
                a ? (da.ie && g[0].style.removeAttribute("filter"), g.css("overflow", ""), "string" == typeof l.autofocus && d(this.options.show.autofocus, g).focus(), this.options.show.target.trigger("qtip-" + this.id + "-inactive")) : g.css({
                    display: "",
                    visibility: "",
                    opacity: "",
                    left: "",
                    top: ""
                }), this._trigger(a ? "visible" : "hidden")
            }, this), l.effect === E || q === E ? (g[k](), j()) : d.isFunction(l.effect) ? (g.stop(1, 1), l.effect.call(g, this), g.queue("fx", function(a) {
                j(), a()
            })) : g.fadeTo(90, a ? 1 : 0, j), a && l.target.trigger("qtip-" + this.id + "-inactive"), this))
        }, z.show = function(a) {
            return this.toggle(D, a)
        }, z.hide = function(a) {
            return this.toggle(E, a)
        }, z.focus = function(a) {
            if (!this.rendered || this.destroyed) return this;
            var b = d(W),
                c = this.tooltip,
                e = parseInt(c[0].style.zIndex, 10),
                f = y.zindex + b.length;
            return c.hasClass($) || this._trigger("focus", [f], a) && (e !== f && (b.each(function() {
                this.style.zIndex > e && (this.style.zIndex = this.style.zIndex - 1)
            }), b.filter("." + $).qtip("blur", a)), c.addClass($)[0].style.zIndex = f), this
        }, z.blur = function(a) {
            return !this.rendered || this.destroyed ? this : (this.tooltip.removeClass($), this._trigger("blur", [this.tooltip.css("zIndex")], a), this)
        }, z.disable = function(a) {
            return this.destroyed ? this : ("toggle" === a ? a = !(this.rendered ? this.tooltip.hasClass(aa) : this.disabled) : "boolean" != typeof a && (a = D), this.rendered && this.tooltip.toggleClass(aa, a).attr("aria-disabled", a), this.disabled = !!a, this)
        }, z.enable = function() {
            return this.disable(E)
        }, z._createButton = function() {
            var a = this,
                b = this.elements,
                c = b.tooltip,
                e = this.options.content.button,
                f = "string" == typeof e,
                g = f ? e : "Close tooltip";
            b.button && b.button.remove(), e.jquery ? b.button = e : b.button = d("<a />", {
                "class": "qtip-close " + (this.options.style.widget ? "" : S + "-icon"),
                title: g,
                "aria-label": g
            }).prepend(d("<span />", {
                "class": "ui-icon ui-icon-close",
                html: "&times;"
            })), b.button.appendTo(b.titlebar || c).attr("role", "button").click(function(b) {
                return c.hasClass(aa) || a.hide(b), E
            })
        }, z._updateButton = function(a) {
            if (!this.rendered) return E;
            var b = this.elements.button;
            a ? this._createButton() : b.remove()
        }, z._setWidget = function() {
            var a = this.options.style.widget,
                b = this.elements,
                c = b.tooltip,
                d = c.hasClass(aa);
            c.removeClass(aa), aa = a ? "ui-state-disabled" : "qtip-disabled", c.toggleClass(aa, d), c.toggleClass("ui-helper-reset " + k(), a).toggleClass(Z, this.options.style.def && !a), b.content && b.content.toggleClass(k("content"), a), b.titlebar && b.titlebar.toggleClass(k("header"), a), b.button && b.button.toggleClass(S + "-icon", !a)
        }, z._storeMouse = function(a) {
            return (this.mouse = d.event.fix(a)).type = "mousemove", this
        }, z._bind = function(a, b, c, e, f) {
            if (a && c && b.length) {
                var g = "." + this._id + (e ? "-" + e : "");
                return d(a).bind((b.split ? b : b.join(g + " ")) + g, d.proxy(c, f || this)), this
            }
        }, z._unbind = function(a, b) {
            return a && d(a).unbind("." + this._id + (b ? "-" + b : "")), this
        }, z._trigger = function(a, b, c) {
            var e = new d.Event("tooltip" + a);
            return e.originalEvent = c && d.extend({}, c) || this.cache.event || F, this.triggering = a, this.tooltip.trigger(e, [this].concat(b || [])), this.triggering = E, !e.isDefaultPrevented()
        }, z._bindEvents = function(a, b, c, e, f, g) {
            var h = c.filter(e).add(e.filter(c)),
                i = [];
            h.length && (d.each(b, function(b, c) {
                var e = d.inArray(c, a);
                e > -1 && i.push(a.splice(e, 1)[0])
            }), i.length && (this._bind(h, i, function(a) {
                var b = this.rendered ? this.tooltip[0].offsetWidth > 0 : !1;
                (b ? g : f).call(this, a)
            }), c = c.not(h), e = e.not(h))), this._bind(c, a, f), this._bind(e, b, g)
        }, z._assignInitialEvents = function(a) {
            function b(a) {
                return this.disabled || this.destroyed ? E : (this.cache.event = a && d.event.fix(a), this.cache.target = a && d(a.target), clearTimeout(this.timers.show), void(this.timers.show = l.call(this, function() {
                    this.render("object" == typeof a || c.show.ready)
                }, c.prerender ? 0 : c.show.delay)))
            }
            var c = this.options,
                e = c.show.target,
                f = c.hide.target,
                g = c.show.event ? d.trim("" + c.show.event).split(" ") : [],
                h = c.hide.event ? d.trim("" + c.hide.event).split(" ") : [];
            this._bind(this.elements.target, ["remove", "removeqtip"], function() {
                this.destroy(!0)
            }, "destroy"), /mouse(over|enter)/i.test(c.show.event) && !/mouse(out|leave)/i.test(c.hide.event) && h.push("mouseleave"), this._bind(e, "mousemove", function(a) {
                this._storeMouse(a), this.cache.onTarget = D
            }), this._bindEvents(g, h, e, f, b, function() {
                return this.timers ? void clearTimeout(this.timers.show) : E
            }), (c.show.ready || c.prerender) && b.call(this, a)
        }, z._assignEvents = function() {
            var c = this,
                e = this.options,
                f = e.position,
                g = this.tooltip,
                h = e.show.target,
                i = e.hide.target,
                j = f.container,
                k = f.viewport,
                l = d(b),
                q = d(a),
                r = e.show.event ? d.trim("" + e.show.event).split(" ") : [],
                s = e.hide.event ? d.trim("" + e.hide.event).split(" ") : [];
            d.each(e.events, function(a, b) {
                c._bind(g, "toggle" === a ? ["tooltipshow", "tooltiphide"] : ["tooltip" + a], b, null, g)
            }), /mouse(out|leave)/i.test(e.hide.event) && "window" === e.hide.leave && this._bind(l, ["mouseout", "blur"], function(a) {
                /select|option/.test(a.target.nodeName) || a.relatedTarget || this.hide(a)
            }), e.hide.fixed ? i = i.add(g.addClass(Y)) : /mouse(over|enter)/i.test(e.show.event) && this._bind(i, "mouseleave", function() {
                clearTimeout(this.timers.show)
            }), ("" + e.hide.event).indexOf("unfocus") > -1 && this._bind(j.closest("html"), ["mousedown", "touchstart"], function(a) {
                var b = d(a.target),
                    c = this.rendered && !this.tooltip.hasClass(aa) && this.tooltip[0].offsetWidth > 0,
                    e = b.parents(W).filter(this.tooltip[0]).length > 0;
                b[0] === this.target[0] || b[0] === this.tooltip[0] || e || this.target.has(b[0]).length || !c || this.hide(a)
            }), "number" == typeof e.hide.inactive && (this._bind(h, "qtip-" + this.id + "-inactive", o, "inactive"), this._bind(i.add(g), y.inactiveEvents, o)), this._bindEvents(r, s, h, i, m, n), this._bind(h.add(g), "mousemove", function(a) {
                if ("number" == typeof e.hide.distance) {
                    var b = this.cache.origin || {},
                        c = this.options.hide.distance,
                        d = Math.abs;
                    (d(a.pageX - b.pageX) >= c || d(a.pageY - b.pageY) >= c) && this.hide(a)
                }
                this._storeMouse(a)
            }), "mouse" === f.target && f.adjust.mouse && (e.hide.event && this._bind(h, ["mouseenter", "mouseleave"], function(a) {
                return this.cache ? void(this.cache.onTarget = "mouseenter" === a.type) : E
            }), this._bind(l, "mousemove", function(a) {
                this.rendered && this.cache.onTarget && !this.tooltip.hasClass(aa) && this.tooltip[0].offsetWidth > 0 && this.reposition(a)
            })), (f.adjust.resize || k.length) && this._bind(d.event.special.resize ? k : q, "resize", p), f.adjust.scroll && this._bind(q.add(f.container), "scroll", p)
        }, z._unassignEvents = function() {
            var c = this.options,
                e = c.show.target,
                f = c.hide.target,
                g = d.grep([this.elements.target[0], this.rendered && this.tooltip[0], c.position.container[0], c.position.viewport[0], c.position.container.closest("html")[0], a, b], function(a) {
                    return "object" == typeof a
                });
            e && e.toArray && (g = g.concat(e.toArray())), f && f.toArray && (g = g.concat(f.toArray())), this._unbind(g)._unbind(g, "destroy")._unbind(g, "inactive")
        }, d(function() {
            q(W, ["mouseenter", "mouseleave"], function(a) {
                var b = "mouseenter" === a.type,
                    c = d(a.currentTarget),
                    e = d(a.relatedTarget || a.target),
                    f = this.options;
                b ? (this.focus(a), c.hasClass(Y) && !c.hasClass(aa) && clearTimeout(this.timers.hide)) : "mouse" === f.position.target && f.position.adjust.mouse && f.hide.event && f.show.target && !e.closest(f.show.target[0]).length && this.hide(a), c.toggleClass(_, b)
            }), q("[" + U + "]", X, o)
        }), y = d.fn.qtip = function(a, b, e) {
            var f = ("" + a).toLowerCase(),
                g = F,
                i = d.makeArray(arguments).slice(1),
                j = i[i.length - 1],
                k = this[0] ? d.data(this[0], S) : F;
            return !arguments.length && k || "api" === f ? k : "string" == typeof a ? (this.each(function() {
                var a = d.data(this, S);
                if (!a) return D;
                if (j && j.timeStamp && (a.cache.event = j), !b || "option" !== f && "options" !== f) a[f] && a[f].apply(a, i);
                else {
                    if (e === c && !d.isPlainObject(b)) return g = a.get(b), E;
                    a.set(b, e)
                }
            }), g !== F ? g : this) : "object" != typeof a && arguments.length ? void 0 : (k = h(d.extend(D, {}, a)), this.each(function(a) {
                var b, c;
                return c = d.isArray(k.id) ? k.id[a] : k.id, c = !c || c === E || c.length < 1 || y.api[c] ? y.nextid++ : c, b = r(d(this), c, k), b === E ? D : (y.api[c] = b, d.each(R, function() {
                    "initialize" === this.initialize && this(b)
                }), void b._assignInitialEvents(j))
            }))
        }, d.qtip = e, y.api = {}, d.each({
            attr: function(a, b) {
                if (this.length) {
                    var c = this[0],
                        e = "title",
                        f = d.data(c, "qtip");
                    if (a === e && f && f.options && "object" == typeof f && "object" == typeof f.options && f.options.suppress) return arguments.length < 2 ? d.attr(c, ca) : (f && f.options.content.attr === e && f.cache.attr && f.set("content.text", b), this.attr(ca, b))
                }
                return d.fn["attr" + ba].apply(this, arguments)
            },
            clone: function(a) {
                var b = d.fn["clone" + ba].apply(this, arguments);
                return a || b.filter("[" + ca + "]").attr("title", function() {
                    return d.attr(this, ca)
                }).removeAttr(ca), b
            }
        }, function(a, b) {
            if (!b || d.fn[a + ba]) return D;
            var c = d.fn[a + ba] = d.fn[a];
            d.fn[a] = function() {
                return b.apply(this, arguments) || c.apply(this, arguments)
            }
        }), d.ui || (d["cleanData" + ba] = d.cleanData, d.cleanData = function(a) {
            for (var b, c = 0;
                (b = d(a[c])).length; c++)
                if (b.attr(T)) try {
                    b.triggerHandler("removeqtip")
                } catch (e) {}
            d["cleanData" + ba].apply(this, arguments)
        }), y.version = "3.0.3", y.nextid = 0, y.inactiveEvents = X, y.zindex = 15e3, y.defaults = {
            prerender: E,
            id: E,
            overwrite: D,
            suppress: D,
            content: {
                text: D,
                attr: "title",
                title: E,
                button: E
            },
            position: {
                my: "top left",
                at: "bottom right",
                target: E,
                container: E,
                viewport: E,
                adjust: {
                    x: 0,
                    y: 0,
                    mouse: D,
                    scroll: D,
                    resize: D,
                    method: "flipinvert flipinvert"
                },
                effect: function(a, b) {
                    d(this).animate(b, {
                        duration: 200,
                        queue: E
                    })
                }
            },
            show: {
                target: E,
                event: "mouseenter",
                effect: D,
                delay: 90,
                solo: E,
                ready: E,
                autofocus: E
            },
            hide: {
                target: E,
                event: "mouseleave",
                effect: D,
                delay: 0,
                fixed: E,
                inactive: E,
                leave: "window",
                distance: E
            },
            style: {
                classes: "",
                widget: E,
                width: E,
                height: E,
                def: D
            },
            events: {
                render: F,
                move: F,
                show: F,
                hide: F,
                toggle: F,
                visible: F,
                hidden: F,
                focus: F,
                blur: F
            }
        };
        var ha, ia, ja, ka, la, ma = "margin",
            na = "border",
            oa = "color",
            pa = "background-color",
            qa = "transparent",
            ra = " !important",
            sa = !!b.createElement("canvas").getContext,
            ta = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i,
            ua = {},
            va = ["Webkit", "O", "Moz", "ms"];
        sa ? (ka = a.devicePixelRatio || 1, la = function() {
            var a = b.createElement("canvas").getContext("2d");
            return a.backingStorePixelRatio || a.webkitBackingStorePixelRatio || a.mozBackingStorePixelRatio || a.msBackingStorePixelRatio || a.oBackingStorePixelRatio || 1
        }(), ja = ka / la) : ia = function(a, b, c) {
            return "<qtipvml:" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' + (b || "") + ' style="behavior: url(#default#VML); ' + (c || "") + '" />'
        }, d.extend(v.prototype, {
            init: function(a) {
                var b, c;
                c = this.element = a.elements.tip = d("<div />", {
                    "class": S + "-tip"
                }).prependTo(a.tooltip), sa ? (b = d("<canvas />").appendTo(this.element)[0].getContext("2d"), b.lineJoin = "miter", b.miterLimit = 1e5, b.save()) : (b = ia("shape", 'coordorigin="0,0"', "position:absolute;"), this.element.html(b + b), a._bind(d("*", c).add(c), ["click", "mousedown"], function(a) {
                    a.stopPropagation()
                }, this._ns)), a._bind(a.tooltip, "tooltipmove", this.reposition, this._ns, this), this.create()
            },
            _swapDimensions: function() {
                this.size[0] = this.options.height, this.size[1] = this.options.width
            },
            _resetDimensions: function() {
                this.size[0] = this.options.width, this.size[1] = this.options.height
            },
            _useTitle: function(a) {
                var b = this.qtip.elements.titlebar;
                return b && (a.y === K || a.y === O && this.element.position().top + this.size[1] / 2 + this.options.offset < b.outerHeight(D))
            },
            _parseCorner: function(a) {
                var b = this.qtip.options.position.my;
                return a === E || b === E ? a = E : a === D ? a = new A(b.string()) : a.string || (a = new A(a), a.fixed = D), a
            },
            _parseWidth: function(a, b, c) {
                var d = this.qtip.elements,
                    e = na + s(b) + "Width";
                return (c ? u(c, e) : u(d.content, e) || u(this._useTitle(a) && d.titlebar || d.content, e) || u(d.tooltip, e)) || 0
            },
            _parseRadius: function(a) {
                var b = this.qtip.elements,
                    c = na + s(a.y) + s(a.x) + "Radius";
                return da.ie < 9 ? 0 : u(this._useTitle(a) && b.titlebar || b.content, c) || u(b.tooltip, c) || 0
            },
            _invalidColour: function(a, b, c) {
                var d = a.css(b);
                return !d || c && d === a.css(c) || ta.test(d) ? E : d
            },
            _parseColours: function(a) {
                var b = this.qtip.elements,
                    c = this.element.css("cssText", ""),
                    e = na + s(a[a.precedance]) + s(oa),
                    f = this._useTitle(a) && b.titlebar || b.content,
                    g = this._invalidColour,
                    h = [];
                return h[0] = g(c, pa) || g(f, pa) || g(b.content, pa) || g(b.tooltip, pa) || c.css(pa), h[1] = g(c, e, oa) || g(f, e, oa) || g(b.content, e, oa) || g(b.tooltip, e, oa) || b.tooltip.css(e), d("*", c).add(c).css("cssText", pa + ":" + qa + ra + ";" + na + ":0" + ra + ";"), h
            },
            _calculateSize: function(a) {
                var b, c, d, e = a.precedance === H,
                    f = this.options.width,
                    g = this.options.height,
                    h = "c" === a.abbrev(),
                    i = (e ? f : g) * (h ? .5 : 1),
                    j = Math.pow,
                    k = Math.round,
                    l = Math.sqrt(j(i, 2) + j(g, 2)),
                    m = [this.border / i * l, this.border / g * l];
                return m[2] = Math.sqrt(j(m[0], 2) - j(this.border, 2)), m[3] = Math.sqrt(j(m[1], 2) - j(this.border, 2)), b = l + m[2] + m[3] + (h ? 0 : m[0]), c = b / l, d = [k(c * f), k(c * g)], e ? d : d.reverse()
            },
            _calculateTip: function(a, b, c) {
                c = c || 1, b = b || this.size;
                var d = b[0] * c,
                    e = b[1] * c,
                    f = Math.ceil(d / 2),
                    g = Math.ceil(e / 2),
                    h = {
                        br: [0, 0, d, e, d, 0],
                        bl: [0, 0, d, 0, 0, e],
                        tr: [0, e, d, 0, d, e],
                        tl: [0, 0, 0, e, d, e],
                        tc: [0, e, f, 0, d, e],
                        bc: [0, 0, d, 0, f, e],
                        rc: [0, 0, d, g, 0, e],
                        lc: [d, 0, d, e, 0, g]
                    };
                return h.lt = h.br, h.rt = h.bl, h.lb = h.tr, h.rb = h.tl, h[a.abbrev()]
            },
            _drawCoords: function(a, b) {
                a.beginPath(), a.moveTo(b[0], b[1]), a.lineTo(b[2], b[3]), a.lineTo(b[4], b[5]), a.closePath()
            },
            create: function() {
                var a = this.corner = (sa || da.ie) && this._parseCorner(this.options.corner);
                return this.enabled = !!this.corner && "c" !== this.corner.abbrev(), this.enabled && (this.qtip.cache.corner = a.clone(), this.update()), this.element.toggle(this.enabled), this.corner
            },
            update: function(b, c) {
                if (!this.enabled) return this;
                var e, f, g, h, i, j, k, l, m = this.qtip.elements,
                    n = this.element,
                    o = n.children(),
                    p = this.options,
                    q = this.size,
                    r = p.mimic,
                    s = Math.round;
                b || (b = this.qtip.cache.corner || this.corner), r === E ? r = b : (r = new A(r), r.precedance = b.precedance, "inherit" === r.x ? r.x = b.x : "inherit" === r.y ? r.y = b.y : r.x === r.y && (r[b.precedance] = b[b.precedance])), f = r.precedance, b.precedance === G ? this._swapDimensions() : this._resetDimensions(), e = this.color = this._parseColours(b), e[1] !== qa ? (l = this.border = this._parseWidth(b, b[b.precedance]), p.border && 1 > l && !ta.test(e[1]) && (e[0] = e[1]), this.border = l = p.border !== D ? p.border : l) : this.border = l = 0, k = this.size = this._calculateSize(b), n.css({
                    width: k[0],
                    height: k[1],
                    lineHeight: k[1] + "px"
                }), j = b.precedance === H ? [s(r.x === L ? l : r.x === N ? k[0] - q[0] - l : (k[0] - q[0]) / 2), s(r.y === K ? k[1] - q[1] : 0)] : [s(r.x === L ? k[0] - q[0] : 0), s(r.y === K ? l : r.y === M ? k[1] - q[1] - l : (k[1] - q[1]) / 2)], sa ? (g = o[0].getContext("2d"), g.restore(), g.save(), g.clearRect(0, 0, 6e3, 6e3), h = this._calculateTip(r, q, ja), i = this._calculateTip(r, this.size, ja), o.attr(I, k[0] * ja).attr(J, k[1] * ja), o.css(I, k[0]).css(J, k[1]), this._drawCoords(g, i), g.fillStyle = e[1], g.fill(), g.translate(j[0] * ja, j[1] * ja), this._drawCoords(g, h), g.fillStyle = e[0], g.fill()) : (h = this._calculateTip(r), h = "m" + h[0] + "," + h[1] + " l" + h[2] + "," + h[3] + " " + h[4] + "," + h[5] + " xe", j[2] = l && /^(r|b)/i.test(b.string()) ? 8 === da.ie ? 2 : 1 : 0, o.css({
                    coordsize: k[0] + l + " " + k[1] + l,
                    antialias: "" + (r.string().indexOf(O) > -1),
                    left: j[0] - j[2] * Number(f === G),
                    top: j[1] - j[2] * Number(f === H),
                    width: k[0] + l,
                    height: k[1] + l
                }).each(function(a) {
                    var b = d(this);
                    b[b.prop ? "prop" : "attr"]({
                        coordsize: k[0] + l + " " + k[1] + l,
                        path: h,
                        fillcolor: e[0],
                        filled: !!a,
                        stroked: !a
                    }).toggle(!(!l && !a)), !a && b.html(ia("stroke", 'weight="' + 2 * l + 'px" color="' + e[1] + '" miterlimit="1000" joinstyle="miter"'))
                })), a.opera && setTimeout(function() {
                    m.tip.css({
                        display: "inline-block",
                        visibility: "visible"
                    })
                }, 1), c !== E && this.calculate(b, k)
            },
            calculate: function(a, b) {
                if (!this.enabled) return E;
                var c, e, f = this,
                    g = this.qtip.elements,
                    h = this.element,
                    i = this.options.offset,
                    j = {};
                return a = a || this.corner, c = a.precedance, b = b || this._calculateSize(a), e = [a.x, a.y], c === G && e.reverse(), d.each(e, function(d, e) {
                    var h, k, l;
                    e === O ? (h = c === H ? L : K, j[h] = "50%", j[ma + "-" + h] = -Math.round(b[c === H ? 0 : 1] / 2) + i) : (h = f._parseWidth(a, e, g.tooltip), k = f._parseWidth(a, e, g.content), l = f._parseRadius(a), j[e] = Math.max(-f.border, d ? k : i + (l > h ? l : -h)))
                }), j[a[c]] -= b[c === G ? 0 : 1], h.css({
                    margin: "",
                    top: "",
                    bottom: "",
                    left: "",
                    right: ""
                }).css(j), j
            },
            reposition: function(a, b, d) {
                function e(a, b, c, d, e) {
                    a === Q && j.precedance === b && k[d] && j[c] !== O ? j.precedance = j.precedance === G ? H : G : a !== Q && k[d] && (j[b] = j[b] === O ? k[d] > 0 ? d : e : j[b] === d ? e : d)
                }

                function f(a, b, e) {
                    j[a] === O ? p[ma + "-" + b] = o[a] = g[ma + "-" + b] - k[b] : (h = g[e] !== c ? [k[b], -g[b]] : [-k[b], g[b]], (o[a] = Math.max(h[0], h[1])) > h[0] && (d[b] -= k[b], o[b] = E), p[g[e] !== c ? e : b] = o[a])
                }
                if (this.enabled) {
                    var g, h, i = b.cache,
                        j = this.corner.clone(),
                        k = d.adjusted,
                        l = b.options.position.adjust.method.split(" "),
                        m = l[0],
                        n = l[1] || l[0],
                        o = {
                            left: E,
                            top: E,
                            x: 0,
                            y: 0
                        },
                        p = {};
                    this.corner.fixed !== D && (e(m, G, H, L, N), e(n, H, G, K, M), j.string() === i.corner.string() && i.cornerTop === k.top && i.cornerLeft === k.left || this.update(j, E)), g = this.calculate(j), g.right !== c && (g.left = -g.right), g.bottom !== c && (g.top = -g.bottom), g.user = this.offset, o.left = m === Q && !!k.left, o.left && f(G, L, N), o.top = n === Q && !!k.top, o.top && f(H, K, M), this.element.css(p).toggle(!(o.x && o.y || j.x === O && o.y || j.y === O && o.x)), d.left -= g.left.charAt ? g.user : m !== Q || o.top || !o.left && !o.top ? g.left + this.border : 0, d.top -= g.top.charAt ? g.user : n !== Q || o.left || !o.left && !o.top ? g.top + this.border : 0, i.cornerLeft = k.left, i.cornerTop = k.top, i.corner = j.clone()
                }
            },
            destroy: function() {
                this.qtip._unbind(this.qtip.tooltip, this._ns), this.qtip.elements.tip && this.qtip.elements.tip.find("*").remove().end().remove()
            }
        }), ha = R.tip = function(a) {
            return new v(a, a.options.style.tip)
        }, ha.initialize = "render", ha.sanitize = function(a) {
            if (a.style && "tip" in a.style) {
                var b = a.style.tip;
                "object" != typeof b && (b = a.style.tip = {
                    corner: b
                }), /string|boolean/i.test(typeof b.corner) || (b.corner = D)
            }
        }, B.tip = {
            "^position.my|style.tip.(corner|mimic|border)$": function() {
                this.create(), this.qtip.reposition()
            },
            "^style.tip.(height|width)$": function(a) {
                this.size = [a.width, a.height], this.update(), this.qtip.reposition()
            },
            "^content.title|style.(classes|widget)$": function() {
                this.update()
            }
        }, d.extend(D, y.defaults, {
            style: {
                tip: {
                    corner: D,
                    mimic: E,
                    width: 6,
                    height: 6,
                    border: D,
                    offset: 0
                }
            }
        });
        var wa, xa, ya = "qtip-modal",
            za = "." + ya;
        xa = function() {
            function a(a) {
                if (d.expr[":"].focusable) return d.expr[":"].focusable;
                var b, c, e, f = !isNaN(d.attr(a, "tabindex")),
                    g = a.nodeName && a.nodeName.toLowerCase();
                return "area" === g ? (b = a.parentNode, c = b.name, a.href && c && "map" === b.nodeName.toLowerCase() ? (e = d("img[usemap=#" + c + "]")[0], !!e && e.is(":visible")) : !1) : /input|select|textarea|button|object/.test(g) ? !a.disabled : "a" === g ? a.href || f : f
            }

            function c(a) {
                j.length < 1 && a.length ? a.not("body").blur() : j.first().focus()
            }

            function e(a) {
                if (h.is(":visible")) {
                    var b, e = d(a.target),
                        g = f.tooltip,
                        i = e.closest(W);
                    b = i.length < 1 ? E : parseInt(i[0].style.zIndex, 10) > parseInt(g[0].style.zIndex, 10), b || e.closest(W)[0] === g[0] || c(e)
                }
            }
            var f, g, h, i = this,
                j = {};
            d.extend(i, {
                init: function() {
                    return h = i.elem = d("<div />", {
                        id: "qtip-overlay",
                        html: "<div></div>",
                        mousedown: function() {
                            return E
                        }
                    }).hide(), d(b.body).bind("focusin" + za, e), d(b).bind("keydown" + za, function(a) {
                        f && f.options.show.modal.escape && 27 === a.keyCode && f.hide(a)
                    }), h.bind("click" + za, function(a) {
                        f && f.options.show.modal.blur && f.hide(a)
                    }), i
                },
                update: function(b) {
                    f = b, j = b.options.show.modal.stealfocus !== E ? b.tooltip.find("*").filter(function() {
                        return a(this)
                    }) : []
                },
                toggle: function(a, e, j) {
                    var k = a.tooltip,
                        l = a.options.show.modal,
                        m = l.effect,
                        n = e ? "show" : "hide",
                        o = h.is(":visible"),
                        p = d(za).filter(":visible:not(:animated)").not(k);
                    return i.update(a), e && l.stealfocus !== E && c(d(":focus")), h.toggleClass("blurs", l.blur), e && h.appendTo(b.body), h.is(":animated") && o === e && g !== E || !e && p.length ? i : (h.stop(D, E), d.isFunction(m) ? m.call(h, e) : m === E ? h[n]() : h.fadeTo(parseInt(j, 10) || 90, e ? 1 : 0, function() {
                        e || h.hide()
                    }), e || h.queue(function(a) {
                        h.css({
                            left: "",
                            top: ""
                        }), d(za).length || h.detach(), a()
                    }), g = e, f.destroyed && (f = F), i)
                }
            }), i.init()
        }, xa = new xa, d.extend(w.prototype, {
            init: function(a) {
                var b = a.tooltip;
                return this.options.on ? (a.elements.overlay = xa.elem, b.addClass(ya).css("z-index", y.modal_zindex + d(za).length), a._bind(b, ["tooltipshow", "tooltiphide"], function(a, c, e) {
                    var f = a.originalEvent;
                    if (a.target === b[0])
                        if (f && "tooltiphide" === a.type && /mouse(leave|enter)/.test(f.type) && d(f.relatedTarget).closest(xa.elem[0]).length) try {
                            a.preventDefault()
                        } catch (g) {} else(!f || f && "tooltipsolo" !== f.type) && this.toggle(a, "tooltipshow" === a.type, e)
                }, this._ns, this), a._bind(b, "tooltipfocus", function(a, c) {
                    if (!a.isDefaultPrevented() && a.target === b[0]) {
                        var e = d(za),
                            f = y.modal_zindex + e.length,
                            g = parseInt(b[0].style.zIndex, 10);
                        xa.elem[0].style.zIndex = f - 1, e.each(function() {
                            this.style.zIndex > g && (this.style.zIndex -= 1)
                        }), e.filter("." + $).qtip("blur", a.originalEvent), b.addClass($)[0].style.zIndex = f, xa.update(c);
                        try {
                            a.preventDefault()
                        } catch (h) {}
                    }
                }, this._ns, this), void a._bind(b, "tooltiphide", function(a) {
                    a.target === b[0] && d(za).filter(":visible").not(b).last().qtip("focus", a)
                }, this._ns, this)) : this
            },
            toggle: function(a, b, c) {
                return a && a.isDefaultPrevented() ? this : void xa.toggle(this.qtip, !!b, c)
            },
            destroy: function() {
                this.qtip.tooltip.removeClass(ya), this.qtip._unbind(this.qtip.tooltip, this._ns), xa.toggle(this.qtip, E), delete this.qtip.elements.overlay
            }
        }), wa = R.modal = function(a) {
            return new w(a, a.options.show.modal)
        }, wa.sanitize = function(a) {
            a.show && ("object" != typeof a.show.modal ? a.show.modal = {
                on: !!a.show.modal
            } : "undefined" == typeof a.show.modal.on && (a.show.modal.on = D))
        }, y.modal_zindex = y.zindex - 200, wa.initialize = "render", B.modal = {
            "^show.modal.(on|blur)$": function() {
                this.destroy(), this.init(), this.qtip.elems.overlay.toggle(this.qtip.tooltip[0].offsetWidth > 0)
            }
        }, d.extend(D, y.defaults, {
            show: {
                modal: {
                    on: E,
                    effect: D,
                    blur: D,
                    stealfocus: D,
                    escape: D
                }
            }
        }), R.viewport = function(c, d, e, f, g, h, i) {
            function j(a, b, c, e, f, g, h, i, j) {
                var k = d[f],
                    s = u[a],
                    t = v[a],
                    w = c === Q,
                    x = s === f ? j : s === g ? -j : -j / 2,
                    y = t === f ? i : t === g ? -i : -i / 2,
                    z = q[f] + r[f] - (n ? 0 : m[f]),
                    A = z - k,
                    B = k + j - (h === I ? o : p) - z,
                    C = x - (u.precedance === a || s === u[b] ? y : 0) - (t === O ? i / 2 : 0);
                return w ? (C = (s === f ? 1 : -1) * x, d[f] += A > 0 ? A : B > 0 ? -B : 0, d[f] = Math.max(-m[f] + r[f], k - C, Math.min(Math.max(-m[f] + r[f] + (h === I ? o : p), k + C), d[f], "center" === s ? k - x : 1e9))) : (e *= c === P ? 2 : 0, A > 0 && (s !== f || B > 0) ? (d[f] -= C + e, l.invert(a, f)) : B > 0 && (s !== g || A > 0) && (d[f] -= (s === O ? -C : C) + e, l.invert(a, g)), d[f] < q[f] && -d[f] > B && (d[f] = k, l = u.clone())), d[f] - k
            }
            var k, l, m, n, o, p, q, r, s = e.target,
                t = c.elements.tooltip,
                u = e.my,
                v = e.at,
                w = e.adjust,
                x = w.method.split(" "),
                y = x[0],
                z = x[1] || x[0],
                A = e.viewport,
                B = e.container,
                C = {
                    left: 0,
                    top: 0
                };
            return A.jquery && s[0] !== a && s[0] !== b.body && "none" !== w.method ? (m = B.offset() || C, n = "static" === B.css("position"), k = "fixed" === t.css("position"), o = A[0] === a ? A.width() : A.outerWidth(E), p = A[0] === a ? A.height() : A.outerHeight(E), q = {
                left: k ? 0 : A.scrollLeft(),
                top: k ? 0 : A.scrollTop()
            }, r = A.offset() || C, "shift" === y && "shift" === z || (l = u.clone()), C = {
                left: "none" !== y ? j(G, H, y, w.x, L, N, I, f, h) : 0,
                top: "none" !== z ? j(H, G, z, w.y, K, M, J, g, i) : 0,
                my: l
            }) : C
        }, R.polys = {
            polygon: function(a, b) {
                var c, d, e, f = {
                        width: 0,
                        height: 0,
                        position: {
                            top: 1e10,
                            right: 0,
                            bottom: 0,
                            left: 1e10
                        },
                        adjustable: E
                    },
                    g = 0,
                    h = [],
                    i = 1,
                    j = 1,
                    k = 0,
                    l = 0;
                for (g = a.length; g--;) c = [parseInt(a[--g], 10), parseInt(a[g + 1], 10)], c[0] > f.position.right && (f.position.right = c[0]), c[0] < f.position.left && (f.position.left = c[0]), c[1] > f.position.bottom && (f.position.bottom = c[1]), c[1] < f.position.top && (f.position.top = c[1]), h.push(c);
                if (d = f.width = Math.abs(f.position.right - f.position.left), e = f.height = Math.abs(f.position.bottom - f.position.top), "c" === b.abbrev()) f.position = {
                    left: f.position.left + f.width / 2,
                    top: f.position.top + f.height / 2
                };
                else {
                    for (; d > 0 && e > 0 && i > 0 && j > 0;)
                        for (d = Math.floor(d / 2), e = Math.floor(e / 2), b.x === L ? i = d : b.x === N ? i = f.width - d : i += Math.floor(d / 2), b.y === K ? j = e : b.y === M ? j = f.height - e : j += Math.floor(e / 2), g = h.length; g-- && !(h.length < 2);) k = h[g][0] - f.position.left, l = h[g][1] - f.position.top, (b.x === L && k >= i || b.x === N && i >= k || b.x === O && (i > k || k > f.width - i) || b.y === K && l >= j || b.y === M && j >= l || b.y === O && (j > l || l > f.height - j)) && h.splice(g, 1);
                    f.position = {
                        left: h[0][0],
                        top: h[0][1]
                    }
                }
                return f
            },
            rect: function(a, b, c, d) {
                return {
                    width: Math.abs(c - a),
                    height: Math.abs(d - b),
                    position: {
                        left: Math.min(a, c),
                        top: Math.min(b, d)
                    }
                }
            },
            _angles: {
                tc: 1.5,
                tr: 7 / 4,
                tl: 5 / 4,
                bc: .5,
                br: .25,
                bl: .75,
                rc: 2,
                lc: 1,
                c: 0
            },
            ellipse: function(a, b, c, d, e) {
                var f = R.polys._angles[e.abbrev()],
                    g = 0 === f ? 0 : c * Math.cos(f * Math.PI),
                    h = d * Math.sin(f * Math.PI);
                return {
                    width: 2 * c - Math.abs(g),
                    height: 2 * d - Math.abs(h),
                    position: {
                        left: a + g,
                        top: b + h
                    },
                    adjustable: E
                }
            },
            circle: function(a, b, c, d) {
                return R.polys.ellipse(a, b, c, c, d)
            }
        }, R.svg = function(a, c, e) {
            for (var f, g, h, i, j, k, l, m, n, o = c[0], p = d(o.ownerSVGElement), q = o.ownerDocument, r = (parseInt(c.css("stroke-width"), 10) || 0) / 2; !o.getBBox;) o = o.parentNode;
            if (!o.getBBox || !o.parentNode) return E;
            switch (o.nodeName) {
                case "ellipse":
                case "circle":
                    m = R.polys.ellipse(o.cx.baseVal.value, o.cy.baseVal.value, (o.rx || o.r).baseVal.value + r, (o.ry || o.r).baseVal.value + r, e);
                    break;
                case "line":
                case "polygon":
                case "polyline":
                    for (l = o.points || [{
                            x: o.x1.baseVal.value,
                            y: o.y1.baseVal.value
                        }, {
                            x: o.x2.baseVal.value,
                            y: o.y2.baseVal.value
                        }], m = [], k = -1, i = l.numberOfItems || l.length; ++k < i;) j = l.getItem ? l.getItem(k) : l[k], m.push.apply(m, [j.x, j.y]);
                    m = R.polys.polygon(m, e);
                    break;
                default:
                    m = o.getBBox(), m = {
                        width: m.width,
                        height: m.height,
                        position: {
                            left: m.x,
                            top: m.y
                        }
                    }
            }
            return n = m.position, p = p[0], p.createSVGPoint && (g = o.getScreenCTM(), l = p.createSVGPoint(), l.x = n.left, l.y = n.top, h = l.matrixTransform(g), n.left = h.x, n.top = h.y), q !== b && "mouse" !== a.position.target && (f = d((q.defaultView || q.parentWindow).frameElement).offset(), f && (n.left += f.left, n.top += f.top)), q = d(q), n.left += q.scrollLeft(), n.top += q.scrollTop(), m
        }, R.imagemap = function(a, b, c) {
            b.jquery || (b = d(b));
            var e, f, g, h, i, j = (b.attr("shape") || "rect").toLowerCase().replace("poly", "polygon"),
                k = d('img[usemap="#' + b.parent("map").attr("name") + '"]'),
                l = d.trim(b.attr("coords")),
                m = l.replace(/,$/, "").split(",");
            if (!k.length) return E;
            if ("polygon" === j) h = R.polys.polygon(m, c);
            else {
                if (!R.polys[j]) return E;
                for (g = -1, i = m.length, f = []; ++g < i;) f.push(parseInt(m[g], 10));
                h = R.polys[j].apply(this, f.concat(c))
            }
            return e = k.offset(), e.left += Math.ceil((k.outerWidth(E) - k.width()) / 2), e.top += Math.ceil((k.outerHeight(E) - k.height()) / 2), h.position.left += e.left, h.position.top += e.top, h
        };
        var Aa, Ba = '<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>';
        d.extend(x.prototype, {
            _scroll: function() {
                var b = this.qtip.elements.overlay;
                b && (b[0].style.top = d(a).scrollTop() + "px")
            },
            init: function(c) {
                var e = c.tooltip;
                d("select, object").length < 1 && (this.bgiframe = c.elements.bgiframe = d(Ba).appendTo(e), c._bind(e, "tooltipmove", this.adjustBGIFrame, this._ns, this)), this.redrawContainer = d("<div/>", {
                    id: S + "-rcontainer"
                }).appendTo(b.body), c.elements.overlay && c.elements.overlay.addClass("qtipmodal-ie6fix") && (c._bind(a, ["scroll", "resize"], this._scroll, this._ns, this), c._bind(e, ["tooltipshow"], this._scroll, this._ns, this)), this.redraw()
            },
            adjustBGIFrame: function() {
                var a, b, c = this.qtip.tooltip,
                    d = {
                        height: c.outerHeight(E),
                        width: c.outerWidth(E)
                    },
                    e = this.qtip.plugins.tip,
                    f = this.qtip.elements.tip;
                b = parseInt(c.css("borderLeftWidth"), 10) || 0, b = {
                    left: -b,
                    top: -b
                }, e && f && (a = "x" === e.corner.precedance ? [I, L] : [J, K], b[a[1]] -= f[a[0]]()), this.bgiframe.css(b).css(d)
            },
            redraw: function() {
                if (this.qtip.rendered < 1 || this.drawing) return this;
                var a, b, c, d, e = this.qtip.tooltip,
                    f = this.qtip.options.style,
                    g = this.qtip.options.position.container;
                return this.qtip.drawing = 1, f.height && e.css(J, f.height), f.width ? e.css(I, f.width) : (e.css(I, "").appendTo(this.redrawContainer), b = e.width(), 1 > b % 2 && (b += 1), c = e.css("maxWidth") || "", d = e.css("minWidth") || "", a = (c + d).indexOf("%") > -1 ? g.width() / 100 : 0, c = (c.indexOf("%") > -1 ? a : 1 * parseInt(c, 10)) || b, d = (d.indexOf("%") > -1 ? a : 1 * parseInt(d, 10)) || 0, b = c + d ? Math.min(Math.max(b, d), c) : b, e.css(I, Math.round(b)).appendTo(g)), this.drawing = 0, this
            },
            destroy: function() {
                this.bgiframe && this.bgiframe.remove(), this.qtip._unbind([a, this.qtip.tooltip], this._ns)
            }
        }), Aa = R.ie6 = function(a) {
            return 6 === da.ie ? new x(a) : E
        }, Aa.initialize = "render", B.ie6 = {
            "^content|style$": function() {
                this.redraw()
            }
        }
    })
}(window, document);

/*
 * jquery.infieldlabel
 * A simple jQuery plugin for adding labels that sit over a form field and fade away when the fields are populated.
 * 
 * Copyright (c) 2009 - 2013 Doug Neiner <doug@dougneiner.com> (http://code.dougneiner.com)
 * Source: https://github.com/dcneiner/In-Field-Labels-jQuery-Plugin
 * Dual licensed MIT or GPL
 *   MIT (http://www.opensource.org/licenses/mit-license)
 *   GPL (http://www.opensource.org/licenses/gpl-license)
 *
 * @version 0.1.5
 */
(function(e) {
    e.InFieldLabels = function(n, i, t) {
        var a = this;
        a.$label = e(n), a.label = n, a.$field = e(i), a.field = i, a.$label.data("InFieldLabels", a), a.showing = !0, a.init = function() {
            var n;
            a.options = e.extend({}, e.InFieldLabels.defaultOptions, t), a.options.className && a.$label.addClass(a.options.className), setTimeout(function() {
                "" !== a.$field.val() ? (a.$label.hide(), a.showing = !1) : (a.$label.show(), a.showing = !0)
            }, 200), a.$field.focus(function() {
                a.fadeOnFocus()
            }).blur(function() {
                a.checkForEmpty(!0)
            }).bind("keydown.infieldlabel", function(e) {
                a.hideOnChange(e)
            }).bind("paste", function() {
                a.setOpacity(0)
            }).change(function() {
                a.checkForEmpty()
            }).bind("onPropertyChange", function() {
                a.checkForEmpty()
            }).bind("keyup.infieldlabel", function() {
                a.checkForEmpty()
            }), a.options.pollDuration > 0 && (n = setInterval(function() {
                "" !== a.$field.val() && (a.$label.hide(), a.showing = !1, clearInterval(n))
            }, a.options.pollDuration))
        }, a.fadeOnFocus = function() {
            a.showing && a.setOpacity(a.options.fadeOpacity)
        }, a.setOpacity = function(e) {
            a.$label.stop().animate({
                opacity: e
            }, a.options.fadeDuration, function() {
                0 === e && a.$label.hide()
            }), a.showing = e > 0
        }, a.checkForEmpty = function(e) {
            "" === a.$field.val() ? (a.prepForShow(), a.setOpacity(e ? 1 : a.options.fadeOpacity)) : a.setOpacity(0)
        }, a.prepForShow = function() {
            a.showing || (a.$label.css({
                opacity: 0
            }).show(), a.$field.bind("keydown.infieldlabel", function(e) {
                a.hideOnChange(e)
            }))
        }, a.hideOnChange = function(e) {
            16 !== e.keyCode && 9 !== e.keyCode && (a.showing && (a.$label.hide(), a.showing = !1), a.$field.unbind("keydown.infieldlabel"))
        }, a.init()
    }, e.InFieldLabels.defaultOptions = {
        fadeOpacity: .5,
        fadeDuration: 300,
        pollDuration: 0,
        enabledInputTypes: ["text", "search", "tel", "url", "email", "password", "number", "textarea"],
        className: !1
    }, e.fn.inFieldLabels = function(n) {
        var i = n && n.enabledInputTypes || e.InFieldLabels.defaultOptions.enabledInputTypes;
        return this.each(function() {
            var t, a, o = e(this).attr("for");
            o && (t = document.getElementById(o), t && (a = e.inArray(t.type, i), (-1 !== a || "TEXTAREA" === t.nodeName) && new e.InFieldLabels(this, t, n)))
        })
    }
})(jQuery);
! function(d) {
    "use strict";
    var e;

    function h(e, t) {
        if (this.$form = d(e), this.submitted = !1, this.nextUploadId = 1, this.removedUploadUids = [], this.captchaRefreshQueue = [], this.uploadQueue = [], this.uploadElements = [], this.logicCache = {}, !this.$form.length) throw new Error("Form not found.");
        if (this.$form.data("quform")) throw new Error("Quform already attached.");
        this.$form.data("quform", this), this.options = d.extend({}, h.defaults, t), d.isFunction(d.scrollTo) && d.isFunction(d.fn.scrollTo) || (this.options.scrolling = !1), this.$wrapper = this.$form.closest(".quform"), this.$elements = d(".quform-elements", this.$form), this.$loading = d(".quform-loading", this.$form), this.currentPageId = this.options.currentPageId, this.submitStartTime = 0, this.submitEndTime = 0, this.successTimeout = null, this.errorShowFunction = this.$wrapper.hasClass("quform-errors-absolute") ? "fadeIn" : "quformShowSlide", this.init()
    }
    h.defaults = {
        errorsIcon: "",
        scrolling: !0,
        scrollSpeed: 800,
        scrollDelay: 0,
        scrollOffset: -50,
        hasPages: !1,
        pages: [],
        logic: {
            logic: [],
            dependents: [],
            elementIds: [],
            dependentElementIds: [],
            animate: !0
        }
    }, h.prototype.init = function() {
        var a = this;
        this.setupInsideLabels(), this.setupEnhancedSelects(), this.setupEnhancedUploaders(), this.setupDatepickers(), this.setupTimepickers(), this.applyAllLogic(!0), this.setupTooltips(), this.setupCaptchaImages(), this.$wrapper.hasClass("quform-prevent-fouc") && this.$wrapper.removeClass("quform-prevent-fouc"), this.options.ajax && (a.$form.on("submit", function(e) {
            if (e.preventDefault(), window.grecaptcha) {
                var t = a.$form.find(".quform-recaptcha");
                if (t.length) {
                    var o = t.data("config");
                    if ("v3" === o._version) return void window.grecaptcha.execute(t.data("recaptcha-id"), {
                        action: "quform"
                    }).then(function(e) {
                        t.find(".g-recaptcha-response").val(e), a.submit()
                    });
                    if ("invisible" === o.size) return void window.grecaptcha.execute(t.data("recaptcha-id"))
                }
            }
            a.submit()
        }), d(".quform-back", a.$form).on("click", function(e) {
            e.preventDefault(), a.submit("back")
        }), a.$form.addClass("quform-ajax-initialized")), d(".quform-field-select.quform-submit-on-choice", a.$form).change(function() {
            a.$form.submit()
        }), d(".quform-field-radio.quform-submit-on-choice", a.$form).click(function() {
            a.$form.submit()
        }), d(".quform-button-submit > button", a.$form).each(function() {
            var e, t, o = d(this),
                i = o.closest(".quform-button-submit"),
                r = i.data("animation"),
                n = 1e3,
                s = a.options.scrollDelay;
            r && (e = "quform-button-animation-" + r, "two" === r && (n = 3200), o.click(function() {
                a.options.scrollDelay = n, i.removeClass(e), "number" == typeof t && (clearTimeout(t), t = null), setTimeout(function() {
                    i.addClass(e), t = setTimeout(function() {
                        i.removeClass(e), a.options.scrollDelay = s
                    }, n)
                }, 4)
            }))
        })
    }, h.prototype.setupInsideLabels = function() {
        var r = this;
        d.InFieldLabels ? d(".quform-labels-inside > .quform-spacer > .quform-label", r.$form).each(function() {
            var e = d(this),
                t = e.parent().find(".quform-input"),
                o = t.find(".quform-field"),
                i = {
                    top: parseInt(o.css("padding-top"), 10) + parseInt(o.css("border-top-width"), 10)
                };
            r.options.isRtl ? i.right = parseInt(o.css("padding-right"), 10) + parseInt(o.css("border-right-width"), 10) : i.left = parseInt(o.css("padding-left"), 10) + parseInt(o.css("border-left-width"), 10), e.addClass("quform-label-inside").css(i).appendTo(t), new d.InFieldLabels(e[0], o[0])
        }) : d(".quform-labels-inside > .quform-spacer > .quform-label", r.$form).show()
    }, h.prototype.setupEnhancedSelects = function() {
        if ("function" == typeof d.fn.select2) {
            var r = this;
            d(".quform-field-select-enhanced", r.$form).each(function() {
                var e = d(this),
                    t = e.data("options"),
                    o = {
                        theme: "quform",
                        language: {
                            noResults: function() {
                                return t.noResultsFound
                            }
                        }
                    };
                t.search || (o.minimumResultsForSearch = Infinity), t.rtl && (o.dir = "rtl"), e.select2(o);
                var i = "quform-" + r.options.id + "-select2";
                h.isNonEmptyString(r.options.theme) && (i += " quform-theme-" + r.options.theme), e.on("select2:opening", function() {
                    e.data("select2").$dropdown.addClass(i)
                })
            }), d(".quform-field-multiselect-enhanced", r.$form).each(function() {
                var e = d(this),
                    t = e.data("options"),
                    o = {
                        theme: "quform",
                        language: {
                            noResults: function() {
                                return t.noResultsFound
                            }
                        }
                    };
                h.isNonEmptyString(t.placeholder) && (o.placeholder = t.placeholder), t.rtl && (o.dir = "rtl"), e.select2(o);
                var i = "quform-" + r.options.id + "-select2";
                h.isNonEmptyString(r.options.theme) && (i += " quform-theme-" + r.options.theme), e.on("select2:opening", function() {
                    e.data("select2").$dropdown.addClass(i)
                })
            })
        }
    }, h.prototype.setupEnhancedUploaders = function() {
        if (d.isFunction(d.fn.fileupload) && d.support.xhrFileUpload && d.support.xhrFormDataFileUpload) {
            var s = this;
            d(".quform-field-file-enhanced", s.$form).each(function() {
                var e, t = d(this),
                    o = t.closest(".quform-input-file"),
                    i = t.data("config"),
                    r = d('<div class="quform-upload-files quform-cf">').insertAfter(o).hide();
                i.queued = 0, s.uploadElements.push(i), e = "dropzone" === i.buttonType ? s.createUploadButton("quform-upload-dropzone", i) : s.createUploadButton("quform-upload-button", i), o.append(e.append(t));
                var n = t.closest(".quform-element").addClass("quform-enhanced-upload");
                t.fileupload({
                    dataType: "json",
                    paramName: i.name + "[]",
                    dropZone: e,
                    change: function() {
                        n.find(".quform-error").empty().remove()
                    },
                    add: function(e, t) {
                        s.uploadAdd(t, i, r)
                    },
                    start: function() {
                        d(".quform-upload-progress-wrap", s.$form).show()
                    },
                    progress: function(e, t) {
                        var o = Math.min(100, t.loaded / t.total * 100);
                        d(".quform-upload-progress-bar", s.$form).css("width", o + "%"), d(".quform-upload-filename", s.$form).text(t.files[0].name)
                    }
                })
            })
        }
    }, h.prototype.createUploadButton = function(e, t) {
        var o = d('<div class="' + e + '">');
        if (o.append(d('<span class="' + e + '-text">').text(t.buttonText)), h.isNonEmptyString(t.buttonIcon)) {
            var i = d('<span class="' + e + '-icon">').append(d('<i class="' + t.buttonIcon + '">'));
            o.addClass(e + "-icon-" + t.buttonIconPosition), "right" === t.buttonIconPosition ? o.append(i) : o.prepend(i)
        }
        return o
    }, h.prototype.setupDatepickers = function() {
        if (d.isFunction(d.fn.kendoDatePicker)) {
            var m = this;
            d(".quform-field-date", m.$form).each(function() {
                var o = d(this).addClass("quform-field-date-enhanced"),
                    e = o.closest(".quform-input-date"),
                    t = e.find("> .quform-field-icon"),
                    i = o.data("options"),
                    r = d("<input>", {
                        type: "hidden",
                        name: o.attr("name"),
                        value: o.val()
                    }).data("default", o.val()).addClass("quform-field-date-hidden").insertAfter(o);
                o.attr("name", ""), i.placeholder ? o.attr("placeholder", i.placeholder) : o.removeAttr("placeholder");
                var n = {
                    start: i.start || "month",
                    depth: i.depth || "month",
                    culture: i.locale || "en-US"
                };
                if (i.format ? n.format = i.format : n.format = kendo.getCulture(i.locale).calendars.standard.patterns.d, i.showFooter || (n.footer = !1), i.min) {
                    var s = kendo.parseDate(i.min, "yyyy-MM-dd");
                    null !== s && (n.min = s)
                }
                if (i.max) {
                    var a = kendo.parseDate(i.max, "yyyy-MM-dd");
                    null !== a && (n.max = a)
                }
                o.kendoDatePicker(n), o.removeClass("k-input").closest(".k-datepicker").removeClass().addClass("k-widget k-datepicker k-header");
                var u = o.data("kendoDatePicker"),
                    c = "quform-datepicker quform-" + m.options.id + "-datepicker quform-" + i.identifier + "-datepicker";
                h.isNonEmptyString(m.options.theme) && (c += " quform-theme-" + m.options.theme), u.dateView.popup.element.addClass(c), e.find(".k-select").hide(), i.autoOpen && o.on("click focus", function() {
                    u.open()
                }).blur(function() {
                    u.close()
                }), t.click(function() {
                    u.open()
                });
                var l = function() {
                    var e = o.val();
                    if (h.isNonEmptyString(e)) {
                        var t = kendo.parseDate(e, n.format, n.culture);
                        null === t ? r.val("9999-99-99") : r.val(kendo.toString(t, "yyyy-MM-dd"))
                    } else r.val("")
                };
                u.bind("change", l), o.on("blur.quformDatePicker keyup.quformDatePicker", l);
                var f = o.val();
                if (h.isNonEmptyString(f)) {
                    var p = kendo.parseDate(f, "yyyy-MM-dd");
                    null !== p && (u.value(p), l())
                }
            })
        }
    }, h.prototype.setupTimepickers = function() {
        if (d.isFunction(d.fn.kendoTimePicker)) {
            var m = this;
            d(".quform-field-time", m.$form).each(function() {
                var o = d(this).addClass("quform-field-time-enhanced"),
                    e = o.closest(".quform-input-time"),
                    t = e.find("> .quform-field-icon"),
                    i = o.data("options"),
                    r = d("<input>", {
                        type: "hidden",
                        name: o.attr("name"),
                        value: o.val()
                    }).data("default", o.val()).addClass("quform-field-time-hidden").insertAfter(o);
                o.attr("name", ""), i.placeholder ? o.attr("placeholder", i.placeholder) : o.removeAttr("placeholder");
                var n = {
                    interval: i.interval && d.isNumeric(i.interval) ? parseInt(i.interval, 10) : 30,
                    culture: i.locale || "en-US"
                };
                if (i.format ? n.format = i.format : n.format = kendo.getCulture(i.locale).calendars.standard.patterns.t, i.min) {
                    var s = kendo.parseDate(i.min, "HH:mm");
                    null !== s && (n.min = s)
                }
                if (i.max) {
                    var a = kendo.parseDate(i.max, "HH:mm");
                    null !== a && (n.max = a)
                }
                o.kendoTimePicker(n), o.removeClass("k-input").closest(".k-timepicker").removeClass().addClass("k-widget k-timepicker k-header");
                var u = o.data("kendoTimePicker"),
                    c = "quform-timepicker quform-" + m.options.id + "-timepicker quform-" + i.identifier + "-timepicker";
                h.isNonEmptyString(m.options.theme) && (c += " quform-theme-" + m.options.theme), u.timeView.popup.element.addClass(c), e.find(".k-select").hide(), i.autoOpen && o.on("click focus", function() {
                    u.open()
                }).blur(function() {
                    u.close()
                }), t.click(function() {
                    u.open()
                });
                var l = function() {
                    var e = o.val();
                    if (h.isNonEmptyString(e)) {
                        var t = kendo.parseDate(e, n.format, n.culture);
                        null === t ? r.val("99:99") : r.val(kendo.toString(t, "HH:mm"))
                    } else r.val("")
                };
                u.bind("change", l), o.on("blur.quformTimePicker keyup.quformTimePicker", l);
                var f = o.val();
                if (h.isNonEmptyString(f)) {
                    var p = kendo.parseDate(f, "HH:mm");
                    null !== p && (u.value(p), l())
                }
            })
        }
    }, h.prototype.setupTooltips = function() {
        if (d.isFunction(d.fn.qtip) && this.options.tooltipsEnabled) {
            var e = {
                style: {
                    classes: this.options.tooltipClasses
                },
                position: {
                    my: this.options.tooltipMy,
                    at: this.options.tooltipAt,
                    viewport: !0,
                    adjust: {
                        method: "shift shift"
                    }
                }
            };
            d(".quform-tooltip-hover", this.$form).qtip(d.extend({}, e, {
                content: {
                    text: function() {
                        return d(this).closest(".quform-input").find("> .quform-tooltip-content").html()
                    }
                }
            })), d(".quform-tooltip-click", this.$form).qtip(d.extend({}, e, {
                show: {
                    event: "focus"
                },
                hide: {
                    event: "unfocus"
                },
                content: {
                    text: function() {
                        return d(this).closest(".quform-input").find("> .quform-tooltip-content").html()
                    }
                }
            })), d(".quform-tooltip-icon-hover", this.$form).qtip(d.extend({}, e, {
                content: {
                    text: function() {
                        return d(this).find(".quform-tooltip-icon-content").html()
                    }
                }
            })), d(".quform-tooltip-icon-click", this.$form).qtip(d.extend({}, e, {
                show: {
                    event: "click"
                },
                hide: {
                    event: "unfocus"
                },
                content: {
                    text: function() {
                        return d(this).find(".quform-tooltip-icon-content").html()
                    }
                }
            })), d(".quform-labels-inside > .quform-spacer > .quform-inner > .quform-input > .quform-label", this.$form).hover(function() {
                d(this).siblings(".quform-tooltip-hover").qtip("show")
            }, function() {
                d(this).siblings(".quform-tooltip-hover").qtip("hide")
            })
        }
    }, h.prototype.setupCaptchaImages = function() {
        var e = this;
        d(".quform-captcha-image img", this.$form).hover(function() {
            d(this).stop().fadeTo(400, "0.3")
        }, function() {
            d(this).stop().fadeTo(400, "1.0")
        }).click(function() {
            e.captchaRefreshQueue.push(d(this)), e.processCaptchaRefreshQueue()
        })
    }, h.prototype.processCaptchaRefreshQueue = function(t) {
        var o = this;
        if (o.captchaRefreshQueue.length) {
            var i = o.captchaRefreshQueue.shift();
            d.ajax({
                type: "GET",
                url: quformL10n.ajaxUrl,
                dataType: "json",
                data: {
                    action: "quform_regenerate_captcha",
                    quform_form_id: o.options.id,
                    quform_unique_id: o.options.uniqueId,
                    quform_element_id: i.data("element-id")
                }
            }).done(function(e) {
                "success" === (e = h.sanitizeResponse(e)).type && i.attr("src", e.image).animate({
                    opacity: 1
                }), o.captchaRefreshQueue.length ? o.processCaptchaRefreshQueue(t) : "function" == typeof t && t.call(o)
            })
        } else "function" == typeof t && t.call(o)
    }, h.prototype.applyAllLogic = function(e) {
        this.logicCache = {}, this.options.logic.elementIds.length && (this.applyLogic(this.options.logic.elementIds, e), e && this.applyDependentLogic(this.options.logic.dependentElementIds))
    }, h.prototype.applyLogic = function(e, t) {
        for (var o = 0, i = e.length; o < i; o++) this.applyElementLogic(e[o], t)
    }, h.prototype.applyElementLogic = function(e, t) {
        if (this.options.logic && this.options.logic.logic) {
            var o = this.options.logic.logic[e];
            if (o && o.rules && o.rules.length) {
                for (var i = 0, r = o.action, n = this.options.id + "_" + e, s = 0; s < o.rules.length; s++) this.isLogicRuleMatch(o.rules[s]) && i++;
                "any" === o.match && 0 < i || "all" === o.match && i === o.rules.length || (r = !r);
                var a = this,
                    u = d(".quform-element-" + n, a.$form),
                    c = r ? "show" : "hide";
                !t && this.options.logic.animate ? u.animate({
                    opacity: c,
                    height: c,
                    marginTop: c,
                    marginBottom: c,
                    paddingTop: c,
                    paddingBottom: c
                }, {
                    duration: 400,
                    complete: function() {
                        a.updateFancybox()
                    }
                }) : (u[c](), t || a.updateFancybox())
            }
        }
    }, h.prototype.applyDependentLogic = function(e) {
        if (this.options.logic && this.options.logic.dependents)
            for (var r = this, t = 0, o = e.length, i = function(e, t, o, i) {
                    e.on(t, function() {
                        r.logicCache[i] = [], setTimeout(function() {
                            r.applyLogic(o)
                        }, 0)
                    })
                }; t < o; t++) {
                var n, s = this.options.logic.dependents[e[t]],
                    a = this.options.id + "_" + e[t],
                    u = d(".quform-field-" + a, this.$form);
                u.length && (u.is("select") || u.is('input[type="checkbox"]') || u.is('input[type="radio"]') || u.is('input[type="hidden"]') ? n = "change.quform" : u.is('textarea, input[type="text"], input[type="email"], input[type="password"]') && (n = "keyup.quform blur.quform", (u.hasClass("quform-field-date-enhanced") || u.hasClass("quform-field-time-enhanced")) && (n = "change.quform")), n && i(u, n, s, a))
            }
    }, h.prototype.isLogicRuleMatch = function(e) {
        var t = this.options.id + "_" + e.elementId;
        if (d.isArray(this.logicCache[t])) {
            if (this.logicCache[t].length)
                for (var o = 0, i = this.logicCache[t].length; o < i; o++)
                    if (this.logicCache[t][o].operator === e.operator && this.logicCache[t][o].value === e.value) return this.logicCache[t][o].result
        } else this.logicCache[t] = [];
        var r, n, s = d(".quform-field-" + t, this.$form),
            a = !1;
        return s.length && (s.is('select:not([multiple]), input[type="hidden"], textarea, input[type="text"], input[type="email"], input[type="password"]') ? (n = s.val(), s.hasClass("quform-field-date-enhanced") ? (r = "date", n = s.closest(".quform-input").find(".quform-field-date-hidden").val()) : s.hasClass("quform-field-time-enhanced") && (r = "time", n = s.closest(".quform-input").find(".quform-field-time-hidden").val()), a = this.isLogicValueMatch(n, e, r)) : s.is('input[type="checkbox"]') ? (n = [], s.filter(":checked").each(function() {
            n.push(d(this).val())
        }), a = this.isLogicArrayValueMatch(n, e)) : s.is('input[type="radio"]') ? (n = s.filter(":checked").val() || "", a = this.isLogicValueMatch(n, e)) : s.is("select[multiple]") && (n = s.val() || [], a = this.isLogicArrayValueMatch(n, e))), this.logicCache[t].push({
            operator: e.operator,
            value: e.value,
            result: a
        }), a
    }, h.prototype.isLogicValueMatch = function(e, t, o) {
        switch ("string" != typeof e && (e = ""), t.operator) {
            case "eq":
                return e === t.value;
            case "neq":
                return e !== t.value;
            case "empty":
                return "" === e;
            case "not_empty":
                return "" !== e;
            case "gt":
                return "date" === o ? 1 === h.compareDates(e, t.value) : "time" === o ? 1 === h.compareTimes(e, t.value) : d.isNumeric(e) && d.isNumeric(t.value) && parseFloat(e) > parseFloat(t.value);
            case "lt":
                return "date" === o ? -1 === h.compareDates(e, t.value) : "time" === o ? -1 === h.compareTimes(e, t.value) : d.isNumeric(e) && d.isNumeric(t.value) && parseFloat(e) < parseFloat(t.value);
            case "contains":
                return -1 !== e.indexOf(t.value);
            case "starts_with":
                return 0 === e.indexOf(t.value);
            case "ends_with":
                return -1 !== e.indexOf(t.value, t.value.length)
        }
        return !1
    }, h.prototype.isLogicArrayValueMatch = function(e, t) {
        var o = !1;
        if (e.length) {
            if ("not_empty" === t.operator) o = !0;
            else
                for (var i = 0; i < e.length; i++)
                    if (this.isLogicValueMatch(e[i], t)) {
                        o = !0;
                        break
                    }
        } else "neq" !== t.operator && "empty" !== t.operator || (o = !0);
        return o
    }, h.prototype.uploadAdd = function(e, i, r) {
        var n = this,
            t = e.files[0];
        if (i.max && i.queued === i.max) this.addElementError(i.identifier, i.tooMany.replace("%max%", i.max))[this.errorShowFunction]();
        else if (!i.allowedExtensions || h.isValidFile(t, i.allowedExtensions))
            if (i.size && t.size > i.size) this.addElementError(i.identifier, i.tooBigWithFilename.replace("%filename%", t.name))[this.errorShowFunction]();
            else {
                var o = this.nextUploadId++;
                e.formData = {
                    quform_ajax_uploading: 1,
                    quform_form_id: this.options.id,
                    quform_form_uid: this.options.uniqueId,
                    quform_element_id: i.id,
                    quform_element_identifier: i.identifier,
                    quform_upload_id: o
                }, this.uploadQueue.push(e), i.queued++;
                var s = e.context = d('<div class="quform-upload-file">').data("quform-upload-id", o);
                d('<span class="quform-upload-file-name">').text(t.name).appendTo(s), d('<span class="quform-upload-file-remove">').attr("title", quformL10n.removeFile).click(function() {
                    for (var e = d(this).closest(".quform-upload-file"), t = e.data("quform-upload-id"), o = n.uploadQueue.length; o--;) n.uploadQueue[o].formData.quform_upload_id === t && n.uploadQueue.splice(o, 1);
                    e.data("quform-upload-uid") && n.removedUploadUids.push(e.data("quform-upload-uid")), e.remove(), 0 === r.children().length && r.hide(), i.queued--
                }).appendTo(s), r.append(s).show()
            }
        else this.addElementError(i.identifier, i.notAllowedTypeWithFilename.replace("%filename%", t.name))[this.errorShowFunction]()
    }, h.prototype.processUploadQueue = function() {
        var t = this,
            o = t.uploadQueue.shift();
        o.submit().done(function(e) {
            "success" === (e = h.sanitizeResponse(e)).type ? (o.context.addClass("quform-uploaded").prepend(d('<span class="quform-upload-tick"><i class="qicon-check">')).data("quform-upload-uid", e.uid), t.uploadQueue.length ? t.processUploadQueue() : (d(".quform-upload-progress-wrap", t.$form).hide(), t.submitted = !1, t.submit())) : t.uploadError(o, e.message)
        }).fail(function() {
            t.uploadError(o, quformL10n.ajaxError)
        })
    }, h.prototype.uploadError = function(e, t) {
        d(".quform-upload-progress-wrap", this.$form).hide(), this.uploadQueue.unshift(e), this.allowResubmission(), this.addElementError(e.formData.quform_element_identifier, t)[this.errorShowFunction](), this.scrollTo(d(".quform-element-" + e.formData.quform_element_identifier, this.$form))
    }, h.prototype.submit = function(e) {
        var t = this;
        if (!t.submitted)
            if (t.submitStartTime = h.timeNow(), t.submitted = !0, e = "back" === e ? "back" : "submit", t.$form.trigger("quform:submit", [t, e]), t.$loading.fadeIn().addClass("quform-loading-triggered"), "submit" === e && this.uploadQueue.length) t.processUploadQueue();
            else {
                var o = {
                    quform_ajax: 1,
                    quform_submit: e,
                    quform_removed_upload_uids: t.removedUploadUids.join(",")
                };
                t.$form.ajaxSubmit({
                    type: "POST",
                    data: o,
                    dataType: "json",
                    iframe: !0,
                    url: "",
                    success: function(e) {
                        switch (t.submitEndTime = h.timeNow(), (e = h.sanitizeResponse(e)).type) {
                            case "success":
                                t.responseSuccess(e.confirmation);
                                break;
                            case "error":
                                t.responseError(e);
                                break;
                            case "page":
                                t.allowResubmission(), t.goToPage(e.page);
                                break;
                            case "invalid":
                                t.responseInvalid(e)
                        }
                    },
                    error: function() {
                        t.submitEndTime = h.timeNow(), t.responseInvalid({
                            message: quformL10n.ajaxError
                        })
                    }
                })
            }
    }, h.prototype.responseSuccess = function(e) {
        var t = this;
        t.$form.trigger("quform:successStart", [t, e]), t.$loading.addClass("quform-loading-success");
        var o = function() {
            switch (e.type) {
                case "message":
                    t.reset(e.resetForm), t.showSuccessMessage(e);
                    break;
                case "message-redirect-page":
                case "message-redirect-url":
                    t.showSuccessMessage(e), setTimeout(function() {
                        window.location = e.redirectUrl
                    }, 1e3 * parseFloat(e.redirectDelay));
                    break;
                case "redirect-page":
                case "redirect-url":
                    window.location = e.redirectUrl;
                    break;
                case "reload":
                    window.location.reload()
            }
        };
        e.hideForm ? t.$elements.quformHideSlide(function() {
            o()
        }) : o()
    }, h.prototype.showSuccessMessage = function(e) {
        var t = this,
            o = d('<div class="quform-success-message-animate">').hide(),
            i = d('<div class="quform-success-message quform-success-message-' + t.options.id + '">').appendTo(o);
        h.isNonEmptyString(e.messageIcon) && i.addClass("quform-success-message-has-icon").append('<div class="quform-success-message-icon"><i class="' + e.messageIcon + '"></i></div>'), i.append(d('<div class="quform-success-message-content">').html(e.message)), o["below" === e.messagePosition ? "insertAfter" : "insertBefore"](t.$elements).quformShowSlide(), setTimeout(function() {
            t.scrollTo(o)
        }, t.getScrollDelay());
        var r = 1e3 * parseFloat(e.messageTimeout);
        0 < r && (t.successTimeout = setTimeout(function() {
            o.quformHideSlide(function() {
                t.updateFancybox()
            })
        }, r))
    }, h.prototype.responseError = function(e) {
        var i = this,
            r = null,
            t = !1;
        i.$form.trigger("quform:errorStart", [i, e]), i.allowResubmission(), "object" == typeof e.error && null !== e.error && e.error.enabled && "string" == typeof e.error.content && e.error.content.length && (i.errorMessage(e.error.content, e.error.title), t = !0), d.each(e.errors, function(e, t) {
            var o = d(".quform-element-" + e, i.$form);
            o.length && (i.addElementError(e, t), r = r || o)
        }), i.options.hasPages && e.page !== i.currentPageId && i.goToPage(e.page), d(".quform-error", i.$form)[this.errorShowFunction](), !t && r && setTimeout(function() {
            i.scrollTo(r)
        }, i.getScrollDelay()), i.updateFancybox(), i.$form.trigger("quform:errorEnd", [i, e])
    }, h.prototype.responseInvalid = function(e) {
        this.allowResubmission(), this.errorMessage(e.message, quformL10n.errorMessageTitle)
    }, h.prototype.goToPage = function(e) {
        var t = d(".quform-page-" + e, this.$form);
        if (t.length && 1 < this.options.pages.length) {
            var o = d.inArray(e, this.options.pages);
            if (-1 < o) {
                this.$form.trigger("quform:goToPageStart", [this, t, e, o]), this.currentPageId = e, d('input[name="quform_current_page_id"]', this.$form).val(e), d(".quform-current-page", this.$form).hide().removeClass("quform-current-page"), t.show().addClass("quform-current-page");
                var i = this.$form.closest(".quform");
                i.removeClass("quform-is-first-page quform-is-last-page"), 0 === o ? i.addClass("quform-is-first-page") : o === this.options.pages.length - 1 && i.addClass("quform-is-last-page"), this.scrollTo(this.$form);
                var r = Math.round((o + 1) / this.options.pages.length * 100);
                "numbers" === this.options.pageProgressType || "percentage" === this.options.pageProgressType ? (d(".quform-page-progress-bar", this.$form).width(r + "%"), "numbers" === this.options.pageProgressType ? d(".quform-page-progress-text > .quform-page-progress-number", this.$form).text(o + 1) : d(".quform-page-progress-text > .quform-page-progress-percentage", this.$form).text(r)) : "tabs" === this.options.pageProgressType && (d(".quform-page-progress-tab.quform-current-tab", this.$form).removeClass("quform-current-tab"), d(".quform-page-progress-tab", this.$form).filter(function() {
                    return d(this).data("id") === e
                }).addClass("quform-current-tab")), this.$form.trigger("quform:goToPageEnd", [this, t, e, o])
            }
        }
    }, h.prototype.allowResubmission = function() {
        var e = this;
        e.$loading.removeClass("quform-loading-triggered").fadeOut(function() {
            e.$loading.removeClass("quform-loading-success")
        }), d(".quform-error-message, .quform-error, .quform-success-message-animate", e.$form).remove(), d(".quform-has-error", e.$form).removeClass("quform-has-error"), "number" == typeof e.successTimeout && (clearTimeout(e.successTimeout), e.successTimeout = null), window.grecaptcha && d(".quform-recaptcha", e.$form).each(function() {
            if ("v3" !== d(this).data("config")._version) try {
                window.grecaptcha.reset(d(this).data("recaptcha-id"))
            } catch (e) {}
        }), d(".quform-upload-progress-bar", e.$form).width(0), d(".quform-upload-filename", e.$form).text(""), e.submitted = !1
    }, h.prototype.reset = function(e) {
        var t = this;
        switch (t.$form.trigger("quform:resetStart", [t, e]), t.allowResubmission(), e) {
            default:
                case "":
                t.$form.resetForm(),
            d("input.quform-field-date-enhanced", t.$form).each(function() {
                var e = d(this),
                    t = e.closest(".quform-input").find(".quform-field-date-hidden").data("default"),
                    o = e.data("kendoDatePicker");
                t = h.isNonEmptyString(t) ? kendo.parseDate(t, "yyyy-MM-dd") : null, o.value(t), o.trigger("change"), o.dateView.calendar && o.dateView.calendar.navigate(null === t ? new Date : t)
            }),
            d("input.quform-field-time-enhanced", t.$form).each(function() {
                var e = d(this),
                    t = e.closest(".quform-input").find(".quform-field-time-hidden").data("default"),
                    o = e.data("kendoTimePicker");
                t = h.isNonEmptyString(t) ? kendo.parseDate(t, "HH:mm") : null, o.value(t), o.trigger("change")
            }),
            d(".quform-field-hidden", t.$form).each(function() {
                var e = d(this);
                e.val(e.data("default")).change()
            });
            break;
            case "clear":
                    t.$form.clearForm(),
                d("select", t.$form).each(function() {
                    d(this).prop("selectedIndex", 0)
                }),
                d("input.quform-field-date-enhanced", t.$form).each(function() {
                    var e = d(this).data("kendoDatePicker");
                    e.value(null), e.trigger("change"), e.dateView.calendar && e.dateView.calendar.navigate(new Date)
                }),
                d("input.quform-field-time-enhanced", t.$form).each(function() {
                    var e = d(this).data("kendoTimePicker");
                    e.value(null), e.trigger("change")
                }),
                d(".quform-field-hidden", t.$form).val("").change();
                break;
            case "keep":
        }
        d(".quform-captcha-image img", t.$form).each(function() {
            t.captchaRefreshQueue.push(d(this))
        }), t.processCaptchaRefreshQueue(), d('input[type="text"], input[type="email"], textarea', t.$form).blur(), t.applyAllLogic(), d(".quform-field-select-enhanced, .quform-field-multiselect-enhanced", t.$form).trigger("change"), t.removedUploadUids = [], d(".quform-upload-files", t.$form).empty().hide();
        for (var o = 0, i = t.uploadElements.length; o < i; o++) t.uploadElements[o].queued = 0;
        d('input[type="file"]', t.$form).each(function() {
            var e = d(this);
            e.replaceWith(e.val("").clone(!0))
        }), d(".qtip").hide(), t.options.hasPages && t.goToPage(t.options.pages[0]), t.$form.trigger("quform:resetEnd", [t, e])
    }, h.prototype.errorMessage = function(e, t) {
        var o = this,
            i = d('<div class="quform-error-message">').hide(),
            r = d('<div class="quform-error-message-inner">');
        "string" == typeof t && t.length && r.append(d('<div class="quform-error-message-title">').html(t)), r.append(d('<div class="quform-error-message-content">').html(e)).appendTo(i), o.$elements.prepend(i), i.quformShowSlide(), setTimeout(function() {
            o.scrollTo(i)
        }, o.getScrollDelay())
    }, h.prototype.addElementError = function(e, t) {
        var o = d('<div class="quform-error quform-cf">'),
            i = d('<div class="quform-error-inner">').appendTo(o);
        if (h.isNonEmptyString(this.options.errorsIcon) && i.append(d('<span class="quform-error-icon">').append('<i class="' + this.options.errorsIcon + '"></i>')), i.append(d('<span class="quform-error-text">').html(t)), this.$wrapper.hasClass("quform-errors-absolute")) {
            var r = d('<span class="quform-error-close">').append('<i class="qicon-close">');
            r.click(function() {
                d(this).closest(".quform-error").fadeOut()
            }), i.append(r)
        }
        return d(".quform-element-" + e, this.$form).addClass("quform-has-error"), d(".quform-input-" + e, this.$form).after(o), o
    }, h.prototype.scrollTo = function(e) {
        if (this.options.scrolling && e && e.length) {
            var t = this.getScrollElement();
            t ? t.scrollTo(e, this.options.scrollSpeed, {
                axis: "y",
                offset: this.options.scrollOffset
            }) : h.isScrolledIntoView(e, this.options.scrollOffset) || d.scrollTo(e, this.options.scrollSpeed, {
                axis: "y",
                offset: this.options.scrollOffset
            })
        }
    }, h.prototype.getScrollDelay = function() {
        return 0 < this.options.scrollDelay ? h.clamp(this.options.scrollDelay - (this.submitEndTime - this.submitStartTime), 0, 3200) : 0
    }, h.prototype.getScrollElement = function() {
        var e = null;
        return this.$form.closest(".fancybox-slide").length ? e = this.$form.closest(".quform").hasClass("quform-max-height") ? this.$form.closest(".quform") : this.$form.closest(".fancybox-slide") : this.$form.closest(".fancybox-inner").length ? e = this.$form.closest(".fancybox-inner") : this.$form.closest("#fancybox-content").length ? this.$form.closest(".quform").hasClass("quform-custom-dimensions") && (e = this.$form.closest("#fancybox-content > div")) : this.$form.closest(".mfp-wrap").length && (this.$form.closest(".quform").hasClass("quform-max-height") ? e = this.$form.closest(".quform") : d.magnificPopup && d.magnificPopup.instance && d.magnificPopup.instance.fixedContentPos && (e = this.$form.closest(".mfp-wrap"))), e
    }, h.prototype.updateFancybox = function() {
        if (this.options.updateFancybox && d.isFunction(d.fn.fancybox) && d.fancybox) {
            var e, t = h.getFancyboxVersion();
            "2" === t ? (e = d(".fancybox-wrap")).length && e.is(":visible") && d.fancybox.update() : "1" === t && (e = d("#fancybox-wrap")).length && e.is(":visible") && d.fancybox.resize()
        }
    }, h.getFancyboxVersion = function() {
        return d.isFunction(d.fn.fancybox) && d.fancybox ? h.isNonEmptyString(d.fancybox.version) ? d.fancybox.version.charAt(0) : "1" : null
    }, h.isScrolledIntoView = function(e, t) {
        var o = d(window).scrollTop(),
            i = o + d(window).height(),
            r = e.offset().top,
            n = r + e.height();
        return t && (r += t), o <= n && r <= i && n <= i && o <= r
    }, h.formatFileSize = function(e) {
        return 1073741824 <= e ? e = Math.round(e / 1073741824 * 10) / 10 + " GB" : 1048576 <= e ? e = Math.round(e / 1048576 * 10) / 10 + " MB" : 1024 <= e ? e = Math.round(e / 1024 * 10) / 10 + " KB" : e += " bytes", e
    }, (h.preLoadImages = function(e, t) {
        for (var o = 0; o < e.length; o++) {
            var i = new Image;
            i.src = t ? t + e[o] : e[o], h.preLoadImages.cache.push(i)
        }
    }).cache = [], h.sanitizeResponse = function(e) {
        return null !== e && "object" == typeof e && "string" == typeof e.type && 0 !== e.type.length || (e = {
            type: "invalid",
            message: "The response from the server was invalid or malformed"
        }), e
    }, h.sanitiseResponse = function(e) {
        return h.sanitizeResponse(e)
    }, h.compareDates = function(e, t) {
        if (!h.isNonEmptyString(e) || !h.isNonEmptyString(t)) return !1;
        if (e = kendo.parseDate(e, "yyyy-MM-dd"), t = kendo.parseDate(t, "yyyy-MM-dd"), null === e || null === t) return !1;
        var o = e.getTime(),
            i = t.getTime();
        return o < i ? -1 : i < o ? 1 : 0
    }, h.compareTimes = function(e, t) {
        if (!h.isNonEmptyString(e) || !h.isNonEmptyString(t)) return !1;
        if (e = kendo.parseDate(e, "HH:mm"), t = kendo.parseDate(t, "HH:mm"), null === e || null === t) return !1;
        var o = e.getTime(),
            i = t.getTime();
        return o < i ? -1 : i < o ? 1 : 0
    }, h.isValidFile = function(e, t) {
        var o, i;
        if (!t.length) return !0;
        for (o = 0, i = t.length; o < i; o++)
            if (-1 !== e.name.toLowerCase().indexOf(t[o].toLowerCase(), e.name.length - t[o].length)) return !0;
        return !1
    }, h.isNonEmptyString = function(e) {
        return "string" == typeof e && e.length
    }, h.clamp = function(e, t, o) {
        return Math.min(Math.max(e, t), o)
    }, h.timeNow = function() {
        return (new Date).getTime()
    }, h.setupPopupLinks = function() {
        (d.isFunction(d.fn.fancybox) || d.isFunction(d.fn.magnificPopup)) && d(".quform-popup-link").each(function() {
            var e = d(this);
            if (!e.data("quform-processed")) {
                var t, o = "#quform-" + e.data("unique-id"),
                    i = d(o),
                    r = e.data("options") || {};
                if (d.isFunction(d.fn.fancybox) && d.fancybox) {
                    var n = h.getFancyboxVersion();
                    "3" === n ? (t = {
                        type: "inline",
                        baseClass: "quform-fancybox-3-popup",
                        src: o,
                        touch: !1,
                        beforeClose: function() {
                            d(".qtip").hide()
                        }
                    }, r.width && (i.css({
                        width: d.isNumeric(r.width) ? r.width + "px" : r.width
                    }), delete r.width), r.height && (i.css({
                        height: d.isNumeric(r.height) ? r.height + "px" : r.height
                    }).addClass("quform-max-height"), delete r.height)) : "2" === n ? (t = {
                        type: "inline",
                        wrapCSS: "quform-fancybox-2-popup",
                        href: o,
                        beforeClose: function() {
                            d(".qtip").hide()
                        }
                    }, (r.width || r.height) && ("undefined" == typeof r.autoSize && (r.autoSize = !1), r.width || "undefined" != typeof r.autoWidth || (r.autoWidth = !0), r.height || "undefined" != typeof r.autoHeight || (r.autoHeight = !0))) : "1" === n && (t = {
                        inline: !0,
                        href: o,
                        onStart: function() {
                            d("#fancybox-outer").css("opacity", 0), d("#fancybox-wrap").addClass("quform-fancybox-1-popup")
                        },
                        onComplete: function() {
                            window.grecaptcha && d("#fancybox-content .quform-recaptcha").each(function() {
                                try {
                                    window.grecaptcha.reset(d(this).data("recaptcha-id"))
                                } catch (e) {}
                            }), d("#fancybox-wrap, #fancybox-content").css({
                                width: "auto"
                            }), d.fancybox.center(0), setTimeout(function() {
                                d("#fancybox-outer").animate({
                                    opacity: 1
                                }, 200), d("#fancybox-overlay").css({
                                    height: d(document).height()
                                })
                            }, 1)
                        },
                        onClosed: function() {
                            d("#fancybox-wrap").removeClass("quform-fancybox-1-popup")
                        }
                    }, (r.width || r.height) && "undefined" == typeof r.autoDimensions && (r.autoDimensions = !1), (r.width || r.height) && i.addClass("quform-custom-dimensions")), n && e.fancybox(d.extend({}, t, r))
                } else d.isFunction(d.fn.magnificPopup) && (t = {
                    items: {
                        src: i,
                        type: "inline"
                    },
                    mainClass: "quform-magnific-popup"
                }, r.width && (i.css({
                    maxWidth: d.isNumeric(r.width) ? r.width + "px" : r.width
                }), delete r.width), r.height && (i.css({
                    maxHeight: d.isNumeric(r.height) ? r.height + "px" : r.height
                }).addClass("quform-max-height"), delete r.height), e.magnificPopup(d.extend({}, t, r)), d.magnificPopup.instance._onFocusIn = function(e) {
                    if (d(e.target).hasClass("select2-search__field")) return !0;
                    d.magnificPopup.proto._onFocusIn.call(this, e)
                });
                e.data("quform-processed", !0)
            }
        })
    }, h.supportPageCaching = function() {
        if (quformL10n.supportPageCaching) {
            var e = [];
            d(".quform-form").each(function() {
                e.push(d(this).find('input[name="quform_form_uid"]').val())
            }), e.length && d.ajax({
                type: "GET",
                url: quformL10n.ajaxUrl,
                dataType: "json",
                data: {
                    action: "quform_support_page_caching",
                    forms: e
                }
            }).done(function(r) {
                "success" === (r = h.sanitizeResponse(r)).type && (d(".quform-form").each(function() {
                    var e = d(this),
                        t = e.data("quform"),
                        o = e.attr("action"),
                        i = e.find('input[name="quform_form_uid"]').val();
                    r.forms && h.isNonEmptyString(i) && r.forms[i] && h.isNonEmptyString(r.forms[i]) && (t.options.uniqueId = r.forms[i], e.find('input[name="quform_form_uid"]').val(t.options.uniqueId), h.isNonEmptyString(o) && (o = o.replace(/#quform-(.)+$/, "#quform-" + t.options.uniqueId), e.attr("action", o))), r.token && h.isNonEmptyString(r.token) && e.find('input[name="quform_csrf_token"]').val(r.token), e.find(".quform-captcha-image img").length && h.captchaRefreshFormQueue.push(t)
                }), h.captchaRefreshFormQueue.length && h.processCaptchaRefreshFormQueue())
            })
        }
    }, h.captchaRefreshFormQueue = [], h.processCaptchaRefreshFormQueue = function() {
        if (h.captchaRefreshFormQueue.length) {
            var e = h.captchaRefreshFormQueue.shift();
            d(".quform-captcha-image img", e.$form).each(function() {
                e.captchaRefreshQueue.push(d(this))
            }), e.processCaptchaRefreshQueue(function() {
                h.captchaRefreshFormQueue.length && h.processCaptchaRefreshFormQueue()
            })
        }
    }, e = h, window.Quform = e, d.fn.extend({
        quform: function() {
            return this.each(function() {
                return new e(this, d(this).data("options") || {})
            })
        },
        quformHideSlide: function(e, t) {
            var o = {
                    height: "hide",
                    opacity: "hide",
                    marginTop: "hide",
                    marginBottom: "hide",
                    paddingTop: "hide",
                    paddingBottom: "hide"
                },
                i = {
                    duration: 400
                };
            return e && (i.complete = e), t && (o = d.extend(o, t)), this.animate(o, i)
        },
        quformShowSlide: function(e, t) {
            var o = {
                    height: "show",
                    opacity: "show",
                    marginTop: "show",
                    marginBottom: "show",
                    paddingTop: "show",
                    paddingBottom: "show"
                },
                i = {
                    duration: 400
                };
            return e && (i.complete = e), t && (o = d.extend(o, t)), this.animate(o, i)
        }
    }), d(function() {
        d(".quform-form").quform(), e.supportPageCaching(), e.setupPopupLinks()
    })
}(jQuery);