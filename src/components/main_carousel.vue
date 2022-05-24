<template>
<div>
  <div class="">
  <div class="main_carousel">
          <!-- <div id="enter_logo" data-aos="zoom-out" data-aos-easing="ease-in-out" data-aos-duration="2000">
            <p>BRIDGE</p>
          </div> -->
    <div >
      <b-carousel
          fade 
          id="carousel-1"
          v-model="slide"
          :interval="3500"
          controls
          indicators
          background=""
          img-width="1920"
          img-height="1080"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
           >
     
          <div>
          <!-- Slides with image only -->
            <b-carousel-slide class="main_img"  img-src="https://imgur.com/2pikP9d.jpg">
            <div class="img_text_1">
            <h3 >讓在家 像渡假 。</h3>
            <h6 >開幕優惠 結帳輸入 <span class="promote color-white px-2"> lovedecor </span></h6>
           </div>
           </b-carousel-slide>

           <b-carousel-slide class="main_img"  img-src="https://imgur.com/P6WIP03.jpg">
           
           </b-carousel-slide>

           <b-carousel-slide  class="main_img"  img-src="https://imgur.com/pOeAX5P.jpg">
            <div class="img_text_2" >
              <h4>後疫情時代</h4>
              <h3>宅趣生活</h3>
              <a href="#/chair" 
              style="text-decoration: underline;">-->看更多居家工作用品</a>
           </div>
           </b-carousel-slide>

            <b-carousel-slide class="main_img"  img-src="https://imgur.com/W6GxiHB.jpg"></b-carousel-slide>


            
      
        <div>
           <ul class="navbar-nav carousel-nav flex-row ">
             <li class="nav-item ">
               <router-link class="main-nav-link d-flex" :to="{name:'Category',params:{category:'allproduct'}}">商品 
               <p>Product</p> 
               </router-link>
             </li>
             <li class="nav-item ">
               <router-link class="main-nav-link d-flex" :to="{name:'Policy'}">購物須知
                   <p>Product</p> 
               </router-link>
             </li>
             
             <li class="nav-item ">
              <a href="#btm" class="main-nav-link d-flex">聯絡
                <p> Contact</p>
              </a>
             </li>

           </ul>
        </div>
       </div>
      </b-carousel>


     </div>
    </div>  
    </div>       
        
</div>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      },
      goBottom(){
        this.$emit('goBottom')
      }

    }
  }
</script>

<style scoped>
 .promote {
  background-color:rgba(2, 2, 2,.7);
 }
 .img_text_1{
   margin-left: 100px;
 }
   @media (max-width:767px){
    .img_text_1{
      margin-left:40% ;
    }
    .img_text_1>h3,.img_text_1>h6{
      font-size: smaller;
    }

  }
  .img_text_2{
   margin-left: 200px;
 }
    @media (max-width:767px){
      .img_text_2{
      margin-left:40% ;
    }
    .img_text_2>h4,.img_text_2>h3{
      font-size: smaller;
    }
  }
  /* @media (max-width:767px){
    .img_text{
      width: 60%;
    }
  } */



  
</style>

