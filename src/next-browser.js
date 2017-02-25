(function(nx, global) {

  var navigator = global.navigator;
  var Browser = nx.declare('nx.browser', {
    statics: {
      init: function() {
        var u = navigator.userAgent,
          app = navigator.appVersion;
        nx.mix(this, {
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webkit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
          iphone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
          ipad: u.indexOf('iPad') > -1, //是否iPad
          webapp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
          wechat: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
          qq: u.match(/\sQQ/i) == " qq", //是否QQ,
          language: (navigator.browserLanguage || navigator.language).toLowerCase()
        });
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Browser;
  }

}(nx, nx.GLOBAL));
