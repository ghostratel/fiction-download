const {verifyToken, responseWrapper} =  require('../modules/utils.js')
/**
 * token校验中间件
 * @param secret required token密钥
 * @param whiteList 校验白名单
 * @returns {Function}
 */
const tokenValidator = (secret, whiteList = []) => {
    if(!secret){throw new Error('Parameter tokenSecret is required')}
    return (req, res, next) => {
        if(whiteList.indexOf(req.baseUrl) !== -1) {
            next()
        } else {
            if(!req.cookie || !req.cookie['access_token']){
                return res.send(responseWrapper({code: 0, data: 'Invalid token!'}))
            }
            verifyToken(req.cookie['access_token'], secret).then(result => {
                next()
            }).catch(err => {
                res.send(responseWrapper({code: 0, data: 'Invalid token!'}))
            })
        }
    }
}

module.exports = tokenValidator
