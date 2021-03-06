/*
 * Looking for the full, uncompressed source? Try here:
 *
 * httpss://github.com/nprapps/barkedu
 *
 * The following files are included in this compressed version:
 *
 * www/js/lib/modernizr.js
 * www/js/lib/jquery.js
 * www/js/lib/underscore.js
 * www/js/lib/bootstrap.js
 * www/js/lib/jquery.fullpage.js
 * www/js/lib/jquery.jplayer.js
 * www/js/lib/jquery.jplayer.fade.js
 * www/js/lib/webfont.js
 * www/js/lib/ZeroClipboard.js
 * www/js/app_config.js
 * www/js/copy.js
 * www/js/console.js
 * www/js/fonts.js
 * www/js/analytics.js
 * www/js/audio.js
 * www/js/app.js
 */
;
window.Modernizr = (function(window, document, undefined) {
    var version = '2.7.1',
        Modernizr = {},
        enableClasses = true,
        docElement = document.documentElement,
        mod = 'modernizr',
        modElem = document.createElement(mod),
        mStyle = modElem.style,
        inputElem = document.createElement('input'),
        smile = ':)',
        toString = {}.toString,
        prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
        omPrefixes = 'Webkit Moz O ms',
        cssomPrefixes = omPrefixes.split(' '),
        domPrefixes = omPrefixes.toLowerCase().split(' '),
        ns = {
            'svg': 'https://www.w3.org/2000/svg'
        },
        tests = {},
        inputs = {},
        attrs = {},
        classes = [],
        slice = classes.slice,
        featureName, injectElementWithStyles = function(rule, callback, nodes, testnames) {
            var style, ret, node, docOverflow, div = document.createElement('div'),
                body = document.body,
                fakeBody = body || document.createElement('body');
            if (parseInt(nodes, 10))
                while (nodes--) {
                    node = document.createElement('div');
                    node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
                    div.appendChild(node);
                }
            style = ['&#173;', '<style id="s', mod, '">', rule, '</style>'].join('');
            div.id = mod;
            (body ? div : fakeBody).innerHTML += style;
            fakeBody.appendChild(div);
            if (!body) {
                fakeBody.style.background = '';
                fakeBody.style.overflow = 'hidden';
                docOverflow = docElement.style.overflow;
                docElement.style.overflow = 'hidden';
                docElement.appendChild(fakeBody);
            }
            ret = callback(div, rule);
            if (!body) {
                fakeBody.parentNode.removeChild(fakeBody);
                docElement.style.overflow = docOverflow;
            } else div.parentNode.removeChild(div);
            return !!ret;
        },
        testMediaQuery = function(mq) {
            var matchMedia = window.matchMedia || window.msMatchMedia;
            if (matchMedia) return matchMedia(mq).matches;
            var bool;
            injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function(node) {
                bool = (window.getComputedStyle ? getComputedStyle(node, null) : node.currentStyle).position == 'absolute';
            });
            return bool;
        },
        isEventSupported = (function() {
            var TAGNAMES = {
                'select': 'input',
                'change': 'input',
                'submit': 'form',
                'reset': 'form',
                'error': 'img',
                'load': 'img',
                'abort': 'img'
            };

            function isEventSupported(eventName, element) {
                element = element || document.createElement(TAGNAMES[eventName] || 'div');
                eventName = 'on' + eventName;
                var isSupported = eventName in element;
                if (!isSupported) {
                    if (!element.setAttribute) element = document.createElement('div');
                    if (element.setAttribute && element.removeAttribute) {
                        element.setAttribute(eventName, '');
                        isSupported = is(element[eventName], 'function');
                        if (!is(element[eventName], 'undefined')) element[eventName] = undefined;
                        element.removeAttribute(eventName);
                    }
                }
                element = null;
                return isSupported;
            }
            return isEventSupported;
        })(),
        _hasOwnProperty = {}.hasOwnProperty,
        hasOwnProp;
    if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) hasOwnProp = function(object, property) {
        return _hasOwnProperty.call(object, property);
    };
    else hasOwnProp = function(object, property) {
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
    };
    if (!Function.prototype.bind) Function.prototype.bind = function bind(that) {
        var target = this;
        if (typeof target != "function") throw new TypeError();
        var args = slice.call(arguments, 1),
            bound = function() {
                if (this instanceof bound) {
                    var F = function() {};
                    F.prototype = target.prototype;
                    var self = new F();
                    var result = target.apply(self, args.concat(slice.call(arguments)));
                    if (Object(result) === result) return result;
                    return self;
                } else return target.apply(that, args.concat(slice.call(arguments)));
            };
        return bound;
    };

    function setCss(str) {
        mStyle.cssText = str;
    }

    function setCssAll(str1, str2) {
        return setCss(prefixes.join(str1 + ';') + (str2 || ''));
    }

    function is(obj, type) {
        return typeof obj === type;
    }

    function contains(str, substr) {
        return !!~('' + str).indexOf(substr);
    }

    function testProps(props, prefixed) {
        for (var i in props) {
            var prop = props[i];
            if (!contains(prop, "-") && mStyle[prop] !== undefined) return prefixed == 'pfx' ? prop : true;
        }
        return false;
    }

    function testDOMProps(props, obj, elem) {
        for (var i in props) {
            var item = obj[props[i]];
            if (item !== undefined) {
                if (elem === false) return props[i];
                if (is(item, 'function')) return item.bind(elem || obj);
                return item;
            }
        }
        return false;
    }

    function testPropsAll(prop, prefixed, elem) {
        var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
            props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');
        if (is(prefixed, "string") || is(prefixed, "undefined")) return testProps(props, prefixed);
        else {
            props = (prop + ' ' + domPrefixes.join(ucProp + ' ') + ucProp).split(' ');
            return testDOMProps(props, prefixed, elem);
        }
    }
    tests.flexbox = function() {
        return testPropsAll('flexWrap');
    };
    tests.canvas = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };
    tests.canvastext = function() {
        return !!(Modernizr.canvas && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
    };
    tests.webgl = function() {
        return !!window.WebGLRenderingContext;
    };
    tests.touch = function() {
        var bool;
        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) bool = true;
        else injectElementWithStyles(['@media (', prefixes.join('touch-enabled),('), mod, ')', '{#modernizr{top:9px;position:absolute}}'].join(''), function(node) {
            bool = node.offsetTop === 9;
        });
        return bool;
    };
    tests.geolocation = function() {
        return 'geolocation' in navigator;
    };
    tests.postmessage = function() {
        return !!window.postMessage;
    };
    tests.websqldatabase = function() {
        return !!window.openDatabase;
    };
    tests.indexedDB = function() {
        return !!testPropsAll("indexedDB", window);
    };
    tests.hashchange = function() {
        return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
    };
    tests.history = function() {
        return !!(window.history && history.pushState);
    };
    tests.draganddrop = function() {
        var div = document.createElement('div');
        return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
    };
    tests.rgba = function() {
        setCss('background-color:rgba(150,255,150,.5)');
        return contains(mStyle.backgroundColor, 'rgba');
    };
    tests.hsla = function() {
        setCss('background-color:hsla(120,40%,100%,.5)');
        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
    };
    tests.multiplebgs = function() {
        setCss('background:url(httpss://),url(httpss://),red url(httpss://)');
        return (/(url\s*\(.*?){3}/).test(mStyle.background);
    };
    tests.backgroundsize = function() {
        return testPropsAll('backgroundSize');
    };
    tests.borderimage = function() {
        return testPropsAll('borderImage');
    };
    tests.borderradius = function() {
        return testPropsAll('borderRadius');
    };
    tests.boxshadow = function() {
        return testPropsAll('boxShadow');
    };
    tests.textshadow = function() {
        return document.createElement('div').style.textShadow === '';
    };
    tests.opacity = function() {
        setCssAll('opacity:.55');
        return (/^0.55$/).test(mStyle.opacity);
    };
    tests.cssanimations = function() {
        return testPropsAll('animationName');
    };
    tests.csscolumns = function() {
        return testPropsAll('columnCount');
    };
    tests.cssgradients = function() {
        var str1 = 'background-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';
        setCss((str1 + '-webkit- '.split(' ').join(str2 + str1) + prefixes.join(str3 + str1)).slice(0, -str1.length));
        return contains(mStyle.backgroundImage, 'gradient');
    };
    tests.cssreflections = function() {
        return testPropsAll('boxReflect');
    };
    tests.csstransforms = function() {
        return !!testPropsAll('transform');
    };
    tests.csstransforms3d = function() {
        var ret = !!testPropsAll('perspective');
        if (ret && 'webkitPerspective' in docElement.style) injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function(node, rule) {
            ret = node.offsetLeft === 9 && node.offsetHeight === 3;
        });
        return ret;
    };
    tests.csstransitions = function() {
        return testPropsAll('transition');
    };
    tests.fontface = function() {
        var bool;
        injectElementWithStyles('@font-face {font-family:"font";src:url("httpss://")}', function(node, rule) {
            var style = document.getElementById('smodernizr'),
                sheet = style.sheet || style.styleSheet,
                cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';
            bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
        });
        return bool;
    };
    tests.generatedcontent = function() {
        var bool;
        injectElementWithStyles(['#', mod, '{font:0/0 a}#', mod, ':after{content:"', smile, '";visibility:hidden;font:3px/1 a}'].join(''), function(node) {
            bool = node.offsetHeight >= 3;
        });
        return bool;
    };
    tests.video = function() {
        var elem = document.createElement('video'),
            bool = false;
        try {
            if (bool = !!elem.canPlayType) {
                bool = new Boolean(bool);
                bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, '');
                bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, '');
                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, '');
            }
        } catch (e) {}
        return bool;
    };
    tests.audio = function() {
        var elem = document.createElement('audio'),
            bool = false;
        try {
            if (bool = !!elem.canPlayType) {
                bool = new Boolean(bool);
                bool.ogg = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '');
                bool.mp3 = elem.canPlayType('audio/mpeg;').replace(/^no$/, '');
                bool.wav = elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '');
                bool.m4a = (elem.canPlayType('audio/x-m4a;') || elem.canPlayType('audio/aac;')).replace(/^no$/, '');
            }
        } catch (e) {}
        return bool;
    };
    tests.localstorage = function() {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    };
    tests.sessionstorage = function() {
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    };
    tests.webworkers = function() {
        return !!window.Worker;
    };
    tests.applicationcache = function() {
        return !!window.applicationCache;
    };
    tests.svg = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    };
    tests.inlinesvg = function() {
        var div = document.createElement('div');
        div.innerHTML = '<svg/>';
        return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    };
    tests.smil = function() {
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
    };
    tests.svgclippaths = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
    };

    function webforms() {
        Modernizr.input = (function(props) {
            for (var i = 0, len = props.length; i < len; i++) attrs[props[i]] = !!(props[i] in inputElem);
            if (attrs.list) attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
            return attrs;
        })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
        Modernizr.inputtypes = (function(props) {
            for (var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++) {
                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';
                if (bool) {
                    inputElem.value = smile;
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';
                    if (/^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined) {
                        docElement.appendChild(inputElem);
                        defaultView = document.defaultView;
                        bool = defaultView.getComputedStyle && defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' && (inputElem.offsetHeight !== 0);
                        docElement.removeChild(inputElem);
                    } else if (/^(search|tel)$/.test(inputElemType)) {} else if (/^(url|email)$/.test(inputElemType)) bool = inputElem.checkValidity && inputElem.checkValidity() === false;
                    else bool = inputElem.value != smile;
                }
                inputs[props[i]] = !!bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
    }
    for (var feature in tests)
        if (hasOwnProp(tests, feature)) {
            featureName = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();
            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    Modernizr.input || webforms();
    Modernizr.addTest = function(feature, test) {
        if (typeof feature == 'object') {
            for (var key in feature)
                if (hasOwnProp(feature, key)) Modernizr.addTest(key, feature[key]);
        } else {
            feature = feature.toLowerCase();
            if (Modernizr[feature] !== undefined) return Modernizr;
            test = typeof test == 'function' ? test() : test;
            if (typeof enableClasses !== "undefined" && enableClasses) docElement.className += ' ' + (test ? '' : 'no-') + feature;
            Modernizr[feature] = test;
        }
        return Modernizr;
    };
    setCss('');
    modElem = inputElem = null;;
    (function(window, document) {
        var version = '3.7.0';
        var options = window.html5 || {};
        var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;
        var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;
        var supportsHtml5Styles;
        var expando = '_html5shiv';
        var expanID = 0;
        var expandoData = {};
        var supportsUnknownElements;
        (function() {
            try {
                var a = document.createElement('a');
                a.innerHTML = '<xyz></xyz>';
                supportsHtml5Styles = ('hidden' in a);
                supportsUnknownElements = a.childNodes.length == 1 || (function() {
                    (document.createElement)('a');
                    var frag = document.createDocumentFragment();
                    return (typeof frag.cloneNode == 'undefined' || typeof frag.createDocumentFragment == 'undefined' || typeof frag.createElement == 'undefined');
                }());
            } catch (e) {
                supportsHtml5Styles = true;
                supportsUnknownElements = true;
            }
        }());

        function addStyleSheet(ownerDocument, cssText) {
            var p = ownerDocument.createElement('p'),
                parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;
            p.innerHTML = 'x<style>' + cssText + '</style>';
            return parent.insertBefore(p.lastChild, parent.firstChild);
        }

        function getElements() {
            var elements = html5.elements;
            return typeof elements == 'string' ? elements.split(' ') : elements;
        }

        function getExpandoData(ownerDocument) {
            var data = expandoData[ownerDocument[expando]];
            if (!data) {
                data = {};
                expanID++;
                ownerDocument[expando] = expanID;
                expandoData[expanID] = data;
            }
            return data;
        }

        function createElement(nodeName, ownerDocument, data) {
            if (!ownerDocument) ownerDocument = document;
            if (supportsUnknownElements) return ownerDocument.createElement(nodeName);
            if (!data) data = getExpandoData(ownerDocument);
            var node;
            if (data.cache[nodeName]) node = data.cache[nodeName].cloneNode();
            else if (saveClones.test(nodeName)) node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
            else node = data.createElem(nodeName);
            return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
        }

        function createDocumentFragment(ownerDocument, data) {
            if (!ownerDocument) ownerDocument = document;
            if (supportsUnknownElements) return ownerDocument.createDocumentFragment();
            data = data || getExpandoData(ownerDocument);
            var clone = data.frag.cloneNode(),
                i = 0,
                elems = getElements(),
                l = elems.length;
            for (; i < l; i++) clone.createElement(elems[i]);
            return clone;
        }

        function shivMethods(ownerDocument, data) {
            if (!data.cache) {
                data.cache = {};
                data.createElem = ownerDocument.createElement;
                data.createFrag = ownerDocument.createDocumentFragment;
                data.frag = data.createFrag();
            }
            ownerDocument.createElement = function(nodeName) {
                if (!html5.shivMethods) return data.createElem(nodeName);
                return createElement(nodeName, ownerDocument, data);
            };
            ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' + 'var n=f.cloneNode(),c=n.createElement;' + 'h.shivMethods&&(' + getElements().join().replace(/[\w\-]+/g, function(nodeName) {
                data.createElem(nodeName);
                data.frag.createElement(nodeName);
                return 'c("' + nodeName + '")';
            }) + ');return n}')(html5, data.frag);
        }

        function shivDocument(ownerDocument) {
            if (!ownerDocument) ownerDocument = document;
            var data = getExpandoData(ownerDocument);
            if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) data.hasCSS = !!addStyleSheet(ownerDocument, 'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' + 'mark{background:#FF0;color:#000}' + 'template{display:none}');
            if (!supportsUnknownElements) shivMethods(ownerDocument, data);
            return ownerDocument;
        }
        var html5 = {
            'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',
            'version': version,
            'shivCSS': (options.shivCSS !== false),
            'supportsUnknownElements': supportsUnknownElements,
            'shivMethods': (options.shivMethods !== false),
            'type': 'default',
            'shivDocument': shivDocument,
            createElement: createElement,
            createDocumentFragment: createDocumentFragment
        };
        window.html5 = html5;
        shivDocument(document);
    }(this, document));
    Modernizr._version = version;
    Modernizr._prefixes = prefixes;
    Modernizr._domPrefixes = domPrefixes;
    Modernizr._cssomPrefixes = cssomPrefixes;
    Modernizr.mq = testMediaQuery;
    Modernizr.hasEvent = isEventSupported;
    Modernizr.testProp = function(prop) {
        return testProps([prop]);
    };
    Modernizr.testAllProps = testPropsAll;
    Modernizr.testStyles = injectElementWithStyles;
    Modernizr.prefixed = function(prop, obj, elem) {
        if (!obj) return testPropsAll(prop, 'pfx');
        else return testPropsAll(prop, obj, elem);
    };
    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') + (enableClasses ? ' js ' + classes.join(' ') : '');
    return Modernizr;
})(this, this.document);
(function(a, b, c) {
    function d(a) {
        return "[object Function]" == o.call(a);
    }

    function e(a) {
        return "string" == typeof a;
    }

    function f() {}

    function g(a) {
        return !a || "loaded" == a || "complete" == a || "uninitialized" == a;
    }

    function h() {
        var a = p.shift();
        q = 1, a ? a.t ? m(function() {
            ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1);
        }, 0) : (a(), h()) : q = 0;
    }

    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
                "img" != a && m(function() {
                    t.removeChild(l);
                }, 50);
                for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload();
            }
        }
        var j = j || B.errorTimeout,
            l = b.createElement(a),
            o = 0,
            r = 0,
            u = {
                t: d,
                s: c,
                e: f,
                a: i,
                x: j
            };
        1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
            k.call(this, r);
        }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l));
    }

    function j(a, b, c, d, f) {
        return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this;
    }

    function k() {
        var a = B;
        return a.loader = {
            load: j,
            i: 0
        }, a;
    }
    var l = b.documentElement,
        m = a.setTimeout,
        n = b.getElementsByTagName("script")[0],
        o = {}.toString,
        p = [],
        q = 0,
        r = "MozAppearance" in l.style,
        s = r && !!b.createRange().compareNode,
        t = s ? l : n.parentNode,
        l = a.opera && "[object Opera]" == o.call(a.opera),
        l = !!b.attachEvent && !l,
        u = r ? "object" : l ? "script" : "img",
        v = l ? "script" : u,
        w = Array.isArray || function(a) {
            return "[object Array]" == o.call(a);
        },
        x = [],
        y = {},
        z = {
            timeout: function(a, b) {
                return b.length && (a.timeout = b[0]), a;
            }
        },
        A, B;
    B = function(a) {
        function b(a) {
            var a = a.split("!"),
                b = x.length,
                c = a.pop(),
                d = a.length,
                c = {
                    url: c,
                    origUrl: c,
                    prefixes: a
                },
                e, f, g;
            for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
            for (f = 0; f < b; f++) c = x[f](c);
            return c;
        }

        function g(a, e, f, g, h) {
            var i = b(a),
                j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
                k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2;
            })));
        }

        function h(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a)) c || (j = function() {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l();
                    }), g(a, j, b, 0, h);
                    else if (Object(a) === a)
                        for (n in m = function() {
                                var b = 0,
                                    c;
                                for (c in a) a.hasOwnProperty(c) && b++;
                                return b;
                            }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                            var a = [].slice.call(arguments);
                            k.apply(this, a), l();
                        } : j[n] = function(a) {
                            return function() {
                                var b = [].slice.call(arguments);
                                a && a.apply(this, b), l();
                            };
                        }(k[n])), g(a[n], j, b, n, h));
                } else !c && l();
            }
            var h = !!a.test,
                i = a.load || a.both,
                j = a.callback || f,
                k = j,
                l = a.complete || f,
                m, n;
            c(h ? a.yep : a.nope, !!i), i && c(i);
        }
        var i, j, l = this.yepnope.loader;
        if (e(a)) g(a, 0, l, 0);
        else if (w(a))
            for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
        else Object(a) === a && h(a, l);
    }, B.addPrefix = function(a, b) {
        z[a] = b;
    }, B.addFilter = function(a) {
        x.push(a);
    }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function() {
        b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete";
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
        var k = b.createElement("script"),
            l, o, e = e || B.errorTimeout;
        k.src = a;
        for (o in d) k.setAttribute(o, d[o]);
        c = j ? h : c || f, k.onreadystatechange = k.onload = function() {
            !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null);
        }, m(function() {
            l || (l = 1, c(1));
        }, e), i ? k.onload() : n.parentNode.insertBefore(k, n);
    }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
        var e = b.createElement("link"),
            j, c = i ? h : c || f;
        e.href = a, e.rel = "stylesheet", e.type = "text/css";
        for (j in d) e.setAttribute(j, d[j]);
        g || (n.parentNode.insertBefore(e, n), m(c, 0));
    };
})(this, document);
Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0));
};;
(function(window, undefined) {
    var readyList, rootjQuery, core_strundefined = typeof undefined,
        location = window.location,
        document = window.document,
        docElem = document.documentElement,
        _jQuery = window.jQuery,
        _$ = window.$,
        class2type = {},
        core_deletedIds = [],
        core_version = "1.10.2",
        core_concat = core_deletedIds.concat,
        core_push = core_deletedIds.push,
        core_slice = core_deletedIds.slice,
        core_indexOf = core_deletedIds.indexOf,
        core_toString = class2type.toString,
        core_hasOwn = class2type.hasOwnProperty,
        core_trim = core_version.trim,
        jQuery = function(selector, context) {
            return new jQuery.fn.init(selector, context, rootjQuery);
        },
        core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        core_rnotwhite = /\S+/g,
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        rvalidchars = /^[\],:{}\s]*$/,
        rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
        rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,
        fcamelCase = function(all, letter) {
            return letter.toUpperCase();
        },
        completed = function(event) {
            if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
                detach();
                jQuery.ready();
            }
        },
        detach = function() {
            if (document.addEventListener) {
                document.removeEventListener("DOMContentLoaded", completed, false);
                window.removeEventListener("load", completed, false);
            } else {
                document.detachEvent("onreadystatechange", completed);
                window.detachEvent("onload", completed);
            }
        };
    jQuery.fn = jQuery.prototype = {
        jquery: core_version,
        constructor: jQuery,
        init: function(selector, context, rootjQuery) {
            var match, elem;
            if (!selector) return this;
            if (typeof selector === "string") {
                if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) match = [null, selector, null];
                else match = rquickExpr.exec(selector);
                if (match && (match[1] || !context)) {
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;
                        jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context))
                            for (match in context)
                                if (jQuery.isFunction(this[match])) this[match](context[match]);
                                else this.attr(match, context[match]);
                        return this;
                    } else {
                        elem = document.getElementById(match[2]);
                        if (elem && elem.parentNode) {
                            if (elem.id !== match[2]) return rootjQuery.find(selector);
                            this.length = 1;
                            this[0] = elem;
                        }
                        this.context = document;
                        this.selector = selector;
                        return this;
                    }
                } else if (!context || context.jquery) return (context || rootjQuery).find(selector);
                else return this.constructor(context).find(selector);
            } else if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;
            } else if (jQuery.isFunction(selector)) return rootjQuery.ready(selector);
            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context;
            }
            return jQuery.makeArray(selector, this);
        },
        selector: "",
        length: 0,
        toArray: function() {
            return core_slice.call(this);
        },
        get: function(num) {
            return num == null ? this.toArray() : (num < 0 ? this[this.length + num] : this[num]);
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            ret.context = this.context;
            return ret;
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        ready: function(fn) {
            jQuery.ready.promise().done(fn);
            return this;
        },
        slice: function() {
            return this.pushStack(core_slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length,
                j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: core_push,
        sort: [].sort,
        splice: [].splice
    };
    jQuery.fn.init.prototype = jQuery.fn;
    jQuery.extend = jQuery.fn.extend = function() {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if (typeof target !== "object" && !jQuery.isFunction(target)) target = {};
        if (length === i) {
            target = this;
            --i;
        }
        for (; i < length; i++)
            if ((options = arguments[i]) != null)
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) continue;
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];
                        } else clone = src && jQuery.isPlainObject(src) ? src : {};
                        target[name] = jQuery.extend(deep, clone, copy);
                    } else if (copy !== undefined) target[name] = copy;
                }
            return target;
    };
    jQuery.extend({
        expando: "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),
        noConflict: function(deep) {
            if (window.$ === jQuery) window.$ = _$;
            if (deep && window.jQuery === jQuery) window.jQuery = _jQuery;
            return jQuery;
        },
        isReady: false,
        readyWait: 1,
        holdReady: function(hold) {
            if (hold) jQuery.readyWait++;
            else jQuery.ready(true);
        },
        ready: function(wait) {
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) return;
            if (!document.body) return setTimeout(jQuery.ready);
            jQuery.isReady = true;
            if (wait !== true && --jQuery.readyWait > 0) return;
            readyList.resolveWith(document, [jQuery]);
            if (jQuery.fn.trigger) jQuery(document).trigger("ready").off("ready");
        },
        isFunction: function(obj) {
            return jQuery.type(obj) === "function";
        },
        isArray: Array.isArray || function(obj) {
            return jQuery.type(obj) === "array";
        },
        isWindow: function(obj) {
            return obj != null && obj == obj.window;
        },
        isNumeric: function(obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },
        type: function(obj) {
            if (obj == null) return String(obj);
            return typeof obj === "object" || typeof obj === "function" ? class2type[core_toString.call(obj)] || "object" : typeof obj;
        },
        isPlainObject: function(obj) {
            var key;
            if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) return false;
            try {
                if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return false;
            } catch (e) {
                return false;
            }
            if (jQuery.support.ownLast)
                for (key in obj) return core_hasOwn.call(obj, key);
            for (key in obj) {}
            return key === undefined || core_hasOwn.call(obj, key);
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) return false;
            return true;
        },
        error: function(msg) {
            throw new Error(msg);
        },
        parseHTML: function(data, context, keepScripts) {
            if (!data || typeof data !== "string") return null;
            if (typeof context === "boolean") {
                keepScripts = context;
                context = false;
            }
            context = context || document;
            var parsed = rsingleTag.exec(data),
                scripts = !keepScripts && [];
            if (parsed) return [context.createElement(parsed[1])];
            parsed = jQuery.buildFragment([data], context, scripts);
            if (scripts) jQuery(scripts).remove();
            return jQuery.merge([], parsed.childNodes);
        },
        parseJSON: function(data) {
            if (window.JSON && window.JSON.parse) return window.JSON.parse(data);
            if (data === null) return data;
            if (typeof data === "string") {
                data = jQuery.trim(data);
                if (data)
                    if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) return new Function("return " + data)();
            }
            jQuery.error("Invalid JSON: " + data);
        },
        parseXML: function(data) {
            var xml, tmp;
            if (!data || typeof data !== "string") return null;
            try {
                if (window.DOMParser) {
                    tmp = new DOMParser();
                    xml = tmp.parseFromString(data, "text/xml");
                } else {
                    xml = new ActiveXObject("Microsoft.XMLDOM");
                    xml.async = "false";
                    xml.loadXML(data);
                }
            } catch (e) {
                xml = undefined;
            }
            if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) jQuery.error("Invalid XML: " + data);
            return xml;
        },
        noop: function() {},
        globalEval: function(data) {
            if (data && jQuery.trim(data))(window.execScript || function(data) {
                window.eval.call(window, data);
            })(data);
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function(obj, callback, args) {
            var value, i = 0,
                length = obj.length,
                isArray = isArraylike(obj);
            if (args) {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.apply(obj[i], args);
                        if (value === false) break;
                    }
                } else
                    for (i in obj) {
                        value = callback.apply(obj[i], args);
                        if (value === false) break;
                    }
            } else if (isArray) {
                for (; i < length; i++) {
                    value = callback.call(obj[i], i, obj[i]);
                    if (value === false) break;
                }
            } else
                for (i in obj) {
                    value = callback.call(obj[i], i, obj[i]);
                    if (value === false) break;
                }
            return obj;
        },
        trim: core_trim && !core_trim.call("\uFEFF\xA0") ? function(text) {
            return text == null ? "" : core_trim.call(text);
        } : function(text) {
            return text == null ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            if (arr != null)
                if (isArraylike(Object(arr))) jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
                else core_push.call(ret, arr);
            return ret;
        },
        inArray: function(elem, arr, i) {
            var len;
            if (arr) {
                if (core_indexOf) return core_indexOf.call(arr, elem, i);
                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
                for (; i < len; i++)
                    if (i in arr && arr[i] === elem) return i;
            }
            return -1;
        },
        merge: function(first, second) {
            var l = second.length,
                i = first.length,
                j = 0;
            if (typeof l === "number")
                for (; j < l; j++) first[i++] = second[j];
            else
                while (second[j] !== undefined) first[i++] = second[j++];
            first.length = i;
            return first;
        },
        grep: function(elems, callback, inv) {
            var retVal, ret = [],
                i = 0,
                length = elems.length;
            inv = !!inv;
            for (; i < length; i++) {
                retVal = !!callback(elems[i], i);
                if (inv !== retVal) ret.push(elems[i]);
            }
            return ret;
        },
        map: function(elems, callback, arg) {
            var value, i = 0,
                length = elems.length,
                isArray = isArraylike(elems),
                ret = [];
            if (isArray) {
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) ret[ret.length] = value;
                }
            } else
                for (i in elems) {
                    value = callback(elems[i], i, arg);
                    if (value != null) ret[ret.length] = value;
                }
            return core_concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var args, proxy, tmp;
            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }
            if (!jQuery.isFunction(fn)) return undefined;
            args = core_slice.call(arguments, 2);
            proxy = function() {
                return fn.apply(context || this, args.concat(core_slice.call(arguments)));
            };
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
            return proxy;
        },
        access: function(elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0,
                length = elems.length,
                bulk = key == null;
            if (jQuery.type(key) === "object") {
                chainable = true;
                for (i in key) jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
            } else if (value !== undefined) {
                chainable = true;
                if (!jQuery.isFunction(value)) raw = true;
                if (bulk)
                    if (raw) {
                        fn.call(elems, value);
                        fn = null;
                    } else {
                        bulk = fn;
                        fn = function(elem, key, value) {
                            return bulk.call(jQuery(elem), value);
                        };
                    }
                if (fn)
                    for (; i < length; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
            }
            return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
        },
        now: function() {
            return new Date().getTime();
        },
        swap: function(elem, options, callback, args) {
            var ret, name, old = {};
            for (name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }
            ret = callback.apply(elem, args || []);
            for (name in options) elem.style[name] = old[name];
            return ret;
        }
    });
    jQuery.ready.promise = function(obj) {
        if (!readyList) {
            readyList = jQuery.Deferred();
            if (document.readyState === "complete") setTimeout(jQuery.ready);
            else if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", completed, false);
                window.addEventListener("load", completed, false);
            } else {
                document.attachEvent("onreadystatechange", completed);
                window.attachEvent("onload", completed);
                var top = false;
                try {
                    top = window.frameElement == null && document.documentElement;
                } catch (e) {}
                if (top && top.doScroll)(function doScrollCheck() {
                    if (!jQuery.isReady) {
                        try {
                            top.doScroll("left");
                        } catch (e) {
                            return setTimeout(doScrollCheck, 50);
                        }
                        detach();
                        jQuery.ready();
                    }
                })();
            }
        }
        return readyList.promise(obj);
    };
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });

    function isArraylike(obj) {
        var length = obj.length,
            type = jQuery.type(obj);
        if (jQuery.isWindow(obj)) return false;
        if (obj.nodeType === 1 && length) return true;
        return type === "array" || type !== "function" && (length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj);
    }
    rootjQuery = jQuery(document);
    (function(window, undefined) {
        var i, support, cachedruns, Expr, getText, isXML, compile, outermostContext, sortInput, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + -new Date(),
            preferredDoc = window.document,
            dirruns = 0,
            done = 0,
            classCache = createCache(),
            tokenCache = createCache(),
            compilerCache = createCache(),
            hasDuplicate = false,
            sortOrder = function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                return 0;
            },
            strundefined = typeof undefined,
            MAX_NEGATIVE = 1 << 31,
            hasOwn = {}.hasOwnProperty,
            arr = [],
            pop = arr.pop,
            push_native = arr.push,
            push = arr.push,
            slice = arr.slice,
            indexOf = arr.indexOf || function(elem) {
                var i = 0,
                    len = this.length;
                for (; i < len; i++)
                    if (this[i] === elem) return i;
                return -1;
            },
            booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            whitespace = "[\\x20\\t\\r\\n\\f]",
            characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            identifier = characterEncoding.replace("w", "w#"),
            attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
            pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)",
            rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
            rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
            rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
            rsibling = new RegExp(whitespace + "*[+~]"),
            rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g"),
            rpseudo = new RegExp(pseudos),
            ridentifier = new RegExp("^" + identifier + "$"),
            matchExpr = {
                "ID": new RegExp("^#(" + characterEncoding + ")"),
                "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
                "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                "ATTR": new RegExp("^" + attributes),
                "PSEUDO": new RegExp("^" + pseudos),
                "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                "bool": new RegExp("^(?:" + booleans + ")$", "i"),
                "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
            },
            rnative = /^[^{]+\{\s*\[native \w/,
            rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            rinputs = /^(?:input|select|textarea|button)$/i,
            rheader = /^h\d$/i,
            rescape = /'|\\/g,
            runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
            funescape = function(_, escaped, escapedWhitespace) {
                var high = "0x" + escaped - 0x10000;
                return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
            };
        try {
            push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els));
                } : function(target, els) {
                    var j = target.length,
                        i = 0;
                    while ((target[j++] = els[i++])) {}
                    target.length = j - 1;
                }
            };
        }

        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document) setDocument(context);
            context = context || document;
            results = results || [];
            if (!selector || typeof selector !== "string") return results;
            if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) return [];
            if (documentIsHTML && !seed) {
                if ((match = rquickExpr.exec(selector)))
                    if ((m = match[1])) {
                        if (nodeType === 9) {
                            elem = context.getElementById(m);
                            if (elem && elem.parentNode) {
                                if (elem.id === m) {
                                    results.push(elem);
                                    return results;
                                }
                            } else return results;
                        } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                            results.push(elem);
                            return results;
                        }
                    } else if (match[2]) {
                    push.apply(results, context.getElementsByTagName(selector));
                    return results;
                } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                    push.apply(results, context.getElementsByClassName(m));
                    return results;
                }
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    nid = old = expando;
                    newContext = context;
                    newSelector = nodeType === 9 && selector;
                    if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                        groups = tokenize(selector);
                        if ((old = context.getAttribute("id"))) nid = old.replace(rescape, "\\$&");
                        else context.setAttribute("id", nid);
                        nid = "[id='" + nid + "'] ";
                        i = groups.length;
                        while (i--) groups[i] = nid + toSelector(groups[i]);
                        newContext = rsibling.test(selector) && context.parentNode || context;
                        newSelector = groups.join(",");
                    }
                    if (newSelector) try {
                        push.apply(results, newContext.querySelectorAll(newSelector));
                        return results;
                    } catch (qsaError) {} finally {
                        if (!old) context.removeAttribute("id");
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }

        function createCache() {
            var keys = [];

            function cache(key, value) {
                if (keys.push(key += " ") > Expr.cacheLength) delete cache[keys.shift()];
                return (cache[key] = value);
            }
            return cache;
        }

        function markFunction(fn) {
            fn[expando] = true;
            return fn;
        }

        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div);
            } catch (e) {
                return false;
            } finally {
                if (div.parentNode) div.parentNode.removeChild(div);
                div = null;
            }
        }

        function addHandle(attrs, handler) {
            var arr = attrs.split("|"),
                i = attrs.length;
            while (i--) Expr.attrHandle[arr[i]] = handler;
        }

        function siblingCheck(a, b) {
            var cur = b && a,
                diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) return diff;
            if (cur)
                while ((cur = cur.nextSibling))
                    if (cur === b) return -1;
            return a ? 1 : -1;
        }

        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type;
            };
        }

        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && elem.type === type;
            };
        }

        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                argument = +argument;
                return markFunction(function(seed, matches) {
                    var j, matchIndexes = fn([], seed.length, argument),
                        i = matchIndexes.length;
                    while (i--)
                        if (seed[(j = matchIndexes[i])]) seed[j] = !(matches[j] = seed[j]);
                });
            });
        }
        isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };
        support = Sizzle.support = {};
        setDocument = Sizzle.setDocument = function(node) {
            var doc = node ? node.ownerDocument || node : preferredDoc,
                parent = doc.defaultView;
            if (doc === document || doc.nodeType !== 9 || !doc.documentElement) return document;
            document = doc;
            docElem = doc.documentElement;
            documentIsHTML = !isXML(doc);
            if (parent && parent.attachEvent && parent !== parent.top) parent.attachEvent("onbeforeunload", function() {
                setDocument();
            });
            support.attributes = assert(function(div) {
                div.className = "i";
                return !div.getAttribute("className");
            });
            support.getElementsByTagName = assert(function(div) {
                div.appendChild(doc.createComment(""));
                return !div.getElementsByTagName("*").length;
            });
            support.getElementsByClassName = assert(function(div) {
                div.innerHTML = "<div class='a'></div><div class='a i'></div>";
                div.firstChild.className = "i";
                return div.getElementsByClassName("i").length === 2;
            });
            support.getById = assert(function(div) {
                docElem.appendChild(div).id = expando;
                return !doc.getElementsByName || !doc.getElementsByName(expando).length;
            });
            if (support.getById) {
                Expr.find.ID = function(id, context) {
                    if (typeof context.getElementById !== strundefined && documentIsHTML) {
                        var m = context.getElementById(id);
                        return m && m.parentNode ? [m] : [];
                    }
                };
                Expr.filter.ID = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        return elem.getAttribute("id") === attrId;
                    };
                };
            } else {
                delete Expr.find.ID;
                Expr.filter.ID = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                        return node && node.value === attrId;
                    };
                };
            }
            Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                if (typeof context.getElementsByTagName !== strundefined) return context.getElementsByTagName(tag);
            } : function(tag, context) {
                var elem, tmp = [],
                    i = 0,
                    results = context.getElementsByTagName(tag);
                if (tag === "*") {
                    while ((elem = results[i++]))
                        if (elem.nodeType === 1) tmp.push(elem);
                    return tmp;
                }
                return results;
            };
            Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                if (typeof context.getElementsByClassName !== strundefined && documentIsHTML) return context.getElementsByClassName(className);
            };
            rbuggyMatches = [];
            rbuggyQSA = [];
            if ((support.qsa = rnative.test(doc.querySelectorAll))) {
                assert(function(div) {
                    div.innerHTML = "<select><option selected=''></option></select>";
                    if (!div.querySelectorAll("[selected]").length) rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                    if (!div.querySelectorAll(":checked").length) rbuggyQSA.push(":checked");
                });
                assert(function(div) {
                    var input = doc.createElement("input");
                    input.setAttribute("type", "hidden");
                    div.appendChild(input).setAttribute("t", "");
                    if (div.querySelectorAll("[t^='']").length) rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                    if (!div.querySelectorAll(":enabled").length) rbuggyQSA.push(":enabled", ":disabled");
                    div.querySelectorAll("*,:x");
                    rbuggyQSA.push(",.*:");
                });
            }
            if ((support.matchesSelector = rnative.test((matches = docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) assert(function(div) {
                support.disconnectedMatch = matches.call(div, "div");
                matches.call(div, "[s!='']:x");
                rbuggyMatches.push("!=", pseudos);
            });
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
            contains = rnative.test(docElem.contains) || docElem.compareDocumentPosition ? function(a, b) {
                var adown = a.nodeType === 9 ? a.documentElement : a,
                    bup = b && b.parentNode;
                return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
            } : function(a, b) {
                if (b)
                    while ((b = b.parentNode))
                        if (b === a) return true;
                return false;
            };
            sortOrder = docElem.compareDocumentPosition ? function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);
                if (compare) {
                    if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
                        if (a === doc || contains(preferredDoc, a)) return -1;
                        if (b === doc || contains(preferredDoc, b)) return 1;
                        return sortInput ? (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) : 0;
                    }
                    return compare & 4 ? -1 : 1;
                }
                return a.compareDocumentPosition ? -1 : 1;
            } : function(a, b) {
                var cur, i = 0,
                    aup = a.parentNode,
                    bup = b.parentNode,
                    ap = [a],
                    bp = [b];
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                } else if (!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) : 0;
                else if (aup === bup) return siblingCheck(a, b);
                cur = a;
                while ((cur = cur.parentNode)) ap.unshift(cur);
                cur = b;
                while ((cur = cur.parentNode)) bp.unshift(cur);
                while (ap[i] === bp[i]) i++;
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            };
            return doc;
        };
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        };
        Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document) setDocument(elem);
            expr = expr.replace(rattributeQuotes, "='$1']");
            if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) try {
                var ret = matches.call(elem, expr);
                if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) return ret;
            } catch (e) {}
            return Sizzle(expr, document, null, [elem]).length > 0;
        };
        Sizzle.contains = function(context, elem) {
            if ((context.ownerDocument || context) !== document) setDocument(context);
            return contains(context, elem);
        };
        Sizzle.attr = function(elem, name) {
            if ((elem.ownerDocument || elem) !== document) setDocument(elem);
            var fn = Expr.attrHandle[name.toLowerCase()],
                val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
            return val === undefined ? support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null : val;
        };
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        };
        Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [],
                j = 0,
                i = 0;
            hasDuplicate = !support.detectDuplicates;
            sortInput = !support.sortStable && results.slice(0);
            results.sort(sortOrder);
            if (hasDuplicate) {
                while ((elem = results[i++]))
                    if (elem === results[i]) j = duplicates.push(i);
                while (j--) results.splice(duplicates[j], 1);
            }
            return results;
        };
        getText = Sizzle.getText = function(elem) {
            var node, ret = "",
                i = 0,
                nodeType = elem.nodeType;
            if (!nodeType)
                for (;
                    (node = elem[i]); i++) ret += getText(node);
            else if (nodeType === 1 || nodeType === 9 || nodeType === 11)
                if (typeof elem.textContent === "string") return elem.textContent;
                else
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem);
            else if (nodeType === 3 || nodeType === 4) return elem.nodeValue;
            return ret;
        };
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: true
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                "ATTR": function(match) {
                    match[1] = match[1].replace(runescape, funescape);
                    match[3] = (match[4] || match[5] || "").replace(runescape, funescape);
                    if (match[2] === "~=") match[3] = " " + match[3] + " ";
                    return match.slice(0, 4);
                },
                "CHILD": function(match) {
                    match[1] = match[1].toLowerCase();
                    if (match[1].slice(0, 3) === "nth") {
                        if (!match[3]) Sizzle.error(match[0]);
                        match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                        match[5] = +((match[7] + match[8]) || match[3] === "odd");
                    } else if (match[3]) Sizzle.error(match[0]);
                    return match;
                },
                "PSEUDO": function(match) {
                    var excess, unquoted = !match[5] && match[2];
                    if (matchExpr.CHILD.test(match[0])) return null;
                    if (match[3] && match[4] !== undefined) match[2] = match[4];
                    else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                        match[0] = match[0].slice(0, excess);
                        match[2] = unquoted.slice(0, excess);
                    }
                    return match.slice(0, 3);
                }
            },
            filter: {
                "TAG": function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return nodeNameSelector === "*" ? function() {
                        return true;
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                "CLASS": function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "");
                    });
                },
                "ATTR": function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        if (result == null) return operator === "!=";
                        if (!operator) return true;
                        result += "";
                        return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
                    };
                },
                "CHILD": function(type, what, argument, first, last) {
                    var simple = type.slice(0, 3) !== "nth",
                        forward = type.slice(-4) !== "last",
                        ofType = what === "of-type";
                    return first === 1 && last === 0 ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling",
                            parent = elem.parentNode,
                            name = ofType && elem.nodeName.toLowerCase(),
                            useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                while (dir) {
                                    node = elem;
                                    while ((node = node[dir]))
                                        if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) return false;
                                    start = dir = type === "only" && !start && "nextSibling";
                                }
                                return true;
                            }
                            start = [forward ? parent.firstChild : parent.lastChild];
                            if (forward && useCache) {
                                outerCache = parent[expando] || (parent[expando] = {});
                                cache = outerCache[type] || [];
                                nodeIndex = cache[0] === dirruns && cache[1];
                                diff = cache[0] === dirruns && cache[2];
                                node = nodeIndex && parent.childNodes[nodeIndex];
                                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()))
                                    if (node.nodeType === 1 && ++diff && node === elem) {
                                        outerCache[type] = [dirruns, nodeIndex, diff];
                                        break;
                                    }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1];
                            else
                                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()))
                                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                        if (useCache)(node[expando] || (node[expando] = {}))[type] = [dirruns, diff];
                                        if (node === elem) break;
                                    }
                            diff -= last;
                            return diff === first || (diff % first === 0 && diff / first >= 0);
                        }
                    };
                },
                "PSEUDO": function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    if (fn[expando]) return fn(argument);
                    if (fn.length > 1) {
                        args = [pseudo, pseudo, "", argument];
                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                            var idx, matched = fn(seed, argument),
                                i = matched.length;
                            while (i--) {
                                idx = indexOf.call(seed, matched[i]);
                                seed[idx] = !(matches[idx] = matched[i]);
                            }
                        }) : function(elem) {
                            return fn(elem, 0, args);
                        };
                    }
                    return fn;
                }
            },
            pseudos: {
                "not": markFunction(function(selector) {
                    var input = [],
                        results = [],
                        matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        var elem, unmatched = matcher(seed, null, xml, []),
                            i = seed.length;
                        while (i--)
                            if ((elem = unmatched[i])) seed[i] = !(matches[i] = elem);
                    }) : function(elem, context, xml) {
                        input[0] = elem;
                        matcher(input, null, xml, results);
                        return !results.pop();
                    };
                }),
                "has": markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                "contains": markFunction(function(text) {
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                "lang": markFunction(function(lang) {
                    if (!ridentifier.test(lang || "")) Sizzle.error("unsupported lang: " + lang);
                    lang = lang.replace(runescape, funescape).toLowerCase();
                    return function(elem) {
                        var elemLang;
                        do
                            if ((elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                                elemLang = elemLang.toLowerCase();
                                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                            }
                        while ((elem = elem.parentNode) && elem.nodeType === 1);
                        return false;
                    };
                }),
                "target": function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                "root": function(elem) {
                    return elem === docElem;
                },
                "focus": function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                "enabled": function(elem) {
                    return elem.disabled === false;
                },
                "disabled": function(elem) {
                    return elem.disabled === true;
                },
                "checked": function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                },
                "selected": function(elem) {
                    if (elem.parentNode) elem.parentNode.selectedIndex;
                    return elem.selected === true;
                },
                "empty": function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling)
                        if (elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4) return false;
                    return true;
                },
                "parent": function(elem) {
                    return !Expr.pseudos.empty(elem);
                },
                "header": function(elem) {
                    return rheader.test(elem.nodeName);
                },
                "input": function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                "button": function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === "button" || name === "button";
                },
                "text": function(elem) {
                    var attr;
                    return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type);
                },
                "first": createPositionalPseudo(function() {
                    return [0];
                }),
                "last": createPositionalPseudo(function(matchIndexes, length) {
                    return [length - 1];
                }),
                "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [argument < 0 ? argument + length : argument];
                }),
                "even": createPositionalPseudo(function(matchIndexes, length) {
                    var i = 0;
                    for (; i < length; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                "odd": createPositionalPseudo(function(matchIndexes, length) {
                    var i = 1;
                    for (; i < length; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; --i >= 0;) matchIndexes.push(i);
                    return matchIndexes;
                }),
                "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; ++i < length;) matchIndexes.push(i);
                    return matchIndexes;
                })
            }
        };
        Expr.pseudos.nth = Expr.pseudos.eq;
        for (i in {
                radio: true,
                checkbox: true,
                file: true,
                password: true,
                image: true
            }) Expr.pseudos[i] = createInputPseudo(i);
        for (i in {
                submit: true,
                reset: true
            }) Expr.pseudos[i] = createButtonPseudo(i);

        function setFilters() {}
        setFilters.prototype = Expr.filters = Expr.pseudos;
        Expr.setFilters = new setFilters();

        function tokenize(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) return parseOnly ? 0 : cached.slice(0);
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) soFar = soFar.slice(match[0].length) || soFar;
                    groups.push(tokens = []);
                }
                matched = false;
                if ((match = rcombinators.exec(soFar))) {
                    matched = match.shift();
                    tokens.push({
                        value: matched,
                        type: match[0].replace(rtrim, " ")
                    });
                    soFar = soFar.slice(matched.length);
                }
                for (type in Expr.filter)
                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            type: type,
                            matches: match
                        });
                        soFar = soFar.slice(matched.length);
                    }
                if (!matched) break;
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        }

        function toSelector(tokens) {
            var i = 0,
                len = tokens.length,
                selector = "";
            for (; i < len; i++) selector += tokens[i].value;
            return selector;
        }

        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir,
                checkNonElements = base && dir === "parentNode",
                doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                while ((elem = elem[dir]))
                    if (elem.nodeType === 1 || checkNonElements) return matcher(elem, context, xml);
            } : function(elem, context, xml) {
                var data, cache, outerCache, dirkey = dirruns + " " + doneName;
                if (xml) {
                    while ((elem = elem[dir]))
                        if (elem.nodeType === 1 || checkNonElements)
                            if (matcher(elem, context, xml)) return true;
                } else
                    while ((elem = elem[dir]))
                        if (elem.nodeType === 1 || checkNonElements) {
                            outerCache = elem[expando] || (elem[expando] = {});
                            if ((cache = outerCache[dir]) && cache[0] === dirkey) {
                                if ((data = cache[1]) === true || data === cachedruns) return data === true;
                            } else {
                                cache = outerCache[dir] = [dirkey];
                                cache[1] = matcher(elem, context, xml) || cachedruns;
                                if (cache[1] === true) return true;
                            }
                        }
            };
        }

        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                var i = matchers.length;
                while (i--)
                    if (!matchers[i](elem, context, xml)) return false;
                return true;
            } : matchers[0];
        }

        function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [],
                i = 0,
                len = unmatched.length,
                mapped = map != null;
            for (; i < len; i++)
                if ((elem = unmatched[i]))
                    if (!filter || filter(elem, context, xml)) {
                        newUnmatched.push(elem);
                        if (mapped) map.push(i);
                    }
            return newUnmatched;
        }

        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) postFilter = setMatcher(postFilter);
            if (postFinder && !postFinder[expando]) postFinder = setMatcher(postFinder, postSelector);
            return markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [],
                    postMap = [],
                    preexisting = results.length,
                    elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
                    matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
                    matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher) matcher(matcherIn, matcherOut, context, xml);
                if (postFilter) {
                    temp = condense(matcherOut, postMap);
                    postFilter(temp, [], context, xml);
                    i = temp.length;
                    while (i--)
                        if ((elem = temp[i])) matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                }
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            temp = [];
                            i = matcherOut.length;
                            while (i--)
                                if ((elem = matcherOut[i])) temp.push((matcherIn[i] = elem));
                            postFinder(null, (matcherOut = []), temp, xml);
                        }
                        i = matcherOut.length;
                        while (i--)
                            if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) seed[temp] = !(results[temp] = elem);
                    }
                } else {
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                    if (postFinder) postFinder(null, results, matcherOut, xml);
                    else push.apply(results, matcherOut);
                }
            });
        }

        function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length,
                leadingRelative = Expr.relative[tokens[0].type],
                implicitRelative = leadingRelative || Expr.relative[" "],
                i = leadingRelative ? 1 : 0,
                matchContext = addCombinator(function(elem) {
                    return elem === checkContext;
                }, implicitRelative, true),
                matchAnyContext = addCombinator(function(elem) {
                    return indexOf.call(checkContext, elem) > -1;
                }, implicitRelative, true),
                matchers = [function(elem, context, xml) {
                    return (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                }];
            for (; i < len; i++)
                if ((matcher = Expr.relative[tokens[i].type])) matchers = [addCombinator(elementMatcher(matchers), matcher)];
                else {
                    matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                    if (matcher[expando]) {
                        j = ++i;
                        for (; j < len; j++)
                            if (Expr.relative[tokens[j].type]) break;
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                            value: tokens[i - 2].type === " " ? "*" : ""
                        })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
                    }
                    matchers.push(matcher);
                }
            return elementMatcher(matchers);
        }

        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var matcherCachedRuns = 0,
                bySet = setMatchers.length > 0,
                byElement = elementMatchers.length > 0,
                superMatcher = function(seed, context, xml, results, expandContext) {
                    var elem, j, matcher, setMatched = [],
                        matchedCount = 0,
                        i = "0",
                        unmatched = seed && [],
                        outermost = expandContext != null,
                        contextBackup = outermostContext,
                        elems = seed || byElement && Expr.find.TAG("*", expandContext && context.parentNode || context),
                        dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);
                    if (outermost) {
                        outermostContext = context !== document && context;
                        cachedruns = matcherCachedRuns;
                    }
                    for (;
                        (elem = elems[i]) != null; i++) {
                        if (byElement && elem) {
                            j = 0;
                            while ((matcher = elementMatchers[j++]))
                                if (matcher(elem, context, xml)) {
                                    results.push(elem);
                                    break;
                                }
                            if (outermost) {
                                dirruns = dirrunsUnique;
                                cachedruns = ++matcherCachedRuns;
                            }
                        }
                        if (bySet) {
                            if ((elem = !matcher && elem)) matchedCount--;
                            if (seed) unmatched.push(elem);
                        }
                    }
                    matchedCount += i;
                    if (bySet && i !== matchedCount) {
                        j = 0;
                        while ((matcher = setMatchers[j++])) matcher(unmatched, setMatched, context, xml);
                        if (seed) {
                            if (matchedCount > 0)
                                while (i--)
                                    if (!(unmatched[i] || setMatched[i])) setMatched[i] = pop.call(results);
                            setMatched = condense(setMatched);
                        }
                        push.apply(results, setMatched);
                        if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) Sizzle.uniqueSort(results);
                    }
                    if (outermost) {
                        dirruns = dirrunsUnique;
                        outermostContext = contextBackup;
                    }
                    return unmatched;
                };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        compile = Sizzle.compile = function(selector, group) {
            var i, setMatchers = [],
                elementMatchers = [],
                cached = compilerCache[selector + " "];
            if (!cached) {
                if (!group) group = tokenize(selector);
                i = group.length;
                while (i--) {
                    cached = matcherFromTokens(group[i]);
                    if (cached[expando]) setMatchers.push(cached);
                    else elementMatchers.push(cached);
                }
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
            }
            return cached;
        };

        function multipleContexts(selector, contexts, results) {
            var i = 0,
                len = contexts.length;
            for (; i < len; i++) Sizzle(selector, contexts[i], results);
            return results;
        }

        function select(selector, context, results, seed) {
            var i, tokens, token, type, find, match = tokenize(selector);
            if (!seed)
                if (match.length === 1) {
                    tokens = match[0] = match[0].slice(0);
                    if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                        context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0];
                        if (!context) return results;
                        selector = selector.slice(tokens.shift().value.length);
                    }
                    i = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
                    while (i--) {
                        token = tokens[i];
                        if (Expr.relative[(type = token.type)]) break;
                        if ((find = Expr.find[type]))
                            if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && context.parentNode || context))) {
                                tokens.splice(i, 1);
                                selector = seed.length && toSelector(tokens);
                                if (!selector) {
                                    push.apply(results, seed);
                                    return results;
                                }
                                break;
                            }
                    }
                }
            compile(selector, match)(seed, context, !documentIsHTML, results, rsibling.test(selector));
            return results;
        }
        support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
        support.detectDuplicates = hasDuplicate;
        setDocument();
        support.sortDetached = assert(function(div1) {
            return div1.compareDocumentPosition(document.createElement("div")) & 1;
        });
        if (!assert(function(div) {
                div.innerHTML = "<a href='#'></a>";
                return div.firstChild.getAttribute("href") === "#";
            })) addHandle("type|href|height|width", function(elem, name, isXML) {
            if (!isXML) return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
        });
        if (!support.attributes || !assert(function(div) {
                div.innerHTML = "<input/>";
                div.firstChild.setAttribute("value", "");
                return div.firstChild.getAttribute("value") === "";
            })) addHandle("value", function(elem, name, isXML) {
            if (!isXML && elem.nodeName.toLowerCase() === "input") return elem.defaultValue;
        });
        if (!assert(function(div) {
                return div.getAttribute("disabled") == null;
            })) addHandle(booleans, function(elem, name, isXML) {
            var val;
            if (!isXML) return (val = elem.getAttributeNode(name)) && val.specified ? val.value : elem[name] === true ? name.toLowerCase() : null;
        });
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.pseudos;
        jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains;
    })(window);
    var optionsCache = {};

    function createOptions(options) {
        var object = optionsCache[options] = {};
        jQuery.each(options.match(core_rnotwhite) || [], function(_, flag) {
            object[flag] = true;
        });
        return object;
    }
    jQuery.Callbacks = function(options) {
        options = typeof options === "string" ? (optionsCache[options] || createOptions(options)) : jQuery.extend({}, options);
        var firing, memory, fired, firingLength, firingIndex, firingStart, list = [],
            stack = !options.once && [],
            fire = function(data) {
                memory = options.memory && data;
                fired = true;
                firingIndex = firingStart || 0;
                firingStart = 0;
                firingLength = list.length;
                firing = true;
                for (; list && firingIndex < firingLength; firingIndex++)
                    if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                        memory = false;
                        break;
                    }
                firing = false;
                if (list)
                    if (stack) {
                        if (stack.length) fire(stack.shift());
                    } else if (memory) list = [];
                else self.disable();
            },
            self = {
                add: function() {
                    if (list) {
                        var start = list.length;
                        (function add(args) {
                            jQuery.each(args, function(_, arg) {
                                var type = jQuery.type(arg);
                                if (type === "function") {
                                    if (!options.unique || !self.has(arg)) list.push(arg);
                                } else if (arg && arg.length && type !== "string") add(arg);
                            });
                        })(arguments);
                        if (firing) firingLength = list.length;
                        else if (memory) {
                            firingStart = start;
                            fire(memory);
                        }
                    }
                    return this;
                },
                remove: function() {
                    if (list) jQuery.each(arguments, function(_, arg) {
                        var index;
                        while ((index = jQuery.inArray(arg, list, index)) > -1) {
                            list.splice(index, 1);
                            if (firing) {
                                if (index <= firingLength) firingLength--;
                                if (index <= firingIndex) firingIndex--;
                            }
                        }
                    });
                    return this;
                },
                has: function(fn) {
                    return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
                },
                empty: function() {
                    list = [];
                    firingLength = 0;
                    return this;
                },
                disable: function() {
                    list = stack = memory = undefined;
                    return this;
                },
                disabled: function() {
                    return !list;
                },
                lock: function() {
                    stack = undefined;
                    if (!memory) self.disable();
                    return this;
                },
                locked: function() {
                    return !stack;
                },
                fireWith: function(context, args) {
                    if (list && (!fired || stack)) {
                        args = args || [];
                        args = [context, args.slice ? args.slice() : args];
                        if (firing) stack.push(args);
                        else fire(args);
                    }
                    return this;
                },
                fire: function() {
                    self.fireWith(this, arguments);
                    return this;
                },
                fired: function() {
                    return !!fired;
                }
            };
        return self;
    };
    jQuery.extend({
        Deferred: function(func) {
            var tuples = [
                    ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", jQuery.Callbacks("memory")]
                ],
                state = "pending",
                promise = {
                    state: function() {
                        return state;
                    },
                    always: function() {
                        deferred.done(arguments).fail(arguments);
                        return this;
                    },
                    then: function() {
                        var fns = arguments;
                        return jQuery.Deferred(function(newDefer) {
                            jQuery.each(tuples, function(i, tuple) {
                                var action = tuple[0],
                                    fn = jQuery.isFunction(fns[i]) && fns[i];
                                deferred[tuple[1]](function() {
                                    var returned = fn && fn.apply(this, arguments);
                                    if (returned && jQuery.isFunction(returned.promise)) returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                                    else newDefer[action + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                                });
                            });
                            fns = null;
                        }).promise();
                    },
                    promise: function(obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise;
                    }
                },
                deferred = {};
            promise.pipe = promise.then;
            jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2],
                    stateString = tuple[3];
                promise[tuple[1]] = list.add;
                if (stateString) list.add(function() {
                    state = stateString;
                }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
                deferred[tuple[0]] = function() {
                    deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                    return this;
                };
                deferred[tuple[0] + "With"] = list.fireWith;
            });
            promise.promise(deferred);
            if (func) func.call(deferred, deferred);
            return deferred;
        },
        when: function(subordinate) {
            var i = 0,
                resolveValues = core_slice.call(arguments),
                length = resolveValues.length,
                remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
                deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
                updateFunc = function(i, contexts, values) {
                    return function(value) {
                        contexts[i] = this;
                        values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
                        if (values === progressValues) deferred.notifyWith(contexts, values);
                        else if (!(--remaining)) deferred.resolveWith(contexts, values);
                    };
                },
                progressValues, progressContexts, resolveContexts;
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (; i < length; i++)
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
                    else --remaining;
            }
            if (!remaining) deferred.resolveWith(resolveContexts, resolveValues);
            return deferred.promise();
        }
    });
    jQuery.support = (function(support) {
        var all, a, input, select, fragment, opt, eventName, isSupported, i, div = document.createElement("div");
        div.setAttribute("className", "t");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        all = div.getElementsByTagName("*") || [];
        a = div.getElementsByTagName("a")[0];
        if (!a || !a.style || !all.length) return support;
        select = document.createElement("select");
        opt = select.appendChild(document.createElement("option"));
        input = div.getElementsByTagName("input")[0];
        a.style.cssText = "top:1px;float:left;opacity:.5";
        support.getSetAttribute = div.className !== "t";
        support.leadingWhitespace = div.firstChild.nodeType === 3;
        support.tbody = !div.getElementsByTagName("tbody").length;
        support.htmlSerialize = !!div.getElementsByTagName("link").length;
        support.style = /top/.test(a.getAttribute("style"));
        support.hrefNormalized = a.getAttribute("href") === "/a";
        support.opacity = /^0.5/.test(a.style.opacity);
        support.cssFloat = !!a.style.cssFloat;
        support.checkOn = !!input.value;
        support.optSelected = opt.selected;
        support.enctype = !!document.createElement("form").enctype;
        support.html5Clone = document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";
        support.inlineBlockNeedsLayout = false;
        support.shrinkWrapBlocks = false;
        support.pixelPosition = false;
        support.deleteExpando = true;
        support.noCloneEvent = true;
        support.reliableMarginRight = true;
        support.boxSizingReliable = true;
        input.checked = true;
        support.noCloneChecked = input.cloneNode(true).checked;
        select.disabled = true;
        support.optDisabled = !opt.disabled;
        try {
            delete div.test;
        } catch (e) {
            support.deleteExpando = false;
        }
        input = document.createElement("input");
        input.setAttribute("value", "");
        support.input = input.getAttribute("value") === "";
        input.value = "t";
        input.setAttribute("type", "radio");
        support.radioValue = input.value === "t";
        input.setAttribute("checked", "t");
        input.setAttribute("name", "t");
        fragment = document.createDocumentFragment();
        fragment.appendChild(input);
        support.appendChecked = input.checked;
        support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
        if (div.attachEvent) {
            div.attachEvent("onclick", function() {
                support.noCloneEvent = false;
            });
            div.cloneNode(true).click();
        }
        for (i in {
                submit: true,
                change: true,
                focusin: true
            }) {
            div.setAttribute(eventName = "on" + i, "t");
            support[i + "Bubbles"] = eventName in window || div.attributes[eventName].expando === false;
        }
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";
        for (i in jQuery(support)) break;
        support.ownLast = i !== "0";
        jQuery(function() {
            var container, marginDiv, tds, divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                body = document.getElementsByTagName("body")[0];
            if (!body) return;
            container = document.createElement("div");
            container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
            body.appendChild(container).appendChild(div);
            div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
            tds = div.getElementsByTagName("td");
            tds[0].style.cssText = "padding:0;margin:0;border:0;display:none";
            isSupported = (tds[0].offsetHeight === 0);
            tds[0].style.display = "";
            tds[1].style.display = "none";
            support.reliableHiddenOffsets = isSupported && (tds[0].offsetHeight === 0);
            div.innerHTML = "";
            div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
            jQuery.swap(body, body.style.zoom != null ? {
                zoom: 1
            } : {}, function() {
                support.boxSizing = div.offsetWidth === 4;
            });
            if (window.getComputedStyle) {
                support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== "1%";
                support.boxSizingReliable = (window.getComputedStyle(div, null) || {
                    width: "4px"
                }).width === "4px";
                marginDiv = div.appendChild(document.createElement("div"));
                marginDiv.style.cssText = div.style.cssText = divReset;
                marginDiv.style.marginRight = marginDiv.style.width = "0";
                div.style.width = "1px";
                support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight);
            }
            if (typeof div.style.zoom !== core_strundefined) {
                div.innerHTML = "";
                div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
                support.inlineBlockNeedsLayout = (div.offsetWidth === 3);
                div.style.display = "block";
                div.innerHTML = "<div></div>";
                div.firstChild.style.width = "5px";
                support.shrinkWrapBlocks = (div.offsetWidth !== 3);
                if (support.inlineBlockNeedsLayout) body.style.zoom = 1;
            }
            body.removeChild(container);
            container = div = tds = marginDiv = null;
        });
        all = select = fragment = opt = a = input = null;
        return support;
    })({});
    var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        rmultiDash = /([A-Z])/g;

    function internalData(elem, name, data, pvt) {
        if (!jQuery.acceptData(elem)) return;
        var ret, thisCache, internalKey = jQuery.expando,
            isNode = elem.nodeType,
            cache = isNode ? jQuery.cache : elem,
            id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
        if ((!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string") return;
        if (!id)
            if (isNode) id = elem[internalKey] = core_deletedIds.pop() || jQuery.guid++;
            else id = internalKey;
        if (!cache[id]) cache[id] = isNode ? {} : {
            toJSON: jQuery.noop
        };
        if (typeof name === "object" || typeof name === "function")
            if (pvt) cache[id] = jQuery.extend(cache[id], name);
            else cache[id].data = jQuery.extend(cache[id].data, name);
        thisCache = cache[id];
        if (!pvt) {
            if (!thisCache.data) thisCache.data = {};
            thisCache = thisCache.data;
        }
        if (data !== undefined) thisCache[jQuery.camelCase(name)] = data;
        if (typeof name === "string") {
            ret = thisCache[name];
            if (ret == null) ret = thisCache[jQuery.camelCase(name)];
        } else ret = thisCache;
        return ret;
    }

    function internalRemoveData(elem, name, pvt) {
        if (!jQuery.acceptData(elem)) return;
        var thisCache, i, isNode = elem.nodeType,
            cache = isNode ? jQuery.cache : elem,
            id = isNode ? elem[jQuery.expando] : jQuery.expando;
        if (!cache[id]) return;
        if (name) {
            thisCache = pvt ? cache[id] : cache[id].data;
            if (thisCache) {
                if (!jQuery.isArray(name))
                    if (name in thisCache) name = [name];
                    else {
                        name = jQuery.camelCase(name);
                        if (name in thisCache) name = [name];
                        else name = name.split(" ");
                    }
                else name = name.concat(jQuery.map(name, jQuery.camelCase));
                i = name.length;
                while (i--) delete thisCache[name[i]];
                if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) return;
            }
        }
        if (!pvt) {
            delete cache[id].data;
            if (!isEmptyDataObject(cache[id])) return;
        }
        if (isNode) jQuery.cleanData([elem], true);
        else if (jQuery.support.deleteExpando || cache != cache.window) delete cache[id];
        else cache[id] = null;
    }
    jQuery.extend({
        cache: {},
        noData: {
            "applet": true,
            "embed": true,
            "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(elem) {
            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
            return !!elem && !isEmptyDataObject(elem);
        },
        data: function(elem, name, data) {
            return internalData(elem, name, data);
        },
        removeData: function(elem, name) {
            return internalRemoveData(elem, name);
        },
        _data: function(elem, name, data) {
            return internalData(elem, name, data, true);
        },
        _removeData: function(elem, name) {
            return internalRemoveData(elem, name, true);
        },
        acceptData: function(elem) {
            if (elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9) return false;
            var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
            return !noData || noData !== true && elem.getAttribute("classid") === noData;
        }
    });
    jQuery.fn.extend({
        data: function(key, value) {
            var attrs, name, data = null,
                i = 0,
                elem = this[0];
            if (key === undefined) {
                if (this.length) {
                    data = jQuery.data(elem);
                    if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                        attrs = elem.attributes;
                        for (; i < attrs.length; i++) {
                            name = attrs[i].name;
                            if (name.indexOf("data-") === 0) {
                                name = jQuery.camelCase(name.slice(5));
                                dataAttr(elem, name, data[name]);
                            }
                        }
                        jQuery._data(elem, "parsedAttrs", true);
                    }
                }
                return data;
            }
            if (typeof key === "object") return this.each(function() {
                jQuery.data(this, key);
            });
            return arguments.length > 1 ? this.each(function() {
                jQuery.data(this, key, value);
            }) : elem ? dataAttr(elem, key, jQuery.data(elem, key)) : null;
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key);
            });
        }
    });

    function dataAttr(elem, key, data) {
        if (data === undefined && elem.nodeType === 1) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) {}
                jQuery.data(elem, key, data);
            } else data = undefined;
        }
        return data;
    }

    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) {
            if (name === "data" && jQuery.isEmptyObject(obj[name])) continue;
            if (name !== "toJSON") return false;
        }
        return true;
    }
    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            if (elem) {
                type = (type || "fx") + "queue";
                queue = jQuery._data(elem, type);
                if (data)
                    if (!queue || jQuery.isArray(data)) queue = jQuery._data(elem, type, jQuery.makeArray(data));
                    else queue.push(data);
                return queue || [];
            }
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type),
                next = function() {
                    jQuery.dequeue(elem, type);
                };
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
            }
            if (fn) {
                if (type === "fx") queue.unshift("inprogress");
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }
            if (!startLength && hooks) hooks.empty.fire();
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery._removeData(elem, type + "queue");
                    jQuery._removeData(elem, key);
                })
            });
        }
    });
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }
            if (arguments.length < setter) return jQuery.queue(this[0], type);
            return data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type);
                if (type === "fx" && queue[0] !== "inprogress") jQuery.dequeue(this, type);
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        delay: function(time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";
            return this.queue(type, function(next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function() {
                    clearTimeout(timeout);
                };
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp, count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function() {
                    if (!(--count)) defer.resolveWith(elements, [elements]);
                };
            if (typeof type !== "string") {
                obj = type;
                type = undefined;
            }
            type = type || "fx";
            while (i--) {
                tmp = jQuery._data(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });
    var nodeHook, boolHook, rclass = /[\t\r\n\f]/g,
        rreturn = /\r/g,
        rfocusable = /^(?:input|select|textarea|button|object)$/i,
        rclickable = /^(?:a|area)$/i,
        ruseDefault = /^(?:checked|selected)$/i,
        getSetAttribute = jQuery.support.getSetAttribute,
        getSetInput = jQuery.support.input;
    jQuery.fn.extend({
        attr: function(name, value) {
            return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        },
        prop: function(name, value) {
            return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            name = jQuery.propFix[name] || name;
            return this.each(function() {
                try {
                    this[name] = undefined;
                    delete this[name];
                } catch (e) {}
            });
        },
        addClass: function(value) {
            var classes, elem, cur, clazz, j, i = 0,
                len = this.length,
                proceed = typeof value === "string" && value;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, this.className));
            });
            if (proceed) {
                classes = (value || "").match(core_rnotwhite) || [];
                for (; i < len; i++) {
                    elem = this[i];
                    cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ");
                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++]))
                            if (cur.indexOf(" " + clazz + " ") < 0) cur += clazz + " ";
                        elem.className = jQuery.trim(cur);
                    }
                }
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, i = 0,
                len = this.length,
                proceed = arguments.length === 0 || typeof value === "string" && value;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, this.className));
            });
            if (proceed) {
                classes = (value || "").match(core_rnotwhite) || [];
                for (; i < len; i++) {
                    elem = this[i];
                    cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++]))
                            while (cur.indexOf(" " + clazz + " ") >= 0) cur = cur.replace(" " + clazz + " ", " ");
                        elem.className = value ? jQuery.trim(cur) : "";
                    }
                }
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            if (typeof stateVal === "boolean" && type === "string") return stateVal ? this.addClass(value) : this.removeClass(value);
            if (jQuery.isFunction(value)) return this.each(function(i) {
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
            });
            return this.each(function() {
                if (type === "string") {
                    var className, i = 0,
                        self = jQuery(this),
                        classNames = value.match(core_rnotwhite) || [];
                    while ((className = classNames[i++]))
                        if (self.hasClass(className)) self.removeClass(className);
                        else self.addClass(className);
                } else if (type === core_strundefined || type === "boolean") {
                    if (this.className) jQuery._data(this, "__className__", this.className);
                    this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
                }
            });
        },
        hasClass: function(selector) {
            var className = " " + selector + " ",
                i = 0,
                l = this.length;
            for (; i < l; i++)
                if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return true;
            return false;
        },
        val: function(value) {
            var ret, hooks, isFunction, elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) return ret;
                    ret = elem.value;
                    return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
                }
                return;
            }
            isFunction = jQuery.isFunction(value);
            return this.each(function(i) {
                var val;
                if (this.nodeType !== 1) return;
                if (isFunction) val = value.call(this, i, jQuery(this).val());
                else val = value;
                if (val == null) val = "";
                else if (typeof val === "number") val += "";
                else if (jQuery.isArray(val)) val = jQuery.map(val, function(value) {
                    return value == null ? "" : value + "";
                });
                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) this.value = val;
            });
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return val != null ? val : elem.text;
                }
            },
            select: {
                get: function(elem) {
                    var value, option, options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === "select-one" || index < 0,
                        values = one ? null : [],
                        max = one ? index + 1 : options.length,
                        i = index < 0 ? max : one ? index : 0;
                    for (; i < max; i++) {
                        option = options[i];
                        if ((option.selected || i === index) && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            value = jQuery(option).val();
                            if (one) return value;
                            values.push(value);
                        }
                    }
                    return values;
                },
                set: function(elem, value) {
                    var optionSet, option, options = elem.options,
                        values = jQuery.makeArray(value),
                        i = options.length;
                    while (i--) {
                        option = options[i];
                        if ((option.selected = jQuery.inArray(jQuery(option).val(), values) >= 0)) optionSet = true;
                    }
                    if (!optionSet) elem.selectedIndex = -1;
                    return values;
                }
            }
        },
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) return;
            if (typeof elem.getAttribute === core_strundefined) return jQuery.prop(elem, name, value);
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
            }
            if (value !== undefined)
                if (value === null) jQuery.removeAttr(elem, name);
                else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) return ret;
            else {
                elem.setAttribute(name, value + "");
                return value;
            } else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) return ret;
            else {
                ret = jQuery.find.attr(elem, name);
                return ret == null ? undefined : ret;
            }
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0,
                attrNames = value && value.match(core_rnotwhite);
            if (attrNames && elem.nodeType === 1)
                while ((name = attrNames[i++])) {
                    propName = jQuery.propFix[name] || name;
                    if (jQuery.expr.match.bool.test(name))
                        if (getSetInput && getSetAttribute || !ruseDefault.test(name)) elem[propName] = false;
                        else elem[jQuery.camelCase("default-" + name)] = elem[propName] = false;
                    else jQuery.attr(elem, name, "");
                    elem.removeAttribute(getSetAttribute ? name : propName);
                }
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) elem.value = val;
                        return value;
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) return;
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }
            if (value !== undefined) return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem[name] = value);
            else return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name];
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var tabindex = jQuery.find.attr(elem, "tabindex");
                    return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
                }
            }
        }
    });
    boolHook = {
        set: function(elem, value, name) {
            if (value === false) jQuery.removeAttr(elem, name);
            else if (getSetInput && getSetAttribute || !ruseDefault.test(name)) elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name);
            else elem[jQuery.camelCase("default-" + name)] = elem[name] = true;
            return name;
        }
    };
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = jQuery.expr.attrHandle[name] || jQuery.find.attr;
        jQuery.expr.attrHandle[name] = getSetInput && getSetAttribute || !ruseDefault.test(name) ? function(elem, name, isXML) {
            var fn = jQuery.expr.attrHandle[name],
                ret = isXML ? undefined : (jQuery.expr.attrHandle[name] = undefined) != getter(elem, name, isXML) ? name.toLowerCase() : null;
            jQuery.expr.attrHandle[name] = fn;
            return ret;
        } : function(elem, name, isXML) {
            return isXML ? undefined : elem[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null;
        };
    });
    if (!getSetInput || !getSetAttribute) jQuery.attrHooks.value = {
        set: function(elem, value, name) {
            if (jQuery.nodeName(elem, "input")) elem.defaultValue = value;
            else return nodeHook && nodeHook.set(elem, value, name);
        }
    };
    if (!getSetAttribute) {
        nodeHook = {
            set: function(elem, value, name) {
                var ret = elem.getAttributeNode(name);
                if (!ret) elem.setAttributeNode((ret = elem.ownerDocument.createAttribute(name)));
                ret.value = value += "";
                return name === "value" || value === elem.getAttribute(name) ? value : undefined;
            }
        };
        jQuery.expr.attrHandle.id = jQuery.expr.attrHandle.name = jQuery.expr.attrHandle.coords = function(elem, name, isXML) {
            var ret;
            return isXML ? undefined : (ret = elem.getAttributeNode(name)) && ret.value !== "" ? ret.value : null;
        };
        jQuery.valHooks.button = {
            get: function(elem, name) {
                var ret = elem.getAttributeNode(name);
                return ret && ret.specified ? ret.value : undefined;
            },
            set: nodeHook.set
        };
        jQuery.attrHooks.contenteditable = {
            set: function(elem, value, name) {
                nodeHook.set(elem, value === "" ? false : value, name);
            }
        };
        jQuery.each(["width", "height"], function(i, name) {
            jQuery.attrHooks[name] = {
                set: function(elem, value) {
                    if (value === "") {
                        elem.setAttribute(name, "auto");
                        return value;
                    }
                }
            };
        });
    }
    if (!jQuery.support.hrefNormalized) jQuery.each(["href", "src"], function(i, name) {
        jQuery.propHooks[name] = {
            get: function(elem) {
                return elem.getAttribute(name, 4);
            }
        };
    });
    if (!jQuery.support.style) jQuery.attrHooks.style = {
        get: function(elem) {
            return elem.style.cssText || undefined;
        },
        set: function(elem, value) {
            return (elem.style.cssText = value + "");
        }
    };
    if (!jQuery.support.optSelected) jQuery.propHooks.selected = {
        get: function(elem) {
            var parent = elem.parentNode;
            if (parent) {
                parent.selectedIndex;
                if (parent.parentNode) parent.parentNode.selectedIndex;
            }
            return null;
        }
    };
    jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    });
    if (!jQuery.support.enctype) jQuery.propFix.enctype = "encoding";
    jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                if (jQuery.isArray(value)) return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0);
            }
        };
        if (!jQuery.support.checkOn) jQuery.valHooks[this].get = function(elem) {
            return elem.getAttribute("value") === null ? "on" : elem.value;
        };
    });
    var rformElems = /^(?:input|select|textarea)$/i,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }

    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
            if (!elemData) return;
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }
            if (!handler.guid) handler.guid = jQuery.guid++;
            if (!(events = elemData.events)) events = elemData.events = {};
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function(e) {
                    return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
                };
                eventHandle.elem = elem;
            }
            types = (types || "").match(core_rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) continue;
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                special = jQuery.event.special[type] || {};
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false)
                        if (elem.addEventListener) elem.addEventListener(type, eventHandle, false);
                        else if (elem.attachEvent) elem.attachEvent("on" + type, eventHandle);
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) handleObj.handler.guid = handler.guid;
                }
                if (selector) handlers.splice(handlers.delegateCount++, 0, handleObj);
                else handlers.push(handleObj);
                jQuery.event.global[type] = true;
            }
            elem = null;
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (!elemData || !(events = elemData.events)) return;
            types = (types || "").match(core_rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];
                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                        handlers.splice(j, 1);
                        if (handleObj.selector) handlers.delegateCount--;
                        if (special.remove) special.remove.call(elem, handleObj);
                    }
                }
                if (origCount && !handlers.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) jQuery.removeEvent(elem, type, elemData.handle);
                    delete events[type];
                }
            }
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;
                jQuery._removeData(elem, "events");
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [elem || document],
                type = core_hasOwn.call(event, "type") ? event.type : event,
                namespaces = core_hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            cur = tmp = elem = elem || document;
            if (elem.nodeType === 3 || elem.nodeType === 8) return;
            if (rfocusMorph.test(type + jQuery.event.triggered)) return;
            if (type.indexOf(".") >= 0) {
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;
            event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            event.result = undefined;
            if (!event.target) event.target = elem;
            data = data == null ? [event] : jQuery.makeArray(data, [event]);
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) return;
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) cur = cur.parentNode;
                for (; cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }
                if (tmp === (elem.ownerDocument || document)) eventPath.push(tmp.defaultView || tmp.parentWindow || window);
            }
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                event.type = i > 1 ? bubbleType : special.bindType || type;
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
                if (handle) handle.apply(cur, data);
                handle = ontype && cur[ontype];
                if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) event.preventDefault();
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented())
                if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem))
                    if (ontype && elem[type] && !jQuery.isWindow(elem)) {
                        tmp = elem[ontype];
                        if (tmp) elem[ontype] = null;
                        jQuery.event.triggered = type;
                        try {
                            elem[type]();
                        } catch (e) {}
                        jQuery.event.triggered = undefined;
                        if (tmp) elem[ontype] = tmp;
                    }
            return event.result;
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, ret, handleObj, matched, j, handlerQueue = [],
                args = core_slice.call(arguments),
                handlers = (jQuery._data(this, "events") || {})[event.type] || [],
                special = jQuery.event.special[event.type] || {};
            args[0] = event;
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) return;
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;
                j = 0;
                while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped())
                    if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
                        event.handleObj = handleObj;
                        event.data = handleObj.data;
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                        if (ret !== undefined)
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                    }
            }
            if (special.postDispatch) special.postDispatch.call(this, event);
            return event.result;
        },
        handlers: function(event, handlers) {
            var sel, handleObj, matches, i, handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || event.type !== "click"))
                for (; cur != this; cur = cur.parentNode || this)
                    if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];
                            sel = handleObj.selector + " ";
                            if (matches[sel] === undefined) matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length;
                            if (matches[sel]) matches.push(handleObj);
                        }
                        if (matches.length) handlerQueue.push({
                            elem: cur,
                            handlers: matches
                        });
                    }
            if (delegateCount < handlers.length) handlerQueue.push({
                elem: this,
                handlers: handlers.slice(delegateCount)
            });
            return handlerQueue;
        },
        fix: function(event) {
            if (event[jQuery.expando]) return event;
            var i, prop, copy, type = event.type,
                originalEvent = event,
                fixHook = this.fixHooks[type];
            if (!fixHook) this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            event = new jQuery.Event(originalEvent);
            i = copy.length;
            while (i--) {
                prop = copy[i];
                event[prop] = originalEvent[prop];
            }
            if (!event.target) event.target = originalEvent.srcElement || document;
            if (event.target.nodeType === 3) event.target = event.target.parentNode;
            event.metaKey = !!event.metaKey;
            return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                if (event.which == null) event.which = original.charCode != null ? original.charCode : original.keyCode;
                return event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var body, eventDoc, doc, button = original.button,
                    fromElement = original.fromElement;
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;
                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                }
                if (!event.relatedTarget && fromElement) event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
                if (!event.which && button !== undefined) event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
                return event;
            }
        },
        special: {
            load: {
                noBubble: true
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) try {
                        this.focus();
                        return false;
                    } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
                        this.click();
                        return false;
                    }
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    if (event.result !== undefined) event.originalEvent.returnValue = event.result;
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true,
                originalEvent: {}
            });
            if (bubble) jQuery.event.trigger(e, null, elem);
            else jQuery.event.dispatch.call(elem, e);
            if (e.isDefaultPrevented()) event.preventDefault();
        }
    };
    jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
        if (elem.removeEventListener) elem.removeEventListener(type, handle, false);
    } : function(elem, type, handle) {
        var name = "on" + type;
        if (elem.detachEvent) {
            if (typeof elem[name] === core_strundefined) elem[name] = null;
            elem.detachEvent(name, handle);
        }
    };
    jQuery.Event = function(src, props) {
        if (!(this instanceof jQuery.Event)) return new jQuery.Event(src, props);
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;
        } else this.type = src;
        if (props) jQuery.extend(this, props);
        this.timeStamp = src && src.timeStamp || jQuery.now();
        this[jQuery.expando] = true;
    };
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (!e) return;
            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (!e) return;
            if (e.stopPropagation) e.stopPropagation();
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation();
        }
    };
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;
                if (!related || (related !== target && !jQuery.contains(target, related))) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });
    if (!jQuery.support.submitBubbles) jQuery.event.special.submit = {
        setup: function() {
            if (jQuery.nodeName(this, "form")) return false;
            jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                var elem = e.target,
                    form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                if (form && !jQuery._data(form, "submitBubbles")) {
                    jQuery.event.add(form, "submit._submit", function(event) {
                        event._submit_bubble = true;
                    });
                    jQuery._data(form, "submitBubbles", true);
                }
            });
        },
        postDispatch: function(event) {
            if (event._submit_bubble) {
                delete event._submit_bubble;
                if (this.parentNode && !event.isTrigger) jQuery.event.simulate("submit", this.parentNode, event, true);
            }
        },
        teardown: function() {
            if (jQuery.nodeName(this, "form")) return false;
            jQuery.event.remove(this, "._submit");
        }
    };
    if (!jQuery.support.changeBubbles) jQuery.event.special.change = {
        setup: function() {
            if (rformElems.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") {
                    jQuery.event.add(this, "propertychange._change", function(event) {
                        if (event.originalEvent.propertyName === "checked") this._just_changed = true;
                    });
                    jQuery.event.add(this, "click._change", function(event) {
                        if (this._just_changed && !event.isTrigger) this._just_changed = false;
                        jQuery.event.simulate("change", this, event, true);
                    });
                }
                return false;
            }
            jQuery.event.add(this, "beforeactivate._change", function(e) {
                var elem = e.target;
                if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles")) {
                    jQuery.event.add(elem, "change._change", function(event) {
                        if (this.parentNode && !event.isSimulated && !event.isTrigger) jQuery.event.simulate("change", this.parentNode, event, true);
                    });
                    jQuery._data(elem, "changeBubbles", true);
                }
            });
        },
        handle: function(event) {
            var elem = event.target;
            if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) return event.handleObj.handler.apply(this, arguments);
        },
        teardown: function() {
            jQuery.event.remove(this, "._change");
            return !rformElems.test(this.nodeName);
        }
    };
    if (!jQuery.support.focusinBubbles) jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        var attaches = 0,
            handler = function(event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
            };
        jQuery.event.special[fix] = {
            setup: function() {
                if (attaches++ === 0) document.addEventListener(orig, handler, true);
            },
            teardown: function() {
                if (--attaches === 0) document.removeEventListener(orig, handler, true);
            }
        };
    });
    jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var type, origFn;
            if (typeof types === "object") {
                if (typeof selector !== "string") {
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) this.on(type, selector, data, types[type], one);
                return this;
            }
            if (data == null && fn == null) {
                fn = selector;
                data = selector = undefined;
            } else if (fn == null)
                if (typeof selector === "string") {
                    fn = data;
                    data = undefined;
                } else {
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            if (fn === false) fn = returnFalse;
            else if (!fn) return this;
            if (one === 1) {
                origFn = fn;
                fn = function(event) {
                    jQuery().off(event);
                    return origFn.apply(this, arguments);
                };
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
            }
            return this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                return this;
            }
            if (typeof types === "object") {
                for (type in types) this.off(type, selector, types[type]);
                return this;
            }
            if (selector === false || typeof selector === "function") {
                fn = selector;
                selector = undefined;
            }
            if (fn === false) fn = returnFalse;
            return this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            if (elem) return jQuery.event.trigger(type, data, elem, true);
        }
    });
    var isSimple = /^.[^:#\[\.,]*$/,
        rparentsprev = /^(?:parents|prev(?:Until|All))/,
        rneedsContext = jQuery.expr.match.needsContext,
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    jQuery.fn.extend({
        find: function(selector) {
            var i, ret = [],
                self = this,
                len = self.length;
            if (typeof selector !== "string") return this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; i < len; i++)
                    if (jQuery.contains(self[i], this)) return true;
            }));
            for (i = 0; i < len; i++) jQuery.find(selector, self[i], ret);
            ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
            ret.selector = this.selector ? this.selector + " " + selector : selector;
            return ret;
        },
        has: function(target) {
            var i, targets = jQuery(target, this),
                len = targets.length;
            return this.filter(function() {
                for (i = 0; i < len; i++)
                    if (jQuery.contains(this, targets[i])) return true;
            });
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], true));
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], false));
        },
        is: function(selector) {
            return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
        },
        closest: function(selectors, context) {
            var cur, i = 0,
                l = this.length,
                ret = [],
                pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
            for (; i < l; i++)
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode)
                    if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
                        cur = ret.push(cur);
                        break;
                    }
            return this.pushStack(ret.length > 1 ? jQuery.unique(ret) : ret);
        },
        index: function(elem) {
            if (!elem) return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
            if (typeof elem === "string") return jQuery.inArray(this[0], jQuery(elem));
            return jQuery.inArray(elem.jquery ? elem[0] : elem, this);
        },
        add: function(selector, context) {
            var set = typeof selector === "string" ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector),
                all = jQuery.merge(this.get(), set);
            return this.pushStack(jQuery.unique(all));
        },
        addBack: function(selector) {
            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
        }
    });

    function sibling(cur, dir) {
        do cur = cur[dir]; while (cur && cur.nodeType !== 1);
        return cur;
    }
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            if (name.slice(-5) !== "Until") selector = until;
            if (selector && typeof selector === "string") ret = jQuery.filter(selector, ret);
            if (this.length > 1) {
                if (!guaranteedUnique[name]) ret = jQuery.unique(ret);
                if (rparentsprev.test(name)) ret = ret.reverse();
            }
            return this.pushStack(ret);
        };
    });
    jQuery.extend({
        filter: function(expr, elems, not) {
            var elem = elems[0];
            if (not) expr = ":not(" + expr + ")";
            return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
                return elem.nodeType === 1;
            }));
        },
        dir: function(elem, dir, until) {
            var matched = [],
                cur = elem[dir];
            while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                if (cur.nodeType === 1) matched.push(cur);
                cur = cur[dir];
            }
            return matched;
        },
        sibling: function(n, elem) {
            var r = [];
            for (; n; n = n.nextSibling)
                if (n.nodeType === 1 && n !== elem) r.push(n);
            return r;
        }
    });

    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
            return !!qualifier.call(elem, i, elem) !== not;
        });
        if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
            return (elem === qualifier) !== not;
        });
        if (typeof qualifier === "string") {
            if (isSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
            qualifier = jQuery.filter(qualifier, elements);
        }
        return jQuery.grep(elements, function(elem) {
            return (jQuery.inArray(elem, qualifier) >= 0) !== not;
        });
    }

    function createSafeFragment(document) {
        var list = nodeNames.split("|"),
            safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement)
            while (list.length) safeFrag.createElement(list.pop());
        return safeFrag;
    }
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" + "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
        manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /^$|\/(?:java|ecma)script/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: jQuery.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        safeFragment = createSafeFragment(document),
        fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    jQuery.fn.extend({
        text: function(value) {
            return jQuery.access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
            }, null, value, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                if (this.parentNode) this.parentNode.insertBefore(elem, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                if (this.parentNode) this.parentNode.insertBefore(elem, this.nextSibling);
            });
        },
        remove: function(selector, keepData) {
            var elem, elems = selector ? jQuery.filter(selector, this) : this,
                i = 0;
            for (;
                (elem = elems[i]) != null; i++) {
                if (!keepData && elem.nodeType === 1) jQuery.cleanData(getAll(elem));
                if (elem.parentNode) {
                    if (keepData && jQuery.contains(elem.ownerDocument, elem)) setGlobalEval(getAll(elem, "script"));
                    elem.parentNode.removeChild(elem);
                }
            }
            return this;
        },
        empty: function() {
            var elem, i = 0;
            for (;
                (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) jQuery.cleanData(getAll(elem, false));
                while (elem.firstChild) elem.removeChild(elem.firstChild);
                if (elem.options && jQuery.nodeName(elem, "select")) elem.options.length = 0;
            }
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return jQuery.access(this, function(value) {
                var elem = this[0] || {},
                    i = 0,
                    l = this.length;
                if (value === undefined) return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, "") : undefined;
                if (typeof value === "string" && !rnoInnerhtml.test(value) && (jQuery.support.htmlSerialize || !rnoshimcache.test(value)) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; i < l; i++) {
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(getAll(elem, false));
                                elem.innerHTML = value;
                            }
                        }
                        elem = 0;
                    } catch (e) {}
                }
                if (elem) this.empty().append(value);
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var args = jQuery.map(this, function(elem) {
                    return [elem.nextSibling, elem.parentNode];
                }),
                i = 0;
            this.domManip(arguments, function(elem) {
                var next = args[i++],
                    parent = args[i++];
                if (parent) {
                    if (next && next.parentNode !== parent) next = this.nextSibling;
                    jQuery(this).remove();
                    parent.insertBefore(elem, next);
                }
            }, true);
            return i ? this : this.remove();
        },
        detach: function(selector) {
            return this.remove(selector, true);
        },
        domManip: function(args, callback, allowIntersection) {
            args = core_concat.apply([], args);
            var first, node, hasScripts, scripts, doc, fragment, i = 0,
                l = this.length,
                set = this,
                iNoClone = l - 1,
                value = args[0],
                isFunction = jQuery.isFunction(value);
            if (isFunction || !(l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test(value))) return this.each(function(index) {
                var self = set.eq(index);
                if (isFunction) args[0] = value.call(this, index, self.html());
                self.domManip(args, callback, allowIntersection);
            });
            if (l) {
                fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, !allowIntersection && this);
                first = fragment.firstChild;
                if (fragment.childNodes.length === 1) fragment = first;
                if (first) {
                    scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                    hasScripts = scripts.length;
                    for (; i < l; i++) {
                        node = fragment;
                        if (i !== iNoClone) {
                            node = jQuery.clone(node, true, true);
                            if (hasScripts) jQuery.merge(scripts, getAll(node, "script"));
                        }
                        callback.call(this[i], node, i);
                    }
                    if (hasScripts) {
                        doc = scripts[scripts.length - 1].ownerDocument;
                        jQuery.map(scripts, restoreScript);
                        for (i = 0; i < hasScripts; i++) {
                            node = scripts[i];
                            if (rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node))
                                if (node.src) jQuery._evalUrl(node.src);
                                else jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, ""));
                        }
                    }
                    fragment = first = null;
                }
            }
            return this;
        }
    });

    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType === 1 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
    }

    function disableScript(elem) {
        elem.type = (jQuery.find.attr(elem, "type") !== null) + "/" + elem.type;
        return elem;
    }

    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        if (match) elem.type = match[1];
        else elem.removeAttribute("type");
        return elem;
    }

    function setGlobalEval(elems, refElements) {
        var elem, i = 0;
        for (;
            (elem = elems[i]) != null; i++) jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
    }

    function cloneCopyEvent(src, dest) {
        if (dest.nodeType !== 1 || !jQuery.hasData(src)) return;
        var type, i, l, oldData = jQuery._data(src),
            curData = jQuery._data(dest, oldData),
            events = oldData.events;
        if (events) {
            delete curData.handle;
            curData.events = {};
            for (type in events)
                for (i = 0, l = events[type].length; i < l; i++) jQuery.event.add(dest, type, events[type][i]);
        }
        if (curData.data) curData.data = jQuery.extend({}, curData.data);
    }

    function fixCloneNodeIssues(src, dest) {
        var nodeName, e, data;
        if (dest.nodeType !== 1) return;
        nodeName = dest.nodeName.toLowerCase();
        if (!jQuery.support.noCloneEvent && dest[jQuery.expando]) {
            data = jQuery._data(dest);
            for (e in data.events) jQuery.removeEvent(dest, e, data.handle);
            dest.removeAttribute(jQuery.expando);
        }
        if (nodeName === "script" && dest.text !== src.text) {
            disableScript(dest).text = src.text;
            restoreScript(dest);
        } else if (nodeName === "object") {
            if (dest.parentNode) dest.outerHTML = src.outerHTML;
            if (jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) dest.innerHTML = src.innerHTML;
        } else if (nodeName === "input" && manipulation_rcheckableType.test(src.type)) {
            dest.defaultChecked = dest.checked = src.checked;
            if (dest.value !== src.value) dest.value = src.value;
        } else if (nodeName === "option") dest.defaultSelected = dest.selected = src.defaultSelected;
        else if (nodeName === "input" || nodeName === "textarea") dest.defaultValue = src.defaultValue;
    }
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var elems, i = 0,
                ret = [],
                insert = jQuery(selector),
                last = insert.length - 1;
            for (; i <= last; i++) {
                elems = i === last ? this : this.clone(true);
                jQuery(insert[i])[original](elems);
                core_push.apply(ret, elems.get());
            }
            return this.pushStack(ret);
        };
    });

    function getAll(context, tag) {
        var elems, elem, i = 0,
            found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll(tag || "*") : undefined;
        if (!found)
            for (found = [], elems = context.childNodes || context;
                (elem = elems[i]) != null; i++)
                if (!tag || jQuery.nodeName(elem, tag)) found.push(elem);
                else jQuery.merge(found, getAll(elem, tag));
        return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], found) : found;
    }

    function fixDefaultChecked(elem) {
        if (manipulation_rcheckableType.test(elem.type)) elem.defaultChecked = elem.checked;
    }
    jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
            if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) clone = elem.cloneNode(true);
            else {
                fragmentDiv.innerHTML = elem.outerHTML;
                fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
            }
            if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                destElements = getAll(clone);
                srcElements = getAll(elem);
                for (i = 0;
                    (node = srcElements[i]) != null; ++i)
                    if (destElements[i]) fixCloneNodeIssues(node, destElements[i]);
            }
            if (dataAndEvents)
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);
                    for (i = 0;
                        (node = srcElements[i]) != null; i++) cloneCopyEvent(node, destElements[i]);
                } else cloneCopyEvent(elem, clone);
            destElements = getAll(clone, "script");
            if (destElements.length > 0) setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            destElements = srcElements = node = null;
            return clone;
        },
        buildFragment: function(elems, context, scripts, selection) {
            var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length,
                safe = createSafeFragment(context),
                nodes = [],
                i = 0;
            for (; i < l; i++) {
                elem = elems[i];
                if (elem || elem === 0)
                    if (jQuery.type(elem) === "object") jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                    else if (!rhtml.test(elem)) nodes.push(context.createTextNode(elem));
                else {
                    tmp = tmp || safe.appendChild(context.createElement("div"));
                    tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                    wrap = wrapMap[tag] || wrapMap._default;
                    tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
                    j = wrap[0];
                    while (j--) tmp = tmp.lastChild;
                    if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
                    if (!jQuery.support.tbody) {
                        elem = tag === "table" && !rtbody.test(elem) ? tmp.firstChild : wrap[1] === "<table>" && !rtbody.test(elem) ? tmp : 0;
                        j = elem && elem.childNodes.length;
                        while (j--)
                            if (jQuery.nodeName((tbody = elem.childNodes[j]), "tbody") && !tbody.childNodes.length) elem.removeChild(tbody);
                    }
                    jQuery.merge(nodes, tmp.childNodes);
                    tmp.textContent = "";
                    while (tmp.firstChild) tmp.removeChild(tmp.firstChild);
                    tmp = safe.lastChild;
                }
            }
            if (tmp) safe.removeChild(tmp);
            if (!jQuery.support.appendChecked) jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
            i = 0;
            while ((elem = nodes[i++])) {
                if (selection && jQuery.inArray(elem, selection) !== -1) continue;
                contains = jQuery.contains(elem.ownerDocument, elem);
                tmp = getAll(safe.appendChild(elem), "script");
                if (contains) setGlobalEval(tmp);
                if (scripts) {
                    j = 0;
                    while ((elem = tmp[j++]))
                        if (rscriptType.test(elem.type || "")) scripts.push(elem);
                }
            }
            tmp = null;
            return safe;
        },
        cleanData: function(elems, acceptData) {
            var elem, type, id, data, i = 0,
                internalKey = jQuery.expando,
                cache = jQuery.cache,
                deleteExpando = jQuery.support.deleteExpando,
                special = jQuery.event.special;
            for (;
                (elem = elems[i]) != null; i++)
                if (acceptData || jQuery.acceptData(elem)) {
                    id = elem[internalKey];
                    data = id && cache[id];
                    if (data) {
                        if (data.events)
                            for (type in data.events)
                                if (special[type]) jQuery.event.remove(elem, type);
                                else jQuery.removeEvent(elem, type, data.handle);
                        if (cache[id]) {
                            delete cache[id];
                            if (deleteExpando) delete elem[internalKey];
                            else if (typeof elem.removeAttribute !== core_strundefined) elem.removeAttribute(internalKey);
                            else elem[internalKey] = null;
                            core_deletedIds.push(id);
                        }
                    }
                }
        },
        _evalUrl: function(url) {
            return jQuery.ajax({
                url: url,
                type: "GET",
                dataType: "script",
                async: false,
                global: false,
                "throws": true
            });
        }
    });
    jQuery.fn.extend({
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) return this.each(function(i) {
                jQuery(this).wrapAll(html.call(this, i));
            });
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) wrap.insertBefore(this[0]);
                wrap.map(function() {
                    var elem = this;
                    while (elem.firstChild && elem.firstChild.nodeType === 1) elem = elem.firstChild;
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(html) {
            if (jQuery.isFunction(html)) return this.each(function(i) {
                jQuery(this).wrapInner(html.call(this, i));
            });
            return this.each(function() {
                var self = jQuery(this),
                    contents = self.contents();
                if (contents.length) contents.wrapAll(html);
                else self.append(html);
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!jQuery.nodeName(this, "body")) jQuery(this).replaceWith(this.childNodes);
            }).end();
        }
    });
    var iframe, getStyles, curCSS, ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity\s*=\s*([^)]*)/,
        rposition = /^(top|right|bottom|left)$/,
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rmargin = /^margin/,
        rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
        rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
        rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"),
        elemdisplay = {
            BODY: "block"
        },
        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        cssNormalTransform = {
            letterSpacing: 0,
            fontWeight: 400
        },
        cssExpand = ["Top", "Right", "Bottom", "Left"],
        cssPrefixes = ["Webkit", "O", "Moz", "ms"];

    function vendorPropName(style, name) {
        if (name in style) return name;
        var capName = name.charAt(0).toUpperCase() + name.slice(1),
            origName = name,
            i = cssPrefixes.length;
        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in style) return name;
        }
        return origName;
    }

    function isHidden(elem, el) {
        elem = el || elem;
        return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
    }

    function showHide(elements, show) {
        var display, elem, hidden, values = [],
            index = 0,
            length = elements.length;
        for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) continue;
            values[index] = jQuery._data(elem, "olddisplay");
            display = elem.style.display;
            if (show) {
                if (!values[index] && display === "none") elem.style.display = "";
                if (elem.style.display === "" && isHidden(elem)) values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName));
            } else if (!values[index]) {
                hidden = isHidden(elem);
                if (display && display !== "none" || !hidden) jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
            }
        }
        for (index = 0; index < length; index++) {
            elem = elements[index];
            if (!elem.style) continue;
            if (!show || elem.style.display === "none" || elem.style.display === "") elem.style.display = show ? values[index] || "" : "none";
        }
        return elements;
    }
    jQuery.fn.extend({
        css: function(name, value) {
            return jQuery.access(this, function(elem, name, value) {
                var len, styles, map = {},
                    i = 0;
                if (jQuery.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;
                    for (; i < len; i++) map[name[i]] = jQuery.css(elem, name[i], false, styles);
                    return map;
                }
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, true);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            if (typeof state === "boolean") return state ? this.show() : this.hide();
            return this.each(function() {
                if (isHidden(this)) jQuery(this).show();
                else jQuery(this).hide();
            });
        }
    });
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            "columnCount": true,
            "fillOpacity": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },
        cssProps: {
            "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) return;
            var ret, type, hooks, origName = jQuery.camelCase(name),
                style = elem.style;
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (value !== undefined) {
                type = typeof value;
                if (type === "string" && (ret = rrelNum.exec(value))) {
                    value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
                    type = "number";
                }
                if (value == null || type === "number" && isNaN(value)) return;
                if (type === "number" && !jQuery.cssNumber[origName]) value += "px";
                if (!jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0) style[name] = "inherit";
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) try {
                    style[name] = value;
                } catch (e) {}
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) return ret;
                return style[name];
            }
        },
        css: function(elem, name, extra, styles) {
            var num, val, hooks, origName = jQuery.camelCase(name);
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (hooks && "get" in hooks) val = hooks.get(elem, true, extra);
            if (val === undefined) val = curCSS(elem, name, styles);
            if (val === "normal" && name in cssNormalTransform) val = cssNormalTransform[name];
            if (extra === "" || extra) {
                num = parseFloat(val);
                return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
            }
            return val;
        }
    });
    if (window.getComputedStyle) {
        getStyles = function(elem) {
            return window.getComputedStyle(elem, null);
        };
        curCSS = function(elem, name, _computed) {
            var width, minWidth, maxWidth, computed = _computed || getStyles(elem),
                ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined,
                style = elem.style;
            if (computed) {
                if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) ret = jQuery.style(elem, name);
                if (rnumnonpx.test(ret) && rmargin.test(name)) {
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth;
                }
            }
            return ret;
        };
    } else if (document.documentElement.currentStyle) {
        getStyles = function(elem) {
            return elem.currentStyle;
        };
        curCSS = function(elem, name, _computed) {
            var left, rs, rsLeft, computed = _computed || getStyles(elem),
                ret = computed ? computed[name] : undefined,
                style = elem.style;
            if (ret == null && style && style[name]) ret = style[name];
            if (rnumnonpx.test(ret) && !rposition.test(name)) {
                left = style.left;
                rs = elem.runtimeStyle;
                rsLeft = rs && rs.left;
                if (rsLeft) rs.left = elem.currentStyle.left;
                style.left = name === "fontSize" ? "1em" : ret;
                ret = style.pixelLeft + "px";
                style.left = left;
                if (rsLeft) rs.left = rsLeft;
            }
            return ret === "" ? "auto" : ret;
        };
    }

    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }

    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
            val = 0;
        for (; i < 4; i += 2) {
            if (extra === "margin") val += jQuery.css(elem, extra + cssExpand[i], true, styles);
            if (isBorderBox) {
                if (extra === "content") val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                if (extra !== "margin") val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
            } else {
                val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                if (extra !== "padding") val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
            }
        }
        return val;
    }

    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = true,
            val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
            styles = getStyles(elem),
            isBorderBox = jQuery.support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box";
        if (val <= 0 || val == null) {
            val = curCSS(elem, name, styles);
            if (val < 0 || val == null) val = elem.style[name];
            if (rnumnonpx.test(val)) return val;
            valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]);
            val = parseFloat(val) || 0;
        }
        return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px";
    }

    function css_defaultDisplay(nodeName) {
        var doc = document,
            display = elemdisplay[nodeName];
        if (!display) {
            display = actualDisplay(nodeName, doc);
            if (display === "none" || !display) {
                iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(doc.documentElement);
                doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
                doc.write("<!doctype html><html><body>");
                doc.close();
                display = actualDisplay(nodeName, doc);
                iframe.detach();
            }
            elemdisplay[nodeName] = display;
        }
        return display;
    }

    function actualDisplay(name, doc) {
        var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
            display = jQuery.css(elem[0], "display");
        elem.remove();
        return display;
    }
    jQuery.each(["height", "width"], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed) return elem.offsetWidth === 0 && rdisplayswap.test(jQuery.css(elem, "display")) ? jQuery.swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra);
                }) : getWidthOrHeight(elem, name, extra);
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0);
            }
        };
    });
    if (!jQuery.support.opacity) jQuery.cssHooks.opacity = {
        get: function(elem, computed) {
            return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (0.01 * parseFloat(RegExp.$1)) + "" : computed ? "1" : "";
        },
        set: function(elem, value) {
            var style = elem.style,
                currentStyle = elem.currentStyle,
                opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
                filter = currentStyle && currentStyle.filter || style.filter || "";
            style.zoom = 1;
            if ((value >= 1 || value === "") && jQuery.trim(filter.replace(ralpha, "")) === "" && style.removeAttribute) {
                style.removeAttribute("filter");
                if (value === "" || currentStyle && !currentStyle.filter) return;
            }
            style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity;
        }
    };
    jQuery(function() {
        if (!jQuery.support.reliableMarginRight) jQuery.cssHooks.marginRight = {
            get: function(elem, computed) {
                if (computed) return jQuery.swap(elem, {
                    "display": "inline-block"
                }, curCSS, [elem, "marginRight"]);
            }
        };
        if (!jQuery.support.pixelPosition && jQuery.fn.position) jQuery.each(["top", "left"], function(i, prop) {
            jQuery.cssHooks[prop] = {
                get: function(elem, computed) {
                    if (computed) {
                        computed = curCSS(elem, prop);
                        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
                    }
                }
            };
        });
    });
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.hidden = function(elem) {
            return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css(elem, "display")) === "none");
        };
        jQuery.expr.filters.visible = function(elem) {
            return !jQuery.expr.filters.hidden(elem);
        };
    }
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                var i = 0,
                    expanded = {},
                    parts = typeof value === "string" ? value.split(" ") : [value];
                for (; i < 4; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded;
            }
        };
        if (!rmargin.test(prefix)) jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    });
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !manipulation_rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    });
    jQuery.param = function(a, traditional) {
        var prefix, s = [],
            add = function(key, value) {
                value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            };
        if (traditional === undefined) traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) jQuery.each(a, function() {
            add(this.name, this.value);
        });
        else
            for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+");
    };

    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
            if (traditional || rbracket.test(prefix)) add(prefix, v);
            else buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
        });
        else if (!traditional && jQuery.type(obj) === "object")
            for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
        else add(prefix, obj);
    }
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    });
    jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    });
    var ajaxLocParts, ajaxLocation, ajax_nonce = jQuery.now(),
        ajax_rquery = /\?/,
        rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        _load = jQuery.fn.load,
        prefilters = {},
        transports = {},
        allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href;
    } catch (e) {
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }
            var dataType, i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match(core_rnotwhite) || [];
            if (jQuery.isFunction(func))
                while ((dataType = dataTypes[i++]))
                    if (dataType[0] === "+") {
                        dataType = dataType.slice(1) || "*";
                        (structure[dataType] = structure[dataType] || []).unshift(func);
                    } else(structure[dataType] = structure[dataType] || []).push(func);
        };
    }

    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        var inspected = {},
            seekingTransport = (structure === transports);

        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                } else if (seekingTransport) return !(selected = dataTypeOrTransport);
            });
            return selected;
        }
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }

    function ajaxExtend(target, src) {
        var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src)
            if (src[key] !== undefined)(flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
        if (deep) jQuery.extend(true, target, deep);
        return target;
    }
    jQuery.fn.load = function(url, params, callback) {
        if (typeof url !== "string" && _load) return _load.apply(this, arguments);
        var selector, response, type, self = this,
            off = url.indexOf(" ");
        if (off >= 0) {
            selector = url.slice(off, url.length);
            url = url.slice(0, off);
        }
        if (jQuery.isFunction(params)) {
            callback = params;
            params = undefined;
        } else if (params && typeof params === "object") type = "POST";
        if (self.length > 0) jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments;
            self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
        }).complete(callback && function(jqXHR, status) {
            self.each(callback, response || [jqXHR.responseText, status, jqXHR]);
        });
        return this;
    };
    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    });
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": true,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: true,
                context: true
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }
            options = options || {};
            var parts, i, cacheURL, responseHeadersString, timeoutTimer, fireGlobals, transport, responseHeaders, s = jQuery.ajaxSetup({}, options),
                callbackContext = s.context || s,
                globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),
                statusCode = s.statusCode || {},
                requestHeaders = {},
                requestHeadersNames = {},
                state = 0,
                strAbort = "canceled",
                jqXHR = {
                    readyState: 0,
                    getResponseHeader: function(key) {
                        var match;
                        if (state === 2) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while ((match = rheaders.exec(responseHeadersString))) responseHeaders[match[1].toLowerCase()] = match[2];
                            }
                            match = responseHeaders[key.toLowerCase()];
                        }
                        return match == null ? null : match;
                    },
                    getAllResponseHeaders: function() {
                        return state === 2 ? responseHeadersString : null;
                    },
                    setRequestHeader: function(name, value) {
                        var lname = name.toLowerCase();
                        if (!state) {
                            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                            requestHeaders[name] = value;
                        }
                        return this;
                    },
                    overrideMimeType: function(type) {
                        if (!state) s.mimeType = type;
                        return this;
                    },
                    statusCode: function(map) {
                        var code;
                        if (map)
                            if (state < 2)
                                for (code in map) statusCode[code] = [statusCode[code], map[code]];
                            else jqXHR.always(map[jqXHR.status]);
                        return this;
                    },
                    abort: function(statusText) {
                        var finalText = statusText || strAbort;
                        if (transport) transport.abort(finalText);
                        done(0, finalText);
                        return this;
                    }
                };
            deferred.promise(jqXHR).complete = completeDeferred.add;
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
            s.type = options.method || options.type || s.method || s.type;
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(core_rnotwhite) || [""];
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "https:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "https:" ? "80" : "443"))));
            }
            if (s.data && s.processData && typeof s.data !== "string") s.data = jQuery.param(s.data, s.traditional);
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (state === 2) return jqXHR;
            fireGlobals = s.global;
            if (fireGlobals && jQuery.active++ === 0) jQuery.event.trigger("ajaxStart");
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            cacheURL = s.url;
            if (!s.hasContent) {
                if (s.data) {
                    cacheURL = (s.url += (ajax_rquery.test(cacheURL) ? "&" : "?") + s.data);
                    delete s.data;
                }
                if (s.cache === false) s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + ajax_nonce++) : cacheURL + (ajax_rquery.test(cacheURL) ? "&" : "?") + "_=" + ajax_nonce++;
            }
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                if (jQuery.etag[cacheURL]) jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) jqXHR.setRequestHeader("Content-Type", s.contentType);
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) return jqXHR.abort();
            strAbort = "abort";
            for (i in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) jqXHR[i](s[i]);
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) done(-1, "No Transport");
            else {
                jqXHR.readyState = 1;
                if (fireGlobals) globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                if (s.async && s.timeout > 0) timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout");
                }, s.timeout);
                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    if (state < 2) done(-1, e);
                    else throw e;
                }
            }

            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                if (state === 2) return;
                state = 2;
                if (timeoutTimer) clearTimeout(timeoutTimer);
                transport = undefined;
                responseHeadersString = headers || "";
                jqXHR.readyState = status > 0 ? 4 : 0;
                isSuccess = status >= 200 && status < 300 || status === 304;
                if (responses) response = ajaxHandleResponses(s, jqXHR, responses);
                response = ajaxConvert(s, response, jqXHR, isSuccess);
                if (isSuccess) {
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) jQuery.lastModified[cacheURL] = modified;
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) jQuery.etag[cacheURL] = modified;
                    }
                    if (status === 204 || s.type === "HEAD") statusText = "nocontent";
                    else if (status === 304) statusText = "notmodified";
                    else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) status = 0;
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";
                if (isSuccess) deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                else deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                    if (!(--jQuery.active)) jQuery.event.trigger("ajaxStop");
                }
            }
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        }
    });
    jQuery.each(["get", "post"], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });

    function ajaxHandleResponses(s, jqXHR, responses) {
        var firstDataType, ct, finalDataType, type, contents = s.contents,
            dataTypes = s.dataTypes;
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
        }
        if (ct)
            for (type in contents)
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
        if (dataTypes[0] in responses) finalDataType = dataTypes[0];
        else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) firstDataType = type;
            }
            finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) dataTypes.unshift(finalDataType);
            return responses[finalDataType];
        }
    }

    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {},
            dataTypes = s.dataTypes.slice();
        if (dataTypes[1])
            for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
        current = dataTypes.shift();
        while (current) {
            if (s.responseFields[current]) jqXHR[s.responseFields[current]] = response;
            if (!prev && isSuccess && s.dataFilter) response = s.dataFilter(response, s.dataType);
            prev = current;
            current = dataTypes.shift();
            if (current)
                if (current === "*") current = prev;
                else if (prev !== "*" && prev !== current) {
                conv = converters[prev + " " + current] || converters["* " + current];
                if (!conv)
                    for (conv2 in converters) {
                        tmp = conv2.split(" ");
                        if (tmp[1] === current) {
                            conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                            if (conv) {
                                if (conv === true) conv = converters[conv2];
                                else if (converters[conv2] !== true) {
                                    current = tmp[0];
                                    dataTypes.unshift(tmp[1]);
                                }
                                break;
                            }
                        }
                    }
                if (conv !== true)
                    if (conv && s.throws) response = conv(response);
                    else try {
                        response = conv(response);
                    } catch (e) {
                        return {
                            state: "parsererror",
                            error: conv ? e : "No conversion from " + prev + " to " + current
                        };
                    }
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });
    jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === undefined) s.cache = false;
        if (s.crossDomain) {
            s.type = "GET";
            s.global = false;
        }
    });
    jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, head = document.head || jQuery("head")[0] || document.documentElement;
            return {
                send: function(_, callback) {
                    script = document.createElement("script");
                    script.async = true;
                    if (s.scriptCharset) script.charset = s.scriptCharset;
                    script.src = s.url;
                    script.onload = script.onreadystatechange = function(_, isAbort) {
                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                            script.onload = script.onreadystatechange = null;
                            if (script.parentNode) script.parentNode.removeChild(script);
                            script = null;
                            if (!isAbort) callback(200, "success");
                        }
                    };
                    head.insertBefore(script, head.firstChild);
                },
                abort: function() {
                    if (script) script.onload(undefined, true);
                }
            };
        }
    });
    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (ajax_nonce++));
            this[callback] = true;
            return callback;
        }
    });
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        if (jsonProp || s.dataTypes[0] === "jsonp") {
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            if (jsonProp) s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            else if (s.jsonp !== false) s.url += (ajax_rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            s.converters["script json"] = function() {
                if (!responseContainer) jQuery.error(callbackName + " was not called");
                return responseContainer[0];
            };
            s.dataTypes[0] = "json";
            overwritten = window[callbackName];
            window[callbackName] = function() {
                responseContainer = arguments;
            };
            jqXHR.always(function() {
                window[callbackName] = overwritten;
                if (s[callbackName]) {
                    s.jsonpCallback = originalSettings.jsonpCallback;
                    oldCallbacks.push(callbackName);
                }
                if (responseContainer && jQuery.isFunction(overwritten)) overwritten(responseContainer[0]);
                responseContainer = overwritten = undefined;
            });
            return "script";
        }
    });
    var xhrCallbacks, xhrSupported, xhrId = 0,
        xhrOnUnloadAbort = window.ActiveXObject && function() {
            var key;
            for (key in xhrCallbacks) xhrCallbacks[key](undefined, true);
        };

    function createStandardXHR() {
        try {
            return new window.XMLHttpsRequest();
        } catch (e) {}
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTPs");
        } catch (e) {}
    }
    jQuery.ajaxSettings.xhr = window.ActiveXObject ? function() {
        return !this.isLocal && createStandardXHR() || createActiveXHR();
    } : createStandardXHR;
    xhrSupported = jQuery.ajaxSettings.xhr();
    jQuery.support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
    xhrSupported = jQuery.support.ajax = !!xhrSupported;
    if (xhrSupported) jQuery.ajaxTransport(function(s) {
        if (!s.crossDomain || jQuery.support.cors) {
            var callback;
            return {
                send: function(headers, complete) {
                    var handle, i, xhr = s.xhr();
                    if (s.username) xhr.open(s.type, s.url, s.async, s.username, s.password);
                    else xhr.open(s.type, s.url, s.async);
                    if (s.xhrFields)
                        for (i in s.xhrFields) xhr[i] = s.xhrFields[i];
                    if (s.mimeType && xhr.overrideMimeType) xhr.overrideMimeType(s.mimeType);
                    if (!s.crossDomain && !headers["X-Requested-With"]) headers["X-Requested-With"] = "XMLHttpsRequest";
                    try {
                        for (i in headers) xhr.setRequestHeader(i, headers[i]);
                    } catch (err) {}
                    xhr.send((s.hasContent && s.data) || null);
                    callback = function(_, isAbort) {
                        var status, responseHeaders, statusText, responses;
                        try {
                            if (callback && (isAbort || xhr.readyState === 4)) {
                                callback = undefined;
                                if (handle) {
                                    xhr.onreadystatechange = jQuery.noop;
                                    if (xhrOnUnloadAbort) delete xhrCallbacks[handle];
                                }
                                if (isAbort) {
                                    if (xhr.readyState !== 4) xhr.abort();
                                } else {
                                    responses = {};
                                    status = xhr.status;
                                    responseHeaders = xhr.getAllResponseHeaders();
                                    if (typeof xhr.responseText === "string") responses.text = xhr.responseText;
                                    try {
                                        statusText = xhr.statusText;
                                    } catch (e) {
                                        statusText = "";
                                    }
                                    if (!status && s.isLocal && !s.crossDomain) status = responses.text ? 200 : 404;
                                    else if (status === 1223) status = 204;
                                }
                            }
                        } catch (firefoxAccessException) {
                            if (!isAbort) complete(-1, firefoxAccessException);
                        }
                        if (responses) complete(status, statusText, responses, responseHeaders);
                    };
                    if (!s.async) callback();
                    else if (xhr.readyState === 4) setTimeout(callback);
                    else {
                        handle = ++xhrId;
                        if (xhrOnUnloadAbort) {
                            if (!xhrCallbacks) {
                                xhrCallbacks = {};
                                jQuery(window).unload(xhrOnUnloadAbort);
                            }
                            xhrCallbacks[handle] = callback;
                        }
                        xhr.onreadystatechange = callback;
                    }
                },
                abort: function() {
                    if (callback) callback(undefined, true);
                }
            };
        }
    });
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i"),
        rrun = /queueHooks$/,
        animationPrefilters = [defaultPrefilter],
        tweeners = {
            "*": [function(prop, value) {
                var tween = this.createTween(prop, value),
                    target = tween.cur(),
                    parts = rfxnum.exec(value),
                    unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
                    start = (jQuery.cssNumber[prop] || unit !== "px" && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)),
                    scale = 1,
                    maxIterations = 20;
                if (start && start[3] !== unit) {
                    unit = unit || start[3];
                    parts = parts || [];
                    start = +target || 1;
                    do {
                        scale = scale || ".5";
                        start = start / scale;
                        jQuery.style(tween.elem, prop, start + unit);
                    } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
                }
                if (parts) {
                    start = tween.start = +start || +target || 0;
                    tween.unit = unit;
                    tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2];
                }
                return tween;
            }]
        };

    function createFxNow() {
        setTimeout(function() {
            fxNow = undefined;
        });
        return (fxNow = jQuery.now());
    }

    function createTween(value, prop, animation) {
        var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]),
            index = 0,
            length = collection.length;
        for (; index < length; index++)
            if ((tween = collection[index].call(animation, prop, value))) return tween;
    }

    function Animation(elem, properties, options) {
        var result, stopped, index = 0,
            length = animationPrefilters.length,
            deferred = jQuery.Deferred().always(function() {
                delete tick.elem;
            }),
            tick = function() {
                if (stopped) return false;
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
                    temp = remaining / animation.duration || 0,
                    percent = 1 - temp,
                    index = 0,
                    length = animation.tweens.length;
                for (; index < length; index++) animation.tweens[index].run(percent);
                deferred.notifyWith(elem, [animation, percent, remaining]);
                if (percent < 1 && length) return remaining;
                else {
                    deferred.resolveWith(elem, [animation]);
                    return false;
                }
            },
            animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(true, {
                    specialEasing: {}
                }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function(prop, end) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween;
                },
                stop: function(gotoEnd) {
                    var index = 0,
                        length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) return this;
                    stopped = true;
                    for (; index < length; index++) animation.tweens[index].run(1);
                    if (gotoEnd) deferred.resolveWith(elem, [animation, gotoEnd]);
                    else deferred.rejectWith(elem, [animation, gotoEnd]);
                    return this;
                }
            }),
            props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (; index < length; index++) {
            result = animationPrefilters[index].call(animation, elem, props, animation.opts);
            if (result) return result;
        }
        jQuery.map(props, createTween, animation);
        if (jQuery.isFunction(animation.opts.start)) animation.opts.start.call(elem, animation);
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        }));
        return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }

    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (jQuery.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
            }
            if (index !== name) {
                props[name] = value;
                delete props[index];
            }
            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];
                for (index in value)
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing;
                    }
            } else specialEasing[name] = easing;
        }
    }
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = ["*"];
            } else props = props.split(" ");
            var prop, index = 0,
                length = props.length;
            for (; index < length; index++) {
                prop = props[index];
                tweeners[prop] = tweeners[prop] || [];
                tweeners[prop].unshift(callback);
            }
        },
        prefilter: function(callback, prepend) {
            if (prepend) animationPrefilters.unshift(callback);
            else animationPrefilters.push(callback);
        }
    });

    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, anim = this,
            orig = {},
            style = elem.style,
            hidden = elem.nodeType && isHidden(elem),
            dataShow = jQuery._data(elem, "fxshow");
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if (!hooks.unqueued) oldfire();
                };
            }
            hooks.unqueued++;
            anim.always(function() {
                anim.always(function() {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) hooks.empty.fire();
                });
            });
        }
        if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];
            if (jQuery.css(elem, "display") === "inline" && jQuery.css(elem, "float") === "none")
                if (!jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay(elem.nodeName) === "inline") style.display = "inline-block";
                else style.zoom = 1;
        }
        if (opts.overflow) {
            style.overflow = "hidden";
            if (!jQuery.support.shrinkWrapBlocks) anim.always(function() {
                style.overflow = opts.overflow[0];
                style.overflowX = opts.overflow[1];
                style.overflowY = opts.overflow[2];
            });
        }
        for (prop in props) {
            value = props[prop];
            if (rfxtypes.exec(value)) {
                delete props[prop];
                toggle = toggle || value === "toggle";
                if (value === (hidden ? "hide" : "show")) continue;
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
            }
        }
        if (!jQuery.isEmptyObject(orig)) {
            if (dataShow) {
                if ("hidden" in dataShow) hidden = dataShow.hidden;
            } else dataShow = jQuery._data(elem, "fxshow", {});
            if (toggle) dataShow.hidden = !hidden;
            if (hidden) jQuery(elem).show();
            else anim.done(function() {
                jQuery(elem).hide();
            });
            anim.done(function() {
                var prop;
                jQuery._removeData(elem, "fxshow");
                for (prop in orig) jQuery.style(elem, prop, orig[prop]);
            });
            for (prop in orig) {
                tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                if (!(prop in dataShow)) {
                    dataShow[prop] = tween.start;
                    if (hidden) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0;
                    }
                }
            }
        }
    }

    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    jQuery.Tween = Tween;
    Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
            else this.pos = eased = percent;
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) this.options.step.call(this.elem, this.now, this);
            if (hooks && hooks.set) hooks.set(this);
            else Tween.propHooks._default.set(this);
            return this;
        }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) return tween.elem[tween.prop];
                result = jQuery.css(tween.elem, tween.prop, "");
                return !result || result === "auto" ? 0 : result;
            },
            set: function(tween) {
                if (jQuery.fx.step[tween.prop]) jQuery.fx.step[tween.prop](tween);
                else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                else tween.elem[tween.prop] = tween.now;
            }
        }
    };
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) tween.elem[tween.prop] = tween.now;
        }
    };
    jQuery.each(["toggle", "show", "hide"], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
        };
    });
    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop),
                optall = jQuery.speed(speed, easing, callback),
                doAnimation = function() {
                    var anim = Animation(this, jQuery.extend({}, prop), optall);
                    if (empty || jQuery._data(this, "finish")) anim.stop(true);
                };
            doAnimation.finish = doAnimation;
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
            };
            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue && type !== false) this.queue(type || "fx", []);
            return this.each(function() {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = jQuery._data(this);
                if (index) {
                    if (data[index] && data[index].stop) stopQueue(data[index]);
                } else
                    for (index in data)
                        if (data[index] && data[index].stop && rrun.test(index)) stopQueue(data[index]); for (index = timers.length; index--;)
                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1);
                    }
                if (dequeue || !gotoEnd) jQuery.dequeue(this, type);
            });
        },
        finish: function(type) {
            if (type !== false) type = type || "fx";
            return this.each(function() {
                var index, data = jQuery._data(this),
                    queue = data[type + "queue"],
                    hooks = data[type + "queueHooks"],
                    timers = jQuery.timers,
                    length = queue ? queue.length : 0;
                data.finish = true;
                jQuery.queue(this, type, []);
                if (hooks && hooks.stop) hooks.stop.call(this, true);
                for (index = timers.length; index--;)
                    if (timers[index].elem === this && timers[index].queue === type) {
                        timers[index].anim.stop(true);
                        timers.splice(index, 1);
                    }
                for (index = 0; index < length; index++)
                    if (queue[index] && queue[index].finish) queue[index].finish.call(this);
                delete data.finish;
            });
        }
    });

    function genFx(type, includeWidth) {
        var which, attrs = {
                height: type
            },
            i = 0;
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
        }
        if (includeWidth) attrs.opacity = attrs.width = type;
        return attrs;
    }
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });
    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
        if (opt.queue == null || opt.queue === true) opt.queue = "fx";
        opt.old = opt.complete;
        opt.complete = function() {
            if (jQuery.isFunction(opt.old)) opt.old.call(this);
            if (opt.queue) jQuery.dequeue(this, opt.queue);
        };
        return opt;
    };
    jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        }
    };
    jQuery.timers = [];
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.tick = function() {
        var timer, timers = jQuery.timers,
            i = 0;
        fxNow = jQuery.now();
        for (; i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) timers.splice(i--, 1);
        }
        if (!timers.length) jQuery.fx.stop();
        fxNow = undefined;
    };
    jQuery.fx.timer = function(timer) {
        if (timer() && jQuery.timers.push(timer)) jQuery.fx.start();
    };
    jQuery.fx.interval = 13;
    jQuery.fx.start = function() {
        if (!timerId) timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
    };
    jQuery.fx.stop = function() {
        clearInterval(timerId);
        timerId = null;
    };
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    jQuery.fx.step = {};
    if (jQuery.expr && jQuery.expr.filters) jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    };
    jQuery.fn.offset = function(options) {
        if (arguments.length) return options === undefined ? this : this.each(function(i) {
            jQuery.offset.setOffset(this, options, i);
        });
        var docElem, win, box = {
                top: 0,
                left: 0
            },
            elem = this[0],
            doc = elem && elem.ownerDocument;
        if (!doc) return;
        docElem = doc.documentElement;
        if (!jQuery.contains(docElem, elem)) return box;
        if (typeof elem.getBoundingClientRect !== core_strundefined) box = elem.getBoundingClientRect();
        win = getWindow(doc);
        return {
            top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
            left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
        };
    };
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var position = jQuery.css(elem, "position");
            if (position === "static") elem.style.position = "relative";
            var curElem = jQuery(elem),
                curOffset = curElem.offset(),
                curCSSTop = jQuery.css(elem, "top"),
                curCSSLeft = jQuery.css(elem, "left"),
                calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
                props = {},
                curPosition = {},
                curTop, curLeft;
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }
            if (jQuery.isFunction(options)) options = options.call(elem, i, curOffset);
            if (options.top != null) props.top = (options.top - curOffset.top) + curTop;
            if (options.left != null) props.left = (options.left - curOffset.left) + curLeft;
            if ("using" in options) options.using.call(elem, props);
            else curElem.css(props);
        }
    };
    jQuery.fn.extend({
        position: function() {
            if (!this[0]) return;
            var offsetParent, offset, parentOffset = {
                    top: 0,
                    left: 0
                },
                elem = this[0];
            if (jQuery.css(elem, "position") === "fixed") offset = elem.getBoundingClientRect();
            else {
                offsetParent = this.offsetParent();
                offset = this.offset();
                if (!jQuery.nodeName(offsetParent[0], "html")) parentOffset = offsetParent.offset();
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
                parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
            }
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            };
        },
        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent || docElem;
                while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) offsetParent = offsetParent.offsetParent;
                return offsetParent || docElem;
            });
        }
    });
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return jQuery.access(this, function(elem, method, val) {
                var win = getWindow(elem);
                if (val === undefined) return win ? (prop in win) ? win[prop] : win.document.documentElement[method] : elem[method];
                if (win) win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop());
                else elem[method] = val;
            }, method, val, arguments.length, null);
        };
    });

    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
    }
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
                    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                return jQuery.access(this, function(elem, type, value) {
                    var doc;
                    if (jQuery.isWindow(elem)) return elem.document.documentElement["client" + name];
                    if (elem.nodeType === 9) {
                        doc = elem.documentElement;
                        return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
                    }
                    return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : undefined, chainable, null);
            };
        });
    });
    jQuery.fn.size = function() {
        return this.length;
    };
    jQuery.fn.andSelf = jQuery.fn.addBack;
    if (typeof module === "object" && module && typeof module.exports === "object") module.exports = jQuery;
    else {
        window.jQuery = window.$ = jQuery;
        if (typeof define === "function" && define.amd) define("jquery", [], function() {
            return jQuery;
        });
    }
})(window);
(function() {
    var root = this;
    var previousUnderscore = root._;
    var breaker = {};
    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        FuncProto = Function.prototype;
    var push = ArrayProto.push,
        slice = ArrayProto.slice,
        concat = ArrayProto.concat,
        unshift = ArrayProto.unshift,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;
    var nativeForEach = ArrayProto.forEach,
        nativeMap = ArrayProto.map,
        nativeReduce = ArrayProto.reduce,
        nativeReduceRight = ArrayProto.reduceRight,
        nativeFilter = ArrayProto.filter,
        nativeEvery = ArrayProto.every,
        nativeSome = ArrayProto.some,
        nativeIndexOf = ArrayProto.indexOf,
        nativeLastIndexOf = ArrayProto.lastIndexOf,
        nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeBind = FuncProto.bind;
    var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) exports = module.exports = _;
        exports._ = _;
    } else root._ = _;
    _.VERSION = '1.4.2';
    var each = _.each = _.forEach = function(obj, iterator, context) {
        if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) obj.forEach(iterator, context);
        else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++)
                if (iterator.call(context, obj[i], i, obj) === breaker) return;
        } else
            for (var key in obj)
                if (_.has(obj, key))
                    if (iterator.call(context, obj[key], key, obj) === breaker) return;
    };
    _.map = _.collect = function(obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
        each(obj, function(value, index, list) {
            results[results.length] = iterator.call(context, value, index, list);
        });
        return results;
    };
    _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (obj == null) obj = [];
        if (nativeReduce && obj.reduce === nativeReduce) {
            if (context) iterator = _.bind(iterator, context);
            return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
        }
        each(obj, function(value, index, list) {
            if (!initial) {
                memo = value;
                initial = true;
            } else memo = iterator.call(context, memo, value, index, list);
        });
        if (!initial) throw new TypeError('Reduce of empty array with no initial value');
        return memo;
    };
    _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (obj == null) obj = [];
        if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
            if (context) iterator = _.bind(iterator, context);
            return arguments.length > 2 ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
        }
        var length = obj.length;
        if (length !== +length) {
            var keys = _.keys(obj);
            length = keys.length;
        }
        each(obj, function(value, index, list) {
            index = keys ? keys[--length] : --length;
            if (!initial) {
                memo = obj[index];
                initial = true;
            } else memo = iterator.call(context, memo, obj[index], index, list);
        });
        if (!initial) throw new TypeError('Reduce of empty array with no initial value');
        return memo;
    };
    _.find = _.detect = function(obj, iterator, context) {
        var result;
        any(obj, function(value, index, list) {
            if (iterator.call(context, value, index, list)) {
                result = value;
                return true;
            }
        });
        return result;
    };
    _.filter = _.select = function(obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
        each(obj, function(value, index, list) {
            if (iterator.call(context, value, index, list)) results[results.length] = value;
        });
        return results;
    };
    _.reject = function(obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        each(obj, function(value, index, list) {
            if (!iterator.call(context, value, index, list)) results[results.length] = value;
        });
        return results;
    };
    _.every = _.all = function(obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = true;
        if (obj == null) return result;
        if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
        each(obj, function(value, index, list) {
            if (!(result = result && iterator.call(context, value, index, list))) return breaker;
        });
        return !!result;
    };
    var any = _.some = _.any = function(obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = false;
        if (obj == null) return result;
        if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
        each(obj, function(value, index, list) {
            if (result || (result = iterator.call(context, value, index, list))) return breaker;
        });
        return !!result;
    };
    _.contains = _.include = function(obj, target) {
        var found = false;
        if (obj == null) return found;
        if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
        found = any(obj, function(value) {
            return value === target;
        });
        return found;
    };
    _.invoke = function(obj, method) {
        var args = slice.call(arguments, 2);
        return _.map(obj, function(value) {
            return (_.isFunction(method) ? method : value[method]).apply(value, args);
        });
    };
    _.pluck = function(obj, key) {
        return _.map(obj, function(value) {
            return value[key];
        });
    };
    _.where = function(obj, attrs) {
        if (_.isEmpty(attrs)) return [];
        return _.filter(obj, function(value) {
            for (var key in attrs)
                if (attrs[key] !== value[key]) return false;
            return true;
        });
    };
    _.max = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) return Math.max.apply(Math, obj);
        if (!iterator && _.isEmpty(obj)) return -Infinity;
        var result = {
            computed: -Infinity
        };
        each(obj, function(value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            computed >= result.computed && (result = {
                value: value,
                computed: computed
            });
        });
        return result.value;
    };
    _.min = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) return Math.min.apply(Math, obj);
        if (!iterator && _.isEmpty(obj)) return Infinity;
        var result = {
            computed: Infinity
        };
        each(obj, function(value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            computed < result.computed && (result = {
                value: value,
                computed: computed
            });
        });
        return result.value;
    };
    _.shuffle = function(obj) {
        var rand;
        var index = 0;
        var shuffled = [];
        each(obj, function(value) {
            rand = _.random(index++);
            shuffled[index - 1] = shuffled[rand];
            shuffled[rand] = value;
        });
        return shuffled;
    };
    var lookupIterator = function(value) {
        return _.isFunction(value) ? value : function(obj) {
            return obj[value];
        };
    };
    _.sortBy = function(obj, value, context) {
        var iterator = lookupIterator(value);
        return _.pluck(_.map(obj, function(value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iterator.call(context, value, index, list)
            };
        }).sort(function(left, right) {
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
                if (a > b || a === void 0) return 1;
                if (a < b || b === void 0) return -1;
            }
            return left.index < right.index ? -1 : 1;
        }), 'value');
    };
    var group = function(obj, value, context, behavior) {
        var result = {};
        var iterator = lookupIterator(value);
        each(obj, function(value, index) {
            var key = iterator.call(context, value, index, obj);
            behavior(result, key, value);
        });
        return result;
    };
    _.groupBy = function(obj, value, context) {
        return group(obj, value, context, function(result, key, value) {
            (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
        });
    };
    _.countBy = function(obj, value, context) {
        return group(obj, value, context, function(result, key, value) {
            if (!_.has(result, key)) result[key] = 0;
            result[key]++;
        });
    };
    _.sortedIndex = function(array, obj, iterator, context) {
        iterator = iterator == null ? _.identity : lookupIterator(iterator);
        var value = iterator.call(context, obj);
        var low = 0,
            high = array.length;
        while (low < high) {
            var mid = (low + high) >>> 1;
            iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
        }
        return low;
    };
    _.toArray = function(obj) {
        if (!obj) return [];
        if (obj.length === +obj.length) return slice.call(obj);
        return _.values(obj);
    };
    _.size = function(obj) {
        return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
    };
    _.first = _.head = _.take = function(array, n, guard) {
        return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
    };
    _.initial = function(array, n, guard) {
        return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
    };
    _.last = function(array, n, guard) {
        if ((n != null) && !guard) return slice.call(array, Math.max(array.length - n, 0));
        else return array[array.length - 1];
    };
    _.rest = _.tail = _.drop = function(array, n, guard) {
        return slice.call(array, (n == null) || guard ? 1 : n);
    };
    _.compact = function(array) {
        return _.filter(array, function(value) {
            return !!value;
        });
    };
    var flatten = function(input, shallow, output) {
        each(input, function(value) {
            if (_.isArray(value)) shallow ? push.apply(output, value) : flatten(value, shallow, output);
            else output.push(value);
        });
        return output;
    };
    _.flatten = function(array, shallow) {
        return flatten(array, shallow, []);
    };
    _.without = function(array) {
        return _.difference(array, slice.call(arguments, 1));
    };
    _.uniq = _.unique = function(array, isSorted, iterator, context) {
        var initial = iterator ? _.map(array, iterator, context) : array;
        var results = [];
        var seen = [];
        each(initial, function(value, index) {
            if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
                seen.push(value);
                results.push(array[index]);
            }
        });
        return results;
    };
    _.union = function() {
        return _.uniq(concat.apply(ArrayProto, arguments));
    };
    _.intersection = function(array) {
        var rest = slice.call(arguments, 1);
        return _.filter(_.uniq(array), function(item) {
            return _.every(rest, function(other) {
                return _.indexOf(other, item) >= 0;
            });
        });
    };
    _.difference = function(array) {
        var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
        return _.filter(array, function(value) {
            return !_.contains(rest, value);
        });
    };
    _.zip = function() {
        var args = slice.call(arguments);
        var length = _.max(_.pluck(args, 'length'));
        var results = new Array(length);
        for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
        return results;
    };
    _.object = function(list, values) {
        var result = {};
        for (var i = 0, l = list.length; i < l; i++)
            if (values) result[list[i]] = values[i];
            else result[list[i][0]] = list[i][1];
        return result;
    };
    _.indexOf = function(array, item, isSorted) {
        if (array == null) return -1;
        var i = 0,
            l = array.length;
        if (isSorted)
            if (typeof isSorted == 'number') i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
            else {
                i = _.sortedIndex(array, item);
                return array[i] === item ? i : -1;
            }
        if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
        for (; i < l; i++)
            if (array[i] === item) return i;
        return -1;
    };
    _.lastIndexOf = function(array, item, from) {
        if (array == null) return -1;
        var hasIndex = from != null;
        if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
        var i = (hasIndex ? from : array.length);
        while (i--)
            if (array[i] === item) return i;
        return -1;
    };
    _.range = function(start, stop, step) {
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
        }
        step = arguments[2] || 1;
        var len = Math.max(Math.ceil((stop - start) / step), 0);
        var idx = 0;
        var range = new Array(len);
        while (idx < len) {
            range[idx++] = start;
            start += step;
        }
        return range;
    };
    var ctor = function() {};
    _.bind = function bind(func, context) {
        var bound, args;
        if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
        if (!_.isFunction(func)) throw new TypeError();
        args = slice.call(arguments, 2);
        return bound = function() {
            if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
            ctor.prototype = func.prototype;
            var self = new ctor();
            var result = func.apply(self, args.concat(slice.call(arguments)));
            if (Object(result) === result) return result;
            return self;
        };
    };
    _.bindAll = function(obj) {
        var funcs = slice.call(arguments, 1);
        if (funcs.length == 0) funcs = _.functions(obj);
        each(funcs, function(f) {
            obj[f] = _.bind(obj[f], obj);
        });
        return obj;
    };
    _.memoize = function(func, hasher) {
        var memo = {};
        hasher || (hasher = _.identity);
        return function() {
            var key = hasher.apply(this, arguments);
            return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
        };
    };
    _.delay = function(func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function() {
            return func.apply(null, args);
        }, wait);
    };
    _.defer = function(func) {
        return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
    };
    _.throttle = function(func, wait) {
        var context, args, timeout, throttling, more, result;
        var whenDone = _.debounce(function() {
            more = throttling = false;
        }, wait);
        return function() {
            context = this;
            args = arguments;
            var later = function() {
                timeout = null;
                if (more) result = func.apply(context, args);
                whenDone();
            };
            if (!timeout) timeout = setTimeout(later, wait);
            if (throttling) more = true;
            else {
                throttling = true;
                result = func.apply(context, args);
            }
            whenDone();
            return result;
        };
    };
    _.debounce = function(func, wait, immediate) {
        var timeout, result;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) result = func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) result = func.apply(context, args);
            return result;
        };
    };
    _.once = function(func) {
        var ran = false,
            memo;
        return function() {
            if (ran) return memo;
            ran = true;
            memo = func.apply(this, arguments);
            func = null;
            return memo;
        };
    };
    _.wrap = function(func, wrapper) {
        return function() {
            var args = [func];
            push.apply(args, arguments);
            return wrapper.apply(this, args);
        };
    };
    _.compose = function() {
        var funcs = arguments;
        return function() {
            var args = arguments;
            for (var i = funcs.length - 1; i >= 0; i--) args = [funcs[i].apply(this, args)];
            return args[0];
        };
    };
    _.after = function(times, func) {
        if (times <= 0) return func();
        return function() {
            if (--times < 1) return func.apply(this, arguments);
        };
    };
    _.keys = nativeKeys || function(obj) {
        if (obj !== Object(obj)) throw new TypeError('Invalid object');
        var keys = [];
        for (var key in obj)
            if (_.has(obj, key)) keys[keys.length] = key;
        return keys;
    };
    _.values = function(obj) {
        var values = [];
        for (var key in obj)
            if (_.has(obj, key)) values.push(obj[key]);
        return values;
    };
    _.pairs = function(obj) {
        var pairs = [];
        for (var key in obj)
            if (_.has(obj, key)) pairs.push([key, obj[key]]);
        return pairs;
    };
    _.invert = function(obj) {
        var result = {};
        for (var key in obj)
            if (_.has(obj, key)) result[obj[key]] = key;
        return result;
    };
    _.functions = _.methods = function(obj) {
        var names = [];
        for (var key in obj)
            if (_.isFunction(obj[key])) names.push(key);
        return names.sort();
    };
    _.extend = function(obj) {
        each(slice.call(arguments, 1), function(source) {
            for (var prop in source) obj[prop] = source[prop];
        });
        return obj;
    };
    _.pick = function(obj) {
        var copy = {};
        var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        each(keys, function(key) {
            if (key in obj) copy[key] = obj[key];
        });
        return copy;
    };
    _.omit = function(obj) {
        var copy = {};
        var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        for (var key in obj)
            if (!_.contains(keys, key)) copy[key] = obj[key];
        return copy;
    };
    _.defaults = function(obj) {
        each(slice.call(arguments, 1), function(source) {
            for (var prop in source)
                if (obj[prop] == null) obj[prop] = source[prop];
        });
        return obj;
    };
    _.clone = function(obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };
    _.tap = function(obj, interceptor) {
        interceptor(obj);
        return obj;
    };
    var eq = function(a, b, aStack, bStack) {
        if (a === b) return a !== 0 || 1 / a == 1 / b;
        if (a == null || b == null) return a === b;
        if (a instanceof _) a = a._wrapped;
        if (b instanceof _) b = b._wrapped;
        var className = toString.call(a);
        if (className != toString.call(b)) return false;
        switch (className) {
            case '[object String]':
                return a == String(b);
            case '[object Number]':
                return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
            case '[object Date]':
            case '[object Boolean]':
                return +a == +b;
            case '[object RegExp]':
                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
        }
        if (typeof a != 'object' || typeof b != 'object') return false;
        var length = aStack.length;
        while (length--)
            if (aStack[length] == a) return bStack[length] == b;
        aStack.push(a);
        bStack.push(b);
        var size = 0,
            result = true;
        if (className == '[object Array]') {
            size = a.length;
            result = size == b.length;
            if (result)
                while (size--)
                    if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        } else {
            var aCtor = a.constructor,
                bCtor = b.constructor;
            if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) && _.isFunction(bCtor) && (bCtor instanceof bCtor))) return false;
            for (var key in a)
                if (_.has(a, key)) {
                    size++;
                    if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
                }
            if (result) {
                for (key in b)
                    if (_.has(b, key) && !(size--)) break;
                result = !size;
            }
        }
        aStack.pop();
        bStack.pop();
        return result;
    };
    _.isEqual = function(a, b) {
        return eq(a, b, [], []);
    };
    _.isEmpty = function(obj) {
        if (obj == null) return true;
        if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
        for (var key in obj)
            if (_.has(obj, key)) return false;
        return true;
    };
    _.isElement = function(obj) {
        return !!(obj && obj.nodeType === 1);
    };
    _.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) == '[object Array]';
    };
    _.isObject = function(obj) {
        return obj === Object(obj);
    };
    each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
        _['is' + name] = function(obj) {
            return toString.call(obj) == '[object ' + name + ']';
        };
    });
    if (!_.isArguments(arguments)) _.isArguments = function(obj) {
        return !!(obj && _.has(obj, 'callee'));
    };
    if (typeof(/./) !== 'function') _.isFunction = function(obj) {
        return typeof obj === 'function';
    };
    _.isFinite = function(obj) {
        return _.isNumber(obj) && isFinite(obj);
    };
    _.isNaN = function(obj) {
        return _.isNumber(obj) && obj != +obj;
    };
    _.isBoolean = function(obj) {
        return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
    };
    _.isNull = function(obj) {
        return obj === null;
    };
    _.isUndefined = function(obj) {
        return obj === void 0;
    };
    _.has = function(obj, key) {
        return hasOwnProperty.call(obj, key);
    };
    _.noConflict = function() {
        root._ = previousUnderscore;
        return this;
    };
    _.identity = function(value) {
        return value;
    };
    _.times = function(n, iterator, context) {
        for (var i = 0; i < n; i++) iterator.call(context, i);
    };
    _.random = function(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + (0 | Math.random() * (max - min + 1));
    };
    var entityMap = {
        escape: {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;'
        }
    };
    entityMap.unescape = _.invert(entityMap.escape);
    var entityRegexes = {
        escape: new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
        unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
    };
    _.each(['escape', 'unescape'], function(method) {
        _[method] = function(string) {
            if (string == null) return '';
            return ('' + string).replace(entityRegexes[method], function(match) {
                return entityMap[method][match];
            });
        };
    });
    _.result = function(object, property) {
        if (object == null) return null;
        var value = object[property];
        return _.isFunction(value) ? value.call(object) : value;
    };
    _.mixin = function(obj) {
        each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
                var args = [this._wrapped];
                push.apply(args, arguments);
                return result.call(this, func.apply(_, args));
            };
        });
    };
    var idCounter = 0;
    _.uniqueId = function(prefix) {
        var id = idCounter++;
        return prefix ? prefix + id : id;
    };
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var noMatch = /(.)^/;
    var escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\t': 't',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };
    var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    _.template = function(text, data, settings) {
        settings = _.defaults({}, settings, _.templateSettings);
        var matcher = new RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g');
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset).replace(escaper, function(match) {
                return '\\' + escapes[match];
            });
            source += escape ? "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'" : interpolate ? "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'" : evaluate ? "';\n" + evaluate + "\n__p+='" : '';
            index = offset + match.length;
        });
        source += "';\n";
        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
        source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
        try {
            var render = new Function(settings.variable || 'obj', '_', source);
        } catch (e) {
            e.source = source;
            throw e;
        }
        if (data) return render(data, _);
        var template = function(data) {
            return render.call(this, data, _);
        };
        template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';
        return template;
    };
    _.chain = function(obj) {
        return _(obj).chain();
    };
    var result = function(obj) {
        return this._chain ? _(obj).chain() : obj;
    };
    _.mixin(_);
    each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            var obj = this._wrapped;
            method.apply(obj, arguments);
            if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
            return result.call(this, obj);
        };
    });
    each(['concat', 'join', 'slice'], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            return result.call(this, method.apply(this._wrapped, arguments));
        };
    });
    _.extend(_.prototype, {
        chain: function() {
            this._chain = true;
            return this;
        },
        value: function() {
            return this._wrapped;
        }
    });
}).call(this);
if (typeof jQuery === "undefined") throw new Error("Bootstrap requires jQuery"); + function($) {
    "use strict";

    function transitionEnd() {
        var el = document.createElement('bootstrap');
        var transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd otransitionend',
            'transition': 'transitionend'
        };
        for (var name in transEndEventNames)
            if (el.style[name] !== undefined) return {
                end: transEndEventNames[name]
            };
    }
    $.fn.emulateTransitionEnd = function(duration) {
        var called = false,
            $el = this;
        $(this).one($.support.transition.end, function() {
            called = true;
        });
        var callback = function() {
            if (!called) $($el).trigger($.support.transition.end);
        };
        setTimeout(callback, duration);
        return this;
    };
    $(function() {
        $.support.transition = transitionEnd();
    });
}(jQuery); + function($) {
    "use strict";
    var dismiss = '[data-dismiss="alert"]';
    var Alert = function(el) {
        $(el).on('click', dismiss, this.close);
    };
    Alert.prototype.close = function(e) {
        var $this = $(this);
        var selector = $this.attr('data-target');
        if (!selector) {
            selector = $this.attr('href');
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
        }
        var $parent = $(selector);
        if (e) e.preventDefault();
        if (!$parent.length) $parent = $this.hasClass('alert') ? $this : $this.parent();
        $parent.trigger(e = $.Event('close.bs.alert'));
        if (e.isDefaultPrevented()) return;
        $parent.removeClass('in');

        function removeElement() {
            $parent.trigger('closed.bs.alert').remove();
        }
        $.support.transition && $parent.hasClass('fade') ? $parent.one($.support.transition.end, removeElement).emulateTransitionEnd(150) : removeElement();
    };
    var old = $.fn.alert;
    $.fn.alert = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.alert');
            if (!data) $this.data('bs.alert', (data = new Alert(this)));
            if (typeof option == 'string') data[option].call($this);
        });
    };
    $.fn.alert.Constructor = Alert;
    $.fn.alert.noConflict = function() {
        $.fn.alert = old;
        return this;
    };
    $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close);
}(jQuery); + function($) {
    "use strict";
    var Button = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Button.DEFAULTS, options);
    };
    Button.DEFAULTS = {
        loadingText: 'loading...'
    };
    Button.prototype.setState = function(state) {
        var d = 'disabled';
        var $el = this.$element;
        var val = $el.is('input') ? 'val' : 'html';
        var data = $el.data();
        state = state + 'Text';
        if (!data.resetText) $el.data('resetText', $el[val]());
        $el[val](data[state] || this.options[state]);
        setTimeout(function() {
            state == 'loadingText' ? $el.addClass(d).attr(d, d) : $el.removeClass(d).removeAttr(d);
        }, 0);
    };
    Button.prototype.toggle = function() {
        var $parent = this.$element.closest('[data-toggle="buttons"]');
        var changed = true;
        if ($parent.length) {
            var $input = this.$element.find('input');
            if ($input.prop('type') === 'radio')
                if ($input.prop('checked') && this.$element.hasClass('active')) changed = false;
                else $parent.find('.active').removeClass('active');
            if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change');
        }
        if (changed) this.$element.toggleClass('active');
    };
    var old = $.fn.button;
    $.fn.button = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.button');
            var options = typeof option == 'object' && option;
            if (!data) $this.data('bs.button', (data = new Button(this, options)));
            if (option == 'toggle') data.toggle();
            else if (option) data.setState(option);
        });
    };
    $.fn.button.Constructor = Button;
    $.fn.button.noConflict = function() {
        $.fn.button = old;
        return this;
    };
    $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function(e) {
        var $btn = $(e.target);
        if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn');
        $btn.button('toggle');
        e.preventDefault();
    });
}(jQuery); + function($) {
    "use strict";
    var Carousel = function(element, options) {
        this.$element = $(element);
        this.$indicators = this.$element.find('.carousel-indicators');
        this.options = options;
        this.paused = this.sliding = this.interval = this.$active = this.$items = null;
        this.options.pause == 'hover' && this.$element.on('mouseenter', $.proxy(this.pause, this)).on('mouseleave', $.proxy(this.cycle, this));
    };
    Carousel.DEFAULTS = {
        interval: 5000,
        pause: 'hover',
        wrap: true
    };
    Carousel.prototype.cycle = function(e) {
        e || (this.paused = false);
        this.interval && clearInterval(this.interval);
        this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
        return this;
    };
    Carousel.prototype.getActiveIndex = function() {
        this.$active = this.$element.find('.item.active');
        this.$items = this.$active.parent().children();
        return this.$items.index(this.$active);
    };
    Carousel.prototype.to = function(pos) {
        var that = this;
        var activeIndex = this.getActiveIndex();
        if (pos > (this.$items.length - 1) || pos < 0) return;
        if (this.sliding) return this.$element.one('slid.bs.carousel', function() {
            that.to(pos);
        });
        if (activeIndex == pos) return this.pause().cycle();
        return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]));
    };
    Carousel.prototype.pause = function(e) {
        e || (this.paused = true);
        if (this.$element.find('.next, .prev').length && $.support.transition.end) {
            this.$element.trigger($.support.transition.end);
            this.cycle(true);
        }
        this.interval = clearInterval(this.interval);
        return this;
    };
    Carousel.prototype.next = function() {
        if (this.sliding) return;
        return this.slide('next');
    };
    Carousel.prototype.prev = function() {
        if (this.sliding) return;
        return this.slide('prev');
    };
    Carousel.prototype.slide = function(type, next) {
        var $active = this.$element.find('.item.active');
        var $next = next || $active[type]();
        var isCycling = this.interval;
        var direction = type == 'next' ? 'left' : 'right';
        var fallback = type == 'next' ? 'first' : 'last';
        var that = this;
        if (!$next.length) {
            if (!this.options.wrap) return;
            $next = this.$element.find('.item')[fallback]();
        }
        this.sliding = true;
        isCycling && this.pause();
        var e = $.Event('slide.bs.carousel', {
            relatedTarget: $next[0],
            direction: direction
        });
        if ($next.hasClass('active')) return;
        if (this.$indicators.length) {
            this.$indicators.find('.active').removeClass('active');
            this.$element.one('slid.bs.carousel', function() {
                var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()]);
                $nextIndicator && $nextIndicator.addClass('active');
            });
        }
        if ($.support.transition && this.$element.hasClass('slide')) {
            this.$element.trigger(e);
            if (e.isDefaultPrevented()) return;
            $next.addClass(type);
            $next[0].offsetWidth;
            $active.addClass(direction);
            $next.addClass(direction);
            $active.one($.support.transition.end, function() {
                $next.removeClass([type, direction].join(' ')).addClass('active');
                $active.removeClass(['active', direction].join(' '));
                that.sliding = false;
                setTimeout(function() {
                    that.$element.trigger('slid.bs.carousel');
                }, 0);
            }).emulateTransitionEnd(600);
        } else {
            this.$element.trigger(e);
            if (e.isDefaultPrevented()) return;
            $active.removeClass('active');
            $next.addClass('active');
            this.sliding = false;
            this.$element.trigger('slid.bs.carousel');
        }
        isCycling && this.cycle();
        return this;
    };
    var old = $.fn.carousel;
    $.fn.carousel = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.carousel');
            var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option);
            var action = typeof option == 'string' ? option : options.slide;
            if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)));
            if (typeof option == 'number') data.to(option);
            else if (action) data[action]();
            else if (options.interval) data.pause().cycle();
        });
    };
    $.fn.carousel.Constructor = Carousel;
    $.fn.carousel.noConflict = function() {
        $.fn.carousel = old;
        return this;
    };
    $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function(e) {
        var $this = $(this),
            href;
        var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''));
        var options = $.extend({}, $target.data(), $this.data());
        var slideIndex = $this.attr('data-slide-to');
        if (slideIndex) options.interval = false;
        $target.carousel(options);
        if (slideIndex = $this.attr('data-slide-to')) $target.data('bs.carousel').to(slideIndex);
        e.preventDefault();
    });
    $(window).on('load', function() {
        $('[data-ride="carousel"]').each(function() {
            var $carousel = $(this);
            $carousel.carousel($carousel.data());
        });
    });
}(jQuery); + function($) {
    "use strict";
    var Collapse = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Collapse.DEFAULTS, options);
        this.transitioning = null;
        if (this.options.parent) this.$parent = $(this.options.parent);
        if (this.options.toggle) this.toggle();
    };
    Collapse.DEFAULTS = {
        toggle: true
    };
    Collapse.prototype.dimension = function() {
        var hasWidth = this.$element.hasClass('width');
        return hasWidth ? 'width' : 'height';
    };
    Collapse.prototype.show = function() {
        if (this.transitioning || this.$element.hasClass('in')) return;
        var startEvent = $.Event('show.bs.collapse');
        this.$element.trigger(startEvent);
        if (startEvent.isDefaultPrevented()) return;
        var actives = this.$parent && this.$parent.find('> .panel > .in');
        if (actives && actives.length) {
            var hasData = actives.data('bs.collapse');
            if (hasData && hasData.transitioning) return;
            actives.collapse('hide');
            hasData || actives.data('bs.collapse', null);
        }
        var dimension = this.dimension();
        this.$element.removeClass('collapse').addClass('collapsing')[dimension](0);
        this.transitioning = 1;
        var complete = function() {
            this.$element.removeClass('collapsing').addClass('in')[dimension]('auto');
            this.transitioning = 0;
            this.$element.trigger('shown.bs.collapse');
        };
        if (!$.support.transition) return complete.call(this);
        var scrollSize = $.camelCase(['scroll', dimension].join('-'));
        this.$element.one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize]);
    };
    Collapse.prototype.hide = function() {
        if (this.transitioning || !this.$element.hasClass('in')) return;
        var startEvent = $.Event('hide.bs.collapse');
        this.$element.trigger(startEvent);
        if (startEvent.isDefaultPrevented()) return;
        var dimension = this.dimension();
        this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
        this.$element.addClass('collapsing').removeClass('collapse').removeClass('in');
        this.transitioning = 1;
        var complete = function() {
            this.transitioning = 0;
            this.$element.trigger('hidden.bs.collapse').removeClass('collapsing').addClass('collapse');
        };
        if (!$.support.transition) return complete.call(this);
        this.$element[dimension](0).one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(350);
    };
    Collapse.prototype.toggle = function() {
        this[this.$element.hasClass('in') ? 'hide' : 'show']();
    };
    var old = $.fn.collapse;
    $.fn.collapse = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.collapse');
            var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option);
            if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)));
            if (typeof option == 'string') data[option]();
        });
    };
    $.fn.collapse.Constructor = Collapse;
    $.fn.collapse.noConflict = function() {
        $.fn.collapse = old;
        return this;
    };
    $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function(e) {
        var $this = $(this),
            href;
        var target = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '');
        var $target = $(target);
        var data = $target.data('bs.collapse');
        var option = data ? 'toggle' : $this.data();
        var parent = $this.attr('data-parent');
        var $parent = parent && $(parent);
        if (!data || !data.transitioning) {
            if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed');
            $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed');
        }
        $target.collapse(option);
    });
}(jQuery); + function($) {
    "use strict";
    var backdrop = '.dropdown-backdrop';
    var toggle = '[data-toggle=dropdown]';
    var Dropdown = function(element) {
        $(element).on('click.bs.dropdown', this.toggle);
    };
    Dropdown.prototype.toggle = function(e) {
        var $this = $(this);
        if ($this.is('.disabled, :disabled')) return;
        var $parent = getParent($this);
        var isActive = $parent.hasClass('open');
        clearMenus();
        if (!isActive) {
            if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus);
            $parent.trigger(e = $.Event('show.bs.dropdown'));
            if (e.isDefaultPrevented()) return;
            $parent.toggleClass('open').trigger('shown.bs.dropdown');
            $this.focus();
        }
        return false;
    };
    Dropdown.prototype.keydown = function(e) {
        if (!/(38|40|27)/.test(e.keyCode)) return;
        var $this = $(this);
        e.preventDefault();
        e.stopPropagation();
        if ($this.is('.disabled, :disabled')) return;
        var $parent = getParent($this);
        var isActive = $parent.hasClass('open');
        if (!isActive || (isActive && e.keyCode == 27)) {
            if (e.which == 27) $parent.find(toggle).focus();
            return $this.click();
        }
        var $items = $('[role=menu] li:not(.divider):visible a', $parent);
        if (!$items.length) return;
        var index = $items.index($items.filter(':focus'));
        if (e.keyCode == 38 && index > 0) index--;
        if (e.keyCode == 40 && index < $items.length - 1) index++;
        if (!~index) index = 0;
        $items.eq(index).focus();
    };

    function clearMenus() {
        $(backdrop).remove();
        $(toggle).each(function(e) {
            var $parent = getParent($(this));
            if (!$parent.hasClass('open')) return;
            $parent.trigger(e = $.Event('hide.bs.dropdown'));
            if (e.isDefaultPrevented()) return;
            $parent.removeClass('open').trigger('hidden.bs.dropdown');
        });
    }

    function getParent($this) {
        var selector = $this.attr('data-target');
        if (!selector) {
            selector = $this.attr('href');
            selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '');
        }
        var $parent = selector && $(selector);
        return $parent && $parent.length ? $parent : $this.parent();
    }
    var old = $.fn.dropdown;
    $.fn.dropdown = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.dropdown');
            if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)));
            if (typeof option == 'string') data[option].call($this);
        });
    };
    $.fn.dropdown.Constructor = Dropdown;
    $.fn.dropdown.noConflict = function() {
        $.fn.dropdown = old;
        return this;
    };
    $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function(e) {
        e.stopPropagation();
    }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]', Dropdown.prototype.keydown);
}(jQuery); + function($) {
    "use strict";
    var Modal = function(element, options) {
        this.options = options;
        this.$element = $(element);
        this.$backdrop = this.isShown = null;
        if (this.options.remote) this.$element.load(this.options.remote);
    };
    Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
    };
    Modal.prototype.toggle = function(_relatedTarget) {
        return this[!this.isShown ? 'show' : 'hide'](_relatedTarget);
    };
    Modal.prototype.show = function(_relatedTarget) {
        var that = this;
        var e = $.Event('show.bs.modal', {
            relatedTarget: _relatedTarget
        });
        this.$element.trigger(e);
        if (this.isShown || e.isDefaultPrevented()) return;
        this.isShown = true;
        this.escape();
        this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));
        this.backdrop(function() {
            var transition = $.support.transition && that.$element.hasClass('fade');
            if (!that.$element.parent().length) that.$element.appendTo(document.body);
            that.$element.show();
            if (transition) that.$element[0].offsetWidth;
            that.$element.addClass('in').attr('aria-hidden', false);
            that.enforceFocus();
            var e = $.Event('shown.bs.modal', {
                relatedTarget: _relatedTarget
            });
            transition ? that.$element.find('.modal-dialog').one($.support.transition.end, function() {
                that.$element.focus().trigger(e);
            }).emulateTransitionEnd(300) : that.$element.focus().trigger(e);
        });
    };
    Modal.prototype.hide = function(e) {
        if (e) e.preventDefault();
        e = $.Event('hide.bs.modal');
        this.$element.trigger(e);
        if (!this.isShown || e.isDefaultPrevented()) return;
        this.isShown = false;
        this.escape();
        $(document).off('focusin.bs.modal');
        this.$element.removeClass('in').attr('aria-hidden', true).off('click.dismiss.modal');
        $.support.transition && this.$element.hasClass('fade') ? this.$element.one($.support.transition.end, $.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal();
    };
    Modal.prototype.enforceFocus = function() {
        $(document).off('focusin.bs.modal').on('focusin.bs.modal', $.proxy(function(e) {
            if (this.$element[0] !== e.target && !this.$element.has(e.target).length) this.$element.focus();
        }, this));
    };
    Modal.prototype.escape = function() {
        if (this.isShown && this.options.keyboard) this.$element.on('keyup.dismiss.bs.modal', $.proxy(function(e) {
            e.which == 27 && this.hide();
        }, this));
        else if (!this.isShown) this.$element.off('keyup.dismiss.bs.modal');
    };
    Modal.prototype.hideModal = function() {
        var that = this;
        this.$element.hide();
        this.backdrop(function() {
            that.removeBackdrop();
            that.$element.trigger('hidden.bs.modal');
        });
    };
    Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null;
    };
    Modal.prototype.backdrop = function(callback) {
        var that = this;
        var animate = this.$element.hasClass('fade') ? 'fade' : '';
        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;
            this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body);
            this.$element.on('click.dismiss.modal', $.proxy(function(e) {
                if (e.target !== e.currentTarget) return;
                this.options.backdrop == 'static' ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this);
            }, this));
            if (doAnimate) this.$backdrop[0].offsetWidth;
            this.$backdrop.addClass('in');
            if (!callback) return;
            doAnimate ? this.$backdrop.one($.support.transition.end, callback).emulateTransitionEnd(150) : callback();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in');
            $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one($.support.transition.end, callback).emulateTransitionEnd(150) : callback();
        } else if (callback) callback();
    };
    var old = $.fn.modal;
    $.fn.modal = function(option, _relatedTarget) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.modal');
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option);
            if (!data) $this.data('bs.modal', (data = new Modal(this, options)));
            if (typeof option == 'string') data[option](_relatedTarget);
            else if (options.show) data.show(_relatedTarget);
        });
    };
    $.fn.modal.Constructor = Modal;
    $.fn.modal.noConflict = function() {
        $.fn.modal = old;
        return this;
    };
    $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function(e) {
        var $this = $(this);
        var href = $this.attr('href');
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')));
        var option = $target.data('modal') ? 'toggle' : $.extend({
            remote: !/#/.test(href) && href
        }, $target.data(), $this.data());
        e.preventDefault();
        $target.modal(option, this).one('hide', function() {
            $this.is(':visible') && $this.focus();
        });
    });
    $(document).on('show.bs.modal', '.modal', function() {
        $(document.body).addClass('modal-open');
    }).on('hidden.bs.modal', '.modal', function() {
        $(document.body).removeClass('modal-open');
    });
}(jQuery); + function($) {
    "use strict";
    var Tooltip = function(element, options) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
        this.init('tooltip', element, options);
    };
    Tooltip.DEFAULTS = {
        animation: true,
        placement: 'top',
        selector: false,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        container: false
    };
    Tooltip.prototype.init = function(type, element, options) {
        this.enabled = true;
        this.type = type;
        this.$element = $(element);
        this.options = this.getOptions(options);
        var triggers = this.options.trigger.split(' ');
        for (var i = triggers.length; i--;) {
            var trigger = triggers[i];
            if (trigger == 'click') this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
            else if (trigger != 'manual') {
                var eventIn = trigger == 'hover' ? 'mouseenter' : 'focus';
                var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur';
                this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
                this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
            }
        }
        this.options.selector ? (this._options = $.extend({}, this.options, {
            trigger: 'manual',
            selector: ''
        })) : this.fixTitle();
    };
    Tooltip.prototype.getDefaults = function() {
        return Tooltip.DEFAULTS;
    };
    Tooltip.prototype.getOptions = function(options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options);
        if (options.delay && typeof options.delay == 'number') options.delay = {
            show: options.delay,
            hide: options.delay
        };
        return options;
    };
    Tooltip.prototype.getDelegateOptions = function() {
        var options = {};
        var defaults = this.getDefaults();
        this._options && $.each(this._options, function(key, value) {
            if (defaults[key] != value) options[key] = value;
        });
        return options;
    };
    Tooltip.prototype.enter = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
        clearTimeout(self.timeout);
        self.hoverState = 'in';
        if (!self.options.delay || !self.options.delay.show) return self.show();
        self.timeout = setTimeout(function() {
            if (self.hoverState == 'in') self.show();
        }, self.options.delay.show);
    };
    Tooltip.prototype.leave = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
        clearTimeout(self.timeout);
        self.hoverState = 'out';
        if (!self.options.delay || !self.options.delay.hide) return self.hide();
        self.timeout = setTimeout(function() {
            if (self.hoverState == 'out') self.hide();
        }, self.options.delay.hide);
    };
    Tooltip.prototype.show = function() {
        var e = $.Event('show.bs.' + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            if (e.isDefaultPrevented()) return;
            var $tip = this.tip();
            this.setContent();
            if (this.options.animation) $tip.addClass('fade');
            var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
            var autoToken = /\s?auto?\s?/i;
            var autoPlace = autoToken.test(placement);
            if (autoPlace) placement = placement.replace(autoToken, '') || 'top';
            $tip.detach().css({
                top: 0,
                left: 0,
                display: 'block'
            }).addClass(placement);
            this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
            var pos = this.getPosition();
            var actualWidth = $tip[0].offsetWidth;
            var actualHeight = $tip[0].offsetHeight;
            if (autoPlace) {
                var $parent = this.$element.parent();
                var orgPlacement = placement;
                var docScroll = document.documentElement.scrollTop || document.body.scrollTop;
                var parentWidth = this.options.container == 'body' ? window.innerWidth : $parent.outerWidth();
                var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight();
                var parentLeft = this.options.container == 'body' ? 0 : $parent.offset().left;
                placement = placement == 'bottom' && pos.top + pos.height + actualHeight - docScroll > parentHeight ? 'top' : placement == 'top' && pos.top - docScroll - actualHeight < 0 ? 'bottom' : placement == 'right' && pos.right + actualWidth > parentWidth ? 'left' : placement == 'left' && pos.left - actualWidth < parentLeft ? 'right' : placement;
                $tip.removeClass(orgPlacement).addClass(placement);
            }
            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
            this.applyPlacement(calculatedOffset, placement);
            this.$element.trigger('shown.bs.' + this.type);
        }
    };
    Tooltip.prototype.applyPlacement = function(offset, placement) {
        var replace;
        var $tip = this.tip();
        var width = $tip[0].offsetWidth;
        var height = $tip[0].offsetHeight;
        var marginTop = parseInt($tip.css('margin-top'), 10);
        var marginLeft = parseInt($tip.css('margin-left'), 10);
        if (isNaN(marginTop)) marginTop = 0;
        if (isNaN(marginLeft)) marginLeft = 0;
        offset.top = offset.top + marginTop;
        offset.left = offset.left + marginLeft;
        $tip.offset(offset).addClass('in');
        var actualWidth = $tip[0].offsetWidth;
        var actualHeight = $tip[0].offsetHeight;
        if (placement == 'top' && actualHeight != height) {
            replace = true;
            offset.top = offset.top + height - actualHeight;
        }
        if (/bottom|top/.test(placement)) {
            var delta = 0;
            if (offset.left < 0) {
                delta = offset.left * -2;
                offset.left = 0;
                $tip.offset(offset);
                actualWidth = $tip[0].offsetWidth;
                actualHeight = $tip[0].offsetHeight;
            }
            this.replaceArrow(delta - width + actualWidth, actualWidth, 'left');
        } else this.replaceArrow(actualHeight - height, actualHeight, 'top');
        if (replace) $tip.offset(offset);
    };
    Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
        this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '');
    };
    Tooltip.prototype.setContent = function() {
        var $tip = this.tip();
        var title = this.getTitle();
        $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
        $tip.removeClass('fade in top bottom left right');
    };
    Tooltip.prototype.hide = function() {
        var that = this;
        var $tip = this.tip();
        var e = $.Event('hide.bs.' + this.type);

        function complete() {
            if (that.hoverState != 'in') $tip.detach();
        }
        this.$element.trigger(e);
        if (e.isDefaultPrevented()) return;
        $tip.removeClass('in');
        $.support.transition && this.$tip.hasClass('fade') ? $tip.one($.support.transition.end, complete).emulateTransitionEnd(150) : complete();
        this.$element.trigger('hidden.bs.' + this.type);
        return this;
    };
    Tooltip.prototype.fixTitle = function() {
        var $e = this.$element;
        if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
    };
    Tooltip.prototype.hasContent = function() {
        return this.getTitle();
    };
    Tooltip.prototype.getPosition = function() {
        var el = this.$element[0];
        return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
            width: el.offsetWidth,
            height: el.offsetHeight
        }, this.$element.offset());
    };
    Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
        return placement == 'bottom' ? {
            top: pos.top + pos.height,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : placement == 'top' ? {
            top: pos.top - actualHeight,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : placement == 'left' ? {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left - actualWidth
        } : {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left + pos.width
        };
    };
    Tooltip.prototype.getTitle = function() {
        var title;
        var $e = this.$element;
        var o = this.options;
        title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);
        return title;
    };
    Tooltip.prototype.tip = function() {
        return this.$tip = this.$tip || $(this.options.template);
    };
    Tooltip.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow');
    };
    Tooltip.prototype.validate = function() {
        if (!this.$element[0].parentNode) {
            this.hide();
            this.$element = null;
            this.options = null;
        }
    };
    Tooltip.prototype.enable = function() {
        this.enabled = true;
    };
    Tooltip.prototype.disable = function() {
        this.enabled = false;
    };
    Tooltip.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    };
    Tooltip.prototype.toggle = function(e) {
        var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this;
        self.tip().hasClass('in') ? self.leave(self) : self.enter(self);
    };
    Tooltip.prototype.destroy = function() {
        this.hide().$element.off('.' + this.type).removeData('bs.' + this.type);
    };
    var old = $.fn.tooltip;
    $.fn.tooltip = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.tooltip');
            var options = typeof option == 'object' && option;
            if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)));
            if (typeof option == 'string') data[option]();
        });
    };
    $.fn.tooltip.Constructor = Tooltip;
    $.fn.tooltip.noConflict = function() {
        $.fn.tooltip = old;
        return this;
    };
}(jQuery); + function($) {
    "use strict";
    var Popover = function(element, options) {
        this.init('popover', element, options);
    };
    if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js');
    Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);
    Popover.prototype.constructor = Popover;
    Popover.prototype.getDefaults = function() {
        return Popover.DEFAULTS;
    };
    Popover.prototype.setContent = function() {
        var $tip = this.tip();
        var title = this.getTitle();
        var content = this.getContent();
        $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
        $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content);
        $tip.removeClass('fade top bottom left right in');
        if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide();
    };
    Popover.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    };
    Popover.prototype.getContent = function() {
        var $e = this.$element;
        var o = this.options;
        return $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content);
    };
    Popover.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find('.arrow');
    };
    Popover.prototype.tip = function() {
        if (!this.$tip) this.$tip = $(this.options.template);
        return this.$tip;
    };
    var old = $.fn.popover;
    $.fn.popover = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.popover');
            var options = typeof option == 'object' && option;
            if (!data) $this.data('bs.popover', (data = new Popover(this, options)));
            if (typeof option == 'string') data[option]();
        });
    };
    $.fn.popover.Constructor = Popover;
    $.fn.popover.noConflict = function() {
        $.fn.popover = old;
        return this;
    };
}(jQuery); + function($) {
    "use strict";

    function ScrollSpy(element, options) {
        var href;
        var process = $.proxy(this.process, this);
        this.$element = $(element).is('body') ? $(window) : $(element);
        this.$body = $('body');
        this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process);
        this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
        this.selector = (this.options.target || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) || '') + ' .nav li > a';
        this.offsets = $([]);
        this.targets = $([]);
        this.activeTarget = null;
        this.refresh();
        this.process();
    }
    ScrollSpy.DEFAULTS = {
        offset: 10
    };
    ScrollSpy.prototype.refresh = function() {
        var offsetMethod = this.$element[0] == window ? 'offset' : 'position';
        this.offsets = $([]);
        this.targets = $([]);
        var self = this;
        var $targets = this.$body.find(this.selector).map(function() {
            var $el = $(this);
            var href = $el.data('target') || $el.attr('href');
            var $href = /^#\w/.test(href) && $(href);
            return ($href && $href.length && [
                [$href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href]
            ]) || null;
        }).sort(function(a, b) {
            return a[0] - b[0];
        }).each(function() {
            self.offsets.push(this[0]);
            self.targets.push(this[1]);
        });
    };
    ScrollSpy.prototype.process = function() {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
        var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight;
        var maxScroll = scrollHeight - this.$scrollElement.height();
        var offsets = this.offsets;
        var targets = this.targets;
        var activeTarget = this.activeTarget;
        var i;
        if (scrollTop >= maxScroll) return activeTarget != (i = targets.last()[0]) && this.activate(i);
        for (i = offsets.length; i--;) activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i]);
    };
    ScrollSpy.prototype.activate = function(target) {
        this.activeTarget = target;
        $(this.selector).parents('.active').removeClass('active');
        var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
        var active = $(selector).parents('li').addClass('active');
        if (active.parent('.dropdown-menu').length) active = active.closest('li.dropdown').addClass('active');
        active.trigger('activate.bs.scrollspy');
    };
    var old = $.fn.scrollspy;
    $.fn.scrollspy = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.scrollspy');
            var options = typeof option == 'object' && option;
            if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)));
            if (typeof option == 'string') data[option]();
        });
    };
    $.fn.scrollspy.Constructor = ScrollSpy;
    $.fn.scrollspy.noConflict = function() {
        $.fn.scrollspy = old;
        return this;
    };
    $(window).on('load', function() {
        $('[data-spy="scroll"]').each(function() {
            var $spy = $(this);
            $spy.scrollspy($spy.data());
        });
    });
}(jQuery); + function($) {
    "use strict";
    var Tab = function(element) {
        this.element = $(element);
    };
    Tab.prototype.show = function() {
        var $this = this.element;
        var $ul = $this.closest('ul:not(.dropdown-menu)');
        var selector = $this.data('target');
        if (!selector) {
            selector = $this.attr('href');
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
        }
        if ($this.parent('li').hasClass('active')) return;
        var previous = $ul.find('.active:last a')[0];
        var e = $.Event('show.bs.tab', {
            relatedTarget: previous
        });
        $this.trigger(e);
        if (e.isDefaultPrevented()) return;
        var $target = $(selector);
        this.activate($this.parent('li'), $ul);
        this.activate($target, $target.parent(), function() {
            $this.trigger({
                type: 'shown.bs.tab',
                relatedTarget: previous
            });
        });
    };
    Tab.prototype.activate = function(element, container, callback) {
        var $active = container.find('> .active');
        var transition = callback && $.support.transition && $active.hasClass('fade');

        function next() {
            $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active');
            element.addClass('active');
            if (transition) {
                element[0].offsetWidth;
                element.addClass('in');
            } else element.removeClass('fade');
            if (element.parent('.dropdown-menu')) element.closest('li.dropdown').addClass('active');
            callback && callback();
        }
        transition ? $active.one($.support.transition.end, next).emulateTransitionEnd(150) : next();
        $active.removeClass('in');
    };
    var old = $.fn.tab;
    $.fn.tab = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.tab');
            if (!data) $this.data('bs.tab', (data = new Tab(this)));
            if (typeof option == 'string') data[option]();
        });
    };
    $.fn.tab.Constructor = Tab;
    $.fn.tab.noConflict = function() {
        $.fn.tab = old;
        return this;
    };
    $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
}(jQuery); + function($) {
    "use strict";
    var Affix = function(element, options) {
        this.options = $.extend({}, Affix.DEFAULTS, options);
        this.$window = $(window).on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this));
        this.$element = $(element);
        this.affixed = this.unpin = null;
        this.checkPosition();
    };
    Affix.RESET = 'affix affix-top affix-bottom';
    Affix.DEFAULTS = {
        offset: 0
    };
    Affix.prototype.checkPositionWithEventLoop = function() {
        setTimeout($.proxy(this.checkPosition, this), 1);
    };
    Affix.prototype.checkPosition = function() {
        if (!this.$element.is(':visible')) return;
        var scrollHeight = $(document).height();
        var scrollTop = this.$window.scrollTop();
        var position = this.$element.offset();
        var offset = this.options.offset;
        var offsetTop = offset.top;
        var offsetBottom = offset.bottom;
        if (typeof offset != 'object') offsetBottom = offsetTop = offset;
        if (typeof offsetTop == 'function') offsetTop = offset.top();
        if (typeof offsetBottom == 'function') offsetBottom = offset.bottom();
        var affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ? false : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' : offsetTop != null && (scrollTop <= offsetTop) ? 'top' : false;
        if (this.affixed === affix) return;
        if (this.unpin) this.$element.css('top', '');
        this.affixed = affix;
        this.unpin = affix == 'bottom' ? position.top - scrollTop : null;
        this.$element.removeClass(Affix.RESET).addClass('affix' + (affix ? '-' + affix : ''));
        if (affix == 'bottom') this.$element.offset({
            top: document.body.offsetHeight - offsetBottom - this.$element.height()
        });
    };
    var old = $.fn.affix;
    $.fn.affix = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.affix');
            var options = typeof option == 'object' && option;
            if (!data) $this.data('bs.affix', (data = new Affix(this, options)));
            if (typeof option == 'string') data[option]();
        });
    };
    $.fn.affix.Constructor = Affix;
    $.fn.affix.noConflict = function() {
        $.fn.affix = old;
        return this;
    };
    $(window).on('load', function() {
        $('[data-spy="affix"]').each(function() {
            var $spy = $(this);
            var data = $spy.data();
            data.offset = data.offset || {};
            if (data.offsetBottom) data.offset.bottom = data.offsetBottom;
            if (data.offsetTop) data.offset.top = data.offsetTop;
            $spy.affix(data);
        });
    });
}(jQuery);
(function($) {
    $.fn.fullpage = function(options) {
        options = $.extend({
            "verticalCentered": true,
            'resize': true,
            'slidesColor': [],
            'anchors': [],
            'scrollingSpeed': 700,
            'easing': 'easeInQuart',
            'menu': false,
            'navigation': false,
            'navigationPosition': 'right',
            'navigationColor': '#000',
            'navigationTooltips': [],
            'slidesNavigation': false,
            'slidesNavPosition': 'bottom',
            'controlArrowColor': '#fff',
            'loopBottom': false,
            'loopTop': false,
            'loopHorizontal': true,
            'autoScrolling': true,
            'scrollOverflow': false,
            'css3': false,
            'paddingTop': 0,
            'paddingBottom': 0,
            'fixedElements': null,
            'normalScrollElements': null,
            'keyboardScrolling': true,
            'touchSensitivity': 5,
            'continuousVertical': false,
            'animateAnchor': true,
            'afterLoad': null,
            'onLeave': null,
            'afterRender': null,
            'afterSlideLoad': null,
            'onSlideLeave': null
        }, options);
        if (options.continuousVertical && (options.loopTop || options.loopBottom)) {
            options.continuousVertical = false;
            console && console.log && console.log("Option loopTop/loopBottom is mutually exclusive with continuousVertical; continuousVertical disabled");
        }
        var scrollDelay = 0;
        $.fn.fullpage.setAutoScrolling = function(value) {
            options.autoScrolling = value;
            var element = $('.section.active');
            if (options.autoScrolling) {
                $('html, body').css({
                    'overflow': 'hidden',
                    'height': '100%'
                });
                if (element.length) silentScroll(element.position().top);
            } else {
                $('html, body').css({
                    'overflow': 'auto',
                    'height': 'auto'
                });
                silentScroll(0);
                $('html, body').scrollTop(element.position().top);
            }
        };
        $.fn.fullpage.setScrollingSpeed = function(value) {
            options.scrollingSpeed = value;
        };
        $.fn.fullpage.setMouseWheelScrolling = function(value) {
            if (value) addMouseWheelHandler();
            else removeMouseWheelHandler();
        };
        $.fn.fullpage.setAllowScrolling = function(value) {
            if (value) {
                $.fn.fullpage.setMouseWheelScrolling(true);
                addTouchHandler();
            } else {
                $.fn.fullpage.setMouseWheelScrolling(false);
                removeTouchHandler();
            }
        };
        $.fn.fullpage.setKeyboardScrolling = function(value) {
            options.keyboardScrolling = value;
        };
        var slideMoving = false;
        var isTablet = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/);
        var windowsHeight = $(window).height();
        var isMoving = false;
        var isResizing = false;
        var lastScrolledDestiny;
        var lastScrolledSlide;
        $.fn.fullpage.setAllowScrolling(true);
        if (options.css3) {}
        $('body').wrapInner('<div id="superContainer" />');
        if (options.navigation) {
            $('body').append('<div id="fullPage-nav"><ul></ul></div>');
            var nav = $('#fullPage-nav');
            nav.css('color', options.navigationColor);
            nav.addClass(options.navigationPosition);
        }
        $('.section').each(function(index) {
            var slides = $(this).find('.slide');
            var numSlides = slides.length;
            if (!index && $('.section.active').length === 0) $(this).addClass('active');
            $(this).css('height', windowsHeight + 'px');
            if (options.paddingTop || options.paddingBottom) $(this).css('padding', options.paddingTop + ' 0 ' + options.paddingBottom + ' 0');
            if (typeof options.slidesColor[index] !== 'undefined') $(this).css('background-color', options.slidesColor[index]);
            if (typeof options.anchors[index] !== 'undefined') $(this).attr('data-anchor', options.anchors[index]);
            if (options.navigation) {
                var link = '';
                if (options.anchors.length) link = options.anchors[index];
                var tooltip = options.navigationTooltips[index];
                if (typeof tooltip === 'undefined') tooltip = '';
                nav.find('ul').append('<li data-tooltip="' + tooltip + '"><a href="#' + link + '"><span></span></a></li>');
            }
            if (numSlides > 0) {
                var sliderWidth = numSlides * 100;
                var slideWidth = 100 / numSlides;
                slides.wrapAll('<div class="slidesContainer" />');
                slides.parent().wrap('<div class="slides" />');
                $(this).find('.slidesContainer').css('width', sliderWidth + '%');
                if (options.controlArrowColor != '#fff') {
                    $(this).find('.controlArrow.next').css('border-color', 'transparent transparent transparent ' + options.controlArrowColor);
                    $(this).find('.controlArrow.prev').css('border-color', 'transparent ' + options.controlArrowColor + ' transparent transparent');
                }
                if (!options.loopHorizontal) $(this).find('.controlArrow.prev').hide();
                if (options.slidesNavigation) addSlidesNavigation($(this), numSlides);
                slides.each(function(index) {
                    if (!index) $(this).addClass('active');
                    $(this).css('width', slideWidth + '%');
                    if (options.verticalCentered) addTableClass($(this));
                });
            } else if (options.verticalCentered) addTableClass($(this));
        }).promise().done(function() {
            $.fn.fullpage.setAutoScrolling(options.autoScrolling);
            if (options.fixedElements && options.css3) $(options.fixedElements).appendTo('body');
            if (options.navigation) {
                nav.css('margin-top', '-' + (nav.height() / 2) + 'px');
                nav.find('li').eq($('.section.active').index('.section')).find('a').addClass('active');
            }
            if (options.menu && options.css3) $(options.menu).appendTo('body');
            if (options.scrollOverflow) $(window).on('load', function() {
                $('.section').each(function() {
                    var slides = $(this).find('.slide');
                    if (slides.length) slides.each(function() {
                        createSlimScrolling($(this));
                    });
                    else createSlimScrolling($(this));
                });
                $.isFunction(options.afterRender) && options.afterRender.call(this);
            });
            else $.isFunction(options.afterRender) && options.afterRender.call(this);
            var hashString = String(window.location.hash);
            var value = hashString.replace('#', '').split('/');
            var destiny = value[0];
            if (destiny.length) {
                var section = $('[data-anchor="' + destiny + '"]');
                if (!options.animateAnchor && section.length) {
                    silentScroll(section.position().top);
                    $.isFunction(options.afterLoad) && options.afterLoad.call(this, destiny, (section.index('.section') + 1));
                    section.addClass('active').siblings().removeClass('active');
                }
            }
            $(window).on('load', function() {
                scrollToAnchor();
            });
        });
        var scrollId;
        var isScrolling = false;
        $(window).scroll(function(e) {
            if (!options.autoScrolling) {
                var currentScroll = $(window).scrollTop();
                var scrolledSections = $('.section').map(function() {
                    if ($(this).offset().top < (currentScroll + 100)) return $(this);
                });
                var currentSection = scrolledSections[scrolledSections.length - 1];
                if (!currentSection.hasClass('active')) {
                    isScrolling = true;
                    var yMovement = getYmovement(currentSection);
                    $('.section.active').removeClass('active');
                    currentSection.addClass('active');
                    var anchorLink = currentSection.data('anchor');
                    $.isFunction(options.onLeave) && options.onLeave.call(this, currentSection.index('.section'), yMovement);
                    $.isFunction(options.afterLoad) && options.afterLoad.call(this, anchorLink, (currentSection.index('.section') + 1));
                    activateMenuElement(anchorLink);
                    activateNavDots(anchorLink, 0);
                    if (options.anchors.length && !isMoving) {
                        lastScrolledDestiny = anchorLink;
                        window.location.replace('#' + anchorLink);
                    }
                    clearTimeout(scrollId);
                    scrollId = setTimeout(function() {
                        isScrolling = false;
                    }, 100);
                }
            }
        });
        var touchStartY = 0;
        var touchStartX = 0;
        var touchEndY = 0;
        var touchEndX = 0;

        function touchMoveHandler(event) {
            if (options.autoScrolling) {
                event.preventDefault();
                var e = event.originalEvent;
                var touchMoved = false;
                var activeSection = $('.section.active');
                var scrollable;
                if (!isMoving && !slideMoving) {
                    var touchEvents = getEventsPage(e);
                    touchEndY = touchEvents.y;
                    touchEndX = touchEvents.x;
                    if (activeSection.find('.slides').length && Math.abs(touchStartX - touchEndX) > (Math.abs(touchStartY - touchEndY))) {
                        if (Math.abs(touchStartX - touchEndX) > ($(window).width() / 100 * options.touchSensitivity))
                            if (touchStartX > touchEndX) $.fn.fullpage.moveSlideRight();
                            else $.fn.fullpage.moveSlideLeft();
                    } else {
                        if (activeSection.find('.slides').length) scrollable = activeSection.find('.slide.active').find('.scrollable');
                        else scrollable = activeSection.find('.scrollable');
                        if (Math.abs(touchStartY - touchEndY) > ($(window).height() / 100 * options.touchSensitivity))
                            if (touchStartY > touchEndY)
                                if (scrollable.length > 0)
                                    if (isScrolled('bottom', scrollable)) $.fn.fullpage.moveSectionDown();
                                    else return true;
                        else $.fn.fullpage.moveSectionDown();
                        else if (touchEndY > touchStartY)
                            if (scrollable.length > 0)
                                if (isScrolled('top', scrollable)) $.fn.fullpage.moveSectionUp();
                                else return true;
                        else $.fn.fullpage.moveSectionUp();
                    }
                }
            }
        }

        function touchStartHandler(event) {
            if (options.autoScrolling) {
                var e = event.originalEvent;
                var touchEvents = getEventsPage(e);
                touchStartY = touchEvents.y;
                touchStartX = touchEvents.x;
            }
        }

        function MouseWheelHandler(e) {
            if (options.autoScrolling) {
                e = window.event || e;
                var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.deltaY || -e.detail)));
                var scrollable;
                var activeSection = $('.section.active');
                if (!isMoving) {
                    if (activeSection.find('.slides').length) scrollable = activeSection.find('.slide.active').find('.scrollable');
                    else scrollable = activeSection.find('.scrollable');
                    if (delta < 0)
                        if (scrollable.length > 0)
                            if (isScrolled('bottom', scrollable)) $.fn.fullpage.moveSectionDown();
                            else return true;
                    else $.fn.fullpage.moveSectionDown();
                    else if (scrollable.length > 0)
                        if (isScrolled('top', scrollable)) $.fn.fullpage.moveSectionUp();
                        else return true;
                    else $.fn.fullpage.moveSectionUp();
                }
                return false;
            }
        }
        $.fn.fullpage.moveSectionUp = function() {
            var prev = $('.section.active').prev('.section');
            if (!prev.length && (options.loopTop || options.continuousVertical)) prev = $('.section').last();
            if (prev.length) scrollPage(prev, null, true);
        };
        $.fn.fullpage.moveSectionDown = function() {
            var next = $('.section.active').next('.section');
            if (!next.length && (options.loopBottom || options.continuousVertical)) next = $('.section').first();
            if (next.length > 0 || (!next.length && (options.loopBottom || options.continuousVertical))) scrollPage(next, null, false);
        };
        $.fn.fullpage.moveTo = function(section, slide) {
            var destiny = '';
            if (isNaN(section)) destiny = $('[data-anchor="' + section + '"]');
            else destiny = $('.section').eq((section - 1));
            if (slide !== 'undefined') scrollPageAndSlide(section, slide);
        };

        function scrollPage(element, callback, isMovementUp) {
            var scrollOptions = {},
                scrolledElement;
            element = $('div[data-anchor="' + element + '"]')[0];
            element = $(element);
            var dest = element.position();
            if (typeof dest === "undefined") return;
            var dtop = dest.top;
            var yMovement = getYmovement(element);
            var anchorLink = element.data('anchor');
            var sectionIndex = element.index('.section');
            var activeSlide = element.find('.slide.active');
            var activeSection = $('.section.active');
            if (activeSlide.length) {
                var slideAnchorLink = activeSlide.data('anchor');
                var slideIndex = activeSlide.index();
            }
            if (options.autoScrolling && options.continuousVertical && typeof isMovementUp !== "undefined" && ((!isMovementUp && yMovement == 'up') || (isMovementUp && yMovement == 'down'))) {
                if (!isMovementUp) $(".section.active").after(activeSection.prevAll(".section").get().reverse());
                else $(".section.active").before(activeSection.nextAll(".section"));
                silentScroll($('.section.active').position().top);
                var wrapAroundElements = activeSection;
                dest = element.position();
                dtop = dest.top;
                yMovement = getYmovement(element);
            }
            var leavingSection = activeSection.index('.section') + 1;
            element.addClass('active').siblings().removeClass('active');
            isMoving = true;
            if (typeof anchorLink !== 'undefined') setURLHash(slideIndex, slideAnchorLink, anchorLink);
            if (options.autoScrolling) {
                scrollOptions.top = -dtop;
                scrolledElement = '#superContainer';
            } else {
                scrollOptions.scrollTop = dtop;
                scrolledElement = 'html, body';
            }
            var continuousVerticalFixSectionOrder = function() {
                if (!wrapAroundElements || !wrapAroundElements.length) return;
                if (isMovementUp) $('.section:first').before(wrapAroundElements);
                else $('.section:last').after(wrapAroundElements);
                silentScroll($('.section.active').position().top);
            };
            if (options.css3 && options.autoScrolling) {
                $.isFunction(options.onLeave) && options.onLeave.call(this, leavingSection, yMovement);
                var translate3d = 'translate3d(0px, -' + dtop + 'px, 0px)';
                transformContainer(translate3d, true);
                setTimeout(function() {
                    continuousVerticalFixSectionOrder();
                    $.isFunction(options.afterLoad) && options.afterLoad.call(this, anchorLink, (sectionIndex + 1));
                    setTimeout(function() {
                        isMoving = false;
                        $.isFunction(callback) && callback.call(this);
                    }, scrollDelay);
                }, options.scrollingSpeed);
            } else {
                $.isFunction(options.onLeave) && options.onLeave.call(this, leavingSection, yMovement);
                $(scrolledElement).animate(scrollOptions, options.scrollingSpeed, options.easing, function() {
                    continuousVerticalFixSectionOrder();
                    $.isFunction(options.afterLoad) && options.afterLoad.call(this, anchorLink, (sectionIndex + 1));
                    setTimeout(function() {
                        isMoving = false;
                        $.isFunction(callback) && callback.call(this);
                    }, scrollDelay);
                });
            }
            lastScrolledDestiny = anchorLink;
            if (options.autoScrolling) {
                activateMenuElement(anchorLink);
                activateNavDots(anchorLink, sectionIndex);
            }
        }

        function scrollToAnchor() {
            var hashString = String(window.location.hash);
            var value = hashString.replace('#', '').split('/');
            var section = value[0];
            var slide = value[1];
            if (section) scrollPageAndSlide(section, slide);
        }
        $(window).on('hashchange', function() {
            if (!isScrolling) {
                var hashString = String(window.location.hash);
                var value = hashString.replace('#', '').split('/');
                var section = value[0];
                var slide = value[1];
                var isFirstSlideMove = (typeof lastScrolledDestiny === 'undefined');
                var isFirstScrollMove = (typeof lastScrolledDestiny === 'undefined' && typeof slide === 'undefined');
                if ((section && section !== lastScrolledDestiny) && !isFirstSlideMove || isFirstScrollMove || (!slideMoving && lastScrolledSlide != slide)) scrollPageAndSlide(section, slide);
            }
        });
        $(document).keydown(function(e) {
            if (options.keyboardScrolling && !isMoving) switch (e.which) {
                case 38:
                case 33:
                    $.fn.fullpage.moveSectionUp();
                    break;
                case 40:
                case 34:
                    $.fn.fullpage.moveSectionDown();
                    break;
                case 37:
                    $.fn.fullpage.moveSlideLeft();
                    break;
                case 39:
                    $.fn.fullpage.moveSlideRight();
                    break;
                default:
                    return;
            }
        });
        $(document).on('click', '#fullPage-nav a', function(e) {
            e.preventDefault();
            var index = $(this).parent().index();
            scrollPage($('.section').eq(index));
        });
        $(document).on({
            mouseenter: function() {
                var tooltip = $(this).data('tooltip');
                $('<div class="fullPage-tooltip ' + options.navigationPosition + '">' + tooltip + '</div>').hide().appendTo($(this)).fadeIn(200);
            },
            mouseleave: function() {
                $(this).find('.fullPage-tooltip').fadeOut().remove();
            }
        }, '#fullPage-nav li');
        if (options.normalScrollElements) {
            $(document).on('mouseover', options.normalScrollElements, function() {
                $.fn.fullpage.setMouseWheelScrolling(false);
            });
            $(document).on('mouseout', options.normalScrollElements, function() {
                $.fn.fullpage.setMouseWheelScrolling(true);
            });
        }
        $.fn.fullpage.moveSlideRight = function() {
            moveSlide('next');
        };
        $.fn.fullpage.moveSlideLeft = function() {
            moveSlide('prev');
        };

        function moveSlide(direction) {
            var activeSection = $('.section.active');
            var slides = activeSection.find('.slides');
            if (!direction || !slides.length || slideMoving) return;
            var currentSlide = slides.find('.slide.active');
            var destiny = null;
            if (direction === 'prev') destiny = currentSlide.prev('.slide');
            else destiny = currentSlide.next('.slide');
            if (!destiny.length) {
                if (!options.loopHorizontal) return;
                if (direction === 'prev') destiny = currentSlide.siblings(':last');
                else destiny = currentSlide.siblings(':first');
            }
            slideMoving = true;
            landscapeScroll(slides, destiny);
        }
        $('.controlArrow').on('click', function() {
            if ($(this).hasClass('prev')) $.fn.fullpage.moveSlideLeft();
            else if ($(this).hasClass('nextChapter')) $.fn.fullpage.moveSectionDown();
            else $.fn.fullpage.moveSlideRight();
        });
        $('.section').on('click', '.controlArrow', function() {
            if (slideMoving) return;
            slideMoving = true;
            var slides = $(this).closest('.section').find('.slides');
            var currentSlide = slides.find('.slide.active');
            var destiny = null;
            if ($(this).hasClass('prev')) destiny = currentSlide.prev('.slide');
            else destiny = currentSlide.next('.slide');
            if (!destiny.length)
                if ($(this).hasClass('prev')) destiny = currentSlide.siblings(':last');
                else destiny = currentSlide.siblings(':first');
            landscapeScroll(slides, destiny);
        });
        $('.section').on('click', '.toSlide', function(e) {
            e.preventDefault();
            var slides = $(this).closest('.section').find('.slides');
            var currentSlide = slides.find('.slide.active');
            var destiny = null;
            destiny = slides.find('.slide').eq(($(this).data('index') - 1));
            if (destiny.length > 0) landscapeScroll(slides, destiny);
        });

        function landscapeScroll(slides, destiny) {
            var destinyPos = destiny.position();
            var slidesContainer = slides.find('.slidesContainer').parent();
            var slideIndex = destiny.index();
            var section = slides.closest('.section');
            var sectionIndex = section.index('.section');
            var anchorLink = section.data('anchor');
            var slidesNav = section.find('.fullPage-slidesNav');
            var slideAnchor = destiny.data('anchor');
            var localIsResizing = isResizing;
            if (options.onSlideLeave) {
                var prevSlideIndex = section.find('.slide.active').index();
                var xMovement = getXmovement(prevSlideIndex, slideIndex);
                if (!localIsResizing) $.isFunction(options.onSlideLeave) && options.onSlideLeave.call(this, anchorLink, (sectionIndex + 1), prevSlideIndex, xMovement);
            }
            destiny.addClass('active').siblings().removeClass('active');
            if (typeof slideAnchor === 'undefined') slideAnchor = slideIndex;
            if (section.hasClass('active')) {
                if (!options.loopHorizontal) {
                    section.find('.controlArrow.prev').toggle(slideIndex != 0);
                    section.find('.controlArrow.next').toggle(slideIndex != 0);
                }
                setURLHash(slideIndex, slideAnchor, anchorLink);
            }
            if (options.css3) {
                var translate3d = 'translate3d(-' + destinyPos.left + 'px, 0px, 0px)';
                slides.find('.slidesContainer').addClass('instant').css({
                    '-webkit-transform': translate3d,
                    '-moz-transform': translate3d,
                    '-ms-transform': translate3d,
                    'transform': translate3d
                });
                setTimeout(function() {
                    if (!localIsResizing) $.isFunction(options.afterSlideLoad) && options.afterSlideLoad.call(this, anchorLink, (sectionIndex + 1), slideAnchor, slideIndex);
                    slideMoving = false;
                }, 0, options.easing);
            } else slidesContainer.animate({
                scrollLeft: destinyPos.left
            }, options.scrollingSpeed, options.easing, function() {
                if (!localIsResizing) $.isFunction(options.afterSlideLoad) && options.afterSlideLoad.call(this, anchorLink, (sectionIndex + 1), slideAnchor, slideIndex);
                slideMoving = false;
            });
            slidesNav.find('.active').removeClass('active');
            slidesNav.find('li').eq(slideIndex).find('a').addClass('active');
        }
        if (!isTablet) {
            var resizeId;
            $(window).resize(function() {
                clearTimeout(resizeId);
                resizeId = setTimeout(doneResizing, 500);
            });
        }
        $(window).bind('orientationchange', function() {
            doneResizing();
        });

        function doneResizing() {
            isResizing = true;
            var windowsWidth = $(window).width();
            windowsHeight = $(window).height();
            if (options.resize) resizeMe(windowsHeight, windowsWidth);
            $('.section').each(function() {
                var scrollHeight = windowsHeight - parseInt($(this).css('padding-bottom')) - parseInt($(this).css('padding-top'));
                if (options.scrollOverflow) {
                    var slides = $(this).find('.slide');
                    if (slides.length) slides.each(function() {
                        createSlimScrolling($(this));
                    });
                    else createSlimScrolling($(this));
                }
                if (options.verticalCentered) $(this).find('.tableCell').css('height', getTableHeight($(this)) + 'px');
                $(this).css('height', windowsHeight + 'px');
                var slides = $(this).find('.slides');
                if (slides.length) landscapeScroll(slides, slides.find('.slide.active'));
            });
            var destinyPos = $('.section.active').position();
            var activeSection = $('.section.active');
            if (activeSection.index('.section')) scrollPage(activeSection);
            isResizing = false;
        }

        function resizeMe(displayHeight, displayWidth) {
            var preferredHeight = 825;
            var windowSize = displayHeight;
            if (displayHeight < 825 || displayWidth < 900) {
                if (displayWidth < 900) {
                    windowSize = displayWidth;
                    preferredHeight = 900;
                }
                var percentage = (windowSize * 100) / preferredHeight;
                var newFontSize = percentage.toFixed(2);
                $("body").css("font-size", newFontSize + '%');
            } else $("body").css("font-size", '100%');
        }

        function activateNavDots(name, sectionIndex) {
            if (options.navigation) {
                $('#fullPage-nav').find('.active').removeClass('active');
                if (name) $('#fullPage-nav').find('a[href="#' + name + '"]').addClass('active');
                else $('#fullPage-nav').find('li').eq(sectionIndex).find('a').addClass('active');
            }
        }

        function activateMenuElement(name) {
            if (options.menu) {
                $(options.menu).find('.active').removeClass('active');
                $(options.menu).find('[data-menuanchor="' + name + '"]').addClass('active');
            }
        }

        function isScrolled(type, scrollable) {
            if (type === 'top') return !scrollable.scrollTop();
            else if (type === 'bottom') return scrollable.scrollTop() + scrollable.innerHeight() >= scrollable[0].scrollHeight;
        }

        function getYmovement(destiny) {
            var fromIndex = $('.section.active').index('.section');
            var toIndex = destiny.index('.section');
            if (fromIndex > toIndex) return 'up';
            return 'down';
        }

        function getXmovement(fromIndex, toIndex) {
            if (fromIndex > toIndex) return 'left';
            return 'right';
        }

        function createSlimScrolling(element) {
            element.css('overflow', 'hidden');
            var section = element.closest('.section');
            var scrollable = element.find('.scrollable');
            if (scrollable.length) var contentHeight = element.find('.scrollable').get(0).scrollHeight;
            else {
                var contentHeight = element.get(0).scrollHeight;
                if (options.verticalCentered) contentHeight = element.find('.tableCell').get(0).scrollHeight;
            }
            var scrollHeight = windowsHeight - parseInt(section.css('padding-bottom')) - parseInt(section.css('padding-top'));
            if (contentHeight > scrollHeight)
                if (scrollable.length) scrollable.css('height', scrollHeight + 'px').parent().css('height', scrollHeight + 'px');
                else {
                    if (options.verticalCentered) element.find('.tableCell').wrapInner('<div class="scrollable" />');
                    else element.wrapInner('<div class="scrollable" />');
                    element.find('.scrollable').slimScroll({
                        height: scrollHeight + 'px',
                        size: '10px',
                        alwaysVisible: true
                    });
                }
            else {
                element.find('.scrollable').children().first().unwrap().unwrap();
                element.find('.slimScrollBar').remove();
                element.find('.slimScrollRail').remove();
            }
            element.css('overflow', '');
        }

        function addTableClass(element) {
            element.addClass('table').wrapInner('<div class="tableCell" style="height:' + getTableHeight(element) + 'px;" />');
        }

        function getTableHeight(element) {
            var sectionHeight = windowsHeight;
            if (options.paddingTop || options.paddingBottom) {
                var section = element;
                if (!section.hasClass('section')) section = element.closest('.section');
                var paddings = parseInt(section.css('padding-top')) + parseInt(section.css('padding-bottom'));
                sectionHeight = (windowsHeight - paddings);
            }
            return sectionHeight;
        }

        function transformContainer(translate3d, animated) {
            $('#superContainer').toggleClass('easing', animated);
            $('#superContainer').css({
                '-webkit-transform': translate3d,
                '-moz-transform': translate3d,
                '-ms-transform': translate3d,
                'transform': translate3d
            });
        }

        function scrollPageAndSlide(destiny, slide) {
            if (typeof slide === 'undefined') slide = 0;
            if (isNaN(destiny)) var section = $('[data-anchor="' + destiny + '"]');
            else var section = $('.section').eq((destiny - 1));
            if (destiny !== lastScrolledDestiny && !section.hasClass('active')) scrollPage(section, function() {
                scrollSlider(section, slide);
            });
            else scrollSlider(section, slide);
        }

        function scrollSlider(section, slide) {
            if (typeof slide != 'undefined') {
                var slides = section.find('.slides');
                var destiny = slides.find('[data-anchor="' + slide + '"]');
                if (!destiny.length) destiny = slides.find('.slide').eq(slide);
                if (destiny.length) landscapeScroll(slides, destiny);
            }
        }

        function addSlidesNavigation(section, numSlides) {
            section.append('<div class="fullPage-slidesNav"><ul></ul></div>');
            var nav = section.find('.fullPage-slidesNav');
            nav.addClass(options.slidesNavPosition);
            for (var i = 0; i < numSlides; i++) nav.find('ul').append('<li><a href="#"><span></span></a></li>');
            nav.css('margin-left', '-' + (nav.width() / 2) + 'px');
            nav.find('li').first().find('a').addClass('active');
        }

        function setURLHash(slideIndex, slideAnchor, anchorLink) {
            var sectionHash = '';
            if (options.anchors.length)
                if (slideIndex) {
                    if (typeof anchorLink !== 'undefined') sectionHash = anchorLink;
                    if (typeof slideAnchor === 'undefined') slideAnchor = slideIndex;
                    lastScrolledSlide = slideAnchor;
                    window.location.replace('#' + sectionHash + '/' + slideAnchor);
                } else if (typeof slideIndex !== 'undefined') {
                lastScrolledSlide = slideAnchor;
                window.location.replace('#' + anchorLink);
            } else window.location.replace('#' + anchorLink);
        }
        $(document).on('click', '.fullPage-slidesNav a', function(e) {
            e.preventDefault();
            var slides = $(this).closest('.section').find('.slides');
            var destiny = slides.find('.slide').eq($(this).closest('li').index());
            landscapeScroll(slides, destiny);
        });

        function support3d() {
            var el = document.createElement('p'),
                has3d, transforms = {
                    'webkitTransform': '-webkit-transform',
                    'OTransform': '-o-transform',
                    'msTransform': '-ms-transform',
                    'MozTransform': '-moz-transform',
                    'transform': 'transform'
                };
            document.body.insertBefore(el, null);
            for (var t in transforms)
                if (el.style[t] !== undefined) {
                    el.style[t] = "translate3d(1px,1px,1px)";
                    has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
                }
            document.body.removeChild(el);
            return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
        }

        function removeMouseWheelHandler() {
            if (document.addEventListener) {
                document.removeEventListener('mousewheel', MouseWheelHandler, false);
                document.removeEventListener('wheel', MouseWheelHandler, false);
            } else document.detachEvent("onmousewheel", MouseWheelHandler);
        }

        function addMouseWheelHandler() {
            if (document.addEventListener) {
                document.addEventListener("mousewheel", MouseWheelHandler, false);
                document.addEventListener("wheel", MouseWheelHandler, false);
            } else document.attachEvent("onmousewheel", MouseWheelHandler);
        }

        function addTouchHandler() {
            if (isTablet) {
                $(document).off('touchstart MSPointerDown').on('touchstart MSPointerDown', touchStartHandler);
                $(document).off('touchmove MSPointerMove').on('touchmove MSPointerMove', touchMoveHandler);
            }
        }

        function removeTouchHandler() {
            if (isTablet) {
                $(document).off('touchstart MSPointerDown');
                $(document).off('touchmove MSPointerMove');
            }
        }

        function getEventsPage(e) {
            var events = new Array();
            if (window.navigator.msPointerEnabled) {
                events.y = e.pageY;
                events.x = e.pageX;
            } else {
                events.y = e.touches[0].pageY;
                events.x = e.touches[0].pageX;
            }
            return events;
        }

        function silentScroll(top) {
            if (options.css3) {
                var translate3d = 'translate3d(0px, -' + top + 'px, 0px)';
                transformContainer(translate3d, false);
            } else $("#superContainer").css("top", -top);
        }
    };
})(jQuery);
(function(root, factory) {
    if (typeof define === 'function' && define.amd) define(['jquery'], factory);
    else if (typeof exports === 'object') factory(require('jquery'));
    else if (root.jQuery) factory(root.jQuery);
    else factory(root.Zepto);
}(this, function($, undefined) {
    $.fn.jPlayer = function(options) {
        var name = "jPlayer";
        var isMethodCall = typeof options === "string",
            args = Array.prototype.slice.call(arguments, 1),
            returnValue = this;
        options = !isMethodCall && args.length ? $.extend.apply(null, [true, options].concat(args)) : options;
        if (isMethodCall && options.charAt(0) === "_") return returnValue;
        if (isMethodCall) {
            this.each(function() {
                var instance = $(this).data(name),
                    methodValue = instance && $.isFunction(instance[options]) ? instance[options].apply(instance, args) : instance;
                if (methodValue !== instance && methodValue !== undefined) {
                    returnValue = methodValue;
                    return false;
                }
            });
        } else this.each(function() {
            var instance = $(this).data(name);
            if (instance) instance.option(options || {});
            else $(this).data(name, new $.jPlayer(options, this));
        });
        return returnValue;
    };
    $.jPlayer = function(options, element) {
        if (arguments.length) {
            this.element = $(element);
            this.options = $.extend(true, {}, this.options, options);
            var self = this;
            this.element.bind("remove.jPlayer", function() {
                self.destroy();
            });
            this._init();
        }
    };
    if (typeof $.fn.stop !== 'function') $.fn.stop = function() {};
    $.jPlayer.emulateMethods = "load play pause";
    $.jPlayer.emulateStatus = "src readyState networkState currentTime duration paused ended playbackRate";
    $.jPlayer.emulateOptions = "muted volume";
    $.jPlayer.reservedEvent = "ready flashreset resize repeat error warning";
    $.jPlayer.event = {};
    $.each(['ready', 'setmedia', 'flashreset', 'resize', 'repeat', 'click', 'error', 'warning', 'loadstart', 'progress', 'suspend', 'abort', 'emptied', 'stalled', 'play', 'pause', 'loadedmetadata', 'loadeddata', 'waiting', 'playing', 'canplay', 'canplaythrough', 'seeking', 'seeked', 'timeupdate', 'ended', 'ratechange', 'durationchange', 'volumechange'], function() {
        $.jPlayer.event[this] = 'jPlayer_' + this;
    });
    $.jPlayer.htmlEvent = ["loadstart", "abort", "emptied", "stalled", "loadedmetadata", "canplay", "canplaythrough"];
    $.jPlayer.pause = function() {
        $.jPlayer.prototype.destroyRemoved();
        $.each($.jPlayer.prototype.instances, function(i, element) {
            if (element.data("jPlayer").status.srcSet) element.jPlayer("pause");
        });
    };
    $.jPlayer.timeFormat = {
        showHour: false,
        showMin: true,
        showSec: true,
        padHour: false,
        padMin: true,
        padSec: true,
        sepHour: ":",
        sepMin: ":",
        sepSec: ""
    };
    var ConvertTime = function() {
        this.init();
    };
    ConvertTime.prototype = {
        init: function() {
            this.options = {
                timeFormat: $.jPlayer.timeFormat
            };
        },
        time: function(s) {
            s = (s && typeof s === 'number') ? s : 0;
            var myTime = new Date(s * 1000),
                hour = myTime.getUTCHours(),
                min = this.options.timeFormat.showHour ? myTime.getUTCMinutes() : myTime.getUTCMinutes() + hour * 60,
                sec = this.options.timeFormat.showMin ? myTime.getUTCSeconds() : myTime.getUTCSeconds() + min * 60,
                strHour = (this.options.timeFormat.padHour && hour < 10) ? "0" + hour : hour,
                strMin = (this.options.timeFormat.padMin && min < 10) ? "0" + min : min,
                strSec = (this.options.timeFormat.padSec && sec < 10) ? "0" + sec : sec,
                strTime = "";
            strTime += this.options.timeFormat.showHour ? strHour + this.options.timeFormat.sepHour : "";
            strTime += this.options.timeFormat.showMin ? strMin + this.options.timeFormat.sepMin : "";
            strTime += this.options.timeFormat.showSec ? strSec + this.options.timeFormat.sepSec : "";
            return strTime;
        }
    };
    var myConvertTime = new ConvertTime();
    $.jPlayer.convertTime = function(s) {
        return myConvertTime.time(s);
    };
    $.jPlayer.uaBrowser = function(userAgent) {
        var ua = userAgent.toLowerCase();
        var rwebkit = /(webkit)[ \/]([\w.]+)/;
        var ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
        var rmsie = /(msie) ([\w.]+)/;
        var rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;
        var match = rwebkit.exec(ua) || ropera.exec(ua) || rmsie.exec(ua) || ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || [];
        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    };
    $.jPlayer.uaPlatform = function(userAgent) {
        var ua = userAgent.toLowerCase();
        var rplatform = /(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/;
        var rtablet = /(ipad|playbook)/;
        var randroid = /(android)/;
        var rmobile = /(mobile)/;
        var platform = rplatform.exec(ua) || [];
        var tablet = rtablet.exec(ua) || !rmobile.exec(ua) && randroid.exec(ua) || [];
        if (platform[1]) platform[1] = platform[1].replace(/\s/g, "_");
        return {
            platform: platform[1] || "",
            tablet: tablet[1] || ""
        };
    };
    $.jPlayer.browser = {};
    $.jPlayer.platform = {};
    var browserMatch = $.jPlayer.uaBrowser(navigator.userAgent);
    if (browserMatch.browser) {
        $.jPlayer.browser[browserMatch.browser] = true;
        $.jPlayer.browser.version = browserMatch.version;
    }
    var platformMatch = $.jPlayer.uaPlatform(navigator.userAgent);
    if (platformMatch.platform) {
        $.jPlayer.platform[platformMatch.platform] = true;
        $.jPlayer.platform.mobile = !platformMatch.tablet;
        $.jPlayer.platform.tablet = !!platformMatch.tablet;
    }
    $.jPlayer.getDocMode = function() {
        var docMode;
        if ($.jPlayer.browser.msie)
            if (document.documentMode) docMode = document.documentMode;
            else {
                docMode = 5;
                if (document.compatMode)
                    if (document.compatMode === "CSS1Compat") docMode = 7;
            }
        return docMode;
    };
    $.jPlayer.browser.documentMode = $.jPlayer.getDocMode();
    $.jPlayer.nativeFeatures = {
        init: function() {
            var d = document,
                v = d.createElement('video'),
                spec = {
                    w3c: ['fullscreenEnabled', 'fullscreenElement', 'requestFullscreen', 'exitFullscreen', 'fullscreenchange', 'fullscreenerror'],
                    moz: ['mozFullScreenEnabled', 'mozFullScreenElement', 'mozRequestFullScreen', 'mozCancelFullScreen', 'mozfullscreenchange', 'mozfullscreenerror'],
                    webkit: ['', 'webkitCurrentFullScreenElement', 'webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitfullscreenchange', ''],
                    webkitVideo: ['webkitSupportsFullscreen', 'webkitDisplayingFullscreen', 'webkitEnterFullscreen', 'webkitExitFullscreen', '', ''],
                    ms: ['', 'msFullscreenElement', 'msRequestFullscreen', 'msExitFullscreen', 'MSFullscreenChange', 'MSFullscreenError']
                },
                specOrder = ['w3c', 'moz', 'webkit', 'webkitVideo', 'ms'],
                fs, i, il;
            this.fullscreen = fs = {
                support: {
                    w3c: !!d[spec.w3c[0]],
                    moz: !!d[spec.moz[0]],
                    webkit: typeof d[spec.webkit[3]] === 'function',
                    webkitVideo: typeof v[spec.webkitVideo[2]] === 'function',
                    ms: typeof v[spec.ms[2]] === 'function'
                },
                used: {}
            };
            for (i = 0, il = specOrder.length; i < il; i++) {
                var n = specOrder[i];
                if (fs.support[n]) {
                    fs.spec = n;
                    fs.used[n] = true;
                    break;
                }
            }
            if (fs.spec) {
                var s = spec[fs.spec];
                fs.api = {
                    fullscreenEnabled: true,
                    fullscreenElement: function(elem) {
                        elem = elem ? elem : d;
                        return elem[s[1]];
                    },
                    requestFullscreen: function(elem) {
                        return elem[s[2]]();
                    },
                    exitFullscreen: function(elem) {
                        elem = elem ? elem : d;
                        return elem[s[3]]();
                    }
                };
                fs.event = {
                    fullscreenchange: s[4],
                    fullscreenerror: s[5]
                };
            } else {
                fs.api = {
                    fullscreenEnabled: false,
                    fullscreenElement: function() {
                        return null;
                    },
                    requestFullscreen: function() {},
                    exitFullscreen: function() {}
                };
                fs.event = {};
            }
        }
    };
    $.jPlayer.nativeFeatures.init();
    $.jPlayer.focus = null;
    $.jPlayer.keyIgnoreElementNames = "A INPUT TEXTAREA SELECT BUTTON";
    var keyBindings = function(event) {
        var f = $.jPlayer.focus,
            ignoreKey;
        if (f) {
            $.each($.jPlayer.keyIgnoreElementNames.split(/\s+/g), function(i, name) {
                if (event.target.nodeName.toUpperCase() === name.toUpperCase()) {
                    ignoreKey = true;
                    return false;
                }
            });
            if (!ignoreKey) $.each(f.options.keyBindings, function(action, binding) {
                if ((binding && $.isFunction(binding.fn)) && ((typeof binding.key === 'number' && event.which === binding.key) || (typeof binding.key === 'string' && event.key === binding.key))) {
                    event.preventDefault();
                    binding.fn(f);
                    return false;
                }
            });
        }
    };
    $.jPlayer.keys = function(en) {
        var event = "keydown.jPlayer";
        $(document.documentElement).unbind(event);
        if (en) $(document.documentElement).bind(event, keyBindings);
    };
    $.jPlayer.keys(true);
    $.jPlayer.prototype = {
        count: 0,
        version: {
            script: "2.9.2",
            needFlash: "2.9.0",
            flash: "unknown"
        },
        options: {
            swfPath: "js",
            solution: "html, flash",
            supplied: "mp3",
            auroraFormats: "wav",
            preload: 'metadata',
            volume: 0.8,
            muted: false,
            remainingDuration: false,
            toggleDuration: false,
            captureDuration: true,
            playbackRate: 1,
            defaultPlaybackRate: 1,
            minPlaybackRate: 0.5,
            maxPlaybackRate: 4,
            wmode: "opaque",
            backgroundColor: "#000000",
            cssSelectorAncestor: "#jp_container_1",
            cssSelector: {
                videoPlay: ".jp-video-play",
                play: ".jp-play",
                pause: ".jp-pause",
                stop: ".jp-stop",
                seekBar: ".jp-seek-bar",
                playBar: ".jp-play-bar",
                mute: ".jp-mute",
                unmute: ".jp-unmute",
                volumeBar: ".jp-volume-bar",
                volumeBarValue: ".jp-volume-bar-value",
                volumeMax: ".jp-volume-max",
                playbackRateBar: ".jp-playback-rate-bar",
                playbackRateBarValue: ".jp-playback-rate-bar-value",
                currentTime: ".jp-current-time",
                duration: ".jp-duration",
                title: ".jp-title",
                fullScreen: ".jp-full-screen",
                restoreScreen: ".jp-restore-screen",
                repeat: ".jp-repeat",
                repeatOff: ".jp-repeat-off",
                gui: ".jp-gui",
                noSolution: ".jp-no-solution"
            },
            stateClass: {
                playing: "jp-state-playing",
                seeking: "jp-state-seeking",
                muted: "jp-state-muted",
                looped: "jp-state-looped",
                fullScreen: "jp-state-full-screen",
                noVolume: "jp-state-no-volume"
            },
            useStateClassSkin: false,
            autoBlur: true,
            smoothPlayBar: false,
            fullScreen: false,
            fullWindow: false,
            autohide: {
                restored: false,
                full: true,
                fadeIn: 200,
                fadeOut: 600,
                hold: 1000
            },
            loop: false,
            repeat: function(event) {
                if (event.jPlayer.options.loop) $(this).unbind(".jPlayerRepeat").bind($.jPlayer.event.ended + ".jPlayer.jPlayerRepeat", function() {
                    $(this).jPlayer("play");
                });
                else $(this).unbind(".jPlayerRepeat");
            },
            nativeVideoControls: {},
            noFullWindow: {
                msie: /msie [0-6]\./,
                ipad: /ipad.*?os [0-4]\./,
                iphone: /iphone/,
                ipod: /ipod/,
                android_pad: /android [0-3]\.(?!.*?mobile)/,
                android_phone: /(?=.*android)(?!.*chrome)(?=.*mobile)/,
                blackberry: /blackberry/,
                windows_ce: /windows ce/,
                iemobile: /iemobile/,
                webos: /webos/
            },
            noVolume: {
                ipad: /ipad/,
                iphone: /iphone/,
                ipod: /ipod/,
                android_pad: /android(?!.*?mobile)/,
                android_phone: /android.*?mobile/,
                blackberry: /blackberry/,
                windows_ce: /windows ce/,
                iemobile: /iemobile/,
                webos: /webos/,
                playbook: /playbook/
            },
            timeFormat: {},
            keyEnabled: false,
            audioFullScreen: false,
            keyBindings: {
                play: {
                    key: 80,
                    fn: function(f) {
                        if (f.status.paused) f.play();
                        else f.pause();
                    }
                },
                fullScreen: {
                    key: 70,
                    fn: function(f) {
                        if (f.status.video || f.options.audioFullScreen) f._setOption("fullScreen", !f.options.fullScreen);
                    }
                },
                muted: {
                    key: 77,
                    fn: function(f) {
                        f._muted(!f.options.muted);
                    }
                },
                volumeUp: {
                    key: 190,
                    fn: function(f) {
                        f.volume(f.options.volume + 0.1);
                    }
                },
                volumeDown: {
                    key: 188,
                    fn: function(f) {
                        f.volume(f.options.volume - 0.1);
                    }
                },
                loop: {
                    key: 76,
                    fn: function(f) {
                        f._loop(!f.options.loop);
                    }
                }
            },
            verticalVolume: false,
            verticalPlaybackRate: false,
            globalVolume: false,
            idPrefix: "jp",
            noConflict: "jQuery",
            emulateHtml: false,
            consoleAlerts: true,
            errorAlerts: false,
            warningAlerts: false
        },
        optionsAudio: {
            size: {
                width: "0px",
                height: "0px",
                cssClass: ""
            },
            sizeFull: {
                width: "0px",
                height: "0px",
                cssClass: ""
            }
        },
        optionsVideo: {
            size: {
                width: "480px",
                height: "270px",
                cssClass: "jp-video-270p"
            },
            sizeFull: {
                width: "100%",
                height: "100%",
                cssClass: "jp-video-full"
            }
        },
        instances: {},
        status: {
            src: "",
            media: {},
            paused: true,
            format: {},
            formatType: "",
            waitForPlay: true,
            waitForLoad: true,
            srcSet: false,
            video: false,
            seekPercent: 0,
            currentPercentRelative: 0,
            currentPercentAbsolute: 0,
            currentTime: 0,
            duration: 0,
            remaining: 0,
            videoWidth: 0,
            videoHeight: 0,
            readyState: 0,
            networkState: 0,
            playbackRate: 1,
            ended: 0
        },
        internal: {
            ready: false
        },
        solution: {
            html: true,
            aurora: true,
            flash: true
        },
        format: {
            mp3: {
                codec: 'audio/mpeg',
                flashCanPlay: true,
                media: 'audio'
            },
            m4a: {
                codec: 'audio/mp4; codecs="mp4a.40.2"',
                flashCanPlay: true,
                media: 'audio'
            },
            m3u8a: {
                codec: 'application/vnd.apple.mpegurl; codecs="mp4a.40.2"',
                flashCanPlay: false,
                media: 'audio'
            },
            m3ua: {
                codec: 'audio/mpegurl',
                flashCanPlay: false,
                media: 'audio'
            },
            oga: {
                codec: 'audio/ogg; codecs="vorbis, opus"',
                flashCanPlay: false,
                media: 'audio'
            },
            flac: {
                codec: 'audio/x-flac',
                flashCanPlay: false,
                media: 'audio'
            },
            wav: {
                codec: 'audio/wav; codecs="1"',
                flashCanPlay: false,
                media: 'audio'
            },
            webma: {
                codec: 'audio/webm; codecs="vorbis"',
                flashCanPlay: false,
                media: 'audio'
            },
            fla: {
                codec: 'audio/x-flv',
                flashCanPlay: true,
                media: 'audio'
            },
            rtmpa: {
                codec: 'audio/rtmp; codecs="rtmp"',
                flashCanPlay: true,
                media: 'audio'
            },
            m4v: {
                codec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
                flashCanPlay: true,
                media: 'video'
            },
            m3u8v: {
                codec: 'application/vnd.apple.mpegurl; codecs="avc1.42E01E, mp4a.40.2"',
                flashCanPlay: false,
                media: 'video'
            },
            m3uv: {
                codec: 'audio/mpegurl',
                flashCanPlay: false,
                media: 'video'
            },
            ogv: {
                codec: 'video/ogg; codecs="theora, vorbis"',
                flashCanPlay: false,
                media: 'video'
            },
            webmv: {
                codec: 'video/webm; codecs="vorbis, vp8"',
                flashCanPlay: false,
                media: 'video'
            },
            flv: {
                codec: 'video/x-flv',
                flashCanPlay: true,
                media: 'video'
            },
            rtmpv: {
                codec: 'video/rtmp; codecs="rtmp"',
                flashCanPlay: true,
                media: 'video'
            }
        },
        _init: function() {
            var self = this;
            this.element.empty();
            this.status = $.extend({}, this.status);
            this.internal = $.extend({}, this.internal);
            this.options.timeFormat = $.extend({}, $.jPlayer.timeFormat, this.options.timeFormat);
            this.internal.cmdsIgnored = $.jPlayer.platform.ipad || $.jPlayer.platform.iphone || $.jPlayer.platform.ipod;
            this.internal.domNode = this.element.get(0);
            if (this.options.keyEnabled && !$.jPlayer.focus) $.jPlayer.focus = this;
            this.androidFix = {
                setMedia: false,
                play: false,
                pause: false,
                time: NaN
            };
            if ($.jPlayer.platform.android) this.options.preload = this.options.preload !== 'auto' ? 'metadata' : 'auto';
            this.formats = [];
            this.solutions = [];
            this.require = {};
            this.htmlElement = {};
            this.html = {};
            this.html.audio = {};
            this.html.video = {};
            this.aurora = {};
            this.aurora.formats = [];
            this.aurora.properties = [];
            this.flash = {};
            this.css = {};
            this.css.cs = {};
            this.css.jq = {};
            this.ancestorJq = [];
            this.options.volume = this._limitValue(this.options.volume, 0, 1);
            $.each(this.options.supplied.toLowerCase().split(","), function(index1, value1) {
                var format = value1.replace(/^\s+|\s+$/g, "");
                if (self.format[format]) {
                    var dupFound = false;
                    $.each(self.formats, function(index2, value2) {
                        if (format === value2) {
                            dupFound = true;
                            return false;
                        }
                    });
                    if (!dupFound) self.formats.push(format);
                }
            });
            $.each(this.options.solution.toLowerCase().split(","), function(index1, value1) {
                var solution = value1.replace(/^\s+|\s+$/g, "");
                if (self.solution[solution]) {
                    var dupFound = false;
                    $.each(self.solutions, function(index2, value2) {
                        if (solution === value2) {
                            dupFound = true;
                            return false;
                        }
                    });
                    if (!dupFound) self.solutions.push(solution);
                }
            });
            $.each(this.options.auroraFormats.toLowerCase().split(","), function(index1, value1) {
                var format = value1.replace(/^\s+|\s+$/g, "");
                if (self.format[format]) {
                    var dupFound = false;
                    $.each(self.aurora.formats, function(index2, value2) {
                        if (format === value2) {
                            dupFound = true;
                            return false;
                        }
                    });
                    if (!dupFound) self.aurora.formats.push(format);
                }
            });
            this.internal.instance = "jp_" + this.count;
            this.instances[this.internal.instance] = this.element;
            if (!this.element.attr("id")) this.element.attr("id", this.options.idPrefix + "_jplayer_" + this.count);
            this.internal.self = $.extend({}, {
                id: this.element.attr("id"),
                jq: this.element
            });
            this.internal.audio = $.extend({}, {
                id: this.options.idPrefix + "_audio_" + this.count,
                jq: undefined
            });
            this.internal.video = $.extend({}, {
                id: this.options.idPrefix + "_video_" + this.count,
                jq: undefined
            });
            this.internal.flash = $.extend({}, {
                id: this.options.idPrefix + "_flash_" + this.count,
                jq: undefined,
                swf: this.options.swfPath + (this.options.swfPath.toLowerCase().slice(-4) !== ".swf" ? (this.options.swfPath && this.options.swfPath.slice(-1) !== "/" ? "/" : "") + "jquery.jplayer.swf" : "")
            });
            this.internal.poster = $.extend({}, {
                id: this.options.idPrefix + "_poster_" + this.count,
                jq: undefined
            });
            $.each($.jPlayer.event, function(eventName, eventType) {
                if (self.options[eventName] !== undefined) {
                    self.element.bind(eventType + ".jPlayer", self.options[eventName]);
                    self.options[eventName] = undefined;
                }
            });
            this.require.audio = false;
            this.require.video = false;
            $.each(this.formats, function(priority, format) {
                self.require[self.format[format].media] = true;
            });
            if (this.require.video) this.options = $.extend(true, {}, this.optionsVideo, this.options);
            else this.options = $.extend(true, {}, this.optionsAudio, this.options);
            this._setSize();
            this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
            this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow);
            this.status.noVolume = this._uaBlocklist(this.options.noVolume);
            if ($.jPlayer.nativeFeatures.fullscreen.api.fullscreenEnabled) this._fullscreenAddEventListeners();
            this._restrictNativeVideoControls();
            this.htmlElement.poster = document.createElement('img');
            this.htmlElement.poster.id = this.internal.poster.id;
            this.htmlElement.poster.onload = function() {
                if (!self.status.video || self.status.waitForPlay) self.internal.poster.jq.show();
            };
            this.element.append(this.htmlElement.poster);
            this.internal.poster.jq = $("#" + this.internal.poster.id);
            this.internal.poster.jq.css({
                'width': this.status.width,
                'height': this.status.height
            });
            this.internal.poster.jq.hide();
            this.internal.poster.jq.bind("click.jPlayer", function() {
                self._trigger($.jPlayer.event.click);
            });
            this.html.audio.available = false;
            if (this.require.audio) {
                this.htmlElement.audio = document.createElement('audio');
                this.htmlElement.audio.id = this.internal.audio.id;
                this.html.audio.available = !!this.htmlElement.audio.canPlayType && this._testCanPlayType(this.htmlElement.audio);
            }
            this.html.video.available = false;
            if (this.require.video) {
                this.htmlElement.video = document.createElement('video');
                this.htmlElement.video.id = this.internal.video.id;
                this.html.video.available = !!this.htmlElement.video.canPlayType && this._testCanPlayType(this.htmlElement.video);
            }
            this.flash.available = this._checkForFlash(10.1);
            this.html.canPlay = {};
            this.aurora.canPlay = {};
            this.flash.canPlay = {};
            $.each(this.formats, function(priority, format) {
                self.html.canPlay[format] = self.html[self.format[format].media].available && "" !== self.htmlElement[self.format[format].media].canPlayType(self.format[format].codec);
                self.aurora.canPlay[format] = ($.inArray(format, self.aurora.formats) > -1);
                self.flash.canPlay[format] = self.format[format].flashCanPlay && self.flash.available;
            });
            this.html.desired = false;
            this.aurora.desired = false;
            this.flash.desired = false;
            $.each(this.solutions, function(solutionPriority, solution) {
                if (solutionPriority === 0) self[solution].desired = true;
                else {
                    var audioCanPlay = false;
                    var videoCanPlay = false;
                    $.each(self.formats, function(formatPriority, format) {
                        if (self[self.solutions[0]].canPlay[format])
                            if (self.format[format].media === 'video') videoCanPlay = true;
                            else audioCanPlay = true;
                    });
                    self[solution].desired = (self.require.audio && !audioCanPlay) || (self.require.video && !videoCanPlay);
                }
            });
            this.html.support = {};
            this.aurora.support = {};
            this.flash.support = {};
            $.each(this.formats, function(priority, format) {
                self.html.support[format] = self.html.canPlay[format] && self.html.desired;
                self.aurora.support[format] = self.aurora.canPlay[format] && self.aurora.desired;
                self.flash.support[format] = self.flash.canPlay[format] && self.flash.desired;
            });
            this.html.used = false;
            this.aurora.used = false;
            this.flash.used = false;
            $.each(this.solutions, function(solutionPriority, solution) {
                $.each(self.formats, function(formatPriority, format) {
                    if (self[solution].support[format]) {
                        self[solution].used = true;
                        return false;
                    }
                });
            });
            this._resetActive();
            this._resetGate();
            this._cssSelectorAncestor(this.options.cssSelectorAncestor);
            if (!(this.html.used || this.aurora.used || this.flash.used)) {
                this._error({
                    type: $.jPlayer.error.NO_SOLUTION,
                    context: "{solution:'" + this.options.solution + "', supplied:'" + this.options.supplied + "'}",
                    message: $.jPlayer.errorMsg.NO_SOLUTION,
                    hint: $.jPlayer.errorHint.NO_SOLUTION
                });
                if (this.css.jq.noSolution.length) this.css.jq.noSolution.show();
            } else if (this.css.jq.noSolution.length) this.css.jq.noSolution.hide();
            if (this.flash.used) {
                var htmlObj, flashVars = 'jQuery=' + encodeURI(this.options.noConflict) + '&id=' + encodeURI(this.internal.self.id) + '&vol=' + this.options.volume + '&muted=' + this.options.muted;
                if ($.jPlayer.browser.msie && (Number($.jPlayer.browser.version) < 9 || $.jPlayer.browser.documentMode < 9)) {
                    var objStr = '<object id="' + this.internal.flash.id + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="0" height="0" tabindex="-1"></object>';
                    var paramStr = ['<param name="movie" value="' + this.internal.flash.swf + '" />', '<param name="FlashVars" value="' + flashVars + '" />', '<param name="allowScriptAccess" value="always" />', '<param name="bgcolor" value="' + this.options.backgroundColor + '" />', '<param name="wmode" value="' + this.options.wmode + '" />'];
                    htmlObj = document.createElement(objStr);
                    for (var i = 0; i < paramStr.length; i++) htmlObj.appendChild(document.createElement(paramStr[i]));
                } else {
                    var createParam = function(el, n, v) {
                        var p = document.createElement("param");
                        p.setAttribute("name", n);
                        p.setAttribute("value", v);
                        el.appendChild(p);
                    };
                    htmlObj = document.createElement("object");
                    htmlObj.setAttribute("id", this.internal.flash.id);
                    htmlObj.setAttribute("name", this.internal.flash.id);
                    htmlObj.setAttribute("data", this.internal.flash.swf);
                    htmlObj.setAttribute("type", "application/x-shockwave-flash");
                    htmlObj.setAttribute("width", "1");
                    htmlObj.setAttribute("height", "1");
                    htmlObj.setAttribute("tabindex", "-1");
                    createParam(htmlObj, "flashvars", flashVars);
                    createParam(htmlObj, "allowscriptaccess", "always");
                    createParam(htmlObj, "bgcolor", this.options.backgroundColor);
                    createParam(htmlObj, "wmode", this.options.wmode);
                }
                this.element.append(htmlObj);
                this.internal.flash.jq = $(htmlObj);
            }
            if (this.html.used && !this.flash.used) this.status.playbackRateEnabled = this._testPlaybackRate('audio');
            else this.status.playbackRateEnabled = false;
            this._updatePlaybackRate();
            if (this.html.used) {
                if (this.html.audio.available) {
                    this._addHtmlEventListeners(this.htmlElement.audio, this.html.audio);
                    this.element.append(this.htmlElement.audio);
                    this.internal.audio.jq = $("#" + this.internal.audio.id);
                }
                if (this.html.video.available) {
                    this._addHtmlEventListeners(this.htmlElement.video, this.html.video);
                    this.element.append(this.htmlElement.video);
                    this.internal.video.jq = $("#" + this.internal.video.id);
                    if (this.status.nativeVideoControls) this.internal.video.jq.css({
                        'width': this.status.width,
                        'height': this.status.height
                    });
                    else this.internal.video.jq.css({
                        'width': '0px',
                        'height': '0px'
                    });
                    this.internal.video.jq.bind("click.jPlayer", function() {
                        self._trigger($.jPlayer.event.click);
                    });
                }
            }
            if (this.aurora.used) {}
            if (this.options.emulateHtml) this._emulateHtmlBridge();
            if ((this.html.used || this.aurora.used) && !this.flash.used) setTimeout(function() {
                self.internal.ready = true;
                self.version.flash = "n/a";
                self._trigger($.jPlayer.event.repeat);
                self._trigger($.jPlayer.event.ready);
            }, 100);
            this._updateNativeVideoControls();
            if (this.css.jq.videoPlay.length) this.css.jq.videoPlay.hide();
            $.jPlayer.prototype.count++;
        },
        destroy: function() {
            this.clearMedia();
            this._removeUiClass();
            if (this.css.jq.currentTime.length) this.css.jq.currentTime.text("");
            if (this.css.jq.duration.length) this.css.jq.duration.text("");
            $.each(this.css.jq, function(fn, jq) {
                if (jq.length) jq.unbind(".jPlayer");
            });
            this.internal.poster.jq.unbind(".jPlayer");
            if (this.internal.video.jq) this.internal.video.jq.unbind(".jPlayer");
            this._fullscreenRemoveEventListeners();
            if (this === $.jPlayer.focus) $.jPlayer.focus = null;
            if (this.options.emulateHtml) this._destroyHtmlBridge();
            this.element.removeData("jPlayer");
            this.element.unbind(".jPlayer");
            this.element.empty();
            delete this.instances[this.internal.instance];
        },
        destroyRemoved: function() {
            var self = this;
            $.each(this.instances, function(i, element) {
                if (self.element !== element)
                    if (!element.data("jPlayer")) {
                        element.jPlayer("destroy");
                        delete self.instances[i];
                    }
            });
        },
        enable: function() {},
        disable: function() {},
        _testCanPlayType: function(elem) {
            try {
                elem.canPlayType(this.format.mp3.codec);
                return true;
            } catch (err) {
                return false;
            }
        },
        _testPlaybackRate: function(type) {
            var el, rate = 0.5;
            type = typeof type === 'string' ? type : 'audio';
            el = document.createElement(type);
            try {
                if ('playbackRate' in el) {
                    el.playbackRate = rate;
                    return el.playbackRate === rate;
                } else return false;
            } catch (err) {
                return false;
            }
        },
        _uaBlocklist: function(list) {
            var ua = navigator.userAgent.toLowerCase(),
                block = false;
            $.each(list, function(p, re) {
                if (re && re.test(ua)) {
                    block = true;
                    return false;
                }
            });
            return block;
        },
        _restrictNativeVideoControls: function() {
            if (this.require.audio)
                if (this.status.nativeVideoControls) {
                    this.status.nativeVideoControls = false;
                    this.status.noFullWindow = true;
                }
        },
        _updateNativeVideoControls: function() {
            if (this.html.video.available && this.html.used) {
                this.htmlElement.video.controls = this.status.nativeVideoControls;
                this._updateAutohide();
                if (this.status.nativeVideoControls && this.require.video) {
                    this.internal.poster.jq.hide();
                    this.internal.video.jq.css({
                        'width': this.status.width,
                        'height': this.status.height
                    });
                } else if (this.status.waitForPlay && this.status.video) {
                    this.internal.poster.jq.show();
                    this.internal.video.jq.css({
                        'width': '0px',
                        'height': '0px'
                    });
                }
            }
        },
        _addHtmlEventListeners: function(mediaElement, entity) {
            var self = this;
            mediaElement.preload = this.options.preload;
            mediaElement.muted = this.options.muted;
            mediaElement.volume = this.options.volume;
            if (this.status.playbackRateEnabled) {
                mediaElement.defaultPlaybackRate = this.options.defaultPlaybackRate;
                mediaElement.playbackRate = this.options.playbackRate;
            }
            mediaElement.addEventListener("progress", function() {
                if (entity.gate) {
                    if (self.internal.cmdsIgnored && this.readyState > 0) self.internal.cmdsIgnored = false;
                    self._getHtmlStatus(mediaElement);
                    self._updateInterface();
                    self._trigger($.jPlayer.event.progress);
                }
            }, false);
            mediaElement.addEventListener("loadeddata", function() {
                if (entity.gate) {
                    self.androidFix.setMedia = false;
                    if (self.androidFix.play) {
                        self.androidFix.play = false;
                        self.play(self.androidFix.time);
                    }
                    if (self.androidFix.pause) {
                        self.androidFix.pause = false;
                        self.pause(self.androidFix.time);
                    }
                    self._trigger($.jPlayer.event.loadeddata);
                }
            }, false);
            mediaElement.addEventListener("timeupdate", function() {
                if (entity.gate) {
                    self._getHtmlStatus(mediaElement);
                    self._updateInterface();
                    self._trigger($.jPlayer.event.timeupdate);
                }
            }, false);
            mediaElement.addEventListener("durationchange", function() {
                if (entity.gate) {
                    self._getHtmlStatus(mediaElement);
                    self._updateInterface();
                    self._trigger($.jPlayer.event.durationchange);
                }
            }, false);
            mediaElement.addEventListener("play", function() {
                if (entity.gate) {
                    self._updateButtons(true);
                    self._html_checkWaitForPlay();
                    self._trigger($.jPlayer.event.play);
                }
            }, false);
            mediaElement.addEventListener("playing", function() {
                if (entity.gate) {
                    self._updateButtons(true);
                    self._seeked();
                    self._trigger($.jPlayer.event.playing);
                }
            }, false);
            mediaElement.addEventListener("pause", function() {
                if (entity.gate) {
                    self._updateButtons(false);
                    self._trigger($.jPlayer.event.pause);
                }
            }, false);
            mediaElement.addEventListener("waiting", function() {
                if (entity.gate) {
                    self._seeking();
                    self._trigger($.jPlayer.event.waiting);
                }
            }, false);
            mediaElement.addEventListener("seeking", function() {
                if (entity.gate) {
                    self._seeking();
                    self._trigger($.jPlayer.event.seeking);
                }
            }, false);
            mediaElement.addEventListener("seeked", function() {
                if (entity.gate) {
                    self._seeked();
                    self._trigger($.jPlayer.event.seeked);
                }
            }, false);
            mediaElement.addEventListener("volumechange", function() {
                if (entity.gate) {
                    self.options.volume = mediaElement.volume;
                    self.options.muted = mediaElement.muted;
                    self._updateMute();
                    self._updateVolume();
                    self._trigger($.jPlayer.event.volumechange);
                }
            }, false);
            mediaElement.addEventListener("ratechange", function() {
                if (entity.gate) {
                    self.options.defaultPlaybackRate = mediaElement.defaultPlaybackRate;
                    self.options.playbackRate = mediaElement.playbackRate;
                    self._updatePlaybackRate();
                    self._trigger($.jPlayer.event.ratechange);
                }
            }, false);
            mediaElement.addEventListener("suspend", function() {
                if (entity.gate) {
                    self._seeked();
                    self._trigger($.jPlayer.event.suspend);
                }
            }, false);
            mediaElement.addEventListener("ended", function() {
                if (entity.gate) {
                    if (!$.jPlayer.browser.webkit) self.htmlElement.media.currentTime = 0;
                    self.htmlElement.media.pause();
                    self._updateButtons(false);
                    self._getHtmlStatus(mediaElement, true);
                    self._updateInterface();
                    self._trigger($.jPlayer.event.ended);
                }
            }, false);
            mediaElement.addEventListener("error", function() {
                if (entity.gate) {
                    self._updateButtons(false);
                    self._seeked();
                    if (self.status.srcSet) {
                        clearTimeout(self.internal.htmlDlyCmdId);
                        self.status.waitForLoad = true;
                        self.status.waitForPlay = true;
                        if (self.status.video && !self.status.nativeVideoControls) self.internal.video.jq.css({
                            'width': '0px',
                            'height': '0px'
                        });
                        if (self._validString(self.status.media.poster) && !self.status.nativeVideoControls) self.internal.poster.jq.show();
                        if (self.css.jq.videoPlay.length) self.css.jq.videoPlay.show();
                        self._error({
                            type: $.jPlayer.error.URL,
                            context: self.status.src,
                            message: $.jPlayer.errorMsg.URL,
                            hint: $.jPlayer.errorHint.URL
                        });
                    }
                }
            }, false);
            $.each($.jPlayer.htmlEvent, function(i, eventType) {
                mediaElement.addEventListener(this, function() {
                    if (entity.gate) self._trigger($.jPlayer.event[eventType]);
                }, false);
            });
        },
        _addAuroraEventListeners: function(player, entity) {
            var self = this;
            player.volume = this.options.volume * 100;
            player.on("progress", function() {
                if (entity.gate) {
                    if (self.internal.cmdsIgnored && this.readyState > 0) self.internal.cmdsIgnored = false;
                    self._getAuroraStatus(player);
                    self._updateInterface();
                    self._trigger($.jPlayer.event.progress);
                    if (player.duration > 0) self._trigger($.jPlayer.event.timeupdate);
                }
            }, false);
            player.on("ready", function() {
                if (entity.gate) self._trigger($.jPlayer.event.loadeddata);
            }, false);
            player.on("duration", function() {
                if (entity.gate) {
                    self._getAuroraStatus(player);
                    self._updateInterface();
                    self._trigger($.jPlayer.event.durationchange);
                }
            }, false);
            player.on("end", function() {
                if (entity.gate) {
                    self._updateButtons(false);
                    self._getAuroraStatus(player, true);
                    self._updateInterface();
                    self._trigger($.jPlayer.event.ended);
                }
            }, false);
            player.on("error", function() {
                if (entity.gate) {
                    self._updateButtons(false);
                    self._seeked();
                    if (self.status.srcSet) {
                        self.status.waitForLoad = true;
                        self.status.waitForPlay = true;
                        if (self.status.video && !self.status.nativeVideoControls) self.internal.video.jq.css({
                            'width': '0px',
                            'height': '0px'
                        });
                        if (self._validString(self.status.media.poster) && !self.status.nativeVideoControls) self.internal.poster.jq.show();
                        if (self.css.jq.videoPlay.length) self.css.jq.videoPlay.show();
                        self._error({
                            type: $.jPlayer.error.URL,
                            context: self.status.src,
                            message: $.jPlayer.errorMsg.URL,
                            hint: $.jPlayer.errorHint.URL
                        });
                    }
                }
            }, false);
        },
        _getHtmlStatus: function(media, override) {
            var ct = 0,
                cpa = 0,
                sp = 0,
                cpr = 0;
            if (isFinite(media.duration)) this.status.duration = media.duration;
            ct = media.currentTime;
            cpa = (this.status.duration > 0) ? 100 * ct / this.status.duration : 0;
            if ((typeof media.seekable === "object") && (media.seekable.length > 0)) {
                sp = (this.status.duration > 0) ? 100 * media.seekable.end(media.seekable.length - 1) / this.status.duration : 100;
                cpr = (this.status.duration > 0) ? 100 * media.currentTime / media.seekable.end(media.seekable.length - 1) : 0;
            } else {
                sp = 100;
                cpr = cpa;
            }
            if (override) {
                ct = 0;
                cpr = 0;
                cpa = 0;
            }
            this.status.seekPercent = sp;
            this.status.currentPercentRelative = cpr;
            this.status.currentPercentAbsolute = cpa;
            this.status.currentTime = ct;
            this.status.remaining = this.status.duration - this.status.currentTime;
            this.status.videoWidth = media.videoWidth;
            this.status.videoHeight = media.videoHeight;
            this.status.readyState = media.readyState;
            this.status.networkState = media.networkState;
            this.status.playbackRate = media.playbackRate;
            this.status.ended = media.ended;
        },
        _getAuroraStatus: function(player, override) {
            var ct = 0,
                cpa = 0,
                sp = 0,
                cpr = 0;
            this.status.duration = player.duration / 1000;
            ct = player.currentTime / 1000;
            cpa = (this.status.duration > 0) ? 100 * ct / this.status.duration : 0;
            if (player.buffered > 0) {
                sp = (this.status.duration > 0) ? (player.buffered * this.status.duration) / this.status.duration : 100;
                cpr = (this.status.duration > 0) ? ct / (player.buffered * this.status.duration) : 0;
            } else {
                sp = 100;
                cpr = cpa;
            }
            if (override) {
                ct = 0;
                cpr = 0;
                cpa = 0;
            }
            this.status.seekPercent = sp;
            this.status.currentPercentRelative = cpr;
            this.status.currentPercentAbsolute = cpa;
            this.status.currentTime = ct;
            this.status.remaining = this.status.duration - this.status.currentTime;
            this.status.readyState = 4;
            this.status.networkState = 0;
            this.status.playbackRate = 1;
            this.status.ended = false;
        },
        _resetStatus: function() {
            this.status = $.extend({}, this.status, $.jPlayer.prototype.status);
        },
        _trigger: function(eventType, error, warning) {
            var event = $.Event(eventType);
            event.jPlayer = {};
            event.jPlayer.version = $.extend({}, this.version);
            event.jPlayer.options = $.extend(true, {}, this.options);
            event.jPlayer.status = $.extend(true, {}, this.status);
            event.jPlayer.html = $.extend(true, {}, this.html);
            event.jPlayer.aurora = $.extend(true, {}, this.aurora);
            event.jPlayer.flash = $.extend(true, {}, this.flash);
            if (error) event.jPlayer.error = $.extend({}, error);
            if (warning) event.jPlayer.warning = $.extend({}, warning);
            this.element.trigger(event);
        },
        jPlayerFlashEvent: function(eventType, status) {
            if (eventType === $.jPlayer.event.ready)
                if (!this.internal.ready) {
                    this.internal.ready = true;
                    this.internal.flash.jq.css({
                        'width': '0px',
                        'height': '0px'
                    });
                    this.version.flash = status.version;
                    if (this.version.needFlash !== this.version.flash) this._error({
                        type: $.jPlayer.error.VERSION,
                        context: this.version.flash,
                        message: $.jPlayer.errorMsg.VERSION + this.version.flash,
                        hint: $.jPlayer.errorHint.VERSION
                    });
                    this._trigger($.jPlayer.event.repeat);
                    this._trigger(eventType);
                } else if (this.flash.gate) {
                if (this.status.srcSet) {
                    var currentTime = this.status.currentTime,
                        paused = this.status.paused;
                    this.setMedia(this.status.media);
                    this.volumeWorker(this.options.volume);
                    if (currentTime > 0)
                        if (paused) this.pause(currentTime);
                        else this.play(currentTime);
                }
                this._trigger($.jPlayer.event.flashreset);
            }
            if (this.flash.gate) switch (eventType) {
                case $.jPlayer.event.progress:
                    this._getFlashStatus(status);
                    this._updateInterface();
                    this._trigger(eventType);
                    break;
                case $.jPlayer.event.timeupdate:
                    this._getFlashStatus(status);
                    this._updateInterface();
                    this._trigger(eventType);
                    break;
                case $.jPlayer.event.play:
                    this._seeked();
                    this._updateButtons(true);
                    this._trigger(eventType);
                    break;
                case $.jPlayer.event.pause:
                    this._updateButtons(false);
                    this._trigger(eventType);
                    break;
                case $.jPlayer.event.ended:
                    this._updateButtons(false);
                    this._trigger(eventType);
                    break;
                case $.jPlayer.event.click:
                    this._trigger(eventType);
                    break;
                case $.jPlayer.event.error:
                    this.status.waitForLoad = true;
                    this.status.waitForPlay = true;
                    if (this.status.video) this.internal.flash.jq.css({
                        'width': '0px',
                        'height': '0px'
                    });
                    if (this._validString(this.status.media.poster)) this.internal.poster.jq.show();
                    if (this.css.jq.videoPlay.length && this.status.video) this.css.jq.videoPlay.show();
                    if (this.status.video) this._flash_setVideo(this.status.media);
                    else this._flash_setAudio(this.status.media);
                    this._updateButtons(false);
                    this._error({
                        type: $.jPlayer.error.URL,
                        context: status.src,
                        message: $.jPlayer.errorMsg.URL,
                        hint: $.jPlayer.errorHint.URL
                    });
                    break;
                case $.jPlayer.event.seeking:
                    this._seeking();
                    this._trigger(eventType);
                    break;
                case $.jPlayer.event.seeked:
                    this._seeked();
                    this._trigger(eventType);
                    break;
                case $.jPlayer.event.ready:
                    break;
                default:
                    this._trigger(eventType);
            }
            return false;
        },
        _getFlashStatus: function(status) {
            this.status.seekPercent = status.seekPercent;
            this.status.currentPercentRelative = status.currentPercentRelative;
            this.status.currentPercentAbsolute = status.currentPercentAbsolute;
            this.status.currentTime = status.currentTime;
            this.status.duration = status.duration;
            this.status.remaining = status.duration - status.currentTime;
            this.status.videoWidth = status.videoWidth;
            this.status.videoHeight = status.videoHeight;
            this.status.readyState = 4;
            this.status.networkState = 0;
            this.status.playbackRate = 1;
            this.status.ended = false;
        },
        _updateButtons: function(playing) {
            if (playing === undefined) playing = !this.status.paused;
            else this.status.paused = !playing;
            if (playing) this.addStateClass('playing');
            else this.removeStateClass('playing');
            if (!this.status.noFullWindow && this.options.fullWindow) this.addStateClass('fullScreen');
            else this.removeStateClass('fullScreen');
            if (this.options.loop) this.addStateClass('looped');
            else this.removeStateClass('looped');
            if (this.css.jq.play.length && this.css.jq.pause.length)
                if (playing) {
                    this.css.jq.play.hide();
                    this.css.jq.pause.show();
                } else {
                    this.css.jq.play.show();
                    this.css.jq.pause.hide();
                }
            if (this.css.jq.restoreScreen.length && this.css.jq.fullScreen.length)
                if (this.status.noFullWindow) {
                    this.css.jq.fullScreen.hide();
                    this.css.jq.restoreScreen.hide();
                } else if (this.options.fullWindow) {
                this.css.jq.fullScreen.hide();
                this.css.jq.restoreScreen.show();
            } else {
                this.css.jq.fullScreen.show();
                this.css.jq.restoreScreen.hide();
            }
            if (this.css.jq.repeat.length && this.css.jq.repeatOff.length)
                if (this.options.loop) {
                    this.css.jq.repeat.hide();
                    this.css.jq.repeatOff.show();
                } else {
                    this.css.jq.repeat.show();
                    this.css.jq.repeatOff.hide();
                }
        },
        _updateInterface: function() {
            if (this.css.jq.seekBar.length) this.css.jq.seekBar.width(this.status.seekPercent + "%");
            if (this.css.jq.playBar.length)
                if (this.options.smoothPlayBar) this.css.jq.playBar.stop().animate({
                    width: this.status.currentPercentAbsolute + "%"
                }, 250, "linear");
                else this.css.jq.playBar.width(this.status.currentPercentRelative + "%");
            var currentTimeText = '';
            if (this.css.jq.currentTime.length) {
                currentTimeText = this._convertTime(this.status.currentTime);
                if (currentTimeText !== this.css.jq.currentTime.text()) this.css.jq.currentTime.text(this._convertTime(this.status.currentTime));
            }
            var durationText = '',
                duration = this.status.duration,
                remaining = this.status.remaining;
            if (this.css.jq.duration.length) {
                if (typeof this.status.media.duration === 'string') durationText = this.status.media.duration;
                else {
                    if (typeof this.status.media.duration === 'number') {
                        duration = this.status.media.duration;
                        remaining = duration - this.status.currentTime;
                    }
                    if (this.options.remainingDuration) durationText = (remaining > 0 ? '-' : '') + this._convertTime(remaining);
                    else durationText = this._convertTime(duration);
                }
                if (durationText !== this.css.jq.duration.text()) this.css.jq.duration.text(durationText);
            }
        },
        _convertTime: ConvertTime.prototype.time,
        _seeking: function() {
            if (this.css.jq.seekBar.length) this.css.jq.seekBar.addClass("jp-seeking-bg");
            this.addStateClass('seeking');
        },
        _seeked: function() {
            if (this.css.jq.seekBar.length) this.css.jq.seekBar.removeClass("jp-seeking-bg");
            this.removeStateClass('seeking');
        },
        _resetGate: function() {
            this.html.audio.gate = false;
            this.html.video.gate = false;
            this.aurora.gate = false;
            this.flash.gate = false;
        },
        _resetActive: function() {
            this.html.active = false;
            this.aurora.active = false;
            this.flash.active = false;
        },
        _escapeHtml: function(s) {
            return s.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('"').join('&quot;');
        },
        _qualifyURL: function(url) {
            var el = document.createElement('div');
            el.innerHTML = '<a href="' + this._escapeHtml(url) + '">x</a>';
            return el.firstChild.href;
        },
        _absoluteMediaUrls: function(media) {
            var self = this;
            $.each(media, function(type, url) {
                if (url && self.format[type] && url.substr(0, 5) !== "data:") media[type] = self._qualifyURL(url);
            });
            return media;
        },
        addStateClass: function(state) {
            if (this.ancestorJq.length) this.ancestorJq.addClass(this.options.stateClass[state]);
        },
        removeStateClass: function(state) {
            if (this.ancestorJq.length) this.ancestorJq.removeClass(this.options.stateClass[state]);
        },
        setMedia: function(media) {
            var self = this,
                supported = false,
                posterChanged = this.status.media.poster !== media.poster;
            this._resetMedia();
            this._resetGate();
            this._resetActive();
            this.androidFix.setMedia = false;
            this.androidFix.play = false;
            this.androidFix.pause = false;
            media = this._absoluteMediaUrls(media);
            $.each(this.formats, function(formatPriority, format) {
                var isVideo = self.format[format].media === 'video';
                $.each(self.solutions, function(solutionPriority, solution) {
                    if (self[solution].support[format] && self._validString(media[format])) {
                        var isHtml = solution === 'html';
                        var isAurora = solution === 'aurora';
                        if (isVideo) {
                            if (isHtml) {
                                self.html.video.gate = true;
                                self._html_setVideo(media);
                                self.html.active = true;
                            } else {
                                self.flash.gate = true;
                                self._flash_setVideo(media);
                                self.flash.active = true;
                            }
                            if (self.css.jq.videoPlay.length) self.css.jq.videoPlay.show();
                            self.status.video = true;
                        } else {
                            if (isHtml) {
                                self.html.audio.gate = true;
                                self._html_setAudio(media);
                                self.html.active = true;
                                if ($.jPlayer.platform.android) self.androidFix.setMedia = true;
                            } else if (isAurora) {
                                self.aurora.gate = true;
                                self._aurora_setAudio(media);
                                self.aurora.active = true;
                            } else {
                                self.flash.gate = true;
                                self._flash_setAudio(media);
                                self.flash.active = true;
                            }
                            if (self.css.jq.videoPlay.length) self.css.jq.videoPlay.hide();
                            self.status.video = false;
                        }
                        supported = true;
                        return false;
                    }
                });
                if (supported) return false;
            });
            if (supported) {
                if (!(this.status.nativeVideoControls && this.html.video.gate))
                    if (this._validString(media.poster))
                        if (posterChanged) this.htmlElement.poster.src = media.poster;
                        else this.internal.poster.jq.show();
                if (typeof media.title === 'string') {
                    if (this.css.jq.title.length) this.css.jq.title.html(media.title);
                    if (this.htmlElement.audio) this.htmlElement.audio.setAttribute('title', media.title);
                    if (this.htmlElement.video) this.htmlElement.video.setAttribute('title', media.title);
                }
                this.status.srcSet = true;
                this.status.media = $.extend({}, media);
                this._updateButtons(false);
                this._updateInterface();
                this._trigger($.jPlayer.event.setmedia);
            } else this._error({
                type: $.jPlayer.error.NO_SUPPORT,
                context: "{supplied:'" + this.options.supplied + "'}",
                message: $.jPlayer.errorMsg.NO_SUPPORT,
                hint: $.jPlayer.errorHint.NO_SUPPORT
            });
        },
        _resetMedia: function() {
            this._resetStatus();
            this._updateButtons(false);
            this._updateInterface();
            this._seeked();
            this.internal.poster.jq.hide();
            clearTimeout(this.internal.htmlDlyCmdId);
            if (this.html.active) this._html_resetMedia();
            else if (this.aurora.active) this._aurora_resetMedia();
            else if (this.flash.active) this._flash_resetMedia();
        },
        clearMedia: function() {
            this._resetMedia();
            if (this.html.active) this._html_clearMedia();
            else if (this.aurora.active) this._aurora_clearMedia();
            else if (this.flash.active) this._flash_clearMedia();
            this._resetGate();
            this._resetActive();
        },
        load: function() {
            if (this.status.srcSet) {
                if (this.html.active) this._html_load();
                else if (this.aurora.active) this._aurora_load();
                else if (this.flash.active) this._flash_load();
            } else this._urlNotSetError("load");
        },
        focus: function() {
            if (this.options.keyEnabled) $.jPlayer.focus = this;
        },
        play: function(time) {
            var guiAction = typeof time === "object";
            if (guiAction && this.options.useStateClassSkin && !this.status.paused) this.pause(time);
            else {
                time = (typeof time === "number") ? time : NaN;
                if (this.status.srcSet) {
                    this.focus();
                    if (this.html.active) this._html_play(time);
                    else if (this.aurora.active) this._aurora_play(time);
                    else if (this.flash.active) this._flash_play(time);
                } else this._urlNotSetError("play");
            }
        },
        videoPlay: function() {
            this.play();
        },
        pause: function(time) {
            time = (typeof time === "number") ? time : NaN;
            if (this.status.srcSet) {
                if (this.html.active) this._html_pause(time);
                else if (this.aurora.active) this._aurora_pause(time);
                else if (this.flash.active) this._flash_pause(time);
            } else this._urlNotSetError("pause");
        },
        tellOthers: function(command, conditions) {
            var self = this,
                hasConditions = typeof conditions === 'function',
                args = Array.prototype.slice.call(arguments);
            if (typeof command !== 'string') return;
            if (hasConditions) args.splice(1, 1);
            $.jPlayer.prototype.destroyRemoved();
            $.each(this.instances, function() {
                if (self.element !== this)
                    if (!hasConditions || conditions.call(this.data("jPlayer"), self)) this.jPlayer.apply(this, args);
            });
        },
        pauseOthers: function(time) {
            this.tellOthers("pause", function() {
                return this.status.srcSet;
            }, time);
        },
        stop: function() {
            if (this.status.srcSet) {
                if (this.html.active) this._html_pause(0);
                else if (this.aurora.active) this._aurora_pause(0);
                else if (this.flash.active) this._flash_pause(0);
            } else this._urlNotSetError("stop");
        },
        playHead: function(p) {
            p = this._limitValue(p, 0, 100);
            if (this.status.srcSet) {
                if (this.html.active) this._html_playHead(p);
                else if (this.aurora.active) this._aurora_playHead(p);
                else if (this.flash.active) this._flash_playHead(p);
            } else this._urlNotSetError("playHead");
        },
        _muted: function(muted) {
            this.mutedWorker(muted);
            if (this.options.globalVolume) this.tellOthers("mutedWorker", function() {
                return this.options.globalVolume;
            }, muted);
        },
        mutedWorker: function(muted) {
            this.options.muted = muted;
            if (this.html.used) this._html_setProperty('muted', muted);
            if (this.aurora.used) this._aurora_mute(muted);
            if (this.flash.used) this._flash_mute(muted);
            if (!this.html.video.gate && !this.html.audio.gate) {
                this._updateMute(muted);
                this._updateVolume(this.options.volume);
                this._trigger($.jPlayer.event.volumechange);
            }
        },
        mute: function(mute) {
            var guiAction = typeof mute === "object";
            if (guiAction && this.options.useStateClassSkin && this.options.muted) this._muted(false);
            else {
                mute = mute === undefined ? true : !!mute;
                this._muted(mute);
            }
        },
        unmute: function(unmute) {
            unmute = unmute === undefined ? true : !!unmute;
            this._muted(!unmute);
        },
        _updateMute: function(mute) {
            if (mute === undefined) mute = this.options.muted;
            if (mute) this.addStateClass('muted');
            else this.removeStateClass('muted');
            if (this.css.jq.mute.length && this.css.jq.unmute.length)
                if (this.status.noVolume) {
                    this.css.jq.mute.hide();
                    this.css.jq.unmute.hide();
                } else if (mute) {
                this.css.jq.mute.hide();
                this.css.jq.unmute.show();
            } else {
                this.css.jq.mute.show();
                this.css.jq.unmute.hide();
            }
        },
        volume: function(v) {
            this.volumeWorker(v);
            if (this.options.globalVolume) this.tellOthers("volumeWorker", function() {
                return this.options.globalVolume;
            }, v);
        },
        volumeWorker: function(v) {
            v = this._limitValue(v, 0, 1);
            this.options.volume = v;
            if (this.html.used) this._html_setProperty('volume', v);
            if (this.aurora.used) this._aurora_volume(v);
            if (this.flash.used) this._flash_volume(v);
            if (!this.html.video.gate && !this.html.audio.gate) {
                this._updateVolume(v);
                this._trigger($.jPlayer.event.volumechange);
            }
        },
        volumeBar: function(e) {
            if (this.css.jq.volumeBar.length) {
                var $bar = $(e.currentTarget),
                    offset = $bar.offset(),
                    x = e.pageX - offset.left,
                    w = $bar.width(),
                    y = $bar.height() - e.pageY + offset.top,
                    h = $bar.height();
                if (this.options.verticalVolume) this.volume(y / h);
                else this.volume(x / w);
            }
            if (this.options.muted) this._muted(false);
        },
        _updateVolume: function(v) {
            if (v === undefined) v = this.options.volume;
            v = this.options.muted ? 0 : v;
            if (this.status.noVolume) {
                this.addStateClass('noVolume');
                if (this.css.jq.volumeBar.length) this.css.jq.volumeBar.hide();
                if (this.css.jq.volumeBarValue.length) this.css.jq.volumeBarValue.hide();
                if (this.css.jq.volumeMax.length) this.css.jq.volumeMax.hide();
            } else {
                this.removeStateClass('noVolume');
                if (this.css.jq.volumeBar.length) this.css.jq.volumeBar.show();
                if (this.css.jq.volumeBarValue.length) {
                    this.css.jq.volumeBarValue.show();
                    this.css.jq.volumeBarValue[this.options.verticalVolume ? "height" : "width"]((v * 100) + "%");
                }
                if (this.css.jq.volumeMax.length) this.css.jq.volumeMax.show();
            }
        },
        volumeMax: function() {
            this.volume(1);
            if (this.options.muted) this._muted(false);
        },
        _cssSelectorAncestor: function(ancestor) {
            var self = this;
            this.options.cssSelectorAncestor = ancestor;
            this._removeUiClass();
            this.ancestorJq = ancestor ? $(ancestor) : [];
            if (ancestor && this.ancestorJq.length !== 1) this._warning({
                type: $.jPlayer.warning.CSS_SELECTOR_COUNT,
                context: ancestor,
                message: $.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.ancestorJq.length + " found for cssSelectorAncestor.",
                hint: $.jPlayer.warningHint.CSS_SELECTOR_COUNT
            });
            this._addUiClass();
            $.each(this.options.cssSelector, function(fn, cssSel) {
                self._cssSelector(fn, cssSel);
            });
            this._updateInterface();
            this._updateButtons();
            this._updateAutohide();
            this._updateVolume();
            this._updateMute();
        },
        _cssSelector: function(fn, cssSel) {
            var self = this;
            if (typeof cssSel === 'string') {
                if ($.jPlayer.prototype.options.cssSelector[fn]) {
                    if (this.css.jq[fn] && this.css.jq[fn].length) this.css.jq[fn].unbind(".jPlayer");
                    this.options.cssSelector[fn] = cssSel;
                    this.css.cs[fn] = this.options.cssSelectorAncestor + " " + cssSel;
                    if (cssSel) this.css.jq[fn] = $(this.css.cs[fn]);
                    else this.css.jq[fn] = [];
                    if (this.css.jq[fn].length && this[fn]) {
                        var handler = function(e) {
                            e.preventDefault();
                            self[fn](e);
                            if (self.options.autoBlur) $(this).blur();
                            else $(this).focus();
                        };
                        this.css.jq[fn].bind("click.jPlayer", handler);
                    }
                    if (cssSel && this.css.jq[fn].length !== 1) this._warning({
                        type: $.jPlayer.warning.CSS_SELECTOR_COUNT,
                        context: this.css.cs[fn],
                        message: $.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.css.jq[fn].length + " found for " + fn + " method.",
                        hint: $.jPlayer.warningHint.CSS_SELECTOR_COUNT
                    });
                } else this._warning({
                    type: $.jPlayer.warning.CSS_SELECTOR_METHOD,
                    context: fn,
                    message: $.jPlayer.warningMsg.CSS_SELECTOR_METHOD,
                    hint: $.jPlayer.warningHint.CSS_SELECTOR_METHOD
                });
            } else this._warning({
                type: $.jPlayer.warning.CSS_SELECTOR_STRING,
                context: cssSel,
                message: $.jPlayer.warningMsg.CSS_SELECTOR_STRING,
                hint: $.jPlayer.warningHint.CSS_SELECTOR_STRING
            });
        },
        duration: function(e) {
            if (this.options.toggleDuration) {
                if (this.options.captureDuration) e.stopPropagation();
                this._setOption("remainingDuration", !this.options.remainingDuration);
            }
        },
        seekBar: function(e) {
            if (this.css.jq.seekBar.length) {
                var $bar = $(e.currentTarget),
                    offset = $bar.offset(),
                    x = e.pageX - offset.left,
                    w = $bar.width(),
                    p = 100 * x / w;
                this.playHead(p);
            }
        },
        playbackRate: function(pbr) {
            this._setOption("playbackRate", pbr);
        },
        playbackRateBar: function(e) {
            if (this.css.jq.playbackRateBar.length) {
                var $bar = $(e.currentTarget),
                    offset = $bar.offset(),
                    x = e.pageX - offset.left,
                    w = $bar.width(),
                    y = $bar.height() - e.pageY + offset.top,
                    h = $bar.height(),
                    ratio, pbr;
                if (this.options.verticalPlaybackRate) ratio = y / h;
                else ratio = x / w;
                pbr = ratio * (this.options.maxPlaybackRate - this.options.minPlaybackRate) + this.options.minPlaybackRate;
                this.playbackRate(pbr);
            }
        },
        _updatePlaybackRate: function() {
            var pbr = this.options.playbackRate,
                ratio = (pbr - this.options.minPlaybackRate) / (this.options.maxPlaybackRate - this.options.minPlaybackRate);
            if (this.status.playbackRateEnabled) {
                if (this.css.jq.playbackRateBar.length) this.css.jq.playbackRateBar.show();
                if (this.css.jq.playbackRateBarValue.length) {
                    this.css.jq.playbackRateBarValue.show();
                    this.css.jq.playbackRateBarValue[this.options.verticalPlaybackRate ? "height" : "width"]((ratio * 100) + "%");
                }
            } else {
                if (this.css.jq.playbackRateBar.length) this.css.jq.playbackRateBar.hide();
                if (this.css.jq.playbackRateBarValue.length) this.css.jq.playbackRateBarValue.hide();
            }
        },
        repeat: function(event) {
            var guiAction = typeof event === "object";
            if (guiAction && this.options.useStateClassSkin && this.options.loop) this._loop(false);
            else this._loop(true);
        },
        repeatOff: function() {
            this._loop(false);
        },
        _loop: function(loop) {
            if (this.options.loop !== loop) {
                this.options.loop = loop;
                this._updateButtons();
                this._trigger($.jPlayer.event.repeat);
            }
        },
        option: function(key, value) {
            var options = key;
            if (arguments.length === 0) return $.extend(true, {}, this.options);
            if (typeof key === "string") {
                var keys = key.split(".");
                if (value === undefined) {
                    var opt = $.extend(true, {}, this.options);
                    for (var i = 0; i < keys.length; i++)
                        if (opt[keys[i]] !== undefined) opt = opt[keys[i]];
                        else {
                            this._warning({
                                type: $.jPlayer.warning.OPTION_KEY,
                                context: key,
                                message: $.jPlayer.warningMsg.OPTION_KEY,
                                hint: $.jPlayer.warningHint.OPTION_KEY
                            });
                            return undefined;
                        }
                    return opt;
                }
                options = {};
                var opts = options;
                for (var j = 0; j < keys.length; j++)
                    if (j < keys.length - 1) {
                        opts[keys[j]] = {};
                        opts = opts[keys[j]];
                    } else opts[keys[j]] = value;
            }
            this._setOptions(options);
            return this;
        },
        _setOptions: function(options) {
            var self = this;
            $.each(options, function(key, value) {
                self._setOption(key, value);
            });
            return this;
        },
        _setOption: function(key, value) {
            var self = this;
            switch (key) {
                case "volume":
                    this.volume(value);
                    break;
                case "muted":
                    this._muted(value);
                    break;
                case "globalVolume":
                    this.options[key] = value;
                    break;
                case "cssSelectorAncestor":
                    this._cssSelectorAncestor(value);
                    break;
                case "cssSelector":
                    $.each(value, function(fn, cssSel) {
                        self._cssSelector(fn, cssSel);
                    });
                    break;
                case "playbackRate":
                    this.options[key] = value = this._limitValue(value, this.options.minPlaybackRate, this.options.maxPlaybackRate);
                    if (this.html.used) this._html_setProperty('playbackRate', value);
                    this._updatePlaybackRate();
                    break;
                case "defaultPlaybackRate":
                    this.options[key] = value = this._limitValue(value, this.options.minPlaybackRate, this.options.maxPlaybackRate);
                    if (this.html.used) this._html_setProperty('defaultPlaybackRate', value);
                    this._updatePlaybackRate();
                    break;
                case "minPlaybackRate":
                    this.options[key] = value = this._limitValue(value, 0.1, this.options.maxPlaybackRate - 0.1);
                    this._updatePlaybackRate();
                    break;
                case "maxPlaybackRate":
                    this.options[key] = value = this._limitValue(value, this.options.minPlaybackRate + 0.1, 16);
                    this._updatePlaybackRate();
                    break;
                case "fullScreen":
                    if (this.options[key] !== value) {
                        var wkv = $.jPlayer.nativeFeatures.fullscreen.used.webkitVideo;
                        if (!wkv || wkv && !this.status.waitForPlay) {
                            if (!wkv) this.options[key] = value;
                            if (value) this._requestFullscreen();
                            else this._exitFullscreen();
                            if (!wkv) this._setOption("fullWindow", value);
                        }
                    }
                    break;
                case "fullWindow":
                    if (this.options[key] !== value) {
                        this._removeUiClass();
                        this.options[key] = value;
                        this._refreshSize();
                    }
                    break;
                case "size":
                    if (!this.options.fullWindow && this.options[key].cssClass !== value.cssClass) this._removeUiClass();
                    this.options[key] = $.extend({}, this.options[key], value);
                    this._refreshSize();
                    break;
                case "sizeFull":
                    if (this.options.fullWindow && this.options[key].cssClass !== value.cssClass) this._removeUiClass();
                    this.options[key] = $.extend({}, this.options[key], value);
                    this._refreshSize();
                    break;
                case "autohide":
                    this.options[key] = $.extend({}, this.options[key], value);
                    this._updateAutohide();
                    break;
                case "loop":
                    this._loop(value);
                    break;
                case "remainingDuration":
                    this.options[key] = value;
                    this._updateInterface();
                    break;
                case "toggleDuration":
                    this.options[key] = value;
                    break;
                case "nativeVideoControls":
                    this.options[key] = $.extend({}, this.options[key], value);
                    this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
                    this._restrictNativeVideoControls();
                    this._updateNativeVideoControls();
                    break;
                case "noFullWindow":
                    this.options[key] = $.extend({}, this.options[key], value);
                    this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
                    this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow);
                    this._restrictNativeVideoControls();
                    this._updateButtons();
                    break;
                case "noVolume":
                    this.options[key] = $.extend({}, this.options[key], value);
                    this.status.noVolume = this._uaBlocklist(this.options.noVolume);
                    this._updateVolume();
                    this._updateMute();
                    break;
                case "emulateHtml":
                    if (this.options[key] !== value) {
                        this.options[key] = value;
                        if (value) this._emulateHtmlBridge();
                        else this._destroyHtmlBridge();
                    }
                    break;
                case "timeFormat":
                    this.options[key] = $.extend({}, this.options[key], value);
                    break;
                case "keyEnabled":
                    this.options[key] = value;
                    if (!value && this === $.jPlayer.focus) $.jPlayer.focus = null;
                    break;
                case "keyBindings":
                    this.options[key] = $.extend(true, {}, this.options[key], value);
                    break;
                case "audioFullScreen":
                    this.options[key] = value;
                    break;
                case "autoBlur":
                    this.options[key] = value;
                    break;
            }
            return this;
        },
        _refreshSize: function() {
            this._setSize();
            this._addUiClass();
            this._updateSize();
            this._updateButtons();
            this._updateAutohide();
            this._trigger($.jPlayer.event.resize);
        },
        _setSize: function() {
            if (this.options.fullWindow) {
                this.status.width = this.options.sizeFull.width;
                this.status.height = this.options.sizeFull.height;
                this.status.cssClass = this.options.sizeFull.cssClass;
            } else {
                this.status.width = this.options.size.width;
                this.status.height = this.options.size.height;
                this.status.cssClass = this.options.size.cssClass;
            }
            this.element.css({
                'width': this.status.width,
                'height': this.status.height
            });
        },
        _addUiClass: function() {
            if (this.ancestorJq.length) this.ancestorJq.addClass(this.status.cssClass);
        },
        _removeUiClass: function() {
            if (this.ancestorJq.length) this.ancestorJq.removeClass(this.status.cssClass);
        },
        _updateSize: function() {
            this.internal.poster.jq.css({
                'width': this.status.width,
                'height': this.status.height
            });
            if (!this.status.waitForPlay && this.html.active && this.status.video || this.html.video.available && this.html.used && this.status.nativeVideoControls) this.internal.video.jq.css({
                'width': this.status.width,
                'height': this.status.height
            });
            else if (!this.status.waitForPlay && this.flash.active && this.status.video) this.internal.flash.jq.css({
                'width': this.status.width,
                'height': this.status.height
            });
        },
        _updateAutohide: function() {
            var self = this,
                event = "mousemove.jPlayer",
                namespace = ".jPlayerAutohide",
                eventType = event + namespace,
                handler = function(event) {
                    var moved = false,
                        deltaX, deltaY;
                    if (typeof self.internal.mouse !== "undefined") {
                        deltaX = self.internal.mouse.x - event.pageX;
                        deltaY = self.internal.mouse.y - event.pageY;
                        moved = (Math.floor(deltaX) > 0) || (Math.floor(deltaY) > 0);
                    } else moved = true;
                    self.internal.mouse = {
                        x: event.pageX,
                        y: event.pageY
                    };
                    if (moved) self.css.jq.gui.fadeIn(self.options.autohide.fadeIn, function() {
                        clearTimeout(self.internal.autohideId);
                        self.internal.autohideId = setTimeout(function() {
                            self.css.jq.gui.fadeOut(self.options.autohide.fadeOut);
                        }, self.options.autohide.hold);
                    });
                };
            if (this.css.jq.gui.length) {
                this.css.jq.gui.stop(true, true);
                clearTimeout(this.internal.autohideId);
                delete this.internal.mouse;
                this.element.unbind(namespace);
                this.css.jq.gui.unbind(namespace);
                if (!this.status.nativeVideoControls)
                    if (this.options.fullWindow && this.options.autohide.full || !this.options.fullWindow && this.options.autohide.restored) {
                        this.element.bind(eventType, handler);
                        this.css.jq.gui.bind(eventType, handler);
                        this.css.jq.gui.hide();
                    } else this.css.jq.gui.show();
                else this.css.jq.gui.hide();
            }
        },
        fullScreen: function(event) {
            var guiAction = typeof event === "object";
            if (guiAction && this.options.useStateClassSkin && this.options.fullScreen) this._setOption("fullScreen", false);
            else this._setOption("fullScreen", true);
        },
        restoreScreen: function() {
            this._setOption("fullScreen", false);
        },
        _fullscreenAddEventListeners: function() {
            var self = this,
                fs = $.jPlayer.nativeFeatures.fullscreen;
            if (fs.api.fullscreenEnabled)
                if (fs.event.fullscreenchange) {
                    if (typeof this.internal.fullscreenchangeHandler !== 'function') this.internal.fullscreenchangeHandler = function() {
                        self._fullscreenchange();
                    };
                    document.addEventListener(fs.event.fullscreenchange, this.internal.fullscreenchangeHandler, false);
                }
        },
        _fullscreenRemoveEventListeners: function() {
            var fs = $.jPlayer.nativeFeatures.fullscreen;
            if (this.internal.fullscreenchangeHandler) document.removeEventListener(fs.event.fullscreenchange, this.internal.fullscreenchangeHandler, false);
        },
        _fullscreenchange: function() {
            if (this.options.fullScreen && !$.jPlayer.nativeFeatures.fullscreen.api.fullscreenElement()) this._setOption("fullScreen", false);
        },
        _requestFullscreen: function() {
            var e = this.ancestorJq.length ? this.ancestorJq[0] : this.element[0],
                fs = $.jPlayer.nativeFeatures.fullscreen;
            if (fs.used.webkitVideo) e = this.htmlElement.video;
            if (fs.api.fullscreenEnabled) fs.api.requestFullscreen(e);
        },
        _exitFullscreen: function() {
            var fs = $.jPlayer.nativeFeatures.fullscreen,
                e;
            if (fs.used.webkitVideo) e = this.htmlElement.video;
            if (fs.api.fullscreenEnabled) fs.api.exitFullscreen(e);
        },
        _html_initMedia: function(media) {
            var $media = $(this.htmlElement.media).empty();
            $.each(media.track || [], function(i, v) {
                var track = document.createElement('track');
                track.setAttribute("kind", v.kind ? v.kind : "");
                track.setAttribute("src", v.src ? v.src : "");
                track.setAttribute("srclang", v.srclang ? v.srclang : "");
                track.setAttribute("label", v.label ? v.label : "");
                if (v.def) track.setAttribute("default", v.def);
                $media.append(track);
            });
            this.htmlElement.media.src = this.status.src;
            if (this.options.preload !== 'none') this._html_load();
            this._trigger($.jPlayer.event.timeupdate);
        },
        _html_setFormat: function(media) {
            var self = this;
            $.each(this.formats, function(priority, format) {
                if (self.html.support[format] && media[format]) {
                    self.status.src = media[format];
                    self.status.format[format] = true;
                    self.status.formatType = format;
                    return false;
                }
            });
        },
        _html_setAudio: function(media) {
            this._html_setFormat(media);
            this.htmlElement.media = this.htmlElement.audio;
            this._html_initMedia(media);
        },
        _html_setVideo: function(media) {
            this._html_setFormat(media);
            if (this.status.nativeVideoControls) this.htmlElement.video.poster = this._validString(media.poster) ? media.poster : "";
            this.htmlElement.media = this.htmlElement.video;
            this._html_initMedia(media);
        },
        _html_resetMedia: function() {
            if (this.htmlElement.media) {
                if (this.htmlElement.media.id === this.internal.video.id && !this.status.nativeVideoControls) this.internal.video.jq.css({
                    'width': '0px',
                    'height': '0px'
                });
                this.htmlElement.media.pause();
            }
        },
        _html_clearMedia: function() {
            if (this.htmlElement.media) {
                this.htmlElement.media.src = "about:blank";
                this.htmlElement.media.load();
            }
        },
        _html_load: function() {
            if (this.status.waitForLoad) {
                this.status.waitForLoad = false;
                this.htmlElement.media.load();
            }
            clearTimeout(this.internal.htmlDlyCmdId);
        },
        _html_play: function(time) {
            var self = this,
                media = this.htmlElement.media;
            this.androidFix.pause = false;
            this._html_load();
            if (this.androidFix.setMedia) {
                this.androidFix.play = true;
                this.androidFix.time = time;
            } else if (!isNaN(time)) {
                if (this.internal.cmdsIgnored) media.play();
                try {
                    if (!media.seekable || typeof media.seekable === "object" && media.seekable.length > 0) {
                        media.currentTime = time;
                        media.play();
                    } else throw 1;
                } catch (err) {
                    this.internal.htmlDlyCmdId = setTimeout(function() {
                        self.play(time);
                    }, 250);
                    return;
                }
            } else media.play();
            this._html_checkWaitForPlay();
        },
        _html_pause: function(time) {
            var self = this,
                media = this.htmlElement.media;
            this.androidFix.play = false;
            if (time > 0) this._html_load();
            else clearTimeout(this.internal.htmlDlyCmdId);
            media.pause();
            if (this.androidFix.setMedia) {
                this.androidFix.pause = true;
                this.androidFix.time = time;
            } else if (!isNaN(time)) try {
                if (!media.seekable || typeof media.seekable === "object" && media.seekable.length > 0) media.currentTime = time;
                else throw 1;
            } catch (err) {
                this.internal.htmlDlyCmdId = setTimeout(function() {
                    self.pause(time);
                }, 250);
                return;
            }
            if (time > 0) this._html_checkWaitForPlay();
        },
        _html_playHead: function(percent) {
            var self = this,
                media = this.htmlElement.media;
            this._html_load();
            try {
                if (typeof media.seekable === "object" && media.seekable.length > 0) media.currentTime = percent * media.seekable.end(media.seekable.length - 1) / 100;
                else if (media.duration > 0 && !isNaN(media.duration)) media.currentTime = percent * media.duration / 100;
                else throw "e";
            } catch (err) {
                this.internal.htmlDlyCmdId = setTimeout(function() {
                    self.playHead(percent);
                }, 250);
                return;
            }
            if (!this.status.waitForLoad) this._html_checkWaitForPlay();
        },
        _html_checkWaitForPlay: function() {
            if (this.status.waitForPlay) {
                this.status.waitForPlay = false;
                if (this.css.jq.videoPlay.length) this.css.jq.videoPlay.hide();
                if (this.status.video) {
                    this.internal.poster.jq.hide();
                    this.internal.video.jq.css({
                        'width': this.status.width,
                        'height': this.status.height
                    });
                }
            }
        },
        _html_setProperty: function(property, value) {
            if (this.html.audio.available) this.htmlElement.audio[property] = value;
            if (this.html.video.available) this.htmlElement.video[property] = value;
        },
        _aurora_setAudio: function(media) {
            var self = this;
            $.each(this.formats, function(priority, format) {
                if (self.aurora.support[format] && media[format]) {
                    self.status.src = media[format];
                    self.status.format[format] = true;
                    self.status.formatType = format;
                    return false;
                }
            });
            this.aurora.player = new AV.Player.fromURL(this.status.src);
            this._addAuroraEventListeners(this.aurora.player, this.aurora);
            if (this.options.preload === 'auto') {
                this._aurora_load();
                this.status.waitForLoad = false;
            }
        },
        _aurora_resetMedia: function() {
            if (this.aurora.player) this.aurora.player.stop();
        },
        _aurora_clearMedia: function() {},
        _aurora_load: function() {
            if (this.status.waitForLoad) {
                this.status.waitForLoad = false;
                this.aurora.player.preload();
            }
        },
        _aurora_play: function(time) {
            if (!this.status.waitForLoad)
                if (!isNaN(time)) this.aurora.player.seek(time);
            if (!this.aurora.player.playing) this.aurora.player.play();
            this.status.waitForLoad = false;
            this._aurora_checkWaitForPlay();
            this._updateButtons(true);
            this._trigger($.jPlayer.event.play);
        },
        _aurora_pause: function(time) {
            if (!isNaN(time)) this.aurora.player.seek(time * 1000);
            this.aurora.player.pause();
            if (time > 0) this._aurora_checkWaitForPlay();
            this._updateButtons(false);
            this._trigger($.jPlayer.event.pause);
        },
        _aurora_playHead: function(percent) {
            if (this.aurora.player.duration > 0) this.aurora.player.seek(percent * this.aurora.player.duration / 100);
            if (!this.status.waitForLoad) this._aurora_checkWaitForPlay();
        },
        _aurora_checkWaitForPlay: function() {
            if (this.status.waitForPlay) this.status.waitForPlay = false;
        },
        _aurora_volume: function(v) {
            this.aurora.player.volume = v * 100;
        },
        _aurora_mute: function(m) {
            if (m) {
                this.aurora.properties.lastvolume = this.aurora.player.volume;
                this.aurora.player.volume = 0;
            } else this.aurora.player.volume = this.aurora.properties.lastvolume;
            this.aurora.properties.muted = m;
        },
        _flash_setAudio: function(media) {
            var self = this;
            try {
                $.each(this.formats, function(priority, format) {
                    if (self.flash.support[format] && media[format]) {
                        switch (format) {
                            case "m4a":
                            case "fla":
                                self._getMovie().fl_setAudio_m4a(media[format]);
                                break;
                            case "mp3":
                                self._getMovie().fl_setAudio_mp3(media[format]);
                                break;
                            case "rtmpa":
                                self._getMovie().fl_setAudio_rtmp(media[format]);
                                break;
                        }
                        self.status.src = media[format];
                        self.status.format[format] = true;
                        self.status.formatType = format;
                        return false;
                    }
                });
                if (this.options.preload === 'auto') {
                    this._flash_load();
                    this.status.waitForLoad = false;
                }
            } catch (err) {
                this._flashError(err);
            }
        },
        _flash_setVideo: function(media) {
            var self = this;
            try {
                $.each(this.formats, function(priority, format) {
                    if (self.flash.support[format] && media[format]) {
                        switch (format) {
                            case "m4v":
                            case "flv":
                                self._getMovie().fl_setVideo_m4v(media[format]);
                                break;
                            case "rtmpv":
                                self._getMovie().fl_setVideo_rtmp(media[format]);
                                break;
                        }
                        self.status.src = media[format];
                        self.status.format[format] = true;
                        self.status.formatType = format;
                        return false;
                    }
                });
                if (this.options.preload === 'auto') {
                    this._flash_load();
                    this.status.waitForLoad = false;
                }
            } catch (err) {
                this._flashError(err);
            }
        },
        _flash_resetMedia: function() {
            this.internal.flash.jq.css({
                'width': '0px',
                'height': '0px'
            });
            this._flash_pause(NaN);
        },
        _flash_clearMedia: function() {
            try {
                this._getMovie().fl_clearMedia();
            } catch (err) {
                this._flashError(err);
            }
        },
        _flash_load: function() {
            try {
                this._getMovie().fl_load();
            } catch (err) {
                this._flashError(err);
            }
            this.status.waitForLoad = false;
        },
        _flash_play: function(time) {
            try {
                this._getMovie().fl_play(time);
            } catch (err) {
                this._flashError(err);
            }
            this.status.waitForLoad = false;
            this._flash_checkWaitForPlay();
        },
        _flash_pause: function(time) {
            try {
                this._getMovie().fl_pause(time);
            } catch (err) {
                this._flashError(err);
            }
            if (time > 0) {
                this.status.waitForLoad = false;
                this._flash_checkWaitForPlay();
            }
        },
        _flash_playHead: function(p) {
            try {
                this._getMovie().fl_play_head(p);
            } catch (err) {
                this._flashError(err);
            }
            if (!this.status.waitForLoad) this._flash_checkWaitForPlay();
        },
        _flash_checkWaitForPlay: function() {
            if (this.status.waitForPlay) {
                this.status.waitForPlay = false;
                if (this.css.jq.videoPlay.length) this.css.jq.videoPlay.hide();
                if (this.status.video) {
                    this.internal.poster.jq.hide();
                    this.internal.flash.jq.css({
                        'width': this.status.width,
                        'height': this.status.height
                    });
                }
            }
        },
        _flash_volume: function(v) {
            try {
                this._getMovie().fl_volume(v);
            } catch (err) {
                this._flashError(err);
            }
        },
        _flash_mute: function(m) {
            try {
                this._getMovie().fl_mute(m);
            } catch (err) {
                this._flashError(err);
            }
        },
        _getMovie: function() {
            return document[this.internal.flash.id];
        },
        _getFlashPluginVersion: function() {
            var version = 0,
                flash;
            if (window.ActiveXObject) {
                try {
                    flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    if (flash) {
                        var v = flash.GetVariable("$version");
                        if (v) {
                            v = v.split(" ")[1].split(",");
                            version = parseInt(v[0], 10) + "." + parseInt(v[1], 10);
                        }
                    }
                } catch (e) {}
            } else if (navigator.plugins && navigator.mimeTypes.length > 0) {
                flash = navigator.plugins["Shockwave Flash"];
                if (flash) version = navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/, "$1");
            }
            return version * 1;
        },
        _checkForFlash: function(version) {
            var flashOk = false;
            if (this._getFlashPluginVersion() >= version) flashOk = true;
            return flashOk;
        },
        _validString: function(url) {
            return (url && typeof url === "string");
        },
        _limitValue: function(value, min, max) {
            return (value < min) ? min : ((value > max) ? max : value);
        },
        _urlNotSetError: function(context) {
            this._error({
                type: $.jPlayer.error.URL_NOT_SET,
                context: context,
                message: $.jPlayer.errorMsg.URL_NOT_SET,
                hint: $.jPlayer.errorHint.URL_NOT_SET
            });
        },
        _flashError: function(error) {
            var errorType;
            if (!this.internal.ready) errorType = "FLASH";
            else errorType = "FLASH_DISABLED";
            this._error({
                type: $.jPlayer.error[errorType],
                context: this.internal.flash.swf,
                message: $.jPlayer.errorMsg[errorType] + error.message,
                hint: $.jPlayer.errorHint[errorType]
            });
            this.internal.flash.jq.css({
                'width': '1px',
                'height': '1px'
            });
        },
        _error: function(error) {
            this._trigger($.jPlayer.event.error, error);
            if (this.options.errorAlerts) this._alert("Error!" + (error.message ? "\n" + error.message : "") + (error.hint ? "\n" + error.hint : "") + "\nContext: " + error.context);
        },
        _warning: function(warning) {
            this._trigger($.jPlayer.event.warning, undefined, warning);
            if (this.options.warningAlerts) this._alert("Warning!" + (warning.message ? "\n" + warning.message : "") + (warning.hint ? "\n" + warning.hint : "") + "\nContext: " + warning.context);
        },
        _alert: function(message) {
            var msg = "jPlayer " + this.version.script + " : id='" + this.internal.self.id + "' : " + message;
            if (!this.options.consoleAlerts) alert(msg);
            else if (window.console && window.console.log) window.console.log(msg);
        },
        _emulateHtmlBridge: function() {
            var self = this;
            $.each($.jPlayer.emulateMethods.split(/\s+/g), function(i, name) {
                self.internal.domNode[name] = function(arg) {
                    self[name](arg);
                };
            });
            $.each($.jPlayer.event, function(eventName, eventType) {
                var nativeEvent = true;
                $.each($.jPlayer.reservedEvent.split(/\s+/g), function(i, name) {
                    if (name === eventName) {
                        nativeEvent = false;
                        return false;
                    }
                });
                if (nativeEvent) self.element.bind(eventType + ".jPlayer.jPlayerHtml", function() {
                    self._emulateHtmlUpdate();
                    var domEvent = document.createEvent("Event");
                    domEvent.initEvent(eventName, false, true);
                    self.internal.domNode.dispatchEvent(domEvent);
                });
            });
        },
        _emulateHtmlUpdate: function() {
            var self = this;
            $.each($.jPlayer.emulateStatus.split(/\s+/g), function(i, name) {
                self.internal.domNode[name] = self.status[name];
            });
            $.each($.jPlayer.emulateOptions.split(/\s+/g), function(i, name) {
                self.internal.domNode[name] = self.options[name];
            });
        },
        _destroyHtmlBridge: function() {
            var self = this;
            this.element.unbind(".jPlayerHtml");
            var emulated = $.jPlayer.emulateMethods + " " + $.jPlayer.emulateStatus + " " + $.jPlayer.emulateOptions;
            $.each(emulated.split(/\s+/g), function(i, name) {
                delete self.internal.domNode[name];
            });
        }
    };
    $.jPlayer.error = {
        FLASH: "e_flash",
        FLASH_DISABLED: "e_flash_disabled",
        NO_SOLUTION: "e_no_solution",
        NO_SUPPORT: "e_no_support",
        URL: "e_url",
        URL_NOT_SET: "e_url_not_set",
        VERSION: "e_version"
    };
    $.jPlayer.errorMsg = {
        FLASH: "jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ",
        FLASH_DISABLED: "jPlayer's Flash fallback has been disabled by the browser due to the CSS rules you have used. Details: ",
        NO_SOLUTION: "No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.",
        NO_SUPPORT: "It is not possible to play any media format provided in setMedia() on this browser using your current options.",
        URL: "Media URL could not be loaded.",
        URL_NOT_SET: "Attempt to issue media playback commands, while no media url is set.",
        VERSION: "jPlayer " + $.jPlayer.prototype.version.script + " needs Jplayer.swf version " + $.jPlayer.prototype.version.needFlash + " but found "
    };
    $.jPlayer.errorHint = {
        FLASH: "Check your swfPath option and that Jplayer.swf is there.",
        FLASH_DISABLED: "Check that you have not display:none; the jPlayer entity or any ancestor.",
        NO_SOLUTION: "Review the jPlayer options: support and supplied.",
        NO_SUPPORT: "Video or audio formats defined in the supplied option are missing.",
        URL: "Check media URL is valid.",
        URL_NOT_SET: "Use setMedia() to set the media URL.",
        VERSION: "Update jPlayer files."
    };
    $.jPlayer.warning = {
        CSS_SELECTOR_COUNT: "e_css_selector_count",
        CSS_SELECTOR_METHOD: "e_css_selector_method",
        CSS_SELECTOR_STRING: "e_css_selector_string",
        OPTION_KEY: "e_option_key"
    };
    $.jPlayer.warningMsg = {
        CSS_SELECTOR_COUNT: "The number of css selectors found did not equal one: ",
        CSS_SELECTOR_METHOD: "The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",
        CSS_SELECTOR_STRING: "The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",
        OPTION_KEY: "The option requested in jPlayer('option') is undefined."
    };
    $.jPlayer.warningHint = {
        CSS_SELECTOR_COUNT: "Check your css selector and the ancestor.",
        CSS_SELECTOR_METHOD: "Check your method name.",
        CSS_SELECTOR_STRING: "Check your css selector is a string.",
        OPTION_KEY: "Check your option name."
    };
}));
(function($, undefined) {
    "use strict";
    var assurePlayerSound = function(player) {
            player = $(player);
            if (isNaN(player.data('org-vol'))) player.data('org-vol', player.jPlayer('option', 'volume'));
            return player;
        },
        consoleLog = function(msg, debug) {
            if (!!console && !!console.log && debug) console.log(msg);
        },
        setVolume = function(player, v) {
            player.jPlayer('volume', v);
            player.data('volume', v);
        },
        fadeToPlayer = function(player, dur, from, to, callback, debug) {
            player = assurePlayerSound(player);
            if (to > from && !isNaN(player.data('volume')) && player.data('volume') > from) from = player.data('volume');
            if (from > to && !isNaN(player.data('volume')) && player.data('volume') < from) from = player.data('volume');
            var diff = to - from,
                limit = dur < 1 ? -1 : dur / 100,
                int = limit < 1 ? 0 : dur / limit,
                m = diff / limit,
                x = 0,
                fade = function() {
                    if (x <= limit) {
                        var v = from + m * x;
                        player.data('is-fading', true);
                        if (isNaN(v)) consoleLog('[player] #' + player.attr('id') + ' ***NaN', debug);
                        else {
                            setVolume(player, v);
                            player.data('fadeout', setTimeout(fade, int));
                            consoleLog('[player] #' + player.attr('id') + ' volume set to ' + v, debug);
                        }
                        x++;
                    } else {
                        setVolume(player, to);
                        consoleLog('[player] #' + player.attr('id') + ' volume set to ' + to + ' -- end', debug);
                        player.data('is-fading', false);
                        if ($.isFunction(callback)) callback.call(player);
                    }
                };
            if (diff !== 0 && !isNaN(diff)) {
                clearTimeout(player.data('fadeout'));
                fade();
            } else {
                consoleLog('[player] #' + player.attr('id') + ' fade out skipped', debug);
                if ($.isFunction(callback)) callback.call(player);
            }
            return player;
        },
        fadeOutPlayer = function(player, dur, _in, _out, callback, debug) {
            player = assurePlayerSound(player);
            _in = _in != null && !isNaN(_in) ? _in : parseFloat(player.data('org-vol'), 10);
            _out = _out != null && !isNaN(_out) ? _out : 0;
            return fadeToPlayer(player, dur, _in, _out, callback, debug);
        },
        fadeInPlayer = function(player, dur, _in, _out, callback, debug) {
            player = assurePlayerSound(player);
            _in = _in != null && !isNaN(_in) ? _in : 0;
            _out = _out != null && !isNaN(_out) ? _out : parseFloat(player.data('org-vol'), 10);
            return fadeToPlayer(player, dur, _in, _out, callback, debug);
        },
        playerIsFading = function(player) {
            return !!player.data('is-fading');
        };
    if ($.isFunction($.jPlayer) && !$.isFunction($.jPlayer.fadeTo)) {
        $.extend($.jPlayer, {
            fadeTo: fadeToPlayer,
            fadeOut: fadeOutPlayer,
            fadeIn: fadeInPlayer,
            isFading: playerIsFading
        });
        if (!$.fn.jPlayerFade) $.extend($.fn, {
            jPlayerFade: function(debug) {
                var t = $(this);
                return {
                    to: function(dur, from, to, callback) {
                        return $.jPlayer.fadeTo(t, dur, from, to, callback, debug);
                    },
                    'in': function(dur, from, to, callback) {
                        return $.jPlayer.fadeIn(t, dur, from, to, callback, debug);
                    },
                    out: function(dur, from, to, callback) {
                        return $.jPlayer.fadeOut(t, dur, from, to, callback, debug);
                    },
                    isFading: function() {
                        return playerIsFading(t);
                    }
                };
            }
        });
    }
})(jQuery);;
(function(window, document, undefined) {
    var j = !0,
        k = null,
        l = !1;

    function p(a) {
        return function() {
            return this[a];
        };
    }
    var aa = this;

    function q(a, b) {
        var c = a.split("."),
            d = aa;
        !(c[0] in d) && d.execScript && d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());) !c.length && void 0 !== b ? d[e] = b : d = d[e] ? d[e] : d[e] = {};
    }

    function ba(a, b, c) {
        return a.call.apply(a.bind, arguments);
    }

    function ca(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c);
            };
        }
        return function() {
            return a.apply(b, arguments);
        };
    }

    function s(a, b, c) {
        s = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ba : ca;
        return s.apply(k, arguments);
    }
    var da = Date.now || function() {
        return +new Date();
    };

    function ea(a, b) {
        this.G = a;
        this.u = b || a;
        this.z = this.u.document;
    }
    ea.prototype.createElement = function(a, b, c) {
        a = this.z.createElement(a);
        if (b)
            for (var d in b) b.hasOwnProperty(d) && ("style" == d ? a.style.cssText = b[d] : a.setAttribute(d, b[d]));
        c && a.appendChild(this.z.createTextNode(c));
        return a;
    };

    function fa(a, b, c) {
        a = a.z.getElementsByTagName(b)[0];
        a || (a = document.documentElement);
        a && a.lastChild && a.insertBefore(c, a.lastChild);
    }

    function t(a, b) {
        for (var c = a.className.split(/\s+/), d = 0, e = c.length; d < e; d++)
            if (c[d] == b) return;
        c.push(b);
        a.className = c.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
    }

    function u(a, b) {
        for (var c = a.className.split(/\s+/), d = [], e = 0, f = c.length; e < f; e++) c[e] != b && d.push(c[e]);
        a.className = d.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
    }

    function ga(a, b) {
        for (var c = a.className.split(/\s+/), d = 0, e = c.length; d < e; d++)
            if (c[d] == b) return j;
        return l;
    }

    function v(a) {
        var b = a.u.location.protocol;
        "about:" == b && (b = a.G.location.protocol);
        return "httpss:" == b ? "httpss:" : "httpss:";
    }

    function w(a, b) {
        var c = a.createElement("link", {
                rel: "stylesheet",
                href: b
            }),
            d = l;
        c.onload = function() {
            d || (d = j);
        };
        c.onerror = function() {
            d || (d = j);
        };
        fa(a, "head", c);
    }

    function x(a, b, c, d) {
        var e = a.z.getElementsByTagName("head")[0];
        if (e) {
            var f = a.createElement("script", {
                    src: b
                }),
                g = l;
            f.onload = f.onreadystatechange = function() {
                if (!g && (!this.readyState || "loaded" == this.readyState || "complete" == this.readyState)) g = j, c && c(k), f.onload = f.onreadystatechange = k, "HEAD" == f.parentNode.tagName && e.removeChild(f);
            };
            e.appendChild(f);
            window.setTimeout(function() {
                g || (g = j, c && c(Error("Script load timeout")));
            }, d || 5E3);
            return f;
        }
        return k;
    };

    function y(a, b, c) {
        this.w = a;
        this.S = b;
        this.za = c;
    }
    q("webfont.BrowserInfo", y);
    y.prototype.pa = p("w");
    y.prototype.hasWebFontSupport = y.prototype.pa;
    y.prototype.qa = p("S");
    y.prototype.hasWebKitFallbackBug = y.prototype.qa;
    y.prototype.ra = p("za");
    y.prototype.hasWebKitMetricsBug = y.prototype.ra;

    function z(a, b, c, d) {
        this.e = a != k ? a : k;
        this.o = b != k ? b : k;
        this.aa = c != k ? c : k;
        this.f = d != k ? d : k;
    }
    var ha = /^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/;
    z.prototype.toString = function() {
        return [this.e, this.o || "", this.aa || "", this.f || ""].join("");
    };

    function A(a) {
        a = ha.exec(a);
        var b = k,
            c = k,
            d = k,
            e = k;
        a && (a[1] !== k && a[1] && (b = parseInt(a[1], 10)), a[2] !== k && a[2] && (c = parseInt(a[2], 10)), a[3] !== k && a[3] && (d = parseInt(a[3], 10)), a[4] !== k && a[4] && (e = /^[0-9]+$/.test(a[4]) ? parseInt(a[4], 10) : a[4]));
        return new z(b, c, d, e);
    };

    function B(a, b, c, d, e, f, g, h, m, n, r) {
        this.J = a;
        this.Fa = b;
        this.ya = c;
        this.fa = d;
        this.Da = e;
        this.ea = f;
        this.wa = g;
        this.Ea = h;
        this.va = m;
        this.da = n;
        this.k = r;
    }
    q("webfont.UserAgent", B);
    B.prototype.getName = p("J");
    B.prototype.getName = B.prototype.getName;
    B.prototype.oa = p("ya");
    B.prototype.getVersion = B.prototype.oa;
    B.prototype.ka = p("fa");
    B.prototype.getEngine = B.prototype.ka;
    B.prototype.la = p("ea");
    B.prototype.getEngineVersion = B.prototype.la;
    B.prototype.ma = p("wa");
    B.prototype.getPlatform = B.prototype.ma;
    B.prototype.na = p("va");
    B.prototype.getPlatformVersion = B.prototype.na;
    B.prototype.ja = p("da");
    B.prototype.getDocumentMode = B.prototype.ja;
    B.prototype.ia = p("k");
    B.prototype.getBrowserInfo = B.prototype.ia;

    function C(a, b) {
        this.a = a;
        this.H = b;
    }
    var ia = new B("Unknown", new z(), "Unknown", "Unknown", new z(), "Unknown", "Unknown", new z(), "Unknown", void 0, new y(l, l, l));
    C.prototype.parse = function() {
        var a;
        if (-1 != this.a.indexOf("MSIE")) {
            a = D(this);
            var b = E(this),
                c = A(b),
                d = F(this.a, /MSIE ([\d\w\.]+)/, 1),
                e = A(d);
            a = new B("MSIE", e, d, "MSIE", e, d, a, c, b, G(this.H), new y("Windows" == a && 6 <= e.e || "Windows Phone" == a && 8 <= c.e, l, l));
        } else if (-1 != this.a.indexOf("Opera")) a: {
            a = "Unknown";
            var b = F(this.a, /Presto\/([\d\w\.]+)/, 1),
                c = A(b),
                d = E(this),
                e = A(d),
                f = G(this.H);c.e !== k ? a = "Presto" : (-1 != this.a.indexOf("Gecko") && (a = "Gecko"), b = F(this.a, /rv:([^\)]+)/, 1), c = A(b));
            if (-1 != this.a.indexOf("Opera Mini/")) {
                var g = F(this.a, /Opera Mini\/([\d\.]+)/, 1),
                    h = A(g);
                a = new B("OperaMini", h, g, a, c, b, D(this), e, d, f, new y(l, l, l));
            } else {
                if (-1 != this.a.indexOf("Version/") && (g = F(this.a, /Version\/([\d\.]+)/, 1), h = A(g), h.e !== k)) {
                    a = new B("Opera", h, g, a, c, b, D(this), e, d, f, new y(10 <= h.e, l, l));
                    break a;
                }
                g = F(this.a, /Opera[\/ ]([\d\.]+)/, 1);
                h = A(g);
                a = h.e !== k ? new B("Opera", h, g, a, c, b, D(this), e, d, f, new y(10 <= h.e, l, l)) : new B("Opera", new z(), "Unknown", a, c, b, D(this), e, d, f, new y(l, l, l));
            }
        }
        else /OPR\/[\d.]+/.test(this.a) ? a = ja(this) : /AppleWeb(K|k)it/.test(this.a) ? a = ja(this) : -1 != this.a.indexOf("Gecko") ? (a = "Unknown", b = new z(), c = "Unknown", d = E(this), e = A(d), f = l, -1 != this.a.indexOf("Firefox") ? (a = "Firefox", c = F(this.a, /Firefox\/([\d\w\.]+)/, 1), b = A(c), f = 3 <= b.e && 5 <= b.o) : -1 != this.a.indexOf("Mozilla") && (a = "Mozilla"), g = F(this.a, /rv:([^\)]+)/, 1), h = A(g), f || (f = 1 < h.e || 1 == h.e && 9 < h.o || 1 == h.e && 9 == h.o && 2 <= h.aa || g.match(/1\.9\.1b[123]/) != k || g.match(/1\.9\.1\.[\d\.]+/) != k), a = new B(a, b, c, "Gecko", h, g, D(this), e, d, G(this.H), new y(f, l, l))) : a = ia;
        return a;
    };

    function D(a) {
        var b = F(a.a, /(iPod|iPad|iPhone|Android|Windows Phone|BB\d{2}|BlackBerry)/, 1);
        if ("" != b) return /BB\d{2}/.test(b) && (b = "BlackBerry"), b;
        a = F(a.a, /(Linux|Mac_PowerPC|Macintosh|Windows|CrOS)/, 1);
        return "" != a ? ("Mac_PowerPC" == a && (a = "Macintosh"), a) : "Unknown";
    }

    function E(a) {
        var b = F(a.a, /(OS X|Windows NT|Android) ([^;)]+)/, 2);
        if (b || (b = F(a.a, /Windows Phone( OS)? ([^;)]+)/, 2)) || (b = F(a.a, /(iPhone )?OS ([\d_]+)/, 2))) return b;
        if (b = F(a.a, /(?:Linux|CrOS) ([^;)]+)/, 1))
            for (var b = b.split(/\s/), c = 0; c < b.length; c += 1)
                if (/^[\d\._]+$/.test(b[c])) return b[c];
        return (a = F(a.a, /(BB\d{2}|BlackBerry).*?Version\/([^\s]*)/, 2)) ? a : "Unknown";
    }

    function ja(a) {
        var b = D(a),
            c = E(a),
            d = A(c),
            e = F(a.a, /AppleWeb(?:K|k)it\/([\d\.\+]+)/, 1),
            f = A(e),
            g = "Unknown",
            h = new z(),
            m = "Unknown",
            n = l;
        /OPR\/[\d.]+/.test(a.a) ? g = "Opera" : -1 != a.a.indexOf("Chrome") || -1 != a.a.indexOf("CrMo") || -1 != a.a.indexOf("CriOS") ? g = "Chrome" : /Silk\/\d/.test(a.a) ? g = "Silk" : "BlackBerry" == b || "Android" == b ? g = "BuiltinBrowser" : -1 != a.a.indexOf("PhantomJS") ? g = "PhantomJS" : -1 != a.a.indexOf("Safari") ? g = "Safari" : -1 != a.a.indexOf("AdobeAIR") && (g = "AdobeAIR");
        "BuiltinBrowser" == g ? m = "Unknown" : "Silk" == g ? m = F(a.a, /Silk\/([\d\._]+)/, 1) : "Chrome" == g ? m = F(a.a, /(Chrome|CrMo|CriOS)\/([\d\.]+)/, 2) : -1 != a.a.indexOf("Version/") ? m = F(a.a, /Version\/([\d\.\w]+)/, 1) : "AdobeAIR" == g ? m = F(a.a, /AdobeAIR\/([\d\.]+)/, 1) : "Opera" == g ? m = F(a.a, /OPR\/([\d.]+)/, 1) : "PhantomJS" == g && (m = F(a.a, /PhantomJS\/([\d.]+)/, 1));
        h = A(m);
        n = "AdobeAIR" == g ? 2 < h.e || 2 == h.e && 5 <= h.o : "BlackBerry" == b ? 10 <= d.e : "Android" == b ? 2 < d.e || 2 == d.e && 1 < d.o : 526 <= f.e || 525 <= f.e && 13 <= f.o;
        return new B(g, h, m, "AppleWebKit", f, e, b, d, c, G(a.H), new y(n, 536 > f.e || 536 == f.e && 11 > f.o, "iPhone" == b || "iPad" == b || "iPod" == b || "Macintosh" == b));
    }

    function F(a, b, c) {
        return (a = a.match(b)) && a[c] ? a[c] : "";
    }

    function G(a) {
        if (a.documentMode) return a.documentMode;
    };

    function ka(a) {
        this.ua = a || "-";
    }
    ka.prototype.f = function(a) {
        for (var b = [], c = 0; c < arguments.length; c++) b.push(arguments[c].replace(/[\W_]+/g, "").toLowerCase());
        return b.join(this.ua);
    };

    function H(a, b) {
        this.J = a;
        this.T = 4;
        this.K = "n";
        var c = (b || "n4").match(/^([nio])([1-9])$/i);
        c && (this.K = c[1], this.T = parseInt(c[2], 10));
    }
    H.prototype.getName = p("J");

    function I(a) {
        return a.K + a.T;
    }

    function la(a) {
        var b = 4,
            c = "n",
            d = k;
        a && ((d = a.match(/(normal|oblique|italic)/i)) && d[1] && (c = d[1].substr(0, 1).toLowerCase()), (d = a.match(/([1-9]00|normal|bold)/i)) && d[1] && (/bold/i.test(d[1]) ? b = 7 : /[1-9]00/.test(d[1]) && (b = parseInt(d[1].substr(0, 1), 10))));
        return c + b;
    };

    function ma(a, b, c) {
        this.c = a;
        this.h = b;
        this.M = c;
        this.j = "wf";
        this.g = new ka("-");
    }

    function na(a) {
        t(a.h, a.g.f(a.j, "loading"));
        J(a, "loading");
    }

    function K(a) {
        u(a.h, a.g.f(a.j, "loading"));
        ga(a.h, a.g.f(a.j, "active")) || t(a.h, a.g.f(a.j, "inactive"));
        J(a, "inactive");
    }

    function J(a, b, c) {
        if (a.M[b])
            if (c) a.M[b](c.getName(), I(c));
            else a.M[b]();
    };

    function L(a, b) {
        this.c = a;
        this.C = b;
        this.s = this.c.createElement("span", {
            "aria-hidden": "true"
        }, this.C);
    }

    function M(a, b) {
        var c;
        c = [];
        for (var d = b.J.split(/,\s*/), e = 0; e < d.length; e++) {
            var f = d[e].replace(/['"]/g, ""); - 1 == f.indexOf(" ") ? c.push(f) : c.push("'" + f + "'");
        }
        c = c.join(",");
        d = "normal";
        e = b.T + "00";
        "o" === b.K ? d = "oblique" : "i" === b.K && (d = "italic");
        a.s.style.cssText = "position:absolute;top:-999px;left:-999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + c + ";" + ("font-style:" + d + ";font-weight:" + e + ";");
    }

    function N(a) {
        fa(a.c, "body", a.s);
    }
    L.prototype.remove = function() {
        var a = this.s;
        a.parentNode && a.parentNode.removeChild(a);
    };

    function oa(a, b, c, d, e, f, g, h) {
        this.U = a;
        this.sa = b;
        this.c = c;
        this.q = d;
        this.C = h || "BESbswy";
        this.k = e;
        this.F = {};
        this.R = f || 5E3;
        this.Y = g || k;
        this.B = this.A = k;
        a = new L(this.c, this.C);
        N(a);
        for (var m in O) O.hasOwnProperty(m) && (M(a, new H(O[m], I(this.q))), this.F[O[m]] = a.s.offsetWidth);
        a.remove();
    }
    var O = {
        Ca: "serif",
        Ba: "sans-serif",
        Aa: "monospace"
    };
    oa.prototype.start = function() {
        this.A = new L(this.c, this.C);
        N(this.A);
        this.B = new L(this.c, this.C);
        N(this.B);
        this.xa = da();
        M(this.A, new H(this.q.getName() + ",serif", I(this.q)));
        M(this.B, new H(this.q.getName() + ",sans-serif", I(this.q)));
        qa(this);
    };

    function ra(a, b, c) {
        for (var d in O)
            if (O.hasOwnProperty(d) && b === a.F[O[d]] && c === a.F[O[d]]) return j;
        return l;
    }

    function qa(a) {
        var b = a.A.s.offsetWidth,
            c = a.B.s.offsetWidth;
        b === a.F.serif && c === a.F["sans-serif"] || a.k.S && ra(a, b, c) ? da() - a.xa >= a.R ? a.k.S && ra(a, b, c) && (a.Y === k || a.Y.hasOwnProperty(a.q.getName())) ? P(a, a.U) : P(a, a.sa) : setTimeout(s(function() {
            qa(this);
        }, a), 25) : P(a, a.U);
    }

    function P(a, b) {
        a.A.remove();
        a.B.remove();
        b(a.q);
    };

    function R(a, b, c, d) {
        this.c = b;
        this.t = c;
        this.N = 0;
        this.ba = this.X = l;
        this.R = d;
        this.k = a.k;
    }

    function sa(a, b, c, d, e) {
        if (0 === b.length && e) K(a.t);
        else {
            a.N += b.length;
            e && (a.X = e);
            for (e = 0; e < b.length; e++) {
                var f = b[e],
                    g = c[f.getName()],
                    h = a.t,
                    m = f;
                t(h.h, h.g.f(h.j, m.getName(), I(m).toString(), "loading"));
                J(h, "fontloading", m);
                new oa(s(a.ga, a), s(a.ha, a), a.c, f, a.k, a.R, d, g).start();
            }
        }
    }
    R.prototype.ga = function(a) {
        var b = this.t;
        u(b.h, b.g.f(b.j, a.getName(), I(a).toString(), "loading"));
        u(b.h, b.g.f(b.j, a.getName(), I(a).toString(), "inactive"));
        t(b.h, b.g.f(b.j, a.getName(), I(a).toString(), "active"));
        J(b, "fontactive", a);
        this.ba = j;
        ta(this);
    };
    R.prototype.ha = function(a) {
        var b = this.t;
        u(b.h, b.g.f(b.j, a.getName(), I(a).toString(), "loading"));
        ga(b.h, b.g.f(b.j, a.getName(), I(a).toString(), "active")) || t(b.h, b.g.f(b.j, a.getName(), I(a).toString(), "inactive"));
        J(b, "fontinactive", a);
        ta(this);
    };

    function ta(a) {
        0 == --a.N && a.X && (a.ba ? (a = a.t, u(a.h, a.g.f(a.j, "loading")), u(a.h, a.g.f(a.j, "inactive")), t(a.h, a.g.f(a.j, "active")), J(a, "active")) : K(a.t));
    };

    function S(a, b, c) {
        this.G = a;
        this.V = b;
        this.a = c;
        this.O = this.P = 0;
    }

    function T(a, b) {
        U.V.Z[a] = b;
    }
    S.prototype.load = function(a) {
        var b = a.context || this.G;
        this.c = new ea(this.G, b);
        b = new ma(this.c, b.document.documentElement, a);
        if (this.a.k.w) {
            var c = this.V,
                d = this.c,
                e = [],
                f;
            for (f in a)
                if (a.hasOwnProperty(f)) {
                    var g = c.Z[f];
                    g && e.push(g(a[f], d));
                }
            a = a.timeout;
            this.O = this.P = e.length;
            a = new R(this.a, this.c, b, a);
            f = 0;
            for (c = e.length; f < c; f++) d = e[f], d.v(this.a, s(this.ta, this, d, b, a));
        } else K(b);
    };
    S.prototype.ta = function(a, b, c, d) {
        var e = this;
        d ? a.load(function(a, d, h) {
            var m = 0 == --e.P;
            m && na(b);
            setTimeout(function() {
                sa(c, a, d || {}, h || k, m);
            }, 0);
        }) : (a = 0 == --this.P, this.O--, a && (0 == this.O ? K(b) : na(b)), sa(c, [], {}, k, a));
    };
    var ua = window,
        va = new C(navigator.userAgent, document).parse(),
        U = ua.WebFont = new S(window, new function() {
            this.Z = {};
        }(), va);
    U.load = U.load;

    function V(a, b) {
        this.c = a;
        this.d = b;
    }
    V.prototype.load = function(a) {
        var b, c, d = this.d.urls || [],
            e = this.d.families || [];
        b = 0;
        for (c = d.length; b < c; b++) w(this.c, d[b]);
        d = [];
        b = 0;
        for (c = e.length; b < c; b++) {
            var f = e[b].split(":");
            if (f[1])
                for (var g = f[1].split(","), h = 0; h < g.length; h += 1) d.push(new H(f[0], g[h]));
            else d.push(new H(f[0]));
        }
        a(d);
    };
    V.prototype.v = function(a, b) {
        return b(a.k.w);
    };
    T("custom", function(a, b) {
        return new V(b, a);
    });

    function W(a, b) {
        this.c = a;
        this.d = b;
        this.m = [];
    }
    W.prototype.D = function(a) {
        return v(this.c) + (this.d.api || "//f.fontdeck.com/s/css/js/") + (this.c.u.location.hostname || this.c.G.location.hostname) + "/" + a + ".js";
    };
    W.prototype.v = function(a, b) {
        var c = this.d.id,
            d = this.c.u,
            e = this;
        c ? (d.__webfontfontdeckmodule__ || (d.__webfontfontdeckmodule__ = {}), d.__webfontfontdeckmodule__[c] = function(a, c) {
            for (var d = 0, m = c.fonts.length; d < m; ++d) {
                var n = c.fonts[d];
                e.m.push(new H(n.name, la("font-weight:" + n.weight + ";font-style:" + n.style)));
            }
            b(a);
        }, x(this.c, this.D(c), function(a) {
            a && b(l);
        })) : b(l);
    };
    W.prototype.load = function(a) {
        a(this.m);
    };
    T("fontdeck", function(a, b) {
        return new W(b, a);
    });

    function wa(a, b, c) {
        this.L = a ? a : b + xa;
        this.p = [];
        this.Q = [];
        this.ca = c || "";
    }
    var xa = "//fonts.googleapis.com/css";
    wa.prototype.f = function() {
        if (0 == this.p.length) throw Error("No fonts to load !");
        if (-1 != this.L.indexOf("kit=")) return this.L;
        for (var a = this.p.length, b = [], c = 0; c < a; c++) b.push(this.p[c].replace(/ /g, "+"));
        a = this.L + "?family=" + b.join("%7C");
        0 < this.Q.length && (a += "&subset=" + this.Q.join(","));
        0 < this.ca.length && (a += "&text=" + encodeURIComponent(this.ca));
        return a;
    };

    function ya(a) {
        this.p = a;
        this.$ = [];
        this.I = {};
    }
    var za = {
            latin: "BESbswy",
            cyrillic: "&#1081;&#1103;&#1046;",
            greek: "&#945;&#946;&#931;",
            khmer: "&#x1780;&#x1781;&#x1782;",
            Hanuman: "&#x1780;&#x1781;&#x1782;"
        },
        Aa = {
            thin: "1",
            extralight: "2",
            "extra-light": "2",
            ultralight: "2",
            "ultra-light": "2",
            light: "3",
            regular: "4",
            book: "4",
            medium: "5",
            "semi-bold": "6",
            semibold: "6",
            "demi-bold": "6",
            demibold: "6",
            bold: "7",
            "extra-bold": "8",
            extrabold: "8",
            "ultra-bold": "8",
            ultrabold: "8",
            black: "9",
            heavy: "9",
            l: "3",
            r: "4",
            b: "7"
        },
        Ba = {
            i: "i",
            italic: "i",
            n: "n",
            normal: "n"
        },
        Ca = RegExp("^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$");
    ya.prototype.parse = function() {
        for (var a = this.p.length, b = 0; b < a; b++) {
            var c = this.p[b].split(":"),
                d = c[0].replace(/\+/g, " "),
                e = ["n4"];
            if (2 <= c.length) {
                var f;
                var g = c[1];
                f = [];
                if (g)
                    for (var g = g.split(","), h = g.length, m = 0; m < h; m++) {
                        var n;
                        n = g[m];
                        if (n.match(/^[\w]+$/)) {
                            n = Ca.exec(n.toLowerCase());
                            var r = void 0;
                            if (n == k) r = "";
                            else {
                                r = void 0;
                                r = n[1];
                                if (r == k || "" == r) r = "4";
                                else var pa = Aa[r],
                                    r = pa ? pa : isNaN(r) ? "4" : r.substr(0, 1);
                                r = [n[2] == k || "" == n[2] ? "n" : Ba[n[2]], r].join("");
                            }
                            n = r;
                        } else n = "";
                        n && f.push(n);
                    }
                0 < f.length && (e = f);
                3 == c.length && (c = c[2], f = [], c = !c ? f : c.split(","), 0 < c.length && (c = za[c[0]]) && (this.I[d] = c));
            }
            this.I[d] || (c = za[d]) && (this.I[d] = c);
            for (c = 0; c < e.length; c += 1) this.$.push(new H(d, e[c]));
        }
    };

    function X(a, b, c) {
        this.a = a;
        this.c = b;
        this.d = c;
    }
    var Da = {
        Arimo: j,
        Cousine: j,
        Tinos: j
    };
    X.prototype.v = function(a, b) {
        b(a.k.w);
    };
    X.prototype.load = function(a) {
        var b = this.c;
        if ("MSIE" == this.a.getName() && this.d.blocking != j) {
            var c = s(this.W, this, a),
                d = function() {
                    b.z.body ? c() : setTimeout(d, 0);
                };
            d();
        } else this.W(a);
    };
    X.prototype.W = function(a) {
        for (var b = this.c, c = new wa(this.d.api, v(b), this.d.text), d = this.d.families, e = d.length, f = 0; f < e; f++) {
            var g = d[f].split(":");
            3 == g.length && c.Q.push(g.pop());
            var h = "";
            2 == g.length && "" != g[1] && (h = ":");
            c.p.push(g.join(h));
        }
        d = new ya(d);
        d.parse();
        w(b, c.f());
        a(d.$, d.I, Da);
    };
    T("google", function(a, b) {
        var c = new C(navigator.userAgent, document).parse();
        return new X(c, b, a);
    });

    function Y(a, b) {
        this.c = a;
        this.d = b;
    }
    var Ea = {
        regular: "n4",
        bold: "n7",
        italic: "i4",
        bolditalic: "i7",
        r: "n4",
        b: "n7",
        i: "i4",
        bi: "i7"
    };
    Y.prototype.v = function(a, b) {
        return b(a.k.w);
    };
    Y.prototype.load = function(a) {
        w(this.c, v(this.c) + "//webfonts.fontslive.com/css/" + this.d.key + ".css");
        for (var b = this.d.families, c = [], d = 0, e = b.length; d < e; d++) c.push.apply(c, Fa(b[d]));
        a(c);
    };

    function Fa(a) {
        var b = a.split(":");
        a = b[0];
        if (b[1]) {
            for (var c = b[1].split(","), b = [], d = 0, e = c.length; d < e; d++) {
                var f = c[d];
                if (f) {
                    var g = Ea[f];
                    b.push(g ? g : f);
                }
            }
            c = [];
            for (d = 0; d < b.length; d += 1) c.push(new H(a, b[d]));
            return c;
        }
        return [new H(a)];
    }
    T("ascender", function(a, b) {
        return new Y(b, a);
    });

    function Z(a, b, c) {
        this.a = a;
        this.c = b;
        this.d = c;
        this.m = [];
    }
    Z.prototype.v = function(a, b) {
        var c = this,
            d = c.d.projectId,
            e = c.d.version;
        if (d) {
            var f = c.c.u;
            x(this.c, c.D(d, e), function(e) {
                if (e) b(l);
                else {
                    if (f["__mti_fntLst" + d] && (e = f["__mti_fntLst" + d]()))
                        for (var h = 0; h < e.length; h++) c.m.push(new H(e[h].fontfamily));
                    b(a.k.w);
                }
            }).id = "__MonotypeAPIScript__" + d;
        } else b(l);
    };
    Z.prototype.D = function(a, b) {
        var c = v(this.c),
            d = (this.d.api || "fast.fonts.com/jsapi").replace(/^.*https(s?):(\/\/)?/, "");
        return c + "//" + d + "/" + a + ".js" + (b ? "?v=" + b : "");
    };
    Z.prototype.load = function(a) {
        a(this.m);
    };
    T("monotype", function(a, b) {
        var c = new C(navigator.userAgent, document).parse();
        return new Z(c, b, a);
    });

    function $(a, b) {
        this.c = a;
        this.d = b;
        this.m = [];
    }
    $.prototype.D = function(a) {
        var b = v(this.c);
        return (this.d.api || b + "//use.typekit.net") + "/" + a + ".js";
    };
    $.prototype.v = function(a, b) {
        var c = this.d.id,
            d = this.d,
            e = this.c.u,
            f = this;
        c ? (e.__webfonttypekitmodule__ || (e.__webfonttypekitmodule__ = {}), e.__webfonttypekitmodule__[c] = function(c) {
            c(a, d, function(a, c, d) {
                for (var e = 0; e < c.length; e += 1) {
                    var g = d[c[e]];
                    if (g)
                        for (var Q = 0; Q < g.length; Q += 1) f.m.push(new H(c[e], g[Q]));
                    else f.m.push(new H(c[e]));
                }
                b(a);
            });
        }, x(this.c, this.D(c), function(a) {
            a && b(l);
        }, 2E3)) : b(l);
    };
    $.prototype.load = function(a) {
        a(this.m);
    };
    T("typekit", function(a, b) {
        return new $(b, a);
    });
    window.WebFontConfig && U.load(window.WebFontConfig);
})(this, document);
(function(window, undefined) {
    "use strict";
    var _window = window,
        _document = _window.document,
        _navigator = _window.navigator,
        _setTimeout = _window.setTimeout,
        _parseInt = _window.Number.parseInt || _window.parseInt,
        _parseFloat = _window.Number.parseFloat || _window.parseFloat,
        _isNaN = _window.Number.isNaN || _window.isNaN,
        _encodeURIComponent = _window.encodeURIComponent,
        _Math = _window.Math,
        _Date = _window.Date,
        _ActiveXObject = _window.ActiveXObject,
        _slice = _window.Array.prototype.slice,
        _keys = _window.Object.keys,
        _hasOwn = _window.Object.prototype.hasOwnProperty,
        _defineProperty = function() {
            if (typeof _window.Object.defineProperty === "function" && function() {
                    try {
                        var x = {};
                        _window.Object.defineProperty(x, "y", {
                            value: "z"
                        });
                        return x.y === "z";
                    } catch (e) {
                        return false;
                    }
                }()) return _window.Object.defineProperty;
        }();
    var _args = function(argumentsObj) {
        return _slice.call(argumentsObj, 0);
    };
    var _inArray = function(item, array, fromIndex) {
        if (typeof array.indexOf === "function") return array.indexOf(item, fromIndex);
        var i, len = array.length;
        if (typeof fromIndex === "undefined") fromIndex = 0;
        else if (fromIndex < 0) fromIndex = len + fromIndex;
        for (i = fromIndex; i < len; i++)
            if (_hasOwn.call(array, i) && array[i] === item) return i;
        return -1;
    };
    var _extend = function() {
        var i, len, arg, prop, src, copy, args = _args(arguments),
            target = args[0] || {};
        for (i = 1, len = args.length; i < len; i++)
            if ((arg = args[i]) != null)
                for (prop in arg)
                    if (_hasOwn.call(arg, prop)) {
                        src = target[prop];
                        copy = arg[prop];
                        if (target === copy) continue;
                        if (copy !== undefined) target[prop] = copy;
                    }
        return target;
    };
    var _deepCopy = function(source) {
        var copy, i, len, prop;
        if (typeof source !== "object" || source == null) copy = source;
        else if (typeof source.length === "number") {
            copy = [];
            for (i = 0, len = source.length; i < len; i++)
                if (_hasOwn.call(source, i)) copy[i] = _deepCopy(source[i]);
        } else {
            copy = {};
            for (prop in source)
                if (_hasOwn.call(source, prop)) copy[prop] = _deepCopy(source[prop]);
        }
        return copy;
    };
    var _pick = function(obj, keys) {
        var newObj = {};
        for (var i = 0, len = keys.length; i < len; i++)
            if (keys[i] in obj) newObj[keys[i]] = obj[keys[i]];
        return newObj;
    };
    var _omit = function(obj, keys) {
        var newObj = {};
        for (var prop in obj)
            if (_inArray(prop, keys) === -1) newObj[prop] = obj[prop];
        return newObj;
    };
    var _objectKeys = function(obj) {
        if (obj == null) return [];
        if (_keys) return _keys(obj);
        var keys = [];
        for (var prop in obj)
            if (_hasOwn.call(obj, prop)) keys.push(prop);
        return keys;
    };
    var _deleteOwnProperties = function(obj) {
        if (obj)
            for (var prop in obj)
                if (_hasOwn.call(obj, prop)) delete obj[prop];
        return obj;
    };
    var _makeReadOnly = function(obj, prop) {
        if (prop in obj && typeof _defineProperty === "function") _defineProperty(obj, prop, {
            value: obj[prop],
            writable: false,
            configurable: true,
            enumerable: true
        });
    };
    var _now = function(Date) {
        return function() {
            var time;
            if (Date.now) time = Date.now();
            else time = new Date().getTime();
            return time;
        };
    }(_Date);
    var _flashState = {
        bridge: null,
        version: "0.0.0",
        pluginType: "unknown",
        disabled: null,
        outdated: null,
        unavailable: null,
        deactivated: null,
        overdue: null,
        ready: null
    };
    var _minimumFlashVersion = "11.0.0";
    var _handlers = {};
    var _currentElement;
    var _clipData = {};
    var _clipDataFormatMap = null;
    var _eventMessages = {
        ready: "Flash communication is established",
        error: {
            "flash-disabled": "Flash is disabled or not installed",
            "flash-outdated": "Flash is too outdated to support ZeroClipboard",
            "flash-unavailable": "Flash is unable to communicate bidirectionally with JavaScript",
            "flash-deactivated": "Flash is too outdated for your browser and/or is configured as click-to-activate",
            "flash-overdue": "Flash communication was established but NOT within the acceptable time limit"
        }
    };
    var _swfPath = function() {
        var i, jsDir, tmpJsPath, jsPath, swfPath = "ZeroClipboard.swf";
        if (!(_document.currentScript && (jsPath = _document.currentScript.src))) {
            var scripts = _document.getElementsByTagName("script");
            if ("readyState" in scripts[0]) {
                for (i = scripts.length; i--;)
                    if (scripts[i].readyState === "interactive" && (jsPath = scripts[i].src)) break;
            } else if (_document.readyState === "loading") jsPath = scripts[scripts.length - 1].src;
            else {
                for (i = scripts.length; i--;) {
                    tmpJsPath = scripts[i].src;
                    if (!tmpJsPath) {
                        jsDir = null;
                        break;
                    }
                    tmpJsPath = tmpJsPath.split("#")[0].split("?")[0];
                    tmpJsPath = tmpJsPath.slice(0, tmpJsPath.lastIndexOf("/") + 1);
                    if (jsDir == null) jsDir = tmpJsPath;
                    else if (jsDir !== tmpJsPath) {
                        jsDir = null;
                        break;
                    }
                }
                if (jsDir !== null) jsPath = jsDir;
            }
        }
        if (jsPath) {
            jsPath = jsPath.split("#")[0].split("?")[0];
            swfPath = jsPath.slice(0, jsPath.lastIndexOf("/") + 1) + swfPath;
        }
        return swfPath;
    }();
    var _globalConfig = {
        swfPath: _swfPath,
        trustedDomains: window.location.host ? [window.location.host] : [],
        cacheBust: true,
        forceEnhancedClipboard: false,
        flashLoadTimeout: 3e4,
        autoActivate: true,
        bubbleEvents: true,
        containerId: "global-zeroclipboard-html-bridge",
        containerClass: "global-zeroclipboard-container",
        swfObjectId: "global-zeroclipboard-flash-bridge",
        hoverClass: "zeroclipboard-is-hover",
        activeClass: "zeroclipboard-is-active",
        forceHandCursor: false,
        title: null,
        zIndex: 999999999
    };
    var _config = function(options) {
        if (typeof options === "object" && options !== null)
            for (var prop in options)
                if (_hasOwn.call(options, prop))
                    if (/^(?:forceHandCursor|title|zIndex|bubbleEvents)$/.test(prop)) _globalConfig[prop] = options[prop];
                    else if (_flashState.bridge == null)
            if (prop === "containerId" || prop === "swfObjectId")
                if (_isValidHtml4Id(options[prop])) _globalConfig[prop] = options[prop];
                else throw new Error("The specified `" + prop + "` value is not valid as an HTML4 Element ID");
        else _globalConfig[prop] = options[prop];
        if (typeof options === "string" && options) {
            if (_hasOwn.call(_globalConfig, options)) return _globalConfig[options];
            return;
        }
        return _deepCopy(_globalConfig);
    };
    var _state = function() {
        return {
            browser: _pick(_navigator, ["userAgent", "platform", "appName"]),
            flash: _omit(_flashState, ["bridge"]),
            zeroclipboard: {
                version: ZeroClipboard.version,
                config: ZeroClipboard.config()
            }
        };
    };
    var _isFlashUnusable = function() {
        return !!(_flashState.disabled || _flashState.outdated || _flashState.unavailable || _flashState.deactivated);
    };
    var _on = function(eventType, listener) {
        var i, len, events, added = {};
        if (typeof eventType === "string" && eventType) events = eventType.toLowerCase().split(/\s+/);
        else if (typeof eventType === "object" && eventType && typeof listener === "undefined")
            for (i in eventType)
                if (_hasOwn.call(eventType, i) && typeof i === "string" && i && typeof eventType[i] === "function") ZeroClipboard.on(i, eventType[i]);
        if (events && events.length) {
            for (i = 0, len = events.length; i < len; i++) {
                eventType = events[i].replace(/^on/, "");
                added[eventType] = true;
                if (!_handlers[eventType]) _handlers[eventType] = [];
                _handlers[eventType].push(listener);
            }
            if (added.ready && _flashState.ready) ZeroClipboard.emit({
                type: "ready"
            });
            if (added.error) {
                var errorTypes = ["disabled", "outdated", "unavailable", "deactivated", "overdue"];
                for (i = 0, len = errorTypes.length; i < len; i++)
                    if (_flashState[errorTypes[i]] === true) {
                        ZeroClipboard.emit({
                            type: "error",
                            name: "flash-" + errorTypes[i]
                        });
                        break;
                    }
            }
        }
        return ZeroClipboard;
    };
    var _off = function(eventType, listener) {
        var i, len, foundIndex, events, perEventHandlers;
        if (arguments.length === 0) events = _objectKeys(_handlers);
        else if (typeof eventType === "string" && eventType) events = eventType.split(/\s+/);
        else if (typeof eventType === "object" && eventType && typeof listener === "undefined")
            for (i in eventType)
                if (_hasOwn.call(eventType, i) && typeof i === "string" && i && typeof eventType[i] === "function") ZeroClipboard.off(i, eventType[i]);
        if (events && events.length)
            for (i = 0, len = events.length; i < len; i++) {
                eventType = events[i].toLowerCase().replace(/^on/, "");
                perEventHandlers = _handlers[eventType];
                if (perEventHandlers && perEventHandlers.length)
                    if (listener) {
                        foundIndex = _inArray(listener, perEventHandlers);
                        while (foundIndex !== -1) {
                            perEventHandlers.splice(foundIndex, 1);
                            foundIndex = _inArray(listener, perEventHandlers, foundIndex);
                        }
                    } else perEventHandlers.length = 0;
            }
        return ZeroClipboard;
    };
    var _listeners = function(eventType) {
        var copy;
        if (typeof eventType === "string" && eventType) copy = _deepCopy(_handlers[eventType]) || null;
        else copy = _deepCopy(_handlers);
        return copy;
    };
    var _emit = function(event) {
        var eventCopy, returnVal, tmp;
        event = _createEvent(event);
        if (!event) return;
        if (_preprocessEvent(event)) return;
        if (event.type === "ready" && _flashState.overdue === true) return ZeroClipboard.emit({
            type: "error",
            name: "flash-overdue"
        });
        eventCopy = _extend({}, event);
        _dispatchCallbacks.call(this, eventCopy);
        if (event.type === "copy") {
            tmp = _mapClipDataToFlash(_clipData);
            returnVal = tmp.data;
            _clipDataFormatMap = tmp.formatMap;
        }
        return returnVal;
    };
    var _create = function() {
        if (typeof _flashState.ready !== "boolean") _flashState.ready = false;
        if (!ZeroClipboard.isFlashUnusable() && _flashState.bridge === null) {
            var maxWait = _globalConfig.flashLoadTimeout;
            if (typeof maxWait === "number" && maxWait >= 0) _setTimeout(function() {
                if (typeof _flashState.deactivated !== "boolean") _flashState.deactivated = true;
                if (_flashState.deactivated === true) ZeroClipboard.emit({
                    type: "error",
                    name: "flash-deactivated"
                });
            }, maxWait);
            _flashState.overdue = false;
            _embedSwf();
        }
    };
    var _destroy = function() {
        ZeroClipboard.clearData();
        ZeroClipboard.deactivate();
        ZeroClipboard.emit("destroy");
        _unembedSwf();
        ZeroClipboard.off();
    };
    var _setData = function(format, data) {
        var dataObj;
        if (typeof format === "object" && format && typeof data === "undefined") {
            dataObj = format;
            ZeroClipboard.clearData();
        } else if (typeof format === "string" && format) {
            dataObj = {};
            dataObj[format] = data;
        } else return;
        for (var dataFormat in dataObj)
            if (typeof dataFormat === "string" && dataFormat && _hasOwn.call(dataObj, dataFormat) && typeof dataObj[dataFormat] === "string" && dataObj[dataFormat]) _clipData[dataFormat] = dataObj[dataFormat];
    };
    var _clearData = function(format) {
        if (typeof format === "undefined") {
            _deleteOwnProperties(_clipData);
            _clipDataFormatMap = null;
        } else if (typeof format === "string" && _hasOwn.call(_clipData, format)) delete _clipData[format];
    };
    var _activate = function(element) {
        if (!(element && element.nodeType === 1)) return;
        if (_currentElement) {
            _removeClass(_currentElement, _globalConfig.activeClass);
            if (_currentElement !== element) _removeClass(_currentElement, _globalConfig.hoverClass);
        }
        _currentElement = element;
        _addClass(element, _globalConfig.hoverClass);
        var newTitle = element.getAttribute("title") || _globalConfig.title;
        if (typeof newTitle === "string" && newTitle) {
            var htmlBridge = _getHtmlBridge(_flashState.bridge);
            if (htmlBridge) htmlBridge.setAttribute("title", newTitle);
        }
        var useHandCursor = _globalConfig.forceHandCursor === true || _getStyle(element, "cursor") === "pointer";
        _setHandCursor(useHandCursor);
        _reposition();
    };
    var _deactivate = function() {
        var htmlBridge = _getHtmlBridge(_flashState.bridge);
        if (htmlBridge) {
            htmlBridge.removeAttribute("title");
            htmlBridge.style.left = "0px";
            htmlBridge.style.top = "-9999px";
            htmlBridge.style.width = "1px";
            htmlBridge.style.top = "1px";
        }
        if (_currentElement) {
            _removeClass(_currentElement, _globalConfig.hoverClass);
            _removeClass(_currentElement, _globalConfig.activeClass);
            _currentElement = null;
        }
    };
    var _isValidHtml4Id = function(id) {
        return typeof id === "string" && id && /^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(id);
    };
    var _createEvent = function(event) {
        var eventType;
        if (typeof event === "string" && event) {
            eventType = event;
            event = {};
        } else if (typeof event === "object" && event && typeof event.type === "string" && event.type) eventType = event.type;
        if (!eventType) return;
        _extend(event, {
            type: eventType.toLowerCase(),
            target: event.target || _currentElement || null,
            relatedTarget: event.relatedTarget || null,
            currentTarget: _flashState && _flashState.bridge || null,
            timeStamp: event.timeStamp || _now() || null
        });
        var msg = _eventMessages[event.type];
        if (event.type === "error" && event.name && msg) msg = msg[event.name];
        if (msg) event.message = msg;
        if (event.type === "ready") _extend(event, {
            target: null,
            version: _flashState.version
        });
        if (event.type === "error") {
            if (/^flash-(disabled|outdated|unavailable|deactivated|overdue)$/.test(event.name)) _extend(event, {
                target: null,
                minimumVersion: _minimumFlashVersion
            });
            if (/^flash-(outdated|unavailable|deactivated|overdue)$/.test(event.name)) _extend(event, {
                version: _flashState.version
            });
        }
        if (event.type === "copy") event.clipboardData = {
            setData: ZeroClipboard.setData,
            clearData: ZeroClipboard.clearData
        };
        if (event.type === "aftercopy") event = _mapClipResultsFromFlash(event, _clipDataFormatMap);
        if (event.target && !event.relatedTarget) event.relatedTarget = _getRelatedTarget(event.target);
        event = _addMouseData(event);
        return event;
    };
    var _getRelatedTarget = function(targetEl) {
        var relatedTargetId = targetEl && targetEl.getAttribute && targetEl.getAttribute("data-clipboard-target");
        return relatedTargetId ? _document.getElementById(relatedTargetId) : null;
    };
    var _addMouseData = function(event) {
        if (event && /^_(?:click|mouse(?:over|out|down|up|move))$/.test(event.type)) {
            var srcElement = event.target;
            var fromElement = event.type === "_mouseover" && event.relatedTarget ? event.relatedTarget : undefined;
            var toElement = event.type === "_mouseout" && event.relatedTarget ? event.relatedTarget : undefined;
            var pos = _getDOMObjectPosition(srcElement);
            var screenLeft = _window.screenLeft || _window.screenX || 0;
            var screenTop = _window.screenTop || _window.screenY || 0;
            var scrollLeft = _document.body.scrollLeft + _document.documentElement.scrollLeft;
            var scrollTop = _document.body.scrollTop + _document.documentElement.scrollTop;
            var pageX = pos.left + (typeof event._stageX === "number" ? event._stageX : 0);
            var pageY = pos.top + (typeof event._stageY === "number" ? event._stageY : 0);
            var clientX = pageX - scrollLeft;
            var clientY = pageY - scrollTop;
            var screenX = screenLeft + clientX;
            var screenY = screenTop + clientY;
            var moveX = typeof event.movementX === "number" ? event.movementX : 0;
            var moveY = typeof event.movementY === "number" ? event.movementY : 0;
            delete event._stageX;
            delete event._stageY;
            _extend(event, {
                srcElement: srcElement,
                fromElement: fromElement,
                toElement: toElement,
                screenX: screenX,
                screenY: screenY,
                pageX: pageX,
                pageY: pageY,
                clientX: clientX,
                clientY: clientY,
                x: clientX,
                y: clientY,
                movementX: moveX,
                movementY: moveY,
                offsetX: 0,
                offsetY: 0,
                layerX: 0,
                layerY: 0
            });
        }
        return event;
    };
    var _shouldPerformAsync = function(event) {
        var eventType = event && typeof event.type === "string" && event.type || "";
        return !/^(?:(?:before)?copy|destroy)$/.test(eventType);
    };
    var _dispatchCallback = function(func, context, args, async) {
        if (async) _setTimeout(function() {
            func.apply(context, args);
        }, 0);
        else func.apply(context, args);
    };
    var _dispatchCallbacks = function(event) {
        if (!(typeof event === "object" && event && event.type)) return;
        var async = _shouldPerformAsync(event);
        var wildcardTypeHandlers = _handlers["*"] || [];
        var specificTypeHandlers = _handlers[event.type] || [];
        var handlers = wildcardTypeHandlers.concat(specificTypeHandlers);
        if (handlers && handlers.length) {
            var i, len, func, context, eventCopy, originalContext = this;
            for (i = 0, len = handlers.length; i < len; i++) {
                func = handlers[i];
                context = originalContext;
                if (typeof func === "string" && typeof _window[func] === "function") func = _window[func];
                if (typeof func === "object" && func && typeof func.handleEvent === "function") {
                    context = func;
                    func = func.handleEvent;
                }
                if (typeof func === "function") {
                    eventCopy = _extend({}, event);
                    _dispatchCallback(func, context, [eventCopy], async);
                }
            }
        }
        return this;
    };
    var _preprocessEvent = function(event) {
        var element = event.target || _currentElement || null;
        var sourceIsSwf = event._source === "swf";
        delete event._source;
        switch (event.type) {
            case "error":
                if (_inArray(event.name, ["flash-disabled", "flash-outdated", "flash-deactivated", "flash-overdue"])) _extend(_flashState, {
                    disabled: event.name === "flash-disabled",
                    outdated: event.name === "flash-outdated",
                    unavailable: event.name === "flash-unavailable",
                    deactivated: event.name === "flash-deactivated",
                    overdue: event.name === "flash-overdue",
                    ready: false
                });
                break;
            case "ready":
                var wasDeactivated = _flashState.deactivated === true;
                _extend(_flashState, {
                    disabled: false,
                    outdated: false,
                    unavailable: false,
                    deactivated: false,
                    overdue: wasDeactivated,
                    ready: !wasDeactivated
                });
                break;
            case "copy":
                var textContent, htmlContent, targetEl = event.relatedTarget;
                if (!(_clipData["text/html"] || _clipData["text/plain"]) && targetEl && (htmlContent = targetEl.value || targetEl.outerHTML || targetEl.innerHTML) && (textContent = targetEl.value || targetEl.textContent || targetEl.innerText)) {
                    event.clipboardData.clearData();
                    event.clipboardData.setData("text/plain", textContent);
                    if (htmlContent !== textContent) event.clipboardData.setData("text/html", htmlContent);
                } else if (!_clipData["text/plain"] && event.target && (textContent = event.target.getAttribute("data-clipboard-text"))) {
                    event.clipboardData.clearData();
                    event.clipboardData.setData("text/plain", textContent);
                }
                break;
            case "aftercopy":
                ZeroClipboard.clearData();
                if (element && element !== _safeActiveElement() && element.focus) element.focus();
                break;
            case "_mouseover":
                ZeroClipboard.activate(element);
                if (_globalConfig.bubbleEvents === true && sourceIsSwf) {
                    _fireMouseEvent(_extend({}, event, {
                        type: "mouseover"
                    }));
                    _fireMouseEvent(_extend({}, event, {
                        type: "mouseenter",
                        bubbles: false,
                        cancelable: false
                    }));
                }
                break;
            case "_mouseout":
                ZeroClipboard.deactivate();
                if (_globalConfig.bubbleEvents === true && sourceIsSwf) {
                    _fireMouseEvent(_extend({}, event, {
                        type: "mouseout"
                    }));
                    _fireMouseEvent(_extend({}, event, {
                        type: "mouseleave",
                        bubbles: false,
                        cancelable: false
                    }));
                }
                break;
            case "_mousedown":
                _addClass(element, _globalConfig.activeClass);
                if (_globalConfig.bubbleEvents === true && sourceIsSwf) _fireMouseEvent(_extend({}, event, {
                    type: event.type.slice(1)
                }));
                break;
            case "_mouseup":
                _removeClass(element, _globalConfig.activeClass);
                if (_globalConfig.bubbleEvents === true && sourceIsSwf) _fireMouseEvent(_extend({}, event, {
                    type: event.type.slice(1)
                }));
                break;
            case "_click":
            case "_mousemove":
                if (_globalConfig.bubbleEvents === true && sourceIsSwf) _fireMouseEvent(_extend({}, event, {
                    type: event.type.slice(1)
                }));
                break;
        }
        if (/^_(?:click|mouse(?:over|out|down|up|move))$/.test(event.type)) return true;
    };
    var _fireMouseEvent = function(event) {
        if (!(event && typeof event.type === "string" && event)) return;
        var e, target = event.target || event.srcElement || null,
            doc = target && target.ownerDocument || _document,
            defaults = {
                view: doc.defaultView || _window,
                canBubble: true,
                cancelable: true,
                detail: event.type === "click" ? 1 : 0,
                button: typeof event.which === "number" ? event.which - 1 : typeof event.button === "number" ? event.button : doc.createEvent ? 0 : 1
            },
            args = _extend(defaults, event);
        if (!target) return;
        if (doc.createEvent && target.dispatchEvent) {
            args = [args.type, args.canBubble, args.cancelable, args.view, args.detail, args.screenX, args.screenY, args.clientX, args.clientY, args.ctrlKey, args.altKey, args.shiftKey, args.metaKey, args.button, args.relatedTarget];
            e = doc.createEvent("MouseEvents");
            if (e.initMouseEvent) {
                e.initMouseEvent.apply(e, args);
                target.dispatchEvent(e);
            }
        } else if (doc.createEventObject && target.fireEvent) {
            e = doc.createEventObject(args);
            target.fireEvent("on" + args.type, e);
        }
    };
    var _createHtmlBridge = function() {
        var container = _document.createElement("div");
        container.id = _globalConfig.containerId;
        container.className = _globalConfig.containerClass;
        container.style.position = "absolute";
        container.style.left = "0px";
        container.style.top = "-9999px";
        container.style.width = "1px";
        container.style.height = "1px";
        container.style.zIndex = "" + _getSafeZIndex(_globalConfig.zIndex);
        return container;
    };
    var _getHtmlBridge = function(flashBridge) {
        var htmlBridge = flashBridge && flashBridge.parentNode;
        while (htmlBridge && htmlBridge.nodeName === "OBJECT" && htmlBridge.parentNode) htmlBridge = htmlBridge.parentNode;
        return htmlBridge || null;
    };
    var _embedSwf = function() {
        var len, flashBridge = _flashState.bridge,
            container = _getHtmlBridge(flashBridge);
        if (!flashBridge) {
            var allowScriptAccess = _determineScriptAccess(_window.location.host, _globalConfig);
            var allowNetworking = allowScriptAccess === "never" ? "none" : "all";
            var flashvars = _vars(_globalConfig);
            var swfUrl = _globalConfig.swfPath + _cacheBust(_globalConfig.swfPath, _globalConfig);
            container = _createHtmlBridge();
            var divToBeReplaced = _document.createElement("div");
            container.appendChild(divToBeReplaced);
            _document.body.appendChild(container);
            var tmpDiv = _document.createElement("div");
            var oldIE = _flashState.pluginType === "activex";
            tmpDiv.innerHTML = '<object id="' + _globalConfig.swfObjectId + '" name="' + _globalConfig.swfObjectId + '" ' + 'width="100%" height="100%" ' + (oldIE ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"' : 'type="application/x-shockwave-flash" data="' + swfUrl + '"') + ">" + (oldIE ? '<param name="movie" value="' + swfUrl + '"/>' : "") + '<param name="allowScriptAccess" value="' + allowScriptAccess + '"/>' + '<param name="allowNetworking" value="' + allowNetworking + '"/>' + '<param name="menu" value="false"/>' + '<param name="wmode" value="transparent"/>' + '<param name="flashvars" value="' + flashvars + '"/>' + "</object>";
            flashBridge = tmpDiv.firstChild;
            tmpDiv = null;
            flashBridge.ZeroClipboard = ZeroClipboard;
            container.replaceChild(flashBridge, divToBeReplaced);
        }
        if (!flashBridge) {
            flashBridge = _document[_globalConfig.swfObjectId];
            if (flashBridge && (len = flashBridge.length)) flashBridge = flashBridge[len - 1];
            if (!flashBridge && container) flashBridge = container.firstChild;
        }
        _flashState.bridge = flashBridge || null;
        return flashBridge;
    };
    var _unembedSwf = function() {
        var flashBridge = _flashState.bridge;
        if (flashBridge) {
            var htmlBridge = _getHtmlBridge(flashBridge);
            if (htmlBridge)
                if (_flashState.pluginType === "activex" && "readyState" in flashBridge) {
                    flashBridge.style.display = "none";
                    (function removeSwfFromIE() {
                        if (flashBridge.readyState === 4) {
                            for (var prop in flashBridge)
                                if (typeof flashBridge[prop] === "function") flashBridge[prop] = null;
                            if (flashBridge.parentNode) flashBridge.parentNode.removeChild(flashBridge);
                            if (htmlBridge.parentNode) htmlBridge.parentNode.removeChild(htmlBridge);
                        } else _setTimeout(removeSwfFromIE, 10);
                    })();
                } else {
                    if (flashBridge.parentNode) flashBridge.parentNode.removeChild(flashBridge);
                    if (htmlBridge.parentNode) htmlBridge.parentNode.removeChild(htmlBridge);
                }
            _flashState.ready = null;
            _flashState.bridge = null;
            _flashState.deactivated = null;
        }
    };
    var _mapClipDataToFlash = function(clipData) {
        var newClipData = {},
            formatMap = {};
        if (!(typeof clipData === "object" && clipData)) return;
        for (var dataFormat in clipData)
            if (dataFormat && _hasOwn.call(clipData, dataFormat) && typeof clipData[dataFormat] === "string" && clipData[dataFormat]) switch (dataFormat.toLowerCase()) {
                case "text/plain":
                case "text":
                case "air:text":
                case "flash:text":
                    newClipData.text = clipData[dataFormat];
                    formatMap.text = dataFormat;
                    break;
                case "text/html":
                case "html":
                case "air:html":
                case "flash:html":
                    newClipData.html = clipData[dataFormat];
                    formatMap.html = dataFormat;
                    break;
                case "application/rtf":
                case "text/rtf":
                case "rtf":
                case "richtext":
                case "air:rtf":
                case "flash:rtf":
                    newClipData.rtf = clipData[dataFormat];
                    formatMap.rtf = dataFormat;
                    break;
                default:
                    break;
            }
            return {
                data: newClipData,
                formatMap: formatMap
            };
    };
    var _mapClipResultsFromFlash = function(clipResults, formatMap) {
        if (!(typeof clipResults === "object" && clipResults && typeof formatMap === "object" && formatMap)) return clipResults;
        var newResults = {};
        for (var prop in clipResults)
            if (_hasOwn.call(clipResults, prop)) {
                if (prop !== "success" && prop !== "data") {
                    newResults[prop] = clipResults[prop];
                    continue;
                }
                newResults[prop] = {};
                var tmpHash = clipResults[prop];
                for (var dataFormat in tmpHash)
                    if (dataFormat && _hasOwn.call(tmpHash, dataFormat) && _hasOwn.call(formatMap, dataFormat)) newResults[prop][formatMap[dataFormat]] = tmpHash[dataFormat];
            }
        return newResults;
    };
    var _cacheBust = function(path, options) {
        var cacheBust = options == null || options && options.cacheBust === true;
        if (cacheBust) return (path.indexOf("?") === -1 ? "?" : "&") + "noCache=" + _now();
        else return "";
    };
    var _vars = function(options) {
        var i, len, domain, domains, str = "",
            trustedOriginsExpanded = [];
        if (options.trustedDomains)
            if (typeof options.trustedDomains === "string") domains = [options.trustedDomains];
            else if (typeof options.trustedDomains === "object" && "length" in options.trustedDomains) domains = options.trustedDomains;
        if (domains && domains.length)
            for (i = 0, len = domains.length; i < len; i++)
                if (_hasOwn.call(domains, i) && domains[i] && typeof domains[i] === "string") {
                    domain = _extractDomain(domains[i]);
                    if (!domain) continue;
                    if (domain === "*") {
                        trustedOriginsExpanded = [domain];
                        break;
                    }
                    trustedOriginsExpanded.push.apply(trustedOriginsExpanded, [domain, "//" + domain, _window.location.protocol + "//" + domain]);
                }
        if (trustedOriginsExpanded.length) str += "trustedOrigins=" + _encodeURIComponent(trustedOriginsExpanded.join(","));
        if (options.forceEnhancedClipboard === true) str += (str ? "&" : "") + "forceEnhancedClipboard=true";
        if (typeof options.swfObjectId === "string" && options.swfObjectId) str += (str ? "&" : "") + "swfObjectId=" + _encodeURIComponent(options.swfObjectId);
        return str;
    };
    var _extractDomain = function(originOrUrl) {
        if (originOrUrl == null || originOrUrl === "") return null;
        originOrUrl = originOrUrl.replace(/^\s+|\s+$/g, "");
        if (originOrUrl === "") return null;
        var protocolIndex = originOrUrl.indexOf("//");
        originOrUrl = protocolIndex === -1 ? originOrUrl : originOrUrl.slice(protocolIndex + 2);
        var pathIndex = originOrUrl.indexOf("/");
        originOrUrl = pathIndex === -1 ? originOrUrl : protocolIndex === -1 || pathIndex === 0 ? null : originOrUrl.slice(0, pathIndex);
        if (originOrUrl && originOrUrl.slice(-4).toLowerCase() === ".swf") return null;
        return originOrUrl || null;
    };
    var _determineScriptAccess = function() {
        var _extractAllDomains = function(origins, resultsArray) {
            var i, len, tmp;
            if (origins == null || resultsArray[0] === "*") return;
            if (typeof origins === "string") origins = [origins];
            if (!(typeof origins === "object" && typeof origins.length === "number")) return;
            for (i = 0, len = origins.length; i < len; i++)
                if (_hasOwn.call(origins, i) && (tmp = _extractDomain(origins[i]))) {
                    if (tmp === "*") {
                        resultsArray.length = 0;
                        resultsArray.push("*");
                        break;
                    }
                    if (_inArray(tmp, resultsArray) === -1) resultsArray.push(tmp);
                }
        };
        return function(currentDomain, configOptions) {
            var swfDomain = _extractDomain(configOptions.swfPath);
            if (swfDomain === null) swfDomain = currentDomain;
            var trustedDomains = [];
            _extractAllDomains(configOptions.trustedOrigins, trustedDomains);
            _extractAllDomains(configOptions.trustedDomains, trustedDomains);
            var len = trustedDomains.length;
            if (len > 0) {
                if (len === 1 && trustedDomains[0] === "*") return "always";
                if (_inArray(currentDomain, trustedDomains) !== -1) {
                    if (len === 1 && currentDomain === swfDomain) return "sameDomain";
                    return "always";
                }
            }
            return "never";
        };
    }();
    var _safeActiveElement = function() {
        try {
            return _document.activeElement;
        } catch (err) {
            return null;
        }
    };
    var _addClass = function(element, value) {
        if (!element || element.nodeType !== 1) return element;
        if (element.classList) {
            if (!element.classList.contains(value)) element.classList.add(value);
            return element;
        }
        if (value && typeof value === "string") {
            var classNames = (value || "").split(/\s+/);
            if (element.nodeType === 1)
                if (!element.className) element.className = value;
                else {
                    var className = " " + element.className + " ",
                        setClass = element.className;
                    for (var c = 0, cl = classNames.length; c < cl; c++)
                        if (className.indexOf(" " + classNames[c] + " ") < 0) setClass += " " + classNames[c];
                    element.className = setClass.replace(/^\s+|\s+$/g, "");
                }
        }
        return element;
    };
    var _removeClass = function(element, value) {
        if (!element || element.nodeType !== 1) return element;
        if (element.classList) {
            if (element.classList.contains(value)) element.classList.remove(value);
            return element;
        }
        if (typeof value === "string" && value) {
            var classNames = value.split(/\s+/);
            if (element.nodeType === 1 && element.className) {
                var className = (" " + element.className + " ").replace(/[\n\t]/g, " ");
                for (var c = 0, cl = classNames.length; c < cl; c++) className = className.replace(" " + classNames[c] + " ", " ");
                element.className = className.replace(/^\s+|\s+$/g, "");
            }
        }
        return element;
    };
    var _camelizeCssPropName = function() {
        var matcherRegex = /\-([a-z])/g,
            replacerFn = function(match, group) {
                return group.toUpperCase();
            };
        return function(prop) {
            return prop.replace(matcherRegex, replacerFn);
        };
    }();
    var _getStyle = function(el, prop) {
        var value, camelProp, tagName;
        if (_window.getComputedStyle) value = _window.getComputedStyle(el, null).getPropertyValue(prop);
        else {
            camelProp = _camelizeCssPropName(prop);
            if (el.currentStyle) value = el.currentStyle[camelProp];
            else value = el.style[camelProp];
        }
        if (prop === "cursor")
            if (!value || value === "auto") {
                tagName = el.tagName.toLowerCase();
                if (tagName === "a") return "pointer";
            }
        return value;
    };
    var _getZoomFactor = function() {
        var rect, physicalWidth, logicalWidth, zoomFactor = 1;
        if (typeof _document.body.getBoundingClientRect === "function") {
            rect = _document.body.getBoundingClientRect();
            physicalWidth = rect.right - rect.left;
            logicalWidth = _document.body.offsetWidth;
            zoomFactor = _Math.round(physicalWidth / logicalWidth * 100) / 100;
        }
        return zoomFactor;
    };
    var _getDOMObjectPosition = function(obj) {
        var info = {
            left: 0,
            top: 0,
            width: 0,
            height: 0
        };
        if (obj.getBoundingClientRect) {
            var rect = obj.getBoundingClientRect();
            var pageXOffset, pageYOffset, zoomFactor;
            if ("pageXOffset" in _window && "pageYOffset" in _window) {
                pageXOffset = _window.pageXOffset;
                pageYOffset = _window.pageYOffset;
            } else {
                zoomFactor = _getZoomFactor();
                pageXOffset = _Math.round(_document.documentElement.scrollLeft / zoomFactor);
                pageYOffset = _Math.round(_document.documentElement.scrollTop / zoomFactor);
            }
            var leftBorderWidth = _document.documentElement.clientLeft || 0;
            var topBorderWidth = _document.documentElement.clientTop || 0;
            info.left = rect.left + pageXOffset - leftBorderWidth;
            info.top = rect.top + pageYOffset - topBorderWidth;
            info.width = "width" in rect ? rect.width : rect.right - rect.left;
            info.height = "height" in rect ? rect.height : rect.bottom - rect.top;
        }
        return info;
    };
    var _reposition = function() {
        var htmlBridge;
        if (_currentElement && (htmlBridge = _getHtmlBridge(_flashState.bridge))) {
            var pos = _getDOMObjectPosition(_currentElement);
            _extend(htmlBridge.style, {
                width: pos.width + "px",
                height: pos.height + "px",
                top: pos.top + "px",
                left: pos.left + "px",
                zIndex: "" + _getSafeZIndex(_globalConfig.zIndex)
            });
        }
    };
    var _setHandCursor = function(enabled) {
        if (_flashState.ready === true)
            if (_flashState.bridge && typeof _flashState.bridge.setHandCursor === "function") _flashState.bridge.setHandCursor(enabled);
            else _flashState.ready = false;
    };
    var _getSafeZIndex = function(val) {
        if (/^(?:auto|inherit)$/.test(val)) return val;
        var zIndex;
        if (typeof val === "number" && !_isNaN(val)) zIndex = val;
        else if (typeof val === "string") zIndex = _getSafeZIndex(_parseInt(val, 10));
        return typeof zIndex === "number" ? zIndex : "auto";
    };
    var _detectFlashSupport = function(ActiveXObject) {
        var plugin, ax, mimeType, hasFlash = false,
            isActiveX = false,
            isPPAPI = false,
            flashVersion = "";

        function parseFlashVersion(desc) {
            var matches = desc.match(/[\d]+/g);
            matches.length = 3;
            return matches.join(".");
        }

        function isPepperFlash(flashPlayerFileName) {
            return !!flashPlayerFileName && (flashPlayerFileName = flashPlayerFileName.toLowerCase()) && (/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(flashPlayerFileName) || flashPlayerFileName.slice(-13) === "chrome.plugin");
        }

        function inspectPlugin(plugin) {
            if (plugin) {
                hasFlash = true;
                if (plugin.version) flashVersion = parseFlashVersion(plugin.version);
                if (!flashVersion && plugin.description) flashVersion = parseFlashVersion(plugin.description);
                if (plugin.filename) isPPAPI = isPepperFlash(plugin.filename);
            }
        }
        if (_navigator.plugins && _navigator.plugins.length) {
            plugin = _navigator.plugins["Shockwave Flash"];
            inspectPlugin(plugin);
            if (_navigator.plugins["Shockwave Flash 2.0"]) {
                hasFlash = true;
                flashVersion = "2.0.0.11";
            }
        } else if (_navigator.mimeTypes && _navigator.mimeTypes.length) {
            mimeType = _navigator.mimeTypes["application/x-shockwave-flash"];
            plugin = mimeType && mimeType.enabledPlugin;
            inspectPlugin(plugin);
        } else if (typeof ActiveXObject !== "undefined") {
            isActiveX = true;
            try {
                ax = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
                hasFlash = true;
                flashVersion = parseFlashVersion(ax.GetVariable("$version"));
            } catch (e1) {
                try {
                    ax = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                    hasFlash = true;
                    flashVersion = "6.0.21";
                } catch (e2) {
                    try {
                        ax = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                        hasFlash = true;
                        flashVersion = parseFlashVersion(ax.GetVariable("$version"));
                    } catch (e3) {
                        isActiveX = false;
                    }
                }
            }
        }
        _flashState.disabled = hasFlash !== true;
        _flashState.outdated = flashVersion && _parseFloat(flashVersion) < _parseFloat(_minimumFlashVersion);
        _flashState.version = flashVersion || "0.0.0";
        _flashState.pluginType = isPPAPI ? "pepper" : isActiveX ? "activex" : hasFlash ? "netscape" : "unknown";
    };
    _detectFlashSupport(_ActiveXObject);
    var ZeroClipboard = function() {
        if (!(this instanceof ZeroClipboard)) return new ZeroClipboard();
        if (typeof ZeroClipboard._createClient === "function") ZeroClipboard._createClient.apply(this, _args(arguments));
    };
    ZeroClipboard.version = "2.0.1";
    _makeReadOnly(ZeroClipboard, "version");
    ZeroClipboard.config = function() {
        return _config.apply(this, _args(arguments));
    };
    ZeroClipboard.state = function() {
        return _state.apply(this, _args(arguments));
    };
    ZeroClipboard.isFlashUnusable = function() {
        return _isFlashUnusable.apply(this, _args(arguments));
    };
    ZeroClipboard.on = function() {
        return _on.apply(this, _args(arguments));
    };
    ZeroClipboard.off = function() {
        return _off.apply(this, _args(arguments));
    };
    ZeroClipboard.handlers = function() {
        return _listeners.apply(this, _args(arguments));
    };
    ZeroClipboard.emit = function() {
        return _emit.apply(this, _args(arguments));
    };
    ZeroClipboard.create = function() {
        return _create.apply(this, _args(arguments));
    };
    ZeroClipboard.destroy = function() {
        return _destroy.apply(this, _args(arguments));
    };
    ZeroClipboard.setData = function() {
        return _setData.apply(this, _args(arguments));
    };
    ZeroClipboard.clearData = function() {
        return _clearData.apply(this, _args(arguments));
    };
    ZeroClipboard.activate = function() {
        return _activate.apply(this, _args(arguments));
    };
    ZeroClipboard.deactivate = function() {
        return _deactivate.apply(this, _args(arguments));
    };
    var _clientIdCounter = 0;
    var _clientMeta = {};
    var _elementIdCounter = 0;
    var _elementMeta = {};
    var _mouseHandlers = {};
    _extend(_globalConfig, {
        autoActivate: true
    });
    var _clientConstructor = function(elements) {
        var client = this;
        client.id = "" + _clientIdCounter++;
        _clientMeta[client.id] = {
            instance: client,
            elements: [],
            handlers: {}
        };
        if (elements) client.clip(elements);
        ZeroClipboard.on("*", function(event) {
            return client.emit(event);
        });
        ZeroClipboard.on("destroy", function() {
            client.destroy();
        });
        ZeroClipboard.create();
    };
    var _clientOn = function(eventType, listener) {
        var i, len, events, added = {},
            handlers = _clientMeta[this.id] && _clientMeta[this.id].handlers;
        if (typeof eventType === "string" && eventType) events = eventType.toLowerCase().split(/\s+/);
        else if (typeof eventType === "object" && eventType && typeof listener === "undefined")
            for (i in eventType)
                if (_hasOwn.call(eventType, i) && typeof i === "string" && i && typeof eventType[i] === "function") this.on(i, eventType[i]);
        if (events && events.length) {
            for (i = 0, len = events.length; i < len; i++) {
                eventType = events[i].replace(/^on/, "");
                added[eventType] = true;
                if (!handlers[eventType]) handlers[eventType] = [];
                handlers[eventType].push(listener);
            }
            if (added.ready && _flashState.ready) this.emit({
                type: "ready",
                client: this
            });
            if (added.error) {
                var errorTypes = ["disabled", "outdated", "unavailable", "deactivated", "overdue"];
                for (i = 0, len = errorTypes.length; i < len; i++)
                    if (_flashState[errorTypes[i]]) {
                        this.emit({
                            type: "error",
                            name: "flash-" + errorTypes[i],
                            client: this
                        });
                        break;
                    }
            }
        }
        return this;
    };
    var _clientOff = function(eventType, listener) {
        var i, len, foundIndex, events, perEventHandlers, handlers = _clientMeta[this.id] && _clientMeta[this.id].handlers;
        if (arguments.length === 0) events = _objectKeys(handlers);
        else if (typeof eventType === "string" && eventType) events = eventType.split(/\s+/);
        else if (typeof eventType === "object" && eventType && typeof listener === "undefined")
            for (i in eventType)
                if (_hasOwn.call(eventType, i) && typeof i === "string" && i && typeof eventType[i] === "function") this.off(i, eventType[i]);
        if (events && events.length)
            for (i = 0, len = events.length; i < len; i++) {
                eventType = events[i].toLowerCase().replace(/^on/, "");
                perEventHandlers = handlers[eventType];
                if (perEventHandlers && perEventHandlers.length)
                    if (listener) {
                        foundIndex = _inArray(listener, perEventHandlers);
                        while (foundIndex !== -1) {
                            perEventHandlers.splice(foundIndex, 1);
                            foundIndex = _inArray(listener, perEventHandlers, foundIndex);
                        }
                    } else perEventHandlers.length = 0;
            }
        return this;
    };
    var _clientListeners = function(eventType) {
        var copy = null,
            handlers = _clientMeta[this.id] && _clientMeta[this.id].handlers;
        if (handlers)
            if (typeof eventType === "string" && eventType) copy = handlers[eventType] ? handlers[eventType].slice(0) : [];
            else copy = _deepCopy(handlers);
        return copy;
    };
    var _clientEmit = function(event) {
        if (_clientShouldEmit.call(this, event)) {
            if (typeof event === "object" && event && typeof event.type === "string" && event.type) event = _extend({}, event);
            var eventCopy = _extend({}, _createEvent(event), {
                client: this
            });
            _clientDispatchCallbacks.call(this, eventCopy);
        }
        return this;
    };
    var _clientClip = function(elements) {
        elements = _prepClip(elements);
        for (var i = 0; i < elements.length; i++)
            if (_hasOwn.call(elements, i) && elements[i] && elements[i].nodeType === 1) {
                if (!elements[i].zcClippingId) {
                    elements[i].zcClippingId = "zcClippingId_" + _elementIdCounter++;
                    _elementMeta[elements[i].zcClippingId] = [this.id];
                    if (_globalConfig.autoActivate === true) _addMouseHandlers(elements[i]);
                } else if (_inArray(this.id, _elementMeta[elements[i].zcClippingId]) === -1) _elementMeta[elements[i].zcClippingId].push(this.id);
                var clippedElements = _clientMeta[this.id] && _clientMeta[this.id].elements;
                if (_inArray(elements[i], clippedElements) === -1) clippedElements.push(elements[i]);
            }
        return this;
    };
    var _clientUnclip = function(elements) {
        var meta = _clientMeta[this.id];
        if (!meta) return this;
        var clippedElements = meta.elements;
        var arrayIndex;
        if (typeof elements === "undefined") elements = clippedElements.slice(0);
        else elements = _prepClip(elements);
        for (var i = elements.length; i--;)
            if (_hasOwn.call(elements, i) && elements[i] && elements[i].nodeType === 1) {
                arrayIndex = 0;
                while ((arrayIndex = _inArray(elements[i], clippedElements, arrayIndex)) !== -1) clippedElements.splice(arrayIndex, 1);
                var clientIds = _elementMeta[elements[i].zcClippingId];
                if (clientIds) {
                    arrayIndex = 0;
                    while ((arrayIndex = _inArray(this.id, clientIds, arrayIndex)) !== -1) clientIds.splice(arrayIndex, 1);
                    if (clientIds.length === 0) {
                        if (_globalConfig.autoActivate === true) _removeMouseHandlers(elements[i]);
                        delete elements[i].zcClippingId;
                    }
                }
            }
        return this;
    };
    var _clientElements = function() {
        var meta = _clientMeta[this.id];
        return meta && meta.elements ? meta.elements.slice(0) : [];
    };
    var _clientDestroy = function() {
        this.unclip();
        this.off();
        delete _clientMeta[this.id];
    };
    var _clientShouldEmit = function(event) {
        if (!(event && event.type)) return false;
        if (event.client && event.client !== this) return false;
        var clippedEls = _clientMeta[this.id] && _clientMeta[this.id].elements;
        var hasClippedEls = !!clippedEls && clippedEls.length > 0;
        var goodTarget = !event.target || hasClippedEls && _inArray(event.target, clippedEls) !== -1;
        var goodRelTarget = event.relatedTarget && hasClippedEls && _inArray(event.relatedTarget, clippedEls) !== -1;
        var goodClient = event.client && event.client === this;
        if (!(goodTarget || goodRelTarget || goodClient)) return false;
        return true;
    };
    var _clientDispatchCallbacks = function(event) {
        if (!(typeof event === "object" && event && event.type)) return;
        var async = _shouldPerformAsync(event);
        var wildcardTypeHandlers = _clientMeta[this.id] && _clientMeta[this.id].handlers["*"] || [];
        var specificTypeHandlers = _clientMeta[this.id] && _clientMeta[this.id].handlers[event.type] || [];
        var handlers = wildcardTypeHandlers.concat(specificTypeHandlers);
        if (handlers && handlers.length) {
            var i, len, func, context, eventCopy, originalContext = this;
            for (i = 0, len = handlers.length; i < len; i++) {
                func = handlers[i];
                context = originalContext;
                if (typeof func === "string" && typeof _window[func] === "function") func = _window[func];
                if (typeof func === "object" && func && typeof func.handleEvent === "function") {
                    context = func;
                    func = func.handleEvent;
                }
                if (typeof func === "function") {
                    eventCopy = _extend({}, event);
                    _dispatchCallback(func, context, [eventCopy], async);
                }
            }
        }
        return this;
    };
    var _prepClip = function(elements) {
        if (typeof elements === "string") elements = [];
        return typeof elements.length !== "number" ? [elements] : elements;
    };
    var _addEventHandler = function(element, method, func) {
        if (!element || element.nodeType !== 1) return element;
        if (element.addEventListener) element.addEventListener(method, func, false);
        else if (element.attachEvent) element.attachEvent("on" + method, func);
        return element;
    };
    var _removeEventHandler = function(element, method, func) {
        if (!element || element.nodeType !== 1) return element;
        if (element.removeEventListener) element.removeEventListener(method, func, false);
        else if (element.detachEvent) element.detachEvent("on" + method, func);
        return element;
    };
    var _addMouseHandlers = function(element) {
        if (!(element && element.nodeType === 1)) return;
        var _elementMouseOver = function(event) {
            if (!(event || _window.event)) return;
            ZeroClipboard.activate(element);
        };
        _addEventHandler(element, "mouseover", _elementMouseOver);
        _mouseHandlers[element.zcClippingId] = {
            mouseover: _elementMouseOver
        };
    };
    var _removeMouseHandlers = function(element) {
        if (!(element && element.nodeType === 1)) return;
        var mouseHandlers = _mouseHandlers[element.zcClippingId];
        if (!(typeof mouseHandlers === "object" && mouseHandlers)) return;
        if (typeof mouseHandlers.mouseover === "function") _removeEventHandler(element, "mouseover", mouseHandlers.mouseover);
        delete _mouseHandlers[element.zcClippingId];
    };
    ZeroClipboard._createClient = function() {
        _clientConstructor.apply(this, _args(arguments));
    };
    ZeroClipboard.prototype.on = function() {
        return _clientOn.apply(this, _args(arguments));
    };
    ZeroClipboard.prototype.off = function() {
        return _clientOff.apply(this, _args(arguments));
    };
    ZeroClipboard.prototype.handlers = function() {
        return _clientListeners.apply(this, _args(arguments));
    };
    ZeroClipboard.prototype.emit = function() {
        return _clientEmit.apply(this, _args(arguments));
    };
    ZeroClipboard.prototype.clip = function() {
        return _clientClip.apply(this, _args(arguments));
    };
    ZeroClipboard.prototype.unclip = function() {
        return _clientUnclip.apply(this, _args(arguments));
    };
    ZeroClipboard.prototype.elements = function() {
        return _clientElements.apply(this, _args(arguments));
    };
    ZeroClipboard.prototype.destroy = function() {
        return _clientDestroy.apply(this, _args(arguments));
    };
    ZeroClipboard.prototype.setText = function(text) {
        ZeroClipboard.setData("text/plain", text);
        return this;
    };
    ZeroClipboard.prototype.setHtml = function(html) {
        ZeroClipboard.setData("text/html", html);
        return this;
    };
    ZeroClipboard.prototype.setRichText = function(richText) {
        ZeroClipboard.setData("application/rtf", richText);
        return this;
    };
    ZeroClipboard.prototype.setData = function() {
        ZeroClipboard.setData.apply(this, _args(arguments));
        return this;
    };
    ZeroClipboard.prototype.clearData = function() {
        ZeroClipboard.clearData.apply(this, _args(arguments));
        return this;
    };
    if (typeof define === "function" && define.amd) define(function() {
        return ZeroClipboard;
    });
    else if (typeof module === "object" && module && typeof module.exports === "object" && module.exports) module.exports = ZeroClipboard;
    else window.ZeroClipboard = ZeroClipboard;
})(function() {
    return this;
}());
window.APP_CONFIG = {
        "REPOSITORY_ALT_URL": null,
        "SERVER_PROJECT_PATH": "/home/ubuntu/apps/barkedu",
        "DEPLOY_TO_SERVERS": false,
        "S3_DEPLOY_URL": null,
        "DEPLOY_SERVICES": false,
        "NPR_DFP": {
            "ENVIRONMENT": "NPRTEST",
            "STORY_ID": "1002",
            "TARGET": "homepage",
            "TESTSERVER": "false"
        },
        "DEBUG": true,
        "DISQUS_UUID": "5f35a9e8-976d-11e4-aaf7-28cfe912bf9d",
        "COPY_PATH": "data/copy.xlsx",
        "GITHUB_USERNAME": "nprapps",
        "DISQUS_API_KEY": "tIbSzEhGBE9NIptbnQWn4wy1gZ546CsQ2IHHtxJiYAceyyPoAkDkVnQfCifmCaQW",
        "DEFAULT_MAX_AGE": 20,
        "ASSETS_MAX_AGE": 86400,
        "ASSETS_S3_BUCKET": {
            "region": "us-east-1",
            "bucket_name": "assets.apps.npr.org"
        },
        "REPOSITORY_NAME": "barkedu",
        "DISQUS_SHORTNAME": "nprviz-test",
        "STAGING_S3_BUCKET": {
            "region": "us-east-1",
            "bucket_name": "stage-apps.npr.org"
        },
        "PROJECT_SLUG": "life-after-death",
        "PRODUCTION_SERVERS": ["cron.nprapps.org"],
        "SERVERS": [],
        "SERVER_SERVICES": [
            ["app", "/home/ubuntu/apps/barkedu/repository", "ini"],
            ["uwsgi", "/etc/init", "conf"],
            ["nginx", "/etc/nginx/locations-enabled", "conf"]
        ],
        "SERVER_BASE_URL": "https://127.0.0.1:8001/life-after-death",
        "REPOSITORY_URL": "git@github.com:nprapps/barkedu.git",
        "COPY_GOOGLE_DOC_URL": "httpss://docs.google.com/spreadsheet/ccc?key=0AqjLQISCZzBkdGp1VGEzQ1gyRXJmMVlXRGRoVEtBZVE",
        "PRODUCTION_S3_BUCKET": {
            "region": "us-east-1",
            "bucket_name": "apps.npr.org"
        },
        "SERVER_VIRTUALENV_PATH": "/home/ubuntu/apps/barkedu/virtualenv",
        "S3_BASE_URL": "https://127.0.0.1:8000",
        "S3_BUCKET": null,
        "DEPLOY_CRONTAB": false,
        "ASSETS_SLUG": "barkedu",
        "SERVER_PYTHON": "python2.7",
        "GOOGLE_ANALYTICS": {
            "TOPICS": "[1031,1128,1126,1004,1002,1001]",
            "DOMAIN": "apps.npr.org",
            "ACCOUNT_ID": "UA-5828686-4"
        },
        "STAGING_SERVERS": ["50.112.92.131"],
        "SERVER_USER": "ubuntu",
        "PROJECT_FILENAME": "barkedu",
        "SERVER_REPOSITORY_PATH": "/home/ubuntu/apps/barkedu/repository",
        "SHARE_URL": "https://apps.npr.org/life-after-death/",
        "UWSGI_SOCKET_PATH": "/tmp/barkedu.uwsgi.sock",
        "SERVER_LOG_PATH": "/tmp",
        "DEPLOYMENT_TARGET": null
    };window.APP_CONFIG = {
        "REPOSITORY_ALT_URL": null,
        "SERVER_PROJECT_PATH": "/home/ubuntu/apps/barkedu",
        "DEPLOY_TO_SERVERS": false,
        "S3_DEPLOY_URL": null,
        "DEPLOY_SERVICES": false,
        "NPR_DFP": {
            "ENVIRONMENT": "NPRTEST",
            "STORY_ID": "1002",
            "TARGET": "homepage",
            "TESTSERVER": "false"
        },
        "DEBUG": true,
        "DISQUS_UUID": "5f35a9e8-976d-11e4-aaf7-28cfe912bf9d",
        "COPY_PATH": "data/copy.xlsx",
        "GITHUB_USERNAME": "nprapps",
        "DISQUS_API_KEY": "tIbSzEhGBE9NIptbnQWn4wy1gZ546CsQ2IHHtxJiYAceyyPoAkDkVnQfCifmCaQW",
        "DEFAULT_MAX_AGE": 20,
        "ASSETS_MAX_AGE": 86400,
        "ASSETS_S3_BUCKET": {
            "region": "us-east-1",
            "bucket_name": "assets.apps.npr.org"
        },
        "REPOSITORY_NAME": "barkedu",
        "DISQUS_SHORTNAME": "nprviz-test",
        "STAGING_S3_BUCKET": {
            "region": "us-east-1",
            "bucket_name": "stage-apps.npr.org"
        },
        "PROJECT_SLUG": "life-after-death",
        "PRODUCTION_SERVERS": ["cron.nprapps.org"],
        "SERVERS": [],
        "SERVER_SERVICES": [
            ["app", "/home/ubuntu/apps/barkedu/repository", "ini"],
            ["uwsgi", "/etc/init", "conf"],
            ["nginx", "/etc/nginx/locations-enabled", "conf"]
        ],
        "SERVER_BASE_URL": "https://127.0.0.1:8001/life-after-death",
        "REPOSITORY_URL": "git@github.com:nprapps/barkedu.git",
        "COPY_GOOGLE_DOC_URL": "httpss://docs.google.com/spreadsheet/ccc?key=0AqjLQISCZzBkdGp1VGEzQ1gyRXJmMVlXRGRoVEtBZVE",
        "PRODUCTION_S3_BUCKET": {
            "region": "us-east-1",
            "bucket_name": "apps.npr.org"
        },
        "SERVER_VIRTUALENV_PATH": "/home/ubuntu/apps/barkedu/virtualenv",
        "S3_BASE_URL": "https://127.0.0.1:8000",
        "S3_BUCKET": null,
        "DEPLOY_CRONTAB": false,
        "ASSETS_SLUG": "barkedu",
        "SERVER_PYTHON": "python2.7",
        "GOOGLE_ANALYTICS": {
            "TOPICS": "[1031,1128,1126,1004,1002,1001]",
            "DOMAIN": "apps.npr.org",
            "ACCOUNT_ID": "UA-5828686-4"
        },
        "STAGING_SERVERS": ["50.112.92.131"],
        "SERVER_USER": "ubuntu",
        "PROJECT_FILENAME": "barkedu",
        "SERVER_REPOSITORY_PATH": "/home/ubuntu/apps/barkedu/repository",
        "SHARE_URL": "https://apps.npr.org/life-after-death/",
        "UWSGI_SOCKET_PATH": "/tmp/barkedu.uwsgi.sock",
        "SERVER_LOG_PATH": "/tmp",
        "DEPLOYMENT_TARGET": null
    };
window.COPY = {
    
    "sharing": {
        "meta_description": "The world is starting to forget about Ebola. The village of Barkedu can't.",
        "facebook_title": "Life After Death",
        "twitter_handle": "@nprviz",
        "email_body": "The world is starting to forget about Ebola. The village of Barkedu can't.%0D%0A%0D%0Ahttps://apps.npr.org/life-after-death/%0D%0A%0D%0AFrom NPR",
        "share_url": "https://apps.npr.org/life-after-death/",
        "google_news_image_url": "https://apps.npr.org/life-after-death/assets/twitter-share.jpg",
        "story_summary": "Life After Death: The world is starting to forget about Ebola. The village of Barkedu can't.",
        "twitter_image_url": "https://apps.npr.org/life-after-death/assets/twitter-share.jpg",
        "facebook_image_url": "https://apps.npr.org/life-after-death/assets/facebook-share.jpg",
        "facebook_app_id": "138837436154588",
        "email_subject": "Life After Death",
        "twitter_text": "Life After Death: The world is starting to forget about Ebola. The village of Barkedu can't.",
        "facebook_text": "The world is starting to forget about Ebola. The village of Barkedu can't."
    },
    "post_metadata": {
    },
    "content": []
};
if (typeof console === "undefined" || typeof console.log === "undefined") {
    console = {};
    console.log = function() {};
}
var urls = ['https://s.npr.org/templates/css/fonts/GothamSSm.css', 'https://s.npr.org/templates/css/fonts/Gotham.css', 'https://s.npr.org/templates/css/fonts/Knockout.css'];
if (window.location.protocol == "httpss:") urls = ['httpss://secure.npr.org/templates/css/fonts/GothamSSm.css', 'httpss://secure.npr.org/templates/css/fonts/Gotham.css', 'https://s.npr.org/templates/css/fonts/Knockout.css'];
WebFont.load({
    custom: {
        families: ['Gotham SSm:n4,n7', 'Gotham:n4,n7', 'Knockout 31 4r:n4'],
        urls: urls
    },
    timeout: 10000
});
var _gaq = _gaq || [];
var _sf_async_config = {};
var _comscore = _comscore || [];
var ANALYTICS = (function() {
    var slideStartTime = new Date();
    var timeOnLastSlide = null;
    var setupGoogle = function() {
        _gaq.push(['_setAccount', APP_CONFIG.GOOGLE_ANALYTICS.ACCOUNT_ID]);
        _gaq.push(['_setDomainName', APP_CONFIG.GOOGLE_ANALYTICS.DOMAIN]);
        _gaq.push(['_setCustomVar', 2, 'Topics', APP_CONFIG.GOOGLE_ANALYTICS_TOPICS, 3]);
        _gaq.push(['_setCustomVar', 4, 'OrgID', '1', 3]);
        _gaq.push(['_setCustomVar', 5, 'Page Types', '1', 3]);
        var orientation = 'portrait';
        if (window.orientation == 90 || window.orientation == -90) orientation = 'landscape';
        _gaq.push(['_setCustomVar', 6, 'Orientation', orientation, 3]);
        var viewportSize = $(window).width();
        var viewportGrouping = '1760 and higher';
        if (viewportSize < 481) viewportGrouping = '0 - 480';
        else if (viewportSize < 768) viewportGrouping = '481 - 767';
        else if (viewportSize < 1000) viewportGrouping = '768 - 999';
        else if (viewportSize < 1201) viewportGrouping = '1000 - 1200';
        else if (viewportSize < 1760) viewportGrouping = '1201 - 1759';
        _gaq.push(['_setCustomVar', 7, 'Viewport Size', viewportGrouping, 3]);
        if (typeof window.devicePixelRatio !== 'undefined' && window.devicePixelRatio >= 1.5) _gaq.push(['_setCustomVar', 10, 'High Density Displays', 'High', 2]);
        else _gaq.push(['_setCustomVar', 10, 'High Density Displays', 'Low', 2]);
        if ('ontouchstart' in document.documentElement) _gaq.push(['_setCustomVar', 11, 'Touch screens', 'Touch', 2]);
        else _gaq.push(['_setCustomVar', 11, 'Touch screens', 'Traditional', 2]);
        _gaq.push(['_trackPageview']);
        (function() {
            var ga = document.createElement('script');
            ga.type = 'text/javascript';
            ga.async = true;
            ga.src = ('httpss:' == document.location.protocol ? 'httpss://ssl' : 'https://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ga, s);
        })();
    };
    var setupComscore = function() {
        return false;
    };
    var setupNielson = function() {
        (function() {
            var d = new Image(1, 1);
            d.onerror = d.onload = function() {
                d.onerror = d.onload = null;
            };
            d.src = ["//secure-us.imrworldwide.com/cgi-bin/m?ci=us-803244h&cg=0&cc=1&si=", escape(window.location.href), "&rp=", escape(document.referrer), "&ts=compact&rnd=", new Date().getTime()].join('');
        })();
    };
    var setupChartbeat = function() {
        _sf_async_config.uid = 18888;
        _sf_async_config.domain = "npr.org";
        (function() {
            function loadChartbeat() {
                window._sf_endpt = new Date().getTime();
                var e = document.createElement("script");
                e.setAttribute("language", "javascript");
                e.setAttribute("type", "text/javascript");
                e.setAttribute("src", (("httpss:" == document.location.protocol) ? "httpss://a248.e.akamai.net/chartbeat.download.akamai.com/102508/" : "https://static.chartbeat.com/") + "js/chartbeat.js");
                document.body.appendChild(e);
            }
            var oldonload = window.onload;
            window.onload = (typeof window.onload != "function") ? loadChartbeat : function() {
                oldonload();
                loadChartbeat();
            };
        })();
    };
    var setupAll = function() {
        setupGoogle();
        setupComscore();
        setupNielson();
        setupChartbeat();
    };
    var trackEvent = function(eventName, label, value) {
        var args = ['_trackEvent', APP_CONFIG.PROJECT_SLUG];
        args.push(eventName);
        if (label) args.push(label);
        else if (value) args.push('');
        if (value) args.push(value);
        _gaq.push(args);
    };
    var setCustomVar = function(index, varName, value, scope) {
        var args = ['_setCustomVar', index, varName, value];
        if (scope) args.push(scope);
        else args.push(3);
        _gaq.push(args);
    };
    var openShareDiscuss = function() {
        trackEvent('open-share-discuss');
    };
    var closeShareDiscuss = function() {
        trackEvent('close-share-discuss');
    };
    var clickTweet = function(location) {
        trackEvent('tweet', location);
    };
    var clickFacebook = function(location) {
        trackEvent('facebook', location);
    };
    var clickEmail = function(location) {
        trackEvent('email', location);
    };
    var postComment = function() {
        trackEvent('new-comment');
    };
    var actOnFeaturedTweet = function(action, tweetUrl) {
        trackEvent('featured-tweet-action', action, null, tweetUrl);
    };
    var actOnFeaturedFacebook = function(action, postUrl) {
        trackEvent('featured-facebook-action', action, null, postUrl);
    };
    var copySummary = function() {
        trackEvent('summary-copied');
    };
    var usedKeyboardNavigation = false;
    var useKeyboardNavigation = function() {
        if (!usedKeyboardNavigation) {
            trackEvent('keyboard-nav');
            usedKeyboardNavigation = true;
        }
    };
    var completeTwentyFivePercent = function() {
        trackEvent('completion', '0.25');
    };
    var completeFiftyPercent = function() {
        trackEvent('completion', '0.5');
    };
    var completeSeventyFivePercent = function() {
        trackEvent('completion', '0.75');
    };
    var completeOneHundredPercent = function() {
        trackEvent('completion', '1');
    };
    var exitSlide = function(slideIndex) {
        var currentTime = new Date();
        timeOnLastSlide = Math.abs(currentTime - slideStartTime);
        slideStartTime = currentTime;
        trackEvent('slide-exit', slideIndex, timeOnLastSlide);
    };
    var firstRightArrowClick = function(test) {
        trackEvent('first-right-arrow-clicked', test, timeOnLastSlide);
    };
    return {
        'setupAll': setupAll,
        'trackEvent': trackEvent,
        'setCustomVar': setCustomVar,
        'openShareDiscuss': openShareDiscuss,
        'closeShareDiscuss': closeShareDiscuss,
        'clickTweet': clickTweet,
        'clickFacebook': clickFacebook,
        'clickEmail': clickEmail,
        'postComment': postComment,
        'actOnFeaturedTweet': actOnFeaturedTweet,
        'actOnFeaturedFacebook': actOnFeaturedFacebook,
        'copySummary': copySummary,
        'useKeyboardNavigation': useKeyboardNavigation,
        'completeTwentyFivePercent': completeTwentyFivePercent,
        'completeFiftyPercent': completeFiftyPercent,
        'completeSeventyFivePercent': completeSeventyFivePercent,
        'completeOneHundredPercent': completeOneHundredPercent,
        'exitSlide': exitSlide,
        'firstRightArrowClick': firstRightArrowClick
    };
}());
ANALYTICS.setupAll();
var AUDIO = (function() {
    var narrativePlayer = null;
    var ambientPlayer = null;
    var ambientId = null;
    var subtitles = null;
    var progressInterval = null;
    var narrativeURL = null;
    var subtitlesURL = null;
    var ambientURL = null;
    var narrativeVisible = false;
    var checkForAudio = function(slideAnchor) {
        for (var i = 0; i < COPY.content.length; i++) {
            var rowAnchor = COPY.content[i][0];
            var narrativeFilename = COPY.content[i][9];
            var narrativeSubtitles = COPY.content[i][10];
            var ambientFilename = COPY.content[i][11];
            var ambientVolume = COPY.content[i][12];
            if (rowAnchor === slideAnchor && narrativeFilename !== null && !NO_AUDIO) {
                $thisPlayerProgress = $('#slide-' + rowAnchor).find('.player-progress');
                $playedBar = $('#slide-' + rowAnchor).find('.player-progress .played');
                $controlBtn = $('#slide-' + rowAnchor).find('.control-btn');
                $subtitleWrapper = $('#slide-' + rowAnchor).find('.subtitle-wrapper');
                $subtitles = $('#slide-' + rowAnchor).find('.subtitles');
                narrativeURL = 'assets/audio/' + narrativeFilename;
                subtitlesURL = APP_CONFIG.S3_BASE_URL + '/data/' + narrativeSubtitles;
                setNarrativeMedia();
            } else {
                _pauseNarrativePlayer();
                narrativeVisible = false;
            }
            if (rowAnchor === slideAnchor && ambientFilename !== null && !NO_AUDIO) {
                ambientURL = 'assets/audio/' + ambientFilename;
                if (ambientFilename === 'STOP') {
                    $ambientPlayer.jPlayer('pause');
                    return;
                }
                if (ambientURL !== $ambientPlayer.data().jPlayer.status.src) setAmbientMedia(ambientURL);
            }
        }
    };
    var setUpNarrativePlayer = function() {
        $narrativePlayer.jPlayer({
            swfPath: 'js/lib',
            loop: false,
            supplied: 'mp3',
            timeupdate: onNarrativeTimeupdate
        });
    };
    var setNarrativeMedia = function() {
        $.getJSON(subtitlesURL, function(data) {
            subtitles = data.subtitles;
            _startNarrativePlayer();
        });
    };
    var _startNarrativePlayer = function() {
        $narrativePlayer.jPlayer('setMedia', {
            mp3: narrativeURL
        });
        narrativeVisible = true;
        animateSubtitles(0.01);
        setTimeout(function() {
            if (narrativeVisible) {
                $narrativePlayer.jPlayer('play');
                $controlBtn.removeClass('play').addClass('pause');
            }
        }, 1000);
    };
    var _resumeNarrativePlayer = function() {
        $narrativePlayer.jPlayer('play');
        $controlBtn.removeClass('play').addClass('pause');
    };
    var _pauseNarrativePlayer = function(end) {
        $narrativePlayer.jPlayer('pause');
        if (end) $playedBar.css('width', $thisPlayerProgress.width() + 'px');
        $controlBtn.removeClass('pause').addClass('play');
    };
    var toggleNarrativeAudio = function() {
        if ($narrativePlayer.data().jPlayer.status.paused) _resumeNarrativePlayer();
        else _pauseNarrativePlayer(false);
    };
    var fakeNarrativePlayer = function() {
        $narrativePlayer.jPlayer('setMedia', {
            mp3: APP_CONFIG.S3_BASE_URL + '/assets/audio/' + 'doctor_01.mp3'
        }).jPlayer('pause');
    };
    var onNarrativeTimeupdate = function(e) {
        var totalTime = e.jPlayer.status.duration;
        var position = e.jPlayer.status.currentTime;
        var percentage = position / totalTime;
        if (position > 0)
            if ($playedBar.width() == $thisPlayerProgress.width()) {
                $playedBar.addClass('no-transition');
                $playedBar.css('width', 0);
            } else {
                $playedBar.removeClass('no-transition');
                $playedBar.css('width', $thisPlayerProgress.width() * percentage + 'px');
                if (percentage === 1) $controlBtn.removeClass('pause').addClass('play');
            }
        animateSubtitles(position);
    };
    var animateSubtitles = function(position) {
        if (subtitles) {
            var activeSubtitle = null;
            for (var i = 0; i < subtitles.length; i++)
                if (position > 0)
                    if (position < subtitles[i].time) {
                        if (i > 0) activeSubtitle = subtitles[i - 1].transcript;
                        else activeSubtitle = subtitles[i].transcript;
                        $subtitleWrapper.fadeIn();
                        $subtitles.html(activeSubtitle);
                        break;
                    } else {
                        activeSubtitle = subtitles[i].transcript;
                        $subtitles.html(activeSubtitle);
                    }
        }
    };
    var setUpAmbientPlayer = function() {
        $ambientPlayer.jPlayer({
            swfPath: 'js/lib',
            supplied: 'mp3'
        });
    };
    var setAmbientMedia = function(url) {
        $ambientPlayer.jPlayer('setMedia', {
            mp3: url
        }).jPlayer('play');
    };
    var fakeAmbientPlayer = function() {
        $ambientPlayer.jPlayer('setMedia', {
            mp3: APP_CONFIG.S3_BASE_URL + '/assets/audio/' + 'doctor_ambient.mp3'
        }).jPlayer('pause');
    };
    var toggleAllAudio = function() {
        if (isHidden()) {
            if (narrativeVisible) _pauseNarrativePlayer(false);
            $ambientPlayer.jPlayer('pause');
        } else {
            if (narrativeVisible) _resumeNarrativePlayer();
            $ambientPlayer.jPlayer('play');
        }
    };
    return {
        'checkForAudio': checkForAudio,
        'toggleNarrativeAudio': toggleNarrativeAudio,
        'toggleAllAudio': toggleAllAudio,
        'setUpAmbientPlayer': setUpAmbientPlayer,
        'setUpNarrativePlayer': setUpNarrativePlayer,
        'setAmbientMedia': setAmbientMedia,
        'fakeAmbientPlayer': fakeAmbientPlayer,
        'fakeNarrativePlayer': fakeNarrativePlayer
    };
}());
var $upNext = null;
var $w;
var $h;
var $slides;
var $arrows;
var $nextArrow;
var $startCardButton;
var $controlBtn;
var $thisPlayerProgress;
var $playedBar;
var $subtitleWrapper;
var $subtitles;
var $slideTitle;
var $ambientPlayer;
var $narrativePlayer;
var $share;
var $shareModal;
var $progressIndicator;
var $currentProgress;
var $support;
var $supportBtn;
var $question;
var $careStory;
var $careStoryBtns;
var $email;
var $emailBtn;
var isTouch = Modernizr.touch;
var mobileSuffix;
var aspectWidth = 16;
var aspectHeight = 9;
var optimalWidth;
var optimalHeight;
var w;
var h;
var completion = 0;
var arrowTest;
var progressTest;
var conclusionTest;
var firstRightArrowClicked = false;
var presentedConclusion = false;
var NO_AUDIO = (window.location.search.indexOf('noaudio') >= 0);
var visibilityProperty = null;
var resize = function() {
    $w = $(window).width();
    $h = $(window).height();
    $slides.width($w);
    optimalWidth = ($h * aspectWidth) / aspectHeight;
    optimalHeight = ($w * aspectHeight) / aspectWidth;
    w = $w;
    h = optimalHeight;
    if (optimalWidth > $w) {
        w = optimalWidth;
        h = $h;
    }
};
var setUpFullPage = function() {
    var anchors = ['_'];
    for (var i = 0; i < COPY.content.length; i++) anchors.push(COPY.content[i][0]);
    $.fn.fullpage({
        anchors: (!APP_CONFIG.DEPLOYMENT_TARGET) ? anchors : false,
        autoScrolling: false,
        keyboardScrolling: false,
        verticalCentered: false,
        fixedElements: '.primary-navigation, #share-modal, .share, .progress-indicator',
        resize: false,
        css3: true,
        loopHorizontal: false,
        afterRender: onPageLoad,
        afterSlideLoad: lazyLoad,
        onSlideLeave: onSlideLeave
    });
};
var onPageLoad = function() {
    setSlidesForLazyLoading(0);
    $('.section').css({
        'opacity': 1,
        'visibility': 'visible'
    });
    showNavigation();
};
var lazyLoad = function(anchorLink, index, slideAnchor, slideIndex) {
    setSlidesForLazyLoading(slideIndex);
    showNavigation();
    AUDIO.checkForAudio(slideAnchor);
    animateProgress(slideIndex);
    if (slideIndex === 0) $share.hide();
    else $share.show();
    if (slideIndex === $slides.length - 1) buildConclusionSlide();
    how_far = (slideIndex + 1) / ($slides.length - 1);
    if (how_far >= completion + 0.25) {
        completion = how_far - (how_far % 0.25);
        if (completion === 0.25) ANALYTICS.completeTwentyFivePercent(progressTest);
        else if (completion === 0.5) ANALYTICS.completeFiftyPercent(progressTest);
        else if (completion === 0.75) ANALYTICS.completeSeventyFivePercent(progressTest);
        else if (completion === 1) ANALYTICS.completeOneHundredPercent(progressTest);
    }
};
var setSlidesForLazyLoading = function(slideIndex) {
    var slides = [$slides.eq(slideIndex), $slides.eq(slideIndex + 1), $slides.eq(slideIndex + 2), $slides.eq(slideIndex + 3), $slides.eq(slideIndex + 4)];
    mobileSuffix = '';
    for (var i = 0; i < slides.length; i++) loadImages(slides[i]);;
};
var loadImages = function($slide) {
    if ($slide.data('bgimage')) {
        var image_filename = $slide.data('bgimage').split('.')[0];
        var image_extension = '.' + $slide.data('bgimage').split('.')[1];
        var image_path = 'assets/' + image_filename + mobileSuffix + image_extension;
        if ($slide.css('background-image') === 'none') $slide.css('background-image', 'url(' + image_path + ')');
    }
    var $images = $slide.find('img.lazy-load');
    if ($images.length > 0)
        for (var i = 0; i < $images.length; i++) {
            var image = $images.eq(i).data('src');
            $images.eq(i).attr('src', 'assets/' + image);
        }
};
var showNavigation = function() {
    if ($slides.first().hasClass('active')) $arrows.hide();
    else if ($slides.last().hasClass('active')) {
        if (!$arrows.hasClass('active')) showArrows();
        $nextArrow.removeClass('active');
        $nextArrow.hide();
    } else if ($slides.eq(1).hasClass('active')) {
        showArrows();
        switch (arrowTest) {
            case 'bright-arrow':
                $nextArrow.addClass('titlecard-nav');
                break;
            case 'bouncy-arrow':
                $nextArrow.addClass('shake animated titlecard-nav');
                break;
            default:
                break;
        }
        $nextArrow.on('click', onFirstRightArrowClick);
    } else {
        if ($arrows.filter('active').length != $arrows.length) showArrows();
        $nextArrow.removeClass('shake animated titlecard-nav');
        $nextArrow.off('click', onFirstRightArrowClick);
    }
    if (progressTest === 'progress-bar') $progressIndicator.show();
};
var showArrows = function() {
    $arrows.addClass('active');
    $arrows.show();
};
var determineTest = function(possibleTests) {
    var test = possibleTests[getRandomInt(0, possibleTests.length)];
    return test;
};
var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};
var setCustomVars = function() {
    ANALYTICS.setCustomVar(40, 'progress-test', progressTest);
};
var buildConclusionSlide = function() {
    ANALYTICS.trackEvent('tests-run', conclusionTest);
    if (!presentedConclusion) {
        presentedConclusion = true;
        if (conclusionTest === 'no-question') $support.show();
        else {
            $question.text(COPY.post_metadata[conclusionTest]);
            $careStory.show();
        }
    }
};
var onCareStoryBtnClick = function(e) {
    e.preventDefault();
    var $this = $(this);
    $careStory.hide();
    if ($this.hasClass('yes')) {
        ANALYTICS.trackEvent('like-story-yes', conclusionTest);
        $support.show();
    } else {
        ANALYTICS.trackEvent('like-story-no', conclusionTest);
        $email.show();
    }
};
var onSupportBtnClick = function(e) {
    e.preventDefault();
    var $this = $(this);
    var link = $this.attr('href');
    ANALYTICS.trackEvent('support-btn-click', conclusionTest);
    window.top.location = link;
    return true;
};
var onEmailBtnClick = function() {
    ANALYTICS.trackEvent('email-btn-click', conclusionTest);
};
var animateProgress = function(index) {
    var totalSlides = $slides.length;
    var percentage = (index + 1) / totalSlides;
    $currentProgress.css('width', percentage * 100 + '%');
    if (index === 0) $progressIndicator.width(0);
    else $progressIndicator.width('100%');
};
var onSlideLeave = function(anchorLink, index, slideIndex, direction) {
    ANALYTICS.exitSlide(slideIndex.toString());
};
var onFirstRightArrowClick = function() {
    if (firstRightArrowClicked === false) {
        ANALYTICS.firstRightArrowClick(arrowTest);
        firstRightArrowClicked = true;
    }
};
var onStartCardButtonClick = function() {
    ANALYTICS.trackEvent('begin');
    $.fn.fullpage.moveSlideRight();
    if (isTouch) {
        AUDIO.fakeAmbientPlayer();
        AUDIO.fakeNarrativePlayer();
    }
};
var onDocumentKeyDown = function(e) {
    if (e.which === 37 || e.which === 39) {
        ANALYTICS.useKeyboardNavigation();
        if (e.which === 37) $.fn.fullpage.moveSlideLeft();
        else if (e.which === 39) $.fn.fullpage.moveSlideRight();
    }
    return true;
};
var onSlideClick = function(e) {
    if (isTouch) {
        if ($slides.first().hasClass('active')) {
            AUDIO.fakeAmbientPlayer();
            AUDIO.fakeNarrativePlayer();
        }
        $.fn.fullpage.moveSlideRight();
    }
    return true;
};
var fakeMobileHover = function() {
    $(this).css({
        'background-color': '#fff',
        'color': '#000',
        'opacity': .9
    });
};
var rmFakeMobileHover = function() {
    $(this).css({
        'background-color': 'rgba(0, 0, 0, 0.5)',
        'color': '#fff',
        'opacity': .5
    });
};
var onClippyCopy = function(e) {
    alert('Copied to your clipboard!');
    ANALYTICS.copySummary();
};
var onControlBtnClick = function(e) {
    e.preventDefault();
    AUDIO.toggleNarrativeAudio();
    ANALYTICS.trackEvent('pause-button');
    e.stopPropagation();
};
var onVisibilityChange = function() {
    AUDIO.toggleAllAudio();
};
var getHiddenProperty = function() {
    var prefixes = ['webkit', 'moz', 'ms', 'o'];
    if ('hidden' in document) return 'hidden';
    for (var i = 0; i < prefixes.length; i++)
        if ((prefixes[i] + 'Hidden') in document) return prefixes[i] + 'Hidden';
    return null;
};
var isHidden = function() {
    var prop = getHiddenProperty();
    if (!prop) return false;
    return document[prop];
};
var onShareModalShown = function(e) {
    ANALYTICS.openShareDiscuss();
};
var onShareModalHidden = function(e) {
    ANALYTICS.closeShareDiscuss();
};
$(document).ready(function() {
    $w = $(window).width();
    $h = $(window).height();
    $slides = $('.slide');
    $navButton = $('.primary-navigation-btn');
    $startCardButton = $('.btn-go');
    $arrows = $('.controlArrow');
    $nextArrow = $arrows.filter('.next');
    $upNext = $('.up-next');
    $controlBtn = $('.control-btn');
    $narrativePlayer = $('#narrative-player');
    $ambientPlayer = $('#ambient-player');
    $share = $('.share');
    $shareModal = $('#share-modal');
    $progressIndicator = $('.progress-indicator');
    $currentProgress = $('.current-progress');
    $support = $('.support');
    $supportBtn = $('.support-btn');
    $careStory = $('.care-story');
    $question = $('.question');
    $careStoryBtns = $('.care-story-btn');
    $email = $('.email');
    $emailBtn = $('.email-btn');
    arrowTest = determineTest(['faded-arrow', 'bright-arrow', 'bouncy-arrow']);
    progressTest = determineTest(['progress-bar', 'no-progress-bar']);
    conclusionTest = determineTest(['no-question', 'question_a', 'question_b', 'question_c', 'question_d']);
    $shareModal.on('shown.bs.modal', onShareModalShown);
    $shareModal.on('hidden.bs.modal', onShareModalHidden);
    $startCardButton.on('click', onStartCardButtonClick);
    $slides.on('click', onSlideClick);
    $controlBtn.on('click', onControlBtnClick);
    $arrows.on('touchstart', fakeMobileHover);
    $arrows.on('touchend', rmFakeMobileHover);
    $careStoryBtns.on('click', onCareStoryBtnClick);
    $supportBtn.on('click', onSupportBtnClick);
    $emailBtn.on('click', onEmailBtnClick);
    $(document).keydown(onDocumentKeyDown);
    AUDIO.setUpNarrativePlayer();
    AUDIO.setUpAmbientPlayer();
    setUpFullPage();
    resize();
    setCustomVars();
    window.addEventListener("deviceorientation", resize, true);
    $(window).resize(resize);
    visibilityProperty = getHiddenProperty();
    if (visibilityProperty) {
        var evtname = visibilityProperty.replace(/[H|h]idden/, '') + 'visibilitychange';
        document.addEventListener(evtname, onVisibilityChange);
    }
});