import { atom } from "recoil";

export interface AuthUser {
  id: string;
  username: string;
  role: "admin" | "user";
  permissions: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  profileImage?: string;
}

export const authUserState = atom<AuthUser | null>({
  key: "authUserState",
  default: undefined,
});
