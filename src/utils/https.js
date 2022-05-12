// 匯入封裝好的axios request
import request from './request'

const http ={
    
     //methods: 請求
     //@param url 請求地址 
     //@param params 請求引數
     
    //TODO 
    get(url,params){
        const config = {
            method: 'get',
            url:url
        }
        if(params) 
        config.params = params
        return request(config)
    },
    post(url,params){
        const config = {
            method: 'post',
            url:url
        }
        if(params) 
        config.data = params
        return request(config)
    },
    put(url,params){
        const config = {
            method: 'put',
            url:url
        }
        if(params) 
        config.data = params
        return request(config)
    },
    delete(url,params){
        const config = {
            method: 'delete',
            url:url
        }
        if(params) 
        config.params = params
        return request(config)
    }
}
//匯出
export default http