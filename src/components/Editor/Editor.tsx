import { useEffect, useRef } from "react";
import useGlobalStore from "../../utils/globalStore";

import { MDXEditor, MDXEditorMethods } from "@mdxeditor/editor/MDXEditor";
import "@mdxeditor/editor/style.css";
import { plugins } from "./plugins";

export default function Editor() {
  const { markdown, setMarkdown, fileOpened, setFileOpened } = useGlobalStore();
  const ref = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    if (fileOpened) {
      ref.current?.setMarkdown(markdown);
      setFileOpened(false);
    }
  }, [fileOpened]);

  return (
    <MDXEditor
      ref={ref}
      className="editor"
      markdown={markdown}
      onChange={setMarkdown}
      plugins={plugins}
    />
  );
}
