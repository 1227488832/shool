<template>
  <div id="updata">
    <div class="home_container">
      <div class="iconback">
        <van-icon name="arrow-left" @click="back" />
      </div>
      <div class="home_title">
        <div class="line"></div>
        <div>雀巢咖啡，提醒每一天</div>
        <div class="line"></div>
      </div>
      <div class="title">上传游戏信息</div>
      <div class="home_form">
        <van-field v-model="userForm.gameId" label="游戏ID:" />
        <van-field v-model="userForm.gameValue" label="游戏段位:" />
      </div>
      <div class="uploader">
        <van-uploader :after-read="afterRead"  v-if="!loadimg" >
          <div class="upload-bg"></div>
          <div class="updatabtn">上传游戏截图</div>
        </van-uploader>
        <div class="uploader_img" v-else>
          <img :src="loadimg" alt="" />
        </div>
        <!-- <input type="file" @change="afterRead($event)" > -->
        <!-- <input  @change="afterRead($event)" class="layer pic_add1" type="file" accept="image" /> -->
      </div>

      <div class="tix">
        <p>每位ID限量只能领取一次奖励！重复领取无效</p>
        <p>最终解释权归现场活动人员所有</p>
      </div>
      <div class="back" style="margin-bottom: 0.2rem">
        <div @click="goto">确认上传</div>
      </div>
      <van-popup v-model="dialogValue">
        <div class="dialog_info">
          <div class="dialog_info_cont">
            <p>您的游戏ID:</p>
            <span>哈哈哈</span>
          </div>
          <div class="dialog_info_cont">
            <p>您的游戏段位:</p>
            <span>哈哈哈</span>
          </div>
        </div>
        <div class="dialog_img">
          <img :src="loadimg" alt="">
        </div>
        <div class="dialog_tis">请将此页面出示给现场工作人员兑换奖品！</div>
        <div class="dialog_back">
          <div @click="confirm">确定</div>
        </div>
      </van-popup>
      <van-loading v-if="!loadingData" type="spinner" size="24px"
        >加载中...</van-loading
      >
    </div>
  </div>
</template>

<script>
import { GetGameupdata, getAliOSSConfig, GetGameData } from "@/api/api";
import axios from "axios";
export default {
  data() {
    return {
      userForm: {
        gameId: "",
        gameValue: "",
      },
      dialogValue: false,
      updataimg: {
        //图片base
        cont: "",
        // 图片名字
        name: "",
        //图片地址
        lastModified: "",
      },
      picdata: {
        recognize_id: "",
        recognize_level: "",
        img_uri: "",
      },
      file: null,
      // 是否加载完
      loadingData: true,
      // 加载完成显示图
      loadimg:false

    };
  },
  methods: {
    // 返回
    back() {
      this.$router.push("/pagefive");
    },
    //上传触发事件
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.loadingData = false;
      console.log(file);
      this.file = file;
      // this.updataimg = file.content
      this.updataimg.lastModified = file.file.type;
      this.updataimg.cont = file.content;
      let key = "wUbxngjGDBUEsS-kulRcXh2Jp-9dXkVM";
      let secret = "gxcRJD0wqwVElf2OemeFMLWqLIo9ywNR";
      let image_base64 = file.content;
      let formData = new FormData();
      formData.append("api_key", key);
      formData.append("api_secret", secret);
      formData.append("image_base64", image_base64);
      axios({
        url: "https://api-cn.faceplusplus.com/imagepp/v2/generalocr",
        method: "post",
        data: formData,
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.loadimg =  this.updataimg.cont
          this.loadingData = true;
          let data = res.data.text_info;
          console.log(data);
          let index = data[data.length - 5].line_content.indexOf("我的排名");
          if (index == 0) {
            console.log(data[data.length - 4].line_content);
            console.log(data[data.length - 1].line_content);
            let dw = data[data.length - 1].line_content;

            var name = dw;
            var reg = /[\u4e00-\u9fa5]/g;
            var names = name.match(reg);
            name = names.join("");
            console.log(name);
            //游戏段位（识别）
            this.picdata.recognize_level = name;
            //游戏id（识别）
            this.picdata.recognize_id = res.data.request_id;
          }
        }
      });
    },
    confirm() {
      this.dialogValue = false;
    },
    //上传事件
    async goto(data) {
      console.log(data);
      this.loadingData = false
      if (this.userForm.gameId == "") {
        this.Toast("请输入游戏ID");
        this.loadingData = true
        return;
      }
      if (this.userForm.gameValue == "") {
        this.Toast("请输入段位");
        this.loadingData = true
        return;
      }
      if (this.picdata.recognize_id == "") {
        this.Toast("请先上传图片");
        this.loadingData = true
        return;
      }
      let res = await getAliOSSConfig();
      let OSSConfig = res.data.data;
      console.log(OSSConfig);
      const form = new FormData();
      const filename = this.file.file.name;
      form.append("name", `${new Date().getTime()}${filename}`);
      form.append("key", OSSConfig.dir + filename);
      form.append("policy", OSSConfig.policy);
      form.append("OSSAccessKeyId", OSSConfig.accessid);
      // form.append("success_action_status", 200);
      form.append("callback", OSSConfig.callback);
      form.append("signature", OSSConfig.signature);
      form.append("file", this.file.file);
      console.log(this.file);
      const result = await GetGameupdata(OSSConfig.host, form).then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.picdata.img_uri = res.data.data.filename;
        }
      });
      GetGameData({
        game_id: this.userForm.gameId,
        game_level: this.userForm.gameValue,
        recognize_id: this.picdata.recognize_id,
        recognize_level: this.picdata.recognize_level,
        img_uri: this.picdata.img_uri,
      }).then((res) => {
        console.log(res);
        this.loadingData = true
        if (res.data.status == 200) {
          this.dialogValue = true;
        }else{
          this.Toast(res.data.msg)
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
#updata {
  overflow: auto;
  background: url("./../../assets/fivebc.jpg") no-repeat;
  background-size: 100% 100%;
  background-attachment: scroll;
  min-height: 100%;
  position: relative;
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
  .home_container {
    width: 7.3333rem;
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
      margin-top: 1.92rem;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      .line {
        width: 1.4rem;
        height: 0.02rem;
        background-color: #fff;
      }
      div {
        width: 5rem;
        font-size: 0.4267rem;
        text-align: center;
        letter-spacing: 0.0267rem;
        padding: 0 0.1333rem;
      }
    }
    .title {
      line-height: 2.0933rem;
      text-align: center;
      letter-spacing: 0.0267rem;
      font-size: 0.4533rem;
    }
    .home_form {
      .van-cell::after {
        border-bottom: none;
      }
      .van-cell {
        background-color: transparent;
        height: 0.88rem;
        padding: 0 !important;
        /deep/ .van-cell__title {
          margin-right: 0;
          span {
            color: white;

            line-height: 0.25rem;
            letter-spacing: 0.02rem;
          }
        }
        /deep/ .van-cell__value {
          width: 4.2933rem;
          height: 0.6667rem;
          background-color: #fff;
          border-radius: 0.2667rem;
          -webkit-box-flex: 0;
          -webkit-flex: 0;
          flex: 0;
          .van-field__body {
            width: 5.2267rem;
            height: 0.6667rem;
            .van-field__control {
              // width: 100%;
              padding-left: 0.1rem;
            }
          }
        }
      }
    }
    .uploader {
      //   margin: 0 auto;
      display: flex;
      justify-content: center;
      .uploader_img {
        width: 7.3333rem;
        height: 4.48rem;
        margin: 0;
        margin-top: 1.0667rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      // .van-uploader {
      //   width: 7.3333rem;
      //   height: 4.48rem;
      //   margin-top: 1.0667rem;
      //   /deep/ .van-uploader__wrapper {
      //     /deep/ .van-uploader__upload {
      //       width: 7.3333rem;
      //       height: 4.48rem;
      //       margin: 0;
      //     }
      //   }
      // }
      .van-uploader {
        width: 7.3333rem;
        // height: 4.48rem;
        margin-top: 1.0667rem;
        /deep/ .van-uploader__wrapper {
          .upload-bg {
            width: 7.3333rem;
            height: 4.48rem;
            margin: 0;
            background: #fff;
          }
          /deep/ .van-uploader__input {
          }
        }
      }
    }

    .updatabtn {
      width: 2.5333rem;
      height: 0.56rem;
      line-height: 0.56rem;
      text-align: center;
      margin: 0 auto;
      margin-top: 0.4267rem;
      background-color: rgb(38 23 23 / 70%);
      font-size: 0.3467rem;
      border-radius: 0.2667rem;
    }
    .tix {
      // height: .875rem;
      margin-top: 0.6667rem;
      p {
        height: 0.4667rem;
        line-height: 0.4667rem;
        font-size: 0.32rem;
        text-align: center;
      }
    }
    .back {
      color: white;
      width: 4rem;
      height: 0.7733rem;
      background-color: rgb(99 51 32 / 50%);
      border-radius: 0.2667rem;
      display: flex;
      justify-content: center;
      margin: 0 auto;
      margin-top: 0.9067rem;
      margin-bottom: 2.1333rem;
      div {
        width: 3.4933rem;
        height: 0.7733rem;
        line-height: 0.7733rem;
        text-align: center;
        background-color: rgb(99 51 32 / 80%);
        border-radius: 0.2667rem;
        letter-spacing: 0.0267rem;
        font-size: 0.4533rem;
      }
    }
    .van-popup {
      width: 8rem;
      height: 12.16rem;
      border-radius: 0.2667rem;
      // box-shadow: 5px 5px 5px #5d5b5b;
      background: url("./../../assets/updatadialog.jpg") no-repeat;
      background-size: 100% 100%;
      .dialog_title {
        width: 6.4rem;
        line-height: 0.6667rem;
        margin: 0 auto;
        background-color: #633320;
        margin-top: 3.8133rem;
        font-size: 0.4rem;
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
        width: 6.4rem;
        line-height: 0.6667rem;
        color: #69320f;
        margin: 0 auto;
        margin-top: 3.8133rem;
        .dialog_info_cont {
          line-height: 0.6667rem;
          display: flex;
          p {
            margin-left: 0.1867rem;
            font-size: 0.4rem;
          }
          span {
            font-size: 0.4rem;
          }
        }
      }
      .dialog_img {
        width: 6.4rem;
        height: 3rem;
        background-color: #e17e3a;
        margin: 0 auto;
        margin-top: 0.5067rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .dialog_tis {
        text-align: center;
        color: #a76940;
        // letter-spacing: ;
        margin-top: 0.48rem;
        font-size: 0.32rem;
        // zoom: 0.8;
      }
      .dialog_back {
        color: white;
        width: 4rem;
        height: 0.7467rem;
        background-color: rgb(99 51 32 / 50%);
        border-radius: 0.2667rem;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        margin-top: 0.8267rem;
        font-size: 0.48rem;
        div {
          width: 3.4933rem;
          height: 0.7467rem;
          line-height: 0.7467rem;
          text-align: center;
          background-color: rgb(99 51 32 / 80%);
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