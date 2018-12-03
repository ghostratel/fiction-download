import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(_id) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { _id }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
