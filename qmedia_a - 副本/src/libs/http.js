import axios from 'axios';
import {
  getToken
} from '@/libs/util'
class HttpRequest {
  constructor() {
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }
    return config
  }
  distroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // const token = localStorage.getItem('authorization') ? localStorage.getItem('authorization') : '';
      const token = getToken() ? getToken() : '';
      if (token) {
        // Bearer是JWT的认证头部信息
        config.headers['authorization'] = token;
      }
      // if(config.params){
      //   Object.keys(config.params).forEach(key => {
      //     config.url += '/' + config.params[key]
      //   })
      // }
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.distroy(url)
      const {
        data
      } = res
      return data;
    }, err => {
      this.distroy(url)
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = '请求错误'
            break

          case 401:
            err.message = '未授权，请登录'
            break

          case 403:
            err.message = '拒绝访问'
            break

          case 404:
            err.message = `请求地址出错`
            break

          case 408:
            err.message = '请求超时'
            break

          case 500:
            err.message = '服务器内部错误'
            break

          case 501:
            err.message = '服务未实现'
            break

          case 502:
            err.message = '网关错误'
            break

          case 503:
            err.message = '服务不可用'
            break

          case 504:
            err.message = '网关超时'
            break

          case 505:
            err.message = 'HTTP版本不受支持'
            break
        }
      }

      return Promise.reject(err)
    })
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest