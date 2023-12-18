import { appWindow } from "@tauri-apps/api/window";
import { Button } from "@mantine/core";
import { IconX, IconCrop54, IconMinus } from "@tabler/icons-react";

export default function WindowControls() {
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
          if (await appWindow.isFullscreen()) {
            await appWindow.setFullscreen(false);
            return;
          }
          await appWindow.setFullscreen(true);
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
          await appWindow.close();
        }}
      >
        <IconX className="menu-button-icon" />
      </Button>
    </div>
  );
}
// TODO: Add check for unsaved file before closing
