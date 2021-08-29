// 路由器对象
import Vue from 'vue'
import VueRouter from 'vue-router'
const MSite = () =>import('../pages/MSite/MSite') 
const Profile = () =>import('../pages/Profile/Profile')
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Login from '../pages/login/Login.vue'
import Shop from '../Shop/Shop.vue'
import ShopGoods from '../Shop/shopGoods/shopGoods.vue'
import ShopInfo from '../Shop/ShopInfo/shopInfo.vue'
import ShopRatings from '../Shop/shopRatings/shopRatings.vue'
// 声明使用插件
Vue.use(VueRouter)
export default new VueRouter({
// 所有路由
  routes: [
    {
      path: '/msite',
      component: MSite, //返回路由组件的函数，只有执行此函数才会加载路由组件，这个函数在请求对应得路由路径时才会执行
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '/',
          redirect:  '/shop/goods'
        }
      ]
    }
  ]
})
