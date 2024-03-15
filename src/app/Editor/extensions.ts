import { Link } from "@mantine/tiptap"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import type { Extensions } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import js from "highlight.js/lib/languages/javascript"
import ts from "highlight.js/lib/languages/typescript"
import { common, createLowlight } from "lowlight"
import { Markdown } from "tiptap-markdown"

const lowlight = createLowlight(common)

lowlight.register({ js })
lowlight.register({ ts })

const extensions: Extensions = [
  StarterKit,
  Link,
  CodeBlockLowlight.configure({
    lowlight,
  }),
  Markdown.configure({
    transformCopiedText: true,
    transformPastedText: true,
  }),
]

export default extensions

// starter kit includes: //
// #Nodes //
// Blockquote
// BulletList
// CodeBlock
// Document
// HardBreak
// Heading
// HorizontalRule
// ListItem
// OrderedList
// Paragraph
// Text
//
// #Marks //
// Bold
// Code
// Italic
// Strike
//
// #Extensions //
// Dropcursor
// Gapcursor
// History
