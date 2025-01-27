import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import { Button, Col, Divider, Input, Row } from "antd";
import PHSelect from "../../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../../constants/global";
import PHDatePicker from "../../../../components/form/PHDatePicker";

import { useUpdateAdminMutation } from "../../../../redux/features/admin/userManagement.api";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const UpdateAdmin = () => {
  const { adminId } = useParams<{ adminId: string }>();

  const [UpdateAdmin] = useUpdateAdminMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const normalizedData = {
      ...data,
      gender: data?.gender?.toLowerCase(),
    };

    const adminData = {
      id: adminId,
      password: "admin123",
      admin: { ...normalizedData },
    };

    try {
      await UpdateAdmin(adminData).unwrap();
      toast.success("Admin updated successfully");
    } catch (err: any) {
      const errorMessage =
        err?.message || "There was an issue updating the form.";
      toast.error(errorMessage || "There was an error updating the form");
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        New Faculty Registration
      </h1>

      <Row justify={"center"}>
        <Col span={24}>
          <PHForm onSubmit={onSubmit}>
            <Divider>Personal Information</Divider>
            <Row gutter={12}>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="designation"
                  label="Designation:"
                  placeholder="Enter Designation"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="name.firstName"
                  label="First Name:"
                  placeholder="Enter First Name"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="name.middleName"
                  label="Middle Name:"
                  placeholder="Enter Middle Name"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="name.lastName"
                  label="Last Name:"
                  placeholder="Enter Last Name"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHSelect
                  name="gender"
                  label="Gender:"
                  options={genderOptions}
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHDatePicker
                  name="dateOfBirth"
                  label="Date Of Birth:"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHSelect
                  name="bloodGroup"
                  label="blood Group:"
                  options={bloodGroupOptions}
                />
              </Col>
            </Row>
            <Divider>Profile Picture</Divider>
            <Row gutter={12}>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <Controller
                  name="image"
                  render={({ field: { onChange, value, ...field } }) => {
                    return (
                      <Input
                        size="large"
                        onChange={(e) => {
                          onChange(e.target.files?.[0]);
                        }}
                        {...field}
                        type="file"
                        value={value?.fileName}
                      />
                    );
                  }}
                />
              </Col>
            </Row>
            <Divider>Contact Information</Divider>
            <Row gutter={12}>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="email"
                  label="Email Address:"
                  placeholder="Enter Email Address"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="contactNo"
                  label="Contact No.:"
                  placeholder="Enter Contact No."
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="emergencyContactNo"
                  label="Emergency Contact No.:"
                  placeholder="Enter Emergency Contact No."
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="presentAddress"
                  label="Present Address:"
                  placeholder="Enter Present Address"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="permanentAddress"
                  label="Permanent Address:"
                  placeholder="Enter Permanent Address"
                />
              </Col>
            </Row>
            <Row
              justify="center"
              style={{ marginTop: "20px" }}>
              <Col span={7}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}>
                  Submit
                </Button>
              </Col>
            </Row>
          </PHForm>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateAdmin;
