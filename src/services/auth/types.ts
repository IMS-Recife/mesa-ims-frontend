import { AxiosResponse } from "axios";

export type SigninParams = {
  email: string;
  password: string;
};

export type SigninResponse = Promise<
  AxiosResponse<{
    email: string;
    name: string;
    role: Array<string>;
  }>
>;
