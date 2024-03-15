import CommandPalette from "@app/CommandPalette/Command"
import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { MenuProvider } from "kmenu"
import { ContextMenuProvider } from "mantine-contextmenu"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      forceColorScheme="dark"
      theme={{ activeClassName: "translate-y-none" }}
    >
      <ContextMenuProvider>
        <MenuProvider>
          {children}
          <CommandPalette />
          <Notifications />
        </MenuProvider>
      </ContextMenuProvider>
    </MantineProvider>
  )
}
