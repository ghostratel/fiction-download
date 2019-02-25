const {verifyToken, responseWrapper} =  require('../modules/utils.js')
const {TOKEN_KEY} = require('../routes/admin/CONSTANTS.js')
/**
 * token校验中间件
 * @param secret required token密钥
 * @param whiteList 校验白名单
 * @returns {Function}
 */
const tokenValidator = (secret, whiteList = []) => {
    if(!secret){throw new Error('Parameter tokenSecret is required')}
    return (req, res, next) => {
        if(whiteList.indexOf(req.originalUrl) !== -1) {
            next()
        } else {
            if(!req.cookie || !req.cookie[TOKEN_KEY]){
                return res.send(responseWrapper({code: 0, data: 'Invalid token!'}))
            }
            verifyToken(req.cookie[TOKEN_KEY], secret).then(token => {
                // 校验请求头的 useragent 是否和 token 中设置的一样，如不一样则说明token可能被盗用
                if(token.userAgent === req.headers['user-agent']) {
                    next()
                } else {
                    res.send(responseWrapper({code: 0, data: 'Invalid token!'}))
                }
            }).catch(err => {
                res.send(responseWrapper({code: 0, data: 'Invalid token!'}))
            })
        }
    }
}

module.exports = tokenValidator
