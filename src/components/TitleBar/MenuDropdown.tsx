import {
  Menu,
  MenuItem,
  MenuTarget,
  MenuDropdown,
  MenuDivider,
  Button,
} from "@mantine/core";
import { IconMenu } from "@tabler/icons-react";
import useUIState from "../../store/ui";
import Settings from "../OverlayPages/Settings";
import About from "../OverlayPages/About";

export default function MenuBar() {
  const { setSettingsOpen, setAboutOpen } = useUIState();
  return (
    <>
      <Menu classNames={{ dropdown: "menu-dropdown" }}>
        <MenuTarget>
          <Button variant="subtle" color="gray" className="menu-button">
            <IconMenu className="menu-button-icon" />
          </Button>
        </MenuTarget>

        <MenuDropdown>
          <MenuItem>New</MenuItem>
          <MenuItem>Open</MenuItem>
          <MenuItem>Save</MenuItem>
          <MenuItem>Save As</MenuItem>
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
