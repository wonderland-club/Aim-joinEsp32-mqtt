// import { blue, blueApi, green, greenApi } from "./esp32api";
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  // /blue 表示代理路径
  //target 表示目标服务器的地址

  //   green
  app.use(
    "/green",
    createProxyMiddleware({
      target: "http://10.0.0.109:80",
      // 跨域时一般都设置该值 为 true
      changeOrigin: true,
    })
  );

  //   blue
  app.use(
    "/blue",
    createProxyMiddleware({
      // http://localhost:4000/ 地址只是示例，实际地址以项目为准
      target: "http://10.0.0.111:80",
      // 跨域时一般都设置该值 为 true
      changeOrigin: true,
      // 重写接口路由
      // pathRewrite: {
      //     '^/admin': '',// 这样处理后，最终得到的接口路径为： http://localhost:8080/xxx
      // }
    })
  );
};
