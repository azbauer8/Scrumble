import {
  Menu,
  MenuItem,
  MenuTarget,
  MenuDropdown,
  MenuDivider,
  Button,
} from "@mantine/core";
import { IconMenu } from "@tabler/icons-react";
import Settings from "../OverlayPages/Settings";
import About from "../OverlayPages/About";
import { New, Open, Save, SaveAs } from "../../utils/FileOps";
import useUIState from "../../store/ui";
import useOSState from "../../store/os";

export default function MenuBar() {
  const { setSettingsOpen, setAboutOpen } = useUIState();
  const { isMac } = useOSState();
  return (
    <>
      <Menu
        classNames={{
          dropdown: `menu-dropdown ${isMac ? "mac-dropdown" : ""}`,
        }}
        position={isMac ? "bottom-end" : "bottom-start"}
        offset={4}
      >
        <MenuTarget>
          <Button variant="subtle" color="gray" className="menu-button">
            <IconMenu className="menu-button-icon" />
          </Button>
        </MenuTarget>

        <MenuDropdown>
          <MenuItem onClick={() => New()}>New</MenuItem>
          <MenuItem onClick={() => Open()}>Open</MenuItem>
          <MenuItem onClick={() => Save()}>Save</MenuItem>
          <MenuItem onClick={() => SaveAs()}>Save As</MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => setSettingsOpen(true)}>Settings</MenuItem>
          <MenuItem onClick={() => setAboutOpen(true)}>About</MenuItem>
        </MenuDropdown>
      </Menu>
      <Settings />
      <About />
    </>
  );
}

// when implementing New/Open/Any file change, always check if the current file is saved first
