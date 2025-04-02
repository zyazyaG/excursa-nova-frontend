import React from 'react'
import { AuthResponse } from '../types/auth';

export async function authApi(data: { email: string; password: string; name?: string }, type: string) {
  const endpoint =  type === "signup" ? "/sign-up" : "/sign-in";
  const url = "http://localhost:3600/api/auth" + endpoint;

  try {
    const responce = await fetch (url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

    if (responce.ok) {
        const user:AuthResponse = await responce.json();
        return user;
    }  
  } catch (error) {
    console.log(error);
  }
}
