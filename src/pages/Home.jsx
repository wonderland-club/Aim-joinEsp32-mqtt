import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  First_car_router,
  First_car_name,
  Second_car_router,
  Second_car_name,
  Third_car_router,
  Third_car_name,
  Fourth_car_router,
  Fourth_car_name,
} from "../route-constants";

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
  background: "lightblue",
  borderRadius: 10,
  opacity: "0.8",
};

const margin = {
  margin: "5px",
};

const Home = () => {
  const left_top = () => {
    fetch("green/lighton");
  };

  const left_bottom = () => {
    fetch("blue/lighton");
  };

  const left_left = () => {
    fetch("green/lightoff");
  };

  const left_right = () => {
    fetch("blue/lightoff");
  };
  return (
    <>
      <Box sx={contents}>
        <Box>
          <h1>Elite ESP32 Car</h1>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ m: 5 }}>
              <Button
                onClick={left_top}
                sx={{ m: 1 }}
                variant="contained"
                size="large"
              >
                green open
              </Button>
              <Button
                onClick={left_left}
                sx={{ m: 1 }}
                variant="outlined"
                size="large"
              >
                green Close
              </Button>
            </Box>
            <Box sx={{ m: 5 }}>
              <Button
                onClick={left_bottom}
                sx={{ m: 1 }}
                variant="contained"
                size="large"
                color="error"
              >
                blue open
              </Button>
              <Button
                onClick={left_right}
                sx={{ m: 1 }}
                variant="outlined"
                size="large"
                color="error"
              >
                blue Close
              </Button>
            </Box>
          </Box>
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
