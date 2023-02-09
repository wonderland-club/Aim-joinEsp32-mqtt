import Car from "../../components/Car";
import { url } from "../../esp32api";
import { LonganCore3 } from "../../esp32api";

const SecondCar = () => {
  return (
    <div>
      SecondCar
      <Car
        urlStr={url}
        passage={LonganCore3.passage}
        message={LonganCore3.message}
      />
    </div>
  );
};

export default SecondCar;
