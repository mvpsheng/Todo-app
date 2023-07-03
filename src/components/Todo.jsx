import React, { useState } from "react";
export default function Todo(props) {
  const [isChecked, setIsChecked] = useState(props.complete);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    props.toggleComplete();
  };

  return (
    <div className="todo">
      <input
        type="checkbox"
        className="circle-checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      {props.name}
    </div>
  );
}
