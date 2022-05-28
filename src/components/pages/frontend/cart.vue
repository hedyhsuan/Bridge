<template>
    <div>
        <div class="pro_bg">
                      <div class="col-12 p-0">
                <div class="productBanner">
                    <img class="bannerImg w-100" src="https://imgur.com/JlRsPez.jpg" alt="">
                </div>
            </div>

          <div class="cart_page container" data-aos='fade-down' data-aos-duration="1000" data-aos-once="true">
  

             <div class="" v-if="totalPrice>0">
                <h5 class="pl-2">購物車</h5>
                <form action="">
                 <table class="w-100" id="shopping-cart" >
                 <thead class="t_head">
                   <th >商品</th>
                   <th width="20%">單價</th>
                   <th width="15%" class="text-center">數量</th>
                   <th width="15%" class="text-center">小計</th>
                   <th width="10%"  class="text-center">刪除</th>
                 </thead>
                 <tbody class="blockItems">
                  <tr v-for="(item) in tempData" :key="item.id" class="blockItem">
                      <td class="cart-item">
                          <div class="cart-img">
                              <a href="#" @click.prevent="getProduct(item.product_id)">
                                  <img class="w-100" :src="`${item.imageUrl}`" alt="">
                              </a>
                          </div>
                          <div class="cart-title"> {{item.title}}</div>

                      </td>

                      <td class="order_price">{{item.price|currency}}</td>
                      <td class="text-center order_qty">
                            <input
                               oninput="if(value>20)value=20;"
                               onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                               value=""
                                min=""
                                max="20"
                                type="number"
                                class="form-control"
                                v-model.number="item.qty"
                                @change="updateCart()"
                              
                              />
                      </td>
                      <td class="text-center order_total">{{item.price*item.qty|currency}}</td>
                      <td class="text-center order_delete">
                          <a href="" @click.prevent="removeItem(item)">
                              <i class="fa fa-times"></i>
                          </a>
                    </td>

                    <!-- 行動 -->
                    
                    <td class="mobile_show">
                        <!-- 圖片 -->
                        <div class="d-flex justify-content-between">
                            <div class="cart-img">
                              <a href="#" @click.prevent="getProduct(item.product_id)">
                                  <img class="w-100" :src="`${item.imageUrl}`" alt="">
                              </a>
                               <div class="cart-title text-center"> {{item.title}}</div>
                          </div>
                          <div class="mobile_right">
                            
                             <!-- 價格 -->
                             <div class="mobile_order_price ">{{item.price|currency}}</div>
                             <!-- 數量 -->
                            <div class="mobile_order_qty ">
                            <input
                               oninput="if(value>20)value=20;"
                               onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                               value=""
                                min=""
                                max="20"
                                type="number"
                                class="form-control"
                                v-model.number="item.qty"
                                @change="updateCart()"
                              
                              />
                                <!-- @enter="updateCart(item.qty)" -->
                               <!-- @change="updateCart()" -->
                            </div>
                            <!-- 小計 -->
                        <div class="mobile_order_total ">小計:{{item.price*item.qty|currency}}</div>

                          </div>
                          <div>
                              <a href="" @click.prevent="removeItem(item)">
                              <i class="fa fa-times"></i>
                          </a>
                          </div>

                        </div>

                    </td>
                    

                  </tr>
                  <tr>
                      <td class="border-bottom-0"></td>
                      <td class="border-bottom-0"></td>
                      <td></td>
                      <td >小計</td>
                      <td class="text-right">{{totalPrice|currency}}</td>
                  </tr > 
                    
                  </tbody>
              
                 </table>
           
                </form>

              <div class="text-center">
              </div>
              <div>
                 <div class="cartOp">
                       <router-link class="link toShop" :to="{name:'Category',params:{category:'allproduct'}}" >繼續購物</router-link>
                
                   <div @click.prevent="goCheckout" class="goCheckout">
                       <div >結帳</div>
                   </div>

                 </div>
              </div>
         
          </div>

          <div v-else class="text-center">
              <div class="col-12">
                <div class="mt-5 mb-5">
                  <h5>
                  購物車內尚無商品
                  </h5>
                </div >
              <router-link :to="{name: 'Index'}" class="btn btn-dark">回到首頁</router-link>

          </div>
            

          </div>

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
        num:0 ,
        item:{
            qty:''
        }


        
    };
},
    methods: {
        getData(){
            //檢查商一商品最大數量
            const vm=this
            vm.tempData.forEach((item)=>{
                if(item.qty>20){
                    item.qty=20
                }
                localStorage.setItem('tempData', JSON.stringify(vm.tempData))
                this.$emit('localData');
            })

        
            getCartAPI().then((res)=>{
                this.allCart=res.data.data.carts;
            })
        },

        getTotalPr(){           
            const vm=this;
            vm.totalPrice=0;
            vm.tempData.forEach((item)=>{
                if(item.qty==""){
                  item.qty=1
                  //如果輸入的內容是空白就定義為1
            }
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
                    //  console.log(item.product_id)
                }
                localStorage.setItem('tempData', JSON.stringify(vm.tempData))
                // 更新的資料傳回localStorage
                vm.getTotalPr()
                // 刪除後重新計算價格
            })   

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
             localStorage.setItem('tempData', JSON.stringify(vm.tempData))
            vm. getTotalPr()           
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
             if(item.qty==""){
              item.qty=1
            }
             //如果輸入的內容是空白就定義為1

              const cartLocalstorage={
                product_id:item.product_id,
                qty:item.qty
              }
            //存入後台
            
            //判定所有商品都加入購物車
            postCartAPI({data:cartLocalstorage}).then((res)=>{
                //localStorage的商品長度
                let product = this.tempData.length
                if(res.data.message=='已加入購物車'){
                    this.num++
                    // console.log(this.num)
                }
                if(this.num==product){
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
  .pro_bg{
    padding-bottom: 100px;
    background-color: #f5f4f1;
  }
  .container{
      margin-top: 70px;
    margin-bottom: 30px;
  }

.cart_page{
  /* margin-top: 100px; */
  /* padding: 100px 0; */
  /* background-color: #f5f4f1; */
}
/* @media(max-width:767px){
    .cart_page{
        margin-top: 80px;

    }
} */


#shopping-cart td,#shopping-cart th{
  padding: 10px;
  border-bottom: 1px solid #000;
}
@media(max-width:767px){
    #shopping-cart td,#shopping-cart th{
      border-bottom: none;

    }
}
.cartOp{
    display: flex;
    flex-direction: column;
    align-items: flex-end;

}

@media(max-width:767px){
    .t_head{
        display: none;
        /* display: block; */

    }
}
.cart-item{
    display: flex;
    align-items: center;

}

@media(max-width:767px){
    .order_price,.order_qty,.order_total,.order_delete,.cart-item{
        display: none;

    }
}
.mobile_show{
    display: none;
    
}

@media(max-width:767px){
    .mobile_show{
        display: block;
        width: 100px;
    }

}
.cart-item{
    width: 100%;
}
.cart-img{
    max-width: 160px;
    margin-right: 10px;
}
@media(max-width:767px){
   .cart-img{
    width: 100%;
    max-width: 230px;
    min-width: 150px;
    margin-right:50px;
}
}

.mobile_right{
    min-width: 100px;
    margin-right: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

}
@media(max-width:575px){
    .mobile_right{
    margin-right: 100px;

}
}
@media(max-width:450px){
    .mobile_right{
    margin-right: 50px;

}
}
@media(max-width:400px){
    .mobile_right{
    margin-right: 30px;

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
.form-control:focus{
 border-color: #050505;
 box-shadow: none;

  outline: 0;

}
.bannerImg{
  object-position: center -150px
}
@media(max-width:575px){
.bannerImg{
  object-position: center 0
}
}

    
</style>

