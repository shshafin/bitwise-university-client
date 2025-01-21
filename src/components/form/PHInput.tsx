import { Form, Input } from "antd";
import { ReactNode } from "react";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: ReactNode;
  placeholder?: string;
};

const PHInput = ({ type, name, label, placeholder }: TInputProps) => {
  return (
    <>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              id={name}
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
    </>
  );
};

export default PHInput;
