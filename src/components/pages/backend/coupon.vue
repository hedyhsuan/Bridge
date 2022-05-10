<template>
    <div>
      <loading :active='isLoading'  />
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
               <button class="btn btn-outline-danger btn-sm my-auto" @click="delCoupon(item)">
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
import $ from 'jquery';

export default {

  data() {
      return {
          coupons:[], 
          newCoupon:{
      
          },
          isLoading:false,
      //讀取的轉圈圈預設是停止的狀態
        //  due_date:"",
      // 因為日期要轉成timestamp存進後端所以v-model綁定的內容暫存在這邊然後
      // 經過下面的watch內做轉換後再丟回要回傳的newCoupon裡
          tempCoupon:{

          },
    
      };
  },

  methods: {

    addCoupon(){
      let api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupon`;
      let httpMethod="post";

      const vm=this; 
      vm.isLoading=true;
      // 當要使用這個元件裡的data時確定指向用
      this.$http[httpMethod](api,{data:vm.newCoupon}).then((response) => {
      // 上傳內容也要用API裡面同樣的格式   
      vm.newCoupon={};
      vm.getCoupon();

      })
    },
    getCoupon(page=1){
      let api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      let httpMethod="get";
      const vm=this; 
      // 當要使用這個元件裡的data時確定指向用
      this.$http[httpMethod](api).then((response) => {
        vm.coupons=response.data.coupons;
        vm.isLoading=false;
      })

    },

    delCoupon(item){
      let api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupon/${item.id}`;
      const vm=this;
      vm.isLoading=true;
        // 當要使用這個元件裡的data時確定指向用
        this.$http.delete(api).then((response) => {
        vm.getCoupon();
    
      }) 
    },
      
    openModel(item){
          // const newDate=item.due_date;

          this.tempCoupon=Object.assign({},item);
  
            $("#productModal").modal('show');
    },
      
    updateCoupon() {
      const vm=this;      
      let api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
    
      vm.isLoading=true;
      this.$http.put(api,{data:vm.tempCoupon}).then((response) => {
        if(response.data.success){
          $("#productModal").modal('hide');
          vm.getCoupon();
        }else{
            vm.getCoupon();
            $("#productModal").modal('hide');
            alert("編輯失敗")
        }
      }) 
    },
    logout(){
      const api=`${process.env.APIPATH}logout`;
      const vm=this;
      this.$http.post(api).then((response) => {
      // console.log(response.data);
      if(response.data.success){
        console.log("登出")
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
     this.getCoupon();
  },
    
}
</script>