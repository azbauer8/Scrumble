import { atomWithStorage } from "jotai/utils";

interface Setting {
  theme: "light" | "dark";
  syntax: "gfm" | "commonmark";
  autoSave: boolean;
  saveBlur: boolean;
  saveInterval: number;
  defaultPath: string;
  vibrancy: "Mica" | "Acrylic" | "Default";
}

export const userSettings = atomWithStorage<Setting>("settings", {
  theme: "light",
  syntax: "gfm",
  autoSave: false,
  saveBlur: false,
  saveInterval: 120,
  defaultPath: "",
  vibrancy: "Default",
});
