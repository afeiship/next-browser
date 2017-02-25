#next-browser
Webview environment based on next.


## usage:
+ nx.browser
```javascript
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
weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
qq: u.match(/\sQQ/i) == " qq", //是否QQ,
language: (navigator.browserLanguage || navigator.language).toLowerCase()
```

+ nx.brwower.language
```javascript
(navigator.browserLanguage || navigator.language).toLowerCase()
```

+ call api:
```javascript
// env:
console.log('isWebkit:',nx.browser.webkit);
console.log('isQQ:',nx.browser.qq);
console.log('isWechat:',nx.browser.wechat);
console.log('isWebapp:',nx.browser.webapp);

//language:
console.log('lang:',nx.browser.language);
```

+ use node:
```javascript
import nxBrowser from 'next-browser';
console.log(nxBrowser.qq) // true| false
```



## resources:
+ http://caibaojian.com/browser-ios-or-android.html
