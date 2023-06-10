import React from "react";
import Select from "react-select";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
];

const MultiSelect = () => {
  const handleChange = (selectedOptions:any) => {
    // 選択されたオプションを処理するためのコードをここに追加
    console.log(selectedOptions);
  };

  return <Select options={options} isMulti onChange={handleChange} />;
};

export default MultiSelect;
