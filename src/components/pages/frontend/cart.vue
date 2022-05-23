<template>
    <div>
          <div class="cart_page">

             <div class="container" v-if="totalPrice>0">
                <h4>購物車</h4>
                <form action="">
                 <table class="w-100" id="shopping-cart" >
                 <thead>
                   <th >商品</th>
                   <th width="20%">單價</th>
                   <th width="10%" class="text-center">數量</th>
                   <th width="15%" class="text-center">小計</th>
                   <th width="5%"  class="text-center">刪除</th>
                 </thead>
                 <tbody>
                  <tr v-for="(item) in tempData" :key="item.id">
                      <td class="cart-item d-flex align-items-center">
                          <div class="cart-img mr-2" style="max-width:160px">
                              <a href="#" @click.prevent="getProduct(item.product_id)">
                                  <img class="w-100" :src="`${item.imageUrl}`" alt="">
                              </a>
                          </div>
                          <div class="cart-title"> {{item.title}}</div>

                      </td>
                      <td>{{item.price|currency}}</td>
                      <td class="text-center">
                         <input
                          min="1"
                          type="number"
                          class="form-control"
                          v-model.number="item.qty"
                          @change="updateCart()"
                  
                        />
                      </td>
                      <!-- <td class="text-center">{{item.qty}}</td> -->
                      <td class="text-center">{{item.price*item.qty|currency}}</td>
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
                       <router-link class="link" :to="{name:'Category',params:{category:'allproduct'}}" >繼續購物</router-link>
                   </div>
                   <div class="goCheckout">
                       <div @click.prevent="goCheckout" >結帳</div>
                        <!-- <a href="" @click.prevent="goCheckout" >結帳</a> -->
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
        tempData: JSON.parse(localStorage.getItem('tempData')) || [],
        //localStorage儲存的商品資料
        allCart:[],
        //後台儲存的商品資料
        totalPrice:0, 

        
    };
},
    methods: {
        getData(){
            console.log(this.tempData)
            getCartAPI().then((res)=>{
                this.allCart=res.data.data.carts;
                console.log(this.allCart)
            })
        },

        getTotalPr(){
            const vm=this;
            vm.totalPrice=0;
            vm.tempData.forEach((item)=>{
                vm.totalPrice+=item.price*item.qty
            })
            
        },

        getProduct(id){
        this.$router.push({name:'SingleProduct',params:{id:id}})
     
        },


        removeItem(localItem){
            const vm=this;
            vm.tempData.forEach((item,key)=>{
                if(localItem.product_id===item.product_id){
                     vm.tempData.splice(key,1)
                     console.log(item.product_id)
                    //  vm.removeCartItem(localItem.product_id)
                }
                localStorage.setItem('tempData', JSON.stringify(vm.tempData))
                // 更新的資料傳回localStorage
                vm.getTotalPr()
                // 刪除後重新計算價格
            })   
            // vm.allCart.forEach((item)=>{
            //     if(localItem.product_id == item.product_id){
            //         vm.removeCartItem(item.product_id)
            //     }
            // })

            this.$emit('localData');
        },

        removeCartItem(id){
            const vm=this
            deleteCartItemAPI(id).then((res)=>{
                console.log(vm.allCart)
            })
        },
        updateCart(){
            const vm=this;
            vm. getTotalPr()
            console.log(vm.tempData)
            localStorage.setItem('tempData', JSON.stringify(vm.tempData))

            this.$emit('localData');
            //觸發父層dashBoard.vue的購物車數字更新

      },
            
        //TODO
        goCheckout(){

            // 先把原本後台購物車清空
            this.allCart.forEach((item)=>{
              deleteCartItemAPI(item.id).then((res)=>{
                  
              })
            })

            // localStorage資料存進後台
            
            this.tempData.forEach((item)=>{
              const cartLocalstorage={
                product_id:item.product_id,
                qty:item.qty
              }
            //存入後台
            postCartAPI({data:cartLocalstorage}).then((res)=>{
                
                let product = this.tempData.length
                console.log(product)
                let num=0
                if(res.message=='已加入購物車'){
                    num++
                }
                if(num=product){
                     this.$router.push({name:'Checkout'})  

                }
                

            }) 
            
            }) 

            //跳轉頁面 
            
           
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
.toShop:hover,.goCheckout:hover{
  background-color: #000;
  color: #fff;
}
.link{
    color: #000;
}
.toShop:hover .link{
    color: #fff;  
}


@media(max-width:575px){
    .toShop,.goCheckout{
  margin: 20px 0 0;
  padding: 10px;
  width: 100%;
}
}

    
</style>

