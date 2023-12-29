import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useUIState from "@/store/ui";
import icon from "../../assets/favicon.png";
import useOSState from "@/store/os";

export default function About() {
  const { isAboutOpen, setAboutOpen } = useUIState();
  const { appVersion, tauriVersion } = useOSState();
  return (
    <Dialog open={isAboutOpen} onOpenChange={setAboutOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">About</DialogTitle>
          <div className="flex items-center gap-4 p-5 pl-0">
            <img src={icon} className="size-36" />
            <div className="space-y-1 text-sm">
              <h1 className="text-3xl font-medium pb-1">Scrumble</h1>
              <p>Version {appVersion}</p>
              <p>Tauri Version {tauriVersion}</p>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
