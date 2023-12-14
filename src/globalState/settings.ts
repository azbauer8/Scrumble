import { atomWithStorage } from "jotai/utils";

interface SettingsProps {
  syntax: "gfm" | "commonmark";
  autoSave: boolean;
  saveBlur: boolean;
  saveInterval: number;
  defaultPath: string;
}

export const userSettingsState = atomWithStorage<SettingsProps>("settings", {
  syntax: "gfm",
  autoSave: false,
  saveBlur: false,
  saveInterval: 120,
  defaultPath: "",
});
