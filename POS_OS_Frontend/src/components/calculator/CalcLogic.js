import React from "react";
import { useState } from "react";
import { Button } from "antd/lib/radio";
import Input from "antd/lib/input/Input";
import './calculator.css'

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
        <div
          style={{
            padding: "10px 20px",
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <strong>Total weight: </strong>
          <Input
          className="cal-input"
            type="text"
            //placeholder="enter required weight"
            onInput={(e) => setWeight(e.target.value)}
          />
        </div>
        <div
          style={{
            padding: "10px 20px",
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <strong>Unit weight of packets: </strong>
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
          <Button  className="calc-button" onClick={totalPackets}><strong>Return Packets</strong></Button>
          <strong> {packets} packets</strong>
        </div>
      </div>
    </div>
  );
}
