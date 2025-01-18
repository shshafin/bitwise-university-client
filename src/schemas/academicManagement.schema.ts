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
