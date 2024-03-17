import { Link } from "@mantine/tiptap"
import BubbleMenu from "@tiptap/extension-bubble-menu"
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
  StarterKit.configure({
    codeBlock: false,
    dropcursor: false,
  }),
  Link,
  CodeBlockLowlight.configure({
    lowlight,
  }),
  Markdown.configure({
    transformCopiedText: true,
    transformPastedText: true,
  }),
  BubbleMenu.configure({
    element: document.querySelector(".menu") as HTMLElement | null | undefined,
  }),
]

export default extensions
