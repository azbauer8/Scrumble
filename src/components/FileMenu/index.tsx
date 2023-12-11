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
  fileContent,
  currentFile,
  isSaved,
  isSaving,
} from "../../globalState/file";
import { aboutOpen, settingsOpen } from "../../globalState/ui";

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
  const [filePath, setFilePath] = useAtom(currentFile);
  const [content, setContent] = useAtom(fileContent);
  const [, setSettingsOpen] = useAtom(settingsOpen);
  const [saved, setSaved] = useAtom(isSaved);
  const [, setAboutOpen] = useAtom(aboutOpen);
  const [, setSaving] = useAtom(isSaving);
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
              setFilePath(null);
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
              setFilePath(selected as string);
            }}
          >
            Open
          </MenuItem>
          <MenuItem
            disabled={filePath === null}
            onClick={async () => {
              setSaving(true);
            }}
          >
            Save
          </MenuItem>
          <MenuItem
            onClick={async () => {
              // Store original jotai
              const originalFilePath = filePath;
              const originalContent = content;
              const originalSaved = saved;
              // If filePath is null, setSaving will trigged file picker automatically
              setFilePath(null);
              setSaving(true);
              // Restore original jotai
              setFilePath(originalFilePath);
              setContent(originalContent);
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
                    contents: converter.makeHtml(content),
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
