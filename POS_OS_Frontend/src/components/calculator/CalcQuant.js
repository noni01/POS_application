import React, { useState } from "react";
import { Form, InputNumber, Select, Button } from "antd";

const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

export default function CalcQuant() {
  const [quantity, setQuantity] = useState(1);
  const [unitQuantity, setUnitQuantity]= useState(1);
  const [packets, setPackets] = useState("");
  const [measurementType, setMeasurementType] = useState("kg");

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };
  const handleUnitQuantityChange = (value) => {
    setUnitQuantity(value);
  };

  const handleMeasurementTypeChange = (value) => {
    setMeasurementType(value);
  };

  let convertedQuantity = quantity;
  if (measurementType === "g") {
    convertedQuantity = quantity / 1000;
  }
  function returnQuantity(){
    setPackets(convertedQuantity / unitQuantity)
  }
  return (
    <div>
      <Form {...formItemLayout}>
        <div
          style={{
            padding: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Form.Item label="Calculate Quantity">
            <label> Required weight:</label>
            <InputNumber
              value={convertedQuantity}
              onChange={handleQuantityChange}
            />
            <Select
              value={measurementType}
              onChange={handleMeasurementTypeChange}
            >
              <Option value="kg">kg</Option>
              <Option value="g">g</Option>
            </Select>
          </Form.Item>
        </div>
        <div
          style={{
            padding: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Form.Item label="Measurement Type">
            <label> Unit weight:</label>
            <InputNumber
            //   value={unitQuantity}
              onChange={handleUnitQuantityChange}
            />
          </Form.Item>
        </div>
        <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button onClick={returnQuantity}>Return quantity: </Button>
                <strong> {packets}pkt</strong>
              </div>
      </Form>
    </div>
  );
}
