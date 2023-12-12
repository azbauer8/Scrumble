import { useKeyPress } from "ahooks";
import { useAtom } from "jotai";
import {
  currentFile,
  fileContent,
  isSaved,
  isSaving,
} from "../globalState/file";
import { toolbarOpen } from "../globalState/ui";

export default function UseKeybinds() {
  const [filePath, setFilePath] = useAtom(currentFile);
  const [content, setContent] = useAtom(fileContent);
  const [, setToolbarOpen] = useAtom(toolbarOpen);
  const [saved, setSaved] = useAtom(isSaved);
  const [, setSaving] = useAtom(isSaving);

  // disable unwanted native shortcuts
  useKeyPress(["f5", "f7"], (e) => {
    e.preventDefault();
  });

  //SECTION - Save
  useKeyPress(
    ["ctrl.s"],
    async (e) => {
      e.preventDefault();
      setSaving(true);
    },
    { exactMatch: true }
  );

  //SECTION - Save As
  useKeyPress(
    ["shift.ctrl.s"],
    async (e) => {
      e.preventDefault();
      const originalFilePath = filePath;
      const originalContent = content;
      const originalSaved = saved;
      setFilePath(null);
      setSaving(true);
      setFilePath(originalFilePath);
      setContent(originalContent);
      setSaved(originalSaved);
    },
    { exactMatch: true }
  );

  //SECTION - Find
  useKeyPress(
    ["ctrl.f"],
    (e) => {
      e.preventDefault();
      setToolbarOpen("find");
    },
    { exactMatch: true }
  );

  //SECTION - Replace
  useKeyPress(
    ["shift.ctrl.f"],
    () => {
      setToolbarOpen("replace");
    },
    { exactMatch: true }
  );
}
