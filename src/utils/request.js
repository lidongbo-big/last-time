import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 定义后端返回的原始数据的处理
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    try {
      return JSONbig.parse(data)
    } catch (err) {
      return data
    }
  }]
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response && error.response.status === 401) {
    router.push('/login')
    window.localStorage.removeItem('user')
  }
  return Promise.reject(error)
})
export default request
