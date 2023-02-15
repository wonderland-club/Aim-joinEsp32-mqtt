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
  borderRadius: "22px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [open, setOpen] = React.useState(true);
  const b = window.matchMedia("(orientation: landscape)").matches + "";
  useEffect(() => {
    //检测屏幕的宽度和高度，来判断屏幕方向
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOrientationChange = () => {
      if (window.matchMedia("(orientation: landscape)").matches) {
        handleClose();
        console.log("Landscape");
      } else {
        handleOpen();
        console.log("Portrait");
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
        disableAutoFocus={true}
        sx={{ borderRadius: "22px", background: "lightcoral" }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            屏幕应横向展示
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            请在控制中心，设置屏幕为旋转模式，并横向转动，即刻体验
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
