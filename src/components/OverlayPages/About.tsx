import "../../styles/about.css";
import { Modal, Group } from "@mantine/core";
import { useAsyncEffect } from "ahooks";
import { getVersion, getTauriVersion } from "@tauri-apps/api/app";
import useUIState from "../../store/ui";
import { useState } from "react";
import { RiQuillPenFill } from "react-icons/ri";

export default function About() {
  const { isAboutOpen, setAboutOpen } = useUIState();
  const [version, setVersion] = useState<string | null>(null);
  const [tauriVersion, setTauriVersion] = useState<string | null>(null);
  useAsyncEffect(async () => {
    setVersion(await getVersion());
    setTauriVersion(await getTauriVersion());
  }, []);
  return (
    <Modal
      opened={isAboutOpen}
      onClose={() => setAboutOpen(false)}
      title="About"
      centered
    >
      <Group>
        <RiQuillPenFill className="about-icon" />
        <div className="about-text">
          <h1>Scrumble</h1>
          <p>{`Version: ${version ? version : "Loading..."}`}</p>
          <p>{`Tauri Version: ${
            tauriVersion ? tauriVersion : "Loading..."
          }`}</p>
        </div>
      </Group>
    </Modal>
  );
}
