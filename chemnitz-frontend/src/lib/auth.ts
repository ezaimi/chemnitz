import api from "./api";

interface LoginResponse {
  token: string;
}

export async function loginUser(email: string, password: string): Promise<string> {
  const response = await api.post<LoginResponse>("/auth/login", { email, password });
  return response.data.token;
}

interface SignupResponse {
  token: string;
}

export async function signupUser(name: string, email: string, password: string): Promise<string> {
  const response = await api.post<SignupResponse>("/auth/signup", { name, email, password });
  return response.data.token;
}