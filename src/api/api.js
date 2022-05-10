//匯入http
import http from '../utils/https'

// @parms resquest 請求地址 例如：http://197.82.15.15:8088/request/...
// @param '/testIp'代表vue-cil中config，index.js中設定的代理

let resquest = process.env.APIPATH

//TODO
// get請求
export function getProductsAPI(params){
    return http.get(`${resquest}api/${process.env.CUSTOMPATH}/products?page=${params}`)
    //params是頁面中才會傳入的預設頁面參數
}
export function getSortProductsAPI(){
    return http.get(`${resquest}api/${process.env.CUSTOMPATH}/products/all`)
    //params是頁面中才會傳入的預設頁面參數
}


// post請求
export function postFormAPI(params){
    return http.post(`${resquest}/postForm.json`,params)
}
// put 請求
export function putSomeAPI(params){
    return http.put(`${resquest}/putSome.json`,params)
}
// delete 請求
export function deleteListAPI(params){
    return http.delete(`${resquest}/deleteList.json`,params)
}