import "./floating-toolbar.css";
import React, { useState } from "react";
import { useKeyPress, useUpdateEffect } from "ahooks";

import { Finder } from "../../utils/findAndReplace";

import { useAtom } from "jotai";
import { toolbarOpen } from "../../globalState/ui";
import { fileContent } from "../../globalState/file";

import { Card } from "@fluentui/react-components";
import {
  Input,
  Text,
  Tooltip,
  Toolbar,
  ToolbarButton,
  ToolbarToggleButton,
} from "@fluentui/react-components";
import {
  Add20Regular,
  ArrowDown24Regular,
  ArrowUp24Regular,
  Search24Regular,
  TextCaseTitle24Regular,
  TextExpand24Regular,
} from "@fluentui/react-icons";
import { Editor, editorViewCtx, parserCtx } from "@milkdown/core";
import { Selection, TextSelection } from "@milkdown/prose/state";
import { Slice } from "@milkdown/prose/model";


interface FloatingToolbar {
  editorInstance: {
    current?: Editor | null;
  };
}

const FloatingToolbar: React.FC<FloatingToolbar> = ({ editorInstance }) => {
  const [isToolbarOpen, setToolbarOpen] = useAtom(toolbarOpen);
  const [content] = useAtom(fileContent);
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [isCaseSensitive, setCaseSensitive] = useState(false);
  const [result, setResult] = useState<Selection[]>([]); // Matched selections
  const [pos, setPos] = useState(0); // Position of result
  const handleSearch = (originalPos?: number) => {
    if (!editorInstance.current) return;
    if (find.length === 0) {
      setResult([]);
      return;
    }

    const editorView = editorInstance.current.ctx.get(editorViewCtx);
    const editorState = editorView.state;
    const transaction = editorState.tr;
    // Wrapping a Finder into a class
    const finder = new Finder(transaction, isCaseSensitive);
    const matched = finder.find(find);
    if (matched?.length !== 0) {
      setResult(matched as TextSelection[]);
      setPos(
        originalPos ? Math.min(pos, (matched as TextSelection[]).length) : 1
      );
    } else {
      setResult([]);
    }
  };
  const selectByPos = (scroll = true) => {
    if (!editorInstance.current) return;
    if (result.length === 0) return;
    const editorView = editorInstance.current.ctx.get(editorViewCtx);
    const transaction = editorView.state.tr;
    const selection = result[pos - 1];
    const currentTransaction = transaction.setSelection(selection);
    editorView.dispatch(
      scroll ? currentTransaction.scrollIntoView() : currentTransaction
    );
  };
  const handleReplace = () => {
    if (!editorInstance.current || result.length === 0) return;

    const editorView = editorInstance.current.ctx.get(editorViewCtx);
    const parser = editorInstance.current.ctx.get(parserCtx);
    const editorState = editorView.state;
    const transaction = editorState.tr;

    if (!transaction.selection) selectByPos(false);

    const contentSlice = editorState.selection.content();
    const parsedReplace = parser(replace); // Parsed text as node in order to replace.
    if (!parsedReplace) return;

    // Dispatch events to editor view, then editor updated.
    editorView.dispatch(
      transaction
        .replaceSelection(
          new Slice(
            parsedReplace.content,
            contentSlice.openStart,
            contentSlice.openEnd
          )
        )
        .scrollIntoView()
    );

    /*
     * Update result rather than slice it, it will break ProseMirror's internal logic.
     * ...or slice it?
     */
    handleSearch(pos);
  };

  /*
   *Const handleReplaceAll = () => {
   *    if (!editorInstance.current || result.length === 0) return;
   *
   *    const editorView = editorInstance.current.ctx.get(editorViewCtx);
   *    const parser = editorInstance.current.ctx.get(parserCtx);
   *    const editorState = editorView.state;
   *    const transaction = editorState.tr;
   *    for (const selection of result) {
   *        editorView.dispatch(transaction.setSelection(selection));
   *        const contentSlice = editorState.selection.content();
   *        console.log(contentSlice);
   *        const parsedReplace = parser(replace); // Parsed text as node in order to replace.
   *        if (!parsedReplace) continue;
   *        editorView.dispatch(transaction.replaceSelection(
   *            new Slice(
   *                parsedReplace.content,
   *                contentSlice.openStart,
   *                contentSlice.openEnd
   *            )
   *        ));
   *    }
   *    // Result is empty
   *    setResult([]);
   *};
   */

  useKeyPress("esc", () => {
    if (isToolbarOpen) setToolbarOpen(false);
  });
  useUpdateEffect(() => {
    selectByPos();
  }, [pos, result]);
  useUpdateEffect(() => {
    if (isToolbarOpen && find !== "" && result.length !== 0) {
      handleSearch();
    }
  }, [content]);

  if (!isToolbarOpen) return <></>;
  return (
    <div className="wrapper">
      <Card
        appearance="filled-alternative"
        className={`card ${isToolbarOpen === "replace" ? "replace" : ""}`}
      >
        <Toolbar>
          <div className="input">
            <Input
              placeholder="Find..."
              value={find}
              onChange={(e, data) => {
                setFind(data.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            {isToolbarOpen === "replace" && (
              <Input
                placeholder="Replace..."
                value={replace}
                onChange={(e, data) => {
                  setReplace(data.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleReplace();
                }}
              />
            )}
          </div>
          <div className="buttons">
            <Tooltip content="Search" showDelay={650} relationship="label">
              <ToolbarButton
                icon={<Search24Regular />}
                onClick={() => {
                  handleSearch();
                }}
              />
            </Tooltip>
            <Tooltip content="Previous" showDelay={650} relationship="label">
              <ToolbarButton
                icon={<ArrowUp24Regular />}
                disabled={result.length === 0}
                onClick={() => {
                  if (pos !== 0) setPos(Math.max(pos - 1, 1));
                }}
              />
            </Tooltip>
            <Tooltip content="Next" showDelay={650} relationship="label">
              <ToolbarButton
                icon={<ArrowDown24Regular />}
                disabled={result.length === 0}
                onClick={() => {
                  if (pos !== 0) setPos(Math.min(pos + 1, result.length));
                }}
              />
            </Tooltip>
            <Tooltip content="Close" showDelay={650} relationship="label">
              <ToolbarButton
                icon={<Add20Regular className="close" />}
                onClick={() => {
                  setToolbarOpen(false);
                }}
              />
            </Tooltip>
            <Tooltip
              content="Case-Sensitive"
              showDelay={650}
              relationship="label"
            >
              <ToolbarToggleButton
                appearance="subtle"
                as="button"
                defaultChecked={isCaseSensitive}
                className="case-sensitive"
                onClick={() => {
                  setCaseSensitive(!isCaseSensitive);
                }}
                name="case-sensitive"
                value="case-sensitive"
                icon={<TextCaseTitle24Regular />}
              />
            </Tooltip>
            {isToolbarOpen === "replace" && (
              <>
                <Tooltip content="Replace" showDelay={650} relationship="label">
                  <ToolbarButton
                    icon={<TextExpand24Regular />}
                    disabled={result.length === 0}
                    onClick={handleReplace}
                  />
                </Tooltip>
                {/*
                                // Current buggy right now (onTransform)
                                <Tooltip
                                    content="Replace All"
                                    showDelay={650}
                                    relationship="label"
                                >
                                    <ToolbarButton
                                        icon={<TextGrammarWand24Regular />}
                                        disabled={result.length === 0}
                                        onClick={handleReplaceAll}
                                    />
                                </Tooltip>
                                */}
              </>
            )}
          </div>
          <Text className="found">
            {`${result.length === 0 ? 0 : pos} / ${result.length} matches`}
          </Text>
        </Toolbar>
      </Card>
    </div>
  );
};

export default FloatingToolbar;
