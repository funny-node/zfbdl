const puppeteer = require('puppeteer')

/**
 * 初始化 puppeteer
 * @param {Object} options 选填，puppeteer.launch({}) 的设置，可覆盖默认
 */
function setupBrowser(options = {}) {
  return new Promise(async resolve => {
    // 程序默认配置
    let defaultOptions = {
      // devtools: true,
      // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: false,
      slowMo: 500, // 减慢操作
      defaultViewport: {
        width: 1440,
        height: 900,
      } 
    }
    
    Object.assign(defaultOptions, options)
    const browser = await puppeteer.launch(defaultOptions)

    const page = await browser.newPage()
    resolve(page)
  }) 
}

module.exports.setupBrowser = setupBrowser
