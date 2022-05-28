//TODO
import axios from 'axios'

import router from "../router/index";
import {Loading} from 'element-ui';

let loading;
//內存中正在請求的數量
let loadingNum=0;
function startLoading() {    
	if(loadingNum==0){
		loading = Loading.service({
		  lock: true,
		  text: '',
		  background:'rgba(255,255,255,0.5)',

		})
	}
	//請求數量加1
	loadingNum++;
}
function endLoading() {
    //請求數量減1
	loadingNum--
	if(loadingNum<=0){
		loading.close()
	}
}


//1. 建立axios實體
const service = axios.create({
  baseURL: process.env.APIPATH,
})

// 2.請求攔截器
service.interceptors.request.use(config => {
  //發請求前做的一些處理，資料轉化/設定請求頭/設定token/設定loading等
  startLoading();
  
  //設定送出的資料格式
   config.headers = {
     'Content-Type': 'application/json',
   }
  
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
  console.log("請求攔截器",error.response)
  Promise.reject(error)
})



// 3.響應攔截器
service.interceptors.response.use(response => {
  //接收到響應資料後的一些共有的處理，關閉loading等
  endLoading();
  if(response.data.success){
    return response
  }else{
    console.log(response.data.message)
  }
  
  
}, error => {
  endLoading();
  if(error.response){
    switch(error.response.status){
      case '400':
      case '404':
        router.push({path: "/pageerror"});
        break;
      case '500':
        alert("伺服器端出錯")
        break;

      default:
        router.push({path: "/index"});
        break;


    }
  }
  return Promise.reject(error);
})

export default service 