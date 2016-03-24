(function (a, b) {
    function k(a, b, f) {
        if (d[a])throw new Error("Module " + a + " has been defined already.");
        c(b) && (f = b), d[a] = {factory: f, inited: !1}, a === e && j(a)
    }

    function j(a) {
        var e = {}, f = d[a];
        if (c(d[a].factory)) {
            var g = d[a].factory.apply(b, [i, e, f]);
            f.ret = g === b ? f.exports : g
        } else f.ret = d[a].factory;
        f.inited = !0
    }

    function i(a) {
        if (!d[a])throw new Error("Module " + a + " is not defined.");
        var b = d[a];
        b.inited === !1 && j(a);
        return b.ret
    }

    function c(a) {
        return Object.prototype.toString.call(a) === "[object Function]"
    }

    if (!a.define) {
        var d = {}, e = null, f = document.getElementsByTagName("script");
        for (var g = 0, h = f.length; g < h && !e; g++)e = f[g].getAttribute("data-main");
        if (!e)throw new Error("No data-main attribute in script tag.");
        a.define = k
    }
})(window);
define("task/page/feed/lazyImage", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("task/basic/Task"), f = a("utils/Utils"), g = a("utils/widget/OimageUrl");
    (new e("lazyImage", function () {
        var a = [], b = function () {
            var b = d(".js-preview-img"), c = [];
            b.each(function (a) {
                var b = this, e = d(b), f = e.parent().data("realurl");
                d.inArray(f, c) === -1 && c.push(f)
            }), setTimeout(function () {
                d.each(c, function (b, c) {
                    !!c && !a[c] && (a[c] = !0, (new Image).src = g(c, 530))
                })
            }, 100)
        };
        b(), d(document.body).bind("loaded:previewImage", b)
    })).add()
});
define("lib/jquery", function (require, exports, module) {
    "use strict";
    var $ = window.jQuery;
    $.isIe6 = $.browser.msie && $.browser.version < 7 ? !0 : !1, $.fn.setCaretTo = function (a, b) {
        b === undefined && (b = a);
        var c = this.get(0);
        if (c.createTextRange) {
            var d = c.createTextRange();
            d.collapse(!0), d.moveStart("character", a), d.moveEnd("character", b - a), d.select()
        } else c.focus(), c.setSelectionRange(a, b);
        return this
    }, $.fn.focusToEnd = function () {
        var a = this.focus().val().length;
        this.setCaretTo(a);
        return this
    }, $.fn.appendAfterCaret = function (a) {
        var b = this.get(0);
        if (document.selection) {
            var c = document.selection.createRange();
            c.text = a
        } else if (typeof b.selectionStart == "number" && typeof b.selectionEnd == "number") {
            var d = b.selectionStart, e = b.selectionEnd, f = d, g = b.value;
            b.value = g.substring(0, d) + a + g.substring(e, g.length), f += a.length, b.selectionStart = b.selectionEnd = f
        } else b.value += a;
        return this
    }, $.fn.detachDo = function (a) {
        var b = $("<font />");
        return this.each(function (c, d) {
            var e = $(this);
            b.insertBefore(e), e.detach(), a(c, d), e.insertBefore(b), b.detach()
        })
    }, $.fn.getCaretPosition = function () {
        var a = this.get(0), b;
        try {
            b = a.selectionStart
        } catch (c) {
        }
        if (b !== undefined)return a.selectionStart;
        if (document.selection) {
            var d = 0, e = document.selection.createRange();
            if (e.parentElement() === a) {
                var f = document.body.createTextRange();
                f.moveToElementText(a);
                for (b = 0; f.compareEndPoints("StartToStart", e) < 0; b++)f.moveStart("character", 1);
                for (var g = 0; g <= b; g++)a.value.charAt(g) == "\n" && b++;
                f = document.body.createTextRange(), f.moveToElementText(a);
                for (end = 0; f.compareEndPoints("StartToEnd", e) < 0; end++)f.moveStart("character", 1);
                for (g = 0; g <= end; g++)a.value.charAt(g) == "\n" && end++;
                d = b
            }
            return d
        }
        return 0
    }, $.fn.outerHTML = function () {
        var a = this.first(), b = a.wrap("<div>").parent().html();
        a.unwrap();
        return b
    }, function (a) {
        var b;
        a.scrollTo = function (c, d) {
            var e = a(document).scrollTop(), f = [], g = e - c, h = d ? d * 30 : 30;
            d = d || 2;
            while (Math.abs(g) > 0) {
                g = g / 2;
                if (Math.abs(g) < 1) {
                    f.push(0);
                    break
                }
                f.push(g)
            }
            b && clearInterval(b), b = setInterval(function () {
                f.length ? window.scrollTo(0, c + f.shift()) : clearInterval(b)
            }, h)
        }
    }($), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function (a, b, c, d, e) {
            return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
        },
        easeInQuad: function (a, b, c, d, e) {
            return d * (b /= e) * b + c
        },
        easeOutQuad: function (a, b, c, d, e) {
            return -d * (b /= e) * (b - 2) + c
        },
        easeInOutQuad: function (a, b, c, d, e) {
            if ((b /= e / 2) < 1)return d / 2 * b * b + c;
            return -d / 2 * (--b * (b - 2) - 1) + c
        },
        easeInCubic: function (a, b, c, d, e) {
            return d * (b /= e) * b * b + c
        },
        easeOutCubic: function (a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b + 1) + c
        },
        easeInOutCubic: function (a, b, c, d, e) {
            if ((b /= e / 2) < 1)return d / 2 * b * b * b + c;
            return d / 2 * ((b -= 2) * b * b + 2) + c
        },
        easeInQuart: function (a, b, c, d, e) {
            return d * (b /= e) * b * b * b + c
        },
        easeOutQuart: function (a, b, c, d, e) {
            return -d * ((b = b / e - 1) * b * b * b - 1) + c
        },
        easeInOutQuart: function (a, b, c, d, e) {
            if ((b /= e / 2) < 1)return d / 2 * b * b * b * b + c;
            return -d / 2 * ((b -= 2) * b * b * b - 2) + c
        },
        easeInQuint: function (a, b, c, d, e) {
            return d * (b /= e) * b * b * b * b + c
        },
        easeOutQuint: function (a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b * b * b + 1) + c
        },
        easeInOutQuint: function (a, b, c, d, e) {
            if ((b /= e / 2) < 1)return d / 2 * b * b * b * b * b + c;
            return d / 2 * ((b -= 2) * b * b * b * b + 2) + c
        },
        easeInSine: function (a, b, c, d, e) {
            return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
        },
        easeOutSine: function (a, b, c, d, e) {
            return d * Math.sin(b / e * (Math.PI / 2)) + c
        },
        easeInOutSine: function (a, b, c, d, e) {
            return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
        },
        easeInExpo: function (a, b, c, d, e) {
            return b == 0 ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
        },
        easeOutExpo: function (a, b, c, d, e) {
            return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
        },
        easeInOutExpo: function (a, b, c, d, e) {
            if (b == 0)return c;
            if (b == e)return c + d;
            if ((b /= e / 2) < 1)return d / 2 * Math.pow(2, 10 * (b - 1)) + c;
            return d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
        },
        easeInCirc: function (a, b, c, d, e) {
            return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
        },
        easeOutCirc: function (a, b, c, d, e) {
            return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
        },
        easeInOutCirc: function (a, b, c, d, e) {
            if ((b /= e / 2) < 1)return -d / 2 * (Math.sqrt(1 - b * b) - 1) + c;
            return d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
        },
        easeInElastic: function (a, b, c, d, e) {
            var f = 1.70158, g = 0, h = d;
            if (b == 0)return c;
            if ((b /= e) == 1)return c + d;
            g || (g = e * .3);
            if (h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c
        },
        easeOutElastic: function (a, b, c, d, e) {
            var f = 1.70158, g = 0, h = d;
            if (b == 0)return c;
            if ((b /= e) == 1)return c + d;
            g || (g = e * .3);
            if (h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c
        },
        easeInOutElastic: function (a, b, c, d, e) {
            var f = 1.70158, g = 0, h = d;
            if (b == 0)return c;
            if ((b /= e / 2) == 2)return c + d;
            g || (g = e * .3 * 1.5);
            if (h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            if (b < 1)return -0.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c;
            return h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) * .5 + d + c
        },
        easeInBack: function (a, b, c, d, e, f) {
            f == undefined && (f = 1.70158);
            return d * (b /= e) * b * ((f + 1) * b - f) + c
        },
        easeOutBack: function (a, b, c, d, e, f) {
            f == undefined && (f = 1.70158);
            return d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
        },
        easeInOutBack: function (a, b, c, d, e, f) {
            f == undefined && (f = 1.70158);
            if ((b /= e / 2) < 1)return d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c;
            return d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
        },
        easeInBounce: function (a, b, c, d, e) {
            return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
        },
        easeOutBounce: function (a, b, c, d, e) {
            return (b /= e) < 1 / 2.75 ? d * 7.5625 * b * b + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
        },
        easeInOutBounce: function (a, b, c, d, e) {
            if (b < e / 2)return jQuery.easing.easeInBounce(a, b * 2, 0, d, e) * .5 + c;
            return jQuery.easing.easeOutBounce(a, b * 2 - e, 0, d, e) * .5 + d * .5 + c
        }
    }), function () {
        function f() {
            return (new Date).getTime()
        }

        var a = jQuery, b = "jQuery.pause", c = 1, d = a.fn.animate, e = {};
        a.fn.animate = function (g, h, i, j) {
            var k = a.speed(h, i, j);
            k.complete = k.old;
            return this.each(function () {
                this[b] || (this[b] = c++);
                var h = a.extend({}, k);
                d.apply(a(this), [g, a.extend({}, h)]), e[this[b]] = {run: !0, prop: g, opt: h, start: f(), done: 0}
            })
        }, a.fn.pause = function () {
            return this.each(function () {
                this[b] || (this[b] = c++);
                var d = e[this[b]];
                d && d.run && (d.done += f() - d.start, d.done > d.opt.duration ? delete e[this[b]] : (a(this).stop(), d.run = !1))
            })
        }, a.fn.resume = function () {
            return this.each(function () {
                this[b] || (this[b] = c++);
                var g = e[this[b]];
                g && !g.run && (g.opt.duration -= g.done, g.done = 0, g.run = !0, g.start = f(), d.apply(a(this), [g.prop, a.extend({}, g.opt)]))
            })
        }
    }(), typeof $.JSON != "object" && ($.JSON = {}), function () {
        function str(a, b) {
            var c, d, e, f, g = gap, h, i = b[a];
            i && typeof i == "object" && typeof i.toJSON == "function" && (i = i.toJSON(a)), typeof rep == "function" && (i = rep.call(b, a, i));
            switch (typeof i) {
                case"string":
                    return quote(i);
                case"number":
                    return isFinite(i) ? String(i) : "null";
                case"boolean":
                case"null":
                    return String(i);
                case"object":
                    if (!i)return "null";
                    gap += indent, h = [];
                    if (Object.prototype.toString.apply(i) === "[object Array]") {
                        f = i.length;
                        for (c = 0; c < f; c += 1)h[c] = str(c, i) || "null";
                        e = h.length === 0 ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]", gap = g;
                        return e
                    }
                    if (rep && typeof rep == "object") {
                        f = rep.length;
                        for (c = 0; c < f; c += 1)typeof rep[c] == "string" && (d = rep[c], e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e))
                    } else for (d in i)Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
                    e = h.length === 0 ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}", gap = g;
                    return e
            }
        }

        function quote(a) {
            escapable.lastIndex = 0;
            return escapable.test(a) ? '"' + a.replace(escapable, function (a) {
                var b = meta[a];
                return typeof b == "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + a + '"'
        }

        function f(a) {
            return a < 10 ? "0" + a : a
        }

        typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, rep;
        typeof $.JSON.stringify != "function" && ($.JSON.stringify = function (a, b, c) {
            var d;
            gap = "", indent = "";
            if (typeof c == "number")for (d = 0; d < c; d += 1)indent += " "; else typeof c == "string" && (indent = c);
            rep = b;
            if (b && typeof b != "function" && (typeof b != "object" || typeof b.length != "number"))throw new Error("JSON.stringify");
            return str("", {"": a})
        }), typeof $.JSON.parse != "function" && ($.JSON.parse = function (text, reviver) {
            function walk(a, b) {
                var c, d, e = a[b];
                if (e && typeof e == "object")for (c in e)Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), d !== undefined ? e[c] = d : delete e[c]);
                return reviver.call(a, b, e)
            }

            var j;
            text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (a) {
                return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }));
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver == "function" ? walk({"": j}, "") : j
            }
            throw new SyntaxError("JSON.parse")
        })
    }(), $.equals = function (a, b) {
        if (a.length != b.length)return !1;
        var c = !0;
        $.each(a, function (d) {
            if (a[d] != b[d]) {
                c = !1;
                return !1
            }
        });
        return c
    }, $.submitBtnDisable = function (a) {
        var b = $(a.currentTarget);
        b.data("defaultText", b.text()), b.text(b.data("submitText") || "\u63d0\u4ea4\u4e2d...").parents(".js-btn-disable").eq(0).addClass("disabled")
    }, $.submitBtnEnable = function (a) {
        var b = $(a.currentTarget);
        b.text(b.data("defaultText")).parents(".js-btn-disable").eq(0).removeClass("disabled")
    }, function (a) {
        function k(a, b) {
            return h.settings.adjustOldDeltas && a.type === "mousewheel" && b % 120 === 0
        }

        function j() {
            f = null
        }

        function i(b) {
            var c = b || window.event, g = d.call(arguments, 1), i = 0, l = 0, m = 0, n = 0, o = 0, p = 0;
            b = a.event.fix(c), b.type = "mousewheel", "detail" in c && (m = c.detail * -1), "wheelDelta" in c && (m = c.wheelDelta), "wheelDeltaY" in c && (m = c.wheelDeltaY), "wheelDeltaX" in c && (l = c.wheelDeltaX * -1), "axis" in c && c.axis === c.HORIZONTAL_AXIS && (l = m * -1, m = 0), i = m === 0 ? l : m, "deltaY" in c && (m = c.deltaY * -1, i = m), "deltaX" in c && (l = c.deltaX, m === 0 && (i = l * -1));
            if (m !== 0 || l !== 0) {
                if (c.deltaMode === 1) {
                    var q = a.data(this, "mousewheel-line-height");
                    i *= q, m *= q, l *= q
                } else if (c.deltaMode === 2) {
                    var r = a.data(this, "mousewheel-page-height");
                    i *= r, m *= r, l *= r
                }
                n = Math.max(Math.abs(m), Math.abs(l));
                if (!f || n < f)f = n, k(c, n) && (f /= 40);
                k(c, n) && (i /= 40, l /= 40, m /= 40), i = Math[i >= 1 ? "floor" : "ceil"](i / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f);
                if (h.settings.normalizeOffset && this.getBoundingClientRect) {
                    var s = this.getBoundingClientRect();
                    o = b.clientX - s.left, p = b.clientY - s.top
                }
                b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, g.unshift(b, i, l, m), e && clearTimeout(e), e = setTimeout(j, 200);
                return (a.event.dispatch || a.event.handle).apply(this, g)
            }
        }

        var b = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], c = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], d = Array.prototype.slice, e, f;
        if (a.event.fixHooks)for (var g = b.length; g;)a.event.fixHooks[b[--g]] = a.event.mouseHooks;
        var h = a.event.special.mousewheel = {
            version: "3.1.12", setup: function () {
                if (this.addEventListener)for (var b = c.length; b;)this.addEventListener(c[--b], i, !1); else this.onmousewheel = i;
                a.data(this, "mousewheel-line-height", h.getLineHeight(this)), a.data(this, "mousewheel-page-height", h.getPageHeight(this))
            }, teardown: function () {
                if (this.removeEventListener)for (var b = c.length; b;)this.removeEventListener(c[--b], i, !1); else this.onmousewheel = null;
                a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
            }, getLineHeight: function (b) {
                var c = a(b), d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
                d.length || (d = a("body"));
                return parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
            }, getPageHeight: function (b) {
                return a(b).height()
            }, settings: {adjustOldDeltas: !0, normalizeOffset: !0}
        };
        a.fn.extend({
            mousewheel: function (a) {
                return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
            }, unmousewheel: function (a) {
                return this.unbind("mousewheel", a)
            }
        })
    }($), $.submitBtnDisable = function (a) {
        var b = $(a.currentTarget);
        b.data("defaultText", b.text()), b.text(b.data("submitText") || "\u63d0\u4ea4\u4e2d...").parents(".js-btn-disable").eq(0).addClass("disabled")
    }, $.submitBtnEnable = function (a) {
        var b = $(a.currentTarget);
        b.text(b.data("defaultText")).parents(".js-btn-disable").eq(0).removeClass("disabled")
    }, $.parseCode = function (a) {
        return typeof a != "undefined" ? parseInt(a) : 1
    };
    return jQuery.noConflict()
});
define("task/basic/Task", function (a, b, c) {
    var d = a("basic/Class"), e = d.extend({
        init: function (a, b, c, d) {
            this.name = a, d = d || [], c = c || null, this.func = function () {
                b.apply(c, d)
            }
        }, run: function () {
            this.func()
        }, add: function () {
            a("task/basic/TaskManager").add(this);
            return this
        }
    });
    return e
});
define("basic/Class", function (a, b, c) {
    function f(a, b) {
        return function () {
            var c = this._super;
            this._super = a;
            var d = b.apply(this, arguments);
            this._super = c;
            return d
        }
    }

    var d = !1, e = /xyz/.test(function () {
        xyz
    }) ? /\b_super\b/ : /.*/, g = function () {
    };
    g.extend = function (a) {
        function h() {
            !d && this.init && this.init.apply(this, arguments)
        }

        var b = this.prototype;
        d = !0;
        var c = new this;
        d = !1;
        for (var g in a)c[g] = typeof a[g] == "function" && typeof b[g] == "function" && e.test(a[g]) ? f(b[g], a[g]) : a[g];
        h.prototype = c, h.constructor = h, h.extend = arguments.callee;
        return h
    };
    return g
});
define("task/basic/TaskManager", function (a, b, c) {
    var d = a("lib/jquery"), e = {
        taskResult: {}, taskList: [], add: function (a) {
            this.taskList.push(a)
        }, run: function () {
            var a = this.taskList.shift();
            if (this.taskList.length > 0) {
                var b = this;
                setTimeout(function () {
                    b.run()
                }, 0)
            }
            var c = new Date, d = 0, e = null;
            try {
                a.run()
            } catch (f) {
                typeof console != "undefined" && console.error && console.error("error in task ", a.name, ":", f, f.stack), e = f
            }
            d = new Date - c, this.taskResult[a.name] = {
                duration: d,
                result: e === null ? "success" : e.name + ":" + e.message + "|@|" + e.stack
            }, this.taskList.length !== 0
        }
    };
    return e
});
define("utils/Utils", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = d(window), f = d(document.body), g = a("utils/widget/OimageUrl"), h = a("utils/Log"), i = {};
    i.ARROW_LEFT_CODE = 37, i.ARROW_RIGHT_CODE = 39, i.ARROW_UP_CODE = 38, i.ARROW_DOWN_CODE = 40, i.ENTER_CODE = 13, i.tipsHideInterval = 2e3, i.MIN_PICSIZE = 10240, i.MAX_PICSIZE = 8388608, i.EMAIL_REG = /^[a-zA-Z0-9_\-\.]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/, i.NICKNAME_REG = /^[\u4e00-\u9fa5\w_]+$/i, i.REALNAME_REG = /^[\u4e00-\u9fa5a-z ]+$/i, i.COMPANY_REG = /^[^<>]+$/i, i.SCHOOL_REG = /^[\u4e00-\u9fa5（）()\w ]*$/i, i.MOBILE_REG = /^0*(13|14|15|17|18)\d{9}$/, i.MOBILECODE_REG = /^[0-9]{6}$/, i.IDCARD_REG = /^(\d{18,18}|\d{15,15}|\d{17,17}[xX])$/, i.VERIFYCODE_REG = /^[\w]{5}$/, i.INVITECODE_REG = /^[\w]{4,10}$/, i.IMG_FILE_REG = /^image\/\w+$/, i.URL_REG = /^(http)s?:\/\/(?:[\w-]+\.?)+[\.\/\?%&=#@\[\]\-+_!:*~\w-]+|(www)\.(?:[\w-]+\.?)+[\.\/\?%&=#@\[\]\-+_!:*~\w-]+$/i, i.FULLWIDTH_REG = /[\uFE30-\uFFA0\u2E80-\u9FFF\uac00-\ud7ff\u3000‘“”’]/g, i.AVATAR_VER = "131210", i.isIe6 = d.browser.msie && d.browser.version < 7 ? !0 : !1;
    var j = '<div class="loadingBox"><span><em class="icon-loadingB"></em>$TEXT$</span></div>';
    i.LOADING_BIG = function (a) {
        a = a || "\u52a0\u8f7d\u4e2d...";
        return j.replace("$TEXT$", a)
    };
    var k = '<div class="loadingBoxS"><span><em class="icon-loadingS"></em>$TEXT$</span></div>';
    i.LOADING_SMALL = function (a) {
        a = a || "\u52a0\u8f7d\u4e2d...";
        return k.replace("$TEXT$", a)
    }, i.S4 = function () {
        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
    }, i.N5 = function () {
        return ((1 + Math.random()) * 65536 | 0).toString(8).substring(1)
    }, i.pageWidth = function () {
        return parseFloat(document.documentElement.clientWidth)
    }, i.pageHeight = function () {
        return Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
    }, i.pageMaxHeight = function () {
        return Math.max(d(window).height(), d(document).height())
    }, i.getXY = function (a) {
        var b = a.offsetLeft, c = a.offsetTop;
        while ((a = a.offsetParent) != null)b += a.offsetLeft, c += a.offsetTop;
        return {top: c, left: b}
    }, i.autoClose = function (a, b) {
        var c = a || this.$elem, e = b || this.$trigger, g = this, h = function (a) {
            var b = d(a.target).parents().andSelf();
            d.inArray(c[0], b) === -1 && d.inArray(e[0], b) === -1 && g.hide(a)
        };
        setTimeout(function () {
            f.bind("click", h)
        }, 0);
        return h
    }, i.random = function (a) {
        return Math.floor(a * (Math.random() % 1))
    }, i.randomArr = function (a, b) {
        var c = [], d = [];
        for (var e = 0; e < a; e++)c.push(e);
        for (var e = 0; e < b; e++) {
            if (!(c.length > 0))break;
            var f = i.random(c.length);
            d.push(c[f]), c.splice(f, 1)
        }
        return d
    }, i.buildCursor = function (a) {
        return a.timestamp
    }, i.updateNewCount = function (a, b, c) {
        b = parseInt(b), b !== 0 ? (b = b > 99 ? "99+" : b, b = c ? "(" + b + ")" : b, a.addClass("show").find(".js-item").text(b)) : a.removeClass("show")
    }, i.parseURL = function (a) {
        var b = /^(?:([A-Za-z]+):(\/{0,3}))?([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/, c = ["url", "scheme", "slash", "host", "port", "path", "query", "hash"], d = b.exec(a), e = {};
        for (var f = 0, g = c.length; f < g; f++)e[c[f]] = d[f] || "";
        return e
    }, i.encodeSpecialHtmlChar = function (a) {
        if (a) {
            a = a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
            return a
        }
        return ""
    }, i.decodeSpecialJsonChar = function (a) {
        if (a) {
            a = a.replace(/&amp;/gi, "&");
            return a
        }
        return ""
    }, i.decodeSpecialHtmlChar = function (a) {
        if (a) {
            var b = ["&quot;", "&amp;", "&lt;", "&gt;"], c = ['"', "&", "<", ">"], d = c.length;
            for (var e = 0; e < d; e++)a = a.replace(new RegExp(b[e], "g"), c[e]);
            return a
        }
        return ""
    }, i.textTips = function (a, b, c) {
        var c = c || "";
        typeof b == "undefined" || b === "hide" ? a.addClass("hidden") : b === "error" ? a.removeClass("text-icon-tips-warning text-icon-tips-access text-icon-tips-pass text-icon-tips-help hidden").addClass("text-icon-tips-error").html('<em class="icon-error-s"></em>' + c) : b === "warning" ? a.removeClass("text-icon-tips-error text-icon-tips-access text-icon-tips-pass text-icon-tips-help hidden").addClass("text-icon-tips-warning").html('<em class="icon-warning-s"></em>' + c) : b === "pass" ? a.removeClass("text-icon-tips-error text-icon-tips-warning text-icon-tips-access text-icon-tips-help hidden").addClass("text-icon-tips-pass").html(c || '<em class="icon-correct-m"></em>') : b === "help" ? a.removeClass("text-icon-tips-error text-icon-tips-warning text-icon-tips-access text-icon-tips-pass hidden").addClass("text-icon-tips-help").html('<em class="icon-help"></em>' + c) : b === "access" && a.removeClass("text-icon-tips-error text-icon-tips-warning text-icon-tips-pass text-icon-tips-help hidden").addClass("text-icon-tips-access").html('<em class="icon-correct-s"></em>' + c)
    }, i.selectValue = function (b, c, d, e) {
        var f = a("data/selectData"), e = e || "";
        if (parseInt(c) === 0 || c === "")return typeof d == "undefined" ? "\u672a\u8bbe\u7f6e" : d === !1 ? "" : d;
        if (b === "province")return f.city.all()[c];
        if (b === "city") {
            var g = c.split(/[-_~]/), h = g[0], i = g[1], j = "";
            parseInt(i) !== 0 && i !== "" && (j = f.city.city[h][i]);
            return j
        }
        return f[b][c] + e
    }, i.specialCity = function (b, c) {
        var d = a("data/selectData");
        if (d.city.specialCity[b])return d.city.specialCity[b];
        return i.selectValue("city", b + "-" + c)
    }, i.replaceEmpty = function (a, b, c) {
        var c = c || "";
        return !a || a === "" ? b ? b : "\u672a\u8bbe\u7f6e" : a + c
    }, i.reqSelectValue = function (b, c, d, e, f, g) {
        var h = e ? "<" + e + ">" : "", i = e ? "</" + e + ">" : "", f = f || "", j = a("data/selectData"), k = parseInt(c), l = parseInt(d);
        if (b === "age" || b === "height")b = !1;
        if (k === 0 && l !== 0)return h + (b ? j[b][l] : l) + i + f + "\u4ee5\u4e0b";
        if (k !== 0 && l === 0)return h + (b ? j[b][k] : k) + i + f + "\u4ee5\u4e0a";
        if (k !== 0 && l !== 0) {
            var m = h + (b ? j[b][k] : k) + "\u5230" + (b ? j[b][l] : l) + i + f;
            return g ? m : m + "\u4e4b\u95f4"
        }
        return "\u4e0d\u9650"
    }, i.constellationValue = function (b) {
        if (b.length === 12)return "\u661f\u5ea7\u4e0d\u9650";
        var c = a("data/selectData"), d = [];
        for (var e = 0; e < b.length; e++)d[e] = c.constellation[b[e]] + "\u5ea7";
        return d.join("\uff0c")
    }, i.educationValue = function (b, c) {
        if (parseInt(b) === 1 && c)return "\u5b66\u5386\u4e0d\u9650";
        var d = "", e = a("data/selectData");
        d = e.education[b] || "\u5b66\u5386", d = parseInt(b) !== 0 && c ? d + "\u53ca\u4ee5\u4e0a" : d;
        return d
    }, i.cityValue = function (a, b) {
        return parseInt(a) == 0 && parseInt(b) == 0 ? "\u4e0d\u9650" : i.selectValue("province", a, !1) + i.selectValue("city", a + "-" + b, !1)
    }, i.userSexName = function (a) {
        a = parseInt(a);
        if (a === 1)return "\u4ed6";
        if (a === 2)return "\u5979";
        return ""
    }, i.userSexTitle = function (a) {
        a = parseInt(a);
        if (a === 1)return "\u7537";
        if (a === 2)return "\u5973";
        return ""
    }, i.defaultAvatars = {
        1: "http://img1.cache.netease.com/love/image/common/avatar/default_male_big.png",
        2: "http://img1.cache.netease.com/love/image/common/avatar/default_female_big.png"
    }, i.userAvatar = function (a, b, c, d) {
        var e = "";
        typeof arguments[0] == "object" ? e = a.url ? a.url : i.defaultAvatars[a.sex] || i.defaultAvatars[1] : typeof arguments[0] == "string" && (e = a !== "" ? a : i.defaultAvatars[c] || i.defaultAvatars[1]);
        return g(e, b, b, 1, 85, d)
    }, i.tmpl = function (a, b) {
        var c = /\W/.test(a) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + a.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');") : i.cache[a] = i.cache[a] || i.tmpl(document.getElementById(a).innerHTML);
        return b ? c(b) : c
    }, i.preLoadSWF = function (b, c) {
        var e = i.S4(), g = d('<div style="width:1px;height:1px;position:absolute;left:-9999px;"><div id="' + e + '"></div></div>').appendTo(f);
        a("lib/swfobject").embedSWF(b, e, 1, 1, "10.1.0", "", "", "", "", function (a) {
            if (a.success)var b = d("#" + e)[0], f = setInterval(function () {
                try {
                    b.PercentLoaded() === 100 && (clearInterval(f), c && c({success: !0}), g.remove())
                } catch (a) {
                }
            }, 20); else c && c({success: !1}), g.remove()
        })
    }, i.createTextarea = function (a) {
        var b = a.textarea || null, c = d(document.createElement("TEXTAREA"));
        c.css({
            height: "0",
            position: "absolute",
            left: "-50000px",
            top: "-10000px",
            visibility: "hidden"
        }), setTimeout(function () {
            c.css({
                fontSize: b.css("fontSize"),
                fontFamily: b.css("fontFamily"),
                fontWeight: b.css("fontWeight"),
                lineHeight: b.css("lineHeight"),
                "padding-top": b.css("padding-top"),
                "padding-bottom": b.css("padding-bottom"),
                "padding-left": b.css("padding-left"),
                "padding-right": b.css("padding-right"),
                overflow: "hidden",
                wordBreak: b.css("wordBreak"),
                wordWrap: b.css("wordWrap"),
                width: b.css("width")
            })
        }, 30), f.append(c);
        return c
    }, i.textAutoBreak = function (a, b, c) {
        var d = c.tempSpanElem, e = c.tempTextareaElem, f = a.split("\n"), g = [], b = b || 474, h = c.start || 0;
        for (var j = 0; j < f.length; j++) {
            var k = f[j];
            k === "" ? g.push("") : d.text(k).width() > b ? g.push(i.breakLongText(e, k, b)) : g.push(k)
        }
        return g.join("\n")
    }, i.breakLongText = function (a, b, c) {
        a.val(" ");
        var d = a[0].scrollHeight, e = [], f = "", g = "";
        for (var h = 0, i = b.length; h < i; h++) {
            f = f + b.charAt(h);
            var j = a.val(f)[0].scrollHeight;
            j > d && (e.push(f.substring(0, f.length - 1)), e.push("\n"), f = f.substring(f.length - 1, f.length), d = a.val("")[0].scrollHeight), h === i - 1 && e.push(f)
        }
        return e.join("")
    }, i.btnSending = function (a) {
        this.sendBtnDefaultText = a.text(), a.html(a.data("loadingtext")), a.parents(".js-btn:first").addClass("disabled")
    }, i.btnSended = function (a) {
        a.text(this.sendBtnDefaultText), a.parents(".js-btn:first").removeClass("disabled")
    }, i.cookieStr = function (a, b, c, d) {
        var e = "";
        if (c) {
            var f = 0, g = new Date;
            c === "today" && (c = 1, f = g.getHours() * 3600 + g.getMinutes() * 60 + g.getSeconds()), g.setTime(g.getTime() + c * 24 * 60 * 60 * 1e3 - f * 1e3), e = "; expires=" + g.toGMTString()
        }
        var h = a + "=" + b + e + "; path=/";
        h = d ? h + ";domain=" + d : h;
        return h
    }, i.formRedirect = function (a, b, c, e) {
        var g = d("<form></form>");
        g.attr("target", b || "_blank"), g.attr("method", c || "GET"), g.attr("action", a);
        var h = [];
        d.each(e, function (a, b) {
            h.push('<input type="hidden" name="' + a + '" value="' + b + '" />')
        }), g.html(h.join("")), f.append(g), g.submit(), setTimeout(function () {
            g.remove()
        }, 100)
    }, i.supportCSS3 = function (a) {
        var b = document.createElement("div"), c = ["O", "Moz", "ms", "webkit"], d = c.length;
        if (a in b.style)return !0;
        a = a.replace(/^[a-z]/, function (a) {
            return a.toUpperCase()
        });
        while (d--)if (c[d] + a in b.style)return !0;
        return !1
    }, i.bindNumAnimation = function (a, b) {
        var b = d.extend({interval: 10, multiple: .2, callback: null, elem: null}, b), c = {
            sumNum: 0,
            left_num: null,
            interval: null,
            doSum: function () {
                this.left_num !== 0 ? (this.sumNum = this.left_num !== null ? this.sumNum + Math.ceil(this.left_num * b.multiple) : Math.ceil(a * b.multiple), this.left_num = a - this.sumNum, b.callback && b.callback({sumNum: this.sumNum}), b.elem && b.elem.text(this.sumNum)) : clearInterval(this.interval)
            },
            start: function () {
                var c = this;
                a !== 0 && (this.interval = setInterval(function () {
                    c.doSum()
                }, b.interval))
            },
            stop: function () {
                clearInterval(this.interval)
            }
        };
        return c
    }, i.commaNumber = function (a) {
        var b = String(a).split("."), c = function (a) {
            return a.length <= 3 ? a : c(a.substr(0, a.length - 3)) + "," + a.substr(a.length - 3)
        };
        b[0] = c(b[0]);
        return b.join(".")
    }, i.formatFloat = function (a, b) {
        var c = Math.pow(10, b);
        return parseInt(a * c, 10) / c
    }, i.formatTime = function (a, b) {
        var c = parseInt(a / 3600) % 24, d = parseInt(a / 60) % 60, e = parseInt(a % 60);
        c = c < 10 ? "0" + c : c, d = d < 10 ? "0" + d : d, e = e < 10 ? "0" + e : e, c = String(c), d = String(d), e = String(e);
        return {hour: c === "NaN" ? "00" : c, min: d === "NaN" ? "00" : d, second: e === "NaN" ? "00" : e}
    }, i.bindFloatElemAnim = function (a) {
        var b = d.extend({dura: 1e3}, a), c = b.targetElem;
        c.bind(b.event, function (a, e) {
            var f = c.offset(), g = d('<span style="position:absolute;left:' + f.left + "px;top:" + f.top + 'px;opacity:0;">' + e.text + "</span>").appendTo("body");
            g.css({
                fontSize: c.css("fontSize"),
                fontFamily: c.css("fontFamily"),
                fontWeight: c.css("fontWeight"),
                color: c.css("color"),
                top: parseInt(g.css("top")) - g.innerHeight() / 2 + "px"
            }), setTimeout(function () {
                g.animate({top: "-=20", opacity: 1}, b.dura).animate({opacity: 0}, 200, function () {
                    g.remove()
                })
            }, 100)
        })
    }, i.secondCountDown = function (a, b, c) {
        var d = Math.floor(a / 86400), e = Math.floor((a - d * 60 * 60 * 24) / 3600), f = Math.floor((a - d * 60 * 60 * 24 - e * 3600) / 60), g = Math.floor(a - d * 60 * 60 * 24 - e * 3600 - f * 60);
        e = e + (c ? d * 24 : 0), b && e < 10 && (e = "0" + e), f < 10 && (f = "0" + f), g < 10 && (g = "0" + g);
        return {hour: e, minute: f, second: g}
    }, i.getQueryString = function (a) {
        var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)"), c = window.location.search.substr(1).match(b);
        if (c != null)return unescape(c[2]);
        return null
    };
    return i
});
define("utils/widget/OimageUrl", function (a, b, c) {
    "use strict";
    var d = {}, e = function (a) {
        if (a) {
            a = a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
            return a
        }
        return ""
    }, f = function (a, b, c, f, g, h) {
        if (typeof a != "string" || a === "")throw"Oimage Url is Error!!!";
        if (!c || c === "")c = b;
        g = g || 85, h = h || 0;
        var f = typeof f == "number" && f === 1 ? 1 : 0, i = a + "|" + b + "|" + c + "|" + f + "|" + g + "|" + h;
        a = e(a), d[i] || (d[i] = function () {
            var d = "";
            a.match(/nos.netease.com\//i) && (a = a.replace(/nos.netease.com\/lovepicture/i, "lovepicture.nosdn.127.net")), a.match(/lovepicture.nosdn.127.net\//i) ? d = a + "&quality=" + g + "&thumbnail=" + b + (f === 1 ? "y" : "x") + c : (a = a.replace(/#.*?$/, ""), d = "http://imgsize.ph.126.net/?" + (h === 1 ? "enlarge=true&" : "") + "imgurl=" + a + "_" + b + "x" + c + "x" + f + "x" + g + ".jpg");
            return d
        }());
        return d[i]
    };
    return f
});
define("utils/Log", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("data/RequestMap"), g = {
        pFeed: "pHome",
        pTrend: "pTrend",
        pNotify: "pMessage",
        pDigg: "pM_like",
        pHeed: "pM_followers",
        pMessage: "pM_talk",
        pPhoto: "pImage",
        pFollowing: "pFollowing",
        pFollower: "pFollower",
        pSearch: "pSearch",
        pLogin: "plogin",
        pSignfail: "pSign_fail",
        pIdcard: "pV_name",
        pMobile: "pV_mobile",
        pFace: "pS_face",
        pPassword: "pS_password",
        pMineProfile: "pMine",
        pUserProfile: "pUser",
        pUserCard: "pUserCard",
        pApp: "pApp",
        pSignup: "pSignup",
        pCharge: "charge",
        pChargeBill: "chargebill",
        pExpenseBill: "expensebill",
        pServices: "pVaservices",
        pPayHelp: "payitems",
        pOrderError: "paytrouble",
        pVisitor: "pM_visitor",
        pPark: "pPark",
        pQa: "pQa",
        pAstro: "pAstro",
        pInvite: "pInviteCard",
        pRecomm: "pXunrenlist",
        pSubject: "pXunrenpage",
        pEscape: "pParkescape",
        pAccount: "pAccount",
        pGiftReceive: "pM_gift",
        pDigging: "pM_digging",
        pDislike: "pDislike",
        pTopiclist: "pTopiclist",
        pTopic: "pTopic",
        pLovefm: "pLovefm",
        pLovefmGuest: "pLovefmguest",
        pInvite2013: "pInvite2013",
        pParty: "pParty",
        pPartyList: "pPartyList",
        pStar: "pStar",
        pBrowse: "pBrowse",
        pXy3: "pXy3",
        pParkNotice: "pM_topic",
        pFeng2014: "pFeng2014",
        pQixi2014: "pQixi2014"
    }, h = {
        navi: "nav",
        userIntro: "intro",
        feedFoot: "ugc",
        basicInfoBox: "basicinfor",
        requirement: "requirement",
        detailInfoBox: "exinfor",
        lifeViewBox: "view",
        monologBox: "monolog",
        corpinvite: "intrologin",
        ursLogin: "session",
        signupOpen: "nickname",
        signupAvatar: "avatar",
        signupVerified: "verified",
        updateie6: "updateie6",
        usertimeline: "usertimeline",
        userRecommend: "rec",
        loginBox: "quickLogin",
        app_iphone: "iphone",
        app_android: "android",
        login_app: "app",
        newQa: "newqa",
        nonQa: "nonqa",
        oldQa: "oldqa",
        skipQa: "skipqa",
        sameQa: "sameqa",
        qaSee: "qasee",
        qaUpdate: "qarec",
        photolayer: "piclayer",
        payNavi: "navi",
        payErrorTips: "paytips",
        visitorTips: "tips",
        visitorLimitTips: "limitTips",
        inviteSignup: "signup",
        inviteLogin: "login",
        inviteSignupLogin: "signup_logined",
        profilePhotolayer: "figure",
        subjectUser: "user",
        appQRBox: "appQR",
        rightVipRank: "rightviprank",
        rightToCharge: "righttocharge",
        qaPublishRight: "qa",
        publishRight: "right",
        goodNews: "rightAd_goodNews",
        rightvipad: "rightvipad",
        rightvipuser: "rightvipuser",
        rightAdAct: "rightAd_act",
        rightAd2: "rightAd_AD2",
        rightAd3: "rightAd_AD3",
        rightAdFocus: "rightAd_focus",
        bottomTips: "bottom",
        profileInfo: "infor",
        profileQa: "qa",
        likeLimit: "favlimit",
        dislikeLimit: "hidelimit",
        likeNotice: "favnotice",
        profileOnline: "online",
        dmUpOpen: "dmup",
        hideNoticeOpen: "hide.notice",
        stickerOpen: "vipsticker",
        giftBoxOpen: "giftbox",
        diggOpen: "digg.notice",
        lovefmUser: "user",
        openLogin: "login",
        openReg: "reg",
        opensvip: "openvip"
    }, i = d.extend({}, g, h), j = [new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image], k = function (a) {
        return Math.floor(a * (Math.random() % 1))
    }, l = e.extend({
        init: function () {
        }, keyFrom: function (a) {
            var b = d(a).first();
            if (b[0] === window)return "window";
            var c = d.map(b.parents().andSelf(), function (a) {
                var b = d(a);
                return i[b.data("log")] || b.data("log") || undefined
            });
            return c.join(".")
        }, buyVipKeyFrom: function (a) {
            var b = d(a).first();
            if (b[0] === window)return "window";
            var c = "", e = d.map(b.parents().andSelf(), function (a) {
                var b = d(a);
                c === "" && b.data("viplog") && (c = b.data("viplog"))
            });
            return c
        }, getType: function (a) {
            var b = null;
            return ((b = typeof a) === "object" ? Object.prototype.toString.call(a).slice(8, -1) : b).toLowerCase()
        }, paramConcat: function (a, b) {
            var c = "", e = "", f = !1;
            e = decodeURI(d(b).attr("href"));
            if (a && this.getType(a) === "object")for (var g in a)if (g == "method" && a[g] == "") {
                for (var h in this.methodFromMap) {
                    var i = new RegExp(h);
                    if (i.exec(e) != null) {
                        f = !0, c += "&" + g + "=" + this.methodFromMap[h];
                        break
                    }
                }
                f || (c += "&" + g + "=click")
            } else c += "&" + g + "=" + a[g];
            a && this.getType(a) === "string" && (c += "&" + a);
            return c
        }, doLog: function (a) {
            this.$elem = d(a.elem), this.parameter = a.parameter, a.path = a.path || "/page.do", a.path.indexOf("/") === -1 ? this.path = f[a.path].url : this.path = a.path;
            var b = "";
            if (this.path.indexOf("?") === -1) {
                var c = this.keyFrom(this.$elem);
                b = this.path + "?" + "keyfrom=" + c + this.paramConcat(this.parameter, this.$elem)
            } else {
                var c = this.keyFrom(this.$elem);
                b = this.path + "&" + "keyfrom=" + c + this.paramConcat(this.parameter, c)
            }
            this.send(b)
        }, send: function (a) {
            if (typeof a == "undefined")throw"no valid logger address";
            var b = j[k(10)], c = "";
            a.match(/^http:\/\/.+/) ? c = a : c = "http://" + location.host + (/^\//.test(a) ? a : "/" + a), c += "&__rnd=" + (new Date).getTime(), b.src = c
        }
    }), m = null;
    return {
        doLog: function (a) {
            m === null && (m = new l), m.doLog(a)
        }, keyFrom: function (a) {
            m === null && (m = new l);
            return m.keyFrom(a)
        }, buyVipKeyFrom: function (a) {
            m === null && (m = new l);
            return m.buyVipKeyFrom(a)
        }, send: function (a) {
            m === null && (m = new l);
            return m.send(a)
        }
    }
});
define("data/RequestMap", function (a, b, c) {
    var d = {
        sendStatus: {url: "/trend/add", login: !0, silent: !0},
        feedList: {url: "/feed/list", login: !0, silent: !0},
        feedSecondLeft: {url: "/feed/secondsleft", login: !0, silent: !0},
        trendList: {url: "/trend/list", login: !0, silent: !0},
        userTrendList: {url: "/trend/usertimeline", login: !0, silent: !0, redirect: !0},
        addFav: {url: "/relation/follow", login: !0, silent: !0},
        cancelFav: {url: "/relation/unfollow", login: !0, silent: !0},
        addShield: {url: "/relation/reject", login: !0, silent: !0},
        addDigg: {url: "/messages/like/praise", login: !0, silent: !0},
        sayHi: {url: "/messages/like/sayHi", login: !0, silent: !0},
        loginUserInfo: {url: "/user/logininfo", login: !0, silent: !0},
        closeUser: {url: "/user/closeUser", login: !0, silent: !0},
        sendMess: {url: "/messages/add", login: !0, silent: !0},
        deleteMess: {url: "/messages/delete", login: !0, silent: !0},
        flushMessNewCount: {url: "/messages/flush", login: !0, silent: !0},
        messageList: {url: "/messages/dmTimeline", login: !0, silent: !0},
        deleteSession: {url: "/messages/deleteSession", login: !0, silent: !0},
        singleSession: {url: "/messages/singleSession", login: !0, silent: !0},
        newCount: {url: "/newCount", login: !0},
        newFeeds: {url: "/home/newFeeds", login: !0},
        newFeedsNew: {url: "/feed/newFeeds", login: !0},
        newTrends: {url: "/trend/newInfo", login: !0},
        trendDelete: {url: "/trend/delete", login: !0},
        heedList: {url: "/messages/followers/list", login: !0, silent: !0},
        diggList: {url: "/messages/like/praiseList", login: !0, silent: !0},
        parkNoticeList: {url: "/messages/park/list", login: !0, silent: !0},
        noticeList: {url: "/messages/notice", login: !0, silent: !0},
        cleanNotice: {url: "/messages/clean", login: !0, silent: !0},
        noticeSearch: {url: "/messages/search", login: !0, silent: !0},
        followingList: {url: "/following/list", login: !0, silent: !0},
        followerList: {url: "/followers/list", login: !0, silent: !0},
        getBigPhotoInfo: {url: "/photo/singlePhoto", login: !0, silent: !0, redirect: !0},
        deletePhoto: {url: "/photo/delete", login: !0, silent: !0},
        sliderPhotoList: {url: "/photo/list", login: !0, silent: !0, redirect: !0},
        segmentPhotoList: {url: "/photo/segmentPhotoList", login: !0, silent: !0, redirect: !0},
        settingProfilePhoto: {url: "/settings/avatars", login: !0, silent: !0, redirect: !0},
        deleteAvatar: {url: "/user/deleteAvatar", login: !0, silent: !0, redirect: !0},
        profile_timeline: {url: "/profile/timeline", login: !0, silent: !0},
        profile_userinfo: {url: "/profile/userinfo", login: !0, silent: !0},
        profile_qa: {url: "/profile/qa", login: !0, silent: !0},
        profilePhotoList: {url: "/user/avatarList", login: !0, silent: !0, redirect: !0},
        profileSegmentAvatarList: {url: "/user/segmentAvatarList", login: !0, silent: !0, redirect: !0},
        getProfilePhotoInfo: {url: "/user/avatar", login: !0, silent: !0, redirect: !0},
        searchList: {url: "/search/user/list", login: !1, silent: !0},
        cityInfo: {url: "/user/addOtherCity", login: !1},
        visitorList: {url: "/messages/visitor/list", login: !0},
        visitors: {url: "/visitor/latestvisitor", login: !0},
        userGuide: {url: "/user/novice", login: !0},
        matchCondition: {url: "/match/require", login: !0, silent: !0, redirect: !0},
        matchAgree: {url: "/match/view", login: !0, silent: !0, redirect: !0},
        validteNewUser: {url: "/user/validteUser", login: !1, silent: !0},
        addNewUser: {url: "/user/addUser", login: !1, silent: !0},
        newUserGuideStep2: {url: "/user/registAvatar", login: !0},
        updateAvatar: {url: "/user/portraits", login: !0, silent: !0},
        updateBasicInfo: {url: "/user/updateUser", login: !0, silent: !0},
        updateLoverDesc: {url: "/user/require", login: !0, silent: !0},
        updateLifeView: {url: "/user/marrage", login: !0, silent: !0},
        verifyIdCard: {url: "/verifyName", login: !0, silent: !0},
        verifyMobile: {url: "/verifyMobile", login: !0, silent: !0},
        mobileCodeGender: {url: "/genMobileCodeNew", login: !1},
        companySuggest: {url: "/suggest/corp", login: !0},
        loginUpdateInfo: {url: "/user/addUser", login: !1},
        addToAlbum: {url: "/photo/add", login: !0},
        corpMailInvite: {url: "/user/inviteCode", login: !0},
        updateInviteCode: {url: "/user/updateCode", login: !1},
        updateMonolog: {url: "/user/monolog/update", login: !0, silent: !0},
        canMonologUpdate: {url: "/user/monolog/canupdate", login: !0, silent: !0},
        checkNickName: {url: "/user/checkName", login: !1},
        getEmotion: {url: "/emotion/getAll", login: !0},
        sendLetter: {url: "/trend/writeLoveNotes", login: !0, silent: !0},
        reportBlock: {url: "/blacklist/add", login: !0, silent: !0},
        cancelBlock: {url: "/blacklist/remove", login: !0, silent: !0},
        addAnswer: {url: "/question/answer", login: !0, silent: !0},
        skipQuestion: {url: "/question/skip", login: !0, silent: !0},
        newQuestion: {url: "/question/suggest", login: !0, silent: !0},
        questionRecommend: {url: "/question/suggestUserList", login: !0, silent: !0},
        questionList: {url: "/question/questionList", login: !0, silent: !0},
        compareList: {url: "/question/compareList", login: !0, silent: !0},
        unverifyWeibo: {url: "/user/verify/unverifyMicroblog", login: !0, silent: !0},
        unverifyDouban: {url: "/user/verify/unverifyDouban", login: !0, silent: !0},
        rightAds: {url: "/operation/rightAds", login: !0, silent: !0},
        goodNews: {url: "/operation/successfulStory", login: !0, silent: !0},
        rightActivities: {url: "/operation/activities", login: !1, silent: !0},
        payLogin: {url: "/pay/login", login: !0, silent: !0},
        saveNewOrder: {url: "/pay/saveNewOrder", login: !0, silent: !0},
        saveNewOrderForDeal: {url: "/pay/saveNewOrderForDeal", login: !0, silent: !0},
        chargeBillList: {url: "/pay/orderList", login: !0, silent: !0},
        expenseBillList: {url: "/pay/dealInfoList", login: !0, silent: !0},
        closeTrade: {url: "/pay/closeTrade", login: !0, silent: !0},
        closeDeal: {url: "/pay/closeDeal", login: !0, silent: !0},
        visitBuy: {url: "/pay/visitBuy", login: !0, silent: !0},
        informBuy: {url: "/pay/onlineRemindBuy", login: !0, silent: !0},
        loginRemind: {url: "/settings/onlineRemind/set", login: !0, silent: !0},
        stealthVisit: {url: "/user/changeStealthVisit", login: !0, silent: !0},
        invalidAvatarFilter: {url: "/user/updateInvalidAvatarFilter", login: !0, silent: !0},
        createNewDeal: {url: "/pay/createNewDeal", login: !0, silent: !0},
        payDeal: {url: "/pay/deal", login: !0, silent: !0},
        autoSigned: {url: "/pay/autoSigned", login: !0, silent: !0},
        astroSuggest: {url: "/park/astroSuggest", login: !0, silent: !0},
        companyNameVerify: {url: "/corp/getEmail", login: !0, silent: !0},
        companyMailVerify: {url: "/corp/emailAuth", login: !0, silent: !0},
        commitVerifyFile: {url: "/corp/imageAuth", login: !0, silent: !0},
        getChartlet: {url: "/chartlet/list", login: !0, silent: !0},
        createPresentDeal: {url: "/pay/createPresentDeal", login: !0, silent: !0},
        recommendList: {url: "/park/xunrenlist", login: !1, silent: !0},
        deblocking: {url: "/user/plead", login: !1, silent: !1},
        balloonBuy: {url: "/pay/buyService?serviceId=-6491788925688873261", login: !1, silent: !0},
        singlesDayBuy: {url: "/pay/buyService?serviceId=31890713254037487", login: !1, silent: !0},
        getGift: {url: "/gift/getGifts", login: !0, silent: !0},
        giftReceiveList: {url: "/messages/giftList", login: !0, silent: !0},
        giftBoxList: {url: "/gift/giftBoxList", login: !1, silent: !0},
        getTag: {url: "/tag/all", login: !0, silent: !0},
        saveTag: {url: "/tag/save", login: !0, silent: !0},
        vipBuy: {url: "/pay/buyTimeService", login: !0, silent: !0},
        upgradeVip: {url: "/pay/buyTimeService", login: !0, silent: !0},
        createUpgradeDeal: {url: "/deal/vip/createNewUpgradeDeal", login: !0, silent: !0},
        diggingList: {url: "/messages/like/sendPraiseList", login: !0, silent: !0},
        unDislike: {url: "/dislike/unDislike", login: !0, silent: !0},
        dislikeList: {url: "/dislike/list", login: !0, silent: !0},
        topicList: {url: "/park/topic/list", login: !1, silent: !0},
        myPubTopic: {url: "/park/topic/userTopicList", login: !0, silent: !0},
        myReplyTopic: {url: "/park/topic/userTopicList", login: !0, silent: !0},
        addTopicComment: {url: "/park/topic/comment/add", login: !0, silent: !0},
        deleteTopicComment: {url: "/park/topic/comment/delete", login: !0, silent: !0},
        topicCommentList: {url: "/park/topic/comment/list", login: !1, silent: !0},
        partyList: {url: "/park/partylist", login: !1, silent: !0},
        partyUserList: {url: "/park/party/getParticipators", login: !1, silent: !0},
        guestList: {url: "/park/lovefm/guestlist", login: !0, silent: !0},
        exchangeCoupon: {url: "/coupon/getCode", login: !0, silent: !0},
        couponConfirm: {url: "/coupon/exchange", login: !0, silent: !0},
        checkCaptchaCode: {url: "/photo/checkCode", login: !1, silent: !1},
        checkVerifyCode: {url: "/photo/checkVerifyCode", login: !1, silent: !1},
        partySignup: {url: "/park/party/apply", login: !0, silent: !0},
        topBannerList: {url: "/banner/homeTop", login: !0, silent: !0},
        topBannerClose: {url: "/banner/homeTop/close", login: !0, silent: !0},
        adBannerList: {url: "/banner/adList", login: !1, silent: !1},
        femaleStarList: {url: "/park/star/starlist", login: !1, silent: !0},
        maleStarList: {url: "/park/star/starlist", login: !1, silent: !0},
        getToShowInfo: {url: "/park/star/bid", login: !0, silent: !0},
        getRanking: {url: "/park/star/bidRank", login: !0, silent: !0},
        createStarDeal: {url: "/deal/star/createNewDeal", login: !0, silent: !0},
        xy3List: {url: "/park/active/xy3/list", login: !1, silent: !0},
        xy3JoinActive: {url: "/park/active/xy3/joinActive", login: !0, silent: !0},
        xy3Gift: {url: "/park/active/xy3/gifts", login: !1, silent: !0},
        xy3Digg: {url: "/park/active/xy3/digg", login: !1, silent: !0},
        blackedBy: {url: "/blackedBy", login: !0, silent: !0},
        topicTryAdd: {url: "/park/topic/comment/tryAdd", login: !0, silent: !0},
        feng2014NextQuestion: {url: "/park/active/feng2014/nextQuestion", login: !1, silent: !1},
        feng2014Answer: {url: "/park/active/feng2014/answer", login: !1, silent: !1},
        feng2014SuggestUsersList: {url: "/park/active/feng2014/suggestUsersList", login: !1, silent: !1},
        giftRecommend: {url: "/gift/recommendGifts", login: !0, silent: !0},
        showDonateTasks: {url: "/pay/showDonateTasks", login: !0, silent: !0},
        getDonateCoins: {url: "/pay/getDonateCoins", login: !0, silent: !0},
        try5DayVip: {url: "/pay/try5DayVip", login: !0, silent: !0},
        addTopic: {url: "/park/topic/add", login: !0, silent: !0},
        updateTopic: {url: "/park/topic/update", login: !0, silent: !0},
        topTopic: {url: "/park/topic/top", login: !0, silent: !0},
        unTopTopic: {url: "/park/topic/unTop", login: !0, silent: !0},
        essenceTopic: {url: "/park/topic/essence", login: !0, silent: !0},
        unEssenceTopic: {url: "/park/topic/unEssence", login: !0, silent: !0},
        deleteTopic: {url: "/park/topic/delete", login: !0, silent: !0},
        idphotoList: {url: "/park/active/idphoto/list", login: !1, silent: !0},
        idphotoDigg: {url: "/park/active/idphoto/praise", login: !1, silent: !0},
        batchMessageInfo: {url: "/batchMessage/info", login: !0, silent: !0},
        batchMessageSend: {url: "/batchMessage/send", login: !0, silent: !0},
        dateApply: {url: "/dating/joinDating", login: !0, silent: !0},
        deleteDating: {url: "/dating/deleteDating", login: !0, silent: !0},
        addDating: {url: "/dating/addDating", login: !0, silent: !0},
        datingList: {url: "/dating/applyList", login: !0, silent: !0},
        datingParkList: {url: "/dating/list", login: !0, silent: !0},
        dealApply: {url: "/dating/dealApply", login: !0, silent: !0},
        fateSecondLeft: {url: "/fate/secondLeft", login: !0, silent: !0},
        fateAttitude: {url: "/fate/attitude", login: !0, silent: !0},
        fateResponse: {url: "/fate/response", login: !0, silent: !0},
        lovemeCapture: {url: "/share/loveme", login: !1, silent: !0},
        wowNextQA: {url: "/park/active/wow/nextQA", login: !0, silent: !0},
        wowAnswer: {url: "/park/active/wow/answer", login: !0, silent: !0},
        wowCard: {url: "/park/active/wow/genParticipator", login: !0, silent: !0},
        wowTribeList: {url: "/park/active/wow/tribeList", login: !1, silent: !0},
        wowAllianceList: {url: "/park/active/wow/allianceList", login: !1, silent: !0},
        wowVote: {url: "/park/active/wow/vote", login: !0, silent: !0},
        getUnlockAvatarDealStatus: {url: "/user/getUnlockAvatarDealStatus", login: !0, silent: !0},
        verifyAvatarPhotoSize: {url: "/user/verifyAvatarPhotoSize", login: !0, silent: !0},
        topicVote: {url: "/park/vote/vote", login: !0, silent: !0}
    };
    return d
});
define("data/selectData", function (a, b, c) {
    var d = a("lib/jquery"), e = {
        sex: {1: "\u7537", 2: "\u5973"},
        openedCity: {
            "1-0": "\u5317\u4eac",
            "2-0": "\u4e0a\u6d77",
            "7-1": "\u5e7f\u5dde",
            "5-1": "\u676d\u5dde",
            "7-3": "\u6df1\u5733",
            "3-0": "\u5929\u6d25",
            "4-0": "\u91cd\u5e86",
            "5-0": "\u6d59\u6c5f",
            "6-0": "\u6c5f\u82cf",
            "7-0": "\u5e7f\u4e1c",
            "8-0": "\u798f\u5efa",
            "9-0": "\u6e56\u5357",
            "10-0": "\u6e56\u5317",
            "11-0": "\u8fbd\u5b81",
            "12-0": "\u5409\u6797",
            "13-0": "\u9ed1\u9f99\u6c5f",
            "14-0": "\u6cb3\u5317",
            "15-0": "\u6cb3\u5357",
            "16-0": "\u5c71\u4e1c",
            "17-0": "\u9655\u897f",
            "18-0": "\u7518\u8083",
            "19-0": "\u9752\u6d77",
            "20-0": "\u65b0\u7586",
            "21-0": "\u5c71\u897f",
            "22-0": "\u56db\u5ddd",
            "23-0": "\u8d35\u5dde",
            "24-0": "\u5b89\u5fbd",
            "25-0": "\u6c5f\u897f",
            "26-0": "\u4e91\u5357",
            "27-0": "\u5185\u8499\u53e4",
            "28-0": "\u5e7f\u897f",
            "29-0": "\u897f\u85cf",
            "30-0": "\u5b81\u590f",
            "31-0": "\u6d77\u5357",
            "32-0": "\u9999\u6e2f",
            "33-0": "\u6fb3\u95e8",
            "34-0": "\u53f0\u6e7e",
            "35-0": "\u6d77\u5916",
            "36-0": "\u5176\u4ed6"
        },
        education: {
            1: "\u5927\u4e13\u4ee5\u4e0b",
            2: "\u5927\u4e13",
            3: "\u672c\u79d1",
            4: "\u7855\u58eb",
            5: "\u535a\u58eb"
        },
        industry: {
            1: "\u8ba1\u7b97\u673a/\u4e92\u8054\u7f51/\u901a\u4fe1",
            2: "\u516c\u52a1\u5458/\u4e8b\u4e1a\u5355\u4f4d",
            3: "\u6559\u5e08",
            4: "\u533b\u751f",
            5: "\u62a4\u58eb",
            6: "\u7a7a\u4e58\u4eba\u5458",
            7: "\u751f\u4ea7/\u5de5\u827a/\u5236\u9020",
            8: "\u5546\u4e1a/\u670d\u52a1\u4e1a/\u4e2a\u4f53\u7ecf\u8425",
            9: "\u91d1\u878d/\u94f6\u884c/\u6295\u8d44/\u4fdd\u9669",
            10: "\u6587\u5316/\u5e7f\u544a/\u4f20\u5a92",
            11: "\u5a31\u4e50/\u827a\u672f/\u8868\u6f14",
            12: "\u5f8b\u5e08/\u6cd5\u52a1",
            13: "\u6559\u80b2/\u57f9\u8bad/\u7ba1\u7406\u54a8\u8be2",
            14: "\u5efa\u7b51/\u623f\u5730\u4ea7/\u7269\u4e1a",
            15: "\u6d88\u8d39\u96f6\u552e/\u8d38\u6613/\u4ea4\u901a\u7269\u6d41",
            16: "\u9152\u5e97\u65c5\u6e38",
            17: "\u73b0\u4ee3\u519c\u4e1a",
            18: "\u5728\u6821\u5b66\u751f"
        },
        marriageStatus: {1: "\u672a\u5a5a", 2: "\u79bb\u5f02", 3: "\u4e27\u5076", 4: "\u5df2\u5a5a"},
        marriageStatusFilter: {1: "\u672a\u5a5a", 2: "\u79bb\u5f02", 3: "\u4e27\u5076"},
        lookingFor: {
            1: "\u7ed3\u5a5a\u5bf9\u8c61",
            2: "\u604b\u4eba",
            3: "\u666e\u901a\u670b\u53cb",
            4: "\u77e5\u5df1"
        },
        house: {
            1: "\u5df2\u8d2d\u623f",
            2: "\u79df\u623f",
            3: "\u5355\u4f4d\u5bbf\u820d",
            4: "\u548c\u5bb6\u4eba\u540c\u4f4f"
        },
        birthOrder: {
            1: "\u72ec\u751f\u5b50\u5973",
            2: "\u8001\u5927",
            3: "\u8001\u4e8c",
            4: "\u8001\u4e09",
            5: "\u8001\u56db",
            6: "\u8001\u4e94\u53ca\u66f4\u5c0f",
            7: "\u8001\u5e7a"
        },
        childStatus: {
            1: "\u65e0\u5c0f\u5b69",
            2: "\u6709\u5c0f\u5b69\u5f52\u81ea\u5df1",
            3: "\u6709\u5c0f\u5b69\u5f52\u5bf9\u65b9"
        },
        religion: {
            1: "\u65e0\u5b97\u6559\u4fe1\u4ef0",
            2: "\u5927\u4e58\u4f5b\u6559\u663e\u5b97",
            3: "\u5927\u4e58\u4f5b\u6559\u5bc6\u5b97",
            4: "\u5927\u4e58\u4f5b\u6559\u51c0\u5b97",
            5: "\u5c0f\u4e58\u4f5b\u6559",
            6: "\u9053\u6559",
            7: "\u5112\u6559",
            8: "\u57fa\u7763\u6559\u5929\u4e3b\u6559\u6d3e",
            9: "\u57fa\u7763\u6559\u4e1c\u6b63\u6559\u6d3e",
            10: "\u57fa\u7763\u6559\u65b0\u6559\u6d3e",
            11: "\u72b9\u592a\u6559",
            12: "\u4f0a\u65af\u5170\u6559\u4ec0\u53f6\u6d3e",
            13: "\u4f0a\u65af\u5170\u6559\u900a\u5c3c\u6d3e",
            14: "\u5370\u5ea6\u6559",
            15: "\u795e\u9053\u6559",
            16: "\u8428\u6ee1\u6559",
            17: "\u5176\u4ed6\u6559\u6d3e"
        },
        car: {1: "\u5df2\u8d2d\u8f66", 2: "\u672a\u8d2d\u8f66"},
        blood: {1: "A", 2: "B", 3: "AB", 4: "O"},
        nationality: {
            1: "\u6c49",
            2: "\u8499\u53e4",
            3: "\u56de",
            4: "\u85cf",
            5: "\u7ef4\u543e\u5c14",
            6: "\u82d7",
            7: "\u5f5d",
            8: "\u58ee",
            9: "\u5e03\u4f9d",
            10: "\u671d\u9c9c",
            11: "\u6ee1",
            12: "\u4f97",
            13: "\u7476",
            14: "\u767d",
            15: "\u571f\u5bb6",
            16: "\u54c8\u5c3c",
            17: "\u54c8\u8428\u514b",
            18: "\u50a3",
            19: "\u9ece",
            20: "\u5088\u50f3",
            21: "\u4f64",
            22: "\u7572",
            23: "\u9ad8\u5c71",
            24: "\u62c9\u795c",
            25: "\u6c34",
            26: "\u4e1c\u4e61",
            27: "\u7eb3\u897f",
            28: "\u666f\u9887",
            29: "\u67ef\u5c14\u514b\u5b5c",
            30: "\u571f",
            31: "\u8fbe\u65a1\u5c14",
            32: "\u4eeb\u4f6c",
            33: "\u7f8c",
            34: "\u5e03\u6717",
            35: "\u6492\u62c9",
            36: "\u6bdb\u5357",
            37: "\u4ee1\u4f6c",
            38: "\u9521\u4f2f",
            39: "\u963f\u660c",
            40: "\u666e\u7c73",
            41: "\u5854\u5409\u514b",
            42: "\u6012",
            43: "\u4e4c\u5b5c\u522b\u514b",
            44: "\u4fc4\u7f57\u65af",
            45: "\u9102\u6e29\u514b",
            46: "\u5fb7\u6602",
            47: "\u4fdd\u5b89",
            48: "\u88d5\u56fa",
            49: "\u4eac",
            50: "\u5854\u5854\u5c14",
            51: "\u72ec\u9f99",
            52: "\u9102\u4f26\u6625",
            53: "\u8d6b\u54f2",
            54: "\u95e8\u5df4",
            55: "\u73de\u5df4",
            56: "\u57fa\u8bfa"
        },
        position: {
            1: "\u666e\u901a\u804c\u5458",
            2: "\u4e2d\u5c42\u7ba1\u7406\u8005",
            3: "\u9ad8\u5c42\u7ba1\u7406\u8005",
            4: "\u4f01\u4e1a\u4e3b",
            5: "\u5b66\u751f"
        },
        salary: {
            "-1": "2000\u5143\u4ee5\u4e0b",
            1: "2000-4000\u5143",
            2: "4000-6000\u5143",
            3: "6000-10000\u5143",
            4: "10000-15000\u5143",
            5: "15000-20000\u5143",
            6: "20000-50000\u5143",
            7: "50000\u5143\u4ee5\u4e0a"
        },
        salaryArray: [{key: -1, val: "2000\u5143\u4ee5\u4e0b"}, {key: 1, val: "2000-4000\u5143"}, {
            key: 2,
            val: "4000-6000\u5143"
        }, {key: 3, val: "6000-10000\u5143"}, {key: 4, val: "10000-15000\u5143"}, {
            key: 5,
            val: "15000-20000\u5143"
        }, {key: 6, val: "20000-50000\u5143"}, {key: 7, val: "50000\u5143\u4ee5\u4e0a"}],
        searchSalaryArray: [{key: -1, val: "2000\u5143\u4ee5\u4e0b"}, {key: 1, val: "2000\u5143\u4ee5\u4e0a"}, {
            key: 2,
            val: "4000\u5143\u4ee5\u4e0a"
        }, {key: 3, val: "6000\u5143\u4ee5\u4e0a"}, {key: 4, val: "10000\u5143\u4ee5\u4e0a"}, {
            key: 5,
            val: "15000\u5143\u4ee5\u4e0a"
        }, {key: 6, val: "20000\u5143\u4ee5\u4e0a"}, {key: 7, val: "50000\u5143\u4ee5\u4e0a"}],
        status: {1: "\u5bfb\u89c5\u5bf9\u8c61\u4e2d", 3: "\u5df2\u6709\u5bf9\u8c61\uff0c\u4e0d\u518d\u5bfb\u89c5"},
        expDegree: {
            1: "\u5927\u4e13\u53ca\u4ee5\u4e0a",
            2: "\u672c\u79d1\u53ca\u4ee5\u4e0a",
            3: "\u7855\u58eb\u53ca\u4ee5\u4e0a",
            4: "\u535a\u58eb\u53ca\u4ee5\u4e0a"
        },
        expSalary: {"-1": 2e3, 1: 4e3, 2: 6e3, 3: 1e4, 4: 2e4, 5: 5e4},
        expSalaryArray: [{key: -1, val: 2e3}, {key: 1, val: 4e3}, {key: 2, val: 6e3}, {key: 3, val: 1e4}, {
            key: 4,
            val: 2e4
        }, {key: 5, val: 5e4}],
        cooking: {
            1: "\u4f1a\u505a\u996d\uff0c\u5e0c\u671b\u5bf9\u65b9\u4e5f\u4f1a",
            2: "\u4f1a\u505a\u996d\uff0c\u5bf9\u53e6\u4e00\u534a\u6ca1\u8981\u6c42",
            3: "\u4e0d\u592a\u4f1a\uff0c\u5bf9\u53e6\u4e00\u534a\u6ca1\u8981\u6c42",
            4: "\u4e0d\u592a\u4f1a\uff0c\u5e0c\u671b\u5bf9\u65b9\u53a8\u827a\u6bd4\u6211\u597d"
        },
        arrangement: {
            1: "\u5de5\u4f5c\u65f6\u95f4\u56fa\u5b9a\uff0c\u4e0d\u63a5\u53d7\u5bf9\u65b9\u51fa\u5dee",
            2: "\u5de5\u4f5c\u65f6\u95f4\u56fa\u5b9a\uff0c\u4e0d\u4ecb\u610f\u5bf9\u65b9\u51fa\u5dee",
            3: "\u5de5\u4f5c\u7ecf\u5e38\u51fa\u5dee",
            4: "\u5de5\u4f5c\u5076\u5c14\u51fa\u5dee"
        },
        smoking: {
            1: "\u4e0d\u5438\u70df\uff0c\u4e14\u5f88\u53cd\u611f\u5438\u70df",
            2: "\u4e0d\u5438\u70df\uff0c\u4f46\u4e5f\u4e0d\u53cd\u611f",
            3: "\u5076\u5c14\u5438\u70df",
            4: "\u7ecf\u5e38\u5438\u70df"
        },
        drink: {
            1: "\u4e0d\u559d\u9152\uff0c\u4e14\u5f88\u53cd\u611f\u559d\u9152",
            2: "\u4e0d\u559d\u9152\uff0c\u4f46\u4e5f\u4e0d\u53cd\u611f",
            3: "\u793e\u4ea4\u9700\u8981\u65f6\u624d\u559d",
            4: "\u7ecf\u5e38\u559d\u9152"
        },
        loveAndMarriage: {
            1: "\u80fd\u63a5\u53d7\u95ea\u5a5a",
            2: "\u4e00\u5e74\u5185",
            3: "\u4e24\u5e74\u5185",
            4: "\u4e09\u5e74\u53ca\u4ee5\u4e0a",
            5: "\u6682\u65f6\u4e0d\u60f3\u7ed3\u5a5a"
        },
        needChild: {
            1: "\u60f3\u8981\u5b69\u5b50",
            2: "\u4e0d\u60f3\u8981\u5b69\u5b50",
            3: "\u89c6\u60c5\u51b5\u800c\u5b9a"
        },
        withParents: {1: "\u4e0d\u4ecb\u610f", 2: "\u4ecb\u610f"},
        housework: {
            1: "\u8fd9\u662f\u59bb\u5b50\u7684\u5206\u5185\u4e8b",
            2: "\u592b\u59bb\u5e73\u5747\u5206\u914d",
            3: "\u8c01\u6709\u65f6\u95f4\u8c01\u505a",
            4: "\u592b\u59bb\u5404\u81ea\u627f\u62c5\u81ea\u5df1\u64c5\u957f\u7684\u5bb6\u52a1"
        },
        financial: {
            1: "\u7531\u592b\u59bb\u5171\u540c\u8ba1\u5212",
            2: "\u592b\u59bb\u5404\u81ea\u652f\u914d\u5404\u81ea\u7684\u6536\u5165",
            3: "\u7531\u59bb\u5b50\u6253\u7406",
            4: "\u7531\u4e08\u592b\u6253\u7406"
        },
        constellation: {
            1: "\u9b54\u7faf",
            2: "\u6c34\u74f6",
            3: "\u53cc\u9c7c",
            4: "\u767d\u7f8a",
            5: "\u91d1\u725b",
            6: "\u53cc\u5b50",
            7: "\u5de8\u87f9",
            8: "\u72ee\u5b50",
            9: "\u5904\u5973",
            10: "\u5929\u79e4",
            11: "\u5929\u874e",
            12: "\u5c04\u624b"
        },
        zodiac: {
            1: "\u9f20",
            2: "\u725b",
            3: "\u864e",
            4: "\u5154",
            5: "\u9f99",
            6: "\u86c7",
            7: "\u9a6c",
            8: "\u7f8a",
            9: "\u7334",
            10: "\u9e21",
            11: "\u72d7",
            12: "\u732a"
        },
        height: function (a, b, c) {
            var d = {}, e = 1;
            b = b || 150, c = c || 210;
            for (var f = b; f <= c; f++)d[f] = f, e += 1;
            return d
        },
        age: function (a, b, c) {
            var d = {}, e = 1;
            b = b || 18, c = c || 60;
            for (var f = b; f <= c; f++)d[f] = f, e += 1;
            return d
        },
        city: {
            all: function () {
                return d.extend(this.mainland, this.overseas)
            },
            mainland: {
                1: "\u5317\u4eac",
                2: "\u4e0a\u6d77",
                3: "\u5929\u6d25",
                4: "\u91cd\u5e86",
                5: "\u6d59\u6c5f",
                6: "\u6c5f\u82cf",
                7: "\u5e7f\u4e1c",
                8: "\u798f\u5efa",
                9: "\u6e56\u5357",
                10: "\u6e56\u5317",
                11: "\u8fbd\u5b81",
                12: "\u5409\u6797",
                13: "\u9ed1\u9f99\u6c5f",
                14: "\u6cb3\u5317",
                15: "\u6cb3\u5357",
                16: "\u5c71\u4e1c",
                17: "\u9655\u897f",
                18: "\u7518\u8083",
                19: "\u9752\u6d77",
                20: "\u65b0\u7586",
                21: "\u5c71\u897f",
                22: "\u56db\u5ddd",
                23: "\u8d35\u5dde",
                24: "\u5b89\u5fbd",
                25: "\u6c5f\u897f",
                26: "\u4e91\u5357",
                27: "\u5185\u8499\u53e4",
                28: "\u5e7f\u897f",
                29: "\u897f\u85cf",
                30: "\u5b81\u590f",
                31: "\u6d77\u5357"
            },
            overseas: {
                32: "\u9999\u6e2f",
                33: "\u6fb3\u95e8",
                34: "\u53f0\u6e7e",
                35: "\u6d77\u5916",
                36: "\u5176\u4ed6\u5730\u533a"
            },
            opened: {
                1: "\u5317\u4eac",
                2: "\u4e0a\u6d77",
                "7-1": "\u5e7f\u5dde",
                "5-1": "\u676d\u5dde",
                "7-3": "\u6df1\u5733"
            },
            specialCity: {1: "\u5317\u4eac", 2: "\u4e0a\u6d77", 3: "\u5929\u6d25", 4: "\u91cd\u5e86"},
            specialCities: [1, 2, 3, 4, 32, 33, 34, 36],
            city: {
                1: {
                    1: "\u4e1c\u57ce\u533a",
                    2: "\u897f\u57ce\u533a",
                    3: "\u5d07\u6587\u533a",
                    4: "\u5ba3\u6b66\u533a",
                    5: "\u671d\u9633\u533a",
                    6: "\u4e30\u53f0\u533a",
                    7: "\u77f3\u666f\u5c71\u533a",
                    8: "\u6d77\u6dc0\u533a",
                    9: "\u95e8\u5934\u6c9f\u533a",
                    10: "\u623f\u5c71\u533a",
                    11: "\u901a\u5dde\u533a",
                    12: "\u987a\u4e49\u533a",
                    13: "\u660c\u5e73\u533a",
                    14: "\u5927\u5174\u533a",
                    15: "\u6000\u67d4\u533a",
                    16: "\u5e73\u8c37\u533a",
                    17: "\u5bc6\u4e91\u53bf",
                    18: "\u5ef6\u5e86\u53bf"
                },
                2: {
                    1: "\u9ec4\u6d66\u533a",
                    2: "\u5362\u6e7e\u533a",
                    3: "\u5f90\u6c47\u533a",
                    4: "\u957f\u5b81\u533a",
                    5: "\u9759\u5b89\u533a",
                    6: "\u666e\u9640\u533a",
                    7: "\u95f8\u5317\u533a",
                    8: "\u8679\u53e3\u533a",
                    9: "\u6768\u6d66\u533a",
                    10: "\u95f5\u884c\u533a",
                    11: "\u5b9d\u5c71\u533a",
                    12: "\u5609\u5b9a\u533a",
                    13: "\u6d66\u4e1c\u65b0\u533a",
                    14: "\u91d1\u5c71\u533a",
                    15: "\u677e\u6c5f\u533a",
                    16: "\u9752\u6d66\u533a",
                    17: "\u5357\u6c47\u533a",
                    18: "\u5949\u8d24\u533a",
                    19: "\u5d07\u660e\u53bf"
                },
                3: {
                    1: "\u548c\u5e73\u533a",
                    2: "\u6cb3\u4e1c\u533a",
                    3: "\u6cb3\u897f\u533a",
                    4: "\u5357\u5f00\u533a",
                    5: "\u6cb3\u5317\u533a",
                    6: "\u7ea2\u6865\u533a",
                    7: "\u5858\u6cbd\u533a",
                    8: "\u6c49\u6cbd\u533a",
                    9: "\u5927\u6e2f\u533a",
                    10: "\u4e1c\u4e3d\u533a",
                    11: "\u897f\u9752\u533a",
                    12: "\u6d25\u5357\u533a",
                    13: "\u5317\u8fb0\u533a",
                    14: "\u6b66\u6e05\u533a",
                    15: "\u5b9d\u577b\u533a",
                    16: "\u5b81\u6cb3\u53bf",
                    17: "\u9759\u6d77\u53bf",
                    18: "\u84df\u53bf"
                },
                4: {
                    1: "\u4e07\u5dde\u533a",
                    2: "\u6daa\u9675\u533a",
                    3: "\u6e1d\u4e2d\u533a",
                    4: "\u5927\u6e21\u53e3\u533a",
                    5: "\u6c5f\u5317\u533a",
                    6: "\u6c99\u576a\u575d\u533a",
                    7: "\u4e5d\u9f99\u5761\u533a",
                    8: "\u5357\u5cb8\u533a",
                    9: "\u5317\u789a\u533a",
                    10: "\u4e07\u76db\u533a",
                    11: "\u53cc\u6865\u533a",
                    12: "\u6e1d\u5317\u533a",
                    13: "\u5df4\u5357\u533a",
                    14: "\u9ed4\u6c5f\u533a",
                    15: "\u957f\u5bff\u533a",
                    16: "\u7da6\u6c5f\u53bf",
                    17: "\u6f7c\u5357\u53bf",
                    18: "\u94dc\u6881\u53bf",
                    19: "\u5927\u8db3\u53bf",
                    20: "\u8363\u660c\u53bf",
                    21: "\u74a7\u5c71\u53bf",
                    22: "\u6881\u5e73\u53bf",
                    23: "\u57ce\u53e3\u53bf",
                    24: "\u4e30\u90fd\u53bf",
                    25: "\u57ab\u6c5f\u53bf",
                    26: "\u6b66\u9686\u53bf",
                    27: "\u5fe0\u53bf",
                    28: "\u5f00\u53bf",
                    29: "\u4e91\u9633\u53bf",
                    30: "\u5949\u8282\u53bf",
                    31: "\u5deb\u5c71\u53bf",
                    32: "\u5deb\u6eaa\u53bf",
                    33: "\u77f3\u67f1\u53bf",
                    34: "\u79c0\u5c71\u53bf",
                    35: "\u9149\u9633\u53bf",
                    36: "\u5f6d\u6c34\u53bf",
                    37: "\u6c5f\u6d25\u5e02",
                    38: "\u5408\u5ddd\u5e02",
                    39: "\u6c38\u5ddd\u5e02",
                    40: "\u5357\u5ddd\u5e02"
                },
                5: {
                    1: "\u676d\u5dde",
                    2: "\u5b81\u6ce2",
                    3: "\u6e29\u5dde",
                    4: "\u5609\u5174",
                    5: "\u6e56\u5dde",
                    6: "\u7ecd\u5174",
                    7: "\u91d1\u534e",
                    8: "\u8862\u5dde",
                    9: "\u821f\u5c71",
                    10: "\u53f0\u5dde",
                    11: "\u4e3d\u6c34"
                },
                6: {
                    1: "\u5357\u4eac",
                    2: "\u65e0\u9521",
                    3: "\u5f90\u5dde",
                    4: "\u5e38\u5dde",
                    5: "\u82cf\u5dde",
                    6: "\u5357\u901a",
                    7: "\u8fde\u4e91\u6e2f",
                    8: "\u6dee\u5b89",
                    9: "\u76d0\u57ce",
                    10: "\u626c\u5dde",
                    11: "\u9547\u6c5f",
                    12: "\u6cf0\u5dde",
                    13: "\u5bbf\u8fc1"
                },
                7: {
                    1: "\u5e7f\u5dde",
                    2: "\u97f6\u5173",
                    3: "\u6df1\u5733",
                    4: "\u73e0\u6d77",
                    5: "\u6c55\u5934",
                    6: "\u4f5b\u5c71",
                    7: "\u6c5f\u95e8",
                    8: "\u6e5b\u6c5f",
                    9: "\u8302\u540d",
                    10: "\u8087\u5e86",
                    11: "\u60e0\u5dde",
                    12: "\u6885\u5dde",
                    13: "\u6c55\u5c3e",
                    14: "\u6cb3\u6e90",
                    15: "\u9633\u6c5f",
                    16: "\u6e05\u8fdc",
                    17: "\u4e1c\u839e",
                    18: "\u4e2d\u5c71",
                    19: "\u6f6e\u5dde",
                    20: "\u63ed\u9633",
                    21: "\u4e91\u6d6e"
                },
                8: {
                    1: "\u798f\u5dde",
                    2: "\u53a6\u95e8",
                    3: "\u8386\u7530",
                    4: "\u4e09\u660e",
                    5: "\u6cc9\u5dde",
                    6: "\u6f33\u5dde",
                    7: "\u5357\u5e73",
                    8: "\u9f99\u5ca9",
                    9: "\u5b81\u5fb7"
                },
                9: {
                    1: "\u957f\u6c99",
                    2: "\u682a\u6d32",
                    3: "\u6e58\u6f6d",
                    4: "\u8861\u9633",
                    5: "\u90b5\u9633",
                    6: "\u5cb3\u9633",
                    7: "\u5e38\u5fb7",
                    8: "\u5f20\u5bb6\u754c",
                    9: "\u76ca\u9633",
                    10: "\u90f4\u5dde",
                    11: "\u6c38\u5dde",
                    12: "\u6000\u5316",
                    13: "\u5a04\u5e95",
                    14: "\u6e58\u897f"
                },
                10: {
                    1: "\u6b66\u6c49",
                    2: "\u9ec4\u77f3",
                    3: "\u5341\u5830",
                    4: "\u5b9c\u660c",
                    5: "\u8944\u6a0a",
                    6: "\u9102\u5dde",
                    7: "\u8346\u95e8",
                    8: "\u5b5d\u611f",
                    9: "\u8346\u5dde",
                    10: "\u9ec4\u5188",
                    11: "\u54b8\u5b81",
                    12: "\u968f\u5dde",
                    13: "\u6069\u65bd",
                    14: "\u4ed9\u6843",
                    15: "\u6f5c\u6c5f",
                    16: "\u5929\u95e8",
                    17: "\u795e\u519c\u67b6"
                },
                11: {
                    1: "\u6c88\u9633",
                    2: "\u5927\u8fde",
                    3: "\u978d\u5c71",
                    4: "\u629a\u987a",
                    5: "\u672c\u6eaa",
                    6: "\u4e39\u4e1c",
                    7: "\u9526\u5dde",
                    8: "\u8425\u53e3",
                    9: "\u961c\u65b0",
                    10: "\u8fbd\u9633",
                    11: "\u76d8\u9526",
                    12: "\u94c1\u5cad",
                    13: "\u671d\u9633",
                    14: "\u846b\u82a6\u5c9b"
                },
                12: {
                    1: "\u957f\u6625",
                    2: "\u5409\u6797",
                    3: "\u56db\u5e73",
                    4: "\u8fbd\u6e90",
                    5: "\u901a\u5316",
                    6: "\u767d\u5c71",
                    7: "\u677e\u539f",
                    8: "\u767d\u57ce",
                    9: "\u5ef6\u8fb9"
                },
                13: {
                    1: "\u54c8\u5c14\u6ee8",
                    2: "\u9f50\u9f50\u54c8\u5c14",
                    3: "\u9e21\u897f",
                    4: "\u9e64\u5c97",
                    5: "\u53cc\u9e2d\u5c71",
                    6: "\u5927\u5e86",
                    7: "\u4f0a\u6625",
                    8: "\u4f73\u6728\u65af",
                    9: "\u4e03\u53f0\u6cb3",
                    10: "\u7261\u4e39\u6c5f",
                    11: "\u9ed1\u6cb3",
                    12: "\u7ee5\u5316",
                    13: "\u5927\u5174\u5b89\u5cad"
                },
                14: {
                    1: "\u77f3\u5bb6\u5e84",
                    2: "\u5510\u5c71",
                    3: "\u79e6\u7687\u5c9b",
                    4: "\u90af\u90f8",
                    5: "\u90a2\u53f0",
                    6: "\u4fdd\u5b9a",
                    7: "\u5f20\u5bb6\u53e3",
                    8: "\u627f\u5fb7",
                    9: "\u6ca7\u5dde",
                    10: "\u5eca\u574a",
                    11: "\u8861\u6c34"
                },
                15: {
                    1: "\u90d1\u5dde",
                    2: "\u5f00\u5c01",
                    3: "\u6d1b\u9633",
                    4: "\u5e73\u9876\u5c71",
                    5: "\u5b89\u9633",
                    6: "\u9e64\u58c1",
                    7: "\u65b0\u4e61",
                    8: "\u7126\u4f5c",
                    9: "\u6fee\u9633",
                    10: "\u8bb8\u660c",
                    11: "\u6f2f\u6cb3",
                    12: "\u4e09\u95e8\u5ce1",
                    13: "\u5357\u9633",
                    14: "\u5546\u4e18",
                    15: "\u4fe1\u9633",
                    16: "\u5468\u53e3",
                    17: "\u9a7b\u9a6c\u5e97",
                    18: "\u6d4e\u6e90"
                },
                16: {
                    1: "\u6d4e\u5357",
                    2: "\u9752\u5c9b",
                    3: "\u6dc4\u535a",
                    4: "\u67a3\u5e84",
                    5: "\u4e1c\u8425",
                    6: "\u70df\u53f0",
                    7: "\u6f4d\u574a",
                    8: "\u6d4e\u5b81",
                    9: "\u6cf0\u5b89",
                    10: "\u5a01\u6d77",
                    11: "\u65e5\u7167",
                    12: "\u83b1\u829c",
                    13: "\u4e34\u6c82",
                    14: "\u5fb7\u5dde",
                    15: "\u804a\u57ce",
                    16: "\u6ee8\u5dde",
                    17: "\u83cf\u6cfd"
                },
                17: {
                    1: "\u897f\u5b89",
                    2: "\u94dc\u5ddd",
                    3: "\u5b9d\u9e21",
                    4: "\u54b8\u9633",
                    5: "\u6e2d\u5357",
                    6: "\u5ef6\u5b89",
                    7: "\u6c49\u4e2d",
                    8: "\u6986\u6797",
                    9: "\u5b89\u5eb7",
                    10: "\u5546\u6d1b"
                },
                18: {
                    1: "\u5170\u5dde",
                    2: "\u5609\u5cea\u5173",
                    3: "\u91d1\u660c",
                    4: "\u767d\u94f6",
                    5: "\u5929\u6c34",
                    6: "\u6b66\u5a01",
                    7: "\u5f20\u6396",
                    8: "\u5e73\u51c9",
                    9: "\u9152\u6cc9",
                    10: "\u5e86\u9633",
                    11: "\u5b9a\u897f",
                    12: "\u9647\u5357",
                    13: "\u4e34\u590f",
                    14: "\u7518\u5357"
                },
                19: {
                    1: "\u897f\u5b81",
                    2: "\u6d77\u4e1c",
                    3: "\u6d77\u5317",
                    4: "\u9ec4\u5357",
                    5: "\u6d77\u5357",
                    6: "\u679c\u6d1b",
                    7: "\u7389\u6811",
                    8: "\u6d77\u897f"
                },
                20: {
                    1: "\u4e4c\u9c81\u6728\u9f50",
                    2: "\u514b\u62c9\u739b\u4f9d",
                    3: "\u5410\u9c81\u756a",
                    4: "\u54c8\u5bc6",
                    5: "\u660c\u5409",
                    6: "\u535a\u5c14\u5854\u62c9",
                    7: "\u5df4\u97f3\u90ed\u695e",
                    8: "\u963f\u514b\u82cf",
                    9: "\u514b\u5b5c\u52d2\u82cf",
                    10: "\u5580\u4ec0",
                    11: "\u548c\u7530",
                    12: "\u4f0a\u7281",
                    13: "\u5854\u57ce",
                    14: "\u963f\u52d2\u6cf0",
                    15: "\u77f3\u6cb3\u5b50",
                    16: "\u963f\u62c9\u5c14",
                    17: "\u56fe\u6728\u8212\u514b",
                    18: "\u4e94\u5bb6\u6e20"
                },
                21: {
                    1: "\u592a\u539f",
                    2: "\u5927\u540c",
                    3: "\u9633\u6cc9",
                    4: "\u957f\u6cbb",
                    5: "\u664b\u57ce",
                    6: "\u6714\u5dde",
                    7: "\u664b\u4e2d",
                    8: "\u8fd0\u57ce",
                    9: "\u5ffb\u5dde",
                    10: "\u4e34\u6c7e",
                    11: "\u5415\u6881"
                },
                22: {
                    1: "\u6210\u90fd",
                    2: "\u81ea\u8d21",
                    3: "\u6500\u679d\u82b1",
                    4: "\u6cf8\u5dde",
                    5: "\u5fb7\u9633",
                    6: "\u7ef5\u9633",
                    7: "\u5e7f\u5143",
                    8: "\u9042\u5b81",
                    9: "\u5185\u6c5f",
                    10: "\u4e50\u5c71",
                    11: "\u5357\u5145",
                    12: "\u7709\u5c71",
                    13: "\u5b9c\u5bbe",
                    14: "\u5e7f\u5b89",
                    15: "\u8fbe\u5dde",
                    16: "\u96c5\u5b89",
                    17: "\u5df4\u4e2d",
                    18: "\u8d44\u9633",
                    19: "\u963f\u575d",
                    20: "\u7518\u5b5c",
                    21: "\u51c9\u5c71"
                },
                23: {
                    1: "\u8d35\u9633",
                    2: "\u516d\u76d8\u6c34",
                    3: "\u9075\u4e49",
                    4: "\u5b89\u987a",
                    5: "\u94dc\u4ec1",
                    6: "\u9ed4\u897f\u5357",
                    7: "\u6bd5\u8282",
                    8: "\u9ed4\u4e1c\u5357",
                    9: "\u9ed4\u5357"
                },
                24: {
                    1: "\u5408\u80a5",
                    2: "\u829c\u6e56",
                    3: "\u868c\u57e0",
                    4: "\u6dee\u5357",
                    5: "\u9a6c\u978d\u5c71",
                    6: "\u6dee\u5317",
                    7: "\u94dc\u9675",
                    8: "\u5b89\u5e86",
                    9: "\u9ec4\u5c71",
                    10: "\u6ec1\u5dde",
                    11: "\u961c\u9633",
                    12: "\u5bbf\u5dde",
                    13: "\u5de2\u6e56",
                    14: "\u516d\u5b89",
                    15: "\u4eb3\u5dde",
                    16: "\u6c60\u5dde",
                    17: "\u5ba3\u57ce"
                },
                25: {
                    1: "\u5357\u660c",
                    2: "\u666f\u5fb7\u9547",
                    3: "\u840d\u4e61",
                    4: "\u4e5d\u6c5f",
                    5: "\u65b0\u4f59",
                    6: "\u9e70\u6f6d",
                    7: "\u8d63\u5dde",
                    8: "\u5409\u5b89",
                    9: "\u5b9c\u6625",
                    10: "\u629a\u5dde",
                    11: "\u4e0a\u9976"
                },
                26: {
                    1: "\u6606\u660e",
                    2: "\u66f2\u9756",
                    3: "\u7389\u6eaa",
                    4: "\u4fdd\u5c71",
                    5: "\u662d\u901a",
                    6: "\u4e3d\u6c5f",
                    7: "\u666e\u6d31",
                    8: "\u4e34\u6ca7",
                    9: "\u695a\u96c4",
                    10: "\u7ea2\u6cb3",
                    11: "\u6587\u5c71",
                    12: "\u897f\u53cc\u7248\u7eb3",
                    13: "\u5927\u7406",
                    14: "\u5fb7\u5b8f",
                    15: "\u6012\u6c5f",
                    16: "\u8fea\u5e86"
                },
                27: {
                    1: "\u547c\u548c\u6d69\u7279",
                    2: "\u5305\u5934",
                    3: "\u4e4c\u6d77",
                    4: "\u8d64\u5cf0",
                    5: "\u901a\u8fbd",
                    6: "\u9102\u5c14\u591a\u65af",
                    7: "\u547c\u4f26\u8d1d\u5c14",
                    8: "\u5df4\u5f66\u6dd6\u5c14",
                    9: "\u4e4c\u5170\u5bdf\u5e03\u76df",
                    10: "\u5174\u5b89\u76df",
                    11: "\u9521\u6797\u90ed\u52d2\u76df",
                    12: "\u963f\u62c9\u5584\u76df"
                },
                28: {
                    1: "\u5357\u5b81",
                    2: "\u67f3\u5dde",
                    3: "\u6842\u6797",
                    4: "\u68a7\u5dde",
                    5: "\u5317\u6d77",
                    6: "\u9632\u57ce\u6e2f",
                    7: "\u94a6\u5dde",
                    8: "\u8d35\u6e2f",
                    9: "\u7389\u6797",
                    10: "\u767e\u8272",
                    11: "\u8d3a\u5dde",
                    12: "\u6cb3\u6c60",
                    13: "\u6765\u5bbe",
                    14: "\u5d07\u5de6"
                },
                29: {
                    1: "\u62c9\u8428",
                    2: "\u660c\u90fd",
                    3: "\u5c71\u5357",
                    4: "\u65e5\u5580\u5219",
                    5: "\u90a3\u66f2",
                    6: "\u963f\u91cc",
                    7: "\u6797\u829d"
                },
                30: {
                    1: "\u94f6\u5ddd",
                    2: "\u77f3\u5634\u5c71",
                    3: "\u5434\u5fe0",
                    4: "\u56fa\u539f",
                    5: "\u4e2d\u536b"
                },
                31: {
                    1: "\u6d77\u53e3",
                    2: "\u4e09\u4e9a",
                    3: "\u4e94\u6307\u5c71",
                    4: "\u743c\u6d77",
                    5: "\u510b\u5dde",
                    6: "\u6587\u660c",
                    7: "\u4e07\u5b81",
                    8: "\u4e1c\u65b9",
                    9: "\u5b9a\u5b89",
                    10: "\u5c6f\u660c",
                    11: "\u6f84\u8fc8",
                    12: "\u4e34\u9ad8",
                    13: "\u767d\u6c99",
                    14: "\u660c\u6c5f",
                    15: "\u4e50\u4e1c",
                    16: "\u9675\u6c34",
                    17: "\u4fdd\u4ead",
                    18: "\u743c\u4e2d",
                    19: "\u897f\u6c99\u7fa4\u5c9b",
                    20: "\u5357\u6c99\u7fa4\u5c9b",
                    21: "\u4e2d\u6c99\u7fa4\u5c9b"
                },
                32: {
                    1: "\u4e2d\u897f\u533a",
                    2: "\u4e1c\u533a",
                    3: "\u4e5d\u9f99\u57ce\u533a",
                    4: "\u89c2\u5858\u533a",
                    5: "\u5357\u533a",
                    6: "\u6df1\u6c34\u57d7\u533a",
                    7: "\u9ec4\u5927\u4ed9\u533a",
                    8: "\u6e7e\u4ed4\u533a",
                    9: "\u6cb9\u5c16\u65fa\u533a",
                    10: "\u79bb\u5c9b\u533a",
                    11: "\u8475\u9752\u533a",
                    12: "\u5317\u533a",
                    13: "\u897f\u8d21\u533a",
                    14: "\u6c99\u7530\u533a",
                    15: "\u5c6f\u95e8\u533a",
                    16: "\u5927\u57d4\u533a",
                    17: "\u8343\u6e7e\u533a",
                    18: "\u5143\u6717\u533a"
                },
                33: {1: "\u6fb3\u95e8"},
                34: {
                    1: "\u53f0\u5317\u5e02",
                    2: "\u9ad8\u96c4\u5e02",
                    3: "\u57fa\u9686\u5e02",
                    4: "\u53f0\u4e2d\u5e02",
                    5: "\u53f0\u5357\u5e02",
                    6: "\u65b0\u7af9\u5e02",
                    7: "\u5609\u4e49\u5e02",
                    9: "\u53f0\u5317\u53bf",
                    10: "\u5b9c\u5170\u53bf",
                    11: "\u6843\u56ed\u53bf",
                    12: "\u65b0\u7af9\u53bf",
                    13: "\u82d7\u6817\u53bf",
                    14: "\u53f0\u4e2d\u53bf",
                    15: "\u5f70\u5316\u53bf",
                    16: "\u5357\u6295\u53bf",
                    17: "\u4e91\u6797\u53bf",
                    18: "\u5609\u4e49\u53bf",
                    19: "\u53f0\u5357\u53bf",
                    20: "\u9ad8\u96c4\u53bf",
                    21: "\u5c4f\u4e1c\u53bf",
                    22: "\u6f8e\u6e56\u53bf",
                    23: "\u53f0\u4e1c\u53bf",
                    24: "\u82b1\u83b2\u53bf"
                },
                35: {
                    1: "\u7f8e\u56fd",
                    2: "\u52a0\u62ff\u5927",
                    3: "\u6fb3\u5927\u5229\u4e9a",
                    4: "\u65b0\u897f\u5170",
                    5: "\u82f1\u56fd",
                    6: "\u6cd5\u56fd",
                    7: "\u5fb7\u56fd",
                    8: "\u6377\u514b",
                    9: "\u8377\u5170",
                    10: "\u745e\u58eb",
                    11: "\u5e0c\u814a",
                    12: "\u632a\u5a01",
                    13: "\u745e\u5178",
                    14: "\u4e39\u9ea6",
                    15: "\u82ac\u5170",
                    16: "\u7231\u5c14\u5170",
                    17: "\u5965\u5730\u5229",
                    18: "\u610f\u5927\u5229",
                    19: "\u4e4c\u514b\u5170",
                    20: "\u4fc4\u7f57\u65af",
                    21: "\u897f\u73ed\u7259",
                    22: "\u97e9\u56fd",
                    23: "\u65b0\u52a0\u5761",
                    24: "\u9a6c\u6765\u897f\u4e9a",
                    25: "\u5370\u5ea6",
                    26: "\u6cf0\u56fd",
                    27: "\u65e5\u672c",
                    28: "\u5df4\u897f",
                    29: "\u963f\u6839\u5ef7",
                    30: "\u5357\u975e",
                    31: "\u57c3\u53ca"
                },
                36: {1: "\u5176\u4ed6\u5730\u533a"}
            }
        },
        mobileNation: {
            "0086": "\u4e2d\u56fd\u5927\u9646+86",
            "00852": "\u4e2d\u56fd\u9999\u6e2f+852",
            "00853": "\u4e2d\u56fd\u6fb3\u95e8+853",
            "00886": "\u4e2d\u56fd\u53f0\u6e7e+886",
            "001": "\u7f8e\u56fd/\u52a0\u62ff\u5927+1",
            "0060": "\u9a6c\u6765\u897f\u4e9a+60",
            "0061": "\u6fb3\u5927\u5229\u4e9a+61",
            "0081": "\u65e5\u672c+81",
            "0082": "\u97e9\u56fd+82",
            "0065": "\u65b0\u52a0\u5761+65",
            "0044": "\u82f1\u56fd+44",
            "0033": "\u6cd5\u56fd+33",
            "007": "\u4fc4\u7f57\u65af+7",
            "0066": "\u6cf0\u56fd+66",
            "0049": "\u5fb7\u56fd+49",
            "0064": "\u65b0\u897f\u5170+64",
            "0091": "\u5370\u5ea6+91"
        }
    };
    return e
});
define("lib/swfobject", function (a, b, c) {
    function Y(a) {
        var b = /[\\\"<>\.;]/, c = b.exec(a) != null;
        return c && typeof encodeURIComponent != d ? encodeURIComponent(a) : a
    }

    function X(a, b) {
        if (!!A) {
            var c = b ? "visible" : "hidden";
            w && S(a) ? S(a).style.visibility = c : W("#" + a, "visibility:" + c)
        }
    }

    function W(a, b, c, f) {
        if (!B.ie || !B.mac) {
            var g = l.getElementsByTagName("head")[0];
            if (!g)return;
            var h = c && typeof c == "string" ? c : "screen";
            f && (y = null, z = null);
            if (!y || z != h) {
                var i = T("style");
                i.setAttribute("type", "text/css"), i.setAttribute("media", h), y = g.appendChild(i), B.ie && B.win && typeof l.styleSheets != d && l.styleSheets.length > 0 && (y = l.styleSheets[l.styleSheets.length - 1]), z = h
            }
            B.ie && B.win ? y && typeof y.addRule == e && y.addRule(a, b) : y && typeof l.createTextNode != d && y.appendChild(l.createTextNode(a + " {" + b + "}"))
        }
    }

    function V(a) {
        var b = B.pv, c = a.split(".");
        c[0] = parseInt(c[0], 10), c[1] = parseInt(c[1], 10) || 0, c[2] = parseInt(c[2], 10) || 0;
        return b[0] > c[0] || b[0] == c[0] && b[1] > c[1] || b[0] == c[0] && b[1] == c[1] && b[2] >= c[2] ? !0 : !1
    }

    function U(a, b, c) {
        a.attachEvent(b, c), r[r.length] = [a, b, c]
    }

    function T(a) {
        return l.createElement(a)
    }

    function S(a) {
        var b = null;
        try {
            b = l.getElementById(a)
        } catch (c) {
        }
        return b
    }

    function R(a) {
        var b = S(a);
        if (b) {
            for (var c in b)typeof b[c] == "function" && (b[c] = null);
            b.parentNode.removeChild(b)
        }
    }

    function Q(a) {
        var b = S(a);
        b && b.nodeName == "OBJECT" && (B.ie && B.win ? (b.style.display = "none", function () {
            b.readyState == 4 ? R(a) : setTimeout(arguments.callee, 10)
        }()) : b.parentNode.removeChild(b))
    }

    function P(a, b, c) {
        var d = T("param");
        d.setAttribute("name", b), d.setAttribute("value", c), a.appendChild(d)
    }

    function O(a, b, c) {
        var f, g = S(c);
        if (B.wk && B.wk < 312)return f;
        if (g) {
            typeof a.id == d && (a.id = c);
            if (B.ie && B.win) {
                var i = "";
                for (var j in a)a[j] != Object.prototype[j] && (j.toLowerCase() == "data" ? b.movie = a[j] : j.toLowerCase() == "styleclass" ? i += ' class="' + a[j] + '"' : j.toLowerCase() != "classid" && (i += " " + j + '="' + a[j] + '"'));
                var k = "";
                for (var l in b)b[l] != Object.prototype[l] && (k += '<param name="' + l + '" value="' + b[l] + '" />');
                g.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + i + ">" + k + "</object>", q[q.length] = a.id, f = S(a.id)
            } else {
                var m = T(e);
                m.setAttribute("type", h);
                for (var n in a)a[n] != Object.prototype[n] && (n.toLowerCase() == "styleclass" ? m.setAttribute("class", a[n]) : n.toLowerCase() != "classid" && m.setAttribute(n, a[n]));
                for (var o in b)b[o] != Object.prototype[o] && o.toLowerCase() != "movie" && P(m, o, b[o]);
                g.parentNode.replaceChild(m, g), f = m
            }
        }
        return f
    }

    function N(a) {
        var b = T("div");
        if (B.win && B.ie)b.innerHTML = a.innerHTML; else {
            var c = a.getElementsByTagName(e)[0];
            if (c) {
                var d = c.childNodes;
                if (d) {
                    var f = d.length;
                    for (var g = 0; g < f; g++)(d[g].nodeType != 1 || d[g].nodeName != "PARAM") && d[g].nodeType != 8 && b.appendChild(d[g].cloneNode(!0))
                }
            }
        }
        return b
    }

    function M(a) {
        if (B.ie && B.win && a.readyState != 4) {
            var b = T("div");
            a.parentNode.insertBefore(b, a), b.parentNode.replaceChild(N(a), b), a.style.display = "none", function () {
                a.readyState == 4 ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
            }()
        } else a.parentNode.replaceChild(N(a), a)
    }

    function L(a, b, c, e) {
        x = !0, u = e || null, v = {success: !1, id: c};
        var f = S(c);
        if (f) {
            f.nodeName == "OBJECT" ? (s = N(f), t = null) : (s = f, t = c), a.id = i;
            if (typeof a.width == d || !/%$/.test(a.width) && parseInt(a.width, 10) < 310)a.width = "310";
            if (typeof a.height == d || !/%$/.test(a.height) && parseInt(a.height, 10) < 137)a.height = "137";
            l.title = l.title.slice(0, 47) + " - Flash Player Installation";
            var g = B.ie && B.win ? "ActiveX" : "PlugIn", h = "MMredirectURL=" + k.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + g + "&MMdoctitle=" + l.title;
            typeof b.flashvars != d ? b.flashvars += "&" + h : b.flashvars = h;
            if (B.ie && B.win && f.readyState != 4) {
                var j = T("div");
                c += "SWFObjectNew", j.setAttribute("id", c), f.parentNode.insertBefore(j, f), f.style.display = "none", function () {
                    f.readyState == 4 ? f.parentNode.removeChild(f) : setTimeout(arguments.callee, 10)
                }()
            }
            O(a, b, c)
        }
    }

    function K() {
        return !x && V("6.0.65") && (B.win || B.mac) && !(B.wk && B.wk < 312)
    }

    function J(a) {
        var b = null, c = S(a);
        if (c && c.nodeName == "OBJECT")if (typeof c.SetVariable != d)b = c; else {
            var f = c.getElementsByTagName(e)[0];
            f && (b = f)
        }
        return b
    }

    function I() {
        var a = p.length;
        if (a > 0)for (var b = 0; b < a; b++) {
            var c = p[b].id, e = p[b].callbackFn, f = {success: !1, id: c};
            if (B.pv[0] > 0) {
                var g = S(c);
                if (g)if (V(p[b].swfVersion) && !(B.wk && B.wk < 312))X(c, !0), e && (f.success = !0, f.ref = J(c), e(f)); else if (p[b].expressInstall && K()) {
                    var h = {};
                    h.data = p[b].expressInstall, h.width = g.getAttribute("width") || "0", h.height = g.getAttribute("height") || "0", g.getAttribute("class") && (h.styleclass = g.getAttribute("class")), g.getAttribute("align") && (h.align = g.getAttribute("align"));
                    var i = {}, j = g.getElementsByTagName("param"), k = j.length;
                    for (var l = 0; l < k; l++)j[l].getAttribute("name").toLowerCase() != "movie" && (i[j[l].getAttribute("name")] = j[l].getAttribute("value"));
                    L(h, i, c, e)
                } else M(g), e && e(f)
            } else {
                X(c, !0);
                if (e) {
                    var m = J(c);
                    m && typeof m.SetVariable != d && (f.success = !0, f.ref = m), e(f)
                }
            }
        }
    }

    function H() {
        var a = l.getElementsByTagName("body")[0], b = T(e);
        b.setAttribute("type", h);
        var c = a.appendChild(b);
        if (c) {
            var f = 0;
            (function () {
                if (typeof c.GetVariable != d) {
                    var e = c.GetVariable("$version");
                    e && (e = e.split(" ")[1].split(","), B.pv = [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10)])
                } else if (f < 10) {
                    f++, setTimeout(arguments.callee, 10);
                    return
                }
                a.removeChild(b), c = null, I()
            })()
        } else I()
    }

    function G() {
        n ? H() : I()
    }

    function F(a) {
        if (typeof k.addEventListener != d)k.addEventListener("load", a, !1); else if (typeof l.addEventListener != d)l.addEventListener("load", a, !1); else if (typeof k.attachEvent != d)U(k, "onload", a); else if (typeof k.onload == "function") {
            var b = k.onload;
            k.onload = function () {
                b(), a()
            }
        } else k.onload = a
    }

    function E(a) {
        w ? a() : o[o.length] = a
    }

    function D() {
        if (!w) {
            try {
                var a = l.getElementsByTagName("body")[0].appendChild(T("span"));
                a.parentNode.removeChild(a)
            } catch (b) {
                return
            }
            w = !0;
            var c = o.length;
            for (var d = 0; d < c; d++)o[d]()
        }
    }

    var d = "undefined", e = "object", f = "Shockwave Flash", g = "ShockwaveFlash.ShockwaveFlash", h = "application/x-shockwave-flash", i = "SWFObjectExprInst", j = "onreadystatechange", k = window, l = document, m = navigator, n = !1, o = [G], p = [], q = [], r = [], s, t, u, v, w = !1, x = !1, y, z, A = !0, B = function () {
        var a = typeof l.getElementById != d && typeof l.getElementsByTagName != d && typeof l.createElement != d, b = m.userAgent.toLowerCase(), c = m.platform.toLowerCase(), i = c ? /win/.test(c) : /win/.test(b), j = c ? /mac/.test(c) : /mac/.test(b), o = /webkit/.test(b) ? parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1, p = !1, q = [0, 0, 0], r = null;
        if (typeof m.plugins != d && typeof m.plugins[f] == e)r = m.plugins[f].description, r && (typeof m.mimeTypes == d || !m.mimeTypes[h] || !!m.mimeTypes[h].enabledPlugin) && (n = !0, p = !1, r = r.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), q[0] = parseInt(r.replace(/^(.*)\..*$/, "$1"), 10), q[1] = parseInt(r.replace(/^.*\.(.*)\s.*$/, "$1"), 10), q[2] = /[a-zA-Z]/.test(r) ? parseInt(r.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0); else if (typeof k.ActiveXObject != d)try {
            var s = new ActiveXObject(g);
            s && (r = s.GetVariable("$version"), r && (p = !0, r = r.split(" ")[1].split(","), q = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10)]))
        } catch (t) {
        }
        return {w3: a, pv: q, wk: o, ie: p, win: i, mac: j}
    }(), C = function () {
        !B.w3 || ((typeof l.readyState != d && l.readyState == "complete" || typeof l.readyState == d && (l.getElementsByTagName("body")[0] || l.body)) && D(), w || (typeof l.addEventListener != d && l.addEventListener("DOMContentLoaded", D, !1), B.ie && B.win && (l.attachEvent(j, function () {
            l.readyState == "complete" && (l.detachEvent(j, arguments.callee), D())
        }), k == top && function () {
            if (!w) {
                try {
                    l.documentElement.doScroll("left")
                } catch (a) {
                    setTimeout(arguments.callee, 0);
                    return
                }
                D()
            }
        }()), B.wk && function () {
            if (!w) {
                if (!/loaded|complete/.test(l.readyState)) {
                    setTimeout(arguments.callee, 0);
                    return
                }
                D()
            }
        }(), F(D)))
    }(), Z = function () {
        B.ie && B.win && window.attachEvent("onunload", function () {
            var a = r.length;
            for (var b = 0; b < a; b++)r[b][0].detachEvent(r[b][1], r[b][2]);
            var c = q.length;
            for (var d = 0; d < c; d++)Q(q[d]);
            for (var e in B)B[e] = null;
            B = null;
            for (var f in $)$[f] = null;
            $ = null
        })
    }(), $ = {
        registerObject: function (a, b, c, d) {
            if (B.w3 && a && b) {
                var e = {};
                e.id = a, e.swfVersion = b, e.expressInstall = c, e.callbackFn = d, p[p.length] = e, X(a, !1)
            } else d && d({success: !1, id: a})
        }, getObjectById: function (a) {
            if (B.w3)return J(a)
        }, embedSWF: function (a, b, c, f, g, h, i, j, k, l) {
            var m = {success: !1, id: b};
            B.w3 && !(B.wk && B.wk < 312) && a && b && c && f && g ? (X(b, !1), E(function () {
                c += "", f += "";
                var n = {};
                if (k && typeof k === e)for (var o in k)n[o] = k[o];
                n.data = a, n.width = c, n.height = f;
                var p = {};
                if (j && typeof j === e)for (var q in j)p[q] = j[q];
                if (i && typeof i === e)for (var r in i)typeof p.flashvars != d ? p.flashvars += "&" + r + "=" + i[r] : p.flashvars = r + "=" + i[r];
                if (V(g)) {
                    var s = O(n, p, b);
                    n.id == b && X(b, !0), m.success = !0, m.ref = s
                } else {
                    if (h && K()) {
                        n.data = h, L(n, p, b, l);
                        return
                    }
                    X(b, !0)
                }
                l && l(m)
            })) : l && l(m)
        }, switchOffAutoHideShow: function () {
            A = !1
        }, ua: B, getFlashPlayerVersion: function () {
            return {major: B.pv[0], minor: B.pv[1], release: B.pv[2]}
        }, hasFlashPlayerVersion: V, createSWF: function (a, b, c) {
            return B.w3 ? O(a, b, c) : undefined
        }, showExpressInstall: function (a, b, c, d) {
            B.w3 && K() && L(a, b, c, d)
        }, removeSWF: function (a) {
            B.w3 && Q(a)
        }, createCSS: function (a, b, c, d) {
            B.w3 && W(a, b, c, d)
        }, addDomLoadEvent: E, addLoadEvent: F, getQueryParamValue: function (a) {
            var b = l.location.search || l.location.hash;
            if (b) {
                /\?/.test(b) && (b = b.split("?")[1]);
                if (a == null)return Y(b);
                var c = b.split("&");
                for (var d = 0; d < c.length; d++)if (c[d].substring(0, c[d].indexOf("=")) == a)return Y(c[d].substring(c[d].indexOf("=") + 1))
            }
            return ""
        }, expressInstallCallback: function () {
            if (x) {
                var a = S(i);
                a && s && (a.parentNode.replaceChild(s, a), t && (X(t, !0), B.ie && B.win && (s.style.display = "block")), u && u(v)), x = !1
            }
        }
    };
    return $
});
define("task/group/common", function (a, b, c) {
    a("task/user/setLoginUser"), a("task/user/setUserAccount"), a("task/widget/error"), a("task/widget/needLogin"), a("task/widget/logger"), a("task/widget/global"), a("task/widget/header"), a("task/widget/newCount"), a("task/widget/loginInform"), a("task/widget/scrollBar"), a("task/widget/feedback"), a("task/widget/toolBar"), a("task/widget/linkTarget")
});
define("task/user/setLoginUser", function (a, b, c) {
    var d = a("lib/jquery"), e = a("task/basic/Task"), f = a("model/UserData");
    (new e("setLoginUser", function () {
        var a = d("#data_loginUser"), b = d("#data_loginEmail");
        if (a.size() > 0) {
            var c = new f(d.parseJSON(a.html()));
            f.setLoginUser(c)
        } else b.size() > 0 && (f.passport = d.trim(b.text()), f.passport.match(/_qzone$/i) && (f.loginType = "qq"), f.passport.match(/_weibo$/i) && (f.loginType = "weibo"), f.passport.match(/_wx$/i) && (f.loginType = "weixin"));
        var e = d("#data_currentUser");
        e.size() > 0 && f.setCurrentUser(new f(d.parseJSON(e.html())))
    })).add()
});
define("model/UserData", function (a, b, c) {
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/Utils"), g = a("utils/widget/Counter"), h = a("utils/Cookie"), i = {}, j = {}, k = e.extend({
        init: function (a) {
            this.id = k.update(a)
        }, get: function () {
            return i[this.id]
        }, bindUpdate: function (a) {
            k.bindUpdate(this.id, a)
        }
    }), l = ["avatar"];
    k.update = function (a) {
        var b = a.id, c = [], e = i[b];
        if (e)for (var h = 0, j = l.length; h < j; h++) {
            var m = l[h];
            a[m] && e[m] && a[m] !== e[m] && c.push(m)
        }
        i[b] = d.extend(e, a);
        var n = i[b];
        if (!n._avatar && typeof a.avatar != "undefined" || d.inArray("avatar", c) !== -1)n._avatar = f.userAvatar(a.avatar, 70, a.sex);
        if (!n._province && typeof a.province != "undefined")try {
            n._province = f.selectValue("province", a.province)
        } catch (o) {
            throw"user" + a.id + "province data error!"
        }
        if (!n._city && typeof a.province != "undefined" && typeof a.city != "undefined")try {
            n._city = f.selectValue("city", a.province + "-" + a.city), n._cutCity = g.subString(n._city, 6), n._specialCity = f.specialCity(a.province, a.city), n._cutSpecialCity = g.subString(n._specialCity, 6)
        } catch (o) {
            throw"user" + a.id + "city data error!"
        }
        c.length > 0 && k.publishUpdate(b, c);
        return b
    }, k.bindUpdate = function (a, b) {
        var c = j[a] || [];
        c.push(b), j[a] = c
    }, k.publishUpdate = function (a, b) {
        var c = j[a];
        if (!!c)for (var d = 0, e = c.length; d < e; d++)c[d](k.get(a), b)
    }, k.get = function (a) {
        return i[a] || null
    }, k.loginUserId = null, k.loginUserIsVip = !1, k.loginUserIsNormalVip = !1, k.loginUserIsSuperVip = !1, k.getLoginUser = function () {
        if (k.loginUserId === null)return null;
        return k.get(k.loginUserId)
    }, k.setLoginUser = function (a) {
        if (a && a.id) {
            a.isLoginUser = !0, k.loginUserId = k.update(a);
            var b = k.getLoginUser();
            k.loginUserIsVip = b.isVip, k.loginUserIsNormalVip = b.isNormalVip, k.loginUserIsSuperVip = b.isSuperVip
        }
    }, k.setLoginUserVip = function () {
        k.update({id: k.loginUserId, isVip: !0, isNormalVip: !0}), k.loginUserIsVip = !0, k.loginUserIsNormalVip = !0
    }, k.setLoginUserSVip = function () {
        k.update({id: k.loginUserId, isVip: !0, isSuperVip: !0}), k.loginUserIsVip = !0, k.loginUserIsSuperVip = !0
    }, k.currentUserId = null, k.loginUserPage = !0, k.getCurrentUser = function () {
        if (k.currentUserId === null)return null;
        return k.get(k.currentUserId)
    }, k.setCurrentUser = function (a) {
        a && a.id && (k.currentUserId = k.update(a), a.id !== k.loginUserId && (k.loginUserPage = !1))
    }, k.isLoginUserPage = function () {
        if (k.currentUserId !== null && k.loginUserId !== k.currentUserId)return !1;
        return !0
    }, k.isInvalidAvatar = function () {
        var a = parseInt(k.getLoginUser().avatarType);
        return a === 2 || a === 3 ? !0 : !1
    }, k.isShowGuideUploadAvatar = function () {
        return k.isInvalidAvatar() && parseInt(h.get("invalidAvatar_upload")) !== 1
    };
    return k
});
define("utils/widget/Counter", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = {};
    e.charCount = function (a) {
        a = d.trim(a);
        return a.length
    }, e.transCharCount = function (a) {
        a = d.trim(a).replace(/\s+/g, "*");
        if (a.match(/^\s+$/))return 0;
        a = a.replace(/[\uFE30-\uFFA0\u2E80-\u9FFF\uac00-\ud7ff\u3000‘“”’]/g, "**");
        return a.length
    }, e.subString = function (a, b, c, f) {
        if (a) {
            var g = e.transCharCount(a), h = [], i = 0;
            if (f) {
                var j = d("<div></div>").html(a);
                a = j.text(), j = null
            }
            if (g <= b)return a;
            for (var k = 0; k < g; k++) {
                var l = a.charAt(k);
                /[^\x00-\xff]/.test(l) ? i += 2 : i += 1;
                if (i > b)break;
                h.push(l)
            }
            return c ? h.join("") + "..." : h.join("")
        }
        return ""
    };
    return e
});
define("utils/Cookie", function (a, b, c) {
    var d = a("lib/jquery"), e = {
        set: function (a, b, c) {
            var d = "";
            if (c) {
                var e = 0, f = new Date;
                c === "today" && (c = 1, e = f.getHours() * 3600 + f.getMinutes() * 60 + f.getSeconds()), f.setTime(f.getTime() + c * 24 * 60 * 60 * 1e3 - e * 1e3), d = "; expires=" + f.toGMTString()
            }
            document.cookie = a + "=" + b + d + "; path=/"
        }, get: function (a) {
            var b = a + "=", c = document.cookie.split(";");
            for (var d = 0; d < c.length; d++) {
                var e = c[d];
                while (e.charAt(0) === " ")e = e.substring(1, e.length);
                if (e.indexOf(b) === 0)return decodeURIComponent(e.substring(b.length, e.length))
            }
            return null
        }, del: function (a) {
            this.set(a, "", -1)
        }
    };
    return e
});
define("task/user/setUserAccount", function (a, b, c) {
    var d = a("lib/jquery"), e = a("task/basic/Task"), f = a("model/UserAccount");
    (new e("setUserAccount", function () {
        var a = d("#data_userAccount");
        if (a.size()) {
            var b = new f(d.parseJSON(a.html()));
            a.remove()
        }
    })).add()
});
define("model/UserAccount", function (a, b, c) {
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("model/UserData"), g = {}, h = {}, i = e.extend({
        init: function (a) {
            this.userId = i.update(a)
        }, get: function () {
            return g[this.userId]
        }
    }), j = ["totalBalance", "donatedBalance"];
    i.update = function (a) {
        var b = !1, c = a.userId, e = g[c];
        if (e !== undefined)for (var f = 0, h = j.length; f < h; f++) {
            var k = j[f];
            if (k in a && k in e && a[k] !== e[k]) {
                b = !0;
                break
            }
        }
        g[c] = d.extend(!0, e, a), b && i.publishUpdate(c);
        return c
    }, i.get = function (a) {
        return g[a]
    }, i.bindUpdate = function (a, b) {
        var c = h[a] || [];
        c.push(b), h[a] = c
    }, i.publishUpdate = function (a) {
        var b = h[a];
        if (b !== undefined)for (var c = 0, d = b.length; c < d; c++)b[c](i.get(a))
    };
    return i
});
define("task/widget/error", function (a, b, c) {
    "use strict";
    var d = a("task/basic/Task");
    (new d("ErrorManager", function () {
        var b = a("utils/error/ErrorManager");
        b.bindEvent()
    })).add()
});
define("utils/error/ErrorManager", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/box/floatBox/LoginBox"), f = a("widget/box/floatBox/PayLoginBox"), g = a("model/UserData"), h = a("widget/box/floatBox/SpamVerifyBox"), i = a("module/message/MessageAction"), j = a("widget/box/floatBox/ConfirmBox"), k = d(document.body), l = {
        networkErrorCount: 0,
        loginBox: null,
        bindEvent: function () {
            k.bind("error", d.proxy(this.handleError, this))
        },
        handleError: function (a, b, c) {
            if (b === "needLogin") {
                if (this.loginBox === null) {
                    var d = null;
                    g.passport && g.passport !== "" && (d = {
                        isLoginedUrs: !0,
                        loginPassport: g.passport,
                        loginType: g.loginType
                    }), this.loginBox = new e(null, {data: d || {}})
                }
                this.loginBox.show()
            } else if (b === "spamVerify") {
                var k = new h(null, {jqXHR: c});
                k.show()
            } else if (b === "spamBlocked") {
                var l = new j(null, {
                    title: "\u5e10\u53f7\u5f02\u5e38\u63d0\u793a",
                    data: {
                        type: "warning",
                        content: "\u60a8\u7684\u64cd\u4f5c\u8fc7\u4e8e\u9891\u7e41\u4e86\uff0c\u5e10\u53f7\u6682\u65f6\u88ab\u5c01\u7981\uff0c\u8bf7\u8054\u7cfb\u5c0f\u7ea2\u5a18\u89e3\u7981",
                        submitBtnText: "\u79c1\u4fe1\u5c0f\u7ea2\u5a18",
                        isHideCancel: !0
                    },
                    callBack: function (a, b) {
                        a.status === "ok" ? i.doMessageToAdmin(b) : b && (location.href = "/")
                    }
                });
                l.show()
            } else if (b === "spamNotice") {
                var m = c, l = new j(null, {
                    title: "\u9891\u7e41\u64cd\u4f5c\u63d0\u793a",
                    data: {
                        type: "warning",
                        content: '\u64cd\u4f5c\u8fc7\u4e8e\u9891\u7e41\uff0c\u8bf7\u7b49\u5f85<b class="text-red">10</b>\u79d2\u540e\u518d\u6b21\u63d0\u4ea4',
                        isHideCancel: !0
                    },
                    callBack: function (a, b) {
                        a.status === "ok" && m && m()
                    }
                });
                l.show()
            } else if (b === "payLoginAgain") {
                var d = {
                    isDisableCookieUserName: !0,
                    isLoginedUrs: !1,
                    loginPassport: c.session.sess_type === 1 ? c.session.sess_email : "",
                    loginType: c.session.sess_type
                }, n = new f(null, {data: d || {}});
                n.show(c.callback)
            }
        }
    };
    return l
});
define("widget/box/floatBox/LoginBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/URS"), g = a("utils/tmpl"), h = a("utils/Utils"), i = e.extend({
        defaults: {
            isLoginedUrs: !1,
            loginPassport: "",
            loginType: ""
        }, init: function (a, b) {
            this._super(a, b), this.data = d.extend({}, this.defaults, b.data)
        }, preRender: function () {
            return {
                title: "\u767b\u5f55\u82b1\u7530",
                bodyContent: g.formatTemplate(a("template/floatbox/loginBox"), d.extend({}, this.data))
            }
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-login"), this.$form = this.$elem.find(".js-form")
        }, show: function () {
            var a = this;
            this._super(), f.show(this.$form, function () {
                var b = a.$form.find("input[name=url]").val();
                b ? window.location.href = b : window.location.reload()
            })
        }, hide: function (a) {
            this._super(), f.hide(), a && this.config.callBack && this.config.callBack({status: "cancel"})
        }
    });
    return i
});
define("widget/box/floatBox/Box", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("utils/tmpl"), f = a("widget/box/Box"), g = a("utils/Utils"), h = a("utils/layer/MaskLayer"), i = d(window), j = d(document.body), k = f.extend({
        preRender: function () {
            return {}
        }, renderTmpl: function (b) {
            return d(e.formatTemplate(a("template/floatbox/basic"), b))
        }, postRender: function () {
            this.$mainElem = this.$elem.find(".js-main")
        }, show: function () {
            this._super(), this.$elem.css({visibility: "visible"});
            var a = {};
            this.config.maskzIndex && (a.zIndex = this.config.maskzIndex), this.maskLayer = new h, this.maskLayer.show(a), this.bindResize(), this.setPosition(), this.config.autoClose && (this.autoClose = g.autoClose.call(this, this.$elem, this.$elem))
        }, setPosition: function () {
            this.onVerticalMiddle(), this.onCenter()
        }, bindResize: function () {
            i.bind("resize", d.proxy(this.resizeHandler, this)), this.config.escDisable || j.bind("keydown", d.proxy(this.hideHandler, this))
        }, unbindResize: function () {
            i.unbind("resize", d.proxy(this.resizeHandler, this)), this.config.escDisable || j.unbind("keydown", d.proxy(this.hideHandler, this))
        }, resizeHandler: function () {
            this.setPosition()
        }, hideHandler: function (a) {
            a.which === 27 && this.hide()
        }, hide: function () {
            this._super(), this.maskLayer && this.maskLayer.hide(), this.unbindResize(), this.config.autoClose && j.unbind("click", this.autoClose)
        }, delayHide: function (a) {
            a = a || 2e3;
            var b = this;
            setTimeout(function () {
                b.hide()
            }, a)
        }
    });
    return k
});
typeof process != "undefined" && (process.title === "node" || process.title === "grunt") && (define = function (a) {
    exports.formatTemplate = a().formatTemplate, exports.replaceString = a().replaceString
}), define("utils/tmpl", function (a, b, c) {
    function o(a, b) {
        b = b || {};
        if (typeof a == "function")return a(b);
        var c = n(a, b);
        return c
    }

    function n(a, b) {
        var c = "", e = /^[a-zA-Z0-9\/]+?$/.test(a) ? d[a] = d[a] || n(document.getElementById("tmpl_" + a).innerHTML) : new Function("tmplData", "tmpl", m(a));
        if (b)try {
            return e(b, o)
        } catch (f) {
            typeof console !== undefined && console.error && console.error("error in templates ", a, ":", f, f.stack)
        }
        return e
    }

    function m(a) {
        return "var p=[];tmplData = tmplData || {}; with(tmplData){p.push('" + a.replace(f, "").replace(g, "").replace(e, " ").replace(h, ">$1<").split("<%").join("\t").replace(i, "$1\r").replace(j, "',$1,'").split("\t").join("');\n").split("%>").join("\np.push('").split("\r").join("\\'").replace(k, " ") + "');}return p.join('');"
    }

    function l() {
        var a = {};
        for (var b = 0; b < arguments.length; b++) {
            var c = arguments[b];
            if (c && typeof c == "object")for (var d in c)c[d] !== undefined && c.hasOwnProperty(d) && (a[d] = c[d])
        }
        return a
    }

    var d = {}, e = /[\r\t\n]/g, f = /^\s+/, g = /\s+$/, h = />\s*(.*?)\s*</g, i = /((^|%>)[^\t]*)'/g, j = /\t=(.*?)%>/g, k = /_SPACE_/g;
    return {formatTemplate: o, replaceString: m}
});
define("widget/box/Box", function (a, b, c) {
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/Utils"), g = d(window), h = e.extend({
        init: function (a, b) {
            this.$elem = null, this.config = b || {}, this.data = this.config.data || {}, this.isShow = !1, this.isBindEvent = !1
        }, render: function () {
            if (this.$elem === null) {
                var a = this.preRender(), b = d.extend({}, a, this.data);
                this.$elem = this.renderTmpl(b)
            }
            this.isBindEvent || (this.postRender(), this.bindEvent(), this.isBindEvent = !0);
            return this.$elem
        }, preRender: function () {
            return {}
        }, postRender: function () {
        }, renderTmpl: function () {
            throw new Error("abstract function!")
        }, bindEvent: function () {
            this.$elem.delegate(".close-trigger", "click", d.proxy(this.onClose, this))
        }, show: function () {
            this.render().appendTo("body").show(), this.isShow = !0
        }, onClose: function () {
            this.hide()
        }, hide: function () {
            this.$elem !== null && this.$elem.detach(), this.isShow = !1
        }, setPosition: function () {
        }, onTextTips: function (a, b, c) {
            f.textTips(a, b, c)
        }, onVerticalMiddle: function (a) {
            var b = f.isIe6 ? g.scrollTop() : 0, c = (g.height() - this.$mainElem.height()) / 2;
            c = Math.max(c, 0) + b, a ? this.$mainElem.stop().animate({
                top: c,
                duration: 500,
                easing: "easeInOutExpo"
            }) : this.$mainElem.css({top: c})
        }, onCenter: function () {
            var a = g.width() / 2 - this.$mainElem.width() / 2;
            a = Math.max(a, 0), this.$mainElem.css({left: a})
        }
    });
    return h
});
define("utils/layer/MaskLayer", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("widget/Module"), g = a("utils/Utils"), h = d(window), i = f.extend({
        defaults: {zIndex: 999},
        renderTmpl: function () {
            return d('<div class="masklayer"></div>')
        },
        postRender: function () {
            g.isIe6 && (this.$iframe = d('<iframe class="masklayer-iframe" scrolling="no" frameborder="0"></iframe>'))
        },
        show: function (a) {
            this.render(), this.config = d.extend({}, this.defaults, a), this.$elem.css("zIndex", this.config.zIndex).appendTo("body"), g.isIe6 && (this.$elem.css("position", "absolute"), this.$iframe.css("zIndex", this.config.zIndex - 1).appendTo("body")), this.resizeHandler(), this.bindResize()
        },
        hide: function () {
            this.$elem !== null && this.$elem.detach(), this.$iframe && this.$iframe.detach(), this.unbindResize()
        },
        bindResize: function () {
            this.bindResizeEvent = d.proxy(this.resizeHandler, this), h.bind("resize", this.bindResizeEvent), g.isIe6 && (this.bindScrollEvent = d.proxy(this.resizeHandler, this), h.bind("scroll", this.bindScrollEvent))
        },
        unbindResize: function () {
            h.unbind("resize", this.bindResizeEvent), g.isIe6 && h.unbind("scroll", this.bindScrollEvent)
        },
        resizeHandler: function () {
            var a = h.width(), b = h.height(), c = g.pageMaxHeight();
            this.$elem.css({width: a}), g.isIe6 ? (this.$elem.css({
                height: c,
                position: "absolute"
            }), this.$iframe.css({height: c, width: a})) : this.$elem.css({height: b})
        }
    });
    return i
});
define("widget/Module", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = e.extend({
        defaults: {}, init: function (a, b) {
            typeof a != "string" && (this.$elem = a), this.config = d.extend({}, this.defaults, b), this.data = this.config.data, this.isBindEvent = !1
        }, render: function () {
            if (!this.$elem) {
                var a = this.preRender(), b = d.extend(a, this.data);
                this.$elem = this.renderTmpl(b)
            }
            this.isBindEvent || (this.postRender(), this.bindEvent(), this.isBindEvent = !0);
            return this.$elem
        }, preRender: function () {
            return {}
        }, postRender: function () {
        }, renderTmpl: function (a) {
            throw"Abstract Method!!!"
        }, parseData: function (a) {
            return a
        }, bindEvent: function () {
            this.isBindEvent = !0
        }
    });
    return f
});
define("template/floatbox/basic", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer"><div class="poplayer-main js-main"><div class="poplayer-hd js-hd"><a class="icon-close close-trigger" title="\u5173\u95ed" href="javascript:;"></a><h3 class="js-title">', title, "</h3>"), typeof subtitle != "undefined" && subtitle && p.push('<span class="text-md poplayer-subtitle">', subtitle, "</span>"), p.push('</div><div class="js-body">', bodyContent, "</div></div></div>");
        return p.join("")
    }
});
define("utils/URS", function (a, b, c) {
    function k() {
        window.location.reload()
    }

    function j() {
        g || (i = d("<div id='login-urs-wrap' style='visibility:hidden'>"), e.append(i), g = new URS("", "", {
            skin: "1",
            isHttps: 1,
            product: "ht",
            promark: "EkJZIYd",
            host: "love.163.com",
            page: "login",
            single: 0,
            needUnLogin: 1,
            notFastReg: 0,
            needanimation: 0,
            includeBox: "login-urs-wrap",
            cssDomain: CONFIG._CDN_URL_ + "style/",
            cssFiles: "page/special/urs.css?v=" + +(new Date)
        }), g.closeIframe())
    }

    "use strict";
    var d = a("lib/jquery"), e = d(document.body), f = [], g, h, i;
    d(function () {
        jQuery.getScript("http://webzj.reg.163.com/webapp/javascript/message.js", function () {
            f.length && d.each(f, function (a, b) {
                b()
            }), f = []
        })
    });
    return {
        show: function (a, b) {
            var c = function () {
                var c = d(a).height();
                j(), i.css({
                    visibility: "visible",
                    width: d(a).width() + "px",
                    height: c ? c + "px" : "auto"
                }), g.logincb = b || k, g.regcb = k, g.showIframe({page: "login"}), d(a).append(i)
            };
            window.URS ? c() : f.push(c)
        }, hide: function () {
            var a = function () {
                j(), i.css({
                    visibility: "hidden",
                    width: 0,
                    height: 0
                }), i.insertBefore(e.children().first()), g.closeIframe()
            };
            window.URS ? a() : f.push(a)
        }
    }
});
define("template/floatbox/loginBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) {
            p.push('<div class="poplayer-bd">');
            if (isLoginedUrs) {
                p.push('<div class="poplayer-login-passport">');
                if (loginType) {
                    p.push("");
                    var loginSource = {qq: "\u817e\u8bafQQ", weibo: "\u65b0\u6d6a\u5fae\u535a", weixin: "\u5fae\u4fe1"};
                    p.push("<p>\u6b22\u8fce\u901a\u8fc7", loginSource[loginType], "\u767b\u5f55\u7f51\u6613\u82b1\u7530\uff0c\u60a8\u53ef\u4ee5\u65e0\u9700\u6ce8\u518c\u7f51\u6613\u90ae\u7bb1\u76f4\u63a5\u5f00\u901a\u82b1\u7530</p>")
                } else p.push('<p>\u60a8\u7684\u5e10\u53f7\uff1a<span class="text-red">', loginPassport, "</span></p><p>\u5f53\u524d\u5df2\u767b\u5f55\u7f51\u6613\u90ae\u7bb1\uff0c\u53ef\u4ee5\u76f4\u63a5\u5f00\u901a\u82b1\u7530</p>");
                p.push('<a class="btnM btn-red" '), CONFIG.isLoginBlank && p.push('target="_blank"'), p.push('href="/register">\u5feb\u901f\u5f00\u901a</a></div>')
            } else p.push('<form class="js-form poplayer-loginGroup" name="loginForm" action="https://reg.163.com/logins.jsp" method="POST" target="_self"><input type="hidden" name="url" value="', typeof callbackUrl != "undefined" ? callbackUrl : location.href, '"></form>');
            p.push('<div class="poplayer-login-other"><div class="poplayer-login-signup">'), isLoginedUrs ? (p.push('<p class="text-gray">\u5df2\u6709\u82b1\u7530\u5e10\u53f7\uff1f</p><a class="btn btn-gray" '), CONFIG.isLoginBlank && p.push('target="_blank"'), p.push('href="/logout">\u767b\u5f55</a>')) : (p.push('<p class="text-gray">\u6ca1\u6709\u82b1\u7530\u5e10\u53f7\uff1f</p><a class="btn btn-gray" '), CONFIG.isLoginBlank && p.push('target="_blank"'), p.push('href="/', require("template/widget/common/vendor")(), '">\u7acb\u5373\u6ce8\u518c</a>')), p.push("</div>");
            var baseURL = "http://reg.163.com/outerLogin/oauth2/connect.do?target=$TARGET$&product=ht&url=$URL$&url2=" + location.href + "&append=1", finalURL = "http://" + location.host + "/loginRedirect?targetUrl=" + location.href.replace("http://" + location.host, "");
            baseURL = typeof jointLoginCallback != "undefined" && jointLoginCallback ? baseURL.replace("$URL$", jointLoginCallback) : baseURL.replace("$URL$", finalURL);
            var weiboCallback = "/logout?url=" + encodeURIComponent(baseURL.replace("$TARGET$", 3)), qqCallback = "/logout?url=" + encodeURIComponent(baseURL.replace("$TARGET$", 1)), weixinCallback = "/logout?url=" + encodeURIComponent(baseURL.replace("$TARGET$", 13));
            p.push('<dl class="poplayer-login-joint"><dt class="text-gray">\u5176\u4ed6\u5e10\u53f7\u767b\u5f55</dt><dd><a class="poplayer-login-sina" '), CONFIG.isLoginBlank && p.push('target="_blank"'), p.push('href="', weiboCallback, '" title="\u4f7f\u7528\u65b0\u6d6a\u5fae\u535a\u5e10\u53f7\u767b\u5f55"><em class="icon-sina"></em><span>\u65b0\u6d6a\u5fae\u535a</span></a></dd><dd><a class="poplayer-login-qq" '), CONFIG.isLoginBlank && p.push('target="_blank"'), p.push('href="', qqCallback, '" title="\u4f7f\u7528QQ\u5e10\u53f7\u767b\u5f55"><em class="icon-qq"></em><span>QQ</span></a></dd></dl></div></div>')
        }
        return p.join("")
    }
});
define("template/widget/common/vendor", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push(""), typeof CONFIG != "undefined" && typeof CONFIG.vendor != "undefined" && CONFIG.vendor !== "" && p.push("?vendor=", CONFIG.vendor, ""), p.push("");
        return p.join("")
    }
});
define("widget/box/floatBox/PayLoginBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/URS"), g = a("utils/DataSource"), h = a("utils/Error"), i = a("utils/Log"), j = a("utils/tmpl"), k = a("utils/Utils"), l = e.extend({
        defaults: {
            isLoginedUrs: !1,
            loginPassport: "",
            loginType: ""
        }, init: function (a, b) {
            this._super(a, b), this.data = d.extend({}, this.defaults, b.data)
        }, preRender: function () {
            return {
                title: "\u4e3a\u4e86\u786e\u4fdd\u652f\u4ed8\u5b89\u5168\uff0c\u8bf7\u767b\u5f55\u82b1\u7530\u9a8c\u8bc1",
                bodyContent: j.formatTemplate(a("template/floatbox/loginBox"), d.extend({}, this.data))
            }
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-login"), this.$tips = this.$elem.find(".js-tips"), this.$form = this.$elem.find(".js-form")
        }, bindEvent: function () {
            this._super()
        }, show: function (a) {
            var b = this;
            this._super(), f.show(this.$form, function () {
                b.onSuccess()
            }), this.successCallBack = a
        }, onSuccess: function () {
            this.successCallBack && this.successCallBack(), this.hide()
        }, hide: function () {
            f.hide(), this._super()
        }
    });
    return l
});
define("utils/DataSource", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("model/UserData"), f = a("utils/Error"), g = a("data/RequestMap"), h = a("widget/box/floatBox/IntegrityTipsBox"), i = a("widget/box/floatBox/NeedVerifyBox"), j = a("widget/box/floatBox/NeedAvatarBox"), k = a("utils/Log"), l = d(document.body), m = {
        keyFrom: null,
        triggerElem: null,
        requestMap: g,
        parseArguments: function (a) {
            var b = a[0], c = this.requestMap[b];
            d.isPlainObject(c) && (this.debug && c.testUrl ? a[0] = c.testUrl : a[0] = c.url);
            return a
        },
        parseRequest: function (a, b) {
            var c = {}, f = b[0], g = this.requestMap[f], h = d.extend({}, g);
            h.login = h.login || !1, h.silent = h.silent || !1, h.redirect = h.redirect || !1;
            if (d.isPlainObject(g) && h.login && e.getLoginUser() === null)l.trigger("error", ["needLogin"]); else {
                b = m.parseArguments(b);
                try {
                    c = a.apply(null, b)
                } catch (i) {
                    return c
                }
                c.resend = function () {
                    b[0] = f, m.parseRequest(a, b)
                };
                var j = c.error;
                c.error = function (a) {
                    a && j.call(c, function (b) {
                        b.status !== 421 && a.apply(null, arguments)
                    });
                    return c
                };
                return h.silent ? this.bindError(c, h) : c
            }
        },
        get: function () {
            return this.parseRequest(d.get, arguments)
        },
        getJSON: function () {
            return this.parseRequest(d.getJSON, arguments)
        },
        ajax: function () {
            return this.parseRequest(d.ajax, arguments)
        },
        getScript: function () {
            return this.parseRequest(d.getScript, arguments)
        },
        post: function () {
            return this.parseRequest(d.post, arguments)
        },
        postJSON: function () {
            var a = arguments[0], b = arguments[arguments.length - 1], c = d("#data_" + a);
            if (c.size() > 0) {
                b(d.parseJSON(c.html())), c.remove();
                return null
            }
            return this.parseRequest(d.post, arguments)
        },
        bindError: function (a, b) {
            var c = this.triggerElem;
            this.triggerElem = null;
            return a.statusCode({
                521: d.proxy(function () {
                    this.userNoLogin(b.login)
                }, this), 547: d.proxy(function () {
                    this.needAvatar()
                }, this), 564: this.loginUserBlock, 565: d.proxy(function () {
                    this.targetUserBlock(c, b.redirect)
                }, this), 573: d.proxy(function () {
                    this.targetUserBlacked(c)
                }, this), 576: d.proxy(function () {
                    this.integrityError(c)
                }, this), 591: d.proxy(function () {
                    this.aboardNeedVerify(c)
                }, this), 592: d.proxy(function () {
                    this.needVerify()
                }, this), 426: d.proxy(function () {
                    this.spamVerify(a)
                }, this)
            })
        },
        throwNoFound: function () {
        },
        callError: function (a) {
            var b = d.parseJSON(a.responseText), c = parseInt(b.code);
            !b.code || c === 1
        },
        throwError: function () {
            l.trigger("error", ["network", {
                type: "error",
                text: "\u7f51\u7edc\u592a\u5fd9\u5566\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5:)"
            }])
        },
        throwSysError: function () {
            l.trigger("error", ["network", {type: "error", text: "\u670d\u52a1\u5668\u51fa\u73b0\u9519\u8bef\uff01"}])
        },
        setTrigger: function (a) {
            this.triggerElem = a;
            return this
        },
        userNoLogin: function (a) {
            a === !0 && (location.href = "/")
        },
        loginUserBlock: function () {
            location.href = "/error/block"
        },
        targetUserBlock: function (a, b) {
            b ? location.href = "/404" : a !== null && (a.data("userblock") === "refresh" ? location.reload() : f.showWinTipsBox("warning", f.Text(565), null, a))
        },
        targetUserBlacked: function (a) {
            a !== null && f.showWinTipsBox("warning", f.Text(573), null, a)
        },
        integrityError: function (a) {
            if (a !== null) {
                var b = "message";
                a.hasClass("mess-trigger") || (b = "QA");
                var c = new h(null, {tipsType: b});
                c.show(), k.doLog({parameter: {method: "limit"}, elem: a})
            }
        },
        aboardNeedVerify: function (a) {
            a !== null && f.showWinTipsBox("warning", f.Text(591), null, a)
        },
        needVerify: function () {
            var a = new i(null, {});
            a.show()
        },
        needAvatar: function () {
            var a = new j(null, {data: {content: "\u60a8\u9700\u8981\u5148\u6dfb\u52a0\u6e05\u6670\u7f8e\u89c2\u7684\u672c\u4eba\u8fd1\u7167\u624d\u80fd\u548c\u5bf9\u65b9\u4e92\u52a8\uff01"}});
            a.show()
        },
        spamVerify: function (a) {
            l.trigger("error", ["spamVerify", a])
        }
    };
    return m
});
define("utils/Error", function (a, b, c) {
    var d = a("lib/jquery"), e = a("widget/box/winBox/TipsBox").getInstance(), f = a("widget/box/floatBox/TipsBox"), g = {}, h = {
        425: ["\u60a8\u8bc4\u8bba\u7684\u592a\u9891\u7e41", ""],
        433: ["\u60a8\u53d1\u5e16\u592a\u9891\u7e41", ""],
        434: ["\u60a8\u4eca\u5929\u5df2\u53d1\u4e86\u592a\u591a\u5e16\u4e86\uff0c\u660e\u5929\u518d\u6765\u5427", ""],
        436: ["\u60a8\u53d1\u5e16\u592a\u9891\u7e41", ""],
        441: ["\u60a8\u4eca\u5929\u5df2\u56de\u590d\u4e86\u592a\u591a\u5e16\u4e86\uff0c\u660e\u5929\u518d\u6765\u5427", ""],
        442: ["\u4eb2\uff0c\u53d1\u5f97\u592a\u5feb\u4e86\uff01\u8bf7\u8fc7\u4e00\u4f1a\u518d\u6765\u56de\u5e16", ""],
        443: ["\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801", ""],
        520: ["\u670d\u52a1\u5668\u9519\u8bef", ""],
        521: ["\u60a8\u8fd8\u6ca1\u6709\u767b\u5f55", ""],
        522: ["\u6ca1\u6709\u627e\u5230\u8be5\u7528\u6237", ""],
        523: ["\u5b57\u7b26\u8d85\u957f", ""],
        524: ["\u56fe\u7247\u592a\u591a", ""],
        525: ["\u52a8\u6001\u4e2d\u6ca1\u6709\u56fe\u7247", ""],
        526: ["\u4e0a\u4f20\u56fe\u7247\u51fa\u9519", ""],
        527: ["\u771f\u5b9e\u59d3\u540d\u4e0e\u8eab\u4efd\u8bc1\u53f7\u4e0d\u5339\u914d", ""],
        528: ["\u7528\u6237\u4fe1\u606f\u4fee\u6539\u5931\u8d25", ""],
        529: ["\u4e0a\u4f20\u6570\u636e\u4e3a\u7a7a", ""],
        530: ["\u4e0a\u4f20\u6570\u636e\u8fc7\u5927", ""],
        531: ["\u4e0a\u4f20\u5931\u8d25", ""],
        532: ["\u5bc6\u7801\u88ab\u4fdd\u62a4", ""],
        533: ["\u66f4\u6362\u5bc6\u7801\u5931\u8d25", ""],
        534: ["\u60a8\u7684\u64cd\u4f5c\u592a\u9891\u7e41", ""],
        535: ["\u52a8\u6001\u88ab\u5220\u9664", ""],
        536: ["\u53c2\u6570\u9519\u8bef", ""],
        540: ["\u8bf7\u6c42\u53c2\u6570\u7684\u683c\u5f0f\u9519\u8bef", ""],
        541: ["\u8bf7\u6c42\u5fc5\u987b\u7684\u53c2\u6570\u9519\u8bef", ""],
        542: ["\u522b\u8d2a\u5fc3\u54e6\uff0c\u4f60\u5df2\u7ecf\u559c\u6b22\u5f88\u591a\u4eba\u4e86", ""],
        543: ["\u8be5\u52a8\u6001\u5df2\u88ab\u5220\u9664", ""],
        544: ["\u8be5\u7167\u7247\u5df2\u88ab\u5220\u9664", ""],
        545: ["\u8bf7\u52ff\u91cd\u590d\u8d5e", ""],
        546: ["\u7528\u6237\u6ca1\u6709\u6ce8\u518c", ""],
        547: ["\u60a8\u7684\u5934\u50cf\u8fd8\u6ca1\u6709\u5ba1\u6838\u901a\u8fc7\uff0c<br />\u8fd8\u4e0d\u80fd\u548c\u5176\u4ed6\u7528\u6237\u8fdb\u884c\u4e92\u52a8", ""],
        548: ["\u7528\u6237url\u751f\u6210\u5931\u8d25", ""],
        550: ["\u7528\u6237\u88ab\u62c9\u9ed1", ""],
        551: ["\u9a8c\u8bc1\u7801\u9519\u8bef", ""],
        552: ["\u60a8\u586b\u5199\u7684\u6027\u522b\u4e0e\u8eab\u4efd\u8bc1\u4fe1\u606f\u4e0d\u5339\u914d", ""],
        553: ["\u5bf9\u4e0d\u8d77\uff0c\u8be5\u4f01\u4e1a\u90ae\u7bb1\u5df2\u7ecf\u7533\u8bf7\u8fc7\u9080\u8bf7\u7801\uff01", ""],
        554: ["\u5bf9\u4e0d\u8d77\uff0c\u6682\u53ea\u5bf9\u90e8\u5206\u4f01\u4e1a\u53d1\u9001\u9080\u8bf7\u7801\u3002", ""],
        555: ["\u9080\u8bf7\u7801\u5df2\u88ab\u4f7f\u7528", ""],
        556: ["\u5bf9\u4e0d\u8d77\uff0c\u60a8\u8f93\u5165\u7684\u90ae\u7bb1\u9519\u8bef\uff0c\u6216\u6682\u4e0d\u5728\u5185\u6d4b\u4f01\u4e1a\u540d\u5355\u4e2d\uff0c\u8bf7\u671f\u5f85\u5f00\u653e\u6ce8\u518c\u518d\u8bd5", ""],
        557: ["\u8bf7\u8f93\u5165\u9080\u8bf7\u7801", ""],
        558: ["\u7528\u6237\u8f93\u5165\u4e0d\u7b26\u5408\u8981\u6c42", ""],
        559: ["\u8be5\u6635\u79f0\u4e0d\u53ef\u7528", ""],
        560: ["\u56fe\u7247\u5730\u5740\u975e\u6cd5", ""],
        561: ["\u9a8c\u8bc1\u7801\u9519\u8bef", ""],
        562: ["\u4e0d\u80fd\u8d5e\u81ea\u5df1", ""],
        563: ["\u60a8\u9a8c\u8bc1\u6b21\u6570\u592a\u8fc7\u9891\u7e41\uff0c\u8bf7\u4f7f\u7528\u624b\u673a\u8ba4\u8bc1\u5427", ""],
        564: ["\u60a8\u5df2\u88ab\u5c01\u7981", ""],
        565: ["\u8be5\u7528\u6237\u5df2\u88ab\u5c01\u7981\uff0c\u65e0\u6cd5\u4e92\u52a8", ""],
        566: ["\u62b1\u6b49\uff0c\u5185\u5bb9\u8fdd\u53cd\u76f8\u5173\u6cd5\u5f8b\u6cd5\u89c4\uff0c\u8bf7\u4fee\u6539", ""],
        567: ["\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u4f7f\u7528\u624b\u673a\u8ba4\u8bc1\u6216\u8fc7\u4f1a\u91cd\u8bd5", ""],
        568: ["\u8be5\u8eab\u4efd\u8bc1\u53f7\u5df2\u5728\u82b1\u7530\u8ba4\u8bc1\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165", ""],
        569: ["\u8be5\u624b\u673a\u53f7\u5df2\u5728\u82b1\u7530\u8ba4\u8bc1\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165", ""],
        570: ["\u6ca1\u6709\u8fdb\u884c\u8eab\u4efd\u8ba4\u8bc1\uff0c\u65e0\u6cd5\u4e92\u52a8", ""],
        571: ["\u60c5\u4e66\u6ca1\u6709\u6587\u5b57", ""],
        573: ["\u4f60\u5df2\u88ab\u5bf9\u65b9\u62c9\u9ed1\uff0c\u65e0\u6cd5\u4e92\u52a8", ""],
        574: ["\u8be5\u529f\u80fd\u5df2\u8fbe\u4f7f\u7528\u4e0a\u9650", ""],
        576: ["\u771f\u53ef\u60dc\uff0c\u4f60\u7684\u8d44\u6599\u5b8c\u6574\u5ea6\u8fd8\u6ca1\u6709\u8fbe\u523030%\uff0c\u6682\u65f6\u4e0d\u80fd\u548c\u7f8e\u5973\u4ea4\u6d41", ""],
        579: ["\u56de\u7b54\u65f6\u95f4\u95f4\u9694\u592a\u77ed", ""],
        581: ["\u4eca\u65e5\u8df3\u8fc7\u9898\u6570\u8fbe\u5230\u4e0a\u9650", ""],
        582: ["\u4e0d\u80fd\u91cd\u590d\u6253\u62db\u547c", ""],
        583: ["\u62b1\u6b49\uff0c\u53d1\u9001\u5185\u5bb9\u4e2d\u5305\u542b\u654f\u611f\u5185\u5bb9\uff0c\u8bf7\u68c0\u67e5\u540e\u91cd\u65b0\u53d1\u9001\u3002", ""],
        584: ["\u62b1\u6b49\uff0c\u53d1\u9001\u5185\u5bb9\u4e2d\u5305\u542b\u654f\u611f\u5185\u5bb9\uff0c\u8bf7\u68c0\u67e5\u540e\u91cd\u65b0\u53d1\u9001\u3002", ""],
        585: ["\u6682\u65f6\u4e0d\u80fd\u8d2d\u4e70\u6536\u8d39\u670d\u52a1", ""],
        586: ["\u6d88\u8d39\u8ba2\u5355\u4e0d\u5b58\u5728", ""],
        590: ["\u8ba2\u5355\u6216\u652f\u4ed8\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8d2d\u4e70\u5e76\u652f\u4ed8", ""],
        591: ["\u60a8\u7684\u8ba4\u8bc1\u6b63\u5728\u5ba1\u6838\u4e2d\uff0c\u6682\u4e0d\u80fd\u4e92\u52a8\uff01", ""],
        592: ["\u4e3a\u4e86\u4fdd\u8bc1\u4ea4\u53cb\u5b89\u5168\u548c\u771f\u5b9e\u6027\uff0c\u8bf7\u5148\u5b8c\u6210\u624b\u673a\u53f7\u6216\u8eab\u4efd\u8bc1\u53f7\u8ba4\u8bc1", ""],
        593: ["\u751f\u6210\u8ba2\u5355ID\u5f02\u5e38", ""],
        594: ["\u7528\u6237\u6536\u8d39\u5e10\u53f7\u4e0d\u5b58\u5728", ""],
        595: ["\u6d3b\u52a8\u4e0d\u5b58\u5728", ""],
        596: ["\u60a8\u5df2\u8d2d\u4e70\u6b64\u670d\u52a1\uff0c\u53ef\u6c38\u4e45\u4f7f\u7528\uff0c\u4e0d\u9700\u8981\u518d\u6b21\u8d2d\u4e70", ""],
        598: ["\u4e3a\u4fdd\u8bc1\u5b89\u5168\u4ee5\u9632\u53d7\u9a97\uff0c\u8bf7\u52ff\u4f7f\u7528\u7ad9\u5916\u8054\u7cfb\u65b9\u5f0f\u6c9f\u901a", ""],
        599: ["\u8be5\u8bc4\u8bba\u5df2\u5220\u9664\uff01", ""],
        600: ["\u6700\u591a\u53ef\u9009\u62e910\u4e2a\u6807\u7b7e\u5c55\u793a", ""],
        620: ["\u7ea6\u4f1a\u4e0d\u5b58\u5728\uff01", ""],
        621: ["\u7ea6\u4f1a\u7533\u8bf7\u4e0d\u5b58\u5728\uff01", ""],
        622: ["\u975e\u7ba1\u7406\u5458\uff01", ""],
        623: ["\u4e0d\u80fd\u7533\u8bf7\u81ea\u5df1\u53d1\u5e03\u7684\u7ea6\u4f1a", ""],
        624: ["\u7ea6\u4f1a\u5df2\u7ecf\u7ed3\u675f", ""],
        625: ["\u4e0d\u80fd\u91cd\u590d\u7533\u8bf7\u7ea6\u4f1a", ""],
        626: ["\u4e0d\u662f\u7ea6\u4f1a\u7684\u521b\u5efa\u8005\uff0c\u4e0d\u80fd\u5904\u7406\u7ea6\u4f1a\u7533\u8bf7", ""],
        627: ["\u53d1\u5e03\u7ea6\u4f1a\u5df2\u8d85\u8fc7\u6b21\u6570\u9650\u5236\uff01", ""],
        628: ["\u7ea6\u4f1a\u88ab\u5220\u9664\uff01", ""],
        2005: ["\u5df2\u7ecf\u6295\u8fc7\u7968", ""],
        2006: ["\u6295\u7968\u8bdd\u9898\u4e0d\u5b58\u5728", ""],
        2007: ["\u6295\u7968\u5931\u8d25", ""],
        2009: ["\u60a8\u4e0d\u7b26\u5408ta\u7684\u4ea4\u53cb\u6761\u4ef6\uff0cta\u4e0d\u613f\u548c\u60a8\u4ea4\u6d41", ""]
    };
    g.Text = function (a) {
        return h[a] && h[a][0] ? h[a][0] : ""
    }, g.HasCode = function (a) {
        return h[a] ? !0 : !1
    }, g.showTips = function (a) {
        var a = d.extend({
            json: {},
            evt: null
        }, a), b = parseInt(a.json.code) || 1, c = b === 599 ? a.json.apiErrorMessage : g.Text(b);
        if (b === 1 || c === "")return !1;
        c && g.showWinTipsBox("warning", c, a.evt, a.triggerElem);
        return !0
    }, g.Tips = function (a, b, c) {
        var d = g.Text(a);
        if (a === 1 || d === "")return !1;
        b ? g.showWinTipsBox("warning", d, b, c) : g.showWinTipsBox("warning", d, null, c);
        return !0
    }, g.FloatTips = function (a, b) {
        var c = g.Text(a);
        if (a === 1 || c === "")return !1;
        b ? g.showFloatTipsBox("warning", c) : g.showFloatTipsBox("warning", c);
        return !0
    }, g.showWinTipsBox = function (a, b, c, d) {
        e.show(c, {data: {type: a, text: b}, triggerElem: d})
    }, g.showFloatTipsBox = function (a, b) {
        var c = new f(null, {data: {type: a, text: b}});
        c.show(), c.delayHide(1500)
    };
    return g
});
define("widget/box/winBox/TipsBox", function (a, b, c) {
    var d = a("lib/jquery"), e = a("widget/box/winBox/Box"), f = a("utils/tmpl"), g = e.extend({
        init: function (a, b) {
            this._super(a, b)
        }, renderTmpl: function () {
            return d(f.formatTemplate(a("template/winbox/tipsBox"), {}))
        }, postRender: function () {
            this.$typeElem = this.$elem.find(".js-type"), this.$textElem = this.$elem.find(".js-text"), this.$arrowElem = this.$elem.find(".js-arrow")
        }, show: function (a, b) {
            this.timer && clearTimeout(this.timer), this._super(a, b), this.$typeElem.removeClass("correct error warning").addClass(b.data.type), this.$textElem.html(b.data.text), this.setPosition();
            var c = this;
            this.timer = setTimeout(function () {
                c.hide()
            }, 2e3)
        }, bindEvent: function () {
            this._super()
        }, setPosition: function () {
            var a = this.$trigger, b = a.offset(), c = this.$elem.width();
            this.$elem.css({
                top: b.top - this.$elem.innerHeight() - 10,
                left: b.left + a.innerWidth() / 2 - c / 2
            }), this.$arrowElem.css({left: c / 2 - 7})
        }
    }), h = null;
    return {
        getInstance: function () {
            h === null && (h = new g);
            return h
        }, getNewInstance: function (a, b) {
            return new g(a, b)
        }
    }
});
define("widget/box/winBox/Box", function (a, b, c) {
    var d = a("lib/jquery"), e = a("widget/box/Box"), f = a("utils/Utils"), g = d(window), h = d(document.body), i = e.extend({
        init: function (a, b) {
            this._super(a, b), this.isBindAutoClose = !1
        }, show: function (a, b) {
            this._super(), this.config = b || {}, this.data = this.config.data || {}, this.config.triggerElem ? this.$trigger = this.config.triggerElem : typeof a != "undefined" && (this.$trigger = d(a.currentTarget)), this.hideCallBack = this.config.hideCallBack, !this.isBindAutoClose && this.config.autoClose && (this.autoClose = f.autoClose.call(this), this.isBindAutoClose = !0), this.config.bindResize && this.bindResize(), this.setPosition();
            return this.$elem
        }, hide: function () {
            this.reset(), this.hideCallBack && this.hideCallBack(), this.config.autoClose && (h.unbind("click", this.autoClose), this.isBindAutoClose = !1), this.config.bindResize && g.unbind("resize", d.proxy(this.setPosition, this)), this._super()
        }, bindResize: function () {
            g.bind("resize", d.proxy(this.setPosition, this))
        }, reset: function () {
        }
    });
    return i
});
define("template/winbox/tipsBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="winlayer tipsBox"><em class="icon-winlayer-arrowDown js-arrow"></em><div class="tipsBox-inner js-inner"><span class="tipsBox-left js-type"><em class="icon-correct-m"></em><em class="icon-warning-m"></em><em class="icon-error-m"></em></span><p class="js-text"></p></div></div>');
        return p.join("")
    }
});
define("widget/box/floatBox/TipsBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("utils/tmpl"), f = a("widget/box/floatBox/Box"), g = f.extend({
        preRender: function () {
            return {title: "", bodyContent: e.formatTemplate(a("template/floatbox/tipsBox"), this.data)}
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-tipsBox")
        }, hide: function (a) {
            this._super(), this.config.callBack && this.config.callBack()
        }
    });
    return g
});
define("template/floatbox/tipsBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer-bd"><p class="text-middle-tips"><span class="fS14">'), type == "correct" ? p.push('<em class="icon-correct-m"></em>') : type == "warning" ? p.push('<em class="icon-warning-m"></em>') : type == "error" && p.push('<em class="icon-error-m"></em>'), p.push("", text, "</span></p>"), typeof desc != "undefined" && desc !== "" && p.push('<p class="poplayer-desc">', desc, "</p>"), p.push("</div>");
        return p.join("")
    }
});
define("widget/box/floatBox/IntegrityTipsBox", function (a, b, c) {
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/tmpl"), g = a("utils/Utils"), h = a("utils/Log"), i = a("model/UserData"), j = e.extend({
        init: function (a, b) {
            this._super(a, b), this.data.tipsType = b.tipsType || !1, this.data.url = i.getLoginUser().url
        }, preRender: function () {
            return {
                title: this.config.title || "\u8bf7\u5b8c\u5584\u8d44\u6599",
                bodyContent: f.formatTemplate(a("template/floatbox/integrityTipsBox"), this.data)
            }
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-integrity")
        }, bindEvent: function () {
            this._super(), this.$elem.delegate(".submit-trigger", "click", d.proxy(this.onSubmit, this))
        }, hide: function (a) {
            this._super(), a && this.config.callBack && this.config.callBack({status: "cancel"})
        }, onSubmit: function (a) {
            this.hide()
        }
    });
    return j
});
define("template/floatbox/integrityTipsBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer-bd"><div class="poplayer-messbox"><div class="poplayer-mess"><em class="icon-integrity-heart"></em>'), tipsType === "QA" ? p.push('\u771f\u53ef\u60dc\uff0c\u4f60\u7684\u8d44\u6599\u5b8c\u6574\u5ea6\u8fd8\u6ca1\u8fbe\u5230<strong class="text-red">30%</strong>\uff0c\u6682\u65f6\u8fd8\u4e0d\u80fd\u67e5\u770bTA\u7684Q&A\u3002') : p.push('\u771f\u53ef\u60dc\uff0c\u4f60\u7684\u8d44\u6599\u5b8c\u6574\u5ea6\u8fd8\u6ca1\u8fbe\u5230<strong class="text-red">30%</strong>\uff0c\u6682\u65f6\u4e0d\u80fd\u548cTA\u4ea4\u6d41\u3002'), p.push("</div>"), tipsType === "QA" ? p.push('<div class="poplayer-desc"></div>') : p.push('<div class="poplayer-desc">\u5df2\u7ecf\u6709<strong>80%</strong>\u7684\u7528\u6237\u7545\u804a\u65e0\u963b\u3002</div>'), p.push('</div></div><div class="poplayer-ft"><div class="poplayer-btn n-btn-box"><div><a href="/', url, '?tab=info" target="_blank" class="btn btn-red submit-trigger">\u5b8c\u5584\u8d44\u6599</a><a href="javascript:;" class="btn btn-gray close-trigger">\u53d6\u6d88</a></div></div></div>');
        return p.join("")
    }
});
define("widget/box/floatBox/NeedVerifyBox", function (a, b, c) {
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/tmpl"), g = a("utils/Utils"), h = a("utils/Log"), i = a("model/UserData"), j = e.extend({
        init: function (a, b) {
            this._super(a, b)
        }, preRender: function () {
            return {
                title: this.config.title || "\u9700\u8981\u5148\u5b8c\u6210\u8eab\u4efd\u8ba4\u8bc1",
                bodyContent: f.formatTemplate(a("template/floatbox/needVerify"), this.data)
            }
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-needVerify")
        }, bindEvent: function () {
            this._super(), this.$elem.delegate(".submit-trigger", "click", d.proxy(this.onSubmit, this))
        }, hide: function (a) {
            this._super(), a && this.config.callBack && this.config.callBack({status: "cancel"})
        }, onSubmit: function (a) {
            this.hide()
        }
    });
    return j
});
define("template/floatbox/needVerify", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer-bd"><div class="poplayer-messbox"><span class="poplayer-mess"><em class="icon-warning-b"></em>\u4e3a\u4e86\u4fdd\u8bc1\u4ea4\u53cb\u5b89\u5168\u548c\u771f\u5b9e\u6027\uff0c\u8bf7\u5148\u5b8c\u6210\u624b\u673a\u53f7\u6216\u8eab\u4efd\u8bc1\u53f7\u8ba4\u8bc1</span></div><p class="poplayer-desc">\u82b1\u7530\u7528\u6237\u5747\u5df2\u5b8c\u6210\u8fc7\u8ba4\u8bc1</p></div><div class="poplayer-ft"><div class="poplayer-btn n-btn-box"><div><a href="/verified/mobile" target="_blank" class="btn btn-red ">\u53bb\u8ba4\u8bc1</a></div></div></div>');
        return p.join("")
    }
});
define("widget/box/floatBox/NeedAvatarBox", function (a, b, c) {
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/tmpl"), g = a("utils/Utils"), h = a("utils/Log"), i = a("model/UserData"), j = e.extend({
        init: function (a, b) {
            this._super(a, b)
        }, preRender: function () {
            return {
                title: this.config.title || "\u9700\u8981\u4e0a\u4f20\u771f\u5b9e\u5934\u50cf",
                bodyContent: f.formatTemplate(a("template/floatbox/needAvatar"), this.data)
            }
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-needAvatar")
        }, bindEvent: function () {
            this._super(), this.$elem.delegate(".submit-trigger", "click", d.proxy(this.onSubmit, this))
        }, hide: function (a) {
            this._super(), a && this.config.callBack && this.config.callBack({status: "cancel"})
        }, onSubmit: function (a) {
            this.hide()
        }
    });
    return j
});
define("template/floatbox/needAvatar", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer-bd"><div class="poplayer-messbox"><span class="poplayer-mess"><em class="icon-warning-b"></em>', content, ""), typeof subContent != "undefined" && subContent && p.push('<span class="text-md poplayer-subContent">', subContent, "</span>"), p.push('</span></div></div><div class="poplayer-ft"><div class="poplayer-btn n-btn-box"><div><a href="/settings/face" target="_blank" class="btn btn-red ">\u53bb\u4e0a\u4f20\u5934\u50cf</a></div></div></div>');
        return p.join("")
    }
});
define("widget/box/floatBox/SpamVerifyBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/tmpl"), g = a("utils/Utils"), h = a("utils/Error"), i = a("utils/verify/ProfileVerify"), j = a("utils/DataSource"), k = e.extend({
        preRender: function () {
            return {
                title: "\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801",
                bodyContent: f.formatTemplate(a("template/floatbox/spamVerifyBox"), {})
            }
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-spamVerify"), this.$codeImg = this.$elem.find(".js-codeImg"), this.$verifyCode = this.$elem.find(".js-verifyCode"), this.$verifyCodeTips = this.$verifyCode.parents(".js-row").find(".js-tips"), this.verify = new i({verifyCode: this.$verifyCode.parents(".js-row")});
            var a = this;
            setTimeout(function () {
                a.$verifyCode.val("").focus()
            }, 100)
        }, bindEvent: function () {
            this._super(), this.$elem.delegate(".codeRefresh-trigger", "click", d.proxy(this.refreshCode, this)), this.$elem.delegate(".submit-trigger", "click", d.proxy(this.onSubmit, this))
        }, refreshCode: function () {
            g.textTips(this.$verifyCodeTips, "hide"), this.$codeImg.attr("src", "/photo/verifyNew?type=1&rnd=" + Math.random() * 1e3), this.$verifyCode.val("").focus()
        }, preCheck: function () {
            if (this.verify.checkAll())return !0;
            return !1
        }, parseParams: function () {
            return {verifyCode: d.trim(this.$verifyCode.val())}
        }, onSubmit: function (a) {
            if (!(!this.preCheck() || d.isPlainObject(this.request) && this.request.readyState !== 4)) {
                var b = this.parseParams(), c = this;
                this.request = j.postJSON("checkVerifyCode", b, function (b) {
                    var d = parseInt(b.code) || 1;
                    h.Tips(d, a) || c.onSuccess()
                })
            }
        }, onSuccess: function () {
            this.hide(), this.config.jqXHR.resend()
        }
    });
    return k
});
define("utils/verify/ProfileVerify", function (a, b, c) {
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/Utils"), g = a("utils/verify/VerifyItem"), h = e.extend({
        methods: {},
        DEFAULT: {tipSelector: ".js-tips", passClass: "pass", errorClass: "error", requiredClass: "required"},
        init: function (a, b) {
            this.elems = a, this.config = d.extend({}, this.DEFAULT, b);
            for (var c in this.elems) {
                this["$" + c] = d(this.elems[c]);
                try {
                    this.methods[c] = this[c + "Init"]()
                } catch (e) {
                }
            }
        },
        nickNameInit: function () {
            var a = {
                input: "input",
                regExp: new RegExp(f.NICKNAME_REG),
                ingoreEmpty: !1,
                minLength: 3,
                maxLength: 24,
                verifyType: "nickname",
                triggerEvents: ["blur"],
                ignoreFullWidth: !1
            };
            typeof this.config.nickName.checkCallBack != "undefined" && (a.checkCallBack = this.config.nickName.checkCallBack);
            return new g(this.$nickName, a)
        },
        realnameInit: function () {
            return new g(this.$realname, {
                input: "input",
                regExp: new RegExp(f.REALNAME_REG),
                ingoreEmpty: !1,
                minLength: 2,
                maxLength: 24,
                verifyType: "realname",
                triggerEvents: ["blur"],
                ignoreFullWidth: !1
            })
        },
        mobileInit: function () {
            return new g(this.$mobile, {
                input: ".js-mobileNo",
                regExp: /\d+$/,
                verifyType: "mobile",
                ingoreEmpty: !1,
                minLength: 6,
                maxLength: 13
            })
        },
        aboardMobileInit: function () {
            return new g(this.$aboardMobile, {
                regExp: new RegExp(f.MOBILE_REG),
                verifyType: "mobile",
                ingoreEmpty: !1,
                minLength: 11,
                maxLength: 11
            })
        },
        microblogInit: function () {
            return new g(this.$microblog, {
                regExp: new RegExp(/^(http)s?:\/\/[\w\-\.]+[\/\w=_\-]*$/i),
                ingoreEmpty: !0,
                verifyType: "microblog",
                maxLength: 45
            })
        },
        doubanInit: function () {
            return new g(this.$douban, {
                regExp: new RegExp(/^(http)s?:\/\/[\w\-\.]+[\/\w=_\-\.]*$/i),
                ingoreEmpty: !0,
                verifyType: "douban",
                maxLength: 45
            })
        },
        idCardInit: function () {
            return new g(this.$idCard, {
                regExp: new RegExp(f.IDCARD_REG),
                verifyType: "idcard",
                minLength: 15,
                maxLength: 18
            })
        },
        mobileCodeInit: function () {
            return new g(this.$mobileCode, {
                regExp: new RegExp(f.MOBILECODE_REG),
                verifyType: "mobileCode",
                ingoreEmpty: !1,
                minLength: 4,
                maxLength: 10
            })
        },
        schoolInit: function () {
            return new g(this.$school, {
                regExp: new RegExp(f.SCHOOL_REG),
                verifyType: "school",
                maxLength: 60,
                ingoreEmpty: !0,
                enablePassIcon: !1
            })
        },
        companyInit: function () {
            return new g(this.$company, {
                regExp: new RegExp(f.COMPANY_REG),
                verifyType: "company",
                maxLength: 50,
                ingoreEmpty: !0,
                enablePassIcon: !1
            })
        },
        weightInit: function () {
            return new g(this.$weight, {
                regExp: new RegExp(/^[0-9]{1,3}$/),
                verifyType: "weight",
                maxValue: 400,
                minValue: 25,
                ingoreEmpty: !0
            })
        },
        verifyCodeInit: function () {
            return new g(this.$verifyCode, {
                regExp: new RegExp(f.VERIFYCODE_REG),
                verifyType: "verifyCode",
                ingoreEmpty: !1,
                enablePassIcon: !1
            })
        },
        inviteCodeInit: function () {
            return new g(this.$inviteCode, {
                regExp: new RegExp(f.INVITECODE_REG),
                verifyType: "inviteCode",
                ingoreEmpty: !0
            })
        },
        checkAll: function (a) {
            var b = a || !1, c = !0;
            for (var d in this.elems)if (this.methods[d].getResult(b) === !1) {
                c = !1;
                break
            }
            return c
        }
    });
    return h
});
define("utils/verify/VerifyItem", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("utils/Utils"), f = a("basic/Class"), g = f.extend({
        init: function (a, b) {
            this.$elem = a, this.$input = b.input ? a.find(b.input) : a.find(":input, select"), this.regExp = b.regExp || null, this.verifyType = b.verifyType, this.ingoreEmpty = b.ingoreEmpty || !1, this.maxValue = b.maxValue || !1, this.minValue = b.minValue || !1, this.maxLength = b.maxLength || !1, this.minLength = b.minLength || !1, this.triggerEvents = b.triggerEvents || ["blur"], this.ignoreFullWidth = b.ignoreFullWidth || !1, this.checkCallBack = b.checkCallBack, this.enablePassIcon = typeof b.enablePassIcon != "undefined" ? b.enablePassIcon : !0, this.$tips = b.$tips || this.$elem.find(".js-tips"), this.bindEvent()
        }, parseResult: function (a) {
            var b = {
                "nickname.empty": "\u8bf7\u8f93\u5165\u6635\u79f0",
                "nickname.long": "\u6635\u79f0\u592a\u957f",
                "nickname.short": "\u6635\u79f0\u592a\u77ed",
                "nickname.wrongFormat": "\u683c\u5f0f\u9519\u8bef",
                "realname.empty": "\u8bf7\u8f93\u5165\u771f\u5b9e\u59d3\u540d",
                "realname.long": "\u771f\u5b9e\u59d3\u540d\u592a\u957f",
                "realname.short": "\u771f\u5b9e\u59d3\u540d\u592a\u77ed",
                "realname.wrongFormat": "\u683c\u5f0f\u9519\u8bef",
                "idcard.empty": "\u8bf7\u8f93\u5165\u8eab\u4efd\u8bc1\u53f7",
                "idcard.long": "\u8eab\u4efd\u8bc1\u53f7\u4e0d\u6b63\u786e",
                "idcard.short": "\u8eab\u4efd\u8bc1\u53f7\u4e0d\u6b63\u786e",
                "idcard.wrongFormat": "\u8eab\u4efd\u8bc1\u53f7\u4e0d\u6b63\u786e",
                "mobile.empty": "\u8bf7\u8f93\u5165\u624b\u673a\u53f7",
                "mobile.long": "\u8f93\u5165\u7684\u624b\u673a\u53f7\u7801\u6709\u8bef",
                "mobile.short": "\u8f93\u5165\u7684\u624b\u673a\u53f7\u7801\u6709\u8bef",
                "mobile.wrongFormat": "\u8f93\u5165\u7684\u624b\u673a\u53f7\u7801\u6709\u8bef",
                "mobileCode.empty": "\u8bf7\u8f93\u5165\u77ed\u4fe1\u4e2d\u7684\u9a8c\u8bc1\u7801",
                "mobileCode.long": "\u9a8c\u8bc1\u7801\u9519\u8bef",
                "mobileCode.short": "\u9a8c\u8bc1\u7801\u9519\u8bef",
                "mobileCode.wrongFormat": "\u9a8c\u8bc1\u7801\u9519\u8bef",
                "company.empty": "",
                "company.long": "\u516c\u53f8\u540d\u79f0\u592a\u957f",
                "company.short": "\u516c\u53f8\u540d\u79f0\u592a\u77ed",
                "company.wrongFormat": "\u516c\u53f8\u540d\u79f0\u683c\u5f0f\u9519\u8bef",
                "school.empty": "",
                "school.long": "\u5b66\u6821\u540d\u79f0\u592a\u957f",
                "school.wrongFormat": "\u5b66\u6821\u540d\u79f0\u683c\u5f0f\u9519\u8bef",
                "weight.empty": "",
                "weight.big": "\u6240\u586b\u4f53\u91cd\u4e0d\u5728\u6709\u6548\u8303\u56f4\u5185",
                "weight.small": "\u6240\u586b\u4f53\u91cd\u4e0d\u5728\u6709\u6548\u8303\u56f4\u5185",
                "weight.wrongFormat": "\u6240\u586b\u4f53\u91cd\u683c\u5f0f\u9519\u8bef",
                "microblog.long": "\u5fae\u535a\u5730\u5740\u8fc7\u957f",
                "microblog.short": "\u5fae\u535a\u5730\u5740\u8fc7\u77ed",
                "microblog.wrongFormat": "\u5fae\u535a\u5730\u5740\u683c\u5f0f\u9519\u8bef",
                "douban.long": "\u8c46\u74e3\u5730\u5740\u8fc7\u957f",
                "douban.short": "\u8c46\u74e3\u5730\u5740\u8fc7\u77ed",
                "douban.wrongFormat": "\u8c46\u74e3\u5730\u5740\u683c\u5f0f\u9519\u8bef",
                "verifyCode.empty": "\u9a8c\u8bc1\u7801\u4e0d\u80fd\u4e3a\u7a7a",
                "verifyCode.wrongFormat": "\u9a8c\u8bc1\u7801\u683c\u5f0f\u9519\u8bef",
                "inviteCode.empty": "",
                "inviteCode.wrongFormat": "\u9080\u8bf7\u7801\u683c\u5f0f\u9519\u8bef"
            };
            return b[a]
        }, bindEvent: function () {
            var a = this;
            for (var b = 0; b < this.triggerEvents.length; b++)this.$input.bind(this.triggerEvents[b], d.proxy(this.onEvent, this));
            this.$input.bind("focus", function () {
                e.textTips(a.$tips, "hide")
            })
        }, onEvent: function () {
            var a = d.trim(this.$input.val()), b = this.checkInput(a);
            a === "" && this.ingoreEmpty ? (e.textTips(this.$tips, "hide"), this.checkCallBack && this.checkCallBack(this.$elem, b)) : b === "ok" && this.enablePassIcon ? this.checkCallBack && this.checkCallBack(this.$elem, b) : b === "ok" && !this.enablePassIcon ? (e.textTips(this.$tips, "hide"), this.checkCallBack && this.checkCallBack(this.$elem, b)) : (e.textTips(this.$tips, "error", this.parseResult(this.verifyType + "." + b)), this.$elem.trigger("register:disable"))
        }, checkInput: function (a) {
            var b = d.trim(a), c = this.ignoreFullWidth ? b : b.replace(e.FULLWIDTH_REG, "**"), f = null;
            if (this.ingoreEmpty && d.trim(b) === "")return "ok";
            if (this.ingoreEmpty === !1 && d.trim(b) === "")return "empty";
            if (this.maxLength && c.length > this.maxLength)return "long";
            if (this.minLength && c.length < this.minLength)return "short";
            if (this.maxValue && parseInt(b) > this.maxValue)return "big";
            if (this.minValue && parseInt(b) < this.minValue)return "small";
            if (this.regExp && !this.regExp.test(b))return "wrongFormat";
            return "ok"
        }, getResult: function (a) {
            var b = this.$input.val(), c = this.checkInput(b);
            if (c === "ok")return !0;
            a || this.$input.blur();
            return !1
        }
    });
    return g
});
define("template/floatbox/spamVerifyBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer-bd"><p class="fS14" style="padding-bottom: 4px;">\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801</p><div class="form-row js-row"><div class="form-control"><input class="form-input code-input js-verifyCode" type="text"><img src="/photo/verifyNew?type=1" class="code-img js-codeImg"><a onclick="return false;" href="javascript:;" class="code-change link-lightBlue codeRefresh-trigger">\u6362\u4e00\u5f20</a></div><div class="form-tips"><span class="text-icon-tips js-tips hidden"></span></div></div></div><div class="poplayer-ft"><div class="poplayer-btn n-btn-box"><div class="js-btn"><a class="btn btn-red n-btn-sure submit-trigger" href="javascript:;">\u786e\u8ba4</a></div></div></div>');
        return p.join("")
    }
});
define("module/message/MessageAction", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("utils/DataSource"), f = a("widget/box/floatBox/MessageBox"), g = a("widget/box/floatBox/FeedbackBox"), h = a("widget/box/floatBox/LovefmBox"), i = a("utils/Error"), j = a("utils/Utils"), k = a("utils/Log"), l = {
        doMessage: function (a, b) {
            if (!d.isPlainObject(this.messRequest) || this.messRequest.readyState === 4) {
                var c = this, f = d(a.currentTarget);
                this.messRequest = e.setTrigger(f).postJSON("singleSession", {withUserId: b.data.user.id}, function (d) {
                    var e = parseInt(d.code, 10) || 1;
                    i.Tips(e, a) || (b.$target = f, l.showMessageLayer.call(c, b, d.session))
                }), k.doLog({parameter: {method: "msgclick"}, elem: f})
            }
        }, showMessageLayer: function (a, b) {
            var c = a.data, d = {
                target: this,
                $target: a.$target,
                defaultTip: a.defaultTip || "",
                noMessTips: a.noMessTips || !1,
                tag: a.tag || "",
                data: {
                    userId: c.user.id,
                    nickName: c.user.nickName,
                    sexName: j.userSexName(c.user.sex),
                    relationData: c.relationData,
                    totalCount: b.totalCount
                }
            }, e = new f(null, d);
            e.show()
        }, doMessageToAdmin: function (a) {
            var b = {
                noMessTips: !0,
                data: {user: {id: "1398972104992685069", nickName: "\u82b1\u7530\u5c0f\u7ea2\u5a18"}}
            };
            l.doMessage(a, b)
        }, doFeedBackMessage: function () {
            var a = {data: {userId: "1398972104992685069", nickName: "\u82b1\u7530\u5c0f\u7ea2\u5a18"}};
            l.showFeedbackBox.call(null, a), k.doLog({parameter: {method: "msgclick"}, elem: "body"})
        }, showFeedbackBox: function (a) {
            var b = new g(null, a);
            b.show()
        }, doLovefmMessage: function (a, b) {
            if (!d.isPlainObject(this.lovefmRequest) || this.lovefmRequest.readyState === 4) {
                var c = this, f = d(a.currentTarget);
                this.lovefmRequest = e.setTrigger(f).postJSON("singleSession", {withUserId: b.data.userId}, function (d) {
                    var e = parseInt(d.code, 10) || 1;
                    i.Tips(e, a) || l.showLovefmBox.call(c, b)
                })
            }
        }, showLovefmBox: function (a) {
            var b = new h(null, a);
            b.show()
        }
    };
    return l
});
define("widget/box/floatBox/MessageBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("sendbox/MessageSendBox"), g = a("widget/box/floatBox/TipsBox"), h = a("model/UserData"), i = a("utils/tmpl"), j = a("utils/Cookie"), k = a("utils/Utils"), l = d(window), m = d("body"), n = e.extend({
        preRender: function () {
            var b = d.extend({}, this.data), c = h.getLoginUser();
            b.loginUser = c, b.defaultTip = this.config.defaultTip;
            return {
                title: "\u53d1\u9001\u79c1\u4fe1",
                bodyContent: i.formatTemplate(a("template/floatbox/messageBox"), b)
            }
        }, bindEvent: function () {
            this._super(), this.$elem.bind("message:send:success", d.proxy(this.onSuccess, this)), this.$elem.bind("chartlet:send:success", d.proxy(this.onChartletSent, this)), this.$elem.delegate(".close-tips-trigger", "click", d.proxy(this.onCloseTips, this)), this.$elem.bind("ajax:error", d.proxy(this.onSpamNotice, this)), this.$elem.bind("floatmessage:emotion:show", d.proxy(this.onEmotionShow, this)), this.$elem.bind("floatmessage:emotion:hide", d.proxy(this.onEmotionHide, this)), this.$elem.bind("floatmessage:noSvip", d.proxy(this.onShowSvipBox, this))
        }, postRender: function () {
            this.$elem.addClass("poplayer-sendMessage"), this._super();
            var a = {
                data: {userId: this.data.userId, relationData: this.data.relationData},
                isShowDefaultTip: this.config.defaultTip !== "" ? !0 : !1,
                tag: this.config.tag,
                floatMessageBox: this
            }, b = new f(this.$elem, a);
            b.render(), this.messageSendBox = b, this.flagDistance = 0, !this.config.noMessTips && parseInt(j.get("boxMessTips"), 10) !== 1 && (this.$tipsElem = d(n.tips), this.$tipsElem.insertBefore(this.$elem.find(".js-addressee")))
        }, onVerticalMiddle: function (a) {
            var b = k.isIe6 ? l.scrollTop() : 0, c = (l.height() - this.$mainElem.height()) / 2 - this.flagDistance;
            c = Math.max(c, 0) + b, a ? this.$mainElem.stop().animate({
                top: c,
                duration: 500,
                easing: "easeInOutExpo"
            }) : this.$mainElem.css({top: c})
        }, sendCallBack: function (a) {
            this.config.$target && this.config.$target.trigger("floatmessage:send:success", [a])
        }, onSuccess: function (a, b) {
            var c = this;
            this.hide();
            if (h.isShowGuideUploadAvatar())m.trigger("global:guide:uploadAvatar", [{type: "message"}]); else {
                var d = new g(null, {data: {type: "correct", text: "\u53d1\u9001\u6210\u529f\uff01"}});
                d.show(), d.delayHide(1500)
            }
            setTimeout(function () {
                c.sendCallBack(b)
            }, 1800)
        }, onChartletSent: function (a, b) {
            this.hideTextarea("hide"), this.showChatletSentTips();
            var c = this;
            setTimeout(function () {
                c.sendCallBack(b)
            }, 1800);
            return !1
        }, showChatletSentTips: function () {
            var a = this.$elem.find(".js-chartletSentTips");
            a.removeClass("hidden");
            var b = this;
            setTimeout(function () {
                a.addClass("hidden"), b.hideTextarea("show")
            }, 1500)
        }, hideTextarea: function (a) {
            var b = this.messageSendBox.$textarea;
            a === "hide" ? b.attr("data-color", b.css("color")).css("color", "#FFF") : b.css("color", b.attr("data-color")).focus()
        }, show: function () {
            this._super();
            var a = this;
            setTimeout(function () {
                a.config.defaultTip === "" && a.messageSendBox.$textarea.focus()
            }, 10)
        }, hide: function () {
            var a = this.messageSendBox.emotion;
            a.isShow && a.hide(), this._super()
        }, onCloseTips: function () {
            this.$tipsElem.remove(), j.set("boxMessTips", 1, 365)
        }, onSpamNotice: function (a, b) {
            var c = this;
            b.status === 427 ? (c.hide(), m.trigger("error", ["spamNotice", function () {
                c.show()
            }])) : b.status === 428 && (c.hide(), m.trigger("error", ["spamBlocked"]))
        }, onEmotionShow: function () {
            this.flagDistance = 120, this.setPosition()
        }, onEmotionHide: function () {
            this.flagDistance = 0, this.setPosition()
        }, onShowSvipBox: function (a) {
            this.hide();
            var b = this;
            if (h.getLoginUser().isVip)var c = "global:pay:upgradevip"; else var c = "global:pay:buysvip";
            m.trigger(c, [{
                closeCallBack: function () {
                    b.show()
                }, successCallBack: function () {
                    h.setLoginUserSVip(), b.messageSendBox.onReSend()
                }
            }])
        }
    });
    n.tips = '<p class="mess-tips-close" style="margin: -3px 0 5px -5px; padding-left: 8px;"><span>\u63d0\u9192\uff1a\u8bf7\u9009\u62e9\u719f\u6089\u7684\u73af\u5883\u89c1\u9762\uff0c\u4e0d\u8981\u548c\u4efb\u4f55\u4eba\u4ea7\u751f\u91d1\u94b1\u5f80\u6765\uff0c\u4ee5\u9632\u88ab\u9a97\u3002</span></p>';
    return n
});
define("sendbox/MessageSendBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("sendbox/BasicSendBox"), f = a("utils/Log"), g = a("model/UserData"), h = a("sendbox/widget/Emotion"), i = a("sendbox/SendBoxAction"), j = e.extend({
        _defaults: {
            ajaxUrl: "sendMess",
            maxHeight: 168,
            maxLen: 400,
            isCountChar: !0,
            isAutoHeight: !0,
            isShowDefaultTip: !1,
            tag: "",
            floatMessageBox: null
        }, init: function (a, b) {
            b = d.extend({}, this._defaults, b), this._super(a, b)
        }, postRender: function () {
            this._super(), this.$setTopElem = this.$elem.find(".js-setTop")
        }, bindEvent: function () {
            this._super(), this.emotion = h.getInstance(null, {
                autoClose: !0,
                floatMessageBox: this.config.floatMessageBox,
                floatMessBoxElem: this.$elem,
                targetSendBox: this,
                data: this.data,
                bindResize: !0
            })
        }, onSubmit: function (a) {
            this.$setTopElem.is(":checked") && !g.getLoginUser().isSuperVip ? this.$elem.trigger("floatmessage:noSvip") : i.submit.call(this, a)
        }, parseParams: function () {
            var a = d.trim(this.$textarea.val()), b = {
                withUserId: this.data.userId,
                content: this.config.tag !== "" ? "#" + this.config.tag + "#" + a : a
            };
            g.getLoginUser().isSuperVip && (b.isSetTop = this.$setTopElem.is(":checked") ? 1 : 0), d.extend(b, this.data.relationData);
            return b
        }, onSendLog: function (a) {
            f.doLog({parameter: {method: a.isSetTop === 1 ? "tobuydmup" : "dm"}, elem: this.$elem})
        }, onSuccess: function (a) {
            this.onClearText(), this.$elem.trigger("message:send:success", [a]), this.$textarea.focus()
        }, onReSend: function () {
            g.getLoginUser().isSuperVip && this.$setTopElem.attr("checked", !0), this.$elem.find(".submit-trigger").trigger("click")
        }
    });
    return j
});
define("sendbox/BasicSendBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/Module"), f = a("sendbox/widget/TextArea"), g = a("sendbox/widget/WordCounter"), h = a("sendbox/SendBoxAction"), i = a("model/UserData"), j = a("utils/Log"), k = e.extend({
        defaults: {
            ajaxUrl: "",
            minLen: 0,
            maxLen: 326,
            maxHeight: null,
            isAutoHeight: !1,
            isCountChar: !1,
            isShowDefaultTip: !1
        },
        init: function (a, b) {
            this._super(a, b), this.checkTimer = null, this.isBindEvent = !1
        },
        postRender: function () {
            this.$textarea = this.$elem.find("textarea"), this.$btn = this.$elem.find(".js-btn")
        },
        bindEvent: function () {
            this._super(), this.wordCounter = new g(this.$elem.find(".js-wordCounter"), {
                textarea: this.$textarea,
                minLen: this.config.minLen,
                maxLen: this.config.maxLen,
                isCountChar: this.config.isCountChar
            }), this.textarea = new f(this.$textarea, {maxHeight: this.config.maxHeight}), this.config.isAutoHeight && this.bindAutoHeight(), this.config.isShowDefaultTip && (d.trim(this.$textarea.val()) !== "" && this.$elem.find(".js-default-tip").hide(), this.bindDefaultTip()), this.$elem.delegate(".submit-trigger", "click", d.proxy(this.onSubmit, this)), this.bindCtrlEnter(), this.bindCheckInput()
        },
        bindAutoHeight: function () {
            this.textarea && this.textarea.bindAutoHeight()
        },
        bindCtrlEnter: function () {
            h.bindCtrlEnter.call(this)
        },
        bindCheckInput: function () {
            h.bindCheckInput.call(this)
        },
        bindDefaultTip: function () {
            h.bindDefaultTip.call(this)
        },
        onCtrlEnter: h.ctrlEnter,
        onCheckInput: h.checkInput,
        checkInputVal: h.checkInputVal,
        onClearText: function () {
            this.$textarea.val("").keyup()
        },
        onRest: function () {
        },
        onSubmit: h.submit,
        onSend: h.send,
        parseParams: h.parseParams,
        onSuccess: function () {
            throw"Abstract Method!!!"
        },
        onSendLog: function () {
        },
        onSendSuccessLog: function () {
        }
    });
    return k
});
define("sendbox/widget/TextArea", function (a, b, c) {
    var d = a("lib/jquery"), e = a("basic/Class"), f = e.extend({
        _timer: null, init: function (a, b) {
            this.$elem = d(a), this.config = b || {}, this.maxHeight = this.config.maxHeight || f.MAX_HEIGHT, this.bindEvent()
        }, bindEvent: function () {
            this.$elem.bind("mouseup mousedown keyup keydown", d.proxy(this.onBlur, this))
        }, bindAutoHeight: function () {
            this.$elem.bind("keyup", d.proxy(this.setHeight, this))
        }, setHeight: function () {
            this.minHeight || (this.minHeight = this.$elem.height());
            var a = this;
            this.autoHeightTimer && clearTimeout(this.autoHeightTimer), this.autoHeightTimer = setTimeout(function () {
                a.temptextAreaElem || a.createTempTextArea(), a.temptextAreaElem.value = a.$elem.val();
                var b = parseFloat(a.temptextAreaElem.scrollHeight);
                b > a.minHeight ? a.maxHeight && b > a.maxHeight ? a.$elem.css({
                    height: a.maxHeight + "px",
                    overflowY: "auto"
                }) : a.$elem.css({height: b + "px", overflowY: "hidden"}) : a.$elem.css({
                    height: a.minHeight + "px",
                    overflowY: "hidden"
                })
            }, 80)
        }, createTempTextArea: function () {
            var a = this.$elem.width(), b = d("#js_tmp_textarea")[0];
            b ? this.temptextAreaElem = b : (b = d(document.createElement("TEXTAREA"))[0], b.id = "js_tmp_textarea", b.style.height = "0px", b.style.position = "absolute", b.style.top = "-10000px", b.style.height = "0px", b.style.overflow = "hidden", this.temptextAreaElem = b, d("body").append(b)), b.style.width = a + "px", b.style.lineHeight = this.$elem.css("lineHeight"), b.style.fontSize = this.$elem.css("fontSize"), b.style.fontFamily = this.$elem.css("fontFamily")
        }, onBlur: function (a) {
            if (d.inArray(a.which, [17]) === -1) {
                var b = this;
                b._timer && clearTimeout(b._timer), b._timer = setTimeout(function () {
                    b.$elem.data("lastPosition", b.$elem.getCaretPosition())
                }, 100)
            }
        }, toInputPos: function () {
            this.$elem.focus().setCaretTo(this.$elem.data().lastPosition);
            return this
        }, appendText: function (a) {
            this.toInputPos(), this.$elem.appendAfterCaret(a);
            return this
        }, appendTextToEnd: function (a) {
            this.$elem.focusToEnd().appendAfterCaret(a);
            return this
        }, clear: function () {
            this.$elem.val("").trigger("keyup");
            return this
        }
    });
    f.MAX_HEIGHT = 105;
    return f
});
define("sendbox/widget/WordCounter", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("sendbox/widget/SimpleCounter"), f = e.extend({
        init: function (a, b) {
            this._super.apply(this, arguments), this.config.isCountChar ? this.minLenVal = this.config.minLen : this.minLenVal = this.config.minLen / 2
        }, onCallback: function (a) {
            this._super(a), this.isError ? this.$elem.addClass("waring") : this.$elem.removeClass("waring");
            var b = [];
            a.textLen < this.config.minLen ? (b.push('\u81f3\u5c11\u8f93\u5165<b class="char-constantia">'), b.push(this.minLenVal), b.push("</b>\u4e2a\u5b57")) : (b.push('<b class="char-constantia">'), b.push(a.diff), b.push("</b>\u4e2a\u5b57")), this.$elem.html(b.join(""))
        }
    });
    return f
});
define("sendbox/widget/SimpleCounter", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/widget/Counter"), g = e.extend({
        defaults: {
            textarea: null,
            minLen: 0,
            maxLen: 326,
            isCountChar: !1
        }, init: function (a, b) {
            this.$elem = a, this.config = d.extend({}, this.defaults, b), this.$textarea = this.config.textarea, this.timer = null, this.isError = !1, this.errorType = null, this.bindEvent(), this.onInput(null, !0)
        }, bindEvent: function () {
            this.$textarea.bind("paste cut input keyup", d.proxy(this.onInput, this))
        }, onInput: function (a, b) {
            var c = this;
            this.timer && clearTimeout(this.timer), this.timer = setTimeout(function () {
                var a = null;
                c.config.isCountChar ? a = c.onCountChar() : a = c.onCountChineseChar();
                var d = null;
                a.textLen < c.config.minLen ? (c.isError = !0, c.errorType = "short") : a.diff < 0 ? (c.isError = !0, c.errorType = "long") : c.isError = !1, !b && c.onCallback(a)
            }, 100)
        }, onCountChar: function () {
            var a = f.charCount(this.$textarea.val()), b = this.config.maxLen - a;
            return {textLen: a, diff: b}
        }, onCountChineseChar: function () {
            var a = f.transCharCount(this.$textarea.val()), b = Math.floor((this.config.maxLen - a) / 2);
            return {textLen: a, diff: b}
        }, onCallback: function (a) {
            this.$elem.trigger("counter-status", [a, this])
        }, getValidVal: function () {
            return this.config.isCountChar ? this.$textarea.val().substring(0, this.config.maxLen) : f.subString(this.$textarea.val(), this.config.maxLen)
        }
    });
    return g
});
define("sendbox/SendBoxAction", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("utils/DataSource"), f = a("utils/Utils"), g = a("utils/Error"), h = {
        bindCheckInput: function () {
            this.$elem.delegate("textarea", "paste cut input keyup", d.proxy(this.onCheckInput, this))
        }, checkInput: function () {
            this.checkTimer && clearTimeout(this.checkTimer);
            var a = this;
            this.checkTimer = setTimeout(function () {
                a.checkInputVal() ? a.$btn.find(".js-btn-txt").removeClass("disabled") : a.$btn.find(".js-btn-txt").addClass("disabled")
            }, 100)
        }, checkInputVal: function () {
            var a = d.trim(this.$textarea.val());
            if (a.length === 0 || this.wordCounter.isError)return !1;
            return !0
        }, checkPhoneVal: function () {
            var a = d.trim(this.$phone.val()), b = a;
            if (a === "")return !0;
            if (a.length > 20)return !1;
            b = b.replace(/-/g, "").replace(/\s/g, "");
            return /^\d+$/.test(b)
        }, bindCtrlEnter: function (a) {
            this.$elem.delegate("textarea", "keydown", d.proxy(this.onCtrlEnter, this))
        }, ctrlEnter: function (a) {
            var b = a.which || a.keyCode;
            a.ctrlKey === !0 && b === 13 && this.onSubmit(a)
        }, bindDefaultTip: function () {
            var a = this.$elem.find(".js-default-tip"), b = this;
            a.bind("click", function () {
                b.$textarea.focus()
            }), this.$textarea.bind("focus", function () {
                a.hide()
            }).bind("blur", function () {
                d.trim(b.$textarea.val()).length === 0 && a.show()
            })
        }, submit: function (a) {
            if (!!this.checkInputVal()) {
                var b = this.parseParams();
                this.onSend(a, b)
            }
        }, send: function (a, b) {
            if (!d.isPlainObject(this.request) || this.request.readyState === 4) {
                var c = this, f = this.$elem.find(".submit-trigger");
                this.request = e.setTrigger(f).postJSON(this.config.ajaxUrl, b, function (d) {
                    var e = parseInt(d.code) || 1;
                    g.showTips({json: d, evt: a, triggerElem: f}) || (c.onSuccess(d), c.onSendSuccessLog(b))
                }).error(function (a) {
                    c.$elem.trigger("ajax:error", [a])
                }), this.onSendLog(b)
            }
        }, parseParams: function () {
            var a = {}, b = d.trim(this.$textarea.val());
            b !== "" && (a.content = b);
            return a
        }
    };
    return h
});
define("sendbox/widget/Emotion", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("utils/tmpl"), f = a("widget/box/winBox/Box"), g = a("utils/DataSource"), h = a("utils/Cookie"), i = a("utils/PagerScroll"), j = a("sendbox/widget/EmotionAction"), k = a("widget/box/winBox/TipsBox"), l = a("widget/box/floatBox/BuyConfirmBox"), m = a("model/UserData"), n = a("utils/Log"), o = a("widget/RollSlider"), p = a("utils/Utils"), q = d(window), r = f.extend({
        init: function (a, b) {
            this._super(a, b), this.emotionData = {all: {}}, this.isMacOS = navigator.appVersion.indexOf("Mac") !== -1 ? !0 : !1, this.initPagerScroll = {}, this.belongTo = this.config.belongTo, this.position = this.config.position || "fixed", this.resetData(b), typeof this.belongTo != "undefined" && (this.belongTo == "pubTopic" || this.belongTo == "topic") && (this.tabName = "emoji-free")
        }, onEmotionTrigger: function (a, b) {
            this.$trigger = d(a.currentTarget), this.targetSendBox = this.$trigger.data("obj"), this.$trigger.trigger("floatmessage:emotion:show"), this.show(a, this.config);
            if (b || this.tabName) {
                var c = this;
                setTimeout(function () {
                    c.$elem.find(".js-tabItem[data-target=" + (b || c.tabName) + "]").trigger("click", [!0])
                }, 150)
            }
        }, bindEvent: function () {
            this._super(), this.$elem.delegate(".js-normalEmotion", "click", d.proxy(this.onFreeEmotion, this)), this.$elem.delegate(".js-paidEmotion", "click", d.proxy(this.onPaidEmotion, this)), this.$elem.delegate(".get-trigger", "click", {type: "get"}, d.proxy(this.onBuyChartlet, this)), this.$elem.bind("chartlet:send:success", d.proxy(this.onSendChartlet, this)), this.$elem.bind("charlet:send:error", d.proxy(this.onSendError, this)), this.$elem.delegate(".js-tabItem", "click", d.proxy(this.onTabSwitch, this));
            var a = r.CONFIG.freeEmotion;
            h.get("hasShowPaidEmotion_1203") || (a = r.CONFIG.defaultTab, h.set("hasShowPaidEmotion_1203", 1, 90)), this.$elem.find(".js-tabItem[data-target=" + (a || this.tabName) + "]").trigger("click", [!0]), this.initTabsSlider()
        }, onTabSwitch: function (a) {
            var b = d(a.currentTarget), c = this.$elem.find(".js-tabItem"), e = b.data("target");
            c.removeClass("current"), b.addClass("current"), this.currentIndex = c.index(b), this.lastClassName && this.$emotionCon.removeClass(this.lastClassName), this.$emotionCon.addClass(e), this.lastClassName = e, this.getEmotionData(a, e)
        }, initTabsSlider: function () {
            var a = this, b = a.$elem.find(".js-sliderBox");
            setTimeout(function () {
                b.length > 0 && (a.tabSlider = new o(b, {
                    autoplay: !1,
                    duration: 200,
                    reelContainer: ".js-list",
                    slideItem: ".js-sliderItem",
                    prevBtn: ".prev-trigger",
                    nextBtn: ".next-trigger"
                }))
            }, 50)
        }, onFreeEmotion: function (a) {
            if (typeof this.belongTo != "undefined" && this.belongTo == "pubTopic") {
                var b = d(a.currentTarget).find("img").attr("src");
                this.targetSendBox && this.targetSendBox.editorDiv.appendEmotion(b) && this.targetSendBox.editorDiv.$elem.trigger("keyup")
            } else this.targetSendBox && this.targetSendBox.textarea.appendText("[" + d(a.currentTarget).data("code") + "]") && this.targetSendBox.textarea.$elem.trigger("keyup");
            a.ctrlKey || this.isMacOS && a.metaKey ? d.browser.opera && a.preventDefault() : this.hide()
        }, onPaidEmotion: function (a) {
            var b = d(a.currentTarget), c = b.data("code");
            if (this.checkChartlet(c))j.doChartlet.call(this, c, b), n.doLog({
                parameter: {method: "dmsticker"},
                elem: d(a.currentTarget)
            }); else {
                var e = r.isVipChartlet(this.lastClassName) ? "\u5f00\u901a\u4f1a\u5458\u514d\u8d39\u4f7f\u7528" : this.emotionData[this.lastClassName].price === 0 ? "\u9886\u53d6\u540e\u53ef\u4f7f\u7528" : "\u8d2d\u4e70\u540e\u53ef\u4f7f\u7528";
                k.getInstance().show(a, {data: {type: "warning", text: e}})
            }
        }, getParams: function (a) {
            var b = {withUserId: this.data.userId, content: "[" + a + "]"};
            this.data.trendId ? b.trendId = this.data.trendId : this.data.photoId ? b.photoId = this.data.photoId : this.data.questionId ? b.questionId = this.data.questionId : this.data.profilePhotoId && (b.profilePhotoId = this.data.profilePhotoId);
            return b
        }, getEmotionData: function (a, b) {
            if (!d.isPlainObject(this.getEmotionRequest) || this.getEmotionRequest.readyState === 4) {
                var c = this;
                b === "emoji-free" ? this.emotionData[b] || (this.getEmotionRequest = g.postJSON("getEmotion", {}, function (a) {
                    a && a.emotion && (c.renderEmotionItems(b, a.emotion), c.emotionData[b] = a)
                })) : this.getEmotionRequest = g.postJSON("getChartlet", {
                    serviceId: r.CONFIG.detail[b].serviceId,
                    otherId: this.userId
                }, function (a) {
                    if (a && a.list) {
                        var e = c.emotionData[b] && c.emotionData[b].myPermission !== a.myPermission ? !0 : !1;
                        c.updatePanel(b, a);
                        if (!c.emotionData[b] || e)c.renderEmotionItems(b, a, e), d.each(a.list, function (a, b) {
                            c.emotionData.all[b.code] = b
                        });
                        c.emotionData[b] = a
                    }
                })
            }
        }, renderEmotionItems: function (b, c, d) {
            var f = {type: b, emotion: c}, g = "";
            b === "emoji-free" ? g = b : g = "emoji-chartlet";
            var h = r.CONFIG.visibleHeight[g];
            f.fillNums = this.getFillNums(g, c), f.isVip = m.getLoginUser().isVip;
            var i = this.$emotionPanels.eq(this.currentIndex);
            i.find("ul").html(e.formatTemplate(a("template/sendbox/widget/emotionItem"), f)), this.bindPagerScroll({
                name: b,
                elem: i.find(".js-container"),
                scrollbar: i.find(".js-scrollbar"),
                content: i.find(".js-content"),
                pageNumElem: i.find(".js-pageNum"),
                visibleHeight: h,
                forceUpdate: d
            })
        }, updatePanel: function (b, c) {
            var d = this.$emotionPanels.eq(this.currentIndex);
            c.myPermission || m.getLoginUser().isVip ? d.removeClass("emoji-locked") : d.find(".js-intro").removeClass("hidden");
            var f = m.get(this.data.userId), g = f && f.sex || 2;
            d.find(".js-foot").html(e.formatTemplate(a("template/sendbox/widget/chartletBtn"), {
                name: r.CONFIG.detail[b].name,
                json: c,
                sex: g,
                isVipChartlet: r.isVipChartlet(b),
                isVip: m.getLoginUser().isVip
            }))
        }, getFillNums: function (a, b) {
            var c = r.CONFIG.fillConfig[a], d = 0, e = b.length || b.list.length, f = c.page_1_fix, g = c.page_1;
            b.myPermission && (f = c.page_1_bought_fix, g = c.page_1_bought);
            var h = (e - f) % c.page_2;
            e < g ? d = g - e : h !== 0 && (d = c.page_2 - h);
            return d
        }, bindPagerScroll: function (a) {
            if (!this.initPagerScroll[a.name] || a.forceUpdate) {
                var b = this;
                b.initPagerScroll[a.name] = !0, setTimeout(function () {
                    new i(a.elem, {
                        scrollbar: a.scrollbar,
                        content: a.content,
                        pageNumElem: a.pageNumElem,
                        visibleHeight: a.visibleHeight,
                        scrollCallback: d.proxy(b.scrollCallback, b)
                    })
                }, 100)
            }
        }, scrollCallback: function (a) {
            var b = this.$emotionPanels.eq(this.currentIndex);
            b.find(".js-page").text(a.currentPage + "/" + a.totalPage)
        }, postRender: function () {
            this._super(), this.position == "absolute" && this.$elem && this.$elem.addClass("emoji-absolute"), this.$emotionCon = this.$elem.find(".js-emotionCon"), this.$emotionPanels = this.$emotionCon.find(".js-panel")
        }, onSendChartlet: function (a, b) {
            this.hide(), this.$floatMessBoxElem.trigger("chartlet:send:success", [b])
        }, onSendError: function (a, b) {
            var c = this;
            b && b.statusCode && b.statusCode({
                547: function () {
                    c.hide()
                }, 592: function () {
                    c.hide()
                }
            })
        }, checkChartlet: function (a) {
            return this.emotionData.all[a].free || this.emotionData[this.lastClassName].myPermission || m.getLoginUser().isVip
        }, onBuyChartlet: function (a) {
            var b = {buy: "tobuySticker", buyfor: "togiveSticker", get: "togetSticker"};
            n.doLog({parameter: {method: b[a.data.type]}, elem: d(a.currentTarget)});
            var c = this.getChartletParams(a.data);
            this.baughtClassName = this.lastClassName;
            var e = this;
            setTimeout(function () {
                e.floatMessageBox && e.floatMessageBox.hide(), e.hide(), e.doBuyChartlet(c)
            }, 100)
        }, getChartletParams: function (a) {
            var b = {url: "createNewDeal", data: {serviceId: r.CONFIG.detail[this.lastClassName].serviceId}};
            a.type === "buyfor" && (b.url = "createPresentDeal", b.tips = "\u652f\u4ed8\u5e76\u8d60\u9001\u6210\u529f\uff01", b.data.receiverId = this.userId);
            return b
        }, doBuyChartlet: function (a) {
            if (!d.isPlainObject(this.dealRequest) || this.dealRequest.readyState === 4) {
                var b = this;
                this.dealRequest = g.postJSON(a.url, a.data, function (c) {
                    if (c && c.status === 1) {
                        var e = c.payInfo;
                        b.buyConfirmBox = new l(null, {
                            data: e.dealInfo,
                            userAccount: e.userAccount,
                            isBlankTab: !0,
                            successText: a.tips || "\u8d2d\u4e70\u6210\u529f\uff01",
                            logName: "Sticker",
                            successCallBack: d.proxy(b.buySuccess, b),
                            closeCallBack: d.proxy(b.buyRedirect, b),
                            redirectCallBack: d.proxy(b.buyRedirect, b)
                        }), b.buyConfirmBox.show()
                    }
                })
            }
        }, buySuccess: function () {
            this.floatMessageBox && this.floatMessageBox.show(), this.$trigger.trigger("click", [this.baughtClassName])
        }, buyRedirect: function () {
            this.buyConfirmBox.hide(), this.floatMessageBox && this.floatMessageBox.show(), this.hide(), this.$trigger.click()
        }, hide: function () {
            this.$trigger.trigger("floatmessage:emotion:hide"), this.reset(), this._super()
        }, renderTmpl: function () {
            var b = {isMacOS: this.isMacOS, belongTo: this.belongTo};
            return d(e.formatTemplate(a("template/sendbox/widget/emotion"), b))
        }, setPosition: function () {
            var a = this.$trigger.offset(), b = p.isIe6 ? 0 : q.scrollTop(), c = typeof this.position != "undefined" && this.position == "absolute" ? a.top + this.$trigger.height() + 10 : a.top - b + this.$trigger.height() + 10;
            this.$elem.css({
                left: a.left + this.$trigger.width() / 2 + 203,
                top: c
            }), this.$elem.find(".js-arrowUp").css({left: 23})
        }, reset: function () {
            this.$elem.find(".js-tabItem[data-target=" + r.CONFIG.freeEmotion + "]").trigger("click", [!0]), this.tabSlider && this.tabSlider.rollTo(!1, 0), this._super()
        }, resetData: function (a) {
            this.floatMessageBox = a.floatMessageBox, this.$floatMessBoxElem = a.floatMessBoxElem, this.data = this.config.data = a.data || {}, this.userId = (a.data || {}).userId, this.targetSendBox = a.targetSendBox, this.$trigger = a.targetSendBox.$elem.find(".emotion-trigger"), this.$trigger.bind("click", d.proxy(this.onEmotionTrigger, this)), this.$trigger.data("obj", this.targetSendBox), this.belongTo = a.belongTo, this.position = a.position || "fixed", typeof this.belongTo != "undefined" && (this.belongTo == "pubTopic" || this.belongTo == "topic") && (this.tabName = "emoji-free"), this.position == "absolute" && this.$elem && this.$elem.addClass("emoji-absolute")
        }
    });
    r.isVipChartlet = function (a) {
        var b = r.CONFIG.detail[a] || {};
        return b.isVipChartlet ? !0 : !1
    }, r.CONFIG = {
        defaultTab: "emoji-nn",
        freeEmotion: "emoji-free",
        detail: {
            "emoji-xxy": {serviceId: "-1992227899785330385", name: "\u718a\u5c0f\u6613"},
            "emoji-devilfish": {serviceId: "-8386241936569083172", name: "\u7ae0\u5c0f\u5446"},
            "emoji-chuck": {serviceId: "1464586960077334041", name: "Chuck"},
            "emoji-hmjz": {serviceId: "135846528945632654", name: "\u9ed1\u732b\u7d27\u5f20", isVipChartlet: !0},
            "emoji-ajks": {serviceId: "-1625481639856263102", name: "\u963f\u9e21\u778c\u7761", isVipChartlet: !0},
            "emoji-ajdq": {serviceId: "124892632014525863", name: "\u963f\u9e21\u9053\u6b49", isVipChartlet: !0},
            "emoji-xkbxxy": {
                serviceId: "-254196325722531562",
                name: "\u70ab\u9177\u7248\u718a\u5c0f\u6613",
                isVipChartlet: !0
            },
            "emoji-qxbxxy": {
                serviceId: "-415263323021479526",
                name: "\u60c5\u7eea\u7248\u718a\u5c0f\u6613",
                isVipChartlet: !0
            },
            "emoji-nn": {serviceId: "3078661434760529106", name: "\u599e\u599e", isVipChartlet: !0},
            "emoji-ajmd": {serviceId: "2135760413373753738", name: "\u963f\u9e21\u7c73\u5fb7", isVipChartlet: !0},
            "emoji-lt": {serviceId: "203157885695415236", name: "\u96f7\u5154", isVipChartlet: !0},
            "emoji-zdz": {serviceId: "-265263251458754526", name: "\u7ae0\u5927\u5634", isVipChartlet: !0}
        },
        fillConfig: {
            "emoji-free": {page_1: 84, page_2: 84, page_1_fix: 0},
            "emoji-chartlet": {page_1: 14, page_1_bought: 21, page_2: 21, page_1_fix: 14, page_1_bought_fix: 0}
        },
        visibleHeight: {"emoji-free": 238.5, "emoji-chartlet": 177.5}
    };
    var s = null;
    return {
        getInstance: function (a, b) {
            if (s) {
                s.resetData(b);
                return s
            }
            s = new r(a, b);
            return s
        }
    }
});
define("utils/PagerScroll", function (a, b, c) {
    var d = a("lib/jquery"), e = a("basic/Class"), f = e.extend({
        init: function (a, b) {
            this.$elem = d(a);
            if (this.$elem.data("initPagerScroll") !== "1") {
                this.$scrollbar = d(b.scrollbar), this.$content = d(b.content), this.$pageNumElem = d(b.pageNumElem), this.config = b || {}, this.innerHeight = b.visibleHeight || this.$elem.innerHeight(), this.scrollHeight = this.fixHeight();
                var c = this.totalPage = Math.round(this.scrollHeight / this.innerHeight);
                if (c === 1)return;
                this.currentPage = 1, this.isAnimating = !1, this.containerTimeout = null, this.scrollbarTimeout = null, this.maxContentScrollRange = this.scrollHeight - this.innerHeight, this.contentScrollUnit = this.maxContentScrollRange / c, this.maxPageNumElemPosition = this.innerHeight - this.$pageNumElem.height() / 2, this.queueAnimation = [], this.initScrollbar(), this.$elem.attr("initPagerScroll", "1"), this.scrollCallback(), this.bindEvent()
            }
        }, fixHeight: function () {
            var a = this.$content.height();
            if (a % this.innerHeight !== 0 && Math.abs(a - this.innerHeight) > 1) {
                var b = Math.ceil(a / this.innerHeight) * this.innerHeight;
                this.$content.height(b);
                return b
            }
            return a
        }, initScrollbar: function () {
            var a = this.scrollHeight;
            this.$scrollbar.html('<div style="height:' + a + 'px;"></div>').removeClass("hidden").show(), this.$scrollbar.height(this.innerHeight)
        }, bindEvent: function () {
            this.$elem.bind("DOMMouseScroll mousewheel", d.proxy(this.onContainerScroll, this));
            var a = this, b = this.$scrollbar;
            b.bind("hover", function (c) {
                c.type === "mouseenter" ? (b.bind("scroll", d.proxy(a.onScrollBar, a)), a.isOverScrollbar = !0, a.setPageElemPosition()) : (a.isOverScrollbar = !1, b.unbind("scroll", d.proxy(a.onScrollBar, a)), a.setPageElemPosition())
            }), b.bind("mouseup", function (b) {
                a.fixScrollbarPosition()
            })
        }, onContainerScroll: function (a) {
            this.containerTimeout && clearTimeout(this.containerTimeout);
            var b = this.fixDelta(a), c = this;
            this.containerTimeout = setTimeout(function () {
                c.containerTimeout && clearTimeout(c.containerTimeout);
                var a = c.$elem, d = c.$scrollbar, e = f.DEFAULT.duration, g = c.scrollHeight, h = c.innerHeight, i = c.maxContentScrollRange, j = b > 0 ? "up" : "down", k = j === "up" && a.scrollTop() === 0 || j === "down" && a.scrollTop() === i;
                if (!k && !c.isAnimating && a.scrollTop() >= 0 && a.scrollTop() <= i) {
                    c.isAnimating = !0;
                    var l = a.scrollTop() - h * b / 120;
                    if (j === "down")var l = l > i ? i : l; else var l = l < 0 ? 0 : l;
                    c.playAnimate(a, {scrollTop: l + "px"}, e, function () {
                        c.currentPage = Math.round(a.scrollTop() / h) + 1, c.scrollCallback(), c.setPageElemPosition()
                    }), c.playAnimate(d, {scrollTop: l + "px"}, e, function () {
                        c.isAnimating = !1
                    })
                }
            }, 80);
            return !1
        }, fixDelta: function (a) {
            var b = a.originalEvent.wheelDelta || a.originalEvent.detail, c = d.browser;
            c.mozilla && (b = -b * 120), c.safari && (b = b * 10);
            return b
        }, onScrollBar: function (a) {
            this.scrollbarTimeout && clearTimeout(this.scrollbarTimeout);
            var b = this;
            this.scrollbarTimeout = setTimeout(function () {
                b.scrollbarTimeout && clearTimeout(b.scrollbarTimeout);
                var a = b.$elem, c = b.contentScrollUnit, d = b.innerHeight, e = b.maxContentScrollRange, g = b.$scrollbar.scrollTop(), h = !(g > (b.currentPage - 1) * c && g < b.currentPage * c);
                if (!b.isAnimating && h) {
                    b.isAnimating = !0;
                    var i = (d + g) / d, j = Math.round(i - 1) * d;
                    j = j > e ? e : j, b.playAnimate(a, {scrollTop: j + "px"}, f.DEFAULT.duration, function () {
                        b.isAnimating = !1, b.currentPage = Math.round(a.scrollTop() / d) + 1, b.setPageElemPosition(), b.scrollCallback(), b.animationQueue()
                    })
                }
            }, 30)
        }, scrollCallback: function () {
            this.config.scrollCallback && this.config.scrollCallback({
                currentPage: this.currentPage,
                totalPage: this.totalPage
            })
        }, setPageElemPosition: function () {
            this.$pageNumElem.removeClass("hidden").show().css({top: this.maxPageNumElemPosition * this.currentPage / this.totalPage - this.innerHeight / this.totalPage / 2}), this.hidePageElem()
        }, hidePageElem: function () {
            this.pageElemTimeout && clearTimeout(this.pageElemTimeout);
            if (!this.isOverScrollbar) {
                var a = this;
                this.pageElemTimeout = setTimeout(function () {
                    a.pageElemTimeout && clearTimeout(a.pageElemTimeout), a.$pageNumElem.fadeOut(500, function () {
                    })
                }, 1e3)
            }
        }, playAnimate: function (a, b, c, e) {
            d(a).animate(b, c, function () {
                e && e()
            })
        }, fixScrollbarPosition: function () {
            if (!this.isAnimating) {
                var a = this;
                this.isAnimating = !0, this.playAnimate(this.$scrollbar, {scrollTop: (this.currentPage - 1) * this.innerHeight + "px"}, 50, function () {
                    a.isAnimating = !1
                })
            } else this.queueAnimation.push(d.proxy(arguments.callee, this))
        }, animationQueue: function () {
            var a = d.Deferred(), b = this;
            a.done(this.queueAnimation).done(function () {
                b.queueAnimation = []
            }), a.resolve()
        }
    });
    f.DEFAULT = {duration: 200};
    return f
});
define("sendbox/widget/EmotionAction", function (a, b, c) {
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/DataSource"), g = a("utils/Error"), h = {
        doChartlet: function (a, b) {
            if (!d.isPlainObject(this.charletRequest) || this.charletRequest.readyState === 4) {
                var c = this;
                this.charletRequest = f.setTrigger(b).postJSON("sendMess", this.getParams(a), function (a) {
                    g.showTips({json: a, triggerElem: b}) || c.$elem.trigger("chartlet:send:success", [a])
                }).error(function (a) {
                    c.$elem.trigger("charlet:send:error", [a])
                })
            }
        }
    };
    return h
});
define("widget/box/floatBox/BuyConfirmBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/Utils"), g = a("utils/widget/Counter"), h = a("utils/tmpl"), i = a("utils/Error"), j = a("utils/DataSource"), k = a("utils/Log"), l = a("model/UserAccount"), m = a("model/UserData"), n = a("widget/box/floatBox/TipsBox"), o = a("widget/box/floatBox/PayConfirmBox"), p = d(document.body), q = e.extend({
        defaults: {
            isBlankTab: !1,
            successText: "\u8d2d\u4e70\u6210\u529f\uff01",
            isShowCaution: !1,
            cautionText: "",
            isShowSubBtn: !1,
            subBtnText: "",
            payBtnText: "\u7acb\u5373\u652f\u4ed8",
            logName: ""
        }, init: function (a, b) {
            this._super(a, b), this.config = d.extend({}, this.defaults, b), this.data = this.config.data || {}, this.userAccount = b.userAccount || {}
        }, parseData: function () {
            var a = {data: d.extend({}, this.data), userAccount: this.userAccount, loginUser: m.getLoginUser()};
            a.isBlankTab = this.config.isBlankTab, this.config.isShowCaution && (a.caution = {text: this.config.cautionText}), this.config.isShowSubBtn && (a.subBtn = {text: this.config.subBtnText}), a.payBtnText = this.config.payBtnText, a.isGiftBox = this.config.isGiftBox, a.data.serviceDescription = g.subString(a.data.serviceDescription, 12, !0);
            return a
        }, preRender: function () {
            return {
                title: "\u8d2d\u4e70\u670d\u52a1\u786e\u8ba4",
                bodyContent: h.formatTemplate(a("template/floatbox/buyConfirmBox"), this.parseData())
            }
        }, bindEvent: function () {
            this._super(), this.$elem.delegate(".pay-trigger", "click", d.proxy(this.onSubmit, this)), this.$elem.delegate(".charge-trigger", "click", d.proxy(this.onCharge, this)), this.$elem.delegate(".chargermb-trigger", "click", d.proxy(this.onChargermb, this)), this.$elem.delegate(".js-buy-pay dd", "click", d.proxy(this.onPaySelect, this)), this.config.isShowSubBtn && this.$elem.delegate(".subBtn-trigger", "click", d.proxy(this.onSubBtn, this))
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-buy"), this.resetPay()
        }, onClose: function () {
            this.hide();
            var a = parseFloat(this.userAccount.totalBalance) >= parseFloat(this.data.dealAmount);
            this.config.closeCallBack && this.config.closeCallBack(a)
        }, onSubmit: function (a) {
            if (!d.isPlainObject(this.request) || this.request.readyState === 4) {
                var b = this.parseParams(), c = this;
                this.request = j.postJSON("payDeal", b, function (b) {
                    i.showTips({
                        json: b,
                        evt: a
                    }) ? c.config.error && (c.hide(), c.config.error({})) : (b.userAccount && l.update(b.userAccount), c.hide(), c.onSuccess(b))
                }), k.doLog({parameter: {method: "buy" + this.config.logName}, elem: "body"})
            }
        }, parseParams: function () {
            var a = {};
            a.dealId = this.data.id, this.config.params && d.extend(a, this.config.params);
            return a
        }, onSuccess: function (a) {
            var b = this, c = new n(null, {data: {type: "correct", text: this.config.successText}});
            c.show(), c.delayHide(2e3), setTimeout(function () {
                b.config.successCallBack && b.config.successCallBack(a)
            }, 2300)
        }, onCharge: function (a) {
            var b = this;
            setTimeout(function () {
                b.config.isBlankTab && b.config.redirectCallBack && b.config.redirectCallBack()
            }, 100), k.doLog({parameter: {method: "tocharge" + this.config.logName}, elem: "body"})
        }, onChargermb: function (a) {
            var b = this, c = this.$elem.find(".js-dealId").val(), e = d(a.target).data("target");
            j.ajax("saveNewOrderForDeal", {
                async: !1, type: "post", data: {dealId: c}, success: function (d) {
                    var e = parseInt(d.code) || 1;
                    i.Tips(e, a) || (d.sess_valid ? b.onChargermbSuccess(d, c) : (b.hide(), p.trigger("error", ["payLoginAgain", {
                        session: d,
                        callback: function () {
                            b.show()
                        }
                    }])))
                }
            }), k.doLog({parameter: {method: "buy" + this.config.logName}, elem: "body"})
        }, onChargermbSuccess: function (a, b) {
            var c = this.$elem.find(".js-from"), d = this.$elem.find(".js-chargeId");
            d.val(a.chargeId), c.submit();
            var e = b ? "/pay/expenseBill?dealId=" + b : "/pay/chargeBill?chargeId=" + a.chargeId, f = b ? "paycharged" : "charged";
            this.hide(), this.showPayConfirmBox({
                jumpUrl: e,
                method: f,
                buytype: "rmb",
                dealId: b,
                logName: this.config.logName
            })
        }, showPayConfirmBox: function (a) {
            var b = new o(null, a);
            b.show()
        }, onSubBtn: function () {
            this.hide(), this.config.subBtnCallBack && this.config.subBtnCallBack()
        }, onPaySelect: function (a) {
            this.$lastSelect && this.$lastSelect.removeClass("current"), this.setSelectPay(d(a.currentTarget));
            if (!d(a.target).is("input[type=radio]"))return !1
        }, setSelectPay: function (a) {
            a.addClass("current"), a.find("input[type=radio]").prop("checked", !0), this.$lastSelect = a, this.$elem.find(".js-from .js-payId").val(a.find("input[type=radio]").val())
        }, resetPay: function () {
            this.setSelectPay(this.$elem.find(".js-buy-pay .js-default"))
        }
    });
    return q
});
define("widget/box/floatBox/PayConfirmBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/tmpl"), g = a("utils/Error"), h = a("utils/DataSource"), i = a("utils/Log"), j = d(document.body), k = e.extend({
        init: function (a, b) {
            this._super(a, b), this.data.type = "warning", this.data.content = "\u8bf7\u5728\u65b0\u6253\u5f00\u7684\u7f51\u6613\u5b9d\u9875\u9762\u4e2d\u5b8c\u6210\u4ed8\u6b3e", this.data.jumpUrl = b.jumpUrl || "/pay/chargeBill", this.data.from = b.from || "", this.data.dealId = b.dealId
        }, preRender: function () {
            return {
                title: "\u786e\u8ba4\u4ed8\u6b3e",
                bodyContent: f.formatTemplate(a("template/floatbox/payConfirmBox"), d.extend({}, this.data))
            }
        }, bindEvent: function () {
            this._super(), this.$elem.delegate(".submit-trigger", "click", d.proxy(this.onSubmit, this)), this.$elem.delegate(".repay-trigger", "click", d.proxy(this.onRepay, this))
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-payVerify")
        }, onSubmit: function (a) {
            i.doLog({parameter: {method: this.config.method}, elem: d(a.currentTarget)});
            var b = this;
            setTimeout(function () {
                b.config.buytype == "rmb" ? location.reload() : window.location.href = d(a.currentTarget).data("href")
            }, 100)
        }, onRepay: function (a) {
            var b = d(a.target).data("from");
            b !== "chargePage" ? this.onRepayrmb(a) : this.$elem.trigger("payConfirm:chargeRepay", [1, this])
        }, onRepayrmb: function (a) {
            var b = this.$elem.find(".js-from"), c = this.$elem.find(".js-chargeId"), e = this.$elem.find(".js-dealId").val();
            h.ajax("saveNewOrderForDeal", {
                async: !1, type: "post", data: {dealId: e}, success: function (d) {
                    var e = parseInt(d.code) || 1;
                    g.Tips(e, a) || (c.val(d.chargeId), b.submit())
                }
            }), i.doLog({parameter: {method: "buy" + this.config.logName}, elem: d(a.currentTarget)})
        }, onTrouble: function (a) {
            this.delayHide(500)
        }
    });
    return k
});
define("template/floatbox/payConfirmBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer-bd"><div class="poplayer-messbox"><span class="poplayer-mess">'), type === "warning" && p.push('<em class="icon-warning-b"></em>'), p.push("", content, "</span></div>"), typeof desc != "undefined" && desc !== "" && p.push('<p class="poplayer-desc">', desc, "</p>"), p.push('<p class="poplayer-desc">\u4ed8\u6b3e\u9047\u5230\u95ee\u9898\uff0c\u67e5\u770b<a class="link-lightBlue poplayer-link" href="/help/faq?pageNav=charge" target="_blank" data-method="payitem">\u4ed8\u6b3e\u5e2e\u52a9</a></p><p class="poplayer-desc">\u5df2\u5b8c\u6210\u4ed8\u6b3e\uff0c\u53ef\u67e5\u770b<a class="link-lightBlue poplayer-link" href="', jumpUrl, '" target="_blank">\u6d88\u8d39\u8ba2\u5355</a></p></div><div class="poplayer-ft"><div class="poplayer-btn"><a class="btn btn-red submit-trigger" href="javascript:;" data-href="', jumpUrl, '">\u5df2\u5b8c\u6210\u4ed8\u6b3e</a><a class="btn btn-gray repay-trigger" href="javascript:;" data-method="payitem" '), from == "chargePage" && p.push('data-from="chargePage"'), p.push(">\u91cd\u65b0\u4ed8\u6b3e</a></div></div>"), from || p.push('<form class="js-from" method="post" action="/pay/submitCharge" target="_blank"><input class="js-chargeId" type="hidden" name="chargeId" value=""/><input class="js-dealId" type="hidden" name="dealId" value="', dealId, '"/></form>'), p.push("");
        return p.join("")
    }
});
define("template/floatbox/buyConfirmBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) {
            p.push("");
            var isEnough = parseFloat(userAccount.totalBalance) >= parseFloat(data.dealAmount), rmbTotalBalance = userAccount.totalBalance / 10, needToPay = (data.rmb * 10 - userAccount.totalBalance) / 10, isPayByRMB = data.service.buyType == 1 ? !0 : !1;
            p.push('<div class="poplayer-bd js-body"><p class="poplayer-mt">\u8d2d\u4e70\u670d\u52a1\uff1a', data.serviceName, '<span class="text-md f12">\u660e\u7ec6\uff1a', data.serviceDescription, "</span></p><p>\u670d\u52a1\u4ef7\u683c\uff1a"), isPayByRMB ? (p.push('<b class="text-red">', data.rmb, "</b>\u5143"), typeof data.originalRmb != "undefined" && data.originalRmb > data.rmb && p.push('<span class="text-gray ui-tLT mL7">\u539f\u4ef7', data.originalRmb, "\u5143</span>"), p.push("")) : (p.push('<b class="text-red">', data.dealAmount, "</b>\u4e2a\u82b1\u7530\u5e01"), data && "rmb" in data && p.push("\uff08", data.rmb, "\u5143\uff09"), p.push("")), p.push("</p><p>\u6211\u7684\u4f59\u989d\uff1a"), isPayByRMB ? (p.push('<b class="text-red">', rmbTotalBalance, "</b>\u5143"), userAccount.totalBalance != 0 && p.push("\uff08", userAccount.totalBalance, "\u4e2a\u82b1\u7530\u5e01\uff09"), p.push("")) : (p.push('<b class="text-red">', userAccount.totalBalance, "</b>\u4e2a\u82b1\u7530\u5e01\uff08", rmbTotalBalance, "\u5143\uff09"), isEnough || p.push('<span class="poplayer-buy-surplus text-red">\u4f59\u989d\u4e0d\u8db3</span>'), p.push("")), p.push("</p>"), isPayByRMB && !isEnough && p.push('<p>\u8fd8\u9700\u652f\u4ed8\uff1a<b class="text-red">', needToPay, "</b>\u5143</p>"), p.push(""), !isEnough && isPayByRMB && p.push('<dl class="poplayer-buy-pay js-buy-pay clearfix"><dt>\u9009\u62e9\u652f\u4ed8\u65b9\u5f0f\uff1a</dt><dd class="js-default current"><input type="radio" checked="checked" name="paymentChannel" class="form-radio" value="0023" id="bank_0023"><label class="form-radio-label" for="bank_0023"><i class="pay-icon-s pay-icon-alipay"></i><i class="bank-name">\u652f\u4ed8\u5b9d</i></label></dd><dd><input type="radio" name="paymentChannel" class="form-radio" value="0180" id="bank_mobileCard"><label class="form-radio-label" for="bank_mobileCard"><i class="pay-icon-s pay-icon-mobileCard"></i><i class="bank-name">\u624b\u673a\u5145\u503c\u5361</i></label></dd><dd><input type="radio" name="paymentChannel" class="form-radio" value="" id="bank_epay"><label class="form-radio-label" for="bank_epay"><i class="pay-icon-s pay-icon-163pay"></i><i class="bank-name">\u94f6\u8054\u5feb\u4ed8</i></label></dd></dl>'), p.push('</div><div class="poplayer-ft">'), typeof caution != "undefined" && isEnough && p.push('<p class="poplayer-buy-caution">', caution.text, "</p>"), p.push('<div class="poplayer-btn">'), typeof subBtn != "undefined" && !isEnough && p.push('<a class="btn btn-gray subBtn-trigger" href="javascript:;">', subBtn.text, "</a>"), p.push(""), isEnough ? p.push('<a class="btn btn-red pay-trigger" href="javascript:;">', payBtnText, "</a>") : (p.push(""), isPayByRMB ? (p.push('<a class="btn btn-red chargermb-trigger" '), isBlankTab && p.push('data-target="_blank"'), p.push('href="javascript:;">', payBtnText, "</a>")) : (p.push('<a class="btn btn-red charge-trigger" '), isBlankTab && p.push('target="_blank"'), p.push('href="/pay/charge?dealId=', data.id, '">\u53bb\u5145\u503c</a>')), p.push("")), p.push("</div></div>"), isPayByRMB && p.push('<form class="js-from" method="post" action="/pay/submitCharge" target="_blank"><input class="js-chargeId" type="hidden" name="chargeId" value="" /><input class="js-dealId" type="hidden" name="dealId" value="', data.id, '" /><input class="js-payId" type="hidden" name="paymentChannel" value="" /></form>'), p.push("")
        }
        return p.join("")
    }
});
define("widget/RollSlider", function (a, b, c) {
    var d = a("lib/jquery"), e = a("basic/Class"), f = e.extend({
        current: 0,
        lastSlider: 0,
        timer: null,
        slideWidth: 0,
        slideCount: 0,
        reelWidth: 0,
        DEFAULT: {
            autoplay: !0,
            interval: 2e3,
            duration: 500,
            reelContainer: "",
            slideItem: "",
            prevBtn: "",
            nextBtn: "",
            pageItem: "",
            disabled: "disabled",
            loopScroll: !1,
            rollCallback: null,
            rollBefore: null,
            transition: null,
            transitionDura: 0,
            btnLockTime: 0
        },
        init: function (a, b) {
            this.$elem = d(a), this.config = d.extend({}, this.DEFAULT, b), this.$pageItems = this.$elem.find(this.config.pageItem), this.resize(), this.rollSwitch(), this.bindEvent(), this.setPager()
        },
        resize: function () {
            this.slideWidth = this.$elem.find(this.config.slideItem).width(), this.slideCount = this.$elem.find(this.config.slideItem).size(), this.reelWidth = this.slideWidth * this.slideCount, this.$elem.find(this.config.reelContainer).css({
                width: this.reelWidth,
                position: "absolute"
            })
        },
        bindEvent: function () {
            var a = this.config;
            a.prevBtn && this.$elem.delegate(a.prevBtn, "click", d.proxy(this.onPagePrev, this)), a.nextBtn && this.$elem.delegate(a.nextBtn, "click", d.proxy(this.onPageNext, this)), a.pageItem && this.$elem.delegate(a.pageItem, "click", d.proxy(this.onPageClick, this))
        },
        onPagePrev: function (a) {
            var b = this.config, c = b.disabled, e = this.current;
            if (!!b.loopScroll || !!this.canPrev)this.prevTimer && clearTimeout(this.prevTimer), this.prevTimer = setTimeout(d.proxy(function () {
                clearInterval(this.timer), this.doRollBefore(e), this.lastSlider = this.current, this.current -= 1, this.current < 0 && (b.loopScroll ? this.current = this.slideCount - 1 : this.current = 0), this.setPager();
                var a = this;
                this.playTransition(function () {
                    a.roll(!0), a.rollSwitch()
                })
            }, this), b.btnLockTime)
        },
        onPageNext: function (a) {
            var b = this.config, c = b.disabled, e = this.current;
            if (!!b.loopScroll || !!this.canNext)this.nextTimer && clearTimeout(this.nextTimer), this.nextTimer = setTimeout(d.proxy(function () {
                clearInterval(this.timer), this.doRollBefore(e), this.lastSlider = this.current, this.current += 1, this.current > this.slideCount - 1 && (b.loopScroll ? this.current = 0 : this.current = this.slideCount - 1), this.setPager();
                var a = this;
                this.playTransition(function () {
                    a.roll(!0), a.rollSwitch()
                })
            }, this), b.btnLockTime)
        },
        onPageClick: function (a) {
            var b = d(a.currentTarget), c = b.prevAll(this.config.pageItem).size(), e = this.current;
            if (c !== this.current) {
                this.doRollBefore(e), this.lastSlider = b.siblings(".current").prevAll(this.config.pageItem).size(), this.current = c, clearInterval(this.timer), this.setPager();
                var f = this;
                this.playTransition(function () {
                    f.roll(!0), f.rollSwitch()
                })
            }
        },
        roll: function (a, b) {
            this.doRollCallback();
            var c = this.current, d = this.config;
            typeof b != "undefined" && (c = this.current = b);
            var e = this, f = c * this.slideWidth;
            a ? this.$elem.find(d.reelContainer).animate({left: -f}, d.duration) : this.$elem.find(d.reelContainer).css({left: -f})
        },
        rollTo: function (a, b) {
            this.roll(a, b), this.setPager()
        },
        doRollCallback: function () {
            this.config.rollCallback && this.config.rollCallback(this.current, {lastSlider: this.lastSlider})
        },
        doRollBefore: function (a) {
            this.config.rollBefore && this.config.rollBefore(a)
        },
        setPager: function () {
            var a = this.$elem.find(this.config.prevBtn), b = this.$elem.find(this.config.nextBtn), c = this.$pageItems, d = this.config.disabled;
            c.size() && (c.filter(".current").removeClass("current"), c.eq(this.current).addClass("current"));
            if (this.slideCount === 1)a.addClass(d), b.addClass(d), this.canPrev = this.canNext = !1; else {
                if (this.current === this.slideCount - 1) {
                    a.removeClass(d), b.addClass(d), this.canPrev = !0, this.canNext = !1;
                    return
                }
                if (this.current === 0) {
                    a.addClass(d), b.removeClass(d), this.canPrev = !1, this.canNext = !0;
                    return
                }
                this.canPrev = this.canNext = !0, a.removeClass(d), b.removeClass(d)
            }
        },
        playTransition: function (a) {
            var b = this.config;
            if (b.transition) {
                var c = this;
                b.transition(this.current), setTimeout(function () {
                    a()
                }, b.transitionDura)
            } else a()
        },
        rollSwitch: function () {
            var a = this;
            !this.config.autoplay || (a.timer = setInterval(function () {
                a.onPageNext()
            }, this.config.interval))
        }
    });
    return f
});
define("template/sendbox/widget/emotionItem", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) {
            p.push("");
            if (emotion.length || emotion.list && emotion.list.length) {
                p.push("");
                if (type === "emoji-free") {
                    p.push("");
                    for (var i = 0; i < emotion.length; i++)p.push('<li class="js-normalEmotion emotion-item" data-code="', emotion[i].content, '"><i class="n-emoji-valign"></i><img src="', emotion[i].url, '" title="', emotion[i].title, '" alt="', emotion[i].title, '" /></li>');
                    p.push("");
                    if (fillNums > 0) {
                        p.push("");
                        for (var i = 0; i < fillNums; i++)p.push("<li></li>");
                        p.push("")
                    }
                    p.push("")
                } else {
                    p.push("");
                    for (var i = 0; i < emotion.list.length; i++)p.push('<li class="js-paidEmotion emotion-item" data-code="', emotion.list[i].code, '"><i class="n-emoji-valign"></i><img src="', emotion.list[i].url, '" title="', emotion.list[i].title, '" alt="', emotion.list[i].title, '" />'), isVip || (p.push(""), emotion.list[i].free === !0 ? p.push('<em class="icon-try"></em>') : p.push('<em class="icon-lock"></em>'), p.push("")), p.push("</li>");
                    p.push("");
                    if (fillNums > 0) {
                        p.push("");
                        for (var i = 0; i < fillNums; i++)p.push("<li></li>");
                        p.push("")
                    }
                    p.push("")
                }
                p.push("")
            } else p.push("\u83b7\u53d6\u6570\u636e\u5931\u8d25");
            p.push("")
        }
        return p.join("")
    }
});
define("template/sendbox/widget/chartletBtn", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) {
            p.push("");
            var btnStatus = 1, myPermission = json.myPermission, price = json.price;
            price === 0 && (isVip ? btnStatus = 8 : myPermission ? btnStatus = 6 : btnStatus = 5), isVipChartlet && (isVip ? btnStatus = 8 : myPermission ? btnStatus = 8 : btnStatus = 7), p.push('<div class="winlayer-emoji-price text-dark-gray">'), isVipChartlet ? (p.push(""), isVip ? p.push('<span class="text-red"><em class="icon-v"></em>\u60a8\u662f\u82b1\u7530\u4f1a\u5458\uff0c\u53ef\u4f7f\u7528\u8be5\u8d34\u7eb8</span>') : (p.push(""), myPermission ? p.push("\u60a8\u5df2\u8d2d\u4e70\u8be5\u8d34\u7eb8") : p.push("\u5168\u5957", name, '\u8d34\u7eb8\uff1a<span class="text-red">\u5f00\u901a\u4f1a\u5458\u65b9\u53ef\u4f7f\u7528</span>'), p.push("")), p.push("")) : (p.push(""), price == 0 && (p.push(""), isVip ? p.push('<span class="text-red"><em class="icon-v"></em>\u60a8\u662f\u82b1\u7530\u4f1a\u5458\uff0c\u53ef\u4f7f\u7528\u8be5\u8d34\u7eb8</span>') : p.push("\u5168\u5957", name, '\u8d34\u7eb8\uff1a<span class="text-red">\u9650\u65f6\u514d\u8d39</span>'), p.push("")), p.push("")), p.push('</div><div class="winlayer-emoji-btnBox n-btn-box js-btnBox">'), btnStatus === 1 ? p.push("") : btnStatus === 5 ? p.push('<a class="btn btn-red get-trigger" href="javascript:;">\u514d\u8d39\u9886\u53d6</a>') : btnStatus === 6 ? p.push('<span class="text-gray">\u5df2\u9886\u53d6</span>') : btnStatus === 7 ? p.push('<a class="btn btn-red" href="/pay/services" target="_blank" data-log="stickerOpen">\u5f00\u901a\u4f1a\u5458</a>') : btnStatus === 8 && p.push('<span class="text-gray">\u53ef\u4f7f\u7528</span>'), p.push("</div>")
        }
        return p.join("")
    }
});
define("template/sendbox/widget/emotion", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) {
            p.push('<div class="winlayer winlayer-emoji"><a class="icon-close close-trigger" title="\u5173\u95ed" href="javascript:;"></a><em class="icon-winlayer-arrowUp js-arrowUp"></em><div class="winlayer-emoji-wrapper js-emotionCon">'), typeof belongTo == "undefined" || belongTo != "pubTopic" && belongTo != "topic" ? p.push('<div class="sliderBox winlayer-emoji-tab-sliderBox js-sliderBox"><a class="slider-prev disabled prev-trigger" href="javascript:;"><em class="icon-slider-prev-m">\u4e0a\u4e00\u9875</em></a><a class="slider-next next-trigger" href="javascript:;"><em class="icon-slider-next-m">\u4e0b\u4e00\u9875</em></a><div class="slider-content"><ul class="slider-list js-list" style="left: 0; width: 750px;"><li class="slider-item js-sliderItem"><ul class="winlayer-emoji-tab"><li class="js-tabItem" data-target="emoji-free"><a href="javascript:;" title="\u514d\u8d39\u8868\u60c5"><em class="icon-emoji-free">\u514d\u8d39\u8868\u60c5</em></a></li><li class="js-tabItem" data-target="emoji-xxy"><a href="javascript:;" title="\u718a\u5c0f\u6613"><em class="icon-emoji-xxy">\u718a\u5c0f\u6613</em></a></li><li class="js-tabItem" data-target="emoji-devilfish"><a href="javascript:;" title="\u7ae0\u5c0f\u5446"><em class="icon-emoji-devilfish">\u7ae0\u5c0f\u5446</em></a></li><li class="js-tabItem" data-target="emoji-chuck"><a href="javascript:;" title="Chuck"><em class="icon-emoji-chuck">Chuck</em></a></li><li class="js-tabItem" data-target="emoji-hmjz"><a href="javascript:;" title="\u9ed1\u732b\u7d27\u5f20"><em class="icon-emoji-hmjz">\u9ed1\u732b\u7d27\u5f20</em></a></li></ul></li><li class="slider-item js-sliderItem"><ul class="winlayer-emoji-tab"><li class="js-tabItem" data-target="emoji-ajks"><a href="javascript:;" title="\u963f\u9e21\u778c\u7761"><em class="icon-emoji-ajks">\u963f\u9e21\u778c\u7761</em></a></li><li class="js-tabItem" data-target="emoji-ajdq"><a href="javascript:;" title="\u963f\u9e21\u9053\u6b49"><em class="icon-emoji-ajdq">\u963f\u9e21\u9053\u6b49</em></a></li><li class="js-tabItem" data-target="emoji-xkbxxy"><a href="javascript:;" title="\u70ab\u9177\u7248\u718a\u5c0f\u6613"><em class="icon-emoji-xkbxxy">\u70ab\u9177\u7248\u718a\u5c0f\u6613</em></a></li><li class="js-tabItem" data-target="emoji-qxbxxy"><a href="javascript:;" title="\u60c5\u7eea\u7248\u718a\u5c0f\u6613"><em class="icon-emoji-qxbxxy">\u60c5\u7eea\u7248\u718a\u5c0f\u6613</em></a></li><li class="js-tabItem" data-target="emoji-nn"><a href="javascript:;" title="\u599e\u599e"><em class="icon-emoji-nn">\u599e\u599e</em></a></li></ul></li><li class="slider-item js-sliderItem"><ul class="winlayer-emoji-tab"><li class="js-tabItem" data-target="emoji-ajmd"><a href="javascript:;" title="\u963f\u9e21\u7c73\u5fb7"><em class="icon-emoji-ajmd">\u963f\u9e21\u7c73\u5fb7</em></a></li><li class="js-tabItem" data-target="emoji-lt"><a href="javascript:;" title="\u96f7\u5154"><em class="icon-emoji-lt">\u96f7\u5154</em></a></li><li class="js-tabItem" data-target="emoji-zdz"><a href="javascript:;" title="\u7ae0\u5927\u5634"><em class="icon-emoji-zdz">\u7ae0\u5927\u5634</em></a></li></ul></li></ul></div></div>') : p.push('<div class="sliderBox winlayer-emoji-tab-sliderBox"><div class="slider-content"><ul class="slider-list js-list" style="left: 0; width: 750px;"><li class="slider-item js-sliderItem"><ul class="winlayer-emoji-tab"><li class="js-tabItem" data-target="emoji-free"><a href="javascript:;" title="\u514d\u8d39\u8868\u60c5"><em class="icon-emoji-free">\u514d\u8d39\u8868\u60c5</em></a></li></ul></li></ul></div></div>'), p.push('<div class="winlayer-emoji-free js-panel"><em class="winlayer-emoji-scrollbar-tips icon-scrollbar-tips hidden js-pageNum"><span class="js-page">1/1</span></em><div class="winlayer-emoji-scrollbar ui-scrollbar hidden js-scrollbar"></div><div class="winlayer-emoji-content js-container"><div class="winlayer-emoji-content-inner js-content"><ul class="winlayer-emoji-list clearfix"></ul></div></div><p class="winlayer-emoji-tips text-gray">\u63d0\u793a\uff1a\u6309', isMacOS ? "Command" : "Ctrl", "\u53ef\u4ee5\u4e00\u6b21\u591a\u9009\u8868\u60c5</p></div>");
            var chartletConfig = [{
                className: "winlayer-emoji-xxy",
                name: "\u718a\u5c0f\u6613",
                desc: "\u4ed6\u662f\u7231\u5e7b\u60f3\u7231\u8868\u73b0\u7684\u5c0f\u767d\u718a\uff0c\u6709\u4e2a\u4eba\u82f1\u96c4\u4e3b\u4e49\u60c5\u7ed3\uff0c\u52aa\u529b\u60f3\u6210\u4e3a\u4f17\u4eba\u7684\u7126\u70b9\u3002\u4ed6\u4e50\u89c2\u5411\u4e0a\uff0c\u5de5\u4f5c\u52aa\u529b\uff0c\u4ed6\u538c\u5026\u5b64\u72ec\u6e34\u671b\u7231\u60c5\u964d\u4e34\u3002"
            }, {
                className: "winlayer-emoji-devilfish",
                name: "\u7ae0\u5c0f\u5446",
                desc: "\u7ae0\u5c0f\u5446\u662f\u6761\u8def\u75f4\u5c0f\u7ae0\u9c7c\uff0c\u8155\u8db3\u592a\u591a\u7ecf\u5e38\u4f1a\u628a\u81ea\u5df1\u7eca\u5012\u3002\u5b83\u5584\u826f\u6015\u7f9e\uff0c\u53d7\u5230\u60ca\u5413\u4f1a\u6002\uff0c\u4f46\u5343\u4e07\u4e0d\u8981\u60f9\u6012\u5b83\uff0c\u5b83\u4f1a\u53d8\u6210\u7ea2\u8272\u7684\u7ae0\u9c7c\u5c0f\u4e38\u5b50\u3002"
            }, {
                className: "winlayer-emoji-chuck",
                name: "Chuck",
                desc: "\u6f6e\u4ebaChuck\u662f\u4e00\u4e2a\u666e\u901a\u5c0f\u767d\u9886\uff0c\u7231\u81ed\u5c41\u641e\u602a\uff0c\u4f46\u6e29\u67d4\u6d6a\u6f2b\u53c8\u8d34\u5fc3\uff0c\u4ed6\u7684\u751f\u6d3b\u603b\u662f\u5145\u6ee1\u9633\u5149\u4e0e\u4fe1\u5fc3\uff0c\u4e0e\u4ed6\u5728\u4e00\u8d77\u4f1a\u7279\u522b\u5feb\u4e50\u5e78\u798f\u3002"
            }, {
                className: "winlayer-emoji-hmjz",
                name: "\u9ed1\u732b\u7d27\u5f20",
                desc: "\u4e00\u53ea\u5bb9\u6613\u7d27\u5f20\u7684\u9ed1\u732b\uff0cduang~\u7684\u4e00\u5413\u5c31\u5c3f\u4e86\u51fa\u6765~"
            }, {
                className: "winlayer-emoji-ajks",
                name: "\u963f\u9e21\u778c\u7761",
                desc: "\u8eab\u4e3a\u4e00\u53ea\u4f1a\u6253\u9e23\u7684\u7537\u9e21\uff0c\u963f\u9e21\u518d\u4e00\u6b21\u65e0\u803b\u7684\u5012\u4e0b\u4e86~"
            }, {
                className: "winlayer-emoji-ajdq",
                name: "\u963f\u9e21\u9053\u6b49",
                desc: "\u8ba9\u6211\u4eec\u50cf\u963f\u9e21\u4e00\u6837\u6401\u7f6e\u4ec7\u6068\uff0c\u5411\u8eab\u8fb9\u7684\u670b\u53cb\u8bf4\u58f0\u5bf9\u4e0d\u8d77\uff01"
            }, {
                className: "winlayer-emoji-xkbxxy",
                name: "\u70ab\u9177\u7248\u718a\u5c0f\u6613",
                desc: "\u98a4\u6296\u5427\uff0c\u5168\u4e16\u754c\u90fd\u8981\u8fce\u6765\u718a\u5c0f\u4e8c\u7684\u65b0\u65f6\u4ee3\u4e86\uff01"
            }, {
                className: "winlayer-emoji-qxbxxy",
                name: "\u60c5\u7eea\u7248\u718a\u5c0f\u6613",
                desc: "\u718a\u5c0f\u6613\u52a8\u6001\u8868\u60c5\u6765\u88ad\uff0c\u4e00\u8d77\u884c\u201c\u52a8\u201d\u8d77\u6765\uff01"
            }, {
                className: "winlayer-emoji-nn",
                name: "\u599e\u599e",
                desc: "\u963f\u9e21\u7c73\u5fb7\u7684\u7eef\u95fb\u5973\u53cb\uff0c\u4f20\u8bf4\u4e2d\u7684\u5973\u6c49\u5b50\uff0c\u98ce\u98ce\u706b\u706b\u72ec\u7acb\u575a\u5f3a\uff0c\u61c2\u5979\u7684\u4eba\u624d\u4f1a\u4e86\u89e3\u5979\u7684\u7ec6\u817b\u6e29\u67d4\u3002"
            }, {
                className: "winlayer-emoji-ajmd",
                name: "\u963f\u9e21\u7c73\u5fb7",
                desc: "\u7ecf\u5e38\u641e\u4e0d\u6e05\u72b6\u51b5\u7684\u795e\u7ecf\u8d28\u5c0f\u9e21\uff0c\u5bb9\u6613\u7126\u8651\u3001\u8df3\u8131\u7684\u601d\u8def\u4ece\u6765\u6ca1\u6709\u4eba\u80fd\u8ddf\u5f97\u4e0a\u3002"
            }, {
                className: "winlayer-emoji-lt",
                name: "\u96f7\u5154",
                desc: "\u4e00\u53ea\u5177\u6709\u5a07\u5c0f\u5984\u60f3\u75c7\u7684\u5927\u767d\u5154\uff0c\u5343\u4e07\u4e0d\u8981\u88ab\u4ed6\u61a8\u539a\u7684\u5916\u8868\u6240\u8499\u9a97\uff01"
            }, {
                className: "winlayer-emoji-zdz",
                name: "\u7ae0\u5927\u5634",
                desc: "\u4e00\u53ea\u6218\u6597\u503c\u7206\u8868\u7684\u53ef\u5b9e\u7528\u7ae0\u9c7c\uff0c\u60f9\u6012\u4ed6\u5c06\u662f\u4f60\u8fd9\u8f88\u5b50\u6700\u540e\u6094\u7684\u51b3\u5b9a\u3002"
            }];
            p.push("");
            for (var i = 0, l = chartletConfig.length; i < l; i++)p.push('<div class="', chartletConfig[i].className + " ", 'winlayer-emoji-chartlet emoji-locked js-panel"><em class="winlayer-emoji-scrollbar-tips icon-scrollbar-tips hidden js-pageNum"><span class="js-page">1/1</span></em><div class="winlayer-emoji-scrollbar ui-scrollbar hidden js-scrollbar"></div><div class="winlayer-emoji-content js-container"><div class="winlayer-emoji-content-inner js-content"><div class="winlayer-emoji-intro hidden js-intro"><span class="winlayer-emoji-title">', chartletConfig[i].name, "</span>"), chartletConfig[i].author && p.push('<span class="text-gray">', chartletConfig[i].author, "\u521b\u4f5c</span>"), p.push('<p class="text-gray">', chartletConfig[i].desc, '</p></div><ul class="winlayer-emoji-list clearfix"></ul></div></div><div class="winlayer-emoji-ft js-foot"></div><p class="winlayer-emoji-tips text-gray">\u63d0\u793a\uff1a\u70b9\u51fb\u8d34\u7eb8\u53ef\u76f4\u63a5\u53d1\u9001</p></div>');
            p.push("</div></div>")
        }
        return p.join("")
    }
});
define("template/floatbox/messageBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer-bd"><div class="poplayer-sendMessage-addressee js-addressee">'), totalCount !== 0 && p.push('<a class="fR link-blue" target="_blank" href="/messages/dm/', userId, '">\u5171', totalCount, "\u6761\u5bf9\u8bdd</a>"), p.push('<span class="text-gray">\u6536\u4ef6\u4eba\uff1a</span>', nickName, '</div><div class="publish-bd js-pub-bd"><div class="publish-textarea">'), defaultTip !== "" && p.push('<label class="js-default-tip">', defaultTip, "</label>"), p.push('<textarea></textarea><p class="message-send-tips text-middle-tips js-chartletSentTips hidden"><span class="text-dark-gray"><em class="icon-correct-m"></em>\u8d34\u7eb8\u5df2\u53d1\u9001\uff0c\u7ee7\u7eed\u804a\u5929\u5427</span></p></div><div class="publish-operate"><div class="publish-insert"><em class="icon-face emotion-trigger" title="\u8868\u60c5"></em></div><div class="publish-setTop">'), loginUser.isVip ? loginUser.isNormalVip ? p.push('<label class="label-tag"><input class="js-setTop" type="checkbox" />\u5728', sexName, '\u6d88\u606f\u4e2d\u5fc3\u7f6e\u9876(<a class="text-red" href="/pay/services" target="_blank" data-log="dmUpOpen">\u5347\u7ea7\u9ad8\u7ea7VIP\u4f1a\u5458</a>\u514d\u8d39\u4f7f\u7528)</label>') : loginUser.isSuperVip && p.push('<label class="label-tag"><input class="js-setTop" type="checkbox" checked="checked" />\u5728', sexName, "\u6d88\u606f\u4e2d\u5fc3\u7f6e\u9876(\u60a8\u53ef\u4ee5\u514d\u8d39\u4f7f\u7528)</label>") : p.push('<label class="label-tag"><input class="js-setTop" type="checkbox" />\u5728', sexName, '\u6d88\u606f\u4e2d\u5fc3\u7f6e\u9876(<a class="text-red" href="/pay/services" target="_blank" data-log="dmUpOpen">\u5f00\u901a\u9ad8\u7ea7VIP\u4f1a\u5458</a>\u514d\u8d39\u4f7f\u7528)</label>'), p.push('</div></div></div></div><div class="poplayer-ft"><div class="publish-ft n-send-ft"><div class="publish-btn n-btn-box js-btn"><div class="js-btn-txt disabled"><a class="btn btn-red n-btn-sure submit-trigger" href="javascript:;">\u53d1\u9001</a></div></div><span class="publish-count js-wordCounter"><b class="char-constantia">400</b>\u5b57</span></div></div>');
        return p.join("")
    }
});
define("widget/box/floatBox/FeedbackBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("sendbox/FeedbackSendBox"), g = a("widget/box/floatBox/TipsBox"), h = a("utils/tmpl"), i = e.extend({
        preRender: function () {
            var b = d.extend({}, this.data);
            return {
                title: "\u82b1\u7530\u610f\u89c1\u53cd\u9988",
                bodyContent: h.formatTemplate(a("template/floatbox/feedbackBox"), b)
            }
        }, bindEvent: function () {
            this._super(), this.$elem.bind("message:send:success", d.proxy(this.onSuccess, this))
        }, postRender: function () {
            this.$elem.addClass("poplayer-feedback"), this._super();
            var a = {data: {userId: this.data.userId}, isAutoHeight: !0, maxLen: 250}, b = new f(this.$elem, a);
            b.render(), this.feedbackSendBox = b
        }, onSuccess: function (a, b) {
            this.hide();
            var c = new g(null, {data: {type: "correct", text: "\u53d1\u9001\u6210\u529f\uff01"}});
            c.show(), c.delayHide(1500)
        }, hide: function () {
            var a = this.feedbackSendBox.emotion;
            a.isShow && a.hide(), this._super()
        }
    });
    return i
});
define("sendbox/FeedbackSendBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("sendbox/MessageSendBox"), f = a("sendbox/SendBoxAction"), g = a("utils/Log"), h = a("utils/Utils"), i = e.extend({
        postRender: function () {
            this._super(), this.$feedbackType = this.$elem.find(".js-type"), this.$phone = this.$elem.find(".js-phone"), this.$tips = this.$elem.find(".js-phoneTips")
        }, bindEvent: function () {
            this._super(), this.$phone.bind("focus", d.proxy(this.onMobileFocus, this)), this.$phone.bind("blur", d.proxy(this.onMobileBlur, this)), this.$phone.bind("paste cut input keyup", d.proxy(this.onCheckInput, this)), this.$feedbackType.bind("change", d.proxy(this.onCheckInput, this))
        }, onMobileFocus: function () {
            h.textTips(this.$tips, "hide")
        }, onMobileBlur: function (a) {
            this.checkPhoneVal() || h.textTips(this.$tips, "error", "\u8054\u7cfb\u65b9\u5f0f\u683c\u5f0f\u4e0d\u6b63\u786e")
        }, checkPhoneVal: f.checkPhoneVal, checkInputVal: function () {
            var a = d.trim(this.$textarea.val());
            if (a.length === 0 || this.wordCounter.isError)return !1;
            if (this.$feedbackType && this.$feedbackType.size() && parseInt(this.$feedbackType.val()) === 0)return !1;
            if (this.$phone && this.$phone.size() && !this.checkPhoneVal())return !1;
            return !0
        }, parseParams: function () {
            var a = {withUserId: this.data.userId, content: this.concatContent()};
            return a
        }, concatContent: function () {
            var a = d.trim(this.$phone.val()), b = "#" + i.FEEDBACK_TEXT[this.$feedbackType.val()] + "#";
            a && (b += " \u8054\u7cfb\u65b9\u5f0f\uff1a" + a), b += " \u53cd\u9988\u5185\u5bb9\uff1a" + d.trim(this.$textarea.val());
            return b
        }
    });
    i.FEEDBACK_TEXT = {
        1: "\u5145\u503c\u8d2d\u4e70",
        2: "\u5934\u50cf\u95ee\u9898",
        3: "\u4e2a\u4eba\u8d44\u6599",
        4: "\u7528\u6237\u4e92\u52a8",
        5: "\u5e10\u53f7\u76f8\u5173",
        6: "\u4ea4\u53cb\u5b89\u5168",
        7: "\u5176\u4ed6\u610f\u89c1"
    };
    return i
});
define("template/floatbox/feedbackBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer-bd"><p class="text-gray">Hi,\u5c0f\u7ea2\u5a18\u7167\u987e\u4e0d\u5468\u6df1\u8868\u6b49\u610f\u3002\u5982\u679c\u60a8\u5728\u4f7f\u7528\u82b1\u7530\u8fc7\u7a0b\u4e2d\u9047\u5230\u95ee\u9898\u6025\u9700\u89e3\u51b3\uff0c\u53ef\u4ee5\u5148\u67e5\u770b<a target="_blank" class="text-problems" href="/help/faq">\u82b1\u7530\u5e38\u89c1\u53cd\u9988\u95ee\u9898</a>\u5bfb\u627e\u7b54\u6848</p><div class="form-row js-row"><label class="form-label" for=""><span class="form-need">*</span>\u53cd\u9988\u95ee\u9898\u7c7b\u522b\uff1a</label><div class="form-control"><select class="form-select js-type"><option value="0" selected="">\u8bf7\u9009\u62e9</option><option value="1">\u5145\u503c\u8d2d\u4e70</option><option value="2">\u5934\u50cf\u95ee\u9898</option><option value="3">\u4e2a\u4eba\u8d44\u6599</option><option value="4">\u7528\u6237\u4e92\u52a8</option><option value="5">\u5e10\u53f7\u76f8\u5173</option><option value="6">\u4ea4\u53cb\u5b89\u5168</option><option value="7">\u5176\u4ed6\u610f\u89c1</option></select></div></div><div class="form-row js-row"><label class="form-label" for=""><span class="form-need-hidden">*</span>\u60a8\u7684\u8054\u7cfb\u7535\u8bdd\uff1a</label><div class="form-control"><input class="form-input js-phone" type="text" placeholder="\u65b9\u4fbf\u5c0f\u7ea2\u5a18\u4e0e\u4f60\u8054\u7cfb" /></div><div class="form-tips"><span class="text-icon-tips hidden js-phoneTips"></span></div></div><div class="form-row js-row"><label class="form-label-block"><span class="form-need">*</span>\u95ee\u9898\u63cf\u8ff0<span class="text-gray">(\u4e3a\u4e86\u5c0f\u7ea2\u5a18\u66f4\u5feb\u901f\u89e3\u51b3\u60a8\u7684\u95ee\u9898\uff0c\u8bf7\u5c3d\u91cf\u63d0\u4f9b\u8be6\u5b9e\u63cf\u8ff0)</span></label><div class="form-control"><textarea></textarea></div><div class="poplayer-feedback-tips js-wordCounter"><b class="char-constantia">250</b>\u5b57</div></div></div><div class="poplayer-ft"><div class="poplayer-btn n-btn-box js-btn"><div class="js-btn-txt disabled"><a class="btn btn-red n-btn-sure submit-trigger" href="javascript:;">\u63d0\u4ea4</a></div></div></div>');
        return p.join("")
    }
});
define("widget/box/floatBox/LovefmBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("widget/box/floatBox/TipsBox"), g = a("sendbox/LovefmSendBox"), h = a("utils/tmpl"), i = e.extend({
        preRender: function () {
            var b = d.extend({}, this.data);
            return {
                title: "\u6211\u8981\u4e0a\u7535\u53f0",
                bodyContent: h.formatTemplate(a("template/floatbox/lovefmBox"), b)
            }
        }, bindEvent: function () {
            this._super(), this.$elem.bind("message:send:success", d.proxy(this.onSuccess, this))
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-lovefm");
            var a = {data: {userId: this.data.userId}, isAutoHeight: !0, maxLen: 250}, b = new g(this.$elem, a);
            b.render(), this.lovefmSendBox = b
        }, onSuccess: function (a, b) {
            this.hide();
            var c = new f(null, {data: {type: "correct", text: "\u53d1\u9001\u6210\u529f\uff01"}});
            c.show(), c.delayHide(1500)
        }
    });
    return i
});
define("sendbox/LovefmSendBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("sendbox/MessageSendBox"), f = a("utils/Log"), g = a("utils/Utils"), h = a("utils/widget/Placeholder"), i = e.extend({
        postRender: function () {
            this._super(), this.$phone = this.$elem.find(".js-phone"), this.$tips = this.$elem.find(".js-phoneTips"), this.$textarea = this.$elem.find("textarea"), h.bind(this.$phone)
        }, bindEvent: function () {
            this._super(), this.$phone.bind("paste cut input keyup", d.proxy(this.onCheckInput, this)), this.$textarea.bind("focus", d.proxy(this.onCheckInput, this))
        }, hideMobileTips: function () {
            g.textTips(this.$tips, "hide")
        }, showMobileTips: function (a) {
            g.textTips(this.$tips, "error", a)
        }, checkPhoneVal: function () {
            var a = d.trim(this.$phone.val()).replace(/-/g, "").replace(/\s/g, ""), b = /^\d+$/.test(a), c = a.length;
            if (a == "") {
                this.showMobileTips("\u8bf7\u586b\u5199\u8054\u7cfb\u7535\u8bdd");
                return !1
            }
            if (b && c < 8 || b && c > 12) {
                this.showMobileTips("\u7535\u8bdd\u683c\u5f0f\u4e0d\u6b63\u786e");
                return !1
            }
            this.hideMobileTips();
            return !0
        }, checkInputVal: function () {
            var a = d.trim(this.$textarea.val());
            if (this.$phone && this.$phone.size() && !this.checkPhoneVal())return !1;
            if (a.length === 0 || this.wordCounter.isError)return !1;
            return !0
        }, parseParams: function () {
            var a = {withUserId: this.data.userId, content: this.concatContent()};
            return a
        }, concatContent: function () {
            var a = d.trim(this.$phone.val()), b = "#\u6211\u8981\u4e0a\u7535\u53f0#";
            a && (b += " \u8054\u7cfb\u65b9\u5f0f\uff1a" + a), b += " \u4ecb\u7ecd\u81ea\u5df1\uff1a" + d.trim(this.$textarea.val());
            return b
        }
    });
    return i
});
define("utils/widget/Placeholder", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = function () {
        return "placeholder" in document.createElement("input")
    }(), f = function (a, b) {
        this.$elem = d(a), this.config = b || {}, this.defaultVal = this.$elem.attr("placeholder"), this.$wrapper = this.$elem.parents(".js-pleaceholder-wrapper").eq(0).css({position: "relative"});
        var c = this;
        setTimeout(function () {
            c.render(), c.bindEvent()
        }, 10)
    };
    f.prototype = {
        render: function () {
            this.$label = d("<label>" + this.defaultVal + "</label>").css({
                position: "absolute",
                cursor: "text",
                color: "#A9A9A9"
            }), this.$label.css({
                "font-size": this.config.fontSizeVal || this.$elem.css("font-size"),
                top: this.config.topVal || this.$elem.css("padding-top"),
                left: this.config.leftVal || this.$elem.css("padding-left")
            }), this.$wrapper.append(this.$label), this.checkValue() && this.hideLabel()
        }, bindEvent: function () {
            var a = this;
            this.$label.bind("click", function () {
                a.hideLabel(), a.$elem.focus()
            }), this.$elem.bind("focus", function () {
                a.$label.is(":visible") && a.hideLabel()
            }).bind("blur", function () {
                a.checkValue() || a.showLabel()
            })
        }, checkValue: function () {
            if (this.config.checkValue)return this.config.checkValue();
            return this.getValue() === "" ? !1 : !0
        }, getValue: function () {
            var a = "", b = this.$elem[0].tagName.toLowerCase();
            b === "input" || b === "textarea" ? a = d.trim(this.$elem.val()) : a = d.trim(this.$elem.text());
            return a
        }, hideLabel: function () {
            this.$label.hide()
        }, showLabel: function () {
            this.$label.show()
        }
    };
    return {
        bind: function (a, b) {
            if (!e || b && b.isForce)return new f(a, b)
        }, isPlaceholderSupport: e
    }
});
define("template/floatbox/lovefmBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer-bd"><p class="text-gray">\u60f3\u8981\u4e0a\u7535\u53f0\u8bf7\u8054\u7cfb\u6211\u5427\uff0c\u5317\u4eac\u5730\u533a\u7684\u540c\u5b66\u4f18\u5148\u3002\u5c0f\u7ea2\u5a18\u4f1a\u6839\u636e\u8d44\u6599\u72b6\u51b5\u8fdb\u884c\u6311\u9009\uff0c\u5982\u7b26\u5408\u6761\u4ef6\u5c0f\u7ea2\u5a18\u4f1a\u8054\u7cfb\u60a8\u3002</p><div class="form-row js-row"><label class="form-label" for=""><span class="form-need">*</span>\u60a8\u7684\u8054\u7cfb\u7535\u8bdd\uff1a</label><div class="form-control js-pleaceholder-wrapper"><input class="form-input js-phone" type="text" placeholder="\u65b9\u4fbf\u5c0f\u7ea2\u5a18\u4e0e\u4f60\u8054\u7cfb" /></div><div class="form-tips"><span class="text-icon-tips hidden js-phoneTips"></span></div></div><div class="form-row js-row"><label class="form-label-block"><span class="form-need">*</span>\u4ecb\u7ecd\u81ea\u5df1\uff1a<span class="text-gray">\uff08\u8bf4\u8bf4\u4f60\u60f3\u4e0a\u7535\u53f0\u7684\u7406\u7531\u5427\uff0c\u597d\u597d\u7684\u4ecb\u7ecd\u4e00\u4e0b\u81ea\u5df1\u3002\uff09</span></label><div class="form-control"><span class="form-textarea-label text-gray js-default-tip"></span><textarea></textarea></div><div class="poplayer-lovefm-count n-send-ft"><span class="fR js-wordCounter"><b class="char-constantia">250</b>\u5b57</span></div></div></div><div class="poplayer-ft"><div class="poplayer-btn n-btn-box js-btn"><div class="js-btn-txt disabled"><a class="btn btn-red n-btn-sure submit-trigger" href="javascript:;">\u63d0\u4ea4</a></div></div></div>');
        return p.join("")
    }
});
define("widget/box/floatBox/ConfirmBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("utils/tmpl"), f = a("widget/box/floatBox/Box"), g = f.extend({
        preRender: function () {
            return {
                title: this.config.title || "\u8bf7\u786e\u8ba4\u64cd\u4f5c",
                bodyContent: e.formatTemplate(a("template/floatbox/confirmBox"), this.data)
            }
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-confirmBox"), this.$checkbox = this.$elem.find(".js-checkbox")
        }, bindEvent: function () {
            this._super(), this.$elem.delegate(".submit-trigger", "click", d.proxy(this.onConfirm, this))
        }, hide: function (a) {
            this._super(), a && this.config.callBack && this.config.callBack({status: "cancel"}, a)
        }, onConfirm: function (a) {
            this.hide();
            var b = this.$checkbox && (this.$checkbox.is(":checked") ? 1 : 0), c = {status: "ok"};
            this.config.data.isShowCheckbox && (c = d.extend(c, {isChecked: b})), this.config.callBack && this.config.callBack(c, a);
            return !1
        }
    });
    return g
});
define("template/floatbox/confirmBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push(""), p.push('<div class="poplayer-bd"><div class="poplayer-messbox"><span class="poplayer-mess">'), type == "warning" ? p.push('<em class="icon-warning-b"></em>') : type == "correct" ? p.push('<em class="icon-correct-b"></em>') : type == "error" && p.push('<em class="icon-error-b"></em>'), p.push("", content, "</span></div>"), typeof desc != "undefined" && desc !== "" && p.push('<p class="poplayer-desc">', desc, "</p>"), p.push('</div><div class="poplayer-ft">'), typeof isShowCheckbox != "undefined" && isShowCheckbox && (p.push('<div class="poplayer-label"><label class="label-tag"><input type="checkbox" class="js-checkbox" autocomplete="off" '), typeof isDefaultCheckboxChecked != "undefined" && isDefaultCheckboxChecked && p.push('checked="checked"'), p.push("/>"), typeof checkBoxText != "undefined" && p.push("", checkBoxText, ""), p.push("</label></div>")), p.push('<div class="poplayer-btn"><a class="btn btn-red submit-trigger" href="javascript:;">'), typeof submitBtnText != "undefined" ? p.push("", submitBtnText, "") : p.push("\u786e\u8ba4"), p.push("</a>"), typeof isHideCancel != "undefined" && !isHideCancel && (p.push('<a class="btn btn-gray close-trigger" href="javascript:;">'), typeof cancelBtnText != "undefined" ? p.push("", cancelBtnText, "") : p.push("\u53d6\u6d88"), p.push("</a>")), p.push("</div></div>");
        return p.join("")
    }
});
define("task/widget/needLogin", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("task/basic/Task"), f = d(document.body);
    (new e("needLogin", function () {
        var b = a("model/UserData");
        b.getLoginUser() === null && f.delegate(".need-login", "click", function (a) {
            a.preventDefault(), f.trigger("error", ["needLogin"])
        })
    })).add()
});
define("task/widget/logger", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("task/basic/Task");
    (new e("keyFromLogger", function () {
        var b = a("utils/Log");
        d(document.body).delegate("a[href]", "click", function (a) {
            var c = d(a.currentTarget), e = c.attr("href");
            if (e.indexOf("javascript") === -1) {
                var f = c.data("method");
                f = f || "", b.doLog({parameter: {method: f}, elem: c})
            }
        }), b.send("/page.do?_page=" + b.keyFrom("body"))
    })).add()
});
define("task/widget/global", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("task/basic/Task"), f = a("user/UserAction"), g = a("model/UserData"), h = a("widget/box/floatBox/PicUploadBox"), i = a("widget/box/floatBox/LetterBox"), j = a("widget/box/floatBox/BuyServiceBox"), k = a("widget/box/floatBox/GiftRecommendBox").getInstance(), l = a("widget/box/floatBox/ReleaseDateBox"), m = a("widget/box/floatBox/NeedAvatarBox"), n = a("widget/box/floatBox/OpenSvipBox"), o = a("widget/box/floatBox/GuideUploadAvatar"), p = a("utils/Cookie"), q = a("utils/Log"), r = d(document.body);
    (new e("globalListen", function () {
        function b() {
            location.reload()
        }

        r.delegate(".g-upload-photo-trigger", "click", function (a) {
            (new h).show(a)
        }), r.delegate(".g-upload-letter-trigger", "click", function (a) {
            i.getInstance(null, null).show(), a && q.doLog({parameter: {method: "loadLetter"}, elem: d(a.target)})
        }), r.delegate(".g-upload-date-trigger", "click", function (a) {
            if (g.getLoginUser().avatarType != 1) {
                var b = new m(null, {
                    data: {
                        content: "\u60a8\u9700\u8981\u5148\u6dfb\u52a0\u6e05\u6670\u7f8e\u89c2\u7684\u8fd1\u7167\uff0c\u7136\u540e\u624d\u80fd\u53d1\u5e03\u7ea6\u4f1a\uff01",
                        subContent: "99%\u4ee5\u4e0a\u7684\u82b1\u7530\u7528\u6237\u90fd\u4e0a\u4f20\u5934\u50cf\u4e86"
                    }
                });
                b.show()
            } else(new l).show(), q.doLog({parameter: {method: "date_post"}, elem: d(a.target)})
        }), r.delegate(".g-open-svip-trigger", "click", function (a) {
            (new n).show(a)
        });
        var a = function (a) {
            if (g.getLoginUser() !== null) {
                var b = a.type === "click" ? d(a.currentTarget) : d(a.target);
                (new j(null, {
                    service: "upgradevip", successCallBack: function () {
                        location.reload()
                    }
                })).show(b);
                var b = d(a.currentTarget);
                q.doLog({parameter: {method: "toupgradesvip"}, elem: b})
            }
        };
        r.delegate(".g-upgradeVip-trigger", "click", a), r.bind("global:pay:upgradevip", a);
        var c = function (a, c) {
            if (g.getLoginUser() !== null) {
                var e = d.extend({
                    service: "vip",
                    successCallBack: b,
                    successText: "\u8d2d\u4e70VIP\u4f1a\u5458\u6210\u529f\uff01"
                }, c), f = a.type === "click" ? d(a.currentTarget) : d(a.target);
                (new j(null, e)).show(f), q.doLog({parameter: {method: "openvip"}, elem: d(a.target)})
            }
        };
        r.delegate(".g-buyVip-trigger", "click", c), r.bind("global:pay:buyvip", c);
        var e = {
            1: "-970828248014862218",
            2: "2408803205592168805",
            3: "-7016988851908030465",
            4: "3913728183986070276",
            5: "3256460672953229403"
        }, s = function (a, b) {
            if (g.getLoginUser() !== null) {
                var c = a.type === "click" ? d(a.currentTarget) : d(a.target), h = null;
                b && b.serviceId ? h = b.serviceId : h = e[c.data("servicetype")] || c.data("serviceid"), f.buyVip(c, h), q.doLog({
                    parameter: {method: "tobuyvip"},
                    elem: c
                })
            }
        };
        r.delegate(".g-buyVip-detail-trigger", "click", s), r.bind("global:pay:buyvip:detail", s);
        var t = function (a, c) {
            if (g.getLoginUser() !== null) {
                var e = d.extend({
                    service: "svip",
                    successCallBack: b,
                    successText: "\u8d2d\u4e70\u9ad8\u7ea7VIP\u4f1a\u5458\u6210\u529f\uff01"
                }, c), f = a.type === "click" ? d(a.currentTarget) : d(a.target);
                (new j(null, e)).show(f), q.doLog({parameter: {method: "opensvip"}, elem: d(a.target)})
            }
        };
        r.delegate(".g-buySVip-trigger", "click", t), r.bind("global:pay:buysvip", t);
        var u = {
            1: "5485429987820423653",
            2: "7603052534407952143",
            3: "-188137999440394281",
            4: "-199930211074621180",
            5: "-7905802903390055195"
        }, v = function (a, b) {
            if (g.getLoginUser() !== null) {
                var c = a.type === "click" ? d(a.currentTarget) : d(a.target), e = null;
                b && b.serviceId ? e = b.serviceId : e = u[c.data("servicetype")] || c.data("serviceid"), f.buySVip(c, e), q.doLog({
                    parameter: {method: g.loginUserIsNormalVip ? "toupgradesvip" : "tobuysvip"},
                    elem: c
                })
            }
        };
        r.delegate(".g-buySVip-detail-trigger", "click", v), r.bind("global:pay:buysvip:detail", v);
        var w = function (a, b) {
            if (g.getLoginUser() !== null) {
                var c = a.type === "click" ? d(a.currentTarget) : d(a.target);
                f.buyService(c, b), q.doLog({parameter: {method: "tobuy" + b.logName || "service"}, elem: c})
            }
        };
        r.bind("global:pay:service", w);
        var x = function (a, b) {
            if (g.getLoginUser() !== null) {
                var c = {like: "\u559c\u6b22", sayHi: "\u6253\u62db\u547c"};
                k.show(a, {
                    data: {
                        title: c[b.type] + "\u6210\u529f\uff0c\u9001\u4e00\u4e2a\u793c\u7269\u7ed9TA\uff0c\u8ba9TA\u66f4\u559c\u6b22\u4f60\uff01",
                        type: b.type,
                        user: b.user
                    }
                })
            }
        };
        r.bind("global:gift:recommend", x);
        var y = {
            like: "\u559c\u6b22",
            sayhi: "\u6253\u62db\u547c",
            digg: "\u8d5e",
            message: "\u53d1\u9001"
        }, z = function (a, b) {
            (new o(null, {title: y[b.type]})).show(), p.set("invalidAvatar_upload", 1, 365)
        };
        r.bind("global:guide:uploadAvatar", z)
    })).add()
});
define("user/UserAction", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("utils/DataSource"), f = a("utils/Utils"), g = d(document.body), h = a("utils/Error"), i = a("widget/tips/FastTips"), j = a("model/UserData"), k = a("utils/Log"), l = a("widget/box/introBox/DisLikeBox").getInstance(), m = a("widget/box/floatBox/BuyServiceBox"), n = a("widget/box/introBox/CautionBox").getInstance(), o = a("utils/Cookie"), p = a("widget/box/winBox/TipsBox").getInstance(), q = a("widget/box/floatBox/TipsBox"), r = a("widget/box/floatBox/BuyConfirmBox"), s = a("widget/box/floatBox/ConfirmBox"), t = a("widget/box/floatBox/NeedAvatarBox"), u = a("utils/storage/LocalStorage"), v = {
        doLike: function (a, b, c) {
            if (!d.isPlainObject(this.doLikeRequest) || this.doLikeRequest.readyState === 4) {
                var f = this, i = d(a.currentTarget), l = i.parents(".js-like").first();
                this.doLikeRequest = e.setTrigger(l).postJSON("addFav", {userId: b.id}, function (d) {
                    var e = parseInt(d.code) || 1;
                    if (!h.showTips({json: d, evt: a, triggerElem: i})) {
                        var f = null;
                        e === 1 ? (g.trigger("fav:fetch"), j.update({
                            id: b.id,
                            following: !0
                        }), j.isShowGuideUploadAvatar() ? g.trigger("global:guide:uploadAvatar", [{type: "like"}]) : c !== "hideGift" && g.trigger("global:gift:recommend", [{
                            user: b,
                            type: "like"
                        }]), i.trigger("like:success", [d])) : (e === 421 && (j.loginUserIsVip ? j.loginUserIsSuperVip || (f = {
                            icon: "warning",
                            title: "\u60a8\u5df2\u8fbe\u5230\u559c\u6b22\u4eba\u6570\u4e0a\u9650\uff0c\u65e0\u6cd5\u559c\u6b22TA",
                            desc: "\u5347\u7ea7\u4f1a\u5458\uff0c\u559c\u6b22\u4eba\u6570\u53ef\u6269\u5145\u52303000\u4eba",
                            btnLog: "likeLimit",
                            buttonText: "\u5347\u7ea7\u4f1a\u5458",
                            buttonLink: "/pay/services"
                        }) : f = {
                            icon: "warning",
                            title: "\u60a8\u5df2\u8fbe\u5230\u559c\u6b22\u4eba\u6570\u4e0a\u9650\uff0c\u65e0\u6cd5\u559c\u6b22TA",
                            desc: "\u5f00\u901a\u9ad8\u7ea7VIP\u82b1\u7530\u4f1a\u5458\uff0c\u559c\u6b22\u4eba\u6570\u53ef\u6269\u5145\u52303000\u4eba",
                            btnLog: "likeLimit",
                            buttonText: "\u5f00\u901a\u4f1a\u5458",
                            buttonLink: "/pay/services"
                        }), e === 422 && (f = {
                            icon: "warning",
                            title: "\u60a8\u5df2\u8fbe\u5230\u559c\u6b22\u4eba\u6570\u4e0a\u9650\uff0c\u65e0\u6cd5\u559c\u6b22TA",
                            desc: "\u6700\u591a\u53ea\u80fd\u559c\u6b223000\u4eba",
                            btnLog: "likeLimit",
                            buttonText: "\u67e5\u770b\u559c\u6b22\u7684\u4eba",
                            buttonLink: "/following"
                        }), f !== null && n.show(a, {data: f}), i.trigger("like:failed", [d]))
                    } else i.trigger("like:failed", [d])
                }).error(function (a) {
                    i.trigger("like:failed", [a])
                }), k.doLog({parameter: {method: "fav"}, elem: i});
                return
            }
        }, doCancelLike: function (a, b) {
            if (!d.isPlainObject(this.cancelLikeRequest) || this.cancelLikeRequest.readyState === 4) {
                var c = this, l = d(a.currentTarget), m = l.parents(".js-like").first();
                this.cancelLikeRequest = e.setTrigger(m).postJSON("cancelFav", {userId: b.id}, function (c) {
                    var d = parseInt(c.code) || 1;
                    h.Tips(d, a) || (g.trigger("unfav:fetch"), i.show({
                        $trigger: m,
                        type: "success",
                        text: "\u5df2\u4e0d\u518d\u559c\u6b22" + f.userSexName(b.sex) + "\uff01"
                    }), j.update({id: b.id, following: !1}), l.trigger("cancellike:success"))
                }), k.doLog({parameter: {method: "disFav"}, elem: l});
                return
            }
        }, doDisLike: function (a, b) {
            var c = this;
            l.show(a, {autoClose: !0, data: {user: b}, target: this}), k.doLog({
                parameter: {method: "hide"},
                elem: d(a.currentTarget)
            });
            return
        }, doUndislike: function (a, b) {
            if (!d.isPlainObject(this.unDislikeRequest) || this.unDislikeRequest.readyState === 4) {
                var c = this, f = d(a.currentTarget);
                this.unDislikeRequest = e.setTrigger(f).postJSON("unDislike", {userId: b.id}, function (a) {
                    h.showTips({json: a}) || (i.show({
                        $trigger: f,
                        type: "success",
                        text: "\u5df2\u79fb\u9664\u8be5\u4e0d\u559c\u6b22\u7684\u4eba"
                    }), j.update({id: b.id, dislike: !1}), c.$elem.trigger("unDislike:success"))
                });
                return
            }
        }, doSayHi: function (a, b, c) {
            if (!d.isPlainObject(this.doSayHiRequest) || this.doSayHiRequest.readyState === 4) {
                var f = this, i = d(a.currentTarget), c = c || null;
                this.doFavRequest = e.setTrigger(i).postJSON("sayHi", {userId: b.id}, function (d) {
                    var e = parseInt(d.code, 10) || 1;
                    h.Tips(e, a) || (f.onSayHi(), j.isShowGuideUploadAvatar() ? g.trigger("global:guide:uploadAvatar", [{type: "sayhi"}]) : c === "showGift" && v.showGiftRecommend("sayHi", b))
                }), k.doLog({parameter: {method: "sayhi"}, elem: i});
                return
            }
        }, onSayHi: function () {
            this.$elem.find(".sayhi-trigger").removeClass("btn-sayhi sayhi-trigger").addClass("btn-sayhi-disable").attr("title", "\u5df2\u6253\u62db\u547c").html("\u5df2\u6253\u62db\u547c")
        }, doSayHiNew: function (a, b, c) {
            if (!d.isPlainObject(this.doSayHiRequest) || this.doSayHiRequest.readyState === 4) {
                var f = this, i = d(a.currentTarget), c = c || null;
                this.doFavRequest = e.setTrigger(i).postJSON("sayHi", {userId: b.id}, function (d) {
                    var e = parseInt(d.code) || 1;
                    h.Tips(e, a) || (f.onSayHiNew(), j.isShowGuideUploadAvatar() ? g.trigger("global:guide:uploadAvatar", [{type: "sayhi"}]) : c === "showGift" && v.showGiftRecommend("sayHi", b))
                }), k.doLog({parameter: {method: "sayhi"}, elem: i});
                return
            }
        }, onSayHiNew: function () {
            this.$elem.find(".sayhi-trigger").parents(".js-sayhi-parent").eq(0).addClass("n-sayhi-disable")
        }, buyVip: function (a, b) {
            var c;
            b && e.postJSON("createNewDeal", {serviceId: b, keyfrom: k.buyVipKeyFrom(a)}, function (a) {
                a && parseInt(a.status) === 1 && (c = new r(null, {
                    data: a.payInfo.dealInfo,
                    userAccount: a.payInfo.userAccount,
                    successText: "\u8d2d\u4e70VIP\u4f1a\u5458\u6210\u529f\uff01",
                    logName: "vip",
                    successCallBack: function () {
                        location.reload()
                    }
                }), c.show())
            })
        }, buySVip: function (a, b) {
            var c;
            b && e.postJSON("createNewDeal", {serviceId: b, keyfrom: k.buyVipKeyFrom(a)}, function (a) {
                a && parseInt(a.status) === 1 && (c = new r(null, {
                    data: a.payInfo.dealInfo,
                    userAccount: a.payInfo.userAccount,
                    successText: "\u8d2d\u4e70SVIP\u4f1a\u5458\u6210\u529f\uff01",
                    logName: "svip",
                    successCallBack: function () {
                        location.reload()
                    }
                }), c.show())
            })
        }, buyService: function (a, b) {
            var c;
            b.serviceId && e.postJSON("createNewDeal", {serviceId: b.serviceId}, function (a) {
                a && parseInt(a.status) === 1 && (c = new r(null, {
                    data: a.payInfo.dealInfo,
                    userAccount: a.payInfo.userAccount,
                    successText: b.successText,
                    logName: b.logName,
                    successCallBack: function () {
                        location.reload()
                    }
                }), c.show())
            })
        }, showGiftRecommend: function (a, b) {
            g.trigger("global:gift:recommend", [{user: b, type: a}])
        }, doApplyDate: function (a, b) {
            var c = j.getLoginUser();
            if (!c)g.trigger("error", ["needLogin"]); else {
                if (c.avatarType != 1) {
                    var d = new t(null, {
                        data: {
                            content: "\u60a8\u9700\u8981\u5148\u6dfb\u52a0\u6e05\u6670\u7f8e\u89c2\u7684\u8fd1\u7167\uff0c\u7136\u540e\u624d\u80fd\u62a5\u540d\u7ea6\u4f1a\uff01",
                            subContent: "99%\u4ee5\u4e0a\u7684\u82b1\u7530\u7528\u6237\u90fd\u4e0a\u4f20\u5934\u50cf\u4e86"
                        }
                    });
                    d.show();
                    return
                }
                if (!u.get("notShowApplyDate")) {
                    var e = new s(null, {
                        title: "\u786e\u8ba4\u62a5\u540d",
                        data: {
                            type: "warning",
                            content: "\u786e\u5b9a\u8981\u62a5\u540d\u53c2\u52a0\u7ea6\u4f1a\u5417\uff1f\u62a5\u540d\u540e\u65e0\u6cd5\u53d6\u6d88\uff0c\u4e0d\u8981\u8ba9\u522b\u4eba\u7a7a\u7b49\u54e6\u3002",
                            desc: "\u7ea6\u4f1a\u5c0f\u63d0\u793a:\u8bf7\u5728\u719f\u6089\u7684\u5730\u65b9\u89c1\u9762\uff0c\u6ce8\u610f\u4eba\u8eab\u8d22\u4ea7\u5b89\u5168\uff0c\u9632\u6b62\u88ab\u9a97",
                            isHideCancel: !1,
                            isShowCheckbox: !0,
                            checkBoxText: "\u4e0d\u518d\u8be2\u95ee"
                        },
                        callBack: function (c) {
                            if (c.status === "ok") {
                                var d = e.$checkbox.is(":checked") ? 1 : 0;
                                d && u.set("notShowApplyDate", 1), v.doApplyRequest(a, b)
                            }
                        }
                    });
                    e.show(), e.$mainElem.css("width", "522px")
                } else v.doApplyRequest(a, b)
            }
        }, doApplyRequest: function (a, b) {
            var c = d(a.currentTarget);
            if (!d.isPlainObject(this.applyRequest) || this.applyRequest.readyState === 4)this.applyRequest = e.postJSON("dateApply", {datingId: b}, function (b) {
                var e = parseInt(b.code, 10) || 1;
                if (e == 1)if (d("body").hasClass("pDatingParklist")) {
                    v.onApplyDate(a);
                    var f = new q(null, {
                        data: {
                            type: "correct",
                            text: "\u62a5\u540d\u6210\u529f\uff01",
                            desc: "<b>\u7ea6\u4f1a\u5c0f\u63d0\u793a\uff1a</b>\u8bf7\u5728\u719f\u6089\u7684\u5730\u65b9\u89c1\u9762\uff0c\u6ce8\u610f\u4eba\u8eab\u8d22\u4ea7\u5b89\u5168\uff0c\u9632\u6b62\u88ab\u9a97"
                        }
                    });
                    f.show(), f.delayHide(2e3)
                } else {
                    v.onApplyDate(a);
                    var g = new s(null, {
                        title: "\u62a5\u540d\u6210\u529f",
                        data: {
                            type: "correct",
                            content: "\u8be5\u7ea6\u4f1a\u5df2\u6210\u529f\u62a5\u540d\uff01\u60a8\u8fd8\u53ef\u4ee5\u67e5\u770b\u66f4\u591a\u7ea6\u4f1a\u3002",
                            desc: "\u7ea6\u4f1a\u5c0f\u63d0\u793a:\u8bf7\u5728\u719f\u6089\u7684\u5730\u65b9\u89c1\u9762\uff0c\u6ce8\u610f\u4eba\u8eab\u8d22\u4ea7\u5b89\u5168\uff0c\u9632\u6b62\u88ab\u9a97",
                            submitBtnText: "\u67e5\u770b\u66f4\u591a\u7ea6\u4f1a"
                        },
                        callBack: function (a) {
                            a.status === "ok" && (location.href = "/dating")
                        }
                    });
                    g.show()
                } else if (e == 624) {
                    var g = new s(null, {
                        title: "\u62a5\u540d\u5931\u8d25",
                        data: {
                            type: "warning",
                            content: "\u8be5\u7ea6\u4f1a\u5df2\u7ed3\u675f\uff01",
                            desc: "\u83ab\u614c\uff0c\u60a8\u8fd8\u53ef\u67e5\u770b\u5176\u4ed6\u66f4\u591a\u7ea6\u4f1a",
                            submitBtnText: "\u67e5\u770b\u66f4\u591a\u7ea6\u4f1a"
                        },
                        callBack: function (a) {
                            a.status === "ok" && (location.href = "/dating")
                        }
                    });
                    g.show()
                } else h.showTips({json: b, evt: a, triggerElem: c})
            }), k.doLog({parameter: {method: "date_apply"}, elem: c})
        }, onApplyDate: function (a) {
            var b = d(a.currentTarget);
            b.trigger("applyDate:success", [b])
        }, doDealApply: function (a, b) {
            var c = d(a.currentTarget), e = c.data("type");
            if (e == 1 && !u.get("notShowDealDate")) {
                var f = new s(null, {
                    title: "\u786e\u8ba4\u540c\u610f",
                    data: {
                        type: "warning",
                        content: "\u6bcf\u4e2a\u7ea6\u4f1a\u53ea\u80fd\u540c\u610f\u4e00\u4e2a\u4eba\u7684\u8bf7\u6c42\uff0c\u8bf7\u614e\u91cd\u9009\u62e9\uff0c\u4e0d\u8981\u592a\u82b1\u5fc3\u54e6\uff01",
                        desc: "\u7ea6\u4f1a\u5c0f\u63d0\u793a:\u8bf7\u5728\u719f\u6089\u7684\u5730\u65b9\u89c1\u9762\uff0c\u6ce8\u610f\u4eba\u8eab\u8d22\u4ea7\u5b89\u5168\uff0c\u9632\u6b62\u88ab\u9a97",
                        isHideCancel: !1,
                        isShowCheckbox: !0,
                        checkBoxText: "\u4e0d\u518d\u8be2\u95ee"
                    },
                    callBack: function (c) {
                        if (c.status === "ok") {
                            var d = f.$checkbox.is(":checked") ? 1 : 0;
                            d && u.set("notShowDealDate", 1), v.doDealRequest(a, b)
                        }
                    }
                });
                f.show(), f.$mainElem.css("width", "522px")
            } else v.doDealRequest(a, b)
        }, doDealRequest: function (a, b) {
            var c = d(a.currentTarget), f = c.data("type");
            if (!d.isPlainObject(this.dealRequest) || this.dealRequest.readyState === 4)this.dealRequest = e.postJSON("dealApply", {
                applyId: b,
                pass: f
            }, function (b) {
                var d = parseInt(b.code, 10) || 1;
                h.showTips({
                    json: b,
                    evt: a,
                    triggerElem: c
                }) || (f == 1 ? (v.onDealApply(a), c.parent().html('<span class="btn-operate-text btn-operate-agree" href="javascript:;">\u5df2\u540c\u610f</span>')) : c.parent().html('<span class="btn-operate-text btn-operate-over" href="javascript:;">\u5df2\u5ffd\u7565</span>'))
            }), k.doLog({parameter: {method: "dealApply"}, elem: c})
        }, onDealApply: function (a) {
            var b = d(a.currentTarget);
            b.trigger("dealDate:agree", [b])
        }, doFateLike: function (a, b) {
            var c = d(a.currentTarget);
            e.postJSON("fateResponse", {flag: 1, id: b}, function (b) {
                var d = parseInt(b.code) || 0;
                if (!h.showTips({json: b, evt: a, triggerElem: c})) {
                    var e = new q(null, {autoClose: !0, data: {type: "correct", text: "\u64cd\u4f5c\u6210\u529f"}});
                    e.show(), setTimeout(function () {
                        location.reload()
                    }, 1500)
                }
            }), k.doLog({parameter: {method: "fate_fav"}, elem: c})
        }, doFateDislike: function (a, b) {
            var c = d(a.currentTarget);
            e.postJSON("fateResponse", {flag: 2, id: b}, function (b) {
                var d = parseInt(b.code) || 0;
                if (!h.showTips({json: b, evt: a, triggerElem: c})) {
                    var e = new q(null, {autoClose: !0, data: {type: "correct", text: "\u64cd\u4f5c\u6210\u529f"}});
                    e.show(), e.delayHide(1500), setTimeout(function () {
                        location.reload()
                    }, 1500)
                }
            }), k.doLog({parameter: {method: "fate_pass"}, elem: c})
        }
    };
    return v
});
define("widget/tips/FastTips", function (a, b, c) {
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/Utils"), g = e.extend({
        init: function (a, b) {
            this.$elem = null, this.data = a, this.config = b, this._timer = null
        }, render: function () {
            this.$elem = d('<div class="fast-tips js-top-tips"></div>').appendTo("body");
            return this.$elem
        }, show: function (a, b, c) {
            this.$elem === null && this.render();
            !c || c === "" ? this.$elem.hide() : (this.$triggerElem = a, this._timer && clearTimeout(this._timer), b = b || "success", b === "error" ? c = '<div class="fast-tips-inner"><p class="text-middle-tips"><span class="fS14"><em class="icon-error-m"></em>' + c + "</span></p></div>" : c = '<div class="fast-tips-inner"><p class="text-middle-tips"><span class="fS14"><em class="icon-correct-m"></em>' + c + "</span></p></div>", this.$elem.html(c), this.setPosition(), this.onTimerClose())
        }, onTimerClose: function () {
            var a = this;
            this._timer = setTimeout(function () {
                a.onHide()
            }, 2e3)
        }, onHide: function () {
            var a = this;
            this.$elem.stop().animate({duration: 600, easing: "easeInOutExpo", height: 0, marginTop: 0}, function () {
                a.$elem.hide()
            })
        }, setPosition: function () {
            var a = this.$triggerElem.offset();
            this.$elem.css({
                display: "block",
                top: a.top,
                left: a.left - this.$elem.width() / 2 + this.$triggerElem.width() / 2,
                height: 0,
                marginTop: 0
            });
            var b = this.$elem[0].scrollHeight;
            this.$elem.stop().animate({
                duration: 600,
                easing: "easeInOutExpo",
                height: b,
                marginTop: "-" + (b + 5) + "px"
            })
        }
    }), h = null;
    return {
        getInstance: function () {
            h == null && (h = new g);
            return h
        }, show: function (a, b) {
            d.isPlainObject(arguments[0]) ? this.getInstance().show(arguments[0].$trigger, arguments[0].type, arguments[0].text) : this.getInstance().show($trigger, a, b)
        }
    }
});
define("widget/box/introBox/DisLikeBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/box/introBox/Box"), f = a("utils/tmpl"), g = a("utils/Utils"), h = a("utils/DataSource"), i = a("model/UserData"), j = a("widget/box/introBox/CautionBox").getInstance(), k = a("utils/Error"), l = d(document.body), m = e.extend({
        preRender: function () {
            return {bodyContent: f.formatTemplate(a("template/introbox/disLike"), {})}
        }, postRender: function () {
            this._super(), this.$elem.addClass("introlayer-dislike"), this.$inputElems = this.$elem.find("input"), this.$btnAreaElem = this.$elem.find(".n-btn-box").find(".js-btn"), this.$arrowElem = this.$elem.find(".js-arrow")
        }, bindEvent: function () {
            this._super(), this.$elem.delegate("input", "click", d.proxy(this.onSelectVal, this)), this.$elem.delegate(".submit-trigger", "click", d.proxy(this.onSubmit, this))
        }, reset: function () {
            this.$elem.find("input").attr("checked", !1), this.disableBtn()
        }, postShow: function () {
            this.$elem.find(".js-sexName").html(g.userSexName(this.data.user.sex))
        }, setPosition: function () {
            var a = this.$trigger.offset(), b = this.$trigger.data("direction");
            b === "left" ? (this.$arrowElem.css({left: 238}), this.$mainElem.css({
                top: a.top + this.$trigger.innerHeight() + 10,
                left: a.left - this.$mainElem.innerWidth() + 36 + this.$trigger.innerWidth() / 2
            })) : (this.$arrowElem.css({left: 20}), this.$mainElem.css({
                top: a.top + this.$trigger.innerHeight() + 10,
                left: a.left - 10
            }))
        }, onSelectVal: function (a) {
            this.onSetBtnStatus(), this.onCheckVal(a)
        }, onSetBtnStatus: function () {
            this.$inputElems.filter(":checked").size() === 0 ? this.disableBtn() : this.enableBtn()
        }, onCheckVal: function (a) {
        }, onSubmit: function (a, b) {
            if (!(!this.isValid || d.isPlainObject(this.request) && this.request.readyState !== 4)) {
                var c = this.parseParams(b), e = this, f = d(a.currentTarget);
                this.$elem && g.btnSending.call(this, this.$elem.find(".submit-trigger")), this.request = h.postJSON("addShield", c, function (b) {
                    e.$elem && g.btnSended.call(e, e.$elem.find(".submit-trigger"));
                    var c = parseInt(b.code) || 1;
                    if (!k.showTips({json: b, evt: a, triggerElem: f}))if (c === 1)e.onSuccess(); else {
                        var d = null;
                        c === 423 && (i.loginUserIsVip ? i.loginUserIsSuperVip || (d = {
                            icon: "warning",
                            title: "\u60a8\u5df2\u8fbe\u5230\u4e0d\u559c\u6b22\u4eba\u6570\u4e0a\u9650",
                            desc: "\u5347\u7ea7\u4f1a\u5458\uff0c\u4e0d\u559c\u6b22\u4eba\u6570\u53ef\u6269\u5145\u52305000\u4eba",
                            btnLog: "dislikeLimit",
                            buttonText: "\u5347\u7ea7\u4f1a\u5458",
                            buttonLink: "/pay/services"
                        }) : d = {
                            icon: "warning",
                            title: "\u60a8\u5df2\u8fbe\u5230\u4e0d\u559c\u6b22\u4eba\u6570\u4e0a\u9650",
                            desc: "\u5f00\u901a\u9ad8\u7ea7VIP\u82b1\u7530\u4f1a\u5458\uff0c\u4e0d\u559c\u6b22\u4eba\u6570\u53ef\u6269\u5145\u52305000\u4eba",
                            btnLog: "dislikeLimit",
                            buttonText: "\u5f00\u901a\u4f1a\u5458",
                            buttonLink: "/pay/services"
                        }), c === 424 && (d = {
                            icon: "warning",
                            title: "\u60a8\u5df2\u8fbe\u5230\u4e0d\u559c\u6b22\u4eba\u6570\u4e0a\u9650",
                            desc: "\u6700\u591a\u53ea\u80fd\u4e0d\u559c\u6b225000\u4eba",
                            btnLog: "dislikeLimit",
                            buttonText: "\u67e5\u770b\u4e0d\u559c\u6b22\u7684\u4eba",
                            buttonLink: "/dislike"
                        }), e.$elem && e.hide(), d !== null && j.show(null, {triggerElem: e.$trigger, data: d})
                    }
                })
            }
        }, parseParams: function (a) {
            var b = {};
            a ? (b.userId = typeof a.userId != "undefined" ? a.userId : this.data.user.id, b.reason = typeof a.reason != "undefined" ? a.reason : this.$inputElems.filter(":checked").val()) : (b.userId = this.data.user.id, b.reason = this.$inputElems.filter(":checked").val());
            return b
        }, onSuccess: function () {
            this.$elem && this.hide(), this.config.target.$elem.trigger("dislike:success", [this.config.target])
        }, enableBtn: function () {
            this.$btnAreaElem.removeClass("disabled"), this.isValid = !0
        }, disableBtn: function () {
            this.$btnAreaElem.addClass("disabled"), this.isValid = !1
        }
    }), n = null;
    return {
        getInstance: function () {
            n === null && (n = new m);
            return n
        }
    }
});
define("widget/box/introBox/Box", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/box/Box"), f = a("utils/Utils"), g = a("utils/tmpl"), h = d(document.body), i = e.extend({
        init: function (a, b) {
            this._super(a, b), this.isBindAutoClose = !1
        }, preRender: function () {
            return {}
        }, renderTmpl: function (b) {
            return d(g.formatTemplate(a("template/introbox/basic"), b))
        }, postRender: function () {
            this.$markElem = this.$elem.find(".js-mask"), this.$iframeElem = this.$elem.find(".js-iframe"), this.isIe6 = this.$iframeElem.size() === 0 ? !0 : !1, this.$mainElem = this.$elem.find(".js-main")
        }, show: function (a, b) {
            this._super(), b && (d.extend(this.config, b), b.data && d.extend(this.data, b.data)), this.isBindAutoClose && this.unBindAutoClose(), b && b.triggerElem ? this.$trigger = this.config.triggerElem : typeof a != "undefined" && a !== null && (this.$trigger = d(a.currentTarget)), this.hideCallBack = this.config.hideCallBack, !this.isBindAutoClose && this.config.autoClose && (this.autoClose = f.autoClose.call(this), this.isBindAutoClose = !0), this.postShow(), this.setPosition();
            return
        }, postShow: function () {
            this.config.isShowMaskLayer && this.$elem.css("zIndex", 1e3)
        }, hide: function () {
            this.reset(), this.hideCallBack && this.hideCallBack(), this.config.autoClose && this.unBindAutoClose(), this._super()
        }, unBindAutoClose: function () {
            h.unbind("click", this.autoClose), this.isBindAutoClose = !1
        }, reset: function () {
        }
    });
    return i
});
define("template/introbox/basic", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="introlayer"><table class="introlayer-table js-main"><tbody><tr><td class="introlayer-top-left"></td><td class="introlayer-top-center"></td><td class="introlayer-top-right"></td></tr><tr><td class="introlayer-middle-left"></td><td class="introlayer-middle-center"><div class="introlayer-body js-body">', bodyContent, '</div></td><td class="introlayer-middle-right"></td></tr><tr><td class="introlayer-bottom-left"></td><td class="introlayer-bottom-center"></td><td class="introlayer-bottom-right"></td></tr></tbody></table></div>');
        return p.join("")
    }
});
define("widget/box/introBox/CautionBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("utils/Utils"), f = a("widget/box/introBox/Box"), g = a("utils/tmpl"), h = d(document.body), i = d(window), j = f.extend({
        init: function (a, b) {
            this._super(a, b), this.config.autoClose = !0
        }, preRender: function () {
            return {bodyContent: '<div class="introlayer-main"><em class="introlayer-arrow-down js-arrow"></em><div class="js-content"></div></div>'}
        }, renderModuleTmpl: function () {
            var b = d.extend({}, this.data);
            b.isShowClose = typeof this.config.isShowClose != "undefined" ? this.config.isShowClose : !0;
            return g.formatTemplate(a("template/introbox/cautionbox"), b)
        }, postRender: function () {
            this._super(), this.$elem.addClass("introlayer-cautionBox")
        }, postShow: function () {
            this.$elem.find(".js-content").html(d(this.renderModuleTmpl()))
        }, setPosition: function () {
            var a = this.$trigger.offset(), b = this.$elem.find(".js-arrow");
            this.$mainElem.css({left: a.left - (b.position().left + b.width() / 2) + this.$trigger.width() / 2 + 6});
            var c = i.scrollTop(), e = d("#header").height();
            a.top - c - e > this.$mainElem.height() ? (b[0].className = "introlayer-arrow-down js-arrow", this.$mainElem.css({top: a.top - this.$mainElem.innerHeight() - 10})) : (b[0].className = "introlayer-arrow-up js-arrow", this.$mainElem.css({top: a.top + this.$trigger.innerHeight() + 12}))
        }
    }), k = null;
    return {
        getInstance: function (a, b) {
            k === null && (k = new j(a, b));
            return k
        }
    }
});
define("template/introbox/cautionbox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) {
            p.push("");
            var icons = {
                correct: "icon-correct-m",
                warning: "icon-warning-m"
            }, className = typeof icon != "undefined" && icons[icon] ? icons[icon] : icons.correct, dataLog = typeof btnLog != "undefined" && btnLog ? 'data-log="' + btnLog + '"' : "";
            p.push("<div ", dataLog, ">"), isShowClose && p.push('<a class="introlayer-close icon-close close-trigger" title="\u5173\u95ed" href="javascript:;"></a>'), p.push('<h3 class="introlayer-cautionBox-title"><em class="', className, '"></em><span>', title, '</span></h3><p class="introlayer-cautionBox-desc">', desc, '</p><div class="introlayer-ft n-btn-box"><div class="js-btn"><a class="btn btn-red click-trigger" target="_blank" href="', buttonLink, '">', buttonText, '</a><a class="btn btn-gray close-trigger" href="javascript:;">\u4ee5\u540e\u518d\u8bf4</a></div></div></div>')
        }
        return p.join("")
    }
});
define("template/introbox/disLike", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="introlayer-main"><em class="introlayer-arrow-up js-arrow"></em><a class="introlayer-close icon-close close-trigger" title="\u5173\u95ed" href="javascript:;"></a><h3 class="introlayer-feedGuide-title">\u4e0d\u559c\u6b22<span class="js-sexName"></span>\uff1f\u9009\u62e9\u7406\u7531\u8ba9\u63a8\u8350\u66f4\u51c6\uff01</h3><ul class="introlayer-labelList"><li><label class="label-tag"><input type="radio" name="unLikeReason" value="1" />\u5f62\u8c61</label></li><li><label class="label-tag"><input type="radio" name="unLikeReason" value="2" />\u5de5\u4f5c\u884c\u4e1a</label></li><li><label class="label-tag"><input type="radio" name="unLikeReason" value="3" />\u5174\u8da3\u7231\u597d</label></li><li><label class="label-tag"><input type="radio" name="unLikeReason" value="4" />\u8d44\u6599\u771f\u5b9e\u6027</label></li><li><label class="label-tag"><input type="radio" name="unLikeReason" value="6" />\u91cd\u590d\u63a8\u8350</label></li><li><label class="label-tag"><input type="radio" name="unLikeReason" value="5" />\u5176\u4ed6</label></li></ul><div class="introlayer-ft n-btn-box"><div class="js-btn disabled"><a class="btn btn-red n-btn-sure submit-trigger" data-loadingtext="\u63d0\u4ea4\u4e2d..." href="javascript:;">\u786e\u5b9a\u4e0d\u559c\u6b22</a>&nbsp;&nbsp;<a class="btn btn-gray close-trigger" href="javascript:;">\u53d6\u6d88</a></div></div></div>');
        return p.join("")
    }
});
define("widget/box/floatBox/BuyServiceBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/box/floatBox/BasicConfirmBox"), f = a("widget/box/floatBox/BuyConfirmBox"), g = a("utils/tmpl"), h = a("utils/Error"), i = a("utils/DataSource"), j = a("utils/Log"), k = a("model/UserData"), l = e.extend({
        defaults: {isBlankTab: !1},
        init: function (a, b) {
            this._super(a, b), this.config = d.extend({}, this.defaults, b), this.data = this.config.data || {}, this.serviceData = d.extend({}, l.SERVICES_INFO_DEFAULT, l.SERVICES_INFO[this.config.service])
        },
        parseData: function () {
            var a = this.data;
            this.serviceData.btnText && (a.btnText = this.serviceData.btnText()), this.serviceData.seriviceParam.serviceType && (a.serviceType = this.serviceData.seriviceParam.serviceType);
            return a
        },
        preRender: function () {
            return {
                title: this.serviceData.title,
                bodyContent: g.formatTemplate(a("template/floatbox/buyServiceBox"), this.parseData())
            }
        },
        postRender: function () {
            this._super(), this.$elem.addClass("poplayer-buy"), this.serviceData.seriviceParam.serviceType == 8 && this.$elem.addClass("poplayer-buySvip")
        },
        bindEvent: function () {
            this._super(), this.$elem.delegate(".submit-trigger", "click", d.proxy(this.onSubmit, this))
        },
        checkValid: function () {
            this.$inputElems.filter(":checked").size() === 0 ? this.disableBtn() : this.enableBtn()
        },
        show: function (a) {
            this._super(), this.$target = a;
            var b = this;
            setTimeout(function () {
                b.loadData()
            }, 300)
        },
        onClose: function () {
            this.hide(), this.config.closeCallBack && this.config.closeCallBack()
        },
        loadData: function () {
            var a = this, b = this.serviceData;
            i.postJSON(b.url, b.seriviceParam, function (b) {
                if (b && b.code === 1) {
                    var c = d.extend({loginUser: k.getLoginUser(), itemType: a.serviceData.itemType}, b);
                    a.renderServiceContent(c), a.data = b, a.checkValid()
                }
            })
        },
        renderServiceContent: function (b) {
            this.$contentElem.removeClass("poplayer-buy-loading").html(g.formatTemplate(a("template/floatbox/serviceContent"), b)), this.$inputElems = this.$contentElem.find(".js-list input[type=radio]")
        },
        onSubmit: function () {
            if (!(!this.isValid || d.isPlainObject(this.request) && this.request.readyState !== 4)) {
                var a = this.parseParams(), b = this;
                this.request = i.postJSON(this.serviceData.dealUrl, a, function (a) {
                    a && a.status === 1 && (b.hide(), b.onSuccess(a))
                }), j.doLog({parameter: {method: "tobuy" + b.config.service}, elem: "body"})
            }
        },
        parseParams: function () {
            var a = {}, b = this.$inputElems.filter(":checked");
            a.serviceId = b.val(), this.$target && (a.keyfrom = j.buyVipKeyFrom(this.$target));
            return a
        },
        onSuccess: function (a) {
            var b = new f(null, {
                data: a.payInfo.dealInfo,
                userAccount: a.payInfo.userAccount,
                isBlankTab: this.config.isBlankTab,
                logName: this.config.service,
                successText: this.config.successText,
                successCallBack: d.proxy(this.buySuccess, this),
                redirectCallBack: d.proxy(this.buyRedirect, this)
            });
            b.show()
        },
        buySuccess: function (a) {
            this.config.successCallBack && this.config.successCallBack(a)
        },
        buyRedirect: function () {
            this.config.redirectCallBack && this.config.redirectCallBack()
        }
    });
    l.SERVICES_INFO = {
        visitor: {title: "\u5168\u90e8\u8bbf\u5ba2\u7279\u6743", url: "visitBuy"},
        superShow: {title: "\u8d85\u7ea7\u5c55\u793a\u7279\u6743", url: ""},
        onlineremind: {title: "\u4e0a\u7ebf\u63d0\u9192\u7279\u6743", url: "informBuy"},
        singlesDay: {
            title: "\u82b1\u7530\u5bf9-\u63d0\u524d\u8131\u5355\u5149\u68cd\u8282\u6d3b\u52a8\u4ea4\u8d39",
            url: "singlesDayBuy"
        },
        vip: {
            title: "\u5f00\u901aVIP\u4f1a\u5458", url: "vipBuy", itemType: "vip", btnText: function () {
                return k.getLoginUser().isNormalVip ? "\u7acb\u5373\u7eed\u8d39" : "\u7acb\u5373\u5f00\u901a"
            }, seriviceParam: {serviceType: 7}
        },
        svip: {
            title: "\u5f00\u901a\u9ad8\u7ea7VIP\u4f1a\u5458", url: "vipBuy", itemType: "vip", btnText: function () {
                var a = "\u7acb\u5373\u5f00\u901a";
                k.getLoginUser().isNormalVip ? a = "\u7acb\u5373\u5347\u7ea7" : k.getLoginUser().isSuperVip && (a = "\u7acb\u5373\u7eed\u8d39");
                return a
            }, seriviceParam: {serviceType: 8}
        },
        upgradevip: {
            title: "\u5347\u7ea7\u9ad8\u7ea7VIP\u4f1a\u5458",
            url: "upgradeVip",
            itemType: "vip",
            btnText: function () {
                return "\u7acb\u5373\u5347\u7ea7"
            },
            dealUrl: "createUpgradeDeal",
            seriviceParam: {serviceType: 8}
        }
    }, l.SERVICES_INFO_DEFAULT = {title: "", url: "", dealUrl: "createNewDeal", seriviceParam: {}};
    return l
});
define("widget/box/floatBox/BasicConfirmBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/tmpl"), g = a("utils/Utils"), h = a("utils/Error"), i = a("utils/DataSource"), j = a("utils/Log"), k = e.extend({
        postRender: function () {
            this._super(), this.isValid = !1, this.$btnAreaElem = this.$elem.find(".n-btn-box").find(".js-btn"), this.$contentElem = this.$elem.find(".js-content")
        }, checkValid: function () {
        }, enableBtn: function () {
            this.$btnAreaElem.removeClass("disabled"), this.isValid = !0
        }, disableBtn: function () {
            this.$btnAreaElem.addClass("disabled"), this.isValid = !1
        }
    });
    return k
});
define("template/floatbox/buyServiceBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push(""), serviceType && serviceType == 8 && p.push('<div class="poplayer-buy-left">'), p.push('<div class="poplayer-bd js-content poplayer-buy-loading"><div class="loadingBox"><span><em class="icon-loadingB"></em>\u6570\u636e\u83b7\u53d6\u4e2d...</span></div></div><div class="poplayer-ft n-btn-box">'), typeof cautionText != "undefined" && cautionText && p.push('<p class="poplayer-buy-caution">', cautionText, "</p>"), p.push('<div class="poplayer-btn js-btn disabled"><a class="btn btn-red n-btn-sure submit-trigger" href="javascript:;">', btnText, "</a></div></div>"), serviceType && serviceType == 8 && p.push('</div><div class="poplayer-buy-right"><p class="poplayer-mt">\u9ad8\u7ea7VIP\u62e5\u6709<b class="text-red">23</b>\u9879\u4ea4\u53cb\u7279\u6743</p><p class="text-lightGray">\u66f4\u591a\u7cbe\u51c6\u7b5b\u9009\u6761\u4ef6</p><p class="text-lightGray">\u66f4\u591a\u63a8\u8350\u673a\u4f1a</p><p class="text-lightGray">\u9690\u8eab\u8bbf\u95ee\u7279\u6743</p><p class="text-lightGray">\u67e5\u770b\u5168\u90e8\u6765\u8bbf\u7279\u6743</p><p class="text-lightGray">\u4eca\u65e5\u6700\u8350-\u4e13\u5c5e\u4e8e\u60a8\u7684\u79c1\u4eba\u63a8\u8350</p><p class="link-nu"><a target="_blank" href="/pay/services">\u67e5\u770b\u5176\u5b83\u7279\u6743&gt;&gt;</a></p></div>'), p.push("");
        return p.join("")
    }
});
define("template/floatbox/serviceContent", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) {
            p.push(""), typeof description != "undefined" && description !== "" && p.push('<p class="poplayer-mt">', description, "</p>"), p.push('<ul class="js-list">');
            if (typeof list != "undefined" && list.length) {
                p.push("");
                for (var i = 0, l = list.length; i < l; i++) {
                    var item = list[i];
                    p.push('<li><input id="service', item.id, '" class="form-radio" name="serviceId" value="', item.id, '" type="radio"'), item.isDef && p.push('checked="checked"'), p.push('><label class="form-radio-label" for="service', item.id, '">'), item.introduction !== "undefined" && p.push("", item.introduction, ""), p.push("</label>"), list[0].buyType == 1 ? (p.push(""), typeof item.rmb != "undefined" && "rmb" in item && p.push('<span class="poplayer-buy-rmb"><em></em><b class="text-red">', item.rmb, "</b>\u5143</span>"), p.push(""), typeof item.priceDescription != "undefined" && "priceDescription" in item && p.push('<span class="text-md">', item.priceDescription, "</span>"), p.push("")) : (p.push('<span class="poplayer-buy-price"><b class="text-red">', item.amount, "</b>\u4e2a\u82b1\u7530\u5e01</span>"), item.amount != item.originalPrice && p.push('&nbsp;<del class="poplayer-buy-originalPrice">\u539f\u4ef7', item.originalPrice, "</del>"), p.push(""), typeof item.discountTips != "undefined" && item.discountTips !== "" && p.push('<span class="poplayer-visitorLimit-gift"><em></em>', item.discountTips, "</span>"), p.push(""), typeof item.rmb != "undefined" && "rmb" in item && p.push('<span class="poplayer-buy-rmb"><em></em>(', item.rmb, "\u5143)</span>"), p.push("")), p.push("</li>")
                }
                p.push("")
            } else p.push('<li>\u83b7\u53d6\u670d\u52a1\u6570\u636e\u5931\u8d25\uff0c\u8bf7<a href="javascript:;" class="link-lightBlue retry-trigger">\u91cd\u8bd5</a></li>');
            p.push("</ul>")
        }
        return p.join("")
    }
});
define("utils/storage/LocalStorage", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = {}, f = d.browser.msie && d.browser.version < 9 ? !0 : !1, g = null;
    e.set = function (a, b) {
        var c = window;
        try {
            var d = window.localStorage;
            if (!f && d)if (b != undefined)d[a] = b; else return d[a] || ""; else {
                if (!f)return "$No$";
                g || (g = c.document.createElement("div"), g.innerHTML = '<input style="display:none;behavior:url(#default#userData)" id="usersData">', c.document.body.appendChild(g), g = c.document.getElementById("usersData"));
                try {
                    g.load("oXMLBranch")
                } catch (h) {
                }
                if (b == undefined)return g.getAttribute(a) || "";
                b == "" ? g.removeAttribute(a) : g.setAttribute(a, b);
                try {
                    g.save("oXMLBranch")
                } catch (h) {
                }
            }
        } catch (h) {
            e.clear()
        }
    }, e.get = function (a) {
        return e.set(a)
    }, e.clear = function () {
        var a = /^idphotoDiggList/, b = window.localStorage;
        if (!f && b)try {
            for (var c in b)c.match(a) || (b[c] = "", b.removeItem(c))
        } catch (d) {
        } else if (f && g) {
            var e = new Date;
            e.setSeconds(e.getSeconds() - 1), g.expires = e.toUTCString();
            try {
                g.save("oXMLBranch")
            } catch (d) {
            }
        }
    };
    return e
});
define("widget/box/floatBox/PicUploadBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/tmpl"), g = a("utils/Utils"), h = a("model/UserData"), i = a("sendbox/PhotoSendBox"), j = a("widget/box/floatBox/TipsBox"), k = a("utils/Log"), l = e.extend({
        init: function (a, b) {
            this._super(a, b), this.callBack = b && b.callBack || null
        }, preRender: function () {
            return {
                title: "\u4e0a\u4f20\u7167\u7247",
                subtitle: "\u751f\u6d3b\u7167\u6216\u8005\u6652\u7279\u957f\u4f1a\u66f4\u53d7\u6b22\u8fce\u54e6~",
                bodyContent: f.formatTemplate(a("template/floatbox/uploadPic"), {})
            }
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-uploadPhoto"), this.photoSendBox = new i(this.$elem.find(".js-body")), this.photoSendBox.render()
        }, bindEvent: function () {
            this._super(), this.$elem.bind("trend:send:success", d.proxy(this.onSendSuccess, this))
        }, show: function (a) {
            this._super(), k.doLog({parameter: {method: "loadpic"}, elem: d(a.currentTarget)})
        }, onSendSuccess: function (a, b) {
            this.$elem.trigger("trend:new", [b]), this.callBack ? (this.hide(), this.callBack(b)) : this.successCallBack()
        }, successCallBack: function () {
            var a = this;
            if (d("body").hasClass("profile") && h.isLoginUserPage()) {
                this.hide();
                var b = new j(null, {
                    data: {
                        type: "correct",
                        text: "\u4e0a\u4f20\u6210\u529f\uff01",
                        desc: "\u60a8\u7684\u52a8\u6001\u5c06\u88ab\u63a8\u9001\u7ed9\u5408\u9002\u7684TA\uff0c\u5e76\u540c\u6b65\u5230\u60a8\u7684\u76f8\u518c"
                    }
                });
                b.show(), b.delayHide(1500)
            } else this.$elem.find(".js-send-btn").addClass("n-display-show"), setTimeout(function () {
                a.animateHide()
            }, 1e3)
        }, animateHide: function () {
            var a = d(".header-navi > li").last(), b = a.offset(), c = {
                top: b.top - d(document).scrollTop(),
                left: b.left,
                width: a.width(),
                height: a.height(),
                opacity: 0
            }, e = this;
            this.$elem.find(".js-mask").hide(), a.addClass("hover"), this.$mainElem.css("oveflow", "hidden").animate(c, 1500, "easeInOutExpo", function () {
                a.removeClass("hover"), e.$elem.fadeOut("slow", function () {
                    e.hide()
                })
            })
        }
    });
    return l
});
define("sendbox/PhotoSendBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("sendbox/BasicSendBox"), f = a("sendbox/upload/PicPhotoUpload"), g = a("utils/Log"), h = e.extend({
        _defaults: {
            ajaxUrl: "sendStatus",
            maxHeight: 105,
            isAutoHeight: !0
        }, init: function (a, b) {
            b = d.extend({}, this._defaults, b), this._super(a, b)
        }, postRender: function () {
            this._super(), this.$uploadBtn = this.$elem.find(".js-upload-btn"), this.photoUpload = new f(this.$elem.find(".js-upload"), {
                trigger: this.$uploadBtn,
                enableDrag: !0,
                MAX_LEN: 4,
                width: 127,
                height: 127,
                isShowPercentText: !0,
                isShowThumb: !0,
                flashSize: [{width: 127, height: 127}]
            }), this.photoUpload.render()
        }, bindEvent: function () {
            this._super(), this.$elem.bind("upload:select upload:delete", d.proxy(this.onCheckUploadBtn, this)), this.$elem.bind("upload:success upload:delete", d.proxy(this.onCheckTextarea, this)), this.$elem.bind("upload:start upload:delete upload:allUploaded", d.proxy(this.onCheckInput, this))
        }, parseParams: function () {
            var a = {}, b = d.trim(this.$textarea.val());
            this.photoUpload.getFileCount().validCount > 0 && (a.photos = this.photoUpload.getReverseImages()), b !== "" && (a.content = b);
            return a
        }, checkInputVal: function () {
            var a = this.photoUpload.getFileCount().validCount;
            return a === 0 || this.photoUpload.uploading || this.wordCounter.isError ? !1 : !0
        }, onCheckUploadBtn: function () {
            this.photoUpload.totalCount === 4 ? this.$uploadBtn.addClass("upload-upload-flash-hidden") : this.$uploadBtn.removeClass("upload-upload-flash-hidden")
        }, onCheckTextarea: function () {
            var a = this.photoUpload.getFileCount().validCount, b = a > 0 ? !0 : !1;
            b ? this.isBindDefaultTip || (this.isBindDefaultTip = !0, this.bindDefaultTip(), this.$elem.find(".js-publish-textarea").removeClass("publish-textarea-disabled").find("textarea").attr("disabled", !1)) : (this.isBindDefaultTip = !1, this.$elem.find(".js-publish-textarea").addClass("publish-textarea-disabled").find("textarea").attr("disabled", !0))
        }, onSuccess: function (a) {
            this.$elem.trigger("trend:send:success", [a])
        }, onSendSuccessLog: function () {
            g.doLog({parameter: {method: "updatapic"}, elem: "body"})
        }
    });
    return h
});
define("sendbox/upload/PicPhotoUpload", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/upload/BasicUpload"), f = e.extend({
        checkValue: function () {
            var a = this.getFileCount().totalCount;
            return this.uploading || a > this.config.MAX_LEN ? !1 : !0
        }
    });
    return f
});
define("widget/upload/BasicUpload", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/Module"), f = a("utils/upload/MultiUpload"), g = a("utils/Utils"), h = a("utils/tips/TextTips"), i = a("utils/widget/OimageUrl"), j = a("utils/tmpl"), k = e.extend({
        defaults: {
            width: 200,
            height: 160,
            MAX_LEN: null,
            enableDrag: !1,
            isShowPercentText: !1,
            isShowErrorFile: !1,
            isShowThumb: !1
        }, init: function (a, b) {
            this._super.apply(this, arguments), this.$list = this.$elem.find(".js-photoList"), this.$trigger = this.config.trigger, this.$tips = this.$elem.find(".js-tips"), this.$rule = this.$elem.find(".js-rule"), this.$errorTips = this.$elem.find(".js-upload-tips"), this.onClear()
        }, onClear: function () {
            this.$list.find(".js-item").remove(), this.$trigger.removeClass("upload-upload-flash-hidden"), this.listElems = {}, this.list = [], this.totalCount = 0, this.errorCount = 0, this.uploading = !1, this.onHideErrorTips()
        }, postRender: function () {
            this.upload = new f(this.$trigger, {
                flashSize: this.config.flashSize,
                enableDrag: this.config.enableDrag,
                currentCount: d.proxy(this.currentCount, this),
                MAX_LEN: this.config.MAX_LEN,
                MIN_PICSIZE: this.config.MIN_PICSIZE,
                isShowErrorFile: this.config.isShowErrorFile,
                selectFiles: d.proxy(this.selectFiles, this),
                selectFilesError: d.proxy(this.selectFilesError, this),
                onSelect: d.proxy(this.onUploadSelect, this),
                onSelectError: d.proxy(this.onUploadSelectError, this),
                onShowThumb: d.proxy(this.onUploadShowThumb, this),
                onUpload: d.proxy(this.onUploadUpload, this),
                onProgress: d.proxy(this.onUploadProgress, this),
                onSuccess: d.proxy(this.onUploadSuccess, this),
                onError: d.proxy(this.onUploadError, this),
                onAllUploaded: d.proxy(this.onUploadAllUploaded, this)
            })
        }, bindEvent: function () {
            this.$elem.delegate(".delete-trigger", "click", d.proxy(this.onDelete, this)), this.$elem.delegate(".resend-trigger", "click", d.proxy(this.onResend, this))
        }, selectFiles: function (a, b) {
            this.setTotalCount(this.config.isShowErrorFile ? a : b), this.$elem.trigger("upload:select"), b > 0 && (this.uploading = !0, this.$elem.trigger("upload:start")), a === b && this.onHideErrorTips()
        }, selectFilesError: function (a, b) {
            this.onShowErrorTips(a, b)
        }, setTotalCount: function (a) {
            this.totalCount = this.totalCount + a * 1, this.setTips()
        }, setErrorCount: function (a) {
            this.errorCount = this.errorCount + parseInt(a), this.setTips()
        }, onShowErrorTips: function (a, b) {
            if (this.$errorTips.size() > 0) {
                var c = "";
                a === "size" ? c = b + "\u5f20\u7167\u7247\u5927\u5c0f\u4e0d\u7b26\u5408\u89c4\u8303" : a === "format" ? c = b + "\u5f20\u7167\u7247\u683c\u5f0f\u4e0d\u7b26\u5408\u89c4\u8303" : a === "full" && (c = "\u56fe\u7247\u5df2" + b + "\u5f20\uff0c\u5220\u9664\u540e\u518d\u6dfb\u52a0"), h.show(this.$errorTips, {
                    type: "warning",
                    message: c
                })
            }
            this.$rule.hide()
        }, onHideErrorTips: function () {
            this.$errorTips.size() > 0 && h.hide(this.$errorTips), this.$rule.show()
        }, setTips: function () {
            if (this.$tips.size() > 0) {
                var a = this.$tips.find(".js-error-text");
                this.$tips.find(".js-total-count").text(this.totalCount).end().find(".js-error-count").text(this.errorCount), this.totalCount === 0 ? (this.$tips.hide(), a.hide()) : (this.$tips.show(), this.errorCount === 0 ? a.hide() : a.show())
            }
        }, currentCount: function () {
            return this.config.isShowErrorFile ? this.list.length : this.getFileCount().validCount
        }, renderItem: function (b) {
            return d(j.formatTemplate(a("template/sendbox/widget/uploadItem"), {id: b}))
        }, onUploadSelect: function (a, b) {
            this.listElems[a] = this.renderItem(a), this.listElems[a].isValid = b, this.list.push(this.listElems[a]), this.listElems[a].insertBefore(this.$list.find(".js-upload-btn")), this.setItemStatus(a, "init")
        }, onUploadSelectError: function (a, b) {
            this.onUploadError(a, b.type)
        }, onUploadShowThumb: function (a, b) {
            if (this.config.isShowThumb)if (b)this.showThumbImg(a, b); else {
                var c = this, d = new FileReader;
                d.onload = function (b) {
                    !c.listElems[a] || c.showThumbImg(a, b.target.result)
                }, d.readAsDataURL(this.upload.cacheFiles[a])
            }
        }, showThumbImg: function (a, b) {
            var c = this.listElems[a].find(".js-img");
            c.css({width: this.config.width + "px", height: this.config.height + "px"}), c[0].src = b
        }, setItemStatus: function (a, b) {
            this.listElems[a].removeClass(k.CLASSNAME_ARRAY.join(" ")).addClass(k.CLASSNAME_HASHMAP[b])
        }, onUploadUpload: function (a) {
            this.setItemStatus(a, "progress")
        }, onUploadProgress: function (a, b) {
            if (this.listElems[a]) {
                var c = this.listElems[a];
                c.find(".js-percent").css("width", b + "%"), this.config.isShowPercentText && c.find(".js-percent-text").text(b + "%")
            }
        }, onUploadSuccess: function (a, b) {
            !this.listElems[a] || (this.listElems[a].isValid = !0, this.setItemStatus(a, "success"), this.listElems[a].find(".js-img")[0].src = i(b.originalURL, this.config.width, this.config.height, 1), this.listElems[a].originalURL = b.originalURL, this.$elem.trigger("upload:success"))
        }, onUploadAllUploaded: function () {
            this.uploading = !1, this.$elem.trigger("upload:allUploaded")
        }, onUploadError: function (a, b) {
            this.listElems[a].isValid = !1, this.listElems[a].find(".js-error-text").html('<em class="icon-error-s"></em>' + k.ERROR_TEXT[b] || ""), this.setItemStatus(a, "error"), this.setErrorCount(1), this.$elem.trigger("upload:error")
        }, onDelete: function (a) {
            var b = d(a.currentTarget).parents(".js-item").eq(0), c = b.data("fileid"), e = this.listElems[c], f = d.inArray(e, this.list);
            this.list.splice(f, 1), this.upload.removeFile(c), e.remove(), this.setTotalCount("-1"), e.isValid ? this.setErrorCount("0") : this.setErrorCount("-1");
            try {
                delete this.listElems[c]
            } catch (g) {
                this.listElems[c] = null
            }
            this.$elem.trigger("upload:delete"), this.onHideErrorTips(), this.list.length === 0 && this.$elem.trigger("upload:empty")
        }, onResend: function (a) {
            var b = d(a.currentTarget).attr("data-fileId");
            this.upload.onUpload(b)
        }, getFileCount: function () {
            var a = 0;
            if (this.list.length > 0)for (var b = this.list.length - 1; b >= 0; b--)this.list[b].isValid && a++;
            return {totalCount: this.list.length, validCount: a}
        }, getImages: function (a) {
            var b = [];
            if (this.list.length > 0)for (var c = 0, d = this.list.length; c < d; c++)this.list[c].isValid && this.list[c].originalURL && b.push(this.list[c].originalURL);
            return encodeURI(b.join(a || ","))
        }, getReverseImages: function (a) {
            var b = [];
            if (this.list.length > 0)for (var c = this.list.length - 1; c >= 0; c--)this.list[c].isValid && this.list[c].originalURL && b.push(this.list[c].originalURL);
            return encodeURI(b.join(a || ","))
        }, getSubmitData: function () {
            var a = {};
            a.photos = this.getImages();
            return a
        }, checkValue: function () {
            return this.uploading ? !1 : !0
        }
    });
    k.CLASSNAME_HASHMAP = {
        init: "n-upload-state-start",
        progress: "n-upload-state-progress",
        success: "n-upload-state-success",
        error: "n-upload-state-fail"
    }, k.ERROR_TEXT = {
        size: "\u7167\u7247\u5927\u5c0f\u4e0d\u7b26\u5408\u8981\u6c42",
        format: "\u7167\u7247\u683c\u5f0f\u4e0d\u7b26\u5408\u8981\u6c42",
        500: "\u670d\u52a1\u5668\u51fa\u9519"
    }, k.CLASSNAME_ARRAY = ["n-upload-state-start", "n-upload-state-progress", "n-upload-state-success", "n-upload-state-fail"], c.exports = k
});
define("utils/upload/MultiUpload", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("utils/Utils"), f = a("utils/flash/FlashProxy"), g = a("lib/swfobject"), h = function (a, b) {
        this.$input = a, this.$elem = a, this.config = d.extend({}, this.defaults, b), this.isHtml5Upload = !1, this.uploadFiles = [], this.cacheFileId = [], this.cacheFiles = {}, this.isHtml5 = window.File && window.FileReader && window.FileList && window.Blob && window.FormData ? !0 : !1, this.render()
    };
    h.IMAGE_FORMAT = ["jpg", "jpeg", "gif", "png", "bmp"], h.prototype = {
        defaults: {
            flashSize: [],
            MIN_PICSIZE: 10240,
            MAX_PICSIZE: 8388608,
            MAX_LEN: null,
            enableDrag: !1,
            isShowErrorFile: !1,
            selectFiles: function () {
            },
            selectFilesError: function () {
            },
            onSelect: function () {
            },
            onSelectError: function () {
            },
            onShowThumb: function () {
            },
            onUpload: function () {
            },
            onProgress: function () {
            },
            onSuccess: function () {
            },
            onError: function () {
            },
            onAllUploaded: function () {
            }
        }, render: function () {
            var a = this;
            this.isHtml5 ? (d.each(this.$elem, function (a, b) {
                d(b).find(".js-upload-form").siblings(".js-upload-flash").remove()
            }), this.initHtml5Upload()) : (d.each(this.$elem, function (a, b) {
                d(b).find(".js-upload-flash").siblings(".js-upload-form").remove()
            }), setTimeout(function () {
                a.initFlashUpload()
            }, 200))
        }, initHtml5Upload: function () {
            this.isHtml5Upload = !0, this.$inputFile = this.$elem.find("input"), this.$inputFile.bind("change", d.proxy(this.onSelectFiles, this)), this.config.enableDrag && (this.$elem.find(".js-drag-tips").html("\u70b9\u51fb\u6216\u8005\u62d6\u5165\u4e0a\u4f20"), this.$elem.parent().delegate(".js-upload-drag", "dragover", d.proxy(this.onDragOver, this)).delegate(".js-upload-drag", "dragleave", d.proxy(this.onDragLeave, this)).delegate(".js-upload-drag", "drop", d.proxy(this.onDrop, this)))
        }, onDragOver: function (a) {
            this.dragTimer && clearTimeout(this.dragTimer), a.stopPropagation(), a.preventDefault();
            var b = d(a.currentTarget);
            b.addClass("upload-photo-drag-over")
        }, onDragLeave: function (a) {
            a.stopPropagation(), a.preventDefault(), this.dragTimer = setTimeout(function () {
                var b = d(a.currentTarget);
                b.removeClass("upload-photo-drag-over")
            }, 100)
        }, onDrop: function (a) {
            this.onDragLeave(a), this.onSelectFiles(a)
        }, initFlashUpload: function () {
            var a = this;
            this.uploadRet = 0, d.each(this.$elem, function (b, c) {
                var f = e.S4();
                a.initFlash(d(c).find(".js-flash"), f, a.config.flashSize[b])
            })
        }, initFlash: function (a, b, c) {
            var e = "fn_" + b;
            a[0].id = e;
            var h = {};
            h[e] = d.proxy(this.uploadHandler, this), h["getUploadCount" + b] = d.proxy(this.getUploadCount, this), f.add(h);
            var i = {
                url: "http://swf.ws.126.net/love/upload/picsUpload_140730.swf",
                id: e,
                width: c.width,
                height: c.height,
                params: {
                    flashvars: "maxSize=" + this.config.MAX_PICSIZE + "&minSize=" + this.config.MIN_PICSIZE + "&picW=" + c.width + "&picH=" + c.height + "&picsUploadCallBack=flashProxy.callback." + e + "&showThumb=1&getUploadCount=flashProxy.callback.getUploadCount" + b + "&uploadUrl=http://" + location.host + "/upload?minSize=" + this.config.MIN_PICSIZE,
                    allowScriptAccess: "always",
                    wmode: "transparent"
                }
            }, j = this;
            g.embedSWF(i.url, i.id, i.width, i.height, "10.3.0", "", "", i.params, "", function (b) {
                b.success || a.html('<p><a title="\u8bf7\u5b89\u88c5flash" href="http://www.adobe.com/go/getflashplayer" target="_blank"><img src="http://img2.cache.netease.com/love/image/project/tips/get_flash_player.gif" alt="\u83b7\u53d6 flash \u64ad\u653e\u5668"></a></p>')
            })
        }, uploadHandler: function (a) {
            a = d.parseJSON(a);
            var b = a.data || {}, c = b.length || 0;
            switch (a.status) {
                case"swf.ready":
                    break;
                case"upload.select":
                    var e = a.selectCount || 0, f = a.invalidCount || 0, g = e - f;
                    this.filterSelectFiles(b), f !== 0 && this.errorMessages.push({
                        type: "size",
                        count: f
                    }), this.triggerSelectFilesError(), g > 0 && (this.uploadRet = this.uploadRet + 1), b = this.config.isShowErrorFile ? this.allNewFiles : this.filterFiles;
                    for (var h = 0, i = b.length; h < i; h++) {
                        var j = b[h].isValid;
                        this.onSelect(b[h].fileId, j), j || this.config.onSelectError(b[h].fileId, {type: "size"})
                    }
                    break;
                case"upload.showThumbs":
                    for (var k = 0; k < c; k++) {
                        var l = b[k].img;
                        d.browser.msie && d.browser.version < 9 || (l = "data:image/png;base64," + l), this.onShowThumb(b[k].fileId, l), this.onUpload(b[k].fileId)
                    }
                    break;
                case"upload.uploading":
                    this.onProgress(b.fileId, b.percent);
                    break;
                case"upload.success":
                    this.onSuccess(b.fileId, '{"code": 1, "originalURL": "' + b.result.originalURL + '"}');
                    break;
                case"upload.allUploaded":
                    this.uploadRet = this.uploadRet - 1, this.uploadRet === 0 && this.onAllUploaded();
                    break;
                case"upload.error":
                    this.onError(b.fileId, b);
                    break;
                default:
            }
        }, getUploadCount: function () {
            if (this.config.MAX_LEN) {
                var a = this.config.MAX_LEN - this.config.currentCount();
                a <= 0 && (a = -1, this.uploadRet--, this.errorMessages.push({
                    type: "full",
                    count: this.config.MAX_LEN
                }));
                return a
            }
            return 10
        }, onFilterDatas: function (a) {
            var b = [];
            for (var c = 0, d = a.length; c < d; c++)a[c].isValid && b.push(a[c]);
            return b
        }, triggerSelectFilesError: function () {
            var a = this.errorMessages;
            if (a.length > 0) {
                var b = [], c = ["full", "size", "format"], d = null;
                for (var e = 0, f = c.length; e < f; e++) {
                    d = c[e];
                    for (var g = 0, h = a.length; g < h; g++)if (a[g].type === d) {
                        b.push(a[g]);
                        break
                    }
                }
                this.config.selectFilesError(b[0].type, b[0].count)
            }
        }, filterSelectFiles: function (a) {
            this.errorMessages = [];
            if (this.config.MAX_LEN && this.config.isShowErrorFile) {
                var b = a.length, c = this._filerFiles(a);
                b !== c.length && this.errorMessages.push({type: "full", count: this.config.MAX_LEN}), a = c
            }
            var d = [];
            this.isHtml5 ? d = this.onFilterFiles(a) : d = this.onFilterDatas(a);
            if (this.config.MAX_LEN && !this.config.isShowErrorFile) {
                var b = d.length, c = this._filerFiles(d);
                b !== c.length && this.errorMessages.push({type: "full", count: this.config.MAX_LEN}), d = c
            }
            this.config.selectFiles(a.length, d.length), this.allNewFiles = a, this.filterFiles = d
        }, onSelectFiles: function (a) {
            var b = a.originalEvent.target.files || a.originalEvent.dataTransfer.files;
            this.filterSelectFiles(Array.prototype.slice.call(b)), this.triggerSelectFilesError();
            var b = this.config.isShowErrorFile ? this.allNewFiles : this.filterFiles;
            b.length > 0 && (this.uploadFiles = this.uploadFiles.concat(this.filterFiles), this.onDealFiles(b)), this.$inputFile.val(null)
        }, _filerFiles: function (a) {
            var b = this.currentCount(), c = b + a.length - this.config.MAX_LEN;
            a.splice(a.length - c, c);
            return a
        }, checkFileSize: function (a) {
            a = a * 1;
            if (a < this.config.MIN_PICSIZE || a > this.config.MAX_PICSIZE)return !1;
            return !0
        }, onFilterFiles: function (a) {
            var b = [], c = [], e = [];
            for (var f = 0, g; g = a[f]; f++) {
                var i = "", j = g.name.lastIndexOf(".");
                i = g.name.substring(j + 1, g.name.length).toLocaleLowerCase(), g.type.indexOf("image") === 0 && d.inArray(i, h.IMAGE_FORMAT) !== -1 ? this.checkFileSize(g.size) ? b.push(g) : (g._error = {type: "size"}, e.push(g)) : (g._error = {type: "format"}, c.push(g))
            }
            c.length > 0 ? this.errorMessages.push({
                type: "format",
                count: c.length
            }) : e.length > 0 && this.errorMessages.push({type: "size", count: e.length});
            return b
        }, onDealFiles: function (a) {
            for (var b = 0, c; c = a[b]; b++)c.fileId = this.createFileId(), this.cacheFiles[c.fileId] = c, c._error ? this.config.isShowErrorFile && (this.onSelect(c.fileId, !1), this.config.onSelectError(c.fileId, c._error)) : (this.onSelect(c.fileId, !0), this.onShowThumb(c.fileId), this.onUpload(c.fileId))
        }, onSelect: function (a, b) {
            this.config.onSelect(a, b)
        }, onShowThumb: function (a, b) {
            this.config.onShowThumb(a, b)
        }, onUpload: function (a) {
            var b = this, c = this.cacheFiles[a];
            this.config.onUpload(a);
            var d = new XMLHttpRequest;
            if (d.upload) {
                d.upload.addEventListener("progress", function (c) {
                    var d = (c.loaded / c.total * 100).toFixed(1);
                    d = d > 99 ? 100 : parseInt(d), b.onProgress(a, d)
                }), d.onreadystatechange = function (c) {
                    d.readyState === 4 && (d.status === 200 ? b.onSuccess(a, d.responseText) : b.onError(a, "500"))
                }, d.open("POST", "/upload", !0);
                var e = encodeURIComponent(c.name);
                d.setRequestHeader("X_FILENAME", e);
                var f = new FormData;
                f.append("fileToUpload", c), f.append("minSize", this.config.MIN_PICSIZE), d.send(f)
            }
        }, onProgress: function (a, b) {
            this.config.onProgress(a, b)
        }, onSuccess: function (a, b) {
            b = d.parseJSON(b);
            var c = parseInt(b.code) || 1;
            if (c === 1)this.config.onSuccess(a, b), this.isHtml5 && (this.removeFile(a), this.uploadFiles.length === 0 && this.onAllUploaded()); else {
                var e = null;
                if (c === 300 || c === 301)e = "size"; else if (c === 100 || c === 302)e = "500";
                this.onError(a, e)
            }
        }, removeFile: function (a) {
            var b = -1;
            for (var c = 0, d; d = this.uploadFiles[c]; c++)if (d.fileId === a) {
                b = c;
                break
            }
            b !== -1 && this.uploadFiles.splice(b, 1)
        }, onAllUploaded: function () {
            this.config.onAllUploaded()
        }, onError: function (a, b) {
            this.config.onError(a, b)
        }, onResend: function (a) {
            var b = d(a.currentTarget).attr("data-fileid");
            this.onUpload(this.cacheFiles[b])
        }, createFileId: function () {
            var a = e.S4();
            if (d.inArray(a, this.cacheFileId) !== -1)return this.createFileId();
            this.cacheFileId.push(a);
            return a
        }, currentCount: function () {
            return this.config.currentCount()
        }
    };
    return h
});
define("utils/flash/FlashProxy", function (a, b, c) {
    var d = {
        callback: {}, add: function (a) {
            for (var b in a)if (typeof this.callback[b] == "undefined")this.callback[b] = a[b]; else throw new Error("flashProxy.callback\u91cc\u91cd\u590d\u5b9a\u4e49\u65b9\u6cd5: " + b)
        }
    };
    window.flashProxy = d;
    return d
});
define("utils/tips/TextTips", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = {
        warning: '<span class="text-icon-tips text-icon-tips-warning"><em class="icon-warning-s"></em><%=message%></span>',
        error: '<span class="text-icon-tips text-icon-tips-error"><em class="icon-error-s"></em><%=message%></span>',
        loading: '<span class="text-icon-tips text-icon-tips-loading"><em class="icon-loadingS"></em><%=message%></span>',
        success: '<span class="text-icon-tips text-icon-tips-pass"><em class="icon-correct-m"></em></span>'
    }, f = {
        show: function (a, b) {
            b = d.extend({type: "", message: ""}, b);
            if (e[b.type]) {
                var c = e[b.type].replace("<%=message%>", b.message);
                a.html(c)
            } else f.hide(a)
        }, hide: function (a) {
            a.empty()
        }
    };
    c.exports = f
});
define("template/sendbox/widget/uploadItem", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<li class="upload-photo-item js-item" data-fileid="', id, '"><div class="upload-photo-image n-upload-image"><img class="js-img" style="display: block;" /></div><i class="upload-photo-mask n-upload-mask"></i><a class="upload-photo-close n-upload-close icon-close-m delete-trigger" href="javascript:;" title="\u5220\u9664\u7167\u7247"></a><div class="upload-photo-success n-upload-success"><i></i><span>\u4e0a\u4f20\u6210\u529f</span></div><div class="upload-photo-progress n-upload-progress"><span class="js-percent" style="width:0%;"><b class="js-percent-text">0%</b></span></div><div class="upload-photo-fail n-upload-fail"><p class="text-gray">\u4e0a\u4f20\u5931\u8d25</p><a class="link-nu resend-trigger" data-fileId="', id, '" href="javascript:;">\u91cd\u8bd5</a></div></li>');
        return p.join("")
    }
});
define("template/floatbox/uploadPic", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer-bd"><p class="poplayer-desc">\u6bcf\u6b21\u6700\u591a\u4e0a\u4f204\u5f20\u7167\u7247\uff0c\u5355\u5f20\u7167\u7247\u572810k-8M\u4e4b\u95f4\uff0c\u652f\u6301ctrl\u952e\u591a\u9009\uff0c\u4e0a\u4f20\u540e\u624d\u53ef\u4ee5\u6dfb\u52a0\u8bf4\u660e\u3002</p><div class="poplayer-uploadPhoto-upload js-upload"><span class="js-upload-tips"></span><ul class="poplayer-uploadPhoto-list clearfix js-photoList"><li class="upload-photo-item upload-photo-addItem js-upload-btn js-upload-drag"><div class="upload-photo-add"><em class="upload-photo-add-icon-b">+</em><p class="upload-photo-add-tips js-drag-tips">\u70b9\u51fb\u4e0a\u4f20</p></div><form class="upload-photo-form js-upload-form" enctype="multipart/form-data"><input type="file" class="upload-photo-form-input" multiple="multiple" accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp" title="\u9009\u62e9\u8981\u4e0a\u4f20\u7684\u56fe\u7247" /></form><div class="upload-photo-flash js-upload-flash"><div class="js-flash"></div></div></li></ul></div><div class="poplayer-uploadPhoto-publish"><div class="publish-textarea js-publish-textarea publish-textarea-disabled"><label class="js-default-tip">\u4e3a\u4f60\u7684\u7167\u7247\u8865\u5145\u70b9\u8bf4\u660e\u5427\uff5e</label><textarea disabled="disabled"></textarea></div><div class="poplayer-foot clearfix">'), typeof isShowLabel != "undefined" && isShowLabel && p.push('<div class="poplayer-label"><label class="label-tag"><input type="checkbox" class="js-checkbox" autocomplete="off" checked="checked">', labelText, "</label></div>"), p.push('<div class="poplayer-btn n-send-ft js-send-btn"><div class="n-display-block"><div class="publish-btn n-btn-box js-btn"><div class="js-btn-txt disabled"><a class="btn btn-red n-btn-sure submit-trigger" href="javascript:;">\u53d1\u5e03</a></div></div><span class="publish-count js-wordCounter"><b class="char-constantia">163</b>\u5b57</span></div><div class="n-display-none"><span class="text-small-tips cGray"><em class="icon-correct-s" style="vertical-align: text-top; margin-right: 3px;"></em>\u53d1\u5e03\u6210\u529f\uff01</span></div></div></div></div></div>');
        return p.join("")
    }
});
define("widget/box/floatBox/LetterBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/tmpl"), g = a("utils/Utils"), h = a("utils/Error"), i = a("utils/DataSource"), j = a("sendbox/LetterSendBox"), k = a("widget/box/floatBox/TipsBox"), l = a("utils/Log"), m = a("utils/Cookie"), n = a("model/UserData"), o = e.extend({
        UI_CONFIG: [{
            id: "1",
            className: "letter-template-default",
            name: "\u65e0\u4e3b\u60c5\u8bdd"
        }, {id: "2", name: "\u65f6\u5149\u96a7\u9053", className: "letter-template-past"}, {
            id: "3",
            name: "\u72ec\u5c45\u751f\u6d3b",
            className: "letter-template-xiaoshipian"
        }, {id: "4", name: "\u60f3\u5bf9\u4f60\u8bf4", className: "letter-template-unbosom"}], init: function (a, b) {
            this._super(a, b), this.callBack = b && b.callBack || null
        }, preRender: function () {
            return {
                title: "\u6587\u5b57\u4f20\u60c5",
                subtitle: "\u8868\u8fbe\u7231\u7684\u5fc3\u8bed,\u9065\u5bc4\u672a\u6765\u7684TA",
                bodyContent: f.formatTemplate(a("template/floatbox/letterBox"), {
                    uiConfig: this.UI_CONFIG,
                    nickName: n.getLoginUser().nickName
                })
            }
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-letter"), this.$tabElem = this.$elem.find(".js-tab"), this.$contentElem = this.$elem.find(".js-content"), this.contentClassName = this.$contentElem[0].className, this.$textareaElem = this.$elem.find("textarea"), this.publishBox = new j(this.$elem, {wrapper: this}), this.publishBox.render(), this.changeStyle(0)
        }, bindEvent: function () {
            this._super(), this.$elem.bind("letter:send:success", d.proxy(this.onSendSuccess, this)), this.$tabElem.delegate("a", "click", d.proxy(this.onTabSwitch, this)), this.$textareaElem.bind("keyup", d.proxy(this.onKeyup, this))
        }, reset: function () {
            this.$tabElem.find("a:first").click(), this.$textareaElem.val(""), this.onKeyup(), this.$elem.find(".js-mask").show(), this.$elem.find(".js-send-btn").removeClass("n-display-show")
        }, setTextArea: function () {
            var a = this.$textareaElem, b = m.get("letterInput");
            b ? a.val(decodeURIComponent(b)) : a.val(""), a.keyup()
        }, onTabSwitch: function (a) {
            var b = d(a.currentTarget).addClass("current"), c = b.prevAll().size();
            b.siblings(".current").removeClass("current"), this.$textareaElem.focus(), this.changeStyle(c)
        }, changeStyle: function (a) {
            this.style = this.UI_CONFIG[a], this.$contentElem[0].className = this.contentClassName, this.$contentElem.addClass(this.style.className)
        }, onKeyup: function (a) {
            this.keyupTimer && clearTimeout(this.keyupTimer);
            var b = this;
            this.keyupTimer = setTimeout(function () {
                m.set("letterInput", encodeURIComponent(b.$textareaElem.val()), 1)
            }, 50)
        }, show: function () {
            this._super(), this.publishBox && this.publishBox.lineCounter.createTempTextArea();
            var a = this;
            setTimeout(function () {
                a.setTextArea(), a.$textareaElem.focusToEnd()
            }, 30)
        }, hide: function () {
            this._super(), this.publishBox.lineCounter.hide(), this.reset()
        }, onSendSuccess: function (a, b) {
            this.$elem.trigger("trend:new", [b]), m.del("letterInput"), this.callBack ? (this.hide(), this.callBack(b)) : this.successCallBack()
        }, successCallBack: function () {
            var a = this;
            if (d("body").hasClass("profile") && n.isLoginUserPage()) {
                this.hide();
                var b = new k(null, {
                    data: {
                        type: "correct",
                        text: "\u53d1\u5e03\u6210\u529f\uff01",
                        desc: "\u60a8\u7684\u52a8\u6001\u5c06\u88ab\u63a8\u9001\u7ed9\u5408\u9002\u7684TA"
                    }
                });
                b.show(), b.delayHide(1500)
            } else this.$elem.find(".js-send-btn").addClass("n-display-show"), setTimeout(function () {
                a.animateHide()
            }, 1e3)
        }, animateHide: function () {
            var a = d(".header-navi > li").last(), b = a.offset(), c = {
                top: b.top - d(document).scrollTop(),
                left: b.left,
                width: a.width(),
                height: a.height(),
                opacity: 0
            }, e = this;
            this.$elem.find(".js-mask").hide(), a.addClass("hover"), this.$mainElem.animate(c, 1e3, "easeInOutExpo", function () {
                a.removeClass("hover"), e.$elem.fadeOut("slow", function () {
                    e.$elem.find(".js-main").attr("style", ""), e.hide()
                })
            })
        }
    }), p = null;
    return {
        getInstance: function (a, b) {
            p === null && (p = new o(a, b));
            return p
        }
    }
});
define("sendbox/LetterSendBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("sendbox/BasicSendBox"), f = a("sendbox/widget/TextArea"), g = a("sendbox/widget/LineCounter"), h = a("utils/Log"), i = e.extend({
        _defaults: {
            ajaxUrl: "sendLetter",
            isAutoHeight: !0,
            maxHeight: 280
        }, init: function (a, b) {
            b = d.extend({}, this._defaults, b), this._super(a, b)
        }, bindEvent: function () {
            this.lineCounter = new g(this.$elem.find(".js-lineCounter"), {textarea: this.$textarea}), this.textarea = new f(this.$textarea, {maxHeight: this.config.maxHeight}), this.$elem.delegate(".submit-trigger", "click", d.proxy(this.onSubmit, this)), this.bindAutoHeight(), this.bindCtrlEnter(), this.bindCheckInput()
        }, checkInputVal: function () {
            if (this.lineCounter.isLineError)return !1;
            return !0
        }, parseParams: function () {
            var a = {templateId: this.config.wrapper.style.id || 1, content: this.$textarea.val()};
            return a
        }, onSendLog: function (a) {
            h.doLog({parameter: {method: "addLetter"}, elem: this.$elem})
        }, onSuccess: function (a) {
            this.$elem.trigger("letter:send:success", [a])
        }
    });
    return i
});
define("sendbox/widget/LineCounter", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("sendbox/widget/WordCounter"), f = a("utils/Utils"), g = e.extend({
        init: function (a, b) {
            this._super.apply(this, arguments), this.isLineError = !0, this.maxLine = b.maxLine || 10, this.minLine = b.minLine || 3, this.$tempTextarea = null
        }, createTempTextArea: function () {
            this.$tempTextarea === null ? this.$tempTextarea = f.createTextarea({textarea: this.$textarea}) : this.$tempTextarea.appendTo("body")
        }, onInput: function (a) {
            var b = this;
            this.$tempTextarea && (this.$tempTextarea.val(b.$textarea.val()), this.lineTimer && clearTimeout(this.lineTimer), this.lineTimer = setTimeout(function () {
                b.lineHeight = b.lineHeight || parseInt(b.$textarea.css("lineHeight"));
                var a = parseInt(b.$tempTextarea.prop("scrollHeight") / b.lineHeight), c = b.maxLine - a, e = d.trim(b.$textarea.val());
                e.length < 10 ? b.$elem.html('\u81f3\u5c11\u8f93\u5165<b class="char-constantia">10</b>\u4e2a\u5b57') : c > -1 ? b.$elem.html('\u8fd8\u53ef\u4ee5\u8f93\u5165<b class="char-constantia">' + c + "</b>\u884c") : b.$elem.html('\u8d85\u8fc7<b class="char-constantia">' + Math.abs(c) + "</b>\u884c"), e.length < 10 || a > b.maxLine ? (b.$elem.addClass("warn"), b.isLineError = !0) : (b.isLineError = !1, b.$elem.removeClass("warn"))
            }, 30))
        }, hide: function () {
            this.$tempTextarea.detach()
        }
    });
    return g
});
define("template/floatbox/letterBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) {
            p.push('<div class="poplayer-bd"><div class="poplayer-letter-template js-tab">');
            if (uiConfig && uiConfig.length) {
                p.push("");
                for (var i = 0, k; i < uiConfig.length, k = uiConfig[i]; i++)p.push('<a class="'), i === 0 && p.push("current"), p.push('" href="javascript:;">', k.name, "</a>");
                p.push("")
            }
            p.push('</div><div class="poplayer-letter-content js-content"><div class="letter-body"><div class="letter-hd"><h2 class="letter-hd-title"><span class="n-letter-title-default">\u968f\u4fbf\u8bf4\u70b9\u60c5\u8bdd\uff1a</span><span class="n-letter-title-past">\u5206\u4eab\u6211\u7684\u8fc7\u53bb\uff1a</span><span class="n-letter-title-xiaoshipian">\u8bb0\u5f55\u73b0\u5728\u7684\u751f\u6d3b\uff1a</span><span class="n-letter-title-unbosom">\u5199\u7ed9\u559c\u6b22\u7684\u4eba\uff1a</span></h2></div><div class="letter-bd"><div class="poplayer-letter-textarea js-textareaCon"><textarea class="ui-scrollbar"></textarea></div><p class="poplayer-letter-sign">\u2014\u2014by&nbsp;', nickName, '</p></div><div class="letter-ft"></div></div></div><div class="poplayer-letter-ft js-send-btn"><div class="n-display-block"><div class="poplayer-letter-btn n-btn-box js-btn"><div class="disabled js-btn-txt"><a class="btn btn-red n-btn-sure submit-trigger" href="javascript:;">\u53d1\u5e03</a></div></div><span class="poplayer-letter-tips js-lineCounter"></span></div><div class="n-display-none"><span class="text-small-tips cGray"><em class="icon-correct-s" style="vertical-align: text-top; margin-right: 3px;"></em>\u53d1\u5e03\u6210\u529f\uff01</span></div></div></div>')
        }
        return p.join("")
    }
});
define("widget/box/floatBox/GiftRecommendBox", function (a, b, c) {
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/tmpl"), g = a("utils/Error"), h = a("utils/DataSource"), i = a("utils/Utils"), j = a("widget/box/floatBox/BuyConfirmBox"), k = a("widget/box/floatBox/GiftBox"), l = a("model/UserData"), m = a("utils/Log"), n = e.extend({
        init: function (a, b) {
            this._super(a, b)
        }, preRender: function () {
            return {loginUser: l.getLoginUser()}
        }, preRender: function () {
            return {
                title: "\u7ed9TA\u9001\u793c\u7269",
                bodyContent: f.formatTemplate(a("template/floatbox/giftRecommendBox"), this.data)
            }
        }, bindEvent: function () {
            this._super(), this.$elem.delegate(".gift-trigger", "click", d.proxy(this.onSendGift, this)), this.$elem.delegate(".js-item", "click", d.proxy(this.onSelectGift, this)), this.$elem.delegate(".more-gift-trigger", "click", d.proxy(this.getMoreGift, this))
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-giftRecommend poplayer-gift"), this.$title = this.$elem.find(".js-title").text(this.data.title.replace(/TA/g, i.userSexName(this.data.user.sex))), this.$btn = this.$elem.find(".js-send-btn").data("log", this.data.logStr)
        }, hide: function () {
            this._super(), this.reset()
        }, show: function (a, b) {
            !this.isFetchData && !this.isShow && (this.resetData(null, b), this.isHaseGift ? this._super() : this.getGiftData(a))
        }, resetData: function (a, b) {
            this.config = b, b.data.loginUser = l.getLoginUser(), this.data = b.data, this.$title && this.$title.text(this.data.title.replace(/TA/g, i.userSexName(this.data.user.sex)));
            switch (this.data.type) {
                case"like":
                    this.data.logStr = "like";
                    break;
                case"sayHi":
                    this.data.logStr = "sayhi"
            }
            this.$btn && this.$btn.data("log", this.data.logStr)
        }, getGiftData: function (a) {
            var b = this;
            this.isFetchData = !0, h.postJSON("giftRecommend", {receiverId: b.data.user.id}, function (c) {
                var d = parseInt(c.code) || 1;
                b.isFetchData = !1, g.Tips(d) || (b.isHaseGift = !0, b.data.giftDatas = c.giftDatas || undefined, b.show(a, b.config))
            }).error(function () {
                b.isFetchData = !1
            })
        }, onSendGift: function (a) {
            if (!(d.isPlainObject(this.dealRequest) && this.dealRequest.readyState !== 4 || d(a.currentTarget).parent(".disabled").size())) {
                var b = this;
                this.dealRequest = h.postJSON("createPresentDeal", {
                    receiverId: this.data.user.id,
                    serviceId: this.selectId
                }, function (c) {
                    var d = parseInt(c.code) || 1;
                    g.Tips(d, a) || (b.hide(), b.showBuyConfirmBox(c))
                }), m.doLog({parameter: {method: "togivegift"}, elem: d(a.currentTarget)})
            }
        }, showBuyConfirmBox: function (a) {
            var b = l.getLoginUser().sex === 2;
            this.buyConfirmBox = new j(null, {
                data: a.payInfo.dealInfo,
                userAccount: a.payInfo.userAccount,
                isBlankTab: !0,
                successText: "\u8d60\u9001\u6210\u529f\uff01",
                isGiftBox: !0,
                payBtnText: b ? "\u7acb\u5373\u8d60\u9001" : "\u7acb\u5373\u652f\u4ed8",
                logName: this.config.logName ? this.config.logName : b ? "giftfemale" : "gift",
                successCallBack: d.proxy(this.buySuccess, this),
                closeCallBack: d.proxy(this.buyRedirect, this),
                redirectCallBack: d.proxy(this.buyRedirect, this)
            }), this.buyConfirmBox.show(), l.getLoginUser().isSuperVip || this.buyConfirmBox.$elem.find(".js-hd").append('<span class="svip-mark"><a class="text-red" href="/pay/services" target="_blank">\u9ad8\u7ea7vip\u4f1a\u5458</a>\uff0c\u514d\u8d39\u4f7f\u7528\u793c\u7269</span>')
        }, onSelectGift: function (a) {
            var b = d(a.currentTarget);
            this.setSelectElem(b)
        }, setSelectElem: function (a, b) {
            var c = a, d = this.$elem.find(".gift-trigger").parent();
            b ? c.removeClass("selected") : c.addClass("selected"), this.$lastItem && this.$lastItem[0] !== c[0] && this.$lastItem.removeClass("selected"), c.hasClass("selected") ? (this.selectId = c.attr("data-id"), d.removeClass("disabled")) : (this.selectId = null, d.addClass("disabled")), this.$lastItem = c
        }, buySuccess: function () {
            d("body").trigger("buyGift:success")
        }, buyRedirect: function () {
            this.buyConfirmBox.hide(), this.selectedGift = null
        }, reset: function () {
            this.$lastItem && (this.$lastItem && this.setSelectElem(this.$lastItem, !0), this.$lastItem = null)
        }, getMoreGift: function (a) {
            k.getInstance(null, {data: {user: this.data.user}}).show(a), this.hide(), m.doLog({
                parameter: {method: "click"},
                elem: d(a.currentTarget)
            })
        }
    }), o = null;
    return {
        getInstance: function () {
            o == null && (o = new n);
            return o
        }
    }
});
define("widget/box/floatBox/GiftBox", function (a, b, c) {
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/tmpl"), g = a("utils/Error"), h = a("utils/DataSource"), i = a("widget/RollSlider"), j = a("widget/box/floatBox/BuyConfirmBox"), k = a("model/UserData"), l = a("utils/Log"), m = e.extend({
        init: function (a, b) {
            this.resetData(a, b), this._super(a, b), this.giftDataMap = {}
        }, preRender: function () {
            return {
                title: "\u7ed9ta\u9001\u793c\u7269",
                bodyContent: f.formatTemplate(a("template/floatbox/giftBox"), this.data)
            }
        }, bindEvent: function () {
            this._super(), this.$elem.delegate(".gift-trigger", "click", d.proxy(this.onSendGift, this)), this.$elem.delegate(".js-item", "click", d.proxy(this.onSelectGift, this))
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-gift"), this.$title = this.$elem.find(".js-title").text("\u7ed9" + this.data.user.nickName + "\u9001\u793c\u7269")
        }, getGiftData: function (a) {
            var b = this;
            h.setTrigger(d(a.currentTarget)).postJSON("getGift", {receiverId: this.data.user.id}, function (c) {
                var d = parseInt(c.code) || 1;
                g.Tips(d, a) || (b.inited = !0, b.show(a), b.onDataBack(c))
            })
        }, onDataBack: function (a) {
            this.giftData = a, this.renderItem(a), this.initSlider();
            var b = this.giftDataMap;
            d.each(a.giftDatas, function (a, c) {
                b[c.id] = a
            });
            var c = this;
            setTimeout(function () {
                c.setSelectGift(c.selectedGift)
            }, 300)
        }, renderItem: function (b) {
            var c = d.extend({
                loginUser: this.data.loginUser,
                pageSize: m.CONFIG.pageSize
            }, b), e = f.formatTemplate(a("template/floatbox/item/giftItem"), c);
            this.$elem.find(".js-list").html(e)
        }, initSlider: function () {
            var a = this;
            setTimeout(function () {
                a.rollSlider = new i(a.$elem.find(".js-sliderBox"), {
                    autoplay: !1,
                    reelContainer: ".js-list",
                    slideItem: ".js-oneSlider",
                    prevBtn: ".prev-trigger",
                    nextBtn: ".next-trigger",
                    rollCallback: d.proxy(a.rollCallback, a)
                })
            }, 100)
        }, onSendGift: function (a) {
            if (!(d.isPlainObject(this.dealRequest) && this.dealRequest.readyState !== 4 || d(a.currentTarget).parent(".disabled").size())) {
                var b = this;
                this.dealRequest = h.postJSON("createPresentDeal", {
                    receiverId: this.data.user.id,
                    serviceId: this.selectId
                }, function (c) {
                    var d = parseInt(c.code) || 1;
                    g.Tips(d, a) || (b.hide(), b.showBuyConfirmBox(c))
                }), l.doLog({parameter: {method: "togivegift"}, elem: d(a.currentTarget)})
            }
        }, showBuyConfirmBox: function (a) {
            var b = this.checkRechoose(a);
            b && (this.selectedGift = this.selectId);
            var c = k.getLoginUser().sex === 2;
            this.buyConfirmBox = new j(null, {
                data: a.payInfo.dealInfo,
                userAccount: a.payInfo.userAccount,
                isBlankTab: !0,
                successText: "\u8d60\u9001\u6210\u529f\uff01",
                subBtnText: "\u91cd\u65b0\u9009\u793c\u7269",
                isShowSubBtn: b,
                isGiftBox: !0,
                payBtnText: c ? "\u7acb\u5373\u8d60\u9001" : "\u7acb\u5373\u652f\u4ed8",
                logName: this.config.logName ? this.config.logName : c ? "giftfemale" : "gift",
                successCallBack: d.proxy(this.buySuccess, this),
                closeCallBack: d.proxy(this.buyRedirect, this),
                subBtnCallBack: d.proxy(this.onReChoose, this)
            }), this.buyConfirmBox.show(), k.getLoginUser().isSuperVip || this.buyConfirmBox.$elem.find(".js-hd").append('<span class="svip-mark"><a class="text-red" href="/pay/services" target="_blank">\u9ad8\u7ea7vip\u4f1a\u5458</a>\uff0c\u514d\u8d39\u4f7f\u7528\u793c\u7269</span>')
        }, checkRechoose: function (a) {
            var b = a.payInfo;
            if (b.userAccount.totalBalance < b.dealInfo.dealAmount && b.userAccount.totalBalance >= this.giftData.cheapestGift.price)return !0;
            return !1
        }, onSelectGift: function (a) {
            var b = d(a.currentTarget);
            this.setSelectElem(b)
        }, getGiftPageNo: function (a) {
            var b = this.giftDataMap[a] || 0;
            return Math.floor(b / m.CONFIG.pageSize)
        }, setSelectGift: function (a) {
            if (this.selectedGift) {
                this.pageNo = this.getGiftPageNo(a);
                var b = this.giftDataMap[a] % m.CONFIG.pageSize;
                this.setSelectElem(this.$elem.find(".js-giftList").eq(this.pageNo).find(".js-item").eq(b)), this.rollSlider.rollTo(!1, this.pageNo), this.selectedGift = null
            }
        }, setSelectElem: function (a, b) {
            var c = a;
            b ? c.removeClass("selected") : c.addClass("selected"), this.$lastItem && this.$lastItem[0] !== c[0] && this.$lastItem.removeClass("selected");
            var d = this.$elem.find(".gift-trigger").parent();
            c.hasClass("selected") ? (this.selectId = c.attr("data-id"), d.removeClass("disabled")) : (this.selectId = null, d.addClass("disabled")), this.$lastItem = c
        }, rollCallback: function (a) {
            this.pageNo = a
        }, buySuccess: function () {
            d("body").trigger("buyGift:success")
        }, buyRedirect: function () {
            this.buyConfirmBox.hide(), this.selectedGift = null
        }, onReChoose: function () {
            this.show(null, this.selectedGift)
        }, reset: function () {
            this.inited && (this.$lastItem && this.setSelectElem(this.$lastItem, !0), this.$lastItem = null, this.rollSlider.rollTo(!1, 0))
        }, resetData: function (a, b) {
            this.config = b, b.data.loginUser = k.getLoginUser(), this.data = b.data, this.$title && this.$title.text("\u7ed9" + this.data.user.nickName + "\u9001\u793c\u7269")
        }, hide: function () {
            this.reset(), this._super()
        }, show: function (a, b) {
            this.inited ? (this._super(a), b && (this.selectedGift = b, this.setSelectGift(b))) : (this.getGiftData(a), b && (this.selectedGift = b))
        }
    });
    m.CONFIG = {pageSize: 10};
    var n = null;
    return {
        getInstance: function (a, b) {
            n ? n.resetData(a, b) : n = new m(a, b);
            return n
        }
    }
});
define("template/floatbox/giftBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer-bd"><div class="poplayer-gift-tips text-dark-gray"><span class="poplayer-gift-tips-vip">'), !loginUser.isVip || loginUser.isNormalVip ? p.push('<em class="icon-v"></em><a class="link-red" href="/pay/services" target="_blank" data-log="giftBoxOpen">\u5f00\u901a\u9ad8\u7ea7\u4f1a\u5458</a>\uff0c\u514d\u8d39\u4f7f\u7528\u793c\u7269') : loginUser.isSuperVip && p.push('<em class="icon-v"></em>\u60a8\u662f\u82b1\u7530\u9ad8\u7ea7VIP\u4f1a\u5458\uff0c\u4eab\u53d7\u514d\u8d39\u793c\u7269'), p.push('</span></div><div class="poplayer-sliderBox js-sliderBox"><a class="poplayer-slider-prev prev-trigger" href="javascript:;"><em class="poplayer-gift-slider-prev">\u4e0a\u4e00\u9875</em></a><a class="poplayer-slider-next next-trigger" href="javascript:;"><em class="poplayer-gift-slider-next">\u4e0b\u4e00\u9875</em></a><div class="poplayer-slider-content"><ol class="poplayer-sliderList js-list"></ol></div></div></div><div class="poplayer-ft"><div class="poplayer-btn n-btn-box js-btn"><div class="disabled"><a class="btnM btn-red n-btn-sure gift-trigger" href="javascript:;">\u7acb\u5373\u8d60\u9001</a></div></div></div>');
        return p.join("")
    }
});
define("template/floatbox/item/giftItem", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) {
            p.push("");
            if (giftDatas && giftDatas.length) {
                p.push("");
                var totalPage = Math.ceil(giftDatas.length / pageSize);
                p.push("");
                for (var i = 1; i <= totalPage; i++) {
                    p.push('<li class="poplayer-slider-item js-oneSlider"><ul class="poplayer-giftList js-giftList clearfix">');
                    for (var j = (i - 1) * pageSize, k = i * pageSize; j < k; j++) {
                        if (typeof giftDatas[j] == "undefined")break;
                        p.push('<li class="poplayer-gift-item js-item '), giftDatas[j].hot === "1" && p.push("hot"), p.push('" data-id="', giftDatas[j].id, '"><em class="icon-hot-b"></em><em class="icon-gift-selected"></em><div class="poplayer-gift-imgBox"><i class="n-ui-valign"></i><img src="', giftDatas[j].icon, '" alt="', giftDatas[j].name, '" /></div><dl class="poplayer-gift-infoBox"><dd class="poplayer-gift-descBox">'), giftDatas[j].desc && giftDatas[j].desc != "" && p.push("<span>", giftDatas[j].desc, "</span><em></em>"), p.push('</dd><dt class="poplayer-gift-name text-dark-gray">', giftDatas[j].name, "</dt>"), loginUser.isSuperVip ? p.push('<dd class="poplayer-gift-priceBox"><span class="text-gray">\u9ad8\u7ea7\u4f1a\u5458\u514d\u8d39\u4f7f\u7528</span></dd>') : (p.push(""), loginUser.sex === 2 ? (p.push('<dd class="poplayer-gift-priceBox n-user-female"><span class="poplayer-gift-female text-gray">'), giftDatas[j].femalePrice && giftDatas[j].femalePrice != 0 ? p.push('<span class="text-red">', giftDatas[j].femalePrice, "\u82b1\u7530\u5e01</span>") : p.push('<span class="text-red">\u514d\u8d39</span>'), p.push("</span></dd>")) : (p.push('<dd class="poplayer-gift-priceBox n-user-common"><span class="poplayer-gift-initial text-gray">'), giftDatas[j].price && giftDatas[j].price != 0 ? p.push('<span class="text-red">', giftDatas[j].price, "</span>\u82b1\u7530\u5e01") : p.push('<span class="text-red">\u514d\u8d39</span>'), p.push("</span></dd>")), p.push("")), p.push("</dl></li>"), p.push("")
                    }
                    p.push("</ul></li>")
                }
                p.push("")
            }
            p.push("")
        }
        return p.join("")
    }
});
define("template/floatbox/giftRecommendBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) {
            p.push('<div class="poplayer-bd"><ul class="poplayer-giftList clearfix js-list">');
            var i, l = giftDatas.length;
            for (i = 0; i < l; i++) {
                if (typeof giftDatas[i] == "undefined")break;
                p.push('<li class="poplayer-gift-item js-item '), giftDatas[i].hot === "1" && p.push("hot"), p.push('" data-id="', giftDatas[i].id, '"><em class="icon-hot-b"></em><em class="icon-gift-selected"></em><div class="poplayer-gift-imgBox"><i class="n-ui-valign"></i><img src="', giftDatas[i].icon, '" alt="', giftDatas[i].name, '" /></div><dl class="poplayer-gift-infoBox"><dd class="poplayer-gift-descBox">'), giftDatas[i].desc && giftDatas[i].desc != "" && p.push("<span>", giftDatas[i].desc, "</span><em></em>"), p.push('</dd><dt class="poplayer-gift-name text-dark-gray">', giftDatas[i].name, "</dt>"), loginUser.isSuperVip ? p.push('<dd class="poplayer-gift-priceBox"><span class="text-gray">\u9ad8\u7ea7\u4f1a\u5458\u514d\u8d39\u4f7f\u7528</span></dd>') : (p.push(""), loginUser.sex === 2 ? (p.push('<dd class="poplayer-gift-priceBox n-user-female"><span class="poplayer-gift-female text-gray">'), giftDatas[i].femalePrice && giftDatas[i].femalePrice != 0 ? p.push('<span class="text-red">', giftDatas[i].femalePrice, "\u82b1\u7530\u5e01</span>") : p.push('<span class="text-red">\u514d\u8d39</span>'), p.push("</span></dd>")) : (p.push('<dd class="poplayer-gift-priceBox n-user-common"><span class="poplayer-gift-initial text-gray">'), giftDatas[i].price && giftDatas[i].price != 0 ? p.push('<span class="text-red">', giftDatas[i].price, "</span>\u82b1\u7530\u5e01") : p.push('<span class="text-red">\u514d\u8d39</span>'), p.push("</span></dd>")), p.push("")), p.push("</dl></li>"), p.push("")
            }
            p.push('</ul><a class="link-blue more-gift-trigger" href="javascript:;" data-log="moregift">+\u66f4\u591a\u793c\u7269</a></div><div class="poplayer-ft"><div class="poplayer-btn n-btn-box js-btn"><div class="disabled"><a class="btnM btn-red n-btn-sure js-send-btn gift-trigger" href="javascript:;" data-log="">\u7acb\u5373\u8d60\u9001</a></div></div></div>')
        }
        return p.join("")
    }
});
define("widget/box/floatBox/ReleaseDateBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/tmpl"), g = a("utils/DataSource"), h = a("utils/Utils"), i = a("widget/select/CitySelect"), j = a("utils/widget/Placeholder"), k = a("sendbox/widget/SimpleCounter"), l = a("sendbox/widget/WordCounter"), m = a("widget/box/floatBox/TipsBox"), n = a("utils/Error"), o = a("utils/Log"), p = a("model/UserData");
    a("lib/datepicker");
    var q = e.extend({
        init: function (a, b) {
            this._super(a, b);
            var c = new Date;
            this.data.year = c.getFullYear(), this.data.month = c.getMonth() + 1, this.data.date = c.getDate();
            var e = d("#data_loginUser");
            e.size() > 0 && (this.loginUser = d.parseJSON(e.html()), this.data.province = this.loginUser.province, this.data.city = this.loginUser.city)
        }, preRender: function () {
            return {
                title: "\u53d1\u5e03\u7ea6\u4f1a",
                bodyContent: f.formatTemplate(a("template/floatbox/releaseDateBox"), this.data)
            }
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-releaseDateBox"), this.$province = this.$elem.find(".js-province"), this.$city = this.$elem.find(".js-city"), this.$detailAddr = this.$elem.find(".js-detailAddr"), this.$detailDesc = this.$elem.find(".js-detailDesc"), this.$timeType = this.$elem.find(".js-timeType"), this.$calendar = this.$elem.find(".js-calendar"), this.$startTime = this.$elem.find(".js-startTime"), this.$counter = this.$elem.find(".js-wordCounter"), this.$themeTips = this.$elem.find(".js-theme-tips"), this.$addrTips = this.$elem.find(".js-addr-tips"), this.$timeTips = this.$elem.find(".js-time-tips"), this.$submitBtn = this.$elem.find(".submit-trigger"), this.$calendar = this.$elem.find(".js-calendar"), this.initModules()
        }, bindEvent: function () {
            this._super(), this.$elem.delegate(".theme-trigger", "click", d.proxy(this.onSelectTheme, this)), this.$timeType.on("change", d.proxy(this.onSelectTimeType, this)), this.$startTime.on("change", d.proxy(this.onSelectStartTime, this)), this.$elem.bind("counter-status", d.proxy(this.onCounter, this)), this.$detailAddr.bind("paste cut input keyup", d.proxy(this.onInputAddr, this)), this.$elem.delegate(".submit-trigger", "click", d.proxy(this.onSubmit, this))
        }, initModules: function () {
            new i(this.$province, this.$city, {
                label1: !1,
                label2: !1
            }), j.bind(this.$detailAddr), j.bind(this.$detailDesc);
            var a = new Date;
            this.renderStartTime(a.getHours() + 1, a.getMinutes()), this.counterAddr = new k(this.$counter, {
                textarea: this.$detailAddr,
                minLen: 0,
                maxLen: 15,
                isCountChar: !0
            }), this.counterDesc = new l(this.$counter, {
                textarea: this.$detailDesc,
                minLen: 0,
                maxLen: 30,
                isCountChar: !0
            });
            var b = this;
            this.$calendar.datepicker({
                dateFormat: "yy\u5e74m\u6708d\u65e5",
                dayNames: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
                monthNames: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
                yearRange: "-0:+1",
                minDate: new Date(this.data.year, this.data.month - 1, this.data.date),
                showAnim: "",
                onSelect: function (a, c) {
                    if (c.selectedYear == b.data.year && c.selectedMonth == b.data.month - 1 && c.selectedDay == b.data.date) {
                        var d = new Date;
                        b.renderStartTime(d.getHours() + 1, d.getMinutes())
                    } else b.renderStartTime()
                }
            })
        }, onSelectTheme: function (a) {
            var b = d(a.currentTarget), c = b.parents("ul");
            c.find("a").each(function (a, b) {
                d(b).removeClass("select")
            }), b.addClass("select"), this.$themeTips.css("visibility", "hidden")
        }, onSelectTimeType: function (a) {
            var b = d(a.currentTarget);
            b.val() !== "2" ? (this.$calendar.hide(), this.$startTime.hide(), this.$timeTips.css("visibility", "hidden")) : (this.$calendar.show(), this.$startTime.show())
        }, onSelectStartTime: function () {
            this.$startTime.val() != "0" ? this.$timeTips.css("visibility", "hidden") : this.$timeTips.css("visibility", "visible")
        }, renderStartTime: function (a, b) {
            this.$startTime.html("");
            var c = [], e = "";
            for (var f = 0; f < 24; f++)f < 10 && (f = "0" + f), c.push(f + ":00"), c.push(f + ":30");
            var g = c.splice(0, b === undefined ? 16 : b < 30 ? a * 2 - 1 : a * 2);
            a || (c = c.concat(g));
            var i = '<option value="<%= val %>"><%= val %></option>';
            d.each(c, function (a, b) {
                e += h.tmpl(i, {val: b})
            }), this.$startTime.html('<option value="0">\u5f00\u59cb\u65f6\u95f4</option>' + e)
        }, onInputAddr: function () {
            d.trim(this.$detailAddr.val()) == "" ? (this.$addrTips.css("visibility", "visible"), this.$detailAddr.addClass("s-error")) : (this.$addrTips.css("visibility", "hidden"), this.$detailAddr.removeClass("s-error"))
        }, onCounter: function (a, b, c) {
            c.config.textarea == this.$detailDesc && this.counterDesc.isError && this.counterDesc.errorType === "long" && this.$detailDesc.val(this.counterDesc.getValidVal()).trigger("keyup"), c.config.textarea == this.$detailAddr && this.counterAddr.isError && this.counterAddr.errorType === "long" && this.$detailAddr.val(this.counterAddr.getValidVal()).trigger("keyup")
        }, preCheck: function () {
            var a = !0;
            this.$elem.find(".theme-trigger.select").length == 0 && (this.$themeTips.css("visibility", "visible"), a = !1), d.trim(this.$detailAddr.val()) == "" && (this.$addrTips.css("visibility", "visible"), this.$detailAddr.addClass("s-error"), a = !1), this.$timeType.val() == "2" && this.$startTime.val() == "0" && (this.$timeTips.css("visibility", "visible"), a = !1);
            return a
        }, getValue: function () {
            var a = {}, b = this.$elem.find(".theme-trigger.select");
            a.datingType = b.data("index"), a.payType = parseInt(this.$elem.find("input[name=payType]:radio:checked").val()) || 0, a.timeType = parseInt(this.$timeType.val());
            if (a.timeType == 2) {
                var c = this.$calendar.datepicker("getDate"), e = this.$startTime.val().split(":"), f = new Date(c.getFullYear(), c.getMonth(), c.getDate(), parseInt(e[0]), parseInt(e[1] || 0));
                a.specialTime = f.getTime()
            }
            var g = this.$province[0].selectedIndex, h = this.$city[0].selectedIndex, i = this.$province[0].options[g].text, j = this.$city[0].options[h].text;
            a.address = i + j + d.trim(this.$detailAddr.val()), a.config = d.trim(this.$detailDesc.val());
            return a
        }, onSubmit: function (a) {
            var b = d(a.currentTarget);
            if (!(!this.preCheck() || d.isPlainObject(this.request) && this.request.readyState !== 4)) {
                var c = this.getValue(), e = this;
                this.request = g.postJSON("addDating", c, function (c) {
                    var d = parseInt(c.code, 10) || 1;
                    n.showTips({json: c, evt: a, triggerElem: b}) || e.onSendSuccess(c)
                })
            }
        }, onSendSuccess: function (a) {
            this.$elem.trigger("trend:new", [a]);
            var b = this;
            if (d("body").hasClass("profile") && p.isLoginUserPage()) {
                this.hide();
                var c = new m(null, {
                    data: {
                        type: "correct",
                        text: "\u53d1\u5e03\u6210\u529f\uff01",
                        desc: "\u60a8\u7684\u52a8\u6001\u5c06\u88ab\u63a8\u9001\u7ed9\u5408\u9002\u7684TA"
                    }
                });
                c.show(), c.delayHide(2500)
            } else this.$elem.find(".js-send-btn").addClass("n-display-show"), setTimeout(function () {
                b.animateHide()
            }, 1e3)
        }, animateHide: function () {
            var a = d(".header-navi > li").last(), b = a.offset(), c = {
                top: b.top - d(document).scrollTop(),
                left: b.left,
                width: a.width(),
                height: a.height(),
                opacity: 0
            }, e = this;
            a.addClass("hover"), this.$mainElem.animate(c, 1e3, "easeInOutExpo", function () {
                a.removeClass("hover"), e.$elem.fadeOut("slow", function () {
                    e.$elem.find(".js-main").attr("style", ""), e.hide()
                })
            })
        }
    });
    return q
});
define("widget/select/CitySelect", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/Utils"), g = a("data/selectData").city, h = e.extend({
        $province: null,
        $city: null,
        land: "all",
        provinces: {},
        defaultProvince: "",
        defaultCity: "",
        init: function (a, b, c) {
            this.config = c || {}, this.$province = a, this.$city = b, this.land = this.config.land || "all";
            var e = typeof this.config.vals == "object" ? this.config.vals : [];
            this.defaultProvince = e[0] || a.data("selected") || "", this.defaultCity = e[1] || b.data("selected") || "", this.specialCities = g.specialCities, this.city = g.city, this.land === "all" ? d.extend(this.provinces, g.mainland, g.overseas) : d.extend(this.provinces, g[this.land]), c.isDisableTextColor && this.defaultProvince === "" && this.$province.addClass("u-form-sys"), c.isDisableTextColor && this.defaultCity === "" && this.$city.addClass("u-form-sys"), this.bulidTmpl(this.config), this.bulidLabel(this.config), this.initSelect(), this.bindEvent()
        },
        bindEvent: function () {
            this.$province.bind("change", d.proxy(this.showCity, this))
        },
        bulidTmpl: function (a) {
            this.$province.is("select") ? (this.labelTmpl = '<option value="0"><%= value %></option>', this.optionTmpl = '<option value="<%= key %>" <%= selected %>><%= value %></option>') : (this.labelTmpl = '<li class="js-option" data-value="0"><%= value %></li>', this.optionTmpl = a.optionTmpl || '<li class="js-option" data-value="<%= key %>"><%= value %></li>')
        },
        bulidLabel: function (a) {
            typeof a.label1 == "undefined" ? this.label1 = this.land === "overseas" ? "-\u9009\u62e9\u5730\u57df-" : "-\u9009\u62e9\u7701\u4efd-" : a.label1 === !1 ? this.label1 = !1 : this.label1 = a.label1, typeof a.label2 == "undefined" ? this.label2 = "-\u9009\u62e9\u57ce\u5e02-" : a.label2 === !1 ? this.label2 = !1 : this.label2 = a.label2
        },
        initSelect: function () {
            var a = this.label1 ? f.tmpl(this.labelTmpl, {value: this.label1}) : "", b = 0;
            for (var c in this.provinces) {
                var d = String(this.defaultProvince).match(/^[^0-9]+$/) ? this.provinces[c] : c, e = this.defaultProvince == d ? "selected" : "";
                if (this.defaultProvince === "" && this.label1) {
                    var g = this.label2 ? f.tmpl(this.labelTmpl, {value: this.label2}) : "";
                    this.$city.html(g)
                } else if (b === 0 || e)this.buildCity(c), b = 1;
                a += f.tmpl(this.optionTmpl, {key: c, value: this.provinces[c], selected: e})
            }
            this.$province.html(a), this.defaultLocation()
        },
        showCity: function (a) {
            this.defaultCity = null, this.buildCity(a.target.value)
        },
        buildCity: function (a) {
            var b = this.label2 ? f.tmpl(this.labelTmpl, {value: this.label2}) : "";
            this.$city.attr("disabled", !1), this.config.isDisableTextColor && !this.defaultCity && this.$city.addClass("u-form-sys");
            if (a == "" || parseInt(a) == 0 || d.inArray(parseInt(a), this.specialCities) !== -1 && this.config.HideSpecialCity)this.$city.html(b), this.$city.attr("disabled", !0); else {
                if (this.city[a])for (var c in this.city[a]) {
                    var e = String(this.defaultCity).match(/^[^0-9]+$/) ? this.city[a][c] : c, g = this.defaultCity == e ? "selected" : "";
                    b += f.tmpl(this.optionTmpl, {key: c, value: this.city[a][c], selected: g})
                }
                this.$city.html(b)
            }
        },
        defaultLocation: function () {
            try {
                this.buildCity(this.defaultProvince)
            } catch (a) {
            }
        }
    });
    c.exports = h
});
define("lib/datepicker", function (a, b, c) {
    "use strict";
    var d = window.jQuery;
    (function (a) {
        function i(b, c) {
            a.extend(b, c);
            for (var d in c)c[d] == null && (b[d] = c[d]);
            return b
        }

        function h() {
            a.datepicker._isDisabledDatepicker(d.inline ? d.dpDiv.parent()[0] : d.input[0]) || (a(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), a(this).addClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && a(this).addClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") !== -1 && a(this).addClass("ui-datepicker-next-hover"))
        }

        function g(b) {
            var c = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return b.delegate(c, "mouseout", function () {
                a(this).removeClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && a(this).removeClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") !== -1 && a(this).removeClass("ui-datepicker-next-hover")
            }).delegate(c, "mouseover", h)
        }

        function f() {
            this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
                closeText: "Done",
                prevText: "Prev",
                nextText: "Next",
                currentText: "Today",
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                weekHeader: "Wk",
                dateFormat: "mm/dd/yy",
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            }, this._defaults = {
                showOn: "focus",
                showAnim: "fadeIn",
                showOptions: {},
                defaultDate: null,
                appendText: "",
                buttonText: "...",
                buttonImage: "",
                buttonImageOnly: !1,
                hideIfNoPrevNext: !1,
                navigationAsDateFormat: !1,
                gotoCurrent: !1,
                changeMonth: !1,
                changeYear: !1,
                yearRange: "c-10:c+10",
                showOtherMonths: !1,
                selectOtherMonths: !1,
                showWeek: !1,
                calculateWeek: this.iso8601Week,
                shortYearCutoff: "+10",
                minDate: null,
                maxDate: null,
                duration: "fast",
                beforeShowDay: null,
                beforeShow: null,
                onSelect: null,
                onChangeMonthYear: null,
                onClose: null,
                numberOfMonths: 1,
                showCurrentAtPos: 0,
                stepMonths: 1,
                stepBigMonths: 12,
                altField: "",
                altFormat: "",
                constrainInput: !0,
                showButtonPanel: !1,
                autoSize: !1,
                disabled: !1
            }, a.extend(this._defaults, this.regional[""]), this.regional.en = a.extend(!0, {}, this.regional[""]), this.regional["en-US"] = a.extend(!0, {}, this.regional.en), this.dpDiv = g(a("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
        }

        function e(a) {
            var b, c;
            while (a.length && a[0] !== document) {
                b = a.css("position");
                if (b === "absolute" || b === "relative" || b === "fixed") {
                    c = parseInt(a.css("zIndex"), 10);
                    if (!isNaN(c) && c !== 0)return c
                }
                a = a.parent()
            }
            return 0
        }

        function c(b) {
            return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function () {
                    return a.css(this, "visibility") === "hidden"
                }).length
        }

        function b(b, d) {
            var e, f, g, h = b.nodeName.toLowerCase();
            if ("area" === h) {
                e = b.parentNode, f = e.name;
                if (!b.href || !f || e.nodeName.toLowerCase() !== "map")return !1;
                g = a("img[usemap='#" + f + "']")[0];
                return !!g && c(g)
            }
            return (/input|select|textarea|button|object/.test(h) ? !b.disabled : "a" === h ? b.href || d : d) && c(b)
        }

        a.ui = a.ui || {}, a.extend(a.ui, {
            version: "1.11.1",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }), a.fn.extend({
            scrollParent: function (b) {
                var c = this.css("position"), d = c === "absolute", e = b ? /(auto|scroll|hidden)/ : /(auto|scroll)/, f = this.parents().filter(function () {
                    var b = a(this);
                    if (d && b.css("position") === "static")return !1;
                    return e.test(b.css("overflow") + b.css("overflow-y") + b.css("overflow-x"))
                }).eq(0);
                return c === "fixed" || !f.length ? a(this[0].ownerDocument || document) : f
            }, uniqueId: function () {
                var a = 0;
                return function () {
                    return this.each(function () {
                        this.id || (this.id = "ui-id-" + ++a)
                    })
                }
            }(), removeUniqueId: function () {
                return this.each(function () {
                    /^ui-id-\d+$/.test(this.id) && a(this).removeAttr("id")
                })
            }
        }), a.extend(a.expr[":"], {
            data: a.expr.createPseudo ? a.expr.createPseudo(function (b) {
                return function (c) {
                    return !!a.data(c, b)
                }
            }) : function (b, c, d) {
                return !!a.data(b, d[3])
            }, focusable: function (c) {
                return b(c, !isNaN(a.attr(c, "tabindex")))
            }, tabbable: function (c) {
                var d = a.attr(c, "tabindex"), e = isNaN(d);
                return (e || d >= 0) && b(c, !e)
            }
        }), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function (b, c) {
            function g(b, c, e, f) {
                a.each(d, function () {
                    c -= parseFloat(a.css(b, "padding" + this)) || 0, e && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), f && (c -= parseFloat(a.css(b, "margin" + this)) || 0)
                });
                return c
            }

            var d = c === "Width" ? ["Left", "Right"] : ["Top", "Bottom"], e = c.toLowerCase(), f = {
                innerWidth: a.fn.innerWidth,
                innerHeight: a.fn.innerHeight,
                outerWidth: a.fn.outerWidth,
                outerHeight: a.fn.outerHeight
            };
            a.fn["inner" + c] = function (b) {
                if (b === undefined)return f["inner" + c].call(this);
                return this.each(function () {
                    a(this).css(e, g(this, b) + "px")
                })
            }, a.fn["outer" + c] = function (b, d) {
                if (typeof b != "number")return f["outer" + c].call(this, b);
                return this.each(function () {
                    a(this).css(e, g(this, b, !0, d) + "px")
                })
            }
        }), a.fn.addBack || (a.fn.addBack = function (a) {
            return this.add(a == null ? this.prevObject : this.prevObject.filter(a))
        }), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function (b) {
            return function (c) {
                return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this)
            }
        }(a.fn.removeData)), a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), a.fn.extend({
            focus: function (b) {
                return function (c, d) {
                    return typeof c == "number" ? this.each(function () {
                        var b = this;
                        setTimeout(function () {
                            a(b).focus(), d && d.call(b)
                        }, c)
                    }) : b.apply(this, arguments)
                }
            }(a.fn.focus), disableSelection: function () {
                var a = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
                return function () {
                    return this.bind(a + ".ui-disableSelection", function (a) {
                        a.preventDefault()
                    })
                }
            }(), enableSelection: function () {
                return this.unbind(".ui-disableSelection")
            }, zIndex: function (b) {
                if (b !== undefined)return this.css("zIndex", b);
                if (this.length) {
                    var c = a(this[0]), d, e;
                    while (c.length && c[0] !== document) {
                        d = c.css("position");
                        if (d === "absolute" || d === "relative" || d === "fixed") {
                            e = parseInt(c.css("zIndex"), 10);
                            if (!isNaN(e) && e !== 0)return e
                        }
                        c = c.parent()
                    }
                }
                return 0
            }
        }), a.ui.plugin = {
            add: function (b, c, d) {
                var e, f = a.ui[b].prototype;
                for (e in d)f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([c, d[e]])
            }, call: function (a, b, c, d) {
                var e, f = a.plugins[b];
                if (!!f) {
                    if (!d && (!a.element[0].parentNode || a.element[0].parentNode.nodeType === 11))return;
                    for (e = 0; e < f.length; e++)a.options[f[e][0]] && f[e][1].apply(a.element, c)
                }
            }
        }, a.extend(a.ui, {datepicker: {version: "1.11.1"}});
        var d;
        a.extend(f.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            _widgetDatepicker: function () {
                return this.dpDiv
            },
            setDefaults: function (a) {
                i(this._defaults, a || {});
                return this
            },
            _attachDatepicker: function (b, c) {
                var d, e, f;
                d = b.nodeName.toLowerCase(), e = d === "div" || d === "span", b.id || (this.uuid += 1, b.id = "dp" + this.uuid), f = this._newInst(a(b), e), f.settings = a.extend({}, c || {}), d === "input" ? this._connectDatepicker(b, f) : e && this._inlineDatepicker(b, f)
            },
            _newInst: function (b, c) {
                var d = b[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
                return {
                    id: d,
                    input: b,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: c,
                    dpDiv: c ? g(a("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
                }
            },
            _connectDatepicker: function (b, c) {
                var d = a(b);
                c.append = a([]), c.trigger = a([]);
                d.hasClass(this.markerClassName) || (this._attachments(d, c), d.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(c), a.data(b, "datepicker", c), c.settings.disabled && this._disableDatepicker(b))
            },
            _attachments: function (b, c) {
                var d, e, f, g = this._get(c, "appendText"), h = this._get(c, "isRTL");
                c.append && c.append.remove(), g && (c.append = a("<span class='" + this._appendClass + "'>" + g + "</span>"), b[h ? "before" : "after"](c.append)), b.unbind("focus", this._showDatepicker), c.trigger && c.trigger.remove(), d = this._get(c, "showOn"), (d === "focus" || d === "both") && b.focus(this._showDatepicker);
                if (d === "button" || d === "both")e = this._get(c, "buttonText"), f = this._get(c, "buttonImage"), c.trigger = a(this._get(c, "buttonImageOnly") ? a("<img/>").addClass(this._triggerClass).attr({
                    src: f,
                    alt: e,
                    title: e
                }) : a("<button type='button'></button>").addClass(this._triggerClass).html(f ? a("<img/>").attr({
                    src: f,
                    alt: e,
                    title: e
                }) : e)), b[h ? "before" : "after"](c.trigger), c.trigger.click(function () {
                    a.datepicker._datepickerShowing && a.datepicker._lastInput === b[0] ? a.datepicker._hideDatepicker() : a.datepicker._datepickerShowing && a.datepicker._lastInput !== b[0] ? (a.datepicker._hideDatepicker(), a.datepicker._showDatepicker(b[0])) : a.datepicker._showDatepicker(b[0]);
                    return !1
                })
            },
            _autoSize: function (a) {
                if (this._get(a, "autoSize") && !a.inline) {
                    var b, c, d, e, f = new Date(2009, 11, 20), g = this._get(a, "dateFormat");
                    g.match(/[DM]/) && (b = function (a) {
                        c = 0, d = 0;
                        for (e = 0; e < a.length; e++)a[e].length > c && (c = a[e].length, d = e);
                        return d
                    }, f.setMonth(b(this._get(a, g.match(/MM/) ? "monthNames" : "monthNamesShort"))), f.setDate(b(this._get(a, g.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - f.getDay())), a.input.attr("size", this._formatDate(a, f).length)
                }
            },
            _inlineDatepicker: function (b, c) {
                var d = a(b);
                d.hasClass(this.markerClassName) || (d.addClass(this.markerClassName).append(c.dpDiv), a.data(b, "datepicker", c), this._setDate(c, this._getDefaultDate(c), !0), this._updateDatepicker(c), this._updateAlternate(c), c.settings.disabled && this._disableDatepicker(b), c.dpDiv.css("display", "block"))
            },
            _dialogDatepicker: function (b, c, d, e, f) {
                var g, h, j, k, l, m = this._dialogInst;
                m || (this.uuid += 1, g = "dp" + this.uuid, this._dialogInput = a("<input type='text' id='" + g + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), a("body").append(this._dialogInput), m = this._dialogInst = this._newInst(this._dialogInput, !1), m.settings = {}, a.data(this._dialogInput[0], "datepicker", m)), i(m.settings, e || {}), c = c && c.constructor === Date ? this._formatDate(m, c) : c, this._dialogInput.val(c), this._pos = f ? f.length ? f : [f.pageX, f.pageY] : null, this._pos || (h = document.documentElement.clientWidth, j = document.documentElement.clientHeight, k = document.documentElement.scrollLeft || document.body.scrollLeft, l = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [h / 2 - 100 + k, j / 2 - 150 + l]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), m.settings.onSelect = d, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), a.blockUI && a.blockUI(this.dpDiv), a.data(this._dialogInput[0], "datepicker", m);
                return this
            },
            _destroyDatepicker: function (b) {
                var c, d = a(b), e = a.data(b, "datepicker");
                !d.hasClass(this.markerClassName) || (c = b.nodeName.toLowerCase(), a.removeData(b, "datepicker"), c === "input" ? (e.append.remove(), e.trigger.remove(), d.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : (c === "div" || c === "span") && d.removeClass(this.markerClassName).empty())
            },
            _enableDatepicker: function (b) {
                var c, d, e = a(b), f = a.data(b, "datepicker");
                if (!!e.hasClass(this.markerClassName)) {
                    c = b.nodeName.toLowerCase();
                    if (c === "input")b.disabled = !1, f.trigger.filter("button").each(function () {
                        this.disabled = !1
                    }).end().filter("img").css({
                        opacity: "1.0",
                        cursor: ""
                    }); else if (c === "div" || c === "span")d = e.children("." + this._inlineClass), d.children().removeClass("ui-state-disabled"), d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1);
                    this._disabledInputs = a.map(this._disabledInputs, function (a) {
                        return a === b ? null : a
                    })
                }
            },
            _disableDatepicker: function (b) {
                var c, d, e = a(b), f = a.data(b, "datepicker");
                if (!!e.hasClass(this.markerClassName)) {
                    c = b.nodeName.toLowerCase();
                    if (c === "input")b.disabled = !0, f.trigger.filter("button").each(function () {
                        this.disabled = !0
                    }).end().filter("img").css({
                        opacity: "0.5",
                        cursor: "default"
                    }); else if (c === "div" || c === "span")d = e.children("." + this._inlineClass), d.children().addClass("ui-state-disabled"), d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0);
                    this._disabledInputs = a.map(this._disabledInputs, function (a) {
                        return a === b ? null : a
                    }), this._disabledInputs[this._disabledInputs.length] = b
                }
            },
            _isDisabledDatepicker: function (a) {
                if (!a)return !1;
                for (var b = 0; b < this._disabledInputs.length; b++)if (this._disabledInputs[b] === a)return !0;
                return !1
            },
            _getInst: function (b) {
                try {
                    return a.data(b, "datepicker")
                } catch (c) {
                    throw"Missing instance data for this datepicker"
                }
            },
            _optionDatepicker: function (b, c, d) {
                var e, f, g, h, j = this._getInst(b);
                if (arguments.length === 2 && typeof c == "string")return c === "defaults" ? a.extend({}, a.datepicker._defaults) : j ? c === "all" ? a.extend({}, j.settings) : this._get(j, c) : null;
                e = c || {}, typeof c == "string" && (e = {}, e[c] = d), j && (this._curInst === j && this._hideDatepicker(), f = this._getDateDatepicker(b, !0), g = this._getMinMaxDate(j, "min"), h = this._getMinMaxDate(j, "max"), i(j.settings, e), g !== null && e.dateFormat !== undefined && e.minDate === undefined && (j.settings.minDate = this._formatDate(j, g)), h !== null && e.dateFormat !== undefined && e.maxDate === undefined && (j.settings.maxDate = this._formatDate(j, h)), "disabled" in e && (e.disabled ? this._disableDatepicker(b) : this._enableDatepicker(b)), this._attachments(a(b), j), this._autoSize(j), this._setDate(j, f), this._updateAlternate(j), this._updateDatepicker(j))
            },
            _changeDatepicker: function (a, b, c) {
                this._optionDatepicker(a, b, c)
            },
            _refreshDatepicker: function (a) {
                var b = this._getInst(a);
                b && this._updateDatepicker(b)
            },
            _setDateDatepicker: function (a, b) {
                var c = this._getInst(a);
                c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c))
            },
            _getDateDatepicker: function (a, b) {
                var c = this._getInst(a);
                c && !c.inline && this._setDateFromField(c, b);
                return c ? this._getDate(c) : null
            },
            _doKeyDown: function (b) {
                var c, d, e, f = a.datepicker._getInst(b.target), g = !0, h = f.dpDiv.is(".ui-datepicker-rtl");
                f._keyEvent = !0;
                if (a.datepicker._datepickerShowing)switch (b.keyCode) {
                    case 9:
                        a.datepicker._hideDatepicker(), g = !1;
                        break;
                    case 13:
                        e = a("td." + a.datepicker._dayOverClass + ":not(." + a.datepicker._currentClass + ")", f.dpDiv), e[0] && a.datepicker._selectDay(b.target, f.selectedMonth, f.selectedYear, e[0]), c = a.datepicker._get(f, "onSelect"), c ? (d = a.datepicker._formatDate(f), c.apply(f.input ? f.input[0] : null, [d, f])) : a.datepicker._hideDatepicker();
                        return !1;
                    case 27:
                        a.datepicker._hideDatepicker();
                        break;
                    case 33:
                        a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
                        break;
                    case 34:
                        a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
                        break;
                    case 35:
                        (b.ctrlKey || b.metaKey) && a.datepicker._clearDate(b.target), g = b.ctrlKey || b.metaKey;
                        break;
                    case 36:
                        (b.ctrlKey || b.metaKey) && a.datepicker._gotoToday(b.target), g = b.ctrlKey || b.metaKey;
                        break;
                    case 37:
                        (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? 1 : -1, "D"), g = b.ctrlKey || b.metaKey, b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
                        break;
                    case 38:
                        (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, -7, "D"), g = b.ctrlKey || b.metaKey;
                        break;
                    case 39:
                        (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? -1 : 1, "D"), g = b.ctrlKey || b.metaKey, b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
                        break;
                    case 40:
                        (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, 7, "D"), g = b.ctrlKey || b.metaKey;
                        break;
                    default:
                        g = !1
                } else b.keyCode === 36 && b.ctrlKey ? a.datepicker._showDatepicker(this) : g = !1;
                g && (b.preventDefault(), b.stopPropagation())
            },
            _doKeyPress: function (b) {
                var c, d, e = a.datepicker._getInst(b.target);
                if (a.datepicker._get(e, "constrainInput")) {
                    c = a.datepicker._possibleChars(a.datepicker._get(e, "dateFormat")), d = String.fromCharCode(b.charCode == null ? b.keyCode : b.charCode);
                    return b.ctrlKey || b.metaKey || d < " " || !c || c.indexOf(d) > -1
                }
            },
            _doKeyUp: function (b) {
                var c, d = a.datepicker._getInst(b.target);
                if (d.input.val() !== d.lastVal)try {
                    c = a.datepicker.parseDate(a.datepicker._get(d, "dateFormat"), d.input ? d.input.val() : null, a.datepicker._getFormatConfig(d)), c && (a.datepicker._setDateFromField(d), a.datepicker._updateAlternate(d), a.datepicker._updateDatepicker(d))
                } catch (e) {
                }
                return !0
            },
            _showDatepicker: function (b) {
                b = b.target || b, b.nodeName.toLowerCase() !== "input" && (b = a("input", b.parentNode)[0]);
                if (!a.datepicker._isDisabledDatepicker(b) && a.datepicker._lastInput !== b) {
                    var c, d, f, g, h, j, k;
                    c = a.datepicker._getInst(b), a.datepicker._curInst && a.datepicker._curInst !== c && (a.datepicker._curInst.dpDiv.stop(!0, !0), c && a.datepicker._datepickerShowing && a.datepicker._hideDatepicker(a.datepicker._curInst.input[0])), d = a.datepicker._get(c, "beforeShow"), f = d ? d.apply(b, [b, c]) : {};
                    if (f === !1)return;
                    i(c.settings, f), c.lastVal = null, a.datepicker._lastInput = b, a.datepicker._setDateFromField(c), a.datepicker._inDialog && (b.value = ""), a.datepicker._pos || (a.datepicker._pos = a.datepicker._findPos(b), a.datepicker._pos[1] += b.offsetHeight), g = !1, a(b).parents().each(function () {
                        g |= a(this).css("position") === "fixed";
                        return !g
                    }), h = {
                        left: a.datepicker._pos[0],
                        top: a.datepicker._pos[1]
                    }, a.datepicker._pos = null, c.dpDiv.empty(), c.dpDiv.css({
                        position: "absolute",
                        display: "block",
                        top: "-1000px"
                    }), a.datepicker._updateDatepicker(c), h = a.datepicker._checkOffset(c, h, g), c.dpDiv.css({
                        position: a.datepicker._inDialog && a.blockUI ? "static" : g ? "fixed" : "absolute",
                        display: "none",
                        left: h.left + "px",
                        top: h.top + "px"
                    }), c.inline || (j = a.datepicker._get(c, "showAnim"), k = a.datepicker._get(c, "duration"), c.dpDiv.css("z-index", e(a(b)) + 1), a.datepicker._datepickerShowing = !0, a.effects && a.effects.effect[j] ? c.dpDiv.show(j, a.datepicker._get(c, "showOptions"), k) : c.dpDiv[j || "show"](j ? k : null), a.datepicker._shouldFocusInput(c) && c.input.focus(), a.datepicker._curInst = c)
                }
            },
            _updateDatepicker: function (b) {
                this.maxRows = 4, d = b, b.dpDiv.empty().append(this._generateHTML(b)), this._attachHandlers(b);
                var c, e = this._getNumberOfMonths(b), f = e[1], g = 17, i = b.dpDiv.find("." + this._dayOverClass + " a");
                i.length > 0 && h.apply(i.get(0)), b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), f > 1 && b.dpDiv.addClass("ui-datepicker-multi-" + f).css("width", g * f + "em"), b.dpDiv[(e[0] !== 1 || e[1] !== 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi"), b.dpDiv[(this._get(b, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), b === a.datepicker._curInst && a.datepicker._datepickerShowing && a.datepicker._shouldFocusInput(b) && b.input.focus(), b.yearshtml && (c = b.yearshtml, setTimeout(function () {
                    c === b.yearshtml && b.yearshtml && b.dpDiv.find("select.ui-datepicker-year:first").replaceWith(b.yearshtml), c = b.yearshtml = null
                }, 0))
            },
            _shouldFocusInput: function (a) {
                return a.input && a.input.is(":visible") && !a.input.is(":disabled") && !a.input.is(":focus")
            },
            _checkOffset: function (b, c, d) {
                var e = b.dpDiv.outerWidth(), f = b.dpDiv.outerHeight(), g = b.input ? b.input.outerWidth() : 0, h = b.input ? b.input.outerHeight() : 0, i = document.documentElement.clientWidth + (d ? 0 : a(document).scrollLeft()), j = document.documentElement.clientHeight + (d ? 0 : a(document).scrollTop());
                c.left -= this._get(b, "isRTL") ? e - g : 0, c.left -= d && c.left === b.input.offset().left ? a(document).scrollLeft() : 0, c.top -= d && c.top === b.input.offset().top + h ? a(document).scrollTop() : 0, c.left -= Math.min(c.left, c.left + e > i && i > e ? Math.abs(c.left + e - i) : 0), c.top -= Math.min(c.top, c.top + f > j && j > f ? Math.abs(f + h) : 0);
                return c
            },
            _findPos: function (b) {
                var c, d = this._getInst(b), e = this._get(d, "isRTL");
                while (b && (b.type === "hidden" || b.nodeType !== 1 || a.expr.filters.hidden(b)))b = b[e ? "previousSibling" : "nextSibling"];
                c = a(b).offset();
                return [c.left, c.top]
            },
            _hideDatepicker: function (b) {
                var c, d, e, f, g = this._curInst;
                !g || b && g !== a.data(b, "datepicker") || this._datepickerShowing && (c = this._get(g, "showAnim"), d = this._get(g, "duration"), e = function () {
                    a.datepicker._tidyDialog(g)
                }, a.effects && (a.effects.effect[c] || a.effects[c]) ? g.dpDiv.hide(c, a.datepicker._get(g, "showOptions"), d, e) : g.dpDiv[c === "slideDown" ? "slideUp" : c === "fadeIn" ? "fadeOut" : "hide"](c ? d : null, e), c || e(), this._datepickerShowing = !1, f = this._get(g, "onClose"), f && f.apply(g.input ? g.input[0] : null, [g.input ? g.input.val() : "", g]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }), a.blockUI && (a.unblockUI(), a("body").append(this.dpDiv))), this._inDialog = !1)
            },
            _tidyDialog: function (a) {
                a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
            },
            _checkExternalClick: function (b) {
                if (!!a.datepicker._curInst) {
                    var c = a(b.target), d = a.datepicker._getInst(c[0]);
                    (c[0].id !== a.datepicker._mainDivId && c.parents("#" + a.datepicker._mainDivId).length === 0 && !c.hasClass(a.datepicker.markerClassName) && !c.closest("." + a.datepicker._triggerClass).length && a.datepicker._datepickerShowing && (!a.datepicker._inDialog || !a.blockUI) || c.hasClass(a.datepicker.markerClassName) && a.datepicker._curInst !== d) && a.datepicker._hideDatepicker()
                }
            },
            _adjustDate: function (b, c, d) {
                var e = a(b), f = this._getInst(e[0]);
                this._isDisabledDatepicker(e[0]) || (this._adjustInstDate(f, c + (d === "M" ? this._get(f, "showCurrentAtPos") : 0), d), this._updateDatepicker(f))
            },
            _gotoToday: function (b) {
                var c, d = a(b), e = this._getInst(d[0]);
                this._get(e, "gotoCurrent") && e.currentDay ? (e.selectedDay = e.currentDay, e.drawMonth = e.selectedMonth = e.currentMonth, e.drawYear = e.selectedYear = e.currentYear) : (c = new Date, e.selectedDay = c.getDate(), e.drawMonth = e.selectedMonth = c.getMonth(), e.drawYear = e.selectedYear = c.getFullYear()), this._notifyChange(e), this._adjustDate(d)
            },
            _selectMonthYear: function (b, c, d) {
                var e = a(b), f = this._getInst(e[0]);
                f["selected" + (d === "M" ? "Month" : "Year")] = f["draw" + (d === "M" ? "Month" : "Year")] = parseInt(c.options[c.selectedIndex].value, 10), this._notifyChange(f), this._adjustDate(e)
            },
            _selectDay: function (b, c, d, e) {
                var f, g = a(b);
                !a(e).hasClass(this._unselectableClass) && !this._isDisabledDatepicker(g[0]) && (f = this._getInst(g[0]), f.selectedDay = f.currentDay = a("a", e).html(), f.selectedMonth = f.currentMonth = c, f.selectedYear = f.currentYear = d, this._selectDate(b, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)))
            },
            _clearDate: function (b) {
                var c = a(b);
                this._selectDate(c, "")
            },
            _selectDate: function (b, c) {
                var d, e = a(b), f = this._getInst(e[0]);
                c = c != null ? c : this._formatDate(f), f.input && f.input.val(c), this._updateAlternate(f), d = this._get(f, "onSelect"), d ? d.apply(f.input ? f.input[0] : null, [c, f]) : f.input && f.input.trigger("change"), f.inline ? this._updateDatepicker(f) : (this._hideDatepicker(), this._lastInput = f.input[0], typeof f.input[0] != "object" && f.input.focus(), this._lastInput = null)
            },
            _updateAlternate: function (b) {
                var c, d, e, f = this._get(b, "altField");
                f && (c = this._get(b, "altFormat") || this._get(b, "dateFormat"), d = this._getDate(b), e = this.formatDate(c, d, this._getFormatConfig(b)), a(f).each(function () {
                    a(this).val(e)
                }))
            },
            noWeekends: function (a) {
                var b = a.getDay();
                return [b > 0 && b < 6, ""]
            },
            iso8601Week: function (a) {
                var b, c = new Date(a.getTime());
                c.setDate(c.getDate() + 4 - (c.getDay() || 7)), b = c.getTime(), c.setMonth(0), c.setDate(1);
                return Math.floor(Math.round((b - c) / 864e5) / 7) + 1
            },
            parseDate: function (b, c, d) {
                if (b == null || c == null)throw"Invalid arguments";
                c = typeof c == "object" ? c.toString() : c + "";
                if (c === "")return null;
                var e, f, g, h = 0, i = (d ? d.shortYearCutoff : null) || this._defaults.shortYearCutoff, j = typeof i != "string" ? i : (new Date).getFullYear() % 100 + parseInt(i, 10), k = (d ? d.dayNamesShort : null) || this._defaults.dayNamesShort, l = (d ? d.dayNames : null) || this._defaults.dayNames, m = (d ? d.monthNamesShort : null) || this._defaults.monthNamesShort, n = (d ? d.monthNames : null) || this._defaults.monthNames, o = -1, p = -1, q = -1, r = -1, s = !1, t, u = function (a) {
                    var c = e + 1 < b.length && b.charAt(e + 1) === a;
                    c && e++;
                    return c
                }, v = function (a) {
                    var b = u(a), d = a === "@" ? 14 : a === "!" ? 20 : a === "y" && b ? 4 : a === "o" ? 3 : 2, e = a === "y" ? d : 1, f = new RegExp("^\\d{" + e + "," + d + "}"), g = c.substring(h).match(f);
                    if (!g)throw"Missing number at position " + h;
                    h += g[0].length;
                    return parseInt(g[0], 10)
                }, w = function (b, d, e) {
                    var f = -1, g = a.map(u(b) ? e : d, function (a, b) {
                        return [[b, a]]
                    }).sort(function (a, b) {
                        return -(a[1].length - b[1].length)
                    });
                    a.each(g, function (a, b) {
                        var d = b[1];
                        if (c.substr(h, d.length).toLowerCase() === d.toLowerCase()) {
                            f = b[0], h += d.length;
                            return !1
                        }
                    });
                    if (f !== -1)return f + 1;
                    throw"Unknown name at position " + h
                }, x = function () {
                    if (c.charAt(h) !== b.charAt(e))throw"Unexpected literal at position " + h;
                    h++
                };
                for (e = 0; e < b.length; e++)if (s)b.charAt(e) === "'" && !u("'") ? s = !1 : x(); else switch (b.charAt(e)) {
                    case"d":
                        q = v("d");
                        break;
                    case"D":
                        w("D", k, l);
                        break;
                    case"o":
                        r = v("o");
                        break;
                    case"m":
                        p = v("m");
                        break;
                    case"M":
                        p = w("M", m, n);
                        break;
                    case"y":
                        o = v("y");
                        break;
                    case"@":
                        t = new Date(v("@")), o = t.getFullYear(), p = t.getMonth() + 1, q = t.getDate();
                        break;
                    case"!":
                        t = new Date((v("!") - this._ticksTo1970) / 1e4), o = t.getFullYear(), p = t.getMonth() + 1, q = t.getDate();
                        break;
                    case"'":
                        u("'") ? x() : s = !0;
                        break;
                    default:
                        x()
                }
                if (h < c.length) {
                    g = c.substr(h);
                    if (!/^\s+/.test(g))throw"Extra/unparsed characters found in date: " + g
                }
                o === -1 ? o = (new Date).getFullYear() : o < 100 && (o += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (o <= j ? 0 : -100));
                if (r > -1) {
                    p = 1, q = r;
                    for (; ;) {
                        f = this._getDaysInMonth(o, p - 1);
                        if (q <= f)break;
                        p++, q -= f
                    }
                }
                t = this._daylightSavingAdjust(new Date(o, p - 1, q));
                if (t.getFullYear() !== o || t.getMonth() + 1 !== p || t.getDate() !== q)throw"Invalid date";
                return t
            },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1e7,
            formatDate: function (a, b, c) {
                if (!b)return "";
                var d, e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, f = (c ? c.dayNames : null) || this._defaults.dayNames, g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, h = (c ? c.monthNames : null) || this._defaults.monthNames, i = function (b) {
                    var c = d + 1 < a.length && a.charAt(d + 1) === b;
                    c && d++;
                    return c
                }, j = function (a, b, c) {
                    var d = "" + b;
                    if (i(a))while (d.length < c)d = "0" + d;
                    return d
                }, k = function (a, b, c, d) {
                    return i(a) ? d[b] : c[b]
                }, l = "", m = !1;
                if (b)for (d = 0; d < a.length; d++)if (m)a.charAt(d) === "'" && !i("'") ? m = !1 : l += a.charAt(d); else switch (a.charAt(d)) {
                    case"d":
                        l += j("d", b.getDate(), 2);
                        break;
                    case"D":
                        l += k("D", b.getDay(), e, f);
                        break;
                    case"o":
                        l += j("o", Math.round(((new Date(b.getFullYear(), b.getMonth(), b.getDate())).getTime() - (new Date(b.getFullYear(), 0, 0)).getTime()) / 864e5), 3);
                        break;
                    case"m":
                        l += j("m", b.getMonth() + 1, 2);
                        break;
                    case"M":
                        l += k("M", b.getMonth(), g, h);
                        break;
                    case"y":
                        l += i("y") ? b.getFullYear() : (b.getYear() % 100 < 10 ? "0" : "") + b.getYear() % 100;
                        break;
                    case"@":
                        l += b.getTime();
                        break;
                    case"!":
                        l += b.getTime() * 1e4 + this._ticksTo1970;
                        break;
                    case"'":
                        i("'") ? l += "'" : m = !0;
                        break;
                    default:
                        l += a.charAt(d)
                }
                return l
            },
            _possibleChars: function (a) {
                var b, c = "", d = !1, e = function (c) {
                    var d = b + 1 < a.length && a.charAt(b + 1) === c;
                    d && b++;
                    return d
                };
                for (b = 0; b < a.length; b++)if (d)a.charAt(b) === "'" && !e("'") ? d = !1 : c += a.charAt(b); else switch (a.charAt(b)) {
                    case"d":
                    case"m":
                    case"y":
                    case"@":
                        c += "0123456789";
                        break;
                    case"D":
                    case"M":
                        return null;
                    case"'":
                        e("'") ? c += "'" : d = !0;
                        break;
                    default:
                        c += a.charAt(b)
                }
                return c
            },
            _get: function (a, b) {
                return a.settings[b] !== undefined ? a.settings[b] : this._defaults[b]
            },
            _setDateFromField: function (a, b) {
                if (a.input.val() !== a.lastVal) {
                    var c = this._get(a, "dateFormat"), d = a.lastVal = a.input ? a.input.val() : null, e = this._getDefaultDate(a), f = e, g = this._getFormatConfig(a);
                    try {
                        f = this.parseDate(c, d, g) || e
                    } catch (h) {
                        d = b ? "" : d
                    }
                    a.selectedDay = f.getDate(), a.drawMonth = a.selectedMonth = f.getMonth(), a.drawYear = a.selectedYear = f.getFullYear(), a.currentDay = d ? f.getDate() : 0, a.currentMonth = d ? f.getMonth() : 0, a.currentYear = d ? f.getFullYear() : 0, this._adjustInstDate(a)
                }
            },
            _getDefaultDate: function (a) {
                return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
            },
            _determineDate: function (b, c, d) {
                var e = function (a) {
                    var b = new Date;
                    b.setDate(b.getDate() + a);
                    return b
                }, f = function (c) {
                    try {
                        return a.datepicker.parseDate(a.datepicker._get(b, "dateFormat"), c, a.datepicker._getFormatConfig(b))
                    } catch (d) {
                    }
                    var e = (c.toLowerCase().match(/^c/) ? a.datepicker._getDate(b) : null) || new Date, f = e.getFullYear(), g = e.getMonth(), h = e.getDate(), i = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, j = i.exec(c);
                    while (j) {
                        switch (j[2] || "d") {
                            case"d":
                            case"D":
                                h += parseInt(j[1], 10);
                                break;
                            case"w":
                            case"W":
                                h += parseInt(j[1], 10) * 7;
                                break;
                            case"m":
                            case"M":
                                g += parseInt(j[1], 10), h = Math.min(h, a.datepicker._getDaysInMonth(f, g));
                                break;
                            case"y":
                            case"Y":
                                f += parseInt(j[1], 10), h = Math.min(h, a.datepicker._getDaysInMonth(f, g))
                        }
                        j = i.exec(c)
                    }
                    return new Date(f, g, h)
                }, g = c == null || c === "" ? d : typeof c == "string" ? f(c) : typeof c == "number" ? isNaN(c) ? d : e(c) : new Date(c.getTime());
                g = g && g.toString() === "Invalid Date" ? d : g, g && (g.setHours(0), g.setMinutes(0), g.setSeconds(0), g.setMilliseconds(0));
                return this._daylightSavingAdjust(g)
            },
            _daylightSavingAdjust: function (a) {
                if (!a)return null;
                a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0);
                return a
            },
            _setDate: function (a, b, c) {
                var d = !b, e = a.selectedMonth, f = a.selectedYear, g = this._restrictMinMax(a, this._determineDate(a, b, new Date));
                a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), (e !== a.selectedMonth || f !== a.selectedYear) && !c && this._notifyChange(a), this._adjustInstDate(a), a.input && a.input.val(d ? "" : this._formatDate(a))
            },
            _getDate: function (a) {
                var b = !a.currentYear || a.input && a.input.val() === "" ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
                return b
            },
            _attachHandlers: function (b) {
                var c = this._get(b, "stepMonths"), d = "#" + b.id.replace(/\\\\/g, "\\");
                b.dpDiv.find("[data-handler]").map(function () {
                    var b = {
                        prev: function () {
                            a.datepicker._adjustDate(d, -c, "M")
                        }, next: function () {
                            a.datepicker._adjustDate(d, +c, "M")
                        }, hide: function () {
                            a.datepicker._hideDatepicker()
                        }, today: function () {
                            a.datepicker._gotoToday(d)
                        }, selectDay: function () {
                            a.datepicker._selectDay(d, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
                            return !1
                        }, selectMonth: function () {
                            a.datepicker._selectMonthYear(d, this, "M");
                            return !1
                        }, selectYear: function () {
                            a.datepicker._selectMonthYear(d, this, "Y");
                            return !1
                        }
                    };
                    a(this).bind(this.getAttribute("data-event"), b[this.getAttribute("data-handler")])
                })
            },
            _generateHTML: function (a) {
                var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O = new Date, P = this._daylightSavingAdjust(new Date(O.getFullYear(), O.getMonth(), O.getDate())), Q = this._get(a, "isRTL"), R = this._get(a, "showButtonPanel"), S = this._get(a, "hideIfNoPrevNext"), T = this._get(a, "navigationAsDateFormat"), U = this._getNumberOfMonths(a), V = this._get(a, "showCurrentAtPos"), W = this._get(a, "stepMonths"), X = U[0] !== 1 || U[1] !== 1, Y = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)), Z = this._getMinMaxDate(a, "min"), $ = this._getMinMaxDate(a, "max"), _ = a.drawMonth - V, ba = a.drawYear;
                _ < 0 && (_ += 12, ba--);
                if ($) {
                    b = this._daylightSavingAdjust(new Date($.getFullYear(), $.getMonth() - U[0] * U[1] + 1, $.getDate())), b = Z && b < Z ? Z : b;
                    while (this._daylightSavingAdjust(new Date(ba, _, 1)) > b)_--, _ < 0 && (_ = 11, ba--)
                }
                a.drawMonth = _, a.drawYear = ba, c = this._get(a, "prevText"), c = T ? this.formatDate(c, this._daylightSavingAdjust(new Date(ba, _ - W, 1)), this._getFormatConfig(a)) : c, d = this._canAdjustMonth(a, -1, ba, _) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>" : S ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>", e = this._get(a, "nextText"), e = T ? this.formatDate(e, this._daylightSavingAdjust(new Date(ba, _ + W, 1)), this._getFormatConfig(a)) : e, f = this._canAdjustMonth(a, 1, ba, _) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>" : S ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>", g = this._get(a, "currentText"), h = this._get(a, "gotoCurrent") && a.currentDay ? Y : P, g = T ? this.formatDate(g, h, this._getFormatConfig(a)) : g, i = a.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(a, "closeText") + "</button>", j = R ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Q ? i : "") + (this._isInRange(a, h) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + g + "</button>" : "") + (Q ? "" : i) + "</div>" : "", k = parseInt(this._get(a, "firstDay"), 10), k = isNaN(k) ? 0 : k, l = this._get(a, "showWeek"), m = this._get(a, "dayNames"), n = this._get(a, "dayNamesMin"), o = this._get(a, "monthNames"), p = this._get(a, "monthNamesShort"), q = this._get(a, "beforeShowDay"), r = this._get(a, "showOtherMonths"), s = this._get(a, "selectOtherMonths"), t = this._getDefaultDate(a), u = "", v;
                for (w = 0; w < U[0]; w++) {
                    x = "", this.maxRows = 4;
                    for (y = 0; y < U[1]; y++) {
                        z = this._daylightSavingAdjust(new Date(ba, _, a.selectedDay)), A = " ui-corner-all", B = "";
                        if (X) {
                            B += "<div class='ui-datepicker-group";
                            if (U[1] > 1)switch (y) {
                                case 0:
                                    B += " ui-datepicker-group-first", A = " ui-corner-" + (Q ? "right" : "left");
                                    break;
                                case U[1] - 1:
                                    B += " ui-datepicker-group-last", A = " ui-corner-" + (Q ? "left" : "right");
                                    break;
                                default:
                                    B += " ui-datepicker-group-middle", A = ""
                            }
                            B += "'>"
                        }
                        B += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + A + "'>" + (/all|left/.test(A) && w === 0 ? Q ? f : d : "") + (/all|right/.test(A) && w === 0 ? Q ? d : f : "") + this._generateMonthYearHeader(a, _, ba, Z, $, w > 0 || y > 0, o, p) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", C = l ? "<th class='ui-datepicker-week-col'>" + this._get(a, "weekHeader") + "</th>" : "";
                        for (v = 0; v < 7; v++)D = (v + k) % 7, C += "<th scope='col'" + ((v + k + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + m[D] + "'>" + n[D] + "</span></th>";
                        B += C + "</tr></thead><tbody>", E = this._getDaysInMonth(ba, _), ba === a.selectedYear && _ === a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, E)), F = (this._getFirstDayOfMonth(ba, _) - k + 7) % 7, G = Math.ceil((F + E) / 7), H = X ? this.maxRows > G ? this.maxRows : G : G, this.maxRows = H, I = this._daylightSavingAdjust(new Date(ba, _, 1 - F));
                        for (J = 0; J < H; J++) {
                            B += "<tr>", K = l ? "<td class='ui-datepicker-week-col'>" + this._get(a, "calculateWeek")(I) + "</td>" : "";
                            for (v = 0; v < 7; v++)L = q ? q.apply(a.input ? a.input[0] : null, [I]) : [!0, ""], M = I.getMonth() !== _, N = M && !s || !L[0] || Z && I < Z || $ && I > $, K += "<td class='" + ((v + k + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (M ? " ui-datepicker-other-month" : "") + (I.getTime() === z.getTime() && _ === a.selectedMonth && a._keyEvent || t.getTime() === I.getTime() && t.getTime() === z.getTime() ? " " + this._dayOverClass : "") + (N ? " " + this._unselectableClass + " ui-state-disabled" : "") + (M && !r ? "" : " " + L[1] + (I.getTime() === Y.getTime() ? " " + this._currentClass : "") + (I.getTime() === P.getTime() ? " ui-datepicker-today" : "")) + "'" + ((!M || r) && L[2] ? " title='" + L[2].replace(/'/g, "&#39;") + "'" : "") + (N ? "" : " data-handler='selectDay' data-event='click' data-month='" + I.getMonth() + "' data-year='" + I.getFullYear() + "'") + ">" + (M && !r ? "&#xa0;" : N ? "<span class='ui-state-default'>" + I.getDate() + "</span>" : "<a class='ui-state-default" + (I.getTime() === P.getTime() ? " ui-state-highlight" : "") + (I.getTime() === Y.getTime() ? " ui-state-active" : "") + (M ? " ui-priority-secondary" : "") + "' href='#'>" + I.getDate() + "</a>") + "</td>", I.setDate(I.getDate() + 1), I = this._daylightSavingAdjust(I);
                            B += K + "</tr>"
                        }
                        _++, _ > 11 && (_ = 0, ba++), B += "</tbody></table>" + (X ? "</div>" + (U[0] > 0 && y === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), x += B
                    }
                    u += x
                }
                u += j, a._keyEvent = !1;
                return u
            },
            _generateMonthYearHeader: function (a, b, c, d, e, f, g, h) {
                var i, j, k, l, m, n, o, p, q = this._get(a, "changeMonth"), r = this._get(a, "changeYear"), s = this._get(a, "showMonthAfterYear"), t = "<div class='ui-datepicker-title'>", u = "";
                if (f || !q)u += "<span class='ui-datepicker-month'>" + g[b] + "</span>"; else {
                    i = d && d.getFullYear() === c, j = e && e.getFullYear() === c, u += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
                    for (k = 0; k < 12; k++)(!i || k >= d.getMonth()) && (!j || k <= e.getMonth()) && (u += "<option value='" + k + "'" + (k === b ? " selected='selected'" : "") + ">" + h[k] + "</option>");
                    u += "</select>"
                }
                s || (t += u + (f || !q || !r ? "&#xa0;" : ""));
                if (!a.yearshtml) {
                    a.yearshtml = "";
                    if (f || !r)t += "<span class='ui-datepicker-year'>" + c + "</span>"; else {
                        l = this._get(a, "yearRange").split(":"), m = (new Date).getFullYear(), n = function (a) {
                            var b = a.match(/c[+\-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+\-].*/) ? m + parseInt(a, 10) : parseInt(a, 10);
                            return isNaN(b) ? m : b
                        }, o = n(l[0]), p = Math.max(o, n(l[1] || "")), o = d ? Math.max(o, d.getFullYear()) : o, p = e ? Math.min(p, e.getFullYear()) : p, a.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                        for (; o <= p; o++)a.yearshtml += "<option value='" + o + "'" + (o === c ? " selected='selected'" : "") + ">" + o + "</option>";
                        a.yearshtml += "</select>", t += a.yearshtml, a.yearshtml = null
                    }
                }
                t += this._get(a, "yearSuffix"), s && (t += (f || !q || !r ? "&#xa0;" : "") + u), t += "</div>";
                return t
            },
            _adjustInstDate: function (a, b, c) {
                var d = a.drawYear + (c === "Y" ? b : 0), e = a.drawMonth + (c === "M" ? b : 0), f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + (c === "D" ? b : 0), g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f)));
                a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), (c === "M" || c === "Y") && this._notifyChange(a)
            },
            _restrictMinMax: function (a, b) {
                var c = this._getMinMaxDate(a, "min"), d = this._getMinMaxDate(a, "max"), e = c && b < c ? c : b;
                return d && e > d ? d : e
            },
            _notifyChange: function (a) {
                var b = this._get(a, "onChangeMonthYear");
                b && b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
            },
            _getNumberOfMonths: function (a) {
                var b = this._get(a, "numberOfMonths");
                return b == null ? [1, 1] : typeof b == "number" ? [1, b] : b
            },
            _getMinMaxDate: function (a, b) {
                return this._determineDate(a, this._get(a, b + "Date"), null)
            },
            _getDaysInMonth: function (a, b) {
                return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate()
            },
            _getFirstDayOfMonth: function (a, b) {
                return (new Date(a, b, 1)).getDay()
            },
            _canAdjustMonth: function (a, b, c, d) {
                var e = this._getNumberOfMonths(a), f = this._daylightSavingAdjust(new Date(c, d + (b < 0 ? b : e[0] * e[1]), 1));
                b < 0 && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth()));
                return this._isInRange(a, f)
            },
            _isInRange: function (a, b) {
                var c, d, e = this._getMinMaxDate(a, "min"), f = this._getMinMaxDate(a, "max"), g = null, h = null, i = this._get(a, "yearRange");
                i && (c = i.split(":"), d = (new Date).getFullYear(), g = parseInt(c[0], 10), h = parseInt(c[1], 10), c[0].match(/[+\-].*/) && (g += d), c[1].match(/[+\-].*/) && (h += d));
                return (!e || b.getTime() >= e.getTime()) && (!f || b.getTime() <= f.getTime()) && (!g || b.getFullYear() >= g) && (!h || b.getFullYear() <= h)
            },
            _getFormatConfig: function (a) {
                var b = this._get(a, "shortYearCutoff");
                b = typeof b != "string" ? b : (new Date).getFullYear() % 100 + parseInt(b, 10);
                return {
                    shortYearCutoff: b,
                    dayNamesShort: this._get(a, "dayNamesShort"),
                    dayNames: this._get(a, "dayNames"),
                    monthNamesShort: this._get(a, "monthNamesShort"),
                    monthNames: this._get(a, "monthNames")
                }
            },
            _formatDate: function (a, b, c, d) {
                b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
                var e = b ? typeof b == "object" ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
                return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a))
            }
        }), a.fn.datepicker = function (b) {
            if (!this.length)return this;
            a.datepicker.initialized || (a(document).mousedown(a.datepicker._checkExternalClick), a.datepicker.initialized = !0), a("#" + a.datepicker._mainDivId).length === 0 && a("body").append(a.datepicker.dpDiv);
            var c = Array.prototype.slice.call(arguments, 1);
            if (typeof b == "string" && (b === "isDisabled" || b === "getDate" || b === "widget"))return a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(c));
            if (b === "option" && arguments.length === 2 && typeof arguments[1] == "string")return a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(c));
            return this.each(function () {
                typeof b == "string" ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this].concat(c)) : a.datepicker._attachDatepicker(this, b)
            })
        }, a.datepicker = new f, a.datepicker.initialized = !1, a.datepicker.uuid = (new Date).getTime(), a.datepicker.version = "1.11.1";
        var j = a.datepicker
    })(d)
});
define("template/floatbox/releaseDateBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer-bd"><div class="releaseDateBox-row releaseDateBox-theme"><label class="releaseDateBox-label">\u4e3b\u9898\uff1a</label><div class="releaseDateBox-control"><ul class="releaseDateBox-icons"><li><a class="s-film theme-trigger" href="javascript:;" data-index="1"></a><span>\u770b\u7535\u5f71</span></li><li><a class="s-dinner theme-trigger" href="javascript:;" data-index="0"></a><span>\u5403\u996d</span></li><li><a class="s-ktv theme-trigger" href="javascript:;" data-index="2"></a><span>K\u6b4c</span></li><li><a class="s-coffee theme-trigger" href="javascript:;" data-index="3"></a><span>\u559d\u5496\u5561</span></li><li><a class="s-sport theme-trigger" href="javascript:;" data-index="4"></a><span>\u8fd0\u52a8</span></li><li><a class="s-travel theme-trigger" href="javascript:;" data-index="6"></a><span>\u65c5\u884c</span></li><li><a class="s-shopping theme-trigger" href="javascript:;" data-index="5"></a><span>\u901b\u8857</span></li><li><a class="s-other theme-trigger" href="javascript:;" data-index="7"></a><span>\u5176\u5b83</span></li></ul></div><div class="form-tips js-theme-tips"><span class="text-icon-tips js-tips text-icon-tips-error"><em class="icon-error-s"></em>\u8bf7\u9009\u62e9\u4e3b\u9898</span></div></div><div class="releaseDateBox-row"><label class="releaseDateBox-label">\u8d39\u7528\uff1a</label><div class="releaseDateBox-control"><label><input type="radio" name="payType" value="0" checked="checked"/>\u6211\u4e70\u5355</label><label><input type="radio" name="payType" value="1" />AA\u5236</label></div></div><div class="releaseDateBox-row"><label class="releaseDateBox-label">\u65f6\u95f4\uff1a</label><div class="releaseDateBox-control"><select class="js-timeType"><option value="0">\u4e0d\u9650\u65f6\u95f4</option><option value="1">\u5e73\u65f6\u5468\u672b</option><option value="2">\u6307\u5b9a\u65f6\u95f4</option></select><input class="hide js-calendar" type="text" value="', year, "\u5e74", month, "\u6708", date, '\u65e5" readonly="readonly" /><select class="hide js-startTime"><option value="0">\u5f00\u59cb\u65f6\u95f4</option></select></div><div class="form-tips js-time-tips"><span class="text-icon-tips js-tips text-icon-tips-error"><em class="icon-error-s"></em>\u8bf7\u9009\u62e9\u5f00\u59cb\u65f6\u95f4</span></div></div><div class="releaseDateBox-row releaseDateBox-addr"><label class="releaseDateBox-label">\u5730\u70b9\uff1a</label><div class="releaseDateBox-control"><select class="js-province" data-selected="', province, '"></select><select class="js-city" data-selected="', city, '"></select><span class="releaseDateBox-wrapper js-pleaceholder-wrapper"><input class="releaseDateBox-detailAddr js-detailAddr" type="text" placeholder="\u8be6\u7ec6\u5730\u5740" /></span></div><div class="form-tips js-addr-tips"><span class="text-icon-tips js-tips text-icon-tips-error"><em class="icon-error-s"></em>\u8bf7\u586b\u5199\u5730\u5740</span></div></div><div class="releaseDateBox-row"><label class="releaseDateBox-label">\u63cf\u8ff0\uff1a</label><div class="releaseDateBox-control"><span class="releaseDateBox-wrapper js-pleaceholder-wrapper"><input class="releaseDateBox-detailDesc js-detailDesc" type="text" placeholder="\u53ef\u8f93\u51650-30\u5b57\u7684\u8be6\u7ec6\u63cf\u8ff0" /></span></div><div class="releaseDateBox-count n-send-ft"><span class="fR js-wordCounter"><b class="char-constantia">30</b>\u5b57</span></div></div></div><div class="poplayer-ft js-send-btn"><div class="n-display-block"><div class="poplayer-btn n-btn-box js-btn"><div class="js-btn-txt"><a class="btn btn-red n-btn-sure submit-trigger" href="javascript:;">\u53d1\u5e03\u7ea6\u4f1a</a></div></div></div><div class="n-display-none"><span class="text-small-tips cGray"><em class="icon-correct-s" style="vertical-align: text-top; margin-right: 3px;"></em>\u53d1\u5e03\u6210\u529f\uff01</span></div></div>');
        return p.join("")
    }
});
define("widget/box/floatBox/OpenSvipBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("utils/tmpl"), f = a("widget/box/floatBox/Box"), g = f.extend({
        preRender: function () {
            return {
                title: "\u5f00\u901a\u9ad8\u7ea7VIP\u4f1a\u5458",
                bodyContent: e.formatTemplate(a("template/floatbox/openSvipBox"), {})
            }
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-confirmBox")
        }
    });
    return g
});
define("template/floatbox/openSvipBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer-bd"><div class="poplayer-messbox"><span class="poplayer-mess">\u5f00\u901a\u9ad8\u7ea7VIP\u4f1a\u5458\u67e5\u770b\u4f18\u8d28\u7528\u6237</span></div><p class="poplayer-desc">\u6700\u4f18\u8d28\u7684\u7528\u6237\u5168\u90e8\u5bf9\u60a8\u5f00\u653e\uff0c\u83b7\u53d6\u66f4\u591a\u673a\u4f1a</p></div><div class="poplayer-ft"><div class="poplayer-btn"><a class="btn btn-red" href="/pay/services">\u5f00\u901a\u9ad8\u7ea7VIP\u4f1a\u5458</a><a class="btn btn-gray close-trigger" href="javascript:;">\u7ee7\u7eed\u5355\u8eab</a></div></div>');
        return p.join("")
    }
});
define("widget/box/floatBox/GuideUploadAvatar", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("utils/tmpl"), f = a("widget/box/floatBox/Box"), g = f.extend({
        preRender: function () {
            return {
                title: this.config.title + "\u6210\u529f" || "\u8bf7\u786e\u8ba4\u64cd\u4f5c",
                bodyContent: e.formatTemplate(a("template/floatbox/guideUploadAvatar"), this.data)
            }
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-confirmBox")
        }
    });
    return g
});
define("template/floatbox/guideUploadAvatar", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer-bd"><div class="poplayer-messbox"><span class="poplayer-mess"><em class="icon-warning-b"></em>\u6ca1\u6709\u771f\u5b9e\u5934\u50cf\u5bf9\u65b9\u53ef\u80fd\u4e0d\u4f1a\u56de\u590d\u4f60\u54e6\uff0c\u7acb\u5373\u4e0a\u4f20\u672c\u4eba\u76f8\u7247\u8ba9\u5bf9\u65b9\u8054\u7cfb\u4f60\uff01</span></div></div><div class="poplayer-ft"><div class="poplayer-btn"><a class="btn btn-red" href="/settings/face">\u53bb\u4e0a\u4f20\u5934\u50cf</a></div></div>');
        return p.join("")
    }
});
define("task/widget/header", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("task/basic/Task"), f = a("utils/Cookie"), g = a("utils/Log");
    (new e("header", function () {
        var b = d("#header"), c = d("#publishArea"), e = d(document.body), g = d(".js-header-info");
        g.size() !== 0 && d.browser.msie && d.browser.version < 7 && (g.find(".js-info-mess").hover(function () {
            d(this).addClass("hover-mess")
        }, function () {
            d(this).removeClass("hover-mess")
        }), g.find(".js-info-user").hover(function () {
            d(this).addClass("hover-user")
        }, function () {
            d(this).removeClass("hover-user")
        }));
        if (d.browser.msie && d.browser.version < 7 && parseInt(f.get("updateie6")) !== 1) {
            var h = d('<div id="updateBrowser" class="update-browser" data-log="updateie6">\n            <div class="update-browser-inner">\n               <p>Hey\uff0c\u60a8\u5728\u82b1\u7530\u5bfb\u627e\u7684\u5f02\u6027\u90fd\u4e0d\u4f7f\u7528IE6\u6d4f\u89c8\u5668\u4e86\uff0c\u4f60\u4e5f\u8d76\u5feb\u5347\u7ea7\u5427\u3002\u5f3a\u70c8\u5efa\u8bae\u4f60\u5b89\u88c5<a class="link-red" target="_blank" href="http://chrome.163.com/">\u7f51\u6613\u5b9a\u5236\u7248\u8c37\u6b4c\u6d4f\u89c8\u5668</a>\u6216<a class="link-red" target="_blank" href="http://windows.microsoft.com/zh-CN/windows/upgrade-your-browser">\u5347\u7ea7IE</a>\uff01</p>\n            </div>\n         </div>');
            h.insertBefore(d("#header")), h.delegate(".close-browserTip-trigger", "click", function () {
                f.set("updateie6", 1, 30), h.remove()
            })
        }
        if (b.find(".js-info-user").size() !== 0) {
            var i = a("widget/box/floatBox/CloseInfoBox");
            b.find(".js-info-user").delegate(".closeinfo-trigger", "click", function () {
                (new i).show()
            }), f.get("inviteNew") || b.find(".js-info-user").find(".icon-new").css("display", "inline-block"), b.find(".js-info-user").delegate(".invite-trigger", "click", function () {
                f.set("inviteNew", "1", 365)
            })
        }
        d("#logOut").attr("href", "/logout?url=" + location.href);
        var j = {};
        j.$vipGuideBanner = b.find(".header-vipGuide a");
        var k = function () {
            j.flag == 0 ? (j.$vipGuideBanner.html(j.switchText), j.flag = 1) : (j.$vipGuideBanner.html(j.originalText), j.flag = 0)
        };
        if (j.$vipGuideBanner.size() > 0) {
            var l = j.$vipGuideBanner.data("type");
            j.originalText = j.$vipGuideBanner.html(), j.flag = 0;
            switch (l) {
                case"vipTimeLimit20":
                    j.switchText = '\u5e74\u4ed8VIP<span class="star-text-georgia">78</span>\u5143';
                    break;
                case"viprenew":
                    j.switchText = '\u5e74\u4ed8\u4f1a\u5458\u53ea\u8981<span class="star-text-georgia">50</span>\u5143';
                    break;
                case"sviprenew":
                    j.switchText = '\u5e74\u4ed8\u4f1a\u5458\u53ea\u8981<span class="star-text-georgia">248</span>\u5143';
                    break;
                case"svip388":
                    j.switchText = '\u72c2\u964d<span class="star-text-georgia">100</span>\u5143';
                    break;
                case"svipRenew388":
                    j.switchText = '\u7acb\u7701<span class="star-text-georgia">100</span>\u5143'
            }
            setInterval(k, 2e3)
        }
    })).add()
});
define("widget/box/floatBox/CloseInfoBox", function (a, b, c) {
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/tmpl"), g = a("utils/Utils"), h = a("utils/Error"), i = a("utils/DataSource"), j = a("utils/Log"), k = a("widget/box/floatBox/TipsBox"), l = e.extend({
        preRender: function () {
            return {
                title: "\u5173\u95ed\u8d44\u6599",
                bodyContent: f.formatTemplate(a("template/floatbox/closeInfoBox"), this.parseData())
            }
        }, parseData: function () {
            var a = d.extend({}, this.data);
            return a
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-closeInfoBox"), this.isValid = !1, this.$inputElems = this.$elem.find(".js-list input[type=checkbox]"), this.$btnAreaElem = this.$elem.find(".n-btn-box").find(".js-btn")
        }, bindEvent: function () {
            this._super(), this.$elem.delegate(".submit-trigger", "click", d.proxy(this.onSubmit, this)), this.$elem.delegate("input", "click", d.proxy(this.onSelectVal, this))
        }, onSelectVal: function (a) {
            this.onSetBtnStatus(), this.onCheckVal(a)
        }, onSetBtnStatus: function () {
            this.$inputElems.filter(":checked").size() === 0 ? this.disableBtn() : this.enableBtn()
        }, onCheckVal: function (a) {
            var b = d(a.currentTarget), c = this.$inputElems.first();
            b[0] === c[0] && (c.is(":checked") ? this.$inputElems.slice(1).attr({
                checked: !1,
                disabled: !0
            }) : this.$inputElems.slice(1).attr({disabled: !1}))
        }, parseParams: function () {
            var a = {}, b = this.$inputElems.filter(":checked"), c = [];
            d.each(b, function (a, b) {
                c.push(d(b).val())
            }), a.type = c.join(";");
            return a
        }, onSubmit: function () {
            if (!(!this.isValid || d.isPlainObject(this.request) && this.request.readyState !== 4)) {
                var a = this.parseParams(), b = this;
                g.btnSending.call(this, this.$elem.find(".submit-trigger")), this.request = i.postJSON("closeUser", a, function (a) {
                    var c = parseInt(a.code) || 1;
                    h.Tips(c) || (b.hide(), b.onSuccess()), g.btnSended.call(b, b.$elem.find(".submit-trigger"))
                }), j.doLog({parameter: {method: "closeinfor"}, elem: "body"})
            }
        }, onSuccess: function () {
            var a = new k(null, {data: {type: "correct", text: "\u8d44\u6599\u5df2\u5173\u95ed\uff01"}});
            a.show(), a.delayHide(g.tipsHideInterval), setTimeout(function () {
                location.reload()
            }, 2500)
        }, enableBtn: function () {
            this.$btnAreaElem.removeClass("disabled"), this.isValid = !0
        }, disableBtn: function () {
            this.$btnAreaElem.addClass("disabled"), this.isValid = !1
        }
    });
    return l
});
define("template/floatbox/closeInfoBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer-bd"><div class="poplayer-closeInfo-tips"><p class="text-border-tips"><span><em class="icon-warning-s"></em>\u5173\u95ed\u8d44\u6599\u540e\uff0c\u60a8\u5c06\u4e0d\u518d\u4f7f\u7528\u82b1\u7530\u3002\u5176\u4ed6\u7528\u6237\u5c06\u65e0\u6cd5\u770b\u5230\u60a8\u7684\u8d44\u6599\uff0c\u60a8\u4e5f\u4e0d\u518d\u4f1a\u5728\u641c\u7d22\u7ed3\u679c\u4e2d\u51fa\u73b0\u6216\u88ab\u63a8\u8350\u81f3\u9996\u9875\uff0c\u60a8\u4e4b\u524d\u7684\u4e92\u52a8\u4fe1\u606f\u53ef\u80fd\u4f1a\u88ab\u5220\u9664\u65e0\u6cd5\u627e\u56de\uff01</span></p></div><div class="poplayer-closeInfo-content"><div class="poplayer-closeInfo-title clearfix"><h3 class="fS14 fL">\u60a8\u9009\u62e9\u5173\u95ed\u8d44\u6599\u7684\u539f\u56e0\u662f\uff1f</h3><span class="poplayer-desc">(\u8bf7\u5e2e\u52a9\u6211\u4eec\u6539\u8fdb\uff0c\u8c22\u8c22\uff01)</span></div><ul class="poplayer-closeInfo-list poplayer-desc js-list"><li><label class="label-tag"><input type="checkbox" name="type" value="1" />\u5df2\u5728\u82b1\u7530\u627e\u5230\u5bf9\u8c61</label></li><li><label class="label-tag"><input type="checkbox" name="type" value="2" />\u5df2\u901a\u8fc7\u5176\u4ed6\u65b9\u5f0f\u627e\u5230\u5bf9\u8c61</label></li><li><label class="label-tag"><input type="checkbox" name="type" value="3" />\u63a8\u8350\u7ed9\u6211\u7684\u4eba\u90fd\u4e0d\u559c\u6b22</label></li><li><label class="label-tag"><input type="checkbox" name="type" value="4" />\u529f\u80fd\u5355\u8c03\uff0c\u611f\u89c9\u6ca1\u6cd5\u513f\u4e92\u52a8\u8d77\u6765</label></li><li><label class="label-tag"><input type="checkbox" name="type" value="5" />\u4eba\u5c11\uff0c\u770b\u6765\u770b\u53bb\u5c31\u90a3\u51e0\u4e2a</label></li><li><label class="label-tag"><input type="checkbox" name="type" value="6" />\u6ca1\u529e\u6cd5\u8fc5\u901f\u7684\u627e\u5230\u6211\u5fc3\u4eea\u7684\u5bf9\u8c61</label></li><li><label class="label-tag"><input type="checkbox" name="type" value="7" />\u88ab\u5a5a\u6258\u3001\u9152\u6258\u7684\u9a9a\u6270</label></li><li><label class="label-tag"><input type="checkbox" name="type" value="8" />\u5176\u4ed6</label></li></ul></div></div><div class="poplayer-ft"><div class="poplayer-btn n-btn-box"><div class="js-btn disabled"><a class="btn btn-red n-btn-sure submit-trigger" data-loading-text="\u63d0\u4ea4\u4e2d..." href="javascript:;">\u63d0\u4ea4\u5e76\u5173\u95ed</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="btn btn-gray close-trigger" href="javascript:;">\u53d6\u6d88</a></div></div></div>');
        return p.join("")
    }
});
define("task/widget/newCount", function (a, b, c) {
    "use strict";
    var d = a("task/basic/Task"), e = a("lib/jquery"), f = a("utils/Polling"), g = a("utils/TitleNotice").getInstance(), h = a("utils/Utils"), i = a("utils/Cookie"), j = e(window), k = e(document.body);
    (new d("newCount", function () {
        function t(a) {
            return a.newDigg + a.newFollow + a.newMessage + a.newNotice + a.newVisitors + a.newGift + a.newPark + a.newDating + a.newFate
        }

        var a = e("#newMessage"), b = e("#header"), c = a.find(".js-title"), d = a.find(".js-list"), j = d.find(".js-digg"), l = d.find(".js-heed"), m = d.find(".js-message"), n = d.find(".js-admin"), o = d.find(".js-visitors"), p = d.find(".js-gift"), q = d.find(".js-park"), r = d.find(".js-dating"), s = d.find(".js-fate");
        if (a.size() !== 0) {
            var u = e("#newCountTimer"), v = u.size() > 0 && u.val() !== "" ? u.val() : 12e4, w = new f({
                requestUrl: "newCount",
                interval: v
            });
            w.register("newCount", {}, function (a) {
                h.updateNewCount(j, a.newDigg), h.updateNewCount(l, a.newFollow), h.updateNewCount(m, a.newMessage), h.updateNewCount(n, a.newNotice), h.updateNewCount(o, a.newVisitors), h.updateNewCount(p, a.newGift), h.updateNewCount(q, a.newPark), h.updateNewCount(q, a.newDating), h.updateNewCount(s, a.newFate);
                var b = parseInt(a.newMessage, 10);
                b < 1 ? g.register("message", null) : g.register("message", "\u60a8\u6709" + b + "\u6761\u65b0\u79c1\u4fe1")
            }), w.register("newOnlineUsers", {}, function (a) {
                k.trigger("inform:store", [a])
            });
            var x = e("#newMessagePreview"), y = x.find(".js-digg"), z = x.find(".js-heed"), A = x.find(".js-message"), B = x.find(".js-admin"), C = x.find(".js-visitors"), D = x.find(".js-gift"), E = x.find(".js-park"), F = x.find(".js-dating"), G = x.find(".js-fate"), H = parseInt(x.data("show"), 10) === 1 ? !0 : !1, I = i.get("closedNewCount");
            w.register("newCount", {}, function (a) {
                h.updateNewCount(y, a.newDigg), h.updateNewCount(z, a.newFollow), h.updateNewCount(A, a.newMessage), h.updateNewCount(B, a.newNotice), h.updateNewCount(C, a.newVisitors), h.updateNewCount(D, a.newGift), h.updateNewCount(E, a.newPark), h.updateNewCount(F, a.newDating), h.updateNewCount(G, a.newFate);
                var b = t(a);
                b === 0 || I === "yes" ? (x.hide(), H = !1) : (x.show(), H = !0)
            }), function () {
                H && I !== "yes" && x.show()
            }();
            var J = function () {
                H && I !== "yes" && x.show()
            }, K = function () {
                H && x.hide()
            }, L = null;
            c.hover(function () {
                L && clearTimeout(L), a.addClass("header-info-mess-hover"), K()
            }, function () {
                L = setTimeout(function () {
                    a.removeClass("header-info-mess-hover"), J()
                }, 50)
            }), d.hover(function () {
                L && clearTimeout(L), a.addClass("header-info-mess-hover"), K()
            }, function () {
                L = setTimeout(function () {
                    a.removeClass("header-info-mess-hover"), J()
                }, 50)
            }), x.delegate(".js-close", "click", function () {
                x.hide(), i.set("closedNewCount", "yes", 1), I = "yes"
            })
        }
    })).add()
});
define("utils/Polling", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/DataSource"), g = a("model/UserData"), h = e.extend({
        init: function (a) {
            this.config = a || {}, this.params = {}, this.callbacks = {}, this.registers = [], this.timer = null, this.INTERVAL = this.config.interval || 5e3
        }, register: function (a, b, c) {
            d.isFunction(b) && (c = b, b = {}), d.inArray(a, this.registers) === -1 && (this.registers.push(a), this.callbacks[a] = []), this.callbacks[a].push(c), d.extend(this.params, b), this.timer === null && this.startInterval()
        }, remove: function (a) {
            if (d.inArray(a, this.registers) !== -1) {
                var b = d.inArray(a, this.registers);
                b !== -1 && (this.registers.splice(b, 1), this.callbacks[a] = null)
            }
        }, startInterval: function () {
            if (this.registers.length !== 0 && !!this.INTERVAL) {
                var a = this;
                this.stopInterval(), this.timer = setInterval(d.proxy(this.doPolling, this), this.INTERVAL)
            }
        }, stopInterval: function () {
            this.timer && clearInterval(this.timer)
        }, resetInterval: function () {
            this.stopInterval(), this.startInterval()
        }, doPolling: function () {
            f.postJSON(this.config.requestUrl, this.params, d.proxy(this.onDataBack, this))
        }, onDataBack: function (a) {
            for (var b = 0, c = this.registers.length; b < c; b++) {
                var d = this.registers[b], e = this.callbacks[d] || [], f = a[d];
                for (var g = 0, c = e.length; g < c; g++)e[g] && e[g].call(null, f)
            }
        }, reset: function () {
        }, updateParams: function (a) {
            d.extend(this.params, a)
        }
    });
    return h
});
define("utils/TitleNotice", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = document.title, g = e.extend({
        init: function () {
            this.timer = null, this.timerCounter = 0, this.notice = {}, this.INTERVAL = 1e3, this.sequence = ["message", "feed"]
        }, register: function (a, b) {
            this.notice[a] = b, this.resetInterval()
        }, startInterval: function () {
            this.setTitle();
            if (this.title === "")document.title = f; else {
                var a = this;
                this.stopInterval(), this.timer = setInterval(d.proxy(this.showTitle, this), this.INTERVAL)
            }
        }, stopInterval: function () {
            this.timer && clearInterval(this.timer)
        }, resetInterval: function () {
            this.stopInterval(), this.startInterval()
        }, setTitle: function () {
            var a = "";
            for (var b = 0, c = this.sequence.length; b < c; b++)if (this.notice[this.sequence[b]]) {
                a = this.notice[this.sequence[b]];
                break
            }
            this.title = a
        }, showTitle: function () {
            this.timerCounter % 2 === 1 ? document.title = this.title : document.title = f, this.timerCounter += 1
        }
    }), h = null;
    return {
        getInstance: function () {
            h === null && (h = new g);
            return h
        }
    }
});
define("task/widget/loginInform", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("task/basic/Task"), f = a("utils/Storage"), g = a("model/UserData"), h = a("widget/box/introBox/LoginInform"), i = a("utils/StorageEvent").getInstance(), j = d(document.body);
    (new e("loginInform", function () {
        var a = !(d.browser.msie && d.browser.version <= 9), b = 4e3, c = 6e3, e = function (a) {
            typeof a == "string" && (a = d.parseJSON(a));
            var e = a.userList, i = a.buyTip, j = e.length, k = function () {
                j--, j >= 0 ? (new h(null, {
                    data: {
                        url: e[j].url,
                        name: e[j].name,
                        avatar: e[j].avatar,
                        isSuperVip: i != "y",
                        isNormalVip: g.loginUserIsNormalVip
                    }
                })).show(undefined, {
                    autoClose: !1, holdonTime: c, hideCallBack: function () {
                        this.clearUnfinishedTimers(), setTimeout(function () {
                            k()
                        }, b)
                    }
                }) : f.remove("loginUsers")
            };
            k()
        }, k = function (b, c) {
            c.userList.length && (f.set("loginUsers", d.JSON.stringify(c)), a && e(c))
        };
        CONFIG.isWap || (i.watch("loginUsers", e), j.bind("inform:store", k))
    })).add()
});
define("utils/Storage", function (a, b, c) {
    var d, e = function () {
    }, f = window.document, g = {set: e, get: e, remove: e, clear: e, each: e, obj: e, length: 0};
    (function () {
        if ("localStorage" in window)try {
            d = window.localStorage;
            return
        } catch (a) {
        }
        var b = f.getElementsByTagName("head")[0], c = window.location.hostname || "localStorage", e = new Date, g, h;
        if (!b.addBehavior)try {
            d = window.localStorage
        } catch (a) {
            d = null
        } else {
            try {
                h = new ActiveXObject("htmlfile"), h.open(), h.write('<script>document.w=window;</script><iframe src="/favicon.ico"></iframe>'), h.close(), g = h.w.frames[0].document, b = g.createElement("head"), g.appendChild(b)
            } catch (a) {
                b = f.getElementsByTagName("head")[0]
            }
            try {
                e.setDate(e.getDate() + 36500), b.addBehavior("#default#userData"), b.expires = e.toUTCString(), b.load(c), b.save(c)
            } catch (a) {
                return
            }
            var i, j;
            try {
                i = b.XMLDocument.documentElement, j = i.attributes
            } catch (a) {
                return
            }
            var k = "p__hack_", l = "m-_-c", m = new RegExp("^" + k), n = new RegExp(l, "g"), o = function (a) {
                return encodeURIComponent(k + a).replace(/%/g, l)
            }, p = function (a) {
                return decodeURIComponent(a.replace(n, "%")).replace(m, "")
            };
            d = {
                length: j.length, isVirtualObject: !0, getItem: function (a) {
                    return (j.getNamedItem(o(a)) || {nodeValue: null}).nodeValue || i.getAttribute(o(a))
                }, setItem: function (a, d) {
                    try {
                        i.setAttribute(o(a), d), b.save(c), this.length = j.length
                    } catch (e) {
                    }
                }, removeItem: function (a) {
                    try {
                        i.removeAttribute(o(a)), b.save(c), this.length = j.length
                    } catch (d) {
                    }
                }, clear: function () {
                    while (j.length)this.removeItem(j[0].nodeName);
                    this.length = 0
                }, key: function (a) {
                    return j[a] ? p(j[a].nodeName) : undefined
                }
            }, "localStorage" in window || (window.localStorage = d)
        }
    })();
    var h = d ? {
        set: function (a, b) {
            this.get(a) !== undefined && this.remove(a), d.setItem(a, b), this.length = d.length
        }, get: function (a) {
            var b = d.getItem(a);
            return b === null ? undefined : b
        }, remove: function (a) {
            d.removeItem(a), this.length = d.length
        }, clear: function () {
            d.clear(), this.length = 0
        }, each: function (a) {
            var b = this.obj(), c = a || function () {
                }, d;
            for (d in b)if (c.call(this, d, this.get(d)) === !1)break
        }, obj: function () {
            var a = {}, b = 0, c, e;
            if (d.isVirtualObject)a = d.key(-1); else {
                c = d.length;
                for (; b < c; b++)e = d.key(b), a[e] = this.get(e)
            }
            return a
        }, length: d.length
    } : g;
    return h
});
define("widget/box/introBox/LoginInform", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("utils/tmpl"), f = a("widget/box/introBox/Box"), g = d(window), h = f.extend({
        init: function (a, b) {
            this._super(a, b), this.isModernBrowser = !(d.browser.msie && d.browser.version < 9)
        }, show: function (a, b) {
            this._super(a, b);
            var c = this;
            this.data.isSuperVip && (this.timer = setTimeout(function () {
                c.isModernBrowser ? c.modernBrowserHide() : c.lowBrowserHide()
            }, this.config.holdonTime))
        }, clearUnfinishedTimers: function () {
            this.timer && clearTimeout(this.timer)
        }, preRender: function () {
            return {bodyContent: e.formatTemplate(a("template/introbox/loginInform"), this.data)}
        }, postRender: function () {
            this._super(), this.$elem.addClass("introlayer-inform")
        }, setPosition: function () {
            var a = g.height(), b = g.width(), c = (b - 935) / 2, e;
            c > 318 ? e = c - 320 : e = 12, this.$mainElem.css({right: e, top: a - 12 - this.$mainElem.height()});
            if (d.browser.msie && d.browser.version == 6) {
                var f = g.scrollTop();
                this.$mainElem.css({left: c + 935 + 11, top: "+=" + f})
            }
            this.isModernBrowser ? this.modernBrowserShow() : (this.$mainElem.css({
                opacity: "0",
                top: "+=20px"
            }), this.lowBrowserShow())
        }, modernBrowserShow: function () {
            var a = this;
            setTimeout(function () {
                a.$elem.addClass("introlayer-informOver")
            }, 0)
        }, hide: function () {
            var a = this;
            a.__super = this._super, this.$elem.fadeOut("slow", function () {
                a.__super()
            })
        }, modernBrowserHide: function () {
            var a = this;
            this.$elem.removeClass("introlayer-informOver"), setTimeout(function () {
                a.hide()
            }, 500)
        }, lowBrowserShow: function () {
            this.$mainElem.animate({opacity: "1", top: "-=20px"})
        }, lowBrowserHide: function () {
            var a = this;
            this.$mainElem.animate({opacity: "0", top: "+=20px"}, function () {
                a.hide()
            })
        }
    });
    return h
});
define("template/introbox/loginInform", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="introlayer-main"><a class="introlayer-close icon-close close-trigger" title="\u5173\u95ed" href="javascript:;"></a>'), isSuperVip || p.push('<div class="introlayer-inform-title"><span class="icon-v"></span>\u559c\u6b22\u7684\u4eba\u4e0a\u7ebf\u63d0\u9192</div>'), p.push('<div class="clearfix"><div class="avatar fL"><a target="_blank" href="/', url, '"><img src="', avatar, '" alt="', name, '"></a></div><div class="introlayer-inform-tips">\u60a8\u559c\u6b22\u7684&nbsp;&nbsp;<a target="_blank" href="/', url, '" class="link-lightBlue">', name, "</a>&nbsp;&nbsp;\u521a\u521a\u4e0a\u7ebf\u4e86\uff0c\u8d76\u7d27\u6253\u4e2a\u62db\u547c\u5427\u3002</div></div>"), isSuperVip || (p.push('<div class="introlayer-inform-ft"><span>\u63a5\u6536\u6240\u6709\u559c\u6b22\u7684\u4eba\u4e0a\u7ebf\u63d0\u9192\uff0c\u7acb\u5373</span><a class="btn btn-red fR" href="/pay/services" target="_blank" data-method="openvip">'), isNormalVip ? p.push("\u5347\u7ea7\u9ad8\u7ea7\u4f1a\u5458") : p.push("\u5f00\u901a\u9ad8\u7ea7\u4f1a\u5458"), p.push("</a></div>")), p.push("</div>");
        return p.join("")
    }
});
define("utils/StorageEvent", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/Storage"), g = d(window), h = {}, i = {}, j = e.extend({
        init: function () {
            var a = !(d.browser.msie && d.browser.version <= 9);
            if (a)window.addEventListener ? window.addEventListener("storage", this.storageChangeHandler, !1) : window.attachEvent("onstorage", this.storageChangeHandler); else {
                f.clear();
                var b = this;
                window.setInterval(function () {
                    var a = {};
                    for (var c in h) {
                        var d = f.get(c);
                        if (i[c] == d)return;
                        b.storageChangeHandler(null, c, d)
                    }
                }, 1e3)
            }
        }, storageChangeHandler: function (a, b, c) {
            var d = function (a, b) {
                var c = h[a];
                for (var d = 0; d < c.length; d++)c[d](b)
            };
            b ? c && c !== "" && d(b, c) : (a || (a = window.event), a.newValue && a.newValue !== "" && d(a.key, a.newValue));
            for (var e in h)typeof f.get(e) == "undefined" ? delete i[e] : i[e] = f.get(e)
        }, watch: function (a, b) {
            if (typeof a != "string" || !d.isFunction(b))return !1;
            h[a] ? h[a].push(b) : h[a] = [b];
            return !0
        }, unWatch: function () {
            return
        }
    }), k = null;
    return {
        getInstance: function () {
            k === null && (k = new j);
            return k
        }
    }
});
define("task/widget/scrollBar", function (a, b, c) {
    var d = a("task/basic/Task"), e = a("lib/jquery"), f = a("utils/Utils");
    (new d("scrollBar", function () {
        var a = e("#scrollBar");
        if (a.size() !== 0) {
            var b = a.find("a"), c = a.find(".js-top"), d = e(window), f, g = function () {
                var a = d.scrollTop();
                b.removeClass("disabled"), a === 0 && c.addClass("disabled")
            };
            g(), d.bind("scroll resize", function () {
                clearTimeout(f), f = setTimeout(g, 50)
            }), c.bind("click", function () {
                d.scrollTop(0)
            })
        }
    })).add()
});
define("task/widget/feedback", function (a, b, c) {
    var d = a("lib/jquery"), e = a("task/basic/Task"), f = a("module/message/MessageAction");
    (new e("feedback", function () {
        var a = d(".js-feedback");
        a.size() !== 0 && a.bind("click", function (a) {
            f.doFeedBackMessage()
        })
    })).add()
});
define("task/widget/toolBar", function (a, b, c) {
    var d = a("lib/jquery"), e = a("task/basic/Task"), f = a("utils/Cookie"), g = a("widget/box/floatBox/BatchMessageBox"), h = a("utils/DataSource"), i = a("model/UserData"), j = a("utils/Log");
    (new e("toolBar", function () {
        var a = d("#toolBar");
        if (a.size() !== 0) {
            var b = d.browser.msie && d.browser.version < 10, c = 180, e = a.find(".js-item").length, k = 400, l = d(".toolBar-trigger"), m = l.find("p"), n = (new Date).getTime(), o = f.get("toolBar"), p = ["unfold", "shake", 0];
            o !== null && (p = o.split("|"), p.length < 3 && (p = ["unfold", "shake", 0])), a.removeClass("hidden");
            var q = function (d) {
                a.removeClass("toolBar-fold"), a.removeClass("toolBar-hidden"), d || (a.removeClass("toolBar-shadow"), a.addClass("toolBar-unfold")), b ? a.addClass("toolBar-shadow") : setTimeout(function () {
                    a.addClass("toolBar-shadow")
                }, c * e + k), m.html("\u6536\u8d77\u5de5\u5177\u6761"), p[0] = "unfold", f.set("toolBar", p.join("|"))
            }, r = function () {
                a.removeClass("toolBar-shadow"), a.removeClass("toolBar-unfold"), a.addClass("toolBar-fold"), b ? (a.addClass("toolBar-hidden"), a.addClass("toolBar-shadow"), m.html("\u5c55\u5f00\u5de5\u5177\u6761")) : setTimeout(function () {
                    a.addClass("toolBar-hidden"), a.addClass("toolBar-shadow"), m.html("\u5c55\u5f00\u5de5\u5177\u6761")
                }, c * e + k), p[0] = "fold", f.set("toolBar", p.join("|"))
            };
            p[0] == "unfold" ? q(!0) : r(), l.bind("click", function (b) {
                a.hasClass("toolBar-hidden") ? (q(), j.doLog({
                    parameter: {method: "openClick"},
                    elem: d(b.currentTarget)
                })) : (r(), j.doLog({parameter: {method: "closeClick"}, elem: d(b.currentTarget)}))
            }), d(".batchMessage-trigger").addClass("toolBar-item-animate");
            var s, t = i.getLoginUser(), u = a.find(".js-batchMessage-tips"), v = '<p class="box-tips n-arrow-down">\n               <em class="toolBar-item-tips-close icon-close close-trigger"></em>\n               <em class="box-tips-arrow"></em>\n               \u6d88\u606f\u592a\u5c11\uff1f<br/>\u514d\u8d39\u4f53\u9a8c\u7fa4\u53d1\u79c1\u4fe1\n            </p>', w = function (b) {
                var c = f.get("batchMessageTips");
                !c && b && b.hasFree && (u.removeClass("hidden").html(v), setTimeout(function () {
                    a.addClass("toolBar-show-tips-batchMessage")
                }, 10))
            }, x = function () {
                u.html("").addClass("hidden"), f.set("batchMessageTips", "batchMessageTips")
            };
            u.delegate(".close-trigger", "click", function (a) {
                a.stopPropagation(), x()
            }), h.postJSON("batchMessageInfo", {}, function (a) {
                s = a, w(a)
            }), a.delegate(".batchMessage-trigger", "click", function (a) {
                x(), setTimeout(function () {
                    s && g.getInstance(null, {data: {loginUser: t, messageData: s}}).show(a)
                }, 400), j.doLog({parameter: {method: "groupSendClick"}, elem: d(a.currentTarget)})
            }), CONFIG.showBatchMessage && g.getInstance(null, {data: {loginUser: t}}).show(null)
        }
    })).add()
});
define("widget/box/floatBox/BatchMessageBox", function (a, b, c) {
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/tmpl"), g = a("utils/Error"), h = a("utils/DataSource"), i = a("utils/Log"), j = a("utils/Utils"), k = a("widget/box/floatBox/NeedAvatarBox"), l = e.extend({
        init: function (a, b) {
            this.resetData(a, b), this.ie6789 = d.browser.msie && d.browser.version < 10, this._super(a, b)
        }, preRender: function () {
            return {
                title: "\u7fa4\u53d1\u79c1\u4fe1",
                bodyContent: f.formatTemplate(a("template/floatbox/batchMessageBox"), this.data)
            }
        }, bindEvent: function () {
            this._super(), this.$elem.delegate(".js-send", "click", d.proxy(this.onSendBatch, this)), this.$elem.delegate(".js-item", "click", d.proxy(this.onSelectItem, this)), this.$elem.delegate(".js-buy", "click", d.proxy(this.onBuy, this)), this.$elem.delegate(".js-content", "mousewheel", d.proxy(this.onContentScroll, this))
        }, onContentScroll: function (a) {
            var b = d(a.currentTarget), c = b.scrollTop(), e = b.height(), f = b.find(".js-list").height();
            (a.deltaY > 0 && c == 0 || a.deltaY < 0 && c + e >= f) && a.preventDefault()
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-batchMessage"), this.data.messageData && this.onDataBack(this.data.messageData)
        }, getBatchData: function () {
            var a = this;
            h.postJSON("batchMessageInfo", {}, function (b) {
                a.inited = !0, a.onDataBack(b)
            })
        }, onDataBack: function (a) {
            this.messageData = a, this.renderData(a), this.setSelectElem(this.$elem.find(".js-item:eq(0)"))
        }, renderData: function (b) {
            var c = b.avatarList;
            b._avatarList = [];
            for (var d = 0; d < c.length && d < 5; d++)b._avatarList.push(j.userAvatar(c[d], 96, 1));
            b.loginUser = this.data.loginUser;
            var e = f.formatTemplate(a("template/floatbox/batchMessageContent"), b);
            this.$elem.find(".js-body").html(e)
        }, onSendBatch: function (a) {
            if (!(d.isPlainObject(this.dealRequest) && this.dealRequest.readyState !== 4 || d(a.currentTarget).parent(".disabled").size() || d(a.currentTarget).parent(".sending").size() || d(a.currentTarget).parent(".sent").size())) {
                if (this.data.loginUser.avatarType == "3") {
                    var b = new k(null, {data: {content: "\u60a8\u9700\u8981\u5148\u4e0a\u4f20\u5934\u50cf\uff0c\u624d\u80fd\u4f7f\u7528\u7fa4\u53d1\u79c1\u4fe1\uff01"}});
                    b.show(), this.hide();
                    return
                }
                var c = this, e = this.$elem.find(".js-send").parent();
                this.dealRequest = h.postJSON("batchMessageSend", {msgId: c.$lastItem.data("msgid")}, function (b) {
                    var c = parseInt(b.code) || 1;
                    g.Tips(c, a) || (e.removeClass("n-tabshow-one"), this.ie6789 ? e.addClass("sent n-tabshow-three") : (e.addClass("sending n-tabshow-two"), setTimeout(function () {
                        e.removeClass("sending n-tabshow-two"), e.addClass("sent n-tabshow-three")
                    }, 3e3)))
                }), i.doLog({parameter: {method: "groupSend"}, elem: d(a.currentTarget)})
            }
        }, onSelectItem: function (a) {
            var b = d(a.currentTarget);
            this.setSelectElem(b)
        }, setSelectElem: function (a) {
            var b = a;
            b.addClass("selected"), this.$lastItem && this.$lastItem[0] !== b[0] && this.$lastItem.removeClass("selected");
            var c = this.$elem.find(".js-send").parent();
            b.hasClass("selected") ? (this.selectId = b.attr("data-id"), c.removeClass("disabled")) : (this.selectId = null, c.addClass("disabled")), this.$lastItem = b
        }, onBuy: function (a) {
            var b = d(a.currentTarget);
            this.data.loginUser.isNormalVip ? b.trigger("global:pay:upgradevip") : b.trigger("global:pay:buysvip"), this.hide()
        }, reset: function () {
            this.inited && (this.$lastItem && this.$lastItem.removeClass("selected"), this.$lastItem = null)
        }, resetData: function (a, b) {
            this.data = {}, this.data.loginUser = b.data.loginUser, this.$title && this.$title.text("\u7fa4\u53d1\u79c1\u4fe1")
        }, hide: function () {
            this.reset(), this._super()
        }, show: function () {
            this._super(), this.data.messageData || this.getBatchData()
        }
    }), m = null;
    return {
        getInstance: function (a, b) {
            m ? m.resetData(a, b) : m = new l(a, b);
            return m
        }
    }
});
define("template/floatbox/batchMessageBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer-bd"><div class="poplayer-batchMessage-bn"><div class="poplayer-batchMessage-avatarList js-avatarList"></div><div class="poplayer-batchMessage-slogen">\u5feb\u901f\u642d\u8baa\u5f02\u6027\uff0c\u8d85\u591a\u56de\u590d\uff01</div></div><div class="clearfix"><div class="poplayer-batchMessage-content js-content ui-scrollbar"><div class="loadingBox"><span><em class="icon-loadingB"></em>\u6570\u636e\u83b7\u53d6\u4e2d...</span></div></div></div></div><div class="poplayer-ft"></div>');
        return p.join("")
    }
});
define("template/floatbox/batchMessageContent", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) {
            p.push('<div class="poplayer-bd"><div class="poplayer-batchMessage-bn"><div class="poplayer-batchMessage-avatarList js-avatarList">');
            for (var i = 0; i < _avatarList.length && i < 5; i++)p.push('<div class="poplayer-batchMessage-avatar poplayer-batchMessage-avatar-', i, '"><img src="', _avatarList[i], '"></div>');
            p.push('</div><div class="poplayer-batchMessage-letter"><em class="batchMessage-icon-letter letter-1"></em><em class="batchMessage-icon-letter letter-2"></em><em class="batchMessage-icon-letter letter-3"></em><em class="batchMessage-icon-letter letter-4"></em><em class="batchMessage-icon-letter letter-5"></em><em class="batchMessage-icon-letter letter-6"></em></div><em class="batchMessage-icon-hi-1"></em><em class="batchMessage-icon-hi-2"></em><em class="batchMessage-icon-hi-3"></em><div class="poplayer-batchMessage-slogen ', loginUser.sex == 2 && !loginUser.isSuperVip ? "poplayer-batchMessage-slogen-girl" : "poplayer-batchMessage-slogen-svip", '">\u5feb\u901f\u642d\u8baa\u5f02\u6027\uff0c\u8d85\u591a\u56de\u590d\uff01</div></div><div class="text-gray ui-tAc">\u4e00\u952e\u7fa4\u53d1\u79c1\u4fe1\uff0c\u5feb\u9009\u5c01\u60c5\u4e66\u53d1\u9001\u5427\uff01</div><div class="clearfix"><div class="poplayer-batchMessage-content js-content ui-scrollbar"><ul class="poplayer-batchMessage-list js-list">');
            for (var i = 0; i < messageList.length; i++)p.push('<li class="js-item" data-msgid="', messageList[i].id, '"><em class="icon-batchMessage-selected"></em>', messageList[i].content, "</li>");
            p.push('</ul></div></div></div><div class="poplayer-ft" data-viplog="groupSend">'), hasPermission ? hasSend ? p.push('<div class="poplayer-btn n-btn-box"><div class="sent n-tabshow-three"><a class="btn n-btn-sure" href="javascript:;"><em class="icon-batchMessage-sent n-tabshow-child-three"></em><span class="n-tabshow-child-three-di">\u4eca\u65e5\u79c1\u4fe1\u53d1\u9001\u5b8c\u6bd5~\u7b49', loginUser.sex == 2 ? "\u6c49\u5b50" : "\u59b9\u5b50", "\u6765\u627e\u4f60\u5427\uff01</span></a></div></div>") : p.push('<div class="poplayer-btn n-btn-box"><div class="disabled n-tabshow-one"><a class="btn n-btn-sure js-send" href="javascript:;"><em class="icon-batchMessage-sent n-tabshow-child-three"></em><em class="icon-batchMessage-sending n-tabshow-child-two"></em><span class="poplayer-batchMessage-sendingBar"></span><span class="n-tabshow-child-one-di">\u7acb\u5373\u53d1\u9001</span><span class="n-tabshow-child-three-di">\u4eca\u65e5\u79c1\u4fe1\u53d1\u9001\u5b8c\u6bd5~\u7b49', loginUser.sex == 2 ? "\u6c49\u5b50" : "\u59b9\u5b50", "\u6765\u627e\u4f60\u5427\uff01</span></a></div></div>") : p.push('<div class="poplayer-btn n-btn-box"><a class="btn n-btn-sure js-buy" href="javascript:;">', loginUser.isNormalVip ? "\u5347\u7ea7" : "\u5f00\u901a", "\u9ad8\u7ea7VIP\uff0c\u5373\u523b\u53d1\u9001</a></div>"), p.push("</div>")
        }
        return p.join("")
    }
});
define("task/widget/linkTarget", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("task/basic/Task");
    !CONFIG.isMail || (new e("linkTarget", function () {
        var a = /.?\/pay\/?.?|.?\/park\/?.?|.?\/app\/?.?/;
        d(document.body).delegate("a", "click", function (b) {
            var c = d(b.currentTarget), e = c.attr("href");
            c.attr("target") === "_blank" && e.indexOf("javascript") === -1 && a.test(e) && (b.preventDefault(), window.location.target = "_self", window.location.href = e)
        })
    })).add()
});
define("task/page/feed/vipEntry", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("task/basic/Task");
    (new e("vipEntry", function () {
        function c(a) {
            var c = f[a.index];
            c.onload = function () {
                a.onComplete && a.onComplete(this), a.onTimeout && setTimeout(a.onTimeout, b)
            }, c.src = a.url
        }

        var a = d("#vipEntrybox"), b = 250;
        if (a.size() > 0) {
            var e = a.find(".js-img0"), f = a.find(".js-img"), g = [];
            e.next().addBack().css("visibility", "visible").hide().fadeIn(1500), f.each(function () {
                g.push(d(this).data("src"))
            }), function h(a) {
                c({
                    index: a, url: g[a], onComplete: function (a) {
                        var b = d(a);
                        b.next().addBack().css("visibility", "visible").hide().fadeIn(1500)
                    }, onTimeout: function () {
                        ++a < g.length && h(a)
                    }
                })
            }(0)
        }
        if (d.browser.msie && d.browser.version < 8) {
            var i = a.find(".js-item");
            i.hover(function (a) {
                d(a.currentTarget).addClass("hover")
            }, function (a) {
                d(a.currentTarget).removeClass("hover")
            })
        }
    })).add()
});
define("task/page/feed/filter", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("task/basic/Task"), f = a("utils/Cookie"), g = a("module/feed/FeedFilter"), h = a("module/feed/VipFilter"), i = a("utils/Log");
    (new e("filter", function () {
        function r() {
            e.animate({top: "-" + n + "px"}, k, function () {
                i.hide(), c.css({overflow: ""}), e.css({top: ""})
            }), l = !1
        }

        function q() {
            c.css({overflow: "hidden"}), i.show(), e.css({top: "-" + n + "px"}).animate({top: "0px"}, k), l = !0;
            if (!m) {
                var a = new g(b);
                m = !0
            }
        }

        var b = d("#homeFilter"), c = b.find(".js-filter-wrapper"), e = b.find(".js-filter"), i = e.find(".js-filter-search"), j = b.find(".js-vip-filter"), k = d.browser.mise && d.browser.version < 8 ? 0 : 500, l = !1, m = !1, n = i.innerHeight(), o = b.find(".js-province").data("selected");
        b.data("expand") && (q(), f.set("homeFilterExpand", !0));
        var p = a("model/UserData");
        p.loginUserIsSuperVip && new h(j), b.delegate(".modify-trigger", "click", function (a) {
            l ? r() : q()
        }), b.bind("filter:hide filter:cancel", function (a) {
            r()
        }), d(document.body).delegate(".do-filter-trigger", "click", function () {
            window.scrollTo(0, 0), setTimeout(function () {
                l || q()
            }, 200)
        })
    })).add()
});
define("module/feed/FeedFilter", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/Utils"), g = a("widget/select/SelectFactory"), h = a("utils/Log"), i = a("widget/box/floatBox/ConfirmBox"), j = d(document.body), k = e.extend({
        init: function (a, b) {
            this.$elem = a, this.config = b || {}, this.params = {}, this.$filterParamsElem = d("#feedFilterParams"), this.$filterTitleElem = this.$elem.find(".js-filter-title"), this.$provinceText = this.$elem.find(".js-province-text"), this.$cityText = this.$elem.find(".js-city-text"), this.$ageText = this.$elem.find(".js-age-text"), this.$heightArea = this.$elem.find(".js-height-area"), this.$heightText = this.$elem.find(".js-height-text"), this.$educationArea = this.$elem.find(".js-education-area"), this.$educationText = this.$elem.find(".js-education-text"), this.$salaryArea = this.$elem.find(".js-salary-area"), this.$salaryText = this.$elem.find(".js-salary-text"), this.$provinceElem = this.$elem.find(".js-province"), this.$cityElem = this.$elem.find(".js-city"), this.$ageStartElem = this.$elem.find(".js-age-start"), this.$ageEndElem = this.$elem.find(".js-age-end"), this.$heightStartElem = this.$elem.find(".js-height-start"), this.$heightEndElem = this.$elem.find(".js-height-end"), this.$educationElem = this.$elem.find(".js-education"), this.$salaryStartElem = this.$elem.find(".js-salary-start"), this.$salaryEndElem = this.$elem.find(".js-salary-end"), this.bindEvent()
        }, bindEvent: function () {
            var a = this;
            this.initLocation(), this.initAge(), this.initHeight(), this.initEducation(), this.initSalary(), this.$elem.delegate(".cancel-trigger", "click", function () {
                a.$elem.trigger("filter:cancel")
            }), this.$elem.delegate(".submit-trigger", "click", d.proxy(this.onConfirm, this))
        }, initLocation: function () {
            this.params.province = this.$filterParamsElem.data("province"), this.params.city = this.$filterParamsElem.data("city"), g.citySelect(this.$provinceElem, this.$cityElem, {
                vals: [this.params.province, this.params.city],
                label1: "\u4e0d\u9650",
                label2: "\u4e0d\u9650",
                HideSpecialCity: !0
            })
        }, initAge: function () {
            this.params.age = this.$filterParamsElem.data("age"), g.requireAge(this.$ageStartElem, this.$ageEndElem, {
                label1: !1,
                suffix: ""
            })
        }, initHeight: function () {
            this.params.height = this.$filterParamsElem.data("height"), g.requireHeight(this.$heightStartElem, this.$heightEndElem, {suffix: ""})
        }, initEducation: function () {
            this.params.education = this.$filterParamsElem.data("education"), g.requireDegree(this.$educationElem, {suffix: ""})
        }, initSalary: function () {
            this.params.salaryRequire = this.$filterParamsElem.data("salaryRequire"), g.requireSalary(this.$salaryStartElem, this.$salaryEndElem, {suffix: ""})
        }, onConfirm: function (a) {
            var b = this, c = this.parseParams(), e = d.equals(this.params, c);
            if (e)this.$elem.trigger("filter:cancel"); else {
                this.params = c;
                var f = new i(null, {
                    title: "\u786e\u8ba4\u4fee\u6539\u4ea4\u53cb\u8981\u6c42",
                    data: {
                        type: "warning",
                        content: "\u60a8\u786e\u5b9a\u8981\u4fee\u6539\u60a8\u7684\u4ea4\u53cb\u8981\u6c42\uff1f",
                        desc: "\u60a8\u6bcf\u6b21\u4fee\u6539\u81ea\u5df1\u7684\u4ea4\u53cb\u8981\u6c42\u90fd\u4f1a\u5f71\u54cd\u60a8\u7684\u63a8\u8350\u7ed3\u679c\uff0c\u8bf7\u614e\u91cd\u9009\u62e9"
                    },
                    callBack: function (d) {
                        d.status === "ok" ? b.onSubmit(a, c) : b.$elem.trigger("filter:cancel")
                    }
                });
                f.show()
            }
        }, parseParams: function () {
            var a = this.$provinceElem.val(), b = this.$cityElem.val(), c = this.$ageStartElem.val(), d = this.$ageEndElem.val(), e = this, f = {};
            f.province = a, f.city = b, f.age = c + "-" + d;
            var g = this.$heightStartElem.val(), h = this.$heightEndElem.val();
            f.height = g + "-" + h;
            var i = parseInt(this.$educationElem.val());
            f.education = i + 1 + "-1";
            var j = this.$salaryStartElem.val(), k = this.$salaryEndElem.val();
            f.salaryRequire = j + "-" + k;
            return f
        }, onSubmit: function (a, b) {
            var c = this;
            this.$elem.trigger("filter:hide");
            var e = this.$provinceElem.find("option:selected").text(), g = parseInt(b.city) !== 0 ? this.$cityElem.find("option:selected").text() : "";
            this.$provinceText.text(e), this.$cityText.text(g);
            var i = this.$ageStartElem.val(), k = this.$ageEndElem.val();
            this.$ageText.text(f.reqSelectValue("age", i, k, !1, "\u5c81", !0));
            if (b.height !== "0-0") {
                var l = this.$heightStartElem.val(), m = this.$heightEndElem.val();
                this.$heightText.text(f.reqSelectValue("height", l, m, !1, "\u5398\u7c73", !0)), this.$heightArea.show()
            } else this.$heightText.text(""), this.$heightArea.hide();
            var n = parseInt(this.$educationElem.val());
            n !== 0 ? (this.$educationText.text(f.selectValue("expDegree", n)), this.$educationArea.show()) : (this.$educationText.text(""), this.$educationArea.hide());
            if (b.salaryRequire !== "0-0") {
                var o = this.$salaryStartElem.val(), p = this.$salaryEndElem.val();
                this.$salaryText.text(f.reqSelectValue("expSalary", o, p, !1, "\u5143", !0) + "\u6708\u6536\u5165"), this.$salaryArea.show()
            } else this.$salaryText.text(""), this.$salaryArea.hide();
            b.education !== "1-1" || b.salaryRequire !== "0-0" ? this.$filterTitleElem.addClass("feed-filter-wrap") : this.$filterTitleElem.removeClass("feed-filter-wrap"), setTimeout(function () {
                j.trigger("filter:search", [c.params])
            }, 500), h.doLog({parameter: {method: "filter"}, elem: d(a.currentTarget)})
        }
    });
    return k
});
define("widget/select/SelectFactory", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/select/SingleSelect"), f = a("widget/select/DoubleSelect"), g = a("widget/select/CitySelect"), h = a("widget/select/DateSelect"), i = a("data/selectData"), j = {
        openedCitySelect: function (a, b) {
            new e(a, d.extend({}, {data: i.openedCity}, b))
        }, fakeOpendCitySelect: function (a, b) {
            return new BasicSelect.fakeSingleSelect(a, d.extend({}, {data: i.openedCity}, b))
        }, dateSelect: function (a, b, c, d) {
            new h(a, b, c, d)
        }, fakeDateSelect: function (a, b, c, d) {
            return new h.fakeSelect(a, b, c, d)
        }, citySelect: function (a, b, c) {
            new g(a, b, c)
        }, fakeCitySelect: function (a, b, c) {
            return new g.fakeSelect(a, b, c)
        }, educationSelect: function (a, b) {
            new e(a, d.extend({data: i.education}, b))
        }, industrySelect: function (a, b) {
            new e(a, d.extend({data: i.industry}, b))
        }, positionSelect: function (a, b) {
            new e(a, d.extend({data: i.position}, b))
        }, salarySelect: function (a, b) {
            new e(a, d.extend({data: i.salaryArray, isArrayData: !0}, b))
        }, searchSalarySelect: function (a, b) {
            new e(a, d.extend({data: i.searchSalaryArray, isArrayData: !0}, b))
        }, constellationSelect: function (a, b) {
            new e(a, d.extend({data: i.constellation}, b))
        }, zodiacSelect: function (a, b) {
            new e(a, d.extend({data: i.zodiac, label: !1}, b))
        }, statusSelect: function (a, b) {
            new e(a, d.extend({data: i.status}, b))
        }, bloodSelect: function (a, b) {
            new e(a, d.extend({data: i.blood}, b))
        }, cookingSelect: function (a, b) {
            new e(a, d.extend({data: i.cooking}, b))
        }, arrangementSelect: function (a, b) {
            new e(a, d.extend({data: i.arrangement}, b))
        }, smokingSelect: function (a, b) {
            new e(a, d.extend({data: i.smoking}, b))
        }, drinkSelect: function (a, b) {
            new e(a, d.extend({data: i.drink}, b))
        }, loveAndMarriageSelect: function (a, b) {
            new e(a, d.extend({data: i.loveAndMarriage}, b))
        }, needChildSelect: function (a, b) {
            new e(a, d.extend({data: i.needChild}, b))
        }, withParentsSelect: function (a, b) {
            new e(a, d.extend({data: i.withParents}, b))
        }, houseworkSelect: function (a, b) {
            new e(a, d.extend({data: i.housework}, b))
        }, financialSelect: function (a, b) {
            new e(a, d.extend({data: i.financial}, b))
        }, houseSelect: function (a, b) {
            new e(a, d.extend({data: i.house}, b))
        }, carSelect: function (a, b) {
            new e(a, d.extend({data: i.car}, b))
        }, marriageStatusSelect: function (a, b) {
            new e(a, d.extend({data: i.marriageStatus}, b))
        }, marriageStatusFilterSelect: function (a, b) {
            new e(a, d.extend({data: i.marriageStatusFilter}, b))
        }, nationalitySelect: function (a, b) {
            new e(a, d.extend({data: i.nationality, suffix: "\u65cf"}, b))
        }, birthOrderSelect: function (a, b) {
            new e(a, d.extend({data: i.birthOrder}, b))
        }, childStatusSelect: function (a, b) {
            new e(a, d.extend({data: i.childStatus}, b))
        }, religionSelect: function (a, b) {
            new e(a, d.extend({data: i.religion}, b))
        }, heightSelect: function (a, b) {
            new e(a, d.extend({data: i.height(), suffix: "\u5398\u7c73"}, b))
        }, lookingFor: function (a, b) {
            new e(a, d.extend({data: i.lookingFor}, b))
        }, requireAge: function (a, b, c) {
            new f(a, b, d.extend({data: i.age(), suffix: "\u5c81"}, c))
        }, fakeRequireAge: function (a, b, c) {
            return new BasicSelect.fakeDoubleSelect(a, b, d.extend({data: i.age()}, c))
        }, requireHeight: function (a, b, c) {
            new f(a, b, d.extend({data: i.height(), suffix: "\u5398\u7c73"}, c))
        }, requireSalary: function (a, b, c) {
            new f(a, b, d.extend({data: i.expSalaryArray, suffix: "\u5143", isArrayData: !0}, c))
        }, requireDegree: function (a, b) {
            new e(a, d.extend({data: i.expDegree}, b))
        }, sexSelect: function (a, b) {
            new e(a, d.extend({data: i.sex}, b))
        }, fakeSexSelect: function (a, b) {
            return new BasicSelect.fakeSingleSelect(a, d.extend({data: i.sex}, b))
        }, mobileNationSelect: function (a, b) {
            return new e(a, d.extend({data: i.mobileNation}, b))
        }
    };
    c.exports = j
});
define("widget/select/SingleSelect", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/Utils"), g = e.extend({
        init: function (a, b) {
            this.data = b.data, this.$select = a, this.suffix = b.suffix || "", this.val = b.val || a.data("selected") || 0, this.isArrayData = b.isArrayData ? !0 : !1, this.label = "", this.optionTmpl = "", this.labelTmpl = "", a.is("select") ? (this.labelTmpl = '<option value="0"><%= value %></option>', this.optionTmpl = '<option value="<%= key %>" <%= selected %>><%= value %><%= suffix %></option>') : (this.labelTmpl = '<li class="js-option" data-value="0"><%= value %></li>', this.optionTmpl = b.optionTmpl || '<li class="js-option" data-value="<%= key %>"><%= value %><%= suffix %></li>'), typeof b.label == "undefined" ? this.label = "\u8bf7\u9009\u62e9" : b.label === !1 ? this.label = !1 : this.label = b.label, this.$select.html(this.buildSelect(this.data)), b.isDisableTextColor && this.val === 0 && this.$select.addClass("u-form-sys")
        }, buildSelect: function () {
            var a = this.label ? f.tmpl(this.labelTmpl, {value: this.label}) : "";
            if (this.isArrayData) {
                var b, c, e = this;
                d.each(this.data, function (d, g) {
                    b = g.key, c = g.val;
                    var h = e.val == b ? "selected" : "";
                    a += f.tmpl(e.optionTmpl, {key: b, selected: h, value: c, suffix: e.suffix})
                })
            } else for (var b in this.data) {
                var g = this.val == b ? "selected" : "";
                a += f.tmpl(this.optionTmpl, {key: b, selected: g, value: this.data[b], suffix: this.suffix})
            }
            return a
        }, setValue: function (a) {
            if (a) {
                var b = this.$select.is("select") ? "option" : "li", c = this.$select.find(b);
                d.each(c, function (a) {
                    var e = d(c[a]);
                    (b === "option" && e.val() == vals[1] || b === "li" && e.data("value") == vals[1]) && e.mousedown()
                })
            }
        }
    });
    c.exports = g
});
define("widget/select/DoubleSelect", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/Utils"), g = e.extend({
        init: function (a, b, c) {
            this.data = c.data, this.suffix = c.suffix || "", this.label1 = "", this.label2 = "", this.optionTmpl = "", this.labelTmpl = "", this.$select1 = a, this.$select2 = b, this.isArrayData = c.isArrayData ? !0 : !1, this.initValues(c), this.bulidTmpl(c), this.bulidLabel(c), this.$select1.html(this.buildSelect(0)), this.$select2.html(this.buildSelect(2)), this.bindEvent()
        }, initValues: function (a) {
            a.vals ? this.vals = a.vals : this.$select1.data("selected") || this.$select2.data("selected") ? this.vals = [this.$select1.data("selected"), this.$select2.data("selected")] : this.vals = [0, 0], typeof this.vals == "string" ? this.vals = this.vals.split(/[-_\/~]/) : typeof this.vals[0] == "string" && this.vals[0].match(/.+[-_\/~].+/) && (this.vals = this.vals[0].split(/[-_\/~]/)), a.isDisableTextColor && this.vals[0] === 0 && this.$select1.addClass("u-form-sys"), a.isDisableTextColor && this.vals[1] === 0 && this.$select2.addClass("u-form-sys")
        }, bulidTmpl: function (a) {
            this.$select1.is("select") ? (this.labelTmpl = '<option value="0"><%= value %></option>', this.optionTmpl = '<option value="<%= key %>" <%= selected %>><%= value %><%= suffix %></option>') : (this.labelTmpl = '<li class="js-option" data-value="0"><%= value %></li>', this.optionTmpl = a.optionTmpl || '<li class="js-option" data-value="<%= key %>"><%= value %><%= suffix %></li>')
        }, bulidLabel: function (a) {
            typeof a.label1 == "undefined" ? this.label1 = "\u4e0d\u9650" : a.label1 === !1 ? this.label1 = !1 : this.label1 = a.label1, typeof a.label2 == "undefined" ? this.label2 = "\u4e0d\u9650" : a.label2 === !1 ? this.label2 = !1 : this.label2 = a.label2
        }, buildSelect: function (a) {
            var b = a === 2 ? this.label2 : this["label" + (a + 1)], c = b ? f.tmpl(this.labelTmpl, {value: b}) : "";
            if (this.isArrayData) {
                var e, g, h = this;
                d.each(this.data, function (b, d) {
                    e = d.key, g = d.val;
                    if (a !== 2) {
                        var i = h.vals[a] == e ? "selected" : "";
                        c += f.tmpl(h.optionTmpl, {key: e, selected: i, value: g, suffix: h.suffix})
                    } else if ((h.vals[0] == 0 ? Math.abs(e) : e) > h.vals[0]) {
                        var i = h.vals[1] == e ? "selected" : "";
                        c += f.tmpl(h.optionTmpl, {key: e, selected: i, value: g, suffix: h.suffix})
                    }
                })
            } else for (var e in this.data)if (a !== 2) {
                var i = this.vals[a] == e ? "selected" : "";
                c += f.tmpl(this.optionTmpl, {key: e, selected: i, value: this.data[e], suffix: this.suffix})
            } else if (e > this.vals[0] || this.vals.length == 0) {
                var i = this.vals[1] == e ? "selected" : "";
                c += f.tmpl(this.optionTmpl, {key: e, selected: i, value: this.data[e], suffix: this.suffix})
            }
            return c
        }, bindEvent: function () {
            var a = this;
            this.$select1.bind("change", function (b) {
                a.vals[0] = parseInt(a.$select1.val(), 10), a.$select2.html(a.buildSelect(2))
            }), this.$select2.bind("change", function (b) {
                a.vals[1] = parseInt(a.$select2.val(), 10)
            })
        }, setValue: function (a) {
            var b = this;
            if (a[0]) {
                var c = this.$select1.is("select") ? "option" : "li", e = this.$select1.find(c);
                d.each(e, function (f) {
                    var g = d(e[f]);
                    if (c === "option" && g.val() == a[0] || c === "li" && g.data("value") == a[0]) {
                        g.mousedown();
                        if (a[1]) {
                            var h = b.$select2.is("select") ? "option" : "li", i = b.$select2.find(h);
                            d.each(i, function (b) {
                                var c = d(i[b]);
                                (h === "option" && c.val() == a[1] || h === "li" && c.data("value") == a[1]) && c.mousedown()
                            })
                        }
                    }
                })
            }
        }
    });
    c.exports = g
});
define("widget/select/DateSelect", function (a, b, c) {
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/tmpl"), g = a("utils/Utils"), h = d(document.body), j = e.extend({
        $year: null,
        $month: null,
        $day: null,
        endYear: null,
        vals: null,
        init: function (a, b, c, d) {
            this.$year = a, this.$month = b, this.$day = c, this.thisYear = a.data("thisyear") || d && d.thisYear || (new Date).getFullYear(), this.endYear = d && d.endYear || this.thisYear - 18, this.startYear = this.thisYear - 60, this.vals = d && d.vals || [], this.defaultYear = this.vals[0] || a.data("selected") || "", this.defaultMonth = this.vals[1] || b.data("selected") || "", this.defaultDay = this.vals[2] || c.data("selected") || "", d.isDisableTextColor && this.defaultYear === "" && this.$year.addClass("u-form-sys"), d.isDisableTextColor && this.defaultMonth === "" && this.$month.addClass("u-form-sys"), d.isDisableTextColor && this.defaultDay === "" && this.$day.addClass("u-form-sys"), this.buildTmpl(d), this.setLabel(d), this.buildSelect(d), this.bindEvent()
        },
        buildTmpl: function (a) {
            this.$year.is("select") ? (this.labelTmpl = '<option value="0"><%= value %></option>', this.optionTmpl = '<option value="<%= key %>" <%= selected %>><%= value %></option>') : (this.labelTmpl = '<li class="js-option" data-value="0"><%= value %></li>', this.optionTmpl = a.optionTmpl || '<li class="js-option" data-value="<%= key %>"><%= value %></li>')
        },
        setLabel: function (a) {
            this.label1 = a.label1 || !1, this.label2 = a.label2 || !1, this.label3 = a.label3 || !1
        },
        bindEvent: function () {
            this.$year.bind("change", d.proxy(this.buildDay, this)), this.$month.bind("change", d.proxy(this.buildDay, this))
        },
        buildSelect: function () {
            var a = this.label1 ? g.tmpl(this.labelTmpl, {value: this.label1}) : "", b = this.label2 ? g.tmpl(this.labelTmpl, {value: this.label2}) : "", c = this.label3 ? g.tmpl(this.labelTmpl, {value: this.label3}) : "", d = parseInt(this.vals[0]) || 0, e = parseInt(this.vals[1]) || 0, f = parseInt(this.vals[2]) || 0, h = this.vals.length > 0 ? (new Date(d, e, 0)).getDate() : 31;
            for (var i = this.endYear; i >= this.startYear; i--) {
                var j = i === d ? "selected" : "";
                a += g.tmpl(this.optionTmpl, {key: i, value: i, selected: j})
            }
            for (var i = 1; i <= 12; i++) {
                var j = i === e ? "selected" : "";
                b += g.tmpl(this.optionTmpl, {key: i, value: i, selected: j})
            }
            for (i = 1; i <= h; i++) {
                var j = i === f ? "selected" : "";
                c += g.tmpl(this.optionTmpl, {key: i, value: i, selected: j})
            }
            this.$year.html(a), this.$month.html(b), this.$day.html(c)
        },
        buildDay: function (a) {
            var b = parseInt(this.$year.val()), c = parseInt(this.$month.val()), d = parseInt(this.$day.val()), e = this.label3 ? g.tmpl(this.labelTmpl, {value: this.label3}) : "", f = (new Date(b, c, 0)).getDate();
            for (i = 1; i <= f; i++) {
                var h = i === d ? "selected" : "";
                e += g.tmpl(this.optionTmpl, {key: i, value: i, selected: h})
            }
            this.$day.html(e)
        }
    });
    c.exports = j
});
define("module/feed/VipFilter", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/Utils"), g = a("widget/select/FoldSelectAction"), h = a("utils/widget/Counter"), i = d(document.body), j = e.extend({
        init: function (a, b) {
            this.$elem = a, this.config = b || {}, this.bindEvent()
        }, bindEvent: function () {
            this.$elem.delegate(".js-title", "click", d.proxy(this.onFold, this)), g.initSingleSelect.call(this, "industry", "industrySelect", !0), g.initSingleSelect.call(this, "house", "houseSelect", !0), g.initSingleSelect.call(this, "car", "carSelect", !0), g.initDoubleSelect.call(this, "birthProvince", "citySelect", !0, function (a, b, c) {
                a.data("searchVal", {birthProvince: b, birthCity: c})
            }, function (a, b, c) {
                a.find(".js-text").text("\u7c4d\u8d2f " + h.subString(f.cityValue(b, c), 8, !0))
            }), g.initConstellation.call(this), g.initSingleSelect.call(this, "nationality", "nationalitySelect", !0), g.initSingleSelect.call(this, "marriageStatus", "marriageStatusFilterSelect", !0)
        }, onFold: function (a) {
            var b = d(a.currentTarget);
            if (this.foldedElem) {
                var c = this.foldedElem;
                this.hide();
                if (b[0] === c.find(".js-title")[0]) {
                    a.stopPropagation();
                    return
                }
            }
            this.foldedElem = b.parents(".js-item").first().addClass("folder-item-actived"), this.autoClose = f.autoClose.call(this, this.foldedElem.find(".js-title"), this.foldedElem.find(".js-main"))
        }, hide: function () {
            i.unbind("click", this.autoClose), this.foldedElem && this.foldedElem.removeClass("folder-item-actived"), this.foldedElem = null
        }, parseParams: function (a) {
            var b = a || {}, c = this.$elem.find(".js-item"), e = this;
            d.each(c, function (a, c) {
                var f = d(c), g = f.data("searchVal");
                d.isPlainObject(g) ? d.each(g, function (a, c) {
                    b[a] = c, e.$elem.data(a, c)
                }) : (b[c.key] = g, e.$elem.data(c.key, g))
            });
            return b
        }, onSubmit: function () {
            var a = this.parseParams();
            i.trigger("filter:search:vip")
        }
    });
    return j
});
define("widget/select/FoldSelectAction", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/select/SelectFactory"), f = a("utils/Utils"), g = a("utils/widget/Counter"), h = a("utils/Log"), i = {
        initSingleSelect: function (a, b, c, f, g) {
            d.isFunction(f) && (g = f, f = "");
            var j = this.$elem.find(".js-item[data-type=" + a + "]"), k = j.find(".js-select");
            e[b](k, {
                val: k.data("selected") || k.data("default"),
                label: c ? "\u4e0d\u9650" : !1,
                suffix: f
            }), j[0].key = a, j.data("searchVal", i.getSelectVal(k));
            var l = this;
            j.delegate(".filter-trigger", "click", function () {
                var a = i.getSelectVal(k), b = i.getSelectText(k);
                i.setTitle(j, a, b), j.data("searchVal", a), g && g(j, a), l.hide(), l.onSubmit(), h.doLog({
                    parameter: {method: j.data("method") || "vipfilter"},
                    elem: j
                })
            })
        }, initDoubleSelect: function (a, b, c, d, f) {
            var g = this.$elem.find(".js-item[data-type=" + a + "]"), j = g.find(".js-start"), k = g.find(".js-end"), l = j.data("selected") !== "" ? j.data("selected") : j.data("default"), m = k.data("selected") !== "" ? k.data("selected") : k.data("default");
            e[b](j, k, {
                vals: [l, m],
                label1: c ? "\u4e0d\u9650" : !1,
                label2: "\u4e0d\u9650"
            }), g[0].key = a, d(g, i.getSelectVal(j), i.getSelectVal(k));
            var n = this;
            g.delegate(".filter-trigger", "click", function () {
                var a = i.getSelectVal(j), b = i.getSelectVal(k);
                d(g, a, b), f(g, a, b), n.hide(), n.onSubmit(), h.doLog({
                    parameter: {method: g.data("method") || "vipfilter"},
                    elem: g
                })
            })
        }, initUpperSelect: function (a, b, c, d) {
            var f = this.$elem.find(".js-item[data-type=" + a + "]"), g = f.find(".js-select"), j = f.find(".js-upper");
            e[b](g, {
                val: g.data("selected") || g.data("default"),
                label: "\u4e0d\u9650"
            }), f[0].key = a, c(f, j, i.getSelectVal(g));
            var k = this;
            f.delegate(".filter-trigger", "click", function () {
                var a = i.getSelectVal(g);
                d(f, j, a), c(f, j, a), k.hide(), k.onSubmit(), h.doLog({
                    parameter: {method: f.data("method") || "vipfilter"},
                    elem: f
                })
            })
        }, initConstellation: function () {
            var a = "constellation";
            this.$constellation = this.$elem.find(".js-item[data-type=" + a + "]"), this.$constellation[0].key = a;
            var b = i.getConstellationData.call(this);
            this.$constellation.data("searchVal", b.selectVal);
            var c = this;
            this.$constellation.delegate(".filter-trigger", "click", function () {
                var a = i.getConstellationData.call(c);
                i.setTitle(c.$constellation, a.selectVal, a.selectText), c.$constellation.data("searchVal", a.selectVal), c.hide(), c.onSubmit()
            })
        }, getConstellationData: function () {
            var a = this.$constellation.find("input:checked"), b = [], c = "";
            d.each(a, function (a, c) {
                var e = d(c);
                b.push(e.val())
            }), c = f.constellationValue(b);
            return {selectVal: b.join(";"), selectText: c}
        }, getSelectVal: function (a) {
            return a.val()
        }, getSelectText: function (a) {
            return a.find("option:selected").text()
        }, setTitle: function (a, b, c) {
            var d = a.find(".js-text");
            c = parseInt(b) === 0 || b === "" ? d.data("default") : c, c = g.subString(c, 10, !0), d.text(c)
        }
    };
    return i
});
define("task/page/feed/feedList", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("task/basic/Task");
    (new e("feedList", function () {
        var b = a("module/feed/list/FeedList"), c = d("#mainBox > .js-itemList"), e = a("model/UserData"), f = new b(c, {
            updaterContainer: d("#homeFilter > .js-header"),
            pageContainer: d("#mainBox > .js-footer"),
            pageType: "more",
            asyncRequest: !1,
            dataType: "html",
            autoMoreCount: e.loginUserIsSuperVip ? 2 : 1,
            initData: d.parseJSON(d("#data_feedList").html()),
            pager: {moreLoadingText: "\u52a0\u8f7d\u66f4\u591a\u7528\u6237\u4e2d..."},
            options: {noResultTips: "\u82b1\u7530\u5f88\u5c3d\u529b\uff0c\u4f46\u8fd8\u662f\u672a\u80fd\u627e\u5230\u7b26\u5408\u4f60\u4ea4\u53cb\u8981\u6c42\u7684\u4eba"}
        });
        f.render(), d(document.body).bind("filter:search", function (a, b) {
            f.filterAction(b)
        }), d(document.body).bind("filter:search:vip", function (a) {
            f.vipFilerAction()
        })
    })).add()
});
define("module/feed/list/FeedList", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("utils/list/PageList"), f = a("module/feed/widget/NewUpdater"), g = a("module/feed/Feed"), h = a("utils/Utils"), i = a("model/UserData"), j = a("widget/tips/AppTips"), k = d(document.body), l = e.extend({
        init: function (a, b) {
            this._super.apply(this, arguments), this.params = d("#feedFilterParams").data(), this.$vipFilter = d("#vipFilterParams"), d.extend(this.params, this.parseVipFilterParams()), this.showGuideTips = !1, this.isVipFilter = !1
        }, postRender: function () {
            this.newUpdater = new f(null, {
                wrapperElem: this.config.updaterContainer,
                params: d.extend({}, this.params)
            }), this._super()
        }, bindEvent: function () {
            this._super(), this.$elem.bind("dislike:success", d.proxy(this.onDelete, this)), this.newUpdater.$elem.bind("feeds:new", d.proxy(this.onFetchNewList, this)), k.bind("topBanner:change", d.proxy(function () {
                this.showGuideTips && this.guideTips && this.guideTips.setPosition(this.getGuideTipsPosition())
            }, this))
        }, buildUrl: function () {
            return "feedList"
        }, buildParam: function () {
            return this.params
        }, onPageStart: function (a) {
            this._super(), this.hideAllTips()
        }, onPageEnd: function (a) {
            if (this.params.condition)try {
                delete this.params.condition
            } catch (b) {
                this.params.condition = null
            }
            if (!this.onPageLoaded(a))k.trigger("itemList:loaded"); else {
                var c = this.isViewMoreFirstPage();
                c && (a.list.length > 0 && !a.list[0].isExpand ? (this.newUpdater.loadSecondsLeft(), this.config.updaterContainer.show().find("p").eq(0).hide().fadeIn(500).next().hide()) : (this.config.updaterContainer.hide(), this.newUpdater.stopPolling()));
                var d = this.pager.config;
                if (d.pageMethod === "more" && d.pageToken === "") {
                    var e = this.$elem.find(".js-gap"), f = 0;
                    e.size() > 0 ? f = this.$elem.find("> li").index(e) : f = this.$elem.find(".js-item").size(), i.loginUserIsSuperVip ? typeof this.params.industry != "undefined" ? f <= 30 ? this.showAutoRecommendTips() : this.showSVipTips() : f <= 50 ? this.showAutoRecommendTips() : this.showSVipTips() : f <= 30 ? this.showAutoRecommendTips() : this.showOpenVipTips()
                }
                k.trigger("loaded:previewImage"), k.trigger("itemList:loaded"), this.checkGuideTips()
            }
        }, showEmpty: function () {
            this._super(), this.config.updaterContainer.hide()
        }, addFeedNoRecommend: function () {
            return d('<li class="feed-gap js-gap">\n                     <div class="noresult-tips">\n                        <span class="noresult-tips-inner">\n                           <em class="icon-noresult-s"></em>\n                           <span class="js-text">\u82b1\u7530\u5f88\u5c3d\u529b\uff0c\u4f46\u8fd8\u662f\u672a\u80fd\u627e\u5230\u7b26\u5408\u4f60\u4ea4\u53cb\u8981\u6c42\u7684\u4eba\uff0c\u5c06\u81ea\u52a8\u4e3a\u4f60\u653e\u5bbd\u6761\u4ef6\u63a8\u8350\u5982\u4e0b</span>\n                        </span>\n                     </div>\n                  </li>')
        }, addFeedFlag: function () {
            return d('<li class="feed-gap js-gap">\n                     <div class="feed-gap-inner">\n                        <span><em class="icon-logo-m"></em>\u7b26\u5408\u4f60\u4ea4\u53cb\u6761\u4ef6\u7684\u53ea\u6709\u8fd9\u4e9b\u5566\uff0c\u82b1\u7530\u5c06\u81ea\u52a8\u4e3a\u4f60\u653e\u5bbd\u6761\u4ef6\u63a8\u8350\u5982\u4e0b</span>\n                      </div>\n                  </li>')
        }, newItem: function (a, b) {
            return new g(a, b)
        }, doRemove: function (a) {
            this.doSliderRemove(a)
        }, onFetchNewList: function (a, b) {
            this.reloadData()
        }, filterAction: function (a) {
            this.config.updaterContainer.hide(), this.newUpdater.onRest(), this.params = d.extend({}, a, {condition: 1}), d.extend(this.params, this.parseVipFilterParams()), this.reloadData()
        }, vipFilerAction: function () {
            this.config.updaterContainer.hide(), this.newUpdater.onRest(), d.extend(this.params, this.parseVipFilterParams(), {condition: 1}), this.reloadData()
        }, parseVipFilterParams: function () {
            var a = {};
            i.loginUserIsSuperVip && (a = this.$vipFilter.data());
            return a
        }, reloadData: function () {
            d.isPlainObject(this.pager.request) && this.pager.request.readyState !== 4 && (this.pager.request.abort(), this.pager.request.readyState = 4), this.pager.config.autoMoreCount = this.options.autoMoreCount, this.pager.config.pageToken = 0, this.showLoading(), this.initData()
        }, showAutoRecommendTips: function () {
            if (!this.$autoRecommendTips) {
                var a = [];
                a.push('<p class="feed-bottom-tips" data-log="bottomTips">'), a.push("\u5bf9\u82b1\u7530\u7684\u989d\u5916\u63a8\u8350\u8fd8\u6ee1\u610f\u5417\uff1f\u4f60\u4e5f\u53ef\u4ee5\u81ea\u5df1\u6765"), a.push('<a class="link-lightBlue do-filter-trigger" href="javascript:;">\u653e\u5bbd\u4ea4\u53cb\u6761\u4ef6</a>'), a.push("\u83b7\u5f97\u66f4\u591a\u63a8\u8350"), a.push("</p>"), this.$autoRecommendTips = d(a.join(""))
            }
            this.$autoRecommendTips.insertAfter(this.$elem)
        }, hideAutoRecommendTips: function () {
            this.$autoRecommendTips && this.$autoRecommendTips.detach()
        }, showOpenVipTips: function () {
            if (!this.$openVipTips) {
                var a = [];
                if (!i.loginUserIsVip)var b = "\u5f00\u901a\u4f1a\u5458", c = "g-buySVip-trigger"; else if (i.loginUserIsNormalVip)var b = "\u5347\u7ea7\u9ad8\u7ea7VIP\u4f1a\u5458", c = "g-upgradeVip-trigger";
                a.push('<div class="bottom-tips" data-log="bottomTips">'), a.push('   <span><a class="btn btn-red ' + c + '" data-log="opensvip" href="javascript:;">'), a.push(b), a.push('   </a><span class="mL7">\u63a8\u8350\u4eba\u6570\u589e\u52a0<span class="bottom-tips-num">50</span>%</span>'), a.push("   </span>"), a.push("</div>"), this.$openVipTips = d(a.join(""))
            }
            this.$openVipTips.insertAfter(this.$elem)
        }, hideOpenVipTips: function () {
            this.$openVipTips && this.$openVipTips.detach()
        }, showSVipTips: function () {
            if (!this.$SVipTips) {
                var a = '<div class="bottom-tips" data-log="bottomTips">\n                           <span>\u672c\u6b21\u63a8\u8350\u6682\u65f6\u770b\u5b8c\u4e86\uff0c\u4f60\u53ef\u4ee5</span>\n                           <a class="btn btn-red" target="_blank" href="/trend">\u731b\u51fb\u53bb\u770b\u66f4\u591a\u4eba</a>\n                        </div>';
                this.$SVipTips = d(a)
            }
            this.$SVipTips.insertAfter(this.$elem)
        }, hideSVipTips: function () {
            this.$SVipTips && this.$SVipTips.detach()
        }, checkGuideTips: function () {
            if (!this.showGuideTips) {
                var a = this.$elem.find(".js-nickname").find(".user-vip-icon");
                a.size() > 0 && (this.showGuideTips = !0, this.guideTips = new j(null, {
                    arrowDirection: "down",
                    text: "\u82b1\u7530\u4f1a\u5458\u5c55\u793a\u51e0\u7387\u9ad88\u500d",
                    cookieKey: "feedListGuide_140403",
                    isShowLink: !0,
                    linkUrl: "/pay/services",
                    linkText: "\u6211\u4e5f\u8981\u66f4\u591a\u5c55\u793a",
                    linkLog: "feedvipavatar"
                }), this.guideTips.show(this.getGuideTipsPosition()))
            }
        }, getGuideTipsPosition: function () {
            var a = this.$elem.find(".js-nickname").find(".user-vip-icon").eq(0), b = a.offset();
            b.top = b.top - 40, b.left = b.left - 155;
            return b
        }, hideGuideTips: function () {
            this.guideTips && (this.showGuideTips = !1, this.guideTips.hide())
        }, hideAllTips: function () {
            this.hideAutoRecommendTips(), this.hideOpenVipTips(), this.hideSVipTips(), this.hideGuideTips()
        }
    });
    return l
});
define("utils/list/PageList", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/list/SingleList"), g = a("widget/AjaxPager"), h = a("widget/AutoPager"), i = f.extend({
        init: function (a, b) {
            this._super.apply(this, arguments), this.inited = !1
        }, postRender: function () {
            this.config.asyncRequest && this.removeDataNode(), this.pager = this.initPager(), this.pager.render(), this.pager.initData()
        }, initPager: function () {
            var a = d.extend({}, {
                buildUrl: d.proxy(this.buildUrl, this),
                buildParam: d.proxy(this.buildParam, this),
                pageStart: d.proxy(this.onPageStart, this),
                pageEnd: d.proxy(this.onPageEnd, this)
            }, this.config.pager);
            if (this.config.pageType === "page")return new g(this.config.pageContainer, a);
            a.autoMoreCount = this.options.autoMoreCount;
            return new h(this.config.pageContainer, a)
        }, isFirstPage: function () {
            if (this.isViewMoreFirstPage() || this.isViewPageFirstPage())return !0;
            return !1
        }, isViewMoreFirstPage: function () {
            if (this.pager.config.pageMethod === "more" && this.pager.config.autoMoreCount === this.options.autoMoreCount)return !0;
            return !1
        }, isViewPageFirstPage: function () {
            if (this.pager.config.pageMethod === "page" && this.pager.config.pageNo === 1)return !0;
            return !1
        }, onPageStart: function (a) {
            var b = this.pager.config;
            this.hideEmpty(), this.inited ? b.pageMethod === "page" ? this.showLoading() : this.$elem.children().filter(".pageLine").removeClass("pageLine").end().last().addClass("pageLine") : this.config.asyncRequest && this.showLoading()
        }, onPageLoaded: function (a) {
            var b = this.pager.config;
            (!this.inited && this.config.asyncRequest || this.isViewMoreFirstPage() || b.pageMethod === "page") && this.hideLoading(), b.pageMethod === "page" && (this.itemList = {});
            var c = this.getListData(a);
            if (c.length === 0) {
                this.checkEmpty(), this.inited = !0;
                return !1
            }
            this.updateDataBase(c);
            if (!this.inited && !this.config.asyncRequest)this.addSyncList(this.$elem.find("> .js-item")); else {
                var d = null;
                this.config.dataType === "html" ? (d = this.addAsyncHtml(a.html), this.$elem.append(d), this.addSyncList(d)) : (d = this.addAsyncList(c), this.$elem.append(d))
            }
            this.inited = !0;
            return !0
        }, onPageEnd: function (a) {
            !this.onPageLoaded(a)
        }, disableAutoPager: function () {
            this.pager.config.autoMoreCount > -1 && this.pager.disableAutoLoad()
        }, enableAutoPager: function () {
            this.pager.config.autoMoreCount > -1 && this.pager.enableAutoLoad()
        }, checkRemove: function () {
            var a = this.pager.config;
            (a.pageMethod === "more" || this.isViewPageFirstPage()) && this.checkEmpty()
        }, updataNew: function (a, b) {
            (this.pager.config.pageMethod !== "page" || this.pager.config.pageNo === 1) && this._super.apply(this, arguments)
        }, initData: function (a) {
            this.clearData(), this.pager.initData(a)
        }
    });
    return i
});
define("utils/list/SingleList", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/list/BasicList"), g = a("utils/DataSource"), h = f.extend({
        init: function (a, b) {
            this._super.apply(this, arguments)
        }, postRender: function () {
            this.config.asyncRequest ? (this.removeDataNode(), this.requestData()) : this.options.initData && this.onPageLoaded(this.options.initData)
        }, requestData: function () {
            this.onPageStart(), this.request = g.postJSON(this.buildUrl(), this.buildParam(), d.proxy(this.onPageLoaded, this))
        }, onPageStart: function () {
            this.showLoading()
        }, onPageLoaded: function (a) {
            this.config.asyncRequest && this.hideLoading(), this.itemList = {};
            var b = this.getListData(a);
            if (b.length === 0) {
                this.checkEmpty();
                return !1
            }
            this.updateDataBase(b);
            if (!this.config.asyncRequest)this.addSyncList(this.$elem.find("> .js-item")); else {
                var c = null;
                this.config.dataType === "html" ? (c = this.addAsyncHtml(a.html), this.$elem.append(c), this.addSyncList(c)) : (c = this.addAsyncList(b), this.$elem.append(c))
            }
        }, getListData: function (a) {
            return a.list
        }, addSyncList: function (a) {
            var b = this;
            this.newItems = [], d.each(a, function (a, c) {
                var e = d(c), f = e.attr("data-item-id");
                typeof f != "undefined" && (b.add(e, b.getItemData(f)), b.newItems.push(c))
            })
        }, addAsyncHtml: function (a) {
            var b = d(a);
            return b
        }, addAsyncList: function (a) {
            var b = this, c = document.createDocumentFragment();
            this.newItems = [], d.each(a, function (a, d) {
                var e = b.add(d.id, b.getItemData(d.id));
                c.appendChild(e[0]), b.newItems.push(e[0])
            });
            return c
        }, add: function (a, b) {
            var c = this.newItem(a, {data: b}), d = c.render ? c.render() : c;
            b.id && (this.itemList[b.id] = c);
            return d
        }, onDelete: function (a, b) {
            this.itemList[b.id] && (this.remove(b), this.removeData(b.id))
        }, checkRemove: function () {
            setTimeout(d.proxy(function () {
                this.checkEmpty()
            }, this), 100)
        }, remove: function (a) {
            var b = this, c = a.render();
            c.slideUp(this.options.deleteAnimateTime, "easeInOutExpo", function () {
                b.onDeleteCallback(c), c.remove()
            })
        }, updataNew: function (a, b) {
            var c = b.list || this.wrapArray(b);
            this.updateDataBase(c), this.hideEmpty();
            var d = this.addAsyncList(c);
            this.hideNewList();
            var e = this.$elem.find("> .js-item").first();
            e.size() !== 0 ? e.before(d) : this.$elem.append(d), this.showNewList()
        }
    });
    return h
});
define("utils/list/BasicList", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("widget/tips/NoResultTips"), g = a("utils/Utils"), h = a("model/UserData"), i = e.extend({
        _defaults: {
            dataType: "json",
            asyncRequest: !1,
            updateUserData: !1,
            isUserList: !1,
            pageType: "page",
            pager: {className: "big"}
        },
        _defaultOptions: {
            initData: null,
            autoMoreCount: 2,
            noResultTips: "\u5217\u8868\u65e0\u6570\u636e\uff01",
            loadingType: "big",
            loadingText: null,
            deleteAnimateTime: 1e3
        },
        init: function (a, b) {
            this.$elem = a, this.config = d.extend({}, this._defaults, b), this.options = d.extend({}, this._defaultOptions, this.config.options), this.data = this.config.data || null, this.clearData(), this.inited = !1, this.isBindEvent = !1, this.newItems = [], this.$empty = null, this.initLoading()
        },
        clearData: function () {
            this.itemList = {}, this.dataBase = {}
        },
        initLoading: function () {
            this.options.loadingType === "big" ? this.$loading = d(g.LOADING_BIG(this.options.loadingText)) : this.$loading = d(g.LOADING_SMALL(this.options.loadingText))
        },
        render: function () {
            if (!this.$elem) {
                var a = this.preRender(), b = d.extend(a, this.data);
                this.$elem = this.renderTmpl(b)
            }
            this.isBindEvent || (this.postRender(), this.bindEvent(), this.isBindEvent = !0);
            return this.$elem
        },
        renderTmpl: function () {
        },
        preRender: function () {
            return {}
        },
        postRender: function () {
        },
        bindEvent: function () {
            this.$elem.bind("item:delete", d.proxy(this.onDelete, this))
        },
        removeDataNode: function () {
            var a = d("#data_" + this.buildUrl());
            a.size() > 0 && a.remove()
        },
        buildUrl: function () {
            throw"Abstract Method!!!"
        },
        buildParam: function () {
            return {}
        },
        onPageStart: function () {
            throw"Abstract Method!"
        },
        onPageLoaded: function () {
            throw"Abstract Method!"
        },
        onPageEnd: function () {
            throw"Abstract Method!"
        },
        addSyncList: function () {
            throw"Abstract Method!"
        },
        addAsyncHtml: function () {
            throw"Abstract Method!"
        },
        addAsyncList: function () {
            throw"Abstract Method!"
        },
        add: function () {
            throw"Abstract Method!"
        },
        newItem: function () {
            throw"Abstract Method!!!"
        },
        onDelete: function () {
            throw"Abstract Method!"
        },
        onDeleteCallback: function () {
        },
        checkRemove: function () {
            throw"Abstract Method!"
        },
        remove: function () {
            throw"Abstract Method!"
        },
        removeData: function (a) {
            try {
                delete this.itemList[a], delete this.dataBase[a]
            } catch (b) {
                this.itemList[a] = null, this.dataBase[a] = null
            }
        },
        checkEmpty: function () {
            this.$elem.children().size() === 0 ? this.showEmpty() : this.hideEmpty()
        },
        showEmpty: function (a) {
            a = a || this.options.noResultTips, this.$empty ? this.$empty.find(".js-text").html(a) : this.$empty = (new f({content: a})).render(), this.$empty.appendTo(this.$elem)
        },
        hideEmpty: function () {
            this.$empty && this.$empty.detach()
        },
        showLoading: function () {
            this.$elem.empty(), this.$loading.appendTo(this.$elem)
        },
        hideLoading: function () {
            this.$loading && this.$loading.detach()
        },
        wrapArray: function (a) {
            if (!d.isArray(a)) {
                var b = a;
                a = [], a.push(b)
            }
            return a
        },
        updateDataBase: function (a) {
            var b = this;
            a = this.wrapArray(a), d.each(a, function (a, c) {
                b.setItemData(c)
            })
        },
        setItemData: function (a) {
            var b = this.config.isUserList ? a : a.user;
            this.config.updateUserData && b && (typeof b != "string" && (b = h.update(b)), a.user = h.get(b));
            var c = a.id, e = this.dataBase[c];
            c && (this.dataBase[c] = d.extend(e, a))
        },
        getItemData: function (a) {
            return this.dataBase[a] || null
        },
        getItemByUserId: function (a) {
            for (var b in this.dataBase)if (this.dataBase[b].user && this.dataBase[b].user.id === a)return this.dataBase[b];
            return null
        },
        showNewList: function () {
            d.each(this.newItems, function (a, b) {
                d(b).fadeIn(800)
            })
        },
        hideNewList: function () {
            d.each(this.newItems, function (a, b) {
                d(b).hide()
            })
        },
        updataNew: function () {
            throw"Abstract Method!"
        }
    });
    return i
});
define("widget/tips/NoResultTips", function (a, b, c) {
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/tmpl"), g = e.extend({
        init: function (a) {
            this.$elem = null, this.data = a || {}
        }, render: function () {
            if (this.$elem === null) {
                var b = this.preRender();
                this.$elem = d(f.formatTemplate(a("template/widget/tips/noResultTips"), d.extend(b, this.data))), this.bindEvent()
            }
            return this.$elem
        }, preRender: function () {
            return {}
        }, bindEvent: function () {
        }
    });
    return g
});
define("template/widget/tips/noResultTips", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="noresult-tips"><span class="noresult-tips-inner"><em class="noresult-tips-icon"></em><span class="js-text">', content, "</span></span></div>");
        return p.join("")
    }
});
define("widget/AjaxPager", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("utils/DataSource"), f = a("widget/Pager"), g = a("model/UserData"), h = a("module/feed/widget/FeedFlowAd"), i = d(document.body), j = f.extend({
        init: function (a, b) {
            this._super(a, b), this.request = null
        }, requestPage: function (a, b) {
            if (b)this.onDataBack(b); else {
                if (d.isPlainObject(this.request) && this.request.readyState !== 4)return;
                this.config.pageMethod === "page" && this.$elem.hide(), this.config.pageStart && this.config.pageStart(a), this.$elem.trigger("pager:start", [this]);
                var c = this.config.buildUrl(a), f = this.config.buildParam(a);
                this.config.pageMethod === "more" ? f.pageToken = this.config.pageToken : f.pageNo = a, this.request = e.postJSON(c, f, d.proxy(this.onDataBack, this))
            }
        }, onPage: function (a) {
            if (!this.config.isNeedLogin || g.getLoginUser() !== null) {
                this.config.pageMethod === "more" && this.$elem.children().addClass("btn-viewMore-loading");
                var b = d(a.currentTarget).data("pageNo");
                this.requestPage(b)
            }
        }, onDataBack: function (a) {
            this.update(a.page), this.renderPage(), this.config.pageMethod === "page" && this.$elem.show(), this.config.pageEnd && this.config.pageEnd(a), this.$elem.trigger("pager:end", [this]), d("body.pFeed").length > 0 && h.init()
        }, initData: function (a, b) {
            this.requestPage(a || 1, b)
        }
    });
    return j
});
define("widget/Pager", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = e.extend({
        defaults: {
            pageNo: null,
            pageCount: null,
            pageToken: null,
            pageSize: null,
            totalCount: null,
            pageMethod: "page",
            prevText: "\u4e0a\u4e00\u9875",
            nextText: "\u4e0b\u4e00\u9875",
            prevClass: null,
            nextClass: null,
            moreHtml: '<a class="home-view-more link-gray js-btn" hidefocus="true" href="javascript:;">\n                       <span class="view-more hidden"><em class="icon-view-more"></em>\u67e5\u770b\u66f4\u591a</span>\n                       <span class="view-loading fS14"><em class="icon-loadingB"></em>%loadingText%</span>\n                    </a>',
            moreLoadingText: "\u52a0\u8f7d\u4e2d...",
            moreText: "\u67e5\u770b\u66f4\u591a",
            moreButtonLimit: 2,
            pageNoRange: 7,
            showNum: !0,
            hideClass: "pages-hide",
            classNameArray: {big: "pages-big", small: "pages-small", "switch": "pages-switch"},
            isNeedLogin: !1,
            isHide: !1
        }, init: function (a, b) {
            this.$elem = d(a), this.update(b), this.$pageElem = null, this.config.className === "switch" && (this.config.showNum = !1, this.config.moreButtonLimit = 1, this.config.prevText = "<", this.config.nextText = ">", this.config.prevClass = "icon-slider-prev-m", this.config.nextClass = "icon-slider-next-m")
        }, render: function () {
            this.bindEvent()
        }, update: function (a) {
            this.config = d.extend({}, this.defaults, this.config, a)
        }, renderPage: function () {
            if (!this.config.isHide) {
                this.$elem.empty();
                if (this.config.pageMethod === "more") {
                    this.config.pageToken !== "" && (this.config.moreHtml = this.config.moreHtml.replace("%loadingText%", this.config.moreLoadingText), this.$pageElem = d(this.config.moreHtml).appendTo(this.$elem));
                    return this.$elem
                }
                if (this.config.pageCount <= 1)return this.$elem;
                return this.buildPage()
            }
        }, bindEvent: function () {
            this.$elem.undelegate().delegate(".js-btn", "click", d.proxy(this.onPage, this))
        }, buildPage: function () {
            var a = this.config.classNameArray[this.config.className] || this.config.className;
            this.$wrapperElem = d('<div class="' + a + '"></div>'), this.$pageElem = d("<ul></ul>").appendTo(this.$wrapperElem), this.$wrapperElem.appendTo(this.$elem);
            var b = d("<font />").insertBefore(this.$wrapperElem);
            this.$wrapperElem.detach(), this.config.pageCount > this.config.moreButtonLimit && this.$pageElem.append(this.createButton("PREV").addClass("js-prev"));
            if (this.config.showNum) {
                var c = Math.floor(this.config.pageNoRange / 2), e = Math.max(this.config.pageNo - c, 1), f = Math.min(this.config.pageNo + c, this.config.pageCount), g = this.config.pageNoRange - (f - e + 1);
                g > 0 && (e > 1 ? e = Math.max(e - g, 1) : f = Math.min(f + g, this.config.pageCount)), e > 1 && (this.$pageElem.append(this.createButton(1)), e > 2 && this.$pageElem.append('<li class="pages-line">...</li>'));
                for (var h = e; h <= f; h++)this.$pageElem.append(this.createButton(h));
                f < this.config.pageCount && (f < this.config.pageCount - 1 && this.$pageElem.append('<li class="pages-line">...</li>'), this.$pageElem.append(this.createButton(this.config.pageCount)))
            }
            this.config.pageCount > this.config.moreButtonLimit && this.$pageElem.append(this.createButton("NEXT").addClass("js-next")), this.$wrapperElem.insertBefore(b), b.remove();
            return this.$elem
        }, onPage: function (a) {
            var b = d(a.currentTarget).data("pageNo");
            this.$elem.trigger("onPage", [this, b])
        }, createButton: function (a) {
            var b = d('<a href="javascript:;"></a>'), c = a;
            a === "PREV" ? (c = this.config.prevText, a = this.config.pageNo - 1, this.config.prevClass && b.addClass(this.config.prevClass)) : a === "NEXT" && (c = this.config.nextText, a = this.config.pageNo + 1, this.config.nextClass && b.addClass(this.config.nextClass)), b.text(c);
            var e = this.config.isNeedLogin ? " need-login" : "";
            b = b.wrap('<li class="js-btn' + e + '"></li>').parent(), b.data("pageNo", a), (a < 1 || a > this.config.pageCount) && b.addClass(this.config.hideClass).removeClass("js-btn"), a === this.config.pageNo && b.addClass("current");
            return b
        }
    });
    return f
});
define("module/feed/widget/FeedFlowAd", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("task/basic/Task"), f = d("#mainBox > .js-itemList"), g = a("utils/tmpl"), h = d.parseJSON(d("#data_loginUser").html()), i = d(document.body), j = f.find(".js-item"), k = {
        init: function () {
            d(".feedFlowAd").remove(), this.initData()
        }, initBobo: function (b) {
            var c = this;
            d("#feed-boboAd").remove(), d.ajax({
                dataType: "jsonp",
                async: !1,
                jsonpCallback: "boboData",
                url: "http://www.bobo.com/a/p2/163.vplay/4/boboData/9.js",
                success: function (b) {
                    var c = g.formatTemplate(a("template/boboAd/feedBoboAd"), b);
                    d(j[9]).after(c)
                }
            })
        }, initYoudao: function (b) {
            yadk.config({id: "3dd118f45a34f12013aa86b75f384ffe"}), yadk.fetch(1, function (c) {
                var e = c[0];
                if (!!e) {
                    e.type = b.type;
                    var f = g.formatTemplate(a("template/feed/ad/feedFlowAd"), e);
                    d(j[b.position - 1]).after(f), yadk.showed(e.imptracker)
                }
            })
        }, initOtherAd: function (b) {
            var c = g.formatTemplate(a("template/feed/ad/feedFlowAd"), b);
            d(j[b.position - 1]).after(c)
        }, initData: function () {
            var a = this, b = d.parseJSON(d("#data_feedFlowAd").html()), c = b.list;
            c.forEach(function (b) {
                b.type == "bobo" && h.sex == 1 ? a.initBobo(b) : b.type == "2" ? a.initYoudao(b) : b.type == "1" && a.initOtherAd(b)
            })
        }
    };
    return k
});
define("template/boboAd/feedBoboAd", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) {
            p.push('<li class="feed" id="feed-boboAd"><div class="boboAd"><div class="boLink"><a href="http://www.bobo.com/?m=ht02" target="_blank" class="web-link">\u7f51\u6613BoBo\u76f4\u64ad\u95f4</a><a href="http://www.bobo.com/special/android/?m=ht02" target="_blank"class="app-link"><i class="icon-bobo"></i>\u4e0b\u8f7d\u7f51\u6613BoBo\u624b\u673a\u5ba2\u6237\u7aef</a></div><ul class="live-list">');
            for (var i = 0; i < hotLive.length; i++)p.push('<li class="list-item "><a href="', hotLive[i].liveUrl + "?m=ht02", '" target="_blank"><span class="bobo-live">\u76f4\u64ad</span><img src="', hotLive[i].gifUrl, '" class="live-cover"></img><p class="boboAd-bottom-cover"></p><span class="user-count"><em class="icon-miniRen"></em>', hotLive[i].onlineUserCount, '</span><p class="boboAd-hot-hover"><em class="hover-play"></em></p></a></li>');
            p.push("</ul></div></li>")
        }
        return p.join("")
    }
});
define("template/feed/ad/feedFlowAd", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) {
            p.push("");
            var tag = "";
            type == 1 ? tags.forEach(function (a) {
                tag += a + " "
            }) : type == 2 && (tag = tag1 + " " + tag2 + " " + tag3 + " " + tag4), p.push('<li class="feed feedFlowAd"><div class="feed-inner clearfix"><div class="feed-avatar"><a class="feed-avatar-img" data-log="avatar" target="_blank" href="'), type == 1 ? p.push("", targetUrl, "") : p.push("", clktracker, ""), p.push('"><img class="feed-flowAd-img" src="', picUrl, '" /></a></div><div class="feed-main clearfix"><div class="feed-user"><div class="feed-user-info"><a target="_blank" href="'), type == 1 ? p.push("", targetUrl, "") : p.push("", clktracker, ""), p.push('"><span class="feed-user-info-name">', title, '</span></a><span class="feed-flow-ad-logo">\u63a8\u5e7f</span></div></div><div class="feed-info"><p class="feed-info-basic">\u6807\u7b7e\uff1a', tag, '</p></div><div class="feed-foot"><p class="feed-message">\u4e3b\u9898\u8bf4\u660e\uff1a', intro, '</p></div><p class="feed-recommend-reason">\u63a8\u8350\u7406\u7531\uff1a', reason, "</p></div></div></li>")
        }
        return p.join("")
    }
});
define("widget/AutoPager", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/AjaxPager"), f = d(window), g = d(document.body), h = e.extend({
        init: function (a, b) {
            this._super(a, b), this.config.autoMoreCount = this.config.autoMoreCount || -1, this.config.pageMethod = "more", this.config.isHidden = this.config.isHidden || !1;
            var c = this;
            this.autoLoadDataScroll = function () {
                c.autoLoadData.call(c)
            }
        }, render: function () {
            this._super(), this.config.isFakeWindow || setTimeout(d.proxy(function () {
                this.onScroll()
            }, this), 500), this.config.isHidden && this.$elem.hide()
        }, bindEvent: function () {
            this._super(), this.config.isFakeWindow || this.enableAutoLoad()
        }, disableAutoLoad: function () {
            f.unbind("scroll", this.autoLoadDataScroll)
        }, enableAutoLoad: function () {
            f.unbind("scroll", this.autoLoadDataScroll).bind("scroll", this.autoLoadDataScroll)
        }, autoLoadData: function () {
            var a = this;
            this.timer && clearTimeout(this.timer), this.timer = setTimeout(function () {
                a.onScroll()
            }, 50)
        }, onScroll: function (a) {
            this.config.pageMethod === "more" && this.config.autoMoreCount >= 0 && g.height() - f.scrollTop() - f.height() < 83 && this.$elem.find(".js-btn").click()
        }, onDataBack: function (a) {
            this._super(a), this.config.autoMoreCount -= 1
        }
    });
    return h
});
define("module/feed/widget/NewUpdater", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/Polling"), g = a("utils/tmpl"), h = a("utils/Utils"), i = a("utils/DataSource"), j = a("model/UserData"), k = a("utils/TitleNotice").getInstance(), l = a("utils/Log"), m = d(document.body), n = e.extend({
        init: function (a, b) {
            this.$elem = a, this.config = b || {}, this.$wrapper = b.wrapperElem, this.$tips = this.$wrapper.find(".js-notice"), this.$timeLeft = this.$wrapper.find(".js-timeLeft"), this.newItems = [], this.isBindEvent = !1;
            var c = d("#newCountTimer");
            this.timer = c.size() > 0 && c.val() !== "" ? c.val() : null, this.interval = 1e3, this.render()
        }, render: function () {
            if (!this.$elem) {
                var a = this.preRender(), b = d.extend(a, this.data);
                this.$elem = this.renderTmpl(b)
            }
            this.isBindEvent || (this.postRender(), this.bindEvent(), this.isBindEvent = !0);
            return this.$elem
        }, preRender: function () {
            return {}
        }, postRender: function () {
            var a = this;
            this.$elem.hide().appendTo(this.$wrapper), this.polling = new f({requestUrl: "newFeedsNew"});
            var b = this.polling.doPolling;
            this.polling.doPolling = function () {
                a.newItems.length >= 60 || b.call(a.polling)
            }, this.polling.register("newFeeds", {}, d.proxy(this.onNewItem, this)), this.polling.stopInterval(), this.updataParams()
        }, loadSecondsLeft: function () {
            var a = this;
            i.postJSON("feedSecondLeft", {}, function (b) {
                a.secondsLeft = b.secondsLeft, a.secondsLeft ? a.startSecondsLeft(b) : setTimeout(function () {
                    a.loadSecondsLeft()
                }, 5e3)
            })
        }, startSecondsLeft: function (a) {
            var b = this;
            this.$tips.find(".js-period").text(a.hoursPeriod), this.intervaler && clearInterval(this.intervaler), this.startCountDown(), this.intervaler = window.setInterval(function () {
                b.startCountDown()
            }, this.interval), this.resetPolling(a.secondsLeft)
        }, startCountDown: function () {
            var a = this.secondsLeft;
            if (a < 0)window.clearInterval(this.intervaler); else {
                var b = Math.floor(a / 86400), c = Math.floor((a - b * 60 * 60 * 24) / 3600), d = Math.floor((a - b * 60 * 60 * 24 - c * 3600) / 60), e = Math.floor(a - b * 60 * 60 * 24 - c * 3600 - d * 60);
                d < 10 && (d = "0" + d), e < 10 && (e = "0" + e), this.$timeLeft.html(c + ":" + d + ":" + e), this.secondsLeft = a - 1
            }
        }, resetPolling: function (a) {
            var b = this;
            this.polling.INTERVAL = a * 1e3, this.polling.resetInterval()
        }, stopPolling: function () {
            var a = this;
            setTimeout(function () {
                window.clearInterval(a.intervaler), a.polling.stopInterval()
            }, 200)
        }, renderTmpl: function () {
            return d('<p class="feed-recommend-time-text">\u4f60\u6709\u4e00\u6279\u63a8\u8350&nbsp;&nbsp;<a class="btn btn-red view-trigger" href="javascript:;">\u7acb\u5373\u67e5\u770b</a></p>')
        }, bindEvent: function () {
            this.$elem.delegate(".view-trigger", "click", d.proxy(this.onPublishItems, this))
        }, onNewItem: function (a) {
            var b = this;
            this.newItems = [], d.each(a.list, function (a, c) {
                b.newItems.push(c)
            });
            var c = this.newItems.length;
            c > 0 ? (this.$tips.hide(), this.$elem.fadeIn(2e3), k.register("feed", "\u60a8\u6709\u65b0\u63a8\u8350")) : (this.$elem.hide(), this.loadSecondsLeft()), this.polling.stopInterval()
        }, onPublishItems: function (a) {
            var b = this.newItems;
            this.$wrapper.find("> p").hide(), this.$elem.trigger("feeds:new", [b]), this.newItems = [], k.register("feed", null), l.doLog({
                parameter: {method: "getnew"},
                elem: d(a.currentTarget)
            })
        }, updateCursor: function (a) {
            this.config.cursor = a, this.polling.updateParams(d.extend({}, {lastTime: this.config.cursor}))
        }, updataParams: function () {
            this.polling.updateParams(d.extend({}, this.config.params))
        }, onRest: function (a) {
            this.polling.stopInterval(), this.config.params = d.extend({}, a), this.updataParams(), this.onClear()
        }, onClear: function () {
            this.newItems = []
        }
    });
    return n
});
define("module/feed/Feed", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/Item"), f = a("utils/Utils"), g = a("user/UserAction"), h = a("model/UserData"), i = a("utils/Cookie"), j = a("module/photo/PhotoLayer"), k = a("model/PhotoData"), l = a("utils/widget/OimageUrl"), m = a("utils/widget/Counter"), n = a("utils/Log"), o = e.extend({
        postRender: function () {
            this._super(), this.$previewElems = this.$elem.find(".js-media-item")
        }, bindEvent: function () {
            var a = this;
            this.$elem.bind("hover", d.proxy(this.onMouseHover, this)), this.$elem.delegate(".like-trigger", "click", d.proxy(this.onLike, this)), this.$elem.delegate(".cancelLike-trigger", "click", d.proxy(this.onCancelLike, this)), this.$elem.delegate(".dislike-trigger", "click", d.proxy(this.onDisLike, this)), this.$elem.delegate(".sayhi-trigger", "click", d.proxy(this.doSayHi, this)), this.$elem.delegate(".photo-trigger", "click", d.proxy(this.onShowPhotoLayer, this)), this.$elem.delegate(".apply-trigger", "click", d.proxy(this.doApplyDate, this)), this.$previewElems.each(function (b, c) {
                var e = d(c), f = e.attr("data-photoId");
                k.bindUpdate(f, function () {
                    a.removePhoto(e)
                })
            }), this.$elem.bind("like:success", d.proxy(function (a, b) {
                var c = this.$elem.find(".js-like");
                c.addClass("n-like-disable")
            }, this)), this.$elem.bind("cancellike:success", d.proxy(function () {
                var a = this.$elem.find(".js-like");
                a.removeClass("n-like-disable")
            }, this)), this.$elem.bind("applyDate:success", d.proxy(this.onApplyDate, this))
        }, onMouseHover: function (a) {
            a.type === "mouseenter" ? this.onMouseIn() : this.onMouseOut()
        }, onMouseIn: function () {
            var a = this.data.user;
            parseInt(a.isOnline) !== 0 && !a.isSayhi && (this.isShowSayhiTips = !0, this.$elem.addClass("feed-sayhiTips-hover"))
        }, onMouseOut: function () {
            this.isShowSayhiTips && (this.isShowSayhiTips = !1, this.$elem.removeClass("feed-sayhiTips-hover"))
        }, removePhoto: function (a) {
            a.remove()
        }, onLike: function (a) {
            g.doLike.call(this, a, this.data.user)
        }, onCancelLike: function (a) {
            g.doCancelLike.call(this, a, this.data.user)
        }, onDisLike: function (a) {
            g.doDisLike.call(this, a, this.data.user)
        }, doSayHi: function (a) {
            g.doSayHiNew.call(this, a, this.data.user, "showGift")
        }, onSayHiNew: function () {
            g.onSayHiNew.call(this), this.data.user.isSayhi = !0, this.onMouseOut()
        }, onShowPhotoLayer: function (a) {
            a.stopPropagation();
            var b = d(a.currentTarget).attr("data-photoId"), c = j.getInstance(), e = {
                data: {
                    user: this.data.user,
                    userUrl: this.data.user.url,
                    albumId: this.data.user.albumId,
                    id: b
                }
            };
            c.show(a, e)
        }, doApplyDate: function (a) {
            g.doApplyDate(a, this.data.mediaInfo.dating.id)
        }, onApplyDate: function (a, b) {
            b.parents(".js-apply").addClass("n-apply-disable")
        }
    });
    return o
});
define("widget/Item", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/Module"), f = e.extend({
        init: function (a, b) {
            this._super(a, b), this.id = this.data.id
        }, bindEvent: function () {
            this._super(), this.$elem.delegate(".delete-trigger", "click", d.proxy(this.doDelete, this))
        }, doDelete: function () {
            throw"Abstract Method!!!"
        }, onDelete: function () {
            this.$elem.trigger("item:delete", [this])
        }
    });
    return f
});
define("module/photo/PhotoLayer", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("module/photo/BasicPhotoLayer"), f = a("module/photo/widget/SliderPhotoList"), g = e.extend({
        postRender: function () {
            this._super(), this.sliderList = new f(this.$sliderElem)
        }
    }), h = null;
    return {
        getInstance: function (a, b) {
            h === null && (h = new g(a, b));
            return h
        }
    }
});
define("module/photo/BasicPhotoLayer", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("widget/box/floatBox/Box"), g = a("utils/tmpl"), h = a("utils/Utils"), i = a("utils/Error"), j = a("utils/DataSource"), k = a("model/PhotoData"), l = a("model/UserData"), m = a("utils/PicTools"), n = a("module/trend/TrendAction"), o = a("module/message/MessageAction"), p = a("widget/box/floatBox/ConfirmBox"), q = a("widget/box/floatBox/TipsBox"), r = a("utils/widget/OimageUrl"), s = a("utils/Log"), t = d(window), u = d("html"), v = d(document.body), w = e.extend({
        defaults: {loadClass: "loading"},
        init: function (a, b) {
            this.$elem = null, this.config = d.extend({}, this.defaults, b), this.data = this.config.data || {}, this.isShow = !1, this.isBindEvent = !1, this.whirl = 0, this.config.MAXWIDTH = this.config.MAXWIDTH || w.MAXWIDTH, this.config.MAXHEIGHT = this.config.MAXHEIGHT || w.MAXHEIGHT
        },
        render: function () {
            if (this.$elem === null) {
                var a = this.preRender(), b = d.extend(a, this.data);
                this.$elem = this.renderTmpl(b)
            }
            this.isBindEvent || (this.postRender(), this.bindEvent(), this.isBindEvent = !0);
            return this.$elem
        },
        preRender: function () {
            return {}
        },
        renderTmpl: function (b) {
            return d(g.formatTemplate(a("template/photo/photoLayer"), b))
        },
        postRender: function () {
            this.$mainElem = this.$elem.find(".js-main"), this.$viewElem = this.$elem.find(".js-view"), this.$imgElem = this.$elem.find(".js-image"), this.$opreateElem = this.$elem.find(".js-operate"), this.$loadingElem = this.$elem.find(".js-loading"), this.$bigPhotoElem = this.$elem.find(".js-bigphoto"), this.$markElem = d('<div class="photolayer-mask"></div>'), this.isIe6 = d.browser.msie && d.browser.version < 7 ? !0 : !1, this.config.isSimpleModel || (this.$footElem = this.$elem.find(".js-foot"), this.$leftElem = this.$elem.find(".js-left"), this.$rightElem = this.$elem.find(".js-right"), this.$rightInnerElem = this.$elem.find(".js-right-inner"), this.$nameElem = this.$elem.find(".js-name"), this.$titleElem = this.$elem.find(".js-title"), this.$timeElem = this.$elem.find(".js-time"), this.$prevElem = this.$elem.find(".prev-trigger"), this.$nextElem = this.$elem.find(".next-trigger"), this.$diggElem = this.$elem.find(".js-digg"), this.$orderElem = this.$elem.find(".js-order"), this.$totalCountElem = this.$elem.find(".js-totalCount"), this.$sliderElem = this.$elem.find(".js-slider"), this.$deleteElem = this.$elem.find(".delete-trigger"), this.$messElem = this.$elem.find(".mess-trigger"))
        },
        bindEventMain: function () {
        },
        bindEvent: function () {
            this.$elem.bind("click", d.proxy(this.onClickLayer, this)), this.$mainElem.delegate(".close-trigger", "click", d.proxy(this.hide, this)), this.$mainElem.delegate(".rotate-trigger", "click", d.proxy(this.onRotate, this)), this.config.isSimpleModel || (this.$elem.bind("digg:success", d.proxy(this.onDigg, this)), this.$mainElem.delegate(".digg-trigger", "click", d.proxy(this.doDigg, this)), this.$mainElem.delegate(".mess-trigger", "click", d.proxy(this.doMess, this)), this.$mainElem.delegate(".delete-trigger", "click", d.proxy(this.doDelete, this)), this.$sliderElem.bind("change:photo", d.proxy(this.onCurrent, this)), this.$sliderElem.bind("photo:list:init", d.proxy(this.initShowFoot, this)), this.$sliderElem.bind("photo:list:empty", d.proxy(this.hide, this)), this.$prevElem.bind("click", d.proxy(this.onPrev, this)), this.$nextElem.bind("click", d.proxy(this.onNext, this)), this.isIe6 && this.$leftElem.hover(function () {
                d(this).find(".js-view-inner").addClass("hover")
            }, function () {
                d(this).find(".js-view-inner").removeClass("hover")
            }), this.$leftElem.bind("hover", d.proxy(function (a) {
                a.type === "mouseenter" ? this.onMouseIn(a) : (this.onMouseOut(a), this.hideFoot())
            }, this)))
        },
        onClickLayer: function (a) {
            var b = d(a.target).parents().andSelf();
            b.filter(".photolayer-main").size() === 0 && this.hide()
        },
        show: function (a, b) {
            var c = this;
            this.initConfig(), u.css({
                overflow: "hidden",
                paddingRight: "17px"
            }), this.render().appendTo("body").show(), this.$markElem.appendTo(v), this.setWrapperSize(), this.setContentHeight(this.config.MAXHEIGHT), this.$elem.css({visibility: "visible"}), this.setMiddlePosition(), this.data = b.data, this.user = this.data.user, this.config.isSimpleModel || (this.config.user = this.data.user, this.config.userUrl = this.data.userUrl), this.showCurrent(!0), this.config.isSimpleModel || (this.sliderList.render(b), l.getLoginUser().url !== this.config.userUrl ? (this.$deleteElem.hide(), this.$messElem.show()) : (this.$deleteElem.show(), this.$messElem.hide()), this.$nameElem.find("a").text(this.config.user.nickName).attr("href", "/" + this.config.user.url)), this.bindOnResize(), v.bind("keydown", d.proxy(this.hideHandler, this)), s.doLog({
                parameter: {method: "getpiclayer"},
                elem: d(a.currentTarget)
            })
        },
        initConfig: function () {
            this.isShowFoot = !1, this.isInitShowFoot = !1, this.isForceShowFoot = !1, this.isFirstUpdate = !0, this.currentSize = {}
        },
        setMiddlePosition: function () {
            this.onVerticalMiddle(), this.onCenter()
        },
        setWrapperSize: function () {
            var a = t.height();
            this.$elem.css("height", a), this.$markElem.css("height", a);
            if (this.isIe6) {
                var b = t.scrollTop();
                this.$elem.css("top", b), this.$markElem.css("top", b)
            }
        },
        hideHandler: function (a) {
            var b = a.which || a.keyCode;
            b === 27 && this.hide()
        },
        hide: function (a) {
            this.$elem !== null && (this.$elem.detach(), this.$markElem.detach()), this.isShow = !1, a !== !0 && this.sliderList && this.sliderList.hide(), this.unbindOnResize(), u.css({
                overflow: "",
                paddingRight: ""
            }), v.unbind("keydown", d.proxy(this.hideHandler, this))
        },
        bindOnResize: function () {
            t.bind("resize", d.proxy(this.onResizeHandler, this))
        },
        unbindOnResize: function () {
            t.unbind("resize", d.proxy(this.onResizeHandler, this))
        },
        onResizeHandler: function () {
            this.setWrapperSize(), this.setMiddlePosition(), this.resizeContentSize(), this.setContentPosition(), this.setImgPosition()
        },
        onPrev: function (a) {
            this.sliderList.onPrev(), s.doLog({parameter: {method: "getprev"}, elem: d(a.currentTarget)})
        },
        onNext: function (a) {
            this.sliderList.onNext(), s.doLog({parameter: {method: "getnext"}, elem: d(a.currentTarget)})
        },
        onMouseIn: function () {
            this.$leftElem.unbind("mousemove").bind("mousemove", d.proxy(this.onMouseMove, this))
        },
        onMouseOut: function (a) {
            this.$leftElem.unbind("mousemove", d.proxy(this.onMouseMove, this))
        },
        onMouseMove: function (a) {
            var b = d(a.target), c = this.$leftElem.offset(), e = c.left, f = c.top, g = this.$leftElem.width(), h = this.$leftElem.height(), i = f + h - a.pageY;
            i > 0 && i <= 70 ? this.showFoot() : this.hideFoot()
        },
        initShowFoot: function () {
            this.isInitShowFoot = !0, this.showFoot(), this.hideFoot(2e3)
        },
        showFoot: function () {
            if (!!this.isInitShowFoot && !this.isShowFoot) {
                var a = this;
                this.isShowFoot = !0, this.hideTimer && clearTimeout(this.hideTimer), this.showTimer = setTimeout(function () {
                    a.isForceShowFoot || (a.isForceShowFoot = !0), a.$footElem.stop().animate({bottom: 0}, 300, "easeInOutExpo")
                }, 400)
            }
        },
        hideFoot: function (a) {
            if (!!this.isShowFoot) {
                var b = this;
                this.isShowFoot = !1, this.isForceShowFoot && this.showTimer && clearTimeout(this.showTimer), this.hideTimer = setTimeout(function () {
                    b.$footElem.stop().animate({bottom: "-70px"}, 1e3, "easeInOutExpo")
                }, a || 1e3)
            }
        },
        onCurrent: function (a, b) {
            this.data = d.extend({}, b), this.showCurrent()
        },
        showCurrent: function (a) {
            this.$mainElem.removeClass("error"), this.showLoading(), this.loadPhotoInfo()
        },
        loadPhotoInfo: function () {
            var a = this;
            j.postJSON("getBigPhotoInfo", {
                userUrl: this.config.userUrl,
                albumId: this.data.albumId,
                photoId: this.data.id
            }, function (b) {
                b.isDelete ? a.loadedError() : (d.extend(a.data, b), a.loadedPhotoInfo())
            })
        },
        loadedError: function () {
            this.$mainElem.addClass("error"), this.hideLeftLoading(), this.hideRightLoading()
        },
        loadedPhotoInfo: function () {
            this.renderImg(), this.setDirectionBtn(), this.setTitle(), this.setOrder(), this.resetDigg(), this.hideRightLoading()
        },
        renderImg: function () {
            this.createImg()
        },
        createImg: function () {
            var a = this, b = new Image, c = this.data.url;
            this.currentUrl = c, b.onload = function () {
                d.browser.msie && !this.fileSize && this.load || (this.load = !0, this.onload = null, a.sliderList && a.sliderList.addCache(c), a.imgLoaded(b, c))
            }, b.src = r(this.currentUrl, this.config.MAXWIDTH)
        },
        imgLoaded: function (a, b) {
            this.currentUrl === b && (this.hideLeftLoading(), this.$bigPhotoElem.attr("href", b), this.$imgElem.html(a), this.picImageElem = a, this.$picImageElem = d(a), this.$picImageElem.css("opacity", "0"), this.picSize = {
                width: a.width,
                height: a.height
            }, a.width > this.config.MAXWIDTH && (this.picSize = {
                width: this.config.MAXWIDTH,
                height: a.height * (this.config.MAXWIDTH / a.width)
            }, a.setAttribute("width", this.picSize.width), a.setAttribute("height", this.picSize.height)), this.picOrgSize = d.extend({}, this.picSize), this.$picImageElem.animate({opacity: 1}, 800), this.resetContent(), this.whirl = 0)
        },
        resetContent: function () {
            this.setContentSize();
            var a = this.picSize.width, b = this.picSize.height;
            if (!this.currentSize || b > this.currentSize.height)this.setContentPosition(), this.onVerticalMiddle();
            this.setImgPosition()
        },
        setContentSize: function () {
            var a = this.picOrgSize.height, b = this.getScreenHeight();
            a > b ? (a >= this.config.MAXHEIGHT && b <= this.config.MAXHEIGHT && (b = this.config.MAXHEIGHT), this.setImageSize(b)) : this.setImageSize(a)
        },
        resizeContentSize: function () {
            var a = this.picOrgSize.height;
            a > this.config.MAXHEIGHT && this.setContentSize()
        },
        setImageSize: function (a) {
            var b = this.picOrgSize;
            this.picSize = {
                width: b.width * (a / b.height),
                height: a
            }, this.picImageElem.setAttribute("width", this.picSize.width), this.picImageElem.setAttribute("height", this.picSize.height)
        },
        setContentPosition: function () {
            var a = this.picSize.height;
            this.setContentHeight(a)
        },
        setImgPosition: function () {
            var a = this.$imgElem.children(":visible");
            a.css({
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-" + (isNaN(a.height()) ? a.attr("height") : a.height()) / 2 + "px",
                marginLeft: "-" + (isNaN(a.width()) ? a.attr("width") : a.width()) / 2 + "px"
            })
        },
        setContentHeight: function (a) {
            a = a < this.config.MAXHEIGHT ? this.config.MAXHEIGHT : a, this.$mainElem.css("height", a), this.$viewElem.css("height", a), this.$imgElem.css("height", a), this.config.isSimpleModel || (this.$rightInnerElem.css("height", a - w.RIGHTGAP * 2), this.setPrevNextHeight(a)), this.currentSize.height = a
        },
        getScreenHeight: function () {
            return t.height() - w.TOP * 2
        },
        setTitle: function () {
            var a = [];
            this.data.type === 2 && (a.push("\u53c2\u4e0e\u4e86\u8bdd\u9898\u8ba8\u8bba\u3010"), a.push('<a class="link-blue" target="_blank" href="'), a.push(this.data.relatedData.link), a.push('">'), a.push(this.data.relatedData.title), a.push("</a>\u3011\uff1a")), this.data.type === 3 && (a.push("\u53d1\u5e03\u4e86\u8bdd\u9898\u3010"), a.push('<a class="link-blue" target="_blank" href="/park/topic/'), a.push(this.data.topic.id), a.push('">'), a.push(this.data.topic.title), a.push("</a>\u3011\uff1a"), a.push(this.data.topic.txtContent)), a.push(this.data.content), this.$titleElem.html(a.join("")), this.$timeElem.html(this.data.prettyTime)
        },
        setOrder: function () {
            this.$orderElem.text(this.data.index), this.$totalCountElem.text(this.data.totalCount)
        },
        setDirectionBtn: function () {
            this.$nextElem.show(), this.$prevElem.show(), this.$imgElem.attr("title", ""), this.data.index === this.data.totalCount && (this.$nextElem.hide(), this.$imgElem.attr("title", "\u8fd9\u662f\u6700\u540e\u4e00\u5f20")), this.data.index === 1 && (this.$prevElem.hide(), this.$imgElem.attr("title", "\u8fd9\u662f\u7b2c\u4e00\u5f20"))
        },
        resetDigg: function () {
            var a = this.data.diggCount;
            a = a > 99 ? 99 : a;
            var b = this.$diggElem.find("span");
            this.data.isDigged ? (n.setDiggDisable.call(this), b.eq(0).hide()) : (n.setDiggEnable.call(this), b.eq(0).stop().css("marginTop", "0").show()), this.$diggElem.find("i").html("+" + a)
        },
        setPrevNextHeight: function (a) {
            this.isIe6 && (this.$prevElem.height(a), this.$nextElem.height(a))
        },
        showLoading: function () {
            this.$viewElem.addClass(this.config.loadClass), this.$rightElem.addClass(this.config.loadClass)
        },
        hideLeftLoading: function () {
            this.$viewElem.removeClass(this.config.loadClass)
        },
        hideRightLoading: function () {
            this.$rightElem.removeClass(this.config.loadClass)
        },
        onRotate: function (a) {
            var b = parseInt(d(a.currentTarget).data("direction"));
            b === 1 ? this.whirl++ : this.whirl--, this.whirl < 0 && (this.whirl = 4 + this.whirl), this.whirl > 3 && (this.whirl = 0), this.whirl % 2 !== 0 ? this.picSize.height > this.config.MAXWIDTH && (this.picImageElem.width = this.picSize.width * (this.config.MAXWIDTH / this.picSize.height), this.picImageElem.height = this.config.MAXWIDTH) : (this.picImageElem.width = this.picSize.width, this.picImageElem.height = this.picSize.height), d.browser.msie && d.browser.version < 9 ? m.picDrawIE.call(this, this.whirl) : (this.$imgElem.find("canvas").size() === 0 && (this.canvasElem = document.createElement("canvas"), this.$canvasElem = d(this.canvasElem), this.canvasContext = this.canvasElem.getContext("2d"), this.$imgElem.append(this.canvasElem)), m.picDraw.call(this, this.whirl)), this.setImgPosition()
        },
        doDelete: function (a) {
            var b = this;
            this.deleteConfirmBox = new p(null, {
                title: "\u5220\u9664\u7167\u7247",
                data: {type: "warning", content: "\u786e\u8ba4\u662f\u5426\u5220\u9664\u8be5\u7167\u7247\uff1f"},
                callBack: function (a) {
                    b.onDelete(a)
                }
            }), this.deleteConfirmBox.show()
        },
        onDelete: function (a) {
            var b = this;
            a.status === "ok" && j.postJSON("deletePhoto", {photoId: this.data.id}, function (a) {
                b.onDeleteSuccess()
            })
        },
        onDeleteSuccess: function () {
            this.deleteConfirmBox.hide();
            var a = new q(null, {data: {type: "correct", text: "\u5220\u9664\u6210\u529f\uff01"}});
            a.show(), a.delayHide(1500), k.publishUpdate(this.data.id, "delete"), this.sliderList.onDelete(this.data.id)
        },
        doDigg: function (a) {
            n.doDigg.call(this, a, {type: 1, pid: this.data.id})
        },
        onDigg: function () {
            n.onDigg.call(this), k.update({id: this.data.id, isDigged: !0, diggCount: this.data.diggCount + 1})
        },
        doMess: function (a) {
            var b = {data: {user: this.config.user, relationData: {photoId: this.data.id}}};
            o.doMessage.call(this, a, b)
        },
        onVerticalMiddle: function (a) {
            var b = t.scrollTop(), c = (t.height() - this.$mainElem.height()) / 2 - 10;
            c = Math.max(c, 30), a ? this.$mainElem.stop().animate({
                top: c,
                duration: 500,
                easing: "easeInOutExpo"
            }) : this.$mainElem.css({top: c})
        },
        onCenter: function () {
            var a = t.width() / 2 - this.$mainElem.width() / 2;
            a = Math.max(a, 0), this.$mainElem.css({left: a})
        }
    });
    w.MAXWIDTH = 530, w.MAXHEIGHT = 530, w.TOP = 30, w.RIGHTGAP = 20;
    return w
});
define("model/PhotoData", function (a, b, c) {
    var d = a("lib/jquery"), e = [], f = {}, g = null, h = {};
    h.update = function (a) {
        var b = a.id, c = e[b];
        e[b] = d.extend(c, a);
        return b
    }, h.get = function (a) {
        return e[a] || null
    }, h.setInfo = function (a) {
        g = a
    }, h.getInfo = function () {
        return g
    }, h.bindUpdate = function (a, b) {
        var c = f[a] || [];
        c.push(b), f[a] = c
    }, h.publishUpdate = function (a, b) {
        var c = f[a];
        if (!!c)for (var d = 0, e = c.length; d < e; d++)c[d](h.get(a), b)
    };
    return h
});
define("utils/PicTools", function (a, b, c) {
    var d = a("lib/jquery"), e = {
        picDraw: function (a) {
            var b = this.picImageElem, c = this.canvasElem, d = this.canvasContext;
            switch (a) {
                case 0:
                    c.width = b.width, c.height = b.height, d.drawImage(b, 0, 0, b.width, b.height);
                    break;
                case 1:
                    c.width = b.height, c.height = b.width, d.rotate(90 * Math.PI / 180), d.drawImage(b, 0, -b.height, b.width, b.height);
                    break;
                case 2:
                    c.width = b.width, c.height = b.height, d.rotate(180 * Math.PI / 180), d.drawImage(b, -b.width, -b.height, b.width, b.height);
                    break;
                case 3:
                    c.width = b.height, c.height = b.width, d.rotate(270 * Math.PI / 180), d.drawImage(b, -b.width, 0, b.width, b.height)
            }
            b.style.display = "none"
        }, picDrawIE: function (a) {
            var b = a * 90, c = b * (Math.PI / 180), e = d(this.picImageElem), f = Math.cos(c), g = -1 * Math.sin(c), h = Math.sin(c), i = f;
            e.css({
                position: "absolute",
                left: "50%",
                filter: "progid:DXImageTransform.Microsoft.Matrix(M11=" + f + ", M12=" + g + ", M21=" + h + ", M22=" + i + ', SizingMethod="auto expand")'
            }), this.$imgElem.css({position: "relative"}), e.css({marginLeft: "-" + e.width() / 2 + "px"})
        }
    };
    return e
});
define("module/trend/TrendAction", function (a, b, c) {
    var d = a("lib/jquery"), e = a("utils/DataSource"), f = a("model/UserData"), g = a("utils/Error"), h = a("utils/Log"), i = d(document.body), j = {
        doDigg: function (a, b) {
            if (!d.isPlainObject(this.diggRequest) || this.diggRequest.readyState === 4) {
                var c = this, j = d(a.currentTarget);
                this.diggRequest = e.setTrigger(j).postJSON("addDigg", b, function (b) {
                    var d = parseInt(b.code) || 1;
                    g.showTips({
                        json: b,
                        evt: a,
                        triggerElem: j
                    }) || (f.isShowGuideUploadAvatar() && i.trigger("global:guide:uploadAvatar", [{type: "digg"}]), c.$elem.trigger("digg:success"))
                }), h.doLog({parameter: {method: "like"}, elem: j})
            }
        }, onDigg: function () {
            var a = this.$diggElem.find(".js-count"), b = parseInt(a.html()) + 1;
            a.html("+" + b), j.setDiggDisable.call(this), this.$diggElem.find("span").eq(0).animate({marginTop: "-27px"})
        }, setDiggEnable: function () {
            this.$diggElem.removeClass("btn-operate-digg-disabled").addClass("digg-trigger btn-operate-digg-enabled").attr("title", "\u8d5e\u4e00\u4e0b")
        }, setDiggDisable: function () {
            this.$diggElem.removeClass("digg-trigger btn-operate-digg-enabled").addClass("btn-operate-digg-disabled").attr("title", "\u5df2\u8d5e")
        }
    };
    return j
});
define("template/photo/photoLayer", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) {
            p.push("");
            var isProfilePhoto = null;
            typeof isProfilePhotoLayer != "undefined" && isProfilePhotoLayer ? isProfilePhoto = !0 : isProfilePhoto = !1, p.push('<div class="photolayer" '), isProfilePhoto ? p.push('data-log="profilePhotolayer"') : p.push('data-log="photolayer"'), p.push('><div class="photolayer-main js-main"><div class="photolayer-content clearfix"><a class="photolayer-close icon-close close-trigger" title="\u5173\u95ed" href="javascript:;"></a><div class="photolayer-left js-left"><div class="photolayer-view js-view"><div class="photolayer-view-inner js-view-inner"><a class="photolayer-view-prev prev-trigger" title="\u4e0a\u4e00\u5f20" hidefocus="true" href="javascript:;"></a><a class="photolayer-view-next next-trigger" title="\u4e0b\u4e00\u5f20" hidefocus="true" href="javascript:;"></a><div class="photolayer-view-image js-image"></div><div class="photolayer-operate"><i class="photolayer-operate-mask"></i><div class="photolayer-operate-inner"><a class="photolayer-operate-rotate-left rotate-trigger" data-direction="-1" href="javascript:;"><em class="icon-rotate-small-left"></em>\u5de6\u8f6c</a><a class="photolayer-operate-rotate-right rotate-trigger" data-direction="1" href="javascript:;"><em class="icon-rotate-small-right"></em>\u53f3\u8f6c</a><a class="photolayer-operate-delete delete-trigger" style="display: none;" href="javascript:;"><em class="icon-delete-s"></em>\u5220\u9664</a><a class="photolayer-operate-bigphoto js-bigphoto" target="_blank" href="#"><em class="icon-viewbig-s"></em>\u67e5\u770b\u539f\u56fe</a></div></div><div class="photolayer-view-locked"><img src="http://img2.cache.netease.com/love/image/gift/gift_100/pinkrose.png" /><div class="s-price">50\u82b1\u7530\u5e01</div></div><a class="photolayer-view-locked-sendBtn sendFlower-trigger" href="javascript:;" data-log="secret_figure">\u9001\u73ab\u7470\uff0c\u89e3\u9501\u5f62\u8c61\u7167</a></div><div class="photolayer-view-loading"><em class="icon-loadingS"></em></div><div class="photolayer-view-error"></div></div><div class="photolayer-foot js-foot"><div class="photolayer-foot-inner"><div class="photolayer-order"><i class="js-order"></i><em class="js-totalCount"></em></div><div class="photolayer-switch js-slider"><a class="photolayer-switch-prev page-prev-trigger" title="\u4e0a\u4e00\u7ec4" hidefocus="true" href="javascript:;"></a><a class="photolayer-switch-next page-next-trigger" title="\u4e0b\u4e00\u7ec4" hidefocus="true" href="javascript:;"></a><div class="photolayer-photoList"><ul class="photolayer-photo-list clearfix js-list"></ul></div></div></div></div></div><div class="photolayer-right js-right"><div class="photolayer-right-inner js-right-inner"><h3 class="photolayer-info-title js-name"><a target="_blank" href="#"></a></h3><p class="photolayer-info-desc js-title"></p><p class="photolayer-info-time">\u4e0a\u4f20\u4e8e<em class="js-time"></em></p><div class="photolayer-btn-operate clearfix js-operate">', require("template/widget/button/messOperateItem")(), "", require("template/widget/button/diggOperateItem")({silent: !0}), '</div></div><div class="photolayer-right-loading"><em class="icon-loadingS"></em></div></div></div></div></div>')
        }
        return p.join("")
    }
});
define("template/widget/button/messOperateItem", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<a class="btn-operate-item btn-operate-mess mess-trigger" href="javascript:;" title="\u8bf4\u4e24\u53e5"><em class="icon-mess"></em></a>');
        return p.join("")
    }
});
define("template/widget/button/diggOperateItem", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push(""), typeof silent != "undefined" && silent === !0 ? p.push('<a class="btn-operate-item btn-operate-digg js-digg" title="\u8d5e\u4e00\u4e0b" hidefocus="true" href="javascript:;"><span><em class="icon-digg"></em><i></i></span><span><em class="icon-digg-disabled"></em><i class="js-count"></i></span></a>') : typeof isDigged != "undefined" && typeof diggCount != "undefined" && (p.push('<a class="btn-operate-item btn-operate-digg '), isDigged ? p.push("btn-operate-digg-disabled") : p.push("btn-operate-digg-enabled digg-trigger"), p.push('" title="'), isDigged ? p.push("\u5df2\u8d5e") : p.push("\u8d5e\u4e00\u4e0b"), p.push('" hidefocus="true" href="javascript:;">'), isDigged || p.push('<span><em class="icon-digg"></em>+', diggCount, "</span>"), p.push('<span><em class="icon-digg-disabled"></em><i class="js-count">+', diggCount, "</i></span></a>")), p.push("");
        return p.join("")
    }
});
define("module/photo/widget/SliderPhotoList", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/DataSource"), g = a("utils/Error"), h = a("utils/Utils"), i = a("utils/widget/OimageUrl"), j = d("body"), k = e.extend({
        defaults: {
            flps: 200,
            VIEWSIZE: 7,
            VIEW_LEFT_SIZE: 3,
            VIEW_RIGHT_SIZE: 3,
            ITEM_WIDTH: 50
        }, init: function (a, b) {
            this.$elem = a, this.config = d.extend({}, this.defaults, b), this.data = {}, this.photoCache = [], this.initData(), this.$listElem = this.$elem.find(".js-list"), this.$prevElem = this.$elem.find(".page-prev-trigger"), this.$nextElem = this.$elem.find(".page-next-trigger"), this.bindEvent()
        }, initData: function () {
            this.dataBase = {}, this.totalArray = [], this.prevArray = [], this.nextArray = [], this.viewArray = [], this.config.type = null
        }, bindEvent: function () {
            this.$prevElem.bind("click", d.proxy(this.onPrevGroup, this)), this.$nextElem.bind("click", d.proxy(this.onNextGroup, this)), this.$listElem.delegate("> li", "click", d.proxy(this.onClick, this))
        }, render: function (a) {
            this.data = d.extend({}, a.data), this.config.userUrl = this.data.userUrl, a.type && (this.config.type = a.type), this.loadData(), this.show()
        }, show: function () {
            j.bind("keydown", d.proxy(this.onKeyDown, this))
        }, hide: function () {
            j.unbind("keydown", d.proxy(this.onKeyDown, this)), this.initData()
        }, onClick: function (a) {
            var b = d(a.currentTarget), c = b.attr("data-id");
            this.showCurrent(c)
        }, onKeyDown: function (a) {
            var b = a.which || a.keyCode;
            switch (b) {
                case h.ARROW_LEFT_CODE:
                    this.onPrev();
                    break;
                case h.ARROW_RIGHT_CODE:
                    this.onNext()
            }
        }, getCursor: function (a) {
            var b = d.inArray(a, this.totalArray);
            return b
        }, getPrevId: function () {
            var a = this.getCursor(this.data.id) - 1;
            return this.totalArray[a]
        }, onPrev: function () {
            this.showCurrent(this.getPrevId())
        }, getNextId: function () {
            var a = this.getCursor(this.data.id) + 1;
            return this.totalArray[a]
        }, onNext: function () {
            this.showCurrent(this.getNextId())
        }, onPrevGroup: function () {
            this.onSliderLeft(this.config.VIEW_LEFT_SIZE, d.proxy(function () {
                this.onSliderLeft(this.config.VIEW_LEFT_SIZE)
            }, this))
        }, onNextGroup: function () {
            this.onSliderRight(this.config.VIEW_RIGHT_SIZE, d.proxy(function () {
                this.onSliderRight(this.config.VIEW_RIGHT_SIZE)
            }, this))
        }, getItemList: function () {
            return this.$listElem.find("> li")
        }, showCurrent: function (a) {
            var b = this;
            b.showId(a)
        }, showId: function (a) {
            var b = d.inArray(a, this.totalArray);
            if (b !== -1 && !this.isAnimating) {
                var c = d.inArray(this.viewArray[0], this.totalArray), e = b - c - this.config.VIEW_LEFT_SIZE;
                this.data = this.dataBase[a], this.getItemList().removeClass("current");
                var f = d.inArray(a, this.viewArray);
                f !== -1 && this.getItemList().eq(f).addClass("current"), e > 0 ? this.onSliderRight(e, d.proxy(function () {
                }, this)) : e < 0 && this.onSliderLeft(Math.abs(e), d.proxy(function () {
                }, this)), this.loadImage()
            }
        }, loadImage: function () {
            this.$elem.trigger("change:photo", [this.data]), this.previewImg()
        }, onSliderRight: function (a, b) {
            var c = this.nextArray.length;
            c < this.config.VIEW_RIGHT_SIZE && this.config.nextData ? this.loadBData("next", function () {
                b && b()
            }) : (a = a > c ? c : a, a > 0 && this.sliderArray("next", a))
        }, onSliderLeft: function (a, b) {
            var c = this.prevArray.length;
            c < this.config.VIEW_LEFT_SIZE && this.config.prevData ? this.loadBData("prev", function () {
                b && b()
            }) : (a = a > c ? c : a, a > 0 && this.sliderArray("prev", a))
        }, loadData: function (a) {
            var b = this;
            f.postJSON("segmentPhotoList", {
                length: 20,
                type: this.config.type ? this.config.type : 2,
                albumId: this.data.albumId,
                userUrl: this.config.userUrl,
                photoId: this.data.id
            }, function (c) {
                var d = parseInt(c.code) || 1;
                d === 1 && (b.config.type && (b.data.id = c.list[0].id), b.updateCursor(c), b.loadedData(c.list, a), b.previewImg(), b.$elem.trigger("photo:list:init"))
            })
        }, loadBData: function (a, b) {
            var c = this;
            f.postJSON("segmentPhotoList", {
                length: 20,
                albumId: this.data.albumId,
                userUrl: this.config.userUrl,
                type: a === "next" ? 0 : 1,
                photoId: a === "next" ? this.config.nextData.id : this.config.prevData.id
            }, function (d) {
                c.updateCursor(d, a), c.loadedData(d.list, a), b && b()
            })
        }, loadedData: function (a, b) {
            this.updateDataBase(a), this.setArray(a, b)
        }, updateCursor: function (a, b) {
            typeof b == "undefined" ? (this.config.nextData = a.nextData, this.config.prevData = a.prevData) : b === "next" ? this.config.nextData = a.nextData : this.config.prevData = a.prevData
        }, updateDataBase: function (a) {
            var b = this;
            d.each(a, function (a, c) {
                b.dataBase[c.id] || (b.dataBase[c.id] = c)
            })
        }, setArray: function (a, b) {
            var c = [];
            d.each(a, function (a, b) {
                c.push(b.id)
            }), typeof b == "undefined" ? this.initArray(c) : this.updateArray(c, b)
        }, initArray: function (a) {
            var b = d.inArray(this.data.id, a), c = b - this.config.VIEW_LEFT_SIZE, e = b + this.config.VIEW_RIGHT_SIZE, f = this.config.VIEW_LEFT_SIZE + this.config.VIEW_RIGHT_SIZE, g = a.length, h = this;
            c = c < 0 ? 0 : c, e = e > g ? g : e, c === 0 && (e = f > g ? g : f), e === g && (c = e - f, c = c < 0 ? 0 : c), d.each(a, function (a, b) {
                h.totalArray.push(b), a < c && h.prevArray.push(b), a >= c && a <= e && h.viewArray.push(b), a > e && h.nextArray.push(b)
            }), this.renderList()
        }, updateArray: function (a, b) {
            var c = this, e = null;
            if (b === "next")for (var f = 0, g = a.length; f < g; f++)e = a[f], d.inArray(e, this.totalArray) === -1 && (this.nextArray.push(e), this.totalArray.push(e)); else for (var h = a.length; h > 0; h--)e = a[h - 1], d.inArray(e, c.totalArray) === -1 && (this.prevArray.unshift(e), this.totalArray.unshift(e))
        }, renderList: function () {
            var a = [];
            for (var b = 0, c = this.viewArray.length; b < c; b++) {
                var d = this.viewArray[b], e = this.dataBase[d];
                a.push("<li"), this.data.id === d && a.push(' class="current"'), a.push(' data-id="' + d + '"'), a.push('><img src="'), a.push(i(e.unlocked == 2 ? e.blurryUrl : e.url, 50, 50, 1)), a.push('" />'), e.unlocked == 2 && a.push('<em class="icon-lock-s"></em><i class="ui-mask"></i>'), a.push("</li>")
            }
            this.$listElem.html(a.join(""))
        }, addList: function (a) {
            var b = this, c = document.createDocumentFragment();
            d.each(a, function (a, d) {
                var e = b.add(b.dataBase[d])[0];
                c.appendChild(e)
            });
            return c
        }, add: function (a) {
            var b = [];
            b.push("<li"), a.id === this.data.id && b.push(' class="current"'), b.push(' data-id="' + a.id + '"'), b.push('><img src="'), b.push(i(a.unlocked == 2 ? a.blurryUrl : a.url, 50, 50, 1)), b.push('" />'), a.unlocked == 2 && b.push('<em class="icon-lock-s"></em><i class="ui-mask"></i>'), b.push("</li>");
            return d(b.join(""))
        }, onDelete: function (a) {
            this.dataBase[a] && this.remove(a)
        }, remove: function (a) {
            try {
                delete this.dataBase[a]
            } catch (b) {
                this.dataBase[a] = null
            }
            var c = d.inArray(a, this.viewArray), e = d.inArray(a, this.totalArray), f = this.getPrevId(), g = this.getNextId();
            this.viewArray.splice(c, 1), this.totalArray.splice(e, 1), this.getItemList().filter("[data-id=" + a + "]").remove(), this.addLast(), g ? this.showCurrent(g) : f ? this.showCurrent(f) : this.$elem.trigger("photo:list:empty")
        }, addLast: function () {
            if (this.nextArray.length > 0) {
                var a = this.add(this.dataBase[this.nextArray[0]]);
                this.$listElem.append(a);
                var b = this.nextArray.shift();
                this.viewArray.push(b)
            } else if (this.prevArray.length > 0) {
                var c = this.add(this.dataBase[this.prevArray[this.prevArray.length - 1]]);
                this.getItemList().first().before(c);
                var d = this.prevArray.pop();
                this.viewArray.unshift(d)
            }
        }, sliderArray: function (a, b) {
            var c = [], d = [];
            if (a === "next") {
                for (var e = 0; e < b; e++) {
                    var f = this.nextArray.shift(), g = this.viewArray.shift();
                    this.viewArray.push(f), this.prevArray.push(g), d.push(f)
                }
                this.doSliderRight(d, b)
            } else {
                for (var h = 0; h < b; h++) {
                    var i = this.prevArray.pop(), j = this.viewArray.pop();
                    this.viewArray.unshift(i), this.nextArray.unshift(j), c.unshift(i)
                }
                this.doSliderLeft(c, b)
            }
        }, doSliderLeft: function (a, b) {
            var c = this, d = this.addList(a), e = this.$listElem.find("> li").first(), f = (this.config.ITEM_WIDTH + 9) * b;
            e.before(d), this.isAnimating = !0, this.$listElem.css({marginLeft: "-" + f + "px"}).stop().animate({marginLeft: "0"}, this.config.flps, "easeInOutExpo", function () {
                c.isAnimating = !1, c.$listElem.find("> li").slice(c.config.VIEWSIZE).remove()
            })
        }, doSliderRight: function (a, b) {
            var c = this, d = this.addList(a), e = (this.config.ITEM_WIDTH + 9) * b;
            this.$listElem.append(d), this.isAnimating = !0, this.$listElem.stop().animate({marginLeft: "-" + e + "px"}, this.config.flps, "easeInOutExpo", function () {
                c.isAnimating = !1, c.$listElem.css({marginLeft: 0}).find("> li").slice(0, b).remove()
            })
        }, previewImg: function () {
            var a = d.inArray(this.data.id, this.totalArray), b = [], c = null, e = null;
            for (var f = 1, g = 4; f < g; f++)c = this.dataBase[this.totalArray[a + f]], e = this.dataBase[this.totalArray[a - f]], c && b.push(c.url), e && b.push(e.url);
            this.createPreviewImgs(b)
        }, createPreviewImgs: function (a) {
            var b = this;
            d.each(a, function (a, c) {
                if (d.inArray(c, b.photoCache) === -1) {
                    var e = new Image;
                    e.src = i(c, 530), b.addCache(c)
                }
            })
        }, addCache: function (a) {
            d.inArray(a, this.photoCache) === -1 && this.photoCache.push(a)
        }
    });
    return k
});
define("widget/tips/AppTips", function (a, b, c) {
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("utils/Cookie"), g = e.extend({
        defaults: {
            arrowDirection: "up",
            cookieKey: null,
            isShowLink: !1,
            text: "",
            linkUrl: "",
            linkText: "",
            isShowClose: !0,
            className: ""
        }, init: function (a, b) {
            this.config = d.extend({}, this.defaults, b), this.render(), this.bindEvent()
        }, render: function () {
            var a = [];
            a.push('<div class="box-tips n-arrow-' + this.config.arrowDirection + '"'), a.push(" >"), a.push('   <em class="box-tips-arrow"></em>'), this.config.isShowClose && a.push('   <a class="icon-close close-trigger" title="\u5173\u95ed\u63d0\u793a" href="javascript:;"></a>'), a.push("<p>"), a.push(this.config.text), this.config.isShowLink && (a.push('&nbsp;&nbsp;<a class="link-lightBlue" href='), a.push('"' + this.config.linkUrl + '"'), this.config.linkLog && a.push(' data-log="' + this.config.linkLog + '"'), a.push(' target="_blank">'), a.push(this.config.linkText), a.push("&gt;&gt;</a>")), a.push("</p>"), a.push("</div>"), this.$elem = d(a.join("")), this.config.className && this.$elem.addClass(this.config.className);
            return this.$elem
        }, bindEvent: function () {
            this.$elem.delegate(".close-trigger", "click", d.proxy(this.close, this))
        }, show: function (a) {
            f.get(this.config.cookieKey) || (a && this.setPosition(a), this.$elem.appendTo("body").fadeIn())
        }, hide: function () {
            this.$elem.fadeOut()
        }, close: function () {
            this.config.cookieKey && f.set(this.config.cookieKey, 1, 365), this.hide()
        }, setPosition: function (a) {
            this.$elem.css({left: a.left, top: a.top})
        }
    });
    return g
});
define("task/page/feed/feedGuide", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("task/basic/Task"), f = a("utils/tmpl"), g = a("utils/Cookie"), h = a("module/guide/VipGuide"), i = a("module/guide/VipTimeLimit"), j = d(document.body);
    (new e("feedGuide", function () {
        var b = d("#mainBox"), c = d(window), e = d(document.body), j = d(document), k = b.find(".js-feed-dating"), l, m = function () {
            n = k.offset(), j.scrollTop() >= n.top - 450 && (o.css({
                top: n.top - 50,
                left: n.left - 130
            }), o.fadeIn(function () {
                g.set("dateGuide", "1", 365)
            }))
        };
        if (k.size() > 0 && parseInt(g.get("dateGuide")) !== 1) {
            var n = k.offset(), o = d(f.formatTemplate(a("template/floatbox/dateGuideBox")));
            e.append(o), m(), l = setInterval(m, 300), o.delegate(".close-trigger", "click", function () {
                o.fadeOut("fast", function () {
                    o.remove(), clearInterval(l)
                })
            }), e.bind("filter:hide feeds:new", function (a) {
                o && o.remove(), l && clearInterval(l)
            })
        }
        var p = function () {
            var a, b = d("#data_vipGuide");
            if (b.size() != 0) {
                var c = d.parseJSON(b.html());
                if (c.popupType) {
                    switch (c.popupType) {
                        case"yearPayVip":
                            a = "vipGuide";
                            break;
                        case"fiveDayTryVip":
                            a = "portrait";
                            break;
                        case"noticeGradeVip":
                            a = "upgradeSvip";
                            break;
                        case"subtract20YearVip":
                            a = "vipTimeLimit20";
                            break;
                        case"halfPriceVip":
                            a = "viprenew";
                            break;
                        case"halfPriceHVip":
                            a = "sviprenew";
                            break;
                        default:
                            a = c.popupType
                    }
                    c.type = a;
                    if (a == "vipGuide" || a == "portrait" || a == "upgradeSvip" || a == "yearPaySVip" || a == "yearPayVipForFiveDayTry" || a == "yearPaySVipForFiveDayTry") {
                        var e = new h(null, {data: c});
                        e.show()
                    } else if (a == "vipTimeLimit20" || a == "viprenew" || a == "sviprenew" || a == "yearPay388SVip" || a == "yearPay388SVipForGrade") {
                        var f = new i(null, {seconds: c.limitTime, data: c});
                        f.show()
                    }
                }
            }
        };
        e.bind("vipGuide:show", p)
    })).add()
});
define("module/guide/VipGuide", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/tmpl"), g = a("utils/Cookie"), h = a("utils/Log"), i = d(document.body), j = e.extend({
        renderTmpl: function (b) {
            return d(f.formatTemplate(a("template/guide/vipGuide"), b))
        }, postRender: function () {
            this._super(), this.type = this.config.data.type, this.type == "portrait" ? this.$elem.addClass("poplayer-vipPortrait") : this.type == "upgradeSvip" && this.$elem.addClass("poplayer-upgradeSvip")
        }, bindEvent: function () {
            this._super(), this.$elem.delegate(".buy-trigger", "click", d.proxy(this.onSubmit, this)), this.$elem.delegate(".upload-portrait-trigger", "click", d.proxy(this.onUploadPortrait, this))
        }, onSubmit: function (a) {
            var b = d(a.currentTarget), c = b.data("type");
            switch (c) {
                case"vipGuide":
                case"yearPayVipForFiveDayTry":
                    b.trigger("global:pay:buyvip:detail");
                    break;
                case"upgradeSvip":
                    b.trigger("global:pay:upgradevip");
                    break;
                case"yearPaySVip":
                case"yearPaySVipForFiveDayTry":
                    b.trigger("global:pay:buysvip:detail")
            }
            this.hide()
        }, onUploadPortrait: function (a) {
            var b = d(a.currentTarget);
            g.set("portrait", "vipguide", .625 / 60 / 60), window.open("/settings/face"), h.doLog({
                parameter: {method: "opentrialvip"},
                elem: b
            })
        }
    });
    return j
});
define("template/guide/vipGuide", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) {
            p.push('<div class="poplayer vipGuide" data-log="openvipguide" data-viplog="vipLayer"><div class="poplayer-main vipGuide-main js-main"><a class="icon-close close-trigger" title="\u5173\u95ed" href="javascript:;"></a><em class="vipGuide-icon-vip"></em><div class="vipGuide-hd">'), type == "vipGuide" ? p.push('<h3><em class="icon-crown"></em>\u5f00\u901aVIP\u4f1a\u5458\u4ea4\u53cb\u6548\u679c\u63d0\u5347<span class="text-red">10</span>\u500d\uff01</h3><p class="poplayer-desc">\u5df2\u7ecf\u67093\u4e07\u591a\u540d\u806a\u660e\u4eba\u5f00\u901a\u4e86VIP\u4f1a\u5458\uff0c\u4ed6\u4eec\u5728\u4ea4\u53cb\u65b9\u9762\u6bd4\u4f60\u66f4\u6709\u4f18\u52bf</p>') : type == "yearPayVipForFiveDayTry" ? p.push('<h3><em class="icon-crown"></em>VIP\u5373\u5c06\u8fc7\u671f\uff0c\u7acb\u5373\u7eed\u8d39\u4fdd\u6301\u4f1a\u5458\u7279\u6743</h3><p class="poplayer-desc">\u5df2\u7ecf\u67093\u4e07\u591a\u540d\u806a\u660e\u4eba\u5f00\u901a\u4e86VIP\u4f1a\u5458\uff0c\u4ed6\u4eec\u5728\u4ea4\u53cb\u65b9\u9762\u6bd4\u4f60\u66f4\u6709\u4f18\u52bf</p>') : type == "portrait" ? p.push('<h3>\u4e0a\u4f20\u771f\u5b9e\u5934\u50cf\u5e76\u5ba1\u6838\u901a\u8fc7\uff0c\u8d60\u9001<span class="text-red">5</span>\u5929VIP\u4f53\u9a8c\u5238</h3>') : type == "upgradeSvip" ? p.push('<h3><em class="icon-svip-crown"></em>\u5347\u7ea7\u4e3a\u9ad8\u7ea7VIP\u4f1a\u5458\uff0c\u66f4\u591a\u7279\u6743\u63d0\u5347\u4ea4\u53cb\u6548\u7387</h3>') : type == "yearPaySVip" ? p.push('<h3><em class="icon-svip-crown"></em>\u5f00\u901a\u9ad8\u7ea7VIP\uff0c\u4ea4\u53cb\u6548\u7387\u63d0\u5347<span class="text-red">10</span>\u500d\uff01</h3>') : type == "yearPaySVipForFiveDayTry" && p.push('<h3><em class="icon-svip-crown"></em>\u9ad8\u7ea7VIP\u5373\u5c06\u8fc7\u671f\uff0c\u7acb\u5373\u7eed\u8d39\u4fdd\u6301\u4f1a\u5458\u7279\u6743</h3>'), p.push('</div><div class="vipGuide-bd"><p class="vipGuide-list-title">'), type == "vipGuide" || type == "portrait" || type == "yearPayVipForFiveDayTry" ? p.push("VIP\u4f1a\u5458\u6709\u66f4\u591a\u4ea4\u53cb\u4f18\u52bf\uff1a") : (type == "upgradeSvip" || type == "yearPaySVip" || type == "yearPaySVipForFiveDayTry") && p.push("\u5347\u7ea7SVIP\u4f1a\u5458\u63d0\u534721\u9879\u4ea4\u53cb\u4f18\u52bf\uff1a"), p.push('</p><ul class="vipGuide-list clearfix">'), type == "vipGuide" || type == "portrait" || type == "yearPayVipForFiveDayTry" ? p.push('<li><em class="vipGuide-icon-tl"></em><h4>\u67e5\u770b\u5168\u90e8\u8bbf\u5ba2\u540d\u5355</h4><p>\u4e0d\u4f1a\u9519\u5931\u5bf9\u4f60\u597d\u611f\u7684\u7f18\u4efd</p></li><li><em class="vipGuide-icon-tr"></em><h4>\u63a8\u8350\u673a\u4f1a\u63d0\u53478\u500d</h4><p>\u610f\u4e2d\u4eba\u66f4\u5bb9\u6613\u627e\u5230\u4f60</p></li><li><em class="vipGuide-icon-bl"></em><h4>\u66f4\u591a\u5730\u65b9\u4f18\u5148\u5c55\u793a</h4><p>\u4ece\u5343\u4e07\u4eba\u4e2d\u8131\u9896\u800c\u51fa</p></li><li><em class="vipGuide-icon-br"></em><h4>\u5176\u4ed67\u9879\u82b1\u7530\u7279\u6743</h4><p><a class="link-gray" data-log="openvip" target="_blank" href="/pay/services">\u67e5\u770b\u5168\u90e8\u7279\u6743&gt;&gt;</a></p></li>') : (type == "upgradeSvip" || type == "yearPaySVip" || type == "yearPaySVipForFiveDayTry") && p.push('<li><em class="vipGuide-icon-tl"></em><h4>\u559c\u6b22\u7684\u4eba\u4e0a\u7ebf\u63d0\u9192</h4><p>\u4e0d\u4f1a\u9519\u5931\u5bf9\u4f60\u597d\u611f\u7684\u7f18\u4efd</p></li><li><em class="vipGuide-icon-tr"></em><h4>\u79c1\u4fe1\u7f6e\u9876</h4><p>\u610f\u4e2d\u4eba\u66f4\u5bb9\u6613\u627e\u5230\u4f60</p></li><li><em class="vipGuide-icon-bl"></em><h4>\u66f4\u591a\u7cbe\u51c6\u7b5b\u9009\u6761\u4ef6</h4><p>\u65b9\u4fbf\u627e\u5230\u66f4\u7b26\u5408\u8981\u6c42\u7684\u7f18\u5206</p></li><li><em class="vipGuide-icon-br"></em><h4>\u5176\u4ed618\u9879\u82b1\u7530\u7279\u6743</h4><p><a class="link-gray" data-log="openvip" target="_blank" href="/pay/services">\u67e5\u770b\u5168\u90e8\u7279\u6743&gt;&gt;</a></p></li>'), p.push('</ul></div><div class="poplayer-ft vipGuide-ft">');
            if (type == "vipGuide" || type == "yearPayVipForFiveDayTry")p.push('<p>\u4e00\u5e74\u671fVIP\u4f1a\u5458\u4f4e\u81f3<span class="text-red">98</span>\u5143 \uff08\u6708\u4ed830\u5143\uff0c\u7701262\u5143\uff09</p><a class="btnM btn-red buy-trigger" data-servicetype="3" href="javascript:;" data-type="', type, '" data-log="'), type == "vipGuide" ? p.push("newguidepop") : type == "yearPayVipForFiveDayTry" && p.push("trialvipopenpop"), p.push('">\u7acb\u5373\u62a2\u8d2d</a>'); else if (type == "portrait")p.push('<a class="btnM btn-red upload-portrait-trigger" href="javascript:;" data-log="setfacepop">\u7acb\u5373\u4e0a\u4f20\u5934\u50cf</a>'); else if (type == "upgradeSvip")p.push('<p>\u6700\u5b9e\u60e0\u7684\u9ad8\u7ea7VIP\u4f1a\u5458<span class="text-red">488</span>\u5143/\u5e74 \uff08\u6708\u4ed8188\u5143\uff0c\u77011768\u5143\uff09</p><a class="btnM btn-red buy-trigger" data-servicetype="3" href="javascript:;" data-type="', type, '" data-log="upgradesvippop">\u7acb\u5373\u62a2\u8d2d</a>'); else if (type == "yearPaySVip" || type == "yearPaySVipForFiveDayTry")p.push('<p>\u4e00\u5e74\u671f\u9ad8\u7ea7VIP\u4f1a\u5458\uff1a<span class="text-red">488</span>\u5143&nbsp;&nbsp;<span class="text-gray">\uff08\u6708\u4ed8188\u5143\uff0c\u77011768\u5143\uff09</span></p><a class="btnM btn-red buy-trigger" data-servicetype="3" href="javascript:;" data-type="', type, '" data-log="'), type == "yearPaySVip" ? p.push("newuseropensvippop") : type == "yearPaySVipForFiveDayTry" && p.push("trialsvipopenpop"), p.push('">\u7acb\u5373\u62a2\u8d2d</a>');
            p.push("</div></div></div>")
        }
        return p.join("")
    }
});
define("module/guide/VipTimeLimit", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/tmpl"), g = a("utils/Utils"), h = a("utils/Log"), i = d(document.body), j = e.extend({
        renderTmpl: function (b) {
            switch (b.type) {
                case"vipTimeLimit20":
                    b.log = "vip20pop";
                    break;
                case"viprenew":
                    b.log = "vip50pop";
                    break;
                case"sviprenew":
                    b.log = "svip50pop";
                    break;
                case"yearPay388SVip":
                    b.log = "olduseropensvippop";
                    break;
                case"yearPay388SVipForGrade":
                    b.log = "upgradesvippop"
            }
            return d(f.formatTemplate(a("template/guide/vipTimeLimit"), b))
        }, postRender: function () {
            this._super(), this.type = this.config.data.type, this.type == "vipTimeLimit20" ? this.$elem.addClass("poplayer-vipTimeLimit") : this.type == "viprenew" ? this.$elem.addClass("poplayer-vipRenew") : this.type == "sviprenew" ? this.$elem.addClass("poplayer-svipRenew") : this.type == "yearPay388SVip" ? this.$elem.addClass("poplayer-svip388") : this.type == "yearPay388SVipForGrade" && this.$elem.addClass("poplayer-sviprenew388"), this.$buyBtn = this.$mainElem.find(".buy-trigger"), this.$hourElem = this.$mainElem.find(".js-hour"), this.$minuteElem = this.$mainElem.find(".js-minute"), this.$secondElem = this.$mainElem.find(".js-second"), this.secondsLeft = parseInt(this.config.seconds, 10) / 1e3, this.interval = 1e3
        }, bindEvent: function () {
            this._super(), this.$elem.delegate(".buy-trigger", "click", d.proxy(this.onSubmit, this));
            var a = this;
            this.intervaler && clearInterval(this.intervaler), this.secondCountDown(), this.intervaler = setInterval(function () {
                a.secondCountDown()
            }, this.interval)
        }, secondCountDown: function () {
            var a = this.secondsLeft;
            if (a < 0)clearInterval(this.intervaler), this.$buyBtn.removeClass("buy-trigger"), this.hide(); else {
                var b = g.secondCountDown(a, !1, this.type == "subtract20YearVip" ? !1 : !0);
                this.$hourElem.html(b.hour), this.$minuteElem.html(b.minute), this.$secondElem.html(b.second), this.secondsLeft = a - 1
            }
        }, onSubmit: function (a) {
            var b = d(a.currentTarget), c = b.data("type");
            switch (c) {
                case"viprenew":
                case"vipTimeLimit20":
                    b.trigger("global:pay:buyvip:detail");
                    break;
                case"sviprenew":
                case"yearPay388SVip":
                    b.trigger("global:pay:buysvip:detail");
                    break;
                case"yearPay388SVipForGrade":
                    b.trigger("global:pay:buysvip:detail")
            }
            this.hide()
        }
    });
    return j
});
define("template/guide/vipTimeLimit", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer vipGuide" data-log="openvipguide" data-viplog="vipLayer"><div class="poplayer-main vipGuide-main js-main"><a class="icon-close close-trigger" title="\u5173\u95ed" href="javascript:;"></a><em class="vipGuide-icon-vip"></em><div class="vipGuide-bd"><div class="vipGuide-content">'), type == "vipTimeLimit20" ? p.push('<p>VIP\u4f1a\u54581\u5e74\uff1a\u73b0\u4ef7<span class="star-text-georgia">78</span>\u5143  \u539f\u4ef7<span class="ui-tLT"><span class="star-text-georgia">98</span>\u5143</span></p>') : type == "viprenew" ? p.push('<p>50\u5143/\u5e74  \u539f\u4ef7<span class="ui-tLT">98\u5143/\u5e74</span></p>') : type == "sviprenew" && p.push('<p>248\u5143/\u5e74  \u539f\u4ef7<span class="ui-tLT">488\u5143/\u5e74</span></p>'), p.push('</div></div><div class="poplayer-ft vipGuide-ft"><a class="btnM buy-trigger" href="javascript:;" data-servicetype="'), type == "viprenew" || type == "sviprenew" ? p.push("4") : (type == "vipTimeLimit20" || type == "yearPay388SVip" || type == "yearPay388SVipForGrade") && p.push("5"), p.push('" data-type="', type, '" data-log="', log, '">'), (type == "vipTimeLimit20" || type == "viprenew" || type == "sviprenew") && p.push("\u7acb\u5373\u62a2\u8d2d"), p.push('</a><p class="vipGuide-deadline">'), type == "vipTimeLimit20" || type == "yearPay388SVip" ? p.push("\u9650\u65f6\u8d2d\u671f\u9650") : p.push("\u4f18\u60e0\u6709\u6548\u671f"), p.push('\uff1a<span class="js-hour">00</span>\u5c0f\u65f6<span class="js-minute">00</span>\u5206<span class="js-second">00</span>\u79d2\u5185\u4ed8\u6b3e\u6709\u6548</p></div></div></div>');
        return p.join("")
    }
});
define("template/floatbox/dateGuideBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer-dateGuide"><em class="poplayer-dateGuide-close close-trigger"></em></div>');
        return p.join("")
    }
});
define("task/widget/tips", function (a, b, c) {
    "use strict";
    var d = a("task/basic/Task"), e = a("lib/jquery"), f = a("utils/Cookie"), g = a("model/UserData");
    (new d("tips", function () {
        return;
        var a = "search_v140924", b = function () {
            var b = '<div class="box-tips n-arrow-up" style="top: 51px; left: 60px;">\n            <em class="box-tips-arrow" style="left: 100px;"></em>\n            <a class="icon-close close-trigger" title="\u5173\u95ed\u63d0\u793a" href="javascript:;"></a>\n            <p>\u5174\u8da3\u641c\u7d22\u6539\u7248\u66f4\u540d\u9047\u89c1\uff0c<a class="link-blue" href="/search/user">\u5feb\u53bb\u770b\u770b>></a></p>\n         </div>', c = e(b), d = e(".header-navi");
            d.append(c), c.delegate(".close-trigger", "click", function () {
                c.fadeOut(), f.set(a, 1, 90)
            })
        }
    })).add()
});
define("task/rightModule/goodNews", function (a, b, c) {
    var d = a("lib/jquery"), e = a("task/basic/Task"), f = a("utils/DataSource"), g = a("widget/LoopScroll"), h = a("module/message/MessageAction"), i = a("utils/widget/Counter");
    (new e("goodNews", function () {
        var a = {
            init: function () {
                this.$elem = d("#moduleGoodNews")
            }, render: function (a) {
                this.init();
                var b = [];
                d.each(a, function (a, c) {
                    b.push('<li><em class="icon-goodNews"></em><span>'), c.me.nickName = i.subString(c.me.nickName, 10), c.mate ? (c.mate.nickName = i.subString(c.mate.nickName, 10), b.push('<a class="cGray" target="_blank" href="/' + c.me.url + '">' + c.me.nickName + "</a>\u4e0e"), b.push('<a class="cGray" target="_blank" href="/' + c.mate.url + '">' + c.mate.nickName + "</a>\u70ed\u604b\u4e86")) : b.push('<a class="cGray" target="_blank" href="/' + c.me.url + '">' + c.me.nickName + "</a>\u5ba3\u5e03\u604b\u7231\u4e86"), b.push("</span></li>")
                }), this.$elem.find(".js-list").html(b.join("")).end().fadeIn(), this.initEvent()
            }, initEvent: function () {
                var a = new g(this.$elem.find(".js-list"), {startCursor: 2, flps: 2e3});
                a.render(), this.$elem.delegate(".mess-trigger", "click", d.proxy(this.showMessBox, this))
            }, showMessBox: function (a) {
                var b = {
                    defaultTip: "\u8bf7\u628a\u4f60\u7684\u8054\u7cfb\u65b9\u5f0f\u3001\u7231\u4eba\u82b1\u7530\u5730\u5740\u3001\u4f60\u4eec\u7684\u604b\u7231\u6545\u4e8b\u544a\u77e5\u5c0f\u7ea2\u5a18\uff0c\u79c0\u51fa\u4f60\u4eec\u7684\u5e78\u798f",
                    noMessTips: !0,
                    data: {user: {id: "-6017037953328880174", nickName: "\u82b1\u7530\u559c\u4e8b"}}
                };
                h.doMessage.call(this, a, b)
            }
        };
        f.postJSON("goodNews", {}, function (b) {
            b.length > 0 && a.render(b)
        })
    })).add()
});
define("widget/LoopScroll", function (a, b, c) {
    var d = a("lib/jquery"), e = a("basic/Class"), f = e.extend({
        defaults: {
            startCursor: 0,
            timeOutTime: 3e3,
            flps: 1e3
        }, init: function (a, b) {
            this.$elem = a, this.config = d.extend({}, this.defaults, b), this.$currentElem = null, this.itemHeight = this.getItemList().eq(0).height(), this.pauseing = !1
        }, render: function () {
            this.getItemList().size() <= this.config.startCursor || (this.bindEvent(), this.start())
        }, bindEvent: function () {
            var a = this;
            this.$elem.hover(function (b) {
                b.type === "mouseenter" ? a.pause() : a.resume()
            })
        }, getItemList: function () {
            return this.$elem.find("> li")
        }, start: function () {
            var a = this;
            this.timer = setTimeout(function () {
                a.startScroll()
            }, this.config.timeOutTime)
        }, stop: function () {
            this.timer && clearTimeout(this.timer)
        }, pause: function () {
            this.pauseing = !0, this.stop(), this.$currentElem && this.$currentElem.pause()
        }, resume: function () {
            var a = this;
            this.pauseing = !1, this.$currentElem ? this.$currentElem.resume() : this.start()
        }, startScroll: function () {
            var a = this;
            this.pauseing || (this.$currentElem = this.getItemList().eq(0), this.$currentElem.animate({marginTop: "-" + this.itemHeight + "px"}, this.config.flps, function () {
                a.$currentElem.attr("style", "").appendTo(a.$elem), a.$currentElem = null, a.start()
            }))
        }
    });
    return f
});
define("task/widget/topBanner", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("task/basic/Task"), f = a("utils/DataSource"), g = a("utils/Cookie"), h = a("utils/tmpl"), i = a("widget/RollSlider"), j = d(window), k = d(document.body);
    (new e("topBanner", function () {
        f.postJSON("topBannerList", {}, function (b) {
            var c = b, e = b.bannerList;
            if (e.length != 0) {
                var l = d(h.formatTemplate(a("template/widget/topBanner/topBannerItem"), c)), m = {
                    keyName: "topbanner",
                    valueStr: "",
                    valueArr: [],
                    realId: e[0].id,
                    realState: 0
                };
                m.valueStr = g.get(m.keyName), m.valueStr && (m.valueArr = m.valueStr.split("|"), m.valueArr[0] == m.realId && (m.realState = parseInt(m.valueArr[1])));
                var n = function () {
                    var a = l.find(".js-list"), b = l.find(".js-item"), c = null, h = l.find(".js-detail"), n = l.find(".js-preview");
                    l.delegate(".shrink-trigger", "click", function () {
                        l.animate({height: n.height()}), h.animate({marginTop: "-" + (h.height() - 50) + "px"}, function () {
                            g.set(m.keyName, m.realId + "|2", 180), h.hide(), n.fadeIn(), k.trigger("topBanner:change")
                        })
                    }), l.delegate(".close-trigger", "click", function () {
                        var a = e[d(this).attr("data-index")].id;
                        l.slideUp("slow", function () {
                            l.remove(), k.removeClass("u-navi-static"), j.unbind("scroll", o), k.trigger("topBanner:change"), f.postJSON("topBannerClose", {bid: a}, function (a) {
                                a == undefined || a.code == undefined || a.code != 1
                            })
                        })
                    });
                    var o = function () {
                        j.scrollTop() > l.height() ? k.removeClass("u-navi-static") : k.addClass("u-navi-static")
                    };
                    k.addClass("u-navi-static");
                    var p = function () {
                        setTimeout(function () {
                            l.css("width", "100%");
                            var d = k.width(), e = d > 960 ? d : 960, f = e * b.size();
                            l.css("width", e), b.css("width", e), a.css("width", f), c && (c.resize(), c.roll())
                        }, 0)
                    };
                    p();
                    var q = 0;
                    m.realState !== 2 ? (q = h.show().height(), l.css("height", q), l.css({marginTop: "-" + q + "px"}).animate({marginTop: 0}, "easeOutExpo", function () {
                        k.trigger("topBanner:change")
                    })) : (q = n.show().height(), l.css("height", q), l.css({marginTop: "-" + q + "px"}).animate({marginTop: 0}, "easeOutExpo", function () {
                        k.trigger("topBanner:change")
                    })), j.bind("scroll", o);
                    var c = new i(l, {
                        autoplay: !0,
                        duration: 200,
                        interval: 5e3,
                        loopScroll: !0,
                        reelContainer: ".js-list",
                        slideItem: ".js-item"
                    });
                    j.bind("resize", p)
                };
                d("#header").before(l);
                var o = l.find(".js-big"), p = l.find(".js-small");
                m.realState === 2 ? p.eq(0).bind("load", function () {
                    n()
                }) : o.eq(0).bind("load", function () {
                    n()
                }), o.add(p).each(function () {
                    var a = d(this);
                    a.attr("src", a.attr("data-src"))
                })
            }
        })
    })).add()
});
define("template/widget/topBanner/topBannerItem", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) {
            p.push('<div id="topBanner" class="topBanner"><div class="js-list topBanner-list">');
            for (var i = 0; i < bannerList.length; i++) {
                var banner = bannerList[i], keyLink = banner.targetUrl, isFocus = !1, isAd = !1;
                banner.type == "\u5e7f\u544a" && (isAd = !0, keyLink.indexOf("?") == -1 ? keyLink = keyLink + "?keyfrom=topbanner" : keyLink = keyLink + "&keyfrom=topbanner"), banner.type == "\u82b1\u7530\u7126\u70b9" && (isFocus = !0, keyLink.indexOf("?") == -1 ? keyLink = keyLink + "?keyfrom=topbannerfocus" : keyLink = keyLink + "&keyfrom=topbannerfocus");
                var hasLink = typeof keyLink != "undefined" && keyLink !== "" ? !0 : !1;
                p.push('<div class="js-item topBanner-item" style="background-color:', banner.backgroundColor, '" data-log="topAd"><div class="topBanner-detail js-detail">'), hasLink && p.push('<a target="_blank" href="', keyLink, '">'), p.push('<img class="js-big topBanner-detail-img" src="http://img2.cache.netease.com/love/image/common/space.gif" data-src="', banner.bigBanner, '" />'), hasLink && p.push("</a>"), p.push('<a class="topBanner-detail-shrink shrink-trigger" title="\u6536\u8d77" href="javascript:;">\u6536\u8d77</a>'), isFocus && p.push('<a href="/pay/focus?keyfrom=topbanner.focus" target="_blank" style="position: absolute; width: 189px; background: url(http://img2.cache.netease.com/love/image/page/feed/zhanshi.png) no-repeat scroll 0px 0px transparent; height: 28px; left: 50%; margin-left: 300px; top: 212px;"></a>'), p.push('</div><div class="topBanner-preview js-preview">'), hasLink && p.push('<a target="_blank" href="', keyLink, '">'), p.push('<img class="js-small" src="', banner.smallBanner, '" />'), hasLink && p.push("</a>"), p.push('<!-- <a class="topBanner-preview-close close-trigger" style="color:', banner.closeColor, ";background-color:", banner.backgroundColor, '\\9;" data-index="', i, '" title="\u5173\u95ed" href="javascript:;">\u5173\u95ed</a>--></div></div>')
            }
            p.push("</div></div>")
        }
        return p.join("")
    }
});
define("task/group/right", function (a, b, c) {
    a("task/widget/selfInfo"), a("task/widget/selfCoin"), a("task/widget/invitation"), a("task/rightModule/giftBox"), a("task/widget/adBanner"), a("task/widget/userGuide")
});
define("task/widget/selfInfo", function (a, b, c) {
    "use strict";
    var d = a("task/basic/Task"), e = a("lib/jquery"), f = a("utils/Utils"), g = a("utils/Log"), h = e(document.body);
    (new d("selfInfo", function () {
        var a = e("#moduleFollow");
        if (a.size() !== 0) {
            var b = a.find(".js-following-count");
            h.bind("fav:fetch", function () {
                var a = parseInt(b.html()) + 1;
                a = a < 0 ? 0 : a, b.html(a)
            }), h.bind("unfav:fetch", function () {
                var a = parseInt(b.html()) - 1;
                a = a < 0 ? 0 : a, b.html(a)
            }), h.bind("avatar:update", function (a, b) {
                (new RegExp(/^http:\/\/.+$/)).test(b) && e("#selfBigAvatar").attr("src", b).css({
                    width: 250,
                    height: 250
                })
            })
        }
    })).add()
});
define("task/widget/selfCoin", function (a, b, c) {
    var d = a("task/basic/Task"), e = a("lib/jquery"), f = a("utils/DataSource"), g = a("utils/Log"), h = a("model/UserAccount"), i = a("model/UserData"), j = a("widget/box/floatBox/SignUpBox"), k = a("widget/box/floatBox/MoreTaskBox"), l = e(document.body);
    (new d("selfCoin", function () {
        var a = {}, b = e("#selfCoin"), c = b.find(".js-moreTask"), d = b.find(".js-count");
        if (b.size() !== 0) {
            h.bindUpdate(i.loginUserId, function (a) {
                d.html(a.totalBalance)
            });
            if (location.href.indexOf("/home") != -1 && !c.data("signed"))f.postJSON("autoSigned", {}, function (a) {
                var b = parseInt(a.code) || 1;
                if (b === 1) {
                    h.update({userId: i.loginUserId, totalBalance: a.totalBalance});
                    if (c.attr("data-popZm"))return;
                    var d = new j(null, {coin: a.coin});
                    d.show();
                    var e = function () {
                        if (!!d.$elem.css("display")) {
                            var a = c.offset();
                            d.$elem.animate({
                                width: "hide",
                                height: "hide",
                                opacity: .3,
                                top: a.top + c.height() / 2 + "px",
                                left: a.left + c.width() / 2 + "px"
                            }, 500, function () {
                                d.hide()
                            })
                        }
                    };
                    setTimeout(e, 4e3)
                }
            }); else {
                if (c.attr("data-popZm"))return;
                l.trigger("vipGuide:show")
            }
            c.bind("click", function (b) {
                var c = e(b.currentTarget);
                if (!e.isPlainObject(a.showDonateTasks) || a.showDonateTasks.readyState === 4)a.showDonateTasks = f.postJSON("showDonateTasks", {}, function (a) {
                    var b = parseInt(a.code) || 1;
                    if (b === 1) {
                        var c = new k(null, {data: a});
                        c.show()
                    }
                }), g.doLog({parameter: {method: "checkingethtb"}, elem: c})
            })
        }
    })).add()
});
define("widget/box/floatBox/SignUpBox", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("utils/Utils"), f = a("utils/Log"), g = a("utils/tmpl"), h = a("utils/DataSource"), i = a("widget/box/floatBox/Box"), j = d(window), k = d(document.body), l = i.extend({
        renderTmpl: function () {
            return d(g.formatTemplate(a("template/floatbox/signUpBox"), {coin: this.config.coin}))
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-signUp")
        }, show: function () {
            this.render().appendTo("body").show(), this.isShow = !0, this.$elem.css({visibility: "visible"}), this.bindResize(), this.setPosition(), this.autoClose = e.autoClose.call(this, this.$elem, this.$elem, "vipGuide")
        }, hide: function () {
            this.$elem !== null && this.$elem.detach(), this.isShow = !1, this.unbindResize(), k.unbind("click", this.autoClose), k.trigger("vipGuide:show")
        }, onVerticalMiddle: function (a) {
            var b = e.isIe6 ? j.scrollTop() : 0, c = (j.height() - this.$elem.height()) / 2;
            c = Math.max(c, 0) + b, a ? this.$elem.stop().animate({
                top: c,
                duration: 500,
                easing: "easeInOutExpo"
            }) : this.$elem.css({top: c})
        }, onCenter: function () {
            var a = j.width() / 2 - this.$elem.width() / 2;
            a = Math.max(a, 0), this.$elem.css({left: a})
        }
    });
    return l
});
define("template/floatbox/signUpBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<div class="poplayer"><div class="js-body"><div class="poplayer-bd"><p class="signUpText"><em class="signUp-icon-coin"></em>\u4eca\u65e5\u5df2\u7b7e\u5230\uff0c\u5956\u52b1<span class="text-red">', coin, "</span>\u82b1\u7530\u5e01</p></div></div></div>");
        return p.join("")
    }
});
define("widget/box/floatBox/MoreTaskBox", function (a, b, c) {
    var d = a("lib/jquery"), e = a("widget/box/floatBox/Box"), f = a("utils/tmpl"), g = a("utils/DataSource"), h = a("model/UserAccount"), i = a("model/UserData"), j = a("utils/Log"), k = d(document.body), l = e.extend({
        preRender: function () {
            var b = this.data;
            b.tasks[0].amount = 1, b.tasks[1].amount = 2;
            return {
                title: "\u514d\u8d39\u9886\u53d6\u82b1\u7530\u5e01\u4efb\u52a1",
                bodyContent: f.formatTemplate(a("template/floatbox/moreTaskBox"), b)
            }
        }, bindEvent: function () {
            this._super(), this.$elem.delegate(".getCoin-trigger", "click", d.proxy(this.getCoin, this))
        }, postRender: function () {
            this._super(), this.$elem.addClass("poplayer-moreTask")
        }, getCoin: function (a) {
            var b = d(a.currentTarget), c = this;
            if (!d.isPlainObject(this.getDonateCoins) || this.getDonateCoins.readyState === 4)this.getDonateCoins = g.postJSON("getDonateCoins", {type: b.data("type")}, function (a) {
                var c = parseInt(a.code) || 1;
                c === 1 && (b.parents(".poplayer-item").addClass("stateDone"), b.parent(".stateText").html("\u5df2\u7ecf\u5b8c\u6210"), h.update({
                    userId: i.loginUserId,
                    totalBalance: parseInt(a.totalBalance, 10)
                }))
            }), j.doLog({parameter: {method: "checkin"}, elem: b})
        }
    });
    return l
});
define("template/floatbox/moreTaskBox", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) {
            p.push('<ul class="line"><li class="line1"></li><li class="line2"></li><li class="line3"></li></ul><div class="poplayer-bd"><div class="poplayer-content"><ol class="poplayer-list">');
            for (var i = 1; i <= tasks.length; i++) {
                var item = tasks[i - 1];
                p.push('<li class="poplayer-item '), item.state == 2 && p.push("stateDone"), p.push('"><h3 class="poplayer-moreTask-tag"><span>\u4efb\u52a1', i, '</span></h3><p class="taskText"><em class="signUp-icon-coin"></em>', item.name, '</p><p class="coinText">\u5956\u52b1<span class="text-red">', item.amount, '</span>\u82b1\u7530\u5e01</p><em class="signUp-icon-done"></em>'), item.state == 0 ? (i == 2 ? p.push('<p class="stateText pending">\u5f85\u5b8c\u6210</p>') : (p.push('<p class="stateText"><a target="_blank" href="'), item.link ? p.push("", item.link, "") : p.push("#"), p.push('" data-log="', item.log, '">\u53bb\u5b8c\u6210</a></p>')), p.push("")) : item.state == 1 ? p.push('<p class="stateText"><a class="getCoin-trigger" href="javascript:;" data-type="', item.type, '" data-log="', item.log, '">\u9886\u53d6</a></p>') : item.state == 2 ? p.push('<p class="stateText">\u5df2\u9886\u53d6</p>') : item.state == 3 && p.push('<p class="stateText pending">\u5ba1\u6838\u4e2d</p>'), p.push("</li>")
            }
            p.push("</ol></div></div>")
        }
        return p.join("")
    }
});
define("task/widget/invitation", function (a, b, c) {
    var d = a("task/basic/Task"), e = a("lib/jquery");
    (new d("invitation", function () {
        var a = e("#moduleInvitation");
        if (a.size() !== 0) {
            var b = a.find(".js-tipText"), c = a.find(".js-arrow")[0];
            a.data("num") < 20 && a.delegate(".num-trigger", "mouseover", function (a) {
                var d = parseInt(e(a.target).data("num"), 10);
                switch (d) {
                    case 1:
                        b.html("\u9080\u8bf71\u4e2a\u597d\u53cb\u90013\u5929SVIP\u4f1a\u5458"), c.className = "module-invitation-tip s-arrow1";
                        break;
                    case 5:
                        b.html("\u9080\u8bf75\u4e2a\u597d\u53cb\u900110\u5929SVIP\u4f1a\u5458"), c.className = "module-invitation-tip s-arrow5";
                        break;
                    case 20:
                        b.html("\u9080\u8bf720\u4e2a\u597d\u53cb\u900120\u5929SVIP\u4f1a\u5458"), c.className = "module-invitation-tip s-arrow20"
                }
            })
        }
    })).add()
});
define("task/rightModule/giftBox", function (a, b, c) {
    var d = a("lib/jquery"), e = a("task/basic/Task");
    (new e("giftBox", function () {
        var b = d("#giftBox"), c = b.find(".js-list");
        if (b.size()) {
            var e = a("widget/box/floatBox/GiftBox"), f = a("module/rightModule/gift/list/GiftList"), g = a("model/UserData"), h = a("utils/Utils"), i = a("utils/Log"), j = g.getCurrentUser() || g.getLoginUser(), k = h.userSexName(j.sex), l = g.isLoginUserPage() ? "\u6682\u65f6\u8fd8\u6ca1\u6536\u5230\u793c\u7269" : "ta\u8fd8\u6ca1\u6709\u6536\u5230\u793c\u7269\uff0c\u9001ta\u8d62\u5f97\u597d\u611f".replace(/ta/g, k), m = new f(c, {
                asyncRequest: !0,
                pageContainer: b.find(".js-footer"),
                noResultTips: l,
                loadingType: "small",
                pager: {
                    prevClass: "pages-prev",
                    nextClass: "pages-next",
                    hideClass: "disabled",
                    moreButtonLimit: 1,
                    showNum: !1
                }
            });
            m.render(), b.bind("gift:startLoad", function (a) {
                b.addClass("n-unaltered")
            }), b.bind("gift:loaded", function (a, b) {
                p(b)
            });
            var n = b.find(".js-giftNum"), o = !1;

            function p(a) {
                var d = a.page.totalSize, e = a.page.pageNo, f = '<li class="module-gift-item module-gift-send"><a class="gift-trigger btn-sendGift-m" href="javascript:;"><em class="btn-sendGift-m-icon"></em><span>\u9001\u793c\u7269<em class="u-arrow-left"></em><em class="u-arrow-right"></em></span></a></li>';
                d === 0 ? b.addClass("n-nodata") : b.removeClass("n-nodata"), !g.isLoginUserPage() && d && e && e === 1 && c.prepend(f), o || (b.removeClass("hidden").hide().fadeIn("fast"), o = !0), n.text(d)
            }

            g.isLoginUserPage() || b.delegate(".gift-trigger", "click", function (a) {
                e.getInstance(null, {data: {user: j}}).show(a), i.doLog({
                    parameter: {method: "opengift"},
                    elem: d(a.currentTarget)
                })
            })
        }
    })).add()
});
define("module/rightModule/gift/list/GiftList", function (a, b, c) {
    var d = a("lib/jquery"), e = a("widget/list/BasicItemList"), f = a("module/rightModule/gift/Gift"), g = a("model/UserData"), h = e.extend({
        init: function (a, b) {
            this.userId = (g.getCurrentUser() || g.getLoginUser()).id, this._super(a, b)
        }, bindEvent: function () {
            this._super(), d("body").bind("buyGift:success", d.proxy(this.onBuySuccess, this))
        }, onBuySuccess: function (a) {
            this.pager.initData()
        }, onPageStart: function (a) {
            this.$elem.trigger("gift:startLoad"), this._super(a)
        }, onPageEnd: function (a) {
            this._super(a), this.$elem.trigger("gift:loaded", [a])
        }, buildUrl: function () {
            return "giftBoxList"
        }, buildParam: function (a) {
            return {userid: this.userId, pageSize: !g.isLoginUserPage() && a && a == 1 ? 8 : 9}
        }, showEmpty: function () {
            var a = this.config.noResultTips;
            this.$emptyElem ? this.$emptyElem.html(a) : this.$emptyElem = d('<p class="common-tips">' + a + "</p>"), this.$emptyElem.appendTo(this.$elem)
        }, newItem: function (a, b) {
            return new f(a, b)
        }
    });
    return h
});
define("widget/list/BasicItemList", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("basic/Class"), f = a("model/UserData"), g = a("utils/Utils"), h = a("widget/AjaxPager"), i = a("widget/AutoPager"), j = e.extend({
        defaults: {
            asyncRequest: !1,
            autoMoreCount: 2,
            updateUserData: !0,
            isUserList: !1,
            noResultTips: "\u5217\u8868\u65e0\u6570\u636e\uff01",
            loadingType: "big",
            loadingText: null,
            pageType: "page",
            pager: {className: "big"}
        }, init: function (a, b) {
            this.$elem = a, b.pager = d.extend({}, this.defaults.pager, b.pager), this.config = d.extend({}, this.defaults, b), this.data = this.config.data || null, this.dataBase = {}, this.itemList = {}, this.inited = !1, this.isBindEvent = !1, this.$emptyElem = null, this.config.loadingType === "big" ? this.$loadingElem = d(g.LOADING_BIG(this.config.loadingText)) : this.$loadingElem = d(g.LOADING_SMALL(this.config.loadingText))
        }, render: function () {
            if (!this.$elem) {
                var a = this.preRender(), b = d.extend(a, this.data);
                this.$elem = this.renderTmpl(b)
            }
            this.isBindEvent || (this.postRender(), this.bindEvent(), this.isBindEvent = !0);
            return this.$elem
        }, renderTmpl: function () {
        }, preRender: function () {
            return {}
        }, postRender: function () {
            if (this.config.asyncRequest) {
                var a = d("#data_" + this.buildUrl());
                a.size() > 0 && a.remove()
            }
            this.pager = this.initPager(), this.pager.render(), this.pager.initData()
        }, bindEvent: function () {
            this.$elem.bind("item:delete", d.proxy(this.onDelete, this))
        }, initPager: function () {
            var a = d.extend({}, {
                buildUrl: d.proxy(this.buildUrl, this),
                buildParam: d.proxy(this.buildParam, this),
                pageStart: d.proxy(this.onPageStart, this),
                pageEnd: d.proxy(this.onPageEnd, this)
            }, this.config.pager);
            if (this.config.pageType === "page")return new h(this.config.pageContainer, a);
            a.autoMoreCount = this.config.autoMoreCount;
            return new i(this.config.pageContainer, a)
        }, isFirstPage: function () {
            if (this.isViewMoreFirstPage() || this.isViewPageFirstPage())return !0;
            return !1
        }, isViewMoreFirstPage: function () {
            if (this.pager.config.pageMethod === "more" && this.pager.config.autoMoreCount === this.config.autoMoreCount)return !0;
            return !1
        }, isViewPageFirstPage: function () {
            if (this.pager.config.pageMethod === "page" && this.pager.config.pageNo === 1)return !0;
            return !1
        }, buildUrl: function () {
            throw"Abstract Method!!!"
        }, buildParam: function () {
            return {}
        }, wrap: function (a) {
            return a
        }, unwrap: function (a) {
            return a
        }, onPageStart: function (a) {
            var b = this.pager.config;
            this.hideEmpty(), this.inited ? b.pageMethod === "page" ? this.showLoading() : this.$elem.children().filter(".pageLine").removeClass("pageLine").end().last().addClass("pageLine") : this.config.asyncRequest && this.showLoading()
        }, onPageLoaded: function (a) {
            var b = this.pager.config;
            (!this.inited && this.config.asyncRequest || b.pageMethod === "more" && b.autoMoreCount === this.config.autoMoreCount || b.pageMethod === "page") && this.hideLoading(), b.pageMethod === "page" && (this.itemList = {});
            if (a.list.length === 0) {
                this.checkEmpty(), this.inited = !0;
                return !1
            }
            this.updateDataBase(a.list);
            if (!this.inited && !this.config.asyncRequest) {
                var c = this.$elem.find("> .js-item");
                this.addList(c, "sync")
            } else this.$elem.append(this.addList(a.list, "async"));
            this.inited = !0;
            return !0
        }, onPageEnd: function (a) {
            !this.onPageLoaded(a)
        }, addList: function (a, b) {
            if (b === "sync")return this.addSyncList(a);
            if (a.length !== 0)return this.addAsyncList(a)
        }, addSyncList: function (a) {
            var b = this;
            d.each(a, function (a, c) {
                var e = d(c), f = e.attr("data-item-id");
                typeof f != "undefined" && b.add(e, b.getItemData(f))
            })
        }, addAsyncList: function (a) {
            var b = this, c = document.createDocumentFragment();
            this.addListItems = [], a = this.wrapArray(a), d.each(a, function (a, d) {
                var e = b.add(d.id, d)[0];
                c.appendChild(e), b.addListItems.push(e)
            });
            return c
        }, add: function (a, b) {
            var c = this.newItem(a, {data: b}), d = c.render();
            c.data.id && (this.itemList[c.data.id] = c);
            if (typeof a != "string")return d;
            return this.wrap(d)
        }, newItem: function () {
            throw"Abstract Method!!!"
        }, showNewList: function () {
            d.each(this.addListItems, function (a, b) {
                d(b).fadeIn(800)
            })
        }, hideNewList: function () {
            d.each(this.addListItems, function (a, b) {
                d(b).hide()
            })
        }, updataNew: function (a, b) {
            this.updateDataBase(b), this.hideEmpty();
            var c = this.addList(b, "async");
            this.hideNewList();
            var d = this.$elem.find("> .js-item").first();
            d.size() !== 0 ? d.before(c) : this.$elem.append(c), this.showNewList()
        }, wrapArray: function (a) {
            if (!d.isArray(a)) {
                var b = a;
                a = [], a.push(b)
            }
            return a
        }, onDelete: function (a, b) {
            this.itemList[b.id] && (this.doRemove(b), this.removeData(b.id))
        }, doRemove: function (a) {
            this.remove(a), setTimeout(d.proxy(function () {
                this.checkRemove()
            }, this), 100)
        }, doSliderRemove: function (a) {
            this.sliderRemove(a, d.proxy(function () {
                this.checkRemove()
            }, this))
        }, removeData: function (a) {
            try {
                delete this.itemList[a], delete this.dataBase[a]
            } catch (b) {
                this.itemList[a] = null, this.dataBase[a] = null
            }
        }, remove: function (a) {
            this.unwrap(a.render()).remove()
        }, sliderRemove: function (a, b) {
            var c = this, d = this.unwrap(a.render());
            d.slideUp(1e3, "easeInOutExpo", function () {
                c.remove(a), b && b()
            })
        }, checkRemove: function () {
            var a = this.pager.config;
            (a.pageMethod === "more" || this.isViewPageFirstPage()) && this.checkEmpty()
        }, checkEmpty: function () {
            this.$elem.children().size() === 0 ? this.showEmpty() : this.hideEmpty()
        }, showEmpty: function () {
            var b = this.config.noResultTips;
            if (!this.$emptyElem) {
                var c = a("widget/tips/NoResultTips");
                this.$emptyElem = (new c({content: b})).render()
            } else this.$emptyElem.find(".js-text").html(b);
            this.$emptyElem.appendTo(this.$elem)
        }, hideEmpty: function () {
            this.$emptyElem && this.$emptyElem.detach()
        }, showLoading: function () {
            this.$elem.empty(), this.$loadingElem.appendTo(this.$elem)
        }, hideLoading: function () {
            this.$loadingElem && this.$loadingElem.detach()
        }, updateDataBase: function (a) {
            var b = this;
            a = this.wrapArray(a), d.each(a, function (a, c) {
                b.setItemData(c)
            })
        }, setItemData: function (a) {
            var b = this.config.isUserList ? a : a.user;
            this.config.updateUserData && b && (typeof b != "string" && (b = f.update(b)), a.user = f.get(b));
            var c = a.id, e = this.dataBase[c];
            c && (this.dataBase[c] = d.extend(e, a))
        }, getItemData: function (a) {
            return this.dataBase[a] || null
        }, getItemByUserId: function (a) {
            for (var b in this.dataBase)if (this.dataBase[b].user && this.dataBase[b].user.id === a)return this.dataBase[b];
            return null
        }, clearData: function () {
            this.itemList = {}, this.dataBase = {}
        }, initData: function () {
            this.clearData(), this.pager.initData()
        }
    });
    return j
});
define("module/rightModule/gift/Gift", function (a, b, c) {
    var d = a("lib/jquery"), e = a("widget/Item"), f = a("utils/tmpl"), g = a("widget/box/floatBox/GiftBox"), h = a("model/UserData"), i = a("utils/Log"), j = e.extend({
        init: function (a, b) {
            this._super(a, b)
        }, bindEvent: function () {
            this._super(), h.isLoginUserPage() || this.$elem.delegate(".giftItem-trigger", "click", d.proxy(this.onSendGift, this))
        }, onSendGift: function (a) {
            var b = h.getCurrentUser();
            g.getInstance(null, {data: {user: b}}).show(a, this.data.gift.id), i.doLog({
                parameter: {method: "opengift"},
                elem: d(a.currentTarget)
            })
        }, renderTmpl: function (b) {
            b.loginUser = h.getLoginUser(), b = this.parseData(b);
            return d(f.formatTemplate(a("template/rightModule/giftBox/giftBoxItem"), b))
        }, parseData: function (a) {
            return a
        }
    });
    return j
});
define("template/rightModule/giftBox/giftBoxItem", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData)p.push('<li class="module-gift-item js-item" data-item-id="', id, '"><div class="module-gift-imgBox giftItem-trigger"><img src="', gift.icon, '" alt="', gift.name, '" /></div><div class="module-gift-infoBox giftItem-trigger"><i class="n-ui-valign"></i><span class="module-gift-info">', gift.name, ""), gift.name != "\u73ab\u7470\u82b1" && p.push("<br />\u9ad8\u7ea7\u4f1a\u5458\u514d\u8d39\u4f7f\u7528"), p.push("</span></div></li>");
        return p.join("")
    }
});
define("task/widget/adBanner", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("task/basic/Task"), f = a("utils/DataSource"), g = a("utils/tmpl"), h = d(window), i = d(document.body);
    (new e("adBanner", function () {
        var b = [{type: "r1", template: "pic", keyfrom: "svipAd"}, {
            type: "r2",
            template: "pic",
            keyfrom: "feaAd"
        }, {type: "a1", template: "picTitle", keyfrom: "eventPicAd"}, {
            type: "a2",
            template: "textList",
            keyfrom: "eventTextAd"
        }, {type: "hz", template: "picList", keyfrom: "busAd"}, {
            type: "topic",
            template: "picList",
            keyfrom: "topicAd"
        }, {type: "xunren", template: "pic", keyfrom: "xunrenAd"}, {
            type: "webSponsor",
            template: "picRight",
            keyfrom: "sliderAd"
        }], c = [], e = [];
        for (var h = 0; h < b.length; h++) {
            var i = b[h], j = d(".js-adBanner-" + i.type);
            j.size() > 0 && (c.push(d.extend(i, {elem: j})), e.push(i.type))
        }
        c.length > 0 && f.postJSON("adBannerList", {types: e.join(",")}, function (b) {
            if (b && b.adMap)for (var e = 0; e < c.length; e++) {
                var f = b.adMap[c[e].type];
                if (f.length > 0) {
                    var h = g.formatTemplate(a("template/widget/adBanner/adBannerContent"), {
                        dataList: f,
                        dataConfig: c[e]
                    });
                    c[e].elem.html(h), c[e].elem.show(), d(".js-adBannerBox-" + c[e].type).show()
                }
            }
        })
    })).add()
});
define("template/widget/adBanner/adBannerContent", function (require) {
    return function (tmplData) {
        var p = [];
        tmplData = tmplData || {};
        with (tmplData) {
            p.push("");
            if (dataConfig.template == "picTitle") {
                p.push("");
                for (var i = 0, len = dataList.length; i < len && i < 1; i++)p.push('<div class="module-activities-imgBox" data-log="', dataConfig.keyfrom, '"><a href="', dataList[i].targetUrl, '" target="_blank"><img src="', dataList[i].picUrl, '"/></a><div class="module-activities-imgTitle"><i></i><a href="', dataList[i].targetUrl, '" target="_blank">', dataList[i].title, "</a></div></div>");
                p.push("")
            } else if (dataConfig.template == "textList") {
                p.push("");
                for (var i = 0, len = dataList.length; i < len && i < 3; i++)p.push('<li><a class="text-st" href="', dataList[i].targetUrl, '" target="_blank" data-log="', dataConfig.keyfrom, "", i + 1, '">', dataList[i].title, "</a></li>");
                p.push("")
            } else if (dataConfig.template == "picList") {
                p.push("");
                for (var i = 0, len = dataList.length; i < len && i < 3; i++)p.push('<li data-log="', dataConfig.keyfrom, "", i + 1, '"><a href="', dataList[i].targetUrl, '" target="_blank"><img src="', dataList[i].picUrl, '"></a></li>');
                p.push("")
            } else if (dataConfig.template == "pic") {
                p.push("");
                for (var i = 0, len = dataList.length; i < len && i < 1; i++)p.push('<a href="', dataList[i].targetUrl, '" target="_blank" data-log="', dataConfig.keyfrom, '"><img src="', dataList[i].picUrl, '"/></a>');
                p.push("")
            } else if (dataConfig.template == "picRight") {
                p.push("");
                for (var i = 0; i < dataList.length; i++)p.push('<div class="slider-ad"><div class="slider-ad-module"><div class="slider-ad-module-bd"><div class="slider-ad-module-content"><a target="_blank" href="', dataList[i].targetUrl, '" data-log="', dataConfig.keyfrom, '"><img src="', dataList[i].picUrl, '" /></a></div></div></div></div>');
                p.push("")
            }
            p.push("")
        }
        return p.join("")
    }
});
define("task/widget/userGuide", function (a, b, c) {
    "use strict";
    var d = a("lib/jquery"), e = a("task/basic/Task"), f = d(window), g = d(document.body);
    (new e("userGuide", function () {
        var a = d("#rightUserGuide"), b = a.find(".js-guide-wx");
        a.size() > 0 && b.size() > 0 && (a.delegate(".user-guide-trigger", "click", function (a) {
            a.stopPropagation(), b.addClass("n-show")
        }), g.bind("click", function (a) {
            b.hasClass("n-show") && b.removeClass("n-show")
        }))
    })).add()
});
define("page/feed", function (a, b, c) {
    a("task/page/feed/lazyImage"), a("task/group/common"), a("task/page/feed/vipEntry"), a("task/page/feed/filter"), a("task/page/feed/feedList"), a("task/page/feed/feedGuide"), a("task/widget/tips"), a("task/rightModule/goodNews"), a("task/widget/topBanner"), a("task/group/right"), a("task/basic/TaskManager").run()
});