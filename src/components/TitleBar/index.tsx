import useOSState from "@/store/os";
import useFileState from "@/store/file";
import FileMenu from "./FileMenu";
import WindowControls from "./WindowControls";

export default function TitleBar() {
  const { isMac } = useOSState();
  const { fileName, isSaved } = useFileState();
  return (
    <div data-tauri-drag-region className="h-9">
      {isMac ? (
        <>
          <div
            data-tauri-drag-region
            className="cursor-default select-none absolute right-1/2 top-2"
          >
            {!isSaved ? "• " : ""}
            {fileName ? fileName?.slice(0, -3) : "Untitled"}
          </div>
          <FileMenu buttonClassName="right-0" dropdownClassName="mr-2" />
        </>
      ) : (
        <>
          <FileMenu buttonClassName="left-0" dropdownClassName="ml-2" />
          <div
            data-tauri-drag-region
            className="cursor-default select-none absolute right-1/2 top-2"
          >
            {!isSaved ? "• " : ""}
            {fileName ? fileName?.slice(0, -3) : "Untitled"}
          </div>
          <WindowControls />
        </>
      )}
    </div>
  );
}
