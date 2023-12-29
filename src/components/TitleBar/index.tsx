import useOSState from "@/store/os";
import useFileState from "@/store/file";
import Menu from "./Menu";
import WindowControls from "./WindowControls";

export default function TitleBar() {
  const { isMac } = useOSState();
  const { fileName, isSaved } = useFileState();
  return (
    <div data-tauri-drag-region className="sticky top-0 h-9 titlebar">
      {isMac ? (
        <>
          <div></div>
          <div
            data-tauri-drag-region
            className="cursor-default select-none absolute right-1/2 top-1"
          >
            {!isSaved ? "• " : ""}
            {fileName ? fileName : "Untitled.md"}
          </div>
          <Menu buttonClassName="right-0" dropdownClassName="mr-2" />
        </>
      ) : (
        <>
          <Menu buttonClassName="left-0" dropdownClassName="ml-2" />
          <div
            data-tauri-drag-region
            className="cursor-default select-none absolute right-1/2 top-1"
          >
            {!isSaved ? "• " : ""}
            {fileName ? fileName : "Untitled.md"}
          </div>
          <WindowControls />
        </>
      )}
    </div>
  );
}
