import { Col, Row, Table, TableColumnsType } from "antd";
import {
  useGetAcademicDepartmentQuery,
  useGetAcademicFacultyQuery,
  useGetAllSemestersQuery,
} from "../../redux/features/admin/academicManagement.api";
import CardUi from "../../components/ui/dashboard/CardUi";

interface DataType {
  key: React.Key;
  academicFaculty: string;
  academicDepartment: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Academic Faculty",
    dataIndex: "academicFaculty",
  },
  {
    title: "Academic Department",
    dataIndex: "academicDepartment",
  },
];

const AdminDashboard = () => {
  // Fetching data using RTK Query
  const { data: semesterData, isLoading: semesterLoading } =
    useGetAllSemestersQuery(null);
  const { data: facultyData, isLoading: facultyLoading } =
    useGetAcademicFacultyQuery({});
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAcademicDepartmentQuery({});

  const tableData: DataType[] =
    departmentData?.data?.map((department, index) => ({
      key: department._id || index,
      academicFaculty: facultyData?.data?.[index]?.name || "N/A",
      academicDepartment: department.name,
    })) || [];

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Admin Dashboard
      </h1>

      <Row gutter={16}>
        <Col span={8}>
          <CardUi
            title="Academic Semesters"
            data={semesterData?.data?.length || 0}
            loading={semesterLoading}
          />
        </Col>
        <Col span={8}>
          <CardUi
            title="Academic Faculties"
            data={facultyData?.data?.length || 0}
            loading={facultyLoading}
          />
        </Col>
        <Col span={8}>
          <CardUi
            title="Academic Departments"
            data={departmentData?.data?.length || 0}
            loading={departmentLoading}
          />
        </Col>
      </Row>

      <h2
        style={{
          marginTop: "40px",
          marginBottom: "20px",
          textAlign: "center",
        }}>
        Academic Faculty - Department Mapping
      </h2>

      <Table<DataType>
        columns={columns}
        dataSource={tableData}
        pagination={false}
        loading={facultyLoading || departmentLoading}
        style={{
          marginTop: "40px",
          borderTop: "1px solid rgb(228, 228, 228)",
        }}
      />
    </div>
  );
};

export default AdminDashboard;
