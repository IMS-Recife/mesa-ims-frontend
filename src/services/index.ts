import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
import { useAuthStore } from "@stores/auth";
import { useUIStore } from "@stores/ui";

type FetchParams = {
  baseURL?: string;
  path?: string;
  headers?: AxiosRequestHeaders | { Authorization: string };
  data?: JSON | Record<string, unknown>;
  params?: any;
  method?: AxiosRequestConfig["method"];
};

let time = 0;

function requestInterceptor(config: any) {
  const auth = useAuthStore();
  const ui = useUIStore();

  time++;

  ui.toggleLoading(true);

  if (
    auth?.token &&
    config.baseURL === `${import.meta.env.VITE_APP_BASE_URL || ""}/`
  )
    config.headers.Authorization = `Bearer ${auth.token.accessToken}`;

  return config;
}

export function fetch({
  method = "GET",
  baseURL = `${import.meta.env.VITE_APP_BASE_URL || ""}/`,
  path,
  ...data
}: FetchParams): Promise<AxiosResponse> {
  const axiosInstance = axios.create();
  axiosInstance.interceptors.request.use(requestInterceptor);

  axiosInstance.interceptors.response.use(
    (config) => {
      const ui = useUIStore();
      ui.toggleLoading(false);

      return Promise.resolve(config);
    },
    (config) => {
      const ui = useUIStore();
      ui.toggleLoading(false);

      return Promise.reject(config);
    }
  );

  return axiosInstance({
    method,
    baseURL,
    url: path,
    ...data,
  });
}
