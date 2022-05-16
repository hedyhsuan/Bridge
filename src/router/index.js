import Vue from "vue";
import VueRouter from 'vue-router';
//官方的元件


import Dashboard from "@/components/pages/frontend/dashboard";
import Dashboardinner from "@/components/pages/frontend/dashboardinner";
import Login from "@/components/pages/frontend/login";
import Bsproduct from "@/components/pages/backend/bsproduct"
import Cart from "@/components/pages/frontend/cart"
import Coupon from "@/components/pages/backend/coupon"
import Checkout from "@/components/pages/frontend/checkout"
import Orderlist from "@/components/pages/backend/orderlist"
import Orderdetail from "@/components/pages/backend/orderdetail"
// 引入時不用加副檔名.vue

import Category from "@/components/pages/frontend/category"
import SingleProduct from "@/components/pages/frontend/singleProduct"


import Policy from "@/components/pages/frontend/policy"
import CustomOrderlist from "@/components/pages/frontend/customorderlist"
import favorite from "@/components/pages/frontend/favorite.vue"
//自訂的元件分頁

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {
            path:'*',
            redirect:'/'
            //如果進入未定義的頁面就重導到首頁
            
        },
        {    name:'須驗證首頁',  //元件呈現的名稱/盡量用英文/第一個字母大寫
             path:'/admin', //對應的虛擬路徑
             component:Dashboard, //對應的元件
             children:[

                  {
                    name:'Login', 
                    path:'login', 
                    component:Login, 

                  },
                  {
                    name:'Bsproduct', 
                    path:'bsproduct', 
                    component:Bsproduct,

                    meta:{ requiresAuth:true}
            
                  },
                  {
                    name:'Coupon',
                    path:'coupon', 
                    component:Coupon, 

                    meta:{ requiresAuth:true}
            
                  },
                  {
                    name:'Orderlist', 
                    path:'orderlist', 
                    component:Orderlist, 

                    meta:{ requiresAuth:true}
            
                  },
                  // {
                  //   name:'Orderdetail', 
                  //   path:'orderdetail/:orderId', 
                  //   component:Orderdetail, 

                  //   meta:{ requiresAuth:true}
            
                  // },

             ]
        },
        
    
        {
            name:'',  
            path:'/', 
            component:Dashboard, 
            children:[
                {
                  name:'Index', 
                  path:'/', 
                  component:Dashboardinner, 

                },
               //分類頁面
                {
                  name:'Category', 
                  path:'products/:category', 
                  component:Category, 
        
                },
      
                {
                  name:'Favorite', 
                  path:'favorite', 
                  component:favorite, 
            
                },


                {
                  name:'Policy', 
                  path:'policy', 
                  component:Policy, 
                        },   
                    
                {
                  name:'Cart', 
                  path:'cart', 
                  component:Cart, 
                    },
                {
                  name:'Checkout', 
                  path:'checkout', 
                  component:Checkout, 
                    },

                {
                  name:'Customorderlist', 
                  path:'customorderlist/:orderId', 
                  component:CustomOrderlist, 
                    },
            
                                
                {
                  name:'SingleProduct', 
                  path:':id', 
                  component:SingleProduct,   
                    },

                         
                                 
         
            ]

        },
    ],


});
//此文件再匯出給entrance main.js使用