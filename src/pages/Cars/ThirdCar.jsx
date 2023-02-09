import Car from "../../components/Car";
import { url } from "../../esp32api";
import { LonganCore4 } from "../../esp32api";

const ThirdCar = () => {
  return (
    <div>
      ThirdCar
      <Car
        urlStr={url}
        passage={LonganCore4.passage}
        message={LonganCore4.message}
      />
    </div>
  );
};

export default ThirdCar;
