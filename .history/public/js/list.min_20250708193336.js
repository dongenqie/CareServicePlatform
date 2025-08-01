var List;
List = function() {
    var t = {
        "./src/add-async.js": function(t) {
            t.exports = function(t) {
                return function e(r, n, s) {
                    var i = r.splice(0, 50);
                    s = (s = s || []).concat(t.add(i)),
                    r.length > 0 ? setTimeout((function() {
                        e(r, n, s)
                    }
                    ), 1) : (t.update(),
                    n(s))
                }
            }
        },
        "./src/filter.js": function(t) {
            t.exports = function(t) {
                return t.handlers.filterStart = t.handlers.filterStart || [],
                t.handlers.filterComplete = t.handlers.filterComplete || [],
                function(e) {
                    if (t.trigger("filterStart"),
                    t.i = 1,
                    t.reset.filter(),
                    void 0 === e)
                        t.filtered = !1;
                    else {
                        t.filtered = !0;
                        for (var r = t.items, n = 0, s = r.length; n < s; n++) {
                            var i = r[n];
                            e(i) ? i.filtered = !0 : i.filtered = !1
                        }
                    }
                    return t.update(),
                    t.trigger("filterComplete"),
                    t.visibleItems
                }
            }
        },
        "./src/fuzzy-search.js": function(t, e, r) {
            r("./src/utils/classes.js");
            var n = r("./src/utils/events.js")
              , s = r("./src/utils/extend.js")
              , i = r("./src/utils/to-string.js")
              , a = r("./src/utils/get-by-class.js")
              , o = r("./src/utils/fuzzy.js");
            t.exports = function(t, e) {
                e = s({
                    location: 0,
                    distance: 100,
                    threshold: .4,
                    multiSearch: !0,
                    searchClass: "fuzzy-search"
                }, e = e || {});
                var r = {
                    search: function(n, s) {
                        for (var i = e.multiSearch ? n.replace(/ +$/, "").split(/ +/) : [n], a = 0, o = t.items.length; a < o; a++)
                            r.item(t.items[a], s, i)
                    },
                    item: function(t, e, n) {
                        for (var s = !0, i = 0; i < n.length; i++) {
                            for (var a = !1, o = 0, l = e.length; o < l; o++)
                                r.values(t.values(), e[o], n[i]) && (a = !0);
                            a || (s = !1)
                        }
                        t.found = s
                    },
                    values: function(t, r, n) {
                        if (t.hasOwnProperty(r)) {
                            var s = i(t[r]).toLowerCase();
                            if (o(s, n, e))
                                return !0
                        }
                        return !1
                    }
                };
                return n.bind(a(t.listContainer, e.searchClass), "keyup", t.utils.events.debounce((function(e) {
                    var n = e.target || e.srcElement;
                    t.search(n.value, r.search)
                }
                ), t.searchDelay)),
                function(e, n) {
                    t.search(e, n, r.search)
                }
            }
        },
        "./src/index.js": function(t, e, r) {
            var n = r("./node_modules/string-natural-compare/natural-compare.js")
              , s = r("./src/utils/get-by-class.js")
              , i = r("./src/utils/extend.js")
              , a = r("./src/utils/index-of.js")
              , o = r("./src/utils/events.js")
              , l = r("./src/utils/to-string.js")
              , u = r("./src/utils/classes.js")
              , c = r("./src/utils/get-attribute.js")
              , f = r("./src/utils/to-array.js");
            t.exports = function(t, e, h) {
                var d, v = this, g = r("./src/item.js")(v), m = r("./src/add-async.js")(v), p = r("./src/pagination.js")(v);
                this.reIndex = function() {
                    v.items = [],
                    v.visibleItems = [],
                    v.matchingItems = [],
                    v.searched = !1,
                    v.filtered = !1,
                    v.parse(v.list)
                }
                ,
                this.toJSON = function() {
                    for (var t = [], e = 0, r = v.items.length; e < r; e++)
                        t.push(v.items[e].values());
                    return t
                }
                ,
                this.add = function(t, e) {
                    if (0 !== t.length) {
                        if (!e) {
                            var r = []
                              , n = !1;
                            void 0 === t[0] && (t = [t]);
                            for (var s = 0, i = t.length; s < i; s++) {
                                var a;
                                n = v.items.length > v.page,
                                a = new g(t[s],void 0,n),
                                v.items.push(a),
                                r.push(a)
                            }
                            return v.update(),
                            r
                        }
                        m(t.slice(0), e)
                    }
                }
                ,
                this.show = function(t, e) {
                    return this.i = t,
                    this.page = e,
                    v.update(),
                    v
                }
                ,
                this.remove = function(t, e, r) {
                    for (var n = 0, s = 0, i = v.items.length; s < i; s++)
                        v.items[s].values()[t] == e && (v.templater.remove(v.items[s], r),
                        v.items.splice(s, 1),
                        i--,
                        s--,
                        n++);
                    return v.update(),
                    n
                }
                ,
                this.get = function(t, e) {
                    for (var r = [], n = 0, s = v.items.length; n < s; n++) {
                        var i = v.items[n];
                        i.values()[t] == e && r.push(i)
                    }
                    return r
                }
                ,
                this.size = function() {
                    return v.items.length
                }
                ,
                this.clear = function() {
                    return v.templater.clear(),
                    v.items = [],
                    v
                }
                ,
                this.on = function(t, e) {
                    return v.handlers[t].push(e),
                    v
                }
                ,
                this.off = function(t, e) {
                    var r = v.handlers[t]
                      , n = a(r, e);
                    return n > -1 && r.splice(n, 1),
                    v
                }
                ,
                this.trigger = function(t) {
                    for (var e = v.handlers[t].length; e--; )
                        v.handlers[t][e](v);
                    return v
                }
                ,
                this.reset = {
                    filter: function() {
                        for (var t = v.items, e = t.length; e--; )
                            t[e].filtered = !1;
                        return v
                    },
                    search: function() {
                        for (var t = v.items, e = t.length; e--; )
                            t[e].found = !1;
                        return v
                    }
                },
                this.update = function() {
                    var t = v.items
                      , e = t.length;
                    v.visibleItems = [],
                    v.matchingItems = [],
                    v.templater.clear();
                    for (var r = 0; r < e; r++)
                        t[r].matching() && v.matchingItems.length + 1 >= v.i && v.visibleItems.length < v.page ? (t[r].show(),
                        v.visibleItems.push(t[r]),
                        v.matchingItems.push(t[r])) : t[r].matching() ? (v.matchingItems.push(t[r]),
                        t[r].hide()) : t[r].hide();
                    return v.trigger("updated"),
                    v
                }
                
            }
        },
        "./src/item.js": function(t) {
            t.exports = function(t) {
                return function(e, r, n) {
                    var s = this;
                    this._values = {},
                    this.found = !1,
                    this.filtered = !1;
                    this.values = function(e, r) {
                        if (void 0 === e)
                            return s._values;
                        for (var n in e)
                            s._values[n] = e[n];
                        !0 !== r && t.templater.set(s, s.values())
                    }
                    ,
                    this.show = function() {
                        t.templater.show(s)
                    }
                    ,
                    this.hide = function() {
                        t.templater.hide(s)
                    }
                    ,
                    this.matching = function() {
                        return t.filtered && t.searched && s.found && s.filtered || t.filtered && !t.searched && s.filtered || !t.filtered && t.searched && s.found || !t.filtered && !t.searched
                    }
                    ,
                    this.visible = function() {
                        return !(!s.elm || s.elm.parentNode != t.list)
                    }
                    ,
                    function(e, r, n) {
                        if (void 0 === r)
                            n ? s.values(e, n) : s.values(e);
                        else {
                            s.elm = r;
                            var i = t.templater.get(s, e);
                            s.values(i)
                        }
                    }(e, r, n)
                }
            }
        },
        "./src/pagination.js": function(t, e, r) {
            var n = r("./src/utils/classes.js")
              , s = r("./src/utils/events.js")
              , i = r("./src/index.js");
            t.exports = function(t) {
                var e = !1
                  , r = function(r, s) {
                    if (t.page < 1)
                        return t.listContainer.style.display = "none",
                        void (e = !0);
                    e && (t.listContainer.style.display = "block");
                    var i, o = t.matchingItems.length, l = t.i, u = t.page, c = Math.ceil(o / u), f = Math.ceil(l / u), h = s.innerWindow || 2, d = s.left || s.outerWindow || 0, v = s.right || s.outerWindow || 0;
                    v = c - v,
                    r.clear();
                    for (var g = 1; g <= c; g++) {
                        var m = f === g ? "active" : "";
                        a.number(g, d, v, f, h) ? (i = r.add({
                            page: g,
                            dotted: !1
                        })[0],
                        m && n(i.elm).add(m),
                        i.elm.firstChild.setAttribute("data-i", g),
                        i.elm.firstChild.setAttribute("data-page", u)) : a.dotted(r, g, d, v, f, h, r.size()) && (i = r.add({
                            page: "...",
                            dotted: !0
                        })[0],
                        n(i.elm).add("disabled"))
                    }
                }
                  , a = {
                    number: function(t, e, r, n, s) {
                        return this.left(t, e) || this.right(t, r) || this.innerWindow(t, n, s)
                    },
                    left: function(t, e) {
                        return t <= e
                    },
                    right: function(t, e) {
                        return t > e
                    },
                    innerWindow: function(t, e, r) {
                        return t >= e - r && t <= e + r
                    },
                    dotted: function(t, e, r, n, s, i, a) {
                        return this.dottedLeft(t, e, r, n, s, i) || this.dottedRight(t, e, r, n, s, i, a)
                    },
                    dottedLeft: function(t, e, r, n, s, i) {
                        return e == r + 1 && !this.innerWindow(e, s, i) && !this.right(e, n)
                    },
                    dottedRight: function(t, e, r, n, s, i, a) {
                        return !t.items[a - 1].values().dotted && (e == n && !this.innerWindow(e, s, i) && !this.right(e, n))
                    }
                };
                return function(e) {
                    var n = new i(t.listContainer.id,{
                        listClass: e.paginationClass || "pagination",
                        item: e.item || "<li><a class='page' href='#'></a></li>",
                        valueNames: ["page", "dotted"],
                        searchClass: "pagination-search-that-is-not-supposed-to-exist",
                        sortClass: "pagination-sort-that-is-not-supposed-to-exist"
                    });
                    s.bind(n.listContainer, "click", (function(e) {
                        var r = e.target || e.srcElement
                          , n = t.utils.getAttribute(r, "data-page")
                          , s = t.utils.getAttribute(r, "data-i");
                        s && t.show((s - 1) * n + 1, n)
                    }
                    )),
                    t.on("updated", (function() {
                        r(n, e)
                    }
                    )),
                    r(n, e)
                }
            }
        },
        "./src/parse.js": function(t, e, r) {
            t.exports = function(t) {
                var e = r("./src/item.js")(t)
                  , n = function(r, n) {
                    for (var s = 0, i = r.length; s < i; s++)
                        t.items.push(new e(n,r[s]))
                }
                  , s = function e(r, s) {
                    var i = r.splice(0, 50);
                    n(i, s),
                    r.length > 0 ? setTimeout((function() {
                        e(r, s)
                    }
                    ), 1) : (t.update(),
                    t.trigger("parseComplete"))
                };
                return t.handlers.parseComplete = t.handlers.parseComplete || [],
                function() {
                    var e = function(t) {
                        for (var e = t.childNodes, r = [], n = 0, s = e.length; n < s; n++)
                            void 0 === e[n].data && r.push(e[n]);
                        return r
                    }(t.list)
                      , r = t.valueNames;
                    t.indexAsync ? s(e, r) : n(e, r)
                }
            }
        },
        "./src/search.js": function(t) {
            t.exports = function(t) {
                var e, r, n, s = {
                    resetList: function() {
                        t.i = 1,
                        t.templater.clear(),
                        n = void 0
                    },
                    setOptions: function(t) {
                        2 == t.length && t[1]instanceof Array ? e = t[1] : 2 == t.length && "function" == typeof t[1] ? (e = void 0,
                        n = t[1]) : 3 == t.length ? (e = t[1],
                        n = t[2]) : e = void 0
                    },
                    setColumns: function() {
                        0 !== t.items.length && void 0 === e && (e = void 0 === t.searchColumns ? s.toArray(t.items[0].values()) : t.searchColumns)
                    },
                    setSearchString: function(e) {
                        e = (e = t.utils.toString(e).toLowerCase()).replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&"),
                        r = e
                    },
                    toArray: function(t) {
                        var e = [];
                        for (var r in t)
                            e.push(r);
                        return e
                    }
                }, i = function() {
                    for (var n, s = [], i = r; null !== (n = i.match(/"([^"]+)"/)); )
                        s.push(n[1]),
                        i = i.substring(0, n.index) + i.substring(n.index + n[0].length);
                    (i = i.trim()).length && (s = s.concat(i.split(/\s+/)));
                    for (var a = 0, o = t.items.length; a < o; a++) {
                        var l = t.items[a];
                        if (l.found = !1,
                        s.length) {
                            for (var u = 0, c = s.length; u < c; u++) {
                                for (var f = !1, h = 0, d = e.length; h < d; h++) {
                                    var v = l.values()
                                      , g = e[h];
                                    if (v.hasOwnProperty(g) && void 0 !== v[g] && null !== v[g])
                                        if (-1 !== ("string" != typeof v[g] ? v[g].toString() : v[g]).toLowerCase().indexOf(s[u])) {
                                            f = !0;
                                            break
                                        }
                                }
                                if (!f)
                                    break
                            }
                            l.found = f
                        }
                    }
                }, a = function() {
                    t.reset.search(),
                    t.searched = !1
                }, o = function(o) {
                    return t.trigger("searchStart"),
                    s.resetList(),
                    s.setSearchString(o),
                    s.setOptions(arguments),
                    s.setColumns(),
                    "" === r ? a() : (t.searched = !0,
                    n ? n(r, e) : i()),
                    t.update(),
                    t.trigger("searchComplete"),
                    t.visibleItems
                };
                return t.handlers.searchStart = t.handlers.searchStart || [],
                t.handlers.searchComplete = t.handlers.searchComplete || [],
                t.utils.events.bind(t.utils.getByClass(t.listContainer, t.searchClass), "keyup", t.utils.events.debounce((function(e) {
                    var r = e.target || e.srcElement;
                    "" === r.value && !t.searched || o(r.value)
                }
                ), t.searchDelay)),
                t.utils.events.bind(t.utils.getByClass(t.listContainer, t.searchClass), "input", (function(t) {
                    "" === (t.target || t.srcElement).value && o("")
                }
                )),
                o
            }
        },
        "./src/sort.js": function(t) {
            t.exports = function(t) {
                var e = {
                    els: void 0,
                    clear: function() {
                        for (var r = 0, n = e.els.length; r < n; r++)
                            t.utils.classes(e.els[r]).remove("asc"),
                            t.utils.classes(e.els[r]).remove("desc")
                    },
                    getOrder: function(e) {
                        var r = t.utils.getAttribute(e, "data-order");
                        return "asc" == r || "desc" == r ? r : t.utils.classes(e).has("desc") ? "asc" : t.utils.classes(e).has("asc") ? "desc" : "asc"
                    },
                    getInSensitive: function(e, r) {
                        var n = t.utils.getAttribute(e, "data-insensitive");
                        r.insensitive = "false" !== n
                    },
                    setOrder: function(r) {
                        for (var n = 0, s = e.els.length; n < s; n++) {
                            var i = e.els[n];
                            if (t.utils.getAttribute(i, "data-sort") === r.valueName) {
                                var a = t.utils.getAttribute(i, "data-order");
                                "asc" == a || "desc" == a ? a == r.order && t.utils.classes(i).add(r.order) : t.utils.classes(i).add(r.order)
                            }
                        }
                    }
                }
                  , r = function() {
                    t.trigger("sortStart");
                    var r = {}
                      , n = arguments[0].currentTarget || arguments[0].srcElement || void 0;
                    n ? (r.valueName = t.utils.getAttribute(n, "data-sort"),
                    e.getInSensitive(n, r),
                    r.order = e.getOrder(n)) : ((r = arguments[1] || r).valueName = arguments[0],
                    r.order = r.order || "asc",
                    r.insensitive = void 0 === r.insensitive || r.insensitive),
                    e.clear(),
                    e.setOrder(r);
                    var s, i = r.sortFunction || t.sortFunction || null, a = "desc" === r.order ? -1 : 1;
                    s = i ? function(t, e) {
                        return i(t, e, r) * a
                    }
                    : function(e, n) {
                        var s = t.utils.naturalSort;
                        return s.alphabet = t.alphabet || r.alphabet || void 0,
                        !s.alphabet && r.insensitive && (s = t.utils.naturalSort.caseInsensitive),
                        s(e.values()[r.valueName], n.values()[r.valueName]) * a
                    }
                    ,
                    t.items.sort(s),
                    t.update(),
                    t.trigger("sortComplete")
                };
                return t.handlers.sortStart = t.handlers.sortStart || [],
                t.handlers.sortComplete = t.handlers.sortComplete || [],
                e.els = t.utils.getByClass(t.listContainer, t.sortClass),
                t.utils.events.bind(e.els, "click", r),
                t.on("searchStart", e.clear),
                t.on("filterStart", e.clear),
                r
            }
        },
        "./src/templater.js": function(t) {
            var e = function(t) {
                var e, r = this, n = function(e, r) {
                    var n = e.cloneNode(!0);
                    n.removeAttribute("id");
                    for (var s = 0, i = r.length; s < i; s++) {
                        var a = void 0
                          , o = r[s];
                        if (o.data)
                            for (var l = 0, u = o.data.length; l < u; l++)
                                n.setAttribute("data-" + o.data[l], "");
                        else
                            o.attr && o.name ? (a = t.utils.getByClass(n, o.name, !0)) && a.setAttribute(o.attr, "") : (a = t.utils.getByClass(n, o, !0)) && (a.innerHTML = "")
                    }
                    return n
                }, s = function() {
                    for (var e = t.list.childNodes, r = 0, n = e.length; r < n; r++)
                        if (void 0 === e[r].data)
                            return e[r].cloneNode(!0)
                }, i = function(t) {
                    if ("string" == typeof t) {
                        if (/<tr[\s>]/g.exec(t)) {
                            var e = document.createElement("tbody");
                            return e.innerHTML = t,
                            e.firstElementChild
                        }
                        if (-1 !== t.indexOf("<")) {
                            var r = document.createElement("div");
                            return r.innerHTML = t,
                            r.firstElementChild
                        }
                    }
                }, a = function(e, r, n) {
                    var s = void 0
                      , i = function(e) {
                        for (var r = 0, n = t.valueNames.length; r < n; r++) {
                            var s = t.valueNames[r];
                            if (s.data) {
                                for (var i = s.data, a = 0, o = i.length; a < o; a++)
                                    if (i[a] === e)
                                        return {
                                            data: e
                                        }
                            } else {
                                if (s.attr && s.name && s.name == e)
                                    return s;
                                if (s === e)
                                    return e
                            }
                        }
                    }(r);
                    i && (i.data ? e.elm.setAttribute("data-" + i.data, n) : i.attr && i.name ? (s = t.utils.getByClass(e.elm, i.name, !0)) && s.setAttribute(i.attr, n) : (s = t.utils.getByClass(e.elm, i, !0)) && (s.innerHTML = n))
                };
                this.get = function(e, n) {
                    r.create(e);
                    for (var s = {}, i = 0, a = n.length; i < a; i++) {
                        var o = void 0
                          , l = n[i];
                        if (l.data)
                            for (var u = 0, c = l.data.length; u < c; u++)
                                s[l.data[u]] = t.utils.getAttribute(e.elm, "data-" + l.data[u]);
                        else
                            l.attr && l.name ? (o = t.utils.getByClass(e.elm, l.name, !0),
                            s[l.name] = o ? t.utils.getAttribute(o, l.attr) : "") : (o = t.utils.getByClass(e.elm, l, !0),
                            s[l] = o ? o.innerHTML : "")
                    }
                    return s
                }
                ,
                this.set = function(t, e) {
                    if (!r.create(t))
                        for (var n in e)
                            e.hasOwnProperty(n) && a(t, n, e[n])
                }
                ,
                this.create = function(t) {
                    return void 0 === t.elm && (t.elm = e(t.values()),
                    r.set(t, t.values()),
                    !0)
                }
                ,
                this.remove = function(e) {
                    e.elm.parentNode === t.list && t.list.removeChild(e.elm)
                }
                ,
                this.show = function(e) {
                    r.create(e),
                    t.list.appendChild(e.elm)
                }
                ,
                this.hide = function(e) {
                    void 0 !== e.elm && e.elm.parentNode === t.list && t.list.removeChild(e.elm)
                }
                ,
                this.clear = function() {
                    if (t.list.hasChildNodes())
                        for (; t.list.childNodes.length >= 1; )
                            t.list.removeChild(t.list.firstChild)
                }
                ,
                function() {
                    var r;
                    if ("function" != typeof t.item) {
                        if (!(r = "string" == typeof t.item ? -1 === t.item.indexOf("<") ? document.getElementById(t.item) : i(t.item) : s()))
                            throw new Error("The list needs to have at least one item on init otherwise you'll have to add a template.");
                        r = n(r, t.valueNames),
                        e = function() {
                            return r.cloneNode(!0)
                        }
                    } else
                        e = function(e) {
                            var r = t.item(e);
                            return i(r)
                        }
                }()
            };
            t.exports = function(t) {
                return new e(t)
            }
        },
        "./src/utils/classes.js": function(t, e, r) {
            var n = r("./src/utils/index-of.js")
              , s = /\s+/;
            Object.prototype.toString;
            function i(t) {
                if (!t || !t.nodeType)
                    throw new Error("A DOM element reference is required");
                this.el = t,
                this.list = t.classList
            }
            t.exports = function(t) {
                return new i(t)
            }
            ,
            i.prototype.add = function(t) {
                if (this.list)
                    return this.list.add(t),
                    this;
                var e = this.array();
                return ~n(e, t) || e.push(t),
                this.el.className = e.join(" "),
                this
            }
            ,
            i.prototype.remove = function(t) {
                if (this.list)
                    return this.list.remove(t),
                    this;
                var e = this.array()
                  , r = n(e, t);
                return ~r && e.splice(r, 1),
                this.el.className = e.join(" "),
                this
            }
            ,
            i.prototype.toggle = function(t, e) {
                return this.list ? (void 0 !== e ? e !== this.list.toggle(t, e) && this.list.toggle(t) : this.list.toggle(t),
                this) : (void 0 !== e ? e ? this.add(t) : this.remove(t) : this.has(t) ? this.remove(t) : this.add(t),
                this)
            }
            ,
            i.prototype.array = function() {
                var t = (this.el.getAttribute("class") || "").replace(/^\s+|\s+$/g, "").split(s);
                return "" === t[0] && t.shift(),
                t
            }
            ,
            i.prototype.has = i.prototype.contains = function(t) {
                return this.list ? this.list.contains(t) : !!~n(this.array(), t)
            }
        },
        "./src/utils/events.js": function(t, e, r) {
            var n = window.addEventListener ? "addEventListener" : "attachEvent"
              , s = window.removeEventListener ? "removeEventListener" : "detachEvent"
              , i = "addEventListener" !== n ? "on" : ""
              , a = r("./src/utils/to-array.js");
            e.bind = function(t, e, r, s) {
                for (var o = 0, l = (t = a(t)).length; o < l; o++)
                    t[o][n](i + e, r, s || !1)
            }
            ,
            e.unbind = function(t, e, r, n) {
                for (var o = 0, l = (t = a(t)).length; o < l; o++)
                    t[o][s](i + e, r, n || !1)
            }
            ,
            e.debounce = function(t, e, r) {
                var n;
                return e ? function() {
                    var s = this
                      , i = arguments
                      , a = function() {
                        n = null,
                        r || t.apply(s, i)
                    }
                      , o = r && !n;
                    clearTimeout(n),
                    n = setTimeout(a, e),
                    o && t.apply(s, i)
                }
                : t
            }
        },
        "./src/utils/extend.js": function(t) {
            t.exports = function(t) {
                for (var e, r = Array.prototype.slice.call(arguments, 1), n = 0; e = r[n]; n++)
                    if (e)
                        for (var s in e)
                            t[s] = e[s];
                return t
            }
        },
        "./src/utils/fuzzy.js": function(t) {
            t.exports = function(t, e, r) {
                var n = r.location || 0
                  , s = r.distance || 100
                  , i = r.threshold || .4;
                if (e === t)
                    return !0;
                if (e.length > 32)
                    return !1;
                var a = n
                  , o = function() {
                    var t, r = {};
                    for (t = 0; t < e.length; t++)
                        r[e.charAt(t)] = 0;
                    for (t = 0; t < e.length; t++)
                        r[e.charAt(t)] |= 1 << e.length - t - 1;
                    return r
                }();
                function l(t, r) {
                    var n = t / e.length
                      , i = Math.abs(a - r);
                    return s ? n + i / s : i ? 1 : n
                }
                var u = i
                  , c = t.indexOf(e, a);
                -1 != c && (u = Math.min(l(0, c), u),
                -1 != (c = t.lastIndexOf(e, a + e.length)) && (u = Math.min(l(0, c), u)));
                var f, h, d = 1 << e.length - 1;
                c = -1;
                for (var v, g = e.length + t.length, m = 0; m < e.length; m++) {
                    for (f = 0,
                    h = g; f < h; )
                        l(m, a + h) <= u ? f = h : g = h,
                        h = Math.floor((g - f) / 2 + f);
                    g = h;
                    var p = Math.max(1, a - h + 1)
                      , y = Math.min(a + h, t.length) + e.length
                      , C = Array(y + 2);
                    C[y + 1] = (1 << m) - 1;
                    for (var b = y; b >= p; b--) {
                        var j = o[t.charAt(b - 1)];
                        if (C[b] = 0 === m ? (C[b + 1] << 1 | 1) & j : (C[b + 1] << 1 | 1) & j | (v[b + 1] | v[b]) << 1 | 1 | v[b + 1],
                        C[b] & d) {
                            var x = l(m, b - 1);
                            if (x <= u) {
                                if (u = x,
                                !((c = b - 1) > a))
                                    break;
                                p = Math.max(1, 2 * a - c)
                            }
                        }
                    }
                    if (l(m + 1, a) > u)
                        break;
                    v = C
                }
                return !(c < 0)
            }
        },
        "./src/utils/get-attribute.js": function(t) {
            t.exports = function(t, e) {
                var r = t.getAttribute && t.getAttribute(e) || null;
                if (!r)
                    for (var n = t.attributes, s = n.length, i = 0; i < s; i++)
                        void 0 !== n[i] && n[i].nodeName === e && (r = n[i].nodeValue);
                return r
            }
        },
        "./src/utils/get-by-class.js": function(t) {
            t.exports = function(t, e, r, n) {
                return (n = n || {}).test && n.getElementsByClassName || !n.test && document.getElementsByClassName ? function(t, e, r) {
                    return r ? t.getElementsByClassName(e)[0] : t.getElementsByClassName(e)
                }(t, e, r) : n.test && n.querySelector || !n.test && document.querySelector ? function(t, e, r) {
                    return e = "." + e,
                    r ? t.querySelector(e) : t.querySelectorAll(e)
                }(t, e, r) : function(t, e, r) {
                    for (var n = [], s = t.getElementsByTagName("*"), i = s.length, a = new RegExp("(^|\\s)" + e + "(\\s|$)"), o = 0, l = 0; o < i; o++)
                        if (a.test(s[o].className)) {
                            if (r)
                                return s[o];
                            n[l] = s[o],
                            l++
                        }
                    return n
                }(t, e, r)
            }
        },
        "./src/utils/index-of.js": function(t) {
            var e = [].indexOf;
            t.exports = function(t, r) {
                if (e)
                    return t.indexOf(r);
                for (var n = 0, s = t.length; n < s; ++n)
                    if (t[n] === r)
                        return n;
                return -1
            }
        },
        "./src/utils/to-array.js": function(t) {
            t.exports = function(t) {
                if (void 0 === t)
                    return [];
                if (null === t)
                    return [null];
                if (t === window)
                    return [window];
                if ("string" == typeof t)
                    return [t];
                if (function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                }(t))
                    return t;
                if ("number" != typeof t.length)
                    return [t];
                if ("function" == typeof t && t instanceof Function)
                    return [t];
                for (var e = [], r = 0, n = t.length; r < n; r++)
                    (Object.prototype.hasOwnProperty.call(t, r) || r in t) && e.push(t[r]);
                return e.length ? e : []
            }
        },
        "./src/utils/to-string.js": function(t) {
            t.exports = function(t) {
                return t = (t = null === (t = void 0 === t ? "" : t) ? "" : t).toString()
            }
        },
        "./node_modules/string-natural-compare/natural-compare.js": function(t) {
            "use strict";
            var e, r, n = 0;
            function s(t) {
                return t >= 48 && t <= 57
            }
            function i(t, e) {
                for (var i = (t += "").length, a = (e += "").length, o = 0, l = 0; o < i && l < a; ) {
                    var u = t.charCodeAt(o)
                      , c = e.charCodeAt(l);
                    if (s(u)) {
                        if (!s(c))
                            return u - c;
                        for (var f = o, h = l; 48 === u && ++f < i; )
                            u = t.charCodeAt(f);
                        for (; 48 === c && ++h < a; )
                            c = e.charCodeAt(h);
                        for (var d = f, v = h; d < i && s(t.charCodeAt(d)); )
                            ++d;
                        for (; v < a && s(e.charCodeAt(v)); )
                            ++v;
                        var g = d - f - v + h;
                        if (g)
                            return g;
                        for (; f < d; )
                            if (g = t.charCodeAt(f++) - e.charCodeAt(h++))
                                return g;
                        o = d,
                        l = v
                    } else {
                        if (u !== c)
                            return u < n && c < n && -1 !== r[u] && -1 !== r[c] ? r[u] - r[c] : u - c;
                        ++o,
                        ++l
                    }
                }
                return o >= i && l < a && i >= a ? -1 : l >= a && o < i && a >= i ? 1 : i - a
            }
            i.caseInsensitive = i.i = function(t, e) {
                return i(("" + t).toLowerCase(), ("" + e).toLowerCase())
            }
            ,
            Object.defineProperties(i, {
                alphabet: {
                    get: function() {
                        return e
                    },
                    set: function(t) {
                        r = [];
                        var s = 0;
                        if (e = t)
                            for (; s < e.length; s++)
                                r[e.charCodeAt(s)] = s;
                        for (n = r.length,
                        s = 0; s < n; s++)
                            void 0 === r[s] && (r[s] = -1)
                    }
                }
            }),
            t.exports = i
        }
    }
      , e = {};
    return function r(n) {
        if (e[n])
            return e[n].exports;
        var s = e[n] = {
            exports: {}
        };
        return t[n](s, s.exports, r),
        s.exports
    }("./src/index.js")
}();
//# sourceMappingURL=list.min.js.map
