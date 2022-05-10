<template>
    <div>
      <loading :active='isLoading'  />
      <div class="orderlist_page">
        <div class="container">
          <div class="">
            <h3 class="text-center mb-5">訂單成立</h3>
          </div>
          <div class="row">
            <div class="col-md-6">
              <h5 class="px-2">訂單明細</h5>
              <table id="checkoutList" class="w-100 mt-4">
                <tbody>
                  <tr v-for="(item) in orderlist" :key="item.id"  class="border-bottom" >
                    <td class="cart-item d-flex align-items-center">
                      <div class="cart-img" style="max-width:120px">
                        <a href="" >
                          <img class="w-100" :src="`${item.product.imageUrl}`" alt="">
                        </a>
                      </div>
                      <div class="cart-title px-3"> {{item.product.title}}</div>
                    </td>
                    <td class="text-center">{{item.qty}}</td>
                      <td>
                        <div v-if="item.total===item.final_total">
                          <span>{{item.final_total|currency}}</span>
                        </div>
                        <div v-else>
                          <del>{{item.total|currency}}</del>
                            <br>
                          <span>{{item.final_total|currency}}</span>
                        </div>
                     </td>
                     </tr>
                        <tr>
                          <td class="border-bottom-0"></td>
                          <td>總金額</td>
                          <td>{{order.total|currency}}</td>
                          
                        </tr > 
                             <!-- <tr  v-if="data.final_total!==data.total">
                                <td class="border-bottom-0"></td>
                                <td>折扣後價格</td>
                                <td style="font-size:18px">{{data.final_total|currency}}</td>
                            </tr> -->

                </tbody>
             </table> 

            </div>
            <div class="col-md-6">
                <table class="table">
                  <tr>
                    <th>訂單編號</th>
                    <td>{{order.id}}</td>
                  </tr>
                  <tr>
                    <th>下單日期</th>
                    <td>{{order.create_at|date}}</td>
                  </tr>
                  <tr>
                    <th>姓名</th>
                    <td>{{order.user.name}}</td>
                  </tr>
                  <tr>
                    <th>聯絡電話</th>
                    <td>{{order.user.tel}}</td>
                  </tr>
                  <tr>
                    <th>電子信箱</th>
                    <td>{{order.user.email}}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{order.user.address}}</td>
                  </tr>
                  <tr>
                    <th>備註</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <span v-if="!order.is_paid">尚未付款</span>
                      <span v-else class="text-success">付款完成</span>
                    </td>
                  </tr>

                </table>
  
            </div>
          </div>
          <div class="text-center mt-5" v-if="!order.is_paid">
             <button class="btn btn-dark" @click="payorder">確認付款去</button>
          </div>

        </div>


      </div>
        
    </div>
</template>

<script>
export default {

  data() {
      return {
          orderId:"",
          order:{},
          orderlist:[],
          isLoading:false,

          
      }
  },
  methods: {
    getOrder(){
        const vm=this;
          const api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
          
          vm.isLoading=true;
          this.$http.get(api).then((response)=>{
              vm.isLoading=false;
              vm.order=response.data.order;
              vm.orderlist=response.data.order.products;
              
        
          })

    },
    payorder(){
            const vm=this;
          const api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
          
          vm.isLoading=true;
          this.$http.post(api).then((response)=>{
              vm.isLoading=false;
              vm.getOrder();
          })


    },
    
  },
  created() {
      this.orderId=this.$route.params.orderId;
      // 上面的orderId要對應在路由上的路徑引數
      this.getOrder();
  },
}
</script>


<style scoped>
.orderlist_page{
  margin: 110px 0 0;
  padding: 100px 0;
  background-color: #f5f4f1;

}
.orderlist_page table{
 max-width: 600px;
 margin: 0 auto;

}
.table th,.table td{
    width: 50%;
    border-top:none;
    border-bottom: 1px solid #dee2e6;
    
}

    
</style>