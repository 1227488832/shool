<template>
  <div id="pageone">
    <div class="home_container">
      <div class="iconback" @click="iconback">
        <van-icon name="arrow-left" />
      </div>
      <div class="home_title">
        <div>雀巢咖啡,提醒每一天</div>
      </div>
      <div class="home_banner">
        <img src="../assets/banner.jpg" alt="" />
      </div>
      <div class="line"></div>
      <div class="introduce">
        <h1>活动一:早期党-活力清晨,自信迎战</h1>
        <h1 style="margin-top: .9333rem;">活动详情:</h1>
        <p style="margin-top: .32rem;">活动期间每周一早上7点-10点，购买雀巢咖啡“丝滑 拿铁”瓶装、“招牌美式”瓶装或“原醇香滑”罐装， 任意产品凭当日超市购物小票即可参与幸运抽奖。</p>
        <h1 style="margin-top:.5333rem;">活动奖励:</h1>
        <p style="margin-top: .2667rem;">奖品1:音乐闹钟1个 （每场限量3个）  </p>
        <p>奖品2:丝滑拿铁1瓶 （每场限量12瓶）</p>
        <p>奖品3:帆布袋1个 （每场限量15个） 奖品</p>
        <p>奖品4:明信片 海报 圆珠笔 零食夹任意一个，每种每场限量30个</p>
      </div>
      <div class="back">
        <div @click="iconback">返回</div>
      </div>
    </div>
  </div>
</template>
  
  <script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import { GetHomedata } from "@/api/api";
export default {
  name: "HomeView",
  components: {},
  methods: {
    iconback() {
      this.$router.go(-1);
    },
  },
};
</script>
  <style lang="less" scoped>
  a{
    margin-top: .32rem;
  }
#pageone {
  overflow: auto;
  background: url("./../assets/fivebc.jpg") no-repeat;
  background-size: 100% 100%;
  background-attachment: scroll;
  min-height: 100%;
  position: relative;
  .iconback {
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 0.15rem;
    // background: blue;
    position: absolute;
    top: 1.2267rem;
    left: .7867rem;
  }
  .home_container {
    
    width: 7.9733rem;
    margin: 0 auto;
    font-size: 0.16rem;
    color: white;
    .home_title {
      width: 6.4533rem;
      height: .6133rem;
      background-color: rgb(99 51 32 / 30%);
      border-radius: .2667rem;
      display: flex;
      justify-content: center;
      margin: 0 auto;
      margin-top: 1.08rem;
      div {
        width: 5.1467rem;
        height: .6133rem;
        line-height: 0.6133rem;
        text-align: center;
        background-color: rgb(99 51 32 / 100%);
        // opacity: 0.5;
        border-radius: .2667rem;
        letter-spacing: 0.01rem;
      }
    }
    .home_banner {
      width:7.9733rem;
      margin-top: .5867rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .line {
      height: .0267rem;
      background-color: #e6e1dd;
      margin-top: .7467rem;
    }
    .introduce {
      margin-top: 1.08rem;
      color: white;
      
      margin-left: .2667rem;
      h1 {
        line-height: 0.3rem;
        font-size: .4267rem;
      }
      p {
        line-height:.56rem;
        font-size: .3733rem;
        letter-spacing: .04rem;
      }
    }
    .back {
      color: white;
      width: 4rem;
      height: .76rem;
      background-color: rgb(99 51 32  / 50%);
      border-radius: 0.2667rem;
      display: flex;
      justify-content: center;
      margin: 0 auto;
      margin-top: .9333rem;
      margin-bottom: 1.0667rem;
      div {
        width: 3.4667rem;
        height: .76rem;
        line-height: 0.76rem;
        text-align: center;
        background-color: rgb(99 51 32 / 80%);
        border-radius: .2667rem;
        font-size:.48rem;
        letter-spacing: .0267rem;
      }
    }
  }
}
</style>