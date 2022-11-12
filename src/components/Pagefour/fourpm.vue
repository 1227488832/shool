<template>
  <div id="fourpm">
    <div class="home_container">
      <div class="iconback" @click="iconback">
        <van-icon name="arrow-left" />
      </div>
      <div class="home_title">
        <div>排行榜</div>
      </div>
      <div class="home_bt">
        <div class="bt_left">排名</div>
        <div class="bt_center">昵称</div>
        <div class="bt_right">步数</div>
      </div>
      <div class="home_bt_cont">
        <div class="cont" v-for="(item,index) in getList.data" :key="index">
          <div class="cont_left"></div>
          <!-- <div class="cont_center">{{item.wxInfo.nickname}}</div> -->
          <div class="cont_right">{{item.total_step}}</div>
        </div>
      </div>
      <div class="home_footer">
        <div class="home_my">我的</div>
        <div class="cont">
          <div class="cont_left">{{myData.sort}}</div>
          <div class="cont_center">花开富贵</div>
          <div class="cont_right">{{myData.total_step}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { GetFourRanking } from "@/api/api";
export default {
  name: "HomeView",
  data(){
    return {
      myData:{
        // 微信步数
        total_step:'',
        // 排名
        sort:'',
        // 名字
        nickname:''
      },
      getList:[]
    }
  },
  components: {},
  mounted(){
    this.getData();
  },
  methods: {
    // 获取排行榜数据
    getData(){
      GetFourRanking().then(res=>{
        console.log(res);
        if(res.data.status == 200){
          console.log(res.data.data.my.total_step);
          this.myData.total_step = res.data.data.my.total_step
          if(res.data.data.my.sort == null) return this.myData.sort = '暂未参加排名'
          this.myData.sort = res.data.data.my.sort
          this.getList = res.data.data.list
          this.myData = res.data.data.userInfo.nickname
        }
      })
    },
    // 返回
    iconback() {
      this.$router.push("/fourupdata");
    },
  },
};
</script>
  <style lang="less" scoped>
a {
  margin-top: 0.2933rem;
}
#fourpm {
  overflow: auto;
  background: url("./../../assets/fivebc.jpg") no-repeat;
  background-size: 100% 100%;
  background-attachment: scroll;
  min-height: 100%;
  position: relative;
  .home_container {
    // width: 7.9733rem;
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
        font-size: 0.3733rem;
        text-align: center;
        background-color: rgb(99 51 32 / 80%);
        // opacity: 0.5;
        border-radius: 0.2667rem;
        letter-spacing: 0.01rem;
      }
    }
    .home_bt {
      margin: 0 auto;
      margin-top: 0.4933rem;
      width: 9.04rem;
      line-height: 0.6933rem;
      display: flex;
      font-size: 0.5067rem;
      .bt_left {
        width: 2.3333rem;
        padding-left: 0.3733rem;
      }
      .bt_center {
        width: 4.7467rem;
        padding-left: 0.44rem;
      }
      .bt_right {
        width: 1.9867rem;
        padding-left: 0.3733rem;
      }
    }
    .home_bt_cont {
      width: 9.04rem;
      height: 11.92rem;
      border-radius: 0.2667rem;
      background-color: #ffffff;
      margin: 0 auto;
      margin-top: 0.2133rem;
      .cont {
        margin: 0 auto;
        width: 8.1333rem;
        line-height: 1.16rem;
        height: 1.16rem;
        font-size: 0.4533rem;
        color: #633320;
        display: flex;
        border-bottom: 0.0133rem solid #c7b5af;
        .cont_left {
          width: 1.8533rem;
          padding-left: 0.2rem;
        }
        .cont_center {
          width: 4.7467rem;
        }
        .cont_right {
          width: 1.56rem;
        }
      }
    }
    .home_footer {
      width: 100%;
      height: 1.9733rem;
      background: url("./../../assets/phbottom.jpg") no-repeat;
      background-size: 100% 100%;
      position: fixed;
      bottom: 0;
      .home_my {
        position: absolute;
        left: 0.6667rem;
        top: -0.4133rem;
        width: 1.3333rem;
        height: 1.3333rem;
        border-radius: 50%;
        background-color: #633320;
        text-align: center;
        line-height: 1.3333rem;
        font-size: 0.48rem;
      }
      .cont {
        margin: 0 auto;
        width: 8.1333rem;
        line-height: 1.16rem;
        height: 1.16rem;
        font-size: 0.4533rem;
        color: #ffffff;
        display: flex;
        margin-top: .76rem;
        .cont_left {
          width: 1.8533rem;
          padding-left: 0.2rem;
        }
        .cont_center {
          width: 4.7467rem;
        }
        .cont_right {
          width: 1.56rem;
        }
      }
    }
  }
}
</style>