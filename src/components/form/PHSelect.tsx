import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  options: { value: string; label: string; disabled?: boolean }[];
  name: string;
};

const PHSelect = ({ label, options, name }: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
          />
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
