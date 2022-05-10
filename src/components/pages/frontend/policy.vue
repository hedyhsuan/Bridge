<template>
    <div>
      <div class="pro_bg">
        <div class="col-12 p-0">
         <div class="productBanner">
          <img class="bannerImg w-100" src="https://imgur.com/lGCpcyG.jpg" alt="">
         </div>
        </div>
        <div class="container product-wrap">

  <div role="tablist">
       <h3 class="text-center mb-5">購物須知</h3>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-1 variant="light">購物流程</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>
                  <ul class="list-unstyled">
                    <li> 
                       Step1：選購商品：您可以透過網頁引導或搜尋的方式找到您要的商品，再點選加入購物車。
                    </li>
                    <li>
                        Step2：確認身份：如已是會員請輸入帳號及密碼。
                    </li>
                    <li>
                       Step3：選擇收貨、付款方式：選擇您所需的運送及付款方式，並確認各項訂購商品明細及出貨資料。
                    </li>
                       <li>
                        Step4：完成結帳：訂單送出表示已完成訂單結帳流程，並詳閱注意事項。
                    </li>
                </ul>

          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
       <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-2 variant="light">付款方式</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
        
                   <ul class="list-unstyled">
                    <li> 
                        1. 商品退貨時必須為全新狀態且完整包裝(包含商品主體、附件、內外包裝、隨附文件、贈品等），故需請您保持商品、附件、包裝、廠商紙箱及所有隨附文件資料的完整，以寄送時的包裝再原封備妥，若有相關贈品請一併退回，原廠外盒損毀、商品缺件、超過7天猶豫期或是包材不完整、明顯有組裝痕跡致無法再次進行銷售者，恕無法受理退貨及退款。
                    </li>
                    <li>
                       2. 為加速作業您的訂單需求，線上門市目前未提供換貨服務，若您購買的商品有瑕疵及不符需求之情況，煩請您於網站『會員中心 > 訂單管理』申請退貨程序。
                    </li>
                    <li>
                       3. 需保留原購買發票。
                    </li>
                </ul>

          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-3 variant="light">七天猶豫期</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>
                 <ul>
                    <li>
                         1.家飾與家具訂單運費計算方式採分開計算制，恕無法合併計算。
                    </li>
                    <li>
                        2.如您訂購家具類商品，家具專員將於訂購內3個工作天與您電話聯絡確認訂單內容。
                    </li>
                    <li>
                        3.訂單成立後即無法再修改訂單內容，若有異動，須來電與客服人員聯繫申請退訂，重新訂購。
                    </li>
                    <li>
                        4.結帳前請您務必確認訂單內容以及是否接受配送貨運所需等待時間，避免耽誤配貨及運送狀況。
                    </li>
                    <li>
                        5.因拍攝燈光、電腦解析度、可能會造成實品與網頁上商品有些許色差，商品以收到的實品為主。
                    </li>
                </ul>
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-4 variant="light">訂購前注意事項</b-button>
      </b-card-header>
      <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>
               <ul>
                    <li>
                         1.家飾與家具訂單運費計算方式採分開計算制，恕無法合併計算。
                    </li>
                    <li>
                        2.如您訂購家具類商品，家具專員將於訂購內3個工作天與您電話聯絡確認訂單內容。
                    </li>
                    <li>
                        3.訂單成立後即無法再修改訂單內容，若有異動，須來電與客服人員聯繫申請退訂，重新訂購。
                    </li>
                    <li>
                        4.結帳前請您務必確認訂單內容以及是否接受配送貨運所需等待時間，避免耽誤配貨及運送狀況。
                    </li>
                    <li>
                        5.因拍攝燈光、電腦解析度、可能會造成實品與網頁上商品有些許色差，商品以收到的實品為主。
                    </li>
                </ul>
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>


         </div>
        </div>
        
    </div>
</template>

<script>
export default {
    
    // methods: {
    //     getM(){
    //         alert("OK")
    //     }
    // },

    // created() {
    //     this.getM()
    // },
}
</script>