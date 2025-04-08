import { User } from "./user";

export interface AuthFormData {
    email: string;
    password: string;
    name?: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }