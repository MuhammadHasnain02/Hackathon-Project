declare module "axios" {
  export interface AxiosRequestConfig {
    baseURL?: string;
    headers?: Record<string, string>;
  }

  export interface AxiosResponse<T = unknown> {
    data: T;
    status: number;
    statusText: string;
  }

  export interface AxiosInstance {
    get<T = unknown>(url: string): Promise<AxiosResponse<T>>;
    post<T = unknown, B = unknown>(
      url: string,
      body: B
    ): Promise<AxiosResponse<T>>;
    interceptors: {
      request: {
        use: (
          onFulfilled: (config: AxiosRequestConfig) => AxiosRequestConfig
        ) => void;
      };
    };
  }

  export interface AxiosError<T = unknown> extends Error {
    response?: {
      data?: T;
      status?: number;
      statusText?: string;
    };
  }

  export function create(config?: AxiosRequestConfig): AxiosInstance;

  const axios: {
    create: typeof create;
  };

  export { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse };
  export default axios;
}

