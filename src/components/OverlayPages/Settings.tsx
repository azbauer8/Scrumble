import { Modal, Group, Switch, NumberInput } from "@mantine/core";

import useUIState from "../../store/ui";
import useSettingsState from "../../store/settings";

export default function Settings() {
  const { isSettingsOpen, setSettingsOpen } = useUIState();
  const { settings, setSaveInterval, setSaveBlur, setAutoSave } =
    useSettingsState();
  return (
    <Modal
      opened={isSettingsOpen}
      onClose={() => setSettingsOpen(false)}
      title="Settings"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
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
          min={1}
          error={settings.saveInterval < 1 && "Minimum value is 1"}
        />
      </Group>
      <Group justify="space-between">
        <p>Save on Window Blur</p>
        <Switch
          checked={settings.saveBlur}
          onChange={(event) => setSaveBlur(event.currentTarget.checked)}
          disabled={!settings.autoSave}
        />
      </Group>
    </Modal>
  );
}
