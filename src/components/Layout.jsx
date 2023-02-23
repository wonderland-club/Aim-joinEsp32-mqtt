import * as React from "react";
import { Link } from "react-router-dom";
import { Home_router } from "../route-constants";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useState, useEffect, useRef } from "react";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const pathname = new URL(window.location.href).pathname;
  
  useEffect(() => {
    sessionStorage.setItem("myData", JSON.stringify({ name: "null" }));
  }, []);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("myData"));

    if (pathname !== "/") {
      if (data.name == "null") {
        navigate("/");
      }
    }

    if (pathname == "/") {
      sessionStorage.setItem("myData", JSON.stringify({ name: "null" }));
    }

    console.log("pathname", pathname);
    console.log("name", data.name);

  }, [pathname]);

  return <>{children}</>;
};

export default Layout;
