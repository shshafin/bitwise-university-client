import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import { Button, Col, Divider, Input, notification, Row } from "antd";
import PHSelect from "../../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../../constants/global";
import PHDatePicker from "../../../../components/form/PHDatePicker";
import { useGetAcademicDepartmentQuery } from "../../../../redux/features/admin/academicManagement.api";
import { useAddFacultyMutation } from "../../../../redux/features/admin/userManagement.api";

const facultyValues = {
  designation: "Lecturer",
  name: {
    firstName: "Mridul ",
    middleName: "Das",
    lastName: "Rahman",
  },
  gender: "male",
  email: "faculty3@gmail.com",

  contactNo: "123",
  emergencyContactNo: "123",
  bloodGroup: "A+",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",
  academicDepartment: "678dace1119e98c94f9587fd",
};

const CreateFaculty = () => {
  // post faculty
  const [addFaculty] = useAddFacultyMutation();

  // get academic departments
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAcademicDepartmentQuery({});

  const departmentOptions = departmentData?.data?.map((data) => ({
    value: data._id,
    label: data?.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const facultyData = {
      password: "faculty123",
      faculty: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.image);

    try {
      // Assuming addFaculty is an async function
      const res = await addFaculty(formData);
      if ("error" in res) {
        // Show error toast if something went wrong
        notification.error({
          message: "Error",
          description: "There was an issue submitting the form.",
        });
        return;
      }

      // Show success toast if student was added successfully
      notification.success({
        message: "Faculty Added Successfully",
        description: "The faculty data has been submitted successfully.",
      });
    } catch {
      // Show error toast if something went wrong
      notification.error({
        message: "Error",
        description: "There was an issue submitting the form.",
      });
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        New Faculty Registration
      </h1>

      <Row justify={"center"}>
        <Col span={24}>
          <PHForm
            onSubmit={onSubmit}
            defaultValues={facultyValues}>
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
                  label="Blood Group:"
                  options={bloodGroupOptions}
                />
              </Col>
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
            <Divider>Academic Information</Divider>
            <Row gutter={12}>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHSelect
                  name="academicDepartment"
                  label="Academic Department:"
                  options={departmentOptions}
                  disabled={departmentLoading}
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

export default CreateFaculty;
