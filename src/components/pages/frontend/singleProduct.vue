<template>
    <div>
      <div class="pro_bg">
        <div class="col-12 p-0 ">
          <div class="productBanner">
           <img class="bannerImg w-100" src="https://imgur.com/KuQMQdY.jpg" alt="">
          </div>
        </div>

      <div class="container product-wrap">
        <div class="row">
        <!-- breadcrumb -->
          <div class="col-12">
             <nav aria-label="breadcrumb">
               <ol class="breadcrumb">
                 <li class="breadcrumb-item">
                   <router-link :to="{name:'Category',params:{category:'allproduct'}}">所有商品</router-link>
                   <!-- <a href="#/"><p style="font-size:18px">首頁</p></a> -->
                   </li>
                 <li class="breadcrumb-item" aria-current="page">
                  <router-link :to="{name:'Category',params:{category:product.category}}">{{product.category}}</router-link>
                   <!-- <a :href="'#/'+product.category">
                   {{product.category}}
                   </a> -->
                   </li>
                 <li class="breadcrumb-item active" style="color:#212529 " aria-current="page">{{product.title}}</li>
               </ol>
             </nav>
          </div>
 <!-- 圖片 -->
      <div class="col-md-7">
        <div class="image-gallery row"> 
       <!-- 小圖 --> 
          <div class="col-md-3 ">     
            <div class="mcs-item ">
               <a href="">
              <img class="w-100" :src="product.imageUrl" alt="">
              </a>
            </div>
          </div>
      <!-- 大圖 -->
          <div class="col-md-9">
           <div class="mcs-item-l mr-3">
               <img class="w-100" :src="product.imageUrl" alt="">
           </div>  
          </div>
       </div>  
     </div>  

     <div id="product-right" class="col-md-5">
        <div id="product-description">
          <h5>{{product.title}}</h5>
          <div class="tcontent">
            <p>{{product.description}}</p>
            <p>{{product.content}}</p>
          </div>
          <div class="product-options">
            <div class="price d-flex"> 
              <del class="h6 mr-4" v-if="product.price != product.original_price">{{product.original_price|currency}}</del>
              <div class="h5" v-if="product.price">{{product.price|currency}}</div>
  
            </div> 
            <div class="input-group">
              <button class="btn down" @click="btnMinus">-</button>
              <input type="text" class="text-center quantity" value="1" v-model="product.num"> 
              <button class="btn up" @click="btnPlus">+</button>
            </div>
  
            <div class="addCart" @click.prevent="addtoCart(product)">
               加入購物車
            </div>
         </div>
       </div>
      </div>
        </div> 

          <!-- 推薦商品 -->
       <div class="my-5 mx-auto col-lg-7 col-md-9 col-sm-12">
         <h4 class="mb-5 text-center">推薦商品</h4>
         <Carousel
        :category="category"
        :carouselItems="carouselItems"
        :productId="productId"
        @getProduct="getProduct"
        :key="$route.params.id"
        ></Carousel>

      </div>
     
    </div>

    </div>  
    <!-- ------------確認視窗 -->
    <div class="modal fade" id="confirmModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog" role="document">
         <div class="modal-content border-0 text-center">
           <div class="modal-header border-0">
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
           </div>
           <div class="modal-body ">
             <p class="h5">
             <span class="mr-1"> {{product.title }}</span>
                已加入購物車
             </p>
           </div>
           <div class="modal-footer border-0">
             <button type="button" class="btn btn-dark" data-dismiss="modal">ok</button>
           </div>
         </div>
       </div>
     </div> 
    
    </div>  
</template>

<script>
import Carousel from "../../carousel_slide.vue"
import {getProductAPI} from "../../../api/api"

export default {

  data() {
      return {
          product:{
            num:""
          },
          tempData: JSON.parse(localStorage.getItem('tempData')) || [],
          //用localStorage先暫存當前的資料，下面再把同品項的訂單數量合併
          isLoading:false,
          category:"",
          productId:"",
          carouselItems:"3",
          
      }
  },
  components:{
    Carousel,
  },
  methods: {
    getProduct(){
      const vm=this;
      let id=vm.$route.params.id
      getProductAPI(id).then((res)=>{
        vm.product=res.data.product;
        vm.category=vm.product.category;
        vm.productId=id;
        this.$set(vm.product, 'num', 1) 
        //num 本身不存在於 Vue 中，而是被後面添加的，要用＄set加進資料庫避免部份商品的數量無法被更動
      })
      .catch(err=>console.log(err))

    },
    btnPlus(){
      this.product.num++;

      },
    btnMinus(){
      if(this.product.num<2){
        this.product.num=1;
      }else{
        this.product.num--;
      }
      
    },

    addtoCart(data){
      const vm=this;
      const cartItems=[];
      //存購物車中商品的id
      vm.isLoading=true;
      vm.tempData.forEach((item)=>cartItems.push(item.product_id))
      //存取已經加入購物車的全部商品id
      if(cartItems.indexOf(data.id) === -1){
          //如果此商品沒有在購物車中，就儲存它的資料
          const cartContent={
          product_id:data.id,
          qty: vm.product.num,
          title: data.title,
          origin_price:data.origin_price,
          price: data.price,
          imageUrl: data.imageUrl
        }
          vm.tempData.push(cartContent)
          localStorage.setItem('tempData', JSON.stringify(vm.tempData))
          //整筆存到localStorage
      
        }else{
          // 如果這是之前已經加過的品項，就找到它的序號並將內容的數量相加後存在updateData中
          let updateData={}

          vm.tempData.forEach((item,keys)=>{
            //找出相同的資料／序號
            if(item.product_id === data.id){
              updateData={
                product_id: data.id,
                qty: (item.qty += vm.product.num),
                // 相同商品的數量相加，商品的數量要照目前選擇的最新數量
                title: data.title,
                origin_price:data.origin_price,
                price: data.price,
                imageUrl: data.imageUrl

              }
              vm.tempData.splice(keys,1)
              // 用序號將原本的資料刪除並存入新的資料
                  }
              })
            
            vm.tempData.push(updateData)
            //更新好的資料推進tempData再存進localStorage
            localStorage.setItem('tempData', JSON.stringify(vm.tempData))
            
        }
        vm.isLoading=false;
        this.$emit('localData');
        //觸發父層dashBoard.vue的購物車數字更新
        
        $("#confirmModal").modal("show");
    },
  },

  created() {
    this.getProduct();
     
    },

}
</script>


<style scoped>


.price{
  border-bottom: 1.5px solid black;
  padding-bottom: 5px;
}
.input-group{
  margin: 30px 0 ;
}
.input-group .btn{
  background-color: #fff;
  border: 1px solid black;
  border-radius: 0;
}
.input-grounp .quantity{
  width: 50px;
  border-radius: 0;
}
.quantity{
  padding: 6px 12px;
  border: 1px solid #ccc;
  width: 50px;
} 
.addCart{
  margin: 30px 0;
  padding: 10px;
 text-align: center;
  width: 100%;
  background-color: #fff;
  color: #000;
  transition: all .2s ease-in;
  cursor: pointer;

}
.addCart:hover{
  background-color: #000;
  color: #fff;
}
.mcs-item-l{
/* max-width: 480px; */
}
.mcs-item{
  /* padding: 10px; */
  max-width: 200px;
}
@media(max-width:767px){
   .mcs-item{
     margin-bottom: 20px;
   }
   .mcs-item-l{
     width: 100%;
     margin-bottom: 50px;
   }
}
 
h2 {  
  font-weight: bold;  
  margin-bottom: 2.5rem;  
  color: #aaa;  
  align-items: center;  
  font-size: 30px;  
  margin-top: 1.5rem;  
  font-weight: 1000;  
}  
  
em {  
  font-family: Georgia, serif;  
  line-height: 1.2;  
}  

.modal.show .modal-dialog {
  margin-top: 250px;
}
.modal-footer{
  justify-content:center;
}
.breadcrumb{
  background-color:rgb(0,0,0,0);
  padding: 0 0;
}

</style>