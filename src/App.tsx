import "./styles/editorLayout.css";
import "./styles/colorSchemes.css"
import { useRef } from "react";
import useIsDarkMode from "./hooks/dark";

import { useAtom } from "jotai";
import { userSettings } from "./globalState/settings";
import {
  fileContent,
} from "./globalState/file";
import {
  aboutOpen,
  settingsOpen,
  isTwoColumn,
  isMac,
} from "./globalState/ui";

import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
} from "@fluentui/react-components";
import { Editor } from "@milkdown/core";
import MilkdownEditor from "./components/MilkdownEditor";
import TitleBar from "./components/TitleBar";
import Preferences from "./components/Preferences";
import About from "./components/About";
import FloatingToolbar from "./components/FloatingToolbar";
import InitializeEditor from "./hooks/initializeEditor";
import UseKeybinds from "./hooks/keybinds";

function App() {
  const [content, setContent] = useAtom(fileContent);
  const [twoColumn] = useAtom(isTwoColumn);
  const [settings] = useAtom(userSettings);
  const [isSettingsOpen, setSettingsOpen] = useAtom(settingsOpen);
  const [isAboutOpen, setAboutOpen] = useAtom(aboutOpen);
  const [isAMac] = useAtom(isMac);
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
        className={`container ${isAMac ? "mac" : "windows"}`}
      >
        <TitleBar editorInstance={editorInstance} />
        <div className="editor-container" spellCheck={false}>
          <MilkdownEditor
            useMenu={false}
            content={content}
            onMarkdownUpdated={(markdown) => {
              setContent(markdown);
            }}
            twoColumnEditor={twoColumn}
            syntaxOption={settings.syntax}
            ref={editorInstance}
          />
          <FloatingToolbar editorInstance={editorInstance} />
        </div>
        <Preferences
          open={isSettingsOpen}
          onClose={() => {
            setSettingsOpen(false);
          }}
        />
        <About
          open={isAboutOpen}
          onClose={() => {
            setAboutOpen(false);
          }}
        />
      </div>
    </FluentProvider>
  );
}

export default App;
