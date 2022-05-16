//匯入http
import axios from 'axios'
// import http from '../utils/https'
import service from '../utils/request'


let resquest = process.env.APIPATH

//TODO
// get請求
//所有商品（分頁）
export function getProductsAPI(page){
   return  service.get (`${resquest}api/${process.env.CUSTOMPATH}/products?page=${page}`)
}

//所有商品
export function getAllProductsAPI(){
    return service.get(`${resquest}api/${process.env.CUSTOMPATH}/products/all`)  
}

//單一商品
export function getProductAPI(id){
    return  service.get (`${resquest}api/${process.env.CUSTOMPATH}/product/${id}`)
 }

//購物車
export function getCartAPI(id){
    return  service.get (`${resquest}api/${process.env.CUSTOMPATH}/cart`)
 }

//客戶訂單細節.
export function getCusOrderlistAPI(id){
    return service.get(`${resquest}api/${process.env.CUSTOMPATH}/order/${id}`)  
} 

//後台商品
export function getBsProductsAPI(page){
    return service.get(`${resquest}api/${process.env.CUSTOMPATH}/admin/products?page=${page}`)  
}
//後台優惠卷列表
export function getBsCouponAPI(page){
    return service.get(`${resquest}api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`)  
}
//後台訂單列表
export function getBsOrdersAPI(page){
    return service.get(`${resquest}api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`)  
}






// post請求
//登入
export function signinAPI(data){
    return service.post(`${resquest}admin/signin`,data)
}
// 登出
export function logoutAPI(){
    return service.post(`${resquest}logout`)
}
//新增後台商品
export function addBsProductAPI(params){
    return service.post(`${resquest}api/${process.env.CUSTOMPATH}/admin/product`,params)
}

//加入購物車
export function postCartAPI(data){
    return  service.post (`${resquest}api/${process.env.CUSTOMPATH}/cart`,data)
}
//加入優惠券
export function postCouponAPI(data){
    return  service.post (`${resquest}api/${process.env.CUSTOMPATH}/coupon`,data)
}
//下訂單
export function postOrderAPI(data){
    return  service.post (`${resquest}api/${process.env.CUSTOMPATH}/order`,data)
}

//訂單付款
export function postPaymentAPI(id){
    return  service.post (`${resquest}api/${process.env.CUSTOMPATH}/pay/${id}`)
}

//後台新增優惠卷
export function addCouponAPI(data){
    return  service.post (`${resquest}api/${process.env.CUSTOMPATH}/admin/coupon`,data)
}




// put 請求
//更新後台商品
export function updateBsProductAPI(id,data){
    return service.put(`${resquest}api/${process.env.CUSTOMPATH}/admin/product/${id}`,data)
}
//更新後台優惠券
export function updateBscCouponAPI(id,data){
    return service.put(`${resquest}api/${process.env.CUSTOMPATH}/admin/coupon/${id}`,data)
}
//更新訂單
export function updateOrderDetailAPI(id,data){
    return service.put(`${resquest}api/${process.env.CUSTOMPATH}/admin/order/${id}`,data)
}



// delete 請求
//刪除購物車商品
export function deleteCartItemAPI(id){
    return service.delete(`${resquest}api/${process.env.CUSTOMPATH}/cart/${id}`)
}

//刪除後台商品
export function deleteBsProductAPI(id){
    return service.delete(`${resquest}api/${process.env.CUSTOMPATH}/admin/product/${id}`)
}

//刪除後台商品
export function deleteBsCouponAPI(id){
    return service.delete(`${resquest}api/${process.env.CUSTOMPATH}/admin/coupon/${id}`)
}