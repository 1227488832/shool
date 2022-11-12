<template>
  <div id="home">
    <div class="home_container">
      <div class="dialogbtn" @click="dialogShow">
        <img src="../assets/hdbtn.jpg" alt="" />
      </div>
      <div class="saylog">
        <van-popup v-model="dialogValue">
          <img class="saylogImg" src="../assets/homosm1.jpg" alt="">
          <div class="dialog_back">
            <div @click="dialogCaggle">返回</div>
          </div>
        </van-popup>
      </div>
      <div class="home_title">
        <div>雀巢咖啡,提醒每一天</div>
      </div>
      <div class="home_banner">
        <img src="../assets/banner1.jpg" alt="" />
      </div>
      <div class="home_banner_top">
        <p>雀巢咖啡，提醒每一天</p>
        <p>每一天活力随行！</p>
        <p>每一天全力以赴！</p>
        <p>每一天灵感迸发！</p>
        <p>每一天状态起飞！</p>
        <p>每一天分享喜悦！</p>
        <p>加入我们，体验美好，成为美好！</p>
        <p>丝滑醇香玩出彩，心动好礼等你来！</p>
      </div>
      <div class="home_banner_one">
        <img src="../assets/hdone.jpg" alt="" />
        <div
          style="
            position: absolute;
            right: 1.1067rem;
            top: 0.48rem;
            width: 2.04rem;
            height: 0.5067rem;
          "
          @click="goto(1)"
        ></div>
      </div>
      <div class="home_banner_one">
        <img src="../assets/hdtwo.jpg" alt="" />
        <div
          style="
            position: absolute;
            left: 1.6933rem;
            top: 0.64rem;
            width: 2.04rem;
            height: 0.5067rem;
          "
          @click="goto(2)"
        ></div>
      </div>
      <div class="home_banner_one">
        <img src="../assets/hdthree.jpg" alt="" />
        <div
          style="
            position: absolute;
            right: 1.24rem;
            top: 0.6rem;
            width: 2.04rem;
            height: 0.5067rem;
          "
          @click="goto(3)"
        ></div>
      </div>
      <div class="home_banner_one">
        <img src="../assets/hdfour.jpg" alt="" />
        <div
          style="
            position: absolute;
            left: 1.6733rem;
            top: 0.52rem;
            width: 2.04rem;
            height: 0.5067rem;
          "
          @click="goto(4)"
        ></div>
      </div>
      <div class="home_banner_one">
        <img src="../assets/hdfive.jpg" alt="" />
        <div
          style="
            position: absolute;
            right: 1.1067rem;
            top: 0.6667rem;
            width: 2.04rem;
            height: 0.5067rem;
          "
          @click="goto(5)"
        ></div>
      </div>

      <div class="logindialog">
        <van-popup v-model="dialoglogin">
          <div class="login_box">
            <div class="dialog_back">
              <div>返回</div>
            </div>
            <div class="dialog_back">
              <div @click="login">前往公众号</div>
            </div>
          </div>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { GetHomedata } from "@/api/api.js";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      dialogValue: false,
      dialoglogin: false,
    };
  },
  methods: {
    login() {
      GetHomedata({
        code: "043i44Ia1QZ0bE0w9mJa16D3vs0i44Iq",
      }).then((res) => {
        console.log(res);
      });
    },
    dialogShow() {
      this.dialogValue = true;
    },
    dialogCaggle() {
      this.dialogValue = false;
    },
    goto(index) {
      this.dialoglogin = true;
      switch (index) {
        case 1:
          this.$router.push("/pageone");
          break;
        case 2:
          this.$router.push("/pagetwo");
          break;
        case 3:
          this.$router.push("/pagethree");
          break;
        case 4:
          this.$router.push("/pagefour");
          break;
        case 5:
          this.$router.push("/pagefive");
          break;
      }
    },
  },
};
</script>
<style lang="less" scoped>
#home {
  overflow: auto;
  background: url("./../assets/bc.jpg") no-repeat;
  background-size: 100%;
  // background-size: contain;
  background-attachment: scroll;
  min-height: 100%;
  .logindialog {
    .van-popup {
      width: 8.7467rem;
      height: 12.7067rem;
      border-radius: 0.2rem;
      background: url("./../assets/homedialog.jpg") no-repeat;
      background-size: 100% 100%;
      .login_box {
        width: 7.8533rem;
        display: flex;
        margin: 0 auto;
        justify-content: space-between;
        padding: 0 0.28rem;
        margin-top: 9.9067rem;
        .dialog_back {
          color: white;
          font-size: 0.16rem;
          width: 3.4267rem;
          height: 0.6667rem;
          background-color: rgb(167 105 64 / 50%);
          border-radius: 0.2667rem;
          display: flex;
          justify-content: center;
          margin: 0 auto;
          margin-top: 0.34rem;
          div {
            width: 2.9867rem;
            height: 0.6667rem;
            line-height: 0.6667rem;
            text-align: center;
            background-color: rgb(167 105 64 / 80%);
            // opacity: 0.5;
            border-radius: 0.2667rem;
            letter-spacing: 0.01rem;
          }
        }
      }
    }
    /deep/ .van-overlay {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  .home_container {
    // width: 3.15rem;
    width: 100%;
    margin: 0 auto;
    color: white;
    padding-top: 1.0267rem;
    padding-bottom: 0.38rem;
    // position: relative;
    .dialogbtn {
      width: 1.1867rem;
      height: 1.0667rem;
      position: absolute;
      right: 0;
      top: 9.28rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .home_title {
      width: 6.4rem;
      height: 0.5333rem;
      background-color: rgb(99 51 32 / 20%);
      border-radius: 0.1333rem;
      display: flex;
      justify-content: center;
      margin: 0 auto;
      //
      div {
        width: 4.4667rem;
        height: 0.5333rem;
        line-height: 0.5333rem;
        text-align: center;
        background-color: rgb(99 51 32 / 100%);
        // opacity: 0.5;
        border-radius: 0.08rem;
        font-size: 0.16rem;
      }
    }
    .home_banner {
      margin-top: 0.4rem;
      width: 100%;
      text-align: center;
      img {
        width: 8.4rem;
        height: 4.8rem;
      }
    }
    .home_banner_top {
      padding: 0.08rem 0;
      color: white;
      text-align: center;
      letter-spacing: 0.01rem;
      p {
        // margin-top: 0.08rem;
        font-size: 0.2933rem;
        line-height: 0.4267rem;
      }
    }
    .home_banner_one {
      width: 8.4267rem;
      position: relative;
      margin: 0 auto;
      margin-bottom: 0.5333rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .saylog {
      height: auto;
      
      .van-popup {
        width: 8.7733rem;
        height: auto;
        border-radius: 0.2rem;
        overflow-y: scroll;
        background: #ef7623;
        .saylogImg {
          width: 100%;
        }
        .dialog_back {
          margin: .5333rem auto .4667rem auto;
          color: white;
          font-size: 0.4533rem;
          width: 4rem;
          height: 0.7467rem;
          background-color: rgb(212, 168, 142);
          border-radius: 0.2667rem;
          display: flex;
          justify-content: center;
          div {
            width: 3.4667rem;
            height: 0.7467rem;
            line-height: 0.7467rem;
            text-align: center;
            background-color: rgb(106, 48, 27);
            border-radius: 0.2667rem;
            letter-spacing: 0.01rem;
          }
        }
      }
      /deep/ .van-overlay {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>