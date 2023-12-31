import { useHotkeys } from "@mantine/hooks";
import { New, Open, Save, SaveAs } from "./fileOps";
import useUIState from "@/store/ui";

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
      [
        "mod+p",
        () => {
          return;
        },
        { preventDefault: true },
      ],
      [
        "shift+mod+p",
        () => {
          useUIState
            .getState()
            .setCommandMenuOpen(!useUIState.getState().isCommandMenuOpen);
        },
        { preventDefault: true },
      ],
    ],
    [],
    true
  );
}
