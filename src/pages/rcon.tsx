import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

// Define the options array outside of the component
const options = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "orange", label: "Orange" },
];

const Rcon = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data:any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
      <div className="mb-4">
        <label htmlFor="text" className="block text-gray-700">
          Text
        </label>
        <Controller
          name="text"
          control={control}
          defaultValue=""
          rules={{
            required: "Please enter a text",
            maxLength: {
              value: 6,
              message: "Text must be at most 6 characters",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        />
        {errors.text && (
          <p className="text-red-500">
            {errors.text.message as React.ReactNode}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="color" className="block text-gray-700">
          Color
        </label>
        <Controller
          name="color"
          control={control}
          defaultValue=""
          rules={{ required: "Please select at least one color" }}
          render={({ field }) => (
            <Select
              {...field}
              options={options} // Use the options array
              isMulti={true}
              className="w-full"
              classNamePrefix="react-select"
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderColor: errors.color ? "#e53e3e" : "#d1d5db",
                  "&:hover": {
                    borderColor: errors.color ? "#c53030" : "#9ca3af",
                  },
                }),
              }}
            />
          )}
        />
        {errors.color && (
          <p className="text-red-500">
            {errors.color.message as React.ReactNode}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default Rcon;
