import { useParams } from "react-router-dom";
import { useGetSingleAdminQuery } from "../../../../redux/features/admin/userManagement.api";
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
const AdminDetails = () => {
  const { adminId } = useParams();

  const { data: faculty } = useGetSingleAdminQuery(adminId as string);
  const adminData = faculty?.data;

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
                src={adminData?.profileImg}
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
                {adminData?.fullName}
              </Title>
              <Text
                type="secondary"
                style={{ fontSize: "16px" }}>
                Faculty ID: {adminData?.id}
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
              {adminData?.designation}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {adminData?.gender}
            </Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
              {new Date(adminData?.dateOfBirth as string).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </Descriptions.Item>

            <Descriptions.Item label="blood Group">
              {adminData?.bloodGroup}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          {/* Contact Information */}
          <Title
            level={4}
            style={{ color: "#001529", marginBottom: "10px" }}>
            Contact Information
          </Title>
          <Descriptions
            column={1}
            bordered
            size="small">
            <Descriptions.Item label="Email">
              {adminData?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Contact No">
              {adminData?.contactNo}
            </Descriptions.Item>
            <Descriptions.Item label="Emergency Contact">
              {adminData?.emergencyContactNo}
            </Descriptions.Item>
            <Descriptions.Item label="Present Address">
              {adminData?.presentAddress}
            </Descriptions.Item>
            <Descriptions.Item label="Permanent Address">
              {adminData?.permanentAddress}
            </Descriptions.Item>
          </Descriptions>

          <Divider />
        </div>
      </Card>
    </div>
  );
};

export default AdminDetails;
