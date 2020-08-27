import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'POST',
    url: 'mp/v1_0/authorizations',
    data
  })
}
// 获取用户信息
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: 'mp/v1_0/user/profile'
  })
}
// 修该用户头像
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: 'mp/v1_0/user/photo',
    data
  })
}
// 修该用户头像
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: 'mp/v1_0/user/profile',
    data
  })
}
