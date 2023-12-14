import "./settings.css";
import React, { useState } from "react";

import { useAtom } from "jotai";
import { userSettingsState } from "../../../globalState/settings";

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Input,
  Text,
  Switch,
} from "@fluentui/react-components";
import { Card } from "@fluentui/react-components";
import { Warning16Regular } from "@fluentui/react-icons";
import { Dropdown, Option } from "@fluentui/react-components";

interface PerferencesProps {
  open: boolean;
  onClose?: () => void;
}

const syntaxMap = {
  gfm: "GitHub Flavored Markdown",
  commonmark: "CommonMark",
};

const Settings: React.FC<PerferencesProps> = ({ open, onClose }) => {
  const [userSettings, setUserSettings] = useAtom(userSettingsState);
  const [relaunchItem, setRelaunchItem] = useState<{
    [prop in keyof typeof userSettings]?: unknown;
  }>({});
  function setSetting(key: keyof typeof userSettings, value: unknown) {
    setUserSettings(
      Object.assign({}, userSettings, {
        [key]: value,
      })
    );
  }
  function addRelaunchItem(key: keyof typeof userSettings, value: unknown) {
    setRelaunchItem(
      Object.assign({}, relaunchItem, {
        [key]: value,
      })
    );
  }
  function deleteRelaunchItem(key: keyof typeof userSettings) {
    const modifiedRelaunchItem = Object.assign({}, relaunchItem);
    delete modifiedRelaunchItem[key];
    setRelaunchItem(modifiedRelaunchItem);
  }
  function relaunchApply() {
    setUserSettings(Object.assign({}, userSettings, relaunchItem));
    location.reload();
  }
  return (
    <Dialog open={open}>
      <DialogSurface>
        <DialogBody className="body">
          <DialogTitle>Settings</DialogTitle>
          <DialogContent className="content">
            {Object.keys(relaunchItem).length !== 0 && (
              <Card appearance="outline" className="alert">
                <Warning16Regular className="icon" />
                <Text weight="semibold">
                  You need to re-launch to apply the changes
                </Text>
              </Card>
            )}
            <div className="option">
              <p className="description">Markdown Syntax</p>
              <Dropdown
                value={
                  syntaxMap[
                  (relaunchItem.syntax as keyof typeof syntaxMap) ??
                  userSettings.syntax
                  ]
                }
                onOptionSelect={(e, data) => {
                  if (data.optionValue !== userSettings.syntax)
                    addRelaunchItem("syntax", data.optionValue);
                  else deleteRelaunchItem("syntax");
                }}
              >
                <Option value="commonmark">CommonMark</Option>
                <Option value="gfm">GitHub Flavored Markdown</Option>
              </Dropdown>
            </div>
            <div className="option">
              <p className="description">Auto Save</p>
              <Switch
                checked={userSettings.autoSave}
                onChange={(e, data) => {
                  setSetting("autoSave", data.checked);
                }}
              />
            </div>
            <div className="option">
              <p className="description">Save interval (sec)</p>
              <Input
                type="number"
                value={String(userSettings.saveInterval)}
                disabled={!userSettings.autoSave}
                onChange={(e, data) => {
                  setSetting(
                    "saveInterval",
                    Math.max(parseInt(data.value) || 0, 10)
                  );
                }}
              />
            </div>
            <div className="option">
              <p className="description">Save when editor blurred</p>
              <Switch
                checked={userSettings.saveBlur}
                onChange={(e, data) => {
                  setSetting("saveBlur", data.checked);
                }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              appearance="primary"
              onClick={() => {
                if (Object.keys(relaunchItem).length !== 0) relaunchApply();
                else onClose && onClose();
              }}
            >
              {Object.keys(relaunchItem).length !== 0 ? "Re-launch" : "Ok"}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default Settings;
