import React from "react";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import SubdirectoryArrowLeftRoundedIcon from "@mui/icons-material/SubdirectoryArrowLeftRounded";
import SubdirectoryArrowRightRoundedIcon from "@mui/icons-material/SubdirectoryArrowRightRounded";
import StopCircleRoundedIcon from "@mui/icons-material/StopCircleRounded";
import LinearProgress from "@mui/material/LinearProgress";
import { useState, useEffect } from "react";

function Car(props) {
  // 连接
  const { urlStr, passage } = props;

  const mqtt = require("mqtt");
  const url = urlStr;
  // const options = {
  const [text, setText] = useState();
  const [init, setInit] = useState(false);

  // 生命周期

  useEffect(() => {
    const client = mqtt.connect(url);
    client.on("connect", () => {
      // 订阅主题

      client.subscribe(passage, function (err) {
        if (!err && init) {
          // 发布消息
          client.publish(passage, text + "");
        } else {
          setInit(true);
        }
      });
    });
  }, [text]);

  // 鼠标按下
  const revise = (strText) => {
    // console.log("strText", strText);
    setText(strText);
  };

  // 鼠标松开
  const stop = () => {
    console.log("stop");
    setText("stop");
  };

  const { one, two, three, four, five, six } = props.message;
  return (
    <>
      <LinearProgress />
      <Box sx={button}>
        {/* left */}
        <Box sx={button_left}>
          {/* left_top */}
          <button
            onMouseDown={() => revise(one)}
            onMouseUp={() => stop()}
            onTouchStart={() => {
              revise(one);
            }}
            onTouchEnd={() => {
              stop();
            }}
            style={{
              width: buttonSize,
              height: buttonSize,
              position: "absolute",
              bottom: 160 + offsetLeft_bottom,
              left: 30 + offsetLeft_left,
              background: "honeydew",
              borderRadius: "50%",
              userSelect: "none",
            }}
          ></button>
          {/* left_tottom */}
          <button
            // onMouseDown={() => revise(two)}
            // onMouseUp={() => stop()}
            onTouchStart={() => {
              revise(two);
            }}
            onTouchEnd={() => {
              stop();
            }}
            style={{
              width: buttonSize,
              height: buttonSize,
              position: "absolute",
              bottom: 30 + offsetLeft_bottom,
              left: 30 + offsetLeft_left,
              background: "honeydew",
              borderRadius: "50%",
              userSelect: "none",
            }}
          ></button>
          {/* left_left */}
          <button
            // onMouseDown={() => revise(three)}
            // onMouseUp={() => stop()}
            onTouchStart={() => {
              revise(three);
            }}
            onTouchEnd={() => {
              stop();
            }}
            style={{
              width: buttonSize,
              height: buttonSize,
              position: "absolute",
              bottom: 95 + offsetLeft_bottom,
              left: -24 + offsetLeft_left,
              background: "honeydew",
              borderRadius: "50%",
              userSelect: "none",
            }}
          ></button>
          {/* left_right */}
          <button
            // onMouseDown={() => revise(four)}
            // onMouseUp={() => stop()}
            onTouchStart={() => {
              revise(four);
              // stop();
            }}
            onTouchEnd={() => {
              stop();
            }}
            style={{
              width: buttonSize,
              height: buttonSize,
              position: "absolute",
              bottom: 95 + offsetLeft_bottom,
              left: 84 + offsetLeft_left,
              background: "honeydew",
              borderRadius: "50%",
              userSelect: "none",
            }}
          ></button>
        </Box>
        {/* right */}
        {/* 右上 */}
        <Box sx={button_right}>
          <button
            // onMouseDown={() => revise(five)}
            // onMouseUp={() => stop()}
            onTouchStart={() => {
              // revise(five);
              stop();
            }}
            onTouchEnd={() => {
              stop();
            }}
            style={{
              width: buttonSize,
              height: buttonSize,
              position: "absolute",
              top: 140 + offsetRight_top,
              right: +90 + offsetRight_right,
              background: "honeydew",
              borderRadius: "50%",
              userSelect: "none",
            }}
          ></button>
          {/* 又下 */}
          <button
            // onMouseDown={() => revise(six)}
            // onMouseUp={() => stop()}
            onTouchStart={() => {
              revise(six);
            }}
            onTouchEnd={() => {
              stop();
            }}
            style={{
              width: buttonSize,
              height: buttonSize,
              position: "absolute",
              top: 200 + offsetRight_top,
              right: 30 + offsetRight_right,
              background: "honeydew",
              borderRadius: "50%",
              userSelect: "none",
            }}
          >
            {/* <IconButton size="large">
              <StopCircleRoundedIcon fontSize="inherit" />
            </IconButton> */}
          </button>
        </Box>
      </Box>
    </>
  );
}

export default Car;

const button = {
  height: "80vh",
  width: "100%",
  justifyContent: "space-between",
  display: "flex",
  background: "dimgrey",
};

const button_left = {
  position: "relative",
};

const button_right = {
  position: "relative",
};

const offsetLeft_bottom = 20;
const offsetLeft_left = 45;

const offsetRight_top = -100;
const offsetRight_right = 10;

const buttonSize = "70px";
