import { ActionIcon, rem } from "@mantine/core"
import { IconBold, IconCode, IconItalic } from "@tabler/icons-react"
import { BubbleMenu, type Editor } from "@tiptap/react"

export default function SelectionMenu({
  mdEditor,
}: { mdEditor: Editor | null }) {
  if (mdEditor)
    return (
      <BubbleMenu editor={mdEditor} tippyOptions={{ duration: 100 }}>
        <ActionIcon.Group>
          <ActionIcon
            variant={mdEditor.isActive("bold") ? "filled" : "default"}
            color="gray"
            size="lg"
            aria-label="Bold"
            onClick={() => mdEditor.chain().focus().toggleBold().run()}
          >
            <IconBold style={{ width: rem(20) }} stroke={1.5} />
          </ActionIcon>

          <ActionIcon
            variant={mdEditor.isActive("italic") ? "filled" : "default"}
            color="gray"
            size="lg"
            aria-label="Italics"
            onClick={() => mdEditor.chain().focus().toggleItalic().run()}
          >
            <IconItalic style={{ width: rem(20) }} stroke={1.5} />
          </ActionIcon>

          <ActionIcon
            variant={mdEditor.isActive("code") ? "filled" : "default"}
            color="gray"
            size="lg"
            aria-label="Code"
            onClick={() => mdEditor.chain().focus().toggleCode().run()}
          >
            <IconCode style={{ width: rem(20) }} stroke={1.5} />
          </ActionIcon>
        </ActionIcon.Group>
      </BubbleMenu>
    )
}
