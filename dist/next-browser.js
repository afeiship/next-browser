/*!
 * name: next-browser
 * url: https://github.com/afeiship/next-browser
 * version: 1.0.0
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');

  var navigator = global.navigator;
  var UA = navigator.userAgent;
  var PLATFORM = navigator.platform;
  var docStyle = document.documentElement.style;
  var toString = Object.prototype.toString;
  var OBJECT_OPERA = '[object Opera]';
  var JS_PREFIX_MAP = {
    trident: 'ms',
    gecko: 'Moz',
    webkit: 'Webkit',
    presto: 'O'
  };

  var CSS_PREFIX_MAP = {
    trident: '-ms-',
    gecko: '-moz-',
    webkit: '-webkit-',
    presto: '-o-'
  };

  //https://github.com/madrobby/zepto/blob/master/src/detect.js
  function detect(ua, platform) {
    var os = (this.os = {}),
      browser = (this.browser = {}),
      webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
      android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
      osx = !!ua.match(/\(Macintosh\; Intel /),
      ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
      iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
      win = /Win\d{2}|Windows/.test(platform),
      wp = ua.match(/Windows Phone ([\d.]+)/),
      touchpad = webos && ua.match(/TouchPad/),
      kindle = ua.match(/Kindle\/([\d.]+)/),
      silk = ua.match(/Silk\/([\d._]+)/),
      blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
      bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
      rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
      playbook = ua.match(/PlayBook/),
      chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
      firefox = ua.match(/Firefox\/([\d.]+)/),
      firefoxos = ua.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
      ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
      webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
      safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);

    // Todo: clean this up with a better OS/browser seperation:
    // - discern (more) between multiple browsers on android
    // - decide if kindle fire in silk mode is android or not
    // - Firefox on Android doesn't specify the Android version
    // - possibly devide in os, device and browser hashes

    if ((browser.webkit = !!webkit)) browser.version = webkit[1];

    if (android) (os.android = true), (os.version = android[2]);
    if (iphone && !ipod) (os.ios = os.iphone = true), (os.version = iphone[2].replace(/_/g, '.'));
    if (ipad) (os.ios = os.ipad = true), (os.version = ipad[2].replace(/_/g, '.'));
    if (ipod) (os.ios = os.ipod = true), (os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null);
    if (wp) (os.wp = true), (os.version = wp[1]);
    if (webos) (os.webos = true), (os.version = webos[2]);
    if (touchpad) os.touchpad = true;
    if (blackberry) (os.blackberry = true), (os.version = blackberry[2]);
    if (bb10) (os.bb10 = true), (os.version = bb10[2]);
    if (rimtabletos) (os.rimtabletos = true), (os.version = rimtabletos[2]);
    if (playbook) browser.playbook = true;
    if (kindle) (os.kindle = true), (os.version = kindle[1]);
    if (silk) (browser.silk = true), (browser.version = silk[1]);
    if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true;
    if (chrome) (browser.chrome = true), (browser.version = chrome[1]);
    if (firefox) (browser.firefox = true), (browser.version = firefox[1]);
    if (firefoxos) (os.firefoxos = true), (os.version = firefoxos[1]);
    if (ie) (browser.ie = true), (browser.version = ie[1]);
    if (safari && (osx || os.ios || win)) {
      browser.safari = true;
      if (!os.ios) browser.version = safari[1];
    }
    if (webview) browser.webview = true;

    os.tablet = !!(
      ipad ||
      playbook ||
      (android && !ua.match(/Mobile/)) ||
      (firefox && ua.match(/Tablet/)) ||
      (ie && !ua.match(/Phone/) && ua.match(/Touch/))
    );
    os.phone = !!(
      !os.tablet &&
      !os.ipod &&
      (android ||
        iphone ||
        webos ||
        blackberry ||
        bb10 ||
        (chrome && ua.match(/Android/)) ||
        (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
        (firefox && ua.match(/Mobile/)) ||
        (ie && ua.match(/Touch/)))
    );
  }

  var Browser = nx.declare('nx.Browser', {
    statics: {
      init: function() {
        //thanks zepto:
        detect.call(this, UA, PLATFORM);

        //buggy browser fix.
        nx.mix(this, {
          mobile: !!UA.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1, //android终端
          iphone: UA.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
          ipad: UA.indexOf('iPad') > -1, //是否iPad
          webapp: UA.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
          wechat: UA.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
          qq: UA.match(/\sQQ/i) == ' qq' //是否QQ
        });
      },
      engine: function() {
        if (global.opera && toString.call(opera) === OBJECT_OPERA) {
          return 'presto';
        } else if ('MozAppearance' in docStyle) {
          return 'gecko';
        } else if ('WebkitAppearance' in docStyle) {
          return 'webkit';
        } else if (typeof navigator.cpuClass === 'string') {
          return 'trident';
        } else {
          return 'unknown';
        }
      },
      language: function() {
        return (navigator.browserLanguage || navigator.language).toLowerCase();
      },
      jsPrefix: function() {
        return JS_PREFIX_MAP[Browser.engine()];
      },
      cssPrefix: function() {
        return CSS_PREFIX_MAP[Browser.engine()];
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Browser;
  }
})();
