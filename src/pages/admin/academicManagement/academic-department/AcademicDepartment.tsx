import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAcademicDepartmentQuery } from "../../../../redux/features/admin/academicManagement.api";

export type TTableData = {
  key: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const AcademicDepartment = () => {
  const { data: academicDepartmentData, isFetching } =
    useGetAcademicDepartmentQuery({});

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Formats as 'DD/MM/YYYY'
  };

  const tableData = academicDepartmentData?.data?.map(
    ({ _id, name, academicFaculty, createdAt, updatedAt }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty?.name || "N/A",
      createdAt: formatDate(createdAt),
      updatedAt: formatDate(updatedAt),
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Academic Faculty",
      key: "academicFaculty",
      dataIndex: "academicFaculty",
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "createdAt",
    },
    {
      title: "Updated At",
      key: "updatedAt",
      dataIndex: "updatedAt",
    },
    {
      title: "Action",
      key: "action",
      render: () => {
        return <Button>Update</Button>;
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    console.log(_pagination, filters, _sorter, extra);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Academic Department
      </h1>

      <Table<TTableData>
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        loading={isFetching}
      />
    </div>
  );
};

export default AcademicDepartment;
