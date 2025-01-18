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
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              id={name}
            />
          </Form.Item>
        )}
      />
    </>
  );
};

export default PHInput;
