import axiosInstance from "@/config/axiosConfig"; 
import { User } from "@/types/User";

export async function fetchCurrentUser(): Promise<User> {
  const response = await axiosInstance.get<User>("/user/getUser", { withCredentials: true });
  return response.data;
}