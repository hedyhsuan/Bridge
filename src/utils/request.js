//TODO
import axios from 'axios'

// import { Loading} from 'element-ui';
import router from "../router/index";

//1. 建立新的axios範例
const service = axios.create({
  baseURL: process.env.APIPATH,
})
// 2.請求攔截器
service.interceptors.request.use(config => {
  //發請求前做的一些處理，資料轉化/設定請求頭/設定token/設定loading等
  // config.data = JSON.stringify(config.data); 
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
  if (error.response) {
    // 錯誤處理
    switch (error.response.status) {
      case 401:
        error.message = '請重新登入'
        router.push({path: "/login"});
        break;
      case 403:
        error.message = '拒絕存取'
        break;
      case 500:
        error.message = '伺服器端出錯'
        break;
  
    }
     //   Message.error(error.message)
   alert(error.message)
  } 
  return Promise.resolve(error.response)
})

export function get(url,params){
  return service.get(url,params)
}
export function post(url,data){
  return service.post(url,data)
}
