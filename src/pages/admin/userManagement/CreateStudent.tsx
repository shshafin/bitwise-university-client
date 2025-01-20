import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Flex } from "antd";

const CreateStudent = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    console.log(Object.fromEntries(formData));
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        New Student Registration
      </h1>

      <Flex
        justify="center"
        align="center">
        <Col span={6}>
          <PHForm onSubmit={onSubmit}>
            <PHInput
              type="text"
              name="name"
              label="Student Name:"
              placeholder="Enter student name"
            />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateStudent;
