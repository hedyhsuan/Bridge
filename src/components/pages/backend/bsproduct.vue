<template>
    <div>
      <loading :active='isLoading'/>
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
              <button class="btn-dark">
                 <router-link :to="{name:'Orderlist'}">訂單管理</router-link>
                <!-- <a href="#/admin/orderlist">訂單管理</a> -->
              </button>
            </div >
            <div>
              <button class="btn-dark" @click="openModal(true)">建立新產品</button>
              <button class="btn-dark" @click="logout()">登出</button>
            </div>

          </div>

          <table class="table mt-4">
            <thead>
                <tr>
                    <th width="100">分類</th>
                    <th>名稱</th>
                    <th width="80">原價</th>
                    <th width="80">售價</th>
                    <th width="80">啟用</th>
                    <th width="100">編輯</th>
                    <th width="100">刪除</th>
                </tr>
            </thead> 
           
           <tbody>
               <tr v-for="item in products" :key="item.id">
                   <td>{{item.category}}</td>
                   <td>{{item.title}}</td>
                   <td>{{item.original_price|currency}}</td>
                   <td>{{item.price | currency}}</td>
                   <td v-if="item.is_enabled" class="text-success">啟用 </td>
                   <td v-else>未啟用</td> 
                   <td>
                     <button class="btn btn-outline-dark btn-sm" @click="openModal(false,item)">編輯</button>
                   </td>
                   <td>
                     <button class="btn btn-outline-dark btn-sm" @click="openDel(item)">刪除</button>
                   </td>
               </tr>
           </tbody>

          </table>
          <!-- <pagination :page= pagination @switchPage="getProducts"></pagination> -->
      <!-- 將此頁的data pagination動態的存進page中,子頁面再用prop接收 -->
      <!-- @switchPage是pagination這個component向外觸發此實體getProduct()的媒介小鈴鐺 -->
      
        </div>
       </div>

<!-- 單一商品 -->
       <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
              <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                  <span>新增產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label for="image">輸入圖片網址</label>
                      <input type="text" class="form-control" id="image"
                       placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                    </div>
                    <div class="form-group">
                      <label for="customFile">或 上傳圖片
                         <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                      </label>
                      <input type="file" id="customFile" class="form-control"
                     ref="files" @change="uploadFile">
                       <!-- **ref=”files”這行如果沒有的話會找不到檔案** -->
                    </div>
                    <img :src="tempProduct.imageUrl"
                      class="img-fluid" alt="">
                  </div>
                  <div class="col-sm-8">
                    <div class="form-group">
                      <label for="title" >標題</label>
                      <input type="text" class="form-control" id="title"
                        placeholder="請輸入標題" v-model="tempProduct.title">
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="category">分類</label>
                        <input type="text" class="form-control" id="category"
                          placeholder="請輸入分類" v-model="tempProduct.category"> 
                      </div>
                      <div class="form-group col-md-6">
                        <label for="price">單位</label>
                        <input type="unit" class="form-control" id="unit"
                          placeholder="請輸入單位" v-model="tempProduct.unit">
                      </div>
                   </div>

                   <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                      <input type="number" class="form-control" id="origin_price"
                        placeholder="請輸入原價" v-model="tempProduct.original_price">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input type="number" class="form-control" id="price"
                        placeholder="請輸入售價" v-model="tempProduct.price">
                    </div>
                   </div>
                   <hr>

                    <div class="form-group">
                      <label for="description">產品描述</label>
                      <textarea type="text" class="form-control" id="description"
                        placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                    </div>
                    <div class="form-group">
                      <label for="content">說明內容</label>
                      <textarea type="text" class="form-control" id="content"
                        placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                    </div>
                    <div class="form-group">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                          id="is_enabled" v-model="tempProduct.is_enabled"
                          :true_value="1"
                          :false_value="0">
                          <!-- 後端data中是用0跟1來區別false跟true -->
                        <label class="form-check-label" for="is_enabled">
                          是否啟用
                        </label>
                      </div>
                    </div>
                 </div>
               </div>
             </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="updateProduct()">確認</button>
              </div>
           </div>
         </div>
  
      </div>

       <!-- 確認刪除視窗 -->
      <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>刪除產品</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              是否刪除 <strong class="text-danger"> {{tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal(item)">取消</button>
              <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
            </div>
          </div>
        </div>

      </div>



    </div>
</template>


<script>
import pagination from "../../pagination"
import {getBsProductsAPI,logoutAPI,addBsProductAPI,updateBsProductAPI,deleteBsProductAPI} from "../../../api/api"
export default {
    components:{
      pagination
    },
    data() {
        return {
            products:[],
            tempProduct:{},
            //新增或存放單筆要編輯的資料，綁定的內容項目要參考後端的API
            isNew:false,
            //判定是新增或是修改資料
            pagination:{},
            isLoading:false,
            status:{
              fileUploading:false,
            }

        }
    },
    methods: {
      getProducts(page){
        getBsProductsAPI(page).then((res)=>{
          if(res.data.success){
            this.products=res.data.products;
            this.pagination=res.data.pagination;
          }else{
            console.log(res)
          }
        })
        .catch(err=>console.log(err))

      },
    logout(){
       logoutAPI().then((res)=>{
         if(res.data.success){
          this.$router.push("/admin/login")
         }
       })
       .catch(err=>console.log(err))
    },

    openModal(isNew,item){
      //若是現有的資料則先帶入內容
      if(isNew){
        this.tempProduct={},
        this.isNew=true

      }else{
        this.tempProduct=Object.assign({},item);
          //ES6寫法，淺拷貝，避免item資料重疊
      }
      $("#productModal").modal("show");
    },

    openDel(item){
      this.tempProduct=Object.assign({},item);
      $("#delProductModal").modal("show")
    },

    updateProduct(){
      if(this.isNew){
        addBsProductAPI({data:this.tempProduct}).then((res)=>{
          if (res.data.success){
             $("#productModal").modal("hide");
             this.getProducts();
          }else{
            //TODO
             console.log("新增失敗")
          }
        })
        .catch(err=>console.log(err))
      }else{
        updateBsProductAPI(this.tempProduct.id,{data:this.tempProduct}).then((res)=>{
          if (res.data.success){
             $("#productModal").modal("hide");
             this.getProducts();
          }else{
             console.log("更新失敗")
          }
        })
        .catch(err=>console.log(err))
      }

    },

    deleteProduct(){
      deleteBsProductAPI(this.tempProduct.id).then((res)=>{
        if(res.data.success){
          $("#delProductModal").modal("hide");
          this.getProducts();
        }else{
          console.log(response.data);
        }

      })
    },

    uploadFile(){
      console.log(this);
      //先看檔案被儲存的位置
      const uploadedFile =this.$refs.files.files[0];
      //先取出檔案
      const formData= new FormData();
      //建立formData檔案
      const vm=this;
      formData.append("file-to-upload",uploadedFile);
      //把圖片加進相對應的位置--"圖片傳送位置（後端設定）",檔案名稱
      const api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading=true;
      this.$http.post(api,formData,{
          headers: {
      'Content-Type': 'multipart/form-data' //更改成 FormData 的格式
      }
      }).then((response)=>{
          vm.status.fileUploading=false;
          console.log(response.data);
          if(response.data.success){
              vm.tempProduct.imageUrl=response.data.imageUrl;
          }
      })
      //把formData透過API傳給後端
      //將圖片網址儲存後帶入視窗內的圖片網址處

    }
    },
    created() {
     this.getProducts();
 },

}
</script>

<style scoped>


</style>
