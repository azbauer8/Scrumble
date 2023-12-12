import React, { forwardRef, useEffect } from "react";
import { useUpdateEffect } from "ahooks";
import { refractor } from "refractor/lib/common";
import {
  Editor,
  rootCtx,
  defaultValueCtx,
  commandsCtx,
  EditorStatus,
} from "@milkdown/core";
import { ReactEditor, useEditor } from "@milkdown/react";
import { block } from "@milkdown/plugin-block";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { replaceAll } from "@milkdown/utils";
import { menu } from "@milkdown/plugin-menu";
import { tooltip } from "@milkdown/plugin-tooltip";
import { history } from "@milkdown/plugin-history";
import { prismPlugin } from "@milkdown/plugin-prism";
import { clipboard } from "@milkdown/plugin-clipboard";
import { diagram } from "@milkdown/plugin-diagram";
import { math } from "@milkdown/plugin-math";
import { cursor } from "@milkdown/plugin-cursor";
import {
  splitEditing,
  ToggleSplitEditing,
} from "@milkdown-lab/plugin-split-editing";
import { gfm, heading as gfmHeading } from "@milkdown/preset-gfm";
import {
  commonmark,
  heading as commonmarkHeading,
} from "@milkdown/preset-commonmark";
import { getNord } from "@milkdown/theme-nord";
import "@material-design-icons/font";
import "katex/dist/katex.min.css";

interface MilkdownEditor {
  content: string;
  useMenu?: boolean;
  twoColumnEditor?: boolean;
  syntaxOption?: keyof typeof syntaxMap;
  onMarkdownUpdated?: (markdown: string, prevMarkdown: string | null) => void;
  ref?: React.ForwardedRef<Editor>;
}

let currentContent = "";
const syntaxMap = {
  gfm: gfm.configure(gfmHeading, {
    className: (attrs) => `milkdownHeading h${attrs.level}`,
  }),
  commonmark: commonmark.configure(commonmarkHeading, {
    className: (attrs) => `milkdownHeading h${attrs.level}`,
  }),
};


const MilkdownEditor: React.FC<MilkdownEditor> = forwardRef<
  Editor,
  MilkdownEditor
>(
  (
    {
      content,
      useMenu = false,
      syntaxOption = "gfm",
      onMarkdownUpdated,
      twoColumnEditor = false,
    },
    ref
  ) => {
    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") ref(getInstance() ?? null);
        else ref.current = getInstance() ?? null;
      }
    });

    useEffect(() => {
      setTimeout(() => {
        const instance = getInstance();
        if (!instance || instance.status !== EditorStatus.Created) return;
        instance.action((ctx) => {
          const commandManager = ctx.get(commandsCtx);
          commandManager.call(ToggleSplitEditing);
        });
      }, 0);
    }, [twoColumnEditor]);

    useUpdateEffect(() => {
      if (!loading) {
        const instance = getInstance();
        if (content !== currentContent) {
          instance?.action(replaceAll(content));
          currentContent = content;
        }
      }
    }, [content, syntaxOption]);

    const { editor, loading, getInstance } = useEditor((root) => {
      currentContent = content;
      const instance = Editor.make()
        .config((ctx) => {
          ctx.set(defaultValueCtx, content);
          ctx.set(rootCtx, root);
          const listener = ctx.get(listenerCtx);
          if (onMarkdownUpdated) {
            listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
              if (markdown === prevMarkdown) return;
              // Don't trigger when editor is initializing
              if (prevMarkdown !== null)
                onMarkdownUpdated(markdown, prevMarkdown);
              currentContent = markdown;
            });
          }
        })
        .use(syntaxMap[syntaxOption])
        .use(listener)
        .use(
          prismPlugin({
            configureRefractor: () => refractor,
          })
        )
        .use(clipboard)
        .use(history)
        .use(cursor)
        .use(math)
        .use(tooltip)
        .use(diagram)
        .use(getNord())
        .use(block)
        .use(splitEditing);

      if (useMenu) instance.use(menu);

      return instance;
    });

    return <ReactEditor editor={editor} />;
  }
);

function areEqual(
  prevProps: Readonly<MilkdownEditor>,
  nextProps: Readonly<MilkdownEditor>
) {
  if (prevProps !== nextProps) {
    for (const nextProp in nextProps) {
      if (
        nextProps[nextProp as keyof typeof nextProps] !==
        prevProps[nextProp as keyof typeof prevProps]
      ) {
        // Don't refresh if content is equal
        if (nextProp === "content" && nextProps.content === currentContent)
          continue;
        // Syntax cannot be removed as a plugin, ignore it before re-create editor.
        if (nextProp === "syntaxOption") continue;
        // For Milkdown Editor, Function is a constant, don't update
        if (typeof nextProps[nextProp as keyof typeof nextProps] === "function")
          continue;
        return false;
      }
    }
  }
  return true;
}

MilkdownEditor.displayName = "MilkdownEditor";

export default React.memo(MilkdownEditor, areEqual);
