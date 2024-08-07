import { z } from "zod";
import { Patient } from "@/lib/models";

export const SignUpSchema = z.object({
  firstName: z.string({ required_error: "First name is required" }).min(2),
  lastName: z.string({ required_error: "First name is required" }).min(2),
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const LoginSchema = z.object({
  email: z.string({ required_error: "Please provide an email" }).email(),
  password: z.string(),
});

export const CreatePatientSchema = z.object({
  firstName: z.string({ required_error: "First name is required" }).min(2),
  lastName: z.string({ required_error: "Last name is required" }).min(2),
  birthDate: z.string().transform((arg) => new Date(arg).toISOString()),
  email: z.string().max(0).or(z.string().email()),
  phone: z.string(),
  address: z.string(),
  partnerName: z.string(),
  imageURL: z.string(),
  lmp: z.string().transform((arg) => new Date(arg).toISOString()),
  conceptionDate: z.string().transform((arg) => new Date(arg).toISOString()),
  sonoDate: z.string().transform((arg) => new Date(arg).toISOString()),
  crl: z
    .number()
    .min(15, {
      message: "Too low",
    })
    .max(95, {
      message: "Too high",
    })
    .default(15),
  crlDate: z.string().transform((arg) => new Date(arg).toISOString()),
  edd: z.string().transform((arg) => new Date(arg).toISOString()),
  rhFactor: z.string(),
  delivered: z
    .string()
    .refine((value) => value === "true" || value === "false", {
      message: "Value must be a boolean",
    })
    .transform((value) => value === "true")
    .or(z.boolean()),
  deliveryDate: z.string().transform((arg) => new Date(arg).toISOString()),
  midwifeId: z.number(),
});
