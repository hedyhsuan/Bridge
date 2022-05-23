<template>
    <div>
      <MainCarousel
      @goBottom=contactInfo()>
        </MainCarousel>
      <div class="sections">
        <div class="container">
          <div class="sectionb">
            <div class="Catepromote row" >
              <div class="col-12 col-md-5 ">
                <div class="X_left " data-aos='fade-left' data-aos-duration="2000" data-aos-once="true">
                  <div class="promo-inner_1">
                    <a href="#" class="dec-cover"></a>                               
                  </div>
                </div>
              </div>

              <div class="promo-inner_2 col-12 col-md-7 ">
                <div>  
                  <h4>打造舒眠天地</h4>
                  <p class="my-4">
                        一早睜開眼就有許多待辦事項，但慵懶地不想起身？雖然貪睡鬧鐘破壞了你的睡眠品質，但還是有幾個早晨，最對的選擇就是按下按鈕，享受珍貴的貪睡片刻。讓自己適時地多睡一會兒，為一天帶來更多活力。
                    </p>
                </div>
             
                <Carousel
                :category="category"
                :carouselItems="carouselItems"
                ></Carousel>

              </div>  

            </div>

         </div>
         <div class="sectionC">
           <div data-aos='fade-down' data-aos-duration="1500" data-aos-anchor-placement="top-center" data-aos-once="true">
            <div class="line "></div>
              <div class="c-content">
                <h5 class="pb-3 text-center ">新生活型態 | 在家工作的美好日常</h5>
                <p>整天穿著睡衣，走幾步就到辦公桌。在家工作曾是夢寐以求的生活。但在餐桌上對著電腦工作幾個月後，這對夫妻開始對居
               家佈置有了新的想法。他們規劃出幾個特定的工作區域，將開放式閣樓巧妙變成兼顧工作和生活的兩用空間。現在他們不但
               能在家中不同位置辦公，同時保持良好的效率；晚上也能完全放下一切，盡情享受悠閒時光。</p>

             </div>
           </div>
           <div class="row sectionCImg" data-aos='fade-down' data-aos-delay="400" data-aos-duration="1000" data-aos-once="true"> 
             <div class="col-12 col-sm-6 col-md-4 sectionCImg_d">
               <router-link :to="`/products/chair`">
                 <img src="https://img.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,h_1320,q_auto:good,w_1060/v1/mws/86cfea66-c355-4d68-8c66-55cade57d01a_StoragePOD1_negenentachtigvierkantemeter.jpg" alt="">
               </router-link>
             </div>
             <div class="col-12 col-sm-6 col-md-4">
                <router-link :to="`/products/chair`">
                 <img src="https://img.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,h_1320,q_auto:good,w_1060/v1/mws/a53dadc4-5462-4434-ac09-306f8babf8f1_BottomRIGHTpod.jpg" alt="">
                </router-link>
             </div>
             <div class="col-12 col-sm-6 col-md-4">
               <router-link :to="`/products/chair`">
                 <img src="https://img.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,h_1320,q_auto:good,w_1060/v1/mws/ec1c540a-6d75-4d4d-87d8-0306739258a4_Manal1060x1320_2.jpg" alt="">
               </router-link>
             </div>
          </div>
         </div>

         <div class="sectionD">
           <div data-aos='fade-down' data-aos-duration="1500" data-aos-anchor-placement="top-center" data-aos-once="true">
           <div  class="row">
             <div class="d-none d-lg-block col-lg-2 pt-5 garden_text">
               <h5 class="mb-4">室外天堂</h5>
               <div class="d-content" >
                 <p>偶爾想要有一個屬於自己的空間嗎？我們提供各樣戶外商品，讓你的戶外空間跟室內一樣舒適，任何時候都讓你有一個放鬆做夢的小天堂</p>
               </div>
               <div>
                 <router-link :to="`/-MqSkKB4qb6Lj7IIyesv`" style="border-bottom:1px solid #555554;">Shop garden</router-link>
               </div>
             </div>
             <div  class="col-12 col-lg-10">
               <img class="d-image" src="https://imgur.com/UB0XbOX.jpg" alt="">
             </div>

           </div>
           <div class="col-12 d-block d-lg-none garden_text_sm">
             <h5>室外天堂</h5>
             <div class="d-content" >
              <p>偶爾想要有一個屬於自己的空間嗎？我們提供各樣戶外商品，讓你的戶外空間跟室內一樣舒適，任何時候都讓你有一個放鬆做夢的小天堂</p>
             </div>
             <div>
               <router-link :to="`/-MqSkKB4qb6Lj7IIyesv`" style="border-bottom:1px solid #555554;">go shop</router-link>
             </div>
           </div>
         </div>

         </div>
         <SectionD/>
              
        </div>
      </div>
    </div>
</template>

<script>
import MainCarousel from "../../main_carousel"
import Carousel from "../../carousel_slide"
import SectionD from "../../section_d"
export default {
    data() {
        return {
            category:"bedding",
            // promote跑馬燈的商品類別
            carouselItems:"2"
            // promote跑馬燈的商品顯示數量
        }
    },
    components:{
    MainCarousel,
    Carousel,
    SectionD

    },
    methods: {
      contactInfo(){

      window.scrollTo( 0, 1000 );
    },
    
    }
    }
</script>

<style scoped>
  .sections{
    width: 100%;
  }
  .sectionb{
    margin-top:150px;
    align-items: center;
    color: #E8E5DF;
  }
  @media (max-width:767px){
    .sectionb{
      margin-top:50px; 
    }
  }


  .Catepromote{
    background-color: #fff;
    height: 100%;
    background-color: #1D3810;
    position: relative;

  }

  .promo-inner_1{
    background-image: url("https://imgur.com/8uJC9gE.jpg");
    background-size: cover;
    height: 100%;
    padding: 25px;

  }
  .dec-cover{
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
    text-decoration: none;
    position: relative; 

  }

 
  .inner_react{

    border: 2px solid #fff;
    padding: 445px 30px 30px;
    color: white;
    
  }

  .X_left{
    overflow: hidden;
    position: absolute;
    top: -30px;
    left: -20px;
    width: 100%;
    height: 100%;   
  }

  .promo-inner_2{
    height: 100%;
    padding: 40px 60px;
    margin-bottom: 50px;
    
  }
  @media(max-width:991px){
    .promo-inner_2{
      margin-bottom: 0;
      padding: 40px 40px;

    }
  }
 
  .inner-img{
    padding-bottom:35px ;
    border-bottom: 2px solid #E8E5DF;
  }
  .sectionD{
    margin-top: 200px;
    height: 500px;
    overflow: hidden;
  }
    @media(max-width:991px){
    .sectionD{
      margin-top: 75px;
      height: 700px;
    }

  }
      @media(max-width:767px){
    .sectionD{
      margin-top: 75px;
      height: 600px;
    }

  }

  .garden_text{
    border-top:1px solid #555554;
  }
  .d-image{
     width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center -180px;
  }
        @media(max-width:1199px){
    .d-image{
      object-position: center -80px;
    }

  }
      @media(max-width:991px){
    .d-image{
      padding-top: 75px;
      border-top:1px solid #555554;
      object-position: center 0px;
    }

  }
  .garden_text_sm{
    padding:30px 0;
  }

</style>