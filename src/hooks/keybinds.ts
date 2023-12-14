import { useKeyPress } from "ahooks";
import { useAtom } from "jotai";
import {
  currentFileState,
  fileContentState,
  isSavedState,
  isSavingState,
} from "../globalState/file";
import { toolbarOpenState } from "../globalState/ui";

export default function UseKeybinds() {
  const [currentFile, setCurrentFile] = useAtom(currentFileState);
  const [fileContent, setFileContent] = useAtom(fileContentState);
  const [, setToolbarOpen] = useAtom(toolbarOpenState);
  const [isSaved, setSaved] = useAtom(isSavedState);
  const [, setSaving] = useAtom(isSavingState);

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
      const originalFilePath = currentFile;
      const originalContent = fileContent;
      const originalSaved = isSaved;
      setCurrentFile(null);
      setSaving(true);
      setCurrentFile(originalFilePath);
      setFileContent(originalContent);
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
