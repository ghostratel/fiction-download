const puppeteer = require('puppeteer')
const url = 'http://acadol.hnu.edu.cn/LMS/login.do'
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const username = 'S1713W1107'
const password = 'S1713W1107'

!(async function () {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()

    await page.goto(url)
    await page.waitForSelector('.login_button')

    await page.evaluate(async () => {
        var usernameIpt = document.querySelectorAll('.third_tab_text.login_text1')[0]
        var passwordIpt = document.querySelectorAll('.third_tab_text.login_text1')[1]
        usernameIpt.value = 'S1713W1107'
        passwordIpt.value = 'S1713W1107'
    })

    rl.question('请输入验证码', async code => {
        rl.close()
        await page.type('.third_tab_text.login_text2', code)
        await page.click('.login_button')
        await page.waitForNavigation({
            waitUntil: 'load'
        })

        await page.evaluate(function () {
            alert('登录成功')
        })
    })
})()
