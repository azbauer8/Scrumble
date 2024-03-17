import Spotlight from "@app/Spotlight"
import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { ContextMenuProvider } from "mantine-contextmenu"
import Settings from "../Settings"
import theme from "./theme"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider forceColorScheme="dark" theme={theme}>
      <ContextMenuProvider>
        {children}
        <Settings />
        <Spotlight />
        <Notifications />
      </ContextMenuProvider>
    </MantineProvider>
  )
}
