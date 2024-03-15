import useUIStore from "@/store/uiStore"
import { useHotkeys } from "@mantine/hooks"
import { useKmenu } from "kmenu"
import { newFile, openFile, openFolder, saveFile, saveFileAs } from "./fileOps"

export default function addKeymap() {
  const { toggle } = useKmenu()

  useHotkeys(
    [
      ["shift+mod+p", () => toggle(), { preventDefault: true }],
      [
        "shift+mod+e",
        () =>
          useUIStore
            .getState()
            .setSidebarOpen(!useUIStore.getState().sidebarOpen),
        { preventDefault: true },
      ],
      [
        "tab",
        (e) => {
          if (document.activeElement?.classList.contains("tiptap")) {
            e.preventDefault()
          }
        },
      ],
      ["mod+s", async () => await saveFile(), { preventDefault: true }],
      ["shift+mod+s", async () => await saveFileAs(), { preventDefault: true }],
      ["mod+n", async () => await newFile(), { preventDefault: true }],
      ["mod+o", async () => await openFile(), { preventDefault: true }],
      [
        "shift+mod+o",
        async () => {
          openFolder()
        },
        { preventDefault: true },
      ],
      // preventing defaults
      // ["mod+r", () => {}, { preventDefault: true }],
      ["shift+mod+r", () => {}, { preventDefault: true }],
      ["mod+p", () => {}, { preventDefault: true }],
      ["mod+j", () => {}, { preventDefault: true }],
      ["mod+f", () => {}, { preventDefault: true }],
      ["f5", () => {}, { preventDefault: true }],
      ["f7", () => {}, { preventDefault: true }],
    ],
    [],
    true,
  )
}
