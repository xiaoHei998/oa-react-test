import axios from 'axios'

export const Axios = axios.create({
  baseURL: '/api', // 因为我本地做了反向代理
  timeout: 20000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    // error 的回调信息
    return Promise.reject(error.data.error.message)
  }
)

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  (res) => {
    return res
  },
  (error) => {
    // 下面是接口回调的satus
    if (error.message.includes('timeout')) {
      // Message.error('请求超时，请刷新页面重试')
    }
    if (error.response) {
      switch (error.response.status) {
        case 400:
        case 403:
        case 500:
        case 502:
        case 404:
          return Promise.reject(error.response.data.message)
        default:
          break
      }
      // 返回 response 里的错误信息
      const errorInfo = error.response.data.message || error.response.data
      return Promise.reject(String(errorInfo))
    } else {
      return Promise.reject('An error has occurred')
    }
  }
)