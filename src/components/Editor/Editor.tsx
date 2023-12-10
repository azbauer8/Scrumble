import { useEffect } from "react";
import { Editable, useEditor } from "@wysimark/react";

import useGlobalStore from "../../utils/globalStore";

export default function Editor() {
  const { markdown, setMarkdown, fileOpened, setFileOpened } = useGlobalStore();
  const editor = useEditor({});

  useEffect(() => {
    if (fileOpened) {
      editor.setMarkdown(markdown);
      setFileOpened(false);
    }
  }, [fileOpened]);

  return (
    <Editable
      editor={editor}
      value={markdown}
      onChange={setMarkdown}
      className="editor"
    />
  );
}
