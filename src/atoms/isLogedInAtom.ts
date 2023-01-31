import { atom } from "recoil";
import { User } from "firebase/auth";

export interface AuthUserState {
 user: User | null | undefined;
}

const defaultModalState: AuthUserState = {
  user: null,
};

export const authUserState = atom<AuthUserState>({
  key: "authModalState",
  default: defaultModalState,
});