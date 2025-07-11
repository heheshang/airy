import { invoke } from "@tauri-apps/api/core";
// import axios from "axios";

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
}

export async function fetchUserProfile():Promise<UserProfile> {
  // 实际 API 地址请替换为你的后端接口
  return invoke("fetch_user_profile")
}

export async function updateUserProfile(profile:UserProfile):Promise<UserProfile> {
  return invoke("update_user_profile", {
    profile
  })
}

export async function updateUserPassword(oldPassword:string, newPassword:string):Promise<boolean> {
  return invoke("update_user_password", {
    oldPassword,
    newPassword
  })
}

export async function deleteUserAccount():Promise<boolean> {
  return invoke("delete_user_account")
}

export async function logout():Promise<boolean> {
  return invoke("logout")
}

export async function login(params: LoginParams):Promise<AuthResponse> {
  return invoke("login", {
    params
  })
}
