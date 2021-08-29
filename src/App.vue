<template>
  <div id="app">
    <router-view></router-view>
    <FootefGuied v-show="$route.meta.showFooter"></FootefGuied>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import FootefGuied from './compoments/FooterGuide/FootefGuied.vue'
export default {
  mounted () {
    this.getAddress()
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['getAddress','getUserInfo'])
  },
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
