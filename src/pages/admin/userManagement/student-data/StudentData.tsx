import {
  Button,
  Space,
  Table,
  TableColumnsType,
  Image,
  Pagination,
  TableProps,
} from "antd";
import { useGetStudentsQuery } from "../../../../redux/features/admin/userManagement.api";
import { TQueryParam, TStudent } from "../../../../types";
import { useState } from "react";
import { Link } from "react-router-dom";

export type TTableData = Pick<
  TStudent,
  "fullName" | "id" | "email" | "contactNo" | "profileImg"
>;

const StudentData = () => {
  //  user block

  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: studentData, isFetching } = useGetStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    { name: "limit", value: 5 },
    ...params,
  ]);

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

  const metaData = studentData?.meta;

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
      render: (item) => {
        return (
          <Space style={{ width: "1%" }}>
            <Link to={`/admin/students-data/${item?.key}/update`}>
              <Button>Update</Button>
            </Link>

            <Button>Block</Button>
            <Link to={`/admin/students-data/${item?.key}`}>
              <Button>Details</Button>
            </Link>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Student Data
      </h1>

      <Table<TTableData>
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
        loading={isFetching}
        pagination={false}
        onChange={onChange}
        style={{ marginBottom: "20px" }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}>
        <Pagination
          pageSize={metaData?.limit}
          total={metaData?.total}
          onChange={(value) => setPage(value)}
        />
      </div>
    </div>
  );
};

export default StudentData;
