import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import FirstCar from "./pages/Cars/FirstCar";
import SecondCar from "./pages/Cars/SecondCar";
import ThirdCar from "./pages/Cars/ThirdCar";
import FourthCar from "./pages/Cars/FourthCar";

import Layout from "./components/Layout";
import {
  Home_router,
  First_car_router,
  Second_car_router,
  Third_car_router,
  Fourth_car_router,
} from "./route-constants";

function App() {
  return (
    <Layout>
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
