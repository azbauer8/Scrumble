import useFileState from "@/store/file"
import useUIState from "@/store/ui"
import { open } from "@tauri-apps/api/shell"

import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu"

export default function EditorContextMenu() {
  const { editorRef } = useFileState()
  const { isLinkSelected, setLinkSelected } = useUIState()
  return (
    <ContextMenuContent className="bg-background">
      {isLinkSelected.isSelected && isLinkSelected.link && (
        <ContextMenuItem
          onClick={() => {
            let href = isLinkSelected.link as string
            href = href.replace(/^\/\/(?!www\.)/, (match) => match + "www.")
            open(href)
            setLinkSelected(false, null)
          }}
        >
          Open link
        </ContextMenuItem>
      )}
      <ContextMenuSub>
        <ContextMenuSubTrigger>Turn into</ContextMenuSubTrigger>
        <ContextMenuSubContent className="w-fit -translate-y-1 translate-x-2 bg-background">
          <ContextMenuItem
            onClick={() => {
              editorRef?.commands.convertParagraph()
              editorRef?.commands.focus()
            }}
          >
            Paragraph
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editorRef?.commands.toggleBulletList()
              editorRef?.commands.focus()
            }}
          >
            Bullet List
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editorRef?.commands.toggleOrderedList()
              editorRef?.commands.focus()
            }}
          >
            Ordered List
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editorRef?.commands.toggleBlockquote()
              editorRef?.commands.focus()
            }}
          >
            Block Quote
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editorRef?.commands.toggleCodeBlock()
              editorRef?.commands.focus()
            }}
          >
            Code Block
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSub>
        <ContextMenuSubTrigger>Heading</ContextMenuSubTrigger>
        <ContextMenuSubContent className="w-fit -translate-y-1 translate-x-2 bg-background">
          <ContextMenuItem
            onClick={() => {
              editorRef?.commands.toggleHeading({ level: 1 })
              editorRef?.commands.focus()
            }}
          >
            H1
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editorRef?.commands.toggleHeading({ level: 2 })
              editorRef?.commands.focus()
            }}
          >
            H2
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editorRef?.commands.toggleHeading({ level: 3 })
              editorRef?.commands.focus()
            }}
          >
            H3
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editorRef?.commands.toggleHeading({ level: 4 })
              editorRef?.commands.focus()
            }}
          >
            H4
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editorRef?.commands.toggleHeading({ level: 5 })
              editorRef?.commands.focus()
            }}
          >
            H5
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editorRef?.commands.toggleHeading({ level: 6 })
              editorRef?.commands.focus()
            }}
          >
            H6
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuItem
        onClick={() => {
          editorRef?.commands.toggleBold()
          editorRef?.commands.focus()
        }}
      >
        Bold
      </ContextMenuItem>
      <ContextMenuItem
        onClick={() => {
          editorRef?.commands.toggleItalic()
          editorRef?.commands.focus()
        }}
      >
        Italics
      </ContextMenuItem>
      <ContextMenuItem
        onClick={() => {
          editorRef?.commands.toggleCode()
          editorRef?.commands.focus()
        }}
      >
        Code
      </ContextMenuItem>
    </ContextMenuContent>
  )
}
