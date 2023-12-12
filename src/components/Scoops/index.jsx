import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./../Card/index";

const Scoops = () => {
  const [scoopData, setScoopData] = useState([]);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3050/scoops")
      .then((res) => setScoopData(res.data));
  }, []);

  return (
    <div className="container">
      <h1>Types of Ice Cream</h1>
      <p> Each: 20&#8378;</p>
      <h2>Total: {basket.length * 20}&#8378;</h2>

      <div className="row gap-5 p-3 justify-content-between">
        {scoopData.map((scoop, i) => (
          <Card key={i} scoop={scoop} basket={basket} setBasket={setBasket} />
        ))}
      </div>
    </div>
  );
};

export default Scoops;
