import * as React from "react";
import { Link } from "react-router-dom";
import {
  Home_router,
  Home_name,
} from "../route-constants";
import Box from '@mui/material/Box';

const Layout = ({ children }) => {
  return (
    <>
      <Box sx={{}}>
        <h3>
          <Link to={`${Home_router}`}>AIM ESP32 HOME </Link>
        </h3>

      </Box>
      {children}
    </>
  );
};

export default Layout;
