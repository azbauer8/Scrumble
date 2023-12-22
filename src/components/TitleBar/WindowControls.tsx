import { appWindow } from "@tauri-apps/api/window";
import { Button } from "@mantine/core";
import { IconX, IconCrop54, IconMinus } from "@tabler/icons-react";
import { ask } from "@tauri-apps/api/dialog";
import useFileState from "../../store/file";
import { Save, SaveAs } from "../../utils/FileOps";

export default function WindowControls() {
  const { isSaved, filePath } = useFileState();
  return (
    <div className="window-controls">
      <Button
        variant="subtle"
        color="gray"
        className="menu-button"
        onClick={async () => {
          await appWindow.minimize();
        }}
      >
        <IconMinus className="menu-button-icon" />
      </Button>
      <Button
        variant="subtle"
        color="gray"
        className="menu-button"
        onClick={async () => {
          await appWindow.toggleMaximize();
        }}
      >
        <IconCrop54 className="menu-button-icon" />
      </Button>
      <Button
        variant="subtle"
        color="gray"
        className="menu-button"
        id="close-button"
        onClick={async () => {
          await HandleClose();
        }}
      >
        <IconX className="menu-button-icon" />
      </Button>
    </div>
  );
  async function HandleClose() {
    if (!isSaved) {
      const response = await ask(
        "The current file is unsaved, do you want to save it first?",
        { title: "Warning", type: "warning" }
      );
      if (response) {
        filePath ? await Save() : await SaveAs();
      }
    }
    await appWindow.close();
  }
}
