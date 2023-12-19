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
import useFileState from "../../store/file";
import { New, Open, Save, SaveAs } from "../../utils/FileOps";

export default function MenuBar() {
  const { setSettingsOpen, setAboutOpen } = useUIState();
  const {
    editorRef,
    fileContent,
    setFileContent,
    filePath,
    setFilePath,
    isSaved,
    setSaved,
  } = useFileState();
  const { isMac } = useUIState();
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
          <MenuItem onClick={() => New(editorRef, setFilePath, setFileContent)}>
            New
          </MenuItem>
          <MenuItem
            onClick={() => Open(editorRef, setFilePath, setFileContent)}
          >
            Open
          </MenuItem>
          <MenuItem
            onClick={() =>
              Save(filePath, setFilePath, fileContent, isSaved, setSaved)
            }
          >
            Save
          </MenuItem>
          <MenuItem onClick={() => SaveAs(setFilePath, fileContent, setSaved)}>
            Save As
          </MenuItem>
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
