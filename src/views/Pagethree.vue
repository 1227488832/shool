<template>
  <div id="pagethree">
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
        <h1>活动三:干饭党-午餐一瓶，清爽美味</h1>
        <h1 style="margin-top: 0.5867rem">活动详情:</h1>
        <p style="margin-top: 0.32rem">
          活动期间携4个雀巢产品瓶盖，到线下活动参与投
          掷游戏，仅需将瓶盖投掷于活动现场装置中，根据瓶
          盖最终掉落区域，现场领取活动奖励。
        </p>
        <h1 style="margin-top: 1.0133rem">活动奖励:</h1>
        <p style="margin-top: 0.2933rem">丝滑拿铁：75瓶</p>
        <p>招牌美式：75瓶</p>
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
#pagethree {
  overflow: auto;
  background: url("./../assets/fivebc.jpg") no-repeat;
  background-size: 100% 100%;
  background-attachment: scroll;
  min-height: 100%;
  position: relative;

  .home_container {
    width: 8rem;
    margin: 0 auto;
    color: white;
    .iconback {
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 0.15rem;
      // background: blue;
      position: absolute;
      top: 1.2267rem;
      left: 0.7867rem;
    }
    .home_title {
      width: 6.48rem;
      height: 0.6133rem;
      background-color: rgb(38 23 23 / 20%);
      border-radius: 0.2667rem;
      display: flex;
      justify-content: center;
      margin: 0 auto;
      margin-top: 1.0933rem;

      div {
        width: 5.1467rem;
        height: 0.6133rem;
        line-height: 0.6133rem;
        text-align: center;
        background-color: rgb(38 23 23 / 50%);
        font-size: 0.3733rem;
        border-radius: 0.2667rem;
        letter-spacing: 0.0267rem;
      }
    }
    .home_banner {
      width: 100%;
      height: 4.52rem;
      margin-top: 0.5733rem;
      img {
        width: 100%;
      }
    }
    .line {
      height: 0.0267rem;
      background-color: #e6e1dd;
      margin-top: 0.7067rem;
    }
    .introduce {
      margin-top: 1.08rem;
      color: white;
      letter-spacing: 0.0267rem;
      margin-left: 0.2667rem;
      h1 {
        font-size: 0.4533rem;
      }
      p {
        font-size: 0.2933rem;
        line-height: 0.56rem;
      }
    }
    .back {
      color: white;
      width: 4rem;
      height: 0.8rem;
      background-color: rgb(99 51 32 / 50%);
      border-radius: 0.2667rem;
      display: flex;
      justify-content: center;
      margin: 0 auto;
      margin-top: 2.5867rem;
      margin-bottom: 1.0667rem;
      div {
        width: 3.4667rem;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        background-color: rgb(99 51 32 / 80%);
        border-radius: 0.2667rem;
        letter-spacing: 0.0267rem;
        font-size: 0.5333rem;
      }
    }
  }
}
</style>