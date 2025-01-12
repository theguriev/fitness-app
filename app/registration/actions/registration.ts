import { api } from "@/lib/openapi/apiClient";
import { FormSchema } from "../zod";

const registration = async (body: FormSchema) => {
  const request = await api.authorization("/registration", "post", {
    body: { ...body, name: "" },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await request.json();
};

export type RegistrationAction = Awaited<ReturnType<typeof registration>>;

export default registration;
