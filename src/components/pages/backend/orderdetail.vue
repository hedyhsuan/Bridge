<template>
    <div>
    <loading :active='isLoading'  />
      <div class="orderlist_page">
          <div class="container">
              <div class="">
                  <h3 class="text-center">訂單明細</h3>
              </div>
              <div>
                  <table class="table">

                      <tr>
                          <th>訂單編號</th>
                          <td>{{order.id}}</td>
                      </tr>
                       <tr>
                          <th>下單日期</th>
                          <td>{{order.create_at|date}}</td>
                      </tr>
                      <tr>
                          <th>姓名</th>
                          <td>{{order.user.name}}</td>
                      </tr>
                      <tr>
                          <th>聯絡電話</th>
                          <td>{{order.user.tel}}</td>
                      </tr>
                      <tr>
                          <th>電子信箱</th>
                          <td>{{order.user.email}}</td>
                      </tr>
                      <tr>
                          <th>地址</th>
                          <td>{{order.user.address}}</td>
                      </tr>
                      <tr>
                          <th>備註</th>
                          <td></td>
                      </tr>
                      <tr>
                          <th>付款狀態</th>
                          <td>
                             <span v-if="!order.is_paid">尚未付款</span>
                             <span v-else class="text-success">付款完成</span>
                         </td>
                      </tr>

                  </table>
               </div>

            </div>
        </div>

    </div>
</template>

<script>
export default {

    data() {
        return {
            orderId:"",
            orders:[],
            order:{},
            isLoading:false,
            pagination:{}

            
        }
    },
    methods: {
        getOrder(page=1){
           const api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
           const vm=this;
           vm.isLoading=true;
           this.$http.get(api).then((response) => {
           vm.isLoading=false;
           vm.orders=response.data.orders;
           let id=vm.$route.params.id
           vm.pagination=response.data.pagination

    })
        },
      
    },
    created() {
        const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
       );
    if (token === "") return
     //如果token沒有內容就直接return結束，若有就往下寫
     this.axios.defaults.headers.common["Authorization"] = token;
     this.getProducts();

    },
}
</script>

<style scoped>
.orderlist_page{
  margin: 110px 0 0;
  padding: 100px 0;
  background-color: #f5f4f1;

}
.orderlist_page table{
 max-width: 600px;
 margin: 0 auto;

}
.table th,.table td{
    width: 50%;
    
}
    
</style>