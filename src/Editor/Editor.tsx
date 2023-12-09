import useGlobalStore from "../lib/globalStore";
import {
  BlockNoteEditor,
  uploadToTmpFilesDotOrg_DEV_ONLY,
} from "@blocknote/core";
import {
  BlockNoteView,
  useBlockNote,
  FormattingToolbarPositioner,
  HyperlinkToolbarPositioner,
  SideMenuPositioner,
  SlashMenuPositioner,
  DefaultSideMenu,
  ImageToolbarPositioner,
  DefaultImageToolbar,
} from "@blocknote/react";
import "@blocknote/core/style.css";

import CustomTheme from "./CustomTheme";
import CustomFormattingToolbar from "./CustomFormattingToolbar";
import CustomDragHandleMenu from "./CustomDragHandleMenu";

export default function Editor() {
  const { markdown, setMarkdown } = useGlobalStore();

  const editor: BlockNoteEditor = useBlockNote({
    uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
    domAttributes: {
      editor: {
        class: "editor",
      },
      blockContainer: {
        class: "block-container",
      },
      blockGroup: {
        class: "block-group",
      },
      blockContent: {
        class: "block-content",
      },
      inlineContent: {
        class: "inline-content",
      },
    },
    onEditorContentChange: (editor) => {
      async function saveBlocksAsMarkdown() {
        setMarkdown(await editor.blocksToMarkdownLossy(editor.topLevelBlocks));
      }
      saveBlocksAsMarkdown();
    },
  });

  return (
    <BlockNoteView editor={editor} theme={CustomTheme}>
      <FormattingToolbarPositioner
        editor={editor}
        formattingToolbar={CustomFormattingToolbar}
      />
      <HyperlinkToolbarPositioner editor={editor} />
      <SlashMenuPositioner editor={editor} />
      <SideMenuPositioner
        editor={editor}
        sideMenu={(props) => (
          <DefaultSideMenu {...props} dragHandleMenu={CustomDragHandleMenu} />
        )}
      />
      <ImageToolbarPositioner
        editor={editor}
        imageToolbar={(props) => <DefaultImageToolbar {...props} />}
      />
    </BlockNoteView>
  );
}
