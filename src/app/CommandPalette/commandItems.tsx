import useFileStore from "@/store/fileStore"
import {
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconHeading,
} from "@tabler/icons-react"
import type { Command } from "kmenu"

export default function getCommands(
  setOpen: (index: number, preventAnimate?: boolean | undefined) => void,
) {
  const home: Command[] = [
    {
      category: "Create",
      commands: [
        {
          icon: <IconHeading />,
          text: "Headings",
          perform: () => setOpen(2),
        },
        {
          icon: <IconHeading />,
          text: "Headings2",
          perform: () => setOpen(2),
        },
      ],
    },
  ]

  const headings: Command[] = [
    {
      category: "Navigation",
      commands: [
        {
          icon: <IconH1 />,
          text: "H1",
          perform: () => {
            useFileStore
              .getState()
              .editor?.chain()
              .focus()
              .toggleHeading({ level: 1 })
              .run()
          },
        },
        {
          icon: <IconH2 />,
          text: "H2",
          perform: () =>
            useFileStore
              .getState()
              .editor?.chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run(),
        },
        {
          icon: <IconH3 />,
          text: "H3",
          perform: () =>
            useFileStore
              .getState()
              .editor?.chain()
              .focus()
              .toggleHeading({ level: 3 })
              .run(),
        },
        {
          icon: <IconH4 />,
          text: "H4",
          perform: () =>
            useFileStore
              .getState()
              .editor?.chain()
              .focus()
              .toggleHeading({ level: 4 })
              .run(),
        },
        {
          icon: <IconH5 />,
          text: "H5",
          perform: () =>
            useFileStore
              .getState()
              .editor?.chain()
              .focus()
              .toggleHeading({ level: 5 })
              .run(),
        },
        {
          icon: <IconH6 />,
          text: "H6",
          perform: () =>
            useFileStore
              .getState()
              .editor?.chain()
              .focus()
              .toggleHeading({ level: 6 })
              .run(),
        },
      ],
    },
  ]

  return { home, headings }
}
