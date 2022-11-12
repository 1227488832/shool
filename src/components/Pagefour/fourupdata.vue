<template>
  <div id="fourupdata">
    <div class="home_container">
      <div class="iconback">
        <van-icon name="arrow-left" @click="back" />
      </div>
      <div class="pm" @click="gotopm">排行榜</div>
      <div class="home_title">
        <p>雀巢咖啡，提醒每一天</p>
        <h1>同学，请放下手机运动吧！</h1>
      </div>
      <div class="home_info">
        <div class="home_info_cont">
          <p>我的步数：</p>
          <p>{{ myData.my_step }}</p>
        </div>
        <div class="home_info_cont">
          <p>已连续打卡：</p>
          <p>{{ myData.days }}天</p>
        </div>
      </div>
      <div class="title">示例:</div>
      <div class="uploader">
        <!-- <van-uploader :after-read="afterRead" /> -->
        <img v-if="scanData" :src="scanData" alt="" />
      </div>
      <div class="tix">
        <p>步骤：打开微信运动 - 步数排行榜 - 个人排行</p>
        <p style="font-size: 0.5067rem; margin-top: 0.1333rem">
          截图保存上传图片
        </p>
      </div>
      <div class="tix">
        <p style="font-size: 0.2667rem; line-height: 0.48rem">
          上传成功即可累计步数参加每周排行
        </p>
      </div>
      <div class="back_btn">
        <div class="back">
          <van-uploader :after-read="goto">
            <!-- <van-button icon="plus" type="primary">上传文件</van-button> -->
            <div>上传图片</div>
          </van-uploader>
        </div>
        <div class="back">
          <div @click="submit">提交</div>
        </div>
      </div>

      <van-popup v-model="dialogValue">
        <div class="dialog_tis" style="margin-top: 4.2667rem">
          恭喜您上传成功
        </div>
        <div class="dialog_tis">今日步数已累计添加到每周排名</div>
        <div class="dialog_tis">请在周四查看排行榜信息</div>
        <div class="dialog_back">
          <div>确定</div>
        </div>
      </van-popup>
      <van-loading v-if="loadingData" type="spinner" size="24px"
        >加载中...</van-loading
      >
    </div>
  </div>
</template>
  
  <script>
import {
  GetFourData,
  GetGameupdata,
  getAliOSSConfig,
  GetFourUpdata,
} from "@/api/api";
import axios from "axios";
export default {
  data() {
    return {
      gameId: "",
      gameValue: "",
      dialogValue: false,
      loadingData: false,
      // 个人信息数据
      myData: {
        // 步数
        my_step: "",
        // 连续打卡天数
        days: "",
      },
      // 识别路径
      scanData: "",
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      GetFourData().then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.myData.days = res.data.data.days;
          this.myData.my_step = res.data.data.my_step;
        }
      });
    },
    // 返回
    back() {
      this.$router.push("/pagefour");
    },

    //上传事件
    async goto(file) {
      // this.dialogValue = true;
      console.log(file);
      this.loadingData = true;
      let key = "wUbxngjGDBUEsS-kulRcXh2Jp-9dXkVM";
      let secret = "gxcRJD0wqwVElf2OemeFMLWqLIo9ywNR";
      let image_base64 = file.content;
      let formData = new FormData();
      formData.append("api_key", key);
      formData.append("api_secret", secret);
      formData.append("image_base64", image_base64);
      let scan = await axios({
        url: "https://api-cn.faceplusplus.com/imagepp/v2/generalocr",
        method: "post",
        data: formData,
      });
      if (scan.status == 200) {
        this.loadingData = false;
        
        if (scan.data.text_info[3] == "步数") {
          this.myData.my_step = scan.data.text_info[4];
        }
      }
      let res = await getAliOSSConfig();
      let OSSConfig = res.data.data;
      console.log(res);
      const form = new FormData();
      const filename = file.file.name;
      form.append("name", `${new Date().getTime()}${filename}`);
      form.append("key", OSSConfig.dir + filename);
      form.append("policy", OSSConfig.policy);
      form.append("OSSAccessKeyId", OSSConfig.accessid);
      // form.append("success_action_status", 200);
      form.append("callback", OSSConfig.callback);
      form.append("signature", OSSConfig.signature);
      form.append("file", file.file);
      // console.log(this.file);
      GetGameupdata(OSSConfig.host, form).then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.scanData = image_base64
        }
      });
    },
    // 跳转到排名 页面
    gotopm() {
      this.$router.push("/fourpm");
    },
    // 提交图片信息和步数
    submit() {
      this.loadingData = true;
      var date = new Date();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      month = month > 9 ? month : "0" + month;
      day = day < 10 ? "0" + day : day;
      var today = month + "月" + day +'日';
      console.log(today);
      GetFourUpdata({
        // 时间
        date_str: today,
        // 步数
        step_num: this.myData.my_step,
        // 图片地址
        img_uri: this.scanData,
      }).then((res) => {
        console.log(res);
        this.loadingData = false;
        if(res.data.status == 200){
          this.dialogValue = false
        }else{
          this.Toast(res.data.msg)
        }
      });
    },
  },
};
</script>
  
  <style lang="less" scoped>
a {
  margin-top: 0.2667rem;
}
#fourupdata {
  overflow: auto;
  background: url("./../../assets/fivebc.jpg") no-repeat;
  background-size: 100% 100%;
  background-attachment: scroll;
  width: 100%;
  height: 100%;
  .home_container {
    width: 7.3333rem;
    margin: 0 auto;
    font-size: 0.12rem;
    color: white;
    .van-loading {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      // van-loading__spinner
      .van-loading__spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
      }
      .van-loading__text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        padding-top: 2.3333rem;
        color: white;
      }
    }
    .pm {
      position: absolute;
      right: 0.56rem;
      top: 4.24rem;
      border-radius: 0.2667rem;
      width: 2.0667rem;
      height: 0.7733rem;
      background-color: #633320;
      text-align: center;
      line-height: 0.7733rem;
      font-size: 0.4533rem;
    }
    .iconback {
      width: 0.3rem;
      height: 0.3rem;
      position: absolute;
      top: 1.2267rem;
      left: 0.7867rem;
    }
    .home_title {
      margin-top: 1.0133rem;
      text-align: center;
      p {
        // width: 2.89rem;
        line-height: 0.8533rem;
        font-size: 0.4rem;
        text-align: center;
        letter-spacing: 0.0267rem;
      }
      h1 {
        font-size: 0.5333rem;
        text-align: center;
        letter-spacing: 0.0267rem;
      }
    }
    .title {
      line-height: 1.12rem;
      font-size: 0.4267rem;
      letter-spacing: 0.0267rem;
    }
    .home_info {
      margin-top: 1.0267rem;
      .home_info_cont {
        display: flex;
        font-size: 0.4rem;
        line-height: 0.64rem;
      }
    }
    .uploader {
      //   margin: 0 auto;
      width: 7.0533rem;
      height: 6.3467rem;
      margin: 0 auto;
      background-color: white;
      img {
        width: 100%;
        height: 100%;
      }
      .van-uploader {
        width: 7.0667rem;
        height: 6.3467rem;
        /deep/ .van-uploader__wrapper {
          // width: 2.645rem;
          // height: 2.39rem;
          height: 100%;
          /deep/ .van-uploader__upload {
            width: 100%;
            height: 100%;
            margin: 0;
          }
        }
      }
    }
    .tix {
      // height: .875rem;
      margin-top: 0.32rem;
      p {
        // height: 0.17rem;
        // line-height: 0.17rem;
        font-size: 0.3733rem;
        text-align: center;
      }
    }
    .back_btn {
      display: flex;
      justify-content: space-between;
      .back {
        color: white;
        width: 2.9067rem;
        height: 0.5333rem;
        background-color: rgb(99 51 32 / 50%);
        border-radius: 0.2667rem;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        margin-top: 0.7733rem;
        div {
          width: 2.5067rem;
          height: 0.5333rem;
          line-height: 0.5333rem;
          text-align: center;
          background-color: rgb(99 51 32 / 80%);
          border-radius: 0.2667rem;
          letter-spacing: 0.0267rem;
          font-size: 0.3733rem;
        }
      }
    }

    .van-popup {
      width: 8rem;
      height: 9.8667rem;
      border-radius: 0.2rem;
      background: url("./../../assets/fourdialog.jpg") no-repeat;
      background-size: 100% 100%;
      .dialog_title {
        width: 2.25rem;
        height: 0.28rem;
        line-height: 0.28rem;
        border-radius: 0.14rem;
        margin: 0 auto;
        background-color: #633320;
        margin-top: 0.12rem;
        font-size: 0.14rem;
        text-align: center;

        letter-spacing: 0.01rem;
      }
      .dialog_line {
        width: 2.34rem;
        height: 0.02rem;
        margin: 0 auto;
        background-color: #d7baa7;
        margin-top: 0.22rem;
      }
      .dialog_info {
        width: 2.255rem;
        height: 0.48rem;
        color: #69320f;
        margin: 0 auto;
        margin-top: 1.65rem;
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
        height: 1.165rem;
        background-color: #e17e3a;
        margin: 0 auto;
        margin-top: 0.2rem;
      }
      .dialog_tis {
        text-align: center;
        line-height: 0.56rem;
        color: #6b310a;
        letter-spacing: 0.0267rem;
        font-size: 0.3733rem;
        // zoom: 0.8;
      }
      .dialog_back {
        color: white;
        width: 4rem;
        height: 0.7467rem;
        background-color: rgb(212, 168, 142);
        border-radius: 0.2667rem;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        font-size: 0.4267rem;
        margin-top: 0.9067rem;
        div {
          width: 3.4667rem;
          height: 0.7467rem;
          line-height: 0.7467rem;
          text-align: center;
          background-color: rgb(106, 48, 27);
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
}
</style>