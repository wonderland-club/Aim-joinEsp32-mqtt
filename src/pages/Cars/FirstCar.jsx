import Car from "../../components/Car";
import { url } from "../../esp32api";
import { LonganCore1 } from "../../esp32api";

const FirstCar = () => {
  return (
    <div>
      <Car
        trainNumber="FirstCar"
        urlStr={url}
        passage={LonganCore1.passage}
        message={LonganCore1.message}
      />
    </div>
  );
};

export default FirstCar;
