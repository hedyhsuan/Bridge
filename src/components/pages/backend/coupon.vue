<template>
    <div>
      <div class="pro_bg">
        <div class="container product_list">
          <div class="row pt-4 d-flex justify-content-between" >
            <div>
              <button class="btn-dark">
                <router-link :to="{name: 'Orderlist'}">訂單管理</router-link>
              </button>
              <button class="btn-dark">
                <router-link :to="{name: 'Bsproduct'}">產品管理</router-link>
              </button>
         
            </div >
           <div>
            <button class="btn-dark" @click="logout()">登出</button>
           </div>
   
         </div>
    
         <div class="modal-dialog modal-lg my-5" role="document">
            <div class="modal-content border-0">
              <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                  <span>新增折扣碼</span>
                </h5>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-sm-8">
                    <div class="form-group">
                      <label for="title">折扣標題</label>
                      <input type="text" class="form-control"  v-model="newCoupon.title"
                      placeholder="請輸入標題">
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="percent">折扣數</label>
                        <input type="text" class="form-control"  v-model="newCoupon.percent"
                        placeholder="請輸入折扣">
                      </div>
                      <div class="form-group col-md-6">
                        <label for="due_date">優惠到期日</label>
                        <input type="date" class="form-control"  v-model="newCoupon.due_date">
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="code">折扣碼</label>
                        <input type="text" class="form-control"  v-model="newCoupon.code"
                        placeholder="請輸入折扣碼" >
                      </div>
                    </div>
                       <hr>
                    <div class="form-group">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                        id="is_enabled" v-model="newCoupon.is_enabled"
                        :true_value="1" 
                        :false_value="0">
                          <!-- data中是用0跟1來區別true跟false -->
                        <label class="form-check-label" for="is_enabled" >
                           是否啟用
                        </label>
                      </div>
                    </div>
                 </div>
                </div>
             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
               <button type="button" class="btn btn-dark" @click="addCoupon">確認</button>
             </div>
           </div>
         </div>
        <div >

 <!-- 折扣列表 -->
       <table class="table mt-4 ">
         <thead>
           <tr>
             <th>折扣標題</th>
             <th>折扣數</th>
             <th>到期日</th>
             <th>折扣碼</th>
             <th>編輯</th>
              <th>刪除</th>
           </tr>
         </thead>
         <tbody>
           <tr v-for="(item) in coupons" :key="item.id">
    
             <td>{{item.title}}</td>
             <td>{{item.percent}}</td>
             <td>{{item.due_date}}</td>
             <td>{{item.code}}</td>
             <td>
               <button type="button" class="btn btn-outline-dark btn-sm" 
               data-dismiss="modal" @click="openModel(item)">編輯</button>
             </td>
             <td>
               <button class="btn btn-outline-danger btn-sm my-auto" @click="delCoupon(item.id)">
               <i class="fas fa-trash-alt" style="danger"></i>
               </button>
             </td>

            </tr>
         </tbody>

       </table>



      </div>
   <!-- 編輯視窗 -->
      <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content border-0">
                <div class="modal-body">
                 <div class="row">
                   <div>
                     <div class="form-group">
                       <label for="title">折扣標題</label>
                       <input type="text" class="form-control" id="title" v-model="tempCoupon.title"
                       placeholder="請輸入標題">
                     </div>

                     <div class="form-row">
                       <div class="form-group col-md-6">
                         <label for="percent">折扣數</label>
                         <input type="text" class="form-control" id="category" v-model="tempCoupon.percent"
                         placeholder="請輸入折扣">
                      </div>
                      <div class="form-group col-md-6">
                        <label for="due_date">優惠到期日</label>
                        <input type="date" class="form-control" id="date" v-model="tempCoupon.due_date">
                      </div>
                     </div>

                     <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="code">折扣碼</label>
                        <input type="text" class="form-control" id="origin_price" v-model="tempCoupon.code"
                         placeholder="請輸入折扣碼" >
                      </div>
                     </div>
                       <hr>
                     <div class="form-group">
                       <div class="form-check">
                         <input class="form-check-input" type="checkbox"
                         id="is_enabled" v-model="newCoupon.is_enabled"
                         :true_value="1" 
                         :false_value="0">
                          <!-- data中是用0跟1來區別true跟false -->
                         <label class="form-check-label" for="is_enabled" >
                            是否啟用
                         </label>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>

               <div class="modal-footer">
                 <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                 <button type="button" class="btn btn-dark" @click="updateCoupon">確認</button>
               </div>
              </div>
            </div>

          </div>
        </div>
      </div>
     </div>    
    </div>
    </div>
</template>

<script>
import {addCouponAPI,deleteBsCouponAPI,logoutAPI,getBsCouponAPI,updateBscCouponAPI} from '../../../api/api'
export default {

  data() {
      return {
          coupons:[], 
          newCoupon:{
      
          },
          tempCoupon:{

          },
    
      };
  },

  methods: {
    getCoupon(page){
      getBsCouponAPI(page).then((res)=>{
        this.coupons=res.data.coupons;

      })

    },
    addCoupon(){
      addCouponAPI({data:this.newCoupon}).then((res)=>{
        this.newCoupon={};
        this.getCoupon();
      })
     
    }, 
    openModel(item){
      this.tempCoupon=Object.assign({},item);
      $("#productModal").modal('show');
    },

    updateCoupon(){
      updateBscCouponAPI(this.tempCoupon.id,{data:this.tempCoupon}).then((res)=>{ 
        if(res.data.success){
          $("#productModal").modal('hide');
          this.getCoupon();
        }else{
            $("#productModal").modal('hide');
            alert("編輯失敗")
        }
      })
    },

    //TODO
    delCoupon(id){
      deleteBsCouponAPI(id).then((res)=>{
        this.getCoupon();
      })
    },
      
    logout(){
       logoutAPI().then((res)=>{
         if(res.data.success){
          this.$router.push("/admin/login")
         }
       })
       .catch(err=>console.log(err))
    },

  },
  created() {
     this.getCoupon();
  },
    
}
</script>