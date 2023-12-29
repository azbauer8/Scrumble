import "@remirror/styles/extension-code-block.css";
import "./editor.css";
import { forwardRef, useImperativeHandle, useCallback } from "react";
import { Remirror, useRemirror, useHelpers, useKeymap } from "@remirror/react";
import { extensions } from "./exts";
import useFileState from "@/store/file";
import { Save } from "@/utils/fileOps";

const hooks = [
  () => {
    const { getMarkdown } = useHelpers();

    const handleSaveShortcut = useCallback(
      ({}) => {
        Save();
        return true; // Prevents any further key handlers from being run.
      },
      [getMarkdown]
    );

    // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
    useKeymap("Mod-s", handleSaveShortcut);
  },
];

const MdEditor = forwardRef((_, ref) => {
  const { manager, state, setState, getContext } = useRemirror({ extensions });
  const { fileContent, setFileContent, setSaved } = useFileState();

  useImperativeHandle(ref, () => getContext(), [getContext]);

  // Add the state and create an `onChange` handler for the state.
  return (
    <Remirror
      manager={manager}
      hooks={hooks}
      state={state}
      onChange={(parameter: { state: any }) => {
        // Update the state to the latest value.
        setState(parameter.state);
        if ((getContext()?.helpers.getMarkdown() as string) !== fileContent) {
          setFileContent(getContext()?.helpers.getMarkdown() as string);
          setSaved(false);
        }
      }}
    />
  );
});

export default MdEditor;
