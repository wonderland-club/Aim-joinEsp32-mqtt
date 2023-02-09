import { Box } from "@mui/system";
import Car from "../../components/Car";
import { url } from "../../esp32api";
import { LonganCore2 } from "../../esp32api";

const FourthCar = () => {
  return (
    <div>
      FourthCar
      <Box>
        <Car
          urlStr={url}
          passage={LonganCore2.passage}
          message={LonganCore2.message}
        />
      </Box>
    </div>
  );
};

export default FourthCar;
