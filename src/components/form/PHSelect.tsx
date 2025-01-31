import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  options:
    | { value: string | number; label: string; disabled?: boolean }[]
    | undefined; // Ensure value is passed
  name: string;
  disabled?: boolean;
};

const PHSelect = ({ label, options, name, disabled }: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
            disabled={disabled}
          />
          {error && (
            <div style={{ marginTop: "5px", color: "#f5222d" }}>
              <small>{error?.message}</small>
            </div>
          )}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
