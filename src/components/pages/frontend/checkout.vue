<template>
    <div>
      <div class="checkout_page">
        <div class="container">
          <div class="row">
            <div class=" col-md-6">
              <h5 class="px-2">購物清單</h5>
                 <table id="checkoutList" class="w-100 mt-4">
                    <tbody>
                      <tr v-for="(item) in allCart" :key="item.id">
                        <td class="cart-item d-flex align-items-center">
                          <div class="cart-img" style="max-width:120px">
                              <a href="" >
                                  <img class="w-100" :src="`${item.product.imageUrl}`" alt="">
                              </a>
                          </div>
                          <div class="cart-title"> {{item.product.title}}</div>
                        </td>
                          <!-- <td>{{item.price|currency}}</td> -->
                        <td class="text-center">{{item.qty}}</td>

                        <td>{{item.total|currency}}</td>
                      </tr>
                      
                      <tr>
                        <td class="border-bottom-0"></td>
                        <td>總金額</td>
                        <td>{{data.total|currency}}</td>
                          
                      </tr > 
                      <tr  v-if="data.final_total!==data.total">
                        <td class="border-bottom-0"></td>
                        <td>折扣後價格</td>
                        <td style="font-size:18px">{{data.final_total|currency}}</td>
                      </tr>

                    </tbody>
                 </table>
                 <div class="coupon-group mt-4">
                    <div>
                        <i class="fas fa-gift"> </i>
                        開幕期間輸入lovedecor結帳即享85折
                    </div>
                    <div class="input-group mt-2">
                      <input type="text" name="" class="form-control rounded-0" v-model="coupon_code" placeholder="請輸入優惠碼">
                      <div class="input-group-append">
                        <button class="btn btn-dark rounded-0" @click="addCouponCode">套用優惠碼</button>
                      </div>
                    </div>

                 </div>

            </div>
            <div class="checkoutForm px-3 col-md-6">
              <h5 class="">收件資料</h5>
                <div class="justify-content-center">
                  <validation-observer class="col-md-6" v-slot="{ invalid }">
                         <!-- 把invalid這個狀況導入進來給內層使用 -->
                    <form @submit.prevent="placeOrder">
                      <validation-provider rules="required|email" v-slot="{ errors ,classes }">
                       <!-- 輸入框 -->
                        <div class="form-group">
                          <label for="useremail">Email</label>
                          <input type="email" class="form-control" :class="classes" name="email" id="useremail"
                            v-model="form.user.email" placeholder="請輸入 Email">
                            <!-- 錯誤訊息 -->
                          <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>
                      </validation-provider>   
                      <validation-provider rules="required" v-slot="{ errors ,classes }">
                        <div class="form-group">
                          <label for="username">收件人姓名</label>
                          <input type="name" class="form-control"  :class="classes" name="姓名" id="username"
                           v-model="form.user.name" placeholder="輸入姓名">
                          <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>
                      </validation-provider>  
                      <validation-provider rules="numeric|required|min:8|max:10" v-slot="{ errors ,classes }">
                       <div class="form-group">
                         <label for="usertel">收件人電話</label>
                         <input type="tel" class="form-control"  :class="classes" name="電話" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
                          <span class="invalid-feedback">{{ errors[0] }}</span>
                       </div>
                      </validation-provider> 

                      <validation-provider rules="required" v-slot="{ errors ,classes }">
                       <div class="form-group">
                         <label for="useraddress">收件人地址</label>
                         <input type="address" class="form-control" :class="classes" name="地址" id="useraddress" v-model="form.user.address"
                           placeholder="請輸入地址">
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                       </div>
                      </validation-provider> 
                      <div class="form-group">
                         <label for="comment">留言</label>
                         <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                      </div>
                      <div class="text-right">
                         <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
                      </div>
                    </form>
                  </validation-observer>
                </div>
            </div>

          </div>
        </div>

      </div>
    </div>
</template>



<script>
import {getCartAPI,postCouponAPI,postOrderAPI} from '../../../api/api'
export default {
  data() {
      return {
          data:[],
          allCart:[],
          tempData: JSON.parse(localStorage.getItem('tempData')) || [],
          coupon_code:"",
          form:{
              user:{
                  name:"",
                  email:"",
                  tel:"",
                  address:""
                  },
              message:"",    
          }
          
      }
  },
  methods: {
      getCart(){
        getCartAPI().then((res)=>{
            this.finalPrice=res.data.data.finalPrice;
            this.data=res.data.data;
            this.allCart=res.data.data.carts;

        })
 
      },
      addCouponCode(){
        const coupon={
          code:this.coupon_code
        }
        postCouponAPI({data:coupon}).then((res)=>{
          this.coupon_code="";
          this.getCart()
        })


      },
      placeOrder(){
        const order=this.form;
        postOrderAPI({data:order}).then((res)=>{
            this.tempData=[];
            localStorage.setItem('tempData', JSON.stringify(this.tempData));
            this.$emit('localData');
            //觸發dashboard上面的購物車更新內容
            this.$router.push({name:'Customorderlist',params:{orderId:res.data.orderId}}) 
        })

      }
        } ,

  created(){
        this.getCart();
  }
}
</script>

<style scoped>
.cart-img{
  margin-right: 10px;
}
@media(max-width:991px){
    .cart-item{
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
    }
    .cart-img{
        margin-right: 0;
    }
}
@media (max-width:767px) {
  .checkoutForm{
    margin-top: 50px;
  }
}
.checkout_page{
  margin: 100px 0 0;
  padding: 100px 0;
  background-color: #f5f4f1;
}
#checkoutList td,#checkoutList th{
  padding: 10px;
  border-bottom: 1px solid #000;
    
}
    
</style>