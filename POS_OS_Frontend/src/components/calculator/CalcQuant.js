import React, { useState } from "react";
import { Form, InputNumber, Select, Button, Row, Col } from "antd";
import "./calculator.css";

const { Option } = Select;
// const formItemLayout = {
//   labelCol: { span: 12 },
//   wrapperCol: { span: 12 },
// };

export default function CalcQuant() {
  const [quantity, setQuantity] = useState(1);
  const [unitQuantity, setUnitQuantity] = useState(1);

  const [quanityType, setQuantityType] = useState("kg");
  const [unitType, setUnitType] = useState("kg");

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };
  const handleUnitQuantityChange = (value) => {
    setUnitQuantity(value);
  };

  const handlequanityTypeChange = (value) => {
    setQuantityType(value);
  };

  const handleUnitTypeChange = (value) => {
    setUnitType(value);
  };

  let convertedQuantity = quantity;

  if (quanityType === "g") {
    convertedQuantity = quantity / 1000;
  }
  let convertedUnitQuanity = unitQuantity;
  if (unitType === "g") {
    convertedUnitQuanity = unitQuantity / 1000;
  }
  const totalNumber = (convertedQuantity / convertedUnitQuanity).toFixed(2);
  return (
    <div className="calcLogic">
      <Form>
        <Row>
          <Col span={24}>
            <div className="d-flex justify-content-between gap-3">
              <div className="w-50" style={{ maxWidth: "300px" }}>
                <label> Required weight:</label>
                <Form.Item
                
                style={{
                  paddingTop: "10px",
                  display: "flex",
                  justifyContent:"space-around",
                }}
                >
                  <InputNumber
                    className="calc-input"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                  <Select
                    className="calc-input-select"
                    value={quanityType}
                    fire
                    onChange={handlequanityTypeChange}
                  >
                    <Option value="kg">kg</Option>
                    <Option value="g">g</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="w-50">
                <label> Unit weight:</label>
                <Form.Item
                style={{
                  paddingTop: "10px",
                  display: "flex",
                  justifyContent:"space-around",
                }}>
                  <InputNumber
                    className="calc-input"
                    value={unitQuantity}
                    onChange={handleUnitQuantityChange}
                  />
                  <Select className="calc-input-select" value={unitType} fire onChange={handleUnitTypeChange}>
                    <Option value="kg">kg</Option>
                    <Option value="g">g</Option>
                  </Select>
                </Form.Item>
              </div>
              
            </div>
          </Col>
        </Row>
        <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <strong>Return: </strong>
                <strong> {totalNumber} pkt</strong>
              </div>

        
      </Form>
    </div>
  );
}
