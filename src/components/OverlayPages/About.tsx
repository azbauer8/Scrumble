import "./about.css";
import { Modal, Group } from "@mantine/core";
import useUIState from "../../store/ui";
import logo from "../../assets/favicon.png";
import useOSState from "../../store/os";

export default function About() {
  const { isAboutOpen, setAboutOpen } = useUIState();
  const { appVersion, tauriVersion } = useOSState();
  return (
    <Modal
      opened={isAboutOpen}
      onClose={() => setAboutOpen(false)}
      title="About"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Group>
        <img src={logo} alt="Logo" className="about-logo" />
        <div className="about-text">
          <h1>Scrumble</h1>
          <p>{`Version: ${appVersion}`}</p>
          <p>{`Tauri Version: ${tauriVersion}`}</p>
        </div>
      </Group>
    </Modal>
  );
}
