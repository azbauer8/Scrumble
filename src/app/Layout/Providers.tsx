import CommandPalette from "@app/CommandPalette/Command"
import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { MenuProvider } from "kmenu"
import { ContextMenuProvider } from "mantine-contextmenu"
import Settings from "../Settings/Settings"
import theme from "./theme"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider forceColorScheme="dark" theme={theme}>
      <ContextMenuProvider>
        <MenuProvider>
          {children}
          <Settings />
          <CommandPalette />
          <Notifications />
        </MenuProvider>
      </ContextMenuProvider>
    </MantineProvider>
  )
}
