import { useState } from "react"
import useFileState from "@/store/file"
import useUIState from "@/store/ui"
import { OpenFolder } from "@/utils/fileOps"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { SidebarFolder, SidebarItem, SidebarParentFolder } from "./SidebarItems"

import "./sidebar.css"

// don't worry about responsive layouts for now, just
export default function Sidebar() {
  const { isSidebarOpen } = useUIState()
  const { openFolder, filesInOpenFolder } = useFileState()
  const [isEditingFiles, setIsEditingFiles] = useState<Record<string, boolean>>(
    {}
  )

  if (isSidebarOpen) {
    if (openFolder && filesInOpenFolder) {
      const path = openFolder
      const parts = path.split(/[\\/]/)
      const lastPart = parts.pop()
      return (
        <div className="sidebar mt-5 h-full">
          <SidebarParentFolder
            name={lastPart as string}
            path={path}
            setIsEditingFiles={setIsEditingFiles}
          />
          {filesInOpenFolder.map((file) =>
            file.path.slice(-3) === ".md" ? (
              <SidebarItem
                key={file.path}
                name={file.name?.slice(0, -3) as string}
                path={file.path}
                isEditingFiles={isEditingFiles}
                setIsEditingFiles={setIsEditingFiles}
              />
            ) : file.children ? (
              <Collapsible key={file.path}>
                <CollapsibleTrigger>
                  <SidebarFolder
                    name={file.name as string}
                    path={file.path}
                    isEditingFiles={isEditingFiles}
                    setIsEditingFiles={setIsEditingFiles}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {file.children.map((child) => {
                    if (child.path.slice(-3) === ".md") {
                      return (
                        <SidebarItem
                          key={child.path}
                          className="pl-6"
                          name={child.name?.slice(0, -3) as string}
                          path={child.path}
                          isEditingFiles={isEditingFiles}
                          setIsEditingFiles={setIsEditingFiles}
                        />
                      )
                    }
                  })}
                </CollapsibleContent>
              </Collapsible>
            ) : null
          )}
        </div>
      )
    }
    return (
      <div className="items-center justify-center p-5 text-center">
        <Button className="w-full" onClick={() => OpenFolder()}>
          Open
        </Button>
      </div>
    )
  }
}
