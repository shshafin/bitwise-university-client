import { Button, Col, Card, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHSelect from "../../../components/form/PHSelect";
import { facultyNames } from "../../../constants/facultyNames";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  // Submit handler for the form
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    // Log the form data to debug
    console.log("Form Data:", data);

    // Ensure the 'name' field is properly selected and mapped
    const name = facultyNames.find(
      (faculty) => faculty.value === data?.name
    )?.label;

    const facultyData = {
      name,
    };
    if (!facultyData.name) {
      toast.error("Please select a valid faculty.", { id: toastId });
      return;
    }

    try {
      // Add faculty through the API call
      const res = await addAcademicFaculty(facultyData);

      // Handle error response
      if ("error" in res) {
        const errorMessage =
          res.error?.data?.message || "Failed to create faculty.";
        toast.error(errorMessage, { id: toastId });
        return;
      }

      // Success response
      toast.success(res.data?.message || "Faculty created successfully.", {
        id: toastId,
      });
    } catch (error: any) {
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
