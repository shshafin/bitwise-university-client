import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TPHDatePickerProps = {
  label: string;
  name: string;
};

const PHDatePicker = ({ label, name }: TPHDatePickerProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <DatePicker
            style={{ width: "100%" }}
            {...field}
            size="large"
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

export default PHDatePicker;
