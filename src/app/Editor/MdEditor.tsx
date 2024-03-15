import "@/styles/editor.css"
import { RichTextEditor } from "@mantine/tiptap"
import useFileStore from "@store/fileStore"
import { useEditor } from "@tiptap/react"
import { useContextMenu } from "mantine-contextmenu"
import { useEffect, useState } from "react"
import editorCtxItems from "./ctxMenuItems"
import extensions from "./extensions"

const initialContent =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>'

export default function Editor() {
  const [hasMounted, setMounted] = useState(false)
  const { setEditor, setSaved } = useFileStore()
  const { showContextMenu } = useContextMenu()

  const mdEditor = useEditor({
    extensions,
    content: initialContent,
    onUpdate: () => setSaved(false),
  })
  useEffect(() => {
    if (mdEditor && !hasMounted) {
      setEditor(mdEditor)
      setMounted(true)
    }
  }, [mdEditor, hasMounted, setEditor])

  return (
    <RichTextEditor
      editor={mdEditor}
      onContextMenu={showContextMenu(editorCtxItems)}
    >
      <RichTextEditor.Content />
    </RichTextEditor>
  )
}
