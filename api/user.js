import { request } from '@/plugins/request'

// 登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data: data
  })
}

// 注册
export const register = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data: data
  })
}
// 更新用户信息
export const update = data => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data: data
  })
}
