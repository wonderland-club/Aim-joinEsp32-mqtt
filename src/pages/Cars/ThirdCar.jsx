import Car from "../../components/Car";
import { url } from "../../esp32api";
import { LonganCore3 } from "../../esp32api";

const ThirdCar = () => {
  return (
    <div>
      <Car
        trainNumber="ThirdCar"
        urlStr={url}
        passage={LonganCore3.passage}
        message={LonganCore3.message}
      />
    </div>
  );
};

export default ThirdCar;
