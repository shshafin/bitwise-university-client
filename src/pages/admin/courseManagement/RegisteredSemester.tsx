import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { useGetRegisteredSemesterQuery } from "../../../redux/features/admin/courseManagement.api";
import { TQueryParam, TRegisteredSemester } from "../../../types";
import { Link } from "react-router-dom";

export type TTableData = Pick<
  TRegisteredSemester,
  "status" | "startDate" | "endDate"
>;

const RegisteredSemester = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const { data: semesterInfo, isFetching } =
    useGetRegisteredSemesterQuery(params);
  console.log(semesterInfo);

  const tableData = semesterInfo?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester?.name} ${academicSemester?.year}`,
      startDate,
      endDate,
      status,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Academic Semester",
      key: "name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },

    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      filters: [
        {
          text: "Upcoming",
          value: "UPCOMING",
        },
        {
          text: "Ongoing",
          value: "ONGOING",
        },
        {
          text: "Ended",
          value: "ENDED",
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "action",
      render: (item) => {
        return (
          <Space style={{ width: "1%" }}>
            <Link to={`/admin/faculties-data/${item?.key}/update`}>
              <Button>Update</Button>
            </Link>

            <Button>Block</Button>
            <Link to={`/admin/faculties-data/${item?.key}`}>
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
      filters?.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters?.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Registered Semester
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

export default RegisteredSemester;
