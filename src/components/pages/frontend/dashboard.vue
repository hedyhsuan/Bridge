<template>
    <div>

                  
      <header class="nav_list navbar-dark fixed-top">
            <div class="nav_logo " >
                <router-link :to="{name: 'Index'}">
                <div class="w-100" >
                  <img class="w-100" src="https://imgur.com/6srQSzC.png" alt="">
                 </div>
                </router-link>
               
            </div>

        <div class="d-flex justify-content-between align-items-center">
          <div >   
            <button class="navbar-toggler" @click="backgroungblur"  type="button" data-toggle="collapse" data-target="#nav"> 
              <span >
               <i class="fas fa-bars" style="font-size:22px;"></i>
              </span>
            </button>
          </div> 

        <!-- <div class="" >
          <router-link :to="{name: 'Index'}">
          <div class="nav_logo " >
            <img src="https://imgur.com/6srQSzC.png" alt="">

            </div>
          </router-link>   
        </div> -->
          

          <div>
           <div class="cart" >
             <!-- <li class="cart_2">
                <a href="">
                    <i class="fas fa-user" style="font-size:20px;"></i>
                 </a>
             </li> -->
             <div class="cart_1">
                <router-link :to="{name: 'Favorite'}">
                  <i class="fas fa-heart"  style="font-size:20px;"></i>
                  <span :class="{ 'd-none': !heartQuantity }">{{heartQuantity}}</span>
                </router-link>
             </div>
         
             <div class="cart_3">
                 <router-link :to="{name: 'Cart'}">
                   <i class="fas fa-shopping-cart" style="font-size:20px;"></i>
                   <span >{{cartQuantity}}</span>
                    </router-link>
             </div>
             </div>
           </div> 
         </div>     
   
      </header>
      <div class="bg-overlay">
      </div>
      <div class="row">
        <NavbarCollapse @SourceClick='goRouter()'> </NavbarCollapse>
      </div>


      <router-view  @localData="getTempdata"  @getFavorite="getFavorite"  ref='target'></router-view>

            <!-- 訂閱 -->
     <div id="btm" class="bottomImfo ">
        <div class="container signup ">
          <div class="signup_title">
            <h3>訂閱我們的商品情報</h3>
          </div>
          <form action="" class="signup_form">
             <div class="signup_input_container">
                <input type="text" class="signup_input" placeholder="Enter email">
                <button class="signup_submit" type="submit">GO</button>
             </div>
          </form>
          <div class="signup_disclaimer">
             <p>訂閱我們最新的商品快遞跟第一手優惠訊息，還有不定期的限時優惠跟小禮物！
             </p>
                </div>
        </div>
    </div>
        <footer class="container">
          <div id="footer-wrapper" >
            <div id="footer" class="row">
                <!-- 關於我們 -->
              <div class="col-md-4">
                <h6>
                  <a href="#/policy"> <p>購物須知</p></a>
                </h6>
                          
              </div>

              <div class="col-md-4">
                <div class="d-flex">
                    <i class="fas fa-phone" style="font-size:20px;"></i>
                    <p class="px-2">03-378-78909</p> 
                </div>
                <div class="d-flex">
                    <i class="fas fa-envelope" style="font-size:20px;"></i>
                    <p class="px-2">bridge_service@bridge.com</p> 
                </div>
                </div>
                    <div class="d-flex media_accout col-md-4">
                      <a href="">
                        <i class="fab fa-instagram-square" style="font-size:26px;"></i>
                      </a>
                      <a href="">
                        <i class="fab fa-facebook-square " style="font-size:26px; margin:0 10px"></i>
                      </a>
                      <a href="">
                        <i class="fab fa-twitter-square" style="font-size:26px;"></i>
                      </a>
                    </div>

            </div>
         </div>
         <div class="text-center">
            <p>僅供個人學習  無商業用途</p>
         </div>
        </footer>
        
        
    </div>
</template>






<script>
import $ from 'jquery';

import NavbarCollapse from "../../navbar_collapse"
//TODO
$(window).scroll(function(){
    if($(window).scrollTop()>100){
    $(".nav_list").removeClass("navbar-dark");
    $(".nav_list").addClass("navbar-light");
    $(".nav_list").addClass("bgcolor_white");
    }
    if($(window).scrollTop()<100 ){
    $(".nav_list").addClass("navbar-dark");
    $(".nav_list").removeClass("navbar-light");
    $(".nav_list").removeClass("bgcolor_white");
  
     }

    
})
import { bus } from '../../../bus';

export default {

    data() {
        return {
            cart:[],
            tempData:[],
            cartQuantity:"",
            favorite:[],
            heartQuantity:"",
        }
    },
    components:{

        NavbarCollapse,

    },

    methods: {
        backgroungblur(){
           bus.$emit('backgroungblur')
        },
       //點擊觸發navbar_collapse背景

        getTempdata(){
          const vm=this;
          vm.tempData=JSON.parse(localStorage.getItem('tempData'))|| [];
          vm.cartQuantity=0;
          vm.tempData.forEach((item)=>{
          vm.cartQuantity+=item.qty   

        })
          
            
        },
        getFavorite(){
            const vm=this;
           vm.favorite=JSON.parse(localStorage.getItem('favorite'))|| [];
           //每次觸發都要重新撈一次vm.favorite來做更新
           //若local端還沒有任何資料則vm.favorite.length程式會判斷為null.length並跳錯
           //因此一定要加|| []
           vm.heartQuantity=vm.favorite.length;
        


        },
        goRouter(){
          //接收組件navbar_collapse的觸發更新並操作router-link中category的方法
          this.$refs['target'].getProducts() 

        }
        


    },
   
    created() {
       
        this.getTempdata();
        this.getFavorite()
    },
    
};
</script>

<style scoped>
.nav_logo{
  width: 160px;
  height: auto;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);

}
@media(max-width:575px){
  .nav_logo{
    width: 145px;
  
  }
}
/* .nav_logo{
  background-image: url(https://imgur.com/6srQSzC.png);
  background-size: contain;
  background-repeat: no-repeat;
  width: 300px;
  height: 50px;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
} */
/* @media(max-width:991px){
  .nav_logo{
    width: 250px;
    height: 45px;
  
  }
} */
/* @media(max-width:767px){
  .nav_logo{
      width: 200px;
    height: 40px;
  }
} */
/* @media(max-width:575px){
  .nav_logo{
    top:60%;
    width: 150px;
    height: 35px;
  }
} */


.nav_list{
  padding: 25px 50px;
  transition: background-color .8 ease-in
}
@media(max-width:767px){
  .nav_list{
  padding: 20px 25px;
  }
}
@media(max-width:575px){
  .nav_list{
  padding: 15px 15px;
  }
}

.cart{
  /* text-align: right; */
  display: flex;
}

.cart>div{
  /* display: inline-block; */
  margin: 5px 10px;
}
@media(max-width:575px){
.cart>div{
  margin: 2px 5px;
}
}
@media(max-width:767px){
  .cart>li{
    margin: 0px 10px 0 0;
  }
}


.cart_3 >a>span,.cart_1 >a>span{ 
    font-size: 1rem;
   font-weight: 600;
 
}
.signup_input:focus{
 border-color: #050505;
  outline: 0;

}
</style>