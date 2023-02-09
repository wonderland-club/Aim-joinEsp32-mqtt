import { Box } from "@mui/system";
import Car from "../../components/Car";
import { url } from "../../esp32api";
import { LonganCore4 } from "../../esp32api";

const FourthCar = () => {
  return (
    <div>
      FourthCar
      <Box>
        <Car
          urlStr={url}
          passage={LonganCore4.passage}
          message={LonganCore4.message}
        />
      </Box>
    </div>
  );
};

export default FourthCar;
