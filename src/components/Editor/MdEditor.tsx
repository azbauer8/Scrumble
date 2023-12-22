import "@mantine/tiptap/styles.css";
import "./editor.css";
import { useEffect } from "react";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import { extensions } from "./extensions";
import useFileState from "../../store/file";

export default function MdEditor() {
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
    >
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
