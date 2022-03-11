export type SignupParams = {
  name: string;
  email: string;
  password: string;
  roles: Array<string>;
};

export type SignupParamsSocial = {
  roles: Array<string>;
  credential: string;
};
