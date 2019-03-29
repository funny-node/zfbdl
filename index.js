const { TimeoutError } = require('puppeteer/Errors')
const { setupBrowser } = require('./util/helper')
const path = require('path')
const appDir = path.dirname(require.main.filename)
const loginByPwd = require('./lib/login_by_pwd')

/**
 * 扫描二维码方式登录
 * @param {Object} options 选填，可覆盖程序中 puppeteer.launch 默认设置
 */
function loginByScanQR(options) {
  return new Promise(async resolve => {
    const page = await setupBrowser(options)

    // 没有登录，会跳出二维码
    await page.goto('https://consumeprod.alipay.com/record/standard.htm')

    // 二维码等待扫描或者有时操作频繁需要扫描验证
    try {
      await page.waitForSelector('.J-item', { timeout: 0 })
      resolve(page)
    } catch (e) {
      if (e instanceof TimeoutError) {
        // 如果超时，做一些处理
        console.log('长时间没有扫描验证码，被当作机器啦！!')
      }
    }
  })
}

/**
 * Cookies 方式登录
 * @param {Object} options 可覆盖 puppeteer.launch 默认设置
 */
function loginByCookies(options) {
  return new Promise(async resolve => {
    const page = await setupBrowser(options)

    try {
      const cookies = require(path.join(appDir, 'cookierc'))
      await page.setCookie(...cookies)
      await page.goto('https://consumeprod.alipay.com/record/standard.htm')

      // 有时操作频繁需要扫描验证
      try {
        await page.waitForSelector('.J-item', { timeout: 0 })
        resolve(page)
      } catch (e) {
        if (e instanceof TimeoutError) {
          // 如果超时，做一些处理
          console.log('长时间没有扫描验证码，被当作机器啦！!')
        }
      }
    } catch (err) {
      throw Error('请在项目根目录下创建 cookierc.js 文件')
    }
  })
}

module.exports = {
  loginByScanQR,
  loginByCookies,
  loginByPwd,
}
