// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store'
import { Button } from 'mint-ui'
import './mock/mockSever' //加载mockSever即可
import './fiters' // 加载过滤器
// 注册全局组件标签
Vue.component(Button.name,Button) // <mt-button>

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 使用上vue-router,
  store, // 使用上vuex
  render:h=>h(App)
  // components: { App },
  // template: '<App/>'
})
