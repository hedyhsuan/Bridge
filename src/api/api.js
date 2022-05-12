//匯入http
import axios from 'axios'
// import http from '../utils/https'
// import request from '../utils/request'
import {get,post} from '../utils/request'

let resquest = process.env.APIPATH

//TODO
// get請求
export function getProductsAPI(page){
   return  get (`${resquest}api/${process.env.CUSTOMPATH}/products?page=${page}`)

}

export function getProductAPI(id){
    return  get (`${resquest}api/${process.env.CUSTOMPATH}/product/${id}`)
 
 }
// export function getSortProductsAPI(){
//     return http.get(`${resquest}api/${process.env.CUSTOMPATH}/products/all`)
    
// }
export function getBsProductsAPI(page){
    return get(`${resquest}api/${process.env.CUSTOMPATH}/admin/products?page=${page}`)  
}



// post請求
//登入
export function signinAPI(data){
    return post(`${resquest}admin/signin`,data)
}
//登出
// export function logoutAPI(){
//     return http.post(`${resquest}admin/logout`)
// }
//新增後台商品
// export function addBsProductAPI(params){
//     return http.post(`${resquest}api/${process.env.CUSTOMPATH}/admin/product`,params)
// }


// put 請求
//更新後台商品
// export function updateBsProductAPI(id,params){
//     return http.put(`${resquest}api/${process.env.CUSTOMPATH}/admin/product/${id}`,params)
// }
// delete 請求
// export function deleteListAPI(params){
//     return http.delete(`${resquest}/deleteList.json`,params)
// }