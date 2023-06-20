/**
 * http请求
 */
import axios from 'axios'
import { Toast } from 'vant'

function getHeaders() {
  return {}
}

const request = axios.create()
request.defaults.timeout = 10000
request.interceptors.request.use(
  (config) => {
    config.headers = { ...getHeaders(), ...config.headers }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    const config = response.config
    const res = response.data
    if (res.status === 'success') {
      return Promise.resolve(res)
    } else if (res.status === 'error' && res.message === 'error') {
      //当后台服务报错信息只返回error时,改为友好提示
      Toast('网络请求错误')
      return Promise.reject(res)
    } else if (typeof config.message === 'string') {
      Toast(config.message)
      return Promise.reject(res)
    } else if (config.message !== false) {
      Toast(res.message || '网络请求错误')
      return Promise.reject(res)
    } else {
      return Promise.reject(res)
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
