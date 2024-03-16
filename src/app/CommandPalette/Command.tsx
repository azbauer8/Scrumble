import "@/styles/kmenu.css"
import { CommandMenu, CommandWrapper, useCommands, useKmenu } from "kmenu"
import getCommands from "./commandItems"

export default function CommandPalette() {
  const { setOpen } = useKmenu()

  const { home, headings } = getCommands(setOpen)

  const [homeCmds] = useCommands(home)
  const [headingsCmds] = useCommands(headings)

  return (
    <CommandWrapper>
      <CommandMenu
        commands={homeCmds}
        crumbs={["Home"]}
        index={1}
        placeholder="Search..."
      />
      <CommandMenu
        commands={headingsCmds}
        crumbs={["Home", "Headings"]}
        index={2}
      />
    </CommandWrapper>
  )
}
