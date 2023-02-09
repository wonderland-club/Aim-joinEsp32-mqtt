# React

## 下载

```bash
npm install
```

## 启动

```bash
npm start
```



## src中的 setupProxy.js 为代理esp32文件

```js
  //green 表示代理路径
  //target 表示目标服务器的地址

  app.use(
    "/green",
    createProxyMiddleware({
    
    	//esp32的ip地址，服务器端口默认为80
      target: "http://10.0.0.109:80",
      
      // 跨域时一般都设置该值 为 true
      changeOrigin: true,
      
    })
  );
```



## 在src/pages/Home.jsx 中 使用fetch 给esp32发送请求

```jsx

  const left_top = () => {
    fetch("green/lighton");
  };

  const left_bottom = () => {
    fetch("blue/lighton");
  };

  const left_left = () => {
    fetch("green/lightoff");
  };

  const left_right = () => {
    fetch("blue/lightoff");
  };
```



## 内网穿透

使用 NATAPP 将本地服务 (localhost:3000 )进行内网穿透

NATAPP：https://natapp.cn/
