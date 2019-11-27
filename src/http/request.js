/**!
 * http请求统一拦截处理
 */

import axios from 'axios'
import { Message, MessageBox } from 'element-ui'


// 创建axios实例
const service = axios.create({
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)


// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
        Message({
            message: res.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) 
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service