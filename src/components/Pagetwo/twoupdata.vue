<template>
  <div id="twoupdata">
    <div class="home_container">
      <div class="iconback" @click="iconback">
        <van-icon name="arrow-left" />
      </div>
      <div class="home_title">
        <div>雀巢咖啡，提醒每一天</div>
        <h5>同学，请放下手机专心读书吧！</h5>
      </div>
      <div class="home_info">
        <div class="home_info_cont">
          <p>已兑换咖啡：</p>
          <p>{{ userInfo.conversion_num }}</p>
        </div>
        <div class="home_info_cont">
          <p>已生成咖啡豆：</p>
          <p>{{ userInfo.beans }}</p>
        </div>
        <!-- <div v-if="userInfo.beans == 3" class="hecheng" @click="hcbtn">合成</div> -->
        <div class="hecheng" @click="hcbtn">合成</div>

      </div>
      <div class="home_ing">
        <img src="./../../assets/time.png" alt="" />
      </div>
      <div class="pgree">
        <van-progress :percentage="countnum" stroke-width="8" />
      </div>
      <div class="time">{{ formatTime(count) }}</div>
      <div class="tix">
        <p>机器三颗咖啡豆，请前往线下活动处兑换</p>
      </div>
      <div class="back">
        <div @click="getCode">开始计时</div>
      </div>
      <div class="success">
        <van-popup v-model="dialogValue">
          <div class="dialog_title">
            <span>「成功提示」</span>
          </div>
          <div
            class="dialog_tis"
            style="font-size: 0.5333rem; margin-top: 1.3067rem"
          >
            恭喜您!
          </div>
          <div class="dialog_tis">今日的专注时间挑战已完成！</div>
          <div class="dialog_tis">获得三颗咖啡豆,收集后，前往兑换处，</div>
          <div class="dialog_tis">兑换咖啡券吧！</div>
          <div class="dialog_back">
            <div @click="dialogValue = false">确定</div>
          </div>
        </van-popup>
      </div>
      <div class="dhsuccess">
        <van-popup v-model="dhsuccessdialog">
          <div class="dialog_title">
            <span>「合成提示」</span>
          </div>
          <div class="word">
            <div class="word_left">
              <p>亲爱的</p>
              <p>xxx</p>
              <p>同学</p>
            </div>
            <div class="word_right">
              <p>您拥有</p>
              <p>3</p>
              <p>颗咖啡豆，可兑换元醇香滑一罐！</p>
            </div>
            <h1>是否合成？</h1>
          </div>
          <div class="dialog_btn">
            <div class="dialog_back">
              <div @click="hcback">取消</div>
            </div>
            <div class="dialog_back">
              <div @click="coffeesynthesis">确定</div>
            </div>
          </div>
        </van-popup>
      </div>
      <div class="timedialog">
        <van-popup v-model="timedialog">
          <div class="dialog_title">
            <span>「剩余提示」</span>
          </div>
          <div class="word">
            <div class="word_left">
              <p>今天的专注小工具有效时间</p>
            </div>
            <div class="word_right">
              <p>还剩</p>
              <p>60</p>
              <p>分钟</p>
            </div>
          </div>

          <div class="dialog_back">
            <div>确定</div>
          </div>
        </van-popup>
      </div>
    </div>
  </div>
</template>
    
    <script>
import { getCoffData, getCoffeeSynthesis,GetCoffeeData } from "@/api/api";
import { formatSeconds } from "@/utils";
export default {
  data() {
    return {
      userInfo: {
        conversion_num: "",
        beans: "",
      },
      gameId: "",
      gameValue: "",
      dialogValue: false,
      dhsuccessdialog: false,
      timedialog: false,
      // 时间
      count: 10800,
      // 进度条
      countnum: 0,
      timer: null,
      // 判断第几次请求
      dialogIndex:0,
      //还剩多少分钟
      minute:0
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    formatTime(sconds) {
      console.log(sconds);
      return formatSeconds(sconds);
    },
    //返回上一页
    iconback() {
      this.$router.go(-1);
    },
    // 合成取消
    hcback() {
      this.dhsuccessdialog = false;
    },
    // 获取数据
    getInfo() {
      getCoffData().then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.userInfo.conversion_num = res.data.data.conversion_num;
          this.userInfo.beans = res.data.data.beans;
        }
      });
    },
    //开始计时
    getCode() {
      const TIME_COUNT = 10800;

      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            //60
            //100  1
            //1000 10
            //10000  100
            //18000   180
            if (this.count % 108 == 0 && this.count !== TIME_COUNT) {
              this.countnum++;
              if (this.countnum == 99) {
                setTimeout(() => {
                  this.countnum += 1;
                }, 1000);
              }
            }
            if(this.count == 7200 ||this.count == 3600||this.count == 0 ){
                this.GetCoffeeData().then(res=>{
                  console.log(res);
                  if(res.data.status == 200){
                      this.timedialog = true
                      this.dialogIndex++
                      if(this.dialogIndex == 1){
                        
                      }
                  }
                })
            } 
            this.count--;
            if(this.count == 0){
                this.dialogValue = true
            }
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    // 合成确定按钮
    coffeesynthesis() {
      getCoffeeSynthesis().then(res => {
        console.log(res);
        if (res.data.status == 10003) {
          this.Toast(res.data.msg);
        }
        if (res.data.status == 10007) {
          this.Toast(res.data.msg);
        }
        if (res.data.status == 10008) {
          this.Toast(res.data.msg);
        }
        if (res.data.status == 15000) {
          this.Toast(res.data.msg);
        }
        if (res.data.status == 200) {
          this.Toast(res.data.msg);
          this.userInfo.conversion_num = res.data.data.conversion_num;
          this.userInfo.beans = res.data.data.beans;
        }
      });
    },
    // 合成dilog显示
    hcbtn() {
      this.dhsuccessdialog = true;
    },

    // 返回
    back() {
      this.$router.push("/pagetwo");
    },
    //上传触发事件
    // afterRead(file) {
    //   // 此时可以自行将文件上传至服务器
    //   console.log(file);
    // },
    //倒计时
    goto() {
      this.getCode();
      this.timedialog = true;
    },
  },
};
</script>
    
    <style lang="less" scoped>
a {
  font-size: 1.3067rem;
}
#twoupdata {
  // height: 100%;
  overflow: auto;
  background: url("./../../assets/fivebc.jpg") no-repeat;
  background-size: 100% 100%;
  background-attachment: scroll;
  min-height: 100%;
  position: relative;
  .home_container {
    width: 7.7067rem;
    margin: 0 auto;
    color: white;
    // position: relative;
    .iconback {
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 0.15rem;
      position: absolute;
      top: 1.2267rem;
      left: 0.7867rem;
    }
    .home_title {
      text-align: center;
      margin-top: 2.4rem;
      div {
        text-align: center;
        letter-spacing: 0.0267rem;
        font-size: 0.3733rem;
        line-height: 0.8533rem;
      }
      h5 {
        margin-top: 0.4rem;
        font-size: 0.5067rem;
      }
    }

    .home_info {
      margin-top: 1.3333rem;
      font-size: 0.3733rem;
      // position: relative;
      .home_info_cont {
        width: 2.78rem;
        display: flex;
        height: 0.7733rem;
        line-height: 0.7733rem;
      }
      .hecheng {
        width: 0.96rem;
        height: 0.96rem;
        background-color: #633320;
        border-radius: 50%;
        text-align: center;
        line-height: 0.96rem;
        position: absolute;
        right: 0.4533rem;
        top: 5.6533rem;
        font-size: 0.4rem;
      }
    }
    .home_ing {
      width: 4.08rem;
      height: 4.08rem;
      margin: 0 auto;
      margin-top: 0.6133rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .pgree {
      display: flex;
      justify-content: center;
      margin-top: 0.27rem;
      .van-progress {
        width: 6.24rem;
        height: 0.16rem;
        /deep/ .van-progress__portion {
          background: #633320 !important;
          /deep/ .van-progress__pivot {
            // width:.2rem;
            // height:.2rem;
            // border-radius: 50%;
          }
        }
      }
    }
    .time {
      text-align: center;
      font-size: 0.5333rem;
      margin-top: 0.5733rem;
      color: #612a06;
    }
    .tix {
      // height: .875rem;
      margin-top: 0.9867rem;
      p {
        font-size: 0.32rem;
        text-align: center;
      }
    }

    .back {
      color: white;
      width: 4rem;
      height: 0.7467rem;
      background-color: rgb(99 51 32 / 50%);
      border-radius: 0.2667rem;
      display: flex;
      justify-content: center;
      margin: 0 auto;
      margin-top: 1.1733rem;

      div {
        width: 3.4667rem;
        height: 0.7467rem;
        line-height: 0.7467rem;
        text-align: center;
        background-color: rgb(99 51 32 / 80%);
        // opacity: 0.5;
        border-radius: 0.2667rem;
        letter-spacing: 0.0267rem;
      }
    }
    .success {
      .van-popup {
        width: 8rem;
        height: 9.7333rem;
        border-radius: 0.2rem;
        // box-shadow: 5px 5px 5px #5d5b5b;
        background: url("./../../assets/scbc.jpg") no-repeat;
        background-size: 100% 100%;
        // background-attachment: fixed;
        .dialog_title {
          margin-top: 1.5333rem;
          text-align: center;
          span {
            padding: 0.16rem 1.8667rem;
            height: 0.7867rem;
            line-height: 0.7867rem;
            // line-height: 0.28rem;
            border-radius: 0.24rem;
            // margin: 0 auto;
            // margin-top: 1.8933rem;
            // margin-bottom: 0.575rem;
            font-size: 0.4533rem;
            // text-align: center;
            letter-spacing: 0.04rem;
          }
        }
        // .dialog_line {
        //   width: 2.34rem;
        //   height: 0.02rem;
        //   margin: 0 auto;
        //   background-color: #d7baa7;
        //   margin-top: 0.22rem;
        // }
        .dialog_info {
          width: 2.255rem;
          height: 0.48rem;
          color: #69320f;
          margin: 0 auto;
          margin-top: 0.21rem;
          .dialog_info_cont {
            height: 0.24rem;
            line-height: 0.24rem;
            display: flex;
            p {
              margin-left: 0.08rem;
              font-size: 0.14rem;
            }
            span {
              font-size: 0.14rem;
            }
          }
        }
        .dialog_img {
          width: 2.4rem;
          height: 1.115rem;
          background-color: #e17e3a;
          margin: 0 auto;
          margin-top: 0.2rem;
        }
        .dialog_tis {
          line-height: 0.5867rem;
          margin: 0 auto;
          color: #a76940;
          letter-spacing: 0.0267rem;
          // margin-top: 0.1rem;
          font-size: 0.12rem;
          text-align: center;
        }
        .dialog_huodong {
          width: 2.3rem;
          height: 0.22rem;
          line-height: 0.22rem;
          margin: 0 auto;
          margin-top: 0.15rem;
          // text-align: center;
          // margin-left: .26rem;
          color: #a76940;
          letter-spacing: 0.005rem;
          // margin-top: 0.1rem;
          font-size: 0.12rem;
          display: flex;
        }
        .dialog_back {
          color: white;
          font-size: 0.16rem;
          width: 4rem;
          height: 0.7467rem;
          background-color: rgb(99 51 32 / 50%);
          border-radius: 0.2667rem;
          display: flex;
          justify-content: center;
          margin: 0 auto;
          margin-top: 1.6267rem;
          div {
            width: 3.4667rem;
            height: 0.7467rem;
            line-height: 0.7467rem;
            text-align: center;
            background-color: rgb(99 51 32 / 80%);
            // opacity: 0.5;
            border-radius: 0.2667rem;
            letter-spacing: 0.0267rem;
          }
        }
      }
      /deep/ .van-overlay {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
    .dhsuccess {
      .van-popup {
        width: 8.0533rem;
        height: 9.76rem;
        border-radius: 0.2rem;
        // box-shadow: 5px 5px 5px #5d5b5b;
        background: url("./../../assets/scbc.jpg") no-repeat;
        background-size: 100% 100%;
        .dialog_title {
          margin-top: 1.8667rem;
          text-align: center;
          span {
            padding: 0.16rem 1.8667rem;
            // line-height: 0.28rem;
            border-radius: 0.24rem;
            // margin: 0 auto;
            background-color: #633320;
            // margin-top: 1.8933rem;
            // margin-bottom: 0.575rem;
            font-size: 0.4533rem;
            // text-align: center;
            letter-spacing: 0.04rem;
          }
        }
        .word {
          margin-top: 1.7067rem;
          color: #69320f;
          .word_left {
            display: flex;
            justify-content: center;
            line-height: 0.56rem;
            font-size: 0.3733rem;
          }
          .word_right {
            display: flex;
            justify-content: center;
            line-height: 0.56rem;
            font-size: 0.3733rem;
          }
          h1 {
            margin-top: 0.2133rem;
            text-align: center;
            font-size: 0.48rem;
          }
        }
        .dialog_btn {
          display: flex;
          justify-content: space-between;
          margin-top: 2.0533rem;
          .dialog_back {
            color: white;
            font-size: 0.16rem;
            width: 2.9067rem;
            height: 0.5333rem;
            background-color: rgb(99 51 32 / 50%);
            border-radius: 0.2667rem;
            display: flex;
            justify-content: center;
            margin: 0 auto;
            div {
              width: 2.5067rem;
              height: 0.5333rem;
              line-height: 0.5333rem;
              text-align: center;
              background-color: rgb(99 51 32 / 80%);
              border-radius: 0.2667rem;
              letter-spacing: 0.0267rem;
            }
          }
        }
      }
    }
    .timedialog {
      .van-popup {
        width: 8.0533rem;
        height: 9.76rem;
        border-radius: 0.2rem;
        // box-shadow: 5px 5px 5px #5d5b5b;
        background: url("./../../assets/scbc.jpg") no-repeat;
        background-size: 100% 100%;
        .dialog_title {
          margin-top: 1.8667rem;
          text-align: center;
          span {
            padding: 0.16rem 1.8667rem;
            // line-height: 0.28rem;
            border-radius: 0.24rem;
            // margin: 0 auto;
            background-color: #633320;
            // margin-top: 1.8933rem;
            // margin-bottom: 0.575rem;
            font-size: 0.4533rem;
            // text-align: center;
            letter-spacing: 0.04rem;
          }
        }
        .word {
          margin-top: 1.7067rem;
          color: #69320f;
          .word_left {
            display: flex;
            justify-content: center;
            line-height: 0.56rem;
            font-size: 0.3733rem;
          }
          .word_right {
            display: flex;
            justify-content: center;
            line-height: 0.56rem;
            font-size: 0.48rem;
          }
        }
        .dialog_back {
          color: white;
          font-size: 0.16rem;
          width: 4rem;
          height: 0.7467rem;
          background-color: rgb(99 51 32 / 50%);
          border-radius: 0.2667rem;
          display: flex;
          justify-content: center;
          margin: 0 auto;
          margin-top: 2.0533rem;
          div {
            width: 3.4667rem;
            height: 0.7467rem;
            line-height: 0.7467rem;
            text-align: center;
            background-color: rgb(99 51 32 / 80%);
            border-radius: 0.2667rem;
            letter-spacing: 0.0267rem;
          }
        }
      }
    }
  }
}
</style>