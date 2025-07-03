import axiosInstance from "@/config/axiosConfig"; 
import { User } from "@/types/User";

export async function fetchCurrentUser(): Promise<User> {
  const response = await axiosInstance.get<User>("/user/getUser", { withCredentials: true });
  return response.data;
}


export async function updateUserProfile(data: { name?: string; password?: string }) {
  const res = await axiosInstance.patch("/user/profile", data, { withCredentials: true });
  return res.data;
}
