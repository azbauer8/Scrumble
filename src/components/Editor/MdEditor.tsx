import "@mantine/tiptap/styles.css";
import "./editor.css";
import { useEffect } from "react";
import { RichTextEditor } from "@mantine/tiptap";
import { useContextMenu } from "mantine-contextmenu";
import { useEditor } from "@tiptap/react";
import { extensions } from "./extensions";
import useFileState from "../../store/file";

export default function MdEditor() {
  const { showContextMenu } = useContextMenu();
  const { fileContent, setFileContent, editorRef, setEditorRef, setSaved } =
    useFileState();

  const editor = useEditor({
    content: fileContent,
    onUpdate: ({ editor }) => {
      setFileContent(editor.storage.markdown.getMarkdown());
      setSaved(false);
    },
    extensions: extensions,
  });
  useEffect(() => {
    editor && editor !== editorRef && setEditorRef(editor);
  }, [editor]);
  // grab md content to save it with: editor?.storage.markdown.getMarkdown()
  // load md content with: editor?.commands.setContent(content)
  return (
    <RichTextEditor
      editor={editor}
      className="editor-content"
      spellCheck={false}
      onContextMenu={showContextMenu([
        {
          key: "turn-into",
          items: [
            {
              key: "paragraph",
              onClick: () => editor?.chain().focus().setParagraph().run(),
            },
            {
              key: "h1",
              onClick: () =>
                editor?.chain().focus().setHeading({ level: 1 }).run(),
            },
            {
              key: "h2",
              onClick: () =>
                editor?.chain().focus().setHeading({ level: 2 }).run(),
            },
            {
              key: "h3",
              onClick: () =>
                editor?.chain().focus().setHeading({ level: 3 }).run(),
            },
            {
              key: "h4",
              onClick: () =>
                editor?.chain().focus().setHeading({ level: 4 }).run(),
            },
            {
              key: "h5",
              onClick: () =>
                editor?.chain().focus().setHeading({ level: 5 }).run(),
            },
            {
              key: "h6",
              onClick: () =>
                editor?.chain().focus().setHeading({ level: 6 }).run(),
            },
            {
              key: "block-quote",
              onClick: () => editor?.chain().focus().setBlockquote().run(),
            },
            {
              key: "code-block",
              onClick: () => editor?.chain().focus().setCodeBlock().run(),
            },
          ],
        },
        {
          key: "bold",
          onClick: () => editor?.chain().focus().toggleBold().run(),
        },
        {
          key: "italics",
          onClick: () => editor?.chain().focus().toggleItalic().run(),
        },
        {
          key: "code",
          onClick: () => editor?.chain().focus().toggleCode().run(),
        },
      ])}
    >
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
