import axios from "axios";

const instance = axios.create({
  // baseURL: '',
  timeout: 10000,
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // console.log(config.headers['Authorization']);
  // 在发送请求之前做些什么
  config.headers.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7Im9wZW5pZCI6Im9rZ3dBdUFXcDVvcDdYQ1NWU19vLUZtTWRlYk0iLCJvcmlnaW4iOiJxdWVfY2hhbyIsInRpbWVTdGFtcCI6MTY2NzkxOTM0NX0sImlzcyI6Imh0dHBzOlwvXC9hZC53ZnNpZGFvLmNvbSIsImF1ZCI6Im1yLWtvbmciLCJpYXQiOjE2Njc5MTkzNDUsIm5iZiI6MTY2NzkxOTM0NSwiZXhwIjoxNjcwNTExMzQ1fQ.kcum7MkFe_u2k2qp40VJC1TyRm5cFQAh0xVN0PVTabc'
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default instance