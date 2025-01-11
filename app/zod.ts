import { z } from "zod";

export const name = z.string().min(3).max(20);
export const email = z.string().email();
export const moreThan8ButLessThan20Characters = z.string().min(8).max(20);
export const lowerCaseAndUpperCase = z.string().regex(/[a-z]/).regex(/[A-Z]/);
export const atLeastOneNumber = z.string().regex(/[0-9]/);
export const atLeastOneSpecialSymbol = z.string().regex(/[^a-zA-Z0-9]/);
