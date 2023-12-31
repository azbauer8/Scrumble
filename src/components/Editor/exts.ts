import {
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  HardBreakExtension,
  HeadingExtension,
  ItalicExtension,
  LinkExtension,
  ListItemExtension,
  MarkdownExtension,
  OrderedListExtension,
  StrikeExtension,
  TableExtension,
  TrailingNodeExtension,
} from "remirror/extensions";
import { ExtensionPriority } from "remirror";
import { langs } from "./langs";
import { ReactExtensions } from "@remirror/react";

export const extensions = () => [
  new LinkExtension({ autoLink: true }),
  new BoldExtension(),
  new StrikeExtension(),
  new ItalicExtension(),
  new HeadingExtension(),
  new BlockquoteExtension(),
  new BulletListExtension({ enableSpine: true }),
  new OrderedListExtension(),
  new ListItemExtension({
    priority: ExtensionPriority.High,
    enableCollapsible: true,
  }),
  new CodeExtension(),
  new CodeBlockExtension({
    supportedLanguages: langs,
    syntaxTheme: "a11y_dark",
  }),
  new TrailingNodeExtension(),
  new TableExtension(),
  new MarkdownExtension({ copyAsMarkdown: true }),
  new HardBreakExtension(),
];

export type Extensions = ReactExtensions<
  | LinkExtension
  | BoldExtension
  | StrikeExtension
  | ItalicExtension
  | HeadingExtension
  | BlockquoteExtension
  | BulletListExtension
  | OrderedListExtension
  | ListItemExtension
  | CodeBlockExtension
  | CodeExtension
  | TableExtension
  | MarkdownExtension
  | HardBreakExtension
  | TrailingNodeExtension
>;
