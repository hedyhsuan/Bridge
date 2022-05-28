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


                <div class="col-md-9 row"  data-aos='fade-down' data-aos-duration="1000" data-aos-once="true">
                     <div class="col-12 pt-1 mb-3 text-center">
                         <div class="mt-5 mb-5">
                        <h5>Error 404</h5>
                        <P>頁面發生錯誤</P>
                        </div>
                        <router-link :to="{name:'Category',params:{category:'allproduct'}}"  class="btn btn-dark">回到商品頁面</router-link>

                    </div>


                </div>
            </div>
         </div>
      </div>


        
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>