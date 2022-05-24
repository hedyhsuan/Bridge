<template>
    <div>
        <div>
       
          <div class="product-grid ">
            <div class="product-image">
                <a href="#"  @click.prevent="getProduct(selectitem.id)">
                  <div class="image">
                    <img class="pic-1" :src="selectitem.imageUrl">
                  </div>
                 
                  <div class="product-content">
                   <p></p>
                   <p class="title"><a href="#">{{selectitem.title}}</a></p>

                
                   <del  v-if="selectitem.price != selectitem.original_price">{{selectitem.original_price|currency}}</del>
           
                   <div class="h6" v-if="selectitem.price">{{selectitem.price|currency}}</div>
                  </div>


                </a>
              <a href="#" class="product-like-icon" data-tip="Add to Wishlist" @click.prevent="switchHeart(selectitem)" > 
                    <i :class="changeIcon"></i>
              </a>
    
            </div>
        
          </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            productId:"",
            favorite:JSON.parse(localStorage.getItem('favorite'))||[],
            heartColor:"",
        }
    },
    props:{
      selectitem:{
        type:Object,
        default:{},
        requied:true
      }
    },
    // props:['selectitem'],
    //外層傳入當下的品項資訊

    methods: {
        getProduct(id){
        this.$router.push({name:'SingleProduct',params:{id:id}})
        // this.$router.push(`/${id}`)
     
        },

        switchHeart(selectitem){
        
         let vm=this;
         vm.favorite=JSON.parse(localStorage.getItem('favorite'))||[];
         let index=vm.favorite.findIndex(item=>{

         return selectitem.title==item;
            
         // 如果點擊的內容是已關注的商品就存取他的索引值做為刪除的目標
          });

         if(vm.favorite.indexOf(selectitem.title) == -1){
            vm.favorite.push(selectitem.title);
            //如果點擊的item的id沒有在已關注區就塞進去
            localStorage.setItem('favorite', JSON.stringify(vm.favorite));
         
          }else{
            vm.favorite.splice(index,1)
            //如果有在裡面就用前面得到的序號刪掉他
            localStorage.setItem('favorite', JSON.stringify(vm.favorite));
     
        }
              
        this.$emit('getFavorite');
        //觸發上層dashboard.vue的我的最愛數量更新
        vm.favorite=JSON.parse(localStorage.getItem('favorite'))||[];
          

       },

      },
    watch:{

    },

    computed:{
    changeIcon(){
              
        if(this.favorite.indexOf(this.selectitem.title)===-1){
             
            return "far fa-heart";
        }else{
                 
            return "fas fa-heart";
              }
          },

    }

}

</script>