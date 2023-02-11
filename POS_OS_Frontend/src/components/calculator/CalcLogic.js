import React from "react";
import { useState } from "react";
import { Button } from "antd/lib/radio";
import Input from "antd/lib/input/Input";
import "./calculator.css";

export default function CalcLogic() {
  const [weight, setWeight] = useState("");
  const [unitWeight, setUnitWeight] = useState("");
  const [packets, setPackets] = useState("");

  function totalPackets(e) {
    //e.defaultvalue();
    setPackets((weight / unitWeight).toFixed(2));
    console.log(packets);
  }

  return (
    <div>
      <div className="calcLogic">
        <span>Calculate Product quantity:</span>
        <div
          style={{
            padding: "10px 20px",
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <strong>Required weight: </strong>
          <Input
            className="cal-input"
            type="text"
            //placeholder="enter required weight"
            onInput={(e) => setWeight(e.target.value)}
          />
          <select>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="ltr">ltr</option>
          </select>
        </div>
        <div
          style={{
            padding: "10px 20px",
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <strong>Unit Measurement: </strong>
          <Input
            type="text"
            className="cal-input"
            //placeholder="enter unit weight"
            onInput={(e) => setUnitWeight(e.target.value)}
          />
        </div>

        <div
          style={{
            padding: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button className="calc-button" onClick={totalPackets}>
            <strong>Quantiy</strong>
          </Button>
          <strong> {packets} pkt</strong>
        </div>
      </div>
    </div>
  );
}
