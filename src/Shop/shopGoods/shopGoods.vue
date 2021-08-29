<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <!-- 菜单对应的是食物分类列表-->
        <ul>
          <!--当前分类class添加current 设计一个计算属性currentIndex -->
          <!-- 根据那些数据计算？ -->
          <!-- srolly右侧滑动的Y轴坐标（滑动过程时实时变化） -->
          <!-- tops所有右侧分类li的top组成的数组(例表第一次显示后就不再变化) -->
          <!-- 1.在滑动过程中，实时收集scrollY -->
          <!-- 2.例表第一次显示后，收集tops -->
          <li
            class="menu-item"
            v-for="(good, index) in goods"
            :key="index"
            :class="{ current: index === currentIndex }"
            @click="clickMenuItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon" />
              {{ good.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <!-- 右侧的食物列表是根据左侧的分类列表展现的-->
        <!-- 所以右侧是在一个分类标题列表里面嵌套着各类食物列表-->
        <ul ref="foodsUl">
          <li
            class="food-list-hook"
            v-for="(good, index) in goods"
            :key="index"
          >
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellcCount }}</span>
                    <span>好评率{{ food.rating }}</span>
                  </div>
                  <div class="price">
                    <span class="now" >￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import BetterScroll from 'better-scroll';
import CartControl from '../../compoments/CartControl/CartControl.vue'
import Food from '../../compoments/Food/Food.vue'
import ShopCart from '../../compoments/ShopCart/ShopCart.vue'
export default {
  data() {
    return {
      scrollY: 0, // srolly右侧滑动的Y轴坐标（滑动过程时实时变化）
      tops: [], // tops所有右侧分类li的top组成的数组(例表第一次显示后就不再变化)
      food: {} //需要显示的food
    }
  },
  mounted() {
    this.$store.dispatch("getShopGoods", () => {
      // 数据更新后执行
      this.$nextTick(() => {
        // 列表数据更新之后才显示
        this._initScorll()
        this._initTops()
      })
    })
  },
  methods: {
    // 初始化滚动条
    _initScorll() {
      new BetterScroll(".menu-wrapper", {
        click:true
      })
      this.foodsSroll = new BetterScroll(".foods-wrapper", {
        probeType: 2 ,// 惯性滑动不会猝发
        click:true 
      })
      // 给右侧列表绑定scroll监听
      this.foodsSroll.on('scroll', ({ x, y }) => {
        this.scrollY = Math.abs(y)
        console.log(x, y)
      })
      // 滚动结束的监听
      this.foodsSroll.on('scrollEnd', ({ x, y }) => {
        this.scrollY = Math.abs(y)
         console.log(x, y)
      })
    },
    // 初始化tops
    _initTops () {
      //初始化tops
      const tops = []
      let top =0
      tops.push(top)
      // 2.收集
      // 找到所有分类的li
      const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
      Array.prototype.slice.call(lis).forEach(li=>{
        top += li.clientHeight
        tops.push(top)
      })
      this.tops = tops
      console.log(tops);
    },
    clickMenuItem (index){
      console.log(index);
      // 使右侧列表滑动到对应的位置
      // 得到目标位置的scrollY
      const scrollY = this.tops[index]
      // 立即更新scrollY(让点击的分类项成为当前分类)
      this.scrollY = scrollY
      // 平滑右侧列表
      this.foodsSroll.scrollTo(0, -scrollY,300)
    },
    // 显示点击的food
    showFood (food) {
       // 设置food
         this.food = food
       // 显示food组件 (在父组件调用子组件对象的方法)
         this.$refs.food.toggleShow()
    }
  },
  computed: {
    ...mapState(["goods"]),
    // 计算得到当前分类的下标
    currentIndex() {// 初始和相关数据发生了变化
      // 得到条件数据
      const {scrollY,tops} = this
      // 根据条件计算产生一个结果
      const index = tops.findIndex((top,index) => {
        // scroolly >= 当前top && scrolly<下一个top
        return scrollY>=top && scrollY<tops[index+1]
      })
      // 返回结果
      return index
    }
  },
  components: {
    CartControl,
    Food,
    ShopCart
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 40px;
  bottom: 46px;
  width: 100%;
  height: 480px;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>