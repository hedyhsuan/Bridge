<template>
    <div>
          <loading :active='isLoading'  />

          <div class="cart_page">

             <div class="container" v-if="totalPrice>0">
                <h4>購物車</h4>
                <form action="">
                 <table class="w-100" id="shopping-cart" >
                 <thead>
                   <th >商品</th>
                   <th width="15%">單價</th>
                   <th width="15%" class="text-center">數量</th>
                   <th width="15%">小計</th>
                   <th width="5%"  class="text-center">刪除</th>
                 </thead>
                 <tbody>
                  <tr v-for="(item) in tempData" :key="item.id">
                      <td class="cart-item d-flex align-items-center">
                          <div class="cart-img mr-2" style="max-width:160px">
                              <a href="" >
                                  <img class="w-100" :src="`${item.imageUrl}`" alt="">
                              </a>
                          </div>
                          <div class="cart-title"> {{item.title}}</div>

                      </td>
                      <td>{{item.price|currency}}</td>
                      <td class="text-center">{{item.qty}}</td>
                      <td>{{item.price*item.qty|currency}}</td>
                      <td class="text-center">
                          <a href="" @click.prevent="removeItem(item)">
                              <i class="fa fa-times"></i>
                          </a>
                          </td>

                  </tr>
                  <tr>
                      <td class="border-bottom-0"></td>
                      <td class="border-bottom-0"></td>
                      <td>小計</td>
                      <td>{{totalPrice|currency}}</td>
                      <td></td>
                  </tr > 
                    
                  </tbody>
              
                 </table>
           
                </form>

              <div class="text-center">
              </div>
              <div>
                 <div class="cartOp">
                   <div class="toShop" >
                       <router-link :to="{name:'Category',params:{category:'allproduct'}}" >繼續購物</router-link>
                   </div>
                   <div class="goCheckout">
                        <a href="" @click.prevent="goCheckout" >結帳</a>
                   </div>

                 </div>
              </div>
         
          </div>

          <div v-else class="text-center">
              <div class="mb-5">
                  <h5>
                  購物車內尚無商品
                  </h5>
              </div >
              <router-link :to="{name: 'Index'}" class="btn btn-dark">回到首頁</router-link>

          </div>

       </div>
      </div>
  

</template>





<script>
import {getCartAPI,postCartAPI,deleteCartItemAPI} from "../../../api/api"
export default {

    data() {
    return {
        data:[],
        orderId:"",
        isLoading:false,
        tempData: JSON.parse(localStorage.getItem('tempData')) || [],
        //localStorage儲存的商品資料
        allCart:[],
        //後台儲存的商品資料
        totalPrice:0, 
        
    };
},
    methods: {
        getData(){
            getCartAPI().then((res)=>{
            this.allCart=res.data.data.carts;
             
            })
            .catch(err=>console.log(err))

        },

        getTotalPr(){
            const vm=this;
            vm.totalPrice=0;
            vm.tempData.forEach((item)=>{
                vm.totalPrice+=item.price*item.qty
            })
            
        },

        removeItem(localItem){
            const vm=this;
            vm.tempData.forEach((item,key)=>{
                
                if(localItem.product_id===item.product_id){
                     vm.tempData.splice(key,1)
                }
                localStorage.setItem('tempData', JSON.stringify(vm.tempData))
                // 更新的資料傳回localStorage
                vm.getTotalPr()
                // 刪除後重新計算價格
            })
            this.$emit('localData');
          
        },
        //TODO
        goCheckout(){
            // 先把原本後台購物車清空
            this.allCart.forEach((item)=>{
              deleteCartItemAPI(item.id).then((res)=>{
              })
              .catch(err=>console.log(err))
            })
            // 把localStorage的資料存進後台
            this.tempData.forEach((item)=>{
              const cartLocalstorage={
                product_id:item.product_id,
                qty:item.qty
              }
            postCartAPI({data:cartLocalstorage}).then((res)=>{
                this.$router.push({name:'Checkout'}) 

            })
            .catch(err=>console.log(err))    
            })
             

        },
    },
    created() {
        this.getData()
        this.getTotalPr()

    },
    
}
</script>

<style scoped>

.cart_page{
  margin: 100px 0 0;
  padding: 100px 0;
  background-color: #f5f4f1;
}


#shopping-cart td,#shopping-cart th{
  padding: 10px;
  border-bottom: 1px solid #000;
}
.cartOp{
    display: flex;
    flex-direction: column;
    align-items: flex-end;

}
@media(max-width:767px){
    .cart-item{
        display: flex;
        flex-direction: column;

    }
}

.toShop,.goCheckout{
  margin: 20px 0 0;
  padding: 10px;
 text-align: center;
  width: 35%;
  background-color: #fff;
  color: #000;
  transition: all .2s ease-in;
  cursor: pointer;

}
@media(max-width:575px){
    .toShop,.goCheckout{
  margin: 20px 0 0;
  padding: 10px;
  width: 100%;
}
}
.toShop:hover,.goCheckout:hover{
  background-color: #000;
  color: #fff;
}
    
</style>

