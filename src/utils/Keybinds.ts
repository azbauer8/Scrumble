import { useHotkeys } from "@mantine/hooks";
import { New, Open, Save, SaveAs } from "./FileOps";

export default function UseKeybinds() {
  useHotkeys(
    [
      [
        "f5",
        () => {
          return;
        },
        { preventDefault: true },
      ],
      [
        "f7",
        () => {
          return;
        },
        { preventDefault: true },
      ],
      [
        "mod+s",
        async () => {
          Save();
        },
        { preventDefault: true },
      ],
      [
        "shift+mod+s",
        async () => {
          SaveAs();
        },
        { preventDefault: true },
      ],
      [
        "mod+n",
        async () => {
          New();
        },
        { preventDefault: true },
      ],
      [
        "mod+o",
        async () => {
          Open();
        },
        { preventDefault: true },
      ],
    ],
    [],
    true
  );
}
