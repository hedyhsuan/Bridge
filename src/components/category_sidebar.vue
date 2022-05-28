<template>
    <div>
                    <ul class="list-group">
                 <li 
                 v-for="item in categoryList" 
                 :key="item.id"
                 class="list-grounp-item" 
                 :class="{active:activeName == item.nameEn}"
                 @click="getProducts(item.nameEn)">
                <router-link :to="{name:'Category',params:{category:item.nameEn}}">{{item.categoryName }}</router-link>
                  </li>
                  <!-- <router-link :to="`/products/${item.nameEn}`">{{item.categoryName }}</router-link> -->
          
            </ul>
        
    </div>
</template>

<script>

export default {
    
    data() {
        return {
            activeName:'allproduct',
            categoryList:[
        {
          id: 1,
          categoryName: "所有商品",
          nameEn: "allproduct"
        },
        {
          id: 3,
          categoryName: "桌椅",
          nameEn: "Chair"
        },
        {
          id: 4,
          categoryName: "收納櫃",
          nameEn: "Storage"
        },
        {
          id: 5,
          categoryName: "寢具",
          nameEn: "Bedding"
        },
        {
          id: 6,
          categoryName: "家飾",
          nameEn: "Decoration"
        },
        {
          id: 7,
          categoryName: "燈具",
          nameEn: "Lighting"
        },
             {
          id: 8,
          categoryName: "SALE",
          nameEn: "sale"
        },
            ]
            
        }
    },
    props:{
      category:{
         type: String,
      default: '',
      requied:true
      }
     
    },
    methods: {

      getProducts(category){
        //傳進類別作.active的觸發(及轉址用)
        this.activeName=category
        // this.$router.push(`/products/${cate}`)
        this.$emit('getProduct'); 
         // 發送去父層更新頁面

        
      },
      switchCate(){
        this.activeName=this.category
      }

      
    },
    watch:{
      category:function(){
        this.switchCate()
      }
      //監聽如果是漢堡按鈕的collapse點擊了類別就觸發這裡的類別.active更新

    },
    created() {
      this.activeName=this.$route.params.category
      //儲存轉址帶進來的params做為選項active
    },
    
}
</script>

<style scoped>
.list-group{
  font-size: 18px;
  
}
.list-grounp-item {
  padding: 7px 15px;
  cursor: pointer;
  transition: all ease-in .5;
  color: #3A3A3A;
  font-size: 1rem;
  }
  .list-grounp-item:hover{
    font-weight:500 ;
  }


.list-grounp-item.active{
  color: #fff ;
  background-color: #4d3e3e;
  /* border-color: #4d3e3e; */
}


</style>