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

  const [openBackground, setOpenBackground] = React.useState(false);
  const BackgroundClose = () => {
    setOpenBackground(false);
  };
  const BackgroundDisplay = () => {
    setOpenBackground(true);
  };

  const [client, setClient] = useState(null);
  const [router_to_, set_outer_to_] = useState("");

  const [open, setOpen] = React.useState(false); // 控制 提示的开关
  const [transition, setTransition] = React.useState(undefined); //过度动画

  // const [Machines, setMachines] = useState(""); //设备状态
  let Machines = "";
  const machinesArr = ["该机器被使用中,请稍后再试...", "该机器没电了..."];

  const TransitionDown = (value) => {
    return <Slide {...value} direction="down" message={Machines} />;
  };

  // 打开提示
  const handleClick = (Transition) => {
    setOpen(true);
    setTransition(() => Transition);
  };

  // 关闭提示
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
        }, 5000);
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
        set_outer_to_((preState) => {
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
      <Box sx={contents}>
        <Box>
          <h1>Elite ESP32 Car</h1>
          <h3>{router_to_}</h3>
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
        {/* 选择车辆 */}
        <Grid sx={{ width: "60%" }} container>
          {routerLink.map((item, index) => {
            return (
              <Grid
                sx={{
                  background: "lightcoral",
                  borderRadius: "16px",
                  margin: 1,
                  display: "flex",
                  alignContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                xs={5}
                key={index}
                onClick={() => {
                  set_outer_to_(item);
                  handleSubscribe(passage[index]);
                }}
              >
                <Box>
                  <DirectionsCarRoundedIcon sx={{ fontSize: 40 }} />
                </Box>
                <Box>{item}</Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default Home;

const contents = {
  height: "80vh",
  display: "flex",
  justifyContent: "space-between",
};
