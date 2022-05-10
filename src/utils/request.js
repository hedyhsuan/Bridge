//TODO
import axios from 'axios'

// 使用element-ui Message做訊息提醒
// import { Message} from 'element-ui';

//1. 建立新的axios範例，封裝url
const service = axios.create({
  baseURL: process.env.APIPATH,
  //config/dev.env.js
  timeout: 3 * 1000
})
// 2.請求攔截器
service.interceptors.request.use(config => {
  //發請求前做的一些處理，資料轉化/設定請求頭/設定token/設定loading等
   //config.data = JSON.stringify(config.data); 
   //資料轉化,也可以使用qs轉換
   
   //TODO
   //設定送出的資料格式
   config.headers = {
     'Content-Type': 'application/json',
   }
   //讓接收端了解資料的格式
   const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
   if(token){
      //如果有token就攜帶在headers中
      config.headers.Authorization = token;
    }
  return config
}, error => {
  Promise.reject(error)
})

// 3.響應攔截器
service.interceptors.response.use(response => {
  //接收到響應資料併成功後的一些共有的處理，關閉loading等
  
  return response
}, error => {
   //異常處理
  if (error && error.response) {
    // 1.公共錯誤處理
    // 2.根據響應碼具體處理
    switch (error.response.status) {
      case 400:
        error.message = '錯誤請求'
        break;
      case 401:
        error.message = '未授權，請重新登入'
        break;
      case 403:
        error.message = '拒絕存取'
        break;
      case 404:
        error.message = '請求錯誤,未找到該資源'
        window.location.href = "/NotFound"
        break;
      case 405:
        error.message = '請求方法未允許'
        break;
      case 408:
        error.message = '請求超時'
        break;
      case 500:
        error.message = '伺服器端出錯'
        break;
      case 501:
        error.message = '網路未實現'
        break;
      case 502:
        error.message = '網路錯誤'
        break;
      case 503:
        error.message = '服務不可用'
        break;
      case 504:
        error.message = '網路超時'
        break;
      case 505:
        error.message = 'http版本不支援該請求'
        break;
      default:
        error.message = `連線錯誤${error.response.status}`
    }
  } else {
    // 超時處理
    if (JSON.stringify(error).includes('timeout')) {
    //   Message.error('伺服器響應超時，請重新整理當前頁')
    alert('伺服器響應超時，請重新整理當前頁')
    }
    error.message('連線伺服器失敗')
  }

//   Message.error(error.message)
alert(error.message)
  /***** 處理結束 *****/
  //如果不需要錯誤處理，以上的處理過程都可省略
  return Promise.resolve(error.response)
})
//4.匯入檔案
export default service