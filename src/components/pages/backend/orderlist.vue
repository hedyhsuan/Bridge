<template>
    <div>
      <div class="pro_bg">
        <div class="container product_list ">
            <div class="row pt-4 d-flex justify-content-between" >
              <div>
              <button class="btn-dark">
                <router-link :to="{name: 'Bsproduct'}" >產品管理</router-link>
              </button>
              <button class="btn-dark">
                <router-link :to="{name: 'Coupon'}">優惠券</router-link>
              </button>
              <button >
                 <router-link :to="{name:'Orderlist'}">訂單管理</router-link>
              </button>
            </div >
              <div>
                <button class="btn-dark" @click="logout()">登出</button>
             </div>
   
            </div>

             <table class="table mt-4">
              <thead>
                <tr>
                    <th  class="text-center" width="80">序號</th>
                    <th width="150">下單日期</th>
                    <th>訂單編號</th>
                    <th>下單金額</th>
                    <th width="80">付款</th>
                    <th width="120"></th>
                </tr>
              </thead> 
           
              <tbody>
               <tr v-for="item in orders" :key="item.id">
                   <td class="text-center">{{item.num}}</td>
                   <td>{{item.create_at| date}}</td>
                   <td>{{item.id}}</td>

                   <td>{{item.total | currency}}</td>
                   <td v-if="item.is_paid" class="text-success">已付款 </td>
                   <td v-else>未付款</td> 
                   <td>
                     <button class="btn btn-dark" @click="getOrder(item)">訂單詳情</button>
                   </td>
               </tr>
             </tbody>

            </table>
      <pagination :page= pagination @switchPage="getOrders"></pagination>
      <!-- 將此頁的data pagination動態的存進page中,子頁面再用prop接收 -->
      <!-- @switchPage是pagination這個component向外觸發此實體getProduct()的媒介小鈴鐺 -->
      
          </div>
       </div>

    <!-- 單一訂單 -->
      <div class="modal fade" id="orderModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog modal-lg" role="document">
         <div class="modal-content border-0">
           <div class="modal-header bg-dark text-white">
             <h5 class="modal-title" id="exampleModalLabel">
               <span>訂單編號：{{tempProduct.id}}</span>
             </h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
           </div>
           <div class="modal-body">
            <!-- 訂單抬頭 -->
             <table class="table table-bordered mt-4">
               <thead class="thead-light">
                 <tr>
                   <th>日期</th>
                   <th>金額</th>
                   <th>狀態</th>
                </tr>
               </thead>
               <tbody>
                 <tr>
                  <td>{{tempProduct.create_at| date}}</td>
                  <td>{{tempProduct.total}}</td>
                  <td>
                   <span v-if="!tempProduct.is_paid">尚未付款</span>
                   <span v-else class="text-success">付款完成</span>
                  </td>
                 </tr>

               </tbody>
             </table>
             <br>
             <table class="table table-bordered">
               <tbody>
                <tr>
                 <td>商品名稱</td>
                 <td>數量</td>
                 <td>小計</td>
                </tr>
                <tr v-for="item in tempProduct.products" :key="item.id">
                 <td>{{item.product.title}}</td>
                 <td>{{item.qty}}</td>
                 <td>{{item.final_total}}</td>
                </tr>
               </tbody>
             </table>
             <div class="text-right mr-3"> 應付金額  {{tempProduct.total|currency}}</div>
              <br>
              <hr>
            <div class="row">

             <div class="col-md-12"> 

               <div class="form-row">
                 <div class="form-group col-md-6">
                   <label for="name">姓名</label>
                   <input type="text" class="form-control" id="name"
                   v-model="user.name"> 
                 </div>
                 <div class="form-group col-md-6">
                  <label for="tel">電話</label>
                  <input type="tel" class="form-control" id="tel"
                  v-model="user.tel" >
                 </div>
               </div>

               <div class="form-group col-md-6 p-0">
                 <label for="email">email</label>
                 <input type="email" class="form-control" id="email"
                  v-model="user.email" >
               </div>
               <div class="form-group col-md-6 p-0">
                 <label for="address">寄送地址</label>
                 <input type="address" class="form-control" id="address"
                  v-model="user.address" >
               </div>

               <div class="form-group">
                <label for="message">備註</label>
                <textarea type="text" class="form-control" id="message"
                v-model="data.message">
                  
                </textarea>
               </div>
 
             </div>

            </div>

           </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click="updateOrder(tempProduct.id)">確認</button>
            </div>
          </div>
        </div>
  
      </div>

    </div>
</template>


<script>
import pagination from "../../pagination"
import {getBsOrdersAPI,updateOrderDetailAPI} from '../../../api/api'

export default {
    components:{
      pagination
    },
    data() {
        return {
            data:[],
            orders:[],
            user:{},
            pagination:{},
            tempProduct:{
            },
        
        }
    },
    methods: {
      getOrders(page){
        getBsOrdersAPI(page).then((res)=>{
          if(res.data.success){
          this.orders=res.data.orders;
          this.pagination=res.data.pagination
          }else{
            console.log(res)
          }
          
        })

      },

     getOrder(item){
        const vm=this;
        vm.tempProduct=JSON.parse(JSON.stringify(item));
        vm.user=vm.tempProduct.user;
       $("#orderModal").modal("show");
     },  
     
     updateOrder(id){
       updateOrderDetailAPI(id,{data:this.tempProduct}).then((res)=>{
         if (res.data.success){
                $("#orderModal").modal("hide");
                this.getOrders();
            }else{
                console.log("更新失敗")
            }
       })

     },

      logout(){
        const api=`${process.env.APIPATH}logout`;
        const vm=this;
        this.$http.post(api).then((response) => {
      
        if(response.data.success){
            vm.$router.push({name:'Login'})
        }
        }) 

      },

    },
    created() {
      const token = document.cookie.replace(
     /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
     "$1"
     );
    if (token === "") return
     //如果token沒有內容就直接return結束，若有就往下寫
     this.axios.defaults.headers.common["Authorization"] = token;
     this.getOrders();
 },

}
</script>
