import { atomWithStorage } from "jotai/utils";

interface Setting {
  theme: "nord" | "nordDark" | "tokyo";
  themeDark: "nord" | "nordDark" | "tokyo";
  syntax: "gfm" | "commonmark";
  autoSave: boolean;
  saveBlur: boolean;
  saveInterval: number;
  defaultPath: string;
  vibrancy: "Mica" | "Acrylic" | "Default";
}

export const userSettings = atomWithStorage<Setting>("settings", {
  theme: "nord",
  themeDark: "nordDark",
  syntax: "gfm",
  autoSave: false,
  saveBlur: false,
  saveInterval: 120,
  defaultPath: "",
  vibrancy: "Default",
});
