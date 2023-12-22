import { useKeyPress } from "ahooks";
import { New, Open, Save, SaveAs } from "./FileOps";

export default function UseKeybinds() {
  useKeyPress(["f5", "f7"], (e) => {
    e.preventDefault();
  });
  useKeyPress(
    ["ctrl.s"],
    async (e) => {
      e.preventDefault();
      Save();
    },
    { exactMatch: true }
  );
  useKeyPress(
    ["shift.ctrl.s"],
    async (e) => {
      e.preventDefault();
      SaveAs();
    },
    { exactMatch: true }
  );
  useKeyPress(
    ["ctrl.n"],
    async (e) => {
      e.preventDefault();
      New();
    },
    { exactMatch: true }
  );
  useKeyPress(
    ["ctrl.o"],
    async (e) => {
      e.preventDefault();
      Open();
    },
    { exactMatch: true }
  );
}
