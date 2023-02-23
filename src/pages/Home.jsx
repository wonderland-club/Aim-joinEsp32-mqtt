import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import { url } from "../esp32api";
import { useState, useEffect, useRef, useCallback } from "react";
import mqtt from "mqtt";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Zoom from "@mui/material/Zoom";
import {
  First_car_router,
  Second_car_router,
  Third_car_router,
  Fourth_car_router,
} from "../route-constants";

import {
  LonganCore1,
  LonganCore2,
  LonganCore3,
  LonganCore4,
} from "../esp32api";

// 主题
const passage = [
  LonganCore1.passage,
  LonganCore2.passage,
  LonganCore3.passage,
  LonganCore4.passage,
];

// 路由
const routerLink = [
  First_car_router,
  Second_car_router,
  Third_car_router,
  Fourth_car_router,
];

let time = null;
let isClick = false;

const Home = () => {
  const navigate = useNavigate();

  // 等待设备响应
  const [openBackground, setOpenBackground] = React.useState(false);
  const BackgroundClose = () => {
    setOpenBackground(false);
  };
  const BackgroundDisplay = () => {
    setOpenBackground(true);
  };

  const [client, setClient] = useState(null);
  const [router_to_, set_router_to_] = useState("");

  const [open, setOpen] = React.useState(false); // 控制 提示的开关
  const [transition, setTransition] = React.useState(undefined); //过度动画

  let Machines = "";
  const machinesArr = ["该机器被使用中,请稍后再试...", "该机器电量不足..."];

  const TransitionDown = (value) => {
    return <Slide {...value} direction="down" message={Machines} />;
  };

  // 设备异常提示
  const handleClick = (Transition) => {
    setOpen(true);
    setTransition(() => Transition);
  };

  // 设备异常提示
  const handleClose = () => {
    setOpen(false);
  };

  // 初始化MQTT
  useEffect(() => {
    const newClient = mqtt.connect(url);
    setClient(newClient);
  }, []);

  // 点击订阅主题
  const handleSubscribe = (topic) => {
    BackgroundDisplay();
    isClick = true;
    console.log("true_isclick", isClick);

    client.subscribe(topic, (err) => {
      if (!err) {
        client.publish(topic, "Request");
        // 如果倒计时结束，无回应将会判定该设备没电
        time = setTimeout(() => {
          isClick = false;
          console.log("null_isclick", isClick);
          BackgroundClose();
          Machines = machinesArr[1];
          handleClick(TransitionDown);
        }, 4000);
      }
    });
  };

  // 收到的消息
  const handleReceiveMessage = (topic, message) => {
    const str = message.toString();
    console.log("接收到的消息", str, isClick);
    if (isClick == true) {
      if (str == "Ok") {
        BackgroundClose();
        clearTimeout(time);
        isClick = false;
        console.log("ok_isClick", isClick);
        set_router_to_((preState) => {
          sessionStorage.setItem("myData", JSON.stringify({ name: preState }));
          navigate(preState);
          return preState;
        });
      } else if (str == "Error") {
        BackgroundClose();
        clearTimeout(time);
        Machines = machinesArr[0];
        handleClick(TransitionDown);
        isClick = false;
        console.log("error_isClick", isClick);
      }
    }
  };

  // client 如果变动 说明发送或者接收了消息
  useEffect(() => {
    if (!client) {
      return;
    }
    client.on("message", handleReceiveMessage);
    return () => {
      client.off("message", handleReceiveMessage);
    };
  }, [client]);

  return (
    <>
      <Box sx={{ height: "100vh", alignItems: "center", display: "flex" }}>
        <Grid container sx={{ width: "100%" }}>
          <Grid sx={{ height: 80 }} xs={12} sm={5}>
            <h1>Elite ESP32 Car</h1>
          </Grid>

          {/* 选择车辆 */}
          <Grid container xs={12} sm={7}>
            {routerLink.map((item, index) => {
              return (
                <Zoom
                  key={index}
                  in={true}
                  style={{ transitionDelay: true ? index * 200 + "ms" : "0ms" }}
                >
                  <Grid
                    xs={6}
                    onClick={() => {
                      set_router_to_(item);
                      handleSubscribe(passage[index]);
                    }}
                  >
                    <Box
                      sx={{
                        transformOrigin: "0 0 0",
                        background: "lightcoral",
                        borderRadius: "16px",
                        margin: 1,
                        display: "flex",
                        alignContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "40vh",
                      }}
                    >
                      <Box>
                        <DirectionsCarRoundedIcon sx={{ fontSize: 40 }} />
                      </Box>
                      <Box>
                        {item}:{index + 1}
                      </Box>
                    </Box>
                  </Grid>
                </Zoom>
              );
            })}
          </Grid>
        </Grid>
      </Box>
      {/* 等待 背景  */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackground}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* 消息弹出提示框 */}
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message="I love snacks"
        key={transition ? transition.name : ""}
      />
    </>
  );
};

export default Home;
