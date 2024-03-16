import useSettingsStore, {
  type OpenOnStartup,
  openOnStartup,
} from "@/store/settingsStore"
import useUIStore from "@/store/uiStore"
import {
  Modal,
  NumberInput,
  Select,
  Switch,
  TextInput,
  Title,
} from "@mantine/core"

export default function Settings() {
  const { settingsOpen, setSettingsOpen } = useUIStore()
  const {
    settings,
    setOpenOnStartup,
    setCustomStartupFolder,
    setAutoSave,
    setSaveBlur,
    setSaveInterval,
  } = useSettingsStore()

  return (
    <Modal
      opened={settingsOpen}
      onClose={() => setSettingsOpen(false)}
      title="Settings"
      centered
    >
      <div className="space-y-3" data-autofocus>
        <Title order={4}>Startup</Title>
        <div className="space-y-2">
          <Select
            label="Open on Startup"
            placeholder="Pick value"
            data={openOnStartup}
            value={settings.openOnStartup}
            onChange={(value) => setOpenOnStartup(value as OpenOnStartup)}
          />
          <TextInput
            label="Custom Startup Folder"
            placeholder="Enter folder path"
            disabled={settings.openOnStartup !== "Custom Folder"}
            value={settings.customStartupFolder}
            onChange={(e) => setCustomStartupFolder(e.target.value)}
          />
        </div>
        <Title order={4}>Auto Save</Title>
        <div className="space-y-2">
          <Switch
            label="Enabled"
            checked={settings.autoSave}
            onChange={(e) => setAutoSave(e.currentTarget.checked)}
          />
          <NumberInput
            label="Interval"
            description="Measured in seconds. Defaults to 60"
            placeholder="Enter an interval"
            value={settings.saveInterval}
            onChange={setSaveInterval}
            min={10}
            max={10000}
            disabled={!settings.autoSave}
          />
          <Switch
            label="Auto Save on Blur"
            checked={settings.saveBlur}
            onChange={(e) => setSaveBlur(e.currentTarget.checked)}
            disabled={!settings.autoSave}
          />
        </div>
      </div>
    </Modal>
  )
}
