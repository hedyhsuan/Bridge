import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap';


import "./bus";
import currencyFilter from './filters/currency.js'
import dateFilter from './filters/date.js'
import BootstrapVue from 'bootstrap-vue'


import { ValidationObserver, ValidationProvider, 
  extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules';


import { BCarousel } from 'bootstrap-vue'; 
import { BCarouselSlide } from 'bootstrap-vue';
import carousel from 'vue-owl-carousel';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import router from '@/router';
import $ from 'jquery'
window.$ = $; 
import 'default-passive-events'

// ---------以下皆為vee--validator引入內容
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});
// ---------------

Vue.use(VueAxios,axios);
Vue.use(BootstrapVue);
// Vue.use(CarouselPlugin);
Vue.config.productionTip = false;
Vue.filter("currency",currencyFilter);
//貨幣格式
Vue.filter("date",dateFilter);
//數字轉換日期
Vue.component("Loading",Loading);
Vue.component('b-carousel', BCarousel);
Vue.component('b-carousel-slide', BCarouselSlide);
Vue.component('owl-carousel',carousel);

axios.defaults.withCredentials = true;
// cookie開關


new Vue({
  created() {
    AOS.init({});
  },
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
});

router.beforeEach((to,from,next)=>{

  if (to.meta.requiresAuth){
    //如果需要驗證
    const api=`${process.env.APIPATH}api/user/check`;
    axios.post(api).then((response)=>{

      if(response.data.success){
        next();
        //驗證成功就進入該頁面
      }else{
        next({
          path:"/admin/login"
          //驗證失敗則轉入登入頁
        })
      }
    });
  }else{
    next()
    //若不需驗證則直接放行
  }
})
router.afterEach((to, from, next) => {
	window.scrollTo(0, 0);
});


