import useFileState from "../../store/file";
import useUIState from "../../store/ui";
import "../../styles/titlebar.css";
import MenuDropdown from "./MenuDropdown";
import WindowControls from "./WindowControls";
import { useEffect, useRef } from "react";

export default function TitleBar() {
  const { isMac } = useUIState();
  const { fileName } = useFileState();
  //SECTION - Disable right clicking on title bar
  const titleBarRef = useRef<HTMLDivElement>(null);
  const disableMenu = (e: MouseEvent) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (!titleBarRef.current) return;
    titleBarRef.current.addEventListener("contextmenu", disableMenu);

    return () => {
      if (!titleBarRef.current) return;
      titleBarRef.current.removeEventListener("contextmenu", disableMenu);
    };
  }, []);
  //!SECTION

  return (
    <nav
      data-tauri-drag-region
      className={`title-bar ${isMac ? "mac" : ""}`}
      ref={titleBarRef}
    >
      {isMac ? (
        <>
          <WindowControls />
          <p data-tauri-drag-region id="file-name">
            {fileName ? fileName : "Untitled.md"}
          </p>
          <MenuDropdown />
        </>
      ) : (
        <>
          <MenuDropdown />
          <p data-tauri-drag-region id="file-name">
            {fileName ? fileName : "Untitled.md"}
          </p>
          <WindowControls />
        </>
      )}
    </nav>
  );
}
