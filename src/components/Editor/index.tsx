import useFileState from "@/store/file"
import useSettingsState from "@/store/settings"
import useUIState from "@/store/ui"
import { Save } from "@/utils/fileOps"
import { Remirror, useHelpers, useKeymap, useRemirror } from "@remirror/react"

import "@remirror/styles/extension-code-block.css"

import { forwardRef, useCallback, useImperativeHandle } from "react"
import { open } from "@tauri-apps/api/shell"
import { LinkExtension } from "remirror/extensions"

import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu"
import EditorContextMenu from "./EditorContextMenu"

import "./editor.css"

import { extensions } from "./exts"

const hooks = [
  () => {
    const { getMarkdown } = useHelpers()

    const handleSaveShortcut = useCallback(
      ({}) => {
        Save()
        return true // Prevents any further key handlers from being run.
      },
      [getMarkdown]
    )

    // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
    useKeymap("Mod-s", handleSaveShortcut)
  },
]

const MdEditor = forwardRef((_, ref) => {
  const { manager, state, setState, getContext } = useRemirror({ extensions })
  const { fileContent, setFileContent, setSaved } = useFileState()
  const { setLinkSelected } = useUIState()
  const { settings } = useSettingsState()

  useImperativeHandle(ref, () => getContext(), [getContext])

  manager.extensions.map((ext) => {
    // opens links on middle click
    if (ext.name === "link") {
      const linkExt = ext as LinkExtension
      linkExt.addHandler("onClick", (_, data) => {
        if (_.button === 1) {
          let href = data.href
          href = href.replace(/^\/\/(?!www\.)/, (match) => match + "www.")
          open(href)
        } else if (_.button === 2) {
          setLinkSelected(true, data.href)
        }
        return true
      })
    }
  })

  // Add the state and create an `onChange` handler for the state.
  return (
    <ContextMenu>
      {/* @ts-ignore */}
      <ContextMenuTrigger spellCheck={settings.spellCheck}>
        <Remirror
          manager={manager}
          hooks={hooks}
          state={state}
          onChange={(parameter: { state: any }) => {
            // Update the state to the latest value.
            setState(parameter.state)
            setLinkSelected(false, null)
            if (
              (getContext()?.helpers.getMarkdown() as string) !== fileContent
            ) {
              setFileContent(getContext()?.helpers.getMarkdown() as string)
              setSaved(false)
            }
          }}
        />
      </ContextMenuTrigger>
      <EditorContextMenu />
    </ContextMenu>
  )
})

export default MdEditor
