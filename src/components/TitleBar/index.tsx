import "./title-bar.css";
import React, { useEffect, useRef } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { TauriEvent } from "@tauri-apps/api/event";
import { confirm } from "@tauri-apps/api/dialog";
import { useUpdateEffect } from "ahooks";

import { useAtom } from "jotai";
import { aboutOpenState, isMacState, settingsOpenState } from "../../globalState/ui";
import { isSavedState, isSavingState } from "../../globalState/file";

import { Button } from "@fluentui/react-components";
import {
  Add20Regular,
  ArrowDown20Regular,
  FullScreenMaximize20Regular,
} from "@fluentui/react-icons";
import { Editor } from "@milkdown/core";

import FileMenu from "./FileMenu";
import EditMenu from "./EditMenu";

let globalSaved = isSavedState.init;
interface TitleBar {
  editorInstance: {
    current?: Editor | null;
  };
}

const TitleBar: React.FC<TitleBar> = ({ editorInstance }) => {
  const [settingsOpen] = useAtom(settingsOpenState);
  const [aboutOpen] = useAtom(aboutOpenState);
  const [saved] = useAtom(isSavedState);
  const [, setSaving] = useAtom(isSavingState);
  const [isMac] = useAtom(isMacState);
  const titleBarRef = useRef<HTMLDivElement>(null);
  const disableMenu = (e: MouseEvent) => {
    e.preventDefault();
  };
  useUpdateEffect(() => {
    globalSaved = saved;
  }, [saved]);
  useEffect(() => {
    if (!titleBarRef.current) return;
    titleBarRef.current.addEventListener("contextmenu", disableMenu);

    // Listen close event
    appWindow.listen(TauriEvent.WINDOW_CLOSE_REQUESTED, async () => {
      if (!globalSaved) {
        const result = await confirm("Do you need to save and then exit?", {
          title: "You haven't saved it yet",
          type: "warning",
        });

        if (result) await setSaving(true);
      }
      await appWindow.close();
    });

    return () => {
      if (!titleBarRef.current) return;
      titleBarRef.current.removeEventListener("contextmenu", disableMenu);
    };
  }, []);
  return (
    <>
      <div
        data-tauri-drag-region
        className="bar"
        ref={titleBarRef}
      >
        {isMac && <div className="trafficLights">
          <div
            className="light"
            style={{
              backgroundColor: "#ff5e57",
              border: "1px solid #e0534d",
            }}
            onClick={async () => {
              appWindow.emit(TauriEvent.WINDOW_CLOSE_REQUESTED);
            }}
          />
          <div
            className="light"
            style={{
              backgroundColor: "#ffbb2e",
              border: "1px solid #e0a528",
            }}
            onClick={async () => {
              await appWindow.minimize();
            }}
          />
          <div
            className="light"
            style={{
              backgroundColor: "#38c149",
              border: "1px solid #31aa40",
            }}
            onClick={async () => {
              await appWindow.toggleMaximize();
            }}
          />
        </div>}
        <div data-tauri-drag-region className="title">
          Scrumble
        </div>
        <div data-tauri-drag-region className="operation">
          <FileMenu />
          <div style={{ width: "0.5rem" }}></div>
          <EditMenu editorInstance={editorInstance} />
        </div>
        <div className="control">
          <Button
            appearance="subtle"
            icon={<ArrowDown20Regular />}
            onClick={async () => {
              await appWindow.minimize();
            }}
          />
          <Button
            appearance="subtle"
            icon={<FullScreenMaximize20Regular />}
            onClick={async () => {
              await appWindow.toggleMaximize();
            }}
          />
          <Button
            appearance="subtle"
            icon={<Add20Regular className="close" />}
            onClick={async () => {
              appWindow.emit(TauriEvent.WINDOW_CLOSE_REQUESTED);
            }}
          />
        </div>
      </div>
      {(settingsOpen || aboutOpen) && (
        <div data-tauri-drag-region className="invisibleBar" />
      )}
    </>
  );
};

export default TitleBar;
