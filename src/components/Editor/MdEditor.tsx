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
import CodeBlockComponent from "./CodeBlock";

export default function MdEditor() {
  const lowlight = createLowlight();
  lowlight.register("ts", ts);
  lowlight.register("html", html);
  lowlight.register("css", css);
  lowlight.register("js", js);
  lowlight.register("ts", ts);

  Markdown.configure({
    linkify: true,
    transformPastedText: true,
    transformCopiedText: true,
  });
  const editor = useEditor({
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
  // TODO: make editor a global state so you can modify it from other components
  // you can do stuff like editor?.chain().focus().toggleBold().run() to bold the currently selected text
  // grab md content to save it with: editor?.storage.markdown.getMarkdown()
  // load md content with: editor?.commands.setContent(content)
  // TODO: add indent/unindent functionality with tab/shift+tab
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
