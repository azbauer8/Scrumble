import "@mantine/tiptap/styles.css";
import "../../styles/editor.css";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import python from "highlight.js/lib/languages/python";
import rust from "highlight.js/lib/languages/rust";
import CodeBlockComponent from "./CodeBlock";
import useFileState from "../../store/file";
import { useEffect } from "react";

export default function MdEditor() {
  const { fileContent, editorRef, setEditorRef } = useFileState();
  const lowlight = createLowlight();
  lowlight.register("Javascript", js);
  lowlight.register("Typescript", ts);
  lowlight.register("HTML", html);
  lowlight.register("CSS", css);
  lowlight.register("Rust", rust);
  lowlight.register("Python", python);

  Markdown.configure({
    linkify: true,
    transformPastedText: true,
    transformCopiedText: true,
  });
  const editor = useEditor({
    content: fileContent,
    extensions: [
      StarterKit,
      Link,
      Markdown,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight }),
    ],
  });
  useEffect(() => {
    editor && editor !== editorRef && setEditorRef(editor);
  }, [editor]);
  // grab md content to save it with: editor?.storage.markdown.getMarkdown()
  // load md content with: editor?.commands.setContent(content)
  // TODO: add indent/unindent functionality with tab/shift+tab
  // TODO: add custom context menu like Typora that acts as toolbar/bubble menu
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
