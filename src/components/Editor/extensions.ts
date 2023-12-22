import { Link } from "@mantine/tiptap";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Markdown } from "tiptap-markdown";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Code from "@tiptap/extension-code";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import HardBreak from "@tiptap/extension-hard-break";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import History from "@tiptap/extension-history";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, common } from "lowlight";

import CodeBlockComponent from "./CodeBlock";

const lowlight = createLowlight(common);

export const extensions = [
  Document,
  Text,
  Paragraph,
  Bold,
  Italic,
  Code,
  Heading,
  Blockquote,
  ListItem,
  BulletList,
  OrderedList,
  HardBreak,
  HorizontalRule,
  History,
  Link,
  Markdown.configure({
    linkify: true,
    transformPastedText: true,
    transformCopiedText: true,
  }),
  CodeBlockLowlight.extend({
    addNodeView() {
      return ReactNodeViewRenderer(CodeBlockComponent);
    },
  }).configure({ lowlight }),
];
