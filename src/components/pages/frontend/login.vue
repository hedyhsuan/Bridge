<template>
    <div>
        <div class="form-sign">
          <form @submit.prevent="signin">
          <!-- <div class="bar_logo" >
            <h3>BRIDGE</h3>
          </div> -->
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

          <div class="form-floating mb-2">
           <input type="email" class="form-control" id="floatingInput" v-model="user.username" placeholder="電子信箱/手機號碼">
           <!-- <label for="floatingInput">Email address</label> -->
          </div>
          <div class="form-floating">
           <input type="password" class="form-control" id="floatingPassword" v-model="user.password" placeholder="使用者密碼">
           <!-- <label for="floatingPassword">Password</label> -->
          </div>

          <div class="checkbox mb-2">
           <label>
             <input type="checkbox" value="remember-me"> Remember me
           </label>
          </div>
   
          <button class="w-100 btn btn-lg btn-dark mb-1" type="submit">Sign in</button>
          <span v-if="!login" class="text-danger font-weight-bold">帳號或密碼錯誤</span>
         <!-- <p class="mt-3 mb-3 text-muted">&copy; 2021</p> -->
         </form>
        </div>
    </div>
</template>

<script>
import {signinAPI} from '../../../api/api'
export default {

    data() {
        return {
          login:true,
            user:{
                username:"",
                password:"",
                login:'',

            }
        }
    },

    methods: {
         signin(){
           signinAPI(this.user).then((res)=>{
             if(res.data.success){
                this.login=true;
                const token=res.data.token;
                const expired=res.data.expired;
                document.cookie=`hexToken=${token}; expires=${new Date(expired)}`;
                this.$router.push({name:'Bsproduct'})
          //原document.cookie = "someCookieName = true; expires=Fri, 31 Dec 9999 23:59:59"
          //改為``樣版字面值並代入上面兩個變數，someCookieName 名稱可自訂，expired是固定名稱
          //後面的到期日要從數字標籤轉為日期格式
             }else{
               this.login=false;
             }
           })
           .catch(err=>console.log(err))
         },
    },
    
}
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.bar_logo{
  font-size: 40px;
  color: white;
  background-color:rgba(3, 3, 3, 0.8) ;
  padding: 10px 30px;
  font-weight: 600;
  margin: 50px 0 ;
  text-align: center;

}
.bar_logo>h3{
    margin: 0;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

    
</style>