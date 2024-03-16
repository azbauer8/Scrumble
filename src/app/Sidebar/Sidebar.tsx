import useFileStore from "@/store/fileStore"
import cn from "@/utils/cn"
import { openFilePath, openFolderFromDialog } from "@/utils/fileOps"
import { Button, Input, rem } from "@mantine/core"
import {
  IconChevronDown,
  IconChevronRight,
  IconFileText,
  IconFolder,
} from "@tabler/icons-react"
import { useState } from "react"
import { type NodeRendererProps, Tree } from "react-arborist"

export default function Sidebar() {
  const { openFolder, filesInOpenFolder } = useFileStore()
  const [term, setTerm] = useState("")

  if (!openFolder) {
    return (
      <Button
        variant="outline"
        color="gray"
        radius="sm"
        className="m-3 w-full border-neutral-600/45 bg-neutral-700/25"
        onClick={async () => await openFolderFromDialog()}
      >
        <IconFolder
          style={{ width: rem(16), height: rem(16), strokeWidth: 2.5 }}
          className="mr-0.5"
        />
        Open
      </Button>
    )
  }

  return (
    <div className="flex size-full flex-col gap-2 p-3">
      <Input
        type="text"
        placeholder="Search files..."
        className="w-full"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <Tree
        data={filesInOpenFolder}
        children={(props) => <Node {...props} />}
        indent={20}
        rowHeight={30}
        width="100%"
        height={100000}
        onActivate={async (item) =>
          item.isLeaf && (await openFilePath(item.id, true))
        }
        searchTerm={term}
        searchMatch={(node, term) =>
          node.data.name?.toLowerCase().includes(term.toLowerCase()) ?? false
        }
        openByDefault={false}
        disableDrag
        disableDrop
        disableEdit
        disableMultiSelection
      />
    </div>
  )
}

function Node({
  style,
  dragHandle,
  node,
  // ...props
}: NodeRendererProps<{
  id: string
  name: string | undefined
  children:
    | {
        id: string
        name: string | undefined
      }[]
    | undefined
}>) {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className={cn(
        "flex h-full cursor-pointer items-center gap-1.5 rounded-sm text-sm hover:bg-neutral-600/40",
        node.state.isSelected && "bg-neutral-700/40",
      )}
      style={style}
      ref={dragHandle}
      onClick={() => node.isInternal && node.toggle()}
    >
      <div className="ml-1.5 flex items-center gap-1">
        {node.isInternal ? (
          <>
            {node.isOpen ? (
              <IconChevronDown size={16} className="translate-x-0.5" />
            ) : (
              <IconChevronRight size={16} className="translate-x-0.5" />
            )}
            <IconFolder size={20} />
          </>
        ) : (
          <>
            <IconFileText size={20} />
          </>
        )}
      </div>
      <p className="truncate">
        {node.isLeaf ? node.data.name?.slice(0, -3) : node.data.name}
      </p>
    </div>
  )
}
