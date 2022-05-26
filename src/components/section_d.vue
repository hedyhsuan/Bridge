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
                          <img src="https://imgur.com/hYwWBEP.jpg" alt="">
                          <div class="category">
                            <h3>SALE</h3>
                        </div>
                        </router-link>
                      </div>  
                    </div>  

                    <div class="col-sm-6 sortItem">
                        <div class="category_bg"> 
                          <router-link :to="`/products/Bedding`">
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
                      <router-link :to="`/products/Chair`">
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
                      <router-link :to="`/products/Lighting`">
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
                        <router-link :to="`/products/Decoration`">
                          <img src="https://imgur.com/VEzv5k9.jpg" alt="">
                          <div class="category">
                            <h3>Decor</h3>
                        </div>
                        </router-link> 
                      </div>
                    </div>
                    <div class="col-sm-6 sortItem">
                      <div class="category_bg">  
                        <router-link :to="`/products/Storage`">
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
/* section_d---------------------------------- */
.section_d{
  margin: 0 0 100px;
}
@media (max-width:767px){
  .section_d{
    margin:50px 0 100px ;

  }
   
}
.sortIteml{

 overflow: hidden;
}
.sortIteml>a>img{
  width: 100%;
}

/* .sortItems{
  padding: 0 15px;
  margin-bottom: 20px;
} */
.sortItem{
  position: relative;
  height: auto;
  padding: 0;
  padding: 0 15px ;
}


.category_bg{
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: black;
  text-align: center;

}
.category{
  position: absolute;
  width: 100%;
  top: 50%;
}



.category>h3{ 
  
  color: #fff;
  transition: 0.3s ease-in-out;
}

.category_bg:hover .category>h3{
  
    font-size: 1.5rem;
  
}
@media(max-width:991px){
  .category>h3{
    font-size: 1.5rem;
  }
  .category_bg:hover .category>h3{
      font-size: 1.25rem;
  }
}

.category_bg>a>img{
  width: 100%;
  height: auto;
  opacity: 1;
  transition: 0.5s;
 
}
.category_bg>a>img:hover{
  opacity: .7;
  transform: scale(1.1);
}


.sortIteml-1{
  margin-top: 25px;
}
.sortIteml-2{
  margin-bottom: 25px;
}
@media (max-width:767px){
  .sortIteml-1{
    margin: 0;
  }
  .sortIteml-2{
    margin-top: 25px;
  }
}


.sortIteml>div>a>img{
  width: 100%;
  height: auto;
}
@media (max-width:767px){
  .sortItem{
    padding: 0 15px 25px;
  }
}
.prodtext{
  padding: 20px 15px;
}
.prodtext>div>h4{
  border-bottom: 1px solid #555554;
  width: 100px;
  padding-bottom: 5px;
}
  
</style>