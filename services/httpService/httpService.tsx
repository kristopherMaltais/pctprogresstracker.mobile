import { HttpResponse } from "../../models/httpResponse";

export interface HttpService {
  post: (url: string, data?: unknown) => Promise<HttpResponse>;
  postFormData: (url: string, bodyFormData: FormData) => Promise<HttpResponse>;
  get: (url: string) => Promise<HttpResponse>;
  patch: (url: string, data?: unknown) => Promise<HttpResponse>;
  delete: (url: string) => Promise<HttpResponse>;
}
