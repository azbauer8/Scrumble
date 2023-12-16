import { Modal, Group, Switch, NumberInput, Select } from "@mantine/core";

import useUIState from "../../store/ui";
import useSettingsState from "../../store/settings";

export default function Settings() {
  const { isSettingsOpen, setSettingsOpen } = useUIState();
  const { settings, setSyntax, setSaveInterval, setSaveBlur, setAutoSave } =
    useSettingsState();
  return (
    <Modal
      opened={isSettingsOpen}
      onClose={() => setSettingsOpen(false)}
      title="Settings"
      centered
    >
      <Group justify="space-between">
        <p>Markdown Syntax</p>
        <Select
          className="input-box"
          data={["CommonMark", "GitHub"]}
          value={settings.syntax}
          onChange={(event) => setSyntax(event as "CommonMark" | "GitHub")}
        />
      </Group>
      <Group justify="space-between">
        <p>Auto Save</p>
        <Switch
          checked={settings.autoSave}
          onChange={(event) => setAutoSave(event.currentTarget.checked)}
        />
      </Group>
      <Group justify="space-between">
        <p>Save Interval (sec)</p>
        <NumberInput
          disabled={!settings.autoSave}
          value={settings.saveInterval}
          onChange={(event) => setSaveInterval(event as number)}
          placeholder="120"
          min={10}
          error={settings.saveInterval < 10 && "Minimum value is 10"}
        />
      </Group>
      <Group justify="space-between">
        <p>Save on Window Blur</p>
        <Switch
          checked={settings.saveBlur}
          onChange={(event) => setSaveBlur(event.currentTarget.checked)}
        />
      </Group>
    </Modal>
  );
}
