import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import { url } from "../esp32api";
import { useState, useEffect, useRef } from "react";
import mqtt from "mqtt";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

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

const Home = () => {
  const navigate = useNavigate();

  const [client, setClient] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [router_to_, set_outer_to_] = useState("");

  const [open, setOpen] = React.useState(false); // 控制 提示的开关
  const [transition, setTransition] = React.useState(undefined); //过度动画

  const TransitionDown = (value) => {
    return <Slide {...value} direction="down" message="该机器被使用中" />;
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
    client.subscribe(topic, (err) => {
      if (!err) {
        client.publish(topic, "Request");
        setSelectedTopic(topic);
        console.log(`Subscribed to ${topic}`);
      }
    });
  };

  // 收到的消息
  const handleReceiveMessage = (topic, message) => {
    if (message.toString() == "ok") {
      // !!!!!
      console.log("router_to_", router_to_);
      // navigate(router_to_);

      // set_outer_to_((preState) => {
      //   navigate(preState);
      // });
    } else if (message.toString() == "error") {
      console.log("error");
      handleClick(TransitionDown);
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
        <Snackbar
          open={open}
          onClose={handleClose}
          TransitionComponent={transition}
          message="I love snacks"
          key={transition ? transition.name : ""}
        />
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
