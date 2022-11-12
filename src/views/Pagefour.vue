<template>
  <div id="pagetwo">
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
        <h1>活动四：干饭党-酷黑态度，热爱无限</h1>
        <h1 style="margin-top: 0.56rem">活动详情:</h1>
        <p style="margin-top: 0.28rem">
          活动期间仅需日行走步数一万步，将当日微信步数
          截图，上传行程到指定活动页面，进行一周步数累计
          每周四我们将根据一周步数积累情况进行排名奖励。
        </p>
        <h1 style="margin-top: 1.0133rem;">活动奖励:</h1>
        <p style="margin-top: .2933rem;">前1-5名：奖励招牌美式一箱（15瓶）</p>
        <p>前6-10名：奖励运动套装-套（包含运动发带，护腕，手环</p>
        <p>注：连续5天参与活动者即可赠送招牌美式咖啡1瓶（限定100瓶）</p>
      </div>
      <div class="back">
        <div @click="goto">上传截图</div>
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
    goto() {
      this.$router.push("fourupdata");
    },
    iconback() {
      this.$router.push("/");
    },
  },
};
</script>
  <style lang="less" scoped>
a {
  margin-top: .2933rem;
}
#pagetwo {
  overflow: auto;
  background: url("./../assets/fivebc.jpg") no-repeat;
  background-size: 100% 100%;
  background-attachment: scroll;
  min-height: 100%;
  position: relative;
  .home_container {
    width: 7.9733rem;
    margin: 0 auto;
    font-size: 0.16rem;
    color: white;
    // display: flex;
    // justify-content: center;
    color: white;
    .iconback {
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 0.15rem;
      position: absolute;
      top: 1.2267rem;
      left: 0.7867rem;
    }
    .home_title {
      width: 6.4533rem;
      height: 0.6133rem;
      background-color: rgb(99 51 32 / 30%);
      border-radius: 0.2667rem;
      display: flex;
      justify-content: center;
      margin: 0 auto;
      margin-top: 1.08rem;
      div {
        width: 5.1467rem;
        height: 0.6133rem;
        line-height: 0.6133rem;
        text-align: center;
        background-color: rgb(99 51 32 / 100%);
        // opacity: 0.5;
        border-radius: 0.2667rem;
        letter-spacing: 0.01rem;
      }
    }
    .home_banner {
      width: 7.9733rem;
      margin-top: 0.5867rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .line {
      height: 0.0267rem;
      background-color: #e6e1dd;
      margin-top: 0.7467rem;
    }
    .introduce {
      margin-top: 1.08rem;
      color: white;

      margin-left: 0.2667rem;
      h1 {
        line-height: 0.3rem;
        font-size: 0.4267rem;
      }
      p {
        line-height: 0.5733rem;
        font-size: 0.3333rem;
        letter-spacing: 0.04rem;
      }
    }
    .back {
      color: white;
      width: 4rem;
      height: 0.76rem;
      background-color: rgb(99 51 32 / 50%);
      border-radius: 0.2667rem;
      display: flex;
      justify-content: center;
      margin: 0 auto;
      margin-top: 0.9333rem;
      margin-bottom: 1.0667rem;
      div {
        width: 3.4667rem;
        height: 0.76rem;
        line-height: 0.76rem;
        text-align: center;
        background-color: rgb(99 51 32 / 80%);
        border-radius: 0.2667rem;
        font-size: 0.48rem;
        letter-spacing: 0.0267rem;
      }
    }
  }
}
</style>