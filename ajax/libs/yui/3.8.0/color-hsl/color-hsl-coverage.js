if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/color-hsl/color-hsl.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/color-hsl/color-hsl.js",
    code: []
};
_yuitest_coverage["build/color-hsl/color-hsl.js"].code=["YUI.add('color-hsl', function (Y, NAME) {","","/**","Color provides static methods for color conversion to hsl values.","","    Y.Color.toHSL('f00'); // hsl(0, 100%, 50%)","","    Y.Color.toHSLA('rgb(255, 255, 0'); // hsla(60, 100%, 50%, 1)","","@module color","@submodule color-hsl","@class HSL","@namespace Color","@since 3.8.0","**/","Color = {","","    /**","    @static","    @property REGEX_HSL","    @type RegExp","    @default /hsla?\\(([.\\d]*), ?([.\\d]*)%, ?([.\\d]*)%,? ?([.\\d]*)?\\)/","    @since 3.8.0","    **/","    REGEX_HSL: /hsla?\\(([.\\d]*), ?([.\\d]*)%, ?([.\\d]*)%,? ?([.\\d]*)?\\)/,","","    /**","    @static","    @property STR_HSL","    @type String","    @default hsl({*}, {*}%, {*}%)","    @since 3.8.0","    **/","    STR_HSL: 'hsl({*}, {*}%, {*}%)',","","    /**","    @static","    @property STR_HSLA","    @type String","    @default hsla({*}, {*}%, {*}%, {*})","    @since 3.8.0","    **/","    STR_HSLA: 'hsla({*}, {*}%, {*}%, {*})',","","    /**","    Converts provided color value to an HSL string.","    @public","    @method toHSL","    @param {String} str","    @return {String}","    @since 3.8.0","    **/","    toHSL: function (str) {","        var clr = Y.Color._convertTo(str, 'hsl');","        return clr.toLowerCase();","    },","","    /**","    Converts provided color value to an HSLA string.","    @public","    @method toHSLA","    @param {String} str","    @return {String}","    @since 3.8.0","    **/","    toHSLA: function (str) {","        var clr = Y.Color._convertTo(str, 'hsla');","        return clr.toLowerCase();","    },","","    /**","    Parses the RGB string into h, s, l values. Will return an Array","        of values or an HSL string.","    @protected","    @method _rgbToHsl","    @param {String} str","    @param {Boolean} [toArray]","    @return {String|Array}","    @since 3.8.0","    **/","    _rgbToHsl: function (str, toArray) {","        var h, s, l,","            rgb = Y.Color.REGEX_RGB.exec(str),","            r = rgb[1] / 255,","            g = rgb[2] / 255,","            b = rgb[3] / 255,","            max = Math.max(r, g, b),","            min = Math.min(r, g, b),","            isGrayScale = false,","            sub = max - min,","            sum = max + min;","","","        if (r === g && g === b) {","            isGrayScale = true;","        }","","        // hue","        if (sub === 0) {","            h = 0;","        } else if (r === max) {","            h = ((60 * (g - b) / sub) + 360) % 360;","        } else if (g === max) {","            h = (60 * (b - r) / sub) + 120;","        } else {","            h = (60 * (r - g) / sub) + 240;","        }","","        // lightness","        l = sum / 2;","","        // saturation","        if (l === 0 || l === 1) {","            s = l;","        } else if (l <= 0.5) {","            s = sub / sum;","        } else {","            s = sub / (2 - sum);","        }","","        if (isGrayScale) {","            s = 0;","        }","","        // clean up hsl","        h = Math.round(h);","        s = Math.round(s * 100);","        l = Math.round(l * 100);","","        if (toArray) {","            return [h, s, l];","        }","","        return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';","    },","","    /**","    Parses the HSL string into r, b, g values. Will return an Array","        of values or an RGB string.","    @protected","    @method _hslToRgb","    @param {String} str","    @param {Boolean} [toArray]","    @return {String|Array}","    @since 3.8.0","    **/","    _hslToRgb: function (str, toArray) {","        // assume input is [h, s, l]","        // TODO: Find legals for use of formula","        var hsl = Y.Color.REGEX_HSL.exec(str),","            h = parseInt(hsl[1], 10) / 360,","            s = parseInt(hsl[2], 10) / 100,","            l = parseInt(hsl[3], 10) / 100,","            r,","            g,","            b,","            p,","            q;","","        if (l <= 0.5) {","            q = l * (s + 1);","        } else {","            q = (l + s) - (l * s);","        }","","        p = 2 * l - q;","","        r = Math.round(Color._hueToRGB(p, q, h + 1/3) * 255);","        g = Math.round(Color._hueToRGB(p, q, h) * 255);","        b = Math.round(Color._hueToRGB(p, q, h - 1/3) * 255);","","        if (toArray) {","            return [r, g, b];","        }","","        return 'rgb(' + r + ', ' + g + ', ' + b + ')';","    },","","    /**","    Converts the HSL hue to the different channels for RGB","","    @protected","    @method _hueToRGB","    @param {Number} p","    @param {Number} q","    @param {Number} hue","    @return {Number} value for requested channel","    @since 3.8.0","    **/","    _hueToRGB: function(p, q, hue) {","        // TODO: Find legals for use of formula","        if (hue < 0) {","            hue += 1;","        } else if (hue > 1) {","            hue -= 1;","        }","","        if (hue * 6 < 1) {","            return p + (q - p) * 6 * hue;","        }","        if (hue * 2 < 1) {","            return q;","        }","        if (hue * 3 < 2) {","            return p + (q - p) * (2/3 - hue) * 6;","        }","        return p;","    }","","};","","Y.Color = Y.mix(Color, Y.Color);","","Y.Color.TYPES = Y.mix(Y.Color.TYPES, {'HSL':'hsl', 'HSLA':'hsla'});","Y.Color.CONVERTS = Y.mix(Y.Color.CONVERTS, {'hsl': 'toHSL', 'hsla': 'toHSLA'});","","","}, '@VERSION@', {\"requires\": [\"color-base\"]});"];
_yuitest_coverage["build/color-hsl/color-hsl.js"].lines = {"1":0,"16":0,"54":0,"55":0,"67":0,"68":0,"82":0,"94":0,"95":0,"99":0,"100":0,"101":0,"102":0,"103":0,"104":0,"106":0,"110":0,"113":0,"114":0,"115":0,"116":0,"118":0,"121":0,"122":0,"126":0,"127":0,"128":0,"130":0,"131":0,"134":0,"150":0,"160":0,"161":0,"163":0,"166":0,"168":0,"169":0,"170":0,"172":0,"173":0,"176":0,"192":0,"193":0,"194":0,"195":0,"198":0,"199":0,"201":0,"202":0,"204":0,"205":0,"207":0,"212":0,"214":0,"215":0};
_yuitest_coverage["build/color-hsl/color-hsl.js"].functions = {"toHSL:53":0,"toHSLA:66":0,"_rgbToHsl:81":0,"_hslToRgb:147":0,"_hueToRGB:190":0,"(anonymous 1):1":0};
_yuitest_coverage["build/color-hsl/color-hsl.js"].coveredLines = 55;
_yuitest_coverage["build/color-hsl/color-hsl.js"].coveredFunctions = 6;
_yuitest_coverline("build/color-hsl/color-hsl.js", 1);
YUI.add('color-hsl', function (Y, NAME) {

/**
Color provides static methods for color conversion to hsl values.

    Y.Color.toHSL('f00'); // hsl(0, 100%, 50%)

    Y.Color.toHSLA('rgb(255, 255, 0'); // hsla(60, 100%, 50%, 1)

@module color
@submodule color-hsl
@class HSL
@namespace Color
@since 3.8.0
**/
_yuitest_coverfunc("build/color-hsl/color-hsl.js", "(anonymous 1)", 1);
_yuitest_coverline("build/color-hsl/color-hsl.js", 16);
Color = {

    /**
    @static
    @property REGEX_HSL
    @type RegExp
    @default /hsla?\(([.\d]*), ?([.\d]*)%, ?([.\d]*)%,? ?([.\d]*)?\)/
    @since 3.8.0
    **/
    REGEX_HSL: /hsla?\(([.\d]*), ?([.\d]*)%, ?([.\d]*)%,? ?([.\d]*)?\)/,

    /**
    @static
    @property STR_HSL
    @type String
    @default hsl({*}, {*}%, {*}%)
    @since 3.8.0
    **/
    STR_HSL: 'hsl({*}, {*}%, {*}%)',

    /**
    @static
    @property STR_HSLA
    @type String
    @default hsla({*}, {*}%, {*}%, {*})
    @since 3.8.0
    **/
    STR_HSLA: 'hsla({*}, {*}%, {*}%, {*})',

    /**
    Converts provided color value to an HSL string.
    @public
    @method toHSL
    @param {String} str
    @return {String}
    @since 3.8.0
    **/
    toHSL: function (str) {
        _yuitest_coverfunc("build/color-hsl/color-hsl.js", "toHSL", 53);
_yuitest_coverline("build/color-hsl/color-hsl.js", 54);
var clr = Y.Color._convertTo(str, 'hsl');
        _yuitest_coverline("build/color-hsl/color-hsl.js", 55);
return clr.toLowerCase();
    },

    /**
    Converts provided color value to an HSLA string.
    @public
    @method toHSLA
    @param {String} str
    @return {String}
    @since 3.8.0
    **/
    toHSLA: function (str) {
        _yuitest_coverfunc("build/color-hsl/color-hsl.js", "toHSLA", 66);
_yuitest_coverline("build/color-hsl/color-hsl.js", 67);
var clr = Y.Color._convertTo(str, 'hsla');
        _yuitest_coverline("build/color-hsl/color-hsl.js", 68);
return clr.toLowerCase();
    },

    /**
    Parses the RGB string into h, s, l values. Will return an Array
        of values or an HSL string.
    @protected
    @method _rgbToHsl
    @param {String} str
    @param {Boolean} [toArray]
    @return {String|Array}
    @since 3.8.0
    **/
    _rgbToHsl: function (str, toArray) {
        _yuitest_coverfunc("build/color-hsl/color-hsl.js", "_rgbToHsl", 81);
_yuitest_coverline("build/color-hsl/color-hsl.js", 82);
var h, s, l,
            rgb = Y.Color.REGEX_RGB.exec(str),
            r = rgb[1] / 255,
            g = rgb[2] / 255,
            b = rgb[3] / 255,
            max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            isGrayScale = false,
            sub = max - min,
            sum = max + min;


        _yuitest_coverline("build/color-hsl/color-hsl.js", 94);
if (r === g && g === b) {
            _yuitest_coverline("build/color-hsl/color-hsl.js", 95);
isGrayScale = true;
        }

        // hue
        _yuitest_coverline("build/color-hsl/color-hsl.js", 99);
if (sub === 0) {
            _yuitest_coverline("build/color-hsl/color-hsl.js", 100);
h = 0;
        } else {_yuitest_coverline("build/color-hsl/color-hsl.js", 101);
if (r === max) {
            _yuitest_coverline("build/color-hsl/color-hsl.js", 102);
h = ((60 * (g - b) / sub) + 360) % 360;
        } else {_yuitest_coverline("build/color-hsl/color-hsl.js", 103);
if (g === max) {
            _yuitest_coverline("build/color-hsl/color-hsl.js", 104);
h = (60 * (b - r) / sub) + 120;
        } else {
            _yuitest_coverline("build/color-hsl/color-hsl.js", 106);
h = (60 * (r - g) / sub) + 240;
        }}}

        // lightness
        _yuitest_coverline("build/color-hsl/color-hsl.js", 110);
l = sum / 2;

        // saturation
        _yuitest_coverline("build/color-hsl/color-hsl.js", 113);
if (l === 0 || l === 1) {
            _yuitest_coverline("build/color-hsl/color-hsl.js", 114);
s = l;
        } else {_yuitest_coverline("build/color-hsl/color-hsl.js", 115);
if (l <= 0.5) {
            _yuitest_coverline("build/color-hsl/color-hsl.js", 116);
s = sub / sum;
        } else {
            _yuitest_coverline("build/color-hsl/color-hsl.js", 118);
s = sub / (2 - sum);
        }}

        _yuitest_coverline("build/color-hsl/color-hsl.js", 121);
if (isGrayScale) {
            _yuitest_coverline("build/color-hsl/color-hsl.js", 122);
s = 0;
        }

        // clean up hsl
        _yuitest_coverline("build/color-hsl/color-hsl.js", 126);
h = Math.round(h);
        _yuitest_coverline("build/color-hsl/color-hsl.js", 127);
s = Math.round(s * 100);
        _yuitest_coverline("build/color-hsl/color-hsl.js", 128);
l = Math.round(l * 100);

        _yuitest_coverline("build/color-hsl/color-hsl.js", 130);
if (toArray) {
            _yuitest_coverline("build/color-hsl/color-hsl.js", 131);
return [h, s, l];
        }

        _yuitest_coverline("build/color-hsl/color-hsl.js", 134);
return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    },

    /**
    Parses the HSL string into r, b, g values. Will return an Array
        of values or an RGB string.
    @protected
    @method _hslToRgb
    @param {String} str
    @param {Boolean} [toArray]
    @return {String|Array}
    @since 3.8.0
    **/
    _hslToRgb: function (str, toArray) {
        // assume input is [h, s, l]
        // TODO: Find legals for use of formula
        _yuitest_coverfunc("build/color-hsl/color-hsl.js", "_hslToRgb", 147);
_yuitest_coverline("build/color-hsl/color-hsl.js", 150);
var hsl = Y.Color.REGEX_HSL.exec(str),
            h = parseInt(hsl[1], 10) / 360,
            s = parseInt(hsl[2], 10) / 100,
            l = parseInt(hsl[3], 10) / 100,
            r,
            g,
            b,
            p,
            q;

        _yuitest_coverline("build/color-hsl/color-hsl.js", 160);
if (l <= 0.5) {
            _yuitest_coverline("build/color-hsl/color-hsl.js", 161);
q = l * (s + 1);
        } else {
            _yuitest_coverline("build/color-hsl/color-hsl.js", 163);
q = (l + s) - (l * s);
        }

        _yuitest_coverline("build/color-hsl/color-hsl.js", 166);
p = 2 * l - q;

        _yuitest_coverline("build/color-hsl/color-hsl.js", 168);
r = Math.round(Color._hueToRGB(p, q, h + 1/3) * 255);
        _yuitest_coverline("build/color-hsl/color-hsl.js", 169);
g = Math.round(Color._hueToRGB(p, q, h) * 255);
        _yuitest_coverline("build/color-hsl/color-hsl.js", 170);
b = Math.round(Color._hueToRGB(p, q, h - 1/3) * 255);

        _yuitest_coverline("build/color-hsl/color-hsl.js", 172);
if (toArray) {
            _yuitest_coverline("build/color-hsl/color-hsl.js", 173);
return [r, g, b];
        }

        _yuitest_coverline("build/color-hsl/color-hsl.js", 176);
return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    },

    /**
    Converts the HSL hue to the different channels for RGB

    @protected
    @method _hueToRGB
    @param {Number} p
    @param {Number} q
    @param {Number} hue
    @return {Number} value for requested channel
    @since 3.8.0
    **/
    _hueToRGB: function(p, q, hue) {
        // TODO: Find legals for use of formula
        _yuitest_coverfunc("build/color-hsl/color-hsl.js", "_hueToRGB", 190);
_yuitest_coverline("build/color-hsl/color-hsl.js", 192);
if (hue < 0) {
            _yuitest_coverline("build/color-hsl/color-hsl.js", 193);
hue += 1;
        } else {_yuitest_coverline("build/color-hsl/color-hsl.js", 194);
if (hue > 1) {
            _yuitest_coverline("build/color-hsl/color-hsl.js", 195);
hue -= 1;
        }}

        _yuitest_coverline("build/color-hsl/color-hsl.js", 198);
if (hue * 6 < 1) {
            _yuitest_coverline("build/color-hsl/color-hsl.js", 199);
return p + (q - p) * 6 * hue;
        }
        _yuitest_coverline("build/color-hsl/color-hsl.js", 201);
if (hue * 2 < 1) {
            _yuitest_coverline("build/color-hsl/color-hsl.js", 202);
return q;
        }
        _yuitest_coverline("build/color-hsl/color-hsl.js", 204);
if (hue * 3 < 2) {
            _yuitest_coverline("build/color-hsl/color-hsl.js", 205);
return p + (q - p) * (2/3 - hue) * 6;
        }
        _yuitest_coverline("build/color-hsl/color-hsl.js", 207);
return p;
    }

};

_yuitest_coverline("build/color-hsl/color-hsl.js", 212);
Y.Color = Y.mix(Color, Y.Color);

_yuitest_coverline("build/color-hsl/color-hsl.js", 214);
Y.Color.TYPES = Y.mix(Y.Color.TYPES, {'HSL':'hsl', 'HSLA':'hsla'});
_yuitest_coverline("build/color-hsl/color-hsl.js", 215);
Y.Color.CONVERTS = Y.mix(Y.Color.CONVERTS, {'hsl': 'toHSL', 'hsla': 'toHSLA'});


}, '@VERSION@', {"requires": ["color-base"]});
