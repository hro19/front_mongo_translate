import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="color"
        control={control}
        defaultValue=""
        rules={{ required: "Please select at least one color" }} // 必須ルールを指定
        render={({ field }) => (
          <Select
            {...field}
            options={[
              { value: "red", label: "Red" },
              { value: "blue", label: "Blue" },
              { value: "green", label: "Green" },
              { value: "yellow", label: "Yellow" },
              { value: "orange", label: "Orange" },
            ]}
            isMulti={true} // 複数選択にする
          />
        )}
      />
      {errors.color && <p>{errors.color.message as React.ReactNode}</p>}{" "}
      {/* エラーメッセージの表示 */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Rcon;
