<template>
    <div>
        <div v-if="products.length>0">
        <carousel 
        :autoplay="true" 
        :nav="false"
        :items=parseInt(carouselItems)
        :loop="false"
        :margin="50"
        :autoHeight="true"
        :dots="true"
        :responsive="{0:{items:1},600:{}}"
        >
  
        <div v-for="item in sortProducts" :key="item.id">
            <a href="#" @click.prevent="getProduct(item.id)">
             <img :src="item.imageUrl" class="inner-img">
                <div class="m-2">

                    <p>{{item.title}}</p>
                    <p>{{item.original_price|currency}}</p>
                </div> 
              </a>       
         </div>
    
        </carousel>
        
        </div>
    </div>
</template>


<script>
import carousel from 'vue-owl-carousel'
import {getAllProductsAPI} from '../api/api'
export default {
       components:{
      carousel
    },
    data(){
        return{
            products:[],
            sortProducts:[],
        
        }
    },
    props:{
      category:{
        type:String,
        default:'',
        requied:true
      },
      carouselItems:{
        type:String,
        default:'',
        requied:true  
      },
      productId:{
        type:String,
        default:'',
        requied:true  
      }

    },
    methods: {
        getProducts(){
            getAllProductsAPI().then((res)=>{
                this.products=res.data.products;
                this.sortProducts= this.products.filter(item=>{

                //在所有商品中過濾出同品項的並扣掉被點擊的商品本身
                   if(item.category === this.category){
                       return item.id !== this.productId
                   }    
             })
            })
        },

        getProduct(id){
         this.$router.push(`/${id}`)
         this.$emit('getProduct'); 
         // 單一商品細節更新
         
         this.getProducts();
          // 推薦商品更新
       
    },
    },
    watch:{
        category:function(){
            this.getProducts()
            
        },
        productId:function(){
        this.getProducts()
            
        },

    },
    // 監聽外層傳進來的category跟productId的值，確認接收到之後再用該資料去渲染畫面
    //TODO
    created() {
        if(this.$route.path=="/"){
             this.getProducts()  
        }
        //此用於渲染首頁輪播圖的created()會影響到上面category監聽，所以要判別是否路徑為首頁
           
    },
}


</script>

