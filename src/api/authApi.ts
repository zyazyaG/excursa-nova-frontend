import { AuthFormData, AuthResponse } from '../types/auth';
// import api from "./axios";

export async function authApi(data: { email: string; password: string; name?: string }, type: string) {
  const endpoint =  type === "signup" ? "/sign-up" : "/sign-in";
  const url = "http://localhost:3600/api/auth" + endpoint;

  try {
    const response = await fetch (url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data)
      });

      if (response.status === 409) {
        console.log("User already exists");
      }

    if (response.ok) {
        const user:AuthResponse = await response.json();
        return user;
    }  
  } catch (error) {
    console.log(error);
  }
}

export async function refreshToken() {
  const res = await fetch("http://localhost:3600/api/auth/refresh", {
    method: "POST",
    credentials: "include", 
});

  if (!res.ok) throw new Error("Refresh token failed");

  const { token } = await res.json();
  return token;
}