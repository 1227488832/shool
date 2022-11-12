const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const AliyunOSSPlugin = require("aliyun-oss-webpack-plugin")

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        // target: 'https://aip.baidubce.com/rest/2.0/ocr/v1',
        secure: false,
        target: 'https://ad.wfsidao.com',
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/api': ''
        }
      },
      // '/alioss': {
      //   // target: 'https://aip.baidubce.com/rest/2.0/ocr/v1',
      //   secure: false,
      //   target: "https://wf2022.oss-accelerate.aliyuncs.com",
      //   changeOrigin: true, //是否跨域
      //   pathRewrite: {
      //     '^/alioss': ''
      //   }
      // }
    },
  }
})
