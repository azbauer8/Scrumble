import useUIStore from "@/store/uiStore"
import {
  newFile,
  openFile,
  openFolderFromDialog,
  saveFile,
  saveFileAs,
} from "@/utils/fileOps"
import { Button, rem } from "@mantine/core"
import {
  Spotlight,
  type SpotlightActionData,
  type SpotlightActionGroupData,
  spotlight,
} from "@mantine/spotlight"
import "@mantine/spotlight/styles.css"
import {
  IconFileDownload,
  IconFilePlus,
  IconFileUpload,
  IconFolderDown,
  IconFolderUp,
  IconSearch,
  IconSettings2,
} from "@tabler/icons-react"

const actions: (SpotlightActionGroupData | SpotlightActionData)[] = [
  {
    group: "File",
    actions: [
      {
        id: "new",
        label: "New File",
        onClick: async () => await newFile(),
        leftSection: (
          <IconFilePlus
            style={{ width: rem(24), height: rem(24) }}
            stroke={1.5}
          />
        ),
      },
      {
        id: "open",
        label: "Open File",
        onClick: async () => await openFile(),
        leftSection: (
          <IconFileUpload
            style={{ width: rem(24), height: rem(24) }}
            stroke={1.5}
          />
        ),
      },
      {
        id: "openFolder",
        label: "Open Folder",
        onClick: async () => openFolderFromDialog(),
        leftSection: (
          <IconFolderUp
            style={{ width: rem(24), height: rem(24) }}
            stroke={1.5}
          />
        ),
      },
      {
        id: "save",
        label: "Save File",
        onClick: async () => await saveFile(),
        leftSection: (
          <IconFileDownload
            style={{ width: rem(24), height: rem(24) }}
            stroke={1.5}
          />
        ),
      },
      {
        id: "saveAs",
        label: "Save File As",
        onClick: async () => await saveFileAs(),
        leftSection: (
          <IconFolderDown
            style={{ width: rem(24), height: rem(24) }}
            stroke={1.5}
          />
        ),
      },
    ],
  },
  {
    group: "App",
    actions: [
      {
        id: "settings",
        label: "Settings",
        onClick: () => useUIStore.getState().setSettingsOpen(true),
        leftSection: (
          <IconSettings2
            style={{ width: rem(24), height: rem(24) }}
            stroke={1.5}
          />
        ),
      },
    ],
  },
]

export default function SpotlightSearch() {
  return (
    <>
      <Button onClick={spotlight.open}>Open spotlight</Button>
      <Spotlight
        actions={actions}
        shortcut={null}
        nothingFound="Nothing found..."
        searchProps={{
          leftSection: (
            <IconSearch
              style={{ width: rem(20), height: rem(20) }}
              stroke={1.5}
            />
          ),
          placeholder: "Search...",
        }}
      />
    </>
  )
}
