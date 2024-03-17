import useUIStore from "@/store/uiStore"
import {
  newFile,
  openFile,
  openFolderFromDialog,
  saveFile,
  saveFileAs,
} from "@/utils/fileOps"
import { ActionIcon, Menu, rem } from "@mantine/core"
import { toggleSpotlight } from "@mantine/spotlight"
import {
  IconCommand,
  IconFileDownload,
  IconFilePlus,
  IconFileUpload,
  IconFolderDown,
  IconFolderUp,
  IconMenu2,
  IconSettings2,
} from "@tabler/icons-react"

export default function TitlebarMenu() {
  const { isMac } = useUIStore()
  return (
    <Menu
      shadow="md"
      width={200}
      withArrow
      position={isMac ? "bottom-end" : "bottom-start"}
      classNames={{
        dropdown:
          "border border-solid border-neutral-600/45 bg-neutral-800/95 backdrop-blur-lg",
      }}
    >
      <Menu.Target>
        <ActionIcon
          size="sm"
          variant="outline"
          color="gray"
          radius="sm"
          className="border-neutral-600/45 bg-neutral-700/25"
        >
          <IconMenu2
            style={{ width: rem(16), height: rem(16), strokeWidth: 2.5 }}
          />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>File</Menu.Label>
        <Menu.Item
          leftSection={
            <IconFilePlus style={{ width: rem(18), height: rem(18) }} />
          }
          onClick={async () => await newFile()}
        >
          New
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconFileUpload style={{ width: rem(18), height: rem(18) }} />
          }
          onClick={async () => await openFile()}
        >
          Open
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconFolderUp style={{ width: rem(18), height: rem(18) }} />
          }
          onClick={async () => openFolderFromDialog()}
        >
          Open Folder
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconFileDownload style={{ width: rem(18), height: rem(18) }} />
          }
          onClick={async () => await saveFile()}
        >
          Save
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconFolderDown style={{ width: rem(18), height: rem(18) }} />
          }
          onClick={async () => await saveFileAs()}
        >
          Save As
        </Menu.Item>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          leftSection={
            <IconCommand style={{ width: rem(18), height: rem(18) }} />
          }
          onClick={() => toggleSpotlight()}
        >
          Open Command
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconSettings2 style={{ width: rem(18), height: rem(18) }} />
          }
          onClick={() => useUIStore.getState().setSettingsOpen(true)}
        >
          Settings
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
