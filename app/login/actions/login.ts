import { api } from "@/lib/openapi/apiClient";
import { FormSchema } from "../zod";

const login = async (body: FormSchema) => {
  const request = await api.authorization("/login", "post", {
    body,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await request.json();
};

export type LoginAction = Awaited<ReturnType<typeof login>>;

export default login;
