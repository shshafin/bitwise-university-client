import { Button, Col, Card, Row, Divider, Typography } from "antd";
import PHForm from "../../../components/form/PHForm";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHSelect from "../../../components/form/PHSelect";
import { facultyNames } from "../../../constants/facultyNames";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import PHInput from "../../../components/form/PHInput";

const { Text } = Typography;

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  // Submit handler for the form
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const facultyData = {
      name:
        data.newFacultyName ||
        facultyNames.find((faculty) => faculty.value === data?.name)?.label,
    };

    if (!facultyData.name) {
      toast.error("Please select a valid faculty or enter a new one.", {
        id: toastId,
      });
      return;
    }

    try {
      const res = await addAcademicFaculty(facultyData);

      if ("data" in res) {
        toast.success(res.data?.message || "Faculty created successfully.", {
          id: toastId,
        });
      } else if ("error" in res) {
        const error = res.error as FetchBaseQueryError;
        const errorMessage =
          "data" in error
            ? (error.data as { message: string }).message
            : "Failed to create faculty.";

        toast.error(errorMessage, { id: toastId });
      } else {
        toast.error("Unexpected error occurred. Please try again.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <Row
      justify="center"
      style={{ marginTop: "50px" }}>
      <Col
        xs={24}
        sm={18}
        md={12}
        lg={8}>
        <Card
          title="Create Academic Faculty"
          bordered={true}>
          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicFacultySchema)}>
            {/* Faculty Select Input */}
            <PHSelect
              label="Select Faculty:"
              name="name" // This binds to 'name' field in form data
              options={facultyNames}
            />

            {/* OR Divider */}
            <Divider
              orientation="center"
              style={{ color: "#999" }}>
              <Text type="secondary">OR</Text>
            </Divider>

            {/* Faculty Text Input */}
            <PHInput
              type="text"
              label="Create New Faculty:"
              name="newFacultyName"
            />

            {/* Submit Button */}
            <Button
              htmlType="submit"
              type="primary"
              block>
              Submit
            </Button>
          </PHForm>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateAcademicFaculty;
