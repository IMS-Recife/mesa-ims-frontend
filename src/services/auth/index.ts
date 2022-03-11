import { fetch } from "@services/index";
import type { SigninParams, SigninResponse } from "./types";
import { AxiosResponse } from "axios";

export function signin(auth: SigninParams): SigninResponse {
  return fetch({
    method: "POST",
    path: "auth/login",
    data: auth,
  });
}

export function forgotPassword(email: string): Promise<AxiosResponse> {
  return fetch({
    method: "POST",
    path: "auth/forgot-password",
    data: { email },
  });
}

export function resetPassword(payload: any): Promise<AxiosResponse> {
  return fetch({
    method: "POST",
    path: "/auth/forgot-password/reset",
    data: payload,
  });
}

export function googleSignin(payload: any): Promise<AxiosResponse> {
  return fetch({
    method: "POST",
    path: "auth/login/google",
    data: payload,
  });
}

export function facebookSignin(payload: any): Promise<AxiosResponse> {
  return fetch({
    method: "POST",
    path: "auth/login/facebook",
    data: payload,
  });
}
