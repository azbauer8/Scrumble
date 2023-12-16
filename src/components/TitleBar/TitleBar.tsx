import "../../styles/titlebar.css";
import MenuDropdown from "./MenuDropdown";
import WindowControls from "./WindowControls";
import { useEffect, useRef } from "react";

export default function TitleBar() {
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
    <nav data-tauri-drag-region className="title-bar" ref={titleBarRef}>
      <MenuDropdown />
      <p data-tauri-drag-region id="file-name">
        Untitled.md
      </p>
      <WindowControls />
    </nav>
  );
}
// TODO: Change layout for MacOS