import { atomWithStorage } from "jotai/utils";

interface Setting {
  syntax: "gfm" | "commonmark";
  autoSave: boolean;
  saveBlur: boolean;
  saveInterval: number;
  defaultPath: string;
  vibrancy: "Mica" | "Acrylic" | "Default";
}

export const userSettings = atomWithStorage<Setting>("settings", {
  syntax: "gfm",
  autoSave: false,
  saveBlur: false,
  saveInterval: 120,
  defaultPath: "",
  vibrancy: "Default",
});
