export type BaseResponse<T> = {
  payload: T;
  status: "fail" | "success" | "error";
  message?: string;
  stack?: Error;
};
