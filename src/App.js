import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import FirstCar from "./pages/Cars/FirstCar";
import SecondCar from "./pages/Cars/SecondCar";
import ThirdCar from "./pages/Cars/ThirdCar";
import FourthCar from "./pages/Cars/FourthCar";
import { useState, useEffect, useRef } from "react";
import Layout from "./components/Layout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as React from "react";

import {
  Home_router,
  First_car_router,
  Second_car_router,
  Third_car_router,
  Fourth_car_router,
} from "./route-constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  //方案1 检测屏幕的宽度和高度，来判断屏幕方向
  // const screenWidth = window.screen.width;
  // const screenHeight = window.screen.height;

  // if (screenWidth > screenHeight) {
  //   console.log("横屏");
  // } else {
  //   console.log("竖屏");
  // }

  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOrientationChange = () => {
      if (window.screen.width > window.screen.height) {
        console.log("横向");
        handleClose();
      } else {
        console.log("竖向");
        handleOpen();
      }
    };

    handleOrientationChange();
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);
  return (
    <Layout>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            屏幕没有横向展示
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            请在控制中心，设置屏幕为旋转模式
          </Typography>
        </Box>
      </Modal>
      <Routes>
        <Route index path={`${Home_router}`} element={<Home />} />
        <Route path={`${First_car_router}`} element={<FirstCar />} />
        <Route path={`${Second_car_router}`} element={<SecondCar />} />
        <Route path={`${Third_car_router}`} element={<ThirdCar />} />
        <Route path={`${Fourth_car_router}`} element={<FourthCar />} />
      </Routes>
    </Layout>
  );
}

export default App;
