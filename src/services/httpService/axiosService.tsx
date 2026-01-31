import Axios, { AxiosInstance } from "axios";
// import * as Updates from "expo-updates";
// import { Tokens } from "../../../screens/login/models/tokens";
import { CodeError } from "../../models/codeError";
import { HttpResponse } from "../../models/httpResponse";
import { HttpService } from "./httpService";

export class AxiosService implements HttpService {
  // private secureStoreService: SecureStoreService;
  public instance: AxiosInstance;
  private apiUrl?: string;

  constructor() {
    this.apiUrl = process.env.EXPO_PUBLIC_API_URL;
    // this.secureStoreService = secureStoreService;
    this.instance = this.createAxiosInstance();
    // this.setAxiosInterceptors();
  }

  public async postFormData(
    url: string,
    bodyFormData: FormData
  ): Promise<HttpResponse> {
    return await this.instance
      .post(url, bodyFormData)
      .then((response) => {
        return {
          data: response.data,
          status: response.status,
        };
      })
      .catch((error) => {
        console.log(error);
        throw this.formatError(error);
      });
  }

  public async get(url: string): Promise<HttpResponse> {
    return await this.instance
      .get(url, {
        responseType: "json",
      })
      .then((response) => {
        return {
          data: response.data,
          status: response.status,
        };
      })
      .catch((error) => {
        throw this.formatError(error);
      });
  }

  public async post(url: string, data?: any): Promise<HttpResponse> {
    return await this.instance
      .post(url, data)
      .then((response) => {
        return {
          data: response.data,
          status: response.status,
        };
      })
      .catch((error) => {
        throw this.formatError(error);
      });
  }

  public async patch(url: string, data?: any): Promise<HttpResponse> {
    return await this.instance
      .patch(url, data)
      .then((response) => {
        return {
          data: response.data,
          status: response.status,
        };
      })
      .catch((error) => {
        throw this.formatError(error);
      });
  }

  public async delete(url: string): Promise<HttpResponse> {
    return await this.instance
      .delete(url)
      .then((response) => {
        return {
          data: response.data,
          status: response.status,
        };
      })
      .catch((error) => {
        throw this.formatError(error);
      });
  }

  private createAxiosInstance(): AxiosInstance {
    return Axios.create({ timeout: -1, baseURL: this.apiUrl });
  }

  // private setAxiosInterceptors = () => {
  //   this.instance.interceptors.request.use(
  //     async (config: InternalAxiosRequestConfig) => {
  //       config.headers.Authorization = `Bearer ${await this.secureStoreService.getValue(
  //         SecureStoreKey.ACCESS_TOKEN
  //       )}`;
  //       return config;
  //     }
  //   );

  //   this.instance.interceptors.response.use(
  //     this.onResponse,
  //     this.onResponseError
  //   );
  // };

  // private onResponse = (response: AxiosResponse): AxiosResponse => {
  //   return response;
  // };

  // private onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  //   if (error.response && error.response.status === 401) {
  //     try {
  //       await this.refreshToken();
  //     } catch {
  //       await this.revokeUser();
  //     }

  //     if (error.config) {
  //       error.config.headers.Authorization = `Bearer ${await this.secureStoreService.getValue(
  //         SecureStoreKey.ACCESS_TOKEN
  //       )}`;
  //       return Axios.request(error.config);
  //     }
  //   }

  //   return Promise.reject(error);
  // };

  // private refreshToken = async (): Promise<void> => {
  //   const userId = await this.secureStoreService.getValue(
  //     SecureStoreKey.USER_ID
  //   );
  //   const refreshToken = await this.secureStoreService.getValue(
  //     SecureStoreKey.REFRESH_TOKEN
  //   );

  //   await this.instance
  //     .post(`${this.apiUrl}login/token/refresh`, {
  //       userId: Number(userId),
  //       refreshToken: refreshToken,
  //     })
  //     .then((response) => {
  //       const data = response.data as Tokens;
  //       if (data.accessToken && data.refreshToken) {
  //         this.secureStoreService.setValue(
  //           SecureStoreKey.ACCESS_TOKEN,
  //           data.accessToken
  //         );
  //         this.secureStoreService.setValue(
  //           SecureStoreKey.REFRESH_TOKEN,
  //           data.refreshToken
  //         );
  //       }
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  // };

  // private revokeUser = async (): Promise<void> => {
  //   await this.secureStoreService.deleteValue(SecureStoreKey.REFRESH_TOKEN);
  //   await this.secureStoreService.deleteValue(SecureStoreKey.ACCESS_TOKEN);
  //   Updates.reloadAsync();
  // };

  private formatError = (error: any): CodeError => {
    let codeError = null;
    if (
      error.response != null &&
      typeof error.response.data === "object" &&
      error.response.data != null
    ) {
      codeError = {
        message:
          "message" in error.response.data
            ? error.response.data.message
            : error.response.data,
        code:
          "code" in error.response.data ? error.response.data.code : undefined,
      };
    } else if (error.response == null) {
      codeError = {
        message: error.message,
      };
    } else {
      codeError = {
        message: error.response.data,
      };
    }

    return codeError;
  };
}
