<template>
    <div>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <!-- 左邊箭頭 -->
          <!-- 如果沒有上一頁就不顯示箭頭 -->
          <li class="page-item " 
          :class="{'d-none':!page.has_pre}">
          <a class="page-link" href="#" @click="insideEvent(page.current_page-1)">
            <span aria-hidden="true">
            <i class="fas fa-caret-left"></i>
            </span>
          </a>
         </li>
       
       <!-- a標籤沒有disabled屬性，要加在li -->
         <li class="page-item" 
          v-for="item in page.total_pages" :key="item"
          :class="{'active':item === page.current_page}"> 
          <a class="page-link pageNumber" href="#" @click="insideEvent(item)">{{item}}</a>   
        </li>
  <!-- 一定要有key做為當前頁面active的判別,當頁面的序號與當前頁面一樣時就會有填滿效果 -->

         <li class="page-item"
         :class="{'d-none':!page.has_next}">
         <a class="page-link" href="#" @click="insideEvent(page.current_page+1)">
          <span aria-hidden="true">
            <i class="fas fa-caret-right"></i>
          </span>
        </a>
      </li>

      </ul>
     </nav>
        
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props:{
      page:{
        type:Object,
        //直接定義物件跳錯，"对象和数组接收格式均以函数的形式"
        default:()=>{return{}},
        requied:true
      }
    },
    // props:['page'],
    // 接收實體資料庫資料
    methods: {
        insideEvent(item){
            this.$emit("switchPage",item);
            console.log(item);
            // $emit(‘自定義事件’,要帶入的資料),透過此來觸發重新整理頁面的實體事件getProduct

        }
    },
}
</script>

<style scoped>
.page-link{
color: black;
background-color: transparent;
}
.pageNumber{
  color: rgba(104, 95, 78, 0.283);
}


.page-item.active .page-link{
    background-color: transparent;
    border-color:transparent;
    color: black;
    
}
.page-link:focus{
  box-shadow: none;

}

    
</style>