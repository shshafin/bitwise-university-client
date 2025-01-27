import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import { Button, Col, Divider, Input, Row } from "antd";
import PHSelect from "../../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../../constants/global";
import PHDatePicker from "../../../../components/form/PHDatePicker";
import {
  useGetAcademicDepartmentQuery,
  useGetAllSemestersQuery,
} from "../../../../redux/features/admin/academicManagement.api";
import { useUpdateStudentMutation } from "../../../../redux/features/admin/userManagement.api";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const UpdateStudent = () => {
  const { studentId } = useParams<{ studentId: string }>();

  const [updateStudent] = useUpdateStudentMutation();

  // Fetch semesters and departments
  const { data: semesterData, isLoading: semesterLoading } =
    useGetAllSemestersQuery(undefined);
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAcademicDepartmentQuery(undefined);

  // semester options
  const semesterOptions = semesterData?.data?.map((data) => ({
    value: data._id,
    label: `${data.name} - ${data.year}`,
  }));

  // department options
  const departmentOptions = departmentData?.data?.map((data) => ({
    value: data._id,
    label: data.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const normalizedData = {
      ...data,
      gender: data?.gender?.toLowerCase(),
    };

    const studentData = {
      id: studentId,
      password: "student123",
      student: { ...normalizedData },
    };

    try {
      await updateStudent(studentData).unwrap();
      toast.success("Student updated successfully");
    } catch (err: any) {
      const errorMessage =
        err?.message || "There was an issue updating the form.";
      toast.error(errorMessage || "There was an error updating the form");
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        New Student Registration
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

export default UpdateStudent;
