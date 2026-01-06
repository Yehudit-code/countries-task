import { atom } from "recoil";

export interface AuthUser {
  name: string;
  email: string;
  role: "admin" | "user";
  permissions: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

export const authUserState = atom<AuthUser | null>({
  key: "authUserState",
  default: null,
});
