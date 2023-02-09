import Car from "../../components/Car";
import { url } from "../../esp32api";
import { LonganCore2 } from "../../esp32api";

const SecondCar = () => {
  return (
    <div>
      SecondCar
      <Car
        urlStr={url}
        passage={LonganCore2.passage}
        message={LonganCore2.message}
      />
    </div>
  );
};

export default SecondCar;
