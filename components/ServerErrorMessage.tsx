import ErrorText from "@/components/ErrorText";

const ServerErrorMessage = ({
  response,
}: {
  response?: ServerErrorResponse;
}) => {
  if (response?.statusCode === 409 || response?.statusCode === 403) {
    return <ErrorText>{response.message}</ErrorText>;
  }
  return null;
};

export default ServerErrorMessage;
