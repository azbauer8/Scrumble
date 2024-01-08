import useSettingsState from "@/store/settings"
import useUIState from "@/store/ui"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function Settings() {
  const { isSettingsOpen, setSettingsOpen } = useUIState()
  const {
    settings,
    setOpenOnStartup,
    setCustomStartupFolder,
    setAutoSave,
    setSaveBlur,
    setSaveInterval,
    setSpellCheck,
  } = useSettingsState()
  return (
    <Dialog open={isSettingsOpen} onOpenChange={setSettingsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-7 pt-3">
          <div className="flex items-center justify-between">
            <p>Open on Startup</p>
            <Select
              value={settings.openOnStartup}
              onValueChange={(value) => setOpenOnStartup(value)}
            >
              <SelectTrigger className="w-[220px]" tabIndex={-1}>
                <SelectValue placeholder={settings.openOnStartup} />
              </SelectTrigger>
              <SelectContent className="bg-background">
                <SelectGroup>
                  <SelectItem value="New File">New File</SelectItem>
                  <SelectItem value="Previous File and Folder">
                    Previous File and Folder
                  </SelectItem>
                  <SelectItem value="Custom Folder">Custom Folder</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <p>Custom Startup Folder</p>
            <Input
              className="w-[250px]"
              value={settings.customStartupFolder}
              onChange={(e) => setCustomStartupFolder(e.target.value)}
              disabled={settings.openOnStartup !== "Custom Folder"}
              tabIndex={-1}
            />
          </div>
          <div className="flex items-center justify-between">
            <p>Spell Check</p>
            <Switch
              checked={settings.spellCheck === "true"}
              onCheckedChange={(value) =>
                setSpellCheck(value ? "true" : "false")
              }
              tabIndex={-1}
            />
          </div>
          <div className="flex items-center justify-between">
            <p>Auto Save</p>
            <Switch
              checked={settings.autoSave}
              onCheckedChange={(value) => setAutoSave(value)}
              tabIndex={-1}
            />
          </div>
          <div className="flex items-center justify-between">
            <p>Save Interval (sec)</p>
            <Input
              className="w-[180px]"
              type="number"
              min={1}
              value={settings.saveInterval}
              onChange={(e) => setSaveInterval(parseInt(e.target.value))}
              disabled={!settings.autoSave}
              tabIndex={-1}
            />
          </div>
          <div className="flex items-center justify-between">
            <p>Save on Window Blur</p>
            <Switch
              checked={settings.saveBlur}
              onCheckedChange={(value) => setSaveBlur(value)}
              disabled={!settings.autoSave}
              tabIndex={-1}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
