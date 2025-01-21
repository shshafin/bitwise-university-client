import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Input, notification, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAcademicDepartmentQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";

const studentDefaultValues = {
  name: {
    firstName: "Student ",
    middleName: "",
    lastName: "4",
  },
  gender: "male",

  bloogGroup: "A+",

  email: "student4@gmail.com",
  contactNo: "1235678",
  emergencyContactNo: "987-654-3210",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",

  guardian: {
    fatherName: "James Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "111-222-3333",
    motherName: "Mary Doe",
    motherOccupation: "Teacher",
    motherContactNo: "444-555-6666",
  },

  localGuardian: {
    name: "Alice Johnson",
    occupation: "Doctor",
    contactNo: "777-888-9999",
    address: "789 Pine St, Villageton",
  },

  admissionSemester: "67744665821c2d54ac8ac977",
  academicDepartment: "678dace1119e98c94f9587fd",
};

const CreateStudent = () => {
  // post student
  const [addStudent] = useAddStudentMutation();
  // get admission semesters
  const { data: semesterData, isLoading: semesterLoading } =
    useGetAllSemestersQuery(undefined);
  // get academic departments
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAcademicDepartmentQuery({});

  const semesterOptions = semesterData?.data?.map((data) => ({
    value: data?._id,
    label: `${data?.name}-${data?.year}`,
  }));

  const departmentOptions = departmentData?.data?.map((data) => ({
    value: data._id,
    label: data?.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const studentData = {
      password: "student123",
      student: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);

    try {
      // Assuming addStudent is an async function
      const res = await addStudent(formData);
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
        message: "Student Added Successfully",
        description: "The student data has been submitted successfully.",
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
        New Student Registration
      </h1>

      <Row justify={"center"}>
        <Col span={24}>
          <PHForm
            onSubmit={onSubmit}
            defaultValues={studentDefaultValues}>
            <Divider>Personal Information</Divider>
            <Row gutter={12}>
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
                  name="bloogGroup"
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
            <Divider>Guardian Information</Divider>
            <Row gutter={12}>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.fatherName"
                  label="Father Name:"
                  placeholder="Enter Father Name"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.fatherOccupation"
                  label="Father Occupation:"
                  placeholder="Enter Father Occupation"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.fatherContactNo"
                  label="Father Contact No.:"
                  placeholder="Enter Father Contact No."
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.motherName"
                  label="Mother Name:"
                  placeholder="Enter Mother Name"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.motherOccupation"
                  label="Mother Occupation:"
                  placeholder="Enter Mother Occupation"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.motherContactNo"
                  label="Mother Contact No.:"
                  placeholder="Enter Mother Contact No."
                />
              </Col>
            </Row>
            <Divider>Local Guardian Information</Divider>
            <Row gutter={12}>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="localGuardian.name"
                  label="Local Guardian Name:"
                  placeholder="Enter L. Guardian Name"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="localGuardian.occupation"
                  label="Local Guardian Occupation:"
                  placeholder="Enter L. Guardian Occupation"
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="localGuardian.contactNo"
                  label="Local Guardian Contact No.:"
                  placeholder="Enter L. Guardian Contact No."
                />
              </Col>
              <Col
                span={24}
                md={{ span: 12 }}
                lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="localGuardian.address"
                  label="Local Guardian Address:"
                  placeholder="Enter L. Guardian Address"
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
                  name="admissionSemester"
                  label="Admission Semester:"
                  options={semesterOptions}
                  disabled={semesterLoading}
                />
              </Col>
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

export default CreateStudent;
