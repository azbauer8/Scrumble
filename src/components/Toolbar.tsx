import { saveFile, openFile } from "../utils/fileOps";
import useGlobalStore from "../utils/globalStore";

export default function Toolbar() {
  const { markdown, setMarkdown, savePath, setSavePath, setFileOpened } =
    useGlobalStore();
  const handleOpen = async () => {
    await openFile(setMarkdown, setSavePath, setFileOpened);
  };
  const handleSave = async () => {
    await saveFile(markdown, savePath, setSavePath);
  };
  return (
    <div>
      <button
        className="bg-neutral-700 text-neutral-100 p-2 rounded-md hover:bg-neutral-800 mt-5 ml-5"
        onClick={handleOpen}
      >
        Open
      </button>
      <button
        className="bg-neutral-700 text-neutral-100 p-2 rounded-md hover:bg-neutral-800 mt-5 ml-5"
        onClick={handleSave}
      >
        {savePath ? "Save" : "Save As"}
      </button>
    </div>
  );
}
