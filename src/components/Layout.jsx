import * as React from "react";
import { Link } from "react-router-dom";
import { Home_router } from "../route-constants";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ height: "10vh" }}>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          AIM ESP32 HOME
        </Button>
      </Box>
      {children}
    </>
  );
};

export default Layout;
