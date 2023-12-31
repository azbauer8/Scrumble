import "@remirror/styles/extension-code-block.css";
import "./editor.css";
import { forwardRef, useImperativeHandle, useCallback } from "react";
import { open } from "@tauri-apps/api/shell";
import { Remirror, useRemirror, useHelpers, useKeymap } from "@remirror/react";
import { extensions } from "./exts";
import useFileState from "@/store/file";
import { Save } from "@/utils/fileOps";
import { LinkExtension } from "remirror/extensions";
import useUIState from "@/store/ui";

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
  const { setLinkSelected } = useUIState();

  useImperativeHandle(ref, () => getContext(), [getContext]);

  manager.extensions.map((ext) => {
    // opens links on middle click
    if (ext.name === "link") {
      const linkExt = ext as LinkExtension;
      linkExt.addHandler("onClick", (_, data) => {
        if (_.button === 1) {
          let href = data.href;
          href = href.replace(/^\/\/(?!www\.)/, (match) => match + "www.");
          open(href);
        } else if (_.button === 2) {
          setLinkSelected(true, data.href);
        }
        return true;
      });
    }
  });

  // Add the state and create an `onChange` handler for the state.
  return (
    <Remirror
      manager={manager}
      hooks={hooks}
      state={state}
      onChange={(parameter: { state: any }) => {
        // Update the state to the latest value.
        setState(parameter.state);
        setLinkSelected(false, null);
        if ((getContext()?.helpers.getMarkdown() as string) !== fileContent) {
          setFileContent(getContext()?.helpers.getMarkdown() as string);
          setSaved(false);
        }
      }}
    />
  );
});

export default MdEditor;
