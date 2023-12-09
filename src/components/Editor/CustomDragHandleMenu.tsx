import { BlockNoteEditor } from "@blocknote/core";
import { DragHandleMenu, RemoveBlockButton } from "@blocknote/react";
import "@blocknote/core/style.css";

const CustomDragHandleMenu = (props: {
  editor: BlockNoteEditor;
  block: any;
}) => {
  return (
    <DragHandleMenu>
      <RemoveBlockButton {...props}>Delete</RemoveBlockButton>
    </DragHandleMenu>
  );
};
export default CustomDragHandleMenu;
