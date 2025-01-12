export type ExtractResponses<T> = ExtractKey<T, "responses">;

export type ExtractKey<
  T,
  K extends string | number | symbol
> = K extends keyof T ? T[K] : never;

export type ExtractContentJson<T> = "content" extends keyof T
  ? "application/json" extends keyof T["content"]
    ? T["content"]["application/json"]
    : never
  : never;

type HasParameters = {
  parameters: Record<string, unknown>;
};

type ExtractParameters<T> = T extends HasParameters
  ? Partial<ExtractKey<T, "parameters">>
  : unknown;

type HasRequestBody = {
  requestBody: { content: { "application/json": unknown } };
};

type AddRequestBodyIfExists<T, V> = T extends HasRequestBody
  ? V & { body: T["requestBody"]["content"]["application/json"] }
  : V;

type AddExtra<T> = T & {
  headers?: HeadersInit & { "Content-type"?: ContentType };
};

type MakePathRequiredIfExists<T> = "path" extends keyof T
  ? Omit<T, "path"> & { path: T["path"] }
  : T;

export type Parameters<T> = MakePathRequiredIfExists<
  AddExtra<AddRequestBodyIfExists<T, ExtractParameters<T>>>
>;
type BaseParams = {
  query: Record<string, unknown>;
  body: Record<string, string>;
  path: Record<string, string>;
};
export type InnerParams = AddExtra<BaseParams>;

export type GeneratorConfig = {
  entries: Array<[string, string]>;
  baseUrl: string;
  targetFolder: string;
};

/**
 * Possible content types what we allow to our api.
 */
export type ContentType = "" | "application/json";
