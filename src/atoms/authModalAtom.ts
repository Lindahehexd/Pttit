import { atom } from "recoil";

export interface AuthModalState {
  open: boolean;
  //modal's content is string and there are three
  view: "login" | "signup" | "resetPassword";
}

const defaultModalState: AuthModalState = {
  open: false,
  view: "login",
};

export const authModalState = atom<AuthModalState>({
  key: "authModalState",
  default: defaultModalState,
});