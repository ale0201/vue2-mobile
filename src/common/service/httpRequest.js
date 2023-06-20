import request from './service'
import qs from 'qs'

class HttpRequest {
  static async post(url, params, opts) {
    const optst = opts || {}
    return await request({
      baseURL: '',
      url: url,
      data: params,
      method: 'post',
      loading: !!(optst.loading || optst.loading === undefined),
      headers: {
        'content-type': 'application/json;charset=utf-8',
        Pragma: 'no-cache',
      },
    })
  }

  static async postStr(url, params, opts) {
    const optst = opts || {}
    return await request({
      baseURL: '',
      url: url,
      data: qs.stringify(params),
      method: 'post',
      loading: !!(optst.loading || optst.loading === undefined),
      headers: {
        'content-type': 'application/json;charset=utf-8',
        Pragma: 'no-cache',
      },
    })
  }

  static async get(url, params, opts) {
    const optst = opts || {}
    return await request({
      url: url,
      method: 'get',
      data: params,
      loading: !!(optst.loading || optst.loading === undefined),
      headers: {
        Pragma: 'no-cache',
        'content-type': 'application/json',
      },
    })
  }
}

export default HttpRequest
