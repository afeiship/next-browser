#next-browser
Webview environment based on next.


## usage:
+ nx.Brwower.language()
+ call api:
```javascript
// env:
console.log('isQQ:',nx.browser.qq);
console.log('isWechat:',nx.browser.wechat);
console.log('isWebapp:',nx.browser.webapp);

//language:
console.log('lang:',nx.browser.language());

//engine:
console.log('engine:',nx.browser.engine());
```

+ use node:
```javascript
import nxBrowser from 'next-browser';
console.log(nxBrowser.qq) // true| false
```



## resources:
+ http://caibaojian.com/browser-ios-or-android.html
