# next-browser
Webview environment based on next.


## usage:
+ nx.Brwower.language()
+ call api:
```javascript
// env:
console.log('isQQ:',nx.Browser.qq);
console.log('isWechat:',nx.Browser.wechat);
console.log('isWebapp:',nx.Browser.webapp);

//language:
console.log('lang:',nx.Browser.language());

//engine:
console.log('engine:',nx.Browser.engine());

//prefix:
console.log('prefix:',nx.Browser.prefix());
```

+ use node:
```javascript
import nxBrowser from 'next-browser';
console.log(nxBrowser.qq) // true| false
```



## resources:
+ http://caibaojian.com/browser-ios-or-android.html

## todos:
- [ ] use lazy load brower env
