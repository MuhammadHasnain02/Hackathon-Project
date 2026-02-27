export interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface MeResponse {
  message: string;
  user: User;
}

export interface ErrorResponse {
  message: string;
}

export interface FormInputs {
  name?: string;
  email: string;
  password: string;
}

