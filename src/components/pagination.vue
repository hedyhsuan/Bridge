<template>
    <div>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item " 
          :class="{'d-none':!page.has_pre}">
          <a class="page-link" href="#" @click="insideEvent(page.current_page-1)">
            <span aria-hidden="true">
            <i class="fas fa-caret-left"></i>
            </span>
          </a>
         </li>
       <!-- 如果沒有下一頁就不顯示箭頭 -->
       <!-- a標籤沒有disabled屬性，要加在li -->
         <li class="page-item" 
          v-for="item in page.total_pages" :key="item"
          :class="{'active':item === page.current_page}"> 
          <a class="page-link" href="#" @click="insideEvent(item)">{{item}}</a>   
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
        default:{},
        requied:true
      }
    },
    // props:['page'],
    // 接收實體資料庫資料
    methods: {
        insideEvent(item){
            this.$emit("switchPage",item);
            // console.log(item);
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

.page-item.active .page-link{
    background-color: #faf9f6;
    border-color: #faf9f6;
    color: black;
    
}

    
</style>