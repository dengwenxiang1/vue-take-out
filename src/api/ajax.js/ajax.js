//  ajax请求函数
//  返回值：promise对象(异步返回的数据是：response.data)
import axios from 'axios'
export default function ajax (url,data={ }, type='GET') {
     return new Promise ((resolve,reject)=>{
         // 执行异步ajax请求
         let promise
         if (type === "GET") {
             // 准备url query参数数据
             let datStr = '' // 数据拼接字符串
             Object.keys(data).forEach(key => {
                 dataStr += key + '=' + data[key] + '&'
             })
             if (dataStr !== '') {
                 dataStr = dataStr.substring(0, dataStr.lastIndxOf('&'))
                 url = url + '?' + dataStr
             }
             // 发起post请求
             promise = axios.get(url)
         } else {
             // 发送post请求
             promise = axios.post(url, data)
         }
         promise.then(response=>{
             // 成功了调用response()
             resolve(response.data)
         })
                .catch(error=>{
                    // 失败了调用reject()
                    reject(error)
                })
        //  成功了调用resolve()
        //  失败了调用reject()
     })
  }