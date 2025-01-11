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

export const formSchema = z.object({
  email,
  password: passwordZod,
});

export type FormSchema = z.infer<typeof formSchema>;
