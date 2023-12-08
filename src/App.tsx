import { invoke } from "@tauri-apps/api/tauri";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

function App() {
  const editor: BlockNoteEditor = useBlockNote({});

  const saveBlocksAsMarkdown = async () => {
    await editor.blocksToMarkdownLossy(editor.topLevelBlocks).then((md) => {
      invoke("save_file", { markdown: md })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return <BlockNoteView editor={editor} />;
}

export default App;
