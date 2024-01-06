export type MessageMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const REQ_ENDPOINT = (method: MessageMethod, endpoint: string) =>
  `${method}:${endpoint}`;
