export type HttpResponse<T = any> = {
  data: T;
  status: number;
};
