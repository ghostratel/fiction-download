/**
 * 将请求头的cookie字符串解析为键值对并挂载到req的cookie字段下
 * @returns {Function}
 */
const cookieParser = () => {
    return (req, res, next) => {
        let {cookie} = req.headers
        if (!cookie) {return next()}
        let cookieObj = {}
        cookie = cookie.split(';')
        for (let s of cookie) {
            let key = s.match(/(\w+)=/)[1]
            cookieObj[key] = s.match(/=(.+)/)[1]
        }
        req.cookie = cookieObj
        next()
    }
}

module.exports = cookieParser
