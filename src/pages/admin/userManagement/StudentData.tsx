import {
  Button,
  Space,
  Table,
  TableColumnsType,
  TableProps,
  Image,
} from "antd";
import { useGetStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { TStudent } from "../../../types";

export type TTableData = Pick<
  TStudent,
  "fullName" | "id" | "email" | "contactNo" | "profileImg"
>;

const StudentData = () => {
  const { data: studentData, isFetching } = useGetStudentsQuery(undefined);

  const tableData = studentData?.data?.map(
    ({ _id, fullName, id, email, contactNo, profileImg }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
      profileImg,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Profile Image",
      key: "profileImg",
      dataIndex: "profileImg",
      render: (profileImg: string) => (
        <Image
          width={50}
          src={profileImg} // Use the profileImg URL
          alt="Profile Image"
          fallback="https://via.placeholder.com/50" // Optional fallback image in case the URL is broken
        />
      ),
    },
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      key: "action",
      render: () => {
        return (
          <Space>
            <Button>Update</Button>
            <Button>Block</Button>
            <Button>Details</Button>
          </Space>
        );
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
        Student Data
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

export default StudentData;
