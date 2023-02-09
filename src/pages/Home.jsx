import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import {
  First_car_router,
  Second_car_router,
  Third_car_router,
  Fourth_car_router,
} from "../route-constants";

const Home = () => {
  return (
    <>
      <Box sx={contents}>
        <Box>
          <h1>Elite ESP32 Car</h1>
        </Box>
        <Box>
          <Box sx={linkStyle}>
            <Link style={margin} to={`${First_car_router}`}>
              <img style={image} src="image/colorCar/blueCar.svg" alt="" />
            </Link>
            <Link style={margin} to={`${Second_car_router}`}>
              <img style={image} src="image/colorCar/greenCar.svg" alt="" />
            </Link>
          </Box>
          <Box sx={linkStyle}>
            <Link style={margin} to={`${Third_car_router}`}>
              <img style={image} src="image/colorCar/redCar.svg" alt="" />
            </Link>
            <Link style={margin} to={`${Fourth_car_router}`}>
              <img style={image} src="image/colorCar/yellowCar.svg" alt="" />
            </Link>
          </Box>
        </Box>
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

const linkStyle = {
  display: "flex",
  flexDirection: "row",
  height: "40vh",
  // justifyContent: "flex-end",
};

const image = {
  width: "100%",
  height: "100%",
  background: "black",
  borderRadius: 10,
  opacity: "0.8",
};

const margin = {
  margin: "5px",
};
