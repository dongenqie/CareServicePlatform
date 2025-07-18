!function() {
    function e(e, t, r, n) {
        Object.defineProperty(e, t, {
            get: r,
            set: n,
            enumerable: !0,
            configurable: !0
        })
    }
    function t(e) {
        return e && e.__esModule ? e.default : e
    }
    var r = {};
    function n(e) {
        if (void 0 === e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    function o(e, t, r, n, o, i, a) {
        try {
            var s = e[i](a)
              , c = s.value
        } catch (e) {
            return void r(e)
        }
        s.done ? t(c) : Promise.resolve(c).then(n, o)
    }
    function i(e) {
        return function() {
            var t = this
              , r = arguments;
            return new Promise((function(n, i) {
                var a = e.apply(t, r);
                function s(e) {
                    o(a, n, i, s, c, "next", e)
                }
                function c(e) {
                    o(a, n, i, s, c, "throw", e)
                }
                s(void 0)
            }
            ))
        }
    }
    function a(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    function s(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n)
        }
    }
    function c(e, t, r) {
        return t && s(e.prototype, t),
        r && s(e, r),
        e
    }
    function l(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r,
        e
    }
    function u(e, t) {
        return (u = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t,
            e
        }
        )(e, t)
    }
    function d(e, t) {
        return u(e, t)
    }
    function h(e, t) {
        if ("function" != typeof t && null !== t)
            throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }),
        t && d(e, t)
    }
    function p(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {}
              , n = Object.keys(r);
            "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(r).filter((function(e) {
                return Object.getOwnPropertyDescriptor(r, e).enumerable
            }
            )))),
            n.forEach((function(t) {
                l(e, t, r[t])
            }
            ))
        }
        return e
    }
    function f(e) {
        if (Array.isArray(e))
            return e
    }
    function v(e) {
        if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
            return Array.from(e)
    }
    function g() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    function m(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = new Array(t); r < t; r++)
            n[r] = e[r];
        return n
    }
    function _(e, t) {
        if (e) {
            if ("string" == typeof e)
                return m(e, t);
            var r = Object.prototype.toString.call(e).slice(8, -1);
            return "Object" === r && e.constructor && (r = e.constructor.name),
            "Map" === r || "Set" === r ? Array.from(r) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? m(e, t) : void 0
        }
    }
    function b(e, t) {
        return f(e) || v(e) || _(e, t) || g()
    }
    function y(e) {
        if (Array.isArray(e))
            return m(e)
    }
    function k() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    function w(e) {
        return y(e) || v(e) || _(e) || k()
    }
    function x() {
        if ("undefined" == typeof Reflect || !Reflect.construct)
            return !1;
        if (Reflect.construct.sham)
            return !1;
        if ("function" == typeof Proxy)
            return !0;
        try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
            ))),
            !0
        } catch (e) {
            return !1
        }
    }
    function C(e) {
        return (C = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }
        )(e)
    }
    function S(e) {
        return C(e)
    }
    function j(e) {
        return e && e.constructor === Symbol ? "symbol" : typeof e
    }
    function L(e, t) {
        return !t || "object" !== j(t) && "function" != typeof t ? n(e) : t
    }
    function M(e) {
        var t = x();
        return function() {
            var r, n = S(e);
            if (t) {
                var o = S(this).constructor;
                r = Reflect.construct(n, arguments, o)
            } else
                r = n.apply(this, arguments);
            return L(this, r)
        }
    }
    e(r, "Picker", (function() {
        return Dt
    }
    )),
    e(r, "Emoji", (function() {
        return tt
    }
    )),
    e(r, "FrequentlyUsed", (function() {
        return ke
    }
    )),
    e(r, "SafeFlags", (function() {
        return De
    }
    )),
    e(r, "SearchIndex", (function() {
        return Ie
    }
    )),
    e(r, "Store", (function() {
        return he
    }
    )),
    e(r, "init", (function() {
        return Pe
    }
    )),
    e(r, "Data", (function() {
        return Ce
    }
    )),
    e(r, "I18n", (function() {
        return xe
    }
    )),
    e(r, "getEmojiDataFromNative", (function() {
        return Ne
    }
    ));
    var z = {}
      , E = function(e) {
        "use strict";
        var t, r = Object.prototype, n = r.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", s = o.toStringTag || "@@toStringTag";
        function c(e, t, r) {
            return Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }),
            e[t]
        }
        try {
            c({}, "")
        } catch (e) {
            c = function(e, t, r) {
                return e[t] = r
            }
        }
        function l(e, t, r, n) {
            var o = t && t.prototype instanceof g ? t : g
              , i = Object.create(o.prototype)
              , a = new M(n || []);
            return i._invoke = function(e, t, r) {
                var n = d;
                return function(o, i) {
                    if (n === p)
                        throw new Error("Generator is already running");
                    if (n === f) {
                        if ("throw" === o)
                            throw i;
                        return E()
                    }
                    for (r.method = o,
                    r.arg = i; ; ) {
                        var a = r.delegate;
                        if (a) {
                            var s = S(a, r);
                            if (s) {
                                if (s === v)
                                    continue;
                                return s
                            }
                        }
                        if ("next" === r.method)
                            r.sent = r._sent = r.arg;
                        else if ("throw" === r.method) {
                            if (n === d)
                                throw n = f,
                                r.arg;
                            r.dispatchException(r.arg)
                        } else
                            "return" === r.method && r.abrupt("return", r.arg);
                        n = p;
                        var c = u(e, t, r);
                        if ("normal" === c.type) {
                            if (n = r.done ? f : h,
                            c.arg === v)
                                continue;
                            return {
                                value: c.arg,
                                done: r.done
                            }
                        }
                        "throw" === c.type && (n = f,
                        r.method = "throw",
                        r.arg = c.arg)
                    }
                }
            }(e, r, a),
            i
        }
        function u(e, t, r) {
            try {
                return {
                    type: "normal",
                    arg: e.call(t, r)
                }
            } catch (e) {
                return {
                    type: "throw",
                    arg: e
                }
            }
        }
        e.wrap = l;
        var d = "suspendedStart"
          , h = "suspendedYield"
          , p = "executing"
          , f = "completed"
          , v = {};
        function g() {}
        function m() {}
        function _() {}
        var b = {};
        c(b, i, (function() {
            return this
        }
        ));
        var y = Object.getPrototypeOf
          , k = y && y(y(z([])));
        k && k !== r && n.call(k, i) && (b = k);
        var w = _.prototype = g.prototype = Object.create(b);
        function x(e) {
            ["next", "throw", "return"].forEach((function(t) {
                c(e, t, (function(e) {
                    return this._invoke(t, e)
                }
                ))
            }
            ))
        }
        function C(e, t) {
            function r(o, i, a, s) {
                var c = u(e[o], e, i);
                if ("throw" !== c.type) {
                    var l = c.arg
                      , d = l.value;
                    return d && "object" == typeof d && n.call(d, "__await") ? t.resolve(d.__await).then((function(e) {
                        r("next", e, a, s)
                    }
                    ), (function(e) {
                        r("throw", e, a, s)
                    }
                    )) : t.resolve(d).then((function(e) {
                        l.value = e,
                        a(l)
                    }
                    ), (function(e) {
                        return r("throw", e, a, s)
                    }
                    ))
                }
                s(c.arg)
            }
            var o;
            this._invoke = function(e, n) {
                function i() {
                    return new t((function(t, o) {
                        r(e, n, t, o)
                    }
                    ))
                }
                return o = o ? o.then(i, i) : i()
            }
        }
        function S(e, r) {
            var n = e.iterator[r.method];
            if (n === t) {
                if (r.delegate = null,
                "throw" === r.method) {
                    if (e.iterator.return && (r.method = "return",
                    r.arg = t,
                    S(e, r),
                    "throw" === r.method))
                        return v;
                    r.method = "throw",
                    r.arg = new TypeError("The iterator does not provide a 'throw' method")
                }
                return v
            }
            var o = u(n, e.iterator, r.arg);
            if ("throw" === o.type)
                return r.method = "throw",
                r.arg = o.arg,
                r.delegate = null,
                v;
            var i = o.arg;
            return i ? i.done ? (r[e.resultName] = i.value,
            r.next = e.nextLoc,
            "return" !== r.method && (r.method = "next",
            r.arg = t),
            r.delegate = null,
            v) : i : (r.method = "throw",
            r.arg = new TypeError("iterator result is not an object"),
            r.delegate = null,
            v)
        }
        function j(e) {
            var t = {
                tryLoc: e[0]
            };
            1 in e && (t.catchLoc = e[1]),
            2 in e && (t.finallyLoc = e[2],
            t.afterLoc = e[3]),
            this.tryEntries.push(t)
        }
        function L(e) {
            var t = e.completion || {};
            t.type = "normal",
            delete t.arg,
            e.completion = t
        }
        function M(e) {
            this.tryEntries = [{
                tryLoc: "root"
            }],
            e.forEach(j, this),
            this.reset(!0)
        }
        function z(e) {
            if (e) {
                var r = e[i];
                if (r)
                    return r.call(e);
                if ("function" == typeof e.next)
                    return e;
                if (!isNaN(e.length)) {
                    var o = -1
                      , a = function r() {
                        for (; ++o < e.length; )
                            if (n.call(e, o))
                                return r.value = e[o],
                                r.done = !1,
                                r;
                        return r.value = t,
                        r.done = !0,
                        r
                    };
                    return a.next = a
                }
            }
            return {
                next: E
            }
        }
        function E() {
            return {
                value: t,
                done: !0
            }
        }
        return m.prototype = _,
        c(w, "constructor", _),
        c(_, "constructor", m),
        m.displayName = c(_, s, "GeneratorFunction"),
        e.isGeneratorFunction = function(e) {
            var t = "function" == typeof e && e.constructor;
            return !!t && (t === m || "GeneratorFunction" === (t.displayName || t.name))
        }
        ,
        e.mark = function(e) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(e, _) : (e.__proto__ = _,
            c(e, s, "GeneratorFunction")),
            e.prototype = Object.create(w),
            e
        }
        ,
        e.awrap = function(e) {
            return {
                __await: e
            }
        }
        ,
        x(C.prototype),
        c(C.prototype, a, (function() {
            return this
        }
        )),
        e.AsyncIterator = C,
        e.async = function(t, r, n, o, i) {
            void 0 === i && (i = Promise);
            var a = new C(l(t, r, n, o),i);
            return e.isGeneratorFunction(r) ? a : a.next().then((function(e) {
                return e.done ? e.value : a.next()
            }
            ))
        }
        ,
        x(w),
        c(w, s, "Generator"),
        c(w, i, (function() {
            return this
        }
        )),
        c(w, "toString", (function() {
            return "[object Generator]"
        }
        )),
        e.keys = function(e) {
            var t = [];
            for (var r in e)
                t.push(r);
            return t.reverse(),
            function r() {
                for (; t.length; ) {
                    var n = t.pop();
                    if (n in e)
                        return r.value = n,
                        r.done = !1,
                        r
                }
                return r.done = !0,
                r
            }
        }
        ,
        e.values = z,
        M.prototype = {
            constructor: M,
            reset: function(e) {
                if (this.prev = 0,
                this.next = 0,
                this.sent = this._sent = t,
                this.done = !1,
                this.delegate = null,
                this.method = "next",
                this.arg = t,
                this.tryEntries.forEach(L),
                !e)
                    for (var r in this)
                        "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t)
            },
            stop: function() {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type)
                    throw e.arg;
                return this.rval
            },
            dispatchException: function(e) {
                if (this.done)
                    throw e;
                var r = this;
                function o(n, o) {
                    return s.type = "throw",
                    s.arg = e,
                    r.next = n,
                    o && (r.method = "next",
                    r.arg = t),
                    !!o
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var a = this.tryEntries[i]
                      , s = a.completion;
                    if ("root" === a.tryLoc)
                        return o("end");
                    if (a.tryLoc <= this.prev) {
                        var c = n.call(a, "catchLoc")
                          , l = n.call(a, "finallyLoc");
                        if (c && l) {
                            if (this.prev < a.catchLoc)
                                return o(a.catchLoc, !0);
                            if (this.prev < a.finallyLoc)
                                return o(a.finallyLoc)
                        } else if (c) {
                            if (this.prev < a.catchLoc)
                                return o(a.catchLoc, !0)
                        } else {
                            if (!l)
                                throw new Error("try statement without catch or finally");
                            if (this.prev < a.finallyLoc)
                                return o(a.finallyLoc)
                        }
                    }
                }
            },
            abrupt: function(e, t) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                    var o = this.tryEntries[r];
                    if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                        var i = o;
                        break
                    }
                }
                i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
                var a = i ? i.completion : {};
                return a.type = e,
                a.arg = t,
                i ? (this.method = "next",
                this.next = i.finallyLoc,
                v) : this.complete(a)
            },
            complete: function(e, t) {
                if ("throw" === e.type)
                    throw e.arg;
                return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg,
                this.method = "return",
                this.next = "end") : "normal" === e.type && t && (this.next = t),
                v
            },
            finish: function(e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var r = this.tryEntries[t];
                    if (r.finallyLoc === e)
                        return this.complete(r.completion, r.afterLoc),
                        L(r),
                        v
                }
            },
            catch: function(e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var r = this.tryEntries[t];
                    if (r.tryLoc === e) {
                        var n = r.completion;
                        if ("throw" === n.type) {
                            var o = n.arg;
                            L(r)
                        }
                        return o
                    }
                }
                throw new Error("illegal catch attempt")
            },
            delegateYield: function(e, r, n) {
                return this.delegate = {
                    iterator: z(e),
                    resultName: r,
                    nextLoc: n
                },
                "next" === this.method && (this.arg = t),
                v
            }
        },
        e
    }(z);
    try {
        regeneratorRuntime = E
    } catch (e) {
        "object" == typeof globalThis ? globalThis.regeneratorRuntime = E : Function("r", "regeneratorRuntime = r")(E)
    }
    var P, R, O, B, A, T, H = {}, I = [], D = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    function F(e, t) {
        for (var r in t)
            e[r] = t[r];
        return e
    }
    function V(e) {
        var t = e.parentNode;
        t && t.removeChild(e)
    }
    function U(e, t, r) {
        var n, o, i, a = {};
        for (i in t)
            "key" == i ? n = t[i] : "ref" == i ? o = t[i] : a[i] = t[i];
        if (arguments.length > 2 && (a.children = arguments.length > 3 ? P.call(arguments, 2) : r),
        "function" == typeof e && null != e.defaultProps)
            for (i in e.defaultProps)
                void 0 === a[i] && (a[i] = e.defaultProps[i]);
        return N(e, a, n, o, null)
    }
    function N(e, t, r, n, o) {
        var i = {
            type: e,
            props: t,
            key: r,
            ref: n,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            __h: null,
            constructor: void 0,
            __v: null == o ? ++O : o
        };
        return null == o && null != R.vnode && R.vnode(i),
        i
    }
    function q(e) {
        return e.children
    }
    function W(e, t) {
        this.props = e,
        this.context = t
    }
    function G(e, t) {
        if (null == t)
            return e.__ ? G(e.__, e.__.__k.indexOf(e) + 1) : null;
        for (var r; t < e.__k.length; t++)
            if (null != (r = e.__k[t]) && null != r.__e)
                return r.__e;
        return "function" == typeof e.type ? G(e) : null
    }
    function K(e) {
        var t, r;
        if (null != (e = e.__) && null != e.__c) {
            for (e.__e = e.__c.base = null,
            t = 0; t < e.__k.length; t++)
                if (null != (r = e.__k[t]) && null != r.__e) {
                    e.__e = e.__c.base = r.__e;
                    break
                }
            return K(e)
        }
    }
    function $(e) {
        (!e.__d && (e.__d = !0) && B.push(e) && !X.__r++ || T !== R.debounceRendering) && ((T = R.debounceRendering) || A)(X)
    }
    function X() {
        for (var e; X.__r = B.length; )
            e = B.sort((function(e, t) {
                return e.__v.__b - t.__v.__b
            }
            )),
            B = [],
            e.some((function(e) {
                var t, r, n, o, i, a;
                e.__d && (i = (o = (t = e).__v).__e,
                (a = t.__P) && (r = [],
                (n = F({}, o)).__v = o.__v + 1,
                oe(a, o, n, t.__n, void 0 !== a.ownerSVGElement, null != o.__h ? [i] : null, r, null == i ? G(o) : i, o.__h),
                ie(r, o),
                o.__e != i && K(o)))
            }
            ))
    }
    function Y(e, t, r, n, o, i, a, s, c, l) {
        var u, d, h, p, f, v, g, m = n && n.__k || I, _ = m.length;
        for (r.__k = [],
        u = 0; u < t.length; u++)
            if (null != (p = r.__k[u] = null == (p = t[u]) || "boolean" == typeof p ? null : "string" == typeof p || "number" == typeof p || "bigint" == (void 0 === p ? "undefined" : j(p)) ? N(null, p, null, null, p) : Array.isArray(p) ? N(q, {
                children: p
            }, null, null, null) : p.__b > 0 ? N(p.type, p.props, p.key, null, p.__v) : p)) {
                if (p.__ = r,
                p.__b = r.__b + 1,
                null === (h = m[u]) || h && p.key == h.key && p.type === h.type)
                    m[u] = void 0;
                else
                    for (d = 0; d < _; d++) {
                        if ((h = m[d]) && p.key == h.key && p.type === h.type) {
                            m[d] = void 0;
                            break
                        }
                        h = null
                    }
                oe(e, p, h = h || H, o, i, a, s, c, l),
                f = p.__e,
                (d = p.ref) && h.ref != d && (g || (g = []),
                h.ref && g.push(h.ref, null, p),
                g.push(d, p.__c || f, p)),
                null != f ? (null == v && (v = f),
                "function" == typeof p.type && p.__k === h.__k ? p.__d = c = J(p, c, e) : c = Q(e, p, h, m, f, c),
                "function" == typeof r.type && (r.__d = c)) : c && h.__e == c && c.parentNode != e && (c = G(h))
            }
        for (r.__e = v,
        u = _; u--; )
            null != m[u] && ("function" == typeof r.type && null != m[u].__e && m[u].__e == r.__d && (r.__d = G(n, u + 1)),
            se(m[u], m[u]));
        if (g)
            for (u = 0; u < g.length; u++)
                ae(g[u], g[++u], g[++u])
    }
    function J(e, t, r) {
        for (var n, o = e.__k, i = 0; o && i < o.length; i++)
            (n = o[i]) && (n.__ = e,
            t = "function" == typeof n.type ? J(n, t, r) : Q(r, n, n, o, n.__e, t));
        return t
    }
    function Z(e, t) {
        return t = t || [],
        null == e || "boolean" == typeof e || (Array.isArray(e) ? e.some((function(e) {
            Z(e, t)
        }
        )) : t.push(e)),
        t
    }
    function Q(e, t, r, n, o, i) {
        var a, s, c;
        if (void 0 !== t.__d)
            a = t.__d,
            t.__d = void 0;
        else if (null == r || o != i || null == o.parentNode)
            e: if (null == i || i.parentNode !== e)
                e.appendChild(o),
                a = null;
            else {
                for (s = i,
                c = 0; (s = s.nextSibling) && c < n.length; c += 2)
                    if (s == o)
                        break e;
                e.insertBefore(o, i),
                a = i
            }
        return void 0 !== a ? a : o.nextSibling
    }
    function ee(e, t, r) {
        "-" === t[0] ? e.setProperty(t, r) : e[t] = null == r ? "" : "number" != typeof r || D.test(t) ? r : r + "px"
    }
    function te(e, t, r, n, o) {
        var i;
        e: if ("style" === t)
            if ("string" == typeof r)
                e.style.cssText = r;
            else {
                if ("string" == typeof n && (e.style.cssText = n = ""),
                n)
                    for (t in n)
                        r && t in r || ee(e.style, t, "");
                if (r)
                    for (t in r)
                        n && r[t] === n[t] || ee(e.style, t, r[t])
            }
        else if ("o" === t[0] && "n" === t[1])
            i = t !== (t = t.replace(/Capture$/, "")),
            t = t.toLowerCase()in e ? t.toLowerCase().slice(2) : t.slice(2),
            e.l || (e.l = {}),
            e.l[t + i] = r,
            r ? n || e.addEventListener(t, i ? ne : re, i) : e.removeEventListener(t, i ? ne : re, i);
        else if ("dangerouslySetInnerHTML" !== t) {
            if (o)
                t = t.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
            else if ("href" !== t && "list" !== t && "form" !== t && "tabIndex" !== t && "download" !== t && t in e)
                try {
                    e[t] = null == r ? "" : r;
                    break e
                } catch (e) {}
            "function" == typeof r || (null != r && (!1 !== r || "a" === t[0] && "r" === t[1]) ? e.setAttribute(t, r) : e.removeAttribute(t))
        }
    }
    function re(e) {
        this.l[e.type + !1](R.event ? R.event(e) : e)
    }
    function ne(e) {
        this.l[e.type + !0](R.event ? R.event(e) : e)
    }
    function oe(e, t, r, n, o, i, a, s, c) {
        var l, u, d, h, p, f, v, g, m, _, b, y = t.type;
        if (void 0 !== t.constructor)
            return null;
        null != r.__h && (c = r.__h,
        s = t.__e = r.__e,
        t.__h = null,
        i = [s]),
        (l = R.__b) && l(t);
        try {
            e: if ("function" == typeof y) {
                if (g = t.props,
                m = (l = y.contextType) && n[l.__c],
                _ = l ? m ? m.props.value : l.__ : n,
                r.__c ? v = (u = t.__c = r.__c).__ = u.__E : ("prototype"in y && y.prototype.render ? t.__c = u = new y(g,_) : (t.__c = u = new W(g,_),
                u.constructor = y,
                u.render = ce),
                m && m.sub(u),
                u.props = g,
                u.state || (u.state = {}),
                u.context = _,
                u.__n = n,
                d = u.__d = !0,
                u.__h = []),
                null == u.__s && (u.__s = u.state),
                null != y.getDerivedStateFromProps && (u.__s == u.state && (u.__s = F({}, u.__s)),
                F(u.__s, y.getDerivedStateFromProps(g, u.__s))),
                h = u.props,
                p = u.state,
                d)
                    null == y.getDerivedStateFromProps && null != u.componentWillMount && u.componentWillMount(),
                    null != u.componentDidMount && u.__h.push(u.componentDidMount);
                else {
                    if (null == y.getDerivedStateFromProps && g !== h && null != u.componentWillReceiveProps && u.componentWillReceiveProps(g, _),
                    !u.__e && null != u.shouldComponentUpdate && !1 === u.shouldComponentUpdate(g, u.__s, _) || t.__v === r.__v) {
                        u.props = g,
                        u.state = u.__s,
                        t.__v !== r.__v && (u.__d = !1),
                        u.__v = t,
                        t.__e = r.__e,
                        t.__k = r.__k,
                        t.__k.forEach((function(e) {
                            e && (e.__ = t)
                        }
                        )),
                        u.__h.length && a.push(u);
                        break e
                    }
                    null != u.componentWillUpdate && u.componentWillUpdate(g, u.__s, _),
                    null != u.componentDidUpdate && u.__h.push((function() {
                        u.componentDidUpdate(h, p, f)
                    }
                    ))
                }
                u.context = _,
                u.props = g,
                u.state = u.__s,
                (l = R.__r) && l(t),
                u.__d = !1,
                u.__v = t,
                u.__P = e,
                l = u.render(u.props, u.state, u.context),
                u.state = u.__s,
                null != u.getChildContext && (n = F(F({}, n), u.getChildContext())),
                d || null == u.getSnapshotBeforeUpdate || (f = u.getSnapshotBeforeUpdate(h, p)),
                b = null != l && l.type === q && null == l.key ? l.props.children : l,
                Y(e, Array.isArray(b) ? b : [b], t, r, n, o, i, a, s, c),
                u.base = t.__e,
                t.__h = null,
                u.__h.length && a.push(u),
                v && (u.__E = u.__ = null),
                u.__e = !1
            } else
                null == i && t.__v === r.__v ? (t.__k = r.__k,
                t.__e = r.__e) : t.__e = function(e, t, r, n, o, i, a, s) {
                    var c, l, u, d = r.props, h = t.props, p = t.type, f = 0;
                    if ("svg" === p && (o = !0),
                    null != i)
                        for (; f < i.length; f++)
                            if ((c = i[f]) && "setAttribute"in c == !!p && (p ? c.localName === p : 3 === c.nodeType)) {
                                e = c,
                                i[f] = null;
                                break
                            }
                    if (null == e) {
                        if (null === p)
                            return document.createTextNode(h);
                        e = o ? document.createElementNS("http://www.w3.org/2000/svg", p) : document.createElement(p, h.is && h),
                        i = null,
                        s = !1
                    }
                    if (null === p)
                        d === h || s && e.data === h || (e.data = h);
                    else {
                        if (i = i && P.call(e.childNodes),
                        l = (d = r.props || H).dangerouslySetInnerHTML,
                        u = h.dangerouslySetInnerHTML,
                        !s) {
                            if (null != i)
                                for (d = {},
                                f = 0; f < e.attributes.length; f++)
                                    d[e.attributes[f].name] = e.attributes[f].value;
                            (u || l) && (u && (l && u.__html == l.__html || u.__html === e.innerHTML) || (e.innerHTML = u && u.__html || ""))
                        }
                        if (function(e, t, r, n, o) {
                            var i;
                            for (i in r)
                                "children" === i || "key" === i || i in t || te(e, i, null, r[i], n);
                            for (i in t)
                                o && "function" != typeof t[i] || "children" === i || "key" === i || "value" === i || "checked" === i || r[i] === t[i] || te(e, i, t[i], r[i], n)
                        }(e, h, d, o, s),
                        u)
                            t.__k = [];
                        else if (f = t.props.children,
                        Y(e, Array.isArray(f) ? f : [f], t, r, n, o && "foreignObject" !== p, i, a, i ? i[0] : r.__k && G(r, 0), s),
                        null != i)
                            for (f = i.length; f--; )
                                null != i[f] && V(i[f]);
                        s || ("value"in h && void 0 !== (f = h.value) && (f !== d.value || f !== e.value || "progress" === p && !f) && te(e, "value", f, d.value, !1),
                        "checked"in h && void 0 !== (f = h.checked) && f !== e.checked && te(e, "checked", f, d.checked, !1))
                    }
                    return e
                }(r.__e, t, r, n, o, i, a, c);
            (l = R.diffed) && l(t)
        } catch (e) {
            t.__v = null,
            (c || null != i) && (t.__e = s,
            t.__h = !!c,
            i[i.indexOf(s)] = null),
            R.__e(e, t, r)
        }
    }
    function ie(e, t) {
        R.__c && R.__c(t, e),
        e.some((function(t) {
            try {
                e = t.__h,
                t.__h = [],
                e.some((function(e) {
                    e.call(t)
                }
                ))
            } catch (e) {
                R.__e(e, t.__v)
            }
        }
        ))
    }
    function ae(e, t, r) {
        try {
            "function" == typeof e ? e(t) : e.current = t
        } catch (e) {
            R.__e(e, r)
        }
    }
    function se(e, t, r) {
        var n, o;
        if (R.unmount && R.unmount(e),
        (n = e.ref) && (n.current && n.current !== e.__e || ae(n, null, t)),
        null != (n = e.__c)) {
            if (n.componentWillUnmount)
                try {
                    n.componentWillUnmount()
                } catch (e) {
                    R.__e(e, t)
                }
            n.base = n.__P = null
        }
        if (n = e.__k)
            for (o = 0; o < n.length; o++)
                n[o] && se(n[o], t, "function" != typeof e.type);
        r || null == e.__e || V(e.__e),
        e.__e = e.__d = void 0
    }
    function ce(e, t, r) {
        return this.constructor(e, r)
    }
    function le(e, t, r) {
        var n, o, i;
        R.__ && R.__(e, t),
        o = (n = "function" == typeof r) ? null : r && r.__k || t.__k,
        i = [],
        oe(t, e = (!n && r || t).__k = U(q, null, [e]), o || H, H, void 0 !== t.ownerSVGElement, !n && r ? [r] : o ? null : t.firstChild ? P.call(t.childNodes) : null, i, !n && r ? r : o ? o.__e : t.firstChild, n),
        ie(i, e)
    }
    P = I.slice,
    R = {
        __e: function(e, t) {
            for (var r, n, o; t = t.__; )
                if ((r = t.__c) && !r.__)
                    try {
                        if ((n = r.constructor) && null != n.getDerivedStateFromError && (r.setState(n.getDerivedStateFromError(e)),
                        o = r.__d),
                        null != r.componentDidCatch && (r.componentDidCatch(e),
                        o = r.__d),
                        o)
                            return r.__E = r
                    } catch (t) {
                        e = t
                    }
            throw e
        }
    },
    O = 0,
    W.prototype.setState = function(e, t) {
        var r;
        r = null != this.__s && this.__s !== this.state ? this.__s : this.__s = F({}, this.state),
        "function" == typeof e && (e = e(F({}, r), this.props)),
        e && F(r, e),
        null != e && this.__v && (t && this.__h.push(t),
        $(this))
    }
    ,
    W.prototype.forceUpdate = function(e) {
        this.__v && (this.__e = !0,
        e && this.__h.push(e),
        $(this))
    }
    ,
    W.prototype.render = q,
    B = [],
    A = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout,
    X.__r = 0;
    var ue = 0;
    function de(e, t, r, n, o) {
        var i, a, s = {};
        for (a in t)
            "ref" == a ? i = t[a] : s[a] = t[a];
        var c = {
            type: e,
            props: s,
            key: r,
            ref: i,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            __h: null,
            constructor: void 0,
            __v: --ue,
            __source: n,
            __self: o
        };
        if ("function" == typeof e && (i = e.defaultProps))
            for (a in i)
                void 0 === s[a] && (s[a] = i[a]);
        return R.vnode && R.vnode(c),
        c
    }
    var he = {
        set: function(e, t) {
            try {
                window.localStorage["emoji-mart.".concat(e)] = JSON.stringify(t)
            } catch (e) {}
        },
        get: function(e) {
            try {
                var t = window.localStorage["emoji-mart.".concat(e)];
                if (t)
                    return JSON.parse(t)
            } catch (e) {}
        }
    }
      , pe = new Map
      , fe = [{
        v: 15,
        emoji: "🫨"
    }, {
        v: 14,
        emoji: "🫠"
    }, {
        v: 13.1,
        emoji: "😶‍🌫️"
    }, {
        v: 13,
        emoji: "🥸"
    }, {
        v: 12.1,
        emoji: "🧑‍🦰"
    }, {
        v: 12,
        emoji: "🥱"
    }, {
        v: 11,
        emoji: "🥰"
    }, {
        v: 5,
        emoji: "🤩"
    }, {
        v: 4,
        emoji: "👱‍♀️"
    }, {
        v: 3,
        emoji: "🤣"
    }, {
        v: 2,
        emoji: "👋🏻"
    }, {
        v: 1,
        emoji: "🙃"
    }];
    function ve(e) {
        if (pe.has(e))
            return pe.get(e);
        var t = ge(e);
        return pe.set(e, t),
        t
    }
    var ge = function() {
        var e = null;
        try {
            navigator.userAgent.includes("jsdom") || (e = document.createElement("canvas").getContext("2d", {
                willReadFrequently: !0
            }))
        } catch (e) {}
        if (!e)
            return function() {
                return !1
            }
            ;
        var t = 20
          , r = Math.floor(12.5);
        return e.font = r + "px Arial, Sans-Serif",
        e.textBaseline = "top",
        e.canvas.width = 40,
        e.canvas.height = 25,
        function(r) {
            e.clearRect(0, 0, 40, 25),
            e.fillStyle = "#FF0000",
            e.fillText(r, 0, 22),
            e.fillStyle = "#0000FF",
            e.fillText(r, t, 22);
            for (var n = e.getImageData(0, 0, t, 25).data, o = n.length, i = 0; i < o && !n[i + 3]; i += 4)
                ;
            if (i >= o)
                return !1;
            var a = t + i / 4 % t
              , s = Math.floor(i / 4 / t)
              , c = e.getImageData(a, s, 1, 1).data;
            return n[i] === c[0] && n[i + 2] === c[2] && !(e.measureText(r).width >= t)
        }
    }()
      , me = {
        latestVersion: function() {
            var e = !0
              , t = !1
              , r = void 0;
            try {
                for (var n, o = fe[Symbol.iterator](); !(e = (n = o.next()).done); e = !0) {
                    var i = n.value
                      , a = i.v;
                    if (ve(i.emoji))
                        return a
                }
            } catch (e) {
                t = !0,
                r = e
            } finally {
                try {
                    e || null == o.return || o.return()
                } finally {
                    if (t)
                        throw r
                }
            }
        },
        noCountryFlags: function() {
            return !ve("🇨🇦")
        }
    }
      , _e = ["+1", "grinning", "kissing_heart", "heart_eyes", "laughing", "stuck_out_tongue_winking_eye", "sweat_smile", "joy", "scream", "disappointed", "unamused", "weary", "sob", "sunglasses", "heart"]
      , be = null;
    var ye, ke = {
        add: function(e) {
            be || (be = he.get("frequently") || {});
            var t = e.id || e;
            t && (be[t] || (be[t] = 0),
            be[t] += 1,
            he.set("last", t),
            he.set("frequently", be))
        },
        get: function(e) {
            var t = e.maxFrequentRows
              , r = e.perLine;
            if (!t)
                return [];
            be || (be = he.get("frequently"));
            var n = [];
            if (!be) {
                for (var o in be = {},
                _e.slice(0, r)) {
                    var i = _e[o];
                    be[i] = r - o,
                    n.push(i)
                }
                return n
            }
            var a = t * r
              , s = he.get("last");
            for (var c in be)
                n.push(c);
            if (n.sort((function(e, t) {
                var r = be[t]
                  , n = be[e];
                return r == n ? e.localeCompare(t) : r - n
            }
            )),
            n.length > a) {
                var l = n.slice(a);
                n = n.slice(0, a);
                var u = !0
                  , d = !1
                  , h = void 0;
                try {
                    for (var p, f = l[Symbol.iterator](); !(u = (p = f.next()).done); u = !0) {
                        var v = p.value;
                        v != s && delete be[v]
                    }
                } catch (e) {
                    d = !0,
                    h = e
                } finally {
                    try {
                        u || null == f.return || f.return()
                    } finally {
                        if (d)
                            throw h
                    }
                }
                s && -1 == n.indexOf(s) && (delete be[n[n.length - 1]],
                n.splice(-1, 1, s)),
                he.set("frequently", be)
            }
            return n
        },
        DEFAULTS: _e
    };
    ye = JSON.parse('{"search":"Search","search_no_results_1":"Oh no!","search_no_results_2":"That emoji couldn’t be found","pick":"Pick an emoji…","add_custom":"Add custom emoji","categories":{"activity":"Activity","custom":"Custom","flags":"Flags","foods":"Food & Drink","frequent":"Frequently used","nature":"Animals & Nature","objects":"Objects","people":"Smileys & People","places":"Travel & Places","search":"Search Results","symbols":"Symbols"},"skins":{"1":"Default","2":"Light","3":"Medium-Light","4":"Medium","5":"Medium-Dark","6":"Dark","choose":"Choose default skin tone"}}');
    var we = {
        autoFocus: {
            value: !1
        },
        dynamicWidth: {
            value: !1
        },
        emojiButtonColors: {
            value: null
        },
        emojiButtonRadius: {
            value: "100%"
        },
        emojiButtonSize: {
            value: 36
        },
        emojiSize: {
            value: 24
        },
        emojiVersion: {
            value: 15,
            choices: [1, 2, 3, 4, 5, 11, 12, 12.1, 13, 13.1, 14, 15]
        },
        exceptEmojis: {
            value: []
        },
        icons: {
            value: "auto",
            choices: ["auto", "outline", "solid"]
        },
        locale: {
            value: "en",
            choices: ["en", "ar", "be", "cs", "de", "es", "fa", "fi", "fr", "hi", "it", "ja", "ko", "nl", "pl", "pt", "ru", "sa", "tr", "uk", "vi", "zh"]
        },
        maxFrequentRows: {
            value: 4
        },
        navPosition: {
            value: "top",
            choices: ["top", "bottom", "none"]
        },
        noCountryFlags: {
            value: !1
        },
        noResultsEmoji: {
            value: null
        },
        perLine: {
            value: 9
        },
        previewEmoji: {
            value: null
        },
        previewPosition: {
            value: "bottom",
            choices: ["top", "bottom", "none"]
        },
        searchPosition: {
            value: "sticky",
            choices: ["sticky", "static", "none"]
        },
        set: {
            value: "native",
            choices: ["native", "apple", "facebook", "google", "twitter"]
        },
        skin: {
            value: 1,
            choices: [1, 2, 3, 4, 5, 6]
        },
        skinTonePosition: {
            value: "preview",
            choices: ["preview", "search", "none"]
        },
        theme: {
            value: "auto",
            choices: ["auto", "light", "dark"]
        },
        categories: null,
        categoryIcons: null,
        custom: null,
        data: null,
        i18n: null,
        getImageURL: null,
        getSpritesheetURL: null,
        onAddCustomEmoji: null,
        onClickOutside: null,
        onEmojiSelect: null,
        stickySearch: {
            deprecated: !0,
            value: !0
        }
    }
      , xe = null
      , Ce = null
      , Se = {};
    function je(e) {
        return Le.apply(this, arguments)
    }
    function Le() {
        return (Le = i(t(z).mark((function e(r) {
            var n, o;
            return t(z).wrap((function(e) {
                for (; ; )
                    switch (e.prev = e.next) {
                    case 0:
                        if (!Se[r]) {
                            e.next = 2;
                            break
                        }
                        return e.abrupt("return", Se[r]);
                    case 2:
                        return e.next = 4,
                        fetch(r);
                    case 4:
                        return n = e.sent,
                        e.next = 7,
                        n.json();
                    case 7:
                        return o = e.sent,
                        Se[r] = o,
                        e.abrupt("return", o);
                    case 10:
                    case "end":
                        return e.stop()
                    }
            }
            ), e)
        }
        )))).apply(this, arguments)
    }
    var Me = null
      , ze = null
      , Ee = !1;
    function Pe(e) {
        var t = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).caller;
        return Me || (Me = new Promise((function(e) {
            ze = e
        }
        ))),
        e ? Re(e) : t && !Ee && console.warn("`".concat(t, "` requires data to be initialized first. Promise will be pending until `init` is called.")),
        Me
    }
    function Re(e) {
        return Oe.apply(this, arguments)
    }
    function Oe() {
        return (Oe = i(t(z).mark((function e(r) {
            var n, o, i, a, s, c, l, u, d, h, p, f, v, g, m, _, y, k, w, x, C, S, j, L, M, E, P, R, O, B, A, T, H, I, D, F, V, U, N, q, W, G, K;
            return t(z).wrap((function(e) {
                for (; ; )
                    switch (e.prev = e.next) {
                    case 0:
                        if (Ee = !0,
                        n = r.emojiVersion,
                        o = r.set,
                        i = r.locale,
                        n || (n = we.emojiVersion.value),
                        o || (o = we.set.value),
                        i || (i = we.locale.value),
                        Ce) {
                            e.next = 36;
                            break
                        }
                        if ("function" != typeof r.data) {
                            e.next = 12;
                            break
                        }
                        return e.next = 9,
                        r.data();
                    case 9:
                        e.t1 = e.sent,
                        e.next = 13;
                        break;
                    case 12:
                        e.t1 = r.data;
                    case 13:
                        if (e.t0 = e.t1,
                        e.t0) {
                            e.next = 18;
                            break
                        }
                        return e.next = 17,
                        je("https://cdn.jsdelivr.net/npm/@emoji-mart/data@latest/sets/".concat(n, "/").concat(o, ".json"));
                    case 17:
                        e.t0 = e.sent;
                    case 18:
                        (Ce = e.t0).emoticons = {},
                        Ce.natives = {},
                        Ce.categories.unshift({
                            id: "frequent",
                            emojis: []
                        }),
                        e.t2 = regeneratorRuntime.keys(Ce.aliases);
                    case 23:
                        if ((e.t3 = e.t2()).done) {
                            e.next = 33;
                            break
                        }
                        if (a = e.t3.value,
                        s = Ce.aliases[a],
                        c = Ce.emojis[s]) {
                            e.next = 29;
                            break
                        }
                        return e.abrupt("continue", 23);
                    case 29:
                        c.aliases || (c.aliases = []),
                        c.aliases.push(a),
                        e.next = 23;
                        break;
                    case 33:
                        Ce.originalCategories = Ce.categories,
                        e.next = 37;
                        break;
                    case 36:
                        Ce.categories = Ce.categories.filter((function(e) {
                            return !!!e.name
                        }
                        ));
                    case 37:
                        if ("function" != typeof r.i18n) {
                            e.next = 43;
                            break
                        }
                        return e.next = 40,
                        r.i18n();
                    case 40:
                        e.t5 = e.sent,
                        e.next = 44;
                        break;
                    case 43:
                        e.t5 = r.i18n;
                    case 44:
                        if (e.t4 = e.t5,
                        e.t4) {
                            e.next = 54;
                            break
                        }
                        if ("en" != i) {
                            e.next = 50;
                            break
                        }
                        e.t6 = t(ye),
                        e.next = 53;
                        break;
                    case 50:
                        return e.next = 52,
                        je("https://cdn.jsdelivr.net/npm/@emoji-mart/data@latest/i18n/".concat(i, ".json"));
                    case 52:
                        e.t6 = e.sent;
                    case 53:
                        e.t4 = e.t6;
                    case 54:
                        if (xe = e.t4,
                        !r.custom) {
                            e.next = 87;
                            break
                        }
                        e.t7 = regeneratorRuntime.keys(r.custom);
                    case 57:
                        if ((e.t8 = e.t7()).done) {
                            e.next = 87;
                            break
                        }
                        if (l = e.t8.value,
                        l = parseInt(l),
                        u = r.custom[l],
                        d = r.custom[l - 1],
                        u.emojis && u.emojis.length) {
                            e.next = 64;
                            break
                        }
                        return e.abrupt("continue", 57);
                    case 64:
                        for (u.id || (u.id = "custom_".concat(l + 1)),
                        u.name || (u.name = xe.categories.custom),
                        d && !u.icon && (u.target = d.target || d),
                        Ce.categories.push(u),
                        h = !0,
                        p = !1,
                        f = void 0,
                        e.prev = 69,
                        v = u.emojis[Symbol.iterator](); !(h = (g = v.next()).done); h = !0)
                            m = g.value,
                            Ce.emojis[m.id] = m;
                        e.next = 77;
                        break;
                    case 73:
                        e.prev = 73,
                        e.t9 = e.catch(69),
                        p = !0,
                        f = e.t9;
                    case 77:
                        e.prev = 77,
                        e.prev = 78,
                        h || null == v.return || v.return();
                    case 80:
                        if (e.prev = 80,
                        !p) {
                            e.next = 83;
                            break
                        }
                        throw f;
                    case 83:
                        return e.finish(80);
                    case 84:
                        return e.finish(77);
                    case 85:
                        e.next = 57;
                        break;
                    case 87:
                        r.categories && (Ce.categories = Ce.originalCategories.filter((function(e) {
                            return -1 != r.categories.indexOf(e.id)
                        }
                        )).sort((function(e, t) {
                            return r.categories.indexOf(e.id) - r.categories.indexOf(t.id)
                        }
                        ))),
                        _ = null,
                        y = null,
                        "native" == o && (_ = me.latestVersion(),
                        y = r.noCountryFlags || me.noCountryFlags()),
                        k = Ce.categories.length,
                        w = !1;
                    case 93:
                        if (!k--) {
                            e.next = 179;
                            break
                        }
                        if ("frequent" == (x = Ce.categories[k]).id && (C = r.maxFrequentRows,
                        S = r.perLine,
                        C = C >= 0 ? C : we.maxFrequentRows.value,
                        S || (S = we.perLine.value),
                        x.emojis = ke.get({
                            maxFrequentRows: C,
                            perLine: S
                        })),
                        x.emojis && x.emojis.length) {
                            e.next = 99;
                            break
                        }
                        return Ce.categories.splice(k, 1),
                        e.abrupt("continue", 93);
                    case 99:
                        (j = r.categoryIcons) && (L = j[x.id]) && !x.icon && (x.icon = L),
                        M = x.emojis.length;
                    case 102:
                        if (!M--) {
                            e.next = 177;
                            break
                        }
                        if (E = x.emojis[M],
                        P = E.id ? E : Ce.emojis[E],
                        R = function() {
                            x.emojis.splice(M, 1)
                        }
                        ,
                        !(!P || r.exceptEmojis && r.exceptEmojis.includes(P.id))) {
                            e.next = 109;
                            break
                        }
                        return R(),
                        e.abrupt("continue", 102);
                    case 109:
                        if (!(_ && P.version > _)) {
                            e.next = 112;
                            break
                        }
                        return R(),
                        e.abrupt("continue", 102);
                    case 112:
                        if (!y || "flags" != x.id) {
                            e.next = 116;
                            break
                        }
                        if (De.includes(P.id)) {
                            e.next = 116;
                            break
                        }
                        return R(),
                        e.abrupt("continue", 102);
                    case 116:
                        if (P.search) {
                            e.next = 175;
                            break
                        }
                        if (w = !0,
                        P.search = "," + [[P.id, !1], [P.name, !0], [P.keywords, !1], [P.emoticons, !1]].map((function(e) {
                            var t = b(e, 2)
                              , r = t[0]
                              , n = t[1];
                            if (r)
                                return (Array.isArray(r) ? r : [r]).map((function(e) {
                                    return (n ? e.split(/[-|_|\s]+/) : [e]).map((function(e) {
                                        return e.toLowerCase()
                                    }
                                    ))
                                }
                                )).flat()
                        }
                        )).flat().filter((function(e) {
                            return e && e.trim()
                        }
                        )).join(","),
                        O = !0,
                        B = !1,
                        A = void 0,
                        !P.emoticons) {
                            e.next = 145;
                            break
                        }
                        e.prev = 121,
                        T = P.emoticons[Symbol.iterator]();
                    case 123:
                        if (O = (H = T.next()).done) {
                            e.next = 131;
                            break
                        }
                        if (I = H.value,
                        !Ce.emoticons[I]) {
                            e.next = 127;
                            break
                        }
                        return e.abrupt("continue", 128);
                    case 127:
                        Ce.emoticons[I] = P.id;
                    case 128:
                        O = !0,
                        e.next = 123;
                        break;
                    case 131:
                        e.next = 137;
                        break;
                    case 133:
                        e.prev = 133,
                        e.t10 = e.catch(121),
                        B = !0,
                        A = e.t10;
                    case 137:
                        e.prev = 137,
                        e.prev = 138,
                        O || null == T.return || T.return();
                    case 140:
                        if (e.prev = 140,
                        !B) {
                            e.next = 143;
                            break
                        }
                        throw A;
                    case 143:
                        return e.finish(140);
                    case 144:
                        return e.finish(137);
                    case 145:
                        D = 0,
                        F = !0,
                        V = !1,
                        U = void 0,
                        e.prev = 147,
                        N = P.skins[Symbol.iterator]();
                    case 149:
                        if (F = (q = N.next()).done) {
                            e.next = 161;
                            break
                        }
                        if (W = q.value) {
                            e.next = 153;
                            break
                        }
                        return e.abrupt("continue", 158);
                    case 153:
                        D++,
                        (G = W.native) && (Ce.natives[G] = P.id,
                        P.search += ",".concat(G)),
                        K = 1 == D ? "" : ":skin-tone-".concat(D, ":"),
                        W.shortcodes = ":".concat(P.id, ":").concat(K);
                    case 158:
                        F = !0,
                        e.next = 149;
                        break;
                    case 161:
                        e.next = 167;
                        break;
                    case 163:
                        e.prev = 163,
                        e.t11 = e.catch(147),
                        V = !0,
                        U = e.t11;
                    case 167:
                        e.prev = 167,
                        e.prev = 168,
                        F || null == N.return || N.return();
                    case 170:
                        if (e.prev = 170,
                        !V) {
                            e.next = 173;
                            break
                        }
                        throw U;
                    case 173:
                        return e.finish(170);
                    case 174:
                        return e.finish(167);
                    case 175:
                        e.next = 102;
                        break;
                    case 177:
                        e.next = 93;
                        break;
                    case 179:
                        w && Ie.reset(),
                        ze();
                    case 181:
                    case "end":
                        return e.stop()
                    }
            }
            ), e, null, [[69, 73, 77, 85], [78, , 80, 84], [121, 133, 137, 145], [138, , 140, 144], [147, 163, 167, 175], [168, , 170, 174]])
        }
        )))).apply(this, arguments)
    }
    function Be(e, t, r) {
        e || (e = {});
        var n = {};
        for (var o in t)
            n[o] = Ae(o, e, t, r);
        return n
    }
    function Ae(e, t, r, n) {
        var o = r[e]
          , i = n && n.getAttribute(e) || (null != t[e] && null != t[e] ? t[e] : null);
        return o ? (null != i && o.value && j(o.value) != (void 0 === i ? "undefined" : j(i)) && (i = "boolean" == typeof o.value ? "false" != i : o.value.constructor(i)),
        o.transform && i && (i = o.transform(i)),
        (null == i || o.choices && -1 == o.choices.indexOf(i)) && (i = o.value),
        i) : i
    }
    var Te = null;
    function He() {
        return He = i(t(z).mark((function e(r) {
            var n, o, i, a, s, c, l, u, d, h, p, f, v, g, m, _, b, y, k, w, x = arguments;
            return t(z).wrap((function(e) {
                for (; ; )
                    switch (e.prev = e.next) {
                    case 0:
                        if (n = x.length > 1 && void 0 !== x[1] ? x[1] : {},
                        o = n.maxResults,
                        i = n.caller,
                        r && r.trim().length) {
                            e.next = 3;
                            break
                        }
                        return e.abrupt("return", null);
                    case 3:
                        return o || (o = 90),
                        e.next = 6,
                        Pe(null, {
                            caller: i || "SearchIndex.search"
                        });
                    case 6:
                        if ((a = r.toLowerCase().replace(/(\w)-/, "$1 ").split(/[\s|,]+/).filter((function(e, t, r) {
                            return e.trim() && r.indexOf(e) == t
                        }
                        ))).length) {
                            e.next = 9;
                            break
                        }
                        return e.abrupt("return");
                    case 9:
                        s = Te || (Te = Object.values(Ce.emojis)),
                        u = !0,
                        d = !1,
                        h = void 0,
                        e.prev = 12,
                        p = a[Symbol.iterator]();
                    case 14:
                        if (u = (f = p.next()).done) {
                            e.next = 54;
                            break
                        }
                        if (v = f.value,
                        s.length) {
                            e.next = 18;
                            break
                        }
                        return e.abrupt("break", 54);
                    case 18:
                        c = [],
                        l = {},
                        g = !0,
                        m = !1,
                        _ = void 0,
                        e.prev = 21,
                        b = s[Symbol.iterator]();
                    case 23:
                        if (g = (y = b.next()).done) {
                            e.next = 36;
                            break
                        }
                        if ((k = y.value).search) {
                            e.next = 27;
                            break
                        }
                        return e.abrupt("continue", 33);
                    case 27:
                        if (-1 != (w = k.search.indexOf(",".concat(v)))) {
                            e.next = 30;
                            break
                        }
                        return e.abrupt("continue", 33);
                    case 30:
                        c.push(k),
                        l[k.id] || (l[k.id] = 0),
                        l[k.id] += k.id == v ? 0 : w + 1;
                    case 33:
                        g = !0,
                        e.next = 23;
                        break;
                    case 36:
                        e.next = 42;
                        break;
                    case 38:
                        e.prev = 38,
                        e.t0 = e.catch(21),
                        m = !0,
                        _ = e.t0;
                    case 42:
                        e.prev = 42,
                        e.prev = 43,
                        g || null == b.return || b.return();
                    case 45:
                        if (e.prev = 45,
                        !m) {
                            e.next = 48;
                            break
                        }
                        throw _;
                    case 48:
                        return e.finish(45);
                    case 49:
                        return e.finish(42);
                    case 50:
                        s = c;
                    case 51:
                        u = !0,
                        e.next = 14;
                        break;
                    case 54:
                        e.next = 60;
                        break;
                    case 56:
                        e.prev = 56,
                        e.t1 = e.catch(12),
                        d = !0,
                        h = e.t1;
                    case 60:
                        e.prev = 60,
                        e.prev = 61,
                        u || null == p.return || p.return();
                    case 63:
                        if (e.prev = 63,
                        !d) {
                            e.next = 66;
                            break
                        }
                        throw h;
                    case 66:
                        return e.finish(63);
                    case 67:
                        return e.finish(60);
                    case 68:
                        if (!(c.length < 2)) {
                            e.next = 70;
                            break
                        }
                        return e.abrupt("return", c);
                    case 70:
                        return c.sort((function(e, t) {
                            var r = l[e.id]
                              , n = l[t.id];
                            return r == n ? e.id.localeCompare(t.id) : r - n
                        }
                        )),
                        c.length > o && (c = c.slice(0, o)),
                        e.abrupt("return", c);
                    case 73:
                    case "end":
                        return e.stop()
                    }
            }
            ), e, null, [[12, 56, 60, 68], [21, 38, 42, 50], [43, , 45, 49], [61, , 63, 67]])
        }
        ))),
        He.apply(this, arguments)
    }
    var Ie = {
        search: function(e) {
            return He.apply(this, arguments)
        },
        get: function(e) {
            return e.id ? e : Ce.emojis[e] || Ce.emojis[Ce.aliases[e]] || Ce.emojis[Ce.natives[e]]
        },
        reset: function() {
            Te = null
        },
        SHORTCODES_REGEX: /^(?:\:([^\:]+)\:)(?:\:skin-tone-(\d)\:)?$/
    }
      , De = ["checkered_flag", "crossed_flags", "pirate_flag", "rainbow-flag", "transgender_flag", "triangular_flag_on_post", "waving_black_flag", "waving_white_flag"];
    function Fe() {
        return Ve.apply(this, arguments)
    }
    function Ve() {
        return Ve = i(t(z).mark((function e() {
            var r, n = arguments;
            return t(z).wrap((function(e) {
                for (; ; )
                    switch (e.prev = e.next) {
                    case 0:
                        r = n.length > 0 && void 0 !== n[0] ? n[0] : 1,
                        e.t0 = regeneratorRuntime.keys(w(Array(r).keys()));
                    case 2:
                        if ((e.t1 = e.t0()).done) {
                            e.next = 8;
                            break
                        }
                        return e.t1.value,
                        e.next = 6,
                        new Promise(requestAnimationFrame);
                    case 6:
                        e.next = 2;
                        break;
                    case 8:
                    case "end":
                        return e.stop()
                    }
            }
            ), e)
        }
        ))),
        Ve.apply(this, arguments)
    }
    function Ue(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          , r = t.skinIndex
          , n = void 0 === r ? 0 : r
          , o = e.skins[n] || (n = 0,
        e.skins[n])
          , i = {
            id: e.id,
            name: e.name,
            native: o.native,
            unified: o.unified,
            keywords: e.keywords,
            shortcodes: o.shortcodes || e.shortcodes
        };
        return e.skins.length > 1 && (i.skin = n + 1),
        o.src && (i.src = o.src),
        e.aliases && e.aliases.length && (i.aliases = e.aliases),
        e.emoticons && e.emoticons.length && (i.emoticons = e.emoticons),
        i
    }
    function Ne(e) {
        return qe.apply(this, arguments)
    }
    function qe() {
        return (qe = i(t(z).mark((function e(r) {
            var n, o, i, a, s, c, l, u;
            return t(z).wrap((function(e) {
                for (; ; )
                    switch (e.prev = e.next) {
                    case 0:
                        return e.next = 2,
                        Ie.search(r, {
                            maxResults: 1,
                            caller: "getEmojiDataFromNative"
                        });
                    case 2:
                        if ((n = e.sent) && n.length) {
                            e.next = 5;
                            break
                        }
                        return e.abrupt("return", null);
                    case 5:
                        o = n[0],
                        i = 0,
                        a = !0,
                        s = !1,
                        c = void 0,
                        e.prev = 8,
                        l = o.skins[Symbol.iterator]();
                    case 10:
                        if (a = (u = l.next()).done) {
                            e.next = 18;
                            break
                        }
                        if (u.value.native != r) {
                            e.next = 14;
                            break
                        }
                        return e.abrupt("break", 18);
                    case 14:
                        i++;
                    case 15:
                        a = !0,
                        e.next = 10;
                        break;
                    case 18:
                        e.next = 24;
                        break;
                    case 20:
                        e.prev = 20,
                        e.t0 = e.catch(8),
                        s = !0,
                        c = e.t0;
                    case 24:
                        e.prev = 24,
                        e.prev = 25,
                        a || null == l.return || l.return();
                    case 27:
                        if (e.prev = 27,
                        !s) {
                            e.next = 30;
                            break
                        }
                        throw c;
                    case 30:
                        return e.finish(27);
                    case 31:
                        return e.finish(24);
                    case 32:
                        return e.abrupt("return", Ue(o, {
                            skinIndex: i
                        }));
                    case 33:
                    case "end":
                        return e.stop()
                    }
            }
            ), e, null, [[8, 20, 24, 32], [25, , 27, 31]])
        }
        )))).apply(this, arguments)
    }
    var We = {
        categories: {
            activity: {
                outline: de("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    children: de("path", {
                        d: "M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12m9.949 11H17.05c.224-2.527 1.232-4.773 1.968-6.113A9.966 9.966 0 0 1 21.949 11M13 11V2.051a9.945 9.945 0 0 1 4.432 1.564c-.858 1.491-2.156 4.22-2.392 7.385H13zm-2 0H8.961c-.238-3.165-1.536-5.894-2.393-7.385A9.95 9.95 0 0 1 11 2.051V11zm0 2v8.949a9.937 9.937 0 0 1-4.432-1.564c.857-1.492 2.155-4.221 2.393-7.385H11zm4.04 0c.236 3.164 1.534 5.893 2.392 7.385A9.92 9.92 0 0 1 13 21.949V13h2.04zM4.982 4.887C5.718 6.227 6.726 8.473 6.951 11h-4.9a9.977 9.977 0 0 1 2.931-6.113M2.051 13h4.9c-.226 2.527-1.233 4.771-1.969 6.113A9.972 9.972 0 0 1 2.051 13m16.967 6.113c-.735-1.342-1.744-3.586-1.968-6.113h4.899a9.961 9.961 0 0 1-2.931 6.113"
                    })
                }),
                solid: de("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 512 512",
                    children: de("path", {
                        d: "M16.17 337.5c0 44.98 7.565 83.54 13.98 107.9C35.22 464.3 50.46 496 174.9 496c9.566 0 19.59-.4707 29.84-1.271L17.33 307.3C16.53 317.6 16.17 327.7 16.17 337.5zM495.8 174.5c0-44.98-7.565-83.53-13.98-107.9c-4.688-17.54-18.34-31.23-36.04-35.95C435.5 27.91 392.9 16 337 16c-9.564 0-19.59 .4707-29.84 1.271l187.5 187.5C495.5 194.4 495.8 184.3 495.8 174.5zM26.77 248.8l236.3 236.3c142-36.1 203.9-150.4 222.2-221.1L248.9 26.87C106.9 62.96 45.07 177.2 26.77 248.8zM256 335.1c0 9.141-7.474 16-16 16c-4.094 0-8.188-1.564-11.31-4.689L164.7 283.3C161.6 280.2 160 276.1 160 271.1c0-8.529 6.865-16 16-16c4.095 0 8.189 1.562 11.31 4.688l64.01 64C254.4 327.8 256 331.9 256 335.1zM304 287.1c0 9.141-7.474 16-16 16c-4.094 0-8.188-1.564-11.31-4.689L212.7 235.3C209.6 232.2 208 228.1 208 223.1c0-9.141 7.473-16 16-16c4.094 0 8.188 1.562 11.31 4.688l64.01 64.01C302.5 279.8 304 283.9 304 287.1zM256 175.1c0-9.141 7.473-16 16-16c4.094 0 8.188 1.562 11.31 4.688l64.01 64.01c3.125 3.125 4.688 7.219 4.688 11.31c0 9.133-7.468 16-16 16c-4.094 0-8.189-1.562-11.31-4.688l-64.01-64.01C257.6 184.2 256 180.1 256 175.1z"
                    })
                })
            },
            custom: de("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 448 512",
                children: de("path", {
                    d: "M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z"
                })
            }),
            flags: {
                outline: de("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    children: de("path", {
                        d: "M0 0l6.084 24H8L1.916 0zM21 5h-4l-1-4H4l3 12h3l1 4h13L21 5zM6.563 3h7.875l2 8H8.563l-2-8zm8.832 10l-2.856 1.904L12.063 13h3.332zM19 13l-1.5-6h1.938l2 8H16l3-2z"
                    })
                }),
                solid: de("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 512 512",
                    children: de("path", {
                        d: "M64 496C64 504.8 56.75 512 48 512h-32C7.25 512 0 504.8 0 496V32c0-17.75 14.25-32 32-32s32 14.25 32 32V496zM476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87C160.9 .3055 131.6 4.867 96 15.75v350.5c32-9.984 59.87-14.1 84.85-14.1c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0z"
                    })
                })
            },
            foods: {
                outline: de("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    children: de("path", {
                        d: "M17 4.978c-1.838 0-2.876.396-3.68.934.513-1.172 1.768-2.934 4.68-2.934a1 1 0 0 0 0-2c-2.921 0-4.629 1.365-5.547 2.512-.064.078-.119.162-.18.244C11.73 1.838 10.798.023 9.207.023 8.579.022 7.85.306 7 .978 5.027 2.54 5.329 3.902 6.492 4.999 3.609 5.222 0 7.352 0 12.969c0 4.582 4.961 11.009 9 11.009 1.975 0 2.371-.486 3-1 .629.514 1.025 1 3 1 4.039 0 9-6.418 9-11 0-5.953-4.055-8-7-8M8.242 2.546c.641-.508.943-.523.965-.523.426.169.975 1.405 1.357 3.055-1.527-.629-2.741-1.352-2.98-1.846.059-.112.241-.356.658-.686M15 21.978c-1.08 0-1.21-.109-1.559-.402l-.176-.146c-.367-.302-.816-.452-1.266-.452s-.898.15-1.266.452l-.176.146c-.347.292-.477.402-1.557.402-2.813 0-7-5.389-7-9.009 0-5.823 4.488-5.991 5-5.991 1.939 0 2.484.471 3.387 1.251l.323.276a1.995 1.995 0 0 0 2.58 0l.323-.276c.902-.78 1.447-1.251 3.387-1.251.512 0 5 .168 5 6 0 3.617-4.187 9-7 9"
                    })
                }),
                solid: de("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 512 512",
                    children: de("path", {
                        d: "M481.9 270.1C490.9 279.1 496 291.3 496 304C496 316.7 490.9 328.9 481.9 337.9C472.9 346.9 460.7 352 448 352H64C51.27 352 39.06 346.9 30.06 337.9C21.06 328.9 16 316.7 16 304C16 291.3 21.06 279.1 30.06 270.1C39.06 261.1 51.27 256 64 256H448C460.7 256 472.9 261.1 481.9 270.1zM475.3 388.7C478.3 391.7 480 395.8 480 400V416C480 432.1 473.3 449.3 461.3 461.3C449.3 473.3 432.1 480 416 480H96C79.03 480 62.75 473.3 50.75 461.3C38.74 449.3 32 432.1 32 416V400C32 395.8 33.69 391.7 36.69 388.7C39.69 385.7 43.76 384 48 384H464C468.2 384 472.3 385.7 475.3 388.7zM50.39 220.8C45.93 218.6 42.03 215.5 38.97 211.6C35.91 207.7 33.79 203.2 32.75 198.4C31.71 193.5 31.8 188.5 32.99 183.7C54.98 97.02 146.5 32 256 32C365.5 32 457 97.02 479 183.7C480.2 188.5 480.3 193.5 479.2 198.4C478.2 203.2 476.1 207.7 473 211.6C469.1 215.5 466.1 218.6 461.6 220.8C457.2 222.9 452.3 224 447.3 224H64.67C59.73 224 54.84 222.9 50.39 220.8zM372.7 116.7C369.7 119.7 368 123.8 368 128C368 131.2 368.9 134.3 370.7 136.9C372.5 139.5 374.1 141.6 377.9 142.8C380.8 143.1 384 144.3 387.1 143.7C390.2 143.1 393.1 141.6 395.3 139.3C397.6 137.1 399.1 134.2 399.7 131.1C400.3 128 399.1 124.8 398.8 121.9C397.6 118.1 395.5 116.5 392.9 114.7C390.3 112.9 387.2 111.1 384 111.1C379.8 111.1 375.7 113.7 372.7 116.7V116.7zM244.7 84.69C241.7 87.69 240 91.76 240 96C240 99.16 240.9 102.3 242.7 104.9C244.5 107.5 246.1 109.6 249.9 110.8C252.8 111.1 256 112.3 259.1 111.7C262.2 111.1 265.1 109.6 267.3 107.3C269.6 105.1 271.1 102.2 271.7 99.12C272.3 96.02 271.1 92.8 270.8 89.88C269.6 86.95 267.5 84.45 264.9 82.7C262.3 80.94 259.2 79.1 256 79.1C251.8 79.1 247.7 81.69 244.7 84.69V84.69zM116.7 116.7C113.7 119.7 112 123.8 112 128C112 131.2 112.9 134.3 114.7 136.9C116.5 139.5 118.1 141.6 121.9 142.8C124.8 143.1 128 144.3 131.1 143.7C134.2 143.1 137.1 141.6 139.3 139.3C141.6 137.1 143.1 134.2 143.7 131.1C144.3 128 143.1 124.8 142.8 121.9C141.6 118.1 139.5 116.5 136.9 114.7C134.3 112.9 131.2 111.1 128 111.1C123.8 111.1 119.7 113.7 116.7 116.7L116.7 116.7z"
                    })
                })
            },
            frequent: {
                outline: de("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    children: [de("path", {
                        d: "M13 4h-2l-.001 7H9v2h2v2h2v-2h4v-2h-4z"
                    }), de("path", {
                        d: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10"
                    })]
                }),
                solid: de("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 512 512",
                    children: de("path", {
                        d: "M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"
                    })
                })
            },
            nature: {
                outline: de("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    children: [de("path", {
                        d: "M15.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 15.5 8M8.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 8.5 8"
                    }), de("path", {
                        d: "M18.933 0h-.027c-.97 0-2.138.787-3.018 1.497-1.274-.374-2.612-.51-3.887-.51-1.285 0-2.616.133-3.874.517C7.245.79 6.069 0 5.093 0h-.027C3.352 0 .07 2.67.002 7.026c-.039 2.479.276 4.238 1.04 5.013.254.258.882.677 1.295.882.191 3.177.922 5.238 2.536 6.38.897.637 2.187.949 3.2 1.102C8.04 20.6 8 20.795 8 21c0 1.773 2.35 3 4 3 1.648 0 4-1.227 4-3 0-.201-.038-.393-.072-.586 2.573-.385 5.435-1.877 5.925-7.587.396-.22.887-.568 1.104-.788.763-.774 1.079-2.534 1.04-5.013C23.929 2.67 20.646 0 18.933 0M3.223 9.135c-.237.281-.837 1.155-.884 1.238-.15-.41-.368-1.349-.337-3.291.051-3.281 2.478-4.972 3.091-5.031.256.015.731.27 1.265.646-1.11 1.171-2.275 2.915-2.352 5.125-.133.546-.398.858-.783 1.313M12 22c-.901 0-1.954-.693-2-1 0-.654.475-1.236 1-1.602V20a1 1 0 1 0 2 0v-.602c.524.365 1 .947 1 1.602-.046.307-1.099 1-2 1m3-3.48v.02a4.752 4.752 0 0 0-1.262-1.02c1.092-.516 2.239-1.334 2.239-2.217 0-1.842-1.781-2.195-3.977-2.195-2.196 0-3.978.354-3.978 2.195 0 .883 1.148 1.701 2.238 2.217A4.8 4.8 0 0 0 9 18.539v-.025c-1-.076-2.182-.281-2.973-.842-1.301-.92-1.838-3.045-1.853-6.478l.023-.041c.496-.826 1.49-1.45 1.804-3.102 0-2.047 1.357-3.631 2.362-4.522C9.37 3.178 10.555 3 11.948 3c1.447 0 2.685.192 3.733.57 1 .9 2.316 2.465 2.316 4.48.313 1.651 1.307 2.275 1.803 3.102.035.058.068.117.102.178-.059 5.967-1.949 7.01-4.902 7.19m6.628-8.202c-.037-.065-.074-.13-.113-.195a7.587 7.587 0 0 0-.739-.987c-.385-.455-.648-.768-.782-1.313-.076-2.209-1.241-3.954-2.353-5.124.531-.376 1.004-.63 1.261-.647.636.071 3.044 1.764 3.096 5.031.027 1.81-.347 3.218-.37 3.235"
                    })]
                }),
                solid: de("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 576 512",
                    children: de("path", {
                        d: "M332.7 19.85C334.6 8.395 344.5 0 356.1 0C363.6 0 370.6 3.52 375.1 9.502L392 32H444.1C456.8 32 469.1 37.06 478.1 46.06L496 64H552C565.3 64 576 74.75 576 88V112C576 156.2 540.2 192 496 192H426.7L421.6 222.5L309.6 158.5L332.7 19.85zM448 64C439.2 64 432 71.16 432 80C432 88.84 439.2 96 448 96C456.8 96 464 88.84 464 80C464 71.16 456.8 64 448 64zM416 256.1V480C416 497.7 401.7 512 384 512H352C334.3 512 320 497.7 320 480V364.8C295.1 377.1 268.8 384 240 384C211.2 384 184 377.1 160 364.8V480C160 497.7 145.7 512 128 512H96C78.33 512 64 497.7 64 480V249.8C35.23 238.9 12.64 214.5 4.836 183.3L.9558 167.8C-3.331 150.6 7.094 133.2 24.24 128.1C41.38 124.7 58.76 135.1 63.05 152.2L66.93 167.8C70.49 182 83.29 191.1 97.97 191.1H303.8L416 256.1z"
                    })
                })
            },
            objects: {
                outline: de("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    children: [de("path", {
                        d: "M12 0a9 9 0 0 0-5 16.482V21s2.035 3 5 3 5-3 5-3v-4.518A9 9 0 0 0 12 0zm0 2c3.86 0 7 3.141 7 7s-3.14 7-7 7-7-3.141-7-7 3.14-7 7-7zM9 17.477c.94.332 1.946.523 3 .523s2.06-.19 3-.523v.834c-.91.436-1.925.689-3 .689a6.924 6.924 0 0 1-3-.69v-.833zm.236 3.07A8.854 8.854 0 0 0 12 21c.965 0 1.888-.167 2.758-.451C14.155 21.173 13.153 22 12 22c-1.102 0-2.117-.789-2.764-1.453z"
                    }), de("path", {
                        d: "M14.745 12.449h-.004c-.852-.024-1.188-.858-1.577-1.824-.421-1.061-.703-1.561-1.182-1.566h-.009c-.481 0-.783.497-1.235 1.537-.436.982-.801 1.811-1.636 1.791l-.276-.043c-.565-.171-.853-.691-1.284-1.794-.125-.313-.202-.632-.27-.913-.051-.213-.127-.53-.195-.634C7.067 9.004 7.039 9 6.99 9A1 1 0 0 1 7 7h.01c1.662.017 2.015 1.373 2.198 2.134.486-.981 1.304-2.058 2.797-2.075 1.531.018 2.28 1.153 2.731 2.141l.002-.008C14.944 8.424 15.327 7 16.979 7h.032A1 1 0 1 1 17 9h-.011c-.149.076-.256.474-.319.709a6.484 6.484 0 0 1-.311.951c-.429.973-.79 1.789-1.614 1.789"
                    })]
                }),
                solid: de("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 384 512",
                    children: de("path", {
                        d: "M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7L272 415.1h-160L112.1 454.3zM191.4 .0132C89.44 .3257 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.0313 .25 .0938 .5166 .125 .7823h160.2c.0313-.2656 .0938-.5166 .125-.7823c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.61 288.9-.2837 191.4 .0132zM192 96.01c-44.13 0-80 35.89-80 79.1C112 184.8 104.8 192 96 192S80 184.8 80 176c0-61.76 50.25-111.1 112-111.1c8.844 0 16 7.159 16 16S200.8 96.01 192 96.01z"
                    })
                })
            },
            people: {
                outline: de("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    children: [de("path", {
                        d: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10"
                    }), de("path", {
                        d: "M8 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 8 7M16 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 16 7M15.232 15c-.693 1.195-1.87 2-3.349 2-1.477 0-2.655-.805-3.347-2H15m3-2H6a6 6 0 1 0 12 0"
                    })]
                }),
                solid: de("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 512 512",
                    children: de("path", {
                        d: "M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 432C332.1 432 396.2 382 415.2 314.1C419.1 300.4 407.8 288 393.6 288H118.4C104.2 288 92.92 300.4 96.76 314.1C115.8 382 179.9 432 256 432V432zM176.4 160C158.7 160 144.4 174.3 144.4 192C144.4 209.7 158.7 224 176.4 224C194 224 208.4 209.7 208.4 192C208.4 174.3 194 160 176.4 160zM336.4 224C354 224 368.4 209.7 368.4 192C368.4 174.3 354 160 336.4 160C318.7 160 304.4 174.3 304.4 192C304.4 209.7 318.7 224 336.4 224z"
                    })
                })
            },
            places: {
                outline: de("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    children: [de("path", {
                        d: "M6.5 12C5.122 12 4 13.121 4 14.5S5.122 17 6.5 17 9 15.879 9 14.5 7.878 12 6.5 12m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5M17.5 12c-1.378 0-2.5 1.121-2.5 2.5s1.122 2.5 2.5 2.5 2.5-1.121 2.5-2.5-1.122-2.5-2.5-2.5m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5"
                    }), de("path", {
                        d: "M22.482 9.494l-1.039-.346L21.4 9h.6c.552 0 1-.439 1-.992 0-.006-.003-.008-.003-.008H23c0-1-.889-2-1.984-2h-.642l-.731-1.717C19.262 3.012 18.091 2 16.764 2H7.236C5.909 2 4.738 3.012 4.357 4.283L3.626 6h-.642C1.889 6 1 7 1 8h.003S1 8.002 1 8.008C1 8.561 1.448 9 2 9h.6l-.043.148-1.039.346a2.001 2.001 0 0 0-1.359 2.097l.751 7.508a1 1 0 0 0 .994.901H3v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h6v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h1.096a.999.999 0 0 0 .994-.901l.751-7.508a2.001 2.001 0 0 0-1.359-2.097M6.273 4.857C6.402 4.43 6.788 4 7.236 4h9.527c.448 0 .834.43.963.857L19.313 9H4.688l1.585-4.143zM7 21H5v-1h2v1zm12 0h-2v-1h2v1zm2.189-3H2.811l-.662-6.607L3 11h18l.852.393L21.189 18z"
                    })]
                }),
                solid: de("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 512 512",
                    children: de("path", {
                        d: "M39.61 196.8L74.8 96.29C88.27 57.78 124.6 32 165.4 32H346.6C387.4 32 423.7 57.78 437.2 96.29L472.4 196.8C495.6 206.4 512 229.3 512 256V448C512 465.7 497.7 480 480 480H448C430.3 480 416 465.7 416 448V400H96V448C96 465.7 81.67 480 64 480H32C14.33 480 0 465.7 0 448V256C0 229.3 16.36 206.4 39.61 196.8V196.8zM109.1 192H402.9L376.8 117.4C372.3 104.6 360.2 96 346.6 96H165.4C151.8 96 139.7 104.6 135.2 117.4L109.1 192zM96 256C78.33 256 64 270.3 64 288C64 305.7 78.33 320 96 320C113.7 320 128 305.7 128 288C128 270.3 113.7 256 96 256zM416 320C433.7 320 448 305.7 448 288C448 270.3 433.7 256 416 256C398.3 256 384 270.3 384 288C384 305.7 398.3 320 416 320z"
                    })
                })
            },
            symbols: {
                outline: de("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    children: de("path", {
                        d: "M0 0h11v2H0zM4 11h3V6h4V4H0v2h4zM15.5 17c1.381 0 2.5-1.116 2.5-2.493s-1.119-2.493-2.5-2.493S13 13.13 13 14.507 14.119 17 15.5 17m0-2.986c.276 0 .5.222.5.493 0 .272-.224.493-.5.493s-.5-.221-.5-.493.224-.493.5-.493M21.5 19.014c-1.381 0-2.5 1.116-2.5 2.493S20.119 24 21.5 24s2.5-1.116 2.5-2.493-1.119-2.493-2.5-2.493m0 2.986a.497.497 0 0 1-.5-.493c0-.271.224-.493.5-.493s.5.222.5.493a.497.497 0 0 1-.5.493M22 13l-9 9 1.513 1.5 8.99-9.009zM17 11c2.209 0 4-1.119 4-2.5V2s.985-.161 1.498.949C23.01 4.055 23 6 23 6s1-1.119 1-3.135C24-.02 21 0 21 0h-2v6.347A5.853 5.853 0 0 0 17 6c-2.209 0-4 1.119-4 2.5s1.791 2.5 4 2.5M10.297 20.482l-1.475-1.585a47.54 47.54 0 0 1-1.442 1.129c-.307-.288-.989-1.016-2.045-2.183.902-.836 1.479-1.466 1.729-1.892s.376-.871.376-1.336c0-.592-.273-1.178-.818-1.759-.546-.581-1.329-.871-2.349-.871-1.008 0-1.79.293-2.344.879-.556.587-.832 1.181-.832 1.784 0 .813.419 1.748 1.256 2.805-.847.614-1.444 1.208-1.794 1.784a3.465 3.465 0 0 0-.523 1.833c0 .857.308 1.56.924 2.107.616.549 1.423.823 2.42.823 1.173 0 2.444-.379 3.813-1.137L8.235 24h2.819l-2.09-2.383 1.333-1.135zm-6.736-6.389a1.02 1.02 0 0 1 .73-.286c.31 0 .559.085.747.254a.849.849 0 0 1 .283.659c0 .518-.419 1.112-1.257 1.784-.536-.651-.805-1.231-.805-1.742a.901.901 0 0 1 .302-.669M3.74 22c-.427 0-.778-.116-1.057-.349-.279-.232-.418-.487-.418-.766 0-.594.509-1.288 1.527-2.083.968 1.134 1.717 1.946 2.248 2.438-.921.507-1.686.76-2.3.76"
                    })
                }),
                solid: de("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 512 512",
                    children: de("path", {
                        d: "M500.3 7.251C507.7 13.33 512 22.41 512 31.1V175.1C512 202.5 483.3 223.1 447.1 223.1C412.7 223.1 383.1 202.5 383.1 175.1C383.1 149.5 412.7 127.1 447.1 127.1V71.03L351.1 90.23V207.1C351.1 234.5 323.3 255.1 287.1 255.1C252.7 255.1 223.1 234.5 223.1 207.1C223.1 181.5 252.7 159.1 287.1 159.1V63.1C287.1 48.74 298.8 35.61 313.7 32.62L473.7 .6198C483.1-1.261 492.9 1.173 500.3 7.251H500.3zM74.66 303.1L86.5 286.2C92.43 277.3 102.4 271.1 113.1 271.1H174.9C185.6 271.1 195.6 277.3 201.5 286.2L213.3 303.1H239.1C266.5 303.1 287.1 325.5 287.1 351.1V463.1C287.1 490.5 266.5 511.1 239.1 511.1H47.1C21.49 511.1-.0019 490.5-.0019 463.1V351.1C-.0019 325.5 21.49 303.1 47.1 303.1H74.66zM143.1 359.1C117.5 359.1 95.1 381.5 95.1 407.1C95.1 434.5 117.5 455.1 143.1 455.1C170.5 455.1 191.1 434.5 191.1 407.1C191.1 381.5 170.5 359.1 143.1 359.1zM440.3 367.1H496C502.7 367.1 508.6 372.1 510.1 378.4C513.3 384.6 511.6 391.7 506.5 396L378.5 508C372.9 512.1 364.6 513.3 358.6 508.9C352.6 504.6 350.3 496.6 353.3 489.7L391.7 399.1H336C329.3 399.1 323.4 395.9 321 389.6C318.7 383.4 320.4 376.3 325.5 371.1L453.5 259.1C459.1 255 467.4 254.7 473.4 259.1C479.4 263.4 481.6 271.4 478.7 278.3L440.3 367.1zM116.7 219.1L19.85 119.2C-8.112 90.26-6.614 42.31 24.85 15.34C51.82-8.137 93.26-3.642 118.2 21.83L128.2 32.32L137.7 21.83C162.7-3.642 203.6-8.137 231.6 15.34C262.6 42.31 264.1 90.26 236.1 119.2L139.7 219.1C133.2 225.6 122.7 225.6 116.7 219.1H116.7z"
                    })
                })
            }
        },
        search: {
            loupe: de("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                children: de("path", {
                    d: "M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                })
            }),
            delete: de("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                children: de("path", {
                    d: "M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
                })
            })
        }
    };
    function Ge(e) {
        var t = e.id
          , r = e.skin
          , n = e.emoji;
        if (e.shortcodes) {
            var o = e.shortcodes.match(Ie.SHORTCODES_REGEX);
            o && (t = o[1],
            o[2] && (r = o[2]))
        }
        if (n || (n = Ie.get(t || e.native)),
        !n)
            return e.fallback;
        var i = n.skins[r - 1] || n.skins[0]
          , a = i.src || ("native" == e.set || e.spritesheet ? void 0 : "function" == typeof e.getImageURL ? e.getImageURL(e.set, i.unified) : "https://cdn.jsdelivr.net/npm/emoji-datasource-".concat(e.set, "@15.0.1/img/").concat(e.set, "/64/").concat(i.unified, ".png"))
          , s = "function" == typeof e.getSpritesheetURL ? e.getSpritesheetURL(e.set) : "https://cdn.jsdelivr.net/npm/emoji-datasource-".concat(e.set, "@15.0.1/img/").concat(e.set, "/sheets-256/64.png");
        return de("span", {
            class: "emoji-mart-emoji",
            "data-emoji-set": e.set,
            children: a ? de("img", {
                style: {
                    maxWidth: e.size || "1em",
                    maxHeight: e.size || "1em",
                    display: "inline-block"
                },
                alt: i.native || i.shortcodes,
                src: a
            }) : "native" == e.set ? de("span", {
                style: {
                    fontSize: e.size,
                    fontFamily: '"EmojiMart", "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "Android Emoji"'
                },
                children: i.native
            }) : de("span", {
                style: {
                    display: "block",
                    width: e.size,
                    height: e.size,
                    backgroundImage: "url(".concat(s, ")"),
                    backgroundSize: "".concat(100 * Ce.sheet.cols, "% ").concat(100 * Ce.sheet.rows, "%"),
                    backgroundPosition: "".concat(100 / (Ce.sheet.cols - 1) * i.x, "% ").concat(100 / (Ce.sheet.rows - 1) * i.y, "%")
                }
            })
        })
    }
    function Ke() {
        if ("undefined" == typeof Reflect || !Reflect.construct)
            return !1;
        if (Reflect.construct.sham)
            return !1;
        if ("function" == typeof Proxy)
            return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}
            ))),
            !0
        } catch (e) {
            return !1
        }
    }
    function $e(e, t, r) {
        return ($e = Ke() ? Reflect.construct : function(e, t, r) {
            var n = [null];
            n.push.apply(n, t);
            var o = new (Function.bind.apply(e, n));
            return r && d(o, r.prototype),
            o
        }
        ).apply(null, arguments)
    }
    function Xe(e, t, r) {
        return $e.apply(null, arguments)
    }
    function Ye(e) {
        var t = "function" == typeof Map ? new Map : void 0;
        return Ye = function(e) {
            if (null === e || (r = e,
            -1 === Function.toString.call(r).indexOf("[native code]")))
                return e;
            var r;
            if ("function" != typeof e)
                throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== t) {
                if (t.has(e))
                    return t.get(e);
                t.set(e, n)
            }
            function n() {
                return Xe(e, arguments, S(this).constructor)
            }
            return n.prototype = Object.create(e.prototype, {
                constructor: {
                    value: n,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            d(n, e)
        }
        ,
        Ye(e)
    }
    function Je(e) {
        return Ye(e)
    }
    var Ze = function(e) {
        "use strict";
        h(r, e);
        var t = M(r);
        function r() {
            var e, o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (a(this, r),
            (e = t.call(this)).props = o,
            o.parent || o.ref) {
                var i = null
                  , s = o.parent || (i = o.ref && o.ref.current);
                i && (i.innerHTML = ""),
                s && s.appendChild(n(e))
            }
            return e
        }
        return c(r, [{
            key: "update",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                for (var t in e)
                    this.attributeChangedCallback(t, null, e[t])
            }
        }, {
            key: "attributeChangedCallback",
            value: function(e, t, r) {
                if (this.component) {
                    var n = Ae(e, l({}, e, r), this.constructor.Props, this);
                    this.component.componentWillReceiveProps ? this.component.componentWillReceiveProps(l({}, e, n)) : (this.component.props[e] = n,
                    this.component.forceUpdate())
                }
            }
        }, {
            key: "disconnectedCallback",
            value: function() {
                this.disconnected = !0,
                this.component && this.component.unregister && this.component.unregister()
            }
        }], [{
            key: "observedAttributes",
            get: function() {
                return Object.keys(this.Props)
            }
        }]),
        r
    }("undefined" != typeof window && window.HTMLElement ? window.HTMLElement : Object)
      , Qe = function(e) {
        "use strict";
        h(r, e);
        var t = M(r);
        function r(e) {
            var n, o = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).styles;
            return a(this, r),
            (n = t.call(this, e)).setShadow(),
            n.injectStyles(o),
            n
        }
        return c(r, [{
            key: "setShadow",
            value: function() {
                this.attachShadow({
                    mode: "open"
                })
            }
        }, {
            key: "injectStyles",
            value: function(e) {
                if (e) {
                    var t = document.createElement("style");
                    t.textContent = e,
                    this.shadowRoot.insertBefore(t, this.shadowRoot.firstChild)
                }
            }
        }]),
        r
    }(Je(Ze))
      , et = {
        fallback: "",
        id: "",
        native: "",
        shortcodes: "",
        size: {
            value: "",
            transform: function(e) {
                return /\D/.test(e) ? e : "".concat(e, "px")
            }
        },
        set: we.set,
        skin: we.skin
    }
      , tt = function(e) {
        "use strict";
        h(n, e);
        var r = M(n);
        function n(e) {
            return a(this, n),
            r.call(this, e)
        }
        return c(n, [{
            key: "connectedCallback",
            value: function() {
                var e = this;
                return i(t(z).mark((function r() {
                    var n;
                    return t(z).wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return (n = Be(e.props, et, e)).element = e,
                                n.ref = function(t) {
                                    e.component = t
                                }
                                ,
                                t.next = 5,
                                Pe();
                            case 5:
                                if (!e.disconnected) {
                                    t.next = 7;
                                    break
                                }
                                return t.abrupt("return");
                            case 7:
                                le(de(Ge, p({}, n)), e);
                            case 8:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), r)
                }
                )))()
            }
        }]),
        n
    }(Je(Ze));
    l(tt, "Props", et),
    "undefined" == typeof customElements || customElements.get("em-emoji") || customElements.define("em-emoji", tt);
    var rt, nt, ot = [], it = R.__b, at = R.__r, st = R.diffed, ct = R.__c, lt = R.unmount;
    function ut() {
        var e;
        for (ot.sort((function(e, t) {
            return e.__v.__b - t.__v.__b
        }
        )); e = ot.pop(); )
            if (e.__P)
                try {
                    e.__H.__h.forEach(ht),
                    e.__H.__h.forEach(pt),
                    e.__H.__h = []
                } catch (t) {
                    e.__H.__h = [],
                    R.__e(t, e.__v)
                }
    }
    R.__b = function(e) {
        rt = null,
        it && it(e)
    }
    ,
    R.__r = function(e) {
        at && at(e),
        0;
        var t = (rt = e.__c).__H;
        t && (t.__h.forEach(ht),
        t.__h.forEach(pt),
        t.__h = [])
    }
    ,
    R.diffed = function(e) {
        st && st(e);
        var t = e.__c;
        t && t.__H && t.__H.__h.length && (1 !== ot.push(t) && nt === R.requestAnimationFrame || ((nt = R.requestAnimationFrame) || function(e) {
            var t, r = function() {
                clearTimeout(n),
                dt && cancelAnimationFrame(t),
                setTimeout(e)
            }, n = setTimeout(r, 100);
            dt && (t = requestAnimationFrame(r))
        }
        )(ut)),
        rt = null
    }
    ,
    R.__c = function(e, t) {
        t.some((function(e) {
            try {
                e.__h.forEach(ht),
                e.__h = e.__h.filter((function(e) {
                    return !e.__ || pt(e)
                }
                ))
            } catch (r) {
                t.some((function(e) {
                    e.__h && (e.__h = [])
                }
                )),
                t = [],
                R.__e(r, e.__v)
            }
        }
        )),
        ct && ct(e, t)
    }
    ,
    R.unmount = function(e) {
        lt && lt(e);
        var t, r = e.__c;
        r && r.__H && (r.__H.__.forEach((function(e) {
            try {
                ht(e)
            } catch (e) {
                t = e
            }
        }
        )),
        t && R.__e(t, r.__v))
    }
    ;
    var dt = "function" == typeof requestAnimationFrame;
    function ht(e) {
        var t = rt
          , r = e.__c;
        "function" == typeof r && (e.__c = void 0,
        r()),
        rt = t
    }
    function pt(e) {
        var t = rt;
        e.__c = e.__(),
        rt = t
    }
    function ft(e, t) {
        for (var r in t)
            e[r] = t[r];
        return e
    }
    function vt(e, t) {
        for (var r in e)
            if ("__source" !== r && !(r in t))
                return !0;
        for (var n in t)
            if ("__source" !== n && e[n] !== t[n])
                return !0;
        return !1
    }
    function gt(e) {
        this.props = e
    }
    (gt.prototype = new W).isPureReactComponent = !0,
    gt.prototype.shouldComponentUpdate = function(e, t) {
        return vt(this.props, e) || vt(this.state, t)
    }
    ;
    var mt = R.__b;
    R.__b = function(e) {
        e.type && e.type.__f && e.ref && (e.props.ref = e.ref,
        e.ref = null),
        mt && mt(e)
    }
    ;
    "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref");
    var _t = R.__e;
    R.__e = function(e, t, r) {
        if (e.then)
            for (var n, o = t; o = o.__; )
                if ((n = o.__c) && n.__c)
                    return null == t.__e && (t.__e = r.__e,
                    t.__k = r.__k),
                    n.__c(e, t);
        _t(e, t, r)
    }
    ;
    var bt = R.unmount;
    function yt() {
        this.__u = 0,
        this.t = null,
        this.__b = null
    }
    function kt(e) {
        var t = e.__.__c;
        return t && t.__e && t.__e(e)
    }
    function wt() {
        this.u = null,
        this.o = null
    }
    R.unmount = function(e) {
        var t = e.__c;
        t && t.__R && t.__R(),
        t && !0 === e.__h && (e.type = null),
        bt && bt(e)
    }
    ,
    (yt.prototype = new W).__c = function(e, t) {
        var r = t.__c
          , n = this;
        null == n.t && (n.t = []),
        n.t.push(r);
        var o = kt(n.__v)
          , i = !1
          , a = function() {
            i || (i = !0,
            r.__R = null,
            o ? o(s) : s())
        };
        r.__R = a;
        var s = function() {
            if (!--n.__u) {
                if (n.state.__e) {
                    var e = n.state.__e;
                    n.__v.__k[0] = function e(t, r, n) {
                        return t && (t.__v = null,
                        t.__k = t.__k && t.__k.map((function(t) {
                            return e(t, r, n)
                        }
                        )),
                        t.__c && t.__c.__P === r && (t.__e && n.insertBefore(t.__e, t.__d),
                        t.__c.__e = !0,
                        t.__c.__P = n)),
                        t
                    }(e, e.__c.__P, e.__c.__O)
                }
                var t;
                for (n.setState({
                    __e: n.__b = null
                }); t = n.t.pop(); )
                    t.forceUpdate()
            }
        }
          , c = !0 === t.__h;
        n.__u++ || c || n.setState({
            __e: n.__b = n.__v.__k[0]
        }),
        e.then(a, a)
    }
    ,
    yt.prototype.componentWillUnmount = function() {
        this.t = []
    }
    ,
    yt.prototype.render = function(e, t) {
        if (this.__b) {
            if (this.__v.__k) {
                var r = document.createElement("div")
                  , n = this.__v.__k[0].__c;
                this.__v.__k[0] = function e(t, r, n) {
                    return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach((function(e) {
                        "function" == typeof e.__c && e.__c()
                    }
                    )),
                    t.__c.__H = null),
                    null != (t = ft({}, t)).__c && (t.__c.__P === n && (t.__c.__P = r),
                    t.__c = null),
                    t.__k = t.__k && t.__k.map((function(t) {
                        return e(t, r, n)
                    }
                    ))),
                    t
                }(this.__b, r, n.__O = n.__P)
            }
            this.__b = null
        }
        var o = t.__e && U(q, null, e.fallback);
        return o && (o.__h = null),
        [U(q, null, t.__e ? null : e.children), o]
    }
    ;
    var xt = function(e, t, r) {
        if (++r[1] === r[0] && e.o.delete(t),
        e.props.revealOrder && ("t" !== e.props.revealOrder[0] || !e.o.size))
            for (r = e.u; r; ) {
                for (; r.length > 3; )
                    r.pop()();
                if (r[1] < r[0])
                    break;
                e.u = r = r[2]
            }
    };
    (wt.prototype = new W).__e = function(e) {
        var t = this
          , r = kt(t.__v)
          , n = t.o.get(e);
        return n[0]++,
        function(o) {
            var i = function() {
                t.props.revealOrder ? (n.push(o),
                xt(t, e, n)) : o()
            };
            r ? r(i) : i()
        }
    }
    ,
    wt.prototype.render = function(e) {
        this.u = null,
        this.o = new Map;
        var t = Z(e.children);
        e.revealOrder && "b" === e.revealOrder[0] && t.reverse();
        for (var r = t.length; r--; )
            this.o.set(t[r], this.u = [1, 0, this.u]);
        return e.children
    }
    ,
    wt.prototype.componentDidUpdate = wt.prototype.componentDidMount = function() {
        var e = this;
        this.o.forEach((function(t, r) {
            xt(e, r, t)
        }
        ))
    }
    ;
    var Ct = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103
      , St = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/
      , jt = "undefined" != typeof document;
    W.prototype.isReactComponent = {},
    ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach((function(e) {
        Object.defineProperty(W.prototype, e, {
            configurable: !0,
            get: function() {
                return this["UNSAFE_" + e]
            },
            set: function(t) {
                Object.defineProperty(this, e, {
                    configurable: !0,
                    writable: !0,
                    value: t
                })
            }
        })
    }
    ));
    var Lt = R.event;
    function Mt() {}
    function zt() {
        return this.cancelBubble
    }
    function Et() {
        return this.defaultPrevented
    }
    R.event = function(e) {
        return Lt && (e = Lt(e)),
        e.persist = Mt,
        e.isPropagationStopped = zt,
        e.isDefaultPrevented = Et,
        e.nativeEvent = e
    }
    ;
    var Pt = {
        configurable: !0,
        get: function() {
            return this.class
        }
    }
      , Rt = R.vnode;
    R.vnode = function(e) {
        var t, r = e.type, n = e.props, o = n;
        if ("string" == typeof r) {
            var i = -1 === r.indexOf("-");
            for (var a in o = {},
            n) {
                var s = n[a];
                jt && "children" === a && "noscript" === r || "value" === a && "defaultValue"in n && null == s || ("defaultValue" === a && "value"in n && null == n.value ? a = "value" : "download" === a && !0 === s ? s = "" : /ondoubleclick/i.test(a) ? a = "ondblclick" : /^onchange(textarea|input)/i.test(a + r) && (t = n.type,
                !("undefined" != typeof Symbol && "symbol" == j(Symbol()) ? /fil|che|rad/i : /fil|che|ra/i).test(t)) ? a = "oninput" : /^onfocus$/i.test(a) ? a = "onfocusin" : /^onblur$/i.test(a) ? a = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp)/.test(a) ? a = a.toLowerCase() : i && St.test(a) ? a = a.replace(/[A-Z0-9]/, "-$&").toLowerCase() : null === s && (s = void 0),
                o[a] = s)
            }
            "select" == r && o.multiple && Array.isArray(o.value) && (o.value = Z(n.children).forEach((function(e) {
                e.props.selected = -1 != o.value.indexOf(e.props.value)
            }
            ))),
            "select" == r && null != o.defaultValue && (o.value = Z(n.children).forEach((function(e) {
                e.props.selected = o.multiple ? -1 != o.defaultValue.indexOf(e.props.value) : o.defaultValue == e.props.value
            }
            ))),
            e.props = o,
            n.class != n.className && (Pt.enumerable = "className"in n,
            null != n.className && (o.class = n.className),
            Object.defineProperty(o, "className", Pt))
        }
        e.$$typeof = Ct,
        Rt && Rt(e)
    }
    ;
    var Ot = R.__r;
    R.__r = function(e) {
        Ot && Ot(e),
        e.__c
    }
    ;
    var Bt = {
        light: "outline",
        dark: "solid"
    }
      , At = function(e) {
        "use strict";
        h(r, e);
        var t = M(r);
        function r() {
            var e;
            return a(this, r),
            (e = t.call(this)).categories = Ce.categories.filter((function(e) {
                return !e.target
            }
            )),
            e.state = {
                categoryId: e.categories[0].id
            },
            e
        }
        return c(r, [{
            key: "renderIcon",
            value: function(e) {
                var t = e.icon;
                if (t) {
                    if (t.svg)
                        return de("span", {
                            class: "flex",
                            dangerouslySetInnerHTML: {
                                __html: t.svg
                            }
                        });
                    if (t.src)
                        return de("img", {
                            src: t.src
                        })
                }
                var r = We.categories[e.id] || We.categories.custom;
                return r["auto" == this.props.icons ? Bt[this.props.theme] : this.props.icons] || r
            }
        }, {
            key: "render",
            value: function() {
                var e = this
                  , t = null;
                return de("nav", {
                    id: "nav",
                    class: "padding",
                    "data-position": this.props.position,
                    dir: this.props.dir,
                    children: de("div", {
                        class: "flex relative",
                        children: [this.categories.map((function(r, n) {
                            var o = e
                              , i = r.name || xe.categories[r.id]
                              , a = !e.props.unfocused && r.id == e.state.categoryId;
                            return a && (t = n),
                            de("button", {
                                "aria-label": i,
                                "aria-selected": a || void 0,
                                title: i,
                                type: "button",
                                class: "flex flex-grow flex-center",
                                onMouseDown: function(e) {
                                    return e.preventDefault()
                                },
                                onClick: function() {
                                    o.props.onClick({
                                        category: r,
                                        i: n
                                    })
                                },
                                children: e.renderIcon(r)
                            })
                        }
                        )), de("div", {
                            class: "bar",
                            style: {
                                width: "".concat(100 / this.categories.length, "%"),
                                opacity: null == t ? 0 : 1,
                                transform: "rtl" === this.props.dir ? "scaleX(-1) translateX(".concat(100 * t, "%)") : "translateX(".concat(100 * t, "%)")
                            }
                        })]
                    })
                })
            }
        }]),
        r
    }(gt)
      , Tt = function(e) {
        "use strict";
        h(r, e);
        var t = M(r);
        function r() {
            return a(this, r),
            t.apply(this, arguments)
        }
        return c(r, [{
            key: "shouldComponentUpdate",
            value: function(e) {
                for (var t in e)
                    if ("children" != t && e[t] != this.props[t])
                        return !0;
                return !1
            }
        }, {
            key: "render",
            value: function() {
                return this.props.children
            }
        }]),
        r
    }(gt)
      , Ht = 10
      , It = function(e) {
        "use strict";
        h(o, e);
        var r = M(o);
        function o(e) {
            var s;
            a(this, o),
            l(n(s = r.call(this)), "darkMediaCallback", (function() {
                "auto" == s.props.theme && s.setState({
                    theme: s.darkMedia.matches ? "dark" : "light"
                })
            }
            )),
            l(n(s), "handleClickOutside", (function(e) {
                var t = s.props.element;
                e.target != t && (s.state.showSkins && s.closeSkins(),
                s.props.onClickOutside && s.props.onClickOutside(e))
            }
            )),
            l(n(s), "handleBaseClick", (function(e) {
                s.state.showSkins && (e.target.closest(".menu") || (e.preventDefault(),
                e.stopImmediatePropagation(),
                s.closeSkins()))
            }
            )),
            l(n(s), "handleBaseKeydown", (function(e) {
                s.state.showSkins && "Escape" == e.key && (e.preventDefault(),
                e.stopImmediatePropagation(),
                s.closeSkins())
            }
            )),
            l(n(s), "handleSearchClick", (function() {
                s.getEmojiByPos(s.state.pos) && s.setState({
                    pos: [-1, -1]
                })
            }
            ));
            var c = n(s);
            return l(n(s), "handleSearchInput", i(t(z).mark((function e() {
                var r, n, o, i, a, s, l, u, d, h, p, f, v;
                return t(z).wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            if (r = c.refs.searchInput.current) {
                                e.next = 3;
                                break
                            }
                            return e.abrupt("return");
                        case 3:
                            return n = r.value,
                            e.next = 6,
                            Ie.search(n);
                        case 6:
                            if (o = e.sent,
                            i = function() {
                                c.refs.scroll.current && (c.refs.scroll.current.scrollTop = 0)
                            }
                            ,
                            o) {
                                e.next = 10;
                                break
                            }
                            return e.abrupt("return", c.setState({
                                searchResults: o,
                                pos: [-1, -1]
                            }, i));
                        case 10:
                            for (a = r.selectionStart == r.value.length ? [0, 0] : [-1, -1],
                            (s = []).setsize = o.length,
                            l = null,
                            u = !0,
                            d = !1,
                            h = void 0,
                            e.prev = 15,
                            p = o[Symbol.iterator](); !(u = (f = p.next()).done); u = !0)
                                v = f.value,
                                s.length && l.length != c.getPerLine() || ((l = []).__categoryId = "search",
                                l.__index = s.length,
                                s.push(l)),
                                l.push(v);
                            e.next = 23;
                            break;
                        case 19:
                            e.prev = 19,
                            e.t0 = e.catch(15),
                            d = !0,
                            h = e.t0;
                        case 23:
                            e.prev = 23,
                            e.prev = 24,
                            u || null == p.return || p.return();
                        case 26:
                            if (e.prev = 26,
                            !d) {
                                e.next = 29;
                                break
                            }
                            throw h;
                        case 29:
                            return e.finish(26);
                        case 30:
                            return e.finish(23);
                        case 31:
                            c.ignoreMouse(),
                            c.setState({
                                searchResults: s,
                                pos: a
                            }, i);
                        case 33:
                        case "end":
                            return e.stop()
                        }
                }
                ), e, null, [[15, 19, 23, 31], [24, , 26, 30]])
            }
            )))),
            l(n(s), "handleSearchKeyDown", (function(e) {
                var t = e.currentTarget;
                switch (e.stopImmediatePropagation(),
                e.key) {
                case "ArrowLeft":
                    s.navigate({
                        e: e,
                        input: t,
                        left: !0
                    });
                    break;
                case "ArrowRight":
                    s.navigate({
                        e: e,
                        input: t,
                        right: !0
                    });
                    break;
                case "ArrowUp":
                    s.navigate({
                        e: e,
                        input: t,
                        up: !0
                    });
                    break;
                case "ArrowDown":
                    s.navigate({
                        e: e,
                        input: t,
                        down: !0
                    });
                    break;
                case "Enter":
                    e.preventDefault(),
                    s.handleEmojiClick({
                        e: e,
                        pos: s.state.pos
                    });
                    break;
                case "Escape":
                    e.preventDefault(),
                    s.state.searchResults ? s.clearSearch() : s.unfocusSearch()
                }
            }
            )),
            l(n(s), "clearSearch", (function() {
                var e = s.refs.searchInput.current;
                e && (e.value = "",
                e.focus(),
                s.handleSearchInput())
            }
            )),
            l(n(s), "handleCategoryClick", (function(e) {
                var t = e.category
                  , r = e.i;
                s.scrollTo(0 == r ? {
                    row: -1
                } : {
                    categoryId: t.id
                })
            }
            )),
            l(n(s), "openSkins", (function(e) {
                var r = e.currentTarget.getBoundingClientRect()
                  , o = n(s);
                s.setState({
                    showSkins: r
                }, i(t(z).mark((function e() {
                    var r;
                    return t(z).wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                Fe(2);
                            case 2:
                                if (r = o.refs.menu.current) {
                                    e.next = 5;
                                    break
                                }
                                return e.abrupt("return");
                            case 5:
                                r.classList.remove("hidden"),
                                o.refs.skinToneRadio.current.focus(),
                                o.base.addEventListener("click", o.handleBaseClick, !0),
                                o.base.addEventListener("keydown", o.handleBaseKeydown, !0);
                            case 9:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e)
                }
                ))))
            }
            )),
            s.observers = [],
            s.state = p({
                pos: [-1, -1],
                perLine: s.initDynamicPerLine(e),
                visibleRows: {
                    0: !0
                }
            }, s.getInitialState(e)),
            s
        }
        return c(o, [{
            key: "getInitialState",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props;
                return {
                    skin: he.get("skin") || e.skin,
                    theme: this.initTheme(e.theme)
                }
            }
        }, {
            key: "componentWillMount",
            value: function() {
                this.dir = xe.rtl ? "rtl" : "ltr",
                this.refs = {
                    menu: {
                        current: null
                    },
                    navigation: {
                        current: null
                    },
                    scroll: {
                        current: null
                    },
                    search: {
                        current: null
                    },
                    searchInput: {
                        current: null
                    },
                    skinToneButton: {
                        current: null
                    },
                    skinToneRadio: {
                        current: null
                    }
                },
                this.initGrid(),
                0 == this.props.stickySearch && "sticky" == this.props.searchPosition && (console.warn("[EmojiMart] Deprecation warning: `stickySearch` has been renamed `searchPosition`."),
                this.props.searchPosition = "static")
            }
        }, {
            key: "componentDidMount",
            value: function() {
                if (this.register(),
                this.shadowRoot = this.base.parentNode,
                this.props.autoFocus) {
                    var e = this.refs.searchInput;
                    e.current && e.current.focus()
                }
            }
        }, {
            key: "componentWillReceiveProps",
            value: function(e) {
                var t = this;
                for (var r in this.nextState || (this.nextState = {}),
                e)
                    this.nextState[r] = e[r];
                clearTimeout(this.nextStateTimer),
                this.nextStateTimer = setTimeout((function() {
                    var e = !1;
                    for (var r in t.nextState)
                        t.props[r] = t.nextState[r],
                        "custom" !== r && "categories" !== r || (e = !0);
                    delete t.nextState;
                    var n = t.getInitialState();
                    if (e)
                        return t.reset(n);
                    t.setState(n)
                }
                ))
            }
        }, {
            key: "componentWillUnmount",
            value: function() {
                this.unregister()
            }
        }, {
            key: "reset",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , r = this;
                return i(t(z).mark((function n() {
                    return t(z).wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return t.next = 2,
                                Pe(r.props);
                            case 2:
                                r.initGrid(),
                                r.unobserve(),
                                r.setState(e, (function() {
                                    r.observeCategories(),
                                    r.observeRows()
                                }
                                ));
                            case 5:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), n)
                }
                )))()
            }
        }, {
            key: "register",
            value: function() {
                document.addEventListener("click", this.handleClickOutside),
                this.observe()
            }
        }, {
            key: "unregister",
            value: function() {
                var e;
                document.removeEventListener("click", this.handleClickOutside),
                null === (e = this.darkMedia) || void 0 === e || e.removeEventListener("change", this.darkMediaCallback),
                this.unobserve()
            }
        }, {
            key: "observe",
            value: function() {
                this.observeCategories(),
                this.observeRows()
            }
        }, {
            key: "unobserve",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , t = e.except
                  , r = void 0 === t ? [] : t;
                Array.isArray(r) || (r = [r]);
                var n = !0
                  , o = !1
                  , i = void 0;
                try {
                    for (var a, s = this.observers[Symbol.iterator](); !(n = (a = s.next()).done); n = !0) {
                        var c = a.value;
                        r.includes(c) || c.disconnect()
                    }
                } catch (e) {
                    o = !0,
                    i = e
                } finally {
                    try {
                        n || null == s.return || s.return()
                    } finally {
                        if (o)
                            throw i
                    }
                }
                this.observers = [].concat(r)
            }
        }, {
            key: "initGrid",
            value: function() {
                var e = this
                  , t = Ce.categories;
                this.refs.categories = new Map;
                var r = Ce.categories.map((function(e) {
                    return e.id
                }
                )).join(",");
                this.navKey && this.navKey != r && this.refs.scroll.current && (this.refs.scroll.current.scrollTop = 0),
                this.navKey = r,
                this.grid = [],
                this.grid.setsize = 0;
                var n = function(t, r) {
                    var n = [];
                    n.__categoryId = r.id,
                    n.__index = t.length,
                    e.grid.push(n);
                    var o = e.grid.length - 1
                      , i = o % Ht ? {} : {
                        current: null
                    };
                    return i.index = o,
                    i.posinset = e.grid.setsize + 1,
                    t.push(i),
                    n
                }
                  , o = !0
                  , i = !1
                  , a = void 0;
                try {
                    for (var s, c = t[Symbol.iterator](); !(o = (s = c.next()).done); o = !0) {
                        var l = s.value
                          , u = []
                          , d = n(u, l)
                          , h = !0
                          , p = !1
                          , f = void 0;
                        try {
                            for (var v, g = l.emojis[Symbol.iterator](); !(h = (v = g.next()).done); h = !0) {
                                var m = v.value;
                                d.length == this.getPerLine() && (d = n(u, l)),
                                this.grid.setsize += 1,
                                d.push(m)
                            }
                        } catch (e) {
                            p = !0,
                            f = e
                        } finally {
                            try {
                                h || null == g.return || g.return()
                            } finally {
                                if (p)
                                    throw f
                            }
                        }
                        this.refs.categories.set(l.id, {
                            root: {
                                current: null
                            },
                            rows: u
                        })
                    }
                } catch (e) {
                    i = !0,
                    a = e
                } finally {
                    try {
                        o || null == c.return || c.return()
                    } finally {
                        if (i)
                            throw a
                    }
                }
            }
        }, {
            key: "initTheme",
            value: function(e) {
                if ("auto" != e)
                    return e;
                if (!this.darkMedia) {
                    if (this.darkMedia = matchMedia("(prefers-color-scheme: dark)"),
                    this.darkMedia.media.match(/^not/))
                        return "light";
                    this.darkMedia.addEventListener("change", this.darkMediaCallback)
                }
                return this.darkMedia.matches ? "dark" : "light"
            }
        }, {
            key: "initDynamicPerLine",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props
                  , t = this;
                if (e.dynamicWidth) {
                    var r = e.element
                      , n = e.emojiButtonSize
                      , o = function() {
                        var e = r.getBoundingClientRect().width;
                        return Math.floor(e / n)
                    }
                      , i = new ResizeObserver((function() {
                        var e = t;
                        t.unobserve({
                            except: i
                        }),
                        t.setState({
                            perLine: o()
                        }, (function() {
                            var t = e;
                            e.initGrid(),
                            e.forceUpdate((function() {
                                t.observeCategories(),
                                t.observeRows()
                            }
                            ))
                        }
                        ))
                    }
                    ));
                    return i.observe(r),
                    this.observers.push(i),
                    o()
                }
            }
        }, {
            key: "getPerLine",
            value: function() {
                return this.state.perLine || this.props.perLine
            }
        }, {
            key: "getEmojiByPos",
            value: function(e) {
                var t = b(e, 2)
                  , r = t[0]
                  , n = t[1]
                  , o = this.state.searchResults || this.grid
                  , i = o[r] && o[r][n];
                if (i)
                    return Ie.get(i)
            }
        }, {
            key: "observeCategories",
            value: function() {
                var e = this.refs.navigation.current;
                if (e) {
                    var t = new Map
                      , r = {
                        root: this.refs.scroll.current,
                        threshold: [0, 1]
                    }
                      , n = new IntersectionObserver((function(r) {
                        var n = !0
                          , o = !1
                          , i = void 0;
                        try {
                            for (var a, s = r[Symbol.iterator](); !(n = (a = s.next()).done); n = !0) {
                                var c = a.value
                                  , l = c.target.dataset.id;
                                t.set(l, c.intersectionRatio)
                            }
                        } catch (e) {
                            o = !0,
                            i = e
                        } finally {
                            try {
                                n || null == s.return || s.return()
                            } finally {
                                if (o)
                                    throw i
                            }
                        }
                        var u, d = w(t), h = !0, p = !1, f = void 0;
                        try {
                            for (var v, g = d[Symbol.iterator](); !(h = (v = g.next()).done); h = !0) {
                                var m = b(v.value, 2)
                                  , _ = m[0];
                                if (m[1]) {
                                    (u = _) != e.state.categoryId && e.setState({
                                        categoryId: u
                                    });
                                    break
                                }
                            }
                        } catch (e) {
                            p = !0,
                            f = e
                        } finally {
                            try {
                                h || null == g.return || g.return()
                            } finally {
                                if (p)
                                    throw f
                            }
                        }
                    }
                    ),r)
                      , o = !0
                      , i = !1
                      , a = void 0;
                    try {
                        for (var s, c = this.refs.categories.values()[Symbol.iterator](); !(o = (s = c.next()).done); o = !0) {
                            var l = s.value.root;
                            n.observe(l.current)
                        }
                    } catch (e) {
                        i = !0,
                        a = e
                    } finally {
                        try {
                            o || null == c.return || c.return()
                        } finally {
                            if (i)
                                throw a
                        }
                    }
                    this.observers.push(n)
                }
            }
        }, {
            key: "observeRows",
            value: function() {
                var e = this
                  , t = p({}, this.state.visibleRows)
                  , r = new IntersectionObserver((function(r) {
                    var n = !0
                      , o = !1
                      , i = void 0;
                    try {
                        for (var a, s = r[Symbol.iterator](); !(n = (a = s.next()).done); n = !0) {
                            var c = a.value
                              , l = parseInt(c.target.dataset.index);
                            c.isIntersecting ? t[l] = !0 : delete t[l]
                        }
                    } catch (e) {
                        o = !0,
                        i = e
                    } finally {
                        try {
                            n || null == s.return || s.return()
                        } finally {
                            if (o)
                                throw i
                        }
                    }
                    e.setState({
                        visibleRows: t
                    })
                }
                ),{
                    root: this.refs.scroll.current,
                    rootMargin: "".concat(this.props.emojiButtonSize * (Ht + 5), "px 0px ").concat(this.props.emojiButtonSize * Ht, "px")
                })
                  , n = !0
                  , o = !1
                  , i = void 0;
                try {
                    for (var a, s = this.refs.categories.values()[Symbol.iterator](); !(n = (a = s.next()).done); n = !0) {
                        var c = a.value.rows
                          , l = !0
                          , u = !1
                          , d = void 0;
                        try {
                            for (var h, f = c[Symbol.iterator](); !(l = (h = f.next()).done); l = !0) {
                                var v = h.value;
                                v.current && r.observe(v.current)
                            }
                        } catch (e) {
                            u = !0,
                            d = e
                        } finally {
                            try {
                                l || null == f.return || f.return()
                            } finally {
                                if (u)
                                    throw d
                            }
                        }
                    }
                } catch (e) {
                    o = !0,
                    i = e
                } finally {
                    try {
                        n || null == s.return || s.return()
                    } finally {
                        if (o)
                            throw i
                    }
                }
                this.observers.push(r)
            }
        }, {
            key: "preventDefault",
            value: function(e) {
                e.preventDefault()
            }
        }, {
            key: "unfocusSearch",
            value: function() {
                var e = this.refs.searchInput.current;
                e && e.blur()
            }
        }, {
            key: "navigate",
            value: function(e) {
                var t = e.e
                  , r = e.input
                  , n = e.left
                  , o = e.right
                  , i = e.up
                  , a = e.down
                  , s = this
                  , c = this.state.searchResults || this.grid;
                if (c.length) {
                    var l = b(this.state.pos, 2)
                      , u = l[0]
                      , d = l[1]
                      , h = function() {
                        if (0 == u && 0 == d && !t.repeat && (n || i))
                            return null;
                        if (-1 == u)
                            return t.repeat || !o && !a || r.selectionStart != r.value.length ? null : [0, 0];
                        if (n || o) {
                            var e = c[u]
                              , s = n ? -1 : 1;
                            if (!e[d += s]) {
                                if (!(e = c[u += s]))
                                    return u = n ? 0 : c.length - 1,
                                    d = n ? 0 : c[u].length - 1,
                                    [u, d];
                                d = n ? e.length - 1 : 0
                            }
                            return [u, d]
                        }
                        if (i || a) {
                            var l = c[u += i ? -1 : 1];
                            return l ? (l[d] || (d = l.length - 1),
                            [u, d]) : (u = i ? 0 : c.length - 1,
                            d = i ? 0 : c[u].length - 1,
                            [u, d])
                        }
                    }();
                    h ? (t.preventDefault(),
                    this.setState({
                        pos: h,
                        keyboard: !0
                    }, (function() {
                        s.scrollTo({
                            row: h[0]
                        })
                    }
                    ))) : this.state.pos[0] > -1 && this.setState({
                        pos: [-1, -1]
                    })
                }
            }
        }, {
            key: "scrollTo",
            value: function(e) {
                var t = e.categoryId
                  , r = e.row
                  , n = this.state.searchResults || this.grid;
                if (n.length) {
                    var o = this.refs.scroll.current
                      , i = o.getBoundingClientRect()
                      , a = 0;
                    if (r >= 0 && (t = n[r].__categoryId),
                    t)
                        a = (this.refs[t] || this.refs.categories.get(t).root).current.getBoundingClientRect().top - (i.top - o.scrollTop) + 1;
                    if (r >= 0)
                        if (r) {
                            var s = a + n[r].__index * this.props.emojiButtonSize
                              , c = s + this.props.emojiButtonSize + .88 * this.props.emojiButtonSize;
                            if (s < o.scrollTop)
                                a = s;
                            else {
                                if (!(c > o.scrollTop + i.height))
                                    return;
                                a = c - i.height
                            }
                        } else
                            a = 0;
                    this.ignoreMouse(),
                    o.scrollTop = a
                }
            }
        }, {
            key: "ignoreMouse",
            value: function() {
                var e = this;
                this.mouseIsIgnored = !0,
                clearTimeout(this.ignoreMouseTimer),
                this.ignoreMouseTimer = setTimeout((function() {
                    delete e.mouseIsIgnored
                }
                ), 100)
            }
        }, {
            key: "handleEmojiOver",
            value: function(e) {
                this.mouseIsIgnored || this.state.showSkins || this.setState({
                    pos: e || [-1, -1],
                    keyboard: !1
                })
            }
        }, {
            key: "handleEmojiClick",
            value: function(e) {
                var t = e.e
                  , r = e.emoji
                  , n = e.pos;
                if (this.props.onEmojiSelect && (!r && n && (r = this.getEmojiByPos(n)),
                r)) {
                    var o = Ue(r, {
                        skinIndex: this.state.skin - 1
                    });
                    this.props.maxFrequentRows && ke.add(o, this.props),
                    this.props.onEmojiSelect(o, t)
                }
            }
        }, {
            key: "closeSkins",
            value: function() {
                this.state.showSkins && (this.setState({
                    showSkins: null,
                    tempSkin: null
                }),
                this.base.removeEventListener("click", this.handleBaseClick),
                this.base.removeEventListener("keydown", this.handleBaseKeydown))
            }
        }, {
            key: "handleSkinMouseOver",
            value: function(e) {
                this.setState({
                    tempSkin: e
                })
            }
        }, {
            key: "handleSkinClick",
            value: function(e) {
                this.ignoreMouse(),
                this.closeSkins(),
                this.setState({
                    skin: e,
                    tempSkin: null
                }),
                he.set("skin", e)
            }
        }, {
            key: "renderNav",
            value: function() {
                return de(At, {
                    ref: this.refs.navigation,
                    icons: this.props.icons,
                    theme: this.state.theme,
                    dir: this.dir,
                    unfocused: !!this.state.searchResults,
                    position: this.props.navPosition,
                    onClick: this.handleCategoryClick
                }, this.navKey)
            }
        }, {
            key: "renderPreview",
            value: function() {
                var e = this.getEmojiByPos(this.state.pos)
                  , t = this.state.searchResults && !this.state.searchResults.length;
                return de("div", {
                    id: "preview",
                    class: "flex flex-middle",
                    dir: this.dir,
                    "data-position": this.props.previewPosition,
                    children: [de("div", {
                        class: "flex flex-middle flex-grow",
                        children: [de("div", {
                            class: "flex flex-auto flex-middle flex-center",
                            style: {
                                height: this.props.emojiButtonSize,
                                fontSize: this.props.emojiButtonSize
                            },
                            children: de(Ge, {
                                emoji: e,
                                id: t ? this.props.noResultsEmoji || "cry" : this.props.previewEmoji || ("top" == this.props.previewPosition ? "point_down" : "point_up"),
                                set: this.props.set,
                                size: this.props.emojiButtonSize,
                                skin: this.state.tempSkin || this.state.skin,
                                spritesheet: !0,
                                getSpritesheetURL: this.props.getSpritesheetURL
                            })
                        }), de("div", {
                            class: "margin-".concat(this.dir[0]),
                            children: de("div", e || t ? {
                                class: "padding-".concat(this.dir[2], " align-").concat(this.dir[0]),
                                children: [de("div", {
                                    class: "preview-title ellipsis",
                                    children: e ? e.name : xe.search_no_results_1
                                }), de("div", {
                                    class: "preview-subtitle ellipsis color-c",
                                    children: e ? e.skins[0].shortcodes : xe.search_no_results_2
                                })]
                            } : {
                                class: "preview-placeholder color-c",
                                children: xe.pick
                            })
                        })]
                    }), !e && "preview" == this.props.skinTonePosition && this.renderSkinToneButton()]
                })
            }
        }, {
            key: "renderEmojiButton",
            value: function(e, t) {
                var r, n, o = t.pos, i = t.posinset, a = t.grid, s = this, c = this.props.emojiButtonSize, l = this.state.tempSkin || this.state.skin, u = (e.skins[l - 1] || e.skins[0]).native, d = (r = this.state.pos,
                n = o,
                Array.isArray(r) && Array.isArray(n) && r.length === n.length && r.every((function(e, t) {
                    return e == n[t]
                }
                ))), h = o.concat(e.id).join("");
                return de(Tt, {
                    selected: d,
                    skin: l,
                    size: c,
                    children: de("button", {
                        "aria-label": u,
                        "aria-selected": d || void 0,
                        "aria-posinset": i,
                        "aria-setsize": a.setsize,
                        "data-keyboard": this.state.keyboard,
                        title: "none" == this.props.previewPosition ? e.name : void 0,
                        type: "button",
                        class: "flex flex-center flex-middle",
                        tabindex: "-1",
                        onClick: function(t) {
                            return s.handleEmojiClick({
                                e: t,
                                emoji: e
                            })
                        },
                        onMouseEnter: function() {
                            return s.handleEmojiOver(o)
                        },
                        onMouseLeave: function() {
                            return s.handleEmojiOver()
                        },
                        style: {
                            width: this.props.emojiButtonSize,
                            height: this.props.emojiButtonSize,
                            fontSize: this.props.emojiSize,
                            lineHeight: 0
                        },
                        children: [de("div", {
                            "aria-hidden": "true",
                            class: "background",
                            style: {
                                borderRadius: this.props.emojiButtonRadius,
                                backgroundColor: this.props.emojiButtonColors ? this.props.emojiButtonColors[(i - 1) % this.props.emojiButtonColors.length] : void 0
                            }
                        }), de(Ge, {
                            emoji: e,
                            set: this.props.set,
                            size: this.props.emojiSize,
                            skin: l,
                            spritesheet: !0,
                            getSpritesheetURL: this.props.getSpritesheetURL
                        })]
                    })
                }, h)
            }
        }, {
            key: "renderSearch",
            value: function() {
                var e = "none" == this.props.previewPosition || "search" == this.props.skinTonePosition;
                return de("div", {
                    children: [de("div", {
                        class: "spacer"
                    }), de("div", {
                        class: "flex flex-middle",
                        children: [de("div", {
                            class: "search relative flex-grow",
                            children: [de("input", {
                                type: "search",
                                ref: this.refs.searchInput,
                                placeholder: xe.search,
                                onClick: this.handleSearchClick,
                                onInput: this.handleSearchInput,
                                onKeyDown: this.handleSearchKeyDown,
                                autoComplete: "off"
                            }), de("span", {
                                class: "icon loupe flex",
                                children: We.search.loupe
                            }), this.state.searchResults && de("button", {
                                title: "Clear",
                                "aria-label": "Clear",
                                type: "button",
                                class: "icon delete flex",
                                onClick: this.clearSearch,
                                onMouseDown: this.preventDefault,
                                children: We.search.delete
                            })]
                        }), e && this.renderSkinToneButton()]
                    })]
                })
            }
        }, {
            key: "renderSearchResults",
            value: function() {
                var e = this
                  , t = this.state.searchResults;
                return t ? de("div", {
                    class: "category",
                    ref: this.refs.search,
                    children: [de("div", {
                        class: "sticky padding-small align-".concat(this.dir[0]),
                        children: xe.categories.search
                    }), de("div", {
                        children: t.length ? t.map((function(r, n) {
                            var o = e;
                            return de("div", {
                                class: "flex",
                                children: r.map((function(e, r) {
                                    return o.renderEmojiButton(e, {
                                        pos: [n, r],
                                        posinset: n * o.props.perLine + r + 1,
                                        grid: t
                                    })
                                }
                                ))
                            })
                        }
                        )) : de("div", {
                            class: "padding-small align-".concat(this.dir[0]),
                            children: this.props.onAddCustomEmoji && de("a", {
                                onClick: this.props.onAddCustomEmoji,
                                children: xe.add_custom
                            })
                        })
                    })]
                }) : null
            }
        }, {
            key: "renderCategories",
            value: function() {
                var e = this
                  , t = Ce.categories
                  , r = !!this.state.searchResults
                  , n = this.getPerLine();
                return de("div", {
                    style: {
                        visibility: r ? "hidden" : void 0,
                        display: r ? "none" : void 0,
                        height: "100%"
                    },
                    children: t.map((function(t) {
                        var r = e
                          , o = e.refs.categories.get(t.id)
                          , i = o.root
                          , a = o.rows;
                        return de("div", {
                            "data-id": t.target ? t.target.id : t.id,
                            class: "category",
                            ref: i,
                            children: [de("div", {
                                class: "sticky padding-small align-".concat(e.dir[0]),
                                children: t.name || xe.categories[t.id]
                            }), de("div", {
                                class: "relative",
                                style: {
                                    height: a.length * e.props.emojiButtonSize
                                },
                                children: a.map((function(e, o) {
                                    var i, a = r, s = e.index - e.index % Ht, c = r.state.visibleRows[s], l = "current"in e ? e : void 0;
                                    if (!c && !l)
                                        return null;
                                    var u = o * n
                                      , d = u + n
                                      , h = t.emojis.slice(u, d);
                                    return h.length < n && (i = h).push.apply(i, w(new Array(n - h.length))),
                                    de("div", {
                                        "data-index": e.index,
                                        ref: l,
                                        class: "flex row",
                                        style: {
                                            top: o * r.props.emojiButtonSize
                                        },
                                        children: c && h.map((function(t, r) {
                                            if (!t)
                                                return de("div", {
                                                    style: {
                                                        width: a.props.emojiButtonSize,
                                                        height: a.props.emojiButtonSize
                                                    }
                                                });
                                            var n = Ie.get(t);
                                            return a.renderEmojiButton(n, {
                                                pos: [e.index, r],
                                                posinset: e.posinset + r,
                                                grid: a.grid
                                            })
                                        }
                                        ))
                                    }, e.index)
                                }
                                ))
                            })]
                        })
                    }
                    ))
                })
            }
        }, {
            key: "renderSkinToneButton",
            value: function() {
                return "none" == this.props.skinTonePosition ? null : de("div", {
                    class: "flex flex-auto flex-center flex-middle",
                    style: {
                        position: "relative",
                        width: this.props.emojiButtonSize,
                        height: this.props.emojiButtonSize
                    },
                    children: de("button", {
                        type: "button",
                        ref: this.refs.skinToneButton,
                        class: "skin-tone-button flex flex-auto flex-center flex-middle",
                        "aria-selected": this.state.showSkins ? "" : void 0,
                        "aria-label": xe.skins.choose,
                        title: xe.skins.choose,
                        onClick: this.openSkins,
                        style: {
                            width: this.props.emojiSize,
                            height: this.props.emojiSize
                        },
                        children: de("span", {
                            class: "skin-tone skin-tone-".concat(this.state.skin)
                        })
                    })
                })
            }
        }, {
            key: "renderLiveRegion",
            value: function() {
                var e = this.getEmojiByPos(this.state.pos);
                return de("div", {
                    "aria-live": "polite",
                    class: "sr-only",
                    children: e ? e.name : ""
                })
            }
        }, {
            key: "renderSkins",
            value: function() {
                var e = this
                  , t = this.refs.skinToneButton.current.getBoundingClientRect()
                  , r = this.base.getBoundingClientRect()
                  , n = {};
                return "ltr" == this.dir ? n.right = r.right - t.right - 3 : n.left = t.left - r.left - 3,
                "bottom" == this.props.previewPosition && "preview" == this.props.skinTonePosition ? n.bottom = r.bottom - t.top + 6 : (n.top = t.bottom - r.top + 3,
                n.bottom = "auto"),
                de("div", {
                    ref: this.refs.menu,
                    role: "radiogroup",
                    dir: this.dir,
                    "aria-label": xe.skins.choose,
                    class: "menu hidden",
                    "data-position": n.top ? "top" : "bottom",
                    style: n,
                    children: w(Array(6).keys()).map((function(t) {
                        var r = e
                          , n = t + 1
                          , o = e.state.skin == n;
                        return de("div", {
                            children: [de("input", {
                                type: "radio",
                                name: "skin-tone",
                                value: n,
                                "aria-label": xe.skins[n],
                                ref: o ? e.refs.skinToneRadio : null,
                                defaultChecked: o,
                                onChange: function() {
                                    return r.handleSkinMouseOver(n)
                                },
                                onKeyDown: function(e) {
                                    "Enter" != e.code && "Space" != e.code && "Tab" != e.code || (e.preventDefault(),
                                    r.handleSkinClick(n))
                                }
                            }), de("button", {
                                "aria-hidden": "true",
                                tabindex: "-1",
                                onClick: function() {
                                    return r.handleSkinClick(n)
                                },
                                onMouseEnter: function() {
                                    return r.handleSkinMouseOver(n)
                                },
                                onMouseLeave: function() {
                                    return r.handleSkinMouseOver()
                                },
                                class: "option flex flex-grow flex-middle",
                                children: [de("span", {
                                    class: "skin-tone skin-tone-".concat(n)
                                }), de("span", {
                                    class: "margin-small-lr",
                                    children: xe.skins[n]
                                })]
                            })]
                        })
                    }
                    ))
                })
            }
        }, {
            key: "render",
            value: function() {
                var e = this.props.perLine * this.props.emojiButtonSize;
                return de("section", {
                    id: "root",
                    class: "flex flex-column",
                    dir: this.dir,
                    style: {
                        width: this.props.dynamicWidth ? "100%" : "calc(".concat(e, "px + (var(--padding) + var(--sidebar-width)))")
                    },
                    "data-emoji-set": this.props.set,
                    "data-theme": this.state.theme,
                    "data-menu": this.state.showSkins ? "" : void 0,
                    children: ["top" == this.props.previewPosition && this.renderPreview(), "top" == this.props.navPosition && this.renderNav(), "sticky" == this.props.searchPosition && de("div", {
                        class: "padding-lr",
                        children: this.renderSearch()
                    }), de("div", {
                        ref: this.refs.scroll,
                        class: "scroll flex-grow padding-lr",
                        children: de("div", {
                            style: {
                                width: this.props.dynamicWidth ? "100%" : e,
                                height: "100%"
                            },
                            children: ["static" == this.props.searchPosition && this.renderSearch(), this.renderSearchResults(), this.renderCategories()]
                        })
                    }), "bottom" == this.props.navPosition && this.renderNav(), "bottom" == this.props.previewPosition && this.renderPreview(), this.state.showSkins && this.renderSkins(), this.renderLiveRegion()]
                })
            }
        }]),
        o
    }(W)
      , Dt = function(e) {
        "use strict";
        h(n, e);
        var r = M(n);
        function n(e) {
            return a(this, n),
            r.call(this, e, {
                styles: t(Ft)
            })
        }
        return c(n, [{
            key: "connectedCallback",
            value: function() {
                var e = this;
                return i(t(z).mark((function r() {
                    var n;
                    return t(z).wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return (n = Be(e.props, we, e)).element = e,
                                n.ref = function(t) {
                                    e.component = t
                                }
                                ,
                                t.next = 5,
                                Pe(n);
                            case 5:
                                if (!e.disconnected) {
                                    t.next = 7;
                                    break
                                }
                                return t.abrupt("return");
                            case 7:
                                le(de(It, p({}, n)), e.shadowRoot);
                            case 8:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), r)
                }
                )))()
            }
        }]),
        n
    }(Qe);
    l(Dt, "Props", we),
    "undefined" == typeof customElements || customElements.get("em-emoji-picker") || customElements.define("em-emoji-picker", Dt);
    var Ft = {};
    Ft = ':host{width:min-content;height:435px;min-height:230px;border-radius:var(--border-radius);box-shadow:var(--shadow);--border-radius:10px;--category-icon-size:18px;--font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif;--font-size:15px;--preview-placeholder-size:21px;--preview-title-size:1.1em;--preview-subtitle-size:.9em;--shadow-color:0deg 0% 0%;--shadow:.3px .5px 2.7px hsl(var(--shadow-color)/.14),.4px .8px 1px -3.2px hsl(var(--shadow-color)/.14),1px 2px 2.5px -4.5px hsl(var(--shadow-color)/.14);display:flex}[data-theme=light]{--em-rgb-color:var(--rgb-color,34,36,39);--em-rgb-accent:var(--rgb-accent,34,102,237);--em-rgb-background:var(--rgb-background,255,255,255);--em-rgb-input:var(--rgb-input,255,255,255);--em-color-border:var(--color-border,rgba(0,0,0,.05));--em-color-border-over:var(--color-border-over,rgba(0,0,0,.1))}[data-theme=dark]{--em-rgb-color:var(--rgb-color,222,222,221);--em-rgb-accent:var(--rgb-accent,58,130,247);--em-rgb-background:var(--rgb-background,21,22,23);--em-rgb-input:var(--rgb-input,0,0,0);--em-color-border:var(--color-border,rgba(255,255,255,.1));--em-color-border-over:var(--color-border-over,rgba(255,255,255,.2))}#root{--color-a:rgb(var(--em-rgb-color));--color-b:rgba(var(--em-rgb-color),.65);--color-c:rgba(var(--em-rgb-color),.45);--padding:12px;--padding-small:calc(var(--padding)/2);--sidebar-width:16px;--duration:225ms;--duration-fast:125ms;--duration-instant:50ms;--easing:cubic-bezier(.4,0,.2,1);width:100%;text-align:left;border-radius:var(--border-radius);background-color:rgb(var(--em-rgb-background));position:relative}@media (prefers-reduced-motion){#root{--duration:0;--duration-fast:0;--duration-instant:0}}#root[data-menu] button{cursor:auto}#root[data-menu] .menu button{cursor:pointer}:host,#root,input,button{color:rgb(var(--em-rgb-color));font-family:var(--font-family);font-size:var(--font-size);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;line-height:normal}*,:before,:after{box-sizing:border-box;min-width:0;margin:0;padding:0}.relative{position:relative}.flex{display:flex}.flex-auto{flex:none}.flex-center{justify-content:center}.flex-column{flex-direction:column}.flex-grow{flex:auto}.flex-middle{align-items:center}.flex-wrap{flex-wrap:wrap}.padding{padding:var(--padding)}.padding-t{padding-top:var(--padding)}.padding-lr{padding-left:var(--padding);padding-right:var(--padding)}.padding-r{padding-right:var(--padding)}.padding-small{padding:var(--padding-small)}.padding-small-b{padding-bottom:var(--padding-small)}.padding-small-lr{padding-left:var(--padding-small);padding-right:var(--padding-small)}.margin{margin:var(--padding)}.margin-r{margin-right:var(--padding)}.margin-l{margin-left:var(--padding)}.margin-small-l{margin-left:var(--padding-small)}.margin-small-lr{margin-left:var(--padding-small);margin-right:var(--padding-small)}.align-l{text-align:left}.align-r{text-align:right}.color-a{color:var(--color-a)}.color-b{color:var(--color-b)}.color-c{color:var(--color-c)}.ellipsis{white-space:nowrap;max-width:100%;width:auto;text-overflow:ellipsis;overflow:hidden}.sr-only{width:1px;height:1px;position:absolute;top:auto;left:-10000px;overflow:hidden}a{cursor:pointer;color:rgb(var(--em-rgb-accent))}a:hover{text-decoration:underline}.spacer{height:10px}[dir=rtl] .scroll{padding-left:0;padding-right:var(--padding)}.scroll{padding-right:0;overflow-x:hidden;overflow-y:auto}.scroll::-webkit-scrollbar{width:var(--sidebar-width);height:var(--sidebar-width)}.scroll::-webkit-scrollbar-track{border:0}.scroll::-webkit-scrollbar-button{width:0;height:0;display:none}.scroll::-webkit-scrollbar-corner{background-color:transparent}.scroll::-webkit-scrollbar-thumb{min-height:20%;min-height:65px;border:4px solid rgb(var(--em-rgb-background));border-radius:8px}.scroll::-webkit-scrollbar-thumb:hover{background-color:var(--em-color-border-over)!important}.scroll:hover::-webkit-scrollbar-thumb{background-color:var(--em-color-border)}.sticky{z-index:1;background-color:rgba(var(--em-rgb-background),.9);-webkit-backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);font-weight:500;position:sticky;top:-1px}[dir=rtl] .search input[type=search]{padding:10px 2.2em 10px 2em}[dir=rtl] .search .loupe{left:auto;right:.7em}[dir=rtl] .search .delete{left:.7em;right:auto}.search{z-index:2;position:relative}.search input,.search button{font-size:calc(var(--font-size) - 1px)}.search input[type=search]{width:100%;background-color:var(--em-color-border);transition-duration:var(--duration);transition-property:background-color,box-shadow;transition-timing-function:var(--easing);border:0;border-radius:10px;outline:0;padding:10px 2em 10px 2.2em;display:block}.search input[type=search]::-ms-input-placeholder{color:inherit;opacity:.6}.search input[type=search]::placeholder{color:inherit;opacity:.6}.search input[type=search],.search input[type=search]::-webkit-search-decoration,.search input[type=search]::-webkit-search-cancel-button,.search input[type=search]::-webkit-search-results-button,.search input[type=search]::-webkit-search-results-decoration{-webkit-appearance:none;-ms-appearance:none;appearance:none}.search input[type=search]:focus{background-color:rgb(var(--em-rgb-input));box-shadow:inset 0 0 0 1px rgb(var(--em-rgb-accent)),0 1px 3px rgba(65,69,73,.2)}.search .icon{z-index:1;color:rgba(var(--em-rgb-color),.7);position:absolute;top:50%;transform:translateY(-50%)}.search .loupe{pointer-events:none;left:.7em}.search .delete{right:.7em}svg{fill:currentColor;width:1em;height:1em}button{-webkit-appearance:none;-ms-appearance:none;appearance:none;cursor:pointer;color:currentColor;background-color:transparent;border:0}#nav{z-index:2;padding-top:12px;padding-bottom:12px;padding-right:var(--sidebar-width);position:relative}#nav button{color:var(--color-b);transition:color var(--duration)var(--easing)}#nav button:hover{color:var(--color-a)}#nav svg,#nav img{width:var(--category-icon-size);height:var(--category-icon-size)}#nav[dir=rtl] .bar{left:auto;right:0}#nav .bar{width:100%;height:3px;background-color:rgb(var(--em-rgb-accent));transition:transform var(--duration)var(--easing);border-radius:3px 3px 0 0;position:absolute;bottom:-12px;left:0}#nav button[aria-selected]{color:rgb(var(--em-rgb-accent))}#preview{z-index:2;padding:calc(var(--padding) + 4px)var(--padding);padding-right:var(--sidebar-width);position:relative}#preview .preview-placeholder{font-size:var(--preview-placeholder-size)}#preview .preview-title{font-size:var(--preview-title-size)}#preview .preview-subtitle{font-size:var(--preview-subtitle-size)}#nav:before,#preview:before{content:"";height:2px;position:absolute;left:0;right:0}#nav[data-position=top]:before,#preview[data-position=top]:before{background:linear-gradient(to bottom,var(--em-color-border),transparent);top:100%}#nav[data-position=bottom]:before,#preview[data-position=bottom]:before{background:linear-gradient(to top,var(--em-color-border),transparent);bottom:100%}.category:last-child{min-height:calc(100% + 1px)}.category button{font-family:-apple-system,BlinkMacSystemFont,Helvetica Neue,sans-serif;position:relative}.category button>*{position:relative}.category button .background{opacity:0;background-color:var(--em-color-border);transition:opacity var(--duration-fast)var(--easing)var(--duration-instant);position:absolute;top:0;bottom:0;left:0;right:0}.category button:hover .background{transition-duration:var(--duration-instant);transition-delay:0s}.category button[aria-selected] .background{opacity:1}.category button[data-keyboard] .background{transition:none}.row{width:100%;position:absolute;top:0;left:0}.skin-tone-button{border:1px solid transparent;border-radius:100%}.skin-tone-button:hover{border-color:var(--em-color-border)}.skin-tone-button:active .skin-tone{transform:scale(.85)!important}.skin-tone-button .skin-tone{transition:transform var(--duration)var(--easing)}.skin-tone-button[aria-selected]{background-color:var(--em-color-border);border-top-color:rgba(0,0,0,.05);border-bottom-color:transparent;border-left-width:0;border-right-width:0}.skin-tone-button[aria-selected] .skin-tone{transform:scale(.9)}.menu{z-index:2;white-space:nowrap;border:1px solid var(--em-color-border);background-color:rgba(var(--em-rgb-background),.9);-webkit-backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);transition-property:opacity,transform;transition-duration:var(--duration);transition-timing-function:var(--easing);border-radius:10px;padding:4px;position:absolute;box-shadow:1px 1px 5px rgba(0,0,0,.05)}.menu.hidden{opacity:0}.menu[data-position=bottom]{transform-origin:100% 100%}.menu[data-position=bottom].hidden{transform:scale(.9)rotate(-3deg)translateY(5%)}.menu[data-position=top]{transform-origin:100% 0}.menu[data-position=top].hidden{transform:scale(.9)rotate(3deg)translateY(-5%)}.menu input[type=radio]{clip:rect(0 0 0 0);width:1px;height:1px;border:0;margin:0;padding:0;position:absolute;overflow:hidden}.menu input[type=radio]:checked+.option{box-shadow:0 0 0 2px rgb(var(--em-rgb-accent))}.option{width:100%;border-radius:6px;padding:4px 6px}.option:hover{color:#fff;background-color:rgb(var(--em-rgb-accent))}.skin-tone{width:16px;height:16px;border-radius:100%;display:inline-block;position:relative;overflow:hidden}.skin-tone:after{content:"";mix-blend-mode:overlay;background:linear-gradient(rgba(255,255,255,.2),transparent);border:1px solid rgba(0,0,0,.8);border-radius:100%;position:absolute;top:0;bottom:0;left:0;right:0;box-shadow:inset 0 -2px 3px #000,inset 0 1px 2px #fff}.skin-tone-1{background-color:#ffc93a}.skin-tone-2{background-color:#ffdab7}.skin-tone-3{background-color:#e7b98f}.skin-tone-4{background-color:#c88c61}.skin-tone-5{background-color:#a46134}.skin-tone-6{background-color:#5d4437}[data-index]{justify-content:space-between}[data-emoji-set=twitter] .skin-tone:after{box-shadow:none;border-color:rgba(0,0,0,.5)}[data-emoji-set=twitter] .skin-tone-1{background-color:#fade72}[data-emoji-set=twitter] .skin-tone-2{background-color:#f3dfd0}[data-emoji-set=twitter] .skin-tone-3{background-color:#eed3a8}[data-emoji-set=twitter] .skin-tone-4{background-color:#cfad8d}[data-emoji-set=twitter] .skin-tone-5{background-color:#a8805d}[data-emoji-set=twitter] .skin-tone-6{background-color:#765542}[data-emoji-set=google] .skin-tone:after{box-shadow:inset 0 0 2px 2px rgba(0,0,0,.4)}[data-emoji-set=google] .skin-tone-1{background-color:#f5c748}[data-emoji-set=google] .skin-tone-2{background-color:#f1d5aa}[data-emoji-set=google] .skin-tone-3{background-color:#d4b48d}[data-emoji-set=google] .skin-tone-4{background-color:#aa876b}[data-emoji-set=google] .skin-tone-5{background-color:#916544}[data-emoji-set=google] .skin-tone-6{background-color:#61493f}[data-emoji-set=facebook] .skin-tone:after{border-color:rgba(0,0,0,.4);box-shadow:inset 0 -2px 3px #000,inset 0 1px 4px #fff}[data-emoji-set=facebook] .skin-tone-1{background-color:#f5c748}[data-emoji-set=facebook] .skin-tone-2{background-color:#f1d5aa}[data-emoji-set=facebook] .skin-tone-3{background-color:#d4b48d}[data-emoji-set=facebook] .skin-tone-4{background-color:#aa876b}[data-emoji-set=facebook] .skin-tone-5{background-color:#916544}[data-emoji-set=facebook] .skin-tone-6{background-color:#61493f}',
    window.EmojiMart = r
}();
//# sourceMappingURL=browser.js.map
