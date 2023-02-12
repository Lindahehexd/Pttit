import { atom } from "recoil";

const defaultTabIndex = 0;

export const atomindex = atom({
  key: "atomindex",
  default: defaultTabIndex,
});
