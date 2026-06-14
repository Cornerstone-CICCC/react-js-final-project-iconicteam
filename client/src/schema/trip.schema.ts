import z from "zod";

const MAX_TRIP_BUDGET = 2147483647;

export const CreateTripSchema = z.object({
  title: z.string().min(1, "Trip title is required"),
  startDay: z.iso.date("Start date is required"),
  budget: z
    .number()
    .int("Budget must be a whole number")
    .min(1, "Budget must be at least 1")
    .max(MAX_TRIP_BUDGET, "Budget is too large"),
  img: z.string().min(1, "Trip image is required"),
  yourCurrency: z.string().min(1, "Currency is required"),
});

export type CreateTripFormData = z.infer<typeof CreateTripSchema>;
