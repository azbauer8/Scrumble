import { createTheme } from "@mantine/core"

const theme = createTheme({
  activeClassName: "translate-y-none",
  components: {
    Notification: {
      classNames: {
        root: "bg-transparent outline outline-neutral-600/25",
      },
    },
  },
})

export default theme
