import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../../redux/features/admin/userManagement.api";
import {
  Avatar,
  Card,
  Col,
  Descriptions,
  Divider,
  Row,
  Typography,
} from "antd";

const { Title, Text } = Typography;
const StudentDetails = () => {
  const { studentId } = useParams();

  const { data: student } = useGetSingleStudentQuery(studentId as string);
  const studentData = student?.data;

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
      <Card
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}>
        <div
          style={{
            padding: "20px",
          }}>
          {/* Header Section */}
          <Row
            gutter={[16, 16]}
            align="middle">
            <Col
              span={6}
              style={{ textAlign: "center" }}>
              <Avatar
                size={120}
                src={studentData?.profileImg}
                alt="Profile Image"
                style={{
                  border: "2px solid #001529",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                }}
              />
            </Col>
            <Col span={18}>
              <Title
                level={3}
                style={{ marginBottom: 0 }}>
                {studentData?.fullName}
              </Title>
              <Text
                type="secondary"
                style={{ fontSize: "16px" }}>
                Student ID: {studentData?.id}
              </Text>
            </Col>
          </Row>

          <Divider />

          {/* Personal Information */}
          <Title
            level={4}
            style={{ color: "#001529", marginBottom: "10px" }}>
            Personal Information
          </Title>
          <Descriptions
            column={1}
            bordered
            size="small">
            <Descriptions.Item label="Gender">
              {studentData?.gender}
            </Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
              {new Date(studentData?.dateOfBirth as string).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </Descriptions.Item>

            <Descriptions.Item label="blood Group">
              {studentData?.bloodGroup}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {studentData?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Contact No">
              {studentData?.contactNo}
            </Descriptions.Item>
            <Descriptions.Item label="Emergency Contact">
              {studentData?.emergencyContactNo}
            </Descriptions.Item>
            <Descriptions.Item label="Present Address">
              {studentData?.presentAddress}
            </Descriptions.Item>
            <Descriptions.Item label="Permanent Address">
              {studentData?.permanentAddress}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          {/* Guardian Information */}
          <Title
            level={4}
            style={{ color: "#001529", marginBottom: "10px" }}>
            Guardian Information
          </Title>
          <Descriptions
            column={1}
            bordered
            size="small">
            <Descriptions.Item label="Father's Name">
              {studentData?.guardian?.fatherName}
            </Descriptions.Item>
            <Descriptions.Item label="Father's Occupation">
              {studentData?.guardian?.fatherOccupation}
            </Descriptions.Item>
            <Descriptions.Item label="Father's Contact">
              {studentData?.guardian?.fatherContactNo}
            </Descriptions.Item>
            <Descriptions.Item label="Mother's Name">
              {studentData?.guardian?.motherName}
            </Descriptions.Item>
            <Descriptions.Item label="Mother's Occupation">
              {studentData?.guardian?.motherOccupation}
            </Descriptions.Item>
            <Descriptions.Item label="Mother's Contact">
              {studentData?.guardian?.motherContactNo}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          {/* Local Guardian Information */}
          <Title
            level={4}
            style={{ color: "#001529", marginBottom: "10px" }}>
            Local Guardian Information
          </Title>
          <Descriptions
            column={1}
            bordered
            size="small">
            <Descriptions.Item label="Name">
              {studentData?.localGuardian?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Occupation">
              {studentData?.localGuardian?.occupation}
            </Descriptions.Item>
            <Descriptions.Item label="Contact">
              {studentData?.localGuardian?.contactNo}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {studentData?.localGuardian?.address}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          {/* Academic Information */}
          <Title
            level={4}
            style={{ color: "#001529", marginBottom: "10px" }}>
            Academic Information
          </Title>
          <Descriptions
            column={1}
            bordered
            size="small">
            <Descriptions.Item label="Contact">
              {studentData?.academicFaculty?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              {studentData?.academicDepartment?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Occupation">
              {studentData?.admissionSemester?.name}{" "}
              {studentData?.admissionSemester?.year}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Card>
    </div>
  );
};

export default StudentDetails;
