const puppeteer = require('puppeteer')
const readline = require('readline')
const username=  ''
const password = ''

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


;!async function () {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()

    await page.goto('https://accounts.douban.com/login')
    await page.waitForSelector('.btn-submit')

    await page.type('#email', username)
    await page.type('#password', password)
    await page.screenshot({path: './test.png'})

    rl.question('请输入验证码', async code => {
        rl.close()
        await page.type('#captcha_field', code)
        await page.click('input.btn-submit')
    })

    await page.waitForNavigation({
        waitUntil: 'load'
    })

}()