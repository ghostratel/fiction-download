const crypto = require('crypto')
const jwt = require('jsonwebtoken')
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
    if(!opt) {throw new Error('Lack of parameters!')}
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

/**
 * 加盐加密
 * @param password 需要加密的字符串或buffer
 * @param salt 盐值
 * @param iterations 迭代次数
 * @param keylen 返回的字符串长度
 * @param digest 加密方法
 */
const pbkdf2 = (password, salt = 'Why so serious', iterations = 100, keylen = 32, digest = 'sha512') => {
    if(!password){throw new Error('Parameter password is required')}
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, iterations, keylen, digest, ((err,derivedKey) => {
            if(err){reject(err)}
            resolve(derivedKey.toString('hex'))
        }))
    })
}

/**
 * 验证token合法性
 * @param token 接收到的token
 * @param secret 密钥
 */
const verifyToken = (token, secret) => {
    if(!token || !secret) {throw new Error('Parameter token and secret is required')}
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

/**
 * 生成范围内随机整数
 * @param min 最小值 <Number> default = 0
 * @param max 最大值 <Number>
 * @returns {number}
 */
const genRandomInteger = (min, max) => {
    let _min, _max
    if (max < min) {
        throw new Error('Max must larger than min')
    }
    if (!max && max !== 0) {
        _max = min
        _min = 0
    } else {
        _min = min
        _max = max
    }
    return Math.round((_max - _min) * Math.random() + _min)
}

/**
 * 打乱一个数组或字符串
 * @param iterable <Array> <String>
 * @returns {*}
 */
const shuffle = (iterable) => {
    const shuffleArray = (array) => {
        let _array = array.slice()
        for (let i = 0; i < _array.length; i++) {
            let j = genRandomInteger(0, i)
            let t = _array[i]
            _array[i] = _array[j]
            _array[j] = t
        }
        return _array
    }
    if (typeof iterable === 'string') {
        iterable = Array.from(iterable)
        return shuffleArray(iterable).join()
    } else {
        return shuffleArray(iterable)
    }

}




module.exports = {
    requiredParamValidate,
    responseWrapper,
    pbkdf2,
    verifyToken,
    genRandomInteger,
    shuffle
}
