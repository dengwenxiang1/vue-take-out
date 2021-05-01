<template>
  <div id="app">
    <router-view></router-view>
    <FootefGuied v-show="$route.meta.showFooter"></FootefGuied>
  </div>
</template>

<script>
import FootefGuied from './compoments/FooterGuide/FootefGuied.vue'
// import {reqFoodTypes} from './api/ajax.js/ajax'
export default {
// async mounted () {
// const result = await reqFoodTypes()
// console.log(result)
// },
  components: {
    FootefGuied
  }
}
</script>

<style>
.app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>
