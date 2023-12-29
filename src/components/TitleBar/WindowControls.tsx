import { appWindow } from "@tauri-apps/api/window";
import { ask } from "@tauri-apps/api/dialog";
import { Button } from "@/components/ui/button";
import { SquareIcon, MinusIcon, XIcon } from "lucide-react";
import useFileState from "../../store/file";
import { Save, SaveAs } from "../../utils/fileOps";

export default function WindowControls() {
  const { isSaved, filePath } = useFileState();

  return (
    <div className="absolute right-0 -top-1">
      <Button
        variant="ghost"
        className="rounded-none"
        onClick={async () => {
          await appWindow.minimize();
        }}
        tabIndex={-1}
      >
        <MinusIcon className="size-4" />
      </Button>
      <Button
        variant="ghost"
        className="rounded-none"
        onClick={async () => {
          await appWindow.toggleMaximize();
        }}
        tabIndex={-1}
      >
        <SquareIcon className="size-4" />
      </Button>
      <Button
        variant="ghost"
        className="hover:bg-[#e81022b9] rounded-none"
        onClick={async () => {
          await HandleClose();
        }}
        tabIndex={-1}
      >
        <XIcon className="size-5 translate-y-0.5" />
      </Button>
    </div>
  );

  async function HandleClose() {
    if (!isSaved) {
      const response = await ask(
        "The current file is unsaved, do you want to save it first?",
        { title: "Warning", type: "warning" }
      );
      if (response) {
        filePath ? await Save() : await SaveAs();
      }
    }
    await appWindow.close();
  }
}
