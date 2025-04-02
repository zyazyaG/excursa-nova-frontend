export interface AuthFormData {
    email: string;
    password: string;
    name?: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  }