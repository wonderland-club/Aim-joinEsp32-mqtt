import React from "react";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useState, useEffect, useRef } from "react";
import mqtt from "mqtt";
import { Joystick } from "react-joystick-component";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
function Car(props) {
  // 通道 消息
  const { urlStr, passage } = props;
  const navigate = useNavigate();

  const clientRef = useRef(null);

  // 连接MQTT
  useEffect(() => {
    clientRef.current = mqtt.connect(urlStr);
    clientRef.current.on("connect", () => {
      console.log("Connected to MQTT broker");
    });

    return () => {
      clientRef.current.end();
    };
  }, []);

  //浏览器环境监测 用于判断移动端还是桌面端
  const [start, setStart] = useState("onTouchStart");
  const [end, setEnd] = useState("onTouchEnd");
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("ontouchstart" in window) {
        setStart("onTouchStart");
        setEnd("onTouchEnd");
      } else {
        setStart("onMouseDown");
        setEnd("onMouseUp");
      }
    }
  }, []);

  // 用于检测有没有在操作中，如果10秒中内无操作，页面将自动跳转至主页
  const [count, setCount] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);
    // console.log(count);
    
    if (count == 0) {
      navigate("/");
    }
    return () => clearInterval(timer);
  }, [count]);

  // 发送消息
  const handleSendMessage = (message) => {
    clientRef.current.publish(passage, message);
  };

  const { Up, Down, Left, Right, Stop, Lifting, Pitching } = props.message;

  const JoystickDirection = ["FORWARD", "BACKWARD", "LEFT", "RIGHT", "STOP"];

  const [moveRecords, setMoveRecords] = useState("");

  const handleMove = (e) => {
    setCount(10);
    // 判断方向是否跟刚刚的方向相同
    const direction = e.direction;
    if (moveRecords !== direction) {
      if (direction == JoystickDirection[0]) {
        handleSendMessage(Up);
      } else if (direction == JoystickDirection[1]) {
        handleSendMessage(Down);
      } else if (direction == JoystickDirection[2]) {
        handleSendMessage(Left);
      } else if (direction == JoystickDirection[3]) {
        handleSendMessage(Right);
      }
      setMoveRecords(direction);
    }
  };
  const handleStop = () => {
    setMoveRecords(JoystickDirection[4]);
    handleSendMessage(Stop);
  };
  const joystickStart = () => {};
  return (
    <>
      <button onClick={() => setCount(10)}>{count}</button>
      <Box>{moveRecords}</Box>
      <LinearProgress />
      <Box
        sx={{
          height: "80vh",
          justifyContent: "space-around",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          background: "lightcoral",
        }}
      >
        {/* 操纵杆 */}
        <Box>
          <Joystick
            size={150}
            stickSize={70}
            sticky={false}
            baseColor="rgb(0, 0, 51,0.2)"
            stickColor="rgba(133, 37, 60, 0.8)"
            move={(eve) => handleMove(eve)}
            stop={handleStop}
            start={joystickStart}
          ></Joystick>
        </Box>

        <Box sx={{ width: 250 }}>
          <Button
            sx={rightButtonStyle}
            variant="outlined"
            size="large"
            fullWidth={true}
            {...{
              [start]: () => {
                handleSendMessage(Lifting);
                setCount(10);
              },
            }}
            // {...{ [end]: () => handleSendMessage("end") }}
          >
            升/降
          </Button>
          <Button
            sx={rightButtonStyle}
            variant="outlined"
            size="large"
            fullWidth={true}
            {...{
              [start]: () => {
                handleSendMessage(Pitching);
                setCount(10);
              },
            }}
            // {...{ [end]: () => handleSendMessage("end") }}
          >
            夹球
          </Button>
        </Box>
      </Box>
    </>
  );
}

const rightButtonStyle = {
  userSelect: "none",
  mt: 4,
  mb: 4,
  // with: 200,
  fullWidth: true,
  height: 50,
};

export default Car;
