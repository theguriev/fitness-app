const isServerErrorResponse = (obj: unknown): obj is ServerErrorResponse => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "statusCode" in obj &&
    "message" in obj &&
    typeof (obj as any).statusCode === "number" &&
    typeof (obj as any).message === "string"
  );
};

export default isServerErrorResponse;
