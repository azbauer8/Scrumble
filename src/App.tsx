import "./styles/editorLayout.css";
import "./styles/colorSchemes.css"
import "./styles/nordCodeBlocks.css"
import { useRef } from "react";
import useIsDarkMode from "./hooks/dark";

import { useAtom } from "jotai";
import {
  isMacState,
} from "./globalState/ui";

import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
} from "@fluentui/react-components";
import { Editor } from "@milkdown/core";
import TitleBar from "./components/TitleBar";
import InitializeEditor from "./hooks/initializeEditor";
import UseKeybinds from "./hooks/keybinds";
import EditorWrapper from "./components/Editor";
import Modals from "./components/Modals";

function App() {
  const [isMac] = useAtom(isMacState);
  const isDarkMode = useIsDarkMode();

  const editorInstance = useRef<Editor>(null);

  InitializeEditor();
  UseKeybinds();

  return (
    <FluentProvider
      theme={isDarkMode ? webDarkTheme : webLightTheme}
      className="provider"
    >
      <div
        className={`container ${isMac ? "mac" : "windows"}`}
      >
        <Modals />
        <TitleBar editorInstance={editorInstance} />
        <EditorWrapper editorInstance={editorInstance} />
      </div>
    </FluentProvider>
  );
}

export default App;
