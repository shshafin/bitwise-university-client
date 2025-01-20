/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const { data: academicFacultyData } = useGetAcademicFacultyQuery({});

  // Map faculty names to include their IDs, ensuring it's always defined as an array
  const facultyData =
    academicFacultyData?.data?.map(({ _id, name }) => ({
      key: _id,
      name,
    })) || []; // Default to an empty array if undefined

  const facultyNames = facultyData.map(({ key, name }) => ({
    label: name,
    value: key, // This ensures the selected option sends the faculty ID
  }));

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Creating...");
    try {
      const res = await addAcademicDepartment(data);

      if ("data" in res) {
        toast.success(
          res.data?.message || "Academic Department created successfully.",
          {
            id: toastId,
          }
        );
      } else if ("error" in res) {
        // Type assertion for RTK Query error handling
        const error = res.error as FetchBaseQueryError;
        const errorMessage =
          "data" in error
            ? (error.data as { message: string }).message
            : "Failed to create department.";

        toast.error(errorMessage, { id: toastId });
      } else {
        toast.error("Unexpected error occurred. Please try again.", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Unexpected error occurred. Please try again.", {
        id: toastId,
      });
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div>
      <Flex
        justify="center"
        align="center">
        <Col span={6}>
          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicDepartmentSchema)}>
            <PHInput
              type="text"
              name="name"
              label="Academic Department:"
              placeholder="Enter a department name"
            />
            <PHSelect
              label="Select Faculty:"
              name="academicFaculty"
              options={facultyNames} // Now it will always be an array
            />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcademicDepartment;
