import z from "zod";

export const SignupSchema = z.object({
  displayName: z.string().min(1, "You have to fill out this form"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password has to be more than 6 characters"),
});

export type SignupFormType = z.infer<typeof SignupSchema>;

export const LoginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password has to be more than 6 characters"),
});

export type LoginFormType = z.infer<typeof LoginSchema>;
