import useFileState from "../../store/file";
import "./titlebar.css";
import MenuDropdown from "./MenuDropdown";
import WindowControls from "./WindowControls";
import useOSState from "../../store/os";

export default function TitleBar() {
  const { isMac } = useOSState();
  const { fileName, isSaved } = useFileState();

  return (
    <div data-tauri-drag-region className={`title-bar ${isMac ? "mac" : ""}`}>
      {isMac ? (
        <>
          <WindowControls />
          <p data-tauri-drag-region id="file-name">
            {!isSaved ? "• " : ""}
            {fileName ? fileName : "Untitled.md"}
          </p>
          <MenuDropdown />
        </>
      ) : (
        <>
          <MenuDropdown />
          <p data-tauri-drag-region id="file-name">
            {!isSaved ? "• " : ""}
            {fileName ? fileName : "Untitled.md"}
          </p>
          <WindowControls />
        </>
      )}
    </div>
  );
}
