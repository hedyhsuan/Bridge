<template>
    <div>
        <div class="row section_d">
          
            <div class="col-12 prodtext">
              <div>
                <h4 >產品分類</h4>
              </div>
          
            </div>
            <div class="col-12 col-md-6">
                <div class="row sortItems">
                    <div class="col-sm-6 sortItem">
                      <div class="category_bg">

                        <router-link :to="`/products/sale`">
                          <img src="https://imgur.com/xvuODmz.jpg" alt="">
                          <div class="category">
                            <h3>SALE</h3>
                        </div>
                        </router-link>
                      </div>  
                    </div>  

                    <div class="col-sm-6 sortItem">
                        <div class="category_bg"> 
                          <router-link :to="`/products/bedding`">
                            <img src="https://imgur.com/4q9o7Mq.jpg" alt="">
                            <div class="category">
                              <h3>Bedding</h3>
                            </div>
                         </router-link> 
                        </div>
                    </div>
                </div>

                <div class="sortIteml-1">
                    <div class="category_bg ">  
                      <router-link :to="`/products/chair`">
                        <img src="https://imgur.com/iKpU2oY.jpg" alt="">
                        <div class="category">
                          <h3>Sofas/Chairs</h3>
                        </div>
                      </router-link> 
                     </div>              
                </div>
             
            </div>

            <div  class="col-12 col-md-6">
                 <div class="sortIteml-2">
                    <div class="category_bg"> 
                      <router-link :to="`/products/lighting`">
                        <img src="https://imgur.com/TVGsBKG.jpg" alt="">
                        <div class="category">
                          <h3>Lighting</h3>
                        </div>
                      </router-link> 
                    </div>
                 </div>
                  <div class="row sortItems">
                    <div class="col-sm-6 sortItem">
                      <div class="category_bg"> 
                        <router-link :to="`/products/decoration`">
                          <img src="https://imgur.com/VEzv5k9.jpg" alt="">
                          <div class="category">
                            <h3>Decor</h3>
                        </div>
                        </router-link> 
                      </div>
                    </div>
                    <div class="col-sm-6 sortItem">
                      <div class="category_bg">  
                        <router-link :to="`/products/storage`">
                          <img src="https://imgur.com/x1BJ3S4.jpg" alt="">
                          <div class="category">
                            <h3>Storage</h3>
                          </div>
                        </router-link> 
                      </div>
                    </div>
                </div>

            </div>

        </div>
        
    </div>
</template>

<style scoped>
.prodtext{
  padding: 20px 15px;
}
.prodtext>div>h4{
  border-bottom: 1px solid #555554;
  width: 100px;
  padding-bottom: 5px;
}
  
</style>