import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import useFileState from "@/store/file";
import { Open } from "@/utils/fileOps";
import { tauri } from "@tauri-apps/api";
import { writeText } from "@tauri-apps/api/clipboard";
import { removeDir, removeFile } from "@tauri-apps/api/fs";
import { MutableRefObject } from "react";

export default function SidebarContextMenu({
  type,
  path,
  setIsEditing,
}: {
  type: "sidebar" | "file" | "folder";
  path: string;
  setIsEditing: () => void;
}) {
  return (
    <ContextMenuContent className="bg-background">
      {type === "sidebar" && (
        <>
          <ContextMenuItem onClick={() => {}}>New File</ContextMenuItem>
          <ContextMenuItem onClick={() => {}}>New Folder</ContextMenuItem>
          <CopyPath path={path} />
          <OpenPath path={path} />
        </>
      )}
      {type === "folder" && (
        <>
          <ContextMenuItem onClick={() => {}}>New File</ContextMenuItem>
          <ContextMenuItem onClick={() => {}}>New Folder</ContextMenuItem>
          {/* <Rename setIsEditing={setIsEditing} /> */}
          <Delete path={path} type="folder" />
          <CopyPath path={path} />
          <OpenPath path={path} />
        </>
      )}
      {type === "file" && (
        <>
          {/* <Rename setIsEditing={setIsEditing} /> */}
          <Delete path={path} type="file" />
          <CopyPath path={path} />
          <OpenPath path={path} />
        </>
      )}
    </ContextMenuContent>
  );
}

function CopyPath({ path }: { path: string }) {
  return (
    <ContextMenuItem
      onClick={async () => {
        await writeText(path);
      }}
    >
      Copy Path
    </ContextMenuItem>
  );
}

function OpenPath({ path }: { path: string }) {
  return (
    <ContextMenuItem
      onClick={async () => {
        await tauri.invoke("open_location", { path });
      }}
    >
      Open Location
    </ContextMenuItem>
  );
}

function Rename({ setIsEditing }: { setIsEditing: () => void }) {
  return (
    <ContextMenuItem
      onClick={() => {
        setIsEditing();
      }}
    >
      Rename
    </ContextMenuItem>
  );
}

function Delete({ path, type }: { path: string; type: "file" | "folder" }) {
  return (
    <ContextMenuItem
      onClick={async () => {
        if (type === "file") {
          await removeFile(path);
        } else if (type === "folder") {
          await removeDir(path);
        }
      }}
    >
      Delete
    </ContextMenuItem>
  );
}
