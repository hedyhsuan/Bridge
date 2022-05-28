<template>

    <div>

    <div 
    :class="{categories__backdrop:bgblur}" 
    ></div>
    <!-- 當bgblur為真的時候加進.categories__backdrop -->
    <!-- @click="bgblur=false" -->
                 <!-- 漢堡內容 -->
    <div >
        
     <div class="collapse" :class="{navbar_collapse:bgblur}" id="nav">
       <div class="text-right">
           <a href="" @click.prevent="bgblur=false">
             <i class="fa fa-times"></i>
           </a>
       </div>
                        
          <ul class="navbar-nav mx-auto mt-4">

                <li 
                 v-for="item in categoryList" 
                 :key="item.id"
                 class="nav-item" 
                 @click="goCategory()">
                 <!-- 觸發category_sidebar同步active品項 -->
                 <router-link class="nav-link" :to="{name:'Category',params:{category:item.nameEn}}">{{item.categoryName }}</router-link>
                  </li>
                  <li class="nav-item" @click="bgblur=false">
                        <router-link class="nav-link" :to="{name:'Bsproduct'}">後台登入</router-link>
                 </li>
  
            
          </ul>
    </div>
    </div>
        
    </div>
</template>

<script>


// import $ from 'jquery';
import { bus } from '../bus';
export default {
    data() {
        return {
            bgblur:false,
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
    methods: {
       goCategory(){
    
        this.bgblur=false;
        //關掉dropdown
        // this.$router.push(`/products/${category}`)
        this.$emit('SourceClick')
        //先觸發至父層dashboard再通過父層觸發router-view

       },
       login(){
        const vm=this;
        vm.$router.push("/admin/bsproduct");
        this.bgblur=false;
        },

  

    },
    created() {
        bus.$on('backgroungblur',() => {
            this.bgblur=true;
         
        })
        //接收dashboard的btn觸發背景
    },
}
</script>

<style scoped>
  .nav-link:hover{
     font-weight: 500;
     color: #3A3A3A;
     
  }
  /* .nav-link:hover .nav-item{
 background-color: brown;
 } */
 
  .navbar_collapse{
    
      width: 20%;
      height: 100vh;
      background-color:#E8E5DF;
      position: fixed;
      top: 0;
      padding: 30px 40px;
      z-index: 1101;
  }
  @media(max-width:991px){
    .navbar_collapse{
      width: 30%;
    }
  }
  @media(max-width:575px){
    .navbar_collapse{
      width: 50%;
    }
}

    
</style>