import { BlockNoteEditor } from "@blocknote/core";
import {
  ToggledStyleButton,
  Toolbar,
  CreateLinkButton,
  ImageCaptionButton,
  BlockTypeDropdown,
  ReplaceImageButton,
} from "@blocknote/react";
import "@blocknote/core/style.css";

const CustomFormattingToolbar = (props: { editor: BlockNoteEditor }) => {
  return (
    <Toolbar>
      <BlockTypeDropdown editor={props.editor} />

      <CreateLinkButton editor={props.editor} />
      <ImageCaptionButton editor={props.editor} />
      <ReplaceImageButton editor={props.editor} />

      <ToggledStyleButton editor={props.editor} toggledStyle={"bold"} />
      <ToggledStyleButton editor={props.editor} toggledStyle={"italic"} />
      <ToggledStyleButton editor={props.editor} toggledStyle={"underline"} />
      <ToggledStyleButton editor={props.editor} toggledStyle={"strike"} />
    </Toolbar>
  );
};

export default CustomFormattingToolbar;
