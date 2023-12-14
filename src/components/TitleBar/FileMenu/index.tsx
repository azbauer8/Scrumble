import {
  open as openFilePicker,
  save as saveFilePicker,
} from "@tauri-apps/api/dialog";
import { documentDir } from "@tauri-apps/api/path";
import { writeTextFile } from "@tauri-apps/api/fs";
import React from "react";
import * as showdown from "showdown";

import { useAtom } from "jotai";
import {
  fileContentState,
  currentFileState,
  isSavedState,
  isSavingState,
} from "../../../globalState/file";
import { aboutOpenState, settingsOpenState } from "../../../globalState/ui";

import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import { Folder16Regular } from "@fluentui/react-icons";

const availbleExts = [
  {
    name: "Markdown",
    extensions: ["md"],
  }
];

const availbleExportExts = [
  {
    name: "HTML",
    extensions: ["htm"],
  },
];

const FileMenu: React.FC = () => {
  const [currentFile, setCurrentFile] = useAtom(currentFileState);
  const [fileContent, setFileContent] = useAtom(fileContentState);
  const [, setSettingsOpen] = useAtom(settingsOpenState);
  const [isSaved, setSaved] = useAtom(isSavedState);
  const [, setAboutOpen] = useAtom(aboutOpenState);
  const [, setSaving] = useAtom(isSavingState);
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuButton size="small" appearance="subtle" icon={<Folder16Regular />}>
          File
        </MenuButton>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem
            onClick={async () => {
              setCurrentFile(null);
            }}
          >
            New
          </MenuItem>
          <MenuItem
            onClick={async () => {
              // @todo need refactor
              const selected = await openFilePicker({
                defaultPath: await documentDir(),
                filters: availbleExts,
              });
              if (selected === null) return;
              setCurrentFile(selected as string);
            }}
          >
            Open
          </MenuItem>
          <MenuItem
            disabled={currentFile === null}
            onClick={async () => {
              setSaving(true);
            }}
          >
            Save
          </MenuItem>
          <MenuItem
            onClick={async () => {
              // Store original jotai
              const originalFilePath = currentFile;
              const originalContent = fileContent;
              const originalSaved = isSaved;
              // If filePath is null, setSaving will trigged file picker automatically
              setCurrentFile(null);
              setSaving(true);
              // Restore original jotai
              setCurrentFile(originalFilePath);
              setFileContent(originalContent);
              setSaved(originalSaved);
            }}
          >
            Save As
          </MenuItem>
          <MenuDivider />
          <MenuItem
            onClick={async () => {
              // @todo need refactor
              const selected = await saveFilePicker({
                defaultPath: await documentDir(),
                filters: availbleExportExts,
              });
              if (selected === null) return;
              const index = selected.lastIndexOf(".");
              if (index === -1) return;
              const ext = selected.substring(index + 1);
              switch (ext) {
                case "htm":
                  // eslint-disable-next-line no-case-declarations
                  const converter = new showdown.Converter(); // @todo use ProseMirror's toDOM function
                  await writeTextFile({
                    path: selected as string,
                    contents: converter.makeHtml(fileContent),
                  });
                  break;
              }
            }}
          >
            Export
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSettingsOpen(true);
            }}
          >
            Settings
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAboutOpen(true);
            }}
          >
            About
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export default FileMenu;
