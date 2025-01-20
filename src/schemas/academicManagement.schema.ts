import { z } from "zod";

export const academicManagementSchema = z.object({
  name: z.string({
    required_error: "Please provide a valid name for the academic program.",
  }),
  year: z.string({
    required_error: "Please provide the year of the academic program.",
  }),
  startMonth: z.string({
    required_error: "Please specify the start month of the academic program.",
  }),
  endMonth: z.string({
    required_error: "Please specify the end month of the academic program.",
  }),
});

export const academicFacultySchema = z
  .object({
    name: z.string().optional(), // `name` is optional
    newFacultyName: z.string().optional(), // `newFacultyName` is also optional
  })
  .refine(
    (data) => data.name || data.newFacultyName, // At least one should be provided
    {
      message: "Please provide a valid name or create a new one.",
      path: ["name"], // Error will show for `name` field
    }
  )
  .refine(
    (data) => !(data.name && data.newFacultyName), // Prevent both from being provided simultaneously
    {
      message:
        "You cannot select a faculty and create a new one at the same time.",
      path: ["name"], // Error will show for `name` field
    }
  );

export const academicDepartmentSchema = z.object({
  name: z
    .string({
      required_error: "The department name is required.",
    })
    .nonempty(
      "The department name cannot be empty. Please provide a valid name."
    ),
  academicFaculty: z
    .string({
      required_error: "A faculty selection is required.",
    })
    .nonempty("Please select a faculty for the department."),
});
