import { fetch } from "@services/index";
import type { SignupParams, SignupParamsSocial } from "./types";
import { AxiosResponse } from "axios";

export function registerUser(payload: SignupParams): Promise<AxiosResponse> {
  return fetch({
    method: "POST",
    path: "users/",
    data: payload,
  });
}

export function registerUserGoogle(
  payload: SignupParamsSocial
): Promise<AxiosResponse> {
  return fetch({
    method: "POST",
    path: "users/google",
    data: payload,
  });
}

export function registerUserFacebook(
  payload: SignupParamsSocial
): Promise<AxiosResponse> {
  return fetch({
    method: "POST",
    path: "users/facebook",
    data: payload,
  });
}
