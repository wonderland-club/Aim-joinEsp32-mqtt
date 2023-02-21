# React + MQTT + ESP32  实现低延迟多人操控不同的 ESP32 Car

<u>功能</u>

- 上下左右轮盘（可实现xy坐标精准控制四轮ESP32Car偏移移动）
- 可抬起放下陀机
- 收放魔抓

<u>机制</u>

- 每个ESP32只能由一人控制
- 10秒内ESP32Car无操作将会返回主页

<u>快速了解</u>

- 如果在同一台设备上从操纵页面返回主页，如无他人连接，再次进入同一车时可快速进入操作页面
- 如果选择车辆无法进入操作页面，可精准弹窗提示：“该设备正在使用中”、“该设备电量不足”
- 进入操作页面时，会强制用户横屏，如果10秒钟内没有横屏则会强制返回Home页
- ...

<u>主页的显示效果</u>

- ​	用户刚进入主页时，不管是横屏还是竖屏都有着优雅的排版和丝滑的过渡动画
- ...

## 环境

### package.json

```json
"dependencies": {
	"react-scripts": "4.0.3"
}
```



### Node

```basic
//使用 nvm 管理 node 版本，将 node 版本切换到 v16.13.0 可运行此项目

// 下载 v16.13.0
nvm install v16.13.0
// 使用该版本
nvm use v16.13.0
```



### Install

```bash
npm install
```



### start

```bash
npm start
```



###  MQTT test 代码

位置： [./mqtt.sb3](mqtt.sb3)

Codelab 编程平台： https://addon.codelab.club/editor.html



### MQTT Car 代码

位置：./MQTT car.ubp

Elite硬件编程平台：https://blocks.aimaker.space
