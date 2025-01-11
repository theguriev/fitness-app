import { z } from "zod";
import {
  atLeastOneNumber,
  atLeastOneSpecialSymbol,
  email,
  lowerCaseAndUpperCase,
  moreThan8ButLessThan20Characters,
} from "../zod";

const passwordZod = moreThan8ButLessThan20Characters
  .and(lowerCaseAndUpperCase)
  .and(atLeastOneNumber)
  .and(atLeastOneSpecialSymbol);

const confirmationZod = z.string().min(8).max(20);

export const formSchema = z
  .object({
    email,
    password: passwordZod,
    confirmation: confirmationZod,
  })
  .refine((data) => data.password === data.confirmation, {
    message: "Passwords do not match!",
    path: ["confirmation"],
  });

export type FormSchema = z.infer<typeof formSchema>;
