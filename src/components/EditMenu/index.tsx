import React from "react";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemCheckbox,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import { DocumentEdit16Regular } from "@fluentui/react-icons";
import { useAtom } from "jotai";
import { editMenuJotai, toolbarJotai, twoColumnJotai } from "../../jotais/ui";
import { Editor, commandsCtx, editorViewCtx, parserCtx } from "@milkdown/core";
import { InsertTable } from "@milkdown/preset-gfm";
import { settingsJotai } from "../../jotais/settings";

interface EditMenu {
  editorInstance: {
    current?: Editor | null;
  };
}

const mermaidMarkdown = `
\`\`\`mermaid
graph TD;
    EditorState-->EditorView;
    EditorView-->DOMEvent;
    DOMEvent-->Transaction;
    Transaction-->EditorState;
\`\`\`
`;

const EditMenu: React.FC<EditMenu> = ({ editorInstance }) => {
  const [, setFloatingToolbar] = useAtom(toolbarJotai);
  const [settings] = useAtom(settingsJotai);
  const [, setEditMenu] = useAtom(editMenuJotai);
  const [twoColumn, setTwoColumn] = useAtom(twoColumnJotai);

  return (
    <Menu
      onOpenChange={(e, data) => {
        setEditMenu(data.open);
      }}
      hasCheckmarks
    >
      <MenuTrigger disableButtonEnhancement>
        <MenuButton
          size="small"
          appearance="subtle"
          icon={<DocumentEdit16Regular />}
        >
          Edit
        </MenuButton>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem
            onClick={() => {
              setFloatingToolbar("find");
            }}
          >
            Find
          </MenuItem>
          <MenuItem
            onClick={() => {
              setFloatingToolbar("replace");
            }}
          >
            Replace
          </MenuItem>
          <MenuDivider />
          <MenuItem
            disabled={settings.syntax !== "gfm"}
            onClick={() => {
              if (!editorInstance.current) return;
              const commandManager =
                editorInstance.current.ctx.get(commandsCtx);
              commandManager.call(InsertTable);
            }}
          >
            Add Table
          </MenuItem>
          <MenuItemCheckbox
            name="twoColumnEditor"
            value="twoColumn"
            onClick={() => {
              setTwoColumn(!twoColumn);
            }}
          >
            Split Source View
          </MenuItemCheckbox>
          <MenuItem
            onClick={() => {
              if (!editorInstance.current) return;
              const editorView = editorInstance.current.ctx.get(editorViewCtx);
              const parser = editorInstance.current.ctx.get(parserCtx);
              const editorState = editorView.state;
              const transaction = editorState.tr;
              const mermaidNode = parser(mermaidMarkdown);
              if (!mermaidNode) return;
              editorView.dispatch(
                transaction.insert(editorState.selection.$head.pos, mermaidNode)
              );
            }}
          >
            Add Diagram
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (!editorInstance.current) return;
              const editorView = editorInstance.current.ctx.get(editorViewCtx);
              const parser = editorInstance.current.ctx.get(parserCtx);
              const editorState = editorView.state;
              const transaction = editorState.tr;
              const mermaidNode = parser(
                `$\\sum_{i=0}^n i^2 = \\frac{(n^2+n)(2n+1)}{6}$`
              );
              if (!mermaidNode) return;
              editorView.dispatch(
                transaction.insert(editorState.selection.$head.pos, mermaidNode)
              );
            }}
          >
            Add Formula
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export default EditMenu;
