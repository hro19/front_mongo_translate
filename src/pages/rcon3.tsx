import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

const Options = [
  { value: 1, label: "りんご" },
  { value: 2, label: "みかん" },
  { value: 3, label: "バナナ" },
];

const Example = () => {
  const { control } = useForm<{
    id: number[];
  }>({
    defaultValues: {
      id: [2],
    },
  });

  return (
    <div>
      <Controller
        name="id"
        control={control}
        render={({ field }) => (
          <Select
            options={Options}
            value={Options.filter((x) => field.value.includes(x.value))}
            onChange={(newValue) => {
              field.onChange(newValue.map((x) => x.value));
            }}
            isMulti
          />
        )}
      />
    </div>
  );
};

export default Example;
