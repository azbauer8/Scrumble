import SelectionMenu from "@/app/Editor/SelectionMenu"
import "@/styles/editor.css"
import { RichTextEditor } from "@mantine/tiptap"
import useFileStore from "@store/fileStore"
import { useEditor } from "@tiptap/react"
import { useContextMenu } from "mantine-contextmenu"
import { useEffect, useState } from "react"
import editorCtxItems from "./ctxMenuItems"
import extensions from "./extensions"

export default function Editor() {
  const [hasMounted, setMounted] = useState(false)
  const { setEditor, setSaved } = useFileStore()
  const { showContextMenu } = useContextMenu()

  const mdEditor = useEditor({
    extensions,
    onUpdate: () => setSaved(false),
  })
  useEffect(() => {
    if (mdEditor && !hasMounted) {
      setEditor(mdEditor)
      setMounted(true)
    }
  }, [mdEditor, hasMounted, setEditor])

  return (
    <>
      <SelectionMenu mdEditor={mdEditor} />
      <RichTextEditor
        editor={mdEditor}
        onContextMenu={showContextMenu(editorCtxItems)}
        spellCheck={false}
      >
        <RichTextEditor.Content />
      </RichTextEditor>
    </>
  )
}
