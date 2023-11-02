import React, { useState } from "react";
import "../components/Task.css";

function Task() {
  const [leftList, setLeftList] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
  ]);
  const [rightList, setRightList] = useState([
    { id: 4, text: "Item 4" },
    { id: 5, text: "Item 5" },
    { id: 6, text: "Item 6" },
  ]);
  const [checkedLeft, setCheckedLeft] = useState([]);
  const [checkedRight, setCheckedRight] = useState([]);

  const handleCheckboxChange = (e, item, container) => {
    const isChecked = e.target.checked;
    if (container === "left") {
      if (isChecked) {
        setCheckedLeft([...checkedLeft, item]);
      } else {
        setCheckedLeft(
          checkedLeft.filter((checkedItem) => checkedItem.id !== item.id)
        );
      }
    } else {
      if (isChecked) {
        setCheckedRight([...checkedRight, item]);
      } else {
        setCheckedRight(
          checkedRight.filter((checkedItem) => checkedItem.id !== item.id)
        );
      }
    }
  };

  const moveItems = (direction) => {
    if (direction === "right") {
      setLeftList(leftList.filter((item) => !checkedLeft.includes(item)));
      setRightList([...rightList, ...checkedLeft]);
      setCheckedLeft([]);
    } else {
      setRightList(rightList.filter((item) => !checkedRight.includes(item)));
      setLeftList([...leftList, ...checkedRight]);
      setCheckedRight([]);
    }
  };

  return (
    <div className="frame">
      <div className="container">
        <h2>Left Container</h2>
        <ul>
          {leftList.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={checkedLeft.some(
                  (checkedItem) => checkedItem.id === item.id
                )}
                onChange={(e) => handleCheckboxChange(e, item, "left")}
              />
              {item.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="btn_container">
        <button className="button" onClick={() => moveItems("right")}>
          Right &rarr;
        </button>
        <button className="button" onClick={() => moveItems("left")}>
          &larr; Left
        </button>
      </div>
      <div className="container">
        <h2>Right Container</h2>
        <ul>
          {rightList.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={checkedRight.some(
                  (checkedItem) => checkedItem.id === item.id
                )}
                onChange={(e) => handleCheckboxChange(e, item, "right")}
              />
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Task;
