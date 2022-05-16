<template>
    <div>
      <loading :active='isLoading'/>
      <div class="pro_bg">
        <div class="col-12 p-0">
          <div class="productBanner">
              <img class="bannerImg w-100" src="https://imgur.com/s76vcQO.jpg" alt="">
          </div>
        </div>
      <div class="container product-wrap">
        <div class="row" >
          <div class="col-md-3">
            <CategorySidebar @getProduct="getProducts" :category="category"></CategorySidebar>
            <!-- 點擊後更新頁面 -->
          
          </div>
          <div class="col-md-9 row"  data-aos='fade-down' data-aos-duration="1000" data-aos-once="true">
            <productlist
              class="col-md-4 col-12"
              v-for="item in products" :key="item.id"  
              :selectitem="item"
            v-on="$listeners"
              ></productlist>
            <div class="col-12" v-show="pagination">
              <pagination v-show="products.length>=10" :page= pagination @switchPage="getProducts"></pagination>
              <!-- 將此頁的data pagination動態的存進page中,子頁面再用prop接收 -->
              <!-- @switchPage是pagination這個component向外觸發此實體getProduct()的媒介小鈴鐺 --> 
            </div>
          </div>

        </div>
       </div>
      </div>
    </div>

</template>

<script>
// import $ from 'jquery';
import pagination from "../../pagination.vue";
import productlist from "../../productlist";
import CategorySidebar from "../../category_sidebar"
import {getProductsAPI,getAllProductsAPI} from "../../../api/api"

export default {

    data() {
        return {
            allProducts:[],
            //所有商品資料
            products:[],
            //分頁的商品資料
            pagination:{},
            category:"",
            //產品類別
            isLoading:false,
        }
    },
    components:{
        pagination,
        productlist,
        CategorySidebar
      },

    methods: {
      //TODO
      //測試封裝axios
      getProducts(page){
        this.category=this.$route.params.category
        if (this.category==='allproduct'){
           getProductsAPI(page).then((res)=>{
            this.products=res.data.products;
            this.pagination=res.data.pagination;
           })
         .catch(err=>console.log(err))
        }else{
          this.SortProduct()
        }
      },

    SortProduct(){
      getAllProductsAPI().then((res)=>{
        this.allProducts=res.data.products;
        this.products=[];
         //把原本的資料清空
        this.allProducts.forEach((item)=>{
          if(item.category == this.category){
            this.products.push(item)
          }else if(this.category ==='sale' ){
            if(item.original_price !== item.price){
              this.products.push(item)
              }
          }
        })
      })
      .catch(err=>console.log(err))
    }


    },

    
    created() { 
      this.getProducts()
        
    },

}

</script>

<style scoped>
.product-wrap{
 margin-top: 70px;
 margin-bottom: 30px;
}
@media (max-width:767px){
  .product-wrap{
    margin-top: 70px;
   }
}
@media (max-width:575px){
  .product-wrap{
    margin-top: 30px;
   }
}

.product_list{
  margin-top: 110px;
}
.products{
  margin-top: 100px;
}
#productImg{
  overflow: hidden;
  height: 40vh;
}

.productBanner{
  height: 400px;
  overflow: hidden;

}
@media(max-width:767px){
  .productBanner{
    height: 250px;
  }
}
.bannerImg{
  object-position: center -100px
} 
  
</style>