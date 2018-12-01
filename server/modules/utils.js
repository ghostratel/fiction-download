const crypto = require('crypto')
/**
 * 验证必须参数
 * @param required <Array> 必须参数的数组
 * @param param <Object> 需要被验证的参数
 */
const requiredParamValidate = (required, param) => {
    if(!required || !param) {throw new Error('Lack of parameters!')}
    return new Promise((resolve, reject) => {
        for(let key of required) {
            if(!param.hasOwnProperty(key)) {
                reject(key)
            }
        }
        resolve(param)
    })
}

/**
 * 包装一下接口的返回数据
 * @param opt.code 状态码 0: 错误 1: 成功
 * @param opt.data 返回的数据
 * @returns {{code: *, message: *, data: *}}
 */
const responseWrapper = (opt) => {
    if(opt) {throw new Error('Lack of parameters!')}
    const codeMap = {
        0: 'error',
        1: 'success'
    }

    let {code, data} = opt

    return {
        code,
        message: codeMap[code],
        data
    }
}

const pbkdf2 = (password, salt = 'Why so serious', iterations = 100, keylen = 32, digest = 'sha512') => {
    if(!password){throw new Error('Parameter password is required')}
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, iterations, keylen, digest, ((err,derivedKey) => {
            if(err){reject(err)}
            resolve(derivedKey.toString('hex'))
        }))
    })
}

module.exports = {
    requiredParamValidate,
    responseWrapper,
    pbkdf2
}
