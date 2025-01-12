import { defu } from "defu";
import AsyncStorage from "@react-native-async-storage/async-storage";

import replacePathParameters from "./replacePathParameters";
import { authorization } from "./schemas/";
import type {
  Parameters as EndpointParameters,
  ExtractContentJson,
  ExtractResponses,
} from "./types";
import omit from "@/utils/omit";
import { fetch, FetchRequestInit } from "expo/fetch";

const stringifyOrUndefinedBody = (
  body: BodyInit | undefined
): undefined | string => {
  if (!body) {
    return;
  }
  return JSON.stringify(body);
};

const objectifyOrUndefinedCookie = (cookie: Record<string, string>) => {
  if (!cookie) {
    return;
  }
  return {
    Cookie: Object.entries(cookie)
      .map(([key, value]) => `${key}=${value}`)
      .join("; "),
  };
};

const getAccessToken = async () => await AsyncStorage.getItem("accessToken");

const createRequest = <Paths>({ getBaseUrl }: { getBaseUrl: () => string }) => {
  return async <
    Path extends keyof Paths,
    Method extends keyof Paths[Path],
    Responses extends ExtractResponses<Paths[Path][Method]>,
    FancyResponse = Omit<Response, "json" | "status"> &
      {
        [K in keyof Responses]: {
          status: K;
          json: () => Promise<ExtractContentJson<Responses[K]>>;
        };
      }[keyof Responses]
  >(
    path: Path,
    method: Method = "get" as Method,
    parameters: EndpointParameters<Paths[Path][Method]> &
      Omit<FetchRequestInit, "body"> & {
        authorization?: boolean;
      } = {} as EndpointParameters<Paths[Path][Method]> &
      Omit<FetchRequestInit, "body"> & {
        authorization?: boolean;
      }
  ): Promise<FancyResponse> => {
    const body = "body" in parameters ? parameters.body : undefined;
    const cookie = "cookie" in parameters ? parameters.cookie : undefined;
    const cookieWithAuthorization = parameters.authorization
      ? { accessToken: getAccessToken(), ...(cookie as Record<string, string>) }
      : cookie;
    const pathParams =
      "path" in parameters ? (parameters.path as Record<string, string>) : {};

    const fetchParameters = defu(
      {
        method,
        body: stringifyOrUndefinedBody(body as BodyInit),
        headers: {
          ...objectifyOrUndefinedCookie(
            cookieWithAuthorization as Record<string, string>
          ),
        },
      },
      omit(parameters as Record<string, string>, [
        "body",
        "cookie",
        "authorization",
        "path",
      ])
    ) as unknown as FetchRequestInit;
    console.log(
      "log: fetch",
      `${getBaseUrl()}${replacePathParameters(path.toString(), pathParams)}`,
      fetchParameters
    );
    return (await fetch(
      `${getBaseUrl()}${replacePathParameters(path.toString(), pathParams)}`,
      fetchParameters
    )) as unknown as Promise<FancyResponse>;
  };
};

export const api = {
  authorization: createRequest<authorization.paths>({
    getBaseUrl: () => `${process.env.EXPO_PUBLIC_API_URL}`,
  }),
};
