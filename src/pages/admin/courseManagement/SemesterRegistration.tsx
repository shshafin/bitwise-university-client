import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { semesterStatus } from "../../../constants/global";
import PHInput from "../../../components/form/PHInput";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const SemesterRegistration = () => {
  const [addSemesterRegistration] = useAddSemesterRegistrationMutation();

  const { data: academicSemester } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((data) => ({
    value: data?._id,
    label: `${data?.name} ${data?.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const semesterData = {
      ...data,
      minCredit: Number(data?.minCredit),
      maxCredit: Number(data?.maxCredit),
    };

    try {
      const res = (await addSemesterRegistration(
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
        Semester Registration
      </h1>

      <Flex
        justify="center"
        align="center">
        <Col span={6}>
          <PHForm onSubmit={onSubmit}>
            <PHSelect
              label="Academic Semester:"
              name="academicSemester"
              options={academicSemesterOptions}
            />
            <PHSelect
              label="Status:"
              name="status"
              options={semesterStatus}
            />
            <PHDatePicker
              label="Start Date:"
              name="startDate"
            />
            <PHDatePicker
              label="End Date:"
              name="endDate"
            />
            <PHInput
              type="text"
              name="minCredit"
              label="Min Credit:"
            />
            <PHInput
              type="text"
              name="maxCredit"
              label="Max Credit:"
            />

            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default SemesterRegistration;
