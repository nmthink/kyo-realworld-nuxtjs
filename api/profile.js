import { request } from '@/plugins/request'

// 获取个人基本信息
export const getProfile = username => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`
  })
}
// 关注某人
export const followUser = username => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`,
  })
}
// 取消关注
export const unFollowUser = username => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`,
  })
}

