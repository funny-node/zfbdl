# zfbdl

**zfbdl -> 支付宝登录**

利用无头浏览器 puppeteer 实现支付宝模拟登录

## Install

```bash
$ npm install zfbdl
```

## Usage

```js
const { loginByScanQR, loginByCookies, loginByPwd } = require('zfbdl')

;(async function() {
  await loginByScanQR()

  // or 
  await loginByCookies()

  // or
  const username = 'xxx'
  const password = 'xxx'
  await loginByPwd(username, password)
})()

```

## API

### loginByScanQR([options])

支付宝网页端扫码登录

* `options` `{Object}` 选填，即 [puppeteer.launch([options])](https://pptr.dev/#?product=Puppeteer&version=v1.12.2&show=api-puppeteerlaunchoptions) 参数，程序已经为其提供了合理的默认参数，传入参数可覆盖默认
* return: `<Promise<Page>>`

返回一个新的 [Page](https://pptr.dev/#?product=Puppeteer&version=v1.12.2&show=api-class-page) 对象

### loginByPwd(username, password[, options])

支付宝网页端账号密码登录

* `username` `{String}` 账号
* `password` `{String}` 密码
* `options` `{Object}` 同 loginByScanQR
* return: `<Promise<Page>>`

### loginByCookies([options])

支付宝网页端手动设置 cookies 登录

* `options` `{Object}` 同 loginByScanQR
* return: `<Promise<Page>>`

手动设置 cookies，需要在项目根目录下新建 `cookierc.js` 文件，文件内容为一个 js 导出模块，导出一个数组，类似如下：

```js
module.exports = [
  // ...
]
```

导出的数组即为 cookies 对象数组，可以用 [EditThisCookie](https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg) 导出功能获取

## License

MIT
