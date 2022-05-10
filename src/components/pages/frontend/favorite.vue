<template>
    <div>

        <loading :active='isLoading'/>
        <div class="pro_bg">
            <div class="col-12 p-0">
                <div class="productBanner">
                    <img class="bannerImg w-100" src="https://imgur.com/P6UFLLP.jpg" alt="">
                </div>
            </div>

        <div class="container product-wrap">
            <div class="row">
                <div class="col-md-3">
                  <CategorySidebar></CategorySidebar>
                </div>

                <div class="col-md-9 row "  data-aos='fade-down' data-aos-duration="1000" data-aos-once="true">
                     <div v-if="favorite.length===0" class="col-12 pt-1 mb-3 text-center">
                         <div class="mb-5">
                        <h5>目前沒有關注商品</h5>
                        </div>
                        <router-link :to="{name:'Category',params:{category:'allproduct'}}"  class="btn btn-dark">逛逛商品</router-link>

                    </div>
                    <div v-else class="col-12 pt-1 mb-3">
                        <h5>關注清單</h5>
                    </div>
                    <productlist
                        class="col-md-4 col-12"
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
export default {

    data() {
        return {
            allProducts:[],
            sortItems:[],
            favorite: JSON.parse(localStorage.getItem("favorite")) || [],
            isLoading:false,
            myfavorite:[]
        }
    },
    components: {
    productlist,
    CategorySidebar
  },

    methods: {
      getProducts(){
       const api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products/all`;
       const vm=this;
       this.isLoading=true;
       this.$http.get(api).then((response) => {
           this.isLoading=false;
       vm.allProducts=response.data.products;
         vm.allProducts.forEach((item)=>{
            //所有的商品
              vm.favorite.forEach((item2)=>{
                  //localstorage的關注商品
                  if(item.title==item2){
                      //若所有商品中的商品名稱符合關注商品名稱就加進myfavorite
                      vm.myfavorite.push(item)
                  }
              })
           })

    })
       
    },   


    },
    created() {
        this.getProducts();

    },  
}
</script>