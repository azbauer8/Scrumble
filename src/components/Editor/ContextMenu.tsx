import useFileState from "../../store/file";

export default function ContextMenu() {
  const { editorRef } = useFileState();
  const items = [
    {
      key: "turn-into",
      items: [
        {
          key: "paragraph",
          onClick: () => editorRef?.chain().focus().setParagraph().run(),
        },
        {
          key: "h1",
          onClick: () =>
            editorRef?.chain().focus().setHeading({ level: 1 }).run(),
        },
        {
          key: "h2",
          onClick: () =>
            editorRef?.chain().focus().setHeading({ level: 2 }).run(),
        },
        {
          key: "h3",
          onClick: () =>
            editorRef?.chain().focus().setHeading({ level: 3 }).run(),
        },
        {
          key: "h4",
          onClick: () =>
            editorRef?.chain().focus().setHeading({ level: 4 }).run(),
        },
        {
          key: "h5",
          onClick: () =>
            editorRef?.chain().focus().setHeading({ level: 5 }).run(),
        },
        {
          key: "h6",
          onClick: () =>
            editorRef?.chain().focus().setHeading({ level: 6 }).run(),
        },
        {
          key: "bullet-list",
          onClick: () => editorRef?.chain().focus().toggleBulletList().run(),
        },
        {
          key: "ordered-list",
          onClick: () => editorRef?.chain().focus().toggleOrderedList().run(),
        },
        {
          key: "task",
          onClick: () => editorRef?.chain().focus().toggleTaskList().run(),
        },
        {
          key: "block-quote",
          onClick: () => editorRef?.chain().focus().setBlockquote().run(),
        },
        {
          key: "code-block",
          onClick: () => editorRef?.chain().focus().setCodeBlock().run(),
        },
      ],
    },
    {
      key: "bold",
      onClick: () => editorRef?.chain().focus().toggleBold().run(),
    },
    {
      key: "italics",
      onClick: () => editorRef?.chain().focus().toggleItalic().run(),
    },
    {
      key: "code",
      onClick: () => editorRef?.chain().focus().toggleCode().run(),
    },
  ];
  return items;
}
