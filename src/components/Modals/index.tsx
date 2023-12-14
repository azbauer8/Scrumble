import Settings from "./Settings";
import About from "./About";
import { useAtom } from "jotai";
import {
  aboutOpenState,
  settingsOpenState,
} from "../../globalState/ui";


export default function Modals() {
  const [settingsOpen, setSettingsOpen] = useAtom(settingsOpenState);
  const [aboutOpen, setAboutOpen] = useAtom(aboutOpenState);
  return (
    <>
      <Settings
        open={settingsOpen}
        onClose={() => {
          setSettingsOpen(false);
        }}
      />
      <About
        open={aboutOpen}
        onClose={() => {
          setAboutOpen(false);
        }}
      />
    </>)
}