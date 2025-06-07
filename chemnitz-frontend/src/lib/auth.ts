import api from "./api";

interface LoginResponse {
  token: string;
}

export async function loginUser(email: string, password: string): Promise<string> {
  const response = await api.post<LoginResponse>("/auth/login", { email, password });
  return response.data.token;
}
