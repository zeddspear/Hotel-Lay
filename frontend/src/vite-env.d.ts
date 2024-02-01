/// <reference types="vite/client" />

type userInfo = {
  id: string;
  fullname: string;
  email: string;
};

type registerTypes = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type signinTypes = {
  email: string;
  password: string;
};
