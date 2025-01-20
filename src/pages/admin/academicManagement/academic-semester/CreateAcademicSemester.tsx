import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { TResponse } from "../../../../types/global.type";
import { useAddAcademicSemesterMutation } from "../../../../redux/features/admin/academicManagement.api";
import { semesterNames } from "../../../../constants/semesterNames";
import PHForm from "../../../../components/form/PHForm";
import PHSelect from "../../../../components/form/PHSelect";
import { academicManagementSchema } from "../../../../schemas/academicManagement.schema";
import { monthOptions } from "../../../../constants/global";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const name = semesterNames[Number(data?.name) - 1]?.label;

    const semesterData = {
      name,
      code: data?.name,
      year: data?.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth,
    };

    try {
      const res = (await addAcademicSemester(
        semesterData
      )) as TResponse<FieldValues>;

      if (res?.error) {
        const errorMessage = res?.error?.data?.message || "An error occurred!";
        toast.error(errorMessage, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
      console.log(res);
    } catch {
      toast.error("Something went wrong. Please try again.", { id: toastId });
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Create Academic Semester
      </h1>

      <Flex
        justify="center"
        align="center">
        <Col span={6}>
          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicManagementSchema)}>
            <PHSelect
              label="Name:"
              name="name"
              options={semesterNames}
            />
            <PHSelect
              label="Year:"
              name="year"
              options={yearOptions}
            />
            <PHSelect
              label="Start Month:"
              name="startMonth"
              options={monthOptions}
            />
            <PHSelect
              label="End Month:"
              name="endMonth"
              options={monthOptions}
            />

            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcademicSemester;
