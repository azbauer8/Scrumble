import { useHotkeys } from "@mantine/hooks";
import { New, Open, OpenFolder, Save, SaveAs } from "./fileOps";
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
        "shift+mod+o",
        async () => {
          OpenFolder();
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
        "shift+mod+e",
        () => {
          const isOpen = useUIState.getState().isSidebarOpen;
          isOpen
            ? useUIState.getState().sidebarRef?.collapse()
            : useUIState.getState().sidebarRef?.expand();
          useUIState.getState().setSidebarOpen(!isOpen);
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
