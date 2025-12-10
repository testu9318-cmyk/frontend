import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/users";
import type { User } from "../types/user";
import { login, logout, registerUser, type RegisterDto, type RegisterResponse } from "../api/client";

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}


export function useLogin() {
  return useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      login(payload.email, payload.password),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: logout,
  });
}

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterDto>({
    mutationFn: registerUser,
  });
}