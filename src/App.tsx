import "./App.css";
import { invoke } from "@tauri-apps/api/tauri";
import { version as getVersion, type as getType } from "@tauri-apps/api/os";
import { useEffect, useRef } from "react";
import {
  useKeyPress,
  useInterval,
  useEventListener,
  useAsyncEffect,
} from "ahooks";
import useIsDarkMode from "./hooks/dark";

import { useAtom } from "jotai";
import { userSettings } from "./globalState/settings";
import {
  fileContent,
  currentFile,
  isSaved,
  isSaving,
} from "./globalState/file";
import {
  aboutOpen,
  isLoading,
  settingsOpen,
  toolbarOpen,
  isTwoColumn,
  vibrancyConfig,
} from "./globalState/ui";

import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
} from "@fluentui/react-components";
import { Spinner } from "@fluentui/react-components";

import { Editor } from "@milkdown/core";
import MilkdownEditor from "./components/MilkdownEditor";
import TitleBar from "./components/TitleBar";
import Preferences from "./components/Preferences";
import About from "./components/About";
import FloatingToolbar from "./components/FloatingToolbar";

function App() {
  const [content, setContent] = useAtom(fileContent);
  const [filePath, setFilePath] = useAtom(currentFile);
  const [loading] = useAtom(isLoading);
  const [, setToolbarOpen] = useAtom(toolbarOpen);
  const [twoColumn] = useAtom(isTwoColumn);
  const [saved] = useAtom(isSaved);
  const [saving, setSaving] = useAtom(isSaving);
  const [settings] = useAtom(userSettings);
  const [isSettingsOpen, setSettingsOpen] = useAtom(settingsOpen);
  const [vibrancy, setVibrancy] = useAtom(vibrancyConfig);
  const [isAboutOpen, setAboutOpen] = useAtom(aboutOpen);
  const isDarkMode = useIsDarkMode();

  const editorInstance = useRef<Editor>(null);

  // Initialize
  useAsyncEffect(async () => {
    // Detect system type
    const type = await getType();
    if (type === "Linux") return;

    const version = await getVersion();
    if (type === "Windows_NT") {
      const buildNumber = parseInt(
        version.substring(version.lastIndexOf(".") + 1)
      );
      if (buildNumber >= 21996) {
        // Windows 11
        setVibrancy({
          acrylic: true,
          mica: true,
          vibrancy: false,
        });
      } else if (buildNumber >= 17134) {
        // Windows 10 1803
        setVibrancy({
          acrylic: true,
          mica: false,
          vibrancy: false,
        });
      }
    } else {
      /*
       * FluentUI doesn't work on macOS 11.3 - (Safari 14.1 -)
       * For vibrancy feature(macOS 10.14 +), there's no need to detect version.
       */
      setVibrancy({
        acrylic: false,
        mica: false,
        vibrancy: true,
      });
    }

    const args: string[] = await invoke("get_args");
    if (args.length > 1) setFilePath(args[1]);
  }, []);

  // Auto save
  useInterval(
    async () => {
      if (filePath === null || saved || saving) return;
      setSaving(true);
    },
    settings.autoSave ? settings.saveInterval * 1000 : -1
  );

  // Save when editor blurred
  useEventListener("blur", async () => {
    if (!settings.saveBlur || filePath === null || saved || saving) return;
    setSaving(true);
  });

  // Shortcuts
  useKeyPress("ctrl.s", async () => {
    setSaving(true);
  });
  useKeyPress("ctrl.f", (e) => {
    e.preventDefault();
    setToolbarOpen("find");
  });
  useKeyPress(["f5", "f7"], (e) => {
    e.preventDefault();
  });
  useKeyPress("ctrl.h", () => {
    setToolbarOpen("replace");
  });

  useKeyPress("ctrl.alt.d", () => {
    alert(
      `filePath: ${filePath}\nsettings: ${JSON.stringify(
        settings
      )}\nsaved: ${saved}`
    );
  });

  useEffect(() => {
    if (settings.vibrancy !== "Default") {
      invoke(`apply_${settings.vibrancy.toLowerCase()}`);
    }
  }, [settings.vibrancy]);

  return (
    <FluentProvider
      theme={isDarkMode ? webDarkTheme : webLightTheme}
      className="provider"
    >
      <div
        className={`container ${!settings.vibrancy || settings.vibrancy === "Default" ? "window" : ""
          } ${vibrancy.vibrancy ? "mac" : ""}`}
      >
        <TitleBar editorInstance={editorInstance} />
        <div className="editor" spellCheck={false}>
          <MilkdownEditor
            useMenu={false}
            content={content}
            onMarkdownUpdated={(markdown) => {
              setContent(markdown);
            }}
            twoColumnEditor={twoColumn}
            syntaxOption={settings.syntax}
            theme={isDarkMode ? settings.themeDark : settings.theme}
            ref={editorInstance}
          />
        </div>
        <div
          data-tauri-drag-region
          className={`mask ${loading ? "white" : ""}`}
        >
          <Spinner />
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
        <FloatingToolbar editorInstance={editorInstance} />
      </div>
    </FluentProvider>
  );
}

export default App;
