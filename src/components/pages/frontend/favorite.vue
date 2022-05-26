<template>
    <div>
        <div class="pro_bg">
            <div class="col-12 p-0">
                <div class="productBanner">
                    <img class="bannerImg w-100" src="https://imgur.com/tYFmCeI.jpg" alt="">
                </div>
            </div>

         <div class="container product-wrap">
            <div class="row justify-content-center">
                <div class="col-md-3 sidebar" >
                  <CategorySidebar></CategorySidebar>
                </div>

                <div class="col-md-9 "  data-aos='fade-down' data-aos-duration="1000" data-aos-once="true">
                     <div v-if="favorite.length===0" class="col-12 pt-1 mb-3 text-center">
                         <div class="mt-5 mb-5">
                        <h5>目前沒有關注商品</h5>
                        </div>
                        <router-link :to="{name:'Category',params:{category:'allproduct'}}"  class="btn btn-dark">逛逛商品</router-link>

                    </div>
                    <div v-else class="col-12 pt-1 mb-3 ">
                        <h5>關注清單</h5>
                    </div>
                    <productlist
                        class="col-md-4 col-sm-6 col-12"
                        v-for="item in myfavorite" :key="item.id"  
                        :selectitem="item"
                        v-on="$listeners"
                    ></productlist>  
                </div>
            </div>
         </div>
      </div>
     </div>
</template>

<script>
import CategorySidebar from "../../category_sidebar"
import productlist from "../../productlist";
import {getAllProductsAPI} from '../../../api/api'
export default {

    data() {
        return {
            allProducts:[],
            sortItems:[],
            favorite: JSON.parse(localStorage.getItem("favorite")) || [],
            myfavorite:[]
        }
    },
    components: {
    productlist,
    CategorySidebar
  },

    methods: {
        getProducts(){
            getAllProductsAPI().then((res)=>{
                this.allProducts=res.data.products;
                this.allProducts.forEach((item)=>{
                    this.favorite.forEach((item2)=>{
                        //localstorage的關注商品
                        if(item.title==item2){
                            //若所有商品中的商品名稱符合關注商品名稱就加進myfavorite
                            this.myfavorite.push(item)
                        }
                    })
                })
            })

        }  


    },
    created() {
        this.getProducts();

    },  
}
</script>

<style scoped>

.bannerImg{
  /* object-position: center -200px */

}
@media(max-width:767px){
  .sidebar{
    display: none;
  }
} 
    
</style>