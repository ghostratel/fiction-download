const puppeteer = require('puppeteer')
const __init = Symbol('__init')

const indexURL = 'https://www.80txt.com/'

class Crawler {
    constructor() {
        this.browser = null
        this.page = null
    }

    async [__init]() {
        this.browser = await puppeteer.launch()
        this.page = await this.browser.newPage()
    }


    async getAllCate() {
        await this[__init]()
        await this.page.goto(indexURL)
        await this.page.waitFor('div#nav')
        return await this.page.$$eval('div#menu ul li a', function (elements) {
            var result = []
            elements.forEach(function (element) {
                var nav = {}
                nav.cateName = element.title
                nav.cateID = element.href.match(/\/sort\w+\//)[0].replace(/\//g, '')
                result.push(nav)
            })
            return result
        })
    }

    async getCateItems(cateID) {
        !this.browser && await this[__init]()
        await this.page.goto('https://www.80txt.com/sort21/1.html')
        const totalPage = await this.page.$eval('a.last', (element) => {
            return +element.innerText
        })
        for(let currentPage = 1; i <= totalPage; currentPage++) {
            clg
        }
    }

    async close() {
        await this.browser.close()
    }
}


module.exports = Crawler