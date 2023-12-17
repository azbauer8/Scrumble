import "@mantine/tiptap/styles.css";
import "../../styles/editor.css";
import { useEditor, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { Markdown } from "tiptap-markdown";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import tsLanguageSyntax from "highlight.js/lib/languages/typescript";

export default function MdEditor() {
  const lowlight = createLowlight();
  lowlight.register("ts", tsLanguageSyntax);

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
      CodeBlockLowlight.configure({ lowlight }),
    ],
  });
  // TODO: make editor a global state so you can modify it from other components
  // you can do stuff like editor?.chain().focus().toggleBold().run() to bold the currently selected text
  // grab md content to save it with: editor?.storage.markdown.getMarkdown()
  // load md content with: editor?.commands.setContent(content)
  return (
    <RichTextEditor
      editor={editor}
      className="editor-content"
      spellCheck={false}
    >
      {editor && (
        <BubbleMenu editor={editor}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Code />
            <RichTextEditor.Link />
          </RichTextEditor.ControlsGroup>
        </BubbleMenu>
      )}
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
