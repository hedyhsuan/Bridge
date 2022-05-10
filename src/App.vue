<template>
  <div id="app">
    <router-view></router-view>
    

  </div>
</template>

<script>



export default {
  name: 'App',
  components: {
    // HelloWorld
  },

  created() {
    const api=`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products`;
    //API伺服器路徑
    //申請的APIpath
    this.$http.get(api).then((response) => {
    // console.log(response.data)
    })
    //測試axios連線

    },
}

</script>

 <style lang="scss">
@import "./assets/all";

</style>

