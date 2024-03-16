import useFileStore from "@/store/fileStore"
import { openFilePath } from "@/utils/fileOps"
import { type NodeRendererProps, Tree } from "react-arborist"

// const data = [
//   {
//     id: "1",
//     name: "public",
//     children: [{ id: "c1-1", name: "index.html" }],
//   },
//   {
//     id: "2",
//     name: "src",
//     children: [
//       { id: "c2-1", name: "App.js" },
//       { id: "c2-2", name: "index.js" },
//       { id: "c2-3", name: "styles.css" },
//     ],
//   },
//   { id: "3", name: "package.json" },
//   { id: "4", name: "README.md" },
// ]

export default function Sidebar() {
  const { openFolder, filesInOpenFolder } = useFileStore()
  const data = filesInOpenFolder.map((file) => ({
    id: file.path,
    name: file.name,
    children: file?.children
      ? file.children.map((child) => ({ id: child.path, name: child.name }))
      : undefined,
  }))
  console.log(openFolder, filesInOpenFolder)
  return (
    <Tree
      data={data}
      indent={20}
      rowHeight={30}
      className="select-none"
      rowClassName="cursor-pointer hover:bg-neutral-800/50 flex items-center"
      onActivate={async (item) =>
        item.isLeaf && (await openFilePath(item.id, true))
      }
      disableDrag
      disableDrop
      disableEdit
      disableMultiSelection
      children={(props) => }
    />
  )
}


function Node() {
  return (
    
  )
}