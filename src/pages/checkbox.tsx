import React, { useState } from "react";

const CheckboxWrapper = ({ value, elements, setElements }:any) => {
  const handleChange = () => {
    if (elements.includes(value)) {
      setElements(
        elements.filter((checkedValue: any) => checkedValue !== value)
      );
    } else {
      setElements([...elements, value]);
    }
  };

  return (
    <label>
      <input
        type="checkbox"
        value={value}
        checked={elements.includes(value)}
        onChange={handleChange}
      />
      {value}
    </label>
  );
};

const CheckboxGroup = () => {
  const [elements, setElements] = useState([]);

  return (
    <div className="App">
      <p>
        現在選択されている値：<b>{elements.join("、")}</b>
      </p>
      <CheckboxWrapper
        value="動詞"
        elements={elements}
        setElements={setElements}
      />
      <CheckboxWrapper
        value="形容詞"
        elements={elements}
        setElements={setElements}
      />
      <CheckboxWrapper
        value="副詞"
        elements={elements}
        setElements={setElements}
      />
      <CheckboxWrapper
        value="助動詞"
        elements={elements}
        setElements={setElements}
      />
    </div>
  );
};

export default CheckboxGroup;
