import Car from "../../components/Car";
import { url } from "../../esp32api";
import { LonganCore2 } from "../../esp32api";

const SecondCar = () => {
  return (
    <div>
      <Car
        trainNumber="SecondCar"
        urlStr={url}
        passage={LonganCore2.passage}
        message={LonganCore2.message}
      />
    </div>
  );
};

export default SecondCar;
