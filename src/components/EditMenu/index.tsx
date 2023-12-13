import React from "react";

import { useAtom } from "jotai";
import { editMenuOpen, toolbarOpen, isTwoColumn } from "../../globalState/ui";
import { userSettings } from "../../globalState/settings";

import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import { DocumentEdit16Regular } from "@fluentui/react-icons";
import { Editor, commandsCtx, editorViewCtx, parserCtx } from "@milkdown/core";
import { InsertTable } from "@milkdown/preset-gfm";

interface EditMenu {
  editorInstance: {
    current?: Editor | null;
  };
}

const defaultDiagram = `
\`\`\`mermaid
graph TD;
    EditorState-->EditorView;
    EditorView-->DOMEvent;
    DOMEvent-->Transaction;
    Transaction-->EditorState;
\`\`\`
`;

const defaultFormula = `$\\sum_{i=0}^n i^2 = \\frac{(n^2+n)(2n+1)}{6}$`;

const EditMenu: React.FC<EditMenu> = ({ editorInstance }) => {
  const [, setToolbarOpen] = useAtom(toolbarOpen);
  const [settings] = useAtom(userSettings);
  const [, setEditMenuOpen] = useAtom(editMenuOpen);
  const [twoColumn, setTwoColumn] = useAtom(isTwoColumn);

  return (
    <Menu
      onOpenChange={(e, data) => {
        setEditMenuOpen(data.open);
      }}
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
              setToolbarOpen("find");
            }}
          >
            Find
          </MenuItem>
          <MenuItem
            onClick={() => {
              setToolbarOpen("replace");
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
          <MenuItem
            onClick={() => {
              if (!editorInstance.current) return;
              const editorView = editorInstance.current.ctx.get(editorViewCtx);
              const parser = editorInstance.current.ctx.get(parserCtx);
              const editorState = editorView.state;
              const transaction = editorState.tr;
              const mermaidNode = parser(defaultDiagram);
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
              const mermaidNode = parser(defaultFormula);
              if (!mermaidNode) return;
              editorView.dispatch(
                transaction.insert(editorState.selection.$head.pos, mermaidNode)
              );
            }}
          >
            Add Formula
          </MenuItem>
          <MenuDivider />
          <MenuItem
            onClick={() => {
              setTwoColumn(!twoColumn);
            }}
          >
            {`${twoColumn ? "Disable" : "Enable"} Split View`}
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export default EditMenu;
