import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import {
  First_car_router,
  Second_car_router,
  Third_car_router,
  Fourth_car_router,
} from "../route-constants";

const routerLink = [
  First_car_router,
  Second_car_router,
  Third_car_router,
  Fourth_car_router,
];

const Home = () => {
  const navigate = useNavigate();

  const jump = (router) => {
    navigate(router);

    console.log(router);
  };

  return (
    <>
      <Box sx={contents}>
        <Box>
          <h1>Elite ESP32 Car</h1>
        </Box>

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
                onClick={() => jump(item)}
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
