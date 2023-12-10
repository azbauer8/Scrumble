import React from "react";
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
import { useAtom } from "jotai";
import {
  open as openFilePicker,
  save as saveFilePicker,
} from "@tauri-apps/api/dialog";
import { documentDir } from "@tauri-apps/api/path";
import {
  contentJotai,
  filePathJotai,
  savedJotai,
  savingJotai,
} from "../../jotais/file";
import { writeTextFile } from "@tauri-apps/api/fs";
import { aboutJotai, preferenceJotai } from "../../jotais/ui";
import * as showdown from "showdown";

const availbleExts = [
  {
    name: "Markdown",
    extensions: ["md"],
  },
  {
    name: "Text file",
    extensions: ["txt"],
  },
];

const availbleExportExts = [
  {
    name: "HTML",
    extensions: ["htm"],
  },
];

const FileMenu: React.FC = () => {
  const [filePath, setFilePath] = useAtom(filePathJotai);
  const [content, setContent] = useAtom(contentJotai);
  const [, setPreference] = useAtom(preferenceJotai);
  const [saved, setSaved] = useAtom(savedJotai);
  const [, setAbout] = useAtom(aboutJotai);
  const [, setSaving] = useAtom(savingJotai);
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
              setPreference(true);
            }}
          >
            Settings
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAbout(true);
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
