import React, { useState } from "react";
import { Button, Popover } from "antd";

import "./calculator.css";
import Input from "antd/lib/input/Input";
import CalcLogic from "./CalcLogic";

//const text = <span>Title</span>;




const buttonWidth = 70;
export default function CalcBadge() {
  function content(){
  return(<CalcLogic/>)
  }
    
    
  
  return (
    <div className="calculator-dropdown">
      <div style={{ marginLeft: buttonWidth, whiteSpace: "nowrap" }}>
        <Popover placement="bottomRight" content={content} trigger="click">
          <Button>Calculator</Button>
        </Popover>
      </div>
    </div>
  );
}
