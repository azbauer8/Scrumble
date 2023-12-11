import React, { useState } from "react";
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Text,
} from "@fluentui/react-components";
import "./about.css";
import icon from "../../assets/favicon.png";
import { useAsyncEffect } from "ahooks";
import { getVersion, getTauriVersion } from "@tauri-apps/api/app";

interface AboutProps {
  open: boolean;
  onClose?: () => void;
}

const About: React.FC<AboutProps> = ({ open, onClose }) => {
  const [version, setVersion] = useState<string | null>(null);
  const [tauriVersion, setTauriVersion] = useState<string | null>(null);
  useAsyncEffect(async () => {
    setVersion(await getVersion());
    setTauriVersion(await getTauriVersion());
  }, []);
  return (
    <Dialog open={open}>
      <DialogSurface>
        <DialogBody className="body">
          <DialogTitle>About </DialogTitle>
          <DialogContent>
            <div className="about">
              <img src={icon} />
              <div className="version">
                <Text weight="semibold" size={400}>
                  Scrumble
                </Text>
                <Text>{`Version: ${version ? version : "Loading..."}`}</Text>
                <Text>
                  {`Tauri Version: ${
                    tauriVersion ? tauriVersion : "Loading..."
                  }`}
                </Text>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" disabled>
              Check for Update
            </Button>
            <Button
              appearance="primary"
              onClick={() => {
                onClose && onClose();
              }}
            >
              Ok
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default About;
