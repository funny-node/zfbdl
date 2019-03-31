const { setupBrowser } = require('./../util/helper')

/**
 * 账号密码登录
 * @param {String} username 
 * @param {String} password 
 * @param {Object} options 选填，可覆盖程序中 puppeteer.launch 默认设置
 */
function loginByPwd(username, password, options = {}) {
  return new Promise(async resolve => {
    const { page, browser } = await setupBrowser(options)

    await page.goto('https://www.alipay.com/')
    
    // 点击 "我是个人用户"
    await Promise.all([
      page.click('body > div > div.container > div.content > div > div.mid > div > a.personal-login'),
      page.waitForNavigation({ waitUntil: 'networkidle2' })
    ])
    
    // 点击 "登录"
    await page.click('#J_videoContainer > div.main-content > div > div.click-me.clearfix > a.am-button.button-login')
   
    const frames = await page.frames()
    const loginFrame = await frames.find(frame => frame.name() === 'J_loginIframe')
    
    // 点击右上角登录切换按钮
    await loginFrame.click('#J-qrcode-target')
    
    // 输入账号
    await loginFrame.type('#J-input-user', username)
    
    // 输入密码
    await loginFrame.type('#password_rsainput', password)

    // 点击登录
    await Promise.all([
      loginFrame.click('#J-login-btn'),
      page.waitForNavigation({ waitUntil: 'networkidle2' })
    ])
    
    resolve({ page, browser })
  })
}

module.exports = loginByPwd
